-- 이름만 변경하며 데이터·참조 관계·RLS·권한은 유지합니다.
alter type public.item_type rename to game_item_type;
alter table public.items rename to game_items;
alter table public.item_categories rename to game_item_categories;

alter table public.weapon_details rename column item_id to game_item_id;
alter table public.weapon_scalings rename column item_id to game_item_id;
alter table public.armor_details rename column item_id to game_item_id;
alter table public.talisman_details rename column item_id to game_item_id;
alter table public.spell_details rename column item_id to game_item_id;
alter table public.ash_of_war_details rename column item_id to game_item_id;

alter sequence public.items_id_seq rename to game_items_id_seq;
alter sequence public.item_categories_id_seq rename to game_item_categories_id_seq;

alter table public.game_items rename constraint items_category_id_type_fkey to game_items_category_id_type_fkey;
alter table public.game_items rename constraint items_content_code_check to game_items_content_code_check;
alter table public.game_items rename constraint items_id_type_key to game_items_id_type_key;
alter table public.game_items rename constraint items_name_check to game_items_name_check;
alter table public.game_items rename constraint items_pkey to game_items_pkey;
alter table public.game_item_categories rename constraint item_categories_id_type_key to game_item_categories_id_type_key;
alter table public.game_item_categories rename constraint item_categories_name_check to game_item_categories_name_check;
alter table public.game_item_categories rename constraint item_categories_pkey to game_item_categories_pkey;
alter table public.game_item_categories rename constraint item_categories_type_name_key to game_item_categories_type_name_key;
alter table public.weapon_details rename constraint weapon_details_item_id_type_fkey to weapon_details_game_item_id_type_fkey;
alter table public.armor_details rename constraint armor_details_item_id_type_fkey to armor_details_game_item_id_type_fkey;
alter table public.talisman_details rename constraint talisman_details_item_id_type_fkey to talisman_details_game_item_id_type_fkey;
alter table public.spell_details rename constraint spell_details_item_id_type_fkey to spell_details_game_item_id_type_fkey;
alter table public.ash_of_war_details rename constraint ash_of_war_details_item_id_type_fkey to ash_of_war_details_game_item_id_type_fkey;
alter table public.weapon_scalings rename constraint weapon_scalings_item_id_fkey to weapon_scalings_game_item_id_fkey;
alter index public.items_category_id_type_idx rename to game_items_category_id_type_idx;

alter policy "Anyone can read items" on public.game_items rename to "Anyone can read game items";
alter policy "Anyone can read item categories" on public.game_item_categories rename to "Anyone can read game item categories";

notify pgrst, 'reload schema';
