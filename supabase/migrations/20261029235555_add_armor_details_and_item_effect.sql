alter table public.items add column effect_description text;

comment on column public.items.effect_description is
  '아이템 부가 효과의 표시용 설명. NULL은 효과 없음 또는 미입력이며 두 상태를 구분하지 않습니다.';

create table public.armor_details (
  item_id bigint primary key,
  type public.item_type not null default 'armor' check (type = 'armor'),
  weight numeric check (weight >= 0),
  negation_physical numeric check (negation_physical between 0 and 100),
  negation_strike numeric check (negation_strike between 0 and 100),
  negation_slash numeric check (negation_slash between 0 and 100),
  negation_pierce numeric check (negation_pierce between 0 and 100),
  negation_magic numeric check (negation_magic between 0 and 100),
  negation_fire numeric check (negation_fire between 0 and 100),
  negation_lightning numeric check (negation_lightning between 0 and 100),
  negation_holy numeric check (negation_holy between 0 and 100),
  immunity integer check (immunity >= 0),
  robustness integer check (robustness >= 0),
  focus integer check (focus >= 0),
  vitality integer check (vitality >= 0),
  poise integer check (poise >= 0),
  foreign key (item_id, type) references public.items (id, type)
    on update restrict on delete restrict
);

comment on table public.armor_details is
  '방어구 한 부위 자체의 표시 수치. 수치의 0은 실제 0, NULL은 미확인입니다.';

insert into public.item_categories (name, type)
values ('갑옷', 'armor'), ('투구', 'armor'), ('장갑', 'armor'), ('각반', 'armor')
on conflict (type, name) do nothing;

alter table public.armor_details enable row level security;
revoke all on table public.armor_details from anon, authenticated;
grant select on table public.armor_details to anon, authenticated;
create policy "Anyone can read armor details"
  on public.armor_details for select to anon, authenticated using (true);
