'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  QrCode, 
  Recycle, 
  Scissors, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  X,
  Droplets,
  Wind
} from 'lucide-react';
import { DropOrder, DropOrderStatus } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import { useApp } from '@/lib/store';

interface DonationTrackerModalProps {
  order: DropOrder | null;
  onClose: () => void;
}

const PICKUP_STAGES: {
  key: DropOrderStatus;
  stepNum: number;
  title: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  {
    key: 'PENDING',
    stepNum: 1,
    title: 'Tiket Penjemputan Terdaftar',
    desc: 'Kode booking terdaftar di sistem. Menunggu penugasan kurir jemput.',
    icon: QrCode,
  },
  {
    key: 'COURIER_PICKUP',
    stepNum: 2,
    title: 'Kurir Menuju Lokasi Donatur',
    desc: 'Kurir rekanan dalam perjalanan mengambil donasi pakaian ke alamat Anda.',
    icon: Truck,
  },
  {
    key: 'RECEIVED',
    stepNum: 3,
    title: 'Pakaian Discan & Diterima Kurir (Poin Cair)',
    desc: 'QR Code berhasil discan saat serah terima. Reward ClothPoints resmi masuk ke saldo akun.',
    icon: CheckCircle2,
  },
  {
    key: 'SORTING',
    stepNum: 4,
    title: 'Kurasi & Sortir Serat Tekstil',
    desc: 'Pakaian diperiksa kebersihan dan dipilah berdasarkan jenis serat kain di fasilitas pusat.',
    icon: Recycle,
  },
  {
    key: 'DELIVERED_TO_ARTISAN',
    stepNum: 5,
    title: 'Tiba di Studio Rekonstruksi Perajin UMKM',
    desc: 'Tekstil telah disalurkan ke mitra perajin lokal untuk diolah menjadi produk kerajinan siap pakai.',
    icon: Scissors,
  },
];

const DROPOFF_STAGES: {
  key: DropOrderStatus;
  stepNum: number;
  title: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  {
    key: 'PENDING',
    stepNum: 1,
    title: 'Tiket Drop-Off Mandiri Aktif',
    desc: 'Silakan bawa pakaian donasi Anda ke lokasi titik kumpul drop-box yang telah Anda pilih.',
    icon: MapPin,
  },
  {
    key: 'RECEIVED',
    stepNum: 2,
    title: 'Discan & Diterima Petugas Lokasi (Poin Cair)',
    desc: 'Petugas / smart drop-box memindai QR Code tiket Anda saat serah terima pakaian. Poin langsung cair ke akun.',
    icon: CheckCircle2,
  },
  {
    key: 'SORTING',
    stepNum: 3,
    title: 'Kurasi & Sortir Serat Tekstil',
    desc: 'Pakaian dari titik kumpul dipilah berdasarkan kondisi kain dan jenis serat untuk rekonstruksi.',
    icon: Recycle,
  },
  {
    key: 'DELIVERED_TO_ARTISAN',
    stepNum: 4,
    title: 'Penyaluran ke Studio Perajin UMKM',
    desc: 'Bahan kain disalurkan ke perajin lokal untuk diolah kembali menjadi produk kerajinan bernilai tinggi.',
    icon: Scissors,
  },
];

