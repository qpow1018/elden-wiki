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
  fp_cost_text: string | null;
};

export type TWeaponScaling = {
  item_id: number;
  affinity: string;
  strength: string | null;
  dexterity: string | null;
  intelligence: string | null;
  faith: string | null;
  arcane: string | null;
};

export type TWeapon = {
  item_id: number;
  type: TItemType;
  weight: number | null;
  physical_attack_types: string[] | null;
  upgrade_material: string | null;
  default_skill_id: number | null;
  can_change_affinity: boolean | null;
  attack_physical: number | null;
  attack_magic: number | null;
  attack_fire: number | null;
  attack_lightning: number | null;
  attack_holy: number | null;
  critical: number | null;
  guard_physical: number | null;
  guard_magic: number | null;
  guard_fire: number | null;
  guard_lightning: number | null;
  guard_holy: number | null;
  guard_boost: number | null;
  required_strength: number | null;
  required_dexterity: number | null;
  required_intelligence: number | null;
  required_faith: number | null;
  required_arcane: number | null;
  bleed: number | null;
  frostbite: number | null;
  poison: number | null;
  scarlet_rot: number | null;
  weapon_skills: TWeaponSkill | null;
  weapon_scalings: TWeaponScaling[];
};

export type TEquipment = {
  id: number;
  name: string;
  type: TItemType;
  image_url: string | null;
  content_code: string;
  game_description: string | null;
  item_categories: {
    name: string;
  } | null;
  weapon_details: TWeapon | null;
};

export type TResGetEquipment = {
  items: TEquipment[];
  totalCount: number;
};
