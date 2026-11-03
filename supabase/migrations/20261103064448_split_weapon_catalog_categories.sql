-- 기존 무기 상세를 촉매·기타 무기에도 연결할 수 있게 합니다.
alter table public.weapon_details drop constraint weapon_details_type_check;
alter table public.weapon_details
  add constraint weapon_details_type_check check (type in ('weapon', 'catalyst', 'other_weapon'));

-- 분류·아이템·상세를 함께 이동한 뒤 복합 외래키를 다시 검증합니다.
alter table public.game_items drop constraint game_items_category_id_type_fkey;
alter table public.weapon_details drop constraint weapon_details_game_item_id_type_fkey;

create temporary table catalog_type_moves on commit drop as
select id as category_id,
  case when name in ('지팡이', '성인') then 'catalyst'::public.game_item_type
    else 'other_weapon'::public.game_item_type end as target_type
from public.game_item_categories
where type = 'weapon' and name in (
  '지팡이', '성인', '소형 활', '활', '대궁', '석궁', '발리스타',
  '횃불', '소형 방패', '중형 방패', '대형 방패', '관통 방패'
);

update public.weapon_details d set type = m.target_type
from public.game_items i, catalog_type_moves m
where d.game_item_id = i.id and i.category_id = m.category_id;

update public.game_items i set type = m.target_type
from catalog_type_moves m where i.category_id = m.category_id;

update public.game_item_categories c set type = m.target_type
from catalog_type_moves m where c.id = m.category_id;

alter table public.game_items
  add constraint game_items_category_id_type_fkey
  foreign key (category_id, type) references public.game_item_categories (id, type)
  on update restrict on delete restrict;
alter table public.weapon_details
  add constraint weapon_details_game_item_id_type_fkey
  foreign key (game_item_id, type) references public.game_items (id, type)
  on update restrict on delete restrict;

notify pgrst, 'reload schema';
