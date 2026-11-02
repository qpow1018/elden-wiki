import type { TItemType } from '@/api/equipment/types';

export const ITEM_TYPES: Record<TItemType, string> = {
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

export function isItemType(value: string): value is TItemType {
  return Object.hasOwn(ITEM_TYPES, value);
}
