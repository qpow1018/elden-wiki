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
