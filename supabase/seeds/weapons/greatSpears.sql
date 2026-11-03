-- 사용자 제공 대형 창 10종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '대형 창') then
    raise exception '대형 창 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '대형 창'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('돌격','관통 찌르기','성률','큰 뱀 사냥꾼','실루리아의 소용돌이','미친 불 찌르기','이오리의 고문','혈귀의 피 수여','위대한 피','메스메르의 강습')
    group by name, description having count(*) > 1
  ) then
    raise exception '대형 창 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('돌격', '허리춤에서 무기를 들고 단숨에 전진하는
전투 기술. 기세를 이어 마지막으로 찌른다.
길게 누르면 전진 거리를 늘릴 수 있다.', '16 ( - / - )'),
  ('관통 찌르기', '관통 무기로 방패와 대치하기 위한 전투 기술.
힘을 모아 크게 파고들며 강렬하게 찔러
방패의 가드를 정면으로 뚫는다.', '9 ( - / - )'),
  ('성률', '황금률 원리주의 기사들의 전투 기술.
경례와 함께 무기에 신성을 부여한다.
특히 죽음에 사는 자들에게 효과가 높다.', '18 ( - / - )'),
  ('큰 뱀 사냥꾼', '온 힘으로 찌른 후
추가 입력으로 올려 찌르는 전투 기술.
큰 뱀과 대치했을 때 긴 빛의 칼날을 만들어
진정한 힘을 발휘한다.', '10 ( - / 20 )'),
  ('실루리아의 소용돌이', '나무창을 회전해 바람의 소용돌이를 두르고
찌르는 전투 기술. 차지 공격의 위력은 적을
날리며, 바람 소용돌이를 전방에 날릴 수 있다.', '25 ( - / - )'),
  ('미친 불 찌르기', '미친 불을 창에 두르고 전방으로 도약하여
내리침과 동시에 폭발을 일으키는 전투 기술.
이 전투 기술은 사용자도 발광이 축적된다.', '14 ( - / - )'),
  ('이오리의 고문', '큰 지팡이를 찌르듯 내어 들고
역가시의 모습을 한 황금 포물선을 연속으로
쏘는 전투 기술.
길게 누르면 잠시동안 계속 이어진다.', '6 ( - / - )'),
  ('혈귀의 피 수여', '성창을 들어 진실의 어머니를 찌르는 전투 기술.
대상 주위에 혈염 폭발을 발생시킨다.
추가 입력으로 3회까지 연속 사용이 가능하다.', '20 ( - / 20 )'),
  ('위대한 피', '성창을 들고 모습 없는 어미의 모습을 찌르는
전투 기술. 세 번까지 찌르며
찌를 때마다 피의 폭발을 일으킨다.
성창은 피에 젖으며 이는 잠시 지속된다.', '20 ( - / 20 )'),
  ('메스메르의 강습', '칼날에 불을 두른 격렬한 연속 공격 전투 기술.
추가 공격으로 2회까지 추가 공격이 가능하며
마지막에 주위에 수많은 창을 생성한다.', '15 ( - / 9 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('랜스', 10, 'base_game', '긴 원뿔 형태의 돌기를 가진 대형 창.
찌르기에 특화된, 칼날이 없는 무기.

무거워서 다루기 어렵지만
마상 및 대 기마전에서 진가를 발휘한다.', null),
  ('메스메르 병사의 창', 20, 'shadow_of_the_erdtree', '가시공 메스메르를 섬기는 병사들의 무기.
손때묻은 철 칼날의 대형 창.

가열한 침공을 위한 무기이며
차지 공격이 연속 공격이 된다.', '차지 강공격이 연속 공격이 된다.'),
  ('트리 스피어', 30, 'base_game', '나무 장식이 된 황금 창.
도읍 로데일 근위기사의 무기.
신성 속성 공격력을 지닌다.

탁월한 기량을 전제로 하며
대형 창임에도 연속 찌르기가 가능하다.', null),
  ('큰 뱀 사냥꾼', 40, 'base_game', '대검이자 창인 무기.
옛 시대에 불사의 큰 뱀을 사냥했다고 하며
큰 뱀과 대치할 시 긴 빛의 칼날이 생긴다.

패왕의 야심이 비천한 탐욕으로 타락했을 때
기사들은 주군을 막을 무기를 찾았다.', '신을 먹는 큰 뱀·라이커드 보스전에서 공격 시 긴 빛의 칼날을 만든다. 차지 강공격 배율이 높다.'),
  ('실루리아의 나무 창', 50, 'base_game', '도가니의 기사 필두로 알려진 둘 중 한 명
기사 실루리아의 나무 창.

황금 나무의 원초는 생명에 가깝기에
그 도가니의 모습을 본뜬 창은
옛 신성을 품고 있다.', null),
  ('바이크의 전투 창', 60, 'base_game', '손가락 자국에 불타 문드러진 전투 창.
그것은 바이크 본인과 마찬가지로
노란 미친 불에 안쪽부터 타들어갔다.', null),
  ('역가시 지팡이창', 70, 'shadow_of_the_erdtree', '고문 전문가인 노인 이오리의 지팡이창.
끝부분에 고문의 상징인 황금 역가시가 있으며
대형 창으로 사용할 수 있다.

신성 속성 공격력을 지녔으며
신앙으로 그 위력이 높아진다.', null),
  ('혈귀의 성창', 80, 'shadow_of_the_erdtree', '혈귀 주술사가 사용하는 무기.
혈귀들이 치르는 피의 의식에서
고위 제구로 쓰이는 대형 창.

피의 성창은 외부의 신과 교신한다.
진실의 어머니는 상처를 원한다.', null),
  ('모그윈의 성창', 90, 'base_game', '피의 군주 모그의 삼지창.
신 왕조의 상징이 될 성창.

그것은 저주받은 피에 힘을 부여하는
외부의 신과 교신하는 제구이기도 하다.
진실의 어머니는 상처를 원한다.', null),
  ('가시공의 창', 100, 'shadow_of_the_erdtree', '가시공 메스메르의 무기.
일그러지는 불꽃 모양 칼날을 지닌 대형 창.

그림자의 땅의 단조술로 다시 벼려졌다.
일반, 대시, 마상 강 공격으로 창을 투척하고
차지 공격으로 착탄 시 화염이 생긴다.', '일반·대시·마상 강공격으로 창을 투척하며, 차지 투척 착탄 시 화염이 생긴다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 창'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('랜스', '돌격', 9.0, '관통', 'smithing_stone', true, 301, 0, 0, 0, 0, 57.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 0, 0, 0, 0, 20, 14, 0, 0, 0),
  ('메스메르 병사의 창', '관통 찌르기', 8.5, '표준 / 관통', 'smithing_stone', true, 298, 0, 0, 0, 0, 56.0, 35.0, 35.0, 35.0, 35.0, 100, 51, 0, 0, 0, 0, 0, 0, 19, 16, 0, 0, 0),
  ('트리 스피어', '성률', 9.5, '관통', 'smithing_stone', false, 298, 0, 0, 0, 193, 55.0, 35.0, 35.0, 35.0, 48.0, 100, 54, 0, 0, 0, 0, 0, 0, 15, 22, 0, 18, 0),
  ('큰 뱀 사냥꾼', '큰 뱀 사냥꾼', 12.0, '관통', 'somber_smithing_stone', false, 271, 0, 0, 0, 0, 72.0, 42.0, 42.0, 42.0, 42.0, 100, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
  ('실루리아의 나무 창', '실루리아의 소용돌이', 10.0, '관통', 'somber_smithing_stone', false, 220, 0, 0, 0, 220, 51.0, 36.0, 36.0, 36.0, 55.0, 100, 50, 0, 0, 0, 0, 0, 0, 27, 13, 0, 20, 0),
  ('바이크의 전투 창', '미친 불 찌르기', 8.0, '관통', 'somber_smithing_stone', false, 252, 0, 161, 0, 0, 52.0, 33.0, 45.0, 33.0, 33.0, 100, 46, 0, 0, 0, 0, 0, 65, 16, 20, 0, 18, 0),
  ('역가시 지팡이창', '이오리의 고문', 7.5, '표준 / 관통', 'somber_smithing_stone', false, 210, 0, 0, 0, 210, 42.0, 31.0, 31.0, 31.0, 45.0, 100, 40, 0, 0, 55, 0, 0, 0, 14, 18, 0, 22, 0),
  ('혈귀의 성창', '혈귀의 피 수여', 8.0, '표준 / 관통', 'somber_smithing_stone', false, 281, 0, 0, 0, 0, 40.0, 25.0, 25.0, 25.0, 25.0, 100, 33, 0, 0, 55, 0, 0, 0, 22, 12, 0, 0, 13),
  ('모그윈의 성창', '위대한 피', 10.0, '관통', 'somber_smithing_stone', false, 235, 0, 151, 0, 0, 57.0, 36.0, 49.0, 36.0, 36.0, 100, 50, 0, 0, 55, 0, 0, 0, 24, 14, 0, 0, 27),
  ('가시공의 창', '메스메르의 강습', 9.5, '표준 / 관통', 'somber_smithing_stone', false, 208, 0, 249, 0, 0, 48.0, 32.0, 32.0, 64.0, 32.0, 100, 49, 0, 0, 0, 0, 0, 0, 14, 35, 0, 18, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '관통' then array['pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 창'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('랜스', 'standard', 'C', 'C', '-', '-', '-'),
  ('랜스', 'heavy', 'A', '-', '-', '-', '-'),
  ('랜스', 'keen', 'E', 'B', '-', '-', '-'),
  ('랜스', 'quality', 'B', 'B', '-', '-', '-'),
  ('랜스', 'fire', 'C', 'E', '-', '-', '-'),
  ('랜스', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('랜스', 'lightning', 'E', 'C', '-', '-', '-'),
  ('랜스', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('랜스', 'magic', 'E', 'E', 'B', '-', '-'),
  ('랜스', 'cold', 'C', 'C', 'B', '-', '-'),
  ('랜스', 'poison', 'C', 'C', '-', '-', 'D'),
  ('랜스', 'blood', 'C', 'C', '-', '-', 'D'),
  ('랜스', 'occult', 'D', 'E', '-', '-', 'B'),
  ('메스메르 병사의 창', 'standard', 'C', 'C', '-', '-', '-'),
  ('메스메르 병사의 창', 'heavy', 'A', '-', '-', '-', '-'),
  ('메스메르 병사의 창', 'keen', 'E', 'B', '-', '-', '-'),
  ('메스메르 병사의 창', 'quality', 'B', 'B', '-', '-', '-'),
  ('메스메르 병사의 창', 'fire', 'C', 'E', '-', '-', '-'),
  ('메스메르 병사의 창', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('메스메르 병사의 창', 'lightning', 'E', 'C', '-', '-', '-'),
  ('메스메르 병사의 창', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('메스메르 병사의 창', 'magic', 'E', 'E', 'B', '-', '-'),
  ('메스메르 병사의 창', 'cold', 'C', 'C', 'B', '-', '-'),
  ('메스메르 병사의 창', 'poison', 'C', 'C', '-', '-', 'D'),
  ('메스메르 병사의 창', 'blood', 'C', 'C', '-', '-', 'D'),
  ('메스메르 병사의 창', 'occult', 'D', 'D', '-', '-', 'A'),
  ('트리 스피어', 'standard', 'D', 'C', '-', 'D', '-'),
  ('큰 뱀 사냥꾼', 'standard', 'A', 'E', '-', '-', '-'),
  ('실루리아의 나무 창', 'standard', 'B', 'D', '-', 'C', '-'),
  ('바이크의 전투 창', 'standard', 'D', 'B', '-', 'C', '-'),
  ('역가시 지팡이창', 'standard', 'D', 'D', '-', 'A', '-'),
  ('혈귀의 성창', 'standard', 'D', 'E', '-', '-', 'B'),
  ('모그윈의 성창', 'standard', 'C', 'D', '-', '-', 'C'),
  ('가시공의 창', 'standard', 'E', 'B', '-', 'C', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 창'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
