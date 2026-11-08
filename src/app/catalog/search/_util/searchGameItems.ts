import type { TGameItemSearchEntry } from '@/api/gameItem/types';

const KOREAN_NAME_ORDER = new Intl.Collator('ko');

export function normalizeName(name: string) {
  return name.replace(/\s/g, '').normalize('NFC');
}

export function findMatches(entries: TGameItemSearchEntry[] | undefined, search: string) {
  if (!entries || !search) return [];

  return entries
    .flatMap((entry) => {
      const name = normalizeName(entry.name);
      const index = name.indexOf(search);
      if (index === -1) return [];

      const rank = name === search ? 0 : index === 0 ? 1 : 2;
      return [{ entry, rank }];
    })
    .sort(
      (a, b) =>
        a.rank - b.rank ||
        KOREAN_NAME_ORDER.compare(a.entry.name, b.entry.name) ||
        a.entry.id - b.entry.id,
    )
    .map(({ entry }) => entry);
}
