import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import prettier from 'prettier';

const ROOT = new URL('../../', import.meta.url);
const TARGET = new URL('src/app/maps/[regionId]/mapMarkerSamples.ts', ROOT);
const REGION = process.argv[2];
if (!REGION || REGION.startsWith('--')) throw new Error('Provide a region directory name.');
const CONSTANT = `${REGION.replaceAll('-', '_').toUpperCase()}_MARKERS`;
const SOURCE = JSON.parse(
  await readFile(new URL(`./${REGION}/source.json`, import.meta.url), 'utf8'),
);
const REVIEW = JSON.parse(
  await readFile(new URL(`./${REGION}/review.json`, import.meta.url), 'utf8'),
);
const IS_CHECK = process.argv.includes('--check');

const image = await readFile(new URL(SOURCE.image, ROOT));
if (createHash('sha256').update(image).digest('hex') !== SOURCE.imageSha256) {
  throw new Error('Map image changed; recheck terrain alignment before generating markers.');
}

function project(x, y) {
  const panels = SOURCE.panels ?? [SOURCE];
  const positions = panels.flatMap((panel) => {
    const u = Number(x) * 2 ** SOURCE.zoom - panel.origin[0];
    const v = -Number(y) * 2 ** SOURCE.zoom - panel.origin[1];
    const position = panel.transform.map(([a, b, c]) => a * u + b * v + c);
    const bounds = panel.bounds ?? [0, 0, ...SOURCE.imageSize];
    function isInside([left, top, right, bottom]) {
      return (
        position[0] >= left && position[0] <= right && position[1] >= top && position[1] <= bottom
      );
    }
    if (!isInside(bounds) || panel.excludeBounds?.some(isInside)) return [];
    return [position.map((value, index) => value / SOURCE.imageSize[index])];
  });
  if (positions.length > 1) throw new Error('Marker matches multiple map panels.');
  return positions[0];
}

const candidates = SOURCE.coordinateIndex.filter(([, x, y]) => project(x, y)).map(([id]) => id);
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
const declaration = `const ${CONSTANT} = `;
const start = before.indexOf(declaration);
const end = start < 0 ? -1 : before.indexOf('\n];', start) + 3;
if (start >= 0 && end <= start) throw new Error('Region data block not found.');
const block = `${declaration}${JSON.stringify(markers, null, 2)};`;
const insertion = before.indexOf('type TMapMarkerSample');
if (start < 0 && insertion < 0) throw new Error('Map data insertion point not found.');
const content =
  start >= 0
    ? before.slice(0, start) + block + before.slice(end)
    : before.slice(0, insertion) +
      `// LSDL base-game map, checked ${SOURCE.checkedAt}; patch unspecified.\n` +
      `// Source, terrain alignment and description review: reference-data/maps/${REGION}/.\n` +
      `// Regenerate: node reference-data/maps/generate.mjs ${REGION}.\n` +
      block +
      '\n\n' +
      before.slice(insertion);
const after = await prettier.format(content, {
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
