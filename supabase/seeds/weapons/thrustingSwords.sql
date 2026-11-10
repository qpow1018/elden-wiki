-- 사용자 제공 자검 8종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '자검') then
    raise exception '자검 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '자검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('관통 찌르기', '연속 찌르기')
    group by name, description having count(*) > 1
  ) then
    raise exception '자검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('관통 찌르기', '관통 무기로 방패와 대치하기 위한 전투 기술.
힘을 모아 크게 파고들며 강렬하게 찔러
방패의 가드를 정면으로 뚫는다.', '9 ( - / - )'),
  ('연속 찌르기', '몸을 회전시키고, 이어서
단숨에 연속으로 찌르는 전투 기술.', '7 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and (s.name = '킥' or k.description = s.description));

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('레이피어', 10, 'base_game', '검신이 가늘고 예리한 자검.
찌르는 공격에 적절하며
방패를 든 채로 공격할 수도 있다.

자검치고는 소형이며 재빠른 연속 공격이
가능하지만 칼날이 없어 참격은 불가능하다.', null),
  ('에스톡', 20, 'base_game', '길고 단단한 검신을 지닌 큰 자검.
칼날로 베듯이 사용할 수도 있다.

무기의 크기에 비해
그 검술은 날카롭고 빠르며 빈틈도 작다.', null),
  ('귀인의 에스톡', 30, 'base_game', '헤매는 귀인들의 에스톡.
다루기 쉬움을 중시한 무기.

전체가 금으로 장식되어
종종 고가에 거래된다.', null),
  ('귀부기사의 검', 40, 'base_game', '미켈라의 칼날 말레니아와 함께 싸운
귀부기사들의 자검.

주로 긴 자루 무기와 조합하여
보조적으로 사용되었다.', null),
  ('로지에르의 자검', 50, 'base_game', '섬세하게 장식된 질 좋은 자검.
마술사 로지에르의 무기.

능숙하게 다루려면 높은 기량이 필요하나
연속 공격에 뛰어나 물 흐르는 듯 화려하다.', null),
  ('개미가시 레이피어', 60, 'base_game', '큰 개미의 가시를 칼날 삼은 레이피어.
붉은 부패의 독이 뚝뚝 떨어진다.

붉은 부패는 사라진 옛 신화이며
그늘성의 멀레이 마레는 그 은밀한 신봉자였다.
그리고 그만의 여신을 찾아낸 것이다.', null),
  ('빙결의 침', 70, 'base_game', '얼음 침의 칼날을 지닌 자검.
카리아 왕가의 대장장이 이지가 만들었다.

동상 상태 이상 효과가 있으며
강 공격으로 얼음 칼날을 쏠 수 있다.
(칼날은 곧바로 다시 만들어진다.)', null),
  ('카리아의 마술검', 80, 'shadow_of_the_erdtree', '카리아 왕가의 휘석검 중 하나.
가는 칼날을 지닌 소형 자검.

마술', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '자검'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('레이피어', '관통 찌르기', 2.5, '표준 / 관통', 'smithing_stone', true, 235, 0, 0, 0, 0, 45.0, 30.0, 30.0, 30.0, 30.0, 130, 24, 0, 0, 0, 0, 0, 0, 7, 12, 0, 0, 0),
  ('에스톡', '관통 찌르기', 4.5, '표준 / 관통', 'smithing_stone', true, 262, 0, 0, 0, 0, 54.0, 36.0, 36.0, 36.0, 36.0, 100, 28, 0, 0, 0, 0, 0, 0, 11, 13, 0, 0, 0),
  ('귀인의 에스톡', '관통 찌르기', 3.5, '표준 / 관통', 'smithing_stone', true, 254, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 100, 26, 0, 0, 0, 0, 0, 0, 9, 10, 0, 0, 0),
  ('귀부기사의 검', '관통 찌르기', 4.0, '표준 / 관통', 'smithing_stone', true, 267, 0, 0, 0, 0, 51.0, 34.0, 34.0, 34.0, 34.0, 100, 27, 0, 0, 0, 0, 0, 0, 11, 13, 0, 0, 0),
  ('로지에르의 자검', '연속 찌르기', 3.5, '표준 / 관통', 'smithing_stone', true, 227, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 110, 26, 0, 0, 0, 0, 0, 0, 8, 17, 0, 0, 0),
  ('개미가시 레이피어', '관통 찌르기', 3.0, '표준 / 관통', 'smithing_stone', true, 240, 0, 0, 0, 0, 47.0, 31.0, 31.0, 31.0, 31.0, 100, 25, 55, 0, 0, 0, 0, 0, 10, 20, 0, 0, 0),
  ('빙결의 침', '관통 찌르기', 2.5, '표준 / 관통', 'somber_smithing_stone', false, 242, 0, 0, 0, 0, 40.0, 40.0, 28.0, 28.0, 28.0, 100, 22, 0, 60, 0, 0, 0, 0, 11, 18, 0, 0, 0),
  ('카리아의 마술검', '관통 찌르기', 2.5, '표준 / 관통', 'smithing_stone', false, 72, 131, 0, 0, 0, 34, 48, 24, 24, 24, 110, 22, 0, 0, 0, 0, 0, 0, 10, 19, 16, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '자검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('레이피어', 'standard', 'D', 'B', '-', '-', '-'),
  ('레이피어', 'heavy', 'B', '-', '-', '-', '-'),
  ('레이피어', 'keen', 'E', 'A', '-', '-', '-'),
  ('레이피어', 'quality', 'B', 'B', '-', '-', '-'),
  ('레이피어', 'fire', 'C', 'E', '-', '-', '-'),
  ('레이피어', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('레이피어', 'lightning', 'E', 'C', '-', '-', '-'),
  ('레이피어', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('레이피어', 'magic', 'E', 'E', 'B', '-', '-'),
  ('레이피어', 'cold', 'D', 'B', 'C', '-', '-'),
  ('레이피어', 'poison', 'D', 'B', '-', '-', 'D'),
  ('레이피어', 'blood', 'D', 'B', '-', '-', 'D'),
  ('레이피어', 'occult', 'E', 'D', '-', '-', 'B'),
  ('에스톡', 'standard', 'E', 'B', '-', '-', '-'),
  ('에스톡', 'heavy', 'B', '-', '-', '-', '-'),
  ('에스톡', 'keen', 'E', 'B', '-', '-', '-'),
  ('에스톡', 'quality', 'B', 'B', '-', '-', '-'),
  ('에스톡', 'fire', 'C', 'E', '-', '-', '-'),
  ('에스톡', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('에스톡', 'lightning', 'E', 'C', '-', '-', '-'),
  ('에스톡', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('에스톡', 'magic', 'E', 'E', 'C', '-', '-'),
  ('에스톡', 'cold', 'E', 'B', 'D', '-', '-'),
  ('에스톡', 'poison', 'E', 'B', '-', '-', 'D'),
  ('에스톡', 'blood', 'E', 'B', '-', '-', 'D'),
  ('에스톡', 'occult', 'E', 'D', '-', '-', 'B'),
  ('귀인의 에스톡', 'standard', 'D', 'D', '-', '-', '-'),
  ('귀인의 에스톡', 'heavy', 'B', '-', '-', '-', '-'),
  ('귀인의 에스톡', 'keen', 'E', 'B', '-', '-', '-'),
  ('귀인의 에스톡', 'quality', 'B', 'B', '-', '-', '-'),
  ('귀인의 에스톡', 'fire', 'C', 'E', '-', '-', '-'),
  ('귀인의 에스톡', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('귀인의 에스톡', 'lightning', 'E', 'C', '-', '-', '-'),
  ('귀인의 에스톡', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('귀인의 에스톡', 'magic', 'E', 'E', 'C', '-', '-'),
  ('귀인의 에스톡', 'cold', 'C', 'C', 'C', '-', '-'),
  ('귀인의 에스톡', 'poison', 'C', 'C', '-', '-', 'D'),
  ('귀인의 에스톡', 'blood', 'C', 'C', '-', '-', 'D'),
  ('귀인의 에스톡', 'occult', 'E', 'E', '-', '-', 'B'),
  ('귀부기사의 검', 'standard', 'C', 'D', '-', '-', '-'),
  ('귀부기사의 검', 'heavy', 'B', '-', '-', '-', '-'),
  ('귀부기사의 검', 'keen', 'E', 'B', '-', '-', '-'),
  ('귀부기사의 검', 'quality', 'B', 'B', '-', '-', '-'),
  ('귀부기사의 검', 'fire', 'C', 'E', '-', '-', '-'),
  ('귀부기사의 검', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('귀부기사의 검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('귀부기사의 검', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('귀부기사의 검', 'magic', 'E', 'E', 'C', '-', '-'),
  ('귀부기사의 검', 'cold', 'C', 'D', 'C', '-', '-'),
  ('귀부기사의 검', 'poison', 'C', 'D', '-', '-', 'D'),
  ('귀부기사의 검', 'blood', 'C', 'D', '-', '-', 'D'),
  ('귀부기사의 검', 'occult', 'D', 'E', '-', '-', 'B'),
  ('로지에르의 자검', 'standard', 'E', 'B', '-', '-', '-'),
  ('로지에르의 자검', 'heavy', 'A', '-', '-', '-', '-'),
  ('로지에르의 자검', 'keen', 'E', 'A', '-', '-', '-'),
  ('로지에르의 자검', 'quality', 'B', 'B', '-', '-', '-'),
  ('로지에르의 자검', 'fire', 'C', 'E', '-', '-', '-'),
  ('로지에르의 자검', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('로지에르의 자검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('로지에르의 자검', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('로지에르의 자검', 'magic', 'E', 'D', 'B', '-', '-'),
  ('로지에르의 자검', 'cold', 'E', 'B', 'C', '-', '-'),
  ('로지에르의 자검', 'poison', 'D', 'B', '-', '-', 'D'),
  ('로지에르의 자검', 'blood', 'D', 'B', '-', '-', 'D'),
  ('로지에르의 자검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('개미가시 레이피어', 'standard', 'D', 'C', '-', '-', '-'),
  ('개미가시 레이피어', 'heavy', 'B', '-', '-', '-', '-'),
  ('개미가시 레이피어', 'keen', 'E', 'B', '-', '-', '-'),
  ('개미가시 레이피어', 'quality', 'B', 'B', '-', '-', '-'),
  ('개미가시 레이피어', 'fire', 'C', 'E', '-', '-', '-'),
  ('개미가시 레이피어', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('개미가시 레이피어', 'lightning', 'E', 'C', '-', '-', '-'),
  ('개미가시 레이피어', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('개미가시 레이피어', 'magic', 'E', 'E', 'B', '-', '-'),
  ('개미가시 레이피어', 'cold', 'C', 'C', 'C', '-', '-'),
  ('개미가시 레이피어', 'poison', 'C', 'C', '-', '-', 'D'),
  ('개미가시 레이피어', 'blood', 'C', 'C', '-', '-', 'D'),
  ('개미가시 레이피어', 'occult', 'E', 'D', '-', '-', 'B'),
  ('빙결의 침', 'standard', 'D', 'B', '-', '-', '-'),
  ('카리아의 마술검', 'standard', 'E', 'D', 'S', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '자검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
