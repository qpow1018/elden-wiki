-- 로컬 개발용 데이터. ID는 DB가 부여합니다.
insert into public.game_item_categories (name, type)
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
insert into public.game_items (
  name, type, category_id, image_url, content_code, game_description
)
select
  '대거',
  'weapon',
  c.id,
  'https://i.namu.wiki/i/xqXKOrXirHvR_F5Q-ugg4AmBt0rKIpDRJJ41euNpsuk1aTdqPiaeir_K-hQw_6wzr-SQ2lZE6s541kAa3YhQsTmp_jasXGHur9ZjMWo887-IbAzZUEn9_aC4DcmBGB7PrHoHdKyxEU-Os0BpySqGKw.webp',
  'base_game',
  E'검신이 곧은 매우 짧은 단검.\n\n공격력과 공격 범위는 부족하지만\n가벼워서 재빠른 연속 공격이 가능하며\n치명적인 일격의 위력도 높다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '대거' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
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
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '대거' and i.type = 'weapon' and c.name = '단검'
  and s.name = '퀵스텝'
on conflict (game_item_id) do nothing;

-- 기존 로컬 대거에도 새로 합의한 변질 가능 여부를 반영합니다.
update public.weapon_details d
set can_change_affinity = true
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where d.game_item_id = i.id and i.name = '대거' and i.type = 'weapon'
  and c.name = '단검' and d.can_change_affinity is distinct from true;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
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
on conflict (game_item_id, affinity) do nothing;

-- 이데스의 검: 변질 가능, 미강화 기본 부가 효과 없음으로 사용자 확인.
insert into public.game_item_categories (name, type)
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

