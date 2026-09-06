'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Copy, 
  ShieldCheck, 
  Coins, 
  ChevronRight, 
  Check, 
  AlertCircle,
  Sparkles,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { CraftOrder, CraftOrderStatus } from '@/lib/types';
import { formatRupiah, formatNumber } from '@/lib/utils';

const TRACKING_STEPS: { status: CraftOrderStatus; title: string; desc: string; icon: any }[] = [
  { 
    status: 'PACKING', 
    title: 'Barang Masih Dikemas', 
    desc: 'Studio pengrajin sedang menyiapkan & mengemas karya dengan kemasan ramah lingkungan.',
    icon: Package 
  },
  { 
    status: 'HANDED_TO_COURIER', 
    title: 'Barang Sudah Diserahkan ke Kurir', 
    desc: 'Paket telah di-pickup oleh armada J&T Express dan masuk ke pusat sortir.',
    icon: Truck 
  },
  { 
    status: 'IN_TRANSIT', 
    title: 'Barang dalam Proses Pengantaran', 
    desc: 'Kurir J&T Express sedang dalam perjalanan menuju alamat penerima.',
    icon: Truck 
  },
  { 
    status: 'DELIVERED', 
    title: 'Barang Telah Sampai', 
    desc: 'Paket telah tiba di alamat tujuan. Silakan periksa kondisi barang.',
    icon: MapPin 
  },
];

