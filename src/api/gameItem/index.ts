import { getApiClient } from '@/api';
import type {
  TReqGetGameItems,
  TReqGetGameItemCategories,
  TResGetGameItems,
  TResGetGameItemCategories,
} from './types';

export async function getGameItems({
  search,
  type,
  categoryId,
  contentCode,
  signal,
}: TReqGetGameItems): Promise<TResGetGameItems> {
  const client = getApiClient();
  const request = client
    .from('game_items')
    .select(
      'id,name,type,image_url,content_code,game_description,effect_description,game_item_categories(name,sort_order),armor_details(*),talisman_details(*),spell_details(*),ash_of_war_details(native_affinity,applicable_armaments_text,weapon_skills(name,description,fp_cost_text)),weapon_details(*,weapon_skills(name,description,fp_cost_text),weapon_scalings(*))',
      { count: 'exact' },
    )
    .order('game_item_categories(sort_order)')
    .order('category_id')
    .order('sort_order')
    .order('id');

  if (search?.trim()) {
    const escapedSearch = search.trim().replace(/[\\%_]/g, '\\$&');
    request.ilike('name', `%${escapedSearch}%`);
  }
  request.eq('type', type).eq('category_id', categoryId);
  if (contentCode) request.eq('content_code', contentCode);
  if (signal) request.abortSignal(signal);

  const { data, count } = await request.throwOnError();

  return {
    gameItems: data.map((row) => {
      // 복합 외래키 관계는 배열로 응답하지만 game_item_id PK가 최대 한 행을 보장합니다.
      const weapon = row.weapon_details[0];
      const armor = row.armor_details[0];
      const talisman = row.talisman_details[0];
      const spell = row.spell_details[0];
      const ashOfWar = row.ash_of_war_details[0];

      return {
        id: row.id,
        name: row.name,
        type: row.type,
        imageUrl: row.image_url,
        contentCode: row.content_code,
        gameDescription: row.game_description,
        effectDescription: row.effect_description,
        talismanDetails: talisman ? { weight: talisman.weight } : null,
        spellDetails: spell
          ? {
              fpCostText: spell.fp_cost_text,
              slotsUsed: spell.slots_used,
              requiredIntelligence: spell.required_intelligence,
              requiredFaith: spell.required_faith,
              requiredArcane: spell.required_arcane,
            }
          : null,
        ashOfWarDetails: ashOfWar
          ? {
              nativeAffinity: ashOfWar.native_affinity,
              applicableArmamentsText: ashOfWar.applicable_armaments_text,
              weaponSkills: ashOfWar.weapon_skills
                ? {
                    name: ashOfWar.weapon_skills.name,
                    description: ashOfWar.weapon_skills.description,
                    fpCostText: ashOfWar.weapon_skills.fp_cost_text,
                  }
                : null,
            }
          : null,
        gameItemCategories: row.game_item_categories
          ? { name: row.game_item_categories.name }
          : null,
        armorDetails: armor
          ? {
              weight: armor.weight,
              poise: armor.poise,
              negationPhysical: armor.negation_physical,
              negationStrike: armor.negation_strike,
              negationSlash: armor.negation_slash,
              negationPierce: armor.negation_pierce,
              negationMagic: armor.negation_magic,
              negationFire: armor.negation_fire,
              negationLightning: armor.negation_lightning,
              negationHoly: armor.negation_holy,
              immunity: armor.immunity,
              robustness: armor.robustness,
              focus: armor.focus,
              vitality: armor.vitality,
            }
          : null,
        weaponDetails: weapon
          ? {
              gameItemId: weapon.game_item_id,
              type: weapon.type,
              weight: weapon.weight,
              physicalAttackTypes: weapon.physical_attack_types,
              upgradeMaterial: weapon.upgrade_material,
              defaultSkillId: weapon.default_skill_id,
              canChangeAffinity: weapon.can_change_affinity,
              attackPhysical: weapon.attack_physical,
              attackMagic: weapon.attack_magic,
              attackFire: weapon.attack_fire,
              attackLightning: weapon.attack_lightning,
              attackHoly: weapon.attack_holy,
              critical: weapon.critical,
              guardPhysical: weapon.guard_physical,
              guardMagic: weapon.guard_magic,
              guardFire: weapon.guard_fire,
              guardLightning: weapon.guard_lightning,
              guardHoly: weapon.guard_holy,
              guardBoost: weapon.guard_boost,
              requiredStrength: weapon.required_strength,
              requiredDexterity: weapon.required_dexterity,
              requiredIntelligence: weapon.required_intelligence,
              requiredFaith: weapon.required_faith,
              requiredArcane: weapon.required_arcane,
              bleed: weapon.bleed,
              frostbite: weapon.frostbite,
              poison: weapon.poison,
              scarletRot: weapon.scarlet_rot,
              sleep: weapon.sleep,
              madness: weapon.madness,
              weaponSkills: weapon.weapon_skills
                ? {
                    name: weapon.weapon_skills.name,
                    description: weapon.weapon_skills.description,
                    fpCostText: weapon.weapon_skills.fp_cost_text,
                  }
                : null,
              weaponScalings: weapon.weapon_scalings.map((scaling) => ({
                gameItemId: scaling.game_item_id,
                affinity: scaling.affinity,
                strength: scaling.strength,
                dexterity: scaling.dexterity,
                intelligence: scaling.intelligence,
                faith: scaling.faith,
                arcane: scaling.arcane,
              })),
            }
          : null,
      };
    }),
    totalCount: count ?? 0,
  };
}

export async function getGameItemCategories({
  signal,
}: TReqGetGameItemCategories = {}): Promise<TResGetGameItemCategories> {
  const client = getApiClient();
  const request = client
    .from('game_item_categories')
    .select('id,name,type')
    .order('type')
    .order('sort_order')
    .order('id');
  if (signal) request.abortSignal(signal);

  const { data } = await request.throwOnError();
  return data;
}