insert into public.game_items (
  name, type, category_id, image_url, content_code, game_description
)
select
  '이데스의 검', 'weapon', c.id,
  'https://i.namu.wiki/i/pbb4-4kgjhmXIPruxWpCXMkd6QgpHElDmD5lOQFfWAXZdr3PbbZf_qzFy37Es6sP9of1-wPhFHmfSt8Eu70PUH_c2tBI7bOOl-v4FyoPDzgnpcbKtvdp8xLqxm4aLb51gMYfTt9kdDHegDc3Asv_wQ.webp',
  'tarnished_pack',
  E'대검에 맞먹는 긴 검신을 지녔으면서\n높은 기술로 가볍게 만들어진 경대검.\n\n이데스 땅의 독특한 무기.\n\n형태가 세련되어\n직검과 동등한 속도로 휘두를 수 있다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '경대검'
  and not exists (
    select 1 from public.game_items
    where name = '이데스의 검' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, can_change_affinity, weight, physical_attack_types,
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
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '이데스의 검' and i.type = 'weapon' and c.name = '경대검'
  and s.name = '관통 찌르기'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
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
on conflict (game_item_id, affinity) do nothing;

-- 문리델의 기사검: 사용자 제공 자료와 확인에 따른 두 번째 개발 샘플.
insert into public.game_item_categories (name, type)
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

insert into public.game_items (
  name, type, category_id, image_url, content_code, game_description
)
select
  '문리델의 기사검',
  'weapon',
  c.id,
  'https://i.namu.wiki/i/78XYnD5uv4YbcJYQvK-VJEAu4kcLx5EZd6qyP4PELikC-8gndqCZIoNWmgfItdHO1Jf_lngD-l8RyJ4hRC7QZYdOWYqtIsQ4zLNNWLS_oSntisT-30a_UAUmxWbkCmPerLsypZvJwuJJtM7PJUmW1A.webp',
  'shadow_of_the_erdtree',
  E'검신에 파란 휘석이 박힌 대검.\n괴력의 카리아 기사 문리델의 무기.\n\n쌍월의 시종인 문리델은\n왕가를 섬기던 트롤들의 친구로\n그들의 무기를 함께 들었다고 한다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '특대검'
  and not exists (
    select 1 from public.game_items
    where name = '문리델의 기사검' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, can_change_affinity, weight, physical_attack_types,
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
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '문리델의 기사검' and i.type = 'weapon' and c.name = '특대검'
  and s.name = '거검진'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, 'standard', 'C', 'C', 'D', '-', '-'
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
where i.name = '문리델의 기사검' and i.type = 'weapon' and c.name = '특대검'
on conflict (game_item_id, affinity) do nothing;

-- 사용자 확인: 세 샘플 무기 모두 기본 수면·발광 축적이 없습니다.
update public.weapon_details d
set sleep = 0, madness = 0
from public.game_items i
where d.game_item_id = i.id and i.type = 'weapon'
  and i.name in ('대거', '문리델의 기사검', '이데스의 검')
  and (d.sleep is distinct from 0 or d.madness is distinct from 0);

-- 온 지혜 방어구 5종: 사용자 제공 EIP 표의 수치·이미지를 그대로 사용합니다.
-- 한국어 이름은 한국어 방어구 자료와 대조했으며 게임 내 원문·부가 효과는 미입력입니다.
insert into public.game_items (name, type, category_id, image_url, content_code)
select '온 지혜의 갑옷', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_209-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'armor' and c.name = '갑옷'
  and not exists (
    select 1 from public.game_items
    where name = '온 지혜의 갑옷' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  game_item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 10.7, 16, 12.9, 11.9, 13.5, 11.9, 12.4, 9.5, 10.2, 8.8, 28, 46, 21, 21
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '온 지혜의 갑옷' and i.type = 'armor' and c.name = '갑옷'
on conflict (game_item_id) do nothing;

insert into public.game_items (name, type, category_id, image_url, content_code)
select '온 지혜의 갑옷(경장)', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_140-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'armor' and c.name = '갑옷'
  and not exists (
    select 1 from public.game_items
    where name = '온 지혜의 갑옷(경장)' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  game_item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 9.3, 13, 12.4, 10.9, 12.9, 11.4, 11.4, 8.8, 9.5, 8, 22, 38, 16, 16
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '온 지혜의 갑옷(경장)' and i.type = 'armor' and c.name = '갑옷'
on conflict (game_item_id) do nothing;

insert into public.game_items (name, type, category_id, image_url, content_code)
select '온 지혜의 장갑', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_186-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'armor' and c.name = '장갑'
  and not exists (
    select 1 from public.game_items
    where name = '온 지혜의 장갑' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  game_item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 3.5, 4, 3.2, 2.9, 3.3, 2.9, 3.1, 2.3, 2.5, 2.1, 9, 15, 7, 7
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '온 지혜의 장갑' and i.type = 'armor' and c.name = '장갑'
on conflict (game_item_id) do nothing;

insert into public.game_items (name, type, category_id, image_url, content_code)
select '온 지혜의 각반', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_163-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'armor' and c.name = '각반'
  and not exists (
    select 1 from public.game_items
    where name = '온 지혜의 각반' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  game_item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 6.6, 10, 7.4, 6.8, 7.7, 6.8, 7.1, 5.4, 5.8, 5, 17, 29, 13, 13
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '온 지혜의 각반' and i.type = 'armor' and c.name = '각반'
on conflict (game_item_id) do nothing;

insert into public.game_items (name, type, category_id, image_url, content_code)
select '온 지혜의 투구', 'armor', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_04_232-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'armor' and c.name = '투구'
  and not exists (
    select 1 from public.game_items
    where name = '온 지혜의 투구' and type = 'armor' and category_id = c.id
  );

insert into public.armor_details (
  game_item_id, weight, poise,
  negation_physical, negation_strike, negation_slash, negation_pierce,
  negation_magic, negation_fire, negation_lightning, negation_holy,
  immunity, robustness, focus, vitality
)
select i.id, 4.6, 5, 4.6, 4.2, 4.8, 4.2, 4.4, 3.4, 3.6, 3.1, 12, 20, 9, 9
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '온 지혜의 투구' and i.type = 'armor' and c.name = '투구'
on conflict (game_item_id) do nothing;

-- 사용자 제공 EIP 표의 탈리스만 샘플. 효과 설명은 합의한 한국어 요약입니다.
insert into public.game_items (
  name, type, category_id, image_url, content_code, effect_description
)
select '선조령의 뿔', 'talisman', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_06_020-150x150.png.webp',
  'base_game', '적을 쓰러뜨리면 FP를 3 회복한다.'
from public.game_item_categories c
where c.type = 'talisman' and c.name = '탈리스만'
  and not exists (
    select 1 from public.game_items
    where name = '선조령의 뿔' and type = 'talisman' and category_id = c.id
  );

insert into public.talisman_details (game_item_id, weight)
select i.id, 1.2
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '선조령의 뿔' and i.type = 'talisman' and c.name = '탈리스만'
on conflict (game_item_id) do nothing;

insert into public.game_items (
  name, type, category_id, image_url, content_code, effect_description
)
select '먼 화살의 탈리스만', 'talisman', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_06_125-150x150.png.webp',
  'base_game', '활과 석궁의 유효 사거리가 증가한다.'
from public.game_item_categories c
where c.type = 'talisman' and c.name = '탈리스만'
  and not exists (
    select 1 from public.game_items
    where name = '먼 화살의 탈리스만' and type = 'talisman' and category_id = c.id
  );

insert into public.talisman_details (game_item_id, weight)
select i.id, 0.7
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '먼 화살의 탈리스만' and i.type = 'talisman' and c.name = '탈리스만'
on conflict (game_item_id) do nothing;

insert into public.game_items (
  name, type, category_id, image_url, content_code, effect_description
)
select '튼튼한 화살의 탈리스만', 'talisman', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_06_105-150x150.png.webp',
  'base_game', '화살과 볼트의 공격력이 10% 증가한다.'
from public.game_item_categories c
where c.type = 'talisman' and c.name = '탈리스만'
  and not exists (
    select 1 from public.game_items
    where name = '튼튼한 화살의 탈리스만' and type = 'talisman' and category_id = c.id
  );

insert into public.talisman_details (game_item_id, weight)
select i.id, 0.7
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '튼튼한 화살의 탈리스만' and i.type = 'talisman' and c.name = '탈리스만'
on conflict (game_item_id) do nothing;

insert into public.game_items (
  name, type, category_id, image_url, content_code, effect_description
)
select '무구 덩어리 부적', 'talisman', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_06_208-150x150.png.webp',
  'base_game', '장비 중량 상한이 15% 증가한다.'
from public.game_item_categories c
where c.type = 'talisman' and c.name = '탈리스만'
  and not exists (
    select 1 from public.game_items
    where name = '무구 덩어리 부적' and type = 'talisman' and category_id = c.id
  );

insert into public.talisman_details (game_item_id, weight)
select i.id, 1.5
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '무구 덩어리 부적' and i.type = 'talisman' and c.name = '탈리스만'
on conflict (game_item_id) do nothing;

-- 사용자 확인: EIP 주문 표에서 생략된 필요 능력치는 요구 없음(0)입니다.
-- 미제공 FP·설명은 미확인(NULL)으로 유지합니다.
insert into public.game_items (name, type, category_id, image_url, content_code)
select '아듀라의 달의 검', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_180-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'spell' and c.name = '마술'
  and not exists (
    select 1 from public.game_items
    where name = '아듀라의 달의 검' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  game_item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 32, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '아듀라의 달의 검' and i.type = 'spell' and c.name = '마술'
on conflict (game_item_id) do nothing;

insert into public.game_items (name, type, category_id, image_url, content_code)
select '아길의 화염', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_130-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'spell' and c.name = '기도'
  and not exists (
    select 1 from public.game_items
    where name = '아길의 화염' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  game_item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 0, 23, 15
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '아길의 화염' and i.type = 'spell' and c.name = '기도'
on conflict (game_item_id) do nothing;

insert into public.game_items (name, type, category_id, image_url, content_code)
select '기습의 돌팔매', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_065-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'spell' and c.name = '마술'
  and not exists (
    select 1 from public.game_items
    where name = '기습의 돌팔매' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  game_item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 23, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '기습의 돌팔매' and i.type = 'spell' and c.name = '마술'
on conflict (game_item_id) do nothing;

insert into public.game_items (name, type, category_id, image_url, content_code)
select '옛 죽음의 영혼', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_041-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'spell' and c.name = '마술'
  and not exists (
    select 1 from public.game_items
    where name = '옛 죽음의 영혼' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  game_item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 34, 24, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '옛 죽음의 영혼' and i.type = 'spell' and c.name = '마술'
on conflict (game_item_id) do nothing;

insert into public.game_items (name, type, category_id, image_url, content_code)
select '고룡의 뇌창', 'spell', c.id,
  'https://eip.gg/wp-content/uploads/2022/03/SB_ICON_02_A_016-150x150.png.webp',
  'base_game'
from public.game_item_categories c
where c.type = 'spell' and c.name = '기도'
  and not exists (
    select 1 from public.game_items
    where name = '고룡의 뇌창' and type = 'spell' and category_id = c.id
  );

insert into public.spell_details (
  game_item_id, slots_used, required_intelligence, required_faith, required_arcane
)
select i.id, 1, 0, 32, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where i.name = '고룡의 뇌창' and i.type = 'spell' and c.name = '기도'
on conflict (game_item_id) do nothing;

-- 기존 로컬 주문 샘플에도 사용자 확인한 요구 없음(0)을 반영합니다.
update public.spell_details d
set required_intelligence = coalesce(d.required_intelligence, 0),
    required_faith = coalesce(d.required_faith, 0),
    required_arcane = coalesce(d.required_arcane, 0)
from public.game_items i
where d.game_item_id = i.id and i.type = 'spell'
  and i.name in ('아듀라의 달의 검', '아길의 화염', '기습의 돌팔매', '옛 죽음의 영혼', '고룡의 뇌창')
  and (d.required_intelligence is null or d.required_faith is null or d.required_arcane is null);

-- 사용자 제공 한국어 전회 자료의 원문·FP·기본 변질·적용 대상·이미지입니다.
insert into public.weapon_skills (name, description, fp_cost_text)
select '파고들어 올려 베기', E'무기를 들고 몸을 굳혀서 낮게 파고들어\n순간적으로 강인도를 높이는 전투 기술.\n강 공격을 하면 올려 베기로 이을 수 있다.', '5 (-/8)'
where not exists (select 1 from public.weapon_skills where name = '파고들어 올려 베기');

insert into public.game_items (name, type, category_id, image_url, content_code, game_description)
select '전회「파고들어 올려 베기」', 'ash_of_war', c.id,
  'https://i.namu.wiki/i/d491eSJ83FJDhjkl6MRXBQ53ZB_c3wC9bVNM2eNmItogGGl2kiUrAJJZ7t_CK2qpPFfjg_y7bCF2Jyrp65exhsUh1Cv_M6W78vCOZnjykPBKWaz8IT5UQGJFAoyZWbrscBo8l2WI_od4H4LcSpM8_Q.webp',
  'base_game', E'무기에 속성과 전투 기술을 부여 가능한 전회.\n속성은 「중후」, 전투 기술은 아래와 같다.\n\n전투 기술 「파고들어 올려 베기」\n무기를 들고 몸을 굳혀서 낮게 파고들어\n순간적으로 강인도를 높이는 전투 기술.\n강 공격을 하면 올려 베기로 이을 수 있다.\n\n검/도끼/망치에 사용 가능.\n(소형/중형 검 제외)'
from public.game_item_categories c
where c.type = 'ash_of_war' and c.name = '전회'
  and not exists (
    select 1 from public.game_items
    where name = '전회「파고들어 올려 베기」' and type = 'ash_of_war' and category_id = c.id
  );

insert into public.ash_of_war_details (game_item_id, skill_id, native_affinity, applicable_armaments_text)
select i.id, s.id, 'heavy', E'검/도끼/망치에 사용 가능.\n(소형/중형 검 제외)'
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '전회「파고들어 올려 베기」' and i.type = 'ash_of_war' and c.name = '전회'
  and s.name = '파고들어 올려 베기'
on conflict (game_item_id) do nothing;

insert into public.weapon_skills (name, description, fp_cost_text)
select '파고들어 회전 베기', E'무기를 들고 몸을 굳혀서 낮게 파고들어\n순간적으로 강인도를 높이는 전투 기술.\n강 공격을 하면 회전 베기로 이을 수 있다.', '5 (-/8)'
where not exists (select 1 from public.weapon_skills where name = '파고들어 회전 베기');

insert into public.game_items (name, type, category_id, image_url, content_code, game_description)
select '전회「파고들어 회전 베기」', 'ash_of_war', c.id,
  'https://i.namu.wiki/i/9BamfSbw_vH6ykjcdlkXJOQQM64DebLNLZNy-D5rtpLA-2iTJABKUNkBGe8YyHHyQPND2sPAqQmw89GRA34ULYzlBComAncGb93-NaRJMZrwhr_Bk0myh-QRXaukjWukY56rN46hMtNlw0_jP0p9oA.webp',
  'base_game', E'무기에 속성과 전투 기술을 부여 가능한 전회.\n속성은 「중후」, 전투 기술은 아래와 같다.\n\n전투 기술 「파고들어 회전 베기」\n무기를 들고 몸을 굳혀서 낮게 파고들어\n순간적으로 강인도를 높이는 전투 기술.\n강 공격을 하면 회전 베기로 이을 수 있다.\n\n검/도끼/망치에 사용 가능.\n(소형/중형 검 제외)'
from public.game_item_categories c
where c.type = 'ash_of_war' and c.name = '전회'
  and not exists (
    select 1 from public.game_items
    where name = '전회「파고들어 회전 베기」' and type = 'ash_of_war' and category_id = c.id
  );

insert into public.ash_of_war_details (game_item_id, skill_id, native_affinity, applicable_armaments_text)
select i.id, s.id, 'heavy', E'검/도끼/망치에 사용 가능.\n(소형/중형 검 제외)'
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '전회「파고들어 회전 베기」' and i.type = 'ash_of_war' and c.name = '전회'
  and s.name = '파고들어 회전 베기'
on conflict (game_item_id) do nothing;

insert into public.weapon_skills (name, description, fp_cost_text)
select '휘석 돌팔매', E'동명의 휘석 마술을 사용하는 전투 기술.\n강공격으로 크게 파고드는 찌르기로 이으며\n그 공격에는 휘석의 마력이 남아 있다.', '8 ( - / 4 )'
where not exists (select 1 from public.weapon_skills where name = '휘석 돌팔매');

insert into public.game_items (name, type, category_id, image_url, content_code, game_description)
select '전회「휘석 돌팔매」', 'ash_of_war', c.id,
  'https://i.namu.wiki/i/KL5t7hTyM0ysHbDCx-fb1aV5TV48iEtf6-LfgzI0ccs_nQ1v8kYBplEG3yA06v14J4DSBBs0OsfGiQtKwxd3__y7xcODyBv1ClMykEzAumctwN6PAWz5NwxQvsm0Bvvgr-B2nOigOcWQm2AcycDiSg.webp',
  'base_game', E'무기에 속성과 전투 기술을 부여 가능한 전회.\n속성은 「마력」, 전투 기술은 아래와 같다.\n\n전투 기술 「휘석 돌팔매」\n동명의 휘석 마술을 사용하는 전투 기술.\n강공격으로 크게 파고드는 찌르기로 이으며\n그 공격에는 휘석의 마력이 남아 있다.\n\n검에 더하여\n관통 가능한 긴 자루 무기에 사용 가능.\n(특대형 제외)'
from public.game_item_categories c
where c.type = 'ash_of_war' and c.name = '전회'
  and not exists (
    select 1 from public.game_items
    where name = '전회「휘석 돌팔매」' and type = 'ash_of_war' and category_id = c.id
  );

insert into public.ash_of_war_details (game_item_id, skill_id, native_affinity, applicable_armaments_text)
select i.id, s.id, 'magic', E'검에 더하여\n관통 가능한 긴 자루 무기에 사용 가능.\n(특대형 제외)'
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '전회「휘석 돌팔매」' and i.type = 'ash_of_war' and c.name = '전회'
  and s.name = '휘석 돌팔매'
on conflict (game_item_id) do nothing;

insert into public.weapon_skills (name, description, fp_cost_text)
select '휘검의 원진', E'카리아 왕가를 섬긴 마술 기사들의 전투 기술.\n마력 휘검을 반원으로 띄워 자동으로 공격한다.\n강공격으로 크게 파고드는 찌르기로 잇는다.', '10 ( - / 4 )'
where not exists (select 1 from public.weapon_skills where name = '휘검의 원진');

insert into public.game_items (name, type, category_id, image_url, content_code, game_description)
select '전회「휘검의 원진」', 'ash_of_war', c.id,
  'https://i.namu.wiki/i/Ea3cstWnIRrOoQTEuO3I0Oz8m5FcSccFAZn0efnCgpPcskRs4XIGpnILzQ-zBiVZzA7IyGEE06Ys-ELvVHrLc6S1D6V2puayjXabyVPTOJGDnXcM_YAQUdgE7y4pt4RMxsMm6Zn4lkRjVRh3xI3kQg.webp',
  'base_game', E'무기에 속성과 전투 기술을 부여 가능한 전회.\n속성은 「마력」, 전투 기술은 아래와 같다.\n\n전투 기술 「휘검의 원진」\n카리아 왕가를 섬긴 마술 기사들의 전투 기술.\n마력 휘검을 반원으로 띄워 자동으로 공격한다.\n강공격으로 크게 파고드는 찌르기로 잇는다.\n\n검에 더하여\n관통 가능한 긴 자루 무기에 사용 가능.\n(특대형 제외)'
from public.game_item_categories c
where c.type = 'ash_of_war' and c.name = '전회'
  and not exists (
    select 1 from public.game_items
    where name = '전회「휘검의 원진」' and type = 'ash_of_war' and category_id = c.id
  );

insert into public.ash_of_war_details (game_item_id, skill_id, native_affinity, applicable_armaments_text)
select i.id, s.id, 'magic', E'검에 더하여\n관통 가능한 긴 자루 무기에 사용 가능.\n(특대형 제외)'
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join public.weapon_skills s
where i.name = '전회「휘검의 원진」' and i.type = 'ash_of_war' and c.name = '전회'
  and s.name = '휘검의 원진'
on conflict (game_item_id) do nothing;

-- 사용자 제공 결정 물방울 자료. 효과 수치·지속 시간은 설명으로만 저장합니다.
insert into public.game_items (
  name, type, category_id, image_url, content_code, game_description, effect_description
)
select '붉은 결정 물방울', 'crystal_tear', c.id,
  'https://i.namu.wiki/i/CvDRq_-2FqteVMDos97jzR1fAAQtITU0LyuNXsIFpgykM6DwvT7ZdLpYQUMG4vbxW78mTytyz35QYTeyBc3Ecep_K3rwEkTKsjP0b-ZQJwixlSLdO99cD0-l7rENgMHbsQ23C_xAVWZLgGIHQonQPA.webp',
  'base_game',
  E'황금 나무의 은혜가 내리는 땅에\n오랜 세월이 지나 생겨난 결정 물방울.\n\n「영약의 성배병」에 배합하여\n최대 HP의 반만큼 회복한다.',
  '최대 HP의 50%를 회복한다.'
from public.game_item_categories c
where c.type = 'crystal_tear' and c.name = '결정 물방울'
  and not exists (
    select 1 from public.game_items
    where name = '붉은 결정 물방울' and type = 'crystal_tear' and category_id = c.id
  );

insert into public.game_items (
  name, type, category_id, image_url, content_code, game_description, effect_description
)
select '넘친 붉은 결정 물방울', 'crystal_tear', c.id,
  'https://i.namu.wiki/i/llTXFZh2NYgvLaxe3u71KqBItEUQWgJk4cVxeeEOOfwF2Alz3tejXReClR2K5js-F9ANAv58iO-7X-pjvrjuX5MQcWbdGd-wnGbZr0EHXl8KfKgpLkhKQAm1_Z9lpAlwg-gKX56PkjnDlrGS2yF27w.webp',
  'base_game',
  E'황금 나무의 은혜가 내리는 땅에\n오랜 세월이 지나 생겨난 결정 물방울.\n\n「영약의 성배병」에 배합하여\n일시적으로 최대 HP를 증가시킨다.',
  '3분 동안 최대 HP가 10% 증가한다.'
from public.game_item_categories c
where c.type = 'crystal_tear' and c.name = '결정 물방울'
  and not exists (
    select 1 from public.game_items
    where name = '넘친 붉은 결정 물방울' and type = 'crystal_tear' and category_id = c.id
  );

insert into public.game_items (
  name, type, category_id, image_url, content_code, game_description, effect_description
)
select '샘솟는 붉은 결정 물방울', 'crystal_tear', c.id,
  'https://i.namu.wiki/i/O2TfUEYyuv_w6Cilb3V_oETk6jYlCP0RQpPHIthhoTAMEoaOONSCa6vtWFbMKjxvTgT5h3LrY9OtCKp6i9mI6kjm3BgwwKg1nargt760LeWIvpVZmaZUqYR89JEGgrbduAVYt_rcty2n59Bv_GSU0A.webp',
  'base_game',
  E'황금 나무의 은혜가 내리는 땅에\n오랜 세월이 지나 생겨난 결정 물방울.\n\n「영약의 성배병」에 배합하여\n일정 시간 HP가 조금씩 회복한다.',
  '3분 동안 초당 HP를 7씩, 총 1260 회복한다.'
from public.game_item_categories c
where c.type = 'crystal_tear' and c.name = '결정 물방울'
  and not exists (
    select 1 from public.game_items
    where name = '샘솟는 붉은 결정 물방울' and type = 'crystal_tear' and category_id = c.id
  );

-- 2026-11-03 사용자 제공 나무위키 단검 17종: 로컬 테스트 전용.
-- 출처: https://namu.wiki/w/엘든%20링/무기/소형%20무기#s-2
-- 적용 버전 미확인. 변질 표의 -를 그대로 보존하며 기본→최대 보정은 최대 값을 사용합니다.
-- 수치 표의 -는 0, 이미지 미제공은 NULL. 공략·평가·획득 해설은 저장하지 않습니다.
-- DLC 표기는 콘텐츠 소속에 반영합니다. 변질별 표는 변질 가능, 기본→최대 표는 변질 불가로 입력합니다.
-- 협차 기술명은 본문의 퀵스텝을 사용하며, 패리 FP 차이(패링 대거 - / 맹고슈 3)는 원문대로 구분합니다.

-- 패링 대거
insert into public.weapon_skills (name, description, fp_cost_text)
select '패리', E'근접 공격의 타이밍에 맞춰 사용해 공격을\n피하고 적의 자세를 무너뜨리는 전투 기술.\n치명적인 일격을 가할 기회가 된다.', '-'
where not exists (
  select 1 from public.weapon_skills
  where name = '패리' and description = E'근접 공격의 타이밍에 맞춰 사용해 공격을\n피하고 적의 자세를 무너뜨리는 전투 기술.\n치명적인 일격을 가할 기회가 된다.' and fp_cost_text = '-'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '패링 대거', 'weapon', c.id, 'base_game', E'독특하게 굽은 날밑을 지닌 단검.\n패리를 노리는 무기.\n\n적의 공격을 간파해 카운터를 체현한다\n달인에게는 이 무기만 있으면 된다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '패링 대거' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 1.5, array['slash', 'pierce'], 'smithing_stone', s.id,
  true, 183, 0, 0, 0, 0, 110,
  35.0, 20.0, 20.0, 20.0, 20.0, 18, 0, 0, 0, 0,
  5, 14, 0, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '패리' and description = E'근접 공격의 타이밍에 맞춰 사용해 공격을\n피하고 적의 자세를 무너뜨리는 전투 기술.\n치명적인 일격을 가할 기회가 된다.' and fp_cost_text = '-'
  order by id limit 1
) s
where i.name = '패링 대거' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'E', 'B', '-', '-', '-'),
  ('heavy', 'A', '-', '-', '-', '-'),
  ('keen', 'E', 'S', '-', '-', '-'),
  ('quality', 'B', 'B', '-', '-', '-'),
  ('fire', 'B', 'E', '-', '-', '-'),
  ('flame_art', 'E', 'D', '-', 'B', '-'),
  ('lightning', 'E', 'B', '-', '-', '-'),
  ('sacred', 'E', 'D', '-', 'B', '-'),
  ('magic', 'E', 'D', 'B', '-', '-'),
  ('cold', 'D', 'B', 'C', '-', '-'),
  ('poison', 'D', 'B', '-', '-', 'D'),
  ('blood', 'D', 'B', '-', '-', 'D'),
  ('occult', 'E', 'D', '-', '-', 'A')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '패링 대거' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 자비의 단검
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '자비의 단검', 'weapon', c.id, 'base_game', E'백의의 종군 의사들이 쓰는 단검.\n굳고 날카로우며 치명적인 일격에 뛰어나다.\n\n의료는 자비이며\n전장에서 자비는 편히 죽게 해 주는 것이다.\n그렇기에 의사들은 두려운 살인자가 된다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '자비의 단검' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.0, array['slash', 'pierce'], 'smithing_stone', s.id,
  true, 225, 0, 0, 0, 0, 140,
  36.0, 21.0, 21.0, 21.0, 21.0, 18, 0, 0, 0, 0,
  7, 12, 0, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '자비의 단검' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'E', 'C', '-', '-', '-'),
  ('heavy', 'B', '-', '-', '-', '-'),
  ('keen', 'E', 'B', '-', '-', '-'),
  ('quality', 'C', 'C', '-', '-', '-'),
  ('fire', 'C', 'E', '-', '-', '-'),
  ('flame_art', 'E', 'D', '-', 'D', '-'),
  ('lightning', 'E', 'C', '-', '-', '-'),
  ('sacred', 'E', 'D', '-', 'D', '-'),
  ('magic', 'E', 'E', 'C', '-', '-'),
  ('cold', 'E', 'C', 'D', '-', '-'),
  ('poison', 'D', 'C', '-', '-', 'D'),
  ('blood', 'D', 'C', '-', '-', 'D'),
  ('occult', 'E', 'D', '-', '-', 'B')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '자비의 단검' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 대형 나이프
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '대형 나이프', 'weapon', c.id, 'base_game', E'폭이 넓고 굽은 칼날을 지닌 큰 나이프.\n\n베어 가르기 위한 무기이며\n출혈 상태 이상 효과가 있다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '대형 나이프' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 1.5, array['slash', 'pierce'], 'smithing_stone', s.id,
  true, 183, 0, 0, 0, 0, 110,
  35.0, 20.0, 20.0, 20.0, 20.0, 18, 0, 0, 38, 0,
  6, 12, 0, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '대형 나이프' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'E', 'B', '-', '-', '-'),
  ('heavy', 'A', '-', '-', '-', '-'),
  ('keen', 'E', 'S', '-', '-', '-'),
  ('quality', 'B', 'B', '-', '-', '-'),
  ('fire', 'B', 'E', '-', '-', '-'),
  ('flame_art', 'E', 'D', '-', 'B', '-'),
  ('lightning', 'E', 'B', '-', '-', '-'),
  ('sacred', 'E', 'D', '-', 'B', '-'),
  ('magic', 'E', 'D', 'B', '-', '-'),
  ('cold', 'E', 'B', 'C', '-', '-'),
  ('poison', 'E', 'A', '-', '-', 'D'),
  ('blood', 'E', 'A', '-', '-', 'D'),
  ('occult', 'E', 'D', '-', '-', 'A')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '대형 나이프' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 피투성이 단도
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '피투성이 단도', 'weapon', c.id, 'base_game', E'눌어붙은 피로 더러워진 단도.\n출혈 상태 이상 효과가 있다.\n\n집요하게 베고 찔러온 칼날은\n더러워져도 오히려 더 날카롭고 굳다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '피투성이 단도' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.0, array['slash', 'pierce'], 'smithing_stone', s.id,
  true, 198, 0, 0, 0, 0, 110,
  36.0, 21.0, 21.0, 21.0, 21.0, 18, 0, 0, 38, 0,
  9, 12, 0, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '피투성이 단도' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'B', 'D', '-', '-', '-'),
  ('heavy', 'A', '-', '-', '-', '-'),
  ('keen', 'E', 'B', '-', '-', '-'),
  ('quality', 'B', 'B', '-', '-', '-'),
  ('fire', 'B', 'E', '-', '-', '-'),
  ('flame_art', 'D', 'E', '-', 'B', '-'),
  ('lightning', 'E', 'B', '-', '-', '-'),
  ('sacred', 'D', 'E', '-', 'B', '-'),
  ('magic', 'D', 'E', 'B', '-', '-'),
  ('cold', 'B', 'D', 'C', '-', '-'),
  ('poison', 'B', 'D', '-', '-', 'D'),
  ('blood', 'B', 'D', '-', '-', 'D'),
  ('occult', 'D', 'E', '-', '-', 'B')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '피투성이 단도' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 황동 단도
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '황동 단도', 'weapon', c.id, 'base_game', E'황동 칼날에 풀무늬가 조각된 단도.\n황금 나무의 왕족이 평소 지니는 호신구.\n\n질이 좋지만 다루기 어려우며\n신앙으로도 공격력이 높아진다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '황동 단도' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.0, array['slash', 'pierce'], 'smithing_stone', s.id,
  true, 164, 0, 0, 0, 0, 110,
  36.0, 21.0, 21.0, 21.0, 21.0, 18, 0, 0, 0, 0,
  7, 12, 0, 14, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '황동 단도' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'D', 'D', '-', 'D', '-'),
  ('heavy', 'A', '-', '-', 'D', '-'),
  ('keen', 'E', 'A', '-', 'D', '-'),
  ('quality', 'B', 'B', '-', 'D', '-'),
  ('fire', 'C', 'E', '-', 'D', '-'),
  ('flame_art', 'E', 'E', '-', 'B', '-'),
  ('lightning', 'E', 'C', '-', 'D', '-'),
  ('sacred', 'E', 'E', '-', 'B', '-'),
  ('magic', 'E', 'E', 'B', 'D', '-'),
  ('cold', 'D', 'D', 'B', 'D', '-'),
  ('poison', 'D', 'D', '-', 'D', 'D'),
  ('blood', 'D', 'D', '-', 'D', 'D'),
  ('occult', 'E', 'E', '-', 'D', 'A')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '황동 단도' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 불의 기사 단검
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '불의 기사 단검', 'weapon', c.id, 'shadow_of_the_erdtree', E'불의 기사들이 사용하는 단검.\n가는 검신은 불을 본떠 파도친다.\n\n미리 화염의 기도를 담았으며\n어떠한 방법으로 화염 공격력을 부여할 시\n상승 효과로 크게 위력이 높아진다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '불의 기사 단검' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.0, array['slash', 'pierce'], 'smithing_stone', s.id,
  true, 183, 0, 53, 0, 0, 110,
  32.0, 18.0, 31.0, 18.0, 18.0, 18, 0, 0, 0, 0,
  8, 13, 0, 12, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '불의 기사 단검' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'D', 'C', '-', 'D', '-'),
  ('heavy', '-', '-', '-', '-', '-'),
  ('keen', '-', '-', '-', '-', '-'),
  ('quality', '-', '-', '-', '-', '-'),
  ('fire', '-', '-', '-', '-', '-'),
  ('flame_art', '-', '-', '-', '-', '-'),
  ('lightning', '-', '-', '-', '-', '-'),
  ('sacred', '-', '-', '-', '-', '-'),
  ('magic', '-', '-', '-', '-', '-'),
  ('cold', '-', '-', '-', '-', '-'),
  ('poison', '-', '-', '-', '-', '-'),
  ('blood', '-', '-', '-', '-', '-'),
  ('occult', '-', '-', '-', '-', '-')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '불의 기사 단검' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 협차
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '협차', 'weapon', c.id, 'base_game', E'담금질되어 무늬가 생긴 칼날을 지닌 단검.\n갈대의 땅 무사들이 쓰는 독특한 무기.\n출혈 상태 이상 효과가 있다.\n\n오른손에 도, 왼손에 협차를 드는\n이도류로도 알려져 있다.\n「노인」 이라 불리는 한 수라가 쓰는 검이다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '협차' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 3.0, array['slash', 'pierce'], 'smithing_stone', s.id,
  true, 230, 0, 0, 0, 0, 100,
  42.0, 24.0, 24.0, 24.0, 24.0, 21, 0, 0, 38, 0,
  9, 13, 0, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '협차' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'D', 'C', '-', '-', '-'),
  ('heavy', 'B', '-', '-', '-', '-'),
  ('keen', 'E', 'B', '-', '-', '-'),
  ('quality', 'B', 'B', '-', '-', '-'),
  ('fire', 'C', 'E', '-', '-', '-'),
  ('flame_art', 'E', 'E', '-', 'C', '-'),
  ('lightning', 'E', 'C', '-', '-', '-'),
  ('sacred', 'E', 'E', '-', 'C', '-'),
  ('magic', 'E', 'E', 'B', '-', '-'),
  ('cold', 'D', 'C', 'C', '-', '-'),
  ('poison', 'C', 'C', '-', '-', 'D'),
  ('blood', 'C', 'C', '-', '-', 'D'),
  ('occult', 'E', 'D', '-', '-', 'B')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '협차' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 맹고슈
insert into public.weapon_skills (name, description, fp_cost_text)
select '패리', E'근접 공격의 타이밍에 맞춰 사용해 공격을\n피하고 적의 자세를 무너뜨리는 전투 기술.\n치명적인 일격을 가할 기회가 된다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '패리' and description = E'근접 공격의 타이밍에 맞춰 사용해 공격을\n피하고 적의 자세를 무너뜨리는 전투 기술.\n치명적인 일격을 가할 기회가 된다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '맹고슈', 'weapon', c.id, 'shadow_of_the_erdtree', E'대형 주먹보호대가 붙은 단검.\n\n왼손으로 쓰는 것을 상정한 무기이며\n오른손에 자검, 또는 같은 무기를 장비했을 때\n독특한 이도류를 사용할 수 있다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '맹고슈' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.0, array['slash', 'pierce'], 'smithing_stone', s.id,
  true, 193, 0, 0, 0, 0, 110,
  38.0, 22.0, 22.0, 22.0, 22.0, 19, 0, 0, 0, 0,
  7, 15, 0, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '패리' and description = E'근접 공격의 타이밍에 맞춰 사용해 공격을\n피하고 적의 자세를 무너뜨리는 전투 기술.\n치명적인 일격을 가할 기회가 된다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '맹고슈' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'D', 'B', '-', '-', '-'),
  ('heavy', '-', '-', '-', '-', '-'),
  ('keen', '-', '-', '-', '-', '-'),
  ('quality', '-', '-', '-', '-', '-'),
  ('fire', '-', '-', '-', '-', '-'),
  ('flame_art', '-', '-', '-', '-', '-'),
  ('lightning', '-', '-', '-', '-', '-'),
  ('sacred', '-', '-', '-', '-', '-'),
  ('magic', '-', '-', '-', '-', '-'),
  ('cold', '-', '-', '-', '-', '-'),
  ('poison', '-', '-', '-', '-', '-'),
  ('blood', '-', '-', '-', '-', '-'),
  ('occult', '-', '-', '-', '-', '-')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '맹고슈' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 축제의 손낫
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '축제의 손낫', 'weapon', c.id, 'base_game', E'색색의 천과 꽃으로 장식된 손낫.\n도미눌라의 축제에 사용되는 무희들의 제구.\n그 공격은 가드의 틈을 파고든다.\n\n인간의 뼈로 만들어졌으며\n공격 명중 시 매우 소량의 룬을 얻는다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '축제의 손낫' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 1.5, array['slash', 'pierce'], 'smithing_stone', s.id,
  true, 193, 0, 0, 0, 0, 100,
  35.0, 20.0, 20.0, 20.0, 20.0, 18, 0, 0, 0, 0,
  6, 11, 0, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '축제의 손낫' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'E', 'B', '-', '-', '-'),
  ('heavy', 'B', '-', '-', '-', '-'),
  ('keen', 'E', 'A', '-', '-', '-'),
  ('quality', 'B', 'B', '-', '-', '-'),
  ('fire', 'C', 'E', '-', '-', '-'),
  ('flame_art', 'E', 'D', '-', 'B', '-'),
  ('lightning', 'E', 'C', '-', '-', '-'),
  ('sacred', 'E', 'D', '-', 'B', '-'),
  ('magic', 'E', 'D', 'B', '-', '-'),
  ('cold', 'E', 'B', 'C', '-', '-'),
  ('poison', 'D', 'B', '-', '-', 'D'),
  ('blood', 'D', 'B', '-', '-', 'D'),
  ('occult', 'E', 'D', '-', '-', 'B')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '축제의 손낫' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 상아 손낫
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '상아 손낫', 'weapon', c.id, 'base_game', E'상아를 가공해 만든 손낫.\n늙은 백금의 사람들의 무기.\n\n그것은 본 적 없는 성수를\n섬긴다는 증표라고 한다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '상아 손낫' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.0, array['slash', 'pierce'], 'smithing_stone', s.id,
  false, 147, 147, 0, 0, 0, 100,
  26.0, 42.0, 15.0, 15.0, 15.0, 18, 0, 0, 0, 0,
  6, 11, 13, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '상아 손낫' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'D', 'C', 'C', '-', '-')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '상아 손낫' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 결정 나이프
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '결정 나이프', 'weapon', c.id, 'base_game', E'단단한 결정을 거칠게 간 나이프.\n휘석 광부들이 사용하는 무기.\n\n부순 바위에서 휘석을 깎아내는 도구이며\n미약하지만 마력을 띠고 있다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '결정 나이프' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.0, array['slash', 'pierce'], 'smithing_stone', s.id,
  false, 200, 129, 0, 0, 0, 100,
  32.0, 31.0, 18.0, 18.0, 18.0, 18, 0, 0, 0, 0,
  8, 12, 9, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '결정 나이프' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'C', 'D', 'B', '-', '-')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '결정 나이프' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 전갈의 침
