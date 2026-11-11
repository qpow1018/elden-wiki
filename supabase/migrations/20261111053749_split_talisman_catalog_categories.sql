insert into public.game_item_categories (name, type, sort_order)
values
  ('능력치', 'talisman', 10),
  ('방어', 'talisman', 20),
  ('무기', 'talisman', 30),
  ('주문', 'talisman', 40),
  ('전투 기술', 'talisman', 50),
  ('전투 보조', 'talisman', 60),
  ('조건부 효과·보상', 'talisman', 70),
  ('특수 효과', 'talisman', 80)
on conflict (type, name) do nothing;

-- 기존 표시 순서의 연속 구간을 분류로 옮깁니다. 아이템 ID와 sort_order는 유지합니다.
with category_ranges (name, first_sort_order, last_sort_order) as (
  values
    ('능력치', 10, 360),
    ('방어', 361, 750),
    ('무기', 751, 920),
    ('주문', 921, 1010),
    ('전투 기술', 1011, 1130),
    ('전투 보조', 1131, 1250),
    ('조건부 효과·보상', 1251, 1460),
    ('특수 효과', 1461, 1540)
)
update public.game_items i
set category_id = new_category.id
from category_ranges r
join public.game_item_categories new_category
  on new_category.type = 'talisman' and new_category.name = r.name
join public.game_item_categories old_category
  on old_category.type = 'talisman' and old_category.name = '탈리스만'
where i.type = 'talisman'
  and i.category_id = old_category.id
  and i.sort_order between r.first_sort_order and r.last_sort_order;

-- 미분류 아이템이 남아 있으면 외래키가 삭제를 막습니다.
delete from public.game_item_categories
where type = 'talisman' and name = '탈리스만';
