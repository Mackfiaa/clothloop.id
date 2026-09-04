'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Search, 
  SlidersHorizontal, 
  Droplets, 
  X, 
  ArrowRight, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { GarmentCategory, GarmentCondition, MarketItem } from '@/lib/types';
import { formatRupiah, formatNumber } from '@/lib/utils';
import { ConditionBadge } from '@/components/ui/Badge';
import { useApp } from '@/lib/store';
import { fetchMarketItems } from '@/lib/supabase/data';

const CATEGORIES: GarmentCategory[] = ['Semua', 'Wanita', 'Pria', 'Denim & Jeans', 'Outerwear', 'Upcycled Bags', 'Vintage'];
const CONDITIONS: { id: GarmentCondition | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'Semua Kondisi' },
  { id: 'LIKE_NEW', label: 'Like New' },
  { id: 'GENTLY_USED', label: 'Gently Used' },
  { id: 'UPCYCLED', label: 'Upcycled' },
  { id: 'VINTAGE', label: 'Vintage' },
];

export default function MarketPage() {
  const { addToCart, addNotification } = useApp();
  const [items, setItems] = useState<MarketItem[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GarmentCategory>('Semua');
  const [condition, setCondition] = useState<GarmentCondition | 'ALL'>('ALL');
  const [size, setSize] = useState('Semua');
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Per-card photo index tracker
  const [cardPhotoIndexes, setCardPhotoIndexes] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    fetchMarketItems().then(setItems);
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
      addNotification('info', 'Wishlist Diperbarui', `${title} dihapus dari daftar simpan.`);
    } else {
      updated = [...wishlist, id];
      addNotification('success', 'Disimpan ke Wishlist', `${title} disimpan ke daftar favorit.`);
    }
    setWishlist(updated);
    localStorage.setItem('clothloop_wishlist', JSON.stringify(updated));
  };

  const nextCardPhoto = (id: string, totalPhotos: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardPhotoIndexes(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % totalPhotos,
    }));
  };

  const prevCardPhoto = (id: string, totalPhotos: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardPhotoIndexes(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + totalPhotos) % totalPhotos,
    }));
  };

  const filtered = useMemo(() => {
    return items.filter(item => {
      if (showWishlistOnly && !wishlist.includes(item.id)) return false;
      if (query && !item.title.toLowerCase().includes(query.toLowerCase()) && !(item.brand ?? '').toLowerCase().includes(query.toLowerCase())) return false;
      if (category !== 'Semua' && item.category !== category) return false;
      if (condition !== 'ALL' && item.condition !== condition) return false;
      if (size !== 'Semua' && item.size !== size) return false;
      if (item.price > maxPrice) return false;
      return true;
    });
  }, [items, showWishlistOnly, wishlist, query, category, condition, size, maxPrice]);

  return (
    <div className="overflow-x-hidden">

      {/* Header */}
      <div className="bg-[var(--surface-main)] border-b border-[var(--border-hairline)] py-10 sm:py-12">
        <div className="container-site">
          <span className="label-eyebrow block mb-1">Preloved Marketplace</span>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-4xl font-bold text-[var(--ink-primary)] leading-tight">
                Koleksi Terkurasi & Bergaransi
              </h1>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1">
                Pakaian second-hand dengan 12-tahap inspeksi kondisi, panduan ukuran nyata, dan proteksi escrow.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari brand, model, ukuran..."
                className="input-minimal text-xs pl-5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-6 sm:py-8">

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-[var(--border-hairline)] flex-wrap">
          
          {/* Category Chips */}
          <div className="flex gap-1.5 scroll-touch-x flex-1 pb-1">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-xs px-3 py-1.5 border whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  category === c ? 'bg-[var(--ink-primary)] text-white border-[var(--ink-primary)]' : 'bg-transparent text-[var(--ink-secondary)] border-[var(--border-hairline)] hover:border-gray-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Wishlist Toggle */}
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`text-xs py-1.5 px-3 border flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                showWishlistOnly ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-[var(--ink-primary)] border-[var(--border-hairline)]'
              }`}
            >
              <Heart size={13} className={showWishlistOnly ? 'fill-red-700' : ''} />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 cursor-pointer"
            >
              <SlidersHorizontal size={12} /> Filter
            </button>
            <span className="text-xs text-gray-400 font-mono">({filtered.length})</span>
          </div>
        </div>

        {/* Filter Drawer */}
        {filterOpen && (
          <div className="mb-6 p-4 bg-white border border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="label-eyebrow block mb-1 text-[10px]">Kondisi Pakaian</span>
              <div className="flex flex-wrap gap-1">
                {CONDITIONS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCondition(c.id)}
                    className={`text-[11px] px-2 py-1 border cursor-pointer ${condition === c.id ? 'bg-[var(--forest-deep)] text-white border-[var(--forest-deep)]' : 'bg-transparent text-gray-600 border-[var(--border-hairline)]'}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="label-eyebrow block mb-1 text-[10px]">Ukuran</span>
              <div className="flex flex-wrap gap-1">
                {['Semua', 'XS', 'S', 'M', 'L', 'XL'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`text-[11px] px-2 py-1 border cursor-pointer ${size === s ? 'bg-[var(--ink-primary)] text-white border-[var(--ink-primary)]' : 'bg-transparent text-gray-600 border-[var(--border-hairline)]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="label-eyebrow text-[10px]">Batas Harga</span>
                <span className="font-bold">{formatRupiah(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={1500000}
                step={50000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{ accentColor: 'var(--forest-deep)' }}
              />
            </div>
          </div>
        )}

        {/* Product Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[var(--border-hairline)]">
            <ShoppingBag size={28} className="text-gray-300 mx-auto mb-2" />
            <p className="font-serif text-sm text-[var(--ink-primary)]">Tidak ada produk yang sesuai kriteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.map(item => {
              const photoIdx = cardPhotoIndexes[item.id] || 0;
              const images = item.images.length > 0 ? item.images : ['/hero-portrait.jpg'];
              const isWishlisted = wishlist.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="card-clean p-2 sm:p-2.5 flex flex-col justify-between gap-2 group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--surface-muted)]">
                    <Image
                      src={images[photoIdx] || images[0]}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />

                    <div className="absolute top-2 left-2 z-10">
                      <ConditionBadge condition={item.condition} />
                    </div>

                    <button
                      onClick={(e) => toggleWishlist(item.id, item.title, e)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 shadow-sm z-10 cursor-pointer"
                    >
                      <Heart size={12} className={isWishlisted ? 'fill-red-700 text-red-700' : ''} />
                    </button>

                    {images.length > 1 && (
                      <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 flex justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => prevCardPhoto(item.id, images.length, e)}
                          className="w-5 h-5 bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 shadow-sm cursor-pointer"
                        >
                          <ChevronLeft size={12} />
                        </button>
                        <button
                          onClick={(e) => nextCardPhoto(item.id, images.length, e)}
                          className="w-5 h-5 bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 shadow-sm cursor-pointer"
                        >
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[11px] text-[var(--ink-muted)]">
                      <span className="truncate max-w-[65%]">{item.brand}</span>
                      <span className="font-semibold text-[var(--ink-primary)]">{item.size}</span>
                    </div>

                    <h4 className="font-semibold text-xs text-[var(--ink-primary)] line-clamp-1">
                      {item.title}
                    </h4>

                    <div className="flex justify-between items-center pt-1 border-t border-[var(--border-hairline)] mt-1">
                      <span style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-sm text-[var(--ink-primary)]">
                        {formatRupiah(item.price)}
                      </span>
                      <span className="text-[10px] text-[var(--forest-deep)] font-semibold flex items-center gap-0.5">
                        <Droplets size={10} /> {formatNumber(item.waterSavedLiters)} L
                      </span>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                      className="btn-primary text-[10px] py-1.5 justify-center w-full mt-1"
                    >
                      + Keranjang
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" onClick={() => setSelectedItem(null)}>
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 border border-[var(--border-hairline)] shadow-xl" onClick={e => e.stopPropagation()}>
            
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[22rem] bg-[var(--surface-muted)]">
              <Image
                src={selectedItem.images[0] || '/hero-portrait.jpg'}
                alt={selectedItem.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="p-6 flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <ConditionBadge condition={selectedItem.condition} />
                  <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-black cursor-pointer">
                    <X size={18} />
                  </button>
                </div>

                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[var(--ink-primary)]">
                  {selectedItem.title}
                </h2>
                <p className="text-xs text-[var(--ink-muted)] mt-0.5">{selectedItem.brand} &middot; Penjual: {selectedItem.sellerName}</p>

                <div className="mt-3">
                  <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[var(--ink-primary)]">
                    {formatRupiah(selectedItem.price)}
                  </span>
                </div>

                <div className="mt-4 p-3 bg-[var(--surface-muted)] border border-[var(--border-hairline)] text-xs flex flex-col gap-1">
                  <span className="label-eyebrow text-[10px] block text-[var(--forest-deep)]">Dampak Sirkular Terverifikasi:</span>
                  <div className="flex justify-between text-[var(--ink-secondary)]">
                    <span>Konsumsi Air Terhemat:</span>
                    <strong>{formatNumber(selectedItem.waterSavedLiters)} Liter</strong>
                  </div>
                  <div className="flex justify-between text-[var(--ink-secondary)]">
                    <span>Emisi Karbon Dicegah:</span>
                    <strong>{selectedItem.co2SavedKg} kg CO₂e</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { addToCart(selectedItem); setSelectedItem(null); }}
                className="btn-primary w-full justify-center"
              >
                + Tambah ke Keranjang
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
