-- 사용자 제공 원거리 무기 31종. 공통 기준: docs/DATABASE.md, 개별 출처·변환: docs/DATA_SOURCES.md.
-- 기존 행·순서는 보존합니다. 출처에 없는 수치는 NULL입니다.
-- https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if (select count(*) from public.game_item_categories where type = 'other_weapon' and name in ('소형 활','활','대궁','석궁','발리스타')) <> 5 then
    raise exception '원거리 무기 5개 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select i.category_id, i.name from public.game_items i join public.game_item_categories c on c.id = i.category_id
    where c.type = 'other_weapon' and c.name in ('소형 활','활','대궁','석궁','발리스타')
    group by i.category_id, i.name having count(*) > 1
  ) or exists (
    select name, description from public.weapon_skills
    where name in ('연속 사격','강화 사격','원혼 쏘기','관통 사격','부채꼴 쏘기','라단의 소나기','킥','연노 연사')
    group by name, description having count(*) > 1
  ) then raise exception '중복 아이템·기술을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('연속 사격', '수평으로 활을 드는 사수의 전투 기술.
자세를 잡으며 잘 보이지 않을 만큼 빠르게
연속으로 화살을 쏠 수 있다.', '2 ( - / - )'),
  ('강화 사격', '활을 비스듬히 드는, 사수의 전투 기술.
활시위를 쥐어짜듯 당기고 쏜 그 화살은
위력이 강해지고 가드를 뚫는다.', null),
  ('원혼 쏘기', '화살에 원혼을 불러 연속으로 쏘는 전투 기술.
원혼 화살은 적을 쫓아다니듯 날아간다.', '3 ( - / - )'),
  ('부채꼴 쏘기', '수평으로 활을 잡는 전투 기술.
8개의 화살을 동시에 걸고
부채꼴로 쏠 수 있다.', null),
  ('관통 사격', '대궁을 비스듬히 드는, 강력한 사수의 전투
기술. 시위를 당기며 대형 화살을 비틀어 쏜
그 화살은 적의 몸을 관통한다.', null),
  ('라단의 소나기', '낮은 자세에서 활 시위를 당기는 전투 기술.
자세를 잡고 많은 화살을 단번에 하늘에 쏜다.
그 화살들은 소나기처럼 적에게 쏟아진다.', null),
  ('킥', '다리를 높이 들어 차는 기술.
가드에 유효하고 자세를 무너뜨릴 수 있다.
단순하지만 실전적인 전투기술.', '- ( - / - )'),
  ('연노 연사', '연사용 기구를 작동시키는 전투 기술.
자세를 잡고 앞쪽 핸들을 돌려서
연속으로 볼트를 쏠 수 있다.', null)
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, category, sort_order, content_code, game_description, effect_description) as (
  values
  ('숏 보우', '소형 활', 10, 'base_game', '멀리서 활을 쏘기 위한 소형 활.
빠른 사격이 가능하며 마상 사용에도 적합하다.

활을 사용하려면
화살을 미리 장비해야 한다.', null),
  ('컴포지트 보우', '소형 활', 20, 'base_game', '여러 재료를 조합한 복합궁.

필요 능력이 높고 다루기 어렵지만
잘 다룰 수 있다면 강력한 활.', null),
  ('붉은 나무 숏 보우', '소형 활', 30, 'base_game', '잘 갈고닦인 적목 소형 활.
장인의 손이 되는, 귀인의 시종들의 무기.

힘이 아닌 기량으로 다루는 활.', null),
  ('혼종의 숏 보우', '소형 활', 40, 'base_game', '날개 혼종들이 사용하는 소형 활.
가는 체모가 전체에 달라붙었다.

공격력이 중시되어 사정거리는 짧은 활.', '사정거리 25로, 다른 소형 활보다 짧다.'),
  ('하프 보우', '소형 활', 50, 'base_game', '음유시인의 수금을 활로 만든 것.
화살을 쏘면 아직 아름다운 소리를 연주한다.

음유시인은 영웅들을 노래했다.
영예로운 황금 나무의 영웅들과
영예가 없는 모독의 영웅을.', null),
  ('뼈 활', '소형 활', 60, 'shadow_of_the_erdtree', '병적인 뼈로 만들어진 조잡한 숏 보우.

탑에 전해지는 옛 주술에 의해
강령의 촉매가 된다.', null),
  ('롱보우', '활', 10, 'base_game', '멀리서 화살을 쏘기 위한 활.
소형 활에 비해 위력과 사정거리가 뛰어나다.

활을 사용하려면
화살을 미리 장비해야 한다.', null),
  ('백금의 활', '활', 20, 'base_game', '섬세하게 은으로 세공된 활.
늑대의 등에 타는 백금의 사수들의 무기.

이것을 능숙하게 다루려면
근력보다도 기량이 중요하다.', null),
  ('검은 활', '활', 30, 'base_game', '검은 나무를 칼날처럼 깎아낸 활.
능숙하게 다루기 가장 어려운 활 중 하나.

칼날 활대는 가볍고 바람을 갈라
마치 소형 활처럼 다룰 수 있다.', '소형 활처럼 달리기·점프·착지·구르기 후 퀵샷을 사용할 수 있다.'),
  ('안스바흐의 장궁', '활', 40, 'shadow_of_the_erdtree', '엘든 링 안스바흐의 장궁
노병 안스바흐의 무기
활 몸체 두 개와 현 두 개를 조합한 장궁

사용자의 기량이 탁월할 것을 전제로
소형 활처럼 다룰 수 있다.', '소형 활처럼 구르기·달리기 후 퀵샷을 사용할 수 있다.'),
  ('도르래 활', '활', 50, 'base_game', '도르래와 용수철을 조합한 활.
고도의 역학, 수학을 동원한 복잡한 구조는
황금률 원리주의를 배운 한 천재의 작품이다.

화살의 사격 정밀도를 높이고
사정거리를 늘리는 데에 성공했다.', '도르래 구조로 화살의 사격 정밀도와 사정거리가 높아진다.'),
  ('뿔 활', '활', 60, 'base_game', '짐승의 뿔로 만든 활.
선조령의 백성의, 실력 좋은 사냥꾼의 무기.

화살에 마력 속성 공격력을 부여하며
마력 속성 화살을 쏠 때 진가를 발휘한다.', '화살에 마력 공격력을 부여하며, 마력 속성 화살과 함께 사용할 때 위력이 높아진다.'),
  ('뱀 활', '활', 70, 'base_game', '두 마리 독사를 본뜬 이형의 활.
이교의 주술로 화살에 독성을 부여하며
특히 독화살을 쏠 때 진가를 발휘한다.

암살에 이용되며 그 사용자는
모습 없는 뱀이라고도 불린다.', '모든 화살에 기본 독 축적 15를 추가한다. 신비 보정은 무기 공격력 대신 상태 이상 축적에 영향을 준다.'),
  ('황금 나무의 활', '활', 80, 'base_game', '황금 나무 의장이 새겨진 활.
옛 시대, 신앙이 싸움과 함께 있었던 시절
[황금 화살] 과 함께 만들어진 무기.

화살의 공격력을 신앙으로도 보정하며
신성 속성 화살을 쏠 때 진가를 발휘한다.', '화살 공격력을 신앙으로도 보정하며 신성 속성 화살과 함께 사용할 때 위력이 높아진다.'),
  ('대궁', '대궁', 10, 'base_game', '사람보다도 큰, 유별나게 거대한 활.
웬만한 힘으로는 시위를 당길 수 없으나
그 위력은 차원이 다르다.

대궁에는 대형 화살만 사용할 수 있다.', null),
  ('골렘의 대궁', '대궁', 20, 'base_game', '옛 유적의 문명이 만든 검은 돌의 대궁.
가디언 골렘이 사용하는 무기.

가장 무겁고 쥐어짜는 힘이 필요한 대궁.
애초에 인간이 다룰 물건은 아닐 것이다.', null),
  ('황금 나무의 대궁', '대궁', 30, 'base_game', '황금 나무 의장이 새겨진 대궁
옛 시대, 신앙이 싸움과 함께 있었던 시절
''황금 대형 화살''과 함께 만들어진 무기.

화살의 공격력을 신앙으로도 보정하며
신성 속성 화살을 쏠 때 진가를 발휘한다.', '화살 공격력을 신앙으로도 보정하며 신성 속성 화살과 함께 사용할 때 위력이 높아진다.'),
  ('에이곤의 대궁', '대궁', 40, 'shadow_of_the_erdtree', '망가진 용의 전사 에이곤의 무기.
용의 뼈 두 개를 거친 밧줄로 묶은 대궁.
수많은 발톱 자국이 새겨져 있다.

배어든 에이곤의 집념이
「에이곤의 작살」 의 위력을 높인다.', '에이곤의 작살로 주는 피해가 20% 증가한다.'),
  ('사자의 대궁', '대궁', 50, 'base_game', '장군 라단이 사용했던 흑철 대궁.
사자 갈기가 장식된 무기.

별 부수는 중력의 힘을 품고 있으며
「라단의 창」과 함께 사용할 때
그야말로 영웅의 무기가 된다.', '라단의 창으로 주는 피해가 20% 증가한다.'),
  ('병사의 석궁', '석궁', 10, 'base_game', '간소한 만듦새의 석궁
사용자를 가리지 않는 무기이나
강도, 정확도 모두 그리 높지는 않다.

석궁을 사용하려면
볼트를 미리 장비해야 한다.', null),
  ('라이트 크로스보우', '석궁', 20, 'base_game', '받침대에 활을 고정한 원거리 무기.
다루기 쉽고 공격력도 높으나
사격후 볼트를 장전해야 한다.

석궁을 사용하려면
볼트를 미리 장비해야 한다.', null),
  ('헤비 크로스보우', '석궁', 30, 'base_game', '철제 림을 지닌 무거운 석궁.
공격력이 향상되었다.

파쇄전쟁에서 널리 사용되었다.', null),
  ('아바레스트', '석궁', 40, 'base_game', '복합재로 만들어진 대형 석궁.
볼트를 사용하는 무기 중 최대급이다.

그 테는 철제를 능가하는 휘어짐을 지녔고
발사되는 볼트는 철 투구를 뚫는다고 한다.', null),
  ('크레푸스의 흑건', '석궁', 50, 'base_game', '받침대가 긴 검은색 석궁.
저격용이며 사정거리가 길다.

원탁의 암부로 두 손가락을 섬긴
밀사의 우두머리 크레푸스의 무기였다.', '저격용 석궁으로 사정거리가 길다.'),
  ('도르래 석궁', '석궁', 60, 'base_game', '도르래와 톱니바퀴를 조합한 석궁.
고도의 역학, 수학을 동원한 복잡한 구조는
황금률 원리주의를 배운 한 천재의 작품이다.

한 번의 사격으로 볼트를 연사한다.
볼트 소모가 심하므로 주의해야 한다.', '한 번의 사격으로 볼트를 3발 연속 발사한다.'),
  ('연노', '석궁', 70, 'shadow_of_the_erdtree', '부채꼴 모양의 금속 파츠가 달린
기계 장치 크로스보우.

금속 파츠는 장전 기구로,
전용 전투 기술을 통해 사용할 수 있다.', null),
  ('산탄 크로스보우', '석궁', 80, 'shadow_of_the_erdtree', '크로스보우 두 개를 조합한
개조 크로스보우

다수의 볼트를 장전할 수 있으며
이를 동시에 산탄처럼 사출한다.', '한 번의 사격으로 볼트를 10발 소모해 산탄처럼 동시에 발사한다.'),
  ('월륜의 석궁', '석궁', 90, 'base_game', '황금 나무와 만월, 로데일과 레아 루카리아의
화목과 혼인을 축하하여 만들어진
하나뿐인 석궁. 정밀한 마술 공예품

장전 시 두 고리가 춤추며
마력 속성 볼트를 쏠 때 진가를 발휘한다.', '마력 속성 볼트와 함께 사용할 때 위력이 높아진다.'),
  ('핸디 발리스타', '발리스타', 10, 'base_game', '공성병기를 바탕으로 한 규격 외의 사격무기.
전용 대형 볼트를 사용한다.

단신으로 성에, 혹은 군대에 맞서는
그 무모함에야말로 어울릴것이다.', '전용 대형 볼트를 사용한다. 사정거리 50.'),
  ('대포 항아리', '발리스타', 20, 'base_game', '폭발로 대형 볼트를 쏘는 항아리 대포.
공격력은 높으나 장전에 시간이 걸린다.

화산관 공략전에 반입된 시험작 무기이나
사용할 사람을 얻지 못한듯하다.', '폭발로 대형 볼트를 발사하며 장전에 시간이 걸린다.'),
  ('라바스의 대포', '발리스타', 30, 'shadow_of_the_erdtree', '대형 볼트를 쏘는 항아리 대포의 일종.
마술기사 라바스가 만든 일품.

포구에 배치한 휘석의 힘으로
발사되는 볼트에 마력 공격력을 부여한다.
또한, 그 볼트는 대상을 향해 유도된다.', '발사하는 대형 볼트에 마력 공격력을 부여하며 대상에게 유도된다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'other_weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s join public.game_item_categories c on c.type = 'other_weapon' and c.name = s.category
where not exists (select 1 from public.game_items i where i.category_id = c.id and i.name = s.name);

with source (name, category, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('숏 보우', '소형 활', '연속 사격', null, null, 'smithing_stone', false, 159, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 8, 10, 0, 0, 0),
  ('컴포지트 보우', '소형 활', '강화 사격', null, null, 'smithing_stone', false, 159, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 15, 15, 0, 0, 0),
  ('붉은 나무 숏 보우', '소형 활', '연속 사격', null, null, 'smithing_stone', false, 159, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 8, 16, 0, 0, 0),
  ('혼종의 숏 보우', '소형 활', '연속 사격', null, null, 'smithing_stone', false, 166, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 16, 8, 0, 0, 0),
  ('하프 보우', '소형 활', '연속 사격', null, null, 'somber_smithing_stone', false, 151, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0),
  ('뼈 활', '소형 활', '원혼 쏘기', null, null, 'smithing_stone', false, 161, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 8, 11, 0, 0, 0),
  ('롱보우', '활', '강화 사격', null, null, 'smithing_stone', false, 196, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 9, 14, 0, 0, 0),
  ('백금의 활', '활', '강화 사격', null, null, 'smithing_stone', false, 200, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 7, 18, 0, 0, 0),
  ('검은 활', '활', '연속 사격', null, null, 'somber_smithing_stone', false, 171, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 9, 20, 0, 0, 0),
  ('안스바흐의 장궁', '활', '부채꼴 쏘기', null, null, 'somber_smithing_stone', false, 181, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 9, 43, 0, 0, 0),
  ('도르래 활', '활', '강화 사격', 5, null, 'somber_smithing_stone', false, 188, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 11, 11, 0, 0, 0),
  ('뿔 활', '활', '강화 사격', null, null, 'smithing_stone', false, 159, 73, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 10, 14, 12, 0, 0),
  ('뱀 활', '활', '강화 사격', null, null, 'somber_smithing_stone', false, 183, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 8, 15, 0, 0, 11),
  ('황금 나무의 활', '활', '강화 사격', null, null, 'somber_smithing_stone', false, 98, 0, 0, 0, 122, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 8, 12, 0, 14, 0),
  ('대궁', '대궁', '관통 사격', null, null, 'smithing_stone', false, 306, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 20, 20, 0, 0, 0),
  ('골렘의 대궁', '대궁', '관통 사격', null, null, 'somber_smithing_stone', false, 318, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 24, 18, 0, 0, 0),
  ('황금 나무의 대궁', '대궁', '관통 사격', null, null, 'somber_smithing_stone', false, 147, 0, 0, 0, 159, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 20, 14, 0, 14, 0),
  ('에이곤의 대궁', '대궁', '관통 사격', null, null, 'smithing_stone', false, 294, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 23, 16, 0, 0, 0),
  ('사자의 대궁', '대궁', '라단의 소나기', null, null, 'somber_smithing_stone', false, 294, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 22, 18, 0, 0, 0),
  ('병사의 석궁', '석궁', '킥', null, null, 'smithing_stone', false, 240, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 10, 8, 0, 0, 0),
  ('라이트 크로스보우', '석궁', '킥', null, null, 'smithing_stone', false, 260, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 12, 8, 0, 0, 0),
  ('헤비 크로스보우', '석궁', '킥', null, null, 'smithing_stone', false, 288, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 14, 10, 0, 0, 0),
  ('아바레스트', '석궁', '킥', null, null, 'smithing_stone', false, 308, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 18, 12, 0, 0, 0),
  ('크레푸스의 흑건', '석궁', '킥', null, null, 'somber_smithing_stone', false, 238, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 14, 16, 0, 0, 0),
  ('도르래 석궁', '석궁', '킥', null, null, 'somber_smithing_stone', false, 146, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 16, 16, 0, 0, 0),
  ('연노', '석궁', '연노 연사', null, null, 'somber_smithing_stone', false, 259, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 13, 15, 0, 0, 0),
  ('산탄 크로스보우', '석궁', null, null, null, 'smithing_stone', false, 197, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 11, 17, 0, 0, 0),
  ('월륜의 석궁', '석궁', '킥', null, null, 'somber_smithing_stone', false, 175, 175, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 10, 10, 14, 0, 0),
  ('핸디 발리스타', '발리스타', '킥', 10.0, '없음', 'smithing_stone', false, 600, 0, 0, 0, 0, 31.0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 30, 14, 0, 0, 0),
  ('대포 항아리', '발리스타', '킥', null, null, 'somber_smithing_stone', false, 672, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 34, 12, 0, 0, 0),
  ('라바스의 대포', '발리스타', '킥', null, null, 'somber_smithing_stone', false, 378, 378, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 28, 16, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'other_weapon', s.weight, case when s.physical_attack_types = '없음' then array[]::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'other_weapon' and c.name = s.category
join public.game_items i on i.category_id = c.id and i.name = s.name
left join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, category, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('숏 보우', '소형 활', 'standard', 'D', 'D', '-', '-', '-'),
  ('컴포지트 보우', '소형 활', 'standard', 'E', 'D', '-', '-', '-'),
  ('붉은 나무 숏 보우', '소형 활', 'standard', 'E', 'D', '-', '-', '-'),
  ('혼종의 숏 보우', '소형 활', 'standard', 'D', 'E', '-', '-', '-'),
  ('하프 보우', '소형 활', 'standard', 'E', 'D', '-', '-', '-'),
  ('뼈 활', '소형 활', 'standard', 'D', 'D', '-', '-', '-'),
  ('롱보우', '활', 'standard', 'D', 'D', '-', '-', '-'),
  ('백금의 활', '활', 'standard', 'E', 'D', '-', '-', '-'),
  ('검은 활', '활', 'standard', 'D', 'D', '-', '-', '-'),
  ('안스바흐의 장궁', '활', 'standard', 'D', 'D', '-', '-', '-'),
  ('도르래 활', '활', 'standard', 'D', 'D', '-', '-', '-'),
  ('뿔 활', '활', 'standard', 'D', 'D', 'E', '-', '-'),
  ('뱀 활', '활', 'standard', 'D', 'D', '-', '-', 'D'),
  ('황금 나무의 활', '활', 'standard', 'E', 'D', '-', 'D', '-'),
  ('대궁', '대궁', 'standard', 'D', 'D', '-', '-', '-'),
  ('골렘의 대궁', '대궁', 'standard', 'C', 'D', '-', '-', '-'),
  ('황금 나무의 대궁', '대궁', 'standard', 'D', 'D', '-', 'D', '-'),
  ('에이곤의 대궁', '대궁', 'standard', 'C', 'E', '-', '-', '-'),
  ('사자의 대궁', '대궁', 'standard', 'D', 'D', '-', '-', '-'),
  ('병사의 석궁', '석궁', 'standard', '-', '-', '-', '-', '-'),
  ('라이트 크로스보우', '석궁', 'standard', '-', '-', '-', '-', '-'),
  ('헤비 크로스보우', '석궁', 'standard', '-', '-', '-', '-', '-'),
  ('아바레스트', '석궁', 'standard', '-', '-', '-', '-', '-'),
  ('크레푸스의 흑건', '석궁', 'standard', '-', '-', '-', '-', '-'),
  ('도르래 석궁', '석궁', 'standard', '-', '-', '-', '-', '-'),
  ('연노', '석궁', 'standard', '-', '-', '-', '-', '-'),
  ('산탄 크로스보우', '석궁', 'standard', '-', '-', '-', '-', '-'),
  ('월륜의 석궁', '석궁', 'standard', '-', '-', '-', '-', '-'),
  ('핸디 발리스타', '발리스타', 'standard', '-', '-', '-', '-', '-'),
  ('대포 항아리', '발리스타', 'standard', '-', '-', '-', '-', '-'),
  ('라바스의 대포', '발리스타', 'standard', '-', '-', '-', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane from source s
join public.game_item_categories c on c.type = 'other_weapon' and c.name = s.category
join public.game_items i on i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