insert into public.weapon_skills (name, description, fp_cost_text)
select '연속 찌르기', E'몸을 회전시키고, 이어서\n단숨에 연속으로 찌르는 전투 기술.', '7'
where not exists (
  select 1 from public.weapon_skills
  where name = '연속 찌르기' and description = E'몸을 회전시키고, 이어서\n단숨에 연속으로 찌르는 전투 기술.' and fp_cost_text = '7'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '전갈의 침', 'weapon', c.id, 'base_game', E'큰 전갈의 침을 칼날 삼은 단검.\n붉은 부패의 독이 흐른다.\n\n봉인된 외부의 신의 유물을 사용한\n이교도의 제구라고 한다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '전갈의 침' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.5, array['slash', 'pierce'], 'somber_smithing_stone', s.id,
  false, 193, 0, 0, 0, 0, 110,
  38.0, 22.0, 22.0, 22.0, 22.0, 16, 50, 0, 0, 0,
  6, 12, 0, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '연속 찌르기' and description = E'몸을 회전시키고, 이어서\n단숨에 연속으로 찌르는 전투 기술.' and fp_cost_text = '7'
  order by id limit 1
) s
where i.name = '전갈의 침' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'D', 'B', '-', '-', '-')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '전갈의 침' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 친퀘디아
insert into public.weapon_skills (name, description, fp_cost_text)
select '퀵스텝', E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.', '3'
where not exists (
  select 1 from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '친퀘디아', 'weapon', c.id, 'base_game', E'파름 아즈라에서\n고위 사제에게 주어지는 단검.\n짐승의 기도의 위력을 높인다.\n\n과거에 짐승들에게 주어진 지성의\n상징인 다섯 발가락을 본떴다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '친퀘디아' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 3.5, array['slash', 'pierce'], 'somber_smithing_stone', s.id,
  false, 240, 0, 0, 0, 0, 110,
  43.0, 25.0, 25.0, 25.0, 25.0, 19, 0, 0, 0, 0,
  10, 10, 0, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '퀵스텝' and description = E'기민함과 교란으로 싸우는 자들의 전투 기술.\n재빠르게 스텝 이동한다.\n타깃 고정 상태라면 돌아 들어간다.' and fp_cost_text = '3'
  order by id limit 1
) s
where i.name = '친퀘디아' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'B', 'D', '-', '-', '-')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '친퀘디아' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 휘석 크리스
insert into public.weapon_skills (name, description, fp_cost_text)
select '휘석의 혜성', E'「휘석 돌팔매」마술을 이용하는 전투 기술.\n차지 공격으로 「휘석의 혜성」이 되며\n강 공격으로 크게 파고드는 찌르기로 잇는다.', '10 ( - / 4 )'
where not exists (
  select 1 from public.weapon_skills
  where name = '휘석의 혜성' and description = E'「휘석 돌팔매」마술을 이용하는 전투 기술.\n차지 공격으로 「휘석의 혜성」이 되며\n강 공격으로 크게 파고드는 찌르기로 잇는다.' and fp_cost_text = '10 ( - / 4 )'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '휘석 크리스', 'weapon', c.id, 'base_game', E'과거에 레아 루카리아 학원이\n로데일과의 화목을 축하한 보검.\n\n희소한 휘석을 황금 나무 풍으로 장식했으며\n흰 칼날은 옛 의식의 상징이기도 하다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '휘석 크리스' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 1.5, array['slash', 'pierce'], 'somber_smithing_stone', s.id,
  false, 139, 166, 0, 0, 0, 110,
  23.0, 45.0, 14.0, 14.0, 14.0, 15, 0, 0, 0, 0,
  5, 12, 16, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '휘석의 혜성' and description = E'「휘석 돌팔매」마술을 이용하는 전투 기술.\n차지 공격으로 「휘석의 혜성」이 되며\n강 공격으로 크게 파고드는 찌르기로 잇는다.' and fp_cost_text = '10 ( - / 4 )'
  order by id limit 1
) s
where i.name = '휘석 크리스' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'E', 'C', 'C', '-', '-')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '휘석 크리스' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 레두비아
insert into public.weapon_skills (name, description, fp_cost_text)
select '레두비아의 혈인', E'톱니 칼날에 묻은 마르지 않는 피를\n출혈을 유발하는 칼날로 만들어 쏘는 전투 기술.\n연속으로 쏠 수도 있다.', '6'
where not exists (
  select 1 from public.weapon_skills
  where name = '레두비아의 혈인' and description = E'톱니 칼날에 묻은 마르지 않는 피를\n출혈을 유발하는 칼날로 만들어 쏘는 전투 기술.\n연속으로 쏠 수도 있다.' and fp_cost_text = '6'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '레두비아', 'weapon', c.id, 'base_game', E'뒤틀린 톱니 칼날을 지닌 이형의 단도.\n피의 군주를 섬기는 귀족들의 무기.\n\n그 칼날은 상처를 헤집어 출혈을 유발하며\n그것을 자랑하듯 늘 피에 젖어 있다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '레두비아' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.5, array['slash', 'pierce'], 'somber_smithing_stone', s.id,
  false, 193, 0, 0, 0, 0, 110,
  38.0, 22.0, 22.0, 22.0, 22.0, 16, 0, 0, 30, 0,
  5, 13, 0, 0, 13
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '레두비아의 혈인' and description = E'톱니 칼날에 묻은 마르지 않는 피를\n출혈을 유발하는 칼날로 만들어 쏘는 전투 기술.\n연속으로 쏠 수도 있다.' and fp_cost_text = '6'
  order by id limit 1
) s
where i.name = '레두비아' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'E', 'C', '-', '-', 'B')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '레두비아' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 사명의 칼날
insert into public.weapon_skills (name, description, fp_cost_text)
select '황금 칼날', E'공중에 도약하여 무기에 황금 불꽃을 두르고\n그것을 칼날 삼아 쏘는 전투 기술.\n신성 속성 대미지를 입힌다.', '17'
where not exists (
  select 1 from public.weapon_skills
  where name = '황금 칼날' and description = E'공중에 도약하여 무기에 황금 불꽃을 두르고\n그것을 칼날 삼아 쏘는 전투 기술.\n신성 속성 대미지를 입힌다.' and fp_cost_text = '17'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '사명의 칼날', 'weapon', c.id, 'base_game', E'사명으로 여행하는 자에게 주어진 단검.\n이 한 자루에는 옛 주인인\n불씨의 소녀의 힘이 남아있다.\n\n불꽃과 함께 걷는 자여.\n언젠가 운명의 죽음을 보리라'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '사명의 칼날' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 1.5, array['slash', 'pierce'], 'somber_smithing_stone', s.id,
  false, 173, 0, 0, 0, 105, 110,
  31.0, 18.0, 18.0, 18.0, 30.0, 16, 0, 0, 0, 0,
  6, 13, 0, 15, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '황금 칼날' and description = E'공중에 도약하여 무기에 황금 불꽃을 두르고\n그것을 칼날 삼아 쏘는 전투 기술.\n신성 속성 대미지를 입힌다.' and fp_cost_text = '17'
  order by id limit 1
) s
where i.name = '사명의 칼날' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'D', 'C', '-', 'B', '-')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '사명의 칼날' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;


