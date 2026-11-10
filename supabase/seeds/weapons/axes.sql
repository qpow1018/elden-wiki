-- 사용자 제공 도끼 17종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '도끼') then
    raise exception '도끼 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '도끼'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('퀵스텝','용 모습의 화염','난격','워 크라이','서리 밟기','벼락 폭풍','로제스의 부름','순뢰/쌍도끼')
    group by name, description having count(*) > 1
  ) then
    raise exception '도끼 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('퀵스텝', '기민함과 교란으로 싸우는 자들의 전투 기술.
재빠르게 스텝 이동한다.
타깃 고정 상태라면 돌아 들어간다.', '3 ( - / - )'),
  ('용 모습의 화염', '용 모양의 입에서 불을 뿜는 전투 기술.
좌우로 흔들리며 전방을 불태운다.
화염은 잠시 땅을 계속 불태운다.', '14'),
  ('난격', '마구잡이로 무기를 휘두르는 전투 기술.
길게 누르는 동안 계속 공격하며 일반 공격 및
강 공격으로 추가 공격도 가능하다.', '2 ( 10 / 15 )'),
  ('워 크라이', '포효로 자신을 고무해 공격력을 높이는
전투 기술.
효과 중 강 공격이 돌진 공격으로 변화한다.', '16 ( - / - )'),
  ('서리 밟기', '땅을 세게 밟아 서리를 일으키는 전투 기술.
서리에는 동상 상태 이상 효과가 있다.', '10 ( - / - )'),
  ('벼락 폭풍', '날개 칼날에 벼락을 둘러 주위에 벼락 폭풍을
일으키는 전투 기술. 추가 입력으로 2번까지
회전하는 추가 공격으로 잇는다.
칼날에 두른 벼락은 잠시 지속된다.', '19 ( - / 12 )'),
  ('로제스의 부름', '도끼를 들고 죽음을 헤매는 자들을 불러낸다.
3체가 떨어진 장소에 불려 와서
소환자에 맞춰 공격한 후 사라진다.', '15 ( - / - )'),
  ('순뢰/쌍도끼', '낮은 자세에서 자신을 벼락으로 바꾸어
전방으로 고속 이동하는 전투 기술.
강 공격으로 벼락을 두른 회전 베기로
이을 수 있다.', '8 ( - / 10 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and (s.name = '퀵스텝' or k.description = s.description));

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('핸드 액스', 10, 'base_game', '손도끼라고도 불리는 소형 도끼.
원래는 무기가 아닌 일상 도구.

무기의 공격 범위는 짧지만
도끼치고 연속 공격에 뛰어나며 다루기 쉽다.', null),
  ('두갈래 손도끼', 20, 'base_game', '임프들이 지닌 기묘한 손도끼.

완만히 휘고 두 갈래로 갈라진 선단은
임프의 혀라 불리며, 출혈 효과가 있다.', null),
  ('두 갈래 혀 손도끼', 30, 'shadow_of_the_erdtree', '임프들이 지닌 기묘한 무기.
두 갈래 혀를 내민 용 모습의 손도끼.

완만히 휘고 두 갈래로 갈라진 선단은
임프의 혀라 불리며, 출혈 효과가 있다.', null),
  ('배틀 액스', 40, 'base_game', '자루 끝에 두껍고 무거운 날을 단 전투 도끼.
범용성이 높은 표준 속성 무기.

무거운 칼날을 내려치는 공격은 위력이 높고
도끼의 차지 공격은 특히 강력하다.', null),
  ('메스메르 병사의 도끼', 50, 'shadow_of_the_erdtree', '가시공 메스메르를 섬기는 병사들의 무기.
손때묻은 철 칼날의 양날 도끼.

왕의 전쟁에 심취한 병사들이 즐겨 썼으며
차지 공격이 강력하다.', '차지 공격이 강력하다.'),
  ('일그러진 도끼', 60, 'base_game', '구불텅하게 휜 양날 도끼.
도끼치고는 대형이다.

엄청난 힘으로 내려침을 반복한 이 무기는
근력만으로 사용할 수 있다.', null),
  ('치열 도끼', 70, 'base_game', '초식 짐승의 두개골로 만들어진 도끼.
금속을 기피하는 선조령의 백성이 쓰는 무기.

칼날 대신 어금니를 늘어놓은
적을 으깨는 타격 속성 도끼.', null),
  ('철 나대', 80, 'base_game', '큼지막한 철제 나대.
박해받은 혼종들의 무기.

끈질기게 때리고, 달려와 때리는
원한이 담긴 무기.', null),
  ('하이랜드 액스', 90, 'base_game', '고지의 전사가 쓰는 한쪽에 칼날이 달린 도끼.

전사의 싸움은 이름을 대는 외침으로 시작하며
이 무기는 포효를 강화한다.', '포효 전투 기술과 포효 파생 강공격의 위력을 10% 강화한다. 용찬 브레스에는 적용되지 않는다.'),
  ('유문 도끼', 100, 'shadow_of_the_erdtree', '유문문자가 새겨진 도끼.
단조술에 의한 투척 무기 중 하나.

강 공격, 점프 강 공격으로
도끼를 투척한다.

전투 기술에 속성이 있는 전회를 사용할 수 없다.', null),
  ('축제의 나대', 110, 'base_game', '색색의 천으로 장식된 나대.
풍차 마을 도미눌라의 축제에 사용되는
무희들의 제구.

인간의 뼈로 만들어졌으며
공격 명중 시 매우 소량의 룬을 얻는다.', '공격 명중 시 룬 10을 얻는다.'),
  ('산 제물 도끼', 120, 'base_game', '옛 산 제물 의식에서 사용된 손도끼.
죽음의 새를 악신으로서 본떴다.

의식의 힘은 아직도 남아있으며
적을 쓰러뜨리면 FP를 조금 회복한다.', '적 처치 시 FP를 4 회복한다.'),
  ('빙각의 도끼', 130, 'base_game', '얼어붙은 껍질 칼날을 지닌 손도끼.
최북단의 성채 소르에서 온 헌상품.

얼어붙는 안개라 불리는 용의 비늘이라고 하며
강한 동상 상태 이상 효과를 가졌다.', '비룡형 적에게 1.2배, 고룡형 적에게 1.1배 대미지를 준다.'),
  ('파문의 검', 140, 'base_game', '젊은 백금의 사람들이 쓰는 특별한 무기.
그들의 생명의 원초라고 여겨지는
물방울의 파문을 본뜬 검.

그 공격력은 신비에 의해 크게 강화된다.', null),
  ('폭풍 매 도끼', 150, 'base_game', '매를 본떠 그 날개를 칼날 삼은 전투 도끼.
먼 고향을 떠나서도
폭풍과 함께하고자 하는 전사의 무기.

그 마음은 긍지 높고, 고로 망가지기 쉽다.', null),
  ('로제스의 도끼', 160, 'base_game', '틈새의 땅 각지에서 지하 묘지를 가리키는
죽음의 안내자 로제스가 조각된 의식 도끼.

예부터 죽은 자는 헤매는 자이니
매달릴 상대가 필요하다.', null),
  ('죽음 기사의 쌍도끼', 170, 'shadow_of_the_erdtree', '죽음 기사들의 황금 전투 도끼.
양손 잡기로 두 자루가 되는 한 쌍의 무기.

도읍 고룡신앙의 힘인 벼락을 띠고 있다.

과거에 고드윈의 근위기사였던 그들은
죽음의 왕자, 그 분신의 시체를 수호했다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '도끼'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('핸드 액스', '퀵스텝', 3.5, '표준', 'smithing_stone', true, 286, 0, 0, 0, 0, 42.0, 28.0, 28.0, 28.0, 28.0, 100, 33, 0, 0, 0, 0, 0, 0, 9, 8, 0, 0, 0),
  ('두갈래 손도끼', '퀵스텝', 2.5, '표준 / 관통', 'smithing_stone', true, 276, 0, 0, 0, 0, 40.0, 27.0, 27.0, 27.0, 27.0, 100, 32, 0, 0, 50, 0, 0, 0, 9, 14, 0, 0, 0),
  ('두 갈래 혀 손도끼', '용 모습의 화염', 4, '표준 / 관통', 'smithing_stone', false, 306, 0, 0, 0, 0, 45, 30, 30, 30, 30, 100, 36, 0, 0, 50, 0, 0, 0, 10, 13, 0, 0, 0),
  ('배틀 액스', '난격', 4.5, '표준', 'smithing_stone', true, 313, 0, 0, 0, 0, 47.0, 31.0, 31.0, 31.0, 31.0, 100, 37, 0, 0, 0, 0, 0, 0, 12, 8, 0, 0, 0),
  ('메스메르 병사의 도끼', '워 크라이', 5.5, '표준', 'smithing_stone', true, 325, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 100, 39, 0, 0, 0, 0, 0, 0, 14, 10, 0, 0, 0),
  ('일그러진 도끼', '워 크라이', 7.5, '표준', 'smithing_stone', true, 303, 0, 0, 0, 0, 56.0, 37.0, 37.0, 37.0, 37.0, 100, 51, 0, 0, 0, 0, 0, 0, 24, 8, 0, 0, 0),
  ('치열 도끼', '난격', 5.5, '타격', 'smithing_stone', true, 318, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 100, 43, 0, 0, 0, 0, 0, 0, 14, 8, 0, 0, 0),
  ('철 나대', '난격', 6.0, '표준', 'smithing_stone', true, 306, 0, 0, 0, 0, 51.0, 34.0, 34.0, 34.0, 34.0, 100, 40, 0, 0, 0, 0, 0, 0, 15, 7, 0, 0, 0),
  ('하이랜드 액스', '워 크라이', 4.5, '표준', 'smithing_stone', true, 313, 0, 0, 0, 0, 47.0, 31.0, 31.0, 31.0, 31.0, 110, 37, 0, 0, 0, 0, 0, 0, 12, 9, 0, 0, 0),
  ('유문 도끼', '난격', 5, '표준', 'smithing_stone', true, 320, 0, 0, 0, 0, 48, 32, 32, 32, 32, 100, 38, 0, 0, 0, 0, 0, 0, 13, 10, 11, 11, 0),
  ('축제의 나대', '난격', 4.5, '표준', 'smithing_stone', true, 306, 0, 0, 0, 0, 47.0, 31.0, 31.0, 31.0, 31.0, 100, 39, 0, 0, 0, 0, 0, 0, 12, 8, 0, 0, 0),
  ('산 제물 도끼', '난격', 5.5, '표준', 'smithing_stone', true, 325, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 100, 39, 0, 0, 0, 0, 0, 0, 16, 10, 0, 0, 0),
  ('빙각의 도끼', '서리 밟기', 3.0, '표준', 'somber_smithing_stone', false, 281, 0, 0, 0, 0, 40.0, 27.0, 27.0, 27.0, 27.0, 100, 29, 0, 65, 0, 0, 0, 0, 11, 16, 0, 0, 0),
  ('파문의 검', '난격', 4.5, '표준', 'smithing_stone', false, 183, 0, 0, 0, 0, 47.0, 31.0, 31.0, 31.0, 31.0, 100, 37, 0, 0, 0, 0, 0, 0, 11, 11, 0, 0, 20),
  ('폭풍 매 도끼', '벼락 폭풍', 5.5, '표준', 'somber_smithing_stone', false, 333, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 100, 34, 0, 0, 0, 0, 0, 0, 19, 15, 0, 0, 0),
  ('로제스의 도끼', '로제스의 부름', 5.5, '표준', 'somber_smithing_stone', false, 274, 176, 0, 0, 0, 44.0, 44.0, 30.0, 30.0, 30.0, 100, 36, 0, 0, 0, 0, 0, 0, 18, 10, 18, 0, 0),
  ('죽음 기사의 쌍도끼', '순뢰/쌍도끼', 5.5, '표준', 'somber_smithing_stone', false, 247, 0, 0, 159, 0, 44.0, 30.0, 30.0, 44.0, 30.0, 100, 36, 0, 0, 0, 0, 0, 0, 14, 12, 0, 16, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '표준' then array['standard']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '도끼'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('핸드 액스', 'standard', 'D', 'C', '-', '-', '-'),
  ('핸드 액스', 'heavy', 'A', '-', '-', '-', '-'),
  ('핸드 액스', 'keen', 'E', 'B', '-', '-', '-'),
  ('핸드 액스', 'quality', 'B', 'B', '-', '-', '-'),
  ('핸드 액스', 'fire', 'C', 'E', '-', '-', '-'),
  ('핸드 액스', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('핸드 액스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('핸드 액스', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('핸드 액스', 'magic', 'E', 'E', 'C', '-', '-'),
  ('핸드 액스', 'cold', 'D', 'B', 'D', '-', '-'),
  ('핸드 액스', 'poison', 'D', 'B', '-', '-', 'D'),
  ('핸드 액스', 'blood', 'D', 'B', '-', '-', 'D'),
  ('핸드 액스', 'occult', 'E', 'D', '-', '-', 'B'),
  ('두갈래 손도끼', 'standard', 'D', 'B', '-', '-', '-'),
  ('두갈래 손도끼', 'heavy', 'B', '-', '-', '-', '-'),
  ('두갈래 손도끼', 'keen', 'E', 'A', '-', '-', '-'),
  ('두갈래 손도끼', 'quality', 'B', 'B', '-', '-', '-'),
  ('두갈래 손도끼', 'fire', 'C', 'E', '-', '-', '-'),
  ('두갈래 손도끼', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('두갈래 손도끼', 'lightning', 'E', 'C', '-', '-', '-'),
  ('두갈래 손도끼', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('두갈래 손도끼', 'magic', 'E', 'E', 'B', '-', '-'),
  ('두갈래 손도끼', 'cold', 'D', 'B', 'C', '-', '-'),
  ('두갈래 손도끼', 'poison', 'D', 'B', '-', '-', 'D'),
  ('두갈래 손도끼', 'blood', 'D', 'B', '-', '-', 'D'),
  ('두갈래 손도끼', 'occult', 'E', 'D', '-', '-', 'B'),
  ('두 갈래 혀 손도끼', 'standard', 'D', 'C', '-', '-', '-'),
  ('배틀 액스', 'standard', 'C', 'D', '-', '-', '-'),
  ('배틀 액스', 'heavy', 'A', '-', '-', '-', '-'),
  ('배틀 액스', 'keen', 'E', 'B', '-', '-', '-'),
  ('배틀 액스', 'quality', 'B', 'B', '-', '-', '-'),
  ('배틀 액스', 'fire', 'C', 'E', '-', '-', '-'),
  ('배틀 액스', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('배틀 액스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('배틀 액스', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('배틀 액스', 'magic', 'E', 'E', 'C', '-', '-'),
  ('배틀 액스', 'cold', 'C', 'D', 'C', '-', '-'),
  ('배틀 액스', 'poison', 'C', 'D', '-', '-', 'D'),
  ('배틀 액스', 'blood', 'C', 'D', '-', '-', 'D'),
  ('배틀 액스', 'occult', 'D', 'E', '-', '-', 'B'),
  ('메스메르 병사의 도끼', 'standard', 'C', 'C', '-', '-', '-'),
  ('메스메르 병사의 도끼', 'heavy', 'B', '-', '-', '-', '-'),
  ('메스메르 병사의 도끼', 'keen', 'E', 'B', '-', '-', '-'),
  ('메스메르 병사의 도끼', 'quality', 'B', 'B', '-', '-', '-'),
  ('메스메르 병사의 도끼', 'fire', 'C', 'E', '-', '-', '-'),
  ('메스메르 병사의 도끼', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('메스메르 병사의 도끼', 'lightning', 'E', 'C', '-', '-', '-'),
  ('메스메르 병사의 도끼', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('메스메르 병사의 도끼', 'magic', 'E', 'E', 'C', '-', '-'),
  ('메스메르 병사의 도끼', 'cold', 'C', 'C', 'C', '-', '-'),
  ('메스메르 병사의 도끼', 'poison', 'C', 'C', '-', '-', 'D'),
  ('메스메르 병사의 도끼', 'blood', 'C', 'C', '-', '-', 'D'),
  ('메스메르 병사의 도끼', 'occult', 'E', 'E', '-', '-', 'B'),
  ('일그러진 도끼', 'standard', 'B', '-', '-', '-', '-'),
  ('일그러진 도끼', 'heavy', 'S', '-', '-', '-', '-'),
  ('일그러진 도끼', 'keen', 'D', 'A', '-', '-', '-'),
  ('일그러진 도끼', 'quality', 'B', 'B', '-', '-', '-'),
  ('일그러진 도끼', 'fire', 'C', 'E', '-', '-', '-'),
  ('일그러진 도끼', 'flame_art', 'C', '-', '-', 'C', '-'),
  ('일그러진 도끼', 'lightning', 'D', 'C', '-', '-', '-'),
  ('일그러진 도끼', 'sacred', 'C', '-', '-', 'C', '-'),
  ('일그러진 도끼', 'magic', 'D', '-', 'B', '-', '-'),
  ('일그러진 도끼', 'cold', 'A', '-', 'C', '-', '-'),
  ('일그러진 도끼', 'poison', 'A', '-', '-', '-', 'D'),
  ('일그러진 도끼', 'blood', 'A', '-', '-', '-', 'D'),
  ('일그러진 도끼', 'occult', 'B', '-', '-', '-', 'B'),
  ('치열 도끼', 'standard', 'B', 'D', '-', '-', '-'),
  ('치열 도끼', 'heavy', 'A', '-', '-', '-', '-'),
  ('치열 도끼', 'keen', 'E', 'B', '-', '-', '-'),
  ('치열 도끼', 'quality', 'B', 'B', '-', '-', '-'),
  ('치열 도끼', 'fire', 'C', 'E', '-', '-', '-'),
  ('치열 도끼', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('치열 도끼', 'lightning', 'E', 'C', '-', '-', '-'),
  ('치열 도끼', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('치열 도끼', 'magic', 'E', 'E', 'C', '-', '-'),
  ('치열 도끼', 'cold', 'B', 'D', 'D', '-', '-'),
  ('치열 도끼', 'poison', 'B', 'D', '-', '-', 'D'),
  ('치열 도끼', 'blood', 'B', 'D', '-', '-', 'D'),
  ('치열 도끼', 'occult', 'D', 'E', '-', '-', 'B'),
  ('철 나대', 'standard', 'B', 'D', '-', '-', '-'),
  ('철 나대', 'heavy', 'S', '-', '-', '-', '-'),
  ('철 나대', 'keen', 'E', 'A', '-', '-', '-'),
  ('철 나대', 'quality', 'B', 'B', '-', '-', '-'),
  ('철 나대', 'fire', 'C', 'E', '-', '-', '-'),
  ('철 나대', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('철 나대', 'lightning', 'E', 'C', '-', '-', '-'),
  ('철 나대', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('철 나대', 'magic', 'D', 'E', 'B', '-', '-'),
  ('철 나대', 'cold', 'B', 'D', 'C', '-', '-'),
  ('철 나대', 'poison', 'B', 'D', '-', '-', 'D'),
  ('철 나대', 'blood', 'B', 'D', '-', '-', 'D'),
  ('철 나대', 'occult', 'D', 'E', '-', '-', 'A'),
  ('하이랜드 액스', 'standard', 'C', 'D', '-', '-', '-'),
  ('하이랜드 액스', 'heavy', 'B', '-', '-', '-', '-'),
  ('하이랜드 액스', 'keen', 'E', 'B', '-', '-', '-'),
  ('하이랜드 액스', 'quality', 'B', 'B', '-', '-', '-'),
  ('하이랜드 액스', 'fire', 'C', 'E', '-', '-', '-'),
  ('하이랜드 액스', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('하이랜드 액스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('하이랜드 액스', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('하이랜드 액스', 'magic', 'E', 'E', 'C', '-', '-'),
  ('하이랜드 액스', 'cold', 'C', 'C', 'D', '-', '-'),
  ('하이랜드 액스', 'poison', 'C', 'C', '-', '-', 'D'),
  ('하이랜드 액스', 'blood', 'C', 'C', '-', '-', 'D'),
  ('하이랜드 액스', 'occult', 'E', 'E', '-', '-', 'B'),
  ('유문 도끼', 'standard', 'C', 'D', 'E', 'E', '-'),
  ('유문 도끼', 'heavy', 'B', '-', 'E', 'E', '-'),
  ('유문 도끼', 'keen', 'E', 'B', 'E', 'E', '-'),
  ('유문 도끼', 'quality', 'B', 'B', 'E', 'E', '-'),
  ('유문 도끼', 'fire', 'C', 'E', 'E', 'E', '-'),
  ('유문 도끼', 'flame_art', 'E', 'E', 'E', 'C', '-'),
  ('유문 도끼', 'lightning', 'E', 'C', 'E', 'E', '-'),
  ('유문 도끼', 'sacred', 'E', 'E', 'E', 'C', '-'),
  ('유문 도끼', 'magic', 'E', 'E', 'C', 'E', '-'),
  ('유문 도끼', 'cold', 'C', 'D', 'C', 'E', '-'),
  ('유문 도끼', 'poison', 'C', 'D', 'E', 'E', 'D'),
  ('유문 도끼', 'blood', 'C', 'D', 'E', 'E', 'D'),
  ('유문 도끼', 'occult', 'E', 'E', 'E', 'E', 'B'),
  ('축제의 나대', 'standard', 'C', 'D', '-', '-', '-'),
  ('축제의 나대', 'heavy', 'B', '-', '-', '-', '-'),
  ('축제의 나대', 'keen', 'E', 'B', '-', '-', '-'),
  ('축제의 나대', 'quality', 'B', 'B', '-', '-', '-'),
  ('축제의 나대', 'fire', 'C', 'E', '-', '-', '-'),
  ('축제의 나대', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('축제의 나대', 'lightning', 'E', 'C', '-', '-', '-'),
  ('축제의 나대', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('축제의 나대', 'magic', 'E', 'E', 'C', '-', '-'),
  ('축제의 나대', 'cold', 'C', 'D', 'C', '-', '-'),
  ('축제의 나대', 'poison', 'C', 'D', '-', '-', 'D'),
  ('축제의 나대', 'blood', 'C', 'D', '-', '-', 'D'),
  ('축제의 나대', 'occult', 'D', 'E', '-', '-', 'B'),
  ('산 제물 도끼', 'standard', 'C', 'D', '-', '-', '-'),
  ('산 제물 도끼', 'heavy', 'B', '-', '-', '-', '-'),
  ('산 제물 도끼', 'keen', 'E', 'B', '-', '-', '-'),
  ('산 제물 도끼', 'quality', 'B', 'B', '-', '-', '-'),
  ('산 제물 도끼', 'fire', 'C', 'E', '-', '-', '-'),
  ('산 제물 도끼', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('산 제물 도끼', 'lightning', 'E', 'C', '-', '-', '-'),
  ('산 제물 도끼', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('산 제물 도끼', 'magic', 'E', 'E', 'C', '-', '-'),
  ('산 제물 도끼', 'cold', 'C', 'D', 'C', '-', '-'),
  ('산 제물 도끼', 'poison', 'C', 'D', '-', '-', 'D'),
  ('산 제물 도끼', 'blood', 'C', 'D', '-', '-', 'D'),
  ('산 제물 도끼', 'occult', 'D', 'E', '-', '-', 'B'),
  ('빙각의 도끼', 'standard', 'D', 'B', '-', '-', '-'),
  ('파문의 검', 'standard', '-', '-', '-', '-', 'S'),
  ('폭풍 매 도끼', 'standard', 'C', 'C', '-', '-', '-'),
  ('로제스의 도끼', 'standard', 'B', 'D', 'C', '-', '-'),
  ('죽음 기사의 쌍도끼', 'standard', 'C', 'D', '-', 'C', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '도끼'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
