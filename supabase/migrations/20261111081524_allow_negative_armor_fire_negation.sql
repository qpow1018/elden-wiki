-- 지키는 자의 옷(꽃)은 화염 경감률이 음수입니다.
alter table public.armor_details
  drop constraint armor_details_negation_fire_check,
  add constraint armor_details_negation_fire_check check (negation_fire <= 100);
