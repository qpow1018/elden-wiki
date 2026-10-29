export type TItemType =
  'spirit_ash' | 'ash_of_war' | 'weapon' | 'armor' | 'talisman' | 'spell' | 'gesture';

export type TReqGetEquipment = {
  page: number;
  pageSize: number;
  search?: string;
  type?: TItemType;
  categoryId?: number;
  contentCode?: string;
  signal?: AbortSignal;
};

export type TReqGetEquipmentCategories = {
  signal?: AbortSignal;
};

export type TEquipmentCategory = {
  id: number;
  name: string;
  type: TItemType;
};

export type TResGetEquipmentCategories = TEquipmentCategory[];

export type TWeaponSkill = {
  name: string;
  description: string | null;
  fpCostText: string | null;
};

export type TWeaponScaling = {
  itemId: number;
  affinity: string;
  strength: string | null;
  dexterity: string | null;
  intelligence: string | null;
  faith: string | null;
  arcane: string | null;
};

export type TWeapon = {
  itemId: number;
  type: TItemType;
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
  weaponSkills: TWeaponSkill | null;
  weaponScalings: TWeaponScaling[];
};

export type TEquipment = {
  id: number;
  name: string;
  type: TItemType;
  imageUrl: string | null;
  contentCode: string;
  gameDescription: string | null;
  itemCategories: {
    name: string;
  } | null;
  weaponDetails: TWeapon | null;
};

export type TResGetEquipment = {
  items: TEquipment[];
  totalCount: number;
};
