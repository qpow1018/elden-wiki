-- 사용자 제공 철퇴 7종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '철퇴') then
    raise exception '철퇴 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '철퇴'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('사슬 휘두르기','가족의 원혼','뱀이여 불타라','인과의 분노','별 구름')
    group by name, description having count(*) > 1
  ) then
    raise exception '철퇴 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('사슬 휘두르기', '철퇴의 타격부를 고속 회전시키는 전투 기술.
일반 공격 및 강 공격용으로
그 기세를 살린 추가 공격도 가능하다.', '8 ( 8 / 10 )'),
  ('가족의 원혼', '적동 머리를 천천히 흔들며
매달리는 원혼들을 부르는 전투기술.
처자식의 괴로움이 저주를 부른다.', '25 ( - / - )'),
  ('뱀이여 불타라', '뱀 안에 있는 불을 불타게 해 일시적으로 화염
공격력을 높이는 전투 기술.
그 상태로 강 공격 등으로 지면을 치면
충격으로 폭발이 발생한다.', '8 ( - / - )'),
  ('인과의 분노', '인과의 고리를 몸에 품는 전투 기술.
추가 입력으로 고리를 사용해 공격하며,
그 위력은 인과의 고리를 품은 후
받은 공격의 양에 따라 커진다.
', '24 ( - / - )'),
  ('별 구름', '부산물의 별가루에 마력을 담아 배어넘기는
공격과 함께 암흑 별 구름을 만드는 전투 기술.
별 구름은 잠시 후 폭발해 사라진다.', '25 ( - / - )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('철퇴', 10, 'base_game', '자루 끝과 타격부를 사슬로 이은 무기.
타격부에 가시가 있어 출혈 효과가 있다.

공격이 패리에 튕겨나지 않으며
타격부를 계속 돌리는 차지 공격도 강력하다.', null),
  ('밤 기병의 철퇴', 20, 'base_game', '타격부가 세 개 있는 칠흑의 철퇴.
장송마를 탄 밤 기병의 무기.

타격부의 가시가 커 출혈 효과가 크나
다루려면 높은 기량이 필요하다.', null),
  ('편곤', 30, 'base_game', '가시 달린 철통을 사슬로 이은 무기.
호박 광병이 사용하는 무기.

철퇴 중에서는 대형이기에
기량보다 근력이 더 요구된다.', null),
  ('가족의 머리', 40, 'base_game', '적동으로 만든 머리를 사슬로 이은 무기.
이단의 현자, 사술사 가레스의 무기.

그 머리는 아내와 두 아이와 닮게 만들었다.', null),
  ('불뱀 철퇴', 50, 'shadow_of_the_erdtree', '구형을 이룬 뱀을 타격부 삼은 철퇴.
뱀 안쪽은 불타고 있어 심한 화상을 입힌다.

메스메르군 일부가, 뿔인간을 불태워
고통과 공포를 새기기 위해 사용했다.', null),
  ('황금률의 철퇴', 60, 'tarnished_pack', '세 개의 황금 고리를 타격부로 삼은 철퇴.
파쇄된 가면 경의 성스러운 무기.

황금 고리는 엘든 링을 본뜬 모습이며
반쯤 실체가 없는 빛고리이나
셋 모두 거의 부서져 있다.', null),
  ('떨어진 별들', 70, 'base_game', '아스테르의 추억에서 얻은 힘.
마력 공격력을 가진 철퇴.

암흑의 부산물, 그 몸을 구성했던
색색의 별가루가 줄지어 있다.
전용 전투 기술「별 구름」

부산물의 별가루에 마력을 담아 배어넘기는
공격과 함께 암흑 별 구름을 만드는 전투 기술.
별 구름은 잠시 후 폭발해 사라진다.
Bastard''s Stars/落とし子の星々 암흑의 부산물 아스테르의 추억으로 연성할 수 있다.

전기의 경우 무기를 크게 휘두른 후 해당 궤적을 따라 별구름이 깔린다. 휘두를 때도 대미지 판정이 있는데 대부분의 상황에선 전기 딜의 절반 가까이 차지할 정도로 의외로 피해량이 상당하다. 딜은 시전 시간이 감안돼 책정된 건지 꽤 높은 편이다. 단순히 황금나무에 맹세코와 알렉산더의 파편을 장착한 것만으로도 타격+폭발을 맞히면 2천 정도의 피해량을 뽑아낼 수 있을 정도이다. 별구름의 범위는 비슷한 전기를 가진 아스테르의 날개보다 넓지만, 선딜레이나 폭발까지의 딜레이는 더 길다. 해외 위키 왈 적 하나당 폭발 피해는 한 번만 들어간다고 하는데 실제로 그렇진 않고 아스테르의 날개와 마찬가지로 폭발 피해는 여러 번 욱여넣을 수 있다. 아스테르의 날개에 비해 연사력이 떨어지므로, 연속으로 시전해서 극딜을 넣는 아스테르의 날개와 달리 보스가 빈틈을 보일 때 전투기술을 꽂아 넣는 느낌으로 운용하게 된다. 철퇴 자체가 워낙 비주류 무기라 이 무기도 천시받지만, 의외로 강력한 성능을 보여주는 무기라 지력 캐릭터의 서브웨폰으로 쓰기에 괜찮다.

별에서 온 자들[219]에게 1.2배 대미지를 준다.

PvP에서의 성능은 아주 뛰어나진 않지만 아스테르의 날개와는 달리 물리 공격이 동반되므로, 해당 무기에 익숙하지 않은 근접 유저들을 상대로 준수한 성능을 보인다.

들고 다니면 특유의 별가루가 떨어지는 듯한 사운드가 인상적이다.', '별에서 온 자들에게 1.2배 대미지를 준다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '철퇴'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('철퇴', '사슬 휘두르기', 5.0, '타격', 'smithing_stone', true, 274, 0, 0, 0, 0, 36.0, 24.0, 24.0, 24.0, 24.0, 100, 24, 0, 0, 50, 0, 0, 0, 10, 18, 0, 0, 0),
  ('밤 기병의 철퇴', '사슬 휘두르기', 6.0, '타격', 'smithing_stone', true, 281, 0, 0, 0, 0, 37.0, 25.0, 25.0, 25.0, 25.0, 100, 25, 0, 0, 50, 0, 0, 0, 10, 24, 0, 0, 0),
  ('편곤', '사슬 휘두르기', 8.0, '타격', 'smithing_stone', true, 274, 0, 0, 0, 0, 43.0, 28.0, 28.0, 28.0, 28.0, 100, 28, 0, 0, 50, 0, 0, 0, 18, 12, 0, 0, 0),
  ('가족의 머리', '가족의 원혼', 5.5, '타격', 'somber_smithing_stone', false, 220, 142, 0, 0, 0, 37.0, 36.0, 26.0, 26.0, 26.0, 100, 22, 0, 0, 0, 0, 0, 0, 8, 18, 16, 0, 0),
  ('불뱀 철퇴', '뱀이여 불타라', 6.0, '타격', 'somber_smithing_stone', false, 188, 0, 225, 0, 0, 34.0, 25.0, 50.0, 24.0, 25.0, 100, 23, 0, 0, 0, 0, 0, 0, 10, 24, 0, 21, 0),
  ('황금률의 철퇴', '인과의 분노', 5.0, '타격', 'somber_smithing_stone', false, 183, 0, 0, 0, 225, 39.0, 28.0, 28.0, 28.0, 37.0, 100, 24, 0, 0, 0, 0, 0, 0, 9, 16, 0, 26, 0),
  ('떨어진 별들', '별 구름', 5.5, '타격', 'somber_smithing_stone', false, 166, 198, 0, 0, 0, 32.0, 48.0, 24.0, 24.0, 24.0, 100, 22, 0, 0, 0, 0, 0, 0, 8, 22, 22, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '철퇴'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
  and (s.skill_name <> '별 구름' or k.description = '부산물의 별가루에 마력을 담아 배어넘기는
공격과 함께 암흑 별 구름을 만드는 전투 기술.
별 구름은 잠시 후 폭발해 사라진다.')
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('철퇴', 'standard', 'D', 'C', '-', '-', '-'),
  ('철퇴', 'heavy', 'B', '-', '-', '-', '-'),
  ('철퇴', 'keen', 'E', 'A', '-', '-', '-'),
  ('철퇴', 'quality', 'B', 'B', '-', '-', '-'),
  ('철퇴', 'fire', 'C', 'E', '-', '-', '-'),
  ('철퇴', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('철퇴', 'lightning', 'E', 'C', '-', '-', '-'),
  ('철퇴', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('철퇴', 'magic', 'E', 'E', 'B', '-', '-'),
  ('철퇴', 'cold', 'D', 'C', 'C', '-', '-'),
  ('철퇴', 'poison', 'C', 'B', '-', '-', 'D'),
  ('철퇴', 'blood', 'C', 'B', '-', '-', 'D'),
  ('철퇴', 'occult', 'E', 'D', '-', '-', 'B'),
  ('밤 기병의 철퇴', 'standard', 'D', 'B', '-', '-', '-'),
  ('밤 기병의 철퇴', 'heavy', 'B', '-', '-', '-', '-'),
  ('밤 기병의 철퇴', 'keen', 'E', 'A', '-', '-', '-'),
  ('밤 기병의 철퇴', 'quality', 'B', 'B', '-', '-', '-'),
  ('밤 기병의 철퇴', 'fire', 'C', 'E', '-', '-', '-'),
  ('밤 기병의 철퇴', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('밤 기병의 철퇴', 'lightning', 'E', 'C', '-', '-', '-'),
  ('밤 기병의 철퇴', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('밤 기병의 철퇴', 'magic', 'E', 'E', 'B', '-', '-'),
  ('밤 기병의 철퇴', 'cold', 'D', 'B', 'C', '-', '-'),
  ('밤 기병의 철퇴', 'poison', 'D', 'B', '-', '-', 'D'),
  ('밤 기병의 철퇴', 'blood', 'D', 'B', '-', '-', 'D'),
  ('밤 기병의 철퇴', 'occult', 'E', 'D', '-', '-', 'B'),
  ('편곤', 'standard', 'B', 'E', '-', '-', '-'),
  ('편곤', 'heavy', 'S', '-', '-', '-', '-'),
  ('편곤', 'keen', 'E', 'A', '-', '-', '-'),
  ('편곤', 'quality', 'B', 'B', '-', '-', '-'),
  ('편곤', 'fire', 'C', 'E', '-', '-', '-'),
  ('편곤', 'flame_art', 'D', 'E', '-', 'B', '-'),
  ('편곤', 'lightning', 'E', 'C', '-', '-', '-'),
  ('편곤', 'sacred', 'D', 'E', '-', 'B', '-'),
  ('편곤', 'magic', 'D', 'E', 'B', '-', '-'),
  ('편곤', 'cold', 'B', 'E', 'C', '-', '-'),
  ('편곤', 'poison', 'A', 'E', '-', '-', 'D'),
  ('편곤', 'blood', 'A', 'E', '-', '-', 'D'),
  ('편곤', 'occult', 'D', 'E', '-', '-', 'B'),
  ('가족의 머리', 'standard', 'D', 'A', 'D', '-', '-'),
  ('불뱀 철퇴', 'standard', 'E', 'C', '-', 'B', '-'),
  ('황금률의 철퇴', 'standard', 'E', 'D', '-', 'B', '-'),
  ('떨어진 별들', 'standard', 'E', 'C', 'A', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '철퇴'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
