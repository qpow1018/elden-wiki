-- 사용자 제공 경대검 4종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '경대검') then
    raise exception '경대검 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '경대검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('관통 찌르기', '침 찌르기', '달과 불의 자세')
    group by name, description having count(*) > 1
  ) then
    raise exception '경대검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('관통 찌르기', '관통 무기로 방패와 대치하기 위한 전투 기술.
힘을 모아 크게 파고들며 강렬하게 찔러
방패의 가드를 정면으로 뚫는다.', '9 ( - / - )'),
  ('침 찌르기', '침의 기사 레다의 전투 기술.
황금 침 10개를 만들어 대상을 동시에 찌른다.
또한 찌른 대상의 모든 상태 이상과
특수한 효과를 지운다.
', '19 ( - / - )'),
  ('달과 불의 자세', '검 두 자루에 마력을 담고 마술로 잇는 전투 기술.
일반 공격은 휘석 광파를 연속으로 쏘고 강 공격은 회전하며 주위를 불로 쓸어버린다.
추가 입력으로 2회까지 광파 추가 공격이 가능하다.
', '- ( 10 / 25 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and (s.name = '킥' or k.description = s.description));

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('이데스의 검', 10, 'tarnished_pack', '대검에 맞먹는 긴 검신을 지녔으면서
높은 기술로 가볍게 만들어진 경대검.

이데스 땅의 독특한 무기.

형태가 세련되어
직검과 동등한 속도로 휘두를 수 있다.', null),
  ('레이디 소드', 20, 'shadow_of_the_erdtree', '대검에 맞먹는 긴 검신을 지녔음에도
그 중량을 극한까지 경감한 검.

귀부인이라는 이름이 붙은 질 좋은 무기.

형태가 세련되어
직검과 동등한 속도로 휘두를 수 있다.', null),
  ('레다의 검', 30, 'shadow_of_the_erdtree', '황금이 촘촘하게 짜여진 경대검.
침의 기사 레다의 검.

신성 속성의 공격력을 지닌다.

과거에 기사단 동지들을 꿰뚫은 그 검은
티끌 하나 없이 닦였음에도 피 냄새가 배었다.', null),
  ('렐라나의 쌍검', 40, 'shadow_of_the_erdtree', '푸른 휘석이 박힌 카리아의 경대검.
쌍월의 기사 렐라나의 무기.

두 자루가 한 쌍을 이루며, 양손 잡기로 들면 황금의 불이 새겨진 직검을 왼손에 든다.

달과 불은 이곳에서 언제나 함께였다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '경대검'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('이데스의 검', '관통 찌르기', 7.0, '표준 / 관통', 'smithing_stone', true, 303, 0, 0, 0, 0, 65.0, 33.0, 33.0, 33.0, 33.0, 100, 45, 0, 0, 0, 0, 0, 0, 10, 15, 0, 0, 0),
  ('레이디 소드', '관통 찌르기', 6.5, '표준 / 관통', 'smithing_stone', true, 284, 0, 0, 0, 0, 63.0, 31.0, 31.0, 31.0, 31.0, 100, 43, 0, 0, 0, 0, 0, 0, 12, 17, 0, 0, 0),
  ('레다의 검', '침 찌르기', 7.5, '표준 / 관통', 'somber_smithing_stone', false, 247, 0, 0, 0, 159, 63.0, 32.0, 32.0, 30.0, 46.0, 100, 38, 0, 0, 0, 0, 0, 0, 11, 22, 0, 19, 0),
  ('렐라나의 쌍검', '달과 불의 자세', 8.0, '표준 / 관통', 'somber_smithing_stone', false, 252, 161, 161, 0, 0, 66.0, 47.0, 29.0, 47.0, 26.0, 100, 38, 0, 0, 0, 0, 0, 0, 13, 16, 16, 16, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '경대검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('이데스의 검', 'standard', 'D', 'D', '-', '-', '-'),
  ('이데스의 검', 'heavy', 'B', '-', '-', '-', '-'),
  ('이데스의 검', 'keen', 'E', 'B', '-', '-', '-'),
  ('이데스의 검', 'quality', 'C', 'C', '-', '-', '-'),
  ('이데스의 검', 'fire', 'D', 'E', '-', '-', '-'),
  ('이데스의 검', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('이데스의 검', 'lightning', 'E', 'D', '-', '-', '-'),
  ('이데스의 검', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('이데스의 검', 'magic', 'E', 'E', 'C', '-', '-'),
  ('이데스의 검', 'cold', 'D', 'C', 'D', '-', '-'),
  ('이데스의 검', 'poison', 'D', 'C', '-', '-', 'D'),
  ('이데스의 검', 'blood', 'D', 'C', '-', '-', 'D'),
  ('이데스의 검', 'occult', 'E', 'E', '-', '-', 'C'),
  ('레이디 소드', 'standard', 'D', 'C', '-', '-', '-'),
  ('레이디 소드', 'heavy', 'B', '-', '-', '-', '-'),
  ('레이디 소드', 'keen', 'E', 'B', '-', '-', '-'),
  ('레이디 소드', 'quality', 'B', 'B', '-', '-', '-'),
  ('레이디 소드', 'fire', 'C', 'E', '-', '-', '-'),
  ('레이디 소드', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('레이디 소드', 'lightning', 'E', 'C', '-', '-', '-'),
  ('레이디 소드', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('레이디 소드', 'magic', 'E', 'E', 'B', '-', '-'),
  ('레이디 소드', 'cold', 'D', 'B', 'C', '-', '-'),
  ('레이디 소드', 'poison', 'D', 'B', '-', '-', 'D'),
  ('레이디 소드', 'blood', 'D', 'B', '-', '-', 'D'),
  ('레이디 소드', 'occult', 'E', 'D', '-', '-', 'B'),
  ('레다의 검', 'standard', 'D', 'B', '-', 'D', '-'),
  ('렐라나의 쌍검', 'standard', 'C', 'C', 'C', 'C', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '경대검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
