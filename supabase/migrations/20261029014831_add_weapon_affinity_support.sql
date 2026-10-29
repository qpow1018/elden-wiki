alter table public.weapon_details
  add column can_change_affinity boolean;

comment on column public.weapon_details.can_change_affinity is
  '변질 가능 여부. true는 가능, false는 불가, NULL은 미확인입니다.';

comment on table public.weapon_details is
  '공격력·가드 성능은 표준 변질(변질 불가 무기는 기본 상태)의 최대 강화 기준, 부가 효과는 미강화 기본 수치. 수치의 0은 없음, NULL은 미확인입니다.';

comment on table public.weapon_scalings is
  '변질별 최대 강화 기준 능력 보정. 변질 불가 무기는 기본 상태를 standard 한 행으로 저장합니다. -는 보정 없음, NULL은 미확인입니다.';
