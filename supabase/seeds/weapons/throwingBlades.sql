-- 2026-11-03 사용자 제공 유문 단검 설명 + 공개 게임 추출 데이터의 수치 보완.
-- 이미지와 GitHub 데이터에 없는 수치는 미반영입니다.
-- 기본 등록은 기존 행을 보존하고, 보완 수치는 NULL인 칸만 채웁니다.
do $$
begin
  if not exists (
    select 1 from public.game_item_categories where type = 'weapon' and name = '투척검'
  ) then
    raise exception '투척검 분류를 먼저 등록해야 합니다.';
  end if;
  if (
    select count(*) from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '투척검' and i.name = '유문 단검'
  ) > 1 or (select count(*) from public.weapon_skills where name = '관통 투척') > 1 then
    raise exception '투척검 시드를 적용하기 전에 중복된 아이템·기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

insert into public.weapon_skills (name, description, fp_cost_text)
select '관통 투척', '무기에 세게 회전을 주어 투척하는 전투 기술.
투척한 무기는 평소보다 긴 거리를 날아가
적의 몸을 관통한다.', null
where not exists (select 1 from public.weapon_skills where name = '관통 투척');

insert into public.game_items (
  name, type, category_id, sort_order, content_code, game_description
)
select '유문 단검', 'weapon', c.id, 10, 'shadow_of_the_erdtree',
  '유문문자가 새겨진 단검.

질량을 줄여 단조술의 효과를 높였으며
모든 공격이 투척이 되는 투척검.
검은 손이 닿는 곳에서 순식간에 재생성된다.

전투 기술에 속성이 있는 전회를 사용할 수 없다.'
from public.game_item_categories c
where c.type = 'weapon' and c.name = '투척검'
  and not exists (
    select 1 from public.game_items i
    where i.category_id = c.id and i.type = 'weapon' and i.name = '유문 단검'
  );

insert into public.weapon_details (
  game_item_id, type, default_skill_id, upgrade_material, can_change_affinity, sleep, madness
)
select i.id, 'weapon', k.id, 'smithing_stone', true, 0, 0
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
join public.weapon_skills k on k.name = '관통 투척'
where i.type = 'weapon' and c.type = 'weapon' and c.name = '투척검' and i.name = '유문 단검'
on conflict (game_item_id) do nothing;

-- 수치 출처: ThomasJClark/elden-ring-weapon-calculator
-- public/regulation-vanilla-v1.17.js (일반 게임 데이터, 모드 데이터 아님)
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
-- src/regulationData.ts의 강화 계수 적용 방식과 원본 scalingTiers를 사용합니다.
-- 표준 +25 기본 공격력은 소수점 아래를 버리고 캐릭터 능력치 보너스는 더하지 않습니다.
update public.weapon_details d
set
  attack_physical = coalesce(d.attack_physical, 151),
  attack_magic = coalesce(d.attack_magic, 0),
  attack_fire = coalesce(d.attack_fire, 0),
  attack_lightning = coalesce(d.attack_lightning, 0),
  attack_holy = coalesce(d.attack_holy, 0),
  required_strength = coalesce(d.required_strength, 5),
  required_dexterity = coalesce(d.required_dexterity, 11),
  required_intelligence = coalesce(d.required_intelligence, 11),
  required_faith = coalesce(d.required_faith, 11),
  required_arcane = coalesce(d.required_arcane, 0),
  scarlet_rot = coalesce(d.scarlet_rot, 0),
  frostbite = coalesce(d.frostbite, 0),
  bleed = coalesce(d.bleed, 0),
  poison = coalesce(d.poison, 0)
from public.game_items i
join public.game_item_categories c on c.id = i.category_id
where d.game_item_id = i.id and i.type = 'weapon'
  and c.type = 'weapon' and c.name = '투척검' and i.name = '유문 단검';

with source (affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('standard', 'D', 'B', 'E', 'E', '-'),
  ('heavy', 'A', '-', 'E', 'E', '-'),
  ('keen', 'D', 'S', 'E', 'E', '-'),
  ('quality', 'B', 'B', 'E', 'E', '-'),
  ('fire', 'B', 'E', 'E', 'E', '-'),
  ('flame_art', 'E', 'D', 'E', 'B', '-'),
  ('lightning', 'E', 'B', 'E', 'E', '-'),
  ('sacred', 'E', 'D', 'E', 'B', '-'),
  ('magic', 'E', 'E', 'B', 'E', '-'),
  ('cold', 'D', 'B', 'B', 'E', '-'),
  ('poison', 'D', 'B', 'E', 'E', 'D'),
  ('blood', 'D', 'B', 'E', 'E', 'D'),
  ('occult', 'E', 'D', 'E', 'E', 'A')
)
insert into public.weapon_scalings (
  game_item_id, affinity, strength, dexterity, intelligence, faith, arcane
)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '투척검'
join public.game_items i on i.category_id = c.id and i.type = 'weapon' and i.name = '유문 단검'
on conflict (game_item_id, affinity) do nothing;
