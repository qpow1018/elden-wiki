-- 사용자 제공 채찍 7종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
-- 첫 4종의 기본 상태 이상과 이빨 채찍의 공격력·필요 능력치·보정을 보완합니다.
-- 이빨 채찍의 중량·물리 공격 방식·가드·치명·기술 FP는 NULL입니다.
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '채찍') then
    raise exception '채찍 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '채찍'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('킥', '통타', '용암 바다', '화염무')
    group by name having count(*) > 1
  ) then
    raise exception '채찍 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('킥', '다리를 높이 들어 차는 기술.
가드에 유효하고 자세를 무너뜨릴 수 있다.
단순하지만 실전적인 전투 기술.', '- ( - / - )'),
  ('통타', '특히 아픔을 주기 위한 채찍의 일격.
일시적으로 스태미나 회복 속도를 저하시킨다.
그리고 아픔은 사람을 순종적으로 만든다.', '16'),
  ('용암 바다', '용암 채찍을 크게 휘둘러 일시적으로
자신의 주위에 용암 바다를 만드는 전투 기술.
길게 누르는 동안 계속 채찍을 휘두른다.', '5 ( - / 5 )'),
  ('화염무', '적발 채찍에 거인의 불을 태워
흐르는 듯한 연속 공격으로
넓은 범위를 쓸어버리는 전투 기술.', '25 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name);

with source (name, sort_order, content_code, game_description) as (
  values
  ('채찍', 10, 'base_game', '가죽 채찍.
원래는 무기가 아니라 고통을 주기 위한 물건.

공격이 휘어 가드나 패리에 튕겨나지 않으나
치명적인 일격을 주지 못하는 결점도 있다.'),
  ('가시 채찍', 20, 'base_game', '붉은 가시가 빽빽하게 난 굵은 채찍.
불의 승병들의 지도자인 주교의 무기.
죄의 가시를 본떴으며
격렬한 지도 편달에 사용한다.

높은 출혈 효과가 있다.'),
  ('우루미', 30, 'base_game', '매우 얇고 유연하게 벼린 칼날을
채찍처럼 휘두르는 야인 전사의 무기.

그것은 베어내는 칼날 채찍이자
찌르는 칼날 창이다.'),
  ('호슬로의 꽃잎', 40, 'base_game', '날카로운 칼날 꽃잎을 사슬처럼 이은 채찍.
명문 호슬로에 전해지는 공예품 같은 무기.

높은 기량이 필요하나
상대에게 대량의 출혈을 유발한다.
「호슬로는 그 피로 말한다」'),
  ('이빨 채찍', 50, 'shadow_of_the_erdtree', '추한 이빨을 아무렇게나 박아 넣은 채찍.

더러워진 이빨은 온갖 잡균투성이이며
그 이에 상처를 입으면 맹독이 축적된다.

이윽고 상처에 고름이 생기고 짓무르며
무녀들은 다른 살과 잘 섞였다고 한다.'),
  ('용암 채찍의 촛대', 60, 'base_game', '용암으로 불꽃을 본뜬 세 갈래 촛대.
겔미어의 용암을 사용한 주구.

그 불꽃의 모습은 휘두를 때만
휘어지는 용암 채찍이 된다.'),
  ('거인의 적발', 70, 'base_game', '거인의 불타는 듯 붉고 긴 머리카락을
땋아서 묶은 굵은 채찍.

거인들은 모두 적발이며
라다곤은 자신의 적발에 절망했다고 한다.
그것은 거인의 저주였던 것일까.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '채찍'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('채찍', '킥', 2.0, '타격', 'smithing_stone', true, 252, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 18, 0, 0, 0, 0, 0, 0, 8, 14, 0, 0, 0),
  ('가시 채찍', '킥', 2.5, '타격', 'smithing_stone', true, 257, 0, 0, 0, 0, 26.0, 15.0, 15.0, 15.0, 15.0, 100, 18, 0, 0, 50, 0, 0, 0, 8, 16, 0, 0, 0),
  ('우루미', '킥', 3.0, '참격', 'smithing_stone', true, 247, 0, 0, 0, 0, 27.0, 16.0, 16.0, 16.0, 16.0, 100, 18, 0, 0, 0, 0, 0, 0, 10, 19, 0, 0, 0),
  ('호슬로의 꽃잎', '킥', 3.5, '타격', 'smithing_stone', true, 276, 0, 0, 0, 0, 28.0, 17.0, 17.0, 17.0, 17.0, 100, 20, 0, 0, 55, 0, 0, 0, 10, 20, 0, 0, 0),
  ('이빨 채찍', '통타', 3, '타격', 'somber_smithing_stone', false, 267, 0, 0, 0, 0, 27, 16, 16, 16, 16, 100, 17, 0, 0, 0, 66, 0, 0, 10, 24, 0, 0, 0),
  ('용암 채찍의 촛대', '용암 바다', 2.5, '타격', 'somber_smithing_stone', false, 181, 0, 181, 0, 0, 21.0, 10.0, 36.0, 10.0, 10.0, 100, 16, 0, 0, 0, 0, 0, 0, 8, 16, 0, 18, 0),
  ('거인의 적발', '화염무', 2.5, '타격', 'somber_smithing_stone', false, 205, 0, 132, 0, 0, 24.0, 12.0, 26.0, 12.0, 12.0, 100, 16, 0, 0, 0, 0, 0, 0, 18, 12, 0, 21, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '채찍'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('채찍', 'standard', 'D', 'C', '-', '-', '-'),
  ('채찍', 'heavy', 'B', '-', '-', '-', '-'),
  ('채찍', 'keen', 'E', 'B', '-', '-', '-'),
  ('채찍', 'quality', 'B', 'B', '-', '-', '-'),
  ('채찍', 'fire', 'C', 'E', '-', '-', '-'),
  ('채찍', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('채찍', 'lightning', 'E', 'C', '-', '-', '-'),
  ('채찍', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('채찍', 'magic', 'E', 'E', 'C', '-', '-'),
  ('채찍', 'cold', 'D', 'C', 'C', '-', '-'),
  ('채찍', 'poison', 'C', 'C', '-', '-', 'D'),
  ('채찍', 'blood', 'C', 'C', '-', '-', 'D'),
  ('채찍', 'occult', 'E', 'D', '-', '-', 'B'),
  ('가시 채찍', 'standard', 'D', 'B', '-', '-', '-'),
  ('가시 채찍', 'heavy', 'B', '-', '-', '-', '-'),
  ('가시 채찍', 'keen', 'E', 'A', '-', '-', '-'),
  ('가시 채찍', 'quality', 'B', 'B', '-', '-', '-'),
  ('가시 채찍', 'fire', 'C', 'E', '-', '-', '-'),
  ('가시 채찍', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('가시 채찍', 'lightning', 'E', 'C', '-', '-', '-'),
  ('가시 채찍', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('가시 채찍', 'magic', 'E', 'D', 'C', '-', '-'),
  ('가시 채찍', 'cold', 'D', 'B', 'C', '-', '-'),
  ('가시 채찍', 'poison', 'D', 'B', '-', '-', 'D'),
  ('가시 채찍', 'blood', 'D', 'B', '-', '-', 'D'),
  ('가시 채찍', 'occult', 'E', 'D', '-', '-', 'B'),
  ('우루미', 'standard', 'E', 'B', '-', '-', '-'),
  ('우루미', 'heavy', 'A', '-', '-', '-', '-'),
  ('우루미', 'keen', 'E', 'S', '-', '-', '-'),
  ('우루미', 'quality', 'B', 'B', '-', '-', '-'),
  ('우루미', 'fire', 'C', 'E', '-', '-', '-'),
  ('우루미', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('우루미', 'lightning', 'E', 'C', '-', '-', '-'),
  ('우루미', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('우루미', 'magic', 'E', 'D', 'B', '-', '-'),
  ('우루미', 'cold', 'E', 'B', 'C', '-', '-'),
  ('우루미', 'poison', 'D', 'B', '-', '-', 'D'),
  ('우루미', 'blood', 'D', 'B', '-', '-', 'D'),
  ('우루미', 'occult', 'E', 'D', '-', '-', 'B'),
  ('호슬로의 꽃잎', 'standard', 'D', 'C', '-', '-', '-'),
  ('호슬로의 꽃잎', 'heavy', 'B', '-', '-', '-', '-'),
  ('호슬로의 꽃잎', 'keen', 'E', 'B', '-', '-', '-'),
  ('호슬로의 꽃잎', 'quality', 'B', 'B', '-', '-', '-'),
  ('호슬로의 꽃잎', 'fire', 'D', 'E', '-', '-', '-'),
  ('호슬로의 꽃잎', 'flame_art', 'E', 'D', '-', 'D', '-'),
  ('호슬로의 꽃잎', 'lightning', 'E', 'D', '-', '-', '-'),
  ('호슬로의 꽃잎', 'sacred', 'E', 'D', '-', 'D', '-'),
  ('호슬로의 꽃잎', 'magic', 'E', 'E', 'C', '-', '-'),
  ('호슬로의 꽃잎', 'cold', 'D', 'C', 'D', '-', '-'),
  ('호슬로의 꽃잎', 'poison', 'D', 'C', '-', '-', 'D'),
  ('호슬로의 꽃잎', 'blood', 'D', 'C', '-', '-', 'D'),
  ('호슬로의 꽃잎', 'occult', 'E', 'D', '-', '-', 'B'),
  ('이빨 채찍', 'standard', 'D', 'B', '-', '-', '-'),
  ('용암 채찍의 촛대', 'standard', 'D', 'B', '-', 'C', '-'),
  ('거인의 적발', 'standard', 'B', 'D', '-', 'B', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '채찍'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
