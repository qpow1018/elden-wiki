-- 미등록 타입을 교체합니다. 기존 제스처 데이터가 있다면 자동 재분류하지 않습니다.
do $$
begin
  if exists (select 1 from public.game_items where type = 'gesture')
    or exists (select 1 from public.game_item_categories where type = 'gesture') then
    raise exception 'gesture 데이터 또는 분류가 있어 other로 교체할 수 없습니다.';
  end if;
end;
$$;

alter type public.game_item_type rename value 'gesture' to 'other';
notify pgrst, 'reload schema';
