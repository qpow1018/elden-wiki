-- 로컬 개발용 데이터. ID는 DB가 부여합니다.
insert into public.item_categories (name, type)
values ('단검', 'weapon')
on conflict (type, name) do nothing;

-- 사용자가 제공한 대거의 기본 전투 기술 정보입니다.
insert into public.weapon_skills (name, description, fp_cost_text)
select
  '퀵스텝',
  E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.',
  '3'
where not exists (
  select 1 from public.weapon_skills where name = '퀵스텝'
);

-- 사용자 확인: 본편 아이템, 공격력·가드 성능은 표준 변질 최대 강화 기준.
insert into public.items (
  name, type, category_id, image_url, content_code, game_description
)
select
  '대거',
  'weapon',
  c.id,
  'https://i.namu.wiki/i/xqXKOrXirHvR_F5Q-ugg4AmBt0rKIpDRJJ41euNpsuk1aTdqPiaeir_K-hQw_6wzr-SQ2lZE6s541kAa3YhQsTmp_jasXGHur9ZjMWo887-IbAzZUEn9_aC4DcmBGB7PrHoHdKyxEU-Os0BpySqGKw.webp',
  'base_game',
  E'검신이 곧은 매우 짧은 단검.\n\n공격력과 공격 범위는 부족하지만\n가벼워서 재빠른 연속 공격이 가능하며\n치명적인 일격의 위력도 높다.'
from public.item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.items
    where name = '대거' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy,
  critical, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy,
  guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith,
  required_arcane
)
select
  i.id, 1.5, array['slash', 'pierce'], 'smithing_stone', s.id,
  181, 0, 0, 0, 0,
  130, 35.0, 20.0, 20.0, 20.0, 20.0,
  15, 0, 0, 0, 0,
  5, 9, 0, 0, 0
from public.items i
join public.item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '대거' and i.type = 'weapon' and c.name = '단검'
  and s.name = '퀵스텝'
on conflict (item_id) do nothing;

-- 기존 로컬 대거에도 새로 합의한 변질 가능 여부를 반영합니다.
update public.weapon_details d
set can_change_affinity = true
from public.items i
join public.item_categories c on c.id = i.category_id
where d.item_id = i.id and i.name = '대거' and i.type = 'weapon'
  and c.name = '단검' and d.can_change_affinity is distinct from true;

