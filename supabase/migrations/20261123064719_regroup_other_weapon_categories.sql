-- 기존 분류 ID를 세부분류 ID로 보존합니다. 아이템 ID·상세·분류 내 순서는 유지합니다.
insert into public.game_item_categories (name, type, sort_order)
values ('촉매', 'other_weapon', 10), ('원거리 무기', 'other_weapon', 20),
  ('횃불', 'other_weapon', 30), ('방패', 'other_weapon', 40)
on conflict (type, name) do nothing;

update public.game_item_categories set sort_order = 30
where type = 'other_weapon' and name = '횃불';

with mapping (category, subcategory, sort_order) as (
  values
    ('촉매', '지팡이', 10),
    ('촉매', '성인', 20),
    ('원거리 무기', '소형 활', 10),
    ('원거리 무기', '활', 20),
    ('원거리 무기', '대궁', 30),
    ('원거리 무기', '석궁', 40),
    ('원거리 무기', '발리스타', 50),
    ('방패', '소형 방패', 10),
    ('방패', '중형 방패', 20),
    ('방패', '대형 방패', 30),
    ('방패', '관통 방패', 40)
)
insert into public.game_item_subcategories (id, category_id, name, sort_order)
overriding system value
select old.id, parent.id, m.subcategory, m.sort_order
from mapping m
join public.game_item_categories old on old.type = 'other_weapon' and old.name = m.subcategory
join public.game_item_categories parent on parent.type = 'other_weapon' and parent.name = m.category;

-- 명시적 ID 등록 후 자동 채번을 기존 최대값 다음으로 진행합니다.
select setval(pg_get_serial_sequence('public.game_item_subcategories', 'id'),
  greatest(coalesce((select max(id) from public.game_item_subcategories), 1),
    (select last_value from public.game_item_subcategories_id_seq)), true);

update public.game_items i
set category_id = s.category_id, subcategory_id = s.id
from public.game_item_subcategories s
join public.game_item_categories old on old.id = s.id and old.type = 'other_weapon' and old.name = s.name
join public.game_item_categories parent on parent.id = s.category_id and parent.type = 'other_weapon'
where i.category_id = old.id and i.type = 'other_weapon';

-- 참조가 남아 있으면 외래키가 삭제를 막습니다.
delete from public.game_item_categories
where type = 'other_weapon' and name in ('지팡이', '성인', '소형 활', '활', '대궁', '석궁', '발리스타', '소형 방패', '중형 방패', '대형 방패', '관통 방패');

notify pgrst, 'reload schema';
