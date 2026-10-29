create table public.weapon_skills (
  id bigint generated always as identity primary key,
  name text not null check (btrim(name) <> ''),
  description text,
  fp_cost_text text
);

-- 무기 외 종류의 아이템에 무기 상세가 연결되지 않도록 합니다.
alter table public.items add constraint items_id_type_key unique (id, type);

create table public.weapon_details (
  item_id bigint primary key,
  type public.item_type not null default 'weapon' check (type = 'weapon'),
  weight numeric check (weight >= 0),
  physical_attack_types text[] check (physical_attack_types <@ array['standard', 'slash', 'strike', 'pierce']::text[] and array_position(physical_attack_types, null) is null),
  upgrade_material text check (upgrade_material in ('smithing_stone', 'somber_smithing_stone')),
  default_skill_id bigint references public.weapon_skills (id) on update restrict on delete restrict,
  attack_physical integer check (attack_physical >= 0),
  attack_magic integer check (attack_magic >= 0),
  attack_fire integer check (attack_fire >= 0),
  attack_lightning integer check (attack_lightning >= 0),
  attack_holy integer check (attack_holy >= 0),
  critical integer check (critical >= 0),
  guard_boost integer check (guard_boost >= 0),
  scarlet_rot integer check (scarlet_rot >= 0),
  frostbite integer check (frostbite >= 0),
  bleed integer check (bleed >= 0),
  poison integer check (poison >= 0),
  required_strength integer check (required_strength >= 0),
  required_dexterity integer check (required_dexterity >= 0),
  required_intelligence integer check (required_intelligence >= 0),
  required_faith integer check (required_faith >= 0),
  required_arcane integer check (required_arcane >= 0),
  guard_physical numeric check (guard_physical between 0 and 100),
  guard_magic numeric check (guard_magic between 0 and 100),
  guard_fire numeric check (guard_fire between 0 and 100),
  guard_lightning numeric check (guard_lightning between 0 and 100),
  guard_holy numeric check (guard_holy between 0 and 100),
  foreign key (item_id, type) references public.items (id, type)
    on update restrict on delete restrict
);

create index weapon_details_default_skill_id_idx
  on public.weapon_details (default_skill_id);

comment on column public.weapon_details.physical_attack_types is
  '물리 공격 방식. 저장 순서에 의미를 두지 않고 출력 시 정렬합니다.';
comment on table public.weapon_details is
  '공격력·가드 성능은 표준 변질의 최대 강화 기준, 부가 효과는 기본 수치. 수치의 0은 없음, NULL은 미확인입니다.';

alter table public.weapon_skills enable row level security;
alter table public.weapon_details enable row level security;

revoke all on table public.weapon_skills, public.weapon_details from anon, authenticated;
grant select on table public.weapon_skills, public.weapon_details to anon, authenticated;

create policy "Anyone can read weapon skills"
  on public.weapon_skills for select to anon, authenticated using (true);
create policy "Anyone can read weapon details"
  on public.weapon_details for select to anon, authenticated using (true);
