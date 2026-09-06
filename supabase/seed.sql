-- ==============================================================================
-- CLOTHLOOP.ID - SEED & RESET KATALOG KERAJINAN & PRELOVED BARU
-- ==============================================================================

-- 1. BERSIHKAN DATA KATALOG LAMA DI SUPABASE
TRUNCATE TABLE public.craft_products;
TRUNCATE TABLE public.market_items;

-- 2. INSERT 5 PRODUK KERAJINAN TERBARU (SESUAI FOTO & HARGA NORMAL)
INSERT INTO public.craft_products (
  id,
  title,
  artisan_name,
  artisan_studio,
  artisan_city,
  price,
  original_price,
  category,
  technique,
  material_saved,
  dimensions,
  story,
  images,
  stock_count,
  rating,
  review_count,
  water_saved_liters,
  co2_saved_kg
) VALUES
(
  'craft-denim-tote-bag',
  'Tas Tote Bag Denim Patchwork',
  'Mbak Ratna',
  'Studio Daur Asri',
  'Jakarta Selatan',
  145000,
  220000,
  'Tas & Pouch',
  'Patchwork & Sashiko Stitching',
  'Celana Jeans Denim Bekas & Katun',
  '38 x 42 cm (Tali 60 cm)',
  'Tas tote bag kokoh buatan tangan dari daur ulang 2 potong celana denim bekas. Dilengkapi furing katun halus, saku dalam, dan jahitan boro sashiko yang estetik.',
  ARRAY['/craft/craft-denim-tote-bag.jpg'],
  15,
  5.0,
  18,
  3800,
  5.2
),
(
  'craft-denim-coin-pouch',
  'Dompet Koin Denim Sashiko Boro',
  'Mbak Ratna',
  'Studio Daur Asri',
  'Jakarta Selatan',
  45000,
  75000,
  'Tas & Pouch',
  'Sashiko Stitching & Upcycling',
  'Potongan Denim & Kain Perca',
  '12 x 10 cm',
  'Pouch koin mungil dengan detail sulam tangan sashiko tradisional. Praktis untuk menyimpan koin, earphone, kunci, dan kartu.',
  ARRAY['/craft/craft-denim-coin-pouch.jpg'],
  20,
  4.9,
  14,
  1200,
  1.8
),
(
  'craft-star-keychain',
  'Gantungan Kunci Bintang Denim Perca',
  'Ibu Endang',
  'Studio Kriya Rekacipta Surabaya',
  'Surabaya',
  25000,
  40000,
  'Aksesoris & Topi',
  'Handmade Patchwork',
  'Sisa Perca Denim & Katun',
  '8 x 8 cm',
  'Gantungan kunci berbentuk bintang unik dari sisa potongan kain perca denim celana jeans. Memiliki ring besi anti karat, cocok untuk tas atau kunci motor.',
  ARRAY['/craft/craft-star-keychain.jpg'],
  30,
  5.0,
  27,
  650,
  0.9
),
(
  'craft-mini-wallet',
  'Dompet Mini Lipat Denim Upcycle',
  'Bapak Dimas',
  'Malang Upcycle Craft Center',
  'Malang',
  65000,
  95000,
  'Tas & Pouch',
  'Tailoring & Edge Finishing',
  'Denim Tebal & Katun Motif',
  '11 x 8.5 cm (Kondisi Terlipat)',
  'Dompet mini lipat ramping dengan slot kartu dan uang tunai. Dibuat dari kain denim tebal berkualitas yang tahan lama dengan sentuhan jahitan rapi.',
  ARRAY['/craft/craft-mini-wallet.jpg'],
  12,
  5.0,
  19,
  2100,
  2.9
);
