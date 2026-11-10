-- 사용자 제공 특대형 무기 20종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '특대형 무기') then
    raise exception '특대형 무기 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '특대형 무기'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('참기','돌격','주교의 돌진','황금의 땅','트롤의 포효','석장 마술','황금 나무의 드롭 어택','신탁의 큰 거품','수레바퀴 회전','중력 벼락','대장장이의 창','데보니아의 소용돌이','왕의 외침','그림자 고리 박치기','고두분노')
    group by name, description having count(*) > 1
  ) then
    raise exception '특대형 무기 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('참기', '각오와 함께 자세를 낮추고 버텨
순간적으로 강인도를 높이는 전투 기술.
참기 중에는 대미지도 경감된다.', '9 ( - / - )'),
  ('돌격', '허리춤에서 무기를 들고 단숨에 전진하는
전투 기술. 기세를 이어 마지막으로 찌른다.
길게 누르면 전진 거리를 늘릴 수 있다.', '16 ( - / - )'),
  ('주교의 돌진', '무기를 땅에 내려쳐 격렬한 화염을 만들고
그대로 돌진하는 전투 기술.
길게 누르는 동안은 멈추지 않는다.', '7 ( - / 7 )'),
  ('황금의 땅', '무기를 땅에 꽂은 후 힘을 담아 성스러운
폭발과 함께 황금의 돌팔매를 만들어낸다.
강 공격으로 회전 베기로 잇는다.', '16 ( - / 5 )'),
  ('트롤의 포효', '저편을 올려다 보며 포효하여
주위를 날려버리는 충격파를 발생시킨다.
또한 강 공격으로 격렬한 내려치기로 잇는다.', '22 ( - / - )'),
  ('석장 마술', '휘석에 마력을 담아 옛 마술을 발동하는
전투 기술. 자율적으로 대상을 향해 날아가는
마법탄을 주위에 띄운다.', '15 ( - / - )'),
  ('황금 나무의 드롭 어택', '전방에 가볍게 도약하고 그대로
무거운 엉덩이를 떨어뜨리는 전투 기술.
드롭 어택 중 가장 위력이 높다.', '19 ( - / - )'),
  ('신탁의 큰 거품', '피리를 불어 큰 마력 거품을 쏘는 전투 기술
큰 거품은 천천히 날아가면서
둥실둥실 목표로 향한다.', '16 ( - / - )'),
  ('수레바퀴 회전', '땅을 쓸어 빠르게 수레바퀴를 돌리는 전투 기술.
길게 누르면 고속 회전 상태를 유지할 수 있고
걸어가서 적에게 수레바퀴를 댈 수도 있다.', '3 ( - / - )'),
  ('중력 벼락', '무기를 들고 하늘을 향해 치켜들어서
적의 발밑에서 중력을 두른 바위를 융기시킨다.
추가 입력으로 연속으로 발생시킬 수 있다.', '13 ( - / 13 )'),
  ('대장장이의 창', '붉게 달궈진 모루를 땅에 내리꽂는 전투 기술.
뽑을 때 지면에서 수많은 창을 생성한다.
그 창은 금방 사라진다.', '18 ( - / - )'),
  ('데보니아의 소용돌이', '도가니의 소용돌이의 힘으로 대형 망치 전체를
격렬히 회전시키고 그대로 충격과 함께 대지에
내리치는 전투 기술.
차지 공격으로 강화된다.', '16 ( - / - )'),
  ('왕의 외침', '외침과 함께 공격력을 높이는 전투 기술.
대지를 밟는 충격파는 가드할 수 없으며
효과 중 강 공격이 내디뎌 베기가 된다.', '25 ( - / - )'),
  ('그림자 고리 박치기', '큰 영륜초 꽃을 내리쳐
충격파와 함께 적을 짓누르는 전투 기술.
추가 입력으로 2회까지 추가 공격이 가능하다.', '16 ( - / 8 )'),
  ('고두분노', '손가락 머리로 격렬하게 찍어 누르는 전투 기술.
그대로 분노를 모아 폭발시킨다.
길게 누르면 그 분노는 더욱 커진다.', '31 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('투사의 대형 도끼', 10, 'base_game', '과거에 검투를 위해 만들어진 대형 도끼.
투기장에서 쫓긴 투사들의 무기.

영웅적 투사에게만 허락된 무기이며
특히 차지 공격이 강하다.', '차지 강공격이 특히 강력하다.'),
  ('부패한 대형 도끼', 20, 'base_game', '과거에 검투를 위해 만들어진 대형 도끼가
붉은 부패에 침식된 것.

투기장에서 쫓긴 투사들의 무기.', '차지 강공격이 특히 강력하다.'),
  ('골렘의 도끼창', 30, 'base_game', '옛 유적의 문명이 만든 검은 돌의 큰 도끼창.
가디언 골렘이 사용하는 무기.', null),
  ('거인 부수기', 40, 'base_game', '거인 전쟁에서 쓰인 거암으로 만든 대형 망치.
틈새의 땅에서 가장 무거운 무기 중 하나.

거인이 멸망하고 인간이 인간과 싸우는 시대에
이 무기는 조용히 잊혔다.
고대에 비해 인간은 너무 힘이 약해졌다.', null),
  ('주교의 대형 화염 망치', 50, 'base_game', '불타오르는 불꽃을 본뜬 거대한 망치.
불의 승병들의 지도자인 주교의 무기.
그들에게만 허락된 격렬한 화염.

그 망치머리는 심상치 않게 무겁고.
강 공격으로 적을 공중에 찍어 올린다.', null),
  ('그레이트 클럽', 60, 'base_game', '두껍고 단단하고 거대한 나무 덩어리.
기량이 필요 없는 타격 무기.
야만스럽게 힘에 맡겨 적을 때려눕힌다.

천벌 받아 마땅하게도
황금 나무의 시든 나뭇가지라고 하며
절대 부러지지 않고 신성을 띠고 있다.', null),
  ('트롤 해머', 70, 'base_game', '채석꾼 트롤이 암반을 부수는 도구.

트롤들은 거인의 후예이며
이것은 고대의 제구, 단조 도구라고 한다.
고대에 단조는 신성한 일이었다.', null),
  ('대룡조', 80, 'base_game', '대고룡의 발톱을 깎아 만들었다는 무기.
황금 나무를 섬기는 이형의 트리 가드의 무기.

그 발톱은 벼락의 힘을 띠고 있으며
왜소한 용의 후예를 찢어버린다.', '비룡형 적에게 30%, 고룡형 적에게 15%의 추가 대미지를 준다.'),
  ('혈귀의 팔', 90, 'shadow_of_the_erdtree', '혈귀들이 사용하는 무기.
동족의 사체, 그 팔을 무기로 삼은 것.

피의 의식을 통해 정화되어 있으며,
강 공격으로 안에 고인 피를 흩뿌린다.', '강공격 시 피를 흩뿌리는 추가 공격이 발생한다.'),
  ('파수견의 석장', 100, 'base_game', '휘석이 박힌 석제 대형 석장.
지하 묘지를 지키는 환수의 파수견의 무기.

파수견은 임프를 이끄는 우두머리라고 한다.
오랜 세월에 열화되어 삐걱거리는
지하 묘지의 왕이다.', null),
  ('화신의 의장', 110, 'base_game', '빛나는 옛 황금 나무를 모시는 의식 지팡이.
작은 황금 나무를 지키는 화신들의 무기.

엘든 링이 부서진 후 나타난 화신들은
멸망해 가는 황금 나무의
자손을 지키려는 의지라고 한다.', null),
  ('부패한 의장', 120, 'base_game', '빛나는 옛 황금 나무를 모시는 의식 지팡이가
붉은 부패에 잠식된 것.

작은 황금 나무를 지키는 화신들의 무기.', null),
  ('사자들의 부채피리', 130, 'base_game', '신탁의 사자가 쓰는 황금 부채피리
굉장히 묵직해서 때리는 무기도 된다.

원래는 역시 악기이지만
사람의 몸으로 불 수는 없다.
혹은 아직 그럴 때가 오지 않았다.', null),
  ('기자의 수레바퀴', 140, 'base_game', '피부를 찢는 칼날이 늘어선 큰 철제 수레바퀴.
책문관 기자가 사용했던 고문 도구.
그 회전은 심한 통증과 출혈을 일으킨다.

그것은 훗날 납치하는 소녀 인형의
상징적인 무기로 채용되었다.', null),
  ('성수의 턱', 150, 'base_game', '내리는 별의 짐승의 검게 빛나는
단단하고 큰 턱 중 한쪽을 무기로 만든 것.

날카로운 끝부분으로 꿰뚫는 특대형 무기.', '별에서 온 자들에게 1.2배 대미지를 준다.'),
  ('모루 해머', 160, 'shadow_of_the_erdtree', '대장장이 유적에 숨겨져 있던 물건 중 하나.
붉게 달궈진 모루를 그대로 망치머리로 쓴
거대한 해머.

그 모루의 모양은 제단을 본떴으며
옛날에는 제례에 사용했다고 한다.', null),
  ('데보니아의 대형 망치', 170, 'shadow_of_the_erdtree', '도가니의 기사 최고참이라고 하는
기사 데보니아의 대형 망치.

붉은 빛이 도는 원초의 황금,
그 옛 신성을 품은 무기.
타격면에는 거센 생명의 흐름이 새겨져 있다.', null),
  ('고드프리의 왕 도끼', 180, 'base_game', '엘데의 왕 고드프리의 무기.
빛바랜 자를 이끈 장정에 반 쯤 부서졌다.

고드프리가 왕으로서 행동하겠다는 맹세이자
황금 일족의 상징이 되기도 한 무기.
과거에는 힘이야말로 왕인 까닭이었다.', null),
  ('큰 영륜초 꽃', 190, 'shadow_of_the_erdtree', '그림자 나무의 화신인 거대한 영륜초의 무기.
혹은, 꽃을 그대로 무기 삼은 것.

그 생태는 그림자 나무와 닮아
꽃이 달린 줄기를 지탱하고 껴안듯
또 하나의 줄기가 휘감고 있다.', null),
  ('바라보는 손가락', 200, 'shadow_of_the_erdtree', '손가락의 어머니, 메티르의 손가락 끝을
그대로 무기 삼은 것.

그 끝의 바닥면, 지문 주름의 중심에는
아주 작은 돌기 같은 눈동자가
멍하니 저편을 바라보고 있다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '특대형 무기'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('투사의 대형 도끼', '참기', 20.0, '표준', 'smithing_stone', true, 416, 0, 0, 0, 0, 78.0, 47.0, 47.0, 47.0, 47.0, 100, 62, 0, 0, 0, 0, 0, 0, 30, 10, 0, 0, 0),
  ('부패한 대형 도끼', '참기', 20.0, '표준', 'smithing_stone', true, 396, 0, 0, 0, 0, 78.0, 47.0, 47.0, 47.0, 47.0, 100, 62, 65, 0, 0, 0, 0, 0, 30, 10, 0, 0, 0),
  ('골렘의 도끼창', '돌격', 21.5, '표준 / 관통', 'smithing_stone', true, 387, 0, 0, 0, 0, 75.0, 45.0, 45.0, 45.0, 45.0, 100, 60, 0, 0, 0, 0, 0, 0, 36, 14, 0, 0, 0),
  ('거인 부수기', '참기', 26.5, '타격', 'smithing_stone', true, 379, 0, 0, 0, 0, 88.0, 52.0, 52.0, 52.0, 52.0, 100, 69, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0),
  ('주교의 대형 화염 망치', '주교의 돌진', 23.5, '타격', 'smithing_stone', true, 382, 0, 0, 0, 0, 82.0, 49.0, 49.0, 49.0, 49.0, 100, 66, 0, 0, 0, 0, 0, 0, 45, 8, 0, 0, 0),
  ('그레이트 클럽', '황금의 땅', 17.0, '타격', 'smithing_stone', false, 377, 0, 0, 0, 112, 70, 41, 42.0, 40, 47, 100, 56, 0, 0, 0, 0, 0, 0, 35, 0, 0, 0, 0),
  ('트롤 해머', '트롤의 포효', 16.0, '타격', 'smithing_stone', false, 374, 0, 110, 0, 0, 66.0, 41.0, 46.0, 41.0, 41.0, 100, 55, 0, 0, 0, 0, 0, 0, 28, 8, 0, 10, 0),
  ('대룡조', '참기', 16.0, '표준', 'somber_smithing_stone', false, 294, 0, 0, 191, 0, 66.0, 40.0, 40.0, 52.0, 40.0, 100, 51, 0, 0, 0, 0, 0, 0, 30, 14, 0, 0, 0),
  ('혈귀의 팔', '참기', 20.0, '타격', 'smithing_stone', true, 360, 0, 0, 0, 0, 76.0, 46.0, 46.0, 46.0, 46.0, 100, 61, 0, 0, 0, 0, 0, 0, 28, 11, 0, 0, 16),
  ('파수견의 석장', '석장 마술', 19.0, '타격', 'somber_smithing_stone', false, 404, 0, 0, 0, 0, 75.0, 45.0, 45.0, 45.0, 45.0, 100, 55, 0, 0, 0, 0, 0, 0, 34, 10, 0, 0, 0),
  ('화신의 의장', '황금 나무의 드롭 어택', 20.0, '타격', 'somber_smithing_stone', false, 276, 0, 0, 0, 178, 73.0, 45.0, 45.0, 45.0, 57.0, 100, 57, 0, 0, 0, 0, 0, 0, 34, 8, 0, 24, 0),
  ('부패한 의장', '황금 나무의 드롭 어택', 18.0, '타격', 'somber_smithing_stone', false, 404, 0, 0, 0, 0, 75.0, 45.0, 45.0, 45.0, 45.0, 100, 55, 75, 0, 0, 0, 0, 0, 34, 8, 0, 0, 0),
  ('사자들의 부채피리', '신탁의 큰 거품', 19.5, '타격', 'somber_smithing_stone', false, 296, 0, 0, 0, 191, 70.0, 43.0, 43.0, 43.0, 55.0, 100, 55, 0, 0, 0, 0, 0, 0, 28, 12, 0, 24, 0),
  ('기자의 수레바퀴', '수레바퀴 회전', 19.0, '표준', 'somber_smithing_stone', false, 382, 0, 0, 0, 0, 73.0, 43.0, 43.0, 43.0, 43.0, 100, 52, 0, 0, 70, 0, 0, 0, 28, 18, 0, 0, 0),
  ('성수의 턱', '중력 벼락', 21.5, '관통', 'somber_smithing_stone', false, 320, 208, 0, 0, 0, 70.0, 55.0, 43.0, 43.0, 43.0, 100, 55, 0, 0, 0, 0, 0, 0, 34, 12, 20, 0, 0),
  ('모루 해머', '대장장이의 창', 22.0, '타격', 'somber_smithing_stone', false, 320, 0, 208, 0, 0, 80.0, 43.0, 59.0, 43.0, 41.0, 100, 58, 0, 0, 0, 0, 0, 0, 39, 10, 11, 20, 0),
  ('데보니아의 대형 망치', '데보니아의 소용돌이', 20.0, '타격', 'somber_smithing_stone', false, 360, 0, 0, 0, 107, 73.0, 45.0, 45.0, 44.0, 51.0, 100, 56, 0, 0, 0, 0, 0, 0, 30, 13, 0, 19, 0),
  ('고드프리의 왕 도끼', '왕의 외침', 18.0, '표준', 'somber_smithing_stone', false, 404, 0, 0, 0, 0, 75.0, 45.0, 45.0, 45.0, 45.0, 100, 55, 0, 0, 0, 0, 0, 0, 42, 14, 0, 0, 0),
  ('큰 영륜초 꽃', '그림자 고리 박치기', 16.0, '타격', 'somber_smithing_stone', false, 279, 0, 0, 0, 279, 55.0, 37.0, 37.0, 37.0, 64.0, 100, 50, 0, 0, 0, 0, 0, 0, 24, 8, 0, 25, 0),
  ('바라보는 손가락', '고두분노', 15.0, '타격', 'somber_smithing_stone', false, 325, 210, 0, 0, 0, 66.0, 50.0, 38.0, 38.0, 38.0, 100, 50, 0, 0, 0, 0, 0, 0, 20, 8, 20, 14, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '표준' then array['standard']::text[] when '관통' then array['pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '특대형 무기'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('투사의 대형 도끼', 'standard', 'D', 'C', '-', '-', '-'),
  ('투사의 대형 도끼', 'heavy', 'B', '-', '-', '-', '-'),
  ('투사의 대형 도끼', 'keen', 'E', 'A', '-', '-', '-'),
  ('투사의 대형 도끼', 'quality', 'B', 'B', '-', '-', '-'),
  ('투사의 대형 도끼', 'fire', 'C', 'E', '-', '-', '-'),
  ('투사의 대형 도끼', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('투사의 대형 도끼', 'lightning', 'E', 'C', '-', '-', '-'),
  ('투사의 대형 도끼', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('투사의 대형 도끼', 'magic', 'E', 'E', 'C', '-', '-'),
  ('투사의 대형 도끼', 'cold', 'D', 'B', 'D', '-', '-'),
  ('투사의 대형 도끼', 'poison', 'D', 'B', '-', '-', 'D'),
  ('투사의 대형 도끼', 'blood', 'D', 'B', '-', '-', 'D'),
  ('투사의 대형 도끼', 'occult', 'E', 'D', '-', '-', 'B'),
  ('부패한 대형 도끼', 'standard', 'D', 'B', '-', '-', '-'),
  ('부패한 대형 도끼', 'heavy', 'B', '-', '-', '-', '-'),
  ('부패한 대형 도끼', 'keen', 'E', 'A', '-', '-', '-'),
  ('부패한 대형 도끼', 'quality', 'B', 'B', '-', '-', '-'),
  ('부패한 대형 도끼', 'fire', 'C', 'E', '-', '-', '-'),
  ('부패한 대형 도끼', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('부패한 대형 도끼', 'lightning', 'E', 'C', '-', '-', '-'),
  ('부패한 대형 도끼', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('부패한 대형 도끼', 'magic', 'E', 'E', 'C', '-', '-'),
  ('부패한 대형 도끼', 'cold', 'D', 'B', 'D', '-', '-'),
  ('부패한 대형 도끼', 'poison', 'D', 'B', '-', '-', 'D'),
  ('부패한 대형 도끼', 'blood', 'D', 'B', '-', '-', 'D'),
  ('부패한 대형 도끼', 'occult', 'E', 'D', '-', '-', 'B'),
  ('골렘의 도끼창', 'standard', 'C', 'D', '-', '-', '-'),
  ('골렘의 도끼창', 'heavy', 'A', '-', '-', '-', '-'),
  ('골렘의 도끼창', 'keen', 'E', 'B', '-', '-', '-'),
  ('골렘의 도끼창', 'quality', 'B', 'B', '-', '-', '-'),
  ('골렘의 도끼창', 'fire', 'C', 'E', '-', '-', '-'),
  ('골렘의 도끼창', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('골렘의 도끼창', 'lightning', 'E', 'C', '-', '-', '-'),
  ('골렘의 도끼창', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('골렘의 도끼창', 'magic', 'D', 'E', 'C', '-', '-'),
  ('골렘의 도끼창', 'cold', 'B', 'D', 'C', '-', '-'),
  ('골렘의 도끼창', 'poison', 'B', 'D', '-', '-', 'D'),
  ('골렘의 도끼창', 'blood', 'B', 'D', '-', '-', 'D'),
  ('골렘의 도끼창', 'occult', 'D', 'E', '-', '-', 'B'),
  ('거인 부수기', 'standard', 'B', '-', '-', '-', '-'),
  ('거인 부수기', 'heavy', 'S', '-', '-', '-', '-'),
  ('거인 부수기', 'keen', 'E', 'A', '-', '-', '-'),
  ('거인 부수기', 'quality', 'B', 'B', '-', '-', '-'),
  ('거인 부수기', 'fire', 'B', 'E', '-', '-', '-'),
  ('거인 부수기', 'flame_art', 'C', '-', '-', 'B', '-'),
  ('거인 부수기', 'lightning', 'E', 'B', '-', '-', '-'),
  ('거인 부수기', 'sacred', 'C', '-', '-', 'B', '-'),
  ('거인 부수기', 'magic', 'D', '-', 'B', '-', '-'),
  ('거인 부수기', 'cold', 'A', '-', 'C', '-', '-'),
  ('거인 부수기', 'poison', 'A', '-', '-', '-', 'D'),
  ('거인 부수기', 'blood', 'A', '-', '-', '-', 'D'),
  ('거인 부수기', 'occult', 'B', '-', '-', '-', 'B'),
  ('주교의 대형 화염 망치', 'standard', 'B', 'E', '-', '-', '-'),
  ('주교의 대형 화염 망치', 'heavy', 'A', '-', '-', '-', '-'),
  ('주교의 대형 화염 망치', 'keen', 'E', 'B', '-', '-', '-'),
  ('주교의 대형 화염 망치', 'quality', 'B', 'B', '-', '-', '-'),
  ('주교의 대형 화염 망치', 'fire', 'C', 'E', '-', '-', '-'),
  ('주교의 대형 화염 망치', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('주교의 대형 화염 망치', 'lightning', 'E', 'C', '-', '-', '-'),
  ('주교의 대형 화염 망치', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('주교의 대형 화염 망치', 'magic', 'D', 'E', 'B', '-', '-'),
  ('주교의 대형 화염 망치', 'cold', 'B', 'E', 'C', '-', '-'),
  ('주교의 대형 화염 망치', 'poison', 'B', 'E', '-', '-', 'D'),
  ('주교의 대형 화염 망치', 'blood', 'B', 'E', '-', '-', 'D'),
  ('주교의 대형 화염 망치', 'occult', 'B', '-', '-', '-', 'B'),
  ('그레이트 클럽', 'standard', 'B', '-', '-', 'D', '-'),
  ('트롤 해머', 'standard', 'B', 'E', '-', 'D', '-'),
  ('대룡조', 'standard', 'C', 'C', '-', '-', '-'),
  ('혈귀의 팔', 'standard', 'C', 'E', '-', '-', 'C'),
  ('혈귀의 팔', 'heavy', 'A', '-', '-', '-', 'D'),
  ('혈귀의 팔', 'keen', 'E', 'B', '-', '-', 'D'),
  ('혈귀의 팔', 'quality', 'B', 'B', '-', '-', 'D'),
  ('혈귀의 팔', 'fire', 'C', 'E', '-', '-', 'D'),
  ('혈귀의 팔', 'flame_art', 'E', 'E', '-', 'C', 'D'),
  ('혈귀의 팔', 'lightning', 'E', 'C', '-', '-', 'D'),
  ('혈귀의 팔', 'sacred', 'E', 'E', '-', 'C', 'D'),
  ('혈귀의 팔', 'magic', 'E', 'E', 'C', '-', 'D'),
  ('혈귀의 팔', 'cold', 'C', 'E', 'D', '-', 'D'),
  ('혈귀의 팔', 'poison', 'C', 'E', '-', '-', 'C'),
  ('혈귀의 팔', 'blood', 'C', 'E', '-', '-', 'C'),
  ('혈귀의 팔', 'occult', 'D', 'E', '-', '-', 'A'),
  ('파수견의 석장', 'standard', 'C', 'D', '-', '-', '-'),
  ('화신의 의장', 'standard', 'A', 'D', '-', 'B', '-'),
  ('부패한 의장', 'standard', 'B', 'D', '-', '-', '-'),
  ('사자들의 부채피리', 'standard', 'C', 'C', '-', 'D', '-'),
  ('기자의 수레바퀴', 'standard', 'C', 'C', '-', '-', '-'),
  ('성수의 턱', 'standard', 'C', 'C', 'D', '-', '-'),
  ('모루 해머', 'standard', 'B', 'E', 'E', 'D', '-'),
  ('데보니아의 대형 망치', 'standard', 'B', 'D', '-', 'C', '-'),
  ('고드프리의 왕 도끼', 'standard', 'C', 'D', '-', '-', '-'),
  ('큰 영륜초 꽃', 'standard', 'C', 'E', '-', 'B', '-'),
  ('바라보는 손가락', 'standard', 'B', '-', 'D', 'E', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '특대형 무기'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
