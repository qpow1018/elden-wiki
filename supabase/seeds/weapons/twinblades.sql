-- 사용자 제공 쌍날검 8종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '쌍날검') then
    raise exception '쌍날검 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '쌍날검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('회전 베기', '흑염의 회오리', '혈인난무', '에우포리에의 소용돌이')
    group by name, description having count(*) > 1
  ) then
    raise exception '쌍날검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('회전 베기', '기량이 뛰어난 검사들의 전투 기술.
크게 몸을 회전시켜 적을 벤다.
또한 추가 입력으로 추가 공격도 가능하다.', '6 ( - / 12 )'),
  ('흑염의 회오리', '무기를 회전시키고 땅에 찔러
회오리치는 흑염을 불러내는 전투 기술.
길게 누르면 회전 시에도 회오리가 발생한다.', '30 ( - / - )'),
  ('혈인난무', '도약한 후 선풍처럼 연속 공격을 하는
전투 기술. 추가 입력으로
추가 공격 후 물러나 거리를 둔다.', '11 ( - / 6 )'),
  ('에우포리에의 소용돌이', '소용돌이의 힘으로 무기 전체를 격렬히 회전시켜
그대로 전방을 연속으로 베는 전투 기술.
반짝임을 되찾을수록 위력이 높아진다.
전투 기술을 사용하면 반짝임을 잃는다.', '28 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('트윈 블레이드', 10, 'base_game', '자루 양 끝에 도신이 달린 쌍날검.
높은 기량을 요구하는, 다루기 어려운 무기.

한 손으로 휘두를 수도 있지만
양손으로 들고 회전해 구사하는 공격에서
그 진가를 발휘한다.', null),
  ('트윈 나이트소드', 20, 'base_game', '기사의 형식을 중시한 쌍날검.
아름답고 질 좋은 무기.

한 손으로 휘두를 수도 있지만
양손으로 들고 회전해 구사하는 공격에서
그 진가를 발휘한다.', null),
  ('흑철 쌍날검', 30, 'shadow_of_the_erdtree', '가시공 메스메르를 섬기는 흑기사들의 무기.
흑철에 황금 의장을 더한 쌍날검.

미리 황금 나무의 기도를 담았으며
어떠한 방법으로 신성 공격력을 부여할 시
상승 효과로 크게 위력이 높아진다.', '신성 공격력을 부여하면 상승 효과로 위력이 크게 높아진다.'),
  ('신의 살갗 쌍날검', 40, 'base_game', '베는 낫 칼날과 찌르는 나선 침을 가진
비색 쌍날검. 신의 살갗의 사도들의 무기.

대칭성이 없는 이형의 쌍날검이며
사용하려면 숙련되어야 한다.', null),
  ('가고일의 쌍날검', 50, 'base_game', '영웅의 가고일이 드는 청동 쌍날검.

가고일 본체가 그렇듯이
빠진 부분을 시랍으로 메꾼
영웅들의 누더기이다.', null),
  ('가고일의 흑쌍날검', 60, 'base_game', '영웅의 가고일이 드는 청동 쌍날검을
메꾸는 시랍이 검은색인 것.
신성 속성 공격력을 지닌다.

흑검 말리케스를 섬겼다는 표시이다.', null),
  ('엘레오노라의 쌍치도', 70, 'base_game', '갈대의 땅에서 만들어진 쌍치도.
보라색 피 손가락 엘레오노라의 무기.

한바탕 부는 선풍 같은 탁월한 전투 기술은
지금은 저주받은 피에 더럽혀졌다.', null),
  ('에우포리에', 80, 'shadow_of_the_erdtree', '풍양의 상징으로 여겨진 쌍날검. 탑의 비보.

황금의 싹인 그 칼날은 반쯤 검게 시들었으나
적에게 상처를 입힐 때마다 반짝임을 되찾는다.

단, 죽음에 사는 자들만은
상처입혀도 반짝임이 돌아오지 않는다.', '살아 있는 적을 공격하면 반짝임이 2단계에 걸쳐 강화되어 신성 공격력이 증가한다. 죽음에 사는 자를 공격하면 반짝임이 회복되지 않는다. 전투 기술을 사용하면 반짝임을 잃는다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '쌍날검'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('트윈 블레이드', '회전 베기', 7.0, '표준 / 관통', 'smithing_stone', true, 291, 0, 0, 0, 0, 45.0, 30.0, 30.0, 30.0, 30.0, 100, 36, 0, 0, 0, 0, 0, 0, 10, 18, 0, 0, 0),
  ('트윈 나이트소드', '회전 베기', 8.0, '표준 / 관통', 'smithing_stone', true, 298, 0, 0, 0, 0, 47.0, 31.0, 31.0, 31.0, 31.0, 100, 37, 0, 0, 0, 0, 0, 0, 16, 18, 0, 0, 0),
  ('흑철 쌍날검', '회전 베기', 8.0, '표준 / 관통', 'smithing_stone', true, 274, 0, 0, 0, 80, 42.0, 26.0, 26.0, 26.0, 47.0, 100, 37, 0, 0, 0, 0, 0, 0, 18, 15, 0, 13, 0),
  ('신의 살갗 쌍날검', '흑염의 회오리', 8.0, '표준 / 관통', 'smithing_stone', true, 296, 0, 0, 0, 0, 47.0, 31.0, 31.0, 31.0, 31.0, 100, 37, 0, 0, 0, 0, 0, 0, 17, 22, 0, 0, 0),
  ('가고일의 쌍날검', '회전 베기', 8.5, '표준 / 관통', 'smithing_stone', true, 301, 0, 0, 0, 0, 48.0, 32.0, 32.0, 32.0, 32.0, 100, 38, 0, 0, 0, 0, 0, 0, 18, 15, 0, 0, 0),
  ('가고일의 흑쌍날검', '회전 베기', 8.5, '표준 / 관통', 'somber_smithing_stone', false, 198, 0, 0, 0, 237, 32.0, 26.0, 26.0, 26.0, 59.0, 100, 35, 0, 0, 0, 0, 0, 0, 18, 15, 0, 22, 0),
  ('엘레오노라의 쌍치도', '혈인난무', 6.0, '표준 / 관통', 'somber_smithing_stone', false, 176, 0, 176, 0, 0, 33.0, 23.0, 47.0, 23.0, 23.0, 100, 30, 0, 0, 55, 0, 0, 0, 12, 21, 0, 0, 19),
  ('에우포리에', '에우포리에의 소용돌이', 8.5, '표준 / 관통', 'somber_smithing_stone', false, 205, 0, 0, 0, 245, 32.0, 26.0, 26.0, 26.0, 59.0, 100, 35, 0, 0, 0, 0, 0, 0, 16, 16, 0, 24, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '표준' then array['standard']::text[] when '타격 / 관통' then array['strike','pierce']::text[] when '관통' then array['pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '쌍날검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
left join public.weapon_skills k on k.name = s.skill_name
  and (s.skill_name <> '회전 베기' or k.fp_cost_text = '6 ( - / 12 )')
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('트윈 블레이드', 'standard', 'D', 'C', '-', '-', '-'),
  ('트윈 블레이드', 'heavy', 'B', '-', '-', '-', '-'),
  ('트윈 블레이드', 'keen', 'E', 'B', '-', '-', '-'),
  ('트윈 블레이드', 'quality', 'B', 'B', '-', '-', '-'),
  ('트윈 블레이드', 'fire', 'C', 'E', '-', '-', '-'),
  ('트윈 블레이드', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('트윈 블레이드', 'lightning', 'E', 'C', '-', '-', '-'),
  ('트윈 블레이드', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('트윈 블레이드', 'magic', 'E', 'E', 'C', '-', '-'),
  ('트윈 블레이드', 'cold', 'D', 'C', 'C', '-', '-'),
  ('트윈 블레이드', 'poison', 'D', 'C', '-', '-', 'D'),
  ('트윈 블레이드', 'blood', 'D', 'C', '-', '-', 'D'),
  ('트윈 블레이드', 'occult', 'E', 'D', '-', '-', 'B'),
  ('트윈 나이트소드', 'standard', 'C', 'D', '-', '-', '-'),
  ('트윈 나이트소드', 'heavy', 'B', '-', '-', '-', '-'),
  ('트윈 나이트소드', 'keen', 'E', 'B', '-', '-', '-'),
  ('트윈 나이트소드', 'quality', 'B', 'B', '-', '-', '-'),
  ('트윈 나이트소드', 'fire', 'C', 'E', '-', '-', '-'),
  ('트윈 나이트소드', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('트윈 나이트소드', 'lightning', 'E', 'C', '-', '-', '-'),
  ('트윈 나이트소드', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('트윈 나이트소드', 'magic', 'E', 'E', 'C', '-', '-'),
  ('트윈 나이트소드', 'cold', 'B', 'D', 'D', '-', '-'),
  ('트윈 나이트소드', 'poison', 'B', 'D', '-', '-', 'D'),
  ('트윈 나이트소드', 'blood', 'B', 'D', '-', '-', 'D'),
  ('트윈 나이트소드', 'occult', 'D', 'E', '-', '-', 'B'),
  ('흑철 쌍날검', 'standard', 'D', 'C', '-', 'D', '-'),
  ('흑철 쌍날검', 'heavy', 'B', '-', '-', 'D', '-'),
  ('흑철 쌍날검', 'keen', 'D', 'B', '-', 'D', '-'),
  ('흑철 쌍날검', 'quality', 'B', 'B', '-', 'D', '-'),
  ('흑철 쌍날검', 'fire', 'C', 'E', '-', 'D', '-'),
  ('흑철 쌍날검', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('흑철 쌍날검', 'lightning', 'E', 'C', '-', 'D', '-'),
  ('흑철 쌍날검', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('흑철 쌍날검', 'magic', 'E', 'E', 'C', 'D', '-'),
  ('흑철 쌍날검', 'cold', 'D', 'C', 'C', 'D', '-'),
  ('흑철 쌍날검', 'poison', 'D', 'B', '-', 'D', 'D'),
  ('흑철 쌍날검', 'blood', 'D', 'B', '-', 'D', 'D'),
  ('흑철 쌍날검', 'occult', 'E', 'E', '-', 'E', 'B'),
  ('신의 살갗 쌍날검', 'standard', 'D', 'B', '-', '-', '-'),
  ('신의 살갗 쌍날검', 'heavy', 'B', '-', '-', '-', '-'),
  ('신의 살갗 쌍날검', 'keen', 'E', 'A', '-', '-', '-'),
  ('신의 살갗 쌍날검', 'quality', 'B', 'B', '-', '-', '-'),
  ('신의 살갗 쌍날검', 'fire', 'C', 'E', '-', '-', '-'),
  ('신의 살갗 쌍날검', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('신의 살갗 쌍날검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('신의 살갗 쌍날검', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('신의 살갗 쌍날검', 'magic', 'E', 'E', 'C', '-', '-'),
  ('신의 살갗 쌍날검', 'cold', 'D', 'B', 'D', '-', '-'),
  ('신의 살갗 쌍날검', 'poison', 'D', 'B', '-', '-', 'D'),
  ('신의 살갗 쌍날검', 'blood', 'D', 'B', '-', '-', 'D'),
  ('신의 살갗 쌍날검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('가고일의 쌍날검', 'standard', 'B', 'E', '-', '-', '-'),
  ('가고일의 쌍날검', 'heavy', 'A', '-', '-', '-', '-'),
  ('가고일의 쌍날검', 'keen', 'D', 'B', '-', '-', '-'),
  ('가고일의 쌍날검', 'quality', 'B', 'B', '-', '-', '-'),
  ('가고일의 쌍날검', 'fire', 'C', 'E', '-', '-', '-'),
  ('가고일의 쌍날검', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('가고일의 쌍날검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('가고일의 쌍날검', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('가고일의 쌍날검', 'magic', 'D', 'E', 'C', '-', '-'),
  ('가고일의 쌍날검', 'cold', 'B', 'E', 'C', '-', '-'),
  ('가고일의 쌍날검', 'poison', 'B', 'E', '-', '-', 'D'),
  ('가고일의 쌍날검', 'blood', 'B', 'E', '-', '-', 'D'),
  ('가고일의 쌍날검', 'occult', 'D', 'E', '-', '-', 'B'),
  ('가고일의 흑쌍날검', 'standard', 'B', 'E', '-', 'D', '-'),
  ('엘레오노라의 쌍치도', 'standard', 'E', 'C', '-', '-', 'D'),
  ('에우포리에', 'standard', 'D', 'D', '-', 'B', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '쌍날검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
