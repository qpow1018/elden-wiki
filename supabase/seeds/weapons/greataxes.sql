-- 사용자 제공 대형 도끼 14종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '대형 도끼') then
    raise exception '대형 도끼 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '대형 도끼'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('야만적인 포효','워 크라이','난격','칼날 갈기','순뢰/긴 자루 도끼','악령 부르기','엎드려라!','회전 길로틴')
    group by name, description having count(*) > 1
  ) then
    raise exception '대형 도끼 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('야만적인 포효', '짐승처럼 포효하여 자신을 고무해
공격력을 높이는 전투 기술. 효과 중
강 공격이 야만적인 연속 공격이 된다.', '16 ( - / - )'),
  ('워 크라이', '포효로 자신을 고무해 공격력을 높이는
전투 기술.
효과 중 강 공격이 돌진 공격으로 변화한다.', '16 ( - / - )'),
  ('난격', '마구잡이로 무기를 휘두르는 전투 기술.
길게 누르는 동안 계속 공격하며 일반 공격 및
강 공격으로 추가 공격도 가능하다.', '2 ( - / - )'),
  ('칼날 갈기', '칼날을 쓰다듬듯이 갈아서 예리함을 더하고', '16 ( - / - )'),
  ('순뢰/긴 자루 도끼', '낮은 자세에서 자신을 벼락으로 바꾸어
전방으로 고속 이동하는 전투 기술.
강 공격으로 벼락을 두른 도약 베기로
이을 수 있다.', '8 ( - / 13 )'),
  ('악령 부르기', '큰 뿔의 날개를 들어 악령을 부르는 전투 기술는
주위 적의 방어력을 일시적으로 저하시킨다.', '12 ( - / - )'),
  ('엎드려라!', '왕의 도끼를 땅에 연속으로 내리쳐 충격파와
함께 대지를 두 번 흔드는 전투 기술.
추가 입력으로 한 번 더 대지를 흔든다.', '15 ( - / 15 )'),
  ('회전 길로틴', '무기의 양 끝을 들고 몸을 뒤로 젖히며
머리 위에서 수렁의 칼날을 내리치는 전투 기술.
추가 입력으로 스태미나가 다할 때까지 공격하며
강 공격은 도약 후 회전 공격으로 이을 수 있다.', '15 ( - / 15 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('그레이트 액스', 10, 'base_game', '쇳덩어리처럼 거대한 도끼. 대형 도끼는
미개한 땅의 왕이 쓴 무기로 유명하다.

평범한 근력으로는 쓸 수 없을 만큼 무거우나
내려치는 공격, 특히 차지 공격의 위력은
대단하다.', null),
  ('초승달도끼', 20, 'base_game', '포물선 형태의 큰 칼날을 가진
자루가 긴 대형 도끼.
초승달이라는 이름은 향수이리라.

긴 자루를 살려 베어넘기는 일격이 특징이다.', null),
  ('긴 자루 나대', 30, 'base_game', '큼지막한 철제 나대. 그중 자루가 긴 것.
박해받은 혼종들의 무기.

원심력을 살린, 원한이 실린 일격은
쉽게 움츠러들지 않는다', '공격 시 쉽게 움츠러들지 않는다.'),
  ('요참의 큰 나대', 40, 'base_game', '긴 자루에 용접된 두꺼운 나대.
전장에서 패잔병 처리에 사용되었으며
몸통을 통나무처럼 베었다고 한다.

그래서인지 치명적인 일격에 뛰어나다.', null),
  ('흉조잡이의 큰 나대', 50, 'base_game', '흉조의 아이에게서 베어낸 휜 뿔을
칼날에 빽빽하게 늘어놓은 이형의 무기.
흉조잡이들이 휘두르는 학살의 무기.

추한 뿔에는 출혈 효과가 있어
아비규환을 물들일 것이다.', null),
  ('녹슨 닻', 60, 'base_game', '녹슨 닻을 무기 삼아 휘두르는 것.
네 개의 닻 갈고리는 굵고 날카로워
관통 속성 공격이 된다.

과거에 빛바랜 자가
왕과 함께 틈새의 땅을 떠났을 때
한 척의 배가 남겨졌다고 한다.', null),
  ('해체 식칼', 70, 'base_game', '인체를 깔끔하게 발라내기 위한 큰 식칼.
손가락 무녀로 위장해 수많은 빛바랜 자를 먹은
귀녀 아나스타시아의 무기.

공격 명중 시 HP를 조금 회복한다.', '공격 명중 시 최대 HP의 약 1%를 회복한다.'),
  ('보니의 부엌칼', 80, 'shadow_of_the_erdtree', '보니 마을의 큰 항아리 도공들이 쓰는 무기.
감옥에 넣을 큰 항아리를 만들기 위해
인체를 잘라내는 큰 부엌칼.

공격 명중 시 HP를 약간 회복한다.', '공격 명중 시 HP를 약간 회복한다.'),
  ('가고일의 대형 도끼', 90, 'base_game', '영웅 가고일이 드는 청동 대형 도끼.

가고일 본체가 그렇듯이
빠진 부분을 시랍으로 메꾼
영웅들의 누더기이다.', null),
  ('가고일의 흑도끼', 100, 'base_game', '영웅 가고일이 드는 청동 대형 도끼를
메꾸는 시랍이 검은색인 것.
신성 속성 공격력을 지닌다.

흑검 말리케스를 섬겼다는 표시이다.', null),
  ('죽음 기사의 긴 자루 도끼', 110, 'shadow_of_the_erdtree', '죽음 기사들의 황금 긴 자루 도끼.
좀먹힌 황금 고리를 본떴다.

도읍 고룡신앙의 힘인 벼락을 띠고 있다.

과거에 고드윈의 근위기사였던 그들은
죽음의 왕자, 그 분신의 시체를 수호했다.', null),
  ('날개의 큰 뿔', 120, 'base_game', '선조령의 힘이 강하게 깃든 특별한 뿔.
날개의 큰 뿔을 제례 무기로 휘두른다.

그것은 선조령 신앙에서 심부름꾼의 날개이며
싹틀 일 없는 생명을 베어낸다.', null),
  ('고드릭의 왕 도끼', 130, 'base_game', '접목의 고드릭이 사용한 대형 도끼.
짐승의 모습을 새긴 황금의 전투 도끼.

그것은 황금 일족의 조상이자
첫 엘데의 왕, 고드프리의 힘의 상징이다.
불손하다, 나야말로 황금의 군주이니라.', null),
  ('수렁의 큰 나대', 140, 'shadow_of_the_erdtree', '수렁의 기사가 사용한 무기.
사람의 뼈를 아치 형태로 늘어놓고
수렁을 굳혀 칼날 삼은 큰 나대.

신비로 그 위력이 높아진다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 도끼'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('그레이트 액스', '야만적인 포효', 13.0, '표준', 'smithing_stone', true, 369, 0, 0, 0, 0, 69.0, 37.0, 37.0, 37.0, 37.0, 100, 54, 0, 0, 0, 0, 0, 0, 30, 8, 0, 0, 0),
  ('초승달도끼', '워 크라이', 12.5, '표준', 'smithing_stone', true, 357, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 0, 0, 0, 0, 25, 15, 0, 0, 0),
  ('긴 자루 나대', '워 크라이', 12.5, '표준', 'smithing_stone', true, 357, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 0, 0, 0, 0, 24, 8, 0, 0, 0),
  ('요참의 큰 나대', '워 크라이', 15.0, '표준', 'smithing_stone', true, 367, 0, 0, 0, 0, 74.0, 40.0, 40.0, 40.0, 40.0, 115, 57, 0, 0, 0, 0, 0, 0, 34, 8, 0, 0, 0),
  ('흉조잡이의 큰 나대', '난격', 11.0, '표준', 'smithing_stone', true, 347, 0, 0, 0, 0, 63.0, 33.0, 33.0, 33.0, 33.0, 100, 50, 0, 0, 55, 0, 0, 0, 23, 12, 0, 0, 0),
  ('녹슨 닻', '야만적인 포효', 12.5, '관통', 'smithing_stone', true, 360, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 0, 0, 0, 0, 26, 9, 0, 0, 0),
  ('해체 식칼', '야만적인 포효', 12.5, '표준', 'smithing_stone', true, 328, 0, 0, 0, 0, 58.0, 31.0, 31.0, 31.0, 31.0, 100, 44, 0, 0, 0, 0, 0, 0, 16, 20, 0, 0, 0),
  ('보니의 부엌칼', '칼날 갈기', 8.5, '표준', 'somber_smithing_stone', false, 328, 0, 0, 0, 0, 58.0, 31.0, 31.0, 31.0, 31.0, 100, 40, 0, 0, 0, 0, 0, 0, 16, 20, 0, 0, 0),
  ('가고일의 대형 도끼', '워 크라이', 8.5, '표준', 'smithing_stone', true, 301, 0, 0, 0, 0, 58.0, 31.0, 31.0, 31.0, 31.0, 100, 44, 0, 0, 0, 0, 0, 0, 24, 8, 0, 0, 0),
  ('가고일의 흑도끼', '워 크라이', 8.5, '표준', 'somber_smithing_stone', false, 245, 0, 0, 0, 294, 49.0, 27.0, 27.0, 27.0, 54.0, 100, 46, 0, 0, 0, 0, 0, 0, 24, 8, 0, 22, 0),
  ('죽음 기사의 긴 자루 도끼', '순뢰/긴 자루 도끼', 11.5, '표준', 'somber_smithing_stone', false, 276, 0, 0, 178, 0, 61.0, 32.0, 32.0, 46.0, 32.0, 100, 47, 0, 0, 0, 0, 0, 0, 23, 10, 0, 18, 0),
  ('날개의 큰 뿔', '악령 부르기', 11.0, '표준', 'somber_smithing_stone', false, 318, 150, 0, 0, 0, 65.0, 35.0, 35.0, 35.0, 35.0, 100, 42, 0, 0, 0, 0, 0, 0, 30, 20, 0, 0, 0),
  ('고드릭의 왕 도끼', '엎드려라!', 11.0, '표준', 'somber_smithing_stone', false, 347, 0, 0, 0, 0, 65.0, 35.0, 35.0, 35.0, 35.0, 100, 46, 0, 0, 0, 0, 0, 0, 34, 22, 0, 0, 0),
  ('수렁의 큰 나대', '회전 길로틴', 11.0, '참격', 'somber_smithing_stone', false, 345, 102, 0, 0, 0, 66.0, 44.0, 38.0, 38.0, 38.0, 100, 46, 0, 55, 0, 0, 0, 0, 28, 10, 0, 0, 15)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '표준' then array['standard']::text[] when '관통' then array['pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 도끼'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('그레이트 액스', 'standard', 'C', 'D', '-', '-', '-'),
  ('그레이트 액스', 'heavy', 'A', '-', '-', '-', '-'),
  ('그레이트 액스', 'keen', 'E', 'B', '-', '-', '-'),
  ('그레이트 액스', 'quality', 'B', 'B', '-', '-', '-'),
  ('그레이트 액스', 'fire', 'C', 'E', '-', '-', '-'),
  ('그레이트 액스', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('그레이트 액스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('그레이트 액스', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('그레이트 액스', 'magic', 'E', 'E', 'C', '-', '-'),
  ('그레이트 액스', 'cold', 'B', 'D', 'C', '-', '-'),
  ('그레이트 액스', 'poison', 'B', 'D', '-', '-', 'D'),
  ('그레이트 액스', 'blood', 'B', 'D', '-', '-', 'D'),
  ('그레이트 액스', 'occult', 'D', 'E', '-', '-', 'B'),
  ('초승달도끼', 'standard', 'D', 'C', '-', '-', '-'),
  ('초승달도끼', 'heavy', 'A', '-', '-', '-', '-'),
  ('초승달도끼', 'keen', 'E', 'B', '-', '-', '-'),
  ('초승달도끼', 'quality', 'B', 'B', '-', '-', '-'),
  ('초승달도끼', 'fire', 'C', 'E', '-', '-', '-'),
  ('초승달도끼', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('초승달도끼', 'lightning', 'E', 'C', '-', '-', '-'),
  ('초승달도끼', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('초승달도끼', 'magic', 'E', 'E', 'B', '-', '-'),
  ('초승달도끼', 'cold', 'C', 'C', 'C', '-', '-'),
  ('초승달도끼', 'poison', 'C', 'C', '-', '-', 'D'),
  ('초승달도끼', 'blood', 'C', 'C', '-', '-', 'D'),
  ('초승달도끼', 'occult', 'E', 'D', '-', '-', 'B'),
  ('긴 자루 나대', 'standard', 'C', 'D', '-', '-', '-'),
  ('긴 자루 나대', 'heavy', 'A', '-', '-', '-', '-'),
  ('긴 자루 나대', 'keen', 'E', 'B', '-', '-', '-'),
  ('긴 자루 나대', 'quality', 'B', 'B', '-', '-', '-'),
  ('긴 자루 나대', 'fire', 'C', 'E', '-', '-', '-'),
  ('긴 자루 나대', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('긴 자루 나대', 'lightning', 'E', 'C', '-', '-', '-'),
  ('긴 자루 나대', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('긴 자루 나대', 'magic', 'E', 'E', 'B', '-', '-'),
  ('긴 자루 나대', 'cold', 'C', 'C', 'C', '-', '-'),
  ('긴 자루 나대', 'poison', 'C', 'C', '-', '-', 'D'),
  ('긴 자루 나대', 'blood', 'C', 'C', '-', '-', 'D'),
  ('긴 자루 나대', 'occult', 'D', 'E', '-', '-', 'B'),
  ('요참의 큰 나대', 'standard', 'B', 'E', '-', '-', '-'),
  ('요참의 큰 나대', 'heavy', 'A', '-', '-', '-', '-'),
  ('요참의 큰 나대', 'keen', 'E', 'B', '-', '-', '-'),
  ('요참의 큰 나대', 'quality', 'B', 'B', '-', '-', '-'),
  ('요참의 큰 나대', 'fire', 'C', 'E', '-', '-', '-'),
  ('요참의 큰 나대', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('요참의 큰 나대', 'lightning', 'E', 'C', '-', '-', '-'),
  ('요참의 큰 나대', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('요참의 큰 나대', 'magic', 'E', 'E', 'C', '-', '-'),
  ('요참의 큰 나대', 'cold', 'B', 'E', 'D', '-', '-'),
  ('요참의 큰 나대', 'poison', 'B', 'E', '-', '-', 'D'),
  ('요참의 큰 나대', 'blood', 'B', 'E', '-', '-', 'D'),
  ('요참의 큰 나대', 'occult', 'D', 'E', '-', '-', 'B'),
  ('흉조잡이의 큰 나대', 'standard', 'C', 'D', '-', '-', '-'),
  ('흉조잡이의 큰 나대', 'heavy', 'A', '-', '-', '-', '-'),
  ('흉조잡이의 큰 나대', 'keen', 'E', 'B', '-', '-', '-'),
  ('흉조잡이의 큰 나대', 'quality', 'B', 'B', '-', '-', '-'),
  ('흉조잡이의 큰 나대', 'fire', 'C', 'E', '-', '-', '-'),
  ('흉조잡이의 큰 나대', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('흉조잡이의 큰 나대', 'lightning', 'E', 'C', '-', '-', '-'),
  ('흉조잡이의 큰 나대', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('흉조잡이의 큰 나대', 'magic', 'E', 'E', 'B', '-', '-'),
  ('흉조잡이의 큰 나대', 'cold', 'B', 'D', 'C', '-', '-'),
  ('흉조잡이의 큰 나대', 'poison', 'B', 'D', '-', '-', 'D'),
  ('흉조잡이의 큰 나대', 'blood', 'B', 'D', '-', '-', 'D'),
  ('흉조잡이의 큰 나대', 'occult', 'D', 'E', '-', '-', 'B'),
  ('녹슨 닻', 'standard', 'B', 'E', '-', '-', '-'),
  ('녹슨 닻', 'heavy', 'A', '-', '-', '-', '-'),
  ('녹슨 닻', 'keen', 'E', 'B', '-', '-', '-'),
  ('녹슨 닻', 'quality', 'B', 'B', '-', '-', '-'),
  ('녹슨 닻', 'fire', 'C', 'E', '-', '-', '-'),
  ('녹슨 닻', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('녹슨 닻', 'lightning', 'E', 'C', '-', '-', '-'),
  ('녹슨 닻', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('녹슨 닻', 'magic', 'D', 'E', 'C', '-', '-'),
  ('녹슨 닻', 'cold', 'B', 'E', 'D', '-', '-'),
  ('녹슨 닻', 'poison', 'B', 'E', '-', '-', 'D'),
  ('녹슨 닻', 'blood', 'B', 'E', '-', '-', 'D'),
  ('녹슨 닻', 'occult', 'D', 'E', '-', '-', 'B'),
  ('해체 식칼', 'standard', 'E', 'B', '-', '-', '-'),
  ('해체 식칼', 'heavy', 'A', '-', '-', '-', '-'),
  ('해체 식칼', 'keen', 'E', 'A', '-', '-', '-'),
  ('해체 식칼', 'quality', 'B', 'B', '-', '-', '-'),
  ('해체 식칼', 'fire', 'C', 'E', '-', '-', '-'),
  ('해체 식칼', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('해체 식칼', 'lightning', 'E', 'C', '-', '-', '-'),
  ('해체 식칼', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('해체 식칼', 'magic', 'E', 'D', 'B', '-', '-'),
  ('해체 식칼', 'cold', 'E', 'B', 'C', '-', '-'),
  ('해체 식칼', 'poison', 'D', 'B', '-', '-', 'D'),
  ('해체 식칼', 'blood', 'D', 'B', '-', '-', 'D'),
  ('해체 식칼', 'occult', 'E', 'D', '-', '-', 'B'),
  ('보니의 부엌칼', 'standard', 'B', 'D', '-', '-', '-'),
  ('가고일의 대형 도끼', 'standard', 'B', 'E', '-', '-', '-'),
  ('가고일의 대형 도끼', 'heavy', 'S', '-', '-', '-', '-'),
  ('가고일의 대형 도끼', 'keen', 'D', 'A', '-', '-', '-'),
  ('가고일의 대형 도끼', 'quality', 'B', 'B', '-', '-', '-'),
  ('가고일의 대형 도끼', 'fire', 'B', 'E', '-', '-', '-'),
  ('가고일의 대형 도끼', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('가고일의 대형 도끼', 'lightning', 'E', 'B', '-', '-', '-'),
  ('가고일의 대형 도끼', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('가고일의 대형 도끼', 'magic', 'D', 'E', 'B', '-', '-'),
  ('가고일의 대형 도끼', 'cold', 'A', 'E', 'B', '-', '-'),
  ('가고일의 대형 도끼', 'poison', 'A', 'E', '-', '-', 'D'),
  ('가고일의 대형 도끼', 'blood', 'A', 'E', '-', '-', 'D'),
  ('가고일의 대형 도끼', 'occult', 'D', 'E', '-', '-', 'B'),
  ('가고일의 흑도끼', 'standard', 'C', 'E', '-', 'D', '-'),
  ('죽음 기사의 긴 자루 도끼', 'standard', 'B', 'E', '-', 'D', '-'),
  ('날개의 큰 뿔', 'standard', 'B', 'B', '-', '-', '-'),
  ('고드릭의 왕 도끼', 'standard', 'C', 'C', '-', '-', '-'),
  ('수렁의 큰 나대', 'standard', 'C', 'E', '-', '-', 'C')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 도끼'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
