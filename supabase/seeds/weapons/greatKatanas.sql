-- 사용자 제공 대형 도 4종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '대형 도') then
    raise exception '대형 도 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '대형 도'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('대상단','용상 베기','풀베기')
    group by name, description having count(*) > 1
  ) then
    raise exception '대형 도 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('대상단', '머리 위로 높게 검을 올리는 전투 기술.
일반 공격은 파고들며 내려 베기,
강 공격은 연속 내려 베기로 파생한다.', '- ( 8 / 10 )'),
  ('용상 베기', '거대한 용을 사냥하기 위한 전투 기술.
조약돌 역가시에 기를 두른 뒤 도약해
높은 위치에서 기세를 실어 내려 벤다.
차지 공격 시 두른 기를 함께 방출한다.', '18 ( - / - )'),
  ('풀베기', '크게 검을 휘둘러 사람을 베는 전투 기술.
추가 입력으로 공격을 계속할 수 있으며
스테미나가 다할 때까지 이어진다.', '8 ( - / 8 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('갈대의 대형 도', 10, 'tarnished_pack', '무겁고 긴 도신을 지닌 대형 도.
갈대의 땅 무사들의 독특한 무기 중 하나.

전신을 써서 휘두르는 공세의 무기이며
그 참격은 상대에게 출혈을 유발한다.', null),
  ('대도', 20, 'shadow_of_the_erdtree', '칼날에 무늬가 떠오르는, 검은 도신의 대형 도.
갈대의 땅 무사들이 쓰는 독특한 무기 중에서도
잘 연단된 질 좋은 물건.

전신을 써서 휘두르는 공세의 무기이며
그 참격은 상대에게 출혈을 유발한다.', null),
  ('용 사냥꾼의 대도', 30, 'shadow_of_the_erdtree', '도신에 조약돌 가시가 있는 대형 도.
용굴의 고룡인이 사용하는 무기.

용에 대한 특효가 있다.
고룡인은 과거에 용찬의 전사 중 하나였으며
폭룡을 먹을 수 있는 전사를 선별하고 있었다.
전용 전투 기술「용상 베기」

거대한 용을 사냥하기 위한 전투 기술.
조약돌 역가시에 기를 두른 뒤 도약해
높은 위치에서 기세를 실어 내려 벤다.
차지 공격 시 두른 기를 함께 방출한다.
Dragon-Hunter''s Great Katana/竜狩りの大刀 용굴의 보스인 고룡인을 처지하면 획득 가능.[115]

근력과 기량만 요구하며, 요구치조차 크게 높지 않아서 일반적인 밀리캐는 물론, 지력/신앙캐도 라다곤의 각인같은 스탯보정 탈리스만을 쓰면 크게 어렵지않게 사용할 수 있다. 전기인 용상 베기는 입력시 공중으로 도약하여 내려베고, 차징으로 사용시 좀 더 오래 체공하면서 궤적을 따라 검기가 나간다. 도약하고 있는 동안 강인도가 증가하고, 검기류 기술이 대개 그렇듯 칼날 부분에 추가 대미지가 있다.

이름대로 용 상대에 최적화된 완벽한 무기. 비룡에게 30%, 고룡에게 15%의 추가 대미지를 주며 전투 기술인 용상 베기에 추가로 고룡 비룡 모두에게 20%의 추가 대미지를 주는 효과가 붙어 있다. 즉 용상베기는 실질적으로 고룡에게 35%, 비룡에게 50%의 추가 대미지 보정이 붙어있다. 거기에 용종 몬스터는 대부분 머리가 떠있어서 밀리캐로는 이를 노리기 까다로운데, 용상베기는 높게 점프해서 내려베며 검기까지 쏠 수 있어서 머리를 노리기도 쉽다. 그로기 축적치도 빵빵해서 머리에 날과 검기를 함께 꽂아주면 1회차 기준 어지간한 비룡들은 3방 만에 그로기가 터진다. 무기 자체의 용특공과 전투 기술의 용특공에 머리 약점까지 더하면 용종 보스 중 최강인 폭룡 베일까지 수월하게 잡을 수 있게 해주는 강력함을 가지고 있다. 한번 휘두르면 근기 50에도 4천의 딜을 때려박을 수 있고, 파름 아즈라의 고룡들 상대로도 2000 중반~후반대 데미지를 낼 수 있는 무기다. 용에게 추가 피해를 주는 무기군은 거의 대부분 벼락 피해라 벼락내성이 높은 고룡을 상대로 효과가 반감되는 반면, 용사냥꾼의 대도는 추가 피해 계수가 비룡에 비해 살짝 낮아질 뿐, 순수 물리 속성이라 온전히 딜을 박을 수 있다. 다만, 용왕 플라키두삭스에게는 추가 대미지가 적용되지 않는다. [116]

고룡인이 쓰는데서 알 수 있듯, 전기가 상당히 높은 강인도 보정이 있어 전기 사용중 끊길 일도 없고 검기류 전회답게 근접해서 맞추면 추가타까지 가능해 꽤 무거운 대도 무기군이라는 점까지 겹쳐 용종 외 몬스터를 상대할때도 나름 쓸만하다.

단점이라면 전기 사용 시 스태미나 소모량이 매우 크다는 것과 검기뿐 아니라 검날까지 맞혀야 데미지가 풀로 들어간다는 것. 특이사항으로 분명 점프해서 베는 동작임에도 점프 판정이 아니라서 장판딜은 고스란히 입는다.

설정상 용찬 관련 무기이긴 하나, 게임 외적으로는 밀리캐가 이후 나올 톱니산의 용종 보스들을 상대하기 위한 구제책에 가깝다. 이 때문에 원주인인 고룡인마냥 용찬 기도와 함께 쓰려면 실질적으로 지력 외 모든 스탯을 높게 찍는 초 고렙 빌드에서나 시도해봄직하다.', '비룡형 적에게 30%, 고룡형 적에게 15%의 추가 대미지를 준다. 용왕 플라키두삭스에게는 적용되지 않는다.'),
  ('나찰의 대도', 40, 'shadow_of_the_erdtree', '인문을 피의 붉은 색으로 물들인 대형 도.
사람을 베고 먹어치우는 나찰의 무기.
살을 베고 뼈를 끊는 미친 공세의 무기이며
공격 중 반격에 잘 움츠러들지 않게 되지만
받는 대미지도 커진다.
전용 전투 기술「풀베기」

크게 검을 휘둘러 사람을 베는 전투 기술.
추가 입력으로 공격을 계속할 수 있으며
스테미나가 다할 때까지 이어진다.
Rakshasa''s Great Katana/羅刹の大刀 그림자 알터 - ''동쪽의 무명 영묘''에서 등장하는 나찰을 처치하고 나찰의 방어구 세트와 함께 획득할 수 있다. 시산혈하를 확장한 듯한 모양새지만 날이 들쭉날쭉한 시산혈하와 달리 깔끔하게 생겼다. 또한 자세히 보면 시산혈하는 칼날도 칼등도 피로 장아찌를 담근 듯이 빨갛게 찌든 모습인데 이쪽은 칼등 부분은 비교적 멀쩡하다.

대형 도 에서 기본 공격력이 높고[119] 기량 보정 역시 B로 가장 높다. 특히 강공격의 경우 횡베기를 하는 다른 대도와 다르게 나찰의 대도는 고유의 찌르기 모션으로 구성되어있다.

전투 기술 풀베기는 나찰이 쓰던 그 패턴이다. 잠시 준비 자세를 갖고 발을 구른 뒤 짧게 전진하며 좌우로 한 번씩 베고, 추가 입력 시 다시 전진하며 좌우로 베는 동작을 반복한다. 이때 전기 모션 중에 방향을 어느 정도 바꿀 수 있고 추가 입력 시에도 적용된다. FP를 소비하긴 하지만 중간에 FP를 다 써도 지속이 가능하며, 스테미나를 완전히 소진할 때까지 지속할 수 있다. 처음에는 공격 속도가 느린 편이었지만 1.13 패치에서 전기의 공격 속도가 증가해 적극적으로 사용하기 좋아졌다.

전기의 공격 범위가 넓고 연속 공격으로 적에게 지속적인 경직과 출혈을 유발할 수 있으며, 무기 설명에도 나와 있듯이 전기 중에는 높은 강인도 보정을 받아 중형급 적과의 맞딜에도 강하다. 특히 인간형 및 NPC형 적은 첫 공격에 경직되거나 연속 공격 사이에 구르기를 사용하더라도 다음 공격에 다시 걸리는 경우가 많아 풀베기에 취약하다. 공격이 지형에 닿아도 튕기지 않기 때문에 좁은 공간에서도 사용하기 쉽다.

대신 이러한 공격적인 성능에 대한 페널티로 무기 설명에 나와 있듯이 일반 공격을 포함한 공격 모션 중 받는 피해가 10% 증가한다. 그렇기에 고회차에서 나찰이 하던 것처럼 나찰 세트를 입고 무작정 풀베기를 쓰면 적의 공격에 쉽게 축복으로 사출당하기 쉽고, 무아 세트 같은 중갑 세트를 입어 경감률을 충분히 챙긴뒤 사용하는 방식이 추천된다.

PvP에서도 긴 리치와 찌르기 강공격, 공격 중 높은 강인도를 바탕으로 적극적인 맞공격에 유리하며, 풀베기 역시 넓은 범위와 연속 공격을 이용한 압박 수단으로 활용된다. 또한 나찰의 대도를 왼손에 장비하고 오른손에 공격 속도가 빠른 무기를 사용해 왼손 공격에서 오른손 공격으로 이어지는 확정 콤보를 노리는 운용도 사용되었다. 이 때문에 PvP 성능은 여러 차례 조정되었다. 1.14 패치에서는 PvP 한정으로 풀베기 후속 공격의 강인도 보정이 감소했으며, 1.17 패치에서는 공격 중 다른 플레이어에게 받는 피해가 더욱 증가하도록 하향되었다. 같은 패치에서 왼손으로 공격한 뒤 오른손 무기로 연계하기까지의 시간도 증가하여 앞서 언급한 연속 공격 운용 역시 하향되었다.

악귀인 나찰이라는 이명에 걸맞게 무기 착용 시 해당 무기를 넣는 칼집이 존재하지 않는다.[120] 대태도의 칼집이 워낙 큰 편이라서 룩을 중시한다면 참고하자.', '공격 중 반격에 잘 움츠러들지 않지만 받는 대미지도 증가한다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 도'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('갈대의 대형 도', '대상단', 10.0, '참격 / 관통', 'smithing_stone', true, 387, 0, 0, 0, 0, 57.0, 28.0, 28.0, 28.0, 28.0, 100, 39, 0, 0, 55, 0, 0, 0, 11, 16, 0, 0, 0),
  ('대도', '대상단', 9.0, '참격 / 관통', 'smithing_stone', true, 355, 0, 0, 0, 0, 60.0, 30.0, 30.0, 30.0, 30.0, 100, 42, 0, 0, 55, 0, 0, 0, 14, 18, 0, 0, 0),
  ('용 사냥꾼의 대도', '용상 베기', 10.5, '참격 / 관통', 'somber_smithing_stone', false, 372, 0, 0, 0, 0, 69.0, 32.0, 32.0, 32.0, 32.0, 100, 40, 0, 0, 55, 0, 0, 0, 15, 20, 0, 0, 0),
  ('나찰의 대도', '풀베기', 9.5, '참격 / 관통', 'somber_smithing_stone', false, 379, 0, 0, 0, 0, 53.0, 24.0, 24.0, 24.0, 24.0, 100, 38, 0, 0, 55, 0, 0, 0, 12, 27, 0, 0, 0)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 도'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('갈대의 대형 도', 'standard', 'D', 'D', '-', '-', '-'),
  ('갈대의 대형 도', 'heavy', 'B', '-', '-', '-', '-'),
  ('갈대의 대형 도', 'keen', 'E', 'B', '-', '-', '-'),
  ('갈대의 대형 도', 'quality', 'C', 'C', '-', '-', '-'),
  ('갈대의 대형 도', 'fire', 'D', 'E', '-', '-', '-'),
  ('갈대의 대형 도', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('갈대의 대형 도', 'lightning', 'E', 'D', '-', '-', '-'),
  ('갈대의 대형 도', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('갈대의 대형 도', 'magic', 'E', 'E', 'C', '-', '-'),
  ('갈대의 대형 도', 'cold', 'D', 'C', 'C', '-', '-'),
  ('갈대의 대형 도', 'poison', 'D', 'C', '-', '-', 'D'),
  ('갈대의 대형 도', 'blood', 'D', 'C', '-', '-', 'D'),
  ('갈대의 대형 도', 'occult', 'E', 'E', '-', '-', 'C'),
  ('대도', 'standard', 'D', 'C', '-', '-', '-'),
  ('대도', 'heavy', 'B', '-', '-', '-', '-'),
  ('대도', 'keen', 'E', 'B', '-', '-', '-'),
  ('대도', 'quality', 'B', 'B', '-', '-', '-'),
  ('대도', 'fire', 'C', 'E', '-', '-', '-'),
  ('대도', 'flame_art', 'E', 'D', '-', 'C', '-'),
  ('대도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('대도', 'sacred', 'E', 'D', '-', 'C', '-'),
  ('대도', 'magic', 'E', 'E', 'C', '-', '-'),
  ('대도', 'cold', 'D', 'C', 'C', '-', '-'),
  ('대도', 'poison', 'D', 'C', '-', '-', 'D'),
  ('대도', 'blood', 'D', 'C', '-', '-', 'D'),
  ('대도', 'occult', 'E', 'D', '-', '-', 'B'),
  ('용 사냥꾼의 대도', 'standard', 'C', 'C', '-', '-', '-'),
  ('나찰의 대도', 'standard', 'D', 'B', '-', '-', '-')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대형 도'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
