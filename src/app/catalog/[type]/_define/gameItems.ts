import type { TGameItemType } from '@/api/gameItem/types';

export const GAME_ITEM_TYPES: Record<TGameItemType, string> = {
  weapon: '무기',
  armor: '방어구',
  talisman: '탈리스만',
  spirit_ash: '뼛가루',
  ash_of_war: '전회',
  spell: '마술·기도',
  gesture: '제스처',
  crystal_tear: '결정 물방울',
};
export const CONTENTS: Record<string, string> = {
  base_game: '본편',
  shadow_of_the_erdtree: '황금 나무의 그림자',
  tarnished_pack: '빛바랜 자 팩',
};

export function isGameItemType(value: string): value is TGameItemType {
  return Object.hasOwn(GAME_ITEM_TYPES, value);
}
