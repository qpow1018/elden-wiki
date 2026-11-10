-- 사용자 제공 조향병 5종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '조향병') then
    raise exception '조향병 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '조향병'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('킥', '맹독 살포')
    group by name having count(*) > 1
  ) then
    raise exception '조향병 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;


insert into public.weapon_skills (name, description, fp_cost_text)
select '킥', '다리를 높이 들어 차는 기술.
가드에 유효하고 자세를 무너뜨릴 수 있다.
단순하지만 실전적인 전투 기술.', null
where not exists (select 1 from public.weapon_skills where name = '킥');

insert into public.weapon_skills (name, description, fp_cost_text)
select '맹독 살포', '조향병을 머리 위에서 크게 휘둘러
넓은 범위에 맹독 향분을 살포하는 전투 기술.
맹독은 아름답게 춤추며 조용히 쏟아진다.', '21'
where not exists (select 1 from public.weapon_skills where name = '맹독 살포');

with source (name, sort_order, game_description) as (
  values
  ('불꽃의 조향병', 10, '그림자의 땅 조향사들의 무기.
무기로 쓸 수 있게 조정된 조향병.

공격하면 향분을 살포해 불꽃을 만들어낸다.

성전은 곧 가열한 숙청이며,
그들은 치유사로 있겠다고 요구할 수 없었다.'),
  ('벼락의 조향병', 20, '그림자의 땅 조향사들의 무기.
무기로 쓸 수 있게 조정된 조향병.

공격하면 향분을 살포해 벼락을 만들어낸다.

조향사는 새로운 향약과 꽃밭을 찾아 불쑥
여행을 떠난다. 어느 땅에서든 마찬가지이다.'),
  ('냉기의 조향병', 30, '그림자의 땅 조향사들의 무기.
무기로 쓸 수 있게 조정된 조향병.

공격하면 향분을 살포해 냉기를 만들어낸다.

조향사는 새로운 향약과 꽃밭을 찾아 불쑥
여행을 떠난다. 어느 땅에서든 마찬가지이다.'),
  ('미친 불의 조향병', 40, '그림자의 땅 조향사들의 무기.
무기로 쓸 수 있게 조정된 조향병.

공격하면 향분을 살포해 미친 불을 만들어낸다.

조향사는 새로운 향약과 꽃밭을 찾아 불쑥
여행을 떠난다. 어느 땅에서든 마찬가지이다.'),
  ('맹독의 조향병', 50, '티에리에가 독자적으로 조정한 조향병.

공격하면 향분을 살포해 맹독을 만들어낸다.

조향술에는 독을 사용하는 것이 있다.
그것을 안 티에리에는 그 기술을 수련해
드디어 자신의 것으로 만들었다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description)
select s.name, 'weapon', c.id, s.sort_order, 'shadow_of_the_erdtree', s.game_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '조향병'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, upgrade_material, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane, scarlet_rot, frostbite, bleed, poison, sleep, madness, weight, critical, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, guard_boost) as (
  values
  ('불꽃의 조향병', '킥', 'smithing_stone', 0, 0, 289, 0, 0, 3, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 100, 21, 29, 65, 26, 23, 18),
  ('벼락의 조향병', '킥', 'smithing_stone', 0, 0, 0, 289, 0, 3, 16, 0, 14, 0, 0, 0, 0, 0, 0, 0, 1, 100, 21, 28, 25, 65, 28, 18),
  ('냉기의 조향병', '킥', 'smithing_stone', 0, 274, 0, 0, 0, 3, 13, 13, 0, 0, 0, 60, 0, 0, 0, 0, 1, 100, 20, 65, 31, 25, 32, 18),
  ('미친 불의 조향병', '킥', 'smithing_stone', 0, 0, 274, 0, 0, 3, 10, 12, 12, 0, 0, 0, 0, 0, 0, 60, 1, 100, 23, 30, 60, 32, 29, 18),
  ('맹독의 조향병', '맹독 살포', 'somber_smithing_stone', 240, 0, 0, 0, 0, 3, 13, 0, 0, 18, 0, 0, 0, 66, 0, 0, 1, 100, 30, 35, 35, 35, 35, 16)
)
insert into public.weapon_details (game_item_id, type, default_skill_id, can_change_affinity, upgrade_material, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane, scarlet_rot, frostbite, bleed, poison, sleep, madness, weight, physical_attack_types, critical, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, guard_boost)
select i.id, 'weapon', k.id, false, s.upgrade_material, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.weight, array['standard']::text[], s.critical, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.guard_boost
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '조향병'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('불꽃의 조향병', 'standard', '-', 'B', '-', '-', '-'),
  ('벼락의 조향병', 'standard', '-', 'C', '-', 'C', '-'),
  ('냉기의 조향병', 'standard', '-', 'C', 'C', '-', '-'),
  ('미친 불의 조향병', 'standard', 'D', 'C', 'D', 'D', '-'),
  ('맹독의 조향병', 'standard', '-', 'C', '-', '-', 'C')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '조향병'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