export function DonationTrackerModal({ order, onClose }: DonationTrackerModalProps) {
  const { dropOrders, confirmCourierScan, updateOrderStatus, refreshUserData } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Always bind to latest live order from store
  const liveOrder = useMemo(() => {
    if (!order) return null;
    return dropOrders.find(
      (o) => (o.bookingCode && o.bookingCode.toLowerCase() === order.bookingCode.toLowerCase()) || o.id === order.id
    ) || order;
  }, [dropOrders, order]);

  if (!liveOrder) return null;

  const isDropoff = liveOrder.method === 'DROPOFF';
  const stages = isDropoff ? DROPOFF_STAGES : PICKUP_STAGES;

  const currentStageIndex = () => {
    if (isDropoff) {
      switch (liveOrder.status) {
        case 'PENDING': return 0;
        case 'RECEIVED': return 1;
        case 'SORTING': return 2;
        case 'DELIVERED_TO_ARTISAN':
        case 'COMPLETED': return 3;
        default: return 0;
      }
    } else {
      switch (liveOrder.status) {
        case 'PENDING': return 0;
        case 'COURIER_PICKUP': return 1;
        case 'RECEIVED': return 2;
        case 'SORTING': return 3;
        case 'DELIVERED_TO_ARTISAN':
        case 'COMPLETED': return 4;
        default: return 0;
      }
    }
  };

  const activeIndex = currentStageIndex();

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshUserData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleSimulateScan = () => {
    confirmCourierScan(liveOrder.bookingCode);
  };

  const handleAdvanceStatus = () => {
    if (isDropoff) {
      if (liveOrder.status === 'PENDING') {
        confirmCourierScan(liveOrder.bookingCode);
      } else if (liveOrder.status === 'RECEIVED') {
        updateOrderStatus(liveOrder.bookingCode, 'SORTING');
      } else if (liveOrder.status === 'SORTING') {
        updateOrderStatus(liveOrder.bookingCode, 'DELIVERED_TO_ARTISAN');
      }
    } else {
      if (liveOrder.status === 'PENDING') {
        updateOrderStatus(liveOrder.bookingCode, 'COURIER_PICKUP');
      } else if (liveOrder.status === 'COURIER_PICKUP') {
        confirmCourierScan(liveOrder.bookingCode);
      } else if (liveOrder.status === 'RECEIVED') {
        updateOrderStatus(liveOrder.bookingCode, 'SORTING');
      } else if (liveOrder.status === 'SORTING') {
        updateOrderStatus(liveOrder.bookingCode, 'DELIVERED_TO_ARTISAN');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-emerald-900/15 shadow-2xl flex flex-col gap-6 relative max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        {/* Top Control Buttons */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          <button
            type="button"
            onClick={handleManualRefresh}
            title="Segarkan status penjemputan"
            className="px-2.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1 border border-emerald-200 cursor-pointer transition-colors"
          >
            <Sparkles size={13} className={isRefreshing ? 'animate-spin' : ''} />
            <span>Segarkan</span>
          </button>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center border-none cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
              Pelacak Donasi Tekstil
            </span>
            <span className="text-[10px] font-bold text-gray-400">&bull;</span>
            <span className="text-xs font-mono font-bold text-[var(--emerald-vibrant)]">
              {liveOrder.bookingCode}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--ink-primary)] tracking-tight">
            Status Perjalanan Pakaian
          </h3>
          <p className="text-xs text-[var(--ink-secondary)] mt-1">
            Pantau transparansi alur sirkular dari tangan Anda hingga disulap menjadi karya perajin lokal.
          </p>
        </div>

        {/* Order Summary Pill Box */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-teal-950 text-white p-4 sm:p-5 rounded-2xl flex flex-col gap-3 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">Donatur:</span>
              <strong className="text-sm font-bold text-white">{liveOrder.userName}</strong>
              <span className="text-xs text-white/70 block">{liveOrder.userPhone}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">Metode:</span>
              <strong className="text-xs font-bold text-emerald-200">
                {liveOrder.method === 'DROPOFF' ? 'Drop-off Mandiri' : 'Pick-up Kurir'}
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/15 text-center">
            <div className="bg-white/10 rounded-xl p-2">
              <span className="text-[9px] text-white/75 block">Total Pakaian</span>
              <strong className="text-xs font-bold text-white">{liveOrder.itemCount} Helai</strong>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <span className="text-[9px] text-white/75 block">Reward Poin</span>
              <strong className="text-xs font-bold text-amber-300">+{liveOrder.pointsAwarded} Pts</strong>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <span className="text-[9px] text-white/75 block">Status Poin</span>
              <strong className={`text-[11px] font-bold ${liveOrder.pointsCredited ? 'text-emerald-300' : 'text-amber-200'}`}>
                {liveOrder.pointsCredited ? 'Sudah Masuk' : 'Menunggu Scan'}
              </strong>
            </div>
          </div>
        </div>

        {/* ── VERTICAL TIMELINE ── */}
        <div className="flex flex-col gap-0 relative pl-2">
          {stages.map((stg, idx) => {
            const Icon = stg.icon;
            const isPassed = idx <= activeIndex;
            const isCurrent = idx === activeIndex;

            return (
              <div key={stg.key} className="flex items-start gap-3.5 relative pb-6 last:pb-0 group">
                {/* Connecting Line */}
                {idx < stages.length - 1 && (
                  <div 
                    className={`absolute left-[17px] top-[34px] bottom-0 w-0.5 ${
                      idx < activeIndex ? 'bg-emerald-600' : 'bg-gray-200'
                    }`} 
                  />
                )}

                {/* Step Circle Icon */}
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                    isCurrent 
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/20 shadow-md' 
                      : isPassed 
                        ? 'bg-emerald-700 text-white' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                  }`}
                >
                  <Icon size={16} />
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-700">
                      TAHAP 0{stg.stepNum}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full animate-pulse">
                        Sedang Berlangsung
                      </span>
                    )}
                    {isPassed && !isCurrent && (
                      <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 size={10} /> Selesai
                      </span>
                    )}
                  </div>
                  <h4 className={`text-sm font-extrabold tracking-tight mt-0.5 ${isPassed ? 'text-[var(--ink-primary)]' : 'text-gray-400'}`}>
                    {stg.title}
                  </h4>
                  <p className="text-xs text-[var(--ink-secondary)] mt-0.5 leading-relaxed">
                    {stg.desc}
                  </p>

                  {/* Stage-specific micro info */}
                  {stg.key === 'RECEIVED' && liveOrder.scannedAt && (
                    <div className="mt-1.5 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between">
                      <span>Waktu Scan: <strong>{new Date(liveOrder.scannedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</strong></span>
                      <span className="font-bold text-emerald-700">+{liveOrder.pointsAwarded} Pts Dikreditkan</span>
                    </div>
                  )}
                  {stg.key === 'DELIVERED_TO_ARTISAN' && (
                    <div className="mt-1.5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                      Destinasi: <strong>Studio Perajin Binaan ClothLoop (Bandung & Jogja)</strong>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons & Simulation */}
        <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
          {!liveOrder.pointsCredited ? (
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-amber-900">
                <span className="font-bold block">
                  {isDropoff ? 'Simulasi Petugas Drop Point:' : 'Simulasi Kurir Penjemput:'}
                </span>
                <span className="text-[11px] text-amber-800">
                  {isDropoff 
                    ? 'Klik untuk mensimulasikan petugas drop-point / smart dropbox memindai QR code saat Anda menyerahkan pakaian.'
                    : 'Klik untuk mensimulasikan kurir memindai QR code saat serah terima pakaian di rumah Anda.'}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSimulateScan}
                className="btn-primary text-xs py-2 px-4 whitespace-nowrap bg-emerald-700 hover:bg-emerald-800 border-none font-bold cursor-pointer shrink-0 shadow-xs"
              >
                <QrCode size={13} className="mr-1 inline" /> {isDropoff ? 'Scan Petugas (Cairkan Poin)' : 'Scan Kurir (Cairkan Poin)'}
              </motion.button>
            </div>
          ) : activeIndex < stages.length - 1 ? (
            <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-600 font-medium">Lanjutkan simulasi ke tahap berikutnya:</span>
              <button
                onClick={handleAdvanceStatus}
                className="btn-secondary text-xs py-1.5 px-3 font-bold border-emerald-600 text-emerald-800 hover:bg-emerald-50 cursor-pointer"
              >
                Tahap Selanjutnya <ArrowRight size={12} className="inline ml-1" />
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center text-xs text-emerald-900 font-medium">
              ✨ Pakaian ini telah berhasil masuk ke rantai daur ulang sirkular & studio perajin UMKM!
            </div>
          )}

          <button 
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold border-none cursor-pointer transition-colors"
          >
            Tutup Pelacak
          </button>
        </div>

      </motion.div>
    </div>
  );
}
