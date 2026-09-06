-- ==============================================================================
-- CLOTHLOOP.ID - COMPLETE DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'SELLER', 'UMKM', 'KURIR', 'ADMIN')),
  business_name TEXT,
  city TEXT DEFAULT 'Jakarta Selatan',
  address TEXT,
  balance NUMERIC DEFAULT 0,
  points INTEGER DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DROP BOX / DROP POINTS (Pusat Penyetoran Tekstil)
CREATE TABLE IF NOT EXISTS public.drop_boxes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  operating_hours TEXT NOT NULL,
  accepted_types TEXT[] NOT NULL DEFAULT '{}',
  contact_phone TEXT NOT NULL,
  image TEXT NOT NULL,
  capacity_percentage INTEGER DEFAULT 0,
  total_collected_kg NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DROP ORDERS (Transaksi Penyetoran Baju Bekas / Donasi)
CREATE TABLE IF NOT EXISTS public.drop_orders (
  id TEXT PRIMARY KEY,
  booking_code TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  user_city TEXT,
  user_district TEXT,
  user_address TEXT,
  method TEXT NOT NULL CHECK (method IN ('DROPOFF', 'PICKUP')),
  drop_point_id TEXT,
  drop_point_name TEXT,
  drop_point_address TEXT,
  courier_service TEXT,
  courier_name TEXT,
  scheduled_date TEXT,
  scheduled_slot TEXT,
  estimated_weight_kg NUMERIC,
  actual_weight_kg NUMERIC,
  item_count INTEGER NOT NULL DEFAULT 1,
  garment_breakdown JSONB DEFAULT '[]'::jsonb,
  garment_types TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COURIER_PICKUP', 'RECEIVED', 'SORTING', 'DELIVERED_TO_ARTISAN', 'COMPLETED')),
  points_awarded INTEGER DEFAULT 0,
  points_credited BOOLEAN DEFAULT FALSE,
  water_saved_liters NUMERIC DEFAULT 0,
  co2_saved_kg NUMERIC DEFAULT 0,
  assigned_artisan_studio TEXT,
  qr_code_value TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  scanned_at TIMESTAMPTZ
);

-- 5. MARKET ITEMS (Katalog Pakaian Preloved / Thrifting)
CREATE TABLE IF NOT EXISTS public.market_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  brand TEXT,
  seller_name TEXT NOT NULL,
  seller_avatar TEXT,
  seller_city TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  condition TEXT NOT NULL,
  category TEXT NOT NULL,
  size TEXT NOT NULL,
  measurements JSONB DEFAULT '{"chestWidthCm": 50, "lengthCm": 68}'::jsonb,
  material TEXT,
  story TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  water_saved_liters NUMERIC DEFAULT 2700,
  co2_saved_kg NUMERIC DEFAULT 3.6,
  is_verified_qc BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'BOOKED', 'SOLD')),
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CRAFT PRODUCTS (Katalog Karya Daur Ulang / Upcycle UMKM Perajin)
CREATE TABLE IF NOT EXISTS public.craft_products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  artisan_name TEXT NOT NULL,
  artisan_studio TEXT NOT NULL,
  artisan_city TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  category TEXT NOT NULL,
  technique TEXT NOT NULL,
  material_saved TEXT NOT NULL,
  dimensions TEXT,
  story TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  stock_count INTEGER NOT NULL DEFAULT 1,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  water_saved_liters NUMERIC DEFAULT 3200,
  co2_saved_kg NUMERIC DEFAULT 4.8,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ARTISAN INVENTORY (Stok Bahan Baku Kain Perca & Tekstil Diterima)
CREATE TABLE IF NOT EXISTS public.artisan_inventory (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  artisan_studio TEXT NOT NULL,
  raw_fabric_stock_kg NUMERIC DEFAULT 0,
  denim_kg NUMERIC DEFAULT 0,
  cotton_kg NUMERIC DEFAULT 0,
  polyester_kg NUMERIC DEFAULT 0,
  total_crafted_items INTEGER DEFAULT 0,
  history JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SELLER & CRAFT ORDERS (Pesanan Pembelian Produk)
CREATE TABLE IF NOT EXISTS public.seller_orders (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_phone TEXT,
  shipping_address TEXT NOT NULL,
  courier TEXT NOT NULL,
  tracking_number TEXT,
  price NUMERIC NOT NULL,
  commission_fee NUMERIC DEFAULT 0,
  net_earnings NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'WAITING_PAYMENT' CHECK (status IN ('WAITING_PAYMENT', 'PAID', 'PACKING', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.craft_orders (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  artisan_studio TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_phone TEXT,
  shipping_address TEXT NOT NULL,
  courier TEXT NOT NULL,
  tracking_number TEXT,
  price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'PROCESSING' CHECK (status IN ('WAITING_PAYMENT', 'PROCESSING', 'MAKING', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. WITHDRAWALS (Penarikan Dana / Saldo Dompet)
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT,
  role TEXT NOT NULL CHECK (role IN ('SELLER', 'ARTISAN', 'COURIER', 'USER')),
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  fee NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'SUCCESS' CHECK (status IN ('PENDING', 'PROCESSING', 'SUCCESS', 'REJECTED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drop_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craft_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisan_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craft_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;

-- 11. PUBLIC ACCESS POLICIES (Idempotent: Drop first if already exists)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert/update their own profile" ON public.profiles;
CREATE POLICY "Users can insert/update their own profile" ON public.profiles FOR ALL USING (true);

DROP POLICY IF EXISTS "Drop boxes viewable by everyone" ON public.drop_boxes;
CREATE POLICY "Drop boxes viewable by everyone" ON public.drop_boxes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Drop orders accessible by everyone" ON public.drop_orders;
CREATE POLICY "Drop orders accessible by everyone" ON public.drop_orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Market items viewable by everyone" ON public.market_items;
CREATE POLICY "Market items viewable by everyone" ON public.market_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Market items insert/update/delete by everyone" ON public.market_items;
CREATE POLICY "Market items insert/update/delete by everyone" ON public.market_items FOR ALL USING (true);

DROP POLICY IF EXISTS "Craft products viewable by everyone" ON public.craft_products;
CREATE POLICY "Craft products viewable by everyone" ON public.craft_products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Craft products insert/update/delete by everyone" ON public.craft_products;
CREATE POLICY "Craft products insert/update/delete by everyone" ON public.craft_products FOR ALL USING (true);

DROP POLICY IF EXISTS "Artisan inventory accessible by everyone" ON public.artisan_inventory;
CREATE POLICY "Artisan inventory accessible by everyone" ON public.artisan_inventory FOR ALL USING (true);

DROP POLICY IF EXISTS "Seller orders accessible by everyone" ON public.seller_orders;
CREATE POLICY "Seller orders accessible by everyone" ON public.seller_orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Craft orders accessible by everyone" ON public.craft_orders;
CREATE POLICY "Craft orders accessible by everyone" ON public.craft_orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Withdrawals accessible by everyone" ON public.withdrawals;
CREATE POLICY "Withdrawals accessible by everyone" ON public.withdrawals FOR ALL USING (true);

