'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Droplets, 
  Wind, 
  X, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Tag, 
  Store, 
  MapPin, 
  Package, 
  Ruler, 
  Check 
} from 'lucide-react';
import { GarmentCategory, GarmentCondition, MarketItem, CraftOrderItem } from '@/lib/types';
import { formatRupiah, formatNumber } from '@/lib/utils';
import { ConditionBadge } from '@/components/ui/Badge';
import { useApp } from '@/lib/store';
import { fetchMarketItems } from '@/lib/supabase/data';
import { getAllMarketItemsWithSellers } from '@/lib/supabase/portalData';
import { INDONESIA_CITIES } from '@/lib/constants';
import { CheckoutModal } from '@/components/craft/CheckoutModal';
import { OrderHistorySection } from '@/components/craft/OrderHistorySection';

const CATEGORIES: GarmentCategory[] = [
  'Semua', 
  'Wanita', 
  'Pria', 
  'Denim & Jeans', 
  'Outerwear', 
  'Upcycled Bags', 
  'Vintage'
];

const CONDITIONS: { id: GarmentCondition | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'Semua Kondisi' },
  { id: 'LIKE_NEW', label: 'Like New (99%)' },
  { id: 'GENTLY_USED', label: 'Gently Used (90%)' },
  { id: 'UPCYCLED', label: 'Upcycled' },
  { id: 'VINTAGE', label: 'Vintage Terawat' },
];

