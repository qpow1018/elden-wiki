alter table public.items
  add column image_url text,
  add column content_code text not null
    constraint items_content_code_check check (
      content_code in (
        'base_game',
        'shadow_of_the_erdtree',
        'tarnished_pack'
      )
    ),
  add column game_description text;
