-- 트리나의 한 송이 꽃은 관통 경감률이 음수입니다.
alter table public.armor_details
  drop constraint armor_details_negation_pierce_check,
  add constraint armor_details_negation_pierce_check check (negation_pierce <= 100);
