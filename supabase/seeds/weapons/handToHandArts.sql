-- 사용자 제공 격투 2종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '격투') then
    raise exception '격투 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '격투'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('발경')
    group by name having count(*) > 1
  ) then
    raise exception '격투 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;


insert into public.weapon_skills (name, description, fp_cost_text)
select '발경', '낙엽파라 불리는 구도자들의 전투 기술.
기를 담은 손바닥을 내지른 뒤 폭발시킨다.
위력도 충격도 크며 차지공격으로 강화된다.', '14 ( - / - )'
where not exists (select 1 from public.weapon_skills where name = '발경');

with source (name, sort_order, game_description) as (
  values
  ('낙엽 격투', 10, '무기를 들지 않고 싸우는 격투술 중 하나.
손바닥치기와 발차기를 조합한 무술.

낙엽파라 불리는 구도자들의 기술이며
무와 예를 인정받는 자에게만 전승된다.
그것은 금욕적인 수행의 시작이기도 하다.'),
  ('단류 발차기술', 20, '무기를 들지 않고 싸우는 격투술 중 하나.
발차기가 중심인 무술.

레다의 맹우, 낙엽의 단의 기술.
폭포수를 맞고 몸을 던져가며 체득한
단만의 독자적인 발차기 기술.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description)
select s.name, 'weapon', c.id, s.sort_order, 'shadow_of_the_erdtree', s.game_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '격투'
where not exists (select 1 from public.game_items i where i.category_id = c.id and i.type = 'weapon' and i.name = s.name);

with source (name, weight, attack_physical, critical, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, guard_boost) as (
  values
  ('낙엽 격투', 1.0, 196, 100, 35.0, 20.0, 20.0, 20.0, 20.0, 24),
  ('단류 발차기술', null, 210, null, null, null, null, null, null, null)
)
insert into public.weapon_details (
  game_item_id, type, default_skill_id, upgrade_material, can_change_affinity,
  weight, physical_attack_types, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy,
  critical, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, guard_boost,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane,
  scarlet_rot, frostbite, bleed, poison, sleep, madness
)
select i.id, 'weapon', k.id, 'smithing_stone', true,
  s.weight, case when s.name = '낙엽 격투' then array['strike']::text[] else null end,
  s.attack_physical, 0, 0, 0, 0,
  s.critical, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.guard_boost,
  8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '격투'
join public.game_items i on i.category_id = c.id and i.type = 'weapon' and i.name = s.name
join public.weapon_skills k on k.name = '발경'
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('낙엽 격투', 'standard', 'C', 'C', '-', '-', '-'),
  ('낙엽 격투', 'heavy', 'A', '-', '-', '-', '-'),
  ('낙엽 격투', 'keen', 'E', 'B', '-', '-', '-'),
  ('낙엽 격투', 'quality', 'B', 'B', '-', '-', '-'),
  ('낙엽 격투', 'fire', 'C', 'E', '-', '-', '-'),
  ('낙엽 격투', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('낙엽 격투', 'lightning', 'E', 'C', '-', '-', '-'),
  ('낙엽 격투', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('낙엽 격투', 'magic', 'E', 'E', 'B', '-', '-'),
  ('낙엽 격투', 'cold', 'C', 'C', 'B', '-', '-'),
  ('낙엽 격투', 'poison', 'C', 'C', '-', '-', 'D'),
  ('낙엽 격투', 'blood', 'C', 'C', '-', '-', 'D'),
  ('낙엽 격투', 'occult', 'D', 'D', '-', '-', 'B'),
  ('단류 발차기술', 'standard', 'C', 'C', '-', '-', '-'),
  ('단류 발차기술', 'heavy', 'A', '-', '-', '-', '-'),
  ('단류 발차기술', 'keen', 'E', 'B', '-', '-', '-'),
  ('단류 발차기술', 'quality', 'B', 'B', '-', '-', '-'),
  ('단류 발차기술', 'fire', 'C', 'E', '-', '-', '-'),
  ('단류 발차기술', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('단류 발차기술', 'lightning', 'E', 'C', '-', '-', '-'),
  ('단류 발차기술', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('단류 발차기술', 'magic', 'E', 'E', 'B', '-', '-'),
  ('단류 발차기술', 'cold', 'C', 'C', 'B', '-', '-'),
  ('단류 발차기술', 'poison', 'C', 'C', '-', '-', 'D'),
  ('단류 발차기술', 'blood', 'C', 'C', '-', '-', 'D'),
  ('단류 발차기술', 'occult', 'D', 'D', '-', '-', 'B')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '격투'
join public.game_items i on i.category_id = c.id and i.type = 'weapon' and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
