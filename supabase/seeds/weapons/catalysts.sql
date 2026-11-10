-- 촉매 32종: SmithBox PC Regulation 1.17.3과 한국어 FMG.
-- 공통 기준: docs/DATABASE.md, 개별 출처·변환: docs/DATA_SOURCES.md.
do $$
begin
  if (select count(*) from public.game_item_categories where type = 'catalyst' and name in ('지팡이','성인')) <> 2 then
    raise exception '촉매 2개 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select i.category_id, i.name from public.game_items i join public.game_item_categories c on c.id = i.category_id
    where c.type = 'catalyst' and c.name in ('지팡이','성인')
    group by i.category_id, i.name having count(*) > 1
  ) or exists (
    select name, description from public.weapon_skills
    where name in ('돌아라 돌아라')
    group by name, description having count(*) > 1
  ) then raise exception '중복 아이템·기술을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('돌아라 돌아라', '휘석에 마력을 담고 왕홀을 전방에 띄워
고속으로 회전시키는 전투 기술.
닿는 자에게 마력 연속 공격을 한다.', '20')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, category, sort_order, content_code, game_description, effect_description) as (
  values
  ('별점 지팡이', '지팡이', 10, 'base_game', '별을 올려보는 자들의 지팡이.
끝에 휘석이 박힌 그것은
마술을 사용하기 위한 촉매이다.

마술을 사용하려면 지팡이를 장비하고
축복에서 마술을 기억해 둬야 한다.', null),
  ('휘석 지팡이', '지팡이', 20, 'base_game', '끝에 휘석을 박은 지팡이.
마술을 사용하기 위한 촉매이다.

마술을 사용하려면 지팡이를 장비하고
축복에서 마술을 기억해 둬야 한다.', null),
  ('학원의 휘석 지팡이', '지팡이', 30, 'base_game', '청록색 휘석이 박힌 지팡이.
레아 루카리아 학원의 마술 지팡이.

마술사의 이름에 걸맞은 자만이
이것을 가지고 마술을 사용할 수 있다.', null),
  ('채석 지팡이', '지팡이', 40, 'base_game', '결정 갱도의 휘석 광부들의 지팡이.
지팡이 자체가 채석 도구이며
물미에도 단단한 휘석이 박혀있다.

광부의 마술을 특히 강화한다.', '채굴 마술의 위력이 20% 증가한다.'),
  ('아인 여왕의 지팡이', '지팡이', 50, 'base_game', '왕홀의 장식이 된 휘석 지팡이.
과거에 아인들을 회유하기 위해 보낸 물건이며
지력이 낮은 자도 사용할 수 있다.

학원에서는 바보가 이것을 비웃는다.', null),
  ('아줄의 휘석 지팡이', '지팡이', 60, 'base_game', '원류의 마술사 아줄의 휘석 지팡이.
돌의 지혜, 그 아득한 너머에 닿은 자만이
이것을 사용할 수 있다.

모든 마술의 사용 속도를 빠르게 하나
소비 FP도 증가한다.', '마술·기도의 사용 속도가 기량 40에 해당하는 만큼 빨라진다. 마술의 소비 FP는 20% 증가하며 기도에는 FP 페널티가 없다.'),
  ('루사트의 휘석 지팡이', '지팡이', 70, 'base_game', '원류의 마술사 루사트의 휘석 지팡이.
돌의 지혜, 그 아득한 너머에 닿은 자만이
이것을 사용할 수 있다.

모든 마술의 위력을 높이나
소비 FP도 증가한다.', '마술 보정이 높으나 모든 마술의 소비 FP가 50% 증가한다.'),
  ('카리아의 휘석 지팡이', '지팡이', 80, 'base_game', '파란색 휘석이 박힌 지팡이.
두 개 있는 카리아 지팡이 중 하나.

마술사를 기사로 만드는 지팡이이며
카리아의 검 마술을 강화한다.', '카리아의 검 마술 위력이 15% 증가한다.'),
  ('카리아의 휘검 지팡이', '지팡이', 90, 'base_game', '파란색 휘석이 박힌 지팡이.
두 개 있는 카리아 지팡이 중 하나.

마술기사에게 선사하는 지팡이이며
휘검 마술을 강화한다.', '휘검 마술 위력이 15% 증가한다.'),
  ('카리아의 왕홀', '지팡이', 100, 'base_game', '만월의 여왕 레날라의 마술 왕홀.
그 휘석은 카리아의 파랑이라 불리며
만월의 마술을 강화한다.

최고의 지성에게만 허락된
최상의 휘석 지팡이일 것이다.', '만월 마술의 위력이 10% 증가한다.'),
  ('백금 지팡이', '지팡이', 110, 'base_game', '파란색 휘석이 박힌 짧은 지팡이.
옛 백금의 사람들의 휘석 지팡이.

백금의 사람에게는 비밀이 있다.
그들은 신비로 마술을 사용한다.', null),
  ('상실의 지팡이', '지팡이', 120, 'base_game', '휘석을 잃은 마술 지팡이.
고행에서 탐구를 찾아내는 마술사들의 물건.

다만 보이지 않는 마술과의 상성만은 좋아
그것을 위해 이 지팡이를 고르는 자도 있다.', '밤의 혜성·밤의 돌팔매의 위력이 30% 증가한다.'),
  ('겔미어의 휘석 지팡이', '지팡이', 130, 'base_game', '두 갈래로 나뉜 끝에 붉은 휘석을 박은 지팡이.
용암 마술을 강화한다.

겔미어의 뱀인간은 지력이 아닌
신앙으로 마술을 사용한다.', '용암 마술의 위력이 15% 증가한다.'),
  ('결정 지팡이', '지팡이', 140, 'base_game', '인간은 만들 수 없는 순결정 지팡이.
결정인의 마술을 강화한다.

결정인의 미약한 사색은 돌의 지혜라 불린다.
높은 지력으로 여기에 닿을 수 있는 자만이
인간의 몸으로 이 지팡이를 사용할 수 있다.', '결정인의 마술 위력이 10% 증가한다.'),
  ('부패한 결정 지팡이', '지팡이', 150, 'base_game', '인간은 만들 수 없는 순결정 지팡이가
붉은 부패에 잠식된 것.

결정인의 마술을 강화한다.', '결정인의 마술 위력이 10% 증가한다. 붉은 부패 축적은 지팡이 직접 타격에만 적용되며 마술에는 적용되지 않는다.'),
  ('운석 지팡이', '지팡이', 160, 'base_game', '암자색 휘석이 박힌 지팡이.
운석의 조각이라고 하며
마술 보정이 높고 중력 마술을 강화한다.

하지만 이 지팡이는 강화할 수 없다.', '강화할 수 없다. 중력 마술의 위력이 30% 증가한다.'),
  ('죄인의 지팡이', '지팡이', 170, 'base_game', '그을은 마른 나무 끝에 제물을 찔러
그 피를 휘석으로 삼는 이단의 마술 지팡이.
그것은 이미 주술에 가깝다.

지력이 아닌 신앙으로 마술을 보정하며
특히 가시 마술을 강화한다.', '지력 대신 신앙으로 마술을 보정한다. 가시 마술의 위력이 20% 증가한다. 직접 타격 시 출혈을 축적한다.'),
  ('죽음의 왕자의 지팡이', '지팡이', 180, 'base_game', '더러워진 호박이 박힌 지팡이.
그것은 죽음의 왕자의 일부라고 하며
죽음의 마술을 강화한다.

학원이 인정하지 않는 이단의 지팡이 중 하나.
신앙으로도 마술의 위력을 높인다.', '죽음의 마술 위력이 10% 증가한다.'),
  ('어머니의 지팡이', '지팡이', 190, 'shadow_of_the_erdtree', '손가락의 어머니를 흉내낸 유미르 경의 지팡이.
그 몸에 새끼손가락이 없는 그의 대체품.

손가락 마술을 강화한다.

수정구슬은 소우주를 본떴으나
파동을 수신하는 일이 없다.', '손가락 마술의 위력이 15% 증가한다.'),
  ('위대한 저편의 지팡이', '지팡이', 200, 'shadow_of_the_erdtree', '손가락의 어머니 메티르의 새끼손가락과
그 손가락이 내건 소우주를 지팡이 삼은 것.

마술과 기도 모두의 촉매가 된다.

어머니는 위대한 뜻의 파동을 수신했다.
망가지고, 버려지고도 계속 그것을 기다렸다.', '마술과 기도 모두 사용할 수 있다.'),
  ('손가락의 성인', '성인', 10, 'base_game', '손가락 읽는 무녀가 주는 성인.
기도를 사용하기 위한 촉매이다.

기도를 사용하려면 성인을 장비하고
축복에서 기도를 기억해 둬야 한다.', null),
  ('황금 나무의 성인', '성인', 20, 'base_game', '황금 나무의 문장을 본뜬 환영 성인.
틈새의 신앙, 과거에 그 중심에 있었던 것.

엘든 링이 부서지고 황금 나무가 그늘져도
그것은 한결같은 신앙에 계속 응답한다.', null),
  ('황금률의 성인', '성인', 30, 'base_game', '규율의 관측의를 본뜬 환영 성인.
황금률 원리주의 기도를 강화한다.

원리주의는 즉 학문이기도 하며
신앙과 지력 둘 다 기도를 보정한다.', '황금률 원리주의 기도의 위력이 10% 증가한다.'),
  ('낙엽의 성인', '성인', 40, 'shadow_of_the_erdtree', '낙엽파라 불리는 구도자들의 성인.

황금 빛고리 기도를 강화한다.

과거, 낙엽에서 황금 나무의 쇠퇴를 본 자들은
규율의 흔들림에 대비해 자신에게 엄격한 신앙을
부과하고, 새로운 신을 섬기고자 했다.', '빛고리·세 개의 빛고리·라다곤의 빛고리·겹쳐지는 빛고리의 위력이 15% 증가한다. 미켈라의 빛에는 적용되지 않는다.'),
  ('불의 기사의 성인', '성인', 50, 'shadow_of_the_erdtree', '가시공 메스메르의 직속인
불의 기사들의 성인.

메스메르의 불 기도를 강화한다.

메스메르군의 상징인 문장에는
황금 고리와 함께 성인의 불이 그려져 있다.', '메스메르의 불 기도의 위력이 15% 증가한다.'),
  ('나선 나무의 성인', '성인', 60, 'shadow_of_the_erdtree', '더럽혀진 호박에 나선 나무가 각인된 성인.

나선 기도를 강화한다.

신에 닿으려고 한 흰 탑의 위용은
침략자인 황금 나무의 백성마저
남몰래 신앙심을 품도록 만들었다.', '나선 기도의 위력이 20% 증가한다.'),
  ('조약돌의 성인', '성인', 70, 'base_game', '고룡의 비늘이라고 하는 자갈의 성인.
도읍 고룡신앙의 기도를 강화한다.

고룡신앙은 황금 나무에 대한 배신은 아니다.
이 성인도 벼락도 모두 금색이 아닌가.', '도읍 고룡 신앙의 기도 위력이 15% 증가한다.'),
  ('거인의 성인', '성인', 80, 'base_game', '불의 거인들의 신, 그 외눈을 본뜬 성인.
땋은 붉은 머리카락으로 장식되었다.

불의 승병, 사제들의 성인이며
거인의 불 기도를 강화한다.', '거인의 불 기도의 위력이 20% 증가한다.'),
  ('신 사냥의 성인', '성인', 90, 'base_game', '흑요석이 박힌 성인.
신의 살갗의 사도들이 사용하는 성인.

검은 불꽃의 주먹을 본떴다고 하며
신 사냥의 기도를 강화한다.', '신 사냥의 기도 위력이 10% 증가한다. 귀족의 배짱 및 흑염의 지속 피해에는 적용되지 않는다.'),
  ('발톱 자국의 성인', '성인', 100, 'base_game', '짐승의 사제 그랭이 주는 성인.
근력으로도 기도를 보정하는 희귀한 물건.

그 발톱 자국은 그랭의 분노이며
그가 주는 짐승의 기도를 강화한다.', '짐승의 기도 위력이 10% 증가한다.'),
  ('미친 불의 성인', '성인', 110, 'base_game', '세 손가락의 무녀가 주는 환영 성인.
미친 불의 기도를 강화한다.

그것은 미친 불의 왕인 증표이며
근력, 기량, 지력, 신앙
그 모든 것들이 기도를 보정한다.', '미친 불의 기도 위력이 20% 증가한다.'),
  ('용찬의 표식', '성인', 120, 'base_game', '용찬의 문장을 본뜬 용혈의 환영 성인.
용찬 기도를 강화한다.

심장을 바치고 먹어 힘을 얻는다.
용찬의 모습은 기도라기에는 너무 야만적이며
이 성인은 신비로도 기도를 보정한다.', '용찬 기도의 위력이 15% 증가한다.')
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'catalyst', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s join public.game_item_categories c on c.type = 'catalyst' and c.name = s.category
where not exists (select 1 from public.game_items i where i.category_id = c.id and i.name = s.name);

with source (name, category, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('별점 지팡이', '지팡이', null, 3, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25, 15, 15, 15, 15, 100, 15, 0, 0, 0, 0, 0, 0, 7, 0, 16, 0, 0),
  ('휘석 지팡이', '지팡이', null, 3, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25, 15, 15, 15, 15, 100, 15, 0, 0, 0, 0, 0, 0, 6, 0, 10, 0, 0),
  ('학원의 휘석 지팡이', '지팡이', null, 3, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25, 15, 15, 15, 15, 100, 15, 0, 0, 0, 0, 0, 0, 6, 0, 28, 0, 0),
  ('채석 지팡이', '지팡이', null, 4.5, '타격', 'smithing_stone', false, 66, 0, 0, 0, 0, 28, 17, 17, 17, 17, 100, 17, 0, 0, 0, 0, 0, 0, 8, 0, 12, 0, 0),
  ('아인 여왕의 지팡이', '지팡이', null, 3, '타격', 'smithing_stone', false, 54, 0, 0, 0, 0, 25, 15, 15, 15, 15, 100, 15, 0, 0, 0, 0, 0, 0, 6, 0, 10, 0, 0),
  ('아줄의 휘석 지팡이', '지팡이', null, 4, '타격', 'somber_smithing_stone', false, 58, 0, 0, 0, 0, 25, 15, 15, 15, 15, 100, 15, 0, 0, 0, 0, 0, 0, 10, 0, 52, 0, 0),
  ('루사트의 휘석 지팡이', '지팡이', null, 4, '타격', 'somber_smithing_stone', false, 58, 0, 0, 0, 0, 25, 15, 15, 15, 15, 100, 15, 0, 0, 0, 0, 0, 0, 10, 0, 52, 0, 0),
  ('카리아의 휘석 지팡이', '지팡이', null, 3, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25, 15, 15, 15, 15, 100, 15, 0, 0, 0, 0, 0, 0, 6, 8, 24, 0, 0),
  ('카리아의 휘검 지팡이', '지팡이', null, 2.5, '타격', 'smithing_stone', false, 38, 0, 0, 0, 0, 23, 14, 14, 14, 14, 100, 14, 0, 0, 0, 0, 0, 0, 6, 12, 22, 0, 0),
  ('카리아의 왕홀', '지팡이', '돌아라 돌아라', 3, '타격', 'somber_smithing_stone', false, 58, 0, 0, 0, 0, 25, 15, 15, 15, 15, 100, 15, 0, 0, 0, 0, 0, 0, 8, 10, 60, 0, 0),
  ('백금 지팡이', '지팡이', null, 2.5, '타격', 'smithing_stone', false, 29, 0, 0, 0, 0, 23, 14, 14, 14, 14, 100, 14, 0, 0, 0, 0, 0, 0, 6, 0, 10, 0, 12),
  ('상실의 지팡이', '지팡이', null, 2.5, '타격', 'smithing_stone', false, 38, 0, 0, 0, 0, 23, 14, 14, 14, 14, 100, 14, 0, 0, 0, 0, 0, 0, 6, 12, 14, 0, 0),
  ('겔미어의 휘석 지팡이', '지팡이', null, 2.5, '타격', 'smithing_stone', false, 50, 0, 0, 0, 0, 23, 14, 14, 14, 14, 100, 14, 0, 0, 0, 0, 0, 0, 6, 0, 14, 14, 0),
  ('결정 지팡이', '지팡이', null, 4.5, '타격', 'somber_smithing_stone', false, 75, 0, 0, 0, 0, 28, 17, 17, 17, 17, 100, 17, 0, 0, 0, 0, 0, 0, 8, 0, 48, 0, 0),
  ('부패한 결정 지팡이', '지팡이', null, 4.5, '타격', 'somber_smithing_stone', false, 102, 0, 0, 0, 0, 28, 17, 17, 17, 17, 100, 17, 50, 0, 0, 0, 0, 0, 8, 0, 48, 0, 0),
  ('운석 지팡이', '지팡이', null, 4.5, '타격', null, false, 39, 0, 0, 0, 0, 28, 17, 17, 17, 17, 100, 17, 0, 0, 0, 0, 0, 0, 6, 0, 18, 0, 0),
  ('죄인의 지팡이', '지팡이', null, 4.5, '타격', 'smithing_stone', false, 66, 0, 0, 0, 0, 28, 17, 17, 17, 17, 100, 17, 0, 0, 45, 0, 0, 0, 8, 0, 0, 12, 0),
  ('죽음의 왕자의 지팡이', '지팡이', null, 3, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25, 15, 15, 15, 15, 100, 15, 0, 0, 0, 0, 0, 0, 6, 0, 18, 18, 0),
  ('어머니의 지팡이', '지팡이', null, 2.5, '타격', 'smithing_stone', false, 45, 0, 0, 0, 0, 22, 14, 14, 14, 14, 100, 13, 0, 0, 0, 0, 0, 0, 7, 0, 21, 0, 21),
  ('위대한 저편의 지팡이', '지팡이', null, 2.5, '타격', 'somber_smithing_stone', false, 66, 0, 0, 0, 0, 26, 16, 16, 16, 16, 100, 15, 0, 0, 0, 0, 0, 0, 7, 0, 25, 25, 0),
  ('손가락의 성인', '성인', null, 1.5, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 4, 0, 0, 10, 0),
  ('황금 나무의 성인', '성인', null, 0.0, '타격', 'somber_smithing_stone', false, 61, 0, 0, 0, 36, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0),
  ('황금률의 성인', '성인', null, 0.0, '타격', 'somber_smithing_stone', false, 58, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 0, 0, 17, 17, 0),
  ('낙엽의 성인', '성인', null, 1.5, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 8, 0, 0, 27, 0),
  ('불의 기사의 성인', '성인', null, 1.5, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 8, 0, 0, 23, 0),
  ('나선 나무의 성인', '성인', null, 1.5, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 8, 0, 0, 17, 0),
  ('조약돌의 성인', '성인', null, 1.5, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 4, 0, 0, 18, 0),
  ('거인의 성인', '성인', null, 1.5, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 4, 0, 0, 14, 0),
  ('신 사냥의 성인', '성인', null, 1.5, '타격', 'smithing_stone', false, 43, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 4, 0, 0, 27, 0),
  ('발톱 자국의 성인', '성인', null, 1.5, '타격', 'smithing_stone', false, 54, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 4, 0, 0, 10, 0),
  ('미친 불의 성인', '성인', null, 0.0, '타격', 'somber_smithing_stone', false, 61, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 55, 0, 0, 0, 0, 0),
  ('용찬의 표식', '성인', null, 0.0, '타격', 'somber_smithing_stone', false, 61, 0, 0, 0, 0, 25.0, 15.0, 15.0, 15.0, 15.0, 100, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'catalyst', s.weight, case when s.physical_attack_types = '타격' then array['strike']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'catalyst' and c.name = s.category
join public.game_items i on i.category_id = c.id and i.name = s.name
left join public.weapon_skills k on k.name = s.skill_name
on conflict (game_item_id) do nothing;

with source (name, category, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('별점 지팡이', '지팡이', 'standard', 'D', '-', 'S', '-', '-'),
  ('휘석 지팡이', '지팡이', 'standard', 'D', '-', 'S', '-', '-'),
  ('학원의 휘석 지팡이', '지팡이', 'standard', 'D', '-', 'S', '-', '-'),
  ('채석 지팡이', '지팡이', 'standard', 'C', '-', 'S', '-', '-'),
  ('아인 여왕의 지팡이', '지팡이', 'standard', 'C', '-', 'S', '-', '-'),
  ('아줄의 휘석 지팡이', '지팡이', 'standard', 'C', '-', 'S', '-', '-'),
  ('루사트의 휘석 지팡이', '지팡이', 'standard', 'C', '-', 'S', '-', '-'),
  ('카리아의 휘석 지팡이', '지팡이', 'standard', 'D', '-', 'S', '-', '-'),
  ('카리아의 휘검 지팡이', '지팡이', 'standard', 'D', 'D', 'S', '-', '-'),
  ('카리아의 왕홀', '지팡이', 'standard', 'D', 'D', 'S', '-', '-'),
  ('백금 지팡이', '지팡이', 'standard', 'D', '-', 'B', '-', 'S'),
  ('상실의 지팡이', '지팡이', 'standard', 'D', 'D', 'S', '-', '-'),
  ('겔미어의 휘석 지팡이', '지팡이', 'standard', 'D', '-', 'B', 'B', '-'),
  ('결정 지팡이', '지팡이', 'standard', 'C', '-', 'S', '-', '-'),
  ('부패한 결정 지팡이', '지팡이', 'standard', 'C', '-', 'S', '-', '-'),
  ('운석 지팡이', '지팡이', 'standard', 'D', '-', 'S', '-', '-'),
  ('죄인의 지팡이', '지팡이', 'standard', 'C', '-', '-', 'S', '-'),
  ('죽음의 왕자의 지팡이', '지팡이', 'standard', 'D', '-', 'A', 'A', '-'),
  ('어머니의 지팡이', '지팡이', 'standard', 'D', '-', 'A', '-', 'A'),
  ('위대한 저편의 지팡이', '지팡이', 'standard', 'D', '-', 'B', 'B', '-'),
  ('손가락의 성인', '성인', 'standard', 'D', '-', '-', 'S', '-'),
  ('황금 나무의 성인', '성인', 'standard', '-', '-', '-', 'S', '-'),
  ('황금률의 성인', '성인', 'standard', '-', '-', 'A', 'A', '-'),
  ('낙엽의 성인', '성인', 'standard', 'D', '-', '-', 'S', '-'),
  ('불의 기사의 성인', '성인', 'standard', 'D', '-', '-', 'S', '-'),
  ('나선 나무의 성인', '성인', 'standard', 'D', '-', '-', 'S', '-'),
  ('조약돌의 성인', '성인', 'standard', 'D', '-', '-', 'S', '-'),
  ('거인의 성인', '성인', 'standard', 'D', '-', '-', 'S', '-'),
  ('신 사냥의 성인', '성인', 'standard', 'D', '-', '-', 'S', '-'),
  ('발톱 자국의 성인', '성인', 'standard', 'B', '-', '-', 'B', '-'),
  ('미친 불의 성인', '성인', 'standard', 'C', 'C', 'C', 'B', '-'),
  ('용찬의 표식', '성인', 'standard', '-', '-', '-', 'B', 'S')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane from source s
join public.game_item_categories c on c.type = 'catalyst' and c.name = s.category
join public.game_items i on i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
