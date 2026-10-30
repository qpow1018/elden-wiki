create table public.ash_of_war_details (
  item_id bigint primary key,
  type public.item_type not null default 'ash_of_war' check (type = 'ash_of_war'),
  skill_id bigint references public.weapon_skills (id) on update restrict on delete restrict,
  native_affinity text check (native_affinity in (
    'standard', 'heavy', 'keen', 'quality', 'fire', 'flame_art', 'lightning',
    'sacred', 'magic', 'cold', 'poison', 'blood', 'occult'
  )),
  applicable_armaments_text text,
  foreign key (item_id, type) references public.items (id, type)
    on update restrict on delete restrict
);

create index ash_of_war_details_skill_id_idx on public.ash_of_war_details (skill_id);
comment on column public.ash_of_war_details.native_affinity is
  '전회에 표시되는 기본 변질. 선택 가능한 모든 변질이나 사용자 장착 상태를 뜻하지 않습니다.';

insert into public.item_categories (name, type)
values ('전회', 'ash_of_war')
on conflict (type, name) do nothing;

alter table public.ash_of_war_details enable row level security;
revoke all on table public.ash_of_war_details from anon, authenticated;
grant select on table public.ash_of_war_details to anon, authenticated;
create policy "Anyone can read ash of war details"
  on public.ash_of_war_details for select to anon, authenticated using (true);
