create table public.spell_details (
  item_id bigint primary key,
  type public.item_type not null default 'spell' check (type = 'spell'),
  fp_cost_text text,
  slots_used integer check (slots_used > 0),
  required_intelligence integer check (required_intelligence >= 0),
  required_faith integer check (required_faith >= 0),
  required_arcane integer check (required_arcane >= 0),
  foreign key (item_id, type) references public.items (id, type)
    on update restrict on delete restrict
);

comment on table public.spell_details is
  '주문 자체의 소비 FP·사용 슬롯·필요 능력치. 필요 능력치의 0은 요구 없음, NULL은 미확인입니다.';

insert into public.item_categories (name, type)
values ('마술', 'spell'), ('기도', 'spell')
on conflict (type, name) do nothing;

alter table public.spell_details enable row level security;
revoke all on table public.spell_details from anon, authenticated;
grant select on table public.spell_details to anon, authenticated;
create policy "Anyone can read spell details"
  on public.spell_details for select to anon, authenticated using (true);
