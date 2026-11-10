-- 사용자 제공 대자검 6종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '대자검') then
    raise exception '대자검 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '대자검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('관통 찌르기','왕조 검술','뇌운의 모습')
    group by name, description having count(*) > 1
  ) then
    raise exception '대자검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('관통 찌르기', '관통 무기로 방패와 대치하기 위한 전투 기술.
힘을 모아 크게 파고들며 강렬하게 찔러
방패의 가드를 정면으로 뚫는다.', '9 ( - / - )'),
  ('왕조 검술', '화려하게 공격을 회피하고
적과 거리를 두는 전투 기술.
강 공격으로 단숨에 전진하는 찌르기로 이으며
추가 강 공격은 베어내기가 된다.', '5 ( - / 7 )'),
  ('뇌운의 모습', '자기 모습을 잠시 붉은 뇌운으로 바꾸고 하늘을
달리며 벼락을 두른 검신으로 꿰뚫는 전투 기술.
길게 누르면 달리는 거리가 늘어난다.', '28 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('그레이트 에페', 10, 'base_game', '검신이 가늘고 예리한 대형 자검.
특히 잔혹한 결투를 위해 준비된다.

자검과 마찬가지로 찌르는 공격에 적절하며
방패를 든 채로 공격할 수도 있다.', null),
  ('신의 살갗 대자검', 20, 'base_game', '비색 칼날을 지닌 우아한 자검.
신의 살갗의 귀인들이 사용하는 무기.

귀인들의 검술은 출중하여
무기의 크기에 비해, 그 연속 공격은
눈으로 좇기도 힘들 만큼 빠르다.', null),
  ('퀼라인의 대검', 30, 'shadow_of_the_erdtree', '불의 기사 퀼라인의 무기.
불을 본떠 파도치는 대자검.

퀼라인은 성전에 모든 것을 바쳐
자신의 대검을 주군의 창과 비슷한 모습으로
다시 만들었다.
또 한 명의 가시공이 되기 위해서.', null),
  ('피의 헬리케', 40, 'base_game', '나선형 칼날을 지닌 이형의 자검.
피의 군주를 섬기는 귀족들의 무기.

그 칼날은 상처를 헤집어 출혈을 유발하며
천천히 아름답게 그 피를 떨군다.', null),
  ('용왕의 바위검', 50, 'base_game', '원초의 벼락을 품은 조약돌 자검.
추억에서 얻은 용왕의 힘의 편린.

영원을 잃은 왜소한 용의 후예들에게
높은 위력을 발휘한다.', '비룡형 적에게 30%, 고룡형 적에게 15%의 추가 대미지를 준다.'),
  ('소드랜스', 60, 'shadow_of_the_erdtree', '노장 가이우스가 사용한
대검과 돌격창을 결합한 무기.

무거운 만큼 공격력이 높으며
특히 기마 상태일 때 그 진가를 발휘한다.

가이우스는 늘 멧돼지의 등 위에 있었다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대자검'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('그레이트 에페', '관통 찌르기', 6.5, '표준 / 관통', 'smithing_stone', true, 303, 0, 0, 0, 0, 52, 36.0, 36.0, 36.0, 36.0, 100, 37, 0, 0, 0, 0, 0, 0, 15, 16, 0, 0, 0),
  ('신의 살갗 대자검', '관통 찌르기', 7.0, '표준 / 관통', 'smithing_stone', true, 311, 0, 0, 0, 0, 55, 38.0, 38.0, 38.0, 38.0, 100, 39, 0, 0, 0, 0, 0, 0, 14, 17, 0, 0, 0),
  ('퀼라인의 대검', '관통 찌르기', 7.5, '표준 / 관통', 'smithing_stone', true, 298, 0, 88, 0, 0, 50.0, 34.0, 45.0, 34.0, 34.0, 100, 39, 0, 0, 0, 0, 0, 0, 14, 18, 0, 12, 0),
  ('피의 헬리케', '왕조 검술', 8.0, '표준 / 관통', 'somber_smithing_stone', false, 296, 0, 0, 0, 0, 57.0, 40.0, 40.0, 40.0, 40.0, 100, 37, 0, 0, 55, 0, 0, 0, 16, 19, 0, 0, 17),
  ('용왕의 바위검', '뇌운의 모습', 8.0, '표준 / 관통', 'somber_smithing_stone', false, 225, 0, 0, 144, 0, 46.0, 32.0, 32.0, 46.0, 32.0, 100, 37, 0, 0, 0, 0, 0, 0, 18, 37, 0, 0, 0),
  ('소드랜스', '관통 찌르기', 9.0, '표준 / 관통', 'smithing_stone', true, 323, 0, 0, 0, 0, 73.0, 39.0, 39.0, 39.0, 39.0, 100, 50, 0, 0, 0, 0, 0, 0, 21, 11, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대자검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('그레이트 에페', 'standard', 'D', 'C', '-', '-', '-'),
  ('그레이트 에페', 'heavy', 'A', '-', '-', '-', '-'),
  ('그레이트 에페', 'keen', 'E', 'B', '-', '-', '-'),
  ('그레이트 에페', 'quality', 'B', 'B', '-', '-', '-'),
  ('그레이트 에페', 'fire', 'C', 'E', '-', '-', '-'),
  ('그레이트 에페', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('그레이트 에페', 'lightning', 'E', 'C', '-', '-', '-'),
  ('그레이트 에페', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('그레이트 에페', 'magic', 'E', 'E', 'B', '-', '-'),
  ('그레이트 에페', 'cold', 'C', 'C', 'C', '-', '-'),
  ('그레이트 에페', 'poison', 'C', 'C', '-', '-', 'D'),
  ('그레이트 에페', 'blood', 'C', 'C', '-', '-', 'D'),
  ('그레이트 에페', 'occult', 'E', 'D', '-', '-', 'B'),
  ('신의 살갗 대자검', 'standard', 'C', 'C', '-', '-', '-'),
  ('신의 살갗 대자검', 'heavy', 'B', '-', '-', '-', '-'),
  ('신의 살갗 대자검', 'keen', 'E', 'B', '-', '-', '-'),
  ('신의 살갗 대자검', 'quality', 'B', 'B', '-', '-', '-'),
  ('신의 살갗 대자검', 'fire', 'C', 'E', '-', '-', '-'),
  ('신의 살갗 대자검', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('신의 살갗 대자검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('신의 살갗 대자검', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('신의 살갗 대자검', 'magic', 'E', 'E', 'B', '-', '-'),
  ('신의 살갗 대자검', 'cold', 'C', 'C', 'C', '-', '-'),
  ('신의 살갗 대자검', 'poison', 'C', 'C', '-', '-', 'D'),
  ('신의 살갗 대자검', 'blood', 'C', 'C', '-', '-', 'D'),
  ('신의 살갗 대자검', 'occult', 'E', 'E', '-', '-', 'B'),
  ('퀼라인의 대검', 'standard', 'D', 'C', '-', 'D', '-'),
  ('퀼라인의 대검', 'heavy', 'A', '-', '-', 'D', '-'),
  ('퀼라인의 대검', 'keen', 'D', 'A', '-', 'D', '-'),
  ('퀼라인의 대검', 'quality', 'B', 'B', '-', 'D', '-'),
  ('퀼라인의 대검', 'fire', 'C', 'E', '-', 'E', '-'),
  ('퀼라인의 대검', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('퀼라인의 대검', 'lightning', 'E', 'C', '-', 'D', '-'),
  ('퀼라인의 대검', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('퀼라인의 대검', 'magic', 'E', 'E', 'B', 'D', '-'),
  ('퀼라인의 대검', 'cold', 'D', 'C', 'B', 'D', '-'),
  ('퀼라인의 대검', 'poison', 'D', 'C', '-', 'D', 'D'),
  ('퀼라인의 대검', 'blood', 'D', 'C', '-', 'D', 'D'),
  ('퀼라인의 대검', 'occult', 'E', 'D', '-', 'E', 'A'),
  ('피의 헬리케', 'standard', 'E', 'C', '-', '-', 'B'),
  ('용왕의 바위검', 'standard', 'D', 'B', '-', '-', '-'),
  ('소드랜스', 'standard', 'B', 'E', '-', '-', '-'),
  ('소드랜스', 'heavy', 'A', '-', '-', '-', '-'),
  ('소드랜스', 'keen', 'E', 'B', '-', '-', '-'),
  ('소드랜스', 'quality', 'B', 'B', '-', '-', '-'),
  ('소드랜스', 'fire', 'C', 'E', '-', '-', '-'),
  ('소드랜스', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('소드랜스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('소드랜스', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('소드랜스', 'magic', 'E', 'E', 'C', '-', '-'),
  ('소드랜스', 'cold', 'B', 'E', 'D', '-', '-'),
  ('소드랜스', 'poison', 'B', 'E', '-', '-', 'D'),
  ('소드랜스', 'blood', 'B', 'E', '-', '-', 'D'),
  ('소드랜스', 'occult', 'C', 'E', '-', '-', 'B')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대자검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
