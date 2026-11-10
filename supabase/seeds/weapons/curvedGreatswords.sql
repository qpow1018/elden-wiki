-- 사용자 제공 대곡검 12종. 공통 기준: docs/DATABASE.md, 출처·변환: docs/DATA_SOURCES.md.
-- 수치 출처: PC Regulation 1.17.3 게임 원본 CSV.
-- 기존 아이템·상세·기술·보정·표시 순서는 덮어쓰지 않습니다.
-- 보완 출처: https://github.com/ThomasJClark/elden-ring-weapon-calculator/blob/master/public/regulation-vanilla-v1.17.js
-- SHA-256: 6ae98b99429cf63f3f2c6a737cf90f6e7507fa67c1dd7e45cad5937a2f3824a5
do $$
begin
  if not exists (select 1 from public.game_item_categories where type = 'weapon' and name = '대곡검') then
    raise exception '대곡검 분류를 먼저 등록해야 합니다.';
  end if;
  if exists (
    select 1 from public.game_items i
    join public.game_item_categories c on c.id = i.category_id
    where c.type = 'weapon' and c.name = '대곡검'
    group by i.name having count(*) > 1
  ) or exists (
    select 1 from public.weapon_skills where name in ('회전 베기','사냥개 검술','흑왕의 척력파','자미엘의 얼음 폭풍','용암 길로틴','뿔내림/폭풍','주혈 참격')
    group by name, description having count(*) > 1
  ) then
    raise exception '대곡검 시드를 적용하기 전에 중복된 아이템·전투 기술 이름을 확인해야 합니다.';
  end if;
end;
$$;

