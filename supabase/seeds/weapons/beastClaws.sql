-- 사용자 제공 짐승 발톱 2종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
-- 미강화 상태 이상과 두 무기의 공격력·필요 능력치·보정을 보완합니다.
-- 두 무기의 중량·공격 방식·가드·치명과 고유 기술 FP는 NULL입니다.
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '짐승 발톱') then
    raise exception '짐승 발톱 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '짐승 발톱'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('짐승 발톱 공격', '붉은곰의 사냥')
    group by name having count(*) > 1
  ) then
    raise exception '짐승 발톱 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('짐승 발톱 공격', '짐승처럼 낮게 도약한 후 좌우 손톱으로
격렬하게 적을 베어 가르는 전투 기술.', null),
  ('붉은곰의 사냥', '팔을 크게 치켜들고 날카로운 발톱으로 사냥감을
제압하는 전투 기술. 그 공격은 진공을 만들어
연속으로 대미지를 입힌다.
추가 입력으로 2회까지 추가 공격이 가능하다.', null)
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('짐승 발톱', 10, 'shadow_of_the_erdtree', '육식동물의 날카로운 발톱을 본뜬 무기.
인간이 아닌 짐승 같은 참격을 한다.

뿔의 전사들의 비술을 모방한,
자신에게 짐승을 깃들게 하는 듯한 무기.', null),
  ('붉은곰의 발톱', 20, 'shadow_of_the_erdtree', '큰 붉은곰의 발톱을 그대로 무기 삼은 것.
이름을 잊은 광전사, 붉은곰의 무기.

피범벅이 되는 사투 끝에 붉은곰을 쓰러뜨린
전사는 매료되었다. 맨몸의 힘, 그 순수함에.
나는 그저 곰이 되고 싶다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '짐승 발톱'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('짐승 발톱', '짐승 발톱 공격', null, '참격', 'smithing_stone', true, 240, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 45, 0, 0, 0, 13, 11, 0, 0, 0),
  ('붉은곰의 발톱', '붉은곰의 사냥', null, null, 'somber_smithing_stone', false, 254, 0, 0, 0, 0, null, null, null, null, null, null, null, 0, 0, 45, 0, 0, 0, 20, 10, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight::numeric, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical::numeric, s.guard_magic::numeric, s.guard_fire::numeric, s.guard_lightning::numeric, s.guard_holy::numeric, s.critical::integer, s.guard_boost::integer, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '짐승 발톱'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('짐승 발톱', 'standard', 'C', 'D', '-', '-', '-'),
  ('짐승 발톱', 'heavy', 'A', '-', '-', '-', '-'),
  ('짐승 발톱', 'keen', 'E', 'B', '-', '-', '-'),
  ('짐승 발톱', 'quality', 'B', 'B', '-', '-', '-'),
  ('짐승 발톱', 'fire', 'C', 'E', '-', '-', '-'),
  ('짐승 발톱', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('짐승 발톱', 'lightning', 'E', 'C', '-', '-', '-'),
  ('짐승 발톱', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('짐승 발톱', 'magic', 'E', 'E', 'B', '-', '-'),
  ('짐승 발톱', 'cold', 'B', 'D', 'C', '-', '-'),
  ('짐승 발톱', 'poison', 'B', 'D', '-', '-', 'D'),
  ('짐승 발톱', 'blood', 'B', 'D', '-', '-', 'D'),
  ('짐승 발톱', 'occult', 'D', 'E', '-', '-', 'B'),
  ('붉은곰의 발톱', 'standard', 'B', 'D', '-', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '짐승 발톱'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
