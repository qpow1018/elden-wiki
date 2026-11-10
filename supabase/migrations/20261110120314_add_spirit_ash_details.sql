create table public.spirit_ash_details (
  game_item_id bigint primary key,
  type public.game_item_type not null default 'spirit_ash' check (type = 'spirit_ash'),
  fp_cost integer not null check (fp_cost >= 0),
  hp_cost integer not null check (hp_cost >= 0),
  foreign key (game_item_id, type) references public.game_items (id, type)
    on update restrict on delete restrict
);

alter table public.spirit_ash_details enable row level security;
revoke all on table public.spirit_ash_details from anon, authenticated;
grant select on table public.spirit_ash_details to anon, authenticated;
create policy "Anyone can read spirit ash details"
  on public.spirit_ash_details for select to anon, authenticated using (true);
