-- 두 테이블에서 동일한 아이템 종류를 사용합니다.
create type public.item_type as enum (
  'spirit_ash',
  'ash_of_war',
  'weapon',
  'armor',
  'talisman',
  'spell',
  'gesture'
);

-- 세부 분류: 직검, 대검, 투구, 마술 등
create table public.item_categories (
  id bigint generated always as identity primary key,
  name text not null check (btrim(name) <> ''),
  type public.item_type not null,
  unique (type, name),
  unique (id, type)
);

-- 게임에서 획득할 수 있는 대상의 공통 정보
create table public.items (
  id bigint generated always as identity primary key,
  name text not null check (btrim(name) <> ''),
  type public.item_type not null,
  category_id bigint not null,
  foreign key (category_id, type)
    references public.item_categories (id, type)
    on update restrict
    on delete restrict
);

create index items_category_id_type_idx
  on public.items (category_id, type);

-- 공개 조회만 허용합니다.
alter table public.item_categories enable row level security;
alter table public.items enable row level security;

revoke all on table public.item_categories, public.items from anon, authenticated;
grant select on table public.item_categories, public.items to anon, authenticated;

create policy "Anyone can read item categories"
  on public.item_categories for select
  to anon, authenticated
  using (true);

create policy "Anyone can read items"
  on public.items for select
  to anon, authenticated
  using (true);