-- 검은 칼날
insert into public.weapon_skills (name, description, fp_cost_text)
select '죽음의 칼날', E'죽음의 룬의 힘을 해방해 칼날 삼아 쏘는\n전투 기술. 대미지를 입힘과 동시에 최대 HP를\n감소시키며 잠시 HP를 계속 깎는다.', '25'
where not exists (
  select 1 from public.weapon_skills
  where name = '죽음의 칼날' and description = E'죽음의 룬의 힘을 해방해 칼날 삼아 쏘는\n전투 기술. 대미지를 입힘과 동시에 최대 HP를\n감소시키며 잠시 HP를 계속 깎는다.' and fp_cost_text = '25'
);

insert into public.game_items (name, type, category_id, content_code, game_description)
select '검은 칼날', 'weapon', c.id, 'base_game', E'과거, 검은 칼날의 음모가 있던 밤에\n황금의 고드윈을 죽인 자객들의 단도.\n\n그 기묘하게 뒤틀린 칼날에는 의식으로\n훔쳐진 죽음의 룬의 힘을 품었다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '단검'
  and not exists (
    select 1 from public.game_items
    where name = '검은 칼날' and type = 'weapon' and category_id = c.id
  );

insert into public.weapon_details (
  game_item_id, weight, physical_attack_types, upgrade_material, default_skill_id,
  can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning,
  attack_holy, critical, guard_physical, guard_magic, guard_fire, guard_lightning,
  guard_holy, guard_boost, scarlet_rot, frostbite, bleed, poison,
  required_strength, required_dexterity, required_intelligence, required_faith, required_arcane
)
select
  i.id, 2.0, array['slash', 'pierce'], 'somber_smithing_stone', s.id,
  false, 161, 0, 0, 0, 159, 110,
  26.0, 15.0, 15.0, 15.0, 42.0, 15, 0, 0, 0, 0,
  8, 12, 0, 18, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
cross join lateral (
  select id from public.weapon_skills
  where name = '죽음의 칼날' and description = E'죽음의 룬의 힘을 해방해 칼날 삼아 쏘는\n전투 기술. 대미지를 입힘과 동시에 최대 HP를\n감소시키며 잠시 HP를 계속 깎는다.' and fp_cost_text = '25'
  order by id limit 1
) s
where i.name = '검은 칼날' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id) do nothing;

insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, v.*
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_details d on d.game_item_id = i.id
cross join (values
  ('standard', 'E', 'B', '-', 'C', '-')
) as v(affinity, strength, dexterity, intelligence, faith, arcane)
where i.name = '검은 칼날' and i.type = 'weapon' and c.name = '단검'
on conflict (game_item_id, affinity) do nothing;
