-- 사용자 제공 도끼창 18종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '도끼창') then
    raise exception '도끼창 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '도끼창'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('돌격', '회전 베기', '황금 나무에 맹세코', '로레타의 참격', '군기 아래에', '원혼 베기', '로미나의 정화')
    group by name, description having count(*) > 1
  ) then
    raise exception '도끼창 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('돌격', '허리춤에서 무기를 들고 단숨에 전진하는
전투 기술. 기세를 이어 마지막으로 찌른다.
길게 누르면 전진 거리를 늘릴 수 있다.', '16 ( - / - )'),
  ('회전 베기', '기량이 뛰어난 검사들의 전투 기술.
크게 몸을 회전시켜 적을 벤다.
또한 추가 입력으로 추가 공격도 가능하다.', '6 ( - / 12 )'),
  ('황금 나무에 맹세코', '도읍의 기사들에게 예부터 전해진 전투기술.
무기를 치켜들고 황금 나무에 전투를 맹세해
자신과 주변 아군의 공격력, 방어력을 높인다.', '40 ( - / - )'),
  ('회전 베기', '기량이 뛰어난 검사들의 전투 기술.
크게 몸을 회전시켜 적을 벤다.
또한 추가 입력으로 추가 공격도 가능하다.
용 할버드의 고유 기술로, 사용 시 무기에 빙뢰를 부여한다.', '17 ( - / 11 )'),
  ('로레타의 참격', '친위기사 로레타의 전투 기술.
전방으로 도약, 칼날에 휘석의 마력을 담고
가속하여 단숨에 내려 밴다.', '14 ( - / - )'),
  ('군기 아래에', '군기를 치켜들어 용감히 호령하는 전투 기술.
자신과 주위 아군의 공격력, 방어력을 높인다.', '30 ( - / - )'),
  ('원혼 베기', '몸을 회전시켜서 적을 베며
매달리는 원혼을 부르는 전투 기술.
추가 입력으로 추가 공격이 가능하다.', '12 ( - / 12 )'),
  ('로미나의 정화', '꽃봉오리 칼날에 붉은 부패의 나비를 둘러
휩쓸듯이 크게 두번 베는 전투 기술.
과거에 그것은 성스러운 정화였다.', '24 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

update public.weapon_skills set fp_cost_text = '12 ( - / 12 )'
where name = '원혼 베기' and description = '몸을 회전시켜서 적을 베며
매달리는 원혼을 부르는 전투 기술.
추가 입력으로 추가 공격이 가능하다.' and fp_cost_text is null;

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('할버드', 10, 'base_game', '도끼와 창의 기능을 겸비한 자루가 긴 무기.

적이 혼자일 때는 연속으로 관통 공격을 하고
여러 적은 공격 범위를 살려 베어넘기는 등
상황에 따른 전술의 폭이 넓다.', null),
  ('땅 잃은 기사의 도끼창', 20, 'base_game', '옛 장식이 새겨진 질 좋은 도끼창.
어떠한 이유, 혹은 죄로
고향을 잃은 기사들에게 주어졌다.

그들 중 대부분은 변방으로 보내져
실의와 함게 그 땅에 자리 잡았다고 한다.', null),
  ('루체른', 30, 'base_game', '찌르기 위한 단단하고 날카로운 부분이 있는
도끼창의 일종. 갑옷을 뚫는 것을 노린 무기.

때리는 듯한 관통 공격을 기본으로 하며
긴 자루를 살린 가로 공격은 가드를 파고든다.', '가로 공격이 적의 가드를 파고든다.'),
  ('글레이브', 40, 'base_game', '긴 자루 끝에 예리한 칼날을 붙인 무기.
전투용으로 조정된 낫.

베는 공격에 뛰어난 참격용 긴 자루 무기.', null),
  ('천한 병사의 쇼텔', 50, 'base_game', '긴 자루 끝에 휜 칼날을 붙인 무기.
가드 틈을 파고드는 천한 병사의 무기.

천한 병사는 아무도 오지 않는 악취나는 전쟁터나
잊혀야 할 금역의 명예 없는 파수꾼이다.', '공격이 적의 가드를 일부 관통한다.'),
  ('천한 병사의 톱', 60, 'base_game', '긴 자루 끝에 톱을 붙인 무기.
특징적인 칼날로 출혈을 유발하는
천한 병사의 무기.

천한 병사는 아무도 오지 않는 악취나는 전쟁터나
잊혀야 할 금역의 명예 없는 파수꾼이다.', null),
  ('수호자의 검창', 70, 'base_game', '단단한 고목을 연마한 무기.
폭이 넓은 검신을 긴 자루 끝에 붙인 것.

무예의 달인으로 알려진 작은 황금 나무의 수호자들이 사용하는 무기.
그 위력은 특히 기량에 의해 높아진다.', null),
  ('가고일의 도끼창', 80, 'base_game', '영웅의 가고일이 드는 청동 도끼창

가고일 본체가 그렇듯이
빠진 부분을 시랍으로 메꾼
영웅들의 누더기이다.', null),
  ('가고일의 흑도끼창', 90, 'base_game', '영웅의 가고일이 드는 청동 대형 도끼창을
메꾸는 시랍이 검은색인 것.
신성 속성 공격력을 지닌다.

흑검 말리케스를 섬겼다는 표시이다.', null),
  ('밤 기병의 글레이브', 100, 'base_game', '망치처럼 무거운 칼날이 달린 칠흑의 글레이브.
장송마를 탄 밤 기병의 무기.

내리치는 듯 무거운 참격에 뛰어나며
마상 공격의 위력이 높다.', '마상 공격의 위력이 높다.'),
  ('벌레의 글레이브', 110, 'base_game', '딱딱한 조개껍질을 연마한 글레이브.
에오니아 늪에서 생겨난 벌레들의 무기.
물리를 제외한 경감률이 조금씩 높아진다

인간은 이해할 수 없는 신비로운 장식에서
벌레들의 높은 지성이 느껴진다.', '장착 시 물리 이외 속성 피해 경감률이 약 2% 높아진다. 쌍수 장착 시 중첩되지 않는다.'),
  ('일그러진 파문 도끼창', 120, 'base_game', '젊은 백금의 사람들이 사용하는 무기.

그 칼날은 물방울의 파문이 일그러진
모습이라고 하며
공격력이 신비에 의해 강화된다.', null),
  ('황금 할버드', 130, 'base_game', '황금으로 만들어진 중후한 도끼창.
트리 가드라 불리는 중기병의 무기.
신성 속성 공격력을 지닌다.

무거움을 배반하지 않는 뛰어난 무기지만
인간의 근력으로는 다루기 곤란할 것이다.', null),
  ('용 할버드', 140, 'base_game', '용의 모습을 본뜬 할버드.
빙뢰의 힘을 띠고 있다.

용인병은 용이 될 자로 태어났으나
용이 되지는 못하고
늙은 용 닮은 존재로 스러졌다.', '비룡형 적에게 10%, 고룡형 적에게 5%의 추가 피해를 준다.'),
  ('로레타의 전투 낫', 150, 'base_game', '우아한 공예품 같은 백은의 전투의 낫.
성수의 기사 로레타의 무기.

카리아의 친위기사로서 받은 무기이나
푸른 휘석은 무구한 금의 보석으로 교체되었다.', null),
  ('노장의 군기', 160, 'base_game', '예스러운 도끼창에
낡고 붉은 군기를 두른 무기.

이미 주인의 모습이 없는 부패한 전쟁터에서
그럼에도 노장 오닐이 계속 들었던 깃발.
노인은 홀로 그 전쟁을 자랑스러워했다.', null),
  ('영혼의 글레이브', 170, 'shadow_of_the_erdtree', '비틀린 조각이 새겨진 날카로운 칼날.
예부터 묘지에서 사용되는 글레이브.

영과 교신하기 위한 촉매라고 한다.', null),
  ('꽃봉오리 치도', 180, 'shadow_of_the_erdtree', '꽃봉오리의 성녀, 로미나의 무기.
흔들리는 꽃봉오리를 칼날 삼은 다홍색 치도.

과거에 불타 무너지려고 하는 교회에서
로미나는 망연히 꽃봉오리를 안고 있었다.
이윽고 그 꽃봉오리는 칼날이 되었다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '도끼창'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('할버드', '돌격', 8.0, '표준 / 관통', 'smithing_stone', true, 306, 0, 0, 0, 0, 55.0, 35.0, 35.0, 35.0, 35.0, 100, 50, 0, 0, 0, 0, 0, 0, 14, 12, 0, 0, 0),
  ('땅 잃은 기사의 도끼창', '돌격', 8.0, '표준 / 관통', 'smithing_stone', true, 306, 0, 0, 0, 0, 55.0, 35.0, 35.0, 35.0, 35.0, 100, 50, 0, 0, 0, 0, 0, 0, 14, 12, 0, 0, 0),
  ('루체른', '돌격', 7.0, '관통', 'smithing_stone', true, 296, 0, 0, 0, 0, 52.0, 33.0, 33.0, 33.0, 33.0, 100, 50, 0, 0, 0, 0, 0, 0, 15, 12, 0, 0, 0),
  ('글레이브', '회전 베기', 10.0, '참격 / 관통', 'smithing_stone', true, 323, 0, 0, 0, 0, 60.0, 38.0, 38.0, 38.0, 38.0, 100, 50, 0, 0, 0, 0, 0, 0, 18, 15, 0, 0, 0),
  ('천한 병사의 쇼텔', '회전 베기', 10.0, '표준 / 관통', 'smithing_stone', true, 296, 0, 0, 0, 0, 55.0, 35.0, 35.0, 35.0, 35.0, 100, 42, 0, 0, 0, 0, 0, 0, 14, 16, 0, 0, 0),
  ('천한 병사의 톱', '회전 베기', 10.0, '표준 / 관통', 'smithing_stone', true, 323, 0, 0, 0, 0, 55.0, 35.0, 35.0, 35.0, 35.0, 100, 42, 0, 0, 55, 0, 0, 0, 15, 13, 0, 0, 0),
  ('수호자의 검창', '회전 베기', 9.0, '표준 / 관통', 'smithing_stone', true, 340, 0, 0, 0, 0, 57.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 0, 0, 0, 0, 17, 16, 0, 0, 0),
  ('가고일의 도끼창', null, null, null, 'smithing_stone', true, 320, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 26, 10, 0, 0, 0),
  ('가고일의 흑도끼창', '회전 베기', null, null, 'somber_smithing_stone', false, 252, 0, 0, 0, 301, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 26, 10, 0, 22, 0),
  ('밤 기병의 글레이브', '회전 베기', null, null, 'smithing_stone', true, 316, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 26, 10, 0, 0, 0),
  ('벌레의 글레이브', '회전 베기', null, null, 'smithing_stone', true, 294, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0),
  ('일그러진 파문 도끼창', '회전 베기', 8.5, '표준 / 관통', 'smithing_stone', false, 210, 0, 0, 0, 0, 56.0, 35.0, 35.0, 35.0, 35.0, 100, 51, 0, 0, 0, 0, 0, 0, 12, 12, 0, 0, 20),
  ('황금 할버드', '황금 나무에 맹세코', 13.5, '표준 / 관통', 'somber_smithing_stone', false, 328, 0, 0, 0, 213, 65.0, 41.0, 41.0, 41.0, 56.0, 100, 57, 0, 0, 0, 0, 0, 0, 30, 14, 0, 12, 0),
  ('용 할버드', '회전 베기', 10.5, '표준 / 관통', 'somber_smithing_stone', false, 330, 0, 0, 0, 0, 58.0, 37.0, 37.0, 50.0, 37.0, 100, 50, 0, 0, 0, 0, 0, 0, 22, 10, 0, 0, 0),
  ('로레타의 전투 낫', '로레타의 참격', 10.0, '참격 / 관통', 'somber_smithing_stone', false, 269, 173, 0, 0, 0, 57.0, 49.0, 36.0, 36.0, 36.0, 100, 50, 0, 0, 0, 0, 0, 0, 20, 15, 20, 0, 0),
  ('노장의 군기', '군기 아래에', 11.5, '표준 / 관통', 'somber_smithing_stone', false, 269, 0, 0, 0, 0, 64.0, 41.0, 41.0, 41.0, 41.0, 100, 50, 0, 0, 0, 0, 0, 0, 24, 14, 0, 0, 0),
  ('영혼의 글레이브', '원혼 베기', 6.5, '참격 / 관통', 'somber_smithing_stone', false, 296, 88, 0, 0, 0, 47.0, 38.0, 33.0, 33.0, 33.0, 100, 42, 0, 0, 0, 0, 0, 0, 14, 17, 16, 0, 0),
  ('꽃봉오리 치도', '로미나의 정화', 10.0, '참격 / 관통', 'somber_smithing_stone', false, 320, 0, 0, 0, 0, 60.0, 38.0, 38.0, 38.0, 38.0, 100, 50, 55, 0, 0, 0, 0, 0, 14, 22, 0, 0, 20)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '표준' then array['standard']::text[] when '타격 / 관통' then array['strike','pierce']::text[] when '관통' then array['pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '도끼창'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
left join public.weapon_skills k on k.name = s.skill_name
  and (s.skill_name <> '회전 베기' or k.fp_cost_text = case when s.name = '용 할버드' then '17 ( - / 11 )' else '6 ( - / 12 )' end)
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('할버드', 'standard', 'C', 'D', '-', '-', '-'),
  ('할버드', 'heavy', 'A', '-', '-', '-', '-'),
  ('할버드', 'keen', 'E', 'B', '-', '-', '-'),
  ('할버드', 'quality', 'B', 'B', '-', '-', '-'),
  ('할버드', 'fire', 'C', 'E', '-', '-', '-'),
  ('할버드', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('할버드', 'lightning', 'E', 'C', '-', '-', '-'),
  ('할버드', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('할버드', 'magic', 'E', 'E', 'B', '-', '-'),
  ('할버드', 'cold', 'B', 'C', 'C', '-', '-'),
  ('할버드', 'poison', 'B', 'C', '-', '-', 'D'),
  ('할버드', 'blood', 'B', 'C', '-', '-', 'D'),
  ('할버드', 'occult', 'D', 'E', '-', '-', 'A'),
  ('땅 잃은 기사의 도끼창', 'standard', 'C', 'C', '-', '-', '-'),
  ('땅 잃은 기사의 도끼창', 'heavy', 'A', '-', '-', '-', '-'),
  ('땅 잃은 기사의 도끼창', 'keen', 'E', 'B', '-', '-', '-'),
  ('땅 잃은 기사의 도끼창', 'quality', 'B', 'B', '-', '-', '-'),
  ('땅 잃은 기사의 도끼창', 'fire', 'C', 'E', '-', '-', '-'),
  ('땅 잃은 기사의 도끼창', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('땅 잃은 기사의 도끼창', 'lightning', 'E', 'C', '-', '-', '-'),
  ('땅 잃은 기사의 도끼창', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('땅 잃은 기사의 도끼창', 'magic', 'E', 'E', 'B', '-', '-'),
  ('땅 잃은 기사의 도끼창', 'cold', 'C', 'C', 'B', '-', '-'),
  ('땅 잃은 기사의 도끼창', 'poison', 'C', 'B', '-', '-', 'D'),
  ('땅 잃은 기사의 도끼창', 'blood', 'C', 'B', '-', '-', 'D'),
  ('땅 잃은 기사의 도끼창', 'occult', 'E', 'D', '-', '-', 'A'),
  ('루체른', 'standard', 'D', 'C', '-', '-', '-'),
  ('루체른', 'heavy', 'A', '-', '-', '-', '-'),
  ('루체른', 'keen', 'E', 'A', '-', '-', '-'),
  ('루체른', 'quality', 'B', 'B', '-', '-', '-'),
  ('루체른', 'fire', 'C', 'E', '-', '-', '-'),
  ('루체른', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('루체른', 'lightning', 'E', 'C', '-', '-', '-'),
  ('루체른', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('루체른', 'magic', 'E', 'E', 'B', '-', '-'),
  ('루체른', 'cold', 'D', 'B', 'C', '-', '-'),
  ('루체른', 'poison', 'D', 'B', '-', '-', 'D'),
  ('루체른', 'blood', 'D', 'B', '-', '-', 'D'),
  ('루체른', 'occult', 'E', 'D', '-', '-', 'B'),
  ('글레이브', 'standard', 'C', 'C', '-', '-', '-'),
  ('글레이브', 'heavy', 'A', '-', '-', '-', '-'),
  ('글레이브', 'keen', 'E', 'B', '-', '-', '-'),
  ('글레이브', 'quality', 'B', 'B', '-', '-', '-'),
  ('글레이브', 'fire', 'C', 'E', '-', '-', '-'),
  ('글레이브', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('글레이브', 'lightning', 'E', 'C', '-', '-', '-'),
  ('글레이브', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('글레이브', 'magic', 'E', 'E', 'B', '-', '-'),
  ('글레이브', 'cold', 'C', 'C', 'C', '-', '-'),
  ('글레이브', 'poison', 'C', 'C', '-', '-', 'D'),
  ('글레이브', 'blood', 'C', 'C', '-', '-', 'D'),
  ('글레이브', 'occult', 'D', 'D', '-', '-', 'B'),
  ('천한 병사의 쇼텔', 'standard', 'E', 'B', '-', '-', '-'),
  ('천한 병사의 쇼텔', 'heavy', 'A', '-', '-', '-', '-'),
  ('천한 병사의 쇼텔', 'keen', 'E', 'A', '-', '-', '-'),
  ('천한 병사의 쇼텔', 'quality', 'B', 'B', '-', '-', '-'),
  ('천한 병사의 쇼텔', 'fire', 'B', 'E', '-', '-', '-'),
  ('천한 병사의 쇼텔', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('천한 병사의 쇼텔', 'lightning', 'E', 'B', '-', '-', '-'),
  ('천한 병사의 쇼텔', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('천한 병사의 쇼텔', 'magic', 'E', 'E', 'B', '-', '-'),
  ('천한 병사의 쇼텔', 'cold', 'E', 'B', 'C', '-', '-'),
  ('천한 병사의 쇼텔', 'poison', 'E', 'A', '-', '-', 'D'),
  ('천한 병사의 쇼텔', 'blood', 'E', 'A', '-', '-', 'D'),
  ('천한 병사의 쇼텔', 'occult', 'E', 'D', '-', '-', 'B'),
  ('천한 병사의 톱', 'standard', 'D', 'C', '-', '-', '-'),
  ('천한 병사의 톱', 'heavy', 'A', '-', '-', '-', '-'),
  ('천한 병사의 톱', 'keen', 'E', 'B', '-', '-', '-'),
  ('천한 병사의 톱', 'quality', 'B', 'B', '-', '-', '-'),
  ('천한 병사의 톱', 'fire', 'C', 'E', '-', '-', '-'),
  ('천한 병사의 톱', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('천한 병사의 톱', 'lightning', 'E', 'C', '-', '-', '-'),
  ('천한 병사의 톱', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('천한 병사의 톱', 'magic', 'E', 'E', 'B', '-', '-'),
  ('천한 병사의 톱', 'cold', 'D', 'B', 'C', '-', '-'),
  ('천한 병사의 톱', 'poison', 'C', 'B', '-', '-', 'D'),
  ('천한 병사의 톱', 'blood', 'C', 'B', '-', '-', 'D'),
  ('천한 병사의 톱', 'occult', 'E', 'D', '-', '-', 'B'),
  ('수호자의 검창', 'standard', 'E', 'B', '-', '-', '-'),
  ('수호자의 검창', 'heavy', 'B', '-', '-', '-', '-'),
  ('수호자의 검창', 'keen', '-', 'A', '-', '-', '-'),
  ('수호자의 검창', 'quality', 'B', 'B', '-', '-', '-'),
  ('수호자의 검창', 'fire', 'C', 'E', '-', '-', '-'),
  ('수호자의 검창', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('수호자의 검창', 'lightning', 'E', 'C', '-', '-', '-'),
  ('수호자의 검창', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('수호자의 검창', 'magic', 'E', 'E', 'C', '-', '-'),
  ('수호자의 검창', 'cold', 'E', 'B', 'D', '-', '-'),
  ('수호자의 검창', 'poison', 'E', 'B', '-', '-', 'D'),
  ('수호자의 검창', 'blood', 'E', 'B', '-', '-', 'D'),
  ('수호자의 검창', 'occult', 'E', 'D', '-', '-', 'B'),
  ('가고일의 도끼창', 'standard', 'B', 'E', '-', '-', '-'),
  ('가고일의 도끼창', 'heavy', 'S', '-', '-', '-', '-'),
  ('가고일의 도끼창', 'keen', 'E', 'A', '-', '-', '-'),
  ('가고일의 도끼창', 'quality', 'B', 'B', '-', '-', '-'),
  ('가고일의 도끼창', 'fire', 'C', 'E', '-', '-', '-'),
  ('가고일의 도끼창', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('가고일의 도끼창', 'lightning', 'E', 'C', '-', '-', '-'),
  ('가고일의 도끼창', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('가고일의 도끼창', 'magic', 'E', 'E', 'B', '-', '-'),
  ('가고일의 도끼창', 'cold', 'B', 'E', 'C', '-', '-'),
  ('가고일의 도끼창', 'poison', 'B', 'E', '-', '-', 'D'),
  ('가고일의 도끼창', 'blood', 'B', 'E', '-', '-', 'D'),
  ('가고일의 도끼창', 'occult', 'D', 'E', '-', '-', 'B'),
  ('가고일의 흑도끼창', 'standard', 'C', 'D', '-', 'D', '-'),
  ('밤 기병의 글레이브', 'standard', 'B', 'E', '-', '-', '-'),
  ('밤 기병의 글레이브', 'heavy', 'S', '-', '-', '-', '-'),
  ('밤 기병의 글레이브', 'keen', 'E', 'A', '-', '-', '-'),
  ('밤 기병의 글레이브', 'quality', 'B', 'B', '-', '-', '-'),
  ('밤 기병의 글레이브', 'fire', 'B', 'E', '-', '-', '-'),
  ('밤 기병의 글레이브', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('밤 기병의 글레이브', 'lightning', 'E', 'B', '-', '-', '-'),
  ('밤 기병의 글레이브', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('밤 기병의 글레이브', 'magic', 'E', 'E', 'B', '-', '-'),
  ('밤 기병의 글레이브', 'cold', 'B', 'E', 'C', '-', '-'),
  ('밤 기병의 글레이브', 'poison', 'B', 'E', '-', '-', 'D'),
  ('밤 기병의 글레이브', 'blood', 'B', 'E', '-', '-', 'D'),
  ('밤 기병의 글레이브', 'occult', 'D', 'E', '-', '-', 'B'),
  ('벌레의 글레이브', 'standard', 'D', 'C', '-', '-', '-'),
  ('벌레의 글레이브', 'heavy', 'A', '-', '-', '-', '-'),
  ('벌레의 글레이브', 'keen', 'E', 'A', '-', '-', '-'),
  ('벌레의 글레이브', 'quality', 'B', 'B', '-', '-', '-'),
  ('벌레의 글레이브', 'fire', 'C', 'E', '-', '-', '-'),
  ('벌레의 글레이브', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('벌레의 글레이브', 'lightning', 'E', 'C', '-', '-', '-'),
  ('벌레의 글레이브', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('벌레의 글레이브', 'magic', 'E', 'E', 'B', '-', '-'),
  ('벌레의 글레이브', 'cold', 'C', 'B', 'C', '-', '-'),
  ('벌레의 글레이브', 'poison', 'C', 'B', '-', '-', 'D'),
  ('벌레의 글레이브', 'blood', 'C', 'B', '-', '-', 'D'),
  ('벌레의 글레이브', 'occult', 'E', 'D', '-', '-', 'A'),
  ('일그러진 파문 도끼창', 'standard', '-', '-', '-', '-', 'S'),
  ('황금 할버드', 'standard', 'B', 'D', '-', 'D', '-'),
  ('용 할버드', 'standard', 'B', 'C', '-', '-', '-'),
  ('로레타의 전투 낫', 'standard', 'C', 'C', 'C', '-', '-'),
  ('노장의 군기', 'standard', 'B', 'D', '-', '-', '-'),
  ('영혼의 글레이브', 'standard', 'D', 'C', 'D', '-', '-'),
  ('꽃봉오리 치도', 'standard', 'E', 'D', '-', '-', 'B')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '도끼창'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