with source (name, description, fp_cost_text) as (
  values
  ('회전 베기', '기량이 뛰어난 검사들의 전투 기술.
크게 몸을 회전시켜 적을 벤다.
또한 추가 입력으로 추가 공격도 가능하다.', '6 ( - / 12 )'),
  ('사냥개 검술', '긴 이빨을 크게 베어올리며 회전해서
적과 거리를 두는 전투 기술. 강 공격으로
사냥개 스텝에 이어 추가 공격을 한다.', '8 ( - / 12 )'),
  ('흑왕의 척력파', '무기를 땅에 찌르고 중력파를 발생시켜
대미지를 입히면서 적을 날려버리는 전투 기술.', '27 ( - /- )'),
  ('자미엘의 얼음 폭풍', '곡도를 땅에 찌르고 힘을 담아
주위에 냉기 폭풍을 일으키는 전투 기술.', '15 ( - / - )'),
  ('용암 길로틴', '비늘검을 물듯이 잡고 전방으로 도약해
내려치면서 용암 폭발을 일으키는 전투 기술.
추가 입력으로 당겨베기 추가 공격을 한다.', '20 ( - / 10 )'),
  ('뿔내림/폭풍', '도신에 혼각을 내리는 전투기술.
그 뿔에 폭풍을 불러 적을 쓸어버린다.
추가 입력으로 2회까지 추가 공격이 가능하다.', '22 ( - / 10 )'),
  ('주혈 참격', '단숨에 파고들어 베는 전투 기술.
피의 궤적은 한순간 늦게 화염 폭발을 일으키며
추가 입력으로 추가 공격도 가능하다.', '20( - / 20 )')
)
insert into public.weapon_skills (name, description, fp_cost_text)
select s.name, s.description, s.fp_cost_text from source s
where not exists (select 1 from public.weapon_skills k where k.name = s.name and k.description = s.description);

with source (name, sort_order, content_code, game_description, effect_description) as (
  values
  ('헤비 시미터', 10, 'tarnished_pack', '두껍고 굽은 칼날을 지닌 대형 곡검.
예리한 참격에 묵직함을 더한 대곡검.

사용하려면 기량에 더해 근력도 필요하나
시원시원한 공격은 여러 적을 쓸어버린다.', null),
  ('참마도', 20, 'base_game', '굳센 카이덴 용병들의 무기.
도의 날렵함과 나대의 묵직함을 겸비한 대곡검.

근력, 기량을 모두 요구하는 어려운 무기이지만
단련된 사용자라면
말 위에서도 종횡무진 휘두를 수 있다.', null),
  ('흉조의 아이 대도', 30, 'base_game', '무거운 칼날을 지닌 거대한 곡도.
전쟁에서 흉조의 아이들에게 주어진
힘만으로 마구 휘두르기 위한 무기.

칼날에 있는 문양은 열화 주술의 흔적이다.
무기를 준다면 뺏을 준비도 필요할 것이다.', null),
  ('승병의 화염도', 40, 'base_game', '흔들리는 불꽃을 본뜬 곡도.
거인들의 산령에서 찾아온
불의 승병들의 독특한 무기.

그들은 리에니에 땅에
불을 훔쳐 달아난 도망자를 쫓고 있다.', null),
  ('수인의 대곡도', 50, 'base_game', '순철을 벼려 만든 거대한 곡도.
파름 아즈라의 수인들이 사용하는 무기.

그 칼날은 끔찍하게 무거우나 밸런스가 뛰어나
위력에 비해 사용하기 편하다.
수인에겐 인간이 이르지 못할 앎이 있을 것이다.', null),
  ('프레이야의 대검', 60, 'shadow_of_the_erdtree', '적사자 프레이야의 무기.
주군을 따라 갈기 장식을 단 대검.

프레이야가 쌓아온 경험이 깃들어 있어
사자 전투 기술을 사용할 때 위력이 높아진다.', '적사자들의 전투 기술 위력을 10% 강화한다. 쌍수로 들어도 중첩되지 않는다.'),
  ('사냥개의 긴 이빨', 70, 'base_game', '완만히 굽은 대형 곡검.
사냥개기사들이 사용하는 무기.

점프 공격도 뛰어난 습격용 검.', '점프 공격의 피해 배율이 다른 대곡검보다 높다.'),
  ('흑왕의 대검', 80, 'base_game', '금색 운철로 만들어진 대검.
검신에는 중력의 힘이 담겨 있다.

과거에 운석 낙하와 함께 태어났다는 고종족
돌 피부를 지닌 흑왕들이 쓰던 무기이다.', '아스테르·내리는 별의 짐승·흑왕·백왕 등 중력 계열 적에게 1.2배 피해를 준다.'),
  ('자미엘의 곡검', 90, 'base_game', '거인 전쟁의 영웅으로 이름난
자미엘 기사들이 사용한 무기.

얼어붙은 바람을 본뜬 곡도는
겨울을 숭배하는 것이라고 하며
강한 동상의 힘을 둘렀다.', null),
  ('토룡의 비늘검', 100, 'base_game', '단단한 비늘로 덮인 거대한 곡검.
용의 턱을 본뜬, 용암토룡들의 무기.

토룡들은 원래는 인간의 영웅이었다고 한다.
용찬을 하고 죄를 저질렀으며
땅을 기는 모습은 그 말로라고 한다.
전용 전투 기술「용암 길로틴」

비늘검을 물듯이 잡고 전방으로 도약해
내려치면서 용암 폭발을 일으키는 전투 기술.
추가 입력으로 당겨베기 추가 공격을 한다.
Magma Wyrm''s Scalesword/土竜の鱗剣 호수의 리에니에 지역에서 알터 고원으로 가는 길인 ''옛 유적 절벽''에서 만날 수 있는 보스인 용암토룡 마카르를 처치하면 획득할 수 있다.

모든 무기들 중에서도 손에 꼽히는 높은 표기 공격력을 가졌다. 게다가 화염 속성인 덕에 화산관 같은 지역을 제외하면 상성도 그리 안 탄다는 것이 장점. 양손 잡기 강공격 시 단두대로 내려치는 듯이 적을 찍어버리는데, 적을 바닥에 눕혀버리는 모션은 시원시원하지만 사거리가 짧다는 것이 단점이다.

전투 기술은 살짝 공중에 체공한 뒤 내려찍고[103] 내려찍은 지점에 용암 지대를 형성하는 기술이다. 또한 추가 입력으로 칼을 한 번 더 내려찍고 뒤로 당기는데, 이 추가타의 배율이 굉장히 높게 책정되어 있어 이를 맞히냐 안 맞히냐에 따른 대미지 차이가 굉장히 크다. 1.04 패치로 시전속도가 빨라졌지만 여전히 확실한 딜타임이 아니면 추가타까지 맞히기는 여간 어려운 일이 아니다. 흉조의 아이 정도는 전기1타로 경직을 줄 수 있지만 추가타까지 치기는 운이 따라줘야 된다. 슈퍼아머 패턴에는 경직이 씹히기 때문. 다른 기사몹들도 마찬가지로 1타는 대부분 맞고 경직을 먹어주지만 추가타 지를 동안 경직이 풀리고 슈퍼 아머 패턴에 카운터 맞기 쉬우니 주의. 그나마 시전 속도가 빨라져서 인간형 기사몹들에게 추가타 맞추기가 쉬워졌고, 맞추기만 하면 몹에 따라선 다운판정을 넣을 수 있다. 봉투검/알렉산더/화염전갈/폭룡 탈리스만에 황나맹, 불힘, 영약만 마셔줘도 전기 풀히트시 10000~12000쯤은 가볍게 뽑아낼 수 있어서 다 맞출 수만 있다면 딜걱정은 안 해도 되지만 엘리트몹들은 경직이 불안해서 다 맞추기가 쉽지 않다. 또한 1타를 끄트머리 아슬아슬하게 맞추면 2타가 안 맞으니 1타를 가까이서 맞춰야 한다. 용암 장판 덕분에 트롤같이 잘 안 움직이고 프리 딜 타임이 오래 나오는 몹들 잡기에 좋다.

반면 1타만 끊어칠 거면 동 스탯 기준 원거리 전기인 모독의 성검과 큰 차이가 없어서 모독성검 놔두고 쓸 이유가 없으니 어떻게든 추가타까지 맞출 수 있는 상황에서 쓰는 게 좋다. 추가타에 맞으면 인간형 적은 나가떨어진다.

풀강 기준으로 신앙 보정이 B라고 돼 있긴 하지만 실상은 근력 위주의 무기이다. 한 손으로 잡나 양손으로 잡나 근력에 의한 공격력 상승이 더 크다.

근력50 신앙80 기준 대곡검 중 표기뎀 탑을 자랑하는데 그냥 탑인 게 아니라 2위인 화염술 변질 흉조의 아이 대도와 70이나 차이나는 독보적 원탑이다. 화염 무기 중에서는 모든 무기군을 통틀어도 이 위로는 화염술 거인부수기와 신 사냥의 대검, 모루 해머 3개뿐인데 거인부수기와 신 사냥의 대검은 표기뎀 4~7 정도밖에 차이가 없어서 공동2위에 가깝다.

전기는 DLC에서 추가된 폭룡의 탈리스만 효과를 받으니 참고.', null),
  ('뿔 전사의 대곡검', 110, 'shadow_of_the_erdtree', '탑의 수호자인 뿔 전사의 곡검.
검신에는 혼각이 새겨져 있어
뿔내림의 촉매로도 쓰인다.', null),
  ('모르고트의 저주검', 120, 'base_game', '이상하게 변색된 일그러진 칼날의 검.
흉조의 왕 모르고트가 사용한 무기.

그 칼날은 그가 기피해 가둔
저주받은 피가 변한 모습이다.', null)
)
insert into public.game_items (name, type, category_id, sort_order, content_code, game_description, effect_description)
select s.name, 'weapon', c.id, s.sort_order, s.content_code, s.game_description, s.effect_description
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대곡검'
where not exists (select 1 from public.game_items i where i.type = 'weapon' and i.category_id = c.id and i.name = s.name);

with source (name, skill_name, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane) as (
  values
  ('헤비 시미터', '회전 베기', 9.5, '참격', 'smithing_stone', true, 330, 0, 0, 0, 0, 62.0, 32.0, 32.0, 32.0, 32.0, 100, 55, 0, 0, 0, 0, 0, 0, 13, 11, 0, 0, 0),
  ('참마도', '회전 베기', 10.0, '참격', 'smithing_stone', true, 338, 0, 0, 0, 0, 65.0, 35.0, 35.0, 35.0, 35.0, 100, 50, 0, 0, 0, 0, 0, 0, 19, 16, 0, 0, 0),
  ('흉조의 아이 대도', '회전 베기', 11.5, '참격', 'smithing_stone', true, 347, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 52, 0, 0, 0, 0, 0, 0, 19, 16, 0, 0, 0),
  ('승병의 화염도', '회전 베기', 9.0, '참격', 'smithing_stone', true, 328, 0, 0, 0, 0, 61.0, 33.0, 33.0, 33.0, 33.0, 100, 46, 0, 0, 0, 0, 0, 0, 18, 18, 0, 0, 0),
  ('수인의 대곡도', '회전 베기', 16.5, '참격', 'smithing_stone', true, 350, 0, 0, 0, 0, 81.0, 43.0, 43.0, 43.0, 43.0, 100, 62, 0, 0, 0, 0, 0, 0, 25, 14, 0, 0, 0),
  ('프레이야의 대검', '회전 베기', 14.0, '참격', 'smithing_stone', true, 357, 0, 0, 0, 0, 74.0, 39.0, 39.0, 39.0, 39.0, 100, 57, 0, 0, 0, 0, 0, 0, 25, 14, 0, 0, 0),
  ('사냥개의 긴 이빨', '사냥개 검술', 11.5, '참격', 'somber_smithing_stone', false, 345, 0, 0, 0, 0, 68.0, 36.0, 36.0, 36.0, 36.0, 100, 48, 0, 0, 55, 0, 0, 0, 18, 17, 0, 0, 0),
  ('흑왕의 대검', '흑왕의 척력파', 11.5, '참격', 'somber_smithing_stone', false, 289, 186, 0, 0, 0, 57.0, 42.0, 29.0, 29.0, 29.0, 100, 48, 0, 0, 0, 0, 0, 0, 20, 16, 16, 0, 0),
  ('자미엘의 곡검', '자미엘의 얼음 폭풍', 9.0, '참격', 'somber_smithing_stone', false, 318, 0, 0, 0, 0, 61.0, 33.0, 33.0, 33.0, 33.0, 100, 42, 0, 65, 0, 0, 0, 0, 16, 18, 0, 0, 0),
  ('토룡의 비늘검', '용암 길로틴', 15.0, '참격', 'somber_smithing_stone', false, 279, 0, 181, 0, 0, 66.0, 33.0, 48.0, 33.0, 33.0, 100, 55, 0, 0, 0, 0, 0, 0, 24, 15, 0, 18, 0),
  ('뿔 전사의 대곡검', '뿔내림/폭풍', 13.0, '참격', 'somber_smithing_stone', false, 318, 0, 0, 0, 0, 73.0, 39.0, 39.0, 39.0, 39.0, 100, 51, 0, 0, 0, 0, 0, 0, 19, 16, 0, 13, 0),
  ('모르고트의 저주검', '주혈 참격', 7.5, '참격', 'somber_smithing_stone', false, 294, 0, 0, 0, 0, 55.0, 29.0, 29.0, 29.0, 29.0, 110, 38, 0, 0, 60, 0, 0, 0, 14, 35, 0, 0, 17)
)
insert into public.weapon_details (game_item_id, default_skill_id, type, weight, physical_attack_types, upgrade_material, can_change_affinity, attack_physical, attack_magic, attack_fire, attack_lightning, attack_holy, guard_physical, guard_magic, guard_fire, guard_lightning, guard_holy, critical, guard_boost, scarlet_rot, frostbite, bleed, poison, sleep, madness, required_strength, required_dexterity, required_intelligence, required_faith, required_arcane)
select i.id, k.id, 'weapon', s.weight, case s.physical_attack_types when '타격 / 관통' then array['strike','pierce']::text[] when '타격' then array['strike']::text[] when '참격' then array['slash']::text[] when '참격 / 관통' then array['slash', 'pierce']::text[] when '표준 / 관통' then array['standard', 'pierce']::text[] else null end, s.upgrade_material, s.can_change_affinity, s.attack_physical, s.attack_magic, s.attack_fire, s.attack_lightning, s.attack_holy, s.guard_physical, s.guard_magic, s.guard_fire, s.guard_lightning, s.guard_holy, s.critical, s.guard_boost, s.scarlet_rot, s.frostbite, s.bleed, s.poison, s.sleep, s.madness, s.required_strength, s.required_dexterity, s.required_intelligence, s.required_faith, s.required_arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대곡검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
join public.weapon_skills k on k.name = s.skill_name
  and (s.skill_name <> '회전 베기' or k.fp_cost_text = '6 ( - / 12 )')
on conflict (game_item_id) do nothing;

with source (name, affinity, strength, dexterity, intelligence, faith, arcane) as (
  values
  ('헤비 시미터', 'standard', 'C', 'D', '-', '-', '-'),
  ('헤비 시미터', 'heavy', 'A', '-', '-', '-', '-'),
  ('헤비 시미터', 'keen', 'E', 'A', '-', '-', '-'),
  ('헤비 시미터', 'quality', 'B', 'B', '-', '-', '-'),
  ('헤비 시미터', 'fire', 'C', 'E', '-', '-', '-'),
  ('헤비 시미터', 'flame_art', 'E', 'E', '-', 'C', '-'),
  ('헤비 시미터', 'lightning', 'E', 'C', '-', '-', '-'),
  ('헤비 시미터', 'sacred', 'E', 'E', '-', 'C', '-'),
  ('헤비 시미터', 'magic', 'E', 'E', 'B', '-', '-'),
  ('헤비 시미터', 'cold', 'C', 'D', 'C', '-', '-'),
  ('헤비 시미터', 'poison', 'B', 'D', '-', '-', 'D'),
  ('헤비 시미터', 'blood', 'B', 'D', '-', '-', 'D'),
  ('헤비 시미터', 'occult', 'D', 'E', '-', '-', 'B'),
  ('참마도', 'standard', 'C', 'D', '-', '-', '-'),
  ('참마도', 'heavy', 'B', '-', '-', '-', '-'),
  ('참마도', 'keen', 'E', 'B', '-', '-', '-'),
  ('참마도', 'quality', 'B', 'B', '-', '-', '-'),
  ('참마도', 'fire', 'C', 'E', '-', '-', '-'),
  ('참마도', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('참마도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('참마도', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('참마도', 'magic', 'E', 'E', 'B', '-', '-'),
  ('참마도', 'cold', 'C', 'C', 'C', '-', '-'),
  ('참마도', 'poison', 'C', 'C', '-', '-', 'D'),
  ('참마도', 'blood', 'C', 'C', '-', '-', 'D'),
  ('참마도', 'occult', 'D', 'E', '-', '-', 'B'),
  ('흉조의 아이 대도', 'standard', 'C', 'C', '-', '-', '-'),
  ('흉조의 아이 대도', 'heavy', 'B', '-', '-', '-', '-'),
  ('흉조의 아이 대도', 'keen', 'E', 'B', '-', '-', '-'),
  ('흉조의 아이 대도', 'quality', 'B', 'B', '-', '-', '-'),
  ('흉조의 아이 대도', 'fire', 'C', 'E', '-', '-', '-'),
  ('흉조의 아이 대도', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('흉조의 아이 대도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('흉조의 아이 대도', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('흉조의 아이 대도', 'magic', 'E', 'E', 'B', '-', '-'),
  ('흉조의 아이 대도', 'cold', 'C', 'C', 'C', '-', '-'),
  ('흉조의 아이 대도', 'poison', 'C', 'C', '-', '-', 'D'),
  ('흉조의 아이 대도', 'blood', 'C', 'C', '-', '-', 'D'),
  ('흉조의 아이 대도', 'occult', 'D', 'D', '-', '-', 'B'),
  ('승병의 화염도', 'standard', 'D', 'C', '-', '-', '-'),
  ('승병의 화염도', 'heavy', 'B', '-', '-', '-', '-'),
  ('승병의 화염도', 'keen', 'E', 'B', '-', '-', '-'),
  ('승병의 화염도', 'quality', 'B', 'B', '-', '-', '-'),
  ('승병의 화염도', 'fire', 'C', 'E', '-', '-', '-'),
  ('승병의 화염도', 'flame_art', 'E', 'E', '-', 'B', '-'),
  ('승병의 화염도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('승병의 화염도', 'sacred', 'E', 'E', '-', 'B', '-'),
  ('승병의 화염도', 'magic', 'E', 'E', 'B', '-', '-'),
  ('승병의 화염도', 'cold', 'C', 'C', 'C', '-', '-'),
  ('승병의 화염도', 'poison', 'C', 'B', '-', '-', 'D'),
  ('승병의 화염도', 'blood', 'C', 'B', '-', '-', 'D'),
  ('승병의 화염도', 'occult', 'E', 'D', '-', '-', 'B'),
  ('수인의 대곡도', 'standard', 'B', '-', '-', '-', '-'),
  ('수인의 대곡도', 'heavy', 'A', '-', '-', '-', '-'),
  ('수인의 대곡도', 'keen', 'E', 'B', '-', '-', '-'),
  ('수인의 대곡도', 'quality', 'B', 'B', '-', '-', '-'),
  ('수인의 대곡도', 'fire', 'C', 'E', '-', '-', '-'),
  ('수인의 대곡도', 'flame_art', 'D', '-', '-', 'C', '-'),
  ('수인의 대곡도', 'lightning', 'E', 'C', '-', '-', '-'),
  ('수인의 대곡도', 'sacred', 'D', '-', '-', 'C', '-'),
  ('수인의 대곡도', 'magic', 'D', '-', 'B', '-', '-'),
  ('수인의 대곡도', 'cold', 'B', '-', 'C', '-', '-'),
  ('수인의 대곡도', 'poison', 'B', '-', '-', '-', 'D'),
  ('수인의 대곡도', 'blood', 'B', '-', '-', '-', 'D'),
  ('수인의 대곡도', 'occult', 'D', '-', '-', '-', 'B'),
  ('프레이야의 대검', 'standard', 'B', 'E', '-', '-', '-'),
  ('프레이야의 대검', 'heavy', 'A', '-', '-', '-', '-'),
  ('프레이야의 대검', 'keen', 'E', 'B', '-', '-', '-'),
  ('프레이야의 대검', 'quality', 'B', 'B', '-', '-', '-'),
  ('프레이야의 대검', 'fire', 'C', 'E', '-', '-', '-'),
  ('프레이야의 대검', 'flame_art', 'D', 'E', '-', 'C', '-'),
  ('프레이야의 대검', 'lightning', 'E', 'C', '-', '-', '-'),
  ('프레이야의 대검', 'sacred', 'D', 'E', '-', 'C', '-'),
  ('프레이야의 대검', 'magic', 'D', 'E', 'C', '-', '-'),
  ('프레이야의 대검', 'cold', 'B', 'E', 'D', '-', '-'),
  ('프레이야의 대검', 'poison', 'B', 'E', '-', '-', 'D'),
  ('프레이야의 대검', 'blood', 'B', 'E', '-', '-', 'D'),
  ('프레이야의 대검', 'occult', 'D', 'E', '-', '-', 'B'),
  ('사냥개의 긴 이빨', 'standard', 'C', 'B', '-', '-', '-'),
  ('흑왕의 대검', 'standard', 'B', 'E', 'B', '-', '-'),
  ('자미엘의 곡검', 'standard', 'C', 'B', '-', '-', '-'),
  ('토룡의 비늘검', 'standard', 'B', 'D', '-', 'B', '-'),
  ('뿔 전사의 대곡검', 'standard', 'B', 'D', '-', 'D', '-'),
  ('모르고트의 저주검', 'standard', 'D', 'B', '-', '-', 'D')
)
insert into public.weapon_scalings (game_item_id, affinity, strength, dexterity, intelligence, faith, arcane)
select i.id, s.affinity, s.strength, s.dexterity, s.intelligence, s.faith, s.arcane
from source s
join public.game_item_categories c on c.type = 'weapon' and c.name = '대곡검'
join public.game_items i on i.type = 'weapon' and i.category_id = c.id and i.name = s.name
on conflict (game_item_id, affinity) do nothing;
