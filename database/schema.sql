create extension if not exists "pgcrypto";

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code in ('super_admin', 'owner', 'manager', 'cashier')),
  name text not null,
  created_at timestamptz default now()
);

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  address text,
  phone text,
  city text default 'Denpasar',
  province text default 'Bali',
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete cascade,
  role_id uuid references public.roles(id),
  store_id uuid references public.stores(id),
  name text not null,
  email text not null unique,
  phone text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id),
  name text not null,
  slug text not null,
  type text default 'product',
  created_at timestamptz default now(),
  unique (store_id, slug)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id),
  category_id uuid references public.categories(id),
  sku text not null,
  barcode text,
  name text not null,
  description text,
  cost_price numeric(14,2) default 0,
  selling_price numeric(14,2) not null default 0,
  stock integer not null default 0,
  minimum_stock integer not null default 0,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now(),
  unique (store_id, sku)
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id),
  cashier_id uuid references public.users(id),
  invoice_number text not null unique,
  subtotal numeric(14,2) not null default 0,
  discount_total numeric(14,2) not null default 0,
  tax_total numeric(14,2) not null default 0,
  grand_total numeric(14,2) not null default 0,
  paid_amount numeric(14,2) not null default 0,
  change_amount numeric(14,2) not null default 0,
  payment_method text not null default 'cash' check (payment_method in ('cash', 'transfer', 'qris')),
  created_at timestamptz default now()
);

create table public.transaction_items (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.transactions(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  qty integer not null,
  unit_price numeric(14,2) not null,
  subtotal numeric(14,2) not null
);

create table public.stock_movements (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id),
  product_id uuid not null references public.products(id),
  user_id uuid references public.users(id),
  type text not null check (type in ('in', 'out', 'sale', 'transfer_in', 'transfer_out', 'adjustment')),
  qty integer not null,
  reference_id uuid,
  notes text,
  created_at timestamptz default now()
);

create table public.settings (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id),
  key text not null,
  value jsonb,
  created_at timestamptz default now(),
  unique (store_id, key)
);

alter table public.roles enable row level security;
alter table public.stores enable row level security;
alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.transactions enable row level security;
alter table public.transaction_items enable row level security;
alter table public.stock_movements enable row level security;
alter table public.settings enable row level security;

create or replace function public.current_profile()
returns public.users
language sql
stable
as $$
  select * from public.users where auth_user_id = auth.uid() limit 1
$$;

create policy "authenticated can read roles" on public.roles for select to authenticated using (true);
create policy "users read own profile" on public.users for select to authenticated using (auth_user_id = auth.uid());
create policy "store scoped users read stores" on public.stores for select to authenticated using (
  exists (
    select 1 from public.users u
    join public.roles r on r.id = u.role_id
    where u.auth_user_id = auth.uid()
      and (r.code = 'super_admin' or u.store_id = stores.id)
  )
);
create policy "store scoped products" on public.products for select to authenticated using (
  exists (
    select 1 from public.users u
    join public.roles r on r.id = u.role_id
    where u.auth_user_id = auth.uid()
      and (r.code = 'super_admin' or u.store_id = products.store_id)
  )
);
create policy "store scoped categories" on public.categories for select to authenticated using (true);
create policy "store scoped transactions" on public.transactions for all to authenticated using (
  exists (
    select 1 from public.users u
    join public.roles r on r.id = u.role_id
    where u.auth_user_id = auth.uid()
      and (r.code = 'super_admin' or u.store_id = transactions.store_id)
  )
);
create policy "store scoped transaction items" on public.transaction_items for select to authenticated using (
  exists (
    select 1 from public.transactions t
    join public.users u on u.store_id = t.store_id
    join public.roles r on r.id = u.role_id
    where t.id = transaction_items.transaction_id
      and u.auth_user_id = auth.uid()
      and (r.code = 'super_admin' or u.store_id = t.store_id)
  )
);
create policy "store scoped stock movements" on public.stock_movements for all to authenticated using (
  exists (
    select 1 from public.users u
    join public.roles r on r.id = u.role_id
    where u.auth_user_id = auth.uid()
      and (r.code = 'super_admin' or u.store_id = stock_movements.store_id)
  )
);
create policy "settings read" on public.settings for select to authenticated using (true);

insert into public.roles (code, name) values
  ('super_admin', 'Super Admin'),
  ('owner', 'Owner'),
  ('manager', 'Manager'),
  ('cashier', 'Cashier')
on conflict (code) do update set name = excluded.name;