export default function MarketPage() {
  const { addToCart, addNotification, currentUser } = useApp();
  const [items, setItems] = useState<MarketItem[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GarmentCategory>('Semua');
  const [selectedCity, setSelectedCity] = useState<string>('Semua Kota');
  const [condition, setCondition] = useState<GarmentCondition | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [activeMainTab, setActiveMainTab] = useState<'CATALOG' | 'WISHLIST' | 'ORDERS'>('CATALOG');

  // Selected item for Detailed Inspection Modal
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [modalPhotoIdx, setModalPhotoIdx] = useState(0);

  // Direct checkout state
  const [directCheckoutItems, setDirectCheckoutItems] = useState<CraftOrderItem[] | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    fetchMarketItems().then((fetched) => {
      const liveItems = getAllMarketItemsWithSellers();
      const combined = [...liveItems, ...fetched.filter(f => !liveItems.some(li => li.id === f.id))];
      setItems(combined.length > 0 ? combined : fetched);
    });
    const saved = localStorage.getItem('clothloop_wishlist');
    if (saved) {
      try { setWishlist(JSON.parse(saved)); } catch (e) {}
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
    localStorage.setItem('clothloop_wishlist', JSON.stringify(updated));
  };

  const handleAddToCart = (item: MarketItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentUser) {
      addNotification('warning', 'Masuk Diperlukan', 'Silakan masuk atau daftar terlebih dahulu untuk menambahkan pakaian ke keranjang belanja.');
      window.location.href = '/auth/login?redirect=/market';
      return;
    }
    addToCart(item);
    addNotification('success', 'Pakaian Masuk Keranjang', `${item.title} berhasil ditambahkan ke keranjang belanja.`);
  };

  const handleDirectCheckout = (item: MarketItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentUser) {
      addNotification('warning', 'Masuk Diperlukan', 'Silakan masuk atau daftar terlebih dahulu untuk melakukan pembelian pakaian.');
      window.location.href = '/auth/login?redirect=/market';
      return;
    }
    setDirectCheckoutItems([
      {
        id: item.id,
        title: item.title,
        artisanStudio: item.brand || item.sellerName,
        artisanCity: item.sellerCity || 'Jakarta Selatan',
        price: item.price,
        quantity: 1,
        image: item.images[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
      },
    ]);
    setSelectedItem(null);
    setIsCheckoutOpen(true);
  };

  const filtered = useMemo(() => {
    return items.filter(item => {
      // Wishlist tab filter
      if (activeMainTab === 'WISHLIST' && !wishlist.includes(item.id)) return false;

      // Category filter
      if (category !== 'Semua' && item.category !== category) return false;

      // City filter
      if (selectedCity !== 'Semua Kota' && (item.sellerCity ?? '').toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Condition filter
      if (condition !== 'ALL' && item.condition !== condition) return false;

      // Search query
      if (
        query && 
        !item.title.toLowerCase().includes(query.toLowerCase()) && 
        !(item.brand ?? '').toLowerCase().includes(query.toLowerCase()) &&
        !(item.sellerCity ?? '').toLowerCase().includes(query.toLowerCase())
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.rating ?? 5) - (a.rating ?? 5);
    });
  }, [items, activeMainTab, wishlist, query, category, selectedCity, condition, sortBy]);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#faf8f5] text-slate-900 selection:bg-emerald-200">

      {/* ── 1. HERO SECTION: WARNA HIJAU DENGAN ANIMASI KHAS PRELOVED ─────────────────── */}
      <div className="relative bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-950 py-14 sm:py-20 text-white overflow-hidden shadow-sm">
        
        {/* Animated Diamond Grid & Shimmer Particles Pattern (Beda dari Halaman Lain) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="preloved-diamond-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                <circle cx="30" cy="30" r="2" fill="white" opacity="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#preloved-diamond-pattern)" />
          </svg>

          {/* Animated floating inspection shimmer aura */}
          <motion.div 
            animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1/3 -right-1/4 w-[130%] h-[130%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-400/20 via-emerald-300/10 to-transparent blur-3xl pointer-events-none"
          />
        </div>

        <div className="container-site relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="max-w-2xl">
              {/* Clean title without circles or extra symbols */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-sm">
                Preloved Marketplace
              </h1>

              {/* Revised subtitle */}
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium mt-3 leading-relaxed max-w-xl">
                Pakaian preloved ini sudah diseleksi dalam beberapa tahap dan sudah terjamin kualitasnya, tanpa ada kerusakan pada barang.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mt-5">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-100 border border-white/15">
                  <CheckCircle2 size={13} className="text-amber-300" />
                  <span>Barang Masih Bagus</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-100 border border-white/15">
                  <Ruler size={13} className="text-amber-300" />
                  <span>Ukuran Sesuai</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-100 border border-white/15">
                  <ShieldCheck size={13} className="text-emerald-300" />
                  <span>Jaminan Keamanan Transaksi</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="bg-emerald-900/60 backdrop-blur-md px-6 py-3.5 rounded-3xl border border-emerald-500/30 flex items-center gap-4 text-white shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-400 text-amber-950 flex items-center justify-center font-black shadow-md shrink-0">
                <Tag size={22} />
              </div>
              <div>
                <span className="text-[10px] text-amber-200 uppercase font-bold tracking-widest block mb-0.5">
                  Koleksi Pakaian Terbaik ClothLoop
                </span>
                <span className="text-xs font-normal text-white/90 block leading-tight">
                  {items.length} Pakaian Siap Pakai
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN NAVIGATION TABS (KATALOG / WISHLIST / PESANAN SAYA) ───────── */}
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
            <span>Katalog Preloved</span>
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
          /* Shared Order History Section */
          <OrderHistorySection onShopAgain={() => setActiveMainTab('CATALOG')} />
        ) : (
          /* Catalog & Wishlist View */
          <>
            {/* Filter & Search Layout: Kategori di Atas, Search & Filter Panjang di Bawah */}
            <div className="flex flex-col gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-[var(--border-hairline)] shadow-2xs">
              
              {/* Row 1: Category Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
                  Kategori:
                </span>
                {CATEGORIES.map((c) => {
                  const active = category === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                        active
                          ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                          : 'bg-stone-100 text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {/* Row 2: Search Input Panjang & Filter Kota / Kondisi / Sort */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 pt-2 border-t border-gray-100">
                
                {/* Search Input Memanjang */}
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari brand, model pakaian, atau nama penjual..."
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-100 border border-stone-200 rounded-2xl text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:border-emerald-700 transition-colors"
                  />
                </div>

                {/* Filter Kota Asal (Tanpa Emot Merah) */}
                <div className="relative sm:w-52 shrink-0">
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

                {/* Filter Kondisi */}
                <div className="relative sm:w-48 shrink-0">
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-stone-100 border border-stone-200 rounded-2xl text-xs sm:text-sm font-bold text-gray-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
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

            {/* Product Cards Grid (Desain Seragam dengan Halaman Kerajinan) */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[var(--border-hairline)] max-w-lg mx-auto flex flex-col items-center gap-3 shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <ShoppingBag size={24} />
                </div>
                <h3 className="text-base font-extrabold text-[var(--ink-primary)]">
                  {activeMainTab === 'WISHLIST' 
                    ? 'Belum Ada Pakaian Disukai' 
                    : items.length === 0
                      ? 'Katalog Preloved Masih Kosong (0 Pakaian)'
                      : 'Tidak Ada Produk yang Cocok'}
                </h3>
                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                  {activeMainTab === 'WISHLIST' 
                    ? 'Klik ikon Love pada pakaian yang Anda minati di katalog preloved.' 
                    : items.length === 0
                      ? 'Belum ada pakaian preloved yang diunggah oleh penjual. Mulai jual pakaian layak pakai Anda dan dapatkan penghasilan lewat Seller Hub!'
                      : 'Coba gunakan kata kunci lain atau pilih kategori / kondisi Semua.'}
                </p>
                {items.length === 0 ? (
                  <Link
                    href="/seller"
                    className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold py-2.5 px-5 rounded-2xl shadow-sm transition-all mt-2"
                  >
                    <span>Mulai Jual di Seller Hub</span>
                    <ArrowRight size={14} />
                  </Link>
                ) : (
                  <button
                    onClick={() => { setCategory('Semua'); setSelectedCity('Semua Kota'); setCondition('ALL'); setQuery(''); setActiveMainTab('CATALOG'); }}
                    className="btn-secondary text-xs py-2 px-4 font-bold mt-2 cursor-pointer"
                  >
                    Reset Filter & Buka Katalog
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((item, idx) => {
                  const isFav = wishlist.includes(item.id);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: idx * 0.03 }}
                      onClick={() => {
                        setSelectedItem(item);
                        setModalPhotoIdx(0);
                      }}
                      className="bg-white rounded-3xl border border-[var(--border-hairline)] overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      {/* 1. Photo Area: MURNI HANYA FOTO + LIKE ICON & BADGE KONDISI QC */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                        <Image
                          src={item.images[0] || '/hero-portrait.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

                        {/* Condition & Size Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <ConditionBadge condition={item.condition} />
                          <span className="text-[10px] font-black font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 shadow-xs">
                            {item.size}
                          </span>
                        </div>

                        {/* Like Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(item.id, item.title, e)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md ${
                            isFav ? 'bg-rose-500 text-white' : 'bg-white/85 backdrop-blur-md text-gray-700 hover:text-rose-500'
                          }`}
                        >
                          <Heart size={14} className={isFav ? 'fill-white' : ''} />
                        </button>
                      </div>

                      {/* 2. Keterangan Card: Brand/Penjual, Kota Asal, Nama Pakaian, dan Harga */}
                      <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                        <div>
                          {/* Brand & Kota Asal */}
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-extrabold text-emerald-800 truncate">{item.brand || item.sellerName}</span>
                            <span className="text-[11px] text-gray-500 font-medium shrink-0 flex items-center gap-1">
                              <MapPin size={11} className="text-gray-400" />
                              {item.sellerCity || 'Indonesia'}
                            </span>
                          </div>

                          {/* Nama Produk Pakaian */}
                          <h3 className="font-black text-sm text-gray-900 leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
                            {item.title}
                          </h3>
                        </div>

                        {/* Harga Produk & 2 Button Aksi: Keranjang & Checkout */}
                        <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-col gap-3">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">Harga Preloved</span>
                            <strong className="text-base font-black text-emerald-900 font-mono">
                              {formatRupiah(item.price)}
                            </strong>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {/* Button Keranjang */}
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={(e) => handleAddToCart(item, e)}
                              className="btn-secondary justify-center text-xs py-2 px-2 font-bold shadow-2xs flex items-center gap-1.5"
                            >
                              <ShoppingBag size={13} />
                              <span>Keranjang</span>
                            </motion.button>

                            {/* Button Checkout */}
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={(e) => handleDirectCheckout(item, e)}
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

      {/* ── 4. MODAL DETAIL DESKRIPSI PRELOVED (POP-UP) ─────────────────── */}
      <AnimatePresence>
        {selectedItem && (
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
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2">
                
                {/* Modal Product Image */}
                <div className="relative aspect-square md:aspect-auto w-full bg-stone-100 min-h-[300px] flex flex-col justify-between p-4">
                  <div className="relative w-full h-full min-h-[240px] rounded-2xl overflow-hidden">
                    <Image
                      src={selectedItem.images[modalPhotoIdx] || selectedItem.images[0]}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Multi-Photo Thumbnail Bar if any */}
                  {selectedItem.images.length > 1 && (
                    <div className="flex items-center gap-2 pt-2 overflow-x-auto">
                      {selectedItem.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setModalPhotoIdx(i)}
                          className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 cursor-pointer shrink-0 ${
                            modalPhotoIdx === i ? 'border-emerald-600' : 'border-transparent'
                          }`}
                        >
                          <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Product Details */}
                <div className="p-6 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <ConditionBadge condition={selectedItem.condition} />
                      <span className="text-[10px] font-bold text-gray-500 font-mono">
                        Ukuran: {selectedItem.size}
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-gray-900 leading-tight">
                      {selectedItem.title}
                    </h2>

                    <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-900 font-bold">
                      <span>{selectedItem.brand}</span>
                      <span className="text-gray-400">&middot;</span>
                      <span className="text-gray-500 font-normal">Penjual: {selectedItem.sellerName} ({selectedItem.sellerCity})</span>
                    </div>

                    {/* Story / Description */}
                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Catatan Kondisi & Deskripsi
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {selectedItem.story || 'Pakaian ini telah melewati proses kurasi dan verifikasi higienis siap pakai tanpa noda atau cacat.'}
                      </p>
                    </div>

                    {/* Real Measurements Box */}
                    <div className="mt-4 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs flex flex-col gap-2 font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lebar Dada (Chest):</span>
                        <strong className="text-gray-900 text-right">{selectedItem.measurements?.chestWidthCm || 52} cm</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Panjang Baju (Length):</span>
                        <strong className="text-gray-900 text-right">{selectedItem.measurements?.lengthCm || 68} cm</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bahan / Material:</span>
                        <strong className="text-emerald-700 text-right">{selectedItem.material || 'Katun Berkualitas'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Dampak Lingkungan:</span>
                        <strong className="text-emerald-700 text-right">
                          Hemat {formatNumber(selectedItem.waterSavedLiters)} L Air &middot; {selectedItem.co2SavedKg} kg CO₂
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-500">Harga Preloved:</span>
                      <strong className="text-2xl font-black text-emerald-900 font-mono">
                        {formatRupiah(selectedItem.price)}
                      </strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(selectedItem)}
                        className="btn-secondary justify-center text-xs py-3 font-bold cursor-pointer"
                      >
                        + Keranjang
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDirectCheckout(selectedItem)}
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
