insert into public.stores (id, name, code, address, phone) values
  ('00000000-0000-0000-0000-000000000001', 'Bali CopyTech Denpasar', 'DPS-01', 'Denpasar, Bali', '6281234567890')
on conflict (code) do update set name = excluded.name;

insert into public.categories (store_id, name, slug, type) values
  ('00000000-0000-0000-0000-000000000001', 'Mesin Fotocopy', 'mesin-fotocopy', 'product'),
  ('00000000-0000-0000-0000-000000000001', 'Sparepart', 'sparepart', 'product'),
  ('00000000-0000-0000-0000-000000000001', 'ATK', 'atk', 'product'),
  ('00000000-0000-0000-0000-000000000001', 'Alat Printing', 'alat-printing', 'product')
on conflict (store_id, slug) do update set name = excluded.name;

insert into public.products (store_id, category_id, sku, barcode, name, selling_price, stock, minimum_stock)
select '00000000-0000-0000-0000-000000000001', c.id, 'FC-4525', '899100000001', 'Canon iR ADV 4525', 24500000, 3, 1
from public.categories c where c.slug = 'mesin-fotocopy'
on conflict (store_id, sku) do update set name = excluded.name, selling_price = excluded.selling_price, stock = excluded.stock;

insert into public.products (store_id, category_id, sku, barcode, name, selling_price, stock, minimum_stock)
select '00000000-0000-0000-0000-000000000001', c.id, 'TON-NPG67', '899100000003', 'Toner NPG-67', 275000, 24, 5
from public.categories c where c.slug = 'sparepart'
on conflict (store_id, sku) do update set name = excluded.name, selling_price = excluded.selling_price, stock = excluded.stock;
