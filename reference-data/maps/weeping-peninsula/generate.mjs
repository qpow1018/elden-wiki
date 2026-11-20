import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import prettier from 'prettier';

const ROOT = new URL('../../../', import.meta.url);
const TARGET = new URL('src/app/maps/[regionId]/mapMarkerSamples.ts', ROOT);
const SOURCE = JSON.parse(await readFile(new URL('./source.json', import.meta.url), 'utf8'));
const REVIEW = JSON.parse(await readFile(new URL('./review.json', import.meta.url), 'utf8'));
const IS_CHECK = process.argv.includes('--check');

const image = await readFile(new URL(SOURCE.image, ROOT));
if (createHash('sha256').update(image).digest('hex') !== SOURCE.imageSha256) {
  throw new Error('Map image changed; recheck terrain alignment before generating markers.');
}

function project(x, y) {
  const u = Number(x) * 2 ** SOURCE.zoom - SOURCE.origin[0];
  const v = -Number(y) * 2 ** SOURCE.zoom - SOURCE.origin[1];
  return SOURCE.transform.map(([a, b, c], index) => (a * u + b * v + c) / SOURCE.imageSize[index]);
}

const candidates = SOURCE.coordinateIndex
  .filter(([, x, y]) => project(x, y).every((value) => value >= 0 && value <= 1))
  .map(([id]) => id);
const sourceIds = SOURCE.markers.map(({ no }) => no);
const reviewedIds = Object.keys(REVIEW.descriptions);
for (const ids of [candidates, sourceIds, reviewedIds]) {
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate marker ID.');
  if (ids.length !== candidates.length || candidates.some((id) => !ids.includes(id))) {
    throw new Error('Candidate, source and description review ID sets must match.');
  }
}
for (const { replacedBy } of REVIEW.legacy) {
  if (!sourceIds.includes(replacedBy.replace('LSDL-', ''))) {
    throw new Error(`Missing replacement for legacy marker: ${replacedBy}`);
  }
}

const markers = SOURCE.markers.map((marker) => {
  const review = REVIEW.descriptions[marker.no];
  if (review.status !== 'reviewed' || !review.reason) {
    throw new Error(`Description not reviewed: ${marker.no}`);
  }
  const [x, y] = project(marker.x, marker.y);
  const result = {
    id: `LSDL-${marker.no}`,
    categories: SOURCE.filters
      .filter(({ codes }) => codes.includes(Number(marker.marker)))
      .map(({ name }) => name),
    name: marker.label || review.displayName || '이름 없는 마커',
    x: Number(x.toFixed(6)),
    y: Number(y.toFixed(6)),
  };
  if (review.loot) {
    result.loot = review.loot.map((item, index) => {
      if (item.quantity !== undefined && (!Number.isInteger(item.quantity) || item.quantity < 1)) {
        throw new Error(`Invalid quantity: ${marker.no}`);
      }
      return { id: `LSDL-${marker.no}-${index + 1}`, ...item };
    });
  }
  return result;
});

const before = await readFile(TARGET, 'utf8');
const start = before.search(/\/\/ (?:Smithbox CSV:|Weeping Peninsula:)/);
const end = before.indexOf('\n];', before.indexOf('const WEEPING_PENINSULA_MARKERS = [')) + 3;
if (start < 0 || end < start) throw new Error('Weeping Peninsula data block not found.');
const block = `// Weeping Peninsula: LSDL base-game map, checked ${SOURCE.checkedAt}; patch unspecified.
// Source, terrain alignment, description review and legacy CSV mapping:
// reference-data/maps/weeping-peninsula/{source.json,review.json,README.md}.
// Regenerate with node reference-data/maps/weeping-peninsula/generate.mjs.
const WEEPING_PENINSULA_MARKERS = ${JSON.stringify(markers, null, 2)};`;
const after = await prettier.format(before.slice(0, start) + block + before.slice(end), {
  ...(await prettier.resolveConfig(fileURLToPath(TARGET))),
  filepath: fileURLToPath(TARGET),
});
if (IS_CHECK) {
  if (before !== after) throw new Error('Generated map data is out of date.');
} else {
  await writeFile(TARGET, after);
}
console.log(
  `${IS_CHECK ? 'Verified' : 'Generated'} ${markers.length} markers, ` +
    `${markers.filter(({ loot }) => loot).length} loot lists, ` +
    `${markers.reduce((sum, { loot }) => sum + (loot?.length ?? 0), 0)} loot entries.`,
);
