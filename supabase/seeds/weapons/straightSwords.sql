-- 사용자 제공 직검 23종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '직검') then
    raise exception '직검 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '직검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name <> '킥'
    group by name, description having count(*) > 1
  ) then
    raise exception '직검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('킥', '다리를 높이 들어 차는 기술.
가드에 유효하고 자세를 무너뜨릴 수 있다.
단순하지만 실전적인 전투 기술.', '-'),
  ('준비 자세', '검을 수평으로 들고 공격으로 잇는 전투 기술.
일반 공격은 가드를 무너뜨리는 올려 베기,
강 공격은 달려드는 찌르기로 파생한다.', '- ( 6 / 8 )'),
  ('회전 베기', '기량이 뛰어난 검사들의 전투 기술.
크게 몸을 회전시켜 적을 벤다.
또한 추가 입력으로 추가 공격도 가능하다.', '6 ( - / 12 )'),
  ('휘석 돌팔매', '동명의 휘석 마술을 사용하는 전투 기술.
강 공격으로 크게 파고드는 찌르기로 이으며
그 공격에는 휘석의 마력이 남아있다.', '8 ( - / 4 )'),
  ('그레이트 카리아', '카리아 왕가의 상징인 전투 기술.
검신을 마력 대검으로 변화시켜 내리친다.
차지 공격으로 2단계로 강화된다.', '26 ( - / - )'),
  ('신성한 칼날', '무기에 신성 속성 공격력을 부여하고
그대로 황금 칼날을 쏘는 전투 기술.
신성 속성 부여는 잠시 지속된다.', '19 ( - / - )'),
  ('황금의 검술', '두 검을 교차하고 신성 속성 공격력을
부여하는 전투 기술. 효과 중 강 공격이
두 검으로 하는 연속 공격이 된다.', '24 ( - / - )'),
  ('애도의 묘비', '묘비를 치켜들어 주변 아군을 포함해
성률의 힘을 부여하는 전투 기술.
특히 죽음에 사는 자를 잘 애도한다.', '25 ( - / - )'),
  ('잠의 안개', '전방 넓은 범위에
연보라색 안개를 만드는 전투 기술.
그 안개에는 수면 상태 이상 효과가 있다.', '20 ( - / - )'),
  ('영면의 안개', '전방 광범위에 잠의 보랏빛 안개를 만드는
전투 기술.
그 안개에는 영면 상태 이상 효과가 있다.', '23 ( - / - )'),
  ('에오히드의 검무', '검에 기를 담고 비틀며 전방에 쏘는 전투 기술.
그 검은 격렬히 회전하며 연속 대미지를 입힌다.
차지 시 비거리와 회전 지속시간이 증가한다.', '15'),
  ('막을 수 없는 검', '비문자 칼날에 빛을 품어 길이를 늘리고
단숨에 넓은 범위를 베는 전투 기술.
이 공격은 가드할 수 없다.', '18'),
  ('밤과 불꽃의 자세', '검을 수평으로 들고 마술로 잇는 전투 기술.
일반 공격은 마력을 밤의 혜성 삼아 쏘고
강 공격은 전방 광범위를 불꽃으로 쓸어버린다.', '- ( 26 / 32 )'),
  ('빛', '도신에 새겨진 빛을 해방하는 전투 기술.
검을 공중에 치켜들어 눈부신 빛을 내고
여러 개의 광선으로 주위를 쓸어버린다.
또 잠시 자신의 신성 공격력이 상승한다.', '30 ( - / - )'),
  ('어둠', '검을 공중에 치켜들어 어둠으로 주위를
쓸어버리는 전투 기술.
신성 속성 대미지를 줌과 동시에 일시적으로
신성 경감률을 저하시킨다.', '30 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and (s.name = '킥' or k.description = s.description));

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('숏 소드', 10, 'base_game', '검신이 짧은 소형 직검.
사용하기 편한 표준 속성 공격에 더해
공격력이 높은 관통 공격도 겸비했다.

직검치고는 무게가 가볍고
필요 능력치도 낮아 다루기 쉽다.', null),
  ('롱 소드', 20, 'base_game', '검신이 곧은 양날검.

사용하기 편한 표준 속성 공격에 더해
공격력이 높은 관통 공격도 겸비한
밸런스가 뛰어난 무기.', null),
  ('브로드 소드', 30, 'base_game', '날의 폭이 넓은 직검.
휘둘러 베는 공격에 적합하다.

옆으로 휘두르는 공격의 범위가 넓어
적에게 맞추기 쉬운 이점이 있다.', null),
  ('낡은 직검', 40, 'base_game', '비교적 짧은, 날의 폭이 넓은 직검.
다루기 쉬운 「시민들의 검」

황금 나무 장식을 알아볼 수는 있으나
형편없이 낡았다.', null),
  ('군주군의 직검', 50, 'base_game', '군주군 정규병들의 직검.
장식이 되어있는 질 좋은 무기.

오랜 사용에 열화되어 거무스름해졌으나
손질은 되어있는 듯하다.
병사들은 이미 제정신이 아닐 터인데.', null),
  ('귀인의 세검', 60, 'base_game', '헤매는 귀인들이 지닌 가는 검.
다루기 편함이 중시된 무기.

전체가 금으로 장식되어 있어
종종 고가에 거래된다.', null),
  ('지팡이검', 70, 'base_game', '은퇴한 노기사가
애검을 지팡이로 다시 만든 것.
끝부분이 닳았다.

허리가 굽고 팔도 올라가지 않지만
그래도 검과 함께 죽고 싶은 것이다.', null),
  ('돌칼집의 검', 80, 'shadow_of_the_erdtree', '금이 간 돌칼집에 들어간
절대 뽑을 수 없는 검.

잃어버린 옛 문명의 유산이며
빛, 혹은 어둠의 제단에 바쳐진다고 한다.', null),
  ('전쟁매의 발톱검', 90, 'base_game', '스톰빌에서 전쟁매의 다리에 다는 발톱검을
사람이 쓸 수 있게 다시 벼린 것.

매의 움직임에 방해가 되지 않게
칼날은 가늘고 얇아 가볍다.', null),
  ('라줄리의 휘석검', 100, 'base_game', '카리아의 마술을 수련하기 위해
라줄리의 교실에서 배우는 자들의 무기.
마력 속성 공격력을 지녔다.

원래는 마술 지팡이었는지
나무로 되어있다.', null),
  ('카리아의 기사검', 110, 'base_game', '검신에 파란 휘석이 박힌 직검.
카리아 왕가를 섬기던 기사들의 무기.

그 기사들은 20명도 채 되지 않았으나
검을 촉매 삼은 마술 전투 기술로
황금의 영웅들과 어깨를 나란히 했다고 한다.', null),
  ('결정검', 120, 'base_game', '인간은 만들 수 없는 순결정 검.
마력을 띠며, 지력으로 공격력이 높아진다.

수수께끼 많은 결정인은 영원히 결정을 지킨다.
일설로는 언젠가 창조주가 돌아왔을 때
새로운 동족이 깎여 나오기를 기원한다고 한다.', null),
  ('부패한 결정검', 130, 'base_game', '인간은 만들 수 없는 순결정 검이
붉은 부패에 잠식된 것.

마력을 띠며, 지력으로 공격력이 높아진다.', null),
  ('미켈라의 기사검', 140, 'base_game', '성수의 미켈라를 섬기는 자들이
카리아의 기사검을 본떠 만든 무기.
휘석 대신 성수의 호박이 박혀있다.

한 번도 기사에게 수여된 적 없는
호사스럽지만 주인 없는 불우한 검.', null),
  ('의장 직검', 150, 'base_game', '옛 의장을 본뜬 얇은 직검.
탁월한 검사는 이것을 두 칼로 사용한다.

황금 일족의 후예들은
몰락한 후 옛것에서 힘과 인연을 구했다.', null),
  ('황금 묘비', 160, 'base_game', '처음으로 죽은 데미갓인
황금의 고드윈을 추모하는 묘비검.

소년의 조용한 기도가 담겨있다.
형님, 형님, 올바르게 죽어주세요.', '언데드의 부활을 막는다.'),
  ('트리나의 검', 170, 'base_game', '성녀 트리나의 사제가 사용하는 흰 검.
수면 상태 이상 효과가 있다.

트리나는 수수께끼에 싸였다.
덧없는 소녀라고도 하고 소년이라고도 하며
홀연히 나타났다 홀연히 사라진다고 한다.', null),
  ('트리나의 보랏빛 검', 180, 'shadow_of_the_erdtree', '깊은 보라색으로 물든 성녀의 흰 검.
영면 상태 이상 효과가 있다.

옅은 보랏빛의 엷고 덧없는 아지랑이는
트리나에게 버림받았을 때
농밀한 독으로 숙성되었다.', null),
  ('에오히드의 보검', 190, 'base_game', '멸망한 소국 에오히드의 보검.
그 적금은 결코 썩지 않으며
사용자의 기를 품어 자유자재로 움직인다.

에오히드의 검은 하늘에서 춤춘다.', null),
  ('비문자 검', 200, 'base_game', '두 손가락이 원탁의 빛바랜 자에게 보냈던 비검.
칼날은 실체 없는 비문자의 나열이고 신성 속성
공격력을 지녔으며 방패에 튕기지 않는다.

먼 옛날 원탁에는 영웅들이 모였으며
두 손가락은 강하고 달변가었다.', null),
  ('밤과 불꽃의 검', 210, 'base_game', '카리아의 성관에 숨겨진 보검.
「전설의 무기」 중 하나.

마술사의 전신인 점술사의 시초는
하늘에 가까운 까마득히 높은 산령이며
불의 거인이 그 이웃이었다고 한다.', null),
  ('라이트 소드', 220, 'shadow_of_the_erdtree', '제단에 바쳐 돌칼집을 제거한 빛의 검.

유기의 뿌리에서 생긴 몇 줄기의 빛이
왜곡되지 않고 교차해, 반사하면서
은빛 도신의 형태를 만든다.', null),
  ('다크 소드', 230, 'shadow_of_the_erdtree', '제단에 바쳐 돌칼집을 제거한 어둠의 검.

유기의 뿌리에서 생긴 몇 줄기의 흔들림이
왜곡되며 집산, 때로는 소용돌이치며
어두운 도신의 형태를 만든다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '직검'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('숏 소드', '킥', 3.0, '표준 / 관통', 'smithing_stone', true, 249, 0, 0, 0, 0, 42.0, 28.0, 28.0, 28.0, 28.0, 100, 33, 0, 0, 0, 0, 0, 0, 8, 10, 0, 0, 0),
  ('롱 소드', '준비 자세', 3.5, '표준 / 관통', 'smithing_stone', true, 269, 0, 0, 0, 0, 45.0, 30.0, 30.0, 30.0, 30.0, 100, 36, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0),
  ('브로드 소드', '준비 자세', 4.0, '표준 / 관통', 'smithing_stone', true, 286, 0, 0, 0, 0, 47.0, 31.0, 31.0, 31.0, 31.0, 100, 37, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0),
  ('낡은 직검', '준비 자세', 3.0, '표준 / 관통', 'smithing_stone', true, 252, 0, 0, 0, 0, 43.0, 29.0, 29.0, 29.0, 29.0, 100, 32.000000, 0, 0, 0, 0, 0, 0, 7, 10, 0, 0, 0),
  ('군주군의 직검', '준비 자세', 3.5, '표준 / 관통', 'smithing_stone', true, 281, 0, 0, 0, 0, 45.0, 30.0, 30.0, 30.0, 30.0, 110, 36, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0),
  ('귀인의 세검', '준비 자세', 3.5, '표준 / 관통', 'smithing_stone', true, 247, 0, 0, 0, 0, 43.0, 29.0, 29.0, 29.0, 29.0, 110, 36.000000, 0, 0, 0, 0, 0, 0, 8, 11, 0, 0, 0),
  ('지팡이검', '준비 자세', 2.5, '표준 / 관통', 'smithing_stone', true, 235, 0, 0, 0, 0, 41.0, 27.0, 27.0, 27.0, 27.0, 100, 32, 0, 0, 0, 0, 0, 0, 8, 11, 0, 0, 0),
  ('돌칼집의 검', '준비 자세', 5.0, '타격', 'somber_smithing_stone', false, 218, 0, 0, 0, 0, 58.0, 33.0, 33.0, 33.0, 33.0, 100, 49, 0, 0, 0, 0, 0, 0, 16, 8, 0, 0, 0),
  ('전쟁매의 발톱검', '회전 베기', 3.0, '표준 / 관통', 'smithing_stone', true, 247, 0, 0, 0, 0, 42.0, 28.0, 28.0, 28.0, 28.0, 100, 36.000000, 0, 0, 0, 0, 0, 0, 10, 16, 0, 0, 0),
  ('라줄리의 휘석검', '휘석 돌팔매', 3.5, '표준 / 관통', 'somber_smithing_stone', false, 193, 230, 0, 0, 0, 30.0, 55.0, 25.0, 25.0, 25.0, 100, 33.000000, 0, 0, 0, 0, 0, 0, 8, 9, 13, 0, 0),
  ('카리아의 기사검', '그레이트 카리아', 4.0, '표준 / 관통', 'somber_smithing_stone', false, 215, 215, 0, 0, 0, 36.0, 52.0, 26.0, 26.0, 26.0, 100, 34.000000, 0, 0, 0, 0, 0, 0, 10, 10, 18, 0, 0),
  ('결정검', '회전 베기', 4.5, '표준 / 관통', 'somber_smithing_stone', false, 259, 166, 0, 0, 0, 44.0, 44.0, 30.0, 30.0, 30.0, 100, 36.000000, 0, 0, 0, 0, 0, 0, 13, 10, 15, 0, 0),
  ('부패한 결정검', '회전 베기', 4.5, '표준 / 관통', 'somber_smithing_stone', false, 249, 161, 0, 0, 0, 48.0, 38.0, 31.0, 31.0, 31.0, 100, 36.000000, 50, 0, 0, 0, 0, 0, 13, 10, 15, 0, 0),
  ('미켈라의 기사검', '신성한 칼날', 3.5, '표준 / 관통', 'somber_smithing_stone', false, 257, 0, 0, 0, 166, 40.0, 28.0, 28.0, 28.0, 40.0, 100, 33.000000, 0, 0, 0, 0, 0, 0, 11, 11, 0, 16, 0),
  ('의장 직검', '황금의 검술', 3.0, '표준 / 관통', 'somber_smithing_stone', false, 247, 0, 0, 0, 0, 42.0, 28.0, 28.0, 28.0, 28.0, 110, 30.000000, 0, 0, 0, 0, 0, 0, 10, 14, 0, 0, 0),
  ('황금 묘비', '애도의 묘비', 3.5, '표준 / 관통', 'somber_smithing_stone', false, 208, 0, 0, 0, 208, 25.0, 15.0, 15.0, 15.0, 40.0, 100, 33.000000, 0, 0, 0, 0, 0, 0, 12, 10, 0, 14, 0),
  ('트리나의 검', '잠의 안개', 3.0, '표준 / 관통', 'somber_smithing_stone', false, 262, 78, 0, 0, 0, 39.0, 33.0, 27.0, 27.0, 27.0, 100, 30.000000, 0, 0, 0, 0, 66, 0, 10, 12, 14, 0, 0),
  ('트리나의 보랏빛 검', '영면의 안개', 2.5, '표준 / 관통', 'somber_smithing_stone', false, 232, 149, 0, 0, 0, 37.0, 37.0, 25.0, 25.0, 25.0, 110, 29, 0, 0, 0, 0, 42, 0, 10, 12, 14, 0, 0),
  ('에오히드의 보검', '에오히드의 검무', 5.5, '표준 / 관통', 'somber_smithing_stone', false, 218, 139, 0, 0, 0, 48.0, 40.0, 31.0, 31.0, 31.0, 100, 36.000000, 0, 0, 0, 0, 0, 0, 12, 18, 0, 0, 15),
  ('비문자 검', '막을 수 없는 검', 2.5, '표준 / 관통', 'somber_smithing_stone', false, 0, 0, 0, 0, 208, 13.0, 22.0, 22.0, 22.0, 58.0, 100, 29.000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0),
  ('밤과 불꽃의 검', '밤과 불꽃의 자세', 4.0, '표준 / 관통', 'somber_smithing_stone', false, 213, 137, 137, 0, 0, 36.0, 42.0, 42.0, 26.0, 26.0, 100, 34.000000, 0, 0, 0, 0, 0, 0, 12, 12, 24, 24, 0),
  ('라이트 소드', '빛', 4.0, '표준 / 관통', 'somber_smithing_stone', false, 227, 0, 0, 0, 227, 26.0, 15.0, 15.0, 15.0, 42.0, 100, 34, 0, 0, 0, 0, 0, 0, 14, 11, 0, 24, 0),
  ('다크 소드', '어둠', 4.0, '표준 / 관통', 'somber_smithing_stone', false, 227, 0, 0, 0, 227, 26.0, 15.0, 15.0, 15.0, 42.0, 100, 34, 0, 0, 0, 0, 0, 0, 14, 11, 0, 24, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '직검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
  and (s.skill_name <> '회전 베기' or k.fp_cost_text = '6 ( - / 12 )')
  and (s.skill_name <> '막을 수 없는 검' or k.description = '비문자 칼날에 빛을 품어 길이를 늘리고
단숨에 넓은 범위를 베는 전투 기술.
이 공격은 가드할 수 없다.')
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('숏 소드', 'standard', 'D', 'C', '-', '-', '-'),
  ('숏 소드', 'heavy', 'B', '-', '-', '-', '-'),
  ('숏 소드', 'keen', 'E', 'A', '-', '-', '-'),
  ('숏 소드', 'quality', 'B', 'B', '-', '-', '-'),
  ('숏 소드', 'fire', 'C', 'E', '-', '-', '-'),
  ('숏 소드', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('숏 소드', 'lightning', 'E', 'C', '-', '-', '-'),
  ('숏 소드', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('숏 소드', 'magic', 'E', 'E', 'B', '-', '-'),
  ('숏 소드', 'cold', 'C', 'C', 'C', '-', '-'),
  ('숏 소드', 'poison', 'C', 'C', '-', '-', 'D'),
  ('숏 소드', 'blood', 'C', 'C', '-', '-', 'D'),
  ('숏 소드', 'occult', 'E', 'D', '-', '-', 'B'),
  ('롱 소드', 'standard', 'C', 'D', '-', '-', '-'),
  ('롱 소드', 'heavy', 'B', '-', '-', '-', '-'),
  ('롱 소드', 'keen', 'E', 'B', '-', '-', '-'),
  ('롱 소드', 'quality', 'B', 'B', '-', '-', '-'),
  ('롱 소드', 'fire', 'C', 'E', '-', '-', '-'),
  ('롱 소드', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('롱 소드', 'lightning', 'E', 'C', '-', '-', '-'),
  ('롱 소드', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('롱 소드', 'magic', 'E', 'E', 'B', '-', '-'),
  ('롱 소드', 'cold', 'C', 'D', 'C', '-', '-'),
  ('롱 소드', 'poison', 'C', 'D', '-', '-', 'D'),
  ('롱 소드', 'blood', 'C', 'D', '-', '-', 'D'),
  ('롱 소드', 'occult', 'D', 'E', '-', '-', 'B'),
  ('브로드 소드', 'standard', 'C', 'D', '-', '-', '-'),
  ('브로드 소드', 'heavy', 'A', '-', '-', '-', '-'),
  ('브로드 소드', 'keen', 'E', 'B', '-', '-', '-'),
  ('브로드 소드', 'quality', 'B', 'B', '-', '-', '-'),
  ('브로드 소드', 'fire', 'C', 'E', '-', '-', '-'),
  ('브로드 소드', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('브로드 소드', 'lightning', 'E', 'C', '-', '-', '-'),
  ('브로드 소드', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('브로드 소드', 'magic', 'E', 'E', 'C', '-', '-'),
  ('브로드 소드', 'cold', 'B', 'D', 'C', '-', '-'),
  ('브로드 소드', 'poison', 'B', 'D', '-', '-', 'D'),
  ('브로드 소드', 'blood', 'B', 'D', '-', '-', 'D'),
  ('브로드 소드', 'occult', 'D', 'E', '-', '-', 'B'),
  ('낡은 직검', 'standard', 'D', 'C', '-', '-', '-'),
  ('낡은 직검', 'heavy', 'B', '-', '-', '-', '-'),
  ('낡은 직검', 'keen', 'E', 'B', '-', '-', '-'),
  ('낡은 직검', 'quality', 'B', 'B', '-', '-', '-'),
  ('낡은 직검', 'fire', 'C', 'E', '-', '-', '-'),
  ('낡은 직검', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('낡은 직검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('낡은 직검', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('낡은 직검', 'magic', 'E', 'E', 'C', '-', '-'),
  ('낡은 직검', 'cold', 'D', 'C', 'C', '-', '-'),
  ('낡은 직검', 'poison', 'C', 'C', '-', '-', 'D'),
  ('낡은 직검', 'blood', 'C', 'C', '-', '-', 'D'),
  ('낡은 직검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('군주군의 직검', 'standard', 'D', 'D', '-', '-', '-'),
  ('군주군의 직검', 'heavy', 'B', '-', '-', '-', '-'),
  ('군주군의 직검', 'keen', 'E', 'B', '-', '-', '-'),
  ('군주군의 직검', 'quality', 'B', 'B', '-', '-', '-'),
  ('군주군의 직검', 'fire', 'C', 'E', '-', '-', '-'),
  ('군주군의 직검', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('군주군의 직검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('군주군의 직검', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('군주군의 직검', 'magic', 'E', 'E', 'C', '-', '-'),
  ('군주군의 직검', 'cold', 'C', 'C', 'C', '-', '-'),
  ('군주군의 직검', 'poison', 'C', 'C', '-', '-', 'D'),
  ('군주군의 직검', 'blood', 'C', 'C', '-', '-', 'D'),
  ('군주군의 직검', 'occult', 'E', 'E', '-', '-', 'B'),
  ('귀인의 세검', 'standard', 'E', 'B', '-', '-', '-'),
  ('귀인의 세검', 'heavy', 'A', '-', '-', '-', '-'),
  ('귀인의 세검', 'keen', 'E', 'A', '-', '-', '-'),
  ('귀인의 세검', 'quality', 'B', 'B', '-', '-', '-'),
  ('귀인의 세검', 'fire', 'C', 'E', '-', '-', '-'),
  ('귀인의 세검', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('귀인의 세검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('귀인의 세검', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('귀인의 세검', 'magic', 'E', 'D', 'B', '-', '-'),
  ('귀인의 세검', 'cold', 'E', 'B', 'C', '-', '-'),
  ('귀인의 세검', 'poison', 'E', 'B', '-', '-', 'D'),
  ('귀인의 세검', 'blood', 'E', 'B', '-', '-', 'D'),
  ('귀인의 세검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('지팡이검', 'standard', 'D', 'C', '-', '-', '-'),
  ('지팡이검', 'heavy', 'B', '-', '-', '-', '-'),
  ('지팡이검', 'keen', 'E', 'A', '-', '-', '-'),
  ('지팡이검', 'quality', 'B', 'B', '-', '-', '-'),
  ('지팡이검', 'fire', 'C', 'E', '-', '-', '-'),
  ('지팡이검', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('지팡이검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('지팡이검', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('지팡이검', 'magic', 'E', 'E', 'C', '-', '-'),
  ('지팡이검', 'cold', 'D', 'B', 'C', '-', '-'),
  ('지팡이검', 'poison', 'D', 'B', '-', '-', 'D'),
  ('지팡이검', 'blood', 'D', 'B', '-', '-', 'D'),
  ('지팡이검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('돌칼집의 검', 'standard', 'B', 'D', '-', '-', '-'),
  ('전쟁매의 발톱검', 'standard', 'D', 'B', '-', '-', '-'),
  ('전쟁매의 발톱검', 'heavy', 'B', '-', '-', '-', '-'),
  ('전쟁매의 발톱검', 'keen', 'E', 'A', '-', '-', '-'),
  ('전쟁매의 발톱검', 'quality', 'B', 'B', '-', '-', '-'),
  ('전쟁매의 발톱검', 'fire', 'C', 'E', '-', '-', '-'),
  ('전쟁매의 발톱검', 'flame_art', 'E', 'D', '-', 'B', '-'),
  ('전쟁매의 발톱검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('전쟁매의 발톱검', 'sacred', 'E', 'D', '-', 'B', '-'),
  ('전쟁매의 발톱검', 'magic', 'E', 'E', 'B', '-', '-'),
  ('전쟁매의 발톱검', 'cold', 'D', 'B', 'C', '-', '-'),
  ('전쟁매의 발톱검', 'poison', 'D', 'B', '-', '-', 'D'),
  ('전쟁매의 발톱검', 'blood', 'D', 'B', '-', '-', 'D'),
  ('전쟁매의 발톱검', 'occult', 'E', 'D', '-', '-', 'B'),
  ('라줄리의 휘석검', 'standard', 'C', 'D', 'D', '-', '-'),
  ('카리아의 기사검', 'standard', 'C', 'D', 'D', '-', '-'),
  ('결정검', 'standard', 'C', 'D', 'D', '-', '-'),
  ('부패한 결정검', 'standard', 'C', 'D', 'D', '-', '-'),
  ('미켈라의 기사검', 'standard', 'D', 'D', '-', 'D', '-'),
  ('의장 직검', 'standard', 'D', 'B', '-', '-', '-'),
  ('황금 묘비', 'standard', 'D', 'D', '-', 'C', '-'),
  ('트리나의 검', 'standard', 'D', 'C', 'D', '-', '-'),
  ('트리나의 보랏빛 검', 'standard', 'D', 'D', 'D', '-', '-'),
  ('에오히드의 보검', 'standard', 'D', 'C', '-', '-', 'C'),
  ('비문자 검', 'standard', '-', '-', '-', 'A', '-'),
  ('밤과 불꽃의 검', 'standard', 'D', 'D', 'B', 'B', '-'),
  ('라이트 소드', 'standard', 'C', 'D', '-', 'D', '-'),
  ('다크 소드', 'standard', 'C', 'D', '-', 'D', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '직검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
