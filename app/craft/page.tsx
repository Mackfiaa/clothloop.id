'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Droplets, 
  Wind, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  X, 
  ArrowRight,
  Store,
  MapPin,
  Clock,
  Sparkles,
  Package,
  Layers,
  Scissors,
  Check
} from 'lucide-react';
import { CraftProduct, CraftProductCategory, MarketItem, CraftOrderItem } from '@/lib/types';
import { useApp } from '@/lib/store';
import { formatRupiah, formatNumber } from '@/lib/utils';
import { fetchCraftProducts } from '@/lib/supabase/data';
import { getAllCraftProductsWithArtisans } from '@/lib/supabase/portalData';
import { INDONESIA_CITIES } from '@/lib/constants';
import { CheckoutModal } from '@/components/craft/CheckoutModal';
import { OrderHistorySection } from '@/components/craft/OrderHistorySection';

const CATEGORIES: CraftProductCategory[] = [
  'Semua',
  'Tas & Pouch',
  'Busana Upcycled',
  'Aksesoris & Topi',
  'Home Living',
];

export default function CraftMarketplacePage() {
  const { addToCart, addNotification, currentUser } = useApp();
  const [products, setProducts] = useState<CraftProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CraftProductCategory>('Semua');
  const [selectedCity, setSelectedCity] = useState<string>('Semua Kota');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [activeMainTab, setActiveMainTab] = useState<'CATALOG' | 'WISHLIST' | 'ORDERS'>('CATALOG');
  
  // Selected product for Detailed Description Modal
  const [selectedProduct, setSelectedProduct] = useState<CraftProduct | null>(null);
  const [detailPhotoIdx, setDetailPhotoIdx] = useState(0);

  // Direct checkout item state
  const [directCheckoutItems, setDirectCheckoutItems] = useState<CraftOrderItem[] | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    fetchCraftProducts().then((fetched) => {
      setProducts(fetched);
      if (fetched.length === 0 && typeof window !== 'undefined') {
        localStorage.removeItem('clothloop_artisan_crafts');
      }
    });
    const savedWishlist = localStorage.getItem('clothloop_craft_wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {}
    }
  }, []);

  const toggleWishlist = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (wishlist.includes(id)) {
      updated = wishlist.filter(x => x !== id);
      addNotification('info', 'Wishlist Diperbarui', `${title} dihapus dari daftar favorit.`);
    } else {
      updated = [...wishlist, id];
      addNotification('success', 'Disimpan ke Favorit', `${title} disimpan ke daftar favorit.`);
    }
    setWishlist(updated);
    localStorage.setItem('clothloop_craft_wishlist', JSON.stringify(updated));
  };

  const handleAddToCart = (product: CraftProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const item: MarketItem = {
      id: product.id,
      title: product.title,
      brand: product.artisanStudio,
      sellerName: product.artisanName,
      sellerCity: product.artisanCity,
      price: product.price,
      originalPrice: product.originalPrice,
      condition: 'UPCYCLED',
      category: 'Upcycled Bags',
      size: product.dimensions || 'All Size',
      measurements: { chestWidthCm: 0, lengthCm: 0 },
      material: product.technique,
      story: product.story,
      images: product.images,
      waterSavedLiters: product.waterSavedLiters,
      co2SavedKg: product.co2SavedKg,
      isVerifiedQC: true,
      status: 'AVAILABLE',
      rating: product.rating,
      reviewCount: product.reviewCount,
    };

    if (!currentUser) {
      addNotification('warning', 'Masuk Diperlukan', 'Silakan masuk atau daftar terlebih dahulu untuk menambahkan produk ke keranjang belanja.');
      window.location.href = '/auth/login?redirect=/craft';
      return;
    }

    addToCart(item);
    addNotification('success', 'Karya Masuk Keranjang', `${product.title} berhasil ditambahkan ke keranjang belanja.`);
  };

  const handleDirectCheckout = (product: CraftProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentUser) {
      addNotification('warning', 'Masuk Diperlukan', 'Silakan masuk atau daftar terlebih dahulu untuk melakukan pembelian produk kerajinan.');
      window.location.href = '/auth/login?redirect=/craft';
      return;
    }
    setDirectCheckoutItems([
      {
        id: product.id,
        title: product.title,
        artisanStudio: product.artisanStudio,
        artisanCity: product.artisanCity,
        price: product.price,
        quantity: 1,
        image: product.images[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
      },
    ]);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Wishlist tab filter
      if (activeMainTab === 'WISHLIST' && !wishlist.includes(p.id)) return false;

      // Category filter
      if (selectedCategory !== 'Semua' && p.category !== selectedCategory) return false;

      // City filter
      if (selectedCity !== 'Semua Kota' && p.artisanCity.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Search query
      if (
        searchQuery &&
        !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.artisanStudio.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.artisanCity.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.technique.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [products, selectedCategory, selectedCity, searchQuery, sortBy, activeMainTab, wishlist]);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#faf8f5] text-slate-900 selection:bg-emerald-200">

      {/* ── 1. HERO SECTION: WARNA HIJAU + ANIMASI TEKSTIL (TANPA LINGKARAN) ─────────── */}
      <div className="relative bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-950 py-14 sm:py-20 text-white overflow-hidden shadow-sm">
        
        {/* Animated Textile Weaving Pattern & Wave Flow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="craft-weaving-pattern" width="70" height="70" patternUnits="userSpaceOnUse">
                <path d="M 0 35 Q 17.5 15, 35 35 T 70 35" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5 4" opacity="0.6" />
                <path d="M 35 0 Q 17.5 15, 35 35 T 35 70" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5 4" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#craft-weaving-pattern)" />
          </svg>

          {/* Animated floating filament glow */}
          <motion.div 
            animate={{ x: [0, 60, 0], y: [0, -25, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1/4 -left-1/4 w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400/20 via-teal-300/10 to-transparent blur-3xl pointer-events-none"
          />
        </div>

        <div className="container-site relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="max-w-2xl">
              {/* Clean title without circles or symbols */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-sm">
                ClothCraft Marketplace
              </h1>

              {/* Revised subtitle without excess text */}
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium mt-3 leading-relaxed max-w-xl">
                Koleksi produk kerajinan tangan tekstil daur ulang terbaik dari studio perajin lokal di seluruh Indonesia.
              </p>

              {/* Complementary Detail Feature Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mt-5">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-emerald-100 border border-white/15">
                  <Sparkles size={13} className="text-amber-300" />
                  <span>100% Serat Daur Ulang</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-emerald-100 border border-white/15">
                  <Scissors size={13} className="text-amber-300" />
                  <span>Karya Tangan Perajin Lokal</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-emerald-100 border border-white/15">
                  <ShieldCheck size={13} className="text-emerald-300" />
                  <span>Jaminan Keamanan Transaksi</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="bg-emerald-900/60 backdrop-blur-md px-6 py-3.5 rounded-3xl border border-emerald-500/30 flex items-center gap-4 text-white shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-400 text-amber-950 flex items-center justify-center font-black shadow-md shrink-0">
                <Store size={22} />
              </div>
              <div>
                <span className="text-[10px] text-amber-200 uppercase font-bold tracking-widest block mb-0.5">
                  Katalog Kerajinan
                </span>
                <span className="text-xs font-normal text-white/90 block leading-tight">
                  {products.length} Karya
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN NAVIGATION TABS ─────────────────────────────────── */}
      <div className="container-site pt-8 pb-3">
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveMainTab('CATALOG')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeMainTab === 'CATALOG'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            <Store size={15} />
            <span>Katalog Kerajinan</span>
          </button>

          <button
            onClick={() => setActiveMainTab('WISHLIST')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeMainTab === 'WISHLIST'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            <Heart size={15} className={wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''} />
            <span>Produk Disukai ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveMainTab('ORDERS')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeMainTab === 'ORDERS'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            <Package size={15} />
            <span>Pesanan Saya</span>
          </button>
        </div>
      </div>

      {/* ── 3. BODY CONTENT: CATALOG OR ORDERS ─────────────────────────── */}
      <div className="container-site py-4 pb-16 flex flex-col gap-8">

        {activeMainTab === 'ORDERS' ? (
          /* Orders Tracking & History View */
          <OrderHistorySection onShopAgain={() => setActiveMainTab('CATALOG')} />
        ) : (
          /* Catalog & Wishlist View */
          <>
            {/* Filter & Search Area: Kategori di Atas, Search & Filter Panjang di Bawah */}
            <div className="flex flex-col gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-[var(--border-hairline)] shadow-2xs">
              
              {/* Row 1: Category Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
                  Kategori:
                </span>
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                        active
                          ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                          : 'bg-stone-100 text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Row 2: Search Input Panjang & Filter Kota / Sort */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-gray-100">
                
                {/* Search Input Memanjang Penuh */}
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama produk kerajinan, teknik jahit, atau studio perajin..."
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-100 border border-stone-200 rounded-2xl text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:border-emerald-700 transition-colors"
                  />
                </div>

                {/* Filter Kota Asal (Tanpa Emot Merah) */}
                <div className="relative sm:w-56 shrink-0">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-100 border border-stone-200 rounded-2xl text-xs sm:text-sm font-bold text-gray-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
                  >
                    <option value="Semua Kota">Semua Kota Asal</option>
                    {INDONESIA_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Urutkan Dropdown */}
                <div className="sm:w-44 shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-stone-100 border border-stone-200 rounded-2xl text-xs sm:text-sm font-bold text-gray-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
                  >
                    <option value="popular">Terpopuler</option>
                    <option value="price-asc">Harga Terendah</option>
                    <option value="price-desc">Harga Tertinggi</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[var(--border-hairline)] max-w-lg mx-auto flex flex-col items-center gap-3 shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <ShoppingBag size={24} />
                </div>
                <h3 className="text-base font-extrabold text-[var(--ink-primary)]">
                  {activeMainTab === 'WISHLIST' 
                    ? 'Belum Ada Produk Disukai' 
                    : products.length === 0 
                      ? 'Katalog Kerajinan Masih Kosong (0 Produk)' 
                      : 'Tidak Ada Produk yang Cocok'}
                </h3>
                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                  {activeMainTab === 'WISHLIST' 
                    ? 'Klik ikon Love pada produk yang Anda minati di katalog kerajinan.' 
                    : products.length === 0 
                      ? 'Belum ada karya upcycling yang diunggah oleh studio perajin & UMKM. Masuk ke dashboard untuk mengunggah produk kerajinan Anda!' 
                      : 'Coba gunakan kata kunci lain atau pilih kota / kategori Semua.'}
                </p>
                {products.length === 0 ? (
                  <Link
                    href="/craftsman"
                    className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold py-2.5 px-5 rounded-2xl shadow-sm transition-all mt-2"
                  >
                    <span>Unggah Produk di Dashboard Perajin</span>
                    <ArrowRight size={14} />
                  </Link>
                ) : (
                  <button
                    onClick={() => { setSelectedCategory('Semua'); setSelectedCity('Semua Kota'); setSearchQuery(''); setActiveMainTab('CATALOG'); }}
                    className="btn-secondary text-xs py-2 px-4 font-bold mt-2 cursor-pointer"
                  >
                    Reset Filter & Buka Katalog
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((p, idx) => {
                  const isFav = wishlist.includes(p.id);

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      onClick={() => {
                        setSelectedProduct(p);
                        setDetailPhotoIdx(0);
                      }}
                      className="bg-white rounded-3xl border border-[var(--border-hairline)] overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      {/* 1. Photo Area: MURNI HANYA FOTO + LIKE ICON & STOCK BADGE SAJA */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={(p.images && p.images[0] && p.images[0].length > 3) ? p.images[0] : 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Stock Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 shadow-xs">
                            Stok: {p.stockCount}
                          </span>
                        </div>

                        {/* Like Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(p.id, p.title, e)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md ${
                            isFav ? 'bg-rose-500 text-white' : 'bg-white/85 backdrop-blur-md text-gray-700 hover:text-rose-500'
                          }`}
                        >
                          <Heart size={14} className={isFav ? 'fill-white' : ''} />
                        </button>
                      </div>

                      {/* 2. Keterangan Card: HANYA Studio, Kota Asal, Nama Produk, dan Harga */}
                      <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                        <div>
                          {/* Nama Studio Pengrajin & Asal Kota Studio */}
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-extrabold text-amber-800 truncate">{p.artisanStudio}</span>
                            <span className="text-[11px] text-gray-500 font-medium shrink-0 flex items-center gap-1">
                              <MapPin size={11} className="text-gray-400" />
                              {p.artisanCity}
                            </span>
                          </div>

                          {/* Nama Produk Kerajinan */}
                          <h3 className="font-black text-base text-gray-900 leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
                            {p.title}
                          </h3>
                        </div>

                        {/* Harga Produk & 2 Button Aksi: Keranjang & Checkout */}
                        <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-col gap-3">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">Harga Kerajinan</span>
                            <strong className="text-lg font-black text-emerald-900 font-mono">
                              {formatRupiah(p.price)}
                            </strong>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {/* Button Keranjang */}
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={(e) => handleAddToCart(p, e)}
                              className="btn-secondary justify-center text-xs py-2 px-2 font-bold shadow-2xs flex items-center gap-1.5"
                            >
                              <ShoppingBag size={13} />
                              <span>Keranjang</span>
                            </motion.button>

                            {/* Button Checkout */}
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={(e) => handleDirectCheckout(p, e)}
                              className="btn-primary justify-center text-xs py-2 px-2 font-bold shadow-2xs flex items-center gap-1.5"
                            >
                              <span>Checkout</span>
                              <ArrowRight size={13} />
                            </motion.button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}

      </div>

      {/* ── 4. SECTION PALING BAWAH (BACKGROUND HIJAU): AJAKAN DONASI PAKAIAN ─────────── */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white py-14 sm:py-18 relative overflow-hidden border-t border-emerald-800/60">
        
        {/* Decorative background glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-400 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-amber-400 blur-3xl" />
        </div>

        <div className="container-site relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
          {/* Teks Inisiatif Sirkular ClothLoop */}
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300">
            Inisiatif Sirkular ClothLoop
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Punya Pakaian Bekas Tak Terpakai di Lemari?
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
            Sumbangkan pakaian Anda melalui program <strong>ClothDrop</strong> agar dapat diolah dan direkonstruksi oleh studio perajin lokal menjadi karya kerajinan yang indah, bernilai tinggi, dan dapat digunakan kembali. Dapatkan reward <strong>ClothPoints</strong> untuk setiap helai yang Anda donasikan!
          </p>

          <div className="pt-2">
            <Link
              href="/drop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 px-7 py-3.5 rounded-full font-black text-xs sm:text-sm shadow-xl hover:scale-105 transition-transform"
            >
              <span>Donasikan Pakaian Sekarang (Drop Baju)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 5. MODAL DETAIL DESKRIPSI PRODUK (POP-UP) ─────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[var(--border-hairline)] my-6 relative max-h-[92vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2">
                
                {/* Modal Product Image & Gallery */}
                <div className="relative aspect-square md:aspect-auto w-full bg-stone-100 min-h-[300px] flex flex-col justify-between p-4">
                  <div className="relative w-full h-full min-h-[240px] rounded-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={(selectedProduct.images && selectedProduct.images[detailPhotoIdx]) || (selectedProduct.images && selectedProduct.images[0]) || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'}
                      alt={selectedProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Multi-Photo Thumbnail Bar if any */}
                  {selectedProduct.images.length > 1 && (
                    <div className="flex items-center gap-2 pt-2 overflow-x-auto">
                      {selectedProduct.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setDetailPhotoIdx(i)}
                          className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 cursor-pointer shrink-0 ${
                            detailPhotoIdx === i ? 'border-emerald-600' : 'border-transparent'
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Product Details */}
                <div className="p-6 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {selectedProduct.category}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        Stok: {selectedProduct.stockCount} Unit
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-gray-900 leading-tight">
                      {selectedProduct.title}
                    </h2>

                    <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-900 font-bold">
                      <span>{selectedProduct.artisanStudio}</span>
                      <span className="text-gray-400">&middot;</span>
                      <span className="text-gray-500 font-normal">{selectedProduct.artisanCity}</span>
                    </div>

                    {/* Story / Description */}
                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Deskripsi & Kisah Karya
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {selectedProduct.story}
                      </p>
                    </div>

                    {/* Specifications Box */}
                    <div className="mt-4 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs flex flex-col gap-2 font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Teknik Upcycling:</span>
                        <strong className="text-gray-900 text-right">{selectedProduct.technique}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Dimensi / Ukuran:</span>
                        <strong className="text-gray-900 text-right">{selectedProduct.dimensions || 'All Size'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bahan Baku Daur Ulang:</span>
                        <strong className="text-emerald-700 text-right">{selectedProduct.materialSaved}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Dampak Lingkungan:</span>
                        <strong className="text-emerald-700 text-right">
                          Hemat {formatNumber(selectedProduct.waterSavedLiters)} L Air &middot; {selectedProduct.co2SavedKg} kg CO₂
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-500">Harga Produk:</span>
                      <strong className="text-2xl font-black text-emerald-900 font-mono">
                        {formatRupiah(selectedProduct.price)}
                      </strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(selectedProduct)}
                        className="btn-secondary justify-center text-xs py-3 font-bold cursor-pointer"
                      >
                        + Keranjang
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDirectCheckout(selectedProduct)}
                        className="btn-primary justify-center text-xs py-3 font-bold cursor-pointer"
                      >
                        Checkout Sekarang
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Direct Checkout Modal from Card or Description Popup */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={directCheckoutItems || []}
        onSuccessOrder={() => {
          setActiveMainTab('ORDERS');
        }}
      />

    </div>
  );
}
