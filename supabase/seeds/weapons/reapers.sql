-- 사용자 제공 낫 5종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '낫') then
    raise exception '낫 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '낫'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('회전 베기', '미켈라의 빛고리', '천사의 날개', '왕조 낫 기술')
    group by name, description having count(*) > 1
  ) then
    raise exception '낫 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('회전 베기', '기량이 뛰어난 검사들의 전투 기술.
크게 몸을 회전시켜 적을 벤다.
또한 추가 입력으로 추가 공격도 가능하다.', '6 ( - / 12 )'),
  ('미켈라의 빛고리', '미켈라의 빛나는 빛고리를 만들어
전방에 쏘는 전투 기술.
연속으로 쏠 수 있다.', '11 ( - / 11 )'),
  ('천사의 날개', '도약하면서 날개 칼날에 흰 빛을 품고
그대로 베는 전투 기술.
흰 날개는 성배병 회복을 방해한다.', '17 ( - / - )'),
  ('왕조 낫 기술', '화려하게 공격을 회피하고 적과 거리를 두는
전투 기술. 회전 방향을 제어할 수 있다.
강 공격으로 전진 후 올려 베기로 이어지며
다시 강 공격으로 다시 화려하게 내려 벤다.', '7 ( - / 9 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('대낫', 10, 'base_game', '길고 가는 칼날을 지닌 큰 낫.
수확하는 듯한 참격은 출혈을 유발하고
그 공격은 가드의 틈을 파고든다.

높은 기량을 가진 자가 휘두르면
상대에게 공포를 새길 것이다.', '공격이 적의 가드를 파고든다.'),
  ('묘지의 대낫', 20, 'base_game', '휜 가지에 큰 칼날을 붙인 대낫.
틈새의 땅 각지에 있는 버려진 묘지의 늙은 묘지기가 쓰는 무기.

과거에는 악귀를 쫓는 의미도 있었다고 한다.', '장착 시 죽음 내성이 35 증가한다. 쌍수 장착 시 중첩되지 않는다.'),
  ('광륜의 대낫', 30, 'base_game', '미켈라의 칼날 말레니아와 함께 싸운
귀부기사들의 전투 낫.

기사들의 지휘관이 사용한 무기이며
반쪽짜리 빛고리의 칼날은 신성 속성 공격력을
지닌다.', null),
  ('날개낫', 40, 'base_game', '흰 날개를 본뜬 성스러운 낫
신성 속성 공격력을 지녔다.

흰 날개를 지닌 소녀들
이교에서 그들은 친절한 죽음의 사자이다.', null),
  ('흑요의 라미나', 50, 'shadow_of_the_erdtree', '순혈기사 안스바흐의 무기.
날카롭게 벼려진, 가는 전쟁 낫.

흑요석 칼날에 장치는 없으며
그저 탁월한 검 기술로 적수를 베어
피의 꽃을 피운다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '낫'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('대낫', '회전 베기', 7.5, '참격', 'smithing_stone', true, 306, 0, 0, 0, 0, 45, 30, 30, 30, 30, 100, 36, 0, 0, 55, 0, 0, 0, 14, 14, 0, 0, 0),
  ('묘지의 대낫', '회전 베기', 9.5, '참격', 'smithing_stone', true, 352, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 100, 39, 0, 0, 55, 0, 0, 0, 17, 13, 0, 0, 0),
  ('광륜의 대낫', '미켈라의 빛고리', 8.5, '참격', 'somber_smithing_stone', false, 289, 0, 0, 0, 186, 42.0, 29.0, 29.0, 29.0, 42.0, 100, 34, 0, 0, 55, 0, 0, 0, 13, 16, 0, 15, 0),
  ('날개낫', '천사의 날개', 7.5, '참격', 'somber_smithing_stone', false, 213, 0, 0, 0, 254, 30.0, 25.0, 25.0, 25.0, 55.0, 100, 33, 0, 0, 55, 0, 0, 0, 16, 16, 0, 24, 0),
  ('흑요의 라미나', '왕조 낫 기술', 6.5, '참격', 'somber_smithing_stone', false, 294, 0, 0, 0, 0, 42.0, 28.0, 28.0, 28.0, 28.0, 100, 30, 0, 0, 55, 0, 0, 0, 12, 25, 0, 0, 17)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '표준' then array['standard']::text[] when '타격 / 관통' then array['strike','pierce']::text[] when '관통' then array['pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '낫'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
left join public.weapon_skills k on k.name = s.skill_name
  and (s.skill_name <> '회전 베기' or k.fp_cost_text = '6 ( - / 12 )')
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('대낫', 'standard', 'D', 'B', '-', '-', '-'),
  ('대낫', 'heavy', 'B', '-', '-', '-', '-'),
  ('대낫', 'keen', 'E', 'A', '-', '-', '-'),
  ('대낫', 'quality', 'B', 'B', '-', '-', '-'),
  ('대낫', 'fire', 'C', 'E', '-', '-', '-'),
  ('대낫', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('대낫', 'lightning', 'E', 'C', '-', '-', '-'),
  ('대낫', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('대낫', 'magic', 'E', 'E', 'B', '-', '-'),
  ('대낫', 'cold', 'D', 'B', 'C', '-', '-'),
  ('대낫', 'poison', 'D', 'B', '-', '-', 'D'),
  ('대낫', 'blood', 'D', 'B', '-', '-', 'D'),
  ('대낫', 'occult', 'E', 'D', '-', '-', 'B'),
  ('묘지의 대낫', 'standard', 'C', 'D', '-', '-', '-'),
  ('묘지의 대낫', 'heavy', 'B', '-', '-', '-', '-'),
  ('묘지의 대낫', 'keen', 'E', 'B', '-', '-', '-'),
  ('묘지의 대낫', 'quality', 'B', 'B', '-', '-', '-'),
  ('묘지의 대낫', 'fire', 'D', 'E', '-', '-', '-'),
  ('묘지의 대낫', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('묘지의 대낫', 'lightning', 'E', 'D', '-', '-', '-'),
  ('묘지의 대낫', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('묘지의 대낫', 'magic', 'E', 'E', 'C', '-', '-'),
  ('묘지의 대낫', 'cold', 'C', 'D', 'D', '-', '-'),
  ('묘지의 대낫', 'poison', 'C', 'D', '-', '-', 'D'),
  ('묘지의 대낫', 'blood', 'C', 'D', '-', '-', 'D'),
  ('묘지의 대낫', 'occult', 'E', 'E', '-', '-', 'B'),
  ('광륜의 대낫', 'standard', 'D', 'C', '-', 'D', '-'),
  ('날개낫', 'standard', 'D', 'C', '-', 'C', '-'),
  ('흑요의 라미나', 'standard', 'E', 'B', '-', '-', 'D')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '낫'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
