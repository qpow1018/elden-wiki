export type TGameItemType =
  | 'spirit_ash'
  | 'ash_of_war'
  | 'weapon'
  | 'catalyst'
  | 'other_weapon'
  | 'armor'
  | 'talisman'
  | 'spell'
  | 'other'
  | 'crystal_tear';

export type TGameItemSearchEntry = {
  id: number;
  name: string;
  type: TGameItemType;
  categoryId: number;
  categoryName: string | null;
};

export type TReqGetGameItems = {
  search?: string;
  type: TGameItemType;
  categoryId: number;
  contentCode?: string;
  signal?: AbortSignal;
};

export type TReqGetGameItemCategories = {
  signal?: AbortSignal;
};

export type TGameItemCategory = {
  id: number;
  name: string;
  type: TGameItemType;
};

export type TResGetGameItemCategories = TGameItemCategory[];

export type TWeaponSkill = {
  name: string;
  description: string | null;
  fpCostText: string | null;
};

export type TWeaponScaling = {
  gameItemId: number;
  affinity: string;
  strength: string | null;
  dexterity: string | null;
  intelligence: string | null;
  faith: string | null;
  arcane: string | null;
};

export type TWeapon = {
  gameItemId: number;
  type: TGameItemType;
  weight: number | null;
  physicalAttackTypes: string[] | null;
  upgradeMaterial: string | null;
  defaultSkillId: number | null;
  canChangeAffinity: boolean | null;
  attackPhysical: number | null;
  attackMagic: number | null;
  attackFire: number | null;
  attackLightning: number | null;
  attackHoly: number | null;
  critical: number | null;
  guardPhysical: number | null;
  guardMagic: number | null;
  guardFire: number | null;
  guardLightning: number | null;
  guardHoly: number | null;
  guardBoost: number | null;
  requiredStrength: number | null;
  requiredDexterity: number | null;
  requiredIntelligence: number | null;
  requiredFaith: number | null;
  requiredArcane: number | null;
  bleed: number | null;
  frostbite: number | null;
  poison: number | null;
  scarletRot: number | null;
  sleep: number | null;
  madness: number | null;
  weaponSkills: TWeaponSkill | null;
  weaponScalings: TWeaponScaling[];
};

export type TArmor = {
  weight: number | null;
  poise: number | null;
  negationPhysical: number | null;
  negationStrike: number | null;
  negationSlash: number | null;
  negationPierce: number | null;
  negationMagic: number | null;
  negationFire: number | null;
  negationLightning: number | null;
  negationHoly: number | null;
  immunity: number | null;
  robustness: number | null;
  focus: number | null;
  vitality: number | null;
};

export type TTalisman = {
  weight: number | null;
};

export type TSpell = {
  fpCostText: string | null;
  slotsUsed: number | null;
  requiredIntelligence: number | null;
  requiredFaith: number | null;
  requiredArcane: number | null;
};

export type TAshOfWar = {
  nativeAffinity: string | null;
  applicableArmamentsText: string | null;
  weaponSkills: TWeaponSkill | null;
};

export type TGameItem = {
  id: number;
  name: string;
  type: TGameItemType;
  imageUrl: string | null;
  contentCode: string;
  gameDescription: string | null;
  effectDescription: string | null;
  gameItemCategories: {
    name: string;
  } | null;
  weaponDetails: TWeapon | null;
  armorDetails: TArmor | null;
  talismanDetails: TTalisman | null;
  spellDetails: TSpell | null;
  spiritAshDetails: { fpCost: number; hpCost: number } | null;
  ashOfWarDetails: TAshOfWar | null;
};

export type TResGetGameItems = {
  gameItems: TGameItem[];
  totalCount: number;
};
