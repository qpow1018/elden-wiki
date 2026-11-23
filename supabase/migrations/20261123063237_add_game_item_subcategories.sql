create table public.game_item_subcategories (
  id bigint generated always as identity primary key,
  category_id bigint not null references public.game_item_categories (id)
    on update restrict on delete restrict,
  name text not null check (btrim(name) <> ''),
  sort_order integer not null check (sort_order > 0),
  unique (category_id, name),
  unique (id, category_id)
);

create index game_item_subcategories_category_sort_order_id_idx
  on public.game_item_subcategories (category_id, sort_order, id);

alter table public.game_items
  add column subcategory_id bigint,
  add constraint game_items_subcategory_id_category_id_fkey
    foreign key (subcategory_id, category_id)
    references public.game_item_subcategories (id, category_id)
    on update restrict on delete restrict;

create index game_items_subcategory_id_category_id_idx
  on public.game_items (subcategory_id, category_id);

alter table public.game_item_subcategories enable row level security;
revoke all on table public.game_item_subcategories from anon, authenticated;
grant select on table public.game_item_subcategories to anon, authenticated;
create policy "Anyone can read game item subcategories"
  on public.game_item_subcategories for select to anon, authenticated using (true);

comment on column public.game_item_subcategories.sort_order is '같은 category_id 안의 표시 순서. 양의 정수이며 작은 값부터 표시합니다.';
comment on column public.game_items.subcategory_id is '선택적 세부분류. NULL은 세부분류 미지정이며 지정 시 category_id와 소속이 일치해야 합니다.';

notify pgrst, 'reload schema';
