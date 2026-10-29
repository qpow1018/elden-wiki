create table public.weapon_scalings (
  item_id bigint not null references public.weapon_details (item_id)
    on update restrict on delete restrict,
  affinity text not null check (affinity in (
    'standard', 'heavy', 'keen', 'quality', 'fire', 'flame_art',
    'lightning', 'sacred', 'magic', 'cold', 'poison', 'blood', 'occult'
  )),
  strength text check (strength in ('S', 'A', 'B', 'C', 'D', 'E', '-')),
  dexterity text check (dexterity in ('S', 'A', 'B', 'C', 'D', 'E', '-')),
  intelligence text check (intelligence in ('S', 'A', 'B', 'C', 'D', 'E', '-')),
  faith text check (faith in ('S', 'A', 'B', 'C', 'D', 'E', '-')),
  arcane text check (arcane in ('S', 'A', 'B', 'C', 'D', 'E', '-')),
  primary key (item_id, affinity)
);

comment on table public.weapon_scalings is
  '변질별 최대 강화 기준 능력 보정. -는 보정 없음, NULL은 미확인입니다.';

alter table public.weapon_scalings enable row level security;

revoke all on table public.weapon_scalings from anon, authenticated;
grant select on table public.weapon_scalings to anon, authenticated;

create policy "Anyone can read weapon scalings"
  on public.weapon_scalings for select
  to anon, authenticated
  using (true);
