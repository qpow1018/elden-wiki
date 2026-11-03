-- 사용자 제공 손톱 5종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
-- 미강화 상태 이상과 밤의 손톱의 공격력·필요 능력치·보정을 보완합니다.
-- 밤의 손톱의 중량·공격 방식·가드·치명과 고유 기술 FP는 NULL입니다.
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '손톱') then
    raise exception '손톱 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '손톱'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('퀵스텝', '사냥개의 스텝', '산탄 투척')
    group by name having count(*) > 1
  ) then
    raise exception '손톱 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('퀵스텝', '기민함과 교란으로 싸우는 자들의 전투 기술.
재빠르게 스텝 이동한다.
타깃 고정 상태라면 돌아 들어간다.', '3 ( - / - )'),
  ('사냥개의 스텝', '순간 모습을 감추고 스텝 이동하는 전투 기술.
고속이며 이동 거리도 길다.
타깃 고정 상태라면 돌아 들어간다.', '5 ( - / - )'),
  ('산탄 투척', '단조술로 양손에 무기를 복제해
여러 개를 동시에 투척하는 전투 기술.
추가 입력으로 한 번 더 투척한다.', null)
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('갈고리 발톱', 10, 'base_game', '예리한 긴 칼날을 늘어놓아 주먹에 끼우는 무기.
그 상처는 상대에게 출혈을 유발하며
어둠에 숨는 자들이 즐겨 사용했다.

손톱 무기는 두 개가 한 쌍이며
양손 잡기 시 좌우 양 주먹에 장비된다.', null),
  ('사냥개의 발톱', 20, 'base_game', '크고 흰 대형 갈고리 손톱.
사냥개기사들이 쓰는 무기.

휜 손톱은 가드의 틈을 파고든다.', '가드의 틈을 파고든다.'),
  ('독사의 이빨', 30, 'base_game', '과거에 검투를 위해 만들어진 무기 중 하나.
투기장에서 쫓긴 투사들의 무기.

청동 뱀 머리에 난 검은 엄니에는
맹독이 장치되어 있다.', null),
  ('맹금의 발톱', 40, 'base_game', '가늘고 예리한 두 개의 손톱. 까마귀 산의
암살자가 죽음의 맹금으로 위장하기 위한 무기.

공중에서의 공격에 뛰어나며
차지 공격도 맹금류의 습격을 연상시킨다', '점프 공격 배율이 다른 손톱 무기보다 약 13% 높다.'),
  ('밤의 손톱', 50, 'shadow_of_the_erdtree', '빛마저도 빨아들이는 칠흑의 손톱.
밤의 기사 안나의 무기.

유문문자가 새겨져 있으며
강 공격으로 세 손톱을 모두 투척한다.
또한, 그 칼날은 반쯤 실체가 없어
완전히 가드할 수는 없다.', '칼날이 반쯤 실체가 없어 완전히 가드할 수 없다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '손톱'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('갈고리 발톱', '퀵스텝', 2.0, '참격 / 관통', 'smithing_stone', true, 227, 0, 0, 0, 0, 35.0, 20.0, 20.0, 20.0, 20.0, 110, 24, 0, 0, 60, 0, 0, 0, 8, 14, 0, 0, 0),
  ('사냥개의 발톱', '사냥개의 스텝', 3.0, '참격 / 관통', 'smithing_stone', true, 242, 0, 0, 0, 0, 38.0, 22.0, 22.0, 22.0, 22.0, 110, 22, 0, 0, 60, 0, 0, 0, 10, 15, 0, 0, 0),
  ('독사의 이빨', '퀵스텝', 2.5, '참격 / 관통', 'smithing_stone', true, 237, 0, 0, 0, 0, 36.0, 21.0, 21.0, 21.0, 21.0, 100, 22, 0, 0, 0, 72, 0, 0, 9, 9, 0, 0, 0),
  ('맹금의 발톱', '퀵스텝', 1.5, '참격 / 관통', 'smithing_stone', true, 210, 0, 0, 0, 0, 33.0, 19.0, 19.0, 19.0, 19.0, 110, 22, 0, 0, 60, 0, 0, 0, 6, 14, 0, 0, 0),
  ('밤의 손톱', '산탄 투척', null, null, 'somber_smithing_stone', false, 193, 124, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 45, 0, 0, 0, 8, 20, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '손톱'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('갈고리 발톱', 'standard', 'D', 'B', '-', '-', '-'),
  ('갈고리 발톱', 'heavy', 'B', '-', '-', '-', '-'),
  ('갈고리 발톱', 'keen', 'E', 'A', '-', '-', '-'),
  ('갈고리 발톱', 'quality', 'B', 'B', '-', '-', '-'),
  ('갈고리 발톱', 'fire', 'C', 'E', '-', '-', '-'),
  ('갈고리 발톱', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('갈고리 발톱', 'lightning', 'E', 'C', '-', '-', '-'),
  ('갈고리 발톱', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('갈고리 발톱', 'magic', 'E', 'E', 'B', '-', '-'),
  ('갈고리 발톱', 'cold', 'D', 'B', 'C', '-', '-'),
  ('갈고리 발톱', 'poison', 'D', 'B', '-', '-', 'D'),
  ('갈고리 발톱', 'blood', 'D', 'B', '-', '-', 'D'),
  ('갈고리 발톱', 'occult', 'E', 'D', '-', '-', 'B'),
  ('사냥개의 발톱', 'standard', 'C', 'D', '-', '-', '-'),
  ('사냥개의 발톱', 'heavy', 'B', '-', '-', '-', '-'),
  ('사냥개의 발톱', 'keen', 'E', 'B', '-', '-', '-'),
  ('사냥개의 발톱', 'quality', 'B', 'B', '-', '-', '-'),
  ('사냥개의 발톱', 'fire', 'C', 'E', '-', '-', '-'),
  ('사냥개의 발톱', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('사냥개의 발톱', 'lightning', 'E', 'C', '-', '-', '-'),
  ('사냥개의 발톱', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('사냥개의 발톱', 'magic', 'E', 'E', 'B', '-', '-'),
  ('사냥개의 발톱', 'cold', 'C', 'D', 'C', '-', '-'),
  ('사냥개의 발톱', 'poison', 'C', 'C', '-', '-', 'D'),
  ('사냥개의 발톱', 'blood', 'C', 'C', '-', '-', 'D'),
  ('사냥개의 발톱', 'occult', 'D', 'E', '-', '-', 'B'),
  ('독사의 이빨', 'standard', 'D', 'C', '-', '-', '-'),
  ('독사의 이빨', 'heavy', 'A', '-', '-', '-', '-'),
  ('독사의 이빨', 'keen', 'E', 'B', '-', '-', '-'),
  ('독사의 이빨', 'quality', 'B', 'B', '-', '-', '-'),
  ('독사의 이빨', 'fire', 'C', 'E', '-', '-', '-'),
  ('독사의 이빨', 'flame_art', 'D', 'D', '-', 'C', '-'),
  ('독사의 이빨', 'lightning', 'E', 'C', '-', '-', '-'),
  ('독사의 이빨', 'sacred', 'D', 'D', '-', 'C', '-'),
  ('독사의 이빨', 'magic', 'E', 'E', 'B', '-', '-'),
  ('독사의 이빨', 'cold', 'C', 'C', 'C', '-', '-'),
  ('독사의 이빨', 'poison', 'C', 'C', '-', '-', 'D'),
  ('독사의 이빨', 'blood', 'C', 'C', '-', '-', 'D'),
  ('독사의 이빨', 'occult', 'E', 'D', '-', '-', 'B'),
  ('맹금의 발톱', 'standard', 'E', 'B', '-', '-', '-'),
  ('맹금의 발톱', 'heavy', 'A', '-', '-', '-', '-'),
  ('맹금의 발톱', 'keen', 'E', 'A', '-', '-', '-'),
  ('맹금의 발톱', 'quality', 'B', 'B', '-', '-', '-'),
  ('맹금의 발톱', 'fire', 'C', 'E', '-', '-', '-'),
  ('맹금의 발톱', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('맹금의 발톱', 'lightning', 'E', 'C', '-', '-', '-'),
  ('맹금의 발톱', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('맹금의 발톱', 'magic', 'E', 'D', 'B', '-', '-'),
  ('맹금의 발톱', 'cold', 'E', 'B', 'C', '-', '-'),
  ('맹금의 발톱', 'poison', 'E', 'B', '-', '-', 'D'),
  ('맹금의 발톱', 'blood', 'E', 'B', '-', '-', 'D'),
  ('맹금의 발톱', 'occult', 'E', 'C', '-', '-', 'B'),
  ('밤의 손톱', 'standard', '-', 'B', '-', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '손톱'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
