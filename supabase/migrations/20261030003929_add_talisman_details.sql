create table public.talisman_details (
  item_id bigint primary key,
  type public.item_type not null default 'talisman' check (type = 'talisman'),
  weight numeric check (weight >= 0),
  foreign key (item_id, type) references public.items (id, type)
    on update restrict on delete restrict
);

comment on table public.talisman_details is
  '탈리스만 자체의 중량. 0은 실제 0, NULL은 미확인입니다. 효과는 items.effect_description에 저장합니다.';

insert into public.item_categories (name, type)
values ('탈리스만', 'talisman')
on conflict (type, name) do nothing;

alter table public.talisman_details enable row level security;
revoke all on table public.talisman_details from anon, authenticated;
grant select on table public.talisman_details to anon, authenticated;
create policy "Anyone can read talisman details"
  on public.talisman_details for select to anon, authenticated using (true);
