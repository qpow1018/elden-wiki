import type { TGameItemType } from '@/api/gameItem/types';

export const GAME_ITEM_TYPES = {
  weapon: '무기',
  catalyst: '촉매',
  other_weapon: '기타 무기',
  armor: '방어구',
  talisman: '탈리스만',
  spirit_ash: '뼛가루',
  ash_of_war: '전회',
  spell: '주문',
  crystal_tear: '물방울',
  other: '아이템',
} as const satisfies Record<TGameItemType, string>;
export const CONTENTS = {
  base_game: '본편',
  shadow_of_the_erdtree: '황금 나무의 그림자',
  tarnished_pack: '빛바랜 자 에디션',
} as const;
export const AFFINITIES = {
  standard: '표준',
  heavy: '중후',
  keen: '예리',
  quality: '상질',
  magic: '마력',
  fire: '화염',
  flame_art: '화염술',
  lightning: '벼락',
  sacred: '신성',
  poison: '독',
  blood: '피',
  cold: '냉기',
  occult: '신비',
} as const;
export const ATTRIBUTES = {
  strength: '근력',
  dexterity: '기량',
  intelligence: '지력',
  faith: '신앙',
  arcane: '신비',
} as const;
export const ELEMENTS = {
  physical: '물리',
  magic: '마력',
  fire: '화염',
  lightning: '벼락',
  holy: '신성',
} as const;
export const STATUS_EFFECTS = {
  bleed: '출혈',
  frostbite: '동상',
  poison: '독',
  scarletRot: '붉은 부패',
  sleep: '수면',
  madness: '발광',
} as const;
export const ATTACK_TYPES = {
  standard: '표준',
  slash: '참격',
  strike: '타격',
  pierce: '관통',
} as const;
export const UPGRADE_MATERIALS = {
  smithing_stone: '단석',
  somber_smithing_stone: '색 잃은 단석',
  none: '강화 불가',
} as const;
