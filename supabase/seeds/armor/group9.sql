-- 사용자 제공 방어구 목차 분류 9: 부위·이름·게임 내 설명만 등록합니다.
-- 순서·종류·콘텐츠 소속은 필수 관리 정보이며 수치·세트 관계·부가 효과는 등록하지 않습니다.
-- 원문 대응과 경장 설명 공유: docs/DATA_SOURCES.md
-- 기존 행과 표시 순서는 덮어쓰지 않습니다.
do $$
begin
  if (select count(*) from public.game_item_categories where type = 'armor' and name in ('투구','갑옷','장갑','각반')) <> 4 then
    raise exception '방어구 부위 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select i.category_id, i.name, i.content_code from public.game_items i
    where i.type = 'armor' group by i.category_id, i.name, i.content_code having count(*) > 1
  ) then raise exception '중복된 방어구를 확인해야 합니다.';
  end if;
end;
$$;

with source (name, category, sort_order, content_code, game_description) as (
  values
  ('서약기사의 각반', '각반', 5630, 'shadow_of_the_erdtree', '검은 바탕에 금으로 장식된
서약기사들의 각반.

그 기사들은 탐구의 여행을 떠난다.
자신의 눈으로 서약을 발견하고 선택하여
평생 그것만을 섬기기 위해서.'),
  ('전투광의 각반', '각반', 5680, 'base_game', '원탁을 찾아온 첫 빛바랜 자들 중 하나,
늑대 전투광 바르글룸의 장비.

옛 전승에 의하면 늑대는 반신의 그림자이며
바르글룸 또한 그런 삶을 원했다.'),
  ('호슬로의 각반', '각반', 5730, 'base_game', '은철을 붉은색으로 장식한 호사스러운 각반.
명문 호슬로에 전해 내려오는 장비.

화산관의 권유를 받았을 때
유노 호슬로는 조용히 거절했다.

피에 젖은 길이라면 이미 걷고 있다.
하지만 나는 나 자신을
절대 영웅이라 부르지 않는다.'),
  ('쌍생아의 각반', '각반', 5790, 'base_game', '황금과 백은, 뒤얽힌 쌍생아를 본뜬 각반.

나뉘지 않는 쌍생아, D는 두 명 있다.
두 몸, 두 의지, 그리고 한 영혼.
함께 일어나는 일도 대화하는 일도 없다.

…이 갑옷은 또 한 명의 D의 곁에
있기를 바라고 있을까.'),
  ('용기사의 각반', '각반', 5850, 'base_game', '용기사들이 쓰는 흑철 각반.
용 사냥과 용찬을 과시하고자
용의 일부를 사용했다.

그들은 평생 말하는 일 없이
그저 용의 힘을,
그 아름다움과 두려움을 원한다.'),
  ('철가시 각반', '각반', 5900, 'base_game', '망가져가는 이국의 철 각반.
철가시 엘레메르의 장비.

감겨 있는 녹슨 철가시는
죄인, 특히 사형수임을 나타낸다.
엘레메르는 수많은 사범, 상인들을 죽인
방울 사냥꾼으로 두려움을 샀다.'),
  ('손가락 자국의 각반', '각반', 5950, 'base_game', '손가락 자국으로 불타 문드러진 철 각반.
원탁의 기사 바이크의 장비.

바이크는 한때 엘데의 왕에 가장 가까운
빛바랜 자 중 하나였으나
갑자기 도읍의 깊은 곳에 들어갔고
미친 불에 불타 문드러졌다.

그것은 자신의 무녀를 위한 행동이었는가,
아니면 누군가가 꼬드긴 것인가.'),
  ('나찰의 각반', '각반', 5990, 'shadow_of_the_erdtree', '튄 피에 물든 나찰의 각반.
흉흉한 검기가 흘러나오는 것처럼
낡은 천 가장자리가 어른거린다.

적에게 입히는 대미지를 높이나
자신이 받는 대미지도 높아진다.

사람을 베고 먹는다.
이를 게을리하지 않고 계속한 자만이
무아의 나찰이 된다.'),
  ('왕의 유해의 각반', '각반', 6030, 'base_game', '황금의 사람 뼈로 꾸민 각반.
온 지혜의 기드온의 말 없는 종이 입는 장비.

HP가 감소했을 때만
서서히 HP를 회복한다.

그 뼈는 옛 왕의 유해라고 한다.
영혼 없는 왕, 매달리는 자들의 왕
그 이름은 엔샤이다.'),
  ('온 지혜의 각반', '각반', 6080, 'base_game', '수많은 눈과 귀가 새겨진 각반.
온 지혜의 기드온 오프닐 경의 복장.

앎이란 자신의 무지를 아는 것이며
아는 것에 끝이 없음을 아는 것이다.
하지만 여왕 마리카의 유지를 접했을 때
기드온은 두려워하고 말았다.

있을 리가 없는 끝을.'),
  ('친위기사의 각반', '각반', 6130, 'base_game', '미켈라의 성수를 섬긴 기사
로레타의 은철 각반.

한때 카리아의 친위기사였던 그녀는
백금이 안식할 땅을 찾아 여행을 떠났다.
그리고 성수의 미래에 그것을 의탁했다.'),
  ('렐라나의 각반', '각반', 6170, 'shadow_of_the_erdtree', '쌍월의 기사 렐라나의 각반.
은철로 만들어진 정교한 방어구.'),
  ('말리케스의 각반', '각반', 6220, 'base_game', '흑철을 금으로 장식한 짐승의 각반.
흑검 말리케스의 장비.

여왕 마리카의 충실한 의붓동생이자
그 검에 운명의 죽음을 품은 말리케스는
모든 데미갓의 공포였다.

공포를 알기에
그들은 영웅이었다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description)
select s.name, 'armor', c.id, s.sort_order, s.content_code, s.game_description
from source s join public.game_item_categories c on c.type = 'armor' and c.name = s.category
where not exists (select 1 from public.game_items i where i.category_id = c.id and i.name = s.name and i.content_code = s.content_code);
