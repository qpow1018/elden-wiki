insert into public.item_categories (name, type)
values ('결정 물방울', 'crystal_tear')
on conflict (type, name) do nothing;