insert into public.weapon_scalings (
  item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.items i
join public.item_categories c on c.id = i.category_id
join public.weapon_details d on d.item_id = i.id
cross join (values
  ('standard',  'D', 'B', '-', '-', '-'),
  ('heavy',     'A', '-', '-', '-', '-'),
  ('keen',      'D', 'A', '-', '-', '-'),
  ('quality',   'B', 'B', '-', '-', '-'),
  ('fire',      'B', 'E', '-', '-', '-'),
  ('flame_art', 'E', 'D', '-', 'B', '-'),
  ('lightning', 'E', 'B', '-', '-', '-'),
  ('sacred',    'E', 'D', '-', 'B', '-'),
  ('magic',     'E', 'E', 'B', '-', '-'),
  ('cold',      'D', 'B', 'B', '-', '-'),
  ('poison',    'C', 'B', '-', '-', 'D'),
  ('blood',     'C', 'B', '-', '-', 'D'),
  ('occult',    'E', 'D', '-', '-', 'A')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '대거' and i.type = 'weapon' and c.name = '단검'
on conflict (item_id, affinity) do nothing;

-- 이데스의 검: 변질 가능, 미강화 기본 부가 효과 없음으로 사용자 확인.
insert into public.item_categories (name, type)
values ('경대검', 'weapon')
on conflict (type, name) do nothing;

insert into public.weapon_skills (name, description, fp_cost_text)
select
  '관통 찌르기',
  E'관통 무기로 방패와 대치하기 위한 전투 기술.\n힘을 모아 크게 파고들며 강렬하게 찔러\n방패의 가드를 정면으로 뚫는다.',
  '9 ( - / - )'
where not exists (
  select 1 from public.weapon_skills where name = '관통 찌르기'
);

insert into public.items (
  name, type, category_id, image_url, content_code, game_description
)
select
  '이데스의 검', 'weapon', c.id,
  'https://i.namu.wiki/i/pbb4-4kgjhmXIPruxWpCXMkd6QgpHElDmD5lOQFfWAXZdr3PbbZf_qzFy37Es6sP9of1-wPhFHmfSt8Eu70PUH_c2tBI7bOOl-v4FyoPDzgnpcbKtvdp8xLqxm4aLb51gMYfTt9kdDHegDc3Asv_wQ.webp',
  'tarnished_pack',
  E'대검에 맞먹는 긴 검신을 지녔으면서\n높은 기술로 가볍게 만들어진 경대검.\n\n이데스 땅의 독특한 무기.\n\n형태가 세련되어\n직검과 동등한 속도로 휘두를 수 있다.'
from public.item_categories c
where c.type = 'weapon' and c.name = '경대검'
  and not exists (
    select 1 from public.items
    where name = '이데스의 검' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  item_id, can_change_affinity, weight, physical_attack_types,
  upgrade_material, default_skill_id,
  attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy,
  critical, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy,
  guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith,
  required_arcane
)
select
  i.id, true, 7.0, array['standard', 'pierce'], 'smithing_stone', s.id,
  303, 0, 0, 0, 0,
  100, 65.0, 33.0, 33.0, 33.0, 33.0,
  45, 0, 0, 0, 0,
  10, 15, 0, 0, 0
from public.items i
join public.item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '이데스의 검' and i.type = 'weapon' and c.name = '경대검'
  and s.name = '관통 찌르기'
on conflict (item_id) do nothing;

insert into public.weapon_scalings (
  item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.items i
join public.item_categories c on c.id = i.category_id
join public.weapon_details d on d.item_id = i.id
cross join (values
  ('standard',  'D', 'D', '-', '-', '-'),
  ('heavy',     'B', '-', '-', '-', '-'),
  ('keen',      'E', 'B', '-', '-', '-'),
  ('quality',   'C', 'C', '-', '-', '-'),
  ('fire',      'D', 'E', '-', '-', '-'),
  ('flame_art', 'E', 'E', '-', 'C', '-'),
  ('lightning', 'E', 'D', '-', '-', '-'),
  ('sacred',    'E', 'E', '-', 'C', '-'),
  ('magic',     'E', 'E', 'C', '-', '-'),
  ('cold',      'D', 'C', 'D', '-', '-'),
  ('poison',    'D', 'C', '-', '-', 'D'),
  ('blood',     'D', 'C', '-', '-', 'D'),
  ('occult',    'E', 'E', '-', '-', 'C')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '이데스의 검' and i.type = 'weapon' and c.name = '경대검'
on conflict (item_id, affinity) do nothing;

-- 문리델의 기사검: 사용자 제공 자료와 확인에 따른 두 번째 개발 샘플.
insert into public.item_categories (name, type)
values ('특대검', 'weapon')
on conflict (type, name) do nothing;

insert into public.weapon_skills (name, description, fp_cost_text)
select
  '거검진',
  E'트롤 마술기사들의 전투 기술.\n가대한 마력 휘검으로 원진을 펼친다.\n휘검은 자동으로 가까운 적을 향해 날아간다.\n강 공격으로 뛰어드는 찌르기로 이을 수 있다.',
  '16 ( - / 6 )'
where not exists (
  select 1 from public.weapon_skills where name = '거검진'
);

insert into public.items (
  name, type, category_id, image_url, content_code, game_description
)
select
  '문리델의 기사검',
  'weapon',
  c.id,
  'https://i.namu.wiki/i/78XYnD5uv4YbcJYQvK-VJEAu4kcLx5EZd6qyP4PELikC-8gndqCZIoNWmgfItdHO1Jf_lngD-l8RyJ4hRC7QZYdOWYqtIsQ4zLNNWLS_oSntisT-30a_UAUmxWbkCmPerLsypZvJwuJJtM7PJUmW1A.webp',
  'shadow_of_the_erdtree',
  E'검신에 파란 휘석이 박힌 대검.\n괴력의 카리아 기사 문리델의 무기.\n\n쌍월의 시종인 문리델은\n왕가를 섬기던 트롤들의 친구로\n그들의 무기를 함께 들었다고 한다.'
from public.item_categories c
where c.type = 'weapon' and c.name = '특대검'
  and not exists (
    select 1 from public.items
    where name = '문리델의 기사검' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  item_id, can_change_affinity, weight, physical_attack_types,
  upgrade_material, default_skill_id,
  attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy,
  critical, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy,
  guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith,
  required_arcane
)
select
  i.id, false, 18.0, array['standard'], 'somber_smithing_stone', s.id,
  303, 196, 0, 0, 0,
  100, 70.0, 55.0, 43.0, 43.0, 43.0,
  55, 0, 0, 0, 0,
  20, 14, 18, 0, 0
from public.items i
join public.item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '문리델의 기사검' and i.type = 'weapon' and c.name = '특대검'
  and s.name = '거검진'
on conflict (item_id) do nothing;

insert into public.weapon_scalings (
  item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, 'standard', 'C', 'C', 'D', '-', '-'
from public.items i
join public.item_categories c on c.id = i.category_id
join public.weapon_details d on d.item_id = i.id
where i.name = '문리델의 기사검' and i.type = 'weapon' and c.name = '특대검'
on conflict (item_id, affinity) do nothing;

-- 사용자 확인: 세 샘플 무기 모두 기본 수면·발광 축적이 없습니다.
update public.weapon_details d
set sleep = 0, madness = 0
from public.items i
where d.item_id = i.id and i.type = 'weapon'
  and i.name in ('대거', '문리델의 기사검', '이데스의 검')
  and (d.sleep is distinct from 0 or d.madness is distinct from 0);

-- 온 지혜 방어구 5종: 사용자 제공 EIP 표의 수치·이미지를 그대로 사용합니다.
-- 한국어 이름은 한국어 방어구 자료와 대조했으며 게임 내 원문·부가 효과는 미입력입니다.
insert into public.items (name, type, category_id, image_url, content_code)
select '온 지혜의 갑옷', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_209-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'armor' and c.name = '갑옷'
  and not exists (
    select 1 from public.items
    where name = '온 지혜의 갑옷' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 10.7, 16, 12.9, 11.9, 13.5, 11.9, 12.4, 9.5, 10.2, 8.8, 28, 46, 21, 21
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '온 지혜의 갑옷' and i.type = 'armor' and c.name = '갑옷'
on conflict (item_id) do nothing;

insert into public.items (name, type, category_id, image_url, content_code)
select '온 지혜의 갑옷(경장)', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_140-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'armor' and c.name = '갑옷'
  and not exists (
    select 1 from public.items
    where name = '온 지혜의 갑옷(경장)' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 9.3, 13, 12.4, 10.9, 12.9, 11.4, 11.4, 8.8, 9.5, 8, 22, 38, 16, 16
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '온 지혜의 갑옷(경장)' and i.type = 'armor' and c.name = '갑옷'
on conflict (item_id) do nothing;

insert into public.items (name, type, category_id, image_url, content_code)
select '온 지혜의 장갑', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_186-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'armor' and c.name = '장갑'
  and not exists (
    select 1 from public.items
    where name = '온 지혜의 장갑' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 3.5, 4, 3.2, 2.9, 3.3, 2.9, 3.1, 2.3, 2.5, 2.1, 9, 15, 7, 7
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '온 지혜의 장갑' and i.type = 'armor' and c.name = '장갑'
on conflict (item_id) do nothing;

insert into public.items (name, type, category_id, image_url, content_code)
select '온 지혜의 각반', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_163-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'armor' and c.name = '각반'
  and not exists (
    select 1 from public.items
    where name = '온 지혜의 각반' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 6.6, 10, 7.4, 6.8, 7.7, 6.8, 7.1, 5.4, 5.8, 5, 17, 29, 13, 13
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '온 지혜의 각반' and i.type = 'armor' and c.name = '각반'
on conflict (item_id) do nothing;

insert into public.items (name, type, category_id, image_url, content_code)
select '온 지혜의 투구', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_232-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'armor' and c.name = '투구'
  and not exists (
    select 1 from public.items
    where name = '온 지혜의 투구' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 4.6, 5, 4.6, 4.2, 4.8, 4.2, 4.4, 3.4, 3.6, 3.1, 12, 20, 9, 9
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '온 지혜의 투구' and i.type = 'armor' and c.name = '투구'
on conflict (item_id) do nothing;

-- 사용자 제공 EIP 표의 탈리스만 샘플. 효과 설명은 합의한 한국어 요약입니다.
insert into public.items (
  name, type, category_id, image_url, content_code, effect_description
)
select '선조령의 뿔', 'talisman', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_06_020-150x150.png.webp',
  'base_game', '적을 쓰러뜨리면 FP를 3 회복한다.'
from public.item_categories c
where c.type = 'talisman' and c.name = '탈리스만'
  and not exists (
    select 1 from public.items
    where name = '선조령의 뿔' and type = 'talisman' and category_id = c.id
  );

insert into public.talisman_details (item_id, weight)
select i.id, 1.2
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '선조령의 뿔' and i.type = 'talisman' and c.name = '탈리스만'
on conflict (item_id) do nothing;

insert into public.items (
  name, type, category_id, image_url, content_code, effect_description
)
select '먼 화살의 탈리스만', 'talisman', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_06_125-150x150.png.webp',
  'base_game', '활과 석궁의 유효 사거리가 증가한다.'
from public.item_categories c
where c.type = 'talisman' and c.name = '탈리스만'
  and not exists (
    select 1 from public.items
    where name = '먼 화살의 탈리스만' and type = 'talisman' and category_id = c.id
  );

insert into public.talisman_details (item_id, weight)
select i.id, 0.7
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '먼 화살의 탈리스만' and i.type = 'talisman' and c.name = '탈리스만'
on conflict (item_id) do nothing;

insert into public.items (
  name, type, category_id, image_url, content_code, effect_description
)
select '튼튼한 화살의 탈리스만', 'talisman', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_06_105-150x150.png.webp',
  'base_game', '화살과 볼트의 공격력이 10% 증가한다.'
from public.item_categories c
where c.type = 'talisman' and c.name = '탈리스만'
  and not exists (
    select 1 from public.items
    where name = '튼튼한 화살의 탈리스만' and type = 'talisman' and category_id = c.id
  );

insert into public.talisman_details (item_id, weight)
select i.id, 0.7
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '튼튼한 화살의 탈리스만' and i.type = 'talisman' and c.name = '탈리스만'
on conflict (item_id) do nothing;

insert into public.items (
  name, type, category_id, image_url, content_code, effect_description
)
select '무구 덩어리 부적', 'talisman', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_06_208-150x150.png.webp',
  'base_game', '장비 중량 상한이 15% 증가한다.'
from public.item_categories c
where c.type = 'talisman' and c.name = '탈리스만'
  and not exists (
    select 1 from public.items
    where name = '무구 덩어리 부적' and type = 'talisman' and category_id = c.id
  );

insert into public.talisman_details (item_id, weight)
select i.id, 1.5
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '무구 덩어리 부적' and i.type = 'talisman' and c.name = '탈리스만'
on conflict (item_id) do nothing;

-- 사용자 확인: EIP 주문 표에서 생략된 필요 능력치는 요구 없음(0)입니다.
-- 미제공 FP·설명은 미확인(NULL)으로 유지합니다.
insert into public.items (name, type, category_id, image_url, content_code)
select '아듀라의 달의 검', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_180-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'spell' and c.name = '마술'
  and not exists (
    select 1 from public.items
    where name = '아듀라의 달의 검' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 32, 0, 0
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '아듀라의 달의 검' and i.type = 'spell' and c.name = '마술'
on conflict (item_id) do nothing;

insert into public.items (name, type, category_id, image_url, content_code)
select '아길의 화염', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_130-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'spell' and c.name = '기도'
  and not exists (
    select 1 from public.items
    where name = '아길의 화염' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 0, 23, 15
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '아길의 화염' and i.type = 'spell' and c.name = '기도'
on conflict (item_id) do nothing;

insert into public.items (name, type, category_id, image_url, content_code)
select '기습의 돌팔매', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_065-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'spell' and c.name = '마술'
  and not exists (
    select 1 from public.items
    where name = '기습의 돌팔매' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 23, 0, 0
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '기습의 돌팔매' and i.type = 'spell' and c.name = '마술'
on conflict (item_id) do nothing;

insert into public.items (name, type, category_id, image_url, content_code)
select '옛 죽음의 영혼', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_041-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'spell' and c.name = '마술'
  and not exists (
    select 1 from public.items
    where name = '옛 죽음의 영혼' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 34, 24, 0
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '옛 죽음의 영혼' and i.type = 'spell' and c.name = '마술'
on conflict (item_id) do nothing;

insert into public.items (name, type, category_id, image_url, content_code)
select '고룡의 뇌창', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_016-150x150.png.webp',
  'base_game'
from public.item_categories c
where c.type = 'spell' and c.name = '기도'
  and not exists (
    select 1 from public.items
    where name = '고룡의 뇌창' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 0, 32, 0
from public.items i
join public.item_categories c on c.id = i.category_id
where i.name = '고룡의 뇌창' and i.type = 'spell' and c.name = '기도'
on conflict (item_id) do nothing;

-- 기존 로컬 주문 샘플에도 사용자 확인한 요구 없음(0)을 반영합니다.
update public.spell_details d
set required_intelligence = coalesce(d.required_intelligence, 0),
    required_faith = coalesce(d.required_faith, 0),
    required_arcane = coalesce(d.required_arcane, 0)
from public.items i
where d.item_id = i.id and i.type = 'spell'
  and i.name in ('아듀라의 달의 검', '아길의 화염', '기습의 돌팔매', '옛 죽음의 영혼', '고룡의 뇌창')
  and (d.required_intelligence is null or d.required_faith is null or d.required_arcane is null);
