-- 사용자 제공 창 19종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '창') then
    raise exception '창 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '창'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('관통 찌르기','돌격','야만적인 포효','성창의 벽','창 부르기 의식','옛 벼락의 창')
    group by name, description having count(*) > 1
  ) then
    raise exception '창 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('관통 찌르기', '관통 무기로 방패와 대치하기 위한 전투 기술.
힘을 모아 크게 파고들며 강렬하게 찔러
방패의 가드를 정면으로 뚫는다.', '9 ( - / - )'),
  ('돌격', '허리춤에서 무기를 들고 단숨에 전진하는
전투 기술. 기세를 이어 마지막으로 찌른다.
길게 누르면 전진 거리를 늘릴 수 있다.', '9 ( - / - )'),
  ('야만적인 포효', '짐승처럼 포효하여 자신을 고무해
공격력을 높이는 전투 기술. 효과 중
강 공격이 야만적인 연속 공격이 된다.', '16 ( - / - )'),
  ('성창의 벽', '숨겨진 기도의 힘을 해방하여
전면에 황금의 창 공격을 펼치는 전투 기술.', '12 ( - / - )'),
  ('창 부르기 의식', '기도와 함께 창을 하늘 높이 들어
쏟아지는 수많은 영혼 창을 부르는 전투 기술.', '20 ( - / - )'),
  ('옛 벼락의 창', '고룡의 무기인 붉은 벼락을 무기에 두르고
그것을 창 삼아 투척하는 전투 기술.
차지 공격으로 강화된다.', '24 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('숏 스피어', 10, 'base_game', '매우 간소하고 가벼운 창.

창 중에서도 다루기 쉬우며
강 공격은 연속으로 찌른다.', null),
  ('철 창', 20, 'base_game', '특별할 것이 없는 철제 창.
칼날도 심하게 녹이 슬었다.', null),
  ('스피어', 30, 'base_game', '긴 자루 끝에 칼날이 달린 창.

공격 범위가 긴 관통 속성의 무기이며
방패를 든 채로 사용할 수 있고
말에 탄 적에게도 효과가 좋다.', null),
  ('파르티잔', 40, 'base_game', '찌르기에 추가로 베어 넘기는 공격도 가능해
상황 대응력이 높은 무기.', null),
  ('파이크', 50, 'base_game', '특히 자루가 긴 장창.
멀리서 찌르는 데에 특화되었으며
근접 무기 중에서는 공격 범위가 가장 길다.

말에 탄 적에게도 유용하지만
좁은 곳에서는 매우 다루기 힘들다.', null),
  ('속창', 60, 'shadow_of_the_erdtree', '고도의 성형 기술로
극한까지 경량화한 금속 창.

재빠른 연속 공격이 가능하다.', null),
  ('가시몽둥이', 70, 'base_game', '긴 자루 끝에 가시 달린 몽둥이를 단 무기.
휘두르면 타격 무기로도 쓸 수 있으며
가시에는 출혈 효과도 있다.

마술사의 종인 인형 병사의 무기.', null),
  ('십문자치도', 80, 'base_game', '긴 자루 끝에 세 갈래 칼날을 단 무기.
중앙의 긴 날은 도에 가깝다.

틈새의 땅 바깥, 갈대의 나라의 무기이며
참격이 섞인 독특한 창술로 알려져 있다.', null),
  ('진흙 인간의 작살', 90, 'base_game', '날카로운 운석 조각을 칼날 삼은 작살.
왕조 유적에서 꿈틀거리는 진흙 인간의 무기.

희미하게 빛나는 칼날은 마력 공격력을 지녔다.', null),
  ('혈귀의 포크', 100, 'shadow_of_the_erdtree', '혈귀들이 사용하는 무기.
뼈를 깎아낸 세 개의 가시로 적을 찔러
출혈을 유발한다.

모습 없는 어미에 피를 바치는 제구이기도 하며
때로 스스로를 찌르기도 한다고 한다.', null),
  ('축제 늑골 쇠스랑', 110, 'base_game', '색색의 천으로 장식된 쇠스랑.
풍차 마을 도미눌라의 축제에 사용되는
무희들의 제구.
인간의 뼈로 만들어졌으며
공격 명중 시 매우 소량의 룬을 얻는다.', '공격 명중 시 룬 10을 얻는다.'),
  ('막대기 토치', 120, 'base_game', '긴 자루 끝에 횃불을 단 것.
어두운 장소를 밝게 비추나 치켜들 수는 없다.

순찰하는 병사 등이 사용하며
그 공격은 적에게 불을 들이민다.', null),
  ('유문 창', 130, 'shadow_of_the_erdtree', '유문문자가 새겨진 창.
단조술에 의한 투척 무기 중 하나.

강 공격, 대시 후 강 공격 및
승마 시 강 공격으로 창을 투척한다.', null),
  ('책문 촛대', 140, 'base_game', '겔미어의 화산관, 그 숨겨진 이면에서
귀족들을 고문했던 도구.

수많은 가시가 피부를 상처 입히고 등불이
그 상처를 태우며 피가 타는 냄새가 절망을
확산시키는, 잘 생각해서 만든 촛대이다.', null),
  ('결정창', 150, 'base_game', '인간은 만들 수 없는 순결정 창.
마력을 띠며, 지력으로 공격력이 높아진다.

수수께끼 많은 결정인은 영원히 결정을 지킨다.
일설로는 언젠가 창조주가 돌아왔을 때
새로운 동족이 깎여 나오기를 바라기 위해서.', null),
  ('부패한 결정창', 160, 'base_game', '인간은 만들 수 없는 순결정 창이
붉은 부패에 잠식된 것.

마력을 띠며, 지력으로 공격력이 높아진다.', null),
  ('귀부기사의 창', 170, 'base_game', '미켈라의 칼날 말레니아와 함께 싸운
귀부기사들의 창.

날개 달린 황금 칼날은
신성 속성 공격력을 지니며
작은 방패에는 부패에 저항하는 기도가 담겼다.', '장비 시 부패 저항이 약 50 증가한다.'),
  ('죽음 의례의 창', 180, 'base_game', '죽음의 새, 그 날개와 나란히 섬을 허락받은
고대의 사제들이 안는 의식의 창.

죽음 의례로 사제들은 새의 수호자가 된다.
그것은 먼 재탄의 계약이라고도 한다.', null),
  ('그랑삭스의 벼락', 190, 'base_game', '대고룡 그랑삭스의 무기를 깎아 만든 창.
「전설의 무기」 중 하나.

대고룡의 습격은 로데일의 성벽이 부서진
역사상 유일한 사례이며
이어진 고룡들과의 전투의 단초가 되었다.', '비룡형 적에게 20%, 고룡형 적에게 10%의 추가 피해를 준다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '창'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('숏 스피어', '관통 찌르기', 4.0, '관통', 'smithing_stone', true, 274, 0, 0, 0, 0, 40.0, 25.0, 25.0, 25.0, 25.0, 100, 36, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0),
  ('철 창', '돌격', 4.5, '관통', 'smithing_stone', true, 279, 0, 0, 0, 0, 42.0, 26.0, 26.0, 26.0, 26.0, 100, 37, 0, 0, 0, 0, 0, 0, 13, 11, 0, 0, 0),
  ('스피어', '관통 찌르기', 4.5, '관통', 'smithing_stone', true, 279, 0, 0, 0, 0, 42.0, 26.0, 26.0, 26.0, 26.0, 100, 37, 0, 0, 0, 0, 0, 0, 12, 15, 0, 0, 0),
  ('파르티잔', '관통 찌르기', 6.5, '참격 / 관통', 'smithing_stone', true, 301, 0, 0, 0, 0, 48.0, 30.0, 30.0, 30.0, 30.0, 100, 43, 0, 0, 0, 0, 0, 0, 15, 12, 0, 0, 0),
  ('파이크', '돌격', 7.5, '관통', 'smithing_stone', true, 281, 0, 0, 0, 0, 53.0, 33.0, 33.0, 33.0, 33.0, 100, 46, 0, 0, 0, 0, 0, 0, 20, 14, 0, 0, 0),
  ('속창', '관통 찌르기', 3, '표준 / 관통', 'smithing_stone', true, 242, 0, 0, 0, 0, 40, 25, 25, 25, 25, 100, 36, 0, 0, 0, 0, 0, 0, 10, 26, 0, 0, 0),
  ('가시몽둥이', '관통 찌르기', 6.0, '타격 / 관통', 'smithing_stone', true, 294, 0, 0, 0, 0, 46.0, 28.0, 28.0, 28.0, 28.0, 100, 40, 0, 0, 50, 0, 0, 0, 14, 16, 0, 0, 0),
  ('십문자치도', '관통 찌르기', 8.0, '참격 / 관통', 'smithing_stone', true, 298, 0, 0, 0, 0, 52.0, 32.0, 32.0, 32.0, 32.0, 100, 46, 0, 0, 50, 0, 0, 0, 16, 20, 0, 0, 0),
  ('진흙 인간의 작살', '관통 찌르기', 5.5, '관통', 'smithing_stone', true, 242, 156, 0, 0, 0, 49.0, 38.0, 25.0, 25.0, 25.0, 100, 39, 0, 0, 0, 0, 0, 0, 12, 10, 12, 0, 0),
  ('혈귀의 포크', '야만적인 포효', 4.5, '표준 / 관통', 'smithing_stone', true, 252, 0, 0, 0, 0, 42, 26, 26, 26, 26, 100, 37, 0, 0, 50, 0, 0, 0, 14, 8, 0, 0, 13),
  ('축제 늑골 쇠스랑', '야만적인 포효', 5.0, '관통', 'smithing_stone', true, 267, 0, 0, 0, 0, 40.0, 25.0, 25.0, 25.0, 25.0, 100, 39, 0, 0, 0, 0, 0, 0, 8, 14, 0, 0, 0),
  ('막대기 토치', '돌격', 6.0, '관통', 'smithing_stone', false, 254, 0, 75, 0, 0, 48.0, 26.0, 33.0, 26.0, 26.0, 100, 40, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 0),
  ('유문 창', '관통 찌르기', 4, '표준 / 관통', 'smithing_stone', true, 262, 0, 0, 0, 0, 38, 23, 23, 23, 23, 100, 33, 0, 0, 0, 0, 0, 0, 9, 12, 11, 11, 0),
  ('책문 촛대', '돌격', 7.5, '관통', 'somber_smithing_stone', false, 249, 0, 161, 0, 0, 56.0, 28.0, 43.0, 28.0, 28.0, 100, 40, 0, 0, 50, 0, 0, 0, 18, 15, 0, 16, 0),
  ('결정창', '관통 찌르기', 5.5, '관통', 'somber_smithing_stone', false, 269, 80, 0, 0, 0, 48.0, 33.0, 26.0, 26.0, 26.0, 100, 36, 0, 0, 0, 0, 0, 0, 10, 16, 16, 0, 0),
  ('부패한 결정창', '돌격', 5.5, '관통', 'somber_smithing_stone', false, 254, 75, 0, 0, 0, 48.0, 33.0, 26.0, 26.0, 26.0, 100, 36, 55, 0, 0, 0, 0, 0, 10, 16, 16, 0, 0),
  ('귀부기사의 창', '성창의 벽', 5.5, '관통', 'somber_smithing_stone', false, 249, 0, 0, 0, 161, 49.0, 25.0, 25.0, 25.0, 38.0, 100, 36, 0, 0, 0, 0, 0, 0, 16, 16, 0, 14, 0),
  ('죽음 의례의 창', '창 부르기 의식', 6.5, '관통', 'somber_smithing_stone', false, 242, 156, 0, 0, 0, 54.0, 42.0, 27.0, 27.0, 27.0, 110, 39, 0, 0, 0, 0, 0, 0, 14, 20, 18, 0, 0),
  ('그랑삭스의 벼락', '옛 벼락의 창', 8.5, '관통', 'somber_smithing_stone', false, 240, 0, 0, 154, 0, 60.0, 31.0, 31.0, 47.0, 31.0, 100, 44, 0, 0, 0, 0, 0, 0, 20, 40, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '표준' then array['standard']::text[] when '관통' then array['pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '창'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('숏 스피어', 'standard', 'D', 'C', '-', '-', '-'),
  ('숏 스피어', 'heavy', 'B', '-', '-', '-', '-'),
  ('숏 스피어', 'keen', 'E', 'B', '-', '-', '-'),
  ('숏 스피어', 'quality', 'B', 'B', '-', '-', '-'),
  ('숏 스피어', 'fire', 'C', 'E', '-', '-', '-'),
  ('숏 스피어', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('숏 스피어', 'lightning', 'E', 'C', '-', '-', '-'),
  ('숏 스피어', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('숏 스피어', 'magic', 'E', 'E', 'C', '-', '-'),
  ('숏 스피어', 'cold', 'D', 'C', 'C', '-', '-'),
  ('숏 스피어', 'poison', 'D', 'C', '-', '-', 'D'),
  ('숏 스피어', 'blood', 'D', 'C', '-', '-', 'D'),
  ('숏 스피어', 'occult', 'E', 'D', '-', '-', 'B'),
  ('철 창', 'standard', 'C', 'D', '-', '-', '-'),
  ('철 창', 'heavy', 'B', '-', '-', '-', '-'),
  ('철 창', 'keen', 'E', 'B', '-', '-', '-'),
  ('철 창', 'quality', 'B', 'B', '-', '-', '-'),
  ('철 창', 'fire', 'C', 'E', '-', '-', '-'),
  ('철 창', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('철 창', 'lightning', 'E', 'C', '-', '-', '-'),
  ('철 창', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('철 창', 'magic', 'E', 'E', 'C', '-', '-'),
  ('철 창', 'cold', 'C', 'D', 'C', '-', '-'),
  ('철 창', 'poison', 'C', 'D', '-', '-', 'D'),
  ('철 창', 'blood', 'C', 'D', '-', '-', 'D'),
  ('철 창', 'occult', 'D', 'E', '-', '-', 'B'),
  ('스피어', 'standard', 'D', 'C', '-', '-', '-'),
  ('스피어', 'heavy', 'B', '-', '-', '-', '-'),
  ('스피어', 'keen', 'E', 'B', '-', '-', '-'),
  ('스피어', 'quality', 'B', 'B', '-', '-', '-'),
  ('스피어', 'fire', 'C', 'E', '-', '-', '-'),
  ('스피어', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('스피어', 'lightning', 'E', 'C', '-', '-', '-'),
  ('스피어', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('스피어', 'magic', 'E', 'E', 'C', '-', '-'),
  ('스피어', 'cold', 'D', 'B', 'D', '-', '-'),
  ('스피어', 'poison', 'D', 'B', '-', '-', 'D'),
  ('스피어', 'blood', 'D', 'B', '-', '-', 'D'),
  ('스피어', 'occult', 'E', 'D', '-', '-', 'B'),
  ('파르티잔', 'standard', 'C', 'D', '-', '-', '-'),
  ('파르티잔', 'heavy', 'B', '-', '-', '-', '-'),
  ('파르티잔', 'keen', 'E', 'B', '-', '-', '-'),
  ('파르티잔', 'quality', 'B', 'B', '-', '-', '-'),
  ('파르티잔', 'fire', 'D', 'E', '-', '-', '-'),
  ('파르티잔', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('파르티잔', 'lightning', 'E', 'D', '-', '-', '-'),
  ('파르티잔', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('파르티잔', 'magic', 'E', 'E', 'C', '-', '-'),
  ('파르티잔', 'cold', 'C', 'D', 'C', '-', '-'),
  ('파르티잔', 'poison', 'C', 'D', '-', '-', 'D'),
  ('파르티잔', 'blood', 'C', 'D', '-', '-', 'D'),
  ('파르티잔', 'occult', 'E', 'E', '-', '-', 'B'),
  ('파이크', 'standard', 'C', 'D', '-', '-', '-'),
  ('파이크', 'heavy', 'B', '-', '-', '-', '-'),
  ('파이크', 'keen', 'E', 'B', '-', '-', '-'),
  ('파이크', 'quality', 'B', 'B', '-', '-', '-'),
  ('파이크', 'fire', 'C', 'E', '-', '-', '-'),
  ('파이크', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('파이크', 'lightning', 'E', 'C', '-', '-', '-'),
  ('파이크', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('파이크', 'magic', 'E', 'E', 'B', '-', '-'),
  ('파이크', 'cold', 'C', 'D', 'C', '-', '-'),
  ('파이크', 'poison', 'C', 'D', '-', '-', 'D'),
  ('파이크', 'blood', 'C', 'D', '-', '-', 'D'),
  ('파이크', 'occult', 'D', 'E', '-', '-', 'B'),
  ('속창', 'standard', '-', 'B', '-', '-', '-'),
  ('속창', 'heavy', 'B', '-', '-', '-', '-'),
  ('속창', 'keen', '-', 'S', '-', '-', '-'),
  ('속창', 'quality', 'B', 'B', '-', '-', '-'),
  ('속창', 'fire', 'C', 'E', '-', '-', '-'),
  ('속창', 'flame_art', '-', 'D', '-', 'C', '-'),
  ('속창', 'lightning', 'E', 'C', '-', '-', '-'),
  ('속창', 'sacred', '-', 'D', '-', 'C', '-'),
  ('속창', 'magic', '-', 'E', 'C', '-', '-'),
  ('속창', 'cold', '-', 'B', 'C', '-', '-'),
  ('속창', 'poison', '-', 'B', '-', '-', 'D'),
  ('속창', 'blood', '-', 'B', '-', '-', 'D'),
  ('속창', 'occult', '-', 'C', '-', '-', 'B'),
  ('가시몽둥이', 'standard', 'D', 'D', '-', '-', '-'),
  ('가시몽둥이', 'heavy', 'B', '-', '-', '-', '-'),
  ('가시몽둥이', 'keen', 'E', 'B', '-', '-', '-'),
  ('가시몽둥이', 'quality', 'B', 'B', '-', '-', '-'),
  ('가시몽둥이', 'fire', 'C', 'E', '-', '-', '-'),
  ('가시몽둥이', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('가시몽둥이', 'lightning', 'E', 'C', '-', '-', '-'),
  ('가시몽둥이', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('가시몽둥이', 'magic', 'E', 'E', 'C', '-', '-'),
  ('가시몽둥이', 'cold', 'C', 'C', 'C', '-', '-'),
  ('가시몽둥이', 'poison', 'C', 'C', '-', '-', 'D'),
  ('가시몽둥이', 'blood', 'C', 'C', '-', '-', 'D'),
  ('가시몽둥이', 'occult', 'E', 'E', '-', '-', 'B'),
  ('십문자치도', 'standard', 'D', 'B', '-', '-', '-'),
  ('십문자치도', 'heavy', 'B', '-', '-', '-', '-'),
  ('십문자치도', 'keen', 'E', 'A', '-', '-', '-'),
  ('십문자치도', 'quality', 'B', 'B', '-', '-', '-'),
  ('십문자치도', 'fire', 'C', 'E', '-', '-', '-'),
  ('십문자치도', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('십문자치도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('십문자치도', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('십문자치도', 'magic', 'E', 'E', 'B', '-', '-'),
  ('십문자치도', 'cold', 'D', 'B', 'C', '-', '-'),
  ('십문자치도', 'poison', 'D', 'B', '-', '-', 'D'),
  ('십문자치도', 'blood', 'D', 'B', '-', '-', 'D'),
  ('십문자치도', 'occult', 'E', 'D', '-', '-', 'B'),
  ('진흙 인간의 작살', 'standard', 'C', 'E', 'D', '-', '-'),
  ('진흙 인간의 작살', 'heavy', 'A', '-', 'D', '-', '-'),
  ('진흙 인간의 작살', 'keen', 'E', 'B', 'D', '-', '-'),
  ('진흙 인간의 작살', 'quality', 'B', 'B', 'D', '-', '-'),
  ('진흙 인간의 작살', 'fire', 'C', 'E', 'D', '-', '-'),
  ('진흙 인간의 작살', 'flame_art', 'E', 'E', 'D', 'B', '-'),
  ('진흙 인간의 작살', 'lightning', 'E', 'C', 'D', '-', '-'),
  ('진흙 인간의 작살', 'sacred', 'E', 'E', 'D', 'B', '-'),
  ('진흙 인간의 작살', 'magic', 'E', 'E', 'B', '-', '-'),
  ('진흙 인간의 작살', 'cold', 'C', 'E', 'C', '-', '-'),
  ('진흙 인간의 작살', 'poison', 'C', 'D', 'C', '-', 'D'),
  ('진흙 인간의 작살', 'blood', 'C', 'D', 'C', '-', 'D'),
  ('진흙 인간의 작살', 'occult', 'E', 'E', 'C', '-', 'B'),
  ('혈귀의 포크', 'standard', 'C', 'E', '-', '-', 'D'),
  ('혈귀의 포크', 'heavy', 'B', '-', '-', '-', 'D'),
  ('혈귀의 포크', 'keen', 'E', 'B', '-', '-', 'D'),
  ('혈귀의 포크', 'quality', 'B', 'B', '-', '-', 'D'),
  ('혈귀의 포크', 'fire', 'C', 'E', '-', '-', 'D'),
  ('혈귀의 포크', 'flame_art', 'E', '-', '-', 'B', 'D'),
  ('혈귀의 포크', 'lightning', 'E', 'C', '-', '-', 'D'),
  ('혈귀의 포크', 'sacred', 'E', '-', '-', 'B', 'D'),
  ('혈귀의 포크', 'magic', 'E', '-', 'B', '-', 'D'),
  ('혈귀의 포크', 'cold', 'C', 'E', 'C', '-', 'D'),
  ('혈귀의 포크', 'poison', 'C', 'E', '-', '-', 'C'),
  ('혈귀의 포크', 'blood', 'C', 'E', '-', '-', 'C'),
  ('혈귀의 포크', 'occult', 'D', 'E', '-', '-', 'A'),
  ('축제 늑골 쇠스랑', 'standard', 'D', 'C', '-', '-', '-'),
  ('축제 늑골 쇠스랑', 'heavy', 'B', '-', '-', '-', '-'),
  ('축제 늑골 쇠스랑', 'keen', 'E', 'A', '-', '-', '-'),
  ('축제 늑골 쇠스랑', 'quality', 'B', 'B', '-', '-', '-'),
  ('축제 늑골 쇠스랑', 'fire', 'C', 'E', '-', '-', '-'),
  ('축제 늑골 쇠스랑', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('축제 늑골 쇠스랑', 'lightning', 'E', 'C', '-', '-', '-'),
  ('축제 늑골 쇠스랑', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('축제 늑골 쇠스랑', 'magic', 'E', 'E', 'C', '-', '-'),
  ('축제 늑골 쇠스랑', 'cold', 'D', 'B', 'C', '-', '-'),
  ('축제 늑골 쇠스랑', 'poison', 'D', 'B', '-', '-', 'D'),
  ('축제 늑골 쇠스랑', 'blood', 'D', 'B', '-', '-', 'D'),
  ('축제 늑골 쇠스랑', 'occult', 'E', 'D', '-', '-', 'B'),
  ('막대기 토치', 'standard', 'C', 'C', '-', '-', '-'),
  ('유문 창', 'standard', 'D', 'C', 'E', 'E', '-'),
  ('유문 창', 'heavy', 'B', '-', 'E', 'E', '-'),
  ('유문 창', 'keen', 'E', 'B', 'E', 'E', '-'),
  ('유문 창', 'quality', 'B', 'B', 'E', 'E', '-'),
  ('유문 창', 'fire', 'C', 'E', 'E', 'E', '-'),
  ('유문 창', 'flame_art', 'E', 'E', 'E', 'B', '-'),
  ('유문 창', 'lightning', 'E', 'C', 'E', 'E', '-'),
  ('유문 창', 'sacred', 'E', 'E', 'E', 'B', '-'),
  ('유문 창', 'magic', 'E', 'E', 'B', 'E', '-'),
  ('유문 창', 'cold', 'D', 'C', 'C', 'E', '-'),
  ('유문 창', 'poison', 'C', 'C', 'E', 'E', 'D'),
  ('유문 창', 'blood', 'C', 'C', 'E', 'E', 'D'),
  ('유문 창', 'occult', 'E', 'E', 'E', 'E', 'B'),
  ('책문 촛대', 'standard', 'C', 'C', '-', 'B', '-'),
  ('결정창', 'standard', 'D', 'B', 'D', '-', '-'),
  ('부패한 결정창', 'standard', 'D', 'B', 'D', '-', '-'),
  ('귀부기사의 창', 'standard', 'C', 'C', '-', 'D', '-'),
  ('죽음 의례의 창', 'standard', 'D', 'B', 'D', '-', '-'),
  ('그랑삭스의 벼락', 'standard', 'D', 'C', '-', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '창'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