export function OrderHistorySection({ onShopAgain }: { onShopAgain?: () => void }) {
  const { craftOrders, updateCraftOrderStatus, addNotification, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'HISTORY'>('ACTIVE');
  const [copiedResi, setCopiedResi] = useState<{ [id: string]: boolean }>({});

  const activeOrders = craftOrders.filter(o => o.status !== 'COMPLETED');
  const completedOrders = craftOrders.filter(o => o.status === 'COMPLETED');

  const displayedOrders = activeTab === 'ACTIVE' ? activeOrders : completedOrders;

  const handleCopy = (orderId: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedResi(prev => ({ ...prev, [orderId]: true }));
      setTimeout(() => {
        setCopiedResi(prev => ({ ...prev, [orderId]: false }));
      }, 2000);
    }
  };

  const handleConfirmReceived = (order: CraftOrder) => {
    updateCraftOrderStatus(order.orderNumber, 'COMPLETED');
  };

  const getStepIndex = (status: CraftOrderStatus) => {
    if (status === 'PACKING') return 0;
    if (status === 'HANDED_TO_COURIER') return 1;
    if (status === 'IN_TRANSIT') return 2;
    if (status === 'DELIVERED' || status === 'COMPLETED') return 3;
    return 0;
  };

  if (!currentUser) {
    return (
      <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-[var(--border-hairline)] max-w-lg mx-auto flex flex-col items-center gap-4 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
          <Package size={30} />
        </div>
        <div>
          <h4 className="text-lg font-extrabold text-[var(--ink-primary)]">
            Belum Ada Riwayat Transaksi
          </h4>
          <p className="text-xs text-[var(--ink-secondary)] mt-1.5 leading-relaxed max-w-sm">
            Anda belum masuk ke akun. Riwayat transaksi belanja hanya dicatat dan disimpan ke database untuk akun yang melakukan transaksi.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2">
          <Link
            href="/auth/login"
            className="btn-primary text-xs py-2.5 px-5 font-bold flex items-center gap-1.5 no-underline"
          >
            <LogIn size={13} />
            <span>Masuk ke Akun</span>
          </Link>
          <Link
            href="/auth/register"
            className="btn-secondary text-xs py-2.5 px-5 font-bold flex items-center gap-1.5 no-underline border border-stone-200"
          >
            <UserPlus size={13} />
            <span>Daftar Akun Baru</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sub Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-[var(--border-hairline)] shadow-2xs">
        <div>
          <h3 className="text-lg font-black text-[var(--ink-primary)]">
            Pesanan Saya
          </h3>
          <p className="text-xs text-[var(--ink-secondary)] mt-0.5">
            Pantau status pengiriman kurir dan konfirmasi penerimaan.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ACTIVE'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Pesanan Berjalan ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'HISTORY'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Riwayat Selesai ({completedOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {displayedOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[var(--border-hairline)] max-w-md mx-auto flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-stone-100 text-gray-400 flex items-center justify-center font-bold">
            <Package size={26} />
          </div>
          <h4 className="text-base font-extrabold text-[var(--ink-primary)]">
            {activeTab === 'ACTIVE' ? 'Tidak Ada Pesanan yang Sedang Berjalan' : 'Belum Ada Riwayat Pesanan Selesai'}
          </h4>
          <p className="text-xs text-[var(--ink-secondary)]">
            {activeTab === 'ACTIVE' 
              ? 'Akun Anda belum memiliki pesanan aktif. Beli produk berkualitas dari perajin kami sekarang.' 
              : 'Pesanan yang telah Anda konfirmasi selesai akan tercatat di sini.'}
          </p>
          {onShopAgain && (
            <button
              onClick={onShopAgain}
              className="btn-primary text-xs py-2 px-4 font-bold mt-2 cursor-pointer"
            >
              Jelajahi Produk
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {displayedOrders.map((order) => {
            const currentStep = getStepIndex(order.status);
            const isCompleted = order.status === 'COMPLETED';

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-[var(--border-hairline)] overflow-hidden shadow-2xs space-y-5 p-5 sm:p-6"
              >
                {/* 1. Header Card (Order Number & Status Badge) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xs shrink-0">
                      J&T
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-[var(--ink-primary)] font-mono">
                          {order.orderNumber}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono">
                          &middot; {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono text-gray-600 font-bold">
                          Resi: {order.trackingNumber}
                        </span>
                        <button
                          onClick={() => handleCopy(order.id, order.trackingNumber)}
                          className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          <Copy size={11} />
                          <span>{copiedResi[order.id] ? 'Disalin' : 'Salin'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>Pesanan Selesai & Diterima</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Clock size={13} />
                        <span>{TRACKING_STEPS[currentStep]?.title}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Stepper Timeline Tracking (4 Tahapan) */}
                <div className="bg-stone-50/80 rounded-2xl p-4 sm:p-5 border border-stone-200/80">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
                    Pelacakan Ekspedisi Realtime &middot; J&T Express
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    {TRACKING_STEPS.map((st, idx) => {
                      const isPassed = idx <= currentStep;
                      const isCurrent = idx === currentStep && !isCompleted;
                      const Icon = st.icon;

                      return (
                        <div key={st.status} className="flex md:flex-col items-start gap-3 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isCurrent
                              ? 'bg-amber-500 text-white shadow-md ring-4 ring-amber-100'
                              : isPassed
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            {isPassed && !isCurrent ? <Check size={14} /> : <Icon size={14} />}
                          </div>

                          <div className="min-w-0">
                            <h5 className={`text-xs font-bold leading-tight ${
                              isCurrent ? 'text-amber-900 font-extrabold' : isPassed ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {st.title}
                            </h5>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed hidden sm:block">
                              {st.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Item List & Artisan Studios */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((it) => (
                    <div key={it.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image src={it.image} alt={it.title} fill className="object-cover" sizes="56px" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-amber-800 block truncate">
                            {it.artisanStudio} ({it.artisanCity})
                          </span>
                          <h5 className="font-bold text-xs text-gray-900 truncate">{it.title}</h5>
                          <span className="text-[11px] text-gray-500 font-mono">
                            {it.quantity}x &middot; {formatRupiah(it.price)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <strong className="font-mono text-xs text-gray-900 block font-bold">
                          {formatRupiah(it.price * it.quantity)}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4. Escrow Notice, Shipping Info & Action Row */}
                <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  {/* Escrow Status info */}
                  <div className="flex items-center gap-2 text-xs">
                    <ShieldCheck size={16} className={isCompleted ? 'text-emerald-600' : 'text-amber-600'} />
                    <span className="text-gray-600">
                      {isCompleted ? (
                        <>Dana <strong>{formatRupiah(order.totalAmount)}</strong> telah diteruskan ke perajin.</>
                      ) : (
                        <>Dana <strong>{formatRupiah(order.totalAmount)}</strong> terkonfirmasi oleh ClothLoop.</>
                      )}
                    </span>
                  </div>

                  {/* Action Button: Confirm Received */}
                  {!isCompleted && (
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        type="button"
                        onClick={() => handleConfirmReceived(order)}
                        className="btn-primary w-full md:w-auto justify-center text-xs py-2.5 px-4 font-bold shadow-xs flex items-center gap-1.5 cursor-pointer bg-emerald-700 hover:bg-emerald-800"
                      >
                        <CheckCircle2 size={14} />
                        <span>Konfirmasi Barang Telah Sampai</span>
                      </button>
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
