'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, MapPin, Heart } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { CRAFT_PRODUCTS_MOCK } from '@/lib/supabase/data';
import { useApp } from '@/lib/store';
import { CraftProduct, CraftOrderItem } from '@/lib/types';
import { CheckoutModal } from '@/components/craft/CheckoutModal';

export function CraftShowcase() {
  const { addToCart, addNotification, currentUser } = useApp();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [directCheckoutItems, setDirectCheckoutItems] = useState<CraftOrderItem[] | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Exactly 4 items
  const featuredCrafts = CRAFT_PRODUCTS_MOCK.slice(0, 4);

  const toggleWishlist = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (wishlist.includes(id)) {
      updated = wishlist.filter(x => x !== id);
      addNotification('info', 'Dihapus dari Favorit', `${title} dihapus dari daftar disukai.`);
    } else {
      updated = [...wishlist, id];
      addNotification('success', 'Disimpan ke Favorit', `${title} ditambahkan ke daftar disukai.`);
    }
    setWishlist(updated);
  };

  const handleAddToCart = (product: CraftProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      addNotification('warning', 'Masuk Diperlukan', 'Silakan masuk atau daftar terlebih dahulu untuk menambahkan produk ke keranjang belanja.');
      window.location.href = '/auth/login?redirect=/craft';
      return;
    }

    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      condition: 'UPCYCLED' as const,
      category: 'Upcycled Bags' as const,
      size: product.dimensions || 'All Size',
      measurements: { chestWidthCm: 0, lengthCm: 0 },
      material: product.technique,
      story: product.story,
      images: product.images,
      waterSavedLiters: product.waterSavedLiters,
      co2SavedKg: product.co2SavedKg,
      isVerifiedQC: true,
      status: 'AVAILABLE' as const,
      rating: product.rating,
      reviewCount: product.reviewCount,
      sellerName: product.artisanStudio,
      sellerCity: product.artisanCity,
    };

    addToCart(item);
    addNotification('success', 'Karya Masuk Keranjang', `${product.title} berhasil ditambahkan ke keranjang belanja.`);
  };

  const handleDirectCheckout = (product: CraftProduct, e: React.MouseEvent) => {
    e.stopPropagation();
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
    setIsCheckoutOpen(true);
  };

  return (
    <section className="relative py-14 sm:py-20 bg-[#FBFBF9] border-b border-[var(--border-hairline)] overflow-hidden">
      <div className="container-site relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] leading-tight tracking-tight">
              Karya Seni Siap Pakai dari Limbah Tekstil
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2 leading-relaxed font-normal">
              Beli langsung aneka produk upcycling siap pakai karya master perajin dan UMKM nusantara dengan teknik sulam tangan dan rekonstruksi pola.
            </p>
          </div>

          <Link
            href="/craft"
            className="btn-secondary text-xs py-2.5 px-4 font-bold shrink-0 no-underline group bg-white"
          >
            <span>Buka Semua Katalog</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── 4 Grid Cards - Exactly identical to /craft catalog card design ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredCrafts.map((p, idx) => {
            const isFav = wishlist.includes(p.id);

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-3xl border border-[var(--border-hairline)] overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* 1. Photo Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

                {/* 2. Card Details */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    {/* Artisan Studio & City */}
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-extrabold text-amber-800 truncate">{p.artisanStudio}</span>
                      <span className="text-[11px] text-gray-500 font-medium shrink-0 flex items-center gap-1">
                        <MapPin size={11} className="text-gray-400" />
                        {p.artisanCity}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-black text-base text-gray-900 leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
                      {p.title}
                    </h3>
                  </div>

                  {/* Price & 2 Action Buttons */}
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
                        className="btn-secondary justify-center text-xs py-2 px-2 font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag size={13} />
                        <span>Keranjang</span>
                      </motion.button>

                      {/* Button Checkout */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={(e) => handleDirectCheckout(p, e)}
                        className="btn-primary justify-center text-xs py-2 px-2 font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
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

      </div>

      {/* Direct Checkout Modal if triggered from home page */}
      {directCheckoutItems && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setDirectCheckoutItems(null);
          }}
          items={directCheckoutItems}
        />
      )}
    </section>
  );
}
