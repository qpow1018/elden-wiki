-- 사용자 제공 망치 16종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '망치') then
    raise exception '망치 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '망치'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('야만적인 포효','피의 징수','신탁의 거품','유체화','지탄','온 지혜의 세계','꽃의 용뢰','황금 부수기')
    group by name, description having count(*) > 1
  ) then
    raise exception '망치 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('야만적인 포효', '짐승처럼 포효하여 자신을 고무해
공격력을 높이는 전투 기술. 효과 중
강 공격이 야만적인 연속 공격이 된다.', '16 ( - / - )'),
  ('킥', '다리를 높이 들어 차는 기술.
가드에 유효하고 자세를 무너뜨릴 수 있다.
단순하지만 실전적인 전투 기술.', '- ( - / - )'),
  ('피의 징수', '피의 군주가 나눠주는 힘, 혈맹 전투 기술.
회전에 이어 단숨에 연속으로 찌르기를 해
공격한 상대에게서 피와 함께 HP를 뺏는다.', '14 ( - / - )'),
  ('신탁의 거품', '피리를 불어 마력 거품을 쏘는 전투 기술.
거품은 천천히 날아가면서
둥실둥실 목표를 향한다.', '6 ( - / - )'),
  ('유체화', '무기를 일시적으로 액체로 만드는 전투 기술.
크게 휘둘러 주위를 쓸어버린 후
물방울 모양 타격부를 내리친다.', '16 ( - / - )'),
  ('지탄', '손가락을 팽창시키며 구부려 힘을 모으고
손끝으로 적을 날려버리는 전투 기술.', '14 ( - / - )'),
  ('온 지혜의 세계', '왕홀을 들어 주위에 온 지혜의 영역을 펼치는
전투 기술. 영역 내의 모든 자의
마력, 신성 경감률이 감소한다.', '35 ( - / - )'),
  ('꽃의 용뢰', '대상에 고룡의 붉은 벼락을 내리는 전투 기술.
벼락 속성 대미지를 줌과 동시에
일시적으로 벼락 경감률을 저하시킨다 .
차지 공격으로 강화된다.', null),
  ('황금 부수기', '가볍게 도약해 룬의 파편에 빛을 품고
공중에서 힘껏 내리치는 전투 기술.
라다곤의 영웅적 구타.', '26 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and (s.name = '킥' or k.description = s.description));

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('곤봉', 10, 'base_game', '굵고 단단한 나무 막대.
기량이 필요 없는 타격 무기.

단순하고 원시적인 무기이며
그저 힘에 맡기고 끈질기게 때려
적을 쓰러뜨린다.', null),
  ('굽은 곤봉', 20, 'base_game', '포물선 형태로 휜 단단한 곤봉.

기량이 부족한 백금의 사람이
곡검 대신 휘두르는 물건.
하지만 비슷한 건 형태뿐이다.', null),
  ('이빨 달린 곤봉', 30, 'base_game', '타격부에 짐승 이빨을 두른 곤봉.
고르지 않은 이빨에는 출혈 효과가 있다.

굳센 아인에게만 주어지는 명예로운 무기.
적어도 그들은 그렇다고 믿는다.', null),
  ('돌 곤봉', 40, 'base_game', '단단한 휘석을 깎아 만든 전쟁마술사들의 무기.
크기에 비해 매우 무거운 곤봉.
마력은 딱히 띠고 있지 않다.

전쟁이란 무엇인가? 그 본질을 잃지 않기 위해서
전쟁마술사는 자기 손으로 적을 쳐부순다.', null),
  ('메이스', 50, 'base_game', '자루 끝에 돌기가 달린 타격 무기.

타격 속성의 공격은 범용성이 좋고
적의 자세나 가드를 무너뜨리기 쉬워
정면 승부에 적합하다.', null),
  ('모닝스타', 60, 'base_game', '자루에 별 같은 구가 달린 전투망치.
타격 무기이면서
별의 가시가 적의 출혈을 유발한다.

우아한 이름과는 다르게 피비린내 나는 무기.', null),
  ('워 피크', 70, 'base_game', '한쪽 끝부분이 단단하고 뾰족한 전투망치.
전투용 곡괭이.

단순하지만 효과가 높은 무기이며
무거운 관통 공격은 금속 갑옷을 쉽게 뚫는다.', null),
  ('해머', 80, 'base_game', '자루 끝에 큰 돌을 고정시킨 해머.
본래는 대장장이가 쓰는 도구.

고대에 단조는 거인의 기술이었다고 하며
이 무기의 타격은 매우 무겁다.', null),
  ('승병의 화염망치', 90, 'base_game', '흔들리는 불꽃을 본뜬 전투망치.
거인들의 산령에서 찾아온
불의 승병들의 독특한 무기.

전의를 불꽃처럼 솟구치게 하는
강 공격이 특징적이다.', null),
  ('바레의 꽃다발', 100, 'base_game', '장미 꽃다발을 본뜬 메이스.
그 꽃잎은 모두 날카로운 칼날이며
장미는 늘 피로 물들어있다.

그 모습은 백면 바레의 말과 비슷하다.
과장되었고 아름답지만 위험하기 짝이 없다.', null),
  ('사자들의 피리', 110, 'base_game', '신탁의 사자가 쓰는 황금 피리.
묵직해서 때리는 무기도 된다.

원래는 역시 악기이지만
사람의 몸으로 불 수는 없다.
혹은 아직 그럴 때가 오지 않았다.', null),
  ('녹스의 유체망치', 120, 'base_game', '영원한 도읍의 승려들이 쓰는 메이스.
완만하게 흐르듯 굽은 물방울 모양 망치.

은 물방울에서 유래한 액체 금속을
단단하게 벼렸다.', null),
  ('반지손가락', 130, 'base_game', '무거운 반지를 몆 개나 낀 큰 손가락의 망치.
손가락벌레의 조상에서 잘린 것이라고 한다.
그것은 오래된 모독의 유산이며
아직 살아남아 희미하게 미지근하다.', null),
  ('온 지혜의 왕홀', 140, 'base_game', '구슬을 잡은 손을 본뜬 왕홀.
온 지혜의 기드온 오프닐 경이 사용하는 무기.

그 구슬은 세상이자 우주이자 눈동자이며
앎에 끝이란 없음을 가리킨다.
그럼에도 온 지혜는 손을 뻗는다.', null),
  ('꽃바위 망치', 150, 'shadow_of_the_erdtree', '용찬의 무녀가 사용하는 무기.
고대꽃을 본뜬 용바위 망치.

그 꽃술과 네 장의 꽃잎은 날카로워
용을 상대할 때 큰 대미지를 입힌다.', '비룡형 적에게 1.3배, 고룡형 적에게 1.15배 대미지를 준다.'),
  ('마리카의 망치', 160, 'base_game', '틈새의 땅 바깥, 희인의 땅에서
만들어졌다는 돌 망치.
여왕 마리카가 엘든 링을 부수려 하고
라다곤이 그것을 수복하려고 한 것.

부순 충격에 반쯤 망가졌고 룬 파편이 박혔다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '망치'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('곤봉', '야만적인 포효', 3.5, '타격', 'smithing_stone', true, 252, 0, 0, 0, 0, 41.0, 27.0, 27.0, 27.0, 27.0, 100, 32, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0),
  ('굽은 곤봉', '야만적인 포효', 5.0, '타격', 'smithing_stone', true, 279, 0, 0, 0, 0, 45.0, 30.0, 30.0, 30.0, 30.0, 100, 36, 0, 0, 0, 0, 0, 0, 11, 7, 0, 0, 0),
  ('이빨 달린 곤봉', '야만적인 포효', 5.0, '타격', 'smithing_stone', true, 279, 0, 0, 0, 0, 45.0, 30.0, 30.0, 30.0, 30.0, 100, 36, 0, 0, 50, 0, 0, 0, 12, 7, 0, 0, 0),
  ('돌 곤봉', '킥', 7.0, '타격', 'smithing_stone', true, 298, 0, 0, 0, 0, 52.0, 35.0, 35.0, 35.0, 35.0, 100, 42, 0, 0, 0, 0, 0, 0, 16, 8, 0, 0, 0),
  ('메이스', '킥', 4.5, '타격', 'smithing_stone', true, 281, 0, 0, 0, 0, 45.0, 30.0, 30.0, 30.0, 30.0, 100, 36, 0, 0, 0, 0, 0, 0, 12, 7, 0, 0, 0),
  ('모닝스타', '킥', 5.0, '타격 / 관통', 'smithing_stone', true, 289, 0, 0, 0, 0, 47.0, 31.0, 31.0, 31.0, 31.0, 100, 37, 0, 0, 50, 0, 0, 0, 12, 8, 0, 0, 0),
  ('워 피크', '킥', 2.5, '관통', 'smithing_stone', true, 264, 0, 0, 0, 0, 40.0, 27.0, 27.0, 27.0, 27.0, 100, 32, 0, 0, 0, 0, 0, 0, 11, 9, 0, 0, 0),
  ('해머', '킥', 6.5, '타격', 'smithing_stone', true, 303, 0, 0, 0, 0, 51.0, 34.0, 34.0, 34.0, 34.0, 100, 43, 0, 0, 0, 0, 0, 0, 14, 7, 0, 0, 0),
  ('승병의 화염망치', '킥', 6.0, '타격', 'smithing_stone', true, 308, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 100, 39, 0, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0),
  ('바레의 꽃다발', '피의 징수', 2.0, '타격', 'somber_smithing_stone', false, 112, 0, 0, 0, 0, 38.0, 25.0, 25.0, 25.0, 25.0, 100, 27, 0, 0, 65, 0, 0, 0, 8, 16, 0, 0, 24),
  ('사자들의 피리', '신탁의 거품', 4.0, '타격', 'somber_smithing_stone', false, 235, 0, 0, 0, 151, 38.0, 26.0, 26.0, 26.0, 38.0, 100, 30, 0, 0, 0, 0, 0, 0, 10, 12, 0, 16, 0),
  ('녹스의 유체망치', '유체화', 6.5, '타격', 'somber_smithing_stone', false, 298, 0, 0, 0, 0, 51.0, 34.0, 34.0, 34.0, 34.0, 100, 37, 0, 0, 0, 0, 0, 0, 17, 7, 0, 0, 0),
  ('반지손가락', '지탄', 4.5, '타격', 'somber_smithing_stone', false, 296, 0, 0, 0, 0, 38.0, 26.0, 26.0, 26.0, 38.0, 100, 30, 0, 0, 0, 0, 0, 0, 15, 9, 0, 0, 0),
  ('온 지혜의 왕홀', '온 지혜의 세계', 4.5, '타격 / 관통', 'somber_smithing_stone', false, 242, 156, 0, 0, 0, 36.0, 36.0, 25.0, 25.0, 25.0, 100, 27, 0, 0, 0, 0, 0, 0, 12, 18, 21, 0, 0),
  ('꽃바위 망치', '꽃의 용뢰', null, '관통', 'somber_smithing_stone', false, 296, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 14, 8, 0, 0, 15),
  ('마리카의 망치', '황금 부수기', 6.0, '타격', 'somber_smithing_stone', false, 247, 0, 0, 0, 159, 44.0, 30.0, 30.0, 30.0, 44.0, 100, 36, 0, 0, 0, 0, 0, 0, 20, 12, 0, 19, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '관통' then array['pierce']::text[] when '타격 / 관통' then array['strike','pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '망치'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
  and (s.skill_name <> '유체화' or k.description = '무기를 일시적으로 액체로 만드는 전투 기술.
크게 휘둘러 주위를 쓸어버린 후
물방울 모양 타격부를 내리친다.')
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('곤봉', 'standard', 'B', '-', '-', '-', '-'),
  ('곤봉', 'heavy', 'A', '-', '-', '-', '-'),
  ('곤봉', 'keen', 'E', 'A', '-', '-', '-'),
  ('곤봉', 'quality', 'B', 'B', '-', '-', '-'),
  ('곤봉', 'fire', 'C', 'E', '-', '-', '-'),
  ('곤봉', 'flame_art', 'D', '-', '-', 'B', '-'),
  ('곤봉', 'lightning', 'E', 'C', '-', '-', '-'),
  ('곤봉', 'sacred', 'D', '-', '-', 'B', '-'),
  ('곤봉', 'magic', 'D', '-', 'B', '-', '-'),
  ('곤봉', 'cold', 'B', '-', 'C', '-', '-'),
  ('곤봉', 'poison', 'B', '-', '-', '-', 'D'),
  ('곤봉', 'blood', 'B', '-', '-', '-', 'D'),
  ('곤봉', 'occult', 'B', '-', '-', '-', 'B'),
  ('굽은 곤봉', 'standard', 'B', 'D', '-', '-', '-'),
  ('굽은 곤봉', 'heavy', 'S', '-', '-', '-', '-'),
  ('굽은 곤봉', 'keen', 'E', 'B', '-', '-', '-'),
  ('굽은 곤봉', 'quality', 'B', 'B', '-', '-', '-'),
  ('굽은 곤봉', 'fire', 'C', 'E', '-', '-', '-'),
  ('굽은 곤봉', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('굽은 곤봉', 'lightning', 'E', 'C', '-', '-', '-'),
  ('굽은 곤봉', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('굽은 곤봉', 'magic', 'E', 'E', 'B', '-', '-'),
  ('굽은 곤봉', 'cold', 'B', 'D', 'C', '-', '-'),
  ('굽은 곤봉', 'poison', 'B', 'D', '-', '-', 'D'),
  ('굽은 곤봉', 'blood', 'B', 'D', '-', '-', 'D'),
  ('굽은 곤봉', 'occult', 'D', 'E', '-', '-', 'B'),
  ('이빨 달린 곤봉', 'standard', 'C', 'C', '-', '-', '-'),
  ('이빨 달린 곤봉', 'heavy', 'A', '-', '-', '-', '-'),
  ('이빨 달린 곤봉', 'keen', 'E', 'B', '-', '-', '-'),
  ('이빨 달린 곤봉', 'quality', 'B', 'B', '-', '-', '-'),
  ('이빨 달린 곤봉', 'fire', 'C', 'E', '-', '-', '-'),
  ('이빨 달린 곤봉', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('이빨 달린 곤봉', 'lightning', 'E', 'C', '-', '-', '-'),
  ('이빨 달린 곤봉', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('이빨 달린 곤봉', 'magic', 'E', 'E', 'B', '-', '-'),
  ('이빨 달린 곤봉', 'cold', 'B', 'C', 'C', '-', '-'),
  ('이빨 달린 곤봉', 'poison', 'B', 'C', '-', '-', 'D'),
  ('이빨 달린 곤봉', 'blood', 'B', 'C', '-', '-', 'D'),
  ('이빨 달린 곤봉', 'occult', 'D', 'E', '-', '-', 'A'),
  ('돌 곤봉', 'standard', 'B', 'E', '-', '-', '-'),
  ('돌 곤봉', 'heavy', 'A', '-', '-', '-', '-'),
  ('돌 곤봉', 'keen', 'D', 'B', '-', '-', '-'),
  ('돌 곤봉', 'quality', 'B', 'B', '-', '-', '-'),
  ('돌 곤봉', 'fire', 'C', 'E', '-', '-', '-'),
  ('돌 곤봉', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('돌 곤봉', 'lightning', 'E', 'C', '-', '-', '-'),
  ('돌 곤봉', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('돌 곤봉', 'magic', 'D', 'E', 'B', '-', '-'),
  ('돌 곤봉', 'cold', 'B', 'E', 'C', '-', '-'),
  ('돌 곤봉', 'poison', 'B', 'D', '-', '-', 'D'),
  ('돌 곤봉', 'blood', 'B', 'D', '-', '-', 'D'),
  ('돌 곤봉', 'occult', 'D', 'E', '-', '-', 'B'),
  ('메이스', 'standard', 'C', 'D', '-', '-', '-'),
  ('메이스', 'heavy', 'A', '-', '-', '-', '-'),
  ('메이스', 'keen', 'E', 'B', '-', '-', '-'),
  ('메이스', 'quality', 'B', 'B', '-', '-', '-'),
  ('메이스', 'fire', 'C', 'E', '-', '-', '-'),
  ('메이스', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('메이스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('메이스', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('메이스', 'magic', 'E', 'E', 'B', '-', '-'),
  ('메이스', 'cold', 'B', 'D', 'B', '-', '-'),
  ('메이스', 'poison', 'B', 'D', '-', '-', 'D'),
  ('메이스', 'blood', 'B', 'D', '-', '-', 'D'),
  ('메이스', 'occult', 'D', 'E', '-', '-', 'B'),
  ('모닝스타', 'standard', 'C', 'D', '-', '-', '-'),
  ('모닝스타', 'heavy', 'B', '-', '-', '-', '-'),
  ('모닝스타', 'keen', 'E', 'B', '-', '-', '-'),
  ('모닝스타', 'quality', 'B', 'B', '-', '-', '-'),
  ('모닝스타', 'fire', 'C', 'E', '-', '-', '-'),
  ('모닝스타', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('모닝스타', 'lightning', 'E', 'C', '-', '-', '-'),
  ('모닝스타', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('모닝스타', 'magic', 'E', 'E', 'B', '-', '-'),
  ('모닝스타', 'cold', 'C', 'C', 'C', '-', '-'),
  ('모닝스타', 'poison', 'C', 'C', '-', '-', 'D'),
  ('모닝스타', 'blood', 'C', 'C', '-', '-', 'D'),
  ('모닝스타', 'occult', 'D', 'E', '-', '-', 'B'),
  ('워 피크', 'standard', 'C', 'C', '-', '-', '-'),
  ('워 피크', 'heavy', 'B', '-', '-', '-', '-'),
  ('워 피크', 'keen', 'E', 'B', '-', '-', '-'),
  ('워 피크', 'quality', 'B', 'B', '-', '-', '-'),
  ('워 피크', 'fire', 'C', 'E', '-', '-', '-'),
  ('워 피크', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('워 피크', 'lightning', 'E', 'C', '-', '-', '-'),
  ('워 피크', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('워 피크', 'magic', 'E', 'E', 'B', '-', '-'),
  ('워 피크', 'cold', 'C', 'C', 'C', '-', '-'),
  ('워 피크', 'poison', 'C', 'C', '-', '-', 'D'),
  ('워 피크', 'blood', 'C', 'C', '-', '-', 'D'),
  ('워 피크', 'occult', 'E', 'E', '-', '-', 'B'),
  ('해머', 'standard', 'B', 'D', '-', '-', '-'),
  ('해머', 'heavy', 'A', '-', '-', '-', '-'),
  ('해머', 'keen', 'E', 'B', '-', '-', '-'),
  ('해머', 'quality', 'B', 'B', '-', '-', '-'),
  ('해머', 'fire', 'C', 'E', '-', '-', '-'),
  ('해머', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('해머', 'lightning', 'E', 'C', '-', '-', '-'),
  ('해머', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('해머', 'magic', 'E', 'E', 'B', '-', '-'),
  ('해머', 'cold', 'B', 'D', 'C', '-', '-'),
  ('해머', 'poison', 'B', 'D', '-', '-', 'D'),
  ('해머', 'blood', 'B', 'D', '-', '-', 'D'),
  ('해머', 'occult', 'D', 'E', '-', '-', 'B'),
  ('승병의 화염망치', 'standard', 'D', 'B', '-', '-', '-'),
  ('승병의 화염망치', 'heavy', 'B', '-', '-', '-', '-'),
  ('승병의 화염망치', 'keen', 'E', 'A', '-', '-', '-'),
  ('승병의 화염망치', 'quality', 'B', 'B', '-', '-', '-'),
  ('승병의 화염망치', 'fire', 'C', 'E', '-', '-', '-'),
  ('승병의 화염망치', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('승병의 화염망치', 'lightning', 'E', 'C', '-', '-', '-'),
  ('승병의 화염망치', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('승병의 화염망치', 'magic', 'E', 'E', 'C', '-', '-'),
  ('승병의 화염망치', 'cold', 'D', 'B', 'D', '-', '-'),
  ('승병의 화염망치', 'poison', 'D', 'B', '-', '-', 'D'),
  ('승병의 화염망치', 'blood', 'D', 'B', '-', '-', 'D'),
  ('승병의 화염망치', 'occult', 'E', 'D', '-', '-', 'B'),
  ('바레의 꽃다발', 'standard', 'E', 'C', '-', '-', 'B'),
  ('사자들의 피리', 'standard', 'C', 'C', '-', 'C', '-'),
  ('녹스의 유체망치', 'standard', 'B', 'D', '-', '-', '-'),
  ('반지손가락', 'standard', 'B', 'D', '-', '-', '-'),
  ('온 지혜의 왕홀', 'standard', 'D', 'C', 'C', '-', '-'),
  ('꽃바위 망치', 'standard', 'C', 'D', '-', '-', 'C'),
  ('마리카의 망치', 'standard', 'B', 'D', '-', 'C', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '망치'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
