-- 사용자 제공 주먹 14종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
-- 미강화 상태 이상과 누락된 DLC 4종의 공격력·필요 능력치·보정을 보완합니다.
-- 수치표 없는 4종의 중량·공격 방식·가드·치명과 고유 기술 FP, 파타 가드 강도는 NULL입니다.
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '주먹') then
    raise exception '주먹 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '주먹'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('참기', '관통 찌르기', '명탈권', '폭풍 차기', '막을 수 없는 칼날', '독 관수', '발광 관수', '영원히 잠들라', '굽어 살피소서')
    group by name having count(*) > 1
  ) then
    raise exception '주먹 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('참기', '각오와 함께 자세를 낮추고 버텨
순간적으로 강인도를 높이는 전투 기술.
참기 중에는 대미지도 경감된다.', '9 ( - / - )'),
  ('관통 찌르기', '관통 무기로 방패와 대치하기 위한 전투 기술.
힘을 모아 크게 파고들며 강렬하게 찔러
방패의 가드를 정면으로 뚫는다.', '9 ( - / - )'),
  ('명탈권', '기에 통달한 달인의 전투 기술. 사람 종류에만
효과가 있다. 천천히 기를 두른 주먹을 내밀고
닿은 자를 기절시켜 HP를 뺏는다.', '14 ( - / - )'),
  ('폭풍 차기', '의족의 칼날을 땅에 박아 폭풍을 만드는 기술.
강 입력으로 칼날에 벼락을 두른
추가 공격으로 잇는다.', '10 ( - / - )'),
  ('막을 수 없는 칼날', '비문자 칼날에 빛을 품고
단숨에 전진해 찌르는 전투 기술.
이 공격은 가드할 수 없다.', '17 ( - / - )'),
  ('독 관수', '손가락 끝을 앞을 향해 내밀어
적의 몸을 푹 찌르는 전투 기술.
대량의 맹독을 단번에 축적한다.', '13'),
  ('발광 관수', '손가락 끝을 앞을 향해 내밀어
적의 몸을 푹 찌르는 전투 기술.
대량의 발광을 단번에 축적한다.', '13'),
  ('영원히 잠들라', '영면의 독침으로 적을 깊이 찌르는 전투 기술.
이미 수면이나 영면 상태인 적에게 추가 공격을
성공하면 단숨에 큰 대미지를 입힌다.', '16'),
  ('굽어 살피소서', '작은 용에 잠시 생명을 부여하고
그것을 하늘에 치켜들어 용의 화염을
전방 넓은 범위에 쏟아붓는 전투 기술.', '20 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('세스타스', 10, 'base_game', '두꺼운 가죽에 철 징을 박아 넣은
주먹으로 때리기 위한 무기.

주먹 무기는 두 개가 한 쌍이며
양손 잡기 시 좌우 양 주먹에 장비된다.', null),
  ('스파이크 세스타스', 20, 'base_game', '두꺼운 가죽에 철 침을 박은 세스타스.
철 침에는 출혈 효과가 있다.

주먹 무기는 두 개가 한 쌍이며
양손 잡기 시 좌우 양 주먹에 장비된다.', null),
  ('카타르', 30, 'base_game', '손잡이가 독특한 이국의 도검.
그 칼날을 주먹의 연장선 삼아 쓸 수 있다.', null),
  ('파타', 40, 'shadow_of_the_erdtree', '똑바로 뻗은 양날 검신을
주먹보호대와 결합한 무기.
서약기사들이 사용하는 무기.

주먹처럼 휘두를 수 있으며
직검과 같은 공격력, 범용성을 지녔다.', null),
  ('철구권', 50, 'base_game', '둥근 철구를 주먹에 끼우는 무기.
불량배, 빅 보기의 무기.

무거운 일격은 쉽게 뼈를 부순다.
너무 얕보지 말아야 할 것이다.', null),
  ('가시 철구권', 60, 'base_game', '철 가시가 빽빽하게 난 철구 주먹.
철 가시에는 출혈 효과가 있다.

악한들의 결투에서 사용되었다고 한다.', null),
  ('매달리는 손뼈', 70, 'base_game', '인간의 팔 뼈를 단단하게 가공한 이상한 무기.
왕의 유해 엔샤의 무기.

파고들 정도로 주먹을 쥐게 해서 장비한다.
매달리는 자여, 왕은 그 손을 놓지 않는다.', null),
  ('노장의 의족', 80, 'base_game', '칼날을 숨겨둔 의족을 주먹에 끼워
무기로 휘두르는 것. 벼락의 힘을 띤다.

소르의 노장 니아르는 그 다리와 맞바꿔
패군 기사들의 목숨을 살려줄 것을 간청했으며
훗날 그들, 땅 잃은 기사들을 이끌게 되었다.', null),
  ('비문자의 파타', 90, 'base_game', '두 손가락에서 유래한 무기 중 하나.
칼날은 실체 없는 비문자의 나열이고 신성 속성
공격력을 지녔으며 방패에 튕기지 않는다.

비문자는 허공에 적히는
두 손가락의 빛의 말이다.', null),
  ('독의 손', 100, 'shadow_of_the_erdtree', '재앙에 죽은 여러 시체에서 생가죽을 벗겨
맞붙인 장갑. 맹독 상태 이상 효과가 있으며
주위에서 독 상태 발생 시 공격력이 상승한다.

모든 것을 불태우고 빼앗은 자들을 향한
끈질기고 어두운 복수심에 의해 만들어진
힘 없는 자들의 무기.', '주위에서 독이나 붉은 부패가 발생하면 20초간 주는 피해가 PvE에서 7.5%, PvP에서 5% 증가한다.'),
  ('미친 손', 110, 'shadow_of_the_erdtree', '재앙에 죽은 여러 시체에서 생가죽을 벗겨
맞붙인 장갑. 발광 상태 이상 효과가 있으며
주위에서 발광 발생 시 공격력이 상승한다.

가혹한 이단 사냥을 저지른 동포를 향한
끈질기고 어두운 복수심에 의해 만들어진
힘 없는 자들의 무기.', '주위에서 발광이 발생하면 30초간 주는 피해가 PvE에서 7.5%, PvP에서 5% 증가한다.'),
  ('티에리에의 숨긴 침', 120, 'shadow_of_the_erdtree', '티에리에가 몰래 가지고 있던 무기.
몰래 독을 사용하는 자들의 암기.

짙은 보랏빛 화원에 피는 트리나를 따라
그 안쪽에서 농밀한 독이 나오게 하며
강한 영면 상태 이상 효과가 있다.', null),
  ('골렘의 주먹', 130, 'shadow_of_the_erdtree', '금이 간 거대한 바위 주먹.
대장장이 유적의 골렘들의 일부.

유문문자가 새겨져 있으며
강 공격으로 주먹채 정면으로 발사한다.', null),
  ('접목된 비룡', 140, 'base_game', '고드릭이 왼팔에 접목한 비룡의 목.
그 힘의 잔재가 구현화한 것.

장비한 자의 팔을 작은 용으로 변화시키며
그 주먹에 날카로운 용의 이빨을 가져온다.
양손 잡기로 들 수 없다.', '비룡형 적에게 1.1배, 고룡형 적에게 1.05배 대미지를 준다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '주먹'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('세스타스', '참기', 1.5, '타격', 'smithing_stone', true, 220, 0, 0, 0, 0, 35.0, 20.0, 20.0, 20.0, 20.0, 100, 24, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0),
  ('스파이크 세스타스', '참기', 2.0, '타격', 'smithing_stone', true, 222, 0, 0, 0, 0, 35.0, 20.0, 20.0, 20.0, 20.0, 100, 24, 0, 0, 45, 0, 0, 0, 8, 10, 0, 0, 0),
  ('카타르', '관통 찌르기', 2.5, '참격 / 관통', 'smithing_stone', true, 237, 0, 0, 0, 0, 36.0, 21.0, 21.0, 21.0, 21.0, 110, 25, 0, 0, 0, 0, 0, 0, 8, 10, 0, 0, 0),
  ('파타', '관통 찌르기', 4.0, '표준 / 관통', 'smithing_stone', true, 254, 0, 0, 0, 0, 45.0, 26.0, 26.0, 26.0, 26.0, 110, 31, 0, 0, 0, 0, 0, 0, 11, 15, 0, 0, 0),
  ('철구권', '참기', 2.5, '타격', 'smithing_stone', true, 247, 0, 0, 0, 0, 38.0, 22.0, 22.0, 22.0, 22.0, 100, 26, 0, 0, 0, 0, 0, 0, 11, 8, 0, 0, 0),
  ('가시 철구권', '참기', 3.0, '타격', 'smithing_stone', true, 257, 0, 0, 0, 0, 41.0, 23.0, 23.0, 23.0, 23.0, 100, 27, 0, 0, 45, 0, 0, 0, 12, 8, 0, 0, 0),
  ('매달리는 손뼈', '명탈권', 3, '참격 / 관통', 'somber_smithing_stone', false, 196, 58, 0, 0, 0, 31.0, 36.0, 17.0, 17.0, 17.0, 100, 23, 0, 0, 0, 0, 0, 0, 8, 22, 0, 0, 16),
  ('노장의 의족', '폭풍 차기', 4.0, '참격 / 관통', 'somber_smithing_stone', false, 203, 0, 0, 129, 0, 30.0, 20.0, 20.0, 48.0, 20.0, 100, 26, 0, 0, 0, 0, 0, 0, 15, 12, 0, 0, 0),
  ('비문자의 파타', '막을 수 없는 칼날', 0.0, '참격 / 관통', 'somber_smithing_stone', false, 0, 0, 0, 0, 208, 9.0, 14.0, 14.0, 14.0, 61.0, 100, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0),
  ('독의 손', '독 관수', 1, '타격', 'somber_smithing_stone', false, 186, 0, 0, 0, 0, 33, 19, 19, 19, 19, 100, 20, 0, 0, 0, 60, 0, 0, 8, 8, 0, 0, 28),
  ('미친 손', '발광 관수', 1, '타격', 'somber_smithing_stone', false, 129, 0, 154, 0, 0, 20, 15, 42, 15, 15, 100, 20, 0, 0, 0, 0, 0, 55, 8, 8, 13, 20, 0),
  ('티에리에의 숨긴 침', '영원히 잠들라', 0.5, '관통', 'somber_smithing_stone', false, 171, 110, 0, 0, 0, 28, 27, 16, 16, 16, 100, 19, 0, 0, 0, 0, 42, 0, 10, 22, 15, 0, 0),
  ('골렘의 주먹', '참기', 6, '타격', 'smithing_stone', true, 269, 0, 0, 0, 0, 58, 24, 24, 24, 24, 100, 43, 0, 0, 0, 0, 0, 0, 24, 8, 11, 11, 0),
  ('접목된 비룡', '굽어 살피소서', 2.5, '타격', 'somber_smithing_stone', false, 218, 0, 139, 0, 0, 27.0, 18.0, 44.0, 18.0, 18.0, 100, 24, 0, 0, 0, 0, 0, 0, 20, 14, 0, 16, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] when '관통' then array['pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '주먹'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('세스타스', 'standard', 'C', 'C', '-', '-', '-'),
  ('세스타스', 'heavy', 'A', '-', '-', '-', '-'),
  ('세스타스', 'keen', 'E', 'B', '-', '-', '-'),
  ('세스타스', 'quality', 'B', 'B', '-', '-', '-'),
  ('세스타스', 'fire', 'C', 'E', '-', '-', '-'),
  ('세스타스', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('세스타스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('세스타스', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('세스타스', 'magic', 'E', 'E', 'B', '-', '-'),
  ('세스타스', 'cold', 'C', 'C', 'B', '-', '-'),
  ('세스타스', 'poison', 'C', 'C', '-', '-', 'D'),
  ('세스타스', 'blood', 'C', 'C', '-', '-', 'D'),
  ('세스타스', 'occult', 'D', 'D', '-', '-', 'B'),
  ('스파이크 세스타스', 'standard', 'C', 'C', '-', '-', '-'),
  ('스파이크 세스타스', 'heavy', 'A', '-', '-', '-', '-'),
  ('스파이크 세스타스', 'keen', 'E', 'B', '-', '-', '-'),
  ('스파이크 세스타스', 'quality', 'B', 'B', '-', '-', '-'),
  ('스파이크 세스타스', 'fire', 'C', 'E', '-', '-', '-'),
  ('스파이크 세스타스', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('스파이크 세스타스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('스파이크 세스타스', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('스파이크 세스타스', 'magic', 'E', 'E', 'B', '-', '-'),
  ('스파이크 세스타스', 'cold', 'C', 'C', 'B', '-', '-'),
  ('스파이크 세스타스', 'poison', 'C', 'C', '-', '-', 'D'),
  ('스파이크 세스타스', 'blood', 'C', 'C', '-', '-', 'D'),
  ('스파이크 세스타스', 'occult', 'D', 'D', '-', '-', 'B'),
  ('카타르', 'standard', 'D', 'C', '-', '-', '-'),
  ('카타르', 'heavy', 'B', '-', '-', '-', '-'),
  ('카타르', 'keen', 'E', 'B', '-', '-', '-'),
  ('카타르', 'quality', 'B', 'B', '-', '-', '-'),
  ('카타르', 'fire', 'C', 'E', '-', '-', '-'),
  ('카타르', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('카타르', 'lightning', 'E', 'C', '-', '-', '-'),
  ('카타르', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('카타르', 'magic', 'E', 'E', 'C', '-', '-'),
  ('카타르', 'cold', 'D', 'C', 'C', '-', '-'),
  ('카타르', 'poison', 'D', 'C', '-', '-', 'D'),
  ('카타르', 'blood', 'D', 'C', '-', '-', 'D'),
  ('카타르', 'occult', 'E', 'D', '-', '-', 'B'),
  ('파타', 'standard', 'D', 'C', '-', '-', '-'),
  ('파타', 'heavy', 'B', '-', '-', '-', '-'),
  ('파타', 'keen', 'E', 'B', '-', '-', '-'),
  ('파타', 'quality', 'B', 'B', '-', '-', '-'),
  ('파타', 'fire', 'D', 'E', '-', '-', '-'),
  ('파타', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('파타', 'lightning', 'E', 'D', '-', '-', '-'),
  ('파타', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('파타', 'magic', 'E', 'E', 'C', '-', '-'),
  ('파타', 'cold', 'D', 'C', 'D', '-', '-'),
  ('파타', 'poison', 'D', 'C', '-', '-', 'D'),
  ('파타', 'blood', 'D', 'C', '-', '-', 'D'),
  ('파타', 'occult', 'E', 'E', '-', '-', 'B'),
  ('철구권', 'standard', 'C', 'D', '-', '-', '-'),
  ('철구권', 'heavy', 'A', '-', '-', '-', '-'),
  ('철구권', 'keen', 'E', 'B', '-', '-', '-'),
  ('철구권', 'quality', 'B', 'B', '-', '-', '-'),
  ('철구권', 'fire', 'C', 'E', '-', '-', '-'),
  ('철구권', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('철구권', 'lightning', 'E', 'C', '-', '-', '-'),
  ('철구권', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('철구권', 'magic', 'E', 'E', 'C', '-', '-'),
  ('철구권', 'cold', 'B', 'D', 'C', '-', '-'),
  ('철구권', 'poison', 'B', 'D', '-', '-', 'D'),
  ('철구권', 'blood', 'B', 'D', '-', '-', 'D'),
  ('철구권', 'occult', 'D', 'E', '-', '-', 'B'),
  ('가시 철구권', 'standard', 'C', 'D', '-', '-', '-'),
  ('가시 철구권', 'heavy', 'A', '-', '-', '-', '-'),
  ('가시 철구권', 'keen', 'E', 'B', '-', '-', '-'),
  ('가시 철구권', 'quality', 'B', 'B', '-', '-', '-'),
  ('가시 철구권', 'fire', 'C', 'E', '-', '-', '-'),
  ('가시 철구권', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('가시 철구권', 'lightning', 'E', 'C', '-', '-', '-'),
  ('가시 철구권', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('가시 철구권', 'magic', 'E', 'E', 'C', '-', '-'),
  ('가시 철구권', 'cold', 'B', 'D', 'D', '-', '-'),
  ('가시 철구권', 'poison', 'B', 'D', '-', '-', 'D'),
  ('가시 철구권', 'blood', 'B', 'D', '-', '-', 'D'),
  ('가시 철구권', 'occult', 'D', 'E', '-', '-', 'B'),
  ('매달리는 손뼈', 'standard', 'E', 'B', '-', '-', 'C'),
  ('노장의 의족', 'standard', 'C', 'D', '-', '-', '-'),
  ('비문자의 파타', 'standard', '-', '-', '-', 'A', '-'),
  ('독의 손', 'standard', 'E', '-', '-', '-', 'A'),
  ('미친 손', 'standard', 'D', 'D', 'D', 'D', '-'),
  ('티에리에의 숨긴 침', 'standard', 'D', 'B', 'C', '-', '-'),
  ('골렘의 주먹', 'standard', 'B', 'E', 'E', 'E', '-'),
  ('골렘의 주먹', 'heavy', 'A', '-', 'E', 'E', '-'),
  ('골렘의 주먹', 'keen', 'E', 'B', 'E', 'E', '-'),
  ('골렘의 주먹', 'quality', 'B', 'B', 'E', 'E', '-'),
  ('골렘의 주먹', 'fire', 'D', 'E', 'E', 'E', '-'),
  ('골렘의 주먹', 'flame_art', 'E', 'E', 'E', 'D', '-'),
  ('골렘의 주먹', 'lightning', 'E', 'D', 'E', 'E', '-'),
  ('골렘의 주먹', 'sacred', 'E', 'E', 'E', 'D', '-'),
  ('골렘의 주먹', 'magic', 'E', 'E', 'C', 'E', '-'),
  ('골렘의 주먹', 'cold', 'B', 'E', 'D', 'E', '-'),
  ('골렘의 주먹', 'poison', 'B', 'E', 'E', 'E', 'D'),
  ('골렘의 주먹', 'blood', 'B', 'E', 'E', 'E', 'D'),
  ('골렘의 주먹', 'occult', 'D', 'E', 'E', 'E', 'B'),
  ('접목된 비룡', 'standard', 'C', 'D', '-', 'D', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '주먹'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
