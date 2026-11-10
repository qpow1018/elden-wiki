-- 사용자 제공 곡검 19종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '곡검') then
    raise exception '곡검 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '곡검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('회전 베기', '용암 뿌리기', '원혼 베기', '유체화', '별 구름', '복수의 칼날', '끝 없는 춤', '뿔내림', '죽음의 플레어')
    group by name, description having count(*) > 1
  ) then
    raise exception '곡검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('회전 베기', '기량이 뛰어난 검사들의 전투 기술.
크게 몸을 회전시켜 적을 벤다.
또한 추가 입력으로 추가 공격도 가능하다.', '6 ( - / 12 )'),
  ('용암 뿌리기', '몸을 회전시켜 적을 베면서 주위에 용암을 흩뿌리는 전투 기술.
추가 입력으로 추가 공격도 가능하다.', '12 ( - / 12 )'),
  ('원혼 베기', '몸을 회전시켜서 적을 베며
매달리는 원혼을 부르는 전투 기술.
추가 입력으로 추가 공격이 가능하다.', null),
  ('유체화', '무기를 일시적으로 액체로 만드는 전투 기술.
채찍처럼 휘둘러 넓은 범위를 쓸어버린다.', '9 ( - / - )'),
  ('별 구름', '부산물의 얇은 날개에 마력을 담아
전방에 암흑 별 구름을 만드는 전투 기술.
별 구름은 잠시 후 폭발해 사라진다.', '20 ( - / - )'),
  ('복수의 칼날', '적의 품으로 달려들어 좌우로 베는 전투 기술.
길게 누르면 달려드는 거리가 길어진다.
또한 강 공격으로 난도질로 이을 수 있다.', '15 ( - / 10 )'),
  ('끝 없는 춤', '격렬히 춤추며 연속으로 참격을 쓰는 전투 기술.
길게 누르는 동안은 스태미나가 다할 때까지
춤이 끝나지 않는다.', '2'),
  ('뿔내림', '도신에 혼각을 내리는 전투 기술.
그대로 무기를 지면에 꽂아
솟아오르는 뿔 가시를 생성한다.', '17 ( - / - )'),
  ('죽음의 플레어', '색 잃은 태양에 죽음의 왕자의 불꽃을 담는
전투 기술. 죽음 상태 이상 효과를 지닌다.
추가 입력으로 내려 베어 불꽃을 폭발시킨다.', '16 ( - / 16 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and (s.name = '회전 베기' or k.description = s.description));

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('시미터', 10, 'base_game', '검신이 휜 외날 곡검.
날카로운 칼날로 참격 공격을 하지만
갑옷이나 단단한 비늘에는 효과가 낮다.

곡검 중에는 소형에 속하며
작고 빠르게 적을 난도질하듯 공격한다.', null),
  ('펄션', 20, 'base_game', null, null),
  ('샴시르', 30, 'base_game', '가늘고 긴 칼날을 가진 곡검.
크지만 가볍고, 연속 공격으로 벤다.

특히 탁월한 검사가 들면
무시무시한 위력을 발휘하는 무기.', null),
  ('그로스메서', 40, 'base_game', '커다란 칼날을 지닌 곡검.
참격의 예리함에 묵직함을 더하기 위한 무기.

신뢰성이 높은 정직한 무기이지만
그렇기에 자유자재로 구사하는 자는 많지 않다.', null),
  ('산적의 곡도', 50, 'base_game', '크게 휜 칼날을 지닌 곡검.
파쇄전쟁 후 각지에 날뛴 산적들의 무기.

그 도신은 반쯤 녹슬고 변색되었으나
높은 기량이 있다면 사용할 수 있을 것이다.', null),
  ('쇼텔', 60, 'base_game', '크게 휜 칼날을 지닌 곡검.
그 공격은 가드의 틈을 파고든다.

높은 기량을 요구하는 인간 사냥꾼의 무기.', '공격이 가드의 틈을 파고든다.'),
  ('시체 뒤지는 자의 곡검', 70, 'base_game', '톱 같은 칼날을 지닌 곡검.
전쟁터를 서성이며 사체를 뒤지는 자들의 무기.

그 칼날은 심하게 날이 빠져 울퉁불퉁하고
피가 흠뻑 눌어붙었다.
생명이란 이렇게까지 꺼림찍할 수 있을까.', null),
  ('당랑도', 80, 'base_game', '반으로 접히는 칼날을 지닌 곡검.
벌레 품은 묘지기, 묘소 그림자의 무기.

그 칼날은 얇고 날카로우며,
강 공격으로 펼쳐져 더 먼 곳까지 벤다.', null),
  ('수인의 곡도', 90, 'base_game', '순철을 벼려 만든 곡도.
파름 아즈라의 수인들이 사용하는 무기.

칼날은 무겁지만 밸런스가 뛰어나
위력에 비해 다루기 쉽다.', null),
  ('유수의 곡검', 100, 'base_game', '푸른 옷 입은 검사 전승으로 전해지는
흐르는 물을 본떴다는 곡검.

강 공격의 춤추는 것 같은 연속 공격에서
전승을 엿볼 수 있다.', null),
  ('뱀신의 곡도', 110, 'base_game', '옛 뱀신을 본뜬 곡도.
겔미어의 잃어버린 신앙의 제구.

산 제물을 바치기 위해 사용되었다고 하며
적을 쓰러뜨렸을 때 HP를 회복한다.', '적을 쓰러뜨렸을 때 HP를 회복한다.'),
  ('용암도', 120, 'base_game', '겔미어의 용암을 칼날 삼은 곡검.
인간은 만들 수 없는 뱀인간들의 무구.

화염 속성 공격력을 가진다.', null),
  ('영의 검', 130, 'shadow_of_the_erdtree', '비틀린 조각이 새겨진 날카로운 칼날.
예부터 묘지에서 사용되는 검.

영과 교신하기 위한 촉매라고 한다.', null),
  ('녹스의 유체검', 140, 'base_game', '영원한 도읍의 검사들이 쓰는 이형의 검.
바늘처럼 가는 칼날을 가진 쇼텔.

은 물방울에서 유래한 액체 금속을
단단하게 벼렸다.', '기본 공격이 가드를 관통한다.'),
  ('아스테르의 날개', 150, 'base_game', '별의 마력을 띤 얇은 깃털 검.
특히 강 공격은 마력의 광파를 수반한다.

과거에 영원한 도읍을 습격했다고 하는
암흑의 부산물의 유물로 만들어졌다.', '별에서 온 자들에게 1.2배 대미지를 준다.'),
  ('팔스', 160, 'shadow_of_the_erdtree', '낫처럼 긴 칼날을 지닌 곡검.
양손 잡기로 이도류가 되는 한 쌍의 무기.

뿔인간은 복수를 위해 이 검을 단련했다.
화염의 보복을 내 칼날에 새겨 주마.', null),
  ('라나의 무도검', 170, 'shadow_of_the_erdtree', '열정의 붉은색으로 장식한 장식검.
양손 잡기로 이도류가 되는 한 쌍의 무기.

라나의 무희들의 무기이며
강 공격은 춤으로 연속 공격을 한다.', null),
  ('뿔 전사의 곡검', 180, 'shadow_of_the_erdtree', '탑의 수호자인 뿔 전사의 곡검.

검신에는 혼각이 새겨져 있어
뿔내림의 촉매로도 쓰인다.', null),
  ('일식의 쇼텔', 190, 'base_game', '소르 성채에서 소장하는 보검.
잠식되어 색을 잃은 태양을 본뜬 것.
「전설의 무기」 중 하나.

소르에서는 절망적인 외경의 대상이다.
사람은 큰 두려움을 외면할 수 없다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '곡검'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('시미터', '회전 베기', 3.0, '참격', 'smithing_stone', true, 259, 0, 0, 0, 0, 40.0, 30.0, 30.0, 30.0, 30.0, 100, 30, 0, 0, 0, 0, 0, 0, 7, 13, 0, 0, 0),
  ('펄션', '회전 베기', 3.5, '참격', 'smithing_stone', true, 267, 0, 0, 0, 0, 42.0, 31.0, 31.0, 31.0, 31.0, 100, 31, 0, 0, 0, 0, 0, 0, 9, 13, 0, 0, 0),
  ('샴시르', '회전 베기', 3.5, '참격', 'smithing_stone', true, 264, 0, 0, 0, 0, 42.0, 31.0, 31.0, 31.0, 31.0, 100, 31, 0, 0, 0, 0, 0, 0, 7, 13, 0, 0, 0),
  ('그로스메서', '회전 베기', 4.5, '참격', 'smithing_stone', true, 281, 0, 0, 0, 0, 46.0, 34.0, 34.0, 34.0, 34.0, 100, 33, 0, 0, 0, 0, 0, 0, 14, 12, 0, 0, 0),
  ('산적의 곡도', '회전 베기', 5.0, '참격', 'smithing_stone', true, 289, 0, 0, 0, 0, 48.0, 36.0, 36.0, 36.0, 36.0, 100, 36, 0, 0, 0, 0, 0, 0, 11, 13, 0, 0, 0),
  ('쇼텔', '회전 베기', 2.0, '참격', 'smithing_stone', true, 235, 0, 0, 0, 0, 37.0, 27.0, 27.0, 27.0, 27.0, 100, 26, 0, 0, 0, 0, 0, 0, 9, 19, 0, 0, 0),
  ('시체 뒤지는 자의 곡검', '회전 베기', 3.5, '참격', 'smithing_stone', true, 257, 0, 0, 0, 0, 40.0, 30.0, 30.0, 30.0, 30.0, 100, 30, 0, 0, 45, 0, 0, 0, 9, 14, 0, 0, 0),
  ('당랑도', '회전 베기', 4.0, '참격', 'smithing_stone', true, 274, 0, 0, 0, 0, 44.0, 33.0, 33.0, 33.0, 33.0, 100, 32, 0, 0, 0, 0, 0, 0, 10, 12, 0, 0, 0),
  ('수인의 곡도', '회전 베기', 4.0, '참격', 'smithing_stone', true, 276, 0, 0, 0, 0, 44.0, 33.0, 33.0, 33.0, 33.0, 100, 32, 0, 0, 0, 0, 0, 0, 13, 11, 0, 0, 0),
  ('유수의 곡검', '회전 베기', 3.5, '참격', 'smithing_stone', true, 267, 0, 0, 0, 0, 42.0, 31.0, 31.0, 31.0, 31.0, 100, 31, 0, 0, 0, 0, 0, 0, 9, 17, 0, 0, 0),
  ('뱀신의 곡도', '회전 베기', 4.0, '참격', 'smithing_stone', true, 276, 0, 0, 0, 0, 44.0, 33.0, 33.0, 33.0, 33.0, 100, 32, 0, 0, 0, 0, 0, 0, 13, 9, 0, 0, 0),
  ('용암도', '용암 뿌리기', 4.0, '참격', 'somber_smithing_stone', false, 235, 0, 151, 0, 0, 44.0, 30.0, 44.0, 30.0, 30.0, 100, 29, 0, 0, 0, 0, 0, 0, 9, 15, 0, 16, 0),
  ('영의 검', '원혼 베기', 2.5, '참격', 'somber_smithing_stone', false, 225, 144, 0, 0, 0, 38, 38, 26, 26, 26, 100, 20, 0, 0, 0, 0, 0, 0, 8, 16, 16, 0, 0),
  ('녹스의 유체검', '유체화', 3.5, '참격', 'somber_smithing_stone', false, 274, 0, 0, 0, 0, 40.0, 30.0, 30.0, 30.0, 30.0, 100, 27, 0, 0, 0, 0, 0, 0, 8, 15, 0, 0, 0),
  ('아스테르의 날개', '별 구름', 2.5, '참격', 'somber_smithing_stone', false, 159, 191, 0, 0, 0, 28.0, 52.0, 23.0, 23.0, 23.0, 100, 25, 0, 0, 0, 0, 0, 0, 7, 17, 20, 0, 0),
  ('팔스', '복수의 칼날', 4, '참격', 'somber_smithing_stone', false, 262, 0, 0, 0, 0, 42, 31, 31, 31, 31, 100, 23, 0, 0, 55, 0, 0, 0, 12, 15, 0, 0, 0),
  ('라나의 무도검', '끝 없는 춤', 3.5, '참격', 'somber_smithing_stone', false, 215, 0, 0, 0, 0, 37, 28, 29, 29, 27, 100, 22, 0, 0, 0, 0, 0, 0, 9, 20, 0, 0, 0),
  ('뿔 전사의 곡검', '뿔내림', 5.0, '참격', 'somber_smithing_stone', false, 264, 0, 0, 0, 0, 48.0, 36.0, 36.0, 36.0, 36.0, 100, 33, 0, 0, 0, 0, 0, 0, 11, 14, 0, 14, 0),
  ('일식의 쇼텔', '죽음의 플레어', 3, '참격', 'somber_smithing_stone', false, 188, 0, 0, 0, 188, 35.0, 25.0, 25.0, 25.0, 50.0, 100, 27, 0, 0, 0, 0, 0, 0, 10, 25, 0, 30, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '곡검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
  and (s.skill_name <> '회전 베기' or k.fp_cost_text = '6 ( - / 12 )')
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('시미터', 'standard', 'D', 'C', '-', '-', '-'),
  ('시미터', 'heavy', 'B', '-', '-', '-', '-'),
  ('시미터', 'keen', 'E', 'A', '-', '-', '-'),
  ('시미터', 'quality', 'B', 'B', '-', '-', '-'),
  ('시미터', 'fire', 'C', 'E', '-', '-', '-'),
  ('시미터', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('시미터', 'lightning', 'E', 'C', '-', '-', '-'),
  ('시미터', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('시미터', 'magic', 'E', 'E', 'B', '-', '-'),
  ('시미터', 'cold', 'D', 'B', 'C', '-', '-'),
  ('시미터', 'poison', 'D', 'B', '-', '-', 'D'),
  ('시미터', 'blood', 'D', 'B', '-', '-', 'D'),
  ('시미터', 'occult', 'E', 'D', '-', '-', 'B'),
  ('펄션', 'standard', 'C', 'C', '-', '-', '-'),
  ('펄션', 'heavy', 'A', '-', '-', '-', '-'),
  ('펄션', 'keen', 'E', 'B', '-', '-', '-'),
  ('펄션', 'quality', 'B', 'B', '-', '-', '-'),
  ('펄션', 'fire', 'C', 'E', '-', '-', '-'),
  ('펄션', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('펄션', 'lightning', 'E', 'C', '-', '-', '-'),
  ('펄션', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('펄션', 'magic', 'E', 'E', 'B', '-', '-'),
  ('펄션', 'cold', 'C', 'C', 'B', '-', '-'),
  ('펄션', 'poison', 'C', 'C', '-', '-', 'D'),
  ('펄션', 'blood', 'C', 'C', '-', '-', 'D'),
  ('펄션', 'occult', 'D', 'D', '-', '-', 'B'),
  ('샴시르', 'standard', 'D', 'C', '-', '-', '-'),
  ('샴시르', 'heavy', 'B', '-', '-', '-', '-'),
  ('샴시르', 'keen', 'E', 'B', '-', '-', '-'),
  ('샴시르', 'quality', 'B', 'B', '-', '-', '-'),
  ('샴시르', 'fire', 'C', 'E', '-', '-', '-'),
  ('샴시르', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('샴시르', 'lightning', 'E', 'C', '-', '-', '-'),
  ('샴시르', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('샴시르', 'magic', 'E', 'E', 'B', '-', '-'),
  ('샴시르', 'cold', 'C', 'C', 'C', '-', '-'),
  ('샴시르', 'poison', 'C', 'C', '-', '-', 'D'),
  ('샴시르', 'blood', 'C', 'C', '-', '-', 'D'),
  ('샴시르', 'occult', 'E', 'D', '-', '-', 'B'),
  ('그로스메서', 'standard', 'C', 'D', '-', '-', '-'),
  ('그로스메서', 'heavy', 'B', '-', '-', '-', '-'),
  ('그로스메서', 'keen', 'E', 'B', '-', '-', '-'),
  ('그로스메서', 'quality', 'B', 'B', '-', '-', '-'),
  ('그로스메서', 'fire', 'C', 'E', '-', '-', '-'),
  ('그로스메서', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('그로스메서', 'lightning', 'E', 'C', '-', '-', '-'),
  ('그로스메서', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('그로스메서', 'magic', 'E', 'E', 'B', '-', '-'),
  ('그로스메서', 'cold', 'C', 'C', 'C', '-', '-'),
  ('그로스메서', 'poison', 'C', 'C', '-', '-', 'D'),
  ('그로스메서', 'blood', 'C', 'C', '-', '-', 'D'),
  ('그로스메서', 'occult', 'D', 'E', '-', '-', 'B'),
  ('산적의 곡도', 'standard', 'D', 'C', '-', '-', '-'),
  ('산적의 곡도', 'heavy', 'B', '-', '-', '-', '-'),
  ('산적의 곡도', 'keen', 'E', 'B', '-', '-', '-'),
  ('산적의 곡도', 'quality', 'B', 'B', '-', '-', '-'),
  ('산적의 곡도', 'fire', 'C', 'E', '-', '-', '-'),
  ('산적의 곡도', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('산적의 곡도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('산적의 곡도', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('산적의 곡도', 'magic', 'E', 'E', 'B', '-', '-'),
  ('산적의 곡도', 'cold', 'D', 'C', 'C', '-', '-'),
  ('산적의 곡도', 'poison', 'C', 'C', '-', '-', 'D'),
  ('산적의 곡도', 'blood', 'C', 'C', '-', '-', 'D'),
  ('산적의 곡도', 'occult', 'E', 'D', '-', '-', 'B'),
  ('쇼텔', 'standard', 'D', 'C', '-', '-', '-'),
  ('쇼텔', 'heavy', 'B', '-', '-', '-', '-'),
  ('쇼텔', 'keen', 'E', 'A', '-', '-', '-'),
  ('쇼텔', 'quality', 'B', 'B', '-', '-', '-'),
  ('쇼텔', 'fire', 'C', 'E', '-', '-', '-'),
  ('쇼텔', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('쇼텔', 'lightning', 'E', 'C', '-', '-', '-'),
  ('쇼텔', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('쇼텔', 'magic', 'E', 'E', 'C', '-', '-'),
  ('쇼텔', 'cold', 'D', 'B', 'C', '-', '-'),
  ('쇼텔', 'poison', 'D', 'B', '-', '-', 'D'),
  ('쇼텔', 'blood', 'D', 'B', '-', '-', 'D'),
  ('쇼텔', 'occult', 'E', 'D', '-', '-', 'B'),
  ('시체 뒤지는 자의 곡검', 'standard', 'C', 'C', '-', '-', '-'),
  ('시체 뒤지는 자의 곡검', 'heavy', 'B', '-', '-', '-', '-'),
  ('시체 뒤지는 자의 곡검', 'keen', 'E', 'B', '-', '-', '-'),
  ('시체 뒤지는 자의 곡검', 'quality', 'B', 'B', '-', '-', '-'),
  ('시체 뒤지는 자의 곡검', 'fire', 'C', 'E', '-', '-', '-'),
  ('시체 뒤지는 자의 곡검', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('시체 뒤지는 자의 곡검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('시체 뒤지는 자의 곡검', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('시체 뒤지는 자의 곡검', 'magic', 'E', 'E', 'B', '-', '-'),
  ('시체 뒤지는 자의 곡검', 'cold', 'C', 'C', 'B', '-', '-'),
  ('시체 뒤지는 자의 곡검', 'poison', 'C', 'C', '-', '-', 'D'),
  ('시체 뒤지는 자의 곡검', 'blood', 'C', 'C', '-', '-', 'D'),
  ('시체 뒤지는 자의 곡검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('당랑도', 'standard', 'D', 'C', '-', '-', '-'),
  ('당랑도', 'heavy', 'B', '-', '-', '-', '-'),
  ('당랑도', 'keen', 'E', 'B', '-', '-', '-'),
  ('당랑도', 'quality', 'B', 'B', '-', '-', '-'),
  ('당랑도', 'fire', 'C', 'E', '-', '-', '-'),
  ('당랑도', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('당랑도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('당랑도', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('당랑도', 'magic', 'E', 'E', 'B', '-', '-'),
  ('당랑도', 'cold', 'C', 'C', 'C', '-', '-'),
  ('당랑도', 'poison', 'C', 'C', '-', '-', 'D'),
  ('당랑도', 'blood', 'C', 'C', '-', '-', 'D'),
  ('당랑도', 'occult', 'E', 'D', '-', '-', 'B'),
  ('수인의 곡도', 'standard', 'B', 'D', '-', '-', '-'),
  ('수인의 곡도', 'heavy', 'A', '-', '-', '-', '-'),
  ('수인의 곡도', 'keen', 'E', 'B', '-', '-', '-'),
  ('수인의 곡도', 'quality', 'B', 'B', '-', '-', '-'),
  ('수인의 곡도', 'fire', 'C', 'E', '-', '-', '-'),
  ('수인의 곡도', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('수인의 곡도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('수인의 곡도', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('수인의 곡도', 'magic', 'E', 'E', 'B', '-', '-'),
  ('수인의 곡도', 'cold', 'B', 'D', 'C', '-', '-'),
  ('수인의 곡도', 'poison', 'B', 'D', '-', '-', 'D'),
  ('수인의 곡도', 'blood', 'B', 'D', '-', '-', 'D'),
  ('수인의 곡도', 'occult', 'D', 'E', '-', '-', 'B'),
  ('유수의 곡검', 'standard', 'D', 'C', '-', '-', '-'),
  ('유수의 곡검', 'heavy', 'B', '-', '-', '-', '-'),
  ('유수의 곡검', 'keen', 'E', 'A', '-', '-', '-'),
  ('유수의 곡검', 'quality', 'B', 'B', '-', '-', '-'),
  ('유수의 곡검', 'fire', 'C', 'E', '-', '-', '-'),
  ('유수의 곡검', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('유수의 곡검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('유수의 곡검', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('유수의 곡검', 'magic', 'E', 'E', 'B', '-', '-'),
  ('유수의 곡검', 'cold', 'D', 'B', 'C', '-', '-'),
  ('유수의 곡검', 'poison', 'D', 'B', '-', '-', 'D'),
  ('유수의 곡검', 'blood', 'D', 'B', '-', '-', 'D'),
  ('유수의 곡검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('뱀신의 곡도', 'standard', 'C', 'D', '-', '-', '-'),
  ('뱀신의 곡도', 'heavy', 'A', '-', '-', '-', '-'),
  ('뱀신의 곡도', 'keen', 'E', 'B', '-', '-', '-'),
  ('뱀신의 곡도', 'quality', 'B', 'B', '-', '-', '-'),
  ('뱀신의 곡도', 'fire', 'C', 'E', '-', '-', '-'),
  ('뱀신의 곡도', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('뱀신의 곡도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('뱀신의 곡도', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('뱀신의 곡도', 'magic', 'E', 'E', 'C', '-', '-'),
  ('뱀신의 곡도', 'cold', 'B', 'D', 'C', '-', '-'),
  ('뱀신의 곡도', 'poison', 'B', 'D', '-', '-', 'D'),
  ('뱀신의 곡도', 'blood', 'B', 'D', '-', '-', 'D'),
  ('뱀신의 곡도', 'occult', 'D', 'E', '-', '-', 'B'),
  ('용암도', 'standard', 'C', 'D', '-', 'C', '-'),
  ('영의 검', 'standard', 'E', 'C', 'C', '-', '-'),
  ('녹스의 유체검', 'standard', 'D', 'B', '-', '-', '-'),
  ('아스테르의 날개', 'standard', 'E', 'C', 'B', '-', '-'),
  ('팔스', 'standard', 'D', 'B', '-', '-', '-'),
  ('라나의 무도검', 'standard', '-', 'A', '-', '-', '-'),
  ('뿔 전사의 곡검', 'standard', 'D', 'C', '-', 'D', '-'),
  ('일식의 쇼텔', 'standard', 'D', 'C', '-', 'C', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '곡검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
