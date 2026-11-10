-- 사용자 제공 대형 망치 16종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '대형 망치') then
    raise exception '대형 망치 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '대형 망치'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('야만적인 포효','참기','과시하는 포효','퍼붓는 거품','솟아나는 신앙','짐승왕의 발톱','세계 먹는 자')
    group by name, description having count(*) > 1
  ) then
    raise exception '대형 망치 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('야만적인 포효', '짐승처럼 포효하여 자신을 고무해
공격력을 높이는 전투 기술. 효과 중
강 공격이 야만적인 연속 공격이 된다.', '16 ( - / - )'),
  ('참기', '각오와 함께 자세를 낮추고 버텨
순간적으로 강인도를 높이는 전투 기술.
참기 중에는 대미지도 경감된다.', '9 ( - / - )'),
  ('과시하는 포효', '스스로 과시하듯 포효하여
공격력, 방어력, 스태미나 회복 속도를
높이는 전투 기술.', '16 ( - / - )'),
  ('퍼붓는 거품', '피리를 불어 마력 거품을 대량으로 쏘는
전투 기술.
거품은 천천히 날아가면서 퍼붓는다.', '16 ( - / - )'),
  ('솟아나는 신앙', '존안의 술잔에 비라크의 신앙의 불꽃을 태우고
그것을 치켜들어 대량의 불을 뿜는 전투 기술.
추가 입력으로 몇 번이든 치켜든다.', '15 ( - / 15 )'),
  ('짐승왕의 발톱', '큰 망치를 땅에 내리쳐 짐승왕의 다섯 발톱으로
대지를 크게 가르는 전투 기술.', '20 ( - / - )'),
  ('세계 먹는 자', '마력을 담은 왕홀을 땅에 두어
주위 모든 적에게서 HP를 뺏는 전투 기술.', '35 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('라지 클럽', 10, 'base_game', '크고 단단한 거대한 나무 막대기.
기량이 필요없는 타격 무기.

단순하고 원시적인 무기이며
힘껏 붕붕 휘두른다.', null),
  ('큰 굽은 곤봉', 20, 'base_game', '포물선 형태로 휜 단단하고 큰 곤봉.

기량이 부족한 백금의 사람이
곡검 대신 휘두르는 물건이지만
곡검에는 없는 무게와 위력이 있다.', null),
  ('그레이트 메이스', 30, 'base_game', '자루 끝에 돌기가 달린 대형 타격 무기.
메이스를 그대로 대형화한 것.

타격 무기의 장점도 유지했기에 범용성이 좋고
적의 자세나 가드를 무너뜨리기 쉽다.
단순한 치고받기에서는 최강의 무기 중 하나.', null),
  ('곡괭이', 40, 'base_game', '두꺼운 암반을 부수는 큰 곡괭이.
늠름한 채석꾼들의 도구.

원래는 무기가 아니지만
갑옷 따위 쉽게 뚫는 위력이 있다.
작은 항아리 녀석, 너는 바위보다 두껍나?', '다른 대형 망치 대신 대형 도끼와 쌍수로 사용할 수 있다.'),
  ('적석 망치', 50, 'base_game', '돌벽에 쌓인 돌을 그대로 사용한 무기.
훗날 영웅이 된, 봉기를 일으킨 일꾼의 무기.

대형 망치 중에서도 특히 무겁기에
거인 같은 근력이 필요하다.', null),
  ('배틀 해머', 60, 'base_game', '과거에 검투를 위해 만들어진 철제 대형 망치.
투기장에서 쫓긴 투사들의 무기.

갑옷째 적을 짓누를 만큼의 무게가 있다.', null),
  ('부패한 배틀 해머', 70, 'base_game', '과거에 검투를 위해 만들어진 철제 대형 망치가
붉은 부패에 잠식된 것.

갑옷째 적을 짓누를 만큼의 무게가 있다.', null),
  ('축제의 큰 두개', 80, 'base_game', '색색의 천과 꽃으로 장식된 대형 망치.
풍차 마을 도미눌라의 축제에 사용되는
무희들의 제구.

인간이라기에는 너무 큰 두개골로 만들어졌으며
공격 명중 시 약간의 룬을 얻는다.', '공격 명중 시 룬 20을 얻는다.'),
  ('그레이트스타즈', 90, 'base_game', '거대한 삼중성 구가 달린 대형 망치.
별의 가시가 적의 출혈을 유발한다.

피투성이 별은 흉조이며
공격 명중 시 HP를 약간 회복한다.', '공격 명중 시 최대 HP의 1%를 회복한다.'),
  ('흑철 대형 망치', 100, 'shadow_of_the_erdtree', '가시공 메스메르를 섬기는 흑기사들의 무기.
흑철에 황금 의장을 더한 대형 망치.

미리 황금 나무의 기도를 담았으며
신성 공격력 부여 시 크게 위력이 높아진다.
또한, 가드 카운터로 그 힘을 해방한다.', '신성 공격력 부여 시 위력이 크게 높아지며 가드 카운터로 신성 추가 공격을 일으킨다.'),
  ('유문의 대형 망치', 110, 'shadow_of_the_erdtree', '유문문자가 새겨진 대형 망치.
단조술에 의한 투척 무기 중 하나.

강 공격, 대시 후 강 공격으로
회전하면서 대형 망치를 투척한다.

전투 기술에 속성이 있는 전회를 사용할 수 없다.', null),
  ('큰 뿔 망치', 120, 'base_game', '나이테처럼 주름이 새겨진
굵은 뿔로 때리는 무기.
선조령의 백성 전사가 사용한다.

오래된 뿔에는 선조령의 힘이 깃든다고 여기며
적을 쓰러뜨리면 HP를 조금 회복한다.', '적 처치 시 최대 HP의 2%와 HP 20을 회복한다.'),
  ('사자들의 긴 피리', 130, 'base_game', '신탁의 사자가 쓰는 황금 긴 피리.
묵직해서 때리는 무기도 된다.

원래는 역시 악기이지만
사람의 몸으로 불 수는 없다.
혹은 아직 그럴 때가 오지 않았다.', null),
  ('존안의 촛대', 140, 'base_game', '가장 위대한 거인의 불 주교, 비라크.
그 존안을 모시기 위한 촛대.

승병들의 불을 향한 방심을 우려한 비라크는
스스로 목을 베어 훈계의 촛대로 만들었다.
그 머리에는 지금도 그의 신앙이 맴돈다.', null),
  ('짐승 발톱 대형 망치', 150, 'base_game', '자루 끝에 짐승 발톱 5개를 단 대형 망치.

황금 갈기를 덮는 검은 발톱은
훗날 고드프리 왕의 재상이 된
짐승왕 세로시의 상징이었다.', '차지 강공격의 피해 배율이 다른 대형 망치보다 높다.'),
  ('세계 먹는 자의 왕홀', 160, 'base_game', '세계를 삼켜버리려고 하는 큰 뱀의 왕홀.
모독의 군주가 언젠가 치켜들고자 하는 상징.
「전설의 무기」 중 하나.

그 모습은 큰 뱀에 먹힌 라이커드가
임사 순간에 본 미래의 환시라고 한다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 망치'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('라지 클럽', '야만적인 포효', 8.5, '타격', 'smithing_stone', true, 320, 0, 0, 0, 0, 60.0, 32.0, 32.0, 32.0, 32.0, 100, 45, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0),
  ('큰 굽은 곤봉', '야만적인 포효', 10.0, '타격', 'smithing_stone', true, 355, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 0, 0, 0, 0, 24, 10, 0, 0, 0),
  ('그레이트 메이스', '참기', 11.5, '타격', 'smithing_stone', true, 328, 0, 0, 0, 0, 71.0, 38.0, 38.0, 38.0, 38.0, 100, 55, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0),
  ('곡괭이', '참기', 10.0, '관통', 'smithing_stone', true, 352, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 0, 0, 0, 0, 22, 10, 0, 0, 0),
  ('적석 망치', '야만적인 포효', 12.5, '타격', 'smithing_stone', true, 298, 0, 0, 0, 0, 74, 40.0, 40.0, 40.0, 40.0, 100, 57, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 0),
  ('배틀 해머', '과시하는 포효', 10.0, '타격', 'smithing_stone', true, 320, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 0, 0, 0, 0, 26, 8, 0, 0, 0),
  ('부패한 배틀 해머', '과시하는 포효', 10.0, '타격', 'smithing_stone', true, 308, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 65, 0, 0, 0, 0, 0, 26, 8, 0, 0, 0),
  ('축제의 큰 두개', '야만적인 포효', 8.5, '타격', 'smithing_stone', true, 338, 0, 0, 0, 0, 63.0, 34.0, 34.0, 34.0, 34.0, 100, 48, 0, 0, 0, 0, 0, 0, 18, 12, 0, 0, 0),
  ('그레이트스타즈', '참기', 10.0, '타격', 'smithing_stone', true, 330, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 55, 0, 0, 0, 22, 12, 0, 0, 0),
  ('흑철 대형 망치', '참기', 12.0, '타격', 'smithing_stone', true, 343, 0, 0, 0, 102, 72.0, 38.0, 38.0, 38.0, 45.0, 100, 56, 0, 0, 0, 0, 0, 0, 25, 11, 0, 17, 0),
  ('유문의 대형 망치', '참기', 9.0, '타격', 'smithing_stone', true, 345, 0, 0, 0, 0, 65.0, 35.0, 35.0, 35.0, 35.0, 100, 50, 0, 0, 0, 0, 0, 0, 20, 10, 11, 11, 0),
  ('큰 뿔 망치', '야만적인 포효', 10.0, '타격', 'smithing_stone', true, 328, 0, 0, 0, 0, 65.0, 35.0, 35.0, 35.0, 35.0, 100, 50, 0, 0, 0, 0, 0, 0, 22, 10, 0, 0, 0),
  ('사자들의 긴 피리', '퍼붓는 거품', 9.5, '타격', 'somber_smithing_stone', false, 294, 0, 0, 0, 191, 58.0, 31.0, 31.0, 31.0, 42.0, 100, 42, 0, 0, 0, 0, 0, 0, 23, 11, 0, 18, 0),
  ('존안의 촛대', '솟아나는 신앙', 12.5, '타격', 'somber_smithing_stone', false, 240, 0, 240, 0, 0, 71.0, 37.0, 51.0, 37.0, 37.0, 100, 52, 0, 0, 0, 0, 0, 0, 26, 8, 0, 22, 0),
  ('짐승 발톱 대형 망치', '짐승왕의 발톱', 9.0, '타격', 'somber_smithing_stone', false, 284, 0, 0, 0, 183, 62.0, 33.0, 33.0, 33.0, 45.0, 100, 46, 0, 0, 0, 0, 0, 0, 20, 10, 0, 18, 0),
  ('세계 먹는 자의 왕홀', '세계 먹는 자', 11.5, '타격', 'somber_smithing_stone', false, 274, 0, 169, 0, 0, 62.0, 33.0, 45.0, 33.0, 33.0, 100, 46, 0, 0, 0, 0, 0, 0, 24, 20, 0, 25, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '관통' then array['pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 망치'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('라지 클럽', 'standard', 'B', '-', '-', '-', '-'),
  ('라지 클럽', 'heavy', 'A', '-', '-', '-', '-'),
  ('라지 클럽', 'keen', 'E', 'B', '-', '-', '-'),
  ('라지 클럽', 'quality', 'B', 'B', '-', '-', '-'),
  ('라지 클럽', 'fire', 'C', 'E', '-', '-', '-'),
  ('라지 클럽', 'flame_art', 'D', '-', '-', 'C', '-'),
  ('라지 클럽', 'lightning', 'E', 'C', '-', '-', '-'),
  ('라지 클럽', 'sacred', 'D', '-', '-', 'C', '-'),
  ('라지 클럽', 'magic', 'D', '-', 'B', '-', '-'),
  ('라지 클럽', 'cold', 'B', '-', 'C', '-', '-'),
  ('라지 클럽', 'poison', 'B', '-', '-', '-', 'D'),
  ('라지 클럽', 'blood', 'B', '-', '-', '-', 'D'),
  ('라지 클럽', 'occult', 'C', '-', '-', '-', 'B'),
  ('큰 굽은 곤봉', 'standard', 'C', 'D', '-', '-', '-'),
  ('큰 굽은 곤봉', 'heavy', 'B', '-', '-', '-', '-'),
  ('큰 굽은 곤봉', 'keen', 'E', 'B', '-', '-', '-'),
  ('큰 굽은 곤봉', 'quality', 'B', 'B', '-', '-', '-'),
  ('큰 굽은 곤봉', 'fire', 'C', 'E', '-', '-', '-'),
  ('큰 굽은 곤봉', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('큰 굽은 곤봉', 'lightning', 'E', 'C', '-', '-', '-'),
  ('큰 굽은 곤봉', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('큰 굽은 곤봉', 'magic', 'E', 'E', 'C', '-', '-'),
  ('큰 굽은 곤봉', 'cold', 'C', 'D', 'C', '-', '-'),
  ('큰 굽은 곤봉', 'poison', 'C', 'C', '-', '-', 'D'),
  ('큰 굽은 곤봉', 'blood', 'C', 'C', '-', '-', 'D'),
  ('큰 굽은 곤봉', 'occult', 'D', 'E', '-', '-', 'B'),
  ('그레이트 메이스', 'standard', 'B', '-', '-', '-', '-'),
  ('그레이트 메이스', 'heavy', 'S', '-', '-', '-', '-'),
  ('그레이트 메이스', 'keen', 'E', 'B', '-', '-', '-'),
  ('그레이트 메이스', 'quality', 'B', 'B', '-', '-', '-'),
  ('그레이트 메이스', 'fire', 'C', 'E', '-', '-', '-'),
  ('그레이트 메이스', 'flame_art', 'D', '-', '-', 'B', '-'),
  ('그레이트 메이스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('그레이트 메이스', 'sacred', 'D', '-', '-', 'B', '-'),
  ('그레이트 메이스', 'magic', 'D', '-', 'B', '-', '-'),
  ('그레이트 메이스', 'cold', 'B', '-', 'C', '-', '-'),
  ('그레이트 메이스', 'poison', 'A', '-', '-', '-', 'D'),
  ('그레이트 메이스', 'blood', 'A', '-', '-', '-', 'D'),
  ('그레이트 메이스', 'occult', 'B', '-', '-', '-', 'B'),
  ('곡괭이', 'standard', 'C', 'D', '-', '-', '-'),
  ('곡괭이', 'heavy', 'A', '-', '-', '-', '-'),
  ('곡괭이', 'keen', 'E', 'B', '-', '-', '-'),
  ('곡괭이', 'quality', 'B', 'B', '-', '-', '-'),
  ('곡괭이', 'fire', 'C', 'E', '-', '-', '-'),
  ('곡괭이', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('곡괭이', 'lightning', 'E', 'C', '-', '-', '-'),
  ('곡괭이', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('곡괭이', 'magic', 'E', 'E', 'C', '-', '-'),
  ('곡괭이', 'cold', 'B', 'D', 'C', '-', '-'),
  ('곡괭이', 'poison', 'B', 'D', '-', '-', 'D'),
  ('곡괭이', 'blood', 'B', 'D', '-', '-', 'D'),
  ('곡괭이', 'occult', 'D', 'E', '-', '-', 'B'),
  ('적석 망치', 'standard', 'A', '-', '-', '-', '-'),
  ('적석 망치', 'heavy', 'S', '-', '-', '-', '-'),
  ('적석 망치', 'keen', 'D', 'A', '-', '-', '-'),
  ('적석 망치', 'quality', 'B', 'B', '-', '-', '-'),
  ('적석 망치', 'fire', 'B', 'E', '-', '-', '-'),
  ('적석 망치', 'flame_art', 'C', '-', '-', 'B', '-'),
  ('적석 망치', 'lightning', 'E', 'B', '-', '-', '-'),
  ('적석 망치', 'sacred', 'C', '-', '-', 'B', '-'),
  ('적석 망치', 'magic', 'C', '-', 'B', '-', '-'),
  ('적석 망치', 'cold', 'A', '-', 'B', '-', '-'),
  ('적석 망치', 'poison', 'A', '-', '-', '-', 'D'),
  ('적석 망치', 'blood', 'A', '-', '-', '-', 'D'),
  ('적석 망치', 'occult', 'B', '-', '-', '-', 'A'),
  ('배틀 해머', 'standard', 'B', 'E', '-', '-', '-'),
  ('배틀 해머', 'heavy', 'S', '-', '-', '-', '-'),
  ('배틀 해머', 'keen', 'D', 'B', '-', '-', '-'),
  ('배틀 해머', 'quality', 'B', 'B', '-', '-', '-'),
  ('배틀 해머', 'fire', 'C', 'E', '-', '-', '-'),
  ('배틀 해머', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('배틀 해머', 'lightning', 'E', 'C', '-', '-', '-'),
  ('배틀 해머', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('배틀 해머', 'magic', 'D', 'E', 'B', '-', '-'),
  ('배틀 해머', 'cold', 'B', 'E', 'C', '-', '-'),
  ('배틀 해머', 'poison', 'A', 'E', '-', '-', 'D'),
  ('배틀 해머', 'blood', 'A', 'E', '-', '-', 'D'),
  ('배틀 해머', 'occult', 'D', 'E', '-', '-', 'A'),
  ('부패한 배틀 해머', 'standard', 'B', 'E', '-', '-', '-'),
  ('부패한 배틀 해머', 'heavy', 'S', '-', '-', '-', '-'),
  ('부패한 배틀 해머', 'keen', 'D', 'B', '-', '-', '-'),
  ('부패한 배틀 해머', 'quality', 'B', 'B', '-', '-', '-'),
  ('부패한 배틀 해머', 'fire', 'C', 'E', '-', '-', '-'),
  ('부패한 배틀 해머', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('부패한 배틀 해머', 'lightning', 'E', 'C', '-', '-', '-'),
  ('부패한 배틀 해머', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('부패한 배틀 해머', 'magic', 'D', 'E', 'B', '-', '-'),
  ('부패한 배틀 해머', 'cold', 'B', 'E', 'C', '-', '-'),
  ('부패한 배틀 해머', 'poison', 'A', 'D', '-', '-', 'D'),
  ('부패한 배틀 해머', 'blood', 'A', 'D', '-', '-', 'D'),
  ('부패한 배틀 해머', 'occult', 'D', 'E', '-', '-', 'A'),
  ('축제의 큰 두개', 'standard', 'C', 'C', '-', '-', '-'),
  ('축제의 큰 두개', 'heavy', 'B', '-', '-', '-', '-'),
  ('축제의 큰 두개', 'keen', 'E', 'B', '-', '-', '-'),
  ('축제의 큰 두개', 'quality', 'B', 'B', '-', '-', '-'),
  ('축제의 큰 두개', 'fire', 'C', 'E', '-', '-', '-'),
  ('축제의 큰 두개', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('축제의 큰 두개', 'lightning', 'E', 'C', '-', '-', '-'),
  ('축제의 큰 두개', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('축제의 큰 두개', 'magic', 'E', 'E', 'C', '-', '-'),
  ('축제의 큰 두개', 'cold', 'C', 'C', 'C', '-', '-'),
  ('축제의 큰 두개', 'poison', 'C', 'C', '-', '-', 'D'),
  ('축제의 큰 두개', 'blood', 'C', 'C', '-', '-', 'D'),
  ('축제의 큰 두개', 'occult', 'E', 'E', '-', '-', 'B'),
  ('그레이트스타즈', 'standard', 'C', 'D', '-', '-', '-'),
  ('그레이트스타즈', 'heavy', 'A', '-', '-', '-', '-'),
  ('그레이트스타즈', 'keen', 'E', 'B', '-', '-', '-'),
  ('그레이트스타즈', 'quality', 'B', 'B', '-', '-', '-'),
  ('그레이트스타즈', 'fire', 'C', 'E', '-', '-', '-'),
  ('그레이트스타즈', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('그레이트스타즈', 'lightning', 'E', 'C', '-', '-', '-'),
  ('그레이트스타즈', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('그레이트스타즈', 'magic', 'E', 'E', 'B', '-', '-'),
  ('그레이트스타즈', 'cold', 'C', 'C', 'C', '-', '-'),
  ('그레이트스타즈', 'poison', 'B', 'C', '-', '-', 'D'),
  ('그레이트스타즈', 'blood', 'B', 'C', '-', '-', 'D'),
  ('그레이트스타즈', 'occult', 'D', 'E', '-', '-', 'B'),
  ('흑철 대형 망치', 'standard', 'B', 'E', '-', 'C', '-'),
  ('흑철 대형 망치', 'heavy', 'A', '-', '-', 'D', '-'),
  ('흑철 대형 망치', 'keen', 'D', 'B', '-', 'D', '-'),
  ('흑철 대형 망치', 'quality', 'B', 'B', '-', 'D', '-'),
  ('흑철 대형 망치', 'fire', 'C', 'E', '-', 'D', '-'),
  ('흑철 대형 망치', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('흑철 대형 망치', 'lightning', 'E', 'C', '-', 'D', '-'),
  ('흑철 대형 망치', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('흑철 대형 망치', 'magic', 'E', 'E', 'C', 'D', '-'),
  ('흑철 대형 망치', 'cold', 'B', 'E', 'C', 'D', '-'),
  ('흑철 대형 망치', 'poison', 'B', 'E', '-', 'D', 'D'),
  ('흑철 대형 망치', 'blood', 'B', 'E', '-', 'D', 'D'),
  ('흑철 대형 망치', 'occult', 'E', 'E', '-', 'E', 'A'),
  ('유문의 대형 망치', 'standard', 'C', 'E', 'E', 'E', '-'),
  ('유문의 대형 망치', 'heavy', 'A', '-', 'E', 'E', '-'),
  ('유문의 대형 망치', 'keen', 'D', 'B', 'E', 'E', '-'),
  ('유문의 대형 망치', 'quality', 'B', 'B', 'E', 'E', '-'),
  ('유문의 대형 망치', 'fire', 'C', 'E', 'E', 'E', '-'),
  ('유문의 대형 망치', 'flame_art', 'D', 'E', 'E', 'C', '-'),
  ('유문의 대형 망치', 'lightning', 'E', 'C', 'E', 'E', '-'),
  ('유문의 대형 망치', 'sacred', 'D', 'E', 'E', 'C', '-'),
  ('유문의 대형 망치', 'magic', 'D', 'E', 'C', 'E', '-'),
  ('유문의 대형 망치', 'cold', 'B', 'E', 'D', 'E', '-'),
  ('유문의 대형 망치', 'poison', 'B', 'D', 'E', 'E', 'D'),
  ('유문의 대형 망치', 'blood', 'B', 'D', 'E', 'E', 'D'),
  ('유문의 대형 망치', 'occult', 'D', 'E', 'E', 'E', 'B'),
  ('큰 뿔 망치', 'standard', 'C', 'D', '-', '-', '-'),
  ('큰 뿔 망치', 'heavy', 'A', '-', '-', '-', '-'),
  ('큰 뿔 망치', 'keen', 'E', 'B', '-', '-', '-'),
  ('큰 뿔 망치', 'quality', 'B', 'B', '-', '-', '-'),
  ('큰 뿔 망치', 'fire', 'C', 'E', '-', '-', '-'),
  ('큰 뿔 망치', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('큰 뿔 망치', 'lightning', 'E', 'C', '-', '-', '-'),
  ('큰 뿔 망치', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('큰 뿔 망치', 'magic', 'E', 'E', 'B', '-', '-'),
  ('큰 뿔 망치', 'cold', 'B', 'C', '-', '-', '-'),
  ('큰 뿔 망치', 'poison', 'B', 'C', '-', '-', 'D'),
  ('큰 뿔 망치', 'blood', 'B', 'C', '-', '-', 'D'),
  ('큰 뿔 망치', 'occult', 'D', 'E', '-', '-', 'A'),
  ('사자들의 긴 피리', 'standard', 'C', 'D', '-', 'B', '-'),
  ('존안의 촛대', 'standard', 'B', 'D', '-', 'B', '-'),
  ('짐승 발톱 대형 망치', 'standard', 'C', 'C', '-', 'D', '-'),
  ('세계 먹는 자의 왕홀', 'standard', 'C', 'C', '-', 'C', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 망치'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
