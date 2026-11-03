-- 새 enum 값은 다음 마이그레이션의 트랜잭션에서 사용합니다.
alter type public.game_item_type add value 'catalyst';
alter type public.game_item_type add value 'other_weapon';
