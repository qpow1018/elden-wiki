-- 사용자 제공 대형 도 4종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '대형 도') then
    raise exception '대형 도 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '대형 도'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('대상단','용상 베기','풀베기')
    group by name, description having count(*) > 1
  ) then
    raise exception '대형 도 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('대상단', '머리 위로 높게 검을 올리는 전투 기술.
일반 공격은 파고들며 내려 베기,
강 공격은 연속 내려 베기로 파생한다.', '- ( 8 / 10 )'),
  ('용상 베기', '거대한 용을 사냥하기 위한 전투 기술.
조약돌 역가시에 기를 두른 뒤 도약해
높은 위치에서 기세를 실어 내려 벤다.
차지 공격 시 두른 기를 함께 방출한다.', '18 ( - / - )'),
  ('풀베기', '크게 검을 휘둘러 사람을 베는 전투 기술.
추가 입력으로 공격을 계속할 수 있으며
스태미나가 다할 때까지 이어진다.', '8 ( - / 8 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('갈대의 대형 도', 10, 'tarnished_pack', '무겁고 긴 도신을 지닌 대형 도.
갈대의 땅 무사들의 독특한 무기 중 하나.

전신을 써서 휘두르는 공세의 무기이며
그 참격은 상대에게 출혈을 유발한다.', null),
  ('대도', 20, 'shadow_of_the_erdtree', '칼날에 무늬가 떠오르는, 검은 도신의 대형 도.
갈대의 땅 무사들이 쓰는 독특한 무기 중에서도
잘 연단된 질 좋은 물건.

전신을 써서 휘두르는 공세의 무기이며
그 참격은 상대에게 출혈을 유발한다.', null),
  ('용 사냥꾼의 대도', 30, 'shadow_of_the_erdtree', '도신에 조약돌 가시가 있는 대형 도.
용굴의 고룡인이 사용하는 무기.

용에 대한 특효가 있다.

고룡인은 과거에 용찬의 전사 중 하나였으며
폭룡을 먹을 수 있을 전사를 선별하고 있었다.', '비룡형 적에게 30%, 고룡형 적에게 15%의 추가 대미지를 준다. 용왕 플라키두삭스에게는 적용되지 않는다.'),
  ('나찰의 대도', 40, 'shadow_of_the_erdtree', '인문을 피의 붉은 색으로 물들인 대형 도.
사람을 베고 먹어치우는 나찰의 무기.

살을 베고 뼈를 끊는 미친 공세의 무기이며
공격 중 반격에 잘 움츠러들지 않게 되지만
받는 대미지도 커진다.', '공격 중 반격에 잘 움츠러들지 않지만 받는 대미지도 증가한다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 도'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('갈대의 대형 도', '대상단', 10.0, '참격 / 관통', 'smithing_stone', true, 387, 0, 0, 0, 0, 57.0, 28.0, 28.0, 28.0, 28.0, 100, 39, 0, 0, 55, 0, 0, 0, 11, 16, 0, 0, 0),
  ('대도', '대상단', 9.0, '참격 / 관통', 'smithing_stone', true, 355, 0, 0, 0, 0, 60.0, 30.0, 30.0, 30.0, 30.0, 100, 42, 0, 0, 55, 0, 0, 0, 14, 18, 0, 0, 0),
  ('용 사냥꾼의 대도', '용상 베기', 10.5, '참격 / 관통', 'somber_smithing_stone', false, 372, 0, 0, 0, 0, 69.0, 32.0, 32.0, 32.0, 32.0, 100, 40, 0, 0, 55, 0, 0, 0, 15, 20, 0, 0, 0),
  ('나찰의 대도', '풀베기', 9.5, '참격 / 관통', 'somber_smithing_stone', false, 379, 0, 0, 0, 0, 53.0, 24.0, 24.0, 24.0, 24.0, 100, 38, 0, 0, 55, 0, 0, 0, 12, 27, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 도'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('갈대의 대형 도', 'standard', 'D', 'D', '-', '-', '-'),
  ('갈대의 대형 도', 'heavy', 'B', '-', '-', '-', '-'),
  ('갈대의 대형 도', 'keen', 'E', 'B', '-', '-', '-'),
  ('갈대의 대형 도', 'quality', 'C', 'C', '-', '-', '-'),
  ('갈대의 대형 도', 'fire', 'D', 'E', '-', '-', '-'),
  ('갈대의 대형 도', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('갈대의 대형 도', 'lightning', 'E', 'D', '-', '-', '-'),
  ('갈대의 대형 도', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('갈대의 대형 도', 'magic', 'E', 'E', 'C', '-', '-'),
  ('갈대의 대형 도', 'cold', 'D', 'C', 'C', '-', '-'),
  ('갈대의 대형 도', 'poison', 'D', 'C', '-', '-', 'D'),
  ('갈대의 대형 도', 'blood', 'D', 'C', '-', '-', 'D'),
  ('갈대의 대형 도', 'occult', 'E', 'E', '-', '-', 'C'),
  ('대도', 'standard', 'D', 'C', '-', '-', '-'),
  ('대도', 'heavy', 'B', '-', '-', '-', '-'),
  ('대도', 'keen', 'E', 'B', '-', '-', '-'),
  ('대도', 'quality', 'B', 'B', '-', '-', '-'),
  ('대도', 'fire', 'C', 'E', '-', '-', '-'),
  ('대도', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('대도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('대도', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('대도', 'magic', 'E', 'E', 'C', '-', '-'),
  ('대도', 'cold', 'D', 'C', 'C', '-', '-'),
  ('대도', 'poison', 'D', 'C', '-', '-', 'D'),
  ('대도', 'blood', 'D', 'C', '-', '-', 'D'),
  ('대도', 'occult', 'E', 'D', '-', '-', 'B'),
  ('용 사냥꾼의 대도', 'standard', 'C', 'C', '-', '-', '-'),
  ('나찰의 대도', 'standard', 'D', 'B', '-', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 도'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
