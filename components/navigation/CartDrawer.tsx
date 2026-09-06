'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/store';
import { formatRupiah, formatNumber } from '@/lib/utils';
import { X, Trash2, ShoppingBag, Droplets, Wind, ArrowRight, CheckCircle2, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import { CheckoutModal } from '@/components/craft/CheckoutModal';
import { CraftOrderItem } from '@/lib/types';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, addNotification, currentUser } = useApp();
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Sync selected items when cart changes
  useEffect(() => {
    const currentIds = cart.map((c) => c.item.id);
    setSelectedItemIds((prev) => {
      // Keep existing selections that are still in cart, and add new ones by default
      const filtered = prev.filter((id) => currentIds.includes(id));
      const newlyAdded = currentIds.filter((id) => !prev.includes(id));
      return [...filtered, ...newlyAdded];
    });
  }, [cart]);

  const toggleSelectItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItemIds.length === cart.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(cart.map((c) => c.item.id));
    }
  };

  // Selected items list & subtotal calculation (only for selected products)
  const selectedCartEntries = useMemo(() => {
    return cart.filter((c) => selectedItemIds.includes(c.item.id));
  }, [cart, selectedItemIds]);

  const selectedSubtotal = useMemo(() => {
    return selectedCartEntries.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  }, [selectedCartEntries]);

  const totalWater = useMemo(() => {
    return selectedCartEntries.reduce((acc, c) => acc + (c.item.waterSavedLiters || 0) * c.quantity, 0);
  }, [selectedCartEntries]);

  const totalCo2 = useMemo(() => {
    return selectedCartEntries.reduce((acc, c) => acc + (c.item.co2SavedKg || 0) * c.quantity, 0);
  }, [selectedCartEntries]);

  // Convert selected items to CraftOrderItem format for CheckoutModal
  const checkoutItems: CraftOrderItem[] = useMemo(() => {
    return selectedCartEntries.map((c) => ({
      id: c.item.id,
      title: c.item.title,
      artisanStudio: c.item.brand || 'Studio Mitra ClothLoop',
      artisanCity: c.item.sellerCity || 'Bandung',
      price: c.item.price,
      quantity: c.quantity,
      image: c.item.images[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    }));
  }, [selectedCartEntries]);

  const handleOpenCheckout = () => {
    if (!currentUser) {
      addNotification('warning', 'Masuk Diperlukan', 'Silakan masuk atau daftar terlebih dahulu untuk melakukan transaksi.');
      setIsCartOpen(false);
      window.location.href = '/auth/login';
      return;
    }
    if (selectedCartEntries.length === 0) {
      addNotification('warning', 'Pilih Produk', 'Pilih minimal satu produk dengan mencentang kotak untuk checkout.');
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
              className="relative z-10 w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-[var(--border-hairline)] bg-gradient-to-r from-[var(--surface-muted)] to-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[var(--ink-primary)]">
                    Keranjang Belanja
                  </h3>
                  <p className="text-xs text-[var(--ink-muted)] mt-0.5 font-medium">
                    {cart.length} produk pilihan dalam keranjang
                  </p>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose} 
                  className="p-1.5 rounded-full hover:bg-gray-100 text-[var(--ink-muted)] cursor-pointer"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                {!currentUser ? (
                  <div className="flex flex-col items-center text-center gap-3.5 pt-12">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200 shadow-2xs">
                      <ShoppingBag size={30} />
                    </div>
                    <h4 className="text-lg font-bold text-[var(--ink-primary)]">
                      Masuk untuk Melihat Keranjang
                    </h4>
                    <p className="text-xs text-[var(--ink-muted)] leading-relaxed max-w-xs">
                      Silakan masuk atau daftarkan akun Anda terlebih dahulu untuk mengelola produk kerajinan dan pakaian preloved di keranjang belanja.
                    </p>
                    <div className="flex flex-col w-full gap-2.5 mt-4 max-w-xs">
                      <Link
                        href="/auth/login"
                        onClick={handleClose}
                        className="btn-primary justify-center text-xs py-3 rounded-xl font-bold shadow-md no-underline"
                      >
                        Masuk ke Akun
                      </Link>
                      <Link
                        href="/auth/register"
                        onClick={handleClose}
                        className="btn-secondary justify-center text-xs py-3 rounded-xl font-bold bg-white no-underline"
                      >
                        Daftar Akun Baru
                      </Link>
                    </div>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="flex flex-col items-center text-center gap-3 pt-12">
                    <div className="w-16 h-16 rounded-full bg-[var(--surface-muted)] text-gray-400 flex items-center justify-center">
                      <ShoppingBag size={28} />
                    </div>
                    <h4 className="text-lg font-bold text-[var(--ink-primary)]">
                      Keranjang Masih Kosong
                    </h4>
                    <p className="text-xs text-[var(--ink-muted)] leading-relaxed max-w-xs">
                      Temukan aneka karya kerajinan tekstil sirkular & busana preloved terkurasi di marketplace kami.
                    </p>
                    <Link href="/craft" onClick={handleClose} className="btn-primary justify-center mt-2 text-xs py-2.5 px-4 font-bold">
                      Jelajahi Produk Kerajinan
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {/* Eco Impact Banner for selected items */}
                    {totalWater > 0 && (
                      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-3 rounded-2xl flex justify-between items-center text-xs shadow-xs">
                        <div className="flex items-center gap-1.5">
                          <Droplets size={14} className="text-emerald-300" />
                          <span className="font-bold">{formatNumber(totalWater)} L air terselamatkan</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Wind size={14} className="text-emerald-300" />
                          <span className="font-bold">{totalCo2.toFixed(1)} kg CO₂e</span>
                        </div>
                      </div>
                    )}

                    {/* Select All Checkbox Bar */}
                    <div className="flex items-center justify-between py-1.5 px-2 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
                      <button
                        type="button"
                        onClick={toggleSelectAll}
                        className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItemIds.length === cart.length && cart.length > 0}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 cursor-pointer"
                        />
                        <span>Pilih Semua ({cart.length})</span>
                      </button>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {selectedItemIds.length} dipilih
                      </span>
                    </div>

                    {/* Cart Item List with Checkboxes */}
                    <div className="flex flex-col divide-y divide-[var(--border-hairline)]">
                      {cart.map(({ item, quantity }) => {
                        const isSelected = selectedItemIds.includes(item.id);

                        return (
                          <div key={item.id} className="py-3 flex gap-3 items-center">
                            {/* Checkbox per item */}
                            <label className="cursor-pointer shrink-0">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectItem(item.id)}
                                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 cursor-pointer"
                              />
                            </label>

                            {/* Product Image */}
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--surface-muted)] shrink-0 border border-[var(--border-hairline)]">
                              <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="64px" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] text-amber-800 font-bold block truncate">
                                  {item.brand || 'Studio Mitra'} &middot; {item.sellerCity || 'Indonesia'}
                                </span>
                                <h5 className="font-bold text-xs text-[var(--ink-primary)] line-clamp-1">{item.title}</h5>
                              </div>

                              <div className="flex justify-between items-center mt-1.5">
                                <span className="font-black text-xs text-[var(--ink-primary)] font-mono">
                                  {formatRupiah(item.price)}
                                </span>

                                <div className="flex items-center gap-2">
                                  <div className="flex items-center border border-[var(--border-hairline)] rounded-lg bg-white">
                                    <button 
                                      onClick={() => updateCartQuantity(item.id, quantity - 1)} 
                                      className="px-2 py-0.5 text-xs text-gray-600 hover:text-black font-bold cursor-pointer"
                                    >
                                      -
                                    </button>
                                    <span className="px-1.5 text-xs font-bold font-mono">{quantity}</span>
                                    <button 
                                      onClick={() => updateCartQuantity(item.id, quantity + 1)} 
                                      className="px-2 py-0.5 text-xs text-gray-600 hover:text-black font-bold cursor-pointer"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button 
                                    onClick={() => removeFromCart(item.id)} 
                                    className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Checkout: HANYA ada Keterangan Subtotal Produk & Tombol "Checkout" */}
              {currentUser && cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-[var(--border-hairline)] bg-white shadow-lg flex flex-col gap-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-gray-600 font-bold">Subtotal Produk ({selectedItemIds.length} Barang):</span>
                    <span className="font-black text-xl text-emerald-800 font-mono">
                      {formatRupiah(selectedSubtotal)}
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOpenCheckout}
                    disabled={selectedItemIds.length === 0}
                    className={`btn-primary w-full justify-center py-3 text-xs font-extrabold shadow-md flex items-center gap-2 cursor-pointer ${
                      selectedItemIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>Checkout ({selectedItemIds.length} Barang)</span>
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => {
          setIsCheckoutModalOpen(false);
          setIsCartOpen(false);
        }}
        items={checkoutItems}
        onSuccessOrder={() => {
          // Success handled in CheckoutModal
        }}
      />
    </>
  );
}
