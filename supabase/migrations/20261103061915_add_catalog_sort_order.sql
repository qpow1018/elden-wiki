-- 표시 순서는 식별자·등록 순서와 독립적으로 관리합니다.
alter table public.game_item_categories add column sort_order integer;
alter table public.game_items add column sort_order integer;

-- 기존 데이터가 있는 환경은 기존 조회 순서를 초기 순서로 보존합니다.
with ranked as (
  select id, row_number() over (partition by type order by name, id) as position
  from public.game_item_categories
)
update public.game_item_categories c
set sort_order = ranked.position
from ranked
where c.id = ranked.id;

with ranked as (
  select id, row_number() over (partition by category_id order by id) as position
  from public.game_items
)
update public.game_items i
set sort_order = ranked.position
from ranked
where i.id = ranked.id;

-- 기본값을 두지 않아 등록 시 표시 순서를 명시하도록 합니다.
alter table public.game_item_categories
  alter column sort_order set not null,
  add constraint game_item_categories_sort_order_check check (sort_order > 0);
alter table public.game_items
  alter column sort_order set not null,
  add constraint game_items_sort_order_check check (sort_order > 0);

create index game_item_categories_type_sort_order_id_idx
  on public.game_item_categories (type, sort_order, id);
create index game_items_category_sort_order_id_idx
  on public.game_items (category_id, sort_order, id);

comment on column public.game_item_categories.sort_order is '같은 type 안의 표시 순서. 양의 정수이며 작은 값부터 표시합니다.';
comment on column public.game_items.sort_order is '같은 category_id 안의 표시 순서. 양의 정수이며 작은 값부터 표시합니다.';

notify pgrst, 'reload schema';
