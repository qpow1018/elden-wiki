-- 기존 무기 분류의 표시 순서를 시드와 일치시킵니다.
update public.game_item_categories as category
set sort_order = desired.sort_order
from (
  values
    ('단검', 10),
    ('투척검', 20),
    ('직검', 30),
    ('경대검', 40),
    ('대검', 50),
    ('특대검', 60),
    ('자검', 70),
    ('대자검', 80),
    ('곡검', 90),
    ('대곡검', 100),
    ('역수검', 110),
    ('도', 120),
    ('대형 도', 130),
    ('쌍날검', 140),
    ('도끼', 150),
    ('대형 도끼', 160),
    ('망치', 170),
    ('철퇴', 180),
    ('대형 망치', 190),
    ('특대형 무기', 200),
    ('창', 210),
    ('대형 창', 220),
    ('도끼창', 230),
    ('낫', 240),
    ('채찍', 250),
    ('주먹', 260),
    ('격투', 270),
    ('손톱', 280),
    ('짐승 발톱', 290),
    ('조향병', 300)
) as desired(name, sort_order)
where category.type = 'weapon'
  and category.name = desired.name
  and category.sort_order is distinct from desired.sort_order;
