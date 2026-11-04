-- 사용자 제공 횃불 8종. 공통 기준: docs/DATABASE.md, 개별 출처·변환: docs/DATA_SOURCES.md.
-- 기존 행·순서는 보존합니다. 출처에 없는 수치는 NULL입니다.
-- https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if (select count(*) from public.game_item_categories where type = 'other_weapon' and name in ('횃불')) <> 1 then
    raise exception '횃불 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select i.category_id, i.name from public.game_items i join public.game_item_categories c on c.id = i.category_id
    where c.type = 'other_weapon' and c.name in ('횃불')
    group by i.category_id, i.name having count(*) > 1
  ) or exists (
    select name, description from public.weapon_skills
    where name in ('횃불 공격','불 뿜기','잠의 화염','약한 왕의 미친 불','행복한 눈가리기')
    group by name, description having count(*) > 1
  ) then raise exception '중복 아이템·기술을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('횃불 공격', '횃불을 앞으로 내밀어 적을 태우는 전투 기술.
불에 약한 적에게는 유효하다.', null),
  ('불 뿜기', '횃불의 화염에 숨을 세게 불어
전방 넓은 범위를 불태우는 전투 기술.
화염은 잠시 땅을 계속 불태운다.', null),
  ('잠의 화염', '촛대의 불에 입김을 불어 옅은 보라색 불꽃으로
전방 넓은 범위를 쓸어버리는 전투 기술.
수면 상태 이상 효과가 있다.', null),
  ('약한 왕의 미친 불', '횃불을 앞으로 들고 미친 불을 뿌리는 전투 기술.
주위와 사용자 자신에게 발광을 축적한다.
길게 누르는 동안에는 계속되며
발을 멈추지 않고 사용할 수 있다.', null),
  ('행복한 눈가리기', '눈을 가리며 얼굴을 흔들어, 한탄하는 목소리와
함께 사용자의 모습을 일시적으로 잘 보이지
않게 하는 전투 기술
행복하고 싶다면 아무 것도 보지 마라.', null)
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, category, sort_order, content_code, game_description, effect_description) as (
  values
  ('횃불', '횃불', 10, 'base_game', '헝겊을 감아 기름을 먹인
끝부분에 불을 붙인 것.
어둠을 밝게 비추고 불로 적을 공격한다.

또한 왼손에 장비하여 치켜들면
더 먼 곳도 비출 수 있다.', '어둠을 밝히며 왼손에 장비해 치켜들면 더 먼 곳을 비출 수 있다.'),
  ('짐승 쫓는 횃불', '횃불', 20, 'base_game', '기름과 함께 특수한 향료를 태우는 횃불.
그 냄새는 짐승의 전의를 감퇴시킨다.

동굴에 보물을 숨겨둔 자들이
눌러앉은 짐승을 쫓아내기 위해 사용한다.', '일부 짐승의 선공을 억제한다. 등에 메고 있어도 적용되지만 먼저 공격하거나 지나치게 가까이 오래 있으면 효과가 사라진다. 룬베어·거대 까마귀·붉은 눈의 거대 개 등에는 적용되지 않는다.'),
  ('강선 토치', '횃불', 30, 'base_game', '강선을 짜 만든 횃불.
어둠을 밝게 비추고 불로 적을 공격한다.

일반적인 횃불보다 무겁지만
달궈진 강선이 불의 공격력을 상승시킨다.', null),
  ('보초의 횃불', '횃불', 40, 'base_game', '황금 나무를 섬기는 자들에게 주어지는 횃불.
그 불꽃에는 특별한 기도가 담겨
베일에 가려진 자객의 모습을 찾아낸다.

황금 나무와 축복왕은 대비한다.
또 다시 음모의 밤이 찾아오지 않도록.', '은신한 검은 칼날 자객을 드러낸다. 요구 능력치가 부족하거나 반대편 무기를 양손으로 들어 등에 멘 상태에서도 적용된다.'),
  ('영혼 불 토치', '횃불', 50, 'base_game', '차가운 영혼의 불을 태우는 금속제 횃불.
지하 강을 헤메는 떨어지는 매 병단의 장비.

탐색 끝에 불씨를 잃은 병단은
동료의 뼈를 태워 차가운 영혼의 불을 얻었다.
그리고 그들은 영원한 지하의 주민이 되었다.', '차가운 백색 영혼 불로 어둠을 밝히며 직접 공격으로 동상을 축적한다.'),
  ('트리나의 등불', '횃불', 60, 'base_game', '연보라색 불을 밝히는 촛대 횃불.
조각은 성녀 트리나일 터인데
모습은 어른스럽고 어딘가 무섭다.

연보라색 불에는 수면 효과가 있다.', '연보라색 불로 어둠을 밝히며 직접 공격으로 수면을 축적한다.'),
  ('나나야의 등불', '횃불', 70, 'shadow_of_the_erdtree', '왜소한 등뼈 끝에
다 꺼져가는 미친 불을 켠 횃불.

옛 시대, 먼 장소에서 태어난
불완전한 미친 불의 왕, 그 말로는
나나야에게 살며시 안겼다.', '미친 불의 노란 빛으로 어둠을 밝힌다.'),
  ('한탄하는 목', '횃불', 80, 'shadow_of_the_erdtree', '한탄하는 얼굴을 본뜬 돌 랜턴.
그 눈동자는 멍하니 빛나며
왼손에 장비하여 치켜들면
더 먼 곳도 비출 수 있다.

그 이상한 모습은 어딘가 행복을 느끼게 한다.
무엇을 볼 일도 없는, 늘어진 행복을.', '왼손에 장비해 치켜들면 더 먼 곳을 비출 수 있다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'other_weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s join public.game_item_categories c on c.type = 'other_weapon' and c.name = s.category
where not exists (select 1 from public.game_items i where i.category_id = c.id and i.name = s.name);

with source (name, category, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('횃불', '횃불', '횃불 공격', 1.5, null, 'smithing_stone', false, 132, 0, 237, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 0),
  ('짐승 쫓는 횃불', '횃불', '횃불 공격', null, null, 'smithing_stone', false, 142, 0, 254, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 12, 8, 0, 0, 0),
  ('강선 토치', '횃불', '불 뿜기', null, null, 'smithing_stone', false, 149, 0, 267, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 10, 8, 0, 0, 0),
  ('보초의 횃불', '횃불', '횃불 공격', 5, null, 'somber_smithing_stone', false, 137, 0, 0, 0, 245, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 15, 8, 0, 15, 0),
  ('영혼 불 토치', '횃불', '횃불 공격', null, null, 'smithing_stone', false, 122, 220, 0, 0, 0, null, null, null, null, null, null, null, 0, 65, 0, 0, 0, 0, 10, 10, 14, 0, 0),
  ('트리나의 등불', '횃불', '잠의 화염', 3, null, 'somber_smithing_stone', false, 124, 0, 222, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 72, 0, 10, 10, 0, 14, 0),
  ('나나야의 등불', '횃불', '약한 왕의 미친 불', null, null, 'somber_smithing_stone', false, 134, 0, 242, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 65, 10, 10, 14, 16, 0),
  ('한탄하는 목', '횃불', '행복한 눈가리기', null, null, 'somber_smithing_stone', false, 173, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'other_weapon', s.weight, case when s.physical_attack_types = '없음' then array[]::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical::numeric, s.guard_magic::numeric, s.guard_fire::numeric, s.guard_lightning::numeric, s.guard_holy::numeric, s.critical::integer, s.guard_boost::integer, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'other_weapon' and c.name = s.category
join public.game_items i on i.category_id = c.id and i.name = s.name
left join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, category, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('횃불', '횃불', 'standard', 'C', 'D', '-', '-', '-'),
  ('짐승 쫓는 횃불', '횃불', 'standard', 'B', 'D', '-', '-', '-'),
  ('강선 토치', '횃불', 'standard', 'D', 'B', '-', '-', '-'),
  ('보초의 횃불', '횃불', 'standard', 'D', 'E', '-', 'C', '-'),
  ('영혼 불 토치', '횃불', 'standard', 'D', 'D', 'C', '-', '-'),
  ('트리나의 등불', '횃불', 'standard', 'D', 'D', '-', 'C', '-'),
  ('나나야의 등불', '횃불', 'standard', 'E', 'E', 'E', 'E', '-'),
  ('한탄하는 목', '횃불', 'standard', 'A', '-', '-', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane from source s
join public.game_item_categories c on c.type = 'other_weapon' and c.name = s.category
join public.game_items i on i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
