alter table public.weapon_details
  add column sleep integer check (sleep >= 0),
  add column madness integer check (madness >= 0),
  drop constraint weapon_details_upgrade_material_check,
  add constraint weapon_details_upgrade_material_check check (
    upgrade_material in ('smithing_stone', 'somber_smithing_stone', 'none')
  );

comment on column public.weapon_details.sleep is
  '미강화·기본 상태의 수면 축적. 캐릭터 능력치 보정·일시적 버프 제외. 0은 없음, NULL은 미확인.';
comment on column public.weapon_details.madness is
  '미강화·기본 상태의 발광 축적. 캐릭터 능력치 보정·일시적 버프 제외. 0은 없음, NULL은 미확인.';
comment on column public.weapon_details.upgrade_material is
  'smithing_stone: 단석, somber_smithing_stone: 색 잃은 단석, none: 강화 불가, NULL: 미확인.';
comment on table public.weapon_details is
  '공격력은 표준 변질(변질 불가 무기는 기본 상태)의 최대 강화 무기 자체 수치이며 캐릭터 능력치 추가 공격력 제외. 가드 성능은 같은 상태 기준. 부가 효과는 미강화·기본 상태로 캐릭터 능력치 보정·일시적 버프 제외. 수치의 0은 없음, NULL은 미확인.';
