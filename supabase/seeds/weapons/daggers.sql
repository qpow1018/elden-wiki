-- 2026-11-03 사용자 제공 나무위키 단검 18종 자료.
-- 공격력·가드·보정: 최대 강화 기준. 상태 이상: 미강화 기본 수치.
-- 게임 CSV(PC Regulation 1.17.3)로 수치를 대조하고 패리 소비 FP는 0으로 기록합니다.
-- 표에 수면·발광이 없으면 사용자 기준에 따라 0으로 저장합니다.
-- 출처·해석·미확인 범위는 docs/DATA_SOURCES.md의 단검 등록 자료를 참고합니다.
-- 기존 행은 갱신하지 않습니다. 이름은 이번 등록 자료 조회에만 사용합니다.

-- 이름이 식별자로 보장되지 않으므로 모호한 기존 데이터에서는 중단합니다.
do $$
begin
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '단검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills
    group by name having count(*) > 1
  ) then
    raise exception '단검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
  if not exists (
    select 1 from public.game_item_categories where type = 'weapon' and name = '단검'
  ) then
    raise exception '단검 분류를 먼저 등록해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('퀵스텝', '기민함과 교란으로 싸우는 자들의 전투 기술.
재빠르게 스텝 이동한다.
타깃 고정 상태라면 돌아 들어간다.', '3'),
  ('패리', '근접 공격의 타이밍에 맞춰 사용해 공격을
피하고 적의 자세를 무너뜨리는 전투 기술.
치명적인 일격을 가할 기회가 된다.', '0'),
  ('연속 찌르기', '몸을 회전시키고, 이어서
단숨에 연속으로 찌르는 전투 기술.', '7'),
  ('휘석의 혜성', '「휘석 돌팔매」마술을 이용하는 전투 기술.
차지 공격으로 「휘석의 혜성」이 되며
강 공격으로 크게 파고드는 찌르기로 잇는다.', '10 ( - / 4 )'),
  ('레두비아의 혈인', '톱니 칼날에 묻은 마르지 않는 피를
출혈을 유발하는 칼날로 만들어 쏘는 전투 기술.
연속으로 쏠 수도 있다.', '6'),
  ('황금 칼날', '공중에 도약하여 무기에 황금 불꽃을 두르고
그것을 칼날 삼아 쏘는 전투 기술.
신성 속성 대미지를 입힌다.', '17'),
  ('죽음의 칼날', '죽음의 룬의 힘을 해방해 칼날 삼아 쏘는
전투 기술. 대미지를 입힘과 동시에 최대 HP를
감소시키며 잠시 HP를 계속 깎는다.', '25')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('대거', 10, 'base_game', '검신이 곧은 매우 짧은 단검.

공격력과 공격 범위는 부족하지만
가벼워서 재빠른 연속 공격이 가능하며
치명적인 일격의 위력도 높다.', null),
  ('패링 대거', 20, 'base_game', '독특하게 굽은 날밑을 지닌 단검.
패리를 노리는 무기.

적의 공격을 간파해 카운터를 체현한다
달인에게는 이 무기만 있으면 된다.', null),
  ('자비의 단검', 30, 'base_game', '백의의 종군 의사들이 쓰는 단검.
굳고 날카로우며 치명적인 일격에 뛰어나다.

의료는 자비이며
전장에서 자비는 편히 죽게 해 주는 것이다.
그렇기에 의사들은 두려운 살인자가 된다.', null),
  ('대형 나이프', 40, 'base_game', '폭이 넓고 굽은 칼날을 지닌 큰 나이프.

베어 가르기 위한 무기이며
출혈 상태 이상 효과가 있다.', null),
  ('피투성이 단도', 50, 'base_game', '눌어붙은 피로 더러워진 단도.
출혈 상태 이상 효과가 있다.

집요하게 베고 찔러온 칼날은
더러워져도 오히려 더 날카롭고 굳다.', null),
  ('황동 단도', 60, 'base_game', '황동 칼날에 풀무늬가 조각된 단도.
황금 나무의 왕족이 평소 지니는 호신구.

질이 좋지만 다루기 어려우며
신앙으로도 공격력이 높아진다.', null),
  ('불의 기사 단검', 70, 'shadow_of_the_erdtree', '불의 기사들이 사용하는 단검.
가는 검신은 불을 본떠 파도친다.

미리 화염의 기도를 담았으며
어떠한 방법으로 화염 공격력을 부여할 시
상승 효과로 크게 위력이 높아진다.', '화염 공격력을 부여하면 상승 효과로 위력이 높아진다.'),
  ('협차', 80, 'base_game', '담금질되어 무늬가 생긴 칼날을 지닌 단검.
갈대의 땅 무사들이 쓰는 독특한 무기.
출혈 상태 이상 효과가 있다.

오른손에 도, 왼손에 협차를 드는
이도류로도 알려져 있다.
「노인」 이라 불리는 한 수라가 쓰는 검이다.', null),
  ('맹고슈', 90, 'shadow_of_the_erdtree', '대형 주먹보호대가 붙은 단검.

왼손으로 쓰는 것을 상정한 무기이며
오른손에 자검, 또는 같은 무기를 장비했을 때
독특한 이도류를 사용할 수 있다.', null),
  ('축제의 손낫', 100, 'base_game', '색색의 천과 꽃으로 장식된 손낫.
도미눌라의 축제에 사용되는 무희들의 제구.
그 공격은 가드의 틈을 파고든다.

인간의 뼈로 만들어졌으며
공격 명중 시 매우 소량의 룬을 얻는다.', '공격이 가드의 틈을 파고들며, 공격 명중 시 룬을 10 얻는다.'),
  ('상아 손낫', 110, 'base_game', '상아를 가공해 만든 손낫.
늙은 백금의 사람들의 무기.

그것은 본 적 없는 성수를
섬긴다는 증표라고 한다.', null),
  ('결정 나이프', 120, 'base_game', '단단한 결정을 거칠게 간 나이프.
휘석 광부들이 사용하는 무기.

부순 바위에서 휘석을 깎아내는 도구이며
미약하지만 마력을 띠고 있다.', null),
  ('전갈의 침', 130, 'base_game', '큰 전갈의 침을 칼날 삼은 단검.
붉은 부패의 독이 흐른다.

봉인된 외부의 신의 유물을 사용한
이교도의 제구라고 한다.', null),
  ('친퀘디아', 140, 'base_game', '파름 아즈라에서
고위 사제에게 주어지는 단검.
짐승의 기도의 위력을 높인다.

과거에 짐승들에게 주어진 지성의
상징인 다섯 발가락을 본떴다.', '짐승 기도의 위력을 10% 높인다.'),
  ('휘석 크리스', 150, 'base_game', '과거에 레아 루카리아 학원이
로데일과의 화목을 축하한 보검.

희소한 휘석을 황금 나무 풍으로 장식했으며
흰 칼날은 옛 의식의 상징이기도 하다.', null),
  ('레두비아', 160, 'base_game', '뒤틀린 톱니 칼날을 지닌 이형의 단도.
피의 군주를 섬기는 귀족들의 무기.

그 칼날은 상처를 헤집어 출혈을 유발하며
그것을 자랑하듯 늘 피에 젖어 있다.', null),
  ('사명의 칼날', 170, 'base_game', '사명으로 여행하는 자에게 주어진 단검.
이 한 자루에는 옛 주인인
불씨의 소녀의 힘이 남아있다.

불꽃과 함께 걷는 자여.
언젠가 운명의 죽음을 보리라', null),
  ('검은 칼날', 180, 'base_game', '과거, 검은 칼날의 음모가 있던 밤에
황금의 고드윈을 죽인 자객들의 단도.

그 기묘하게 뒤틀린 칼날에는 의식으로
훔쳐진 죽음의 룬의 힘을 품었다.', null)
)
insert into public.game_items (
  name, type, category_id, sort_order, content_code, game_description, effect_description
)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '단검'
where not exists (
  select 1 from public.game_items i
  where i.type = 'weapon' and i.category_id = c.id and i.name = s.name
);

with source (name, skill_name, type, weight, physical_attack_types, upgrade_material, attack_physical, guard_physical, attack_magic, guard_magic, attack_fire, guard_fire, attack_lightning, guard_lightning, attack_holy, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, can_change_affinity, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('대거', '퀵스텝', 'weapon', 1.5, array['slash', 'pierce']::text[], 'smithing_stone', 181, 35.0, 0, 20.0, 0, 20.0, 0, 20.0, 0, 20.0, 130, 18, 0, 0, 0, 0, 0, 0, true, 5, 9, 0, 0, 0),
  ('패링 대거', '패리', 'weapon', 1.5, array['slash', 'pierce']::text[], 'smithing_stone', 183, 35.0, 0, 20.0, 0, 20.0, 0, 20.0, 0, 20.0, 110, 18, 0, 0, 0, 0, 0, 0, true, 5, 14, 0, 0, 0),
  ('자비의 단검', '퀵스텝', 'weapon', 2.0, array['slash', 'pierce']::text[], 'smithing_stone', 225, 36.0, 0, 21.0, 0, 21.0, 0, 21.0, 0, 21.0, 140, 18, 0, 0, 0, 0, 0, 0, true, 7, 12, 0, 0, 0),
  ('대형 나이프', '퀵스텝', 'weapon', 1.5, array['slash', 'pierce']::text[], 'smithing_stone', 183, 35.0, 0, 20.0, 0, 20.0, 0, 20.0, 0, 20.0, 110, 18, 0, 0, 38, 0, 0, 0, true, 6, 12, 0, 0, 0),
  ('피투성이 단도', '퀵스텝', 'weapon', 2.0, array['slash', 'pierce']::text[], 'smithing_stone', 198, 36.0, 0, 21.0, 0, 21.0, 0, 21.0, 0, 21.0, 110, 18, 0, 0, 38, 0, 0, 0, true, 9, 12, 0, 0, 0),
  ('황동 단도', '퀵스텝', 'weapon', 2.0, array['slash', 'pierce']::text[], 'smithing_stone', 164, 36.0, 0, 21.0, 0, 21.0, 0, 21.0, 0, 21.0, 110, 18, 0, 0, 0, 0, 0, 0, true, 7, 12, 0, 14, 0),
  ('불의 기사 단검', '퀵스텝', 'weapon', 2.0, array['slash', 'pierce']::text[], 'smithing_stone', 183, 32.0, 0, 18.0, 53, 31.0, 0, 18.0, 0, 18.0, 110, 18, 0, 0, 0, 0, 0, 0, true, 8, 13, 0, 12, 0),
  ('협차', '퀵스텝', 'weapon', 3.0, array['slash', 'pierce']::text[], 'smithing_stone', 230, 42.0, 0, 24.0, 0, 24.0, 0, 24.0, 0, 24.0, 100, 21, 0, 0, 38, 0, 0, 0, true, 9, 13, 0, 0, 0),
  ('맹고슈', '패리', 'weapon', 2.0, array['slash', 'pierce']::text[], 'smithing_stone', 193, 38.0, 0, 22.0, 0, 22.0, 0, 22.0, 0, 22.0, 110, 19, 0, 0, 0, 0, 0, 0, true, 7, 15, 0, 0, 0),
  ('축제의 손낫', '퀵스텝', 'weapon', 1.5, array['slash', 'pierce']::text[], 'smithing_stone', 193, 35.0, 0, 20.0, 0, 20.0, 0, 20.0, 0, 20.0, 100, 18, 0, 0, 0, 0, 0, 0, true, 6, 11, 0, 0, 0),
  ('상아 손낫', '퀵스텝', 'weapon', 2.0, array['slash', 'pierce']::text[], 'smithing_stone', 147, 26.0, 147, 42.0, 0, 15.0, 0, 15.0, 0, 15.0, 100, 18, 0, 0, 0, 0, 0, 0, false, 6, 11, 13, 0, 0),
  ('결정 나이프', '퀵스텝', 'weapon', 2.0, array['slash', 'pierce']::text[], 'smithing_stone', 200, 32.0, 129, 31.0, 0, 18.0, 0, 18.0, 0, 18.0, 100, 18, 0, 0, 0, 0, 0, 0, false, 8, 12, 9, 0, 0),
  ('전갈의 침', '연속 찌르기', 'weapon', 2.5, array['slash', 'pierce']::text[], 'somber_smithing_stone', 193, 38.0, 0, 22.0, 0, 22.0, 0, 22.0, 0, 22.0, 110, 17, 50, 0, 0, 0, 0, 0, false, 6, 12, 0, 0, 0),
  ('친퀘디아', '퀵스텝', 'weapon', 3.5, array['slash', 'pierce']::text[], 'somber_smithing_stone', 240, 43.0, 0, 25.0, 0, 25.0, 0, 25.0, 0, 25.0, 100, 19, 0, 0, 0, 0, 0, 0, false, 10, 10, 0, 0, 0),
  ('휘석 크리스', '휘석의 혜성', 'weapon', 1.5, array['slash', 'pierce']::text[], 'somber_smithing_stone', 139, 23.0, 166, 45.0, 0, 14.0, 0, 14.0, 0, 14.0, 110, 16, 0, 0, 0, 0, 0, 0, false, 5, 12, 16, 0, 0),
  ('레두비아', '레두비아의 혈인', 'weapon', 2.5, array['slash', 'pierce']::text[], 'somber_smithing_stone', 193, 38.0, 0, 22.0, 0, 22.0, 0, 22.0, 0, 22.0, 110, 17, 0, 0, 50, 0, 0, 0, false, 5, 13, 0, 0, 13),
  ('사명의 칼날', '황금 칼날', 'weapon', 1.5, array['slash', 'pierce']::text[], 'somber_smithing_stone', 173, 31.0, 0, 18.0, 0, 18.0, 0, 18.0, 105, 30.0, 110, 16, 0, 0, 0, 0, 0, 0, false, 6, 13, 0, 15, 0),
  ('검은 칼날', '죽음의 칼날', 'weapon', 2.0, array['slash', 'pierce']::text[], 'somber_smithing_stone', 161, 26.0, 0, 15.0, 0, 15.0, 0, 15.0, 159, 42.0, 110, 16, 0, 0, 0, 0, 0, 0, false, 8, 12, 0, 18, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, attack_physical, guard_physical, attack_magic, guard_magic, attack_fire, guard_fire, attack_lightning, guard_lightning, attack_holy, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, can_change_affinity, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, s.type::public.game_item_type, s.weight, s.physical_attack_types, s.upgrade_material, s.attack_physical, s.guard_physical, s.attack_magic, s.guard_magic, s.attack_fire, s.guard_fire, s.attack_lightning, s.guard_lightning, s.attack_holy, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep::integer, s.madness::integer, s.can_change_affinity, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane

from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '단검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('대거', 'standard', 'D', 'B', '-', '-', '-'),
  ('대거', 'heavy', 'A', '-', '-', '-', '-'),
  ('대거', 'keen', 'D', 'S', '-', '-', '-'),
  ('대거', 'quality', 'B', 'B', '-', '-', '-'),
  ('대거', 'fire', 'B', 'E', '-', '-', '-'),
  ('대거', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('대거', 'lightning', 'E', 'B', '-', '-', '-'),
  ('대거', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('대거', 'magic', 'E', 'E', 'B', '-', '-'),
  ('대거', 'cold', 'D', 'B', 'B', '-', '-'),
  ('대거', 'poison', 'C', 'B', '-', '-', 'D'),
  ('대거', 'blood', 'C', 'B', '-', '-', 'D'),
  ('대거', 'occult', 'E', 'D', '-', '-', 'A'),
  ('패링 대거', 'standard', 'E', 'B', '-', '-', '-'),
  ('패링 대거', 'heavy', 'A', '-', '-', '-', '-'),
  ('패링 대거', 'keen', 'E', 'S', '-', '-', '-'),
  ('패링 대거', 'quality', 'B', 'B', '-', '-', '-'),
  ('패링 대거', 'fire', 'B', 'E', '-', '-', '-'),
  ('패링 대거', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('패링 대거', 'lightning', 'E', 'B', '-', '-', '-'),
  ('패링 대거', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('패링 대거', 'magic', 'E', 'D', 'B', '-', '-'),
  ('패링 대거', 'cold', 'D', 'B', 'C', '-', '-'),
  ('패링 대거', 'poison', 'D', 'B', '-', '-', 'D'),
  ('패링 대거', 'blood', 'D', 'B', '-', '-', 'D'),
  ('패링 대거', 'occult', 'E', 'D', '-', '-', 'A'),
  ('자비의 단검', 'standard', 'E', 'C', '-', '-', '-'),
  ('자비의 단검', 'heavy', 'B', '-', '-', '-', '-'),
  ('자비의 단검', 'keen', 'E', 'B', '-', '-', '-'),
  ('자비의 단검', 'quality', 'C', 'C', '-', '-', '-'),
  ('자비의 단검', 'fire', 'C', 'E', '-', '-', '-'),
  ('자비의 단검', 'flame_art', 'E', 'D', '-', 'D', '-'),
  ('자비의 단검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('자비의 단검', 'sacred', 'E', 'D', '-', 'D', '-'),
  ('자비의 단검', 'magic', 'E', 'E', 'C', '-', '-'),
  ('자비의 단검', 'cold', 'E', 'C', 'D', '-', '-'),
  ('자비의 단검', 'poison', 'D', 'C', '-', '-', 'D'),
  ('자비의 단검', 'blood', 'D', 'C', '-', '-', 'D'),
  ('자비의 단검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('대형 나이프', 'standard', 'E', 'B', '-', '-', '-'),
  ('대형 나이프', 'heavy', 'A', '-', '-', '-', '-'),
  ('대형 나이프', 'keen', 'E', 'S', '-', '-', '-'),
  ('대형 나이프', 'quality', 'B', 'B', '-', '-', '-'),
  ('대형 나이프', 'fire', 'B', 'E', '-', '-', '-'),
  ('대형 나이프', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('대형 나이프', 'lightning', 'E', 'B', '-', '-', '-'),
  ('대형 나이프', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('대형 나이프', 'magic', 'E', 'D', 'B', '-', '-'),
  ('대형 나이프', 'cold', 'E', 'B', 'C', '-', '-'),
  ('대형 나이프', 'poison', 'E', 'A', '-', '-', 'D'),
  ('대형 나이프', 'blood', 'E', 'A', '-', '-', 'D'),
  ('대형 나이프', 'occult', 'E', 'D', '-', '-', 'A'),
  ('피투성이 단도', 'standard', 'B', 'D', '-', '-', '-'),
  ('피투성이 단도', 'heavy', 'A', '-', '-', '-', '-'),
  ('피투성이 단도', 'keen', 'E', 'B', '-', '-', '-'),
  ('피투성이 단도', 'quality', 'B', 'B', '-', '-', '-'),
  ('피투성이 단도', 'fire', 'B', 'E', '-', '-', '-'),
  ('피투성이 단도', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('피투성이 단도', 'lightning', 'E', 'B', '-', '-', '-'),
  ('피투성이 단도', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('피투성이 단도', 'magic', 'D', 'E', 'B', '-', '-'),
  ('피투성이 단도', 'cold', 'B', 'D', 'C', '-', '-'),
  ('피투성이 단도', 'poison', 'B', 'D', '-', '-', 'D'),
  ('피투성이 단도', 'blood', 'B', 'D', '-', '-', 'D'),
  ('피투성이 단도', 'occult', 'D', 'E', '-', '-', 'B'),
  ('황동 단도', 'standard', 'D', 'D', '-', 'D', '-'),
  ('황동 단도', 'heavy', 'A', '-', '-', 'D', '-'),
  ('황동 단도', 'keen', 'E', 'A', '-', 'D', '-'),
  ('황동 단도', 'quality', 'B', 'B', '-', 'D', '-'),
  ('황동 단도', 'fire', 'C', 'E', '-', 'D', '-'),
  ('황동 단도', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('황동 단도', 'lightning', 'E', 'C', '-', 'D', '-'),
  ('황동 단도', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('황동 단도', 'magic', 'E', 'E', 'B', 'D', '-'),
  ('황동 단도', 'cold', 'D', 'D', 'B', 'D', '-'),
  ('황동 단도', 'poison', 'D', 'D', '-', 'D', 'D'),
  ('황동 단도', 'blood', 'D', 'D', '-', 'D', 'D'),
  ('황동 단도', 'occult', 'E', 'E', '-', 'D', 'A'),
  ('불의 기사 단검', 'standard', 'D', 'C', '-', 'D', '-'),
  ('불의 기사 단검', 'heavy', 'A', '-', '-', 'D', '-'),
  ('불의 기사 단검', 'keen', 'D', 'A', '-', 'D', '-'),
  ('불의 기사 단검', 'quality', 'B', 'B', '-', 'D', '-'),
  ('불의 기사 단검', 'fire', 'C', 'D', '-', 'D', '-'),
  ('불의 기사 단검', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('불의 기사 단검', 'lightning', 'D', 'B', '-', 'D', '-'),
  ('불의 기사 단검', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('불의 기사 단검', 'magic', 'E', 'E', 'A', 'D', '-'),
  ('불의 기사 단검', 'cold', 'D', 'C', 'B', 'D', '-'),
  ('불의 기사 단검', 'poison', 'D', 'B', '-', 'D', 'D'),
  ('불의 기사 단검', 'blood', 'D', 'B', '-', 'D', 'D'),
  ('불의 기사 단검', 'occult', 'E', 'D', '-', 'E', 'A'),
  ('협차', 'standard', 'D', 'C', '-', '-', '-'),
  ('협차', 'heavy', 'B', '-', '-', '-', '-'),
  ('협차', 'keen', 'E', 'B', '-', '-', '-'),
  ('협차', 'quality', 'B', 'B', '-', '-', '-'),
  ('협차', 'fire', 'C', 'E', '-', '-', '-'),
  ('협차', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('협차', 'lightning', 'E', 'C', '-', '-', '-'),
  ('협차', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('협차', 'magic', 'E', 'E', 'B', '-', '-'),
  ('협차', 'cold', 'D', 'C', 'C', '-', '-'),
  ('협차', 'poison', 'C', 'C', '-', '-', 'D'),
  ('협차', 'blood', 'C', 'C', '-', '-', 'D'),
  ('협차', 'occult', 'E', 'D', '-', '-', 'B'),
  ('맹고슈', 'standard', 'D', 'B', '-', '-', '-'),
  ('맹고슈', 'heavy', 'B', '-', '-', '-', '-'),
  ('맹고슈', 'keen', 'E', 'A', '-', '-', '-'),
  ('맹고슈', 'quality', 'B', 'B', '-', '-', '-'),
  ('맹고슈', 'fire', 'C', 'E', '-', '-', '-'),
  ('맹고슈', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('맹고슈', 'lightning', 'E', 'C', '-', '-', '-'),
  ('맹고슈', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('맹고슈', 'magic', 'E', 'E', 'B', '-', '-'),
  ('맹고슈', 'cold', 'D', 'B', 'B', '-', '-'),
  ('맹고슈', 'poison', 'D', 'B', '-', '-', 'D'),
  ('맹고슈', 'blood', 'D', 'B', '-', '-', 'D'),
  ('맹고슈', 'occult', 'E', 'D', '-', '-', 'B'),
  ('축제의 손낫', 'standard', 'E', 'B', '-', '-', '-'),
  ('축제의 손낫', 'heavy', 'B', '-', '-', '-', '-'),
  ('축제의 손낫', 'keen', 'E', 'A', '-', '-', '-'),
  ('축제의 손낫', 'quality', 'B', 'B', '-', '-', '-'),
  ('축제의 손낫', 'fire', 'C', 'E', '-', '-', '-'),
  ('축제의 손낫', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('축제의 손낫', 'lightning', 'E', 'C', '-', '-', '-'),
  ('축제의 손낫', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('축제의 손낫', 'magic', 'E', 'D', 'B', '-', '-'),
  ('축제의 손낫', 'cold', 'E', 'B', 'C', '-', '-'),
  ('축제의 손낫', 'poison', 'D', 'B', '-', '-', 'D'),
  ('축제의 손낫', 'blood', 'D', 'B', '-', '-', 'D'),
  ('축제의 손낫', 'occult', 'E', 'D', '-', '-', 'B'),
  ('상아 손낫', 'standard', 'D', 'C', 'C', '-', '-'),
  ('결정 나이프', 'standard', 'C', 'D', 'B', '-', '-'),
  ('전갈의 침', 'standard', 'D', 'B', '-', '-', '-'),
  ('친퀘디아', 'standard', 'B', 'D', '-', '-', '-'),
  ('휘석 크리스', 'standard', 'E', 'C', 'C', '-', '-'),
  ('레두비아', 'standard', 'E', 'C', '-', '-', 'B'),
  ('사명의 칼날', 'standard', 'D', 'C', '-', 'B', '-'),
  ('검은 칼날', 'standard', 'E', 'B', '-', 'C', '-')
)
insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '단검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
