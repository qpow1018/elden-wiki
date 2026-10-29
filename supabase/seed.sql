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
