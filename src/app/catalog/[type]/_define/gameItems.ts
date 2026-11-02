import type { TGameItemType } from '@/api/gameItem/types';

export const GAME_ITEM_TYPES: Record<TGameItemType, string> = {
  weapon: '무기',
  armor: '방어구',
  talisman: '탈리스만',
  spirit_ash: '뼛가루',
  ash_of_war: '전회',
  spell: '마술·기도',
  crystal_tear: '물방울',
  other: '기타',
};
export const CONTENTS: Record<string, string> = {
  base_game: '본편',
  shadow_of_the_erdtree: '황금 나무의 그림자',
  tarnished_pack: '빛바랜 자 팩',
};

export const CATALOG_TYPES = {
  weapon: { label: '무기', gameItemType: 'weapon' },
  armor: { label: '방어구', gameItemType: 'armor' },
  talisman: { label: '탈리스만', gameItemType: 'talisman' },
  spirit_ash: { label: '뼛가루', gameItemType: 'spirit_ash' },
  ash_of_war: { label: '전회', gameItemType: 'ash_of_war' },
  spell: { label: '주문', gameItemType: 'spell' },
  crystal_tear: { label: '물방울', gameItemType: 'crystal_tear' },
  other: { label: '기타', gameItemType: 'other' },
} as const satisfies Record<string, { label: string; gameItemType: TGameItemType }>;

export type TCatalogType = keyof typeof CATALOG_TYPES;
