-- 사용자 제공 유문 단검 설명과 PC Regulation 1.17.3 CSV(EquipParamWeapon ID 63500000).
-- 기본 등록은 기존 행을 보존하고, 보완 수치는 NULL인 칸만 채웁니다.
do $$
begin
  if not exists (
    select 1 from public.game_item_categories where type = 'weapon' and name = '투척검'
  ) then
    raise exception '투척검 분류를 먼저 등록해야 합니다.';
  end if;
  if (
    select count(*) from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '투척검' and i.name = '유문 단검'
  ) > 1 or (select count(*) from public.weapon_skills where name = '관통 투척') > 1 then
    raise exception '투척검 시드를 적용하기 전에 중복된 아이템·기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

insert into public.weapon_skills (name, description, fp_cost_text)
select '관통 투척', '무기에 세게 회전을 주어 투척하는 전투 기술.
투척한 무기는 평소보다 긴 거리를 날아가
적의 몸을 관통한다.', '8'
where not exists (select 1 from public.weapon_skills where name = '관통 투척');

insert into public.game_items (
  name, type, category_id, sort_order, content_code, game_description
)
select '유문 단검', 'weapon', c.id, 10, 'shadow_of_the_erdtree',
  '유문문자가 새겨진 단검.

질량을 줄여 단조술의 효과를 높였으며
모든 공격이 투척이 되는 투척검.
검은 손이 닿는 곳에서 순식간에 재생성된다.

전투 기술에 속성이 있는 전회를 사용할 수 없다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '투척검'
  and not exists (
    select 1 from public.game_items i
    where i.category_id = c.id and i.type = 'weapon' and i.name = '유문 단검'
  );

insert into public.weapon_details (
  game_item_id, type, default_skill_id, upgrade_material, can_change_affinity, sleep, madness
)
select i.id, 'weapon', k.id, 'smithing_stone', true, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_skills k on k.name = '관통 투척'
where i.type = 'weapon' and c.type = 'weapon' and c.name = '투척검' and i.name = '유문 단검'
on conflict (game_item_id) do nothing;

-- 표준 +25 기본 공격력과 가드 성능, 미강화 기본 상태 이상을 기록합니다.
update public.weapon_details d
set
  weight = coalesce(d.weight, 1.5),
  physical_attack_types = coalesce(d.physical_attack_types, array['pierce']::text[]),
  critical = coalesce(d.critical, 100),
  guard_physical = coalesce(d.guard_physical, 35),
  guard_magic = coalesce(d.guard_magic, 20),
  guard_fire = coalesce(d.guard_fire, 20),
  guard_lightning = coalesce(d.guard_lightning, 20),
  guard_holy = coalesce(d.guard_holy, 20),
  guard_boost = coalesce(d.guard_boost, 18),
  attack_physical = coalesce(d.attack_physical, 151),
  attack_magic = coalesce(d.attack_magic, 0),
  attack_fire = coalesce(d.attack_fire, 0),
  attack_lightning = coalesce(d.attack_lightning, 0),
  attack_holy = coalesce(d.attack_holy, 0),
  required_strength = coalesce(d.required_strength, 5),
  required_dexterity = coalesce(d.required_dexterity, 11),
  required_intelligence = coalesce(d.required_intelligence, 11),
  required_faith = coalesce(d.required_faith, 11),
  required_arcane = coalesce(d.required_arcane, 0),
  scarlet_rot = coalesce(d.scarlet_rot, 0),
  frostbite = coalesce(d.frostbite, 0),
  bleed = coalesce(d.bleed, 0),
  poison = coalesce(d.poison, 0)
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where d.game_item_id = i.id and i.type = 'weapon'
  and c.type = 'weapon' and c.name = '투척검' and i.name = '유문 단검';

with source (affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('standard', 'D', 'B', 'E', 'E', '-'),
  ('heavy', 'A', '-', 'E', 'E', '-'),
  ('keen', 'D', 'S', 'E', 'E', '-'),
  ('quality', 'B', 'B', 'E', 'E', '-'),
  ('fire', 'B', 'E', 'E', 'E', '-'),
  ('flame_art', 'E', 'D', 'E', 'B', '-'),
  ('lightning', 'E', 'B', 'E', 'E', '-'),
  ('sacred', 'E', 'D', 'E', 'B', '-'),
  ('magic', 'E', 'E', 'B', 'E', '-'),
  ('cold', 'D', 'B', 'B', 'E', '-'),
  ('poison', 'D', 'B', 'E', 'E', 'D'),
  ('blood', 'D', 'B', 'E', 'E', 'D'),
  ('occult', 'E', 'D', 'E', 'E', 'A')
)
insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '투척검'
join public.game_items i on i.category_id = c.id and i.type = 'weapon' and i.name = '유문 단검'
on conflict (game_item_id, affinity) do nothing;
