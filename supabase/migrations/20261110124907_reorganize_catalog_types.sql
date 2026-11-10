-- 분류와 아이템 ID를 유지하며 분류·아이템·상세의 타입을 함께 변경합니다.
alter table public.game_items drop constraint game_items_category_id_type_fkey;
alter table public.weapon_details drop constraint weapon_details_game_item_id_type_fkey;
alter table public.spell_details drop constraint spell_details_game_item_id_type_fkey;
alter table public.spell_details drop constraint spell_details_type_check;
alter table public.spell_details alter column type drop default;

update public.weapon_details set type = 'other_weapon' where type = 'catalyst';
update public.game_items set type = 'other_weapon' where type = 'catalyst';
update public.game_item_categories
set type = 'other_weapon',
    sort_order = case name when '지팡이' then 10 when '성인' then 20 else sort_order end
where type = 'catalyst';

alter table public.weapon_details drop constraint weapon_details_type_check;
alter table public.weapon_details
  add constraint weapon_details_type_check check (type in ('weapon', 'other_weapon'));

-- 사용이 끝난 촉매 타입을 마술로 바꾸고, 주문은 기도와 마술로 나눕니다.
alter type public.game_item_type rename value 'catalyst' to 'sorcery';
alter type public.game_item_type rename value 'spell' to 'incantation';

update public.spell_details d set type = 'sorcery'
from public.game_items i join public.game_item_categories c on c.id = i.category_id
where d.game_item_id = i.id and c.type = 'incantation' and c.name = '마술';

update public.game_items i set type = 'sorcery'
from public.game_item_categories c
where i.category_id = c.id and c.type = 'incantation' and c.name = '마술';

update public.game_item_categories
set type = 'sorcery' where type = 'incantation' and name = '마술';

alter table public.game_items
  add constraint game_items_category_id_type_fkey
  foreign key (category_id, type) references public.game_item_categories (id, type)
  on update restrict on delete restrict;
alter table public.weapon_details
  add constraint weapon_details_game_item_id_type_fkey
  foreign key (game_item_id, type) references public.game_items (id, type)
  on update restrict on delete restrict;
alter table public.spell_details
  add constraint spell_details_type_check check (type in ('sorcery', 'incantation')),
  add constraint spell_details_game_item_id_type_fkey
  foreign key (game_item_id, type) references public.game_items (id, type)
  on update restrict on delete restrict;

notify pgrst, 'reload schema';
