-- 사용자 제공 특대검 16종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '특대검') then
    raise exception '특대검 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '특대검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('파고들어 올려 베기','트롤의 포효','거검진','늑대의 습격','복수의 맹세','붕괴파','백광의 돌격','별 부르기','약속의 왕','광속참','여왕의 흑염','운명의 죽음')
    group by name, description having count(*) > 1
  ) then
    raise exception '특대검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('파고들어 올려 베기', '무기를 들고 몸을 굳혀서 낮게 파고들어
순간적으로 강인도를 높이는 전투 기술.
강 공격을 하면 올려 베기로 이을 수 있다.', '5 ( - / 8 )'),
  ('트롤의 포효', '저편을 올려다 보며 포효하여
주위를 날려버리는 충격파를 발생시킨다.
또한 강 공격으로 격렬한 내려치기로 잇는다.', '22 ( - / - )'),
  ('거검진', '트롤 마술기사들의 전투 기술.
가대한 마력 휘검으로 원진을 펼친다.
휘검은 자동으로 가까운 적을 향해 날아간다.
강 공격으로 뛰어드는 찌르기로 이을 수 있다.', '16 ( - / 6 )'),
  ('늑대의 습격', '검신에 냉기를 두르고 회전하여 전방으로 도약,
그 기세로 대검을 땅에 꽂는 전투 기술.
검을 뽑을 때 냉기 폭발을 수반한다.', '20 ( - / - )'),
  ('복수의 맹세', '대검에 일족의 복수를 맹세하여
일정 시간 모든 능력치를 높이는 전투 기술.
맹세하는 순간은 강인도도 높아진다.', '20 ( - / - )'),
  ('붕괴파', '검을 치켜든 후 내리쳐
땅으로 퍼지는 중력파를 쏘는 전투 기술.', '25 ( - / - )'),
  ('백광의 돌격', '옛 운철의 갈라진 틈에 흰 빛을 만들어내고
그 힘으로 돌격해 적을 꿰뚫는 전투 기술.
추가 입력으로 그 빛을 폭발시킨다.', '10 ( - / 25 )'),
  ('별 부르기', '두 검을 맞춘 후 하늘에 포효하고
중력파로 적을 끌어들이는 전투 기술.
추가 입력으로 중력을 두른 검을 내리친다.', '20 ( - / 20 )'),
  ('약속의 왕', '두 자루의 대검에 미켈라의 빛을 두르고
빛의 기둥을 수반하는 참격을 쓰는 전투 기술.
추가 입력으로 2회까지 연속 공격이 가능하다.', '20 ( - / 10 )'),
  ('광속참', '스스로 빛이 되어 광속으로 내려베는 전투 기술.
연속으로 빛의 추가 공격이 발생한다.
차지 공격으로 강화, 추가 공격 수가 증가한다.', '32 ( - / - )'),
  ('여왕의 흑염', '검신에 신을 사냥하는 흑염을 태우고 베는
전투 기술. 추가 입력으로 추가 공격도 가능하며
흑염은 잠시 HP를 계속 깎는다.', '15 ( - / 15 )'),
  ('운명의 죽음', '운명의 죽음, 그 잔재를 해방하여
대검을 땅에 꽂고 수많은 칼날을 만드는 전투 기술.
대미지를 입힘과 동시에 최대 HP를 감소시키며
잠시 HP를 계속 깎는다.', '40 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('츠바이헨더', 10, 'base_game', '인간이 휘두를 수 있는 최대 크기의 검.
이름대로 양손 잡기용 무기지만
일반적인 근력으로는 양손으로도 다룰 수 없다.

긴 칼날은 무겁고 날카로워, 내리쳐서 적을
날릴 뿐만 아니라 깊게 찌를 수도 있다.', null),
  ('그레이트 소드', 20, 'base_game', '거대하고 거친 쇳덩어리 검.
매우 무겁고, 그 무게로 적을 쓸어버린다.

인간이 다룰 수 있는 한계를 넘긴 무기이기에
인간이 아닌 존재마저 물리칠 수 있다.', null),
  ('파수견의 대검', 30, 'base_game', '환수의 파수견이 휘두르는 돌 대검.

파수꾼의 눈이 새겨져 있지만
도굴되어 그 눈동자는 텅 비었으며
그렇기에 이 검은 그저 돌덩어리다.', null),
  ('불의 기사 대검', 40, 'shadow_of_the_erdtree', '불의 기사들이 사용하는 대검.
길고 가는 검신은 불을 본떠 파도친다.

미리 화염 기도를 담았으며
어떠한 방법으로 화염 공격력을 부여할 시
상승 효과로 크게 위력이 높아진다', '화염 공격력을 부여하면 상승 효과로 위력이 크게 높아진다.'),
  ('트롤의 황금검', 50, 'base_game', '옛 시대, 거인 전쟁터에서
황금 나무에 가담한 거인들에게 주어진 검.

이제는 지성을 잃은 거인들은
금 피막이 떨어져 나간 볼품없는 검을
그래도 떼어놓지 않고 짊어지고 있다.', null),
  ('거인의 마법검', 60, 'base_game', '검신에 푸른 휘석이 박힌 대검.
카리아 왕가를 섬긴 트롤들의 검.

여왕이 맹약의 벗이라 부른 그들은
카리아의 정식 기사이며
인간 기사와 함께 검을 치켜들었다고 한다.', null),
  ('문리델의 기사검', 70, 'shadow_of_the_erdtree', '검신에 파란 휘석이 박힌 대검.
괴력의 카리아 기사 문리델의 무기.

쌍월의 시종인 문리델은
왕가를 섬기던 트롤들의 친구로
그들의 무기를 함께 들었다고 한다.', null),
  ('왕가의 그레이트 소드', 80, 'base_game', '카리아 왕가의 장식이 된 그레이트 소드.
반 늑대 블라이드의 무기.

블라이드가 태어난 운명을 등지고
라니만을 섬기겠다 맹세했을 때
이 검은 증표가 되고 차가운 마력을 띠었다.', null),
  ('검 잇기의 대검', 90, 'base_game', '몬 성에 소장된 전설의 무기.
수많은 한탄, 분노를 짊어진 복수의 대검.
「전설의 무기」 중 하나.

과거에 혼자 살아남은 망국의 영웅은
일족의 전사 모두의 검을 모아 계속 싸웠다.', null),
  ('유적의 대검', 100, 'base_game', '하늘에서 내리는 유적의 잔해.
그 부서지지 않았던 조각으로 벼린 무기.
「전설의 무기」 중 하나.

그 유적은 운석으로 인해 붕괴했다고 하며
이 무기는 붕괴의 힘을 품었다.', '풀차지 강공격 시 지면에 짧은 중력파가 발생한다.'),
  ('옛 운철 대검', 110, 'shadow_of_the_erdtree', '대장장이 유적에 숨겨져 있던 물건 중 하나.
날카로운, 오래된 운철 대검.

발굴된 옛 신들의 무기.
그 화살촉 파편을 가공한 것이며
찌르기, 돌격에 뛰어나다.', null),
  ('별 부수는 대검', 120, 'base_game', '장군 라단이 사용했던 흑철 대검.
사자 갈기가 장식된 두 자루가 한 쌍인 무기.

젊은 라단이 별을 부순 전승은 유명하며
중력의 문장은 그때 새겨졌다고 한다.[39]', '별에서 온 자들에게 1.3배 대미지를 준다.'),
  ('라단의 대검(왕)', 130, 'shadow_of_the_erdtree', '젊은 라단이 사용했던 흑철 대검.
사자 갈기가 장식된 두 자루가 한 쌍인 무기.

라단이 별을 부수기 직전의 물건으로,
근력과 중력에만 의존하지 않는 왕의 검', null),
  ('라단의 대검(빛)', 140, 'shadow_of_the_erdtree', '젊은 라단이 사용했던 흑철 대검.
사자 갈기가 장식된 두 자루가 한 쌍인 무기.

라단이 별을 부수기 직전의 물건으로,
근력과 중력에만 의존하지 않는 왕의 검', null),
  ('신 사냥의 검', 150, 'base_game', '과거에 신의 살갗의 사도들을 이끌고
말리케스에게 진 밤빛 눈의 여왕의 성검.

사도들이 다루는 검은 불꽃은
이 검에서 가져온 것이다.', null),
  ('말리케스의 흑검', 160, 'base_game', '운명의 죽음을 품은 말리케스의 흑검.
그 거대한 빈 껍질.

음모가 있던 밤, 죽음의 일부가 도난당한 후
말리케스는 이 검을 자신의 안에 봉했다.
다시는 그 누구도 죽음을 훔치지 못하도록.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '특대검'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('츠바이헨더', '파고들어 올려 베기', 15.5, '표준 / 관통', 'smithing_stone', true, 345, 0, 0, 0, 0, 67.0, 40.0, 40.0, 40.0, 40.0, 100, 54, 0, 0, 0, 0, 0, 0, 19, 11, 0, 0, 0),
  ('그레이트 소드', '파고들어 올려 베기', 23.0, '표준 / 관통', 'smithing_stone', true, 401, 0, 0, 0, 0, 84.0, 50.0, 50.0, 50.0, 50.0, 100, 67, 0, 0, 0, 0, 0, 0, 31, 12, 0, 0, 0),
  ('파수견의 대검', '파고들어 올려 베기', 22.0, '표준', 'smithing_stone', true, 347, 0, 0, 0, 0, 82.0, 49.0, 49.0, 49.0, 49.0, 100, 66, 0, 0, 0, 0, 0, 0, 30, 10, 0, 0, 0),
  ('불의 기사 대검', '파고들어 올려 베기', 16.0, '표준 / 관통', 'smithing_stone', true, 360, 0, 107, 0, 0, 69.0, 42.0, 47.0, 42.0, 42.0, 100, 56, 0, 0, 0, 0, 0, 0, 22, 18, 0, 12, 0),
  ('트롤의 황금검', '트롤의 포효', 19.0, '표준', 'smithing_stone', true, 379, 0, 0, 0, 0, 76.0, 46.0, 46.0, 46.0, 46.0, 100, 61, 0, 0, 0, 0, 0, 0, 29, 10, 0, 0, 0),
  ('거인의 마법검', '트롤의 포효', 18.0, '표준', 'somber_smithing_stone', false, 303, 196, 0, 0, 0, 70.0, 55.0, 43.0, 43.0, 43.0, 100, 55, 0, 0, 0, 0, 0, 0, 20, 14, 18, 0, 0),
  ('문리델의 기사검', '거검진', 18.0, '표준', 'somber_smithing_stone', false, 303, 196, 0, 0, 0, 70.0, 55.0, 43.0, 43.0, 43.0, 100, 55, 0, 0, 0, 0, 0, 0, 20, 14, 18, 0, 0),
  ('왕가의 그레이트 소드', '늑대의 습격', 20.0, '표준 / 관통', 'somber_smithing_stone', false, 274, 328, 0, 0, 0, 71.0, 63.0, 44.0, 44.0, 44.0, 100, 57, 0, 0, 0, 0, 0, 0, 26, 18, 22, 0, 0),
  ('검 잇기의 대검', '복수의 맹세', 21.0, '표준 / 관통', 'somber_smithing_stone', false, 396, 0, 0, 0, 0, 80.0, 48.0, 48.0, 48.0, 48.0, 100, 58, 0, 0, 0, 0, 0, 0, 40, 14, 0, 0, 0),
  ('유적의 대검', '붕괴파', 23.0, '표준 / 관통', 'somber_smithing_stone', false, 303, 90, 0, 0, 0, 82.0, 56.0, 50.0, 50.0, 50.0, 100, 61, 0, 0, 0, 0, 0, 0, 50, 0, 16, 0, 0),
  ('옛 운철 대검', '백광의 돌격', 22.0, '표준 / 관통', 'somber_smithing_stone', false, 377, 112, 0, 0, 0, 80.0, 55.0, 49.0, 49.0, 49.0, 100, 60, 0, 0, 0, 0, 0, 0, 35, 10, 0, 0, 19),
  ('별 부수는 대검', '별 부르기', 20.0, '표준 / 관통', 'somber_smithing_stone', false, 316, 203, 0, 0, 0, 65.0, 47.0, 34.0, 34.0, 34.0, 100, 57, 0, 0, 0, 0, 0, 0, 38, 12, 15, 0, 0),
  ('라단의 대검(왕)', '약속의 왕', 19.0, '표준 / 관통', 'somber_smithing_stone', false, 311, 200, 0, 0, 0, 63.0, 51.0, 33.0, 33.0, 33.0, 100, 57, 0, 0, 0, 0, 0, 0, 32, 24, 15, 0, 0),
  ('라단의 대검(빛)', '광속참', 19.0, '표준 / 관통', 'somber_smithing_stone', false, 311, 200, 0, 0, 0, 63.0, 51.0, 33.0, 33.0, 33.0, 100, 57, 0, 0, 0, 0, 0, 0, 32, 24, 15, 0, 0),
  ('신 사냥의 검', '여왕의 흑염', 17.5, '표준 / 관통', 'somber_smithing_stone', false, 291, 0, 188, 0, 0, 63.0, 38.0, 49.0, 38.0, 38.0, 100, 49, 0, 0, 0, 0, 0, 0, 20, 22, 0, 20, 0),
  ('말리케스의 흑검', '운명의 죽음', 22.0, '표준 / 관통', 'somber_smithing_stone', false, 311, 0, 0, 0, 200, 68.0, 36.0, 36.0, 36.0, 49.0, 100, 60, 0, 0, 0, 0, 0, 0, 34, 12, 0, 20, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '특대검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('츠바이헨더', 'standard', 'D', 'C', '-', '-', '-'),
  ('츠바이헨더', 'heavy', 'A', '-', '-', '-', '-'),
  ('츠바이헨더', 'keen', 'E', 'A', '-', '-', '-'),
  ('츠바이헨더', 'quality', 'B', 'B', '-', '-', '-'),
  ('츠바이헨더', 'fire', 'C', 'E', '-', '-', '-'),
  ('츠바이헨더', 'flame_art', 'D', 'D', '-', 'C', '-'),
  ('츠바이헨더', 'lightning', 'E', 'C', '-', '-', '-'),
  ('츠바이헨더', 'sacred', 'D', 'D', '-', 'C', '-'),
  ('츠바이헨더', 'magic', 'E', 'E', 'B', '-', '-'),
  ('츠바이헨더', 'cold', 'C', 'C', 'C', '-', '-'),
  ('츠바이헨더', 'poison', 'C', 'B', '-', '-', 'D'),
  ('츠바이헨더', 'blood', 'C', 'B', '-', '-', 'D'),
  ('츠바이헨더', 'occult', 'E', 'D', '-', '-', 'B'),
  ('그레이트 소드', 'standard', 'B', 'D', '-', '-', '-'),
  ('그레이트 소드', 'heavy', 'A', '-', '-', '-', '-'),
  ('그레이트 소드', 'keen', 'D', 'B', '-', '-', '-'),
  ('그레이트 소드', 'quality', 'B', 'B', '-', '-', '-'),
  ('그레이트 소드', 'fire', 'C', 'E', '-', '-', '-'),
  ('그레이트 소드', 'flame_art', 'D', 'E', '-', 'D', '-'),
  ('그레이트 소드', 'lightning', 'E', 'C', '-', '-', '-'),
  ('그레이트 소드', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('그레이트 소드', 'magic', 'E', 'E', 'C', '-', '-'),
  ('그레이트 소드', 'cold', 'B', 'D', 'D', '-', '-'),
  ('그레이트 소드', 'poison', 'B', 'D', '-', '-', 'D'),
  ('그레이트 소드', 'blood', 'B', 'D', '-', '-', 'D'),
  ('그레이트 소드', 'occult', 'D', 'E', '-', '-', 'B'),
  ('파수견의 대검', 'standard', 'B', 'E', '-', '-', '-'),
  ('파수견의 대검', 'heavy', 'S', '-', '-', '-', '-'),
  ('파수견의 대검', 'keen', 'D', 'A', '-', '-', '-'),
  ('파수견의 대검', 'quality', 'B', 'B', '-', '-', '-'),
  ('파수견의 대검', 'fire', 'B', 'E', '-', '-', '-'),
  ('파수견의 대검', 'flame_art', 'C', 'E', '-', 'B', '-'),
  ('파수견의 대검', 'lightning', 'E', 'B', '-', '-', '-'),
  ('파수견의 대검', 'sacred', 'C', 'E', '-', 'B', '-'),
  ('파수견의 대검', 'magic', 'D', 'E', 'B', '-', '-'),
  ('파수견의 대검', 'cold', 'A', 'E', 'C', '-', '-'),
  ('파수견의 대검', 'poison', 'A', 'E', '-', '-', 'D'),
  ('파수견의 대검', 'blood', 'A', 'E', '-', '-', 'D'),
  ('파수견의 대검', 'occult', 'D', 'E', '-', '-', 'B'),
  ('불의 기사 대검', 'standard', 'D', 'C', '-', 'D', '-'),
  ('불의 기사 대검', 'heavy', 'A', '-', '-', 'D', '-'),
  ('불의 기사 대검', 'keen', 'D', 'A', '-', 'D', '-'),
  ('불의 기사 대검', 'quality', 'B', 'B', '-', 'D', '-'),
  ('불의 기사 대검', 'fire', 'C', 'E', '-', 'E', '-'),
  ('불의 기사 대검', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('불의 기사 대검', 'lightning', 'E', 'B', '-', 'D', '-'),
  ('불의 기사 대검', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('불의 기사 대검', 'magic', 'E', 'E', 'B', 'D', '-'),
  ('불의 기사 대검', 'cold', 'D', 'C', 'B', 'D', '-'),
  ('불의 기사 대검', 'poison', 'D', 'C', '-', 'D', 'D'),
  ('불의 기사 대검', 'blood', 'D', 'C', '-', 'D', 'D'),
  ('불의 기사 대검', 'occult', 'E', 'D', '-', 'E', 'A'),
  ('트롤의 황금검', 'standard', 'C', 'D', '-', '-', '-'),
  ('트롤의 황금검', 'heavy', 'B', '-', '-', '-', '-'),
  ('트롤의 황금검', 'keen', 'E', 'B', '-', '-', '-'),
  ('트롤의 황금검', 'quality', 'B', 'B', '-', '-', '-'),
  ('트롤의 황금검', 'fire', 'C', 'E', '-', '-', '-'),
  ('트롤의 황금검', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('트롤의 황금검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('트롤의 황금검', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('트롤의 황금검', 'magic', 'E', 'E', 'C', '-', '-'),
  ('트롤의 황금검', 'cold', 'C', 'D', 'C', '-', '-'),
  ('트롤의 황금검', 'poison', 'B', 'D', '-', '-', 'D'),
  ('트롤의 황금검', 'blood', 'B', 'D', '-', '-', 'D'),
  ('트롤의 황금검', 'occult', 'D', 'E', '-', '-', 'B'),
  ('거인의 마법검', 'standard', 'C', 'C', 'D', '-', '-'),
  ('문리델의 기사검', 'standard', 'C', 'C', 'D', '-', '-'),
  ('왕가의 그레이트 소드', 'standard', 'C', 'D', 'C', '-', '-'),
  ('검 잇기의 대검', 'standard', 'B', 'D', '-', '-', '-'),
  ('유적의 대검', 'standard', 'S', '-', 'D', '-', '-'),
  ('옛 운철 대검', 'standard', 'B', 'E', '-', '-', 'D'),
  ('별 부수는 대검', 'standard', 'B', 'D', 'D', '-', '-'),
  ('라단의 대검(왕)', 'standard', 'C', 'C', 'D', '-', '-'),
  ('라단의 대검(빛)', 'standard', 'C', 'C', 'D', '-', '-'),
  ('신 사냥의 검', 'standard', 'D', 'B', '-', 'C', '-'),
  ('말리케스의 흑검', 'standard', 'B', 'D', '-', 'B', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '특대검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
