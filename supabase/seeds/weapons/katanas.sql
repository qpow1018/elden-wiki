-- 사용자 제공 도 10종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '도') then
    raise exception '도 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '도'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('어두운 밤의 참격','거합','2연속 베기','그라비타스','순간의 달그림자','시체더미','빙뢰검','온지의 연성','물새 난격')
    group by name, description having count(*) > 1
  ) then
    raise exception '도 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('거합', '갈대의 땅 검객에 전해지는 전투 기술. 도신을
칼집에 넣고 허리춤에서 조용히 들며 일반 공격
및 강 공격으로 고속 참격으로 잇는다.', '- ( 10 / 15 )'),
  ('2연속 베기', '탁월한 검사의 전투 기술.
낮은 자세에서 교차하는 참격을 쓴다.
추가 입력으로 2회까지 추가 공격이 가능하다.', '6 ( - / 3 )'),
  ('그라비타스', '돌 같은 피부의 백왕에서 유래한 전투 기술.
무기를 땅에 꽂고 중력파를 발생시켜
대미지를 입히면서 동시에 적을 끌어들인다.', '13'),
  ('순간의 달그림자', '도신을 칼집에 넣고 허리춤에 조용히 드는
전투 기술. 일반 공격 및 강 공격으로
고속 참격으로 이으며 각각 광파를 쏜다.', '- (15/20)'),
  ('어두운 밤의 참격', '수평으로 든 검에 밤의 어둠을 둘러
연속으로 실체가 없는 참격을 쓰는 전투 기술.
가드할 수 없으며, 차지 공격으로 강화된다.', '21 ( - / - )'),
  ('시체더미', '저주받은 피를 칼날 삼아
교차하는 참격을 하는 전투 기술.
추가 입력으로 추가 연속 공격을 한다.', '17 ( - / 9 )'),
  ('빙뢰검', '치켜든 도신에 빙뢰를 불러 내리치는 전투 기술.
칼날에 두른 빙뢰는 잠시 지속된다.', '25'),
  ('온지의 연성', '아인 검성의 이름을 따온 전투 기술.
늘어선 휘석에 마력을 담은 베기 공격.
추가 입력으로 2회까지 추가 공격이 가능하며
추가 공격을 할 때마다 강화된다.', '10 ( - / 8 )'),
  ('물새 난격', '물새처럼 한 다리로 뛰어
초고속 연속 베기를 잇는 전투 기술.
추가 입력으로 2회까지 추가 공격이 가능하다.', '12( -/ 9)')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('타도', 10, 'base_game', '도신이 길고 휜, 날카로운 외날 검.
도라고 부르는 갈대의 땅 무사들 특유의 무기.

잘 벼려진 도신에는 파도처럼 무늬가 났고
그 참격은 상대의 출혈을 유발한다.', null),
  ('긴 이빨', 20, 'base_game', '무서우리만치 긴 칼날을 지닌 도.
피 묻은 손가락 사냥꾼 유라의 무기.

그 위용은 잘 만들어진 창과 같고
찌르는 공격에서 진가를 발휘한다.', null),
  ('뱀 뼈의 도', 30, 'base_game', '뱀의 뼈를 본뜬 이형의 도.

칼날 옆면에 빼곡히 난 가시에는
치명적인 맹독이 발라져 있다.', null),
  ('운철도', 40, 'base_game', '운석에서 태어난 자들을 토벌하기 위해
운철로 벼린 도.
마력 속성 공격력을 지닌다.

칼날은 무겁고, 때려눕히는 듯한 참격이 특징.
그 모습은 별이 떨어지는 것과 닮았다.', '운석에서 태어난 자들에게 20%의 추가 대미지를 준다.'),
  ('명도 월은', 50, 'base_game', '휘석으로 단조된 도.
사리아의 도공이 만든 일품.

그 도신은 칼집 안에서 빛을 띠기에
달이 숨었다 하여 월은이라 칭한다.', null),
  ('밤의 칼날', 60, 'shadow_of_the_erdtree', '빛마저도 빨아들이는 칠흑의 도.
밤의 기사 욜란의 무기.

그 칼날은 반쯤 실체가 없으며
완전히 가드하는 것은 불가능하다.', null),
  ('시산혈하', 70, 'base_game', '갈대의 땅의 대검객 「노인」의 무기.
셀 수 없이 많은 사람을 벤 저주의 도.

노인의 검을, 광기를 직접 알았을 때
피의 군주 모그는 제안했다고 한다.
목마를 일 없는 수라의 삶을 주겠노라고.', null),
  ('용비늘도', 80, 'base_game', '고룡의 불후의 정수, 자갈 비늘을
갈아 흐림없는 칼날로 만든 무기.

용인병은 용이 될 자로 태어났으나
용이 되지는 못하고
늙은 용 닮은 존재로 스러졌다.', '비룡형 적에게 20%, 고룡형 적에게 10%의 추가 피해를 준다.'),
  ('연성검', 90, 'shadow_of_the_erdtree', '정제되지 않은 작은 휘석이
나란히 늘어선 별처럼 박힌 검.
아인 검사들의 무기.

그들은 여왕에게서 그 검을 받을 때
늘어선 별 너머에서 진실을 찾을 것을 맹세한다.', null),
  ('말레니아의 의수도', 100, 'base_game', '말레니아의 의수에 장치된 무기.
구별된 칼날은 결코 썩지 않는다.

말레니아의 의수는 즉 불패의 상징이었다.
사람들은 치켜든 의수에서 날개를 봤다고 한다.
패배를 모르는, 가열한 의지의 날개를.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '도'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('타도', '거합', 5.5, '참격 / 관통', 'smithing_stone', true, 281, 0, 0, 0, 0, 45.0, 30.0, 30.0, 30.0, 30.0, 100, 36, 0, 0, 45, 0, 0, 0, 11, 15, 0, 0, 0),
  ('긴 이빨', '거합', 7.0, '참격 / 관통', 'smithing_stone', true, 281, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 100, 39, 0, 0, 45, 0, 0, 0, 18, 22, 0, 0, 0),
  ('뱀 뼈의 도', '2연속 베기', 6.0, '참격 / 관통', 'smithing_stone', false, 294, 0, 0, 0, 0, 45.0, 30.0, 30.0, 30.0, 30.0, 100, 36, 0, 0, 0, 66, 0, 0, 11, 22, 0, 0, 0),
  ('운철도', '그라비타스', 7.5, '참격 / 관통', 'somber_smithing_stone', false, 274, 176, 0, 0, 0, 50.0, 45.0, 31.0, 31.0, 31.0, 100, 36, 0, 0, 50, 0, 0, 0, 15, 14, 18, 0, 0),
  ('명도 월은', '순간의 달그림자', 6.5, '참격 / 관통', 'somber_smithing_stone', false, 178, 213, 0, 0, 0, 31.0, 57.0, 26.0, 26.0, 26.0, 100, 34, 0, 0, 50, 0, 0, 0, 12, 18, 23, 0, 0),
  ('밤의 칼날', '어두운 밤의 참격', 6.5, '참격 / 관통', 'somber_smithing_stone', false, 269, 80, 0, 0, 0, 43.0, 35.0, 27.0, 27.0, 27.0, 100, 33, 0, 0, 45, 0, 0, 0, 11, 20, 0, 0, 0),
  ('시산혈하', '시체더미', 6.5, '참격 / 관통', 'somber_smithing_stone', false, 186, 0, 186, 0, 0, 36.0, 26.0, 52.0, 26.0, 26.0, 100, 34, 0, 0, 50, 0, 0, 0, 12, 18, 0, 0, 20),
  ('용비늘도', '빙뢰검', 5.5, '참격 / 관통', 'somber_smithing_stone', false, 269, 0, 0, 0, 0, 35.0, 25.0, 25.0, 50.0, 25.0, 100, 33, 0, 0, 0, 0, 0, 0, 12, 20, 0, 0, 0),
  ('연성검', '온지의 연성', 5, '참격 / 관통', 'somber_smithing_stone', false, 200, 200, 0, 0, 0, 34, 48, 24, 24, 24, 100, 31, 0, 0, 45, 0, 0, 0, 10, 23, 21, 0, 0),
  ('말레니아의 의수도', '물새 난격', 7.0, '참격 / 관통', 'somber_smithing_stone', false, 286, 0, 0, 0, 0, 49.0, 33.0, 33.0, 33.0, 33.0, 100, 36, 0, 0, 50, 0, 0, 0, 16, 48, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '도'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('타도', 'standard', 'D', 'C', '-', '-', '-'),
  ('타도', 'heavy', 'A', '-', '-', '-', '-'),
  ('타도', 'keen', 'E', 'A', '-', '-', '-'),
  ('타도', 'quality', 'B', 'B', '-', '-', '-'),
  ('타도', 'fire', 'C', 'E', '-', '-', '-'),
  ('타도', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('타도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('타도', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('타도', 'magic', 'E', 'E', 'B', '-', '-'),
  ('타도', 'cold', 'C', 'B', 'C', '-', '-'),
  ('타도', 'poison', 'C', 'B', '-', '-', 'D'),
  ('타도', 'blood', 'C', 'B', '-', '-', 'D'),
  ('타도', 'occult', 'E', 'D', '-', '-', 'B'),
  ('긴 이빨', 'standard', 'D', 'B', '-', '-', '-'),
  ('긴 이빨', 'heavy', 'B', '-', '-', '-', '-'),
  ('긴 이빨', 'keen', 'E', 'A', '-', '-', '-'),
  ('긴 이빨', 'quality', 'B', 'B', '-', '-', '-'),
  ('긴 이빨', 'fire', 'C', 'E', '-', '-', '-'),
  ('긴 이빨', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('긴 이빨', 'lightning', 'E', 'C', '-', '-', '-'),
  ('긴 이빨', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('긴 이빨', 'magic', 'E', 'E', 'B', '-', '-'),
  ('긴 이빨', 'cold', 'D', 'B', 'C', '-', '-'),
  ('긴 이빨', 'poison', 'D', 'B', '-', '-', 'D'),
  ('긴 이빨', 'blood', 'D', 'B', '-', '-', 'D'),
  ('긴 이빨', 'occult', 'E', 'D', '-', '-', 'B'),
  ('뱀 뼈의 도', 'standard', 'E', 'B', '-', '-', '-'),
  ('운철도', 'standard', 'C', 'D', 'C', '-', '-'),
  ('명도 월은', 'standard', 'E', 'B', 'B', '-', '-'),
  ('밤의 칼날', 'standard', '-', 'B', '-', '-', '-'),
  ('시산혈하', 'standard', 'E', 'B', '-', '-', 'D'),
  ('용비늘도', 'standard', 'D', 'B', '-', '-', '-'),
  ('연성검', 'standard', 'D', 'B', 'D', '-', '-'),
  ('말레니아의 의수도', 'standard', 'E', 'B', '-', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '도'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
