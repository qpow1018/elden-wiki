-- 사용자 제공 역수검 4종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '역수검') then
    raise exception '역수검 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '역수검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('사각에서의 일격', '재앙의 춤')
    group by name, description having count(*) > 1
  ) then
    raise exception '역수검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('사각에서의 일격', '적의 품의 낮은 위치로 뛰어들어
측면 사각에서 칼날로 찌르는 전투 기술.
뛰어드는 방향은 좌우로 제어할 수 있으며
그 공격은 가드의 틈을 파고든다.', '9 ( - / - )'),
  ('재앙의 춤', '양손에 원형 칼날을 들고
격렬한 회전으로 적을 베는 전투 기술.
추가 입력으로 예리한 내려차기로 이을 수 있다.', '15 ( - / 8 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and (s.name = '킥' or k.description = s.description));

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('역날 곡검', 10, 'tarnished_pack', '역수로 들고 휘두르는 곡검. 역수검.
숨겨진 그림자의 땅에서 유래했다고 한다.

몸을 회전시키며 베는 참격과
도려내는 듯한 찌르기가 특징이다.', null),
  ('역수검', 20, 'shadow_of_the_erdtree', '역수로 들고 사용하는 곡검.
예부터 뿔인간들에게 전해지는 무기 종류.

그 검술은 위험한 춤과 비슷하다.', null),
  ('유문 차크람', 30, 'shadow_of_the_erdtree', '유문문자가 새겨진 원형 칼날의 역수검.
단조술에 의한 투척 무기 중 하나.

강 공격으로 역수검을 투척하며
이는 휘어진 궤도로 날아간다.

전투 기술에 속성이 있는 전회를 사용할 수 없다.', null),
  ('주검사의 차크람', 40, 'shadow_of_the_erdtree', '가면 쓴 주검사들의 무기.
일렁이는 원형 검은 칼날을 지닌 역수검.
그 모서리는 날카로워서 출혈을 일으킨다.

과거에는 제구로 쓰였으며
토지신이 되려 한 수행자가
극기의 무용에 사용했다고 헌다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '역수검'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('역날 곡검', '사각에서의 일격', 3.0, '참격 / 관통', 'smithing_stone', true, 281, 0, 0, 0, 0, 37.0, 28.0, 28.0, 28.0, 28.0, 100, 15, 0, 0, 0, 0, 0, 0, 9, 11, 0, 0, 0),
  ('역수검', '사각에서의 일격', 2.0, '참격 / 관통', 'smithing_stone', true, 257, 0, 0, 0, 0, 40.0, 30.0, 30.0, 30.0, 30.0, 100, 18, 0, 0, 0, 0, 0, 0, 10, 13, 0, 0, 0),
  ('유문 차크람', '사각에서의 일격', 2.0, '참격', 'smithing_stone', true, 245, 0, 0, 0, 0, 40.0, 30.0, 30.0, 30.0, 30.0, 100, 30, 0, 0, 0, 0, 0, 0, 9, 14, 11, 11, 0),
  ('주검사의 차크람', '재앙의 춤', 4.5, '참격', 'somber_smithing_stone', false, 264, 0, 0, 0, 0, 55.0, 39.0, 39.0, 39.0, 39.0, 100, null, 0, 0, 45, 0, 0, 0, 9, 22, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '역수검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('역날 곡검', 'standard', 'D', 'C', '-', '-', '-'),
  ('역날 곡검', 'heavy', 'B', '-', '-', '-', '-'),
  ('역날 곡검', 'keen', 'E', 'B', '-', '-', '-'),
  ('역날 곡검', 'quality', 'C', 'C', '-', '-', '-'),
  ('역날 곡검', 'fire', 'C', 'E', '-', '-', '-'),
  ('역날 곡검', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('역날 곡검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('역날 곡검', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('역날 곡검', 'magic', 'E', 'E', 'B', '-', '-'),
  ('역날 곡검', 'cold', 'C', 'B', 'C', '-', '-'),
  ('역날 곡검', 'poison', 'D', 'C', '-', '-', 'D'),
  ('역날 곡검', 'blood', 'D', 'C', '-', '-', 'D'),
  ('역날 곡검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('역수검', 'standard', 'C', 'C', '-', '-', '-'),
  ('역수검', 'heavy', 'A', '-', '-', '-', '-'),
  ('역수검', 'keen', 'D', 'S', '-', '-', '-'),
  ('역수검', 'quality', 'B', 'B', '-', '-', '-'),
  ('역수검', 'fire', 'B', 'E', '-', '-', '-'),
  ('역수검', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('역수검', 'lightning', 'E', 'B', '-', '-', '-'),
  ('역수검', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('역수검', 'magic', 'E', 'E', 'B', '-', '-'),
  ('역수검', 'cold', 'C', 'B', 'B', '-', '-'),
  ('역수검', 'poison', 'C', 'B', '-', '-', 'D'),
  ('역수검', 'blood', 'C', 'B', '-', '-', 'D'),
  ('역수검', 'occult', 'D', 'D', '-', '-', 'A'),
  ('유문 차크람', 'standard', 'D', 'C', 'E', 'E', '-'),
  ('유문 차크람', 'heavy', 'A', '-', 'E', 'E', '-'),
  ('유문 차크람', 'keen', 'D', 'S', 'E', 'E', '-'),
  ('유문 차크람', 'quality', 'B', 'B', 'E', 'E', '-'),
  ('유문 차크람', 'fire', 'B', 'E', 'E', 'E', '-'),
  ('유문 차크람', 'flame_art', 'E', 'D', 'E', 'B', '-'),
  ('유문 차크람', 'lightning', 'E', 'B', 'E', 'E', '-'),
  ('유문 차크람', 'sacred', 'E', 'D', 'E', 'B', '-'),
  ('유문 차크람', 'magic', 'E', 'E', 'B', 'E', '-'),
  ('유문 차크람', 'cold', 'D', 'C', 'B', 'E', '-'),
  ('유문 차크람', 'poison', 'C', 'C', 'E', 'E', 'D'),
  ('유문 차크람', 'blood', 'C', 'C', 'E', 'E', 'D'),
  ('유문 차크람', 'occult', 'E', 'D', 'E', 'E', 'A'),
  ('주검사의 차크람', 'standard', 'D', 'B', '-', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '역수검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
