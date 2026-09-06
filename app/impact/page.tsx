'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Award, 
  Droplets, 
  Wind, 
  Leaf, 
  Trophy, 
  Printer, 
  Copy, 
  Check, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck,
  ArrowRight,
  Lock
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatNumber } from '@/lib/utils';

// Tingkat Level Partisipasi Sirkular (Skala Poin Selaras dengan Komunitas)
const LEVEL_TIERS = [
  { 
    name: 'Eco Seedling', 
    minPts: 0, 
    maxPts: 999,
    perk: 'Sertifikat Dasar & Audit Poin Digital',
  },
  { 
    name: 'Green Weaver', 
    minPts: 1000, 
    maxPts: 4999,
    perk: 'Potongan Belanja Langsung & Badge Profil Hijau',
  },
  { 
    name: 'Circular Artisan', 
    minPts: 5000, 
    maxPts: 19999,
    perk: 'Prioritas Penjemputan Drop-off & Akses Produk Langka',
  },
  { 
    name: 'Eco Guardian', 
    minPts: 20000, 
    maxPts: 99999,
    perk: 'Sertifikat Emas Terverifikasi & Bebas Biaya Layanan',
  },
  { 
    name: 'Loop Legend', 
    minPts: 100000, 
    maxPts: Infinity,
    perk: 'Penghargaan Komunitas Nasional & Merchandise Sirkular Eksklusif',
  },
];

// Helper to determine tier name by points
function getTierName(points: number): string {
  const found = LEVEL_TIERS.findLast(t => points >= t.minPts);
  return found ? found.name : 'Eco Seedling';
}

const BASE_COMMUNITY_MEMBERS = [
  { id: 'c1', name: 'Siti Rahmawati', city: 'Bandung, Jawa Barat', clothesCount: 148, points: 184500, medal: '🥇' },
  { id: 'c2', name: 'Budi Santoso', city: 'Surabaya, Jawa Timur', clothesCount: 112, points: 139200, medal: '🥈' },
  { id: 'c3', name: 'Amanda Putri', city: 'Jakarta Selatan, DKI', clothesCount: 86, points: 98400, medal: '🥉' },
  { id: 'c4', name: 'Dimas Wicaksono', city: 'Denpasar, Bali', clothesCount: 64, points: 72000, medal: '' },
  { id: 'c5', name: 'Rina Kartika', city: 'Yogyakarta, DIY', clothesCount: 52, points: 18000, medal: '' },
];

export default function ImpactPage() {
  const { currentUser, userProfile, userPoints: clothPoints, userTotalWaterSaved, userTotalCo2Saved, userTotalKgDiverted, dropOrders, addNotification } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  const isLoggedIn = Boolean(currentUser);

  // Dynamic user name from account profile
  const userName = userProfile?.full_name || currentUser?.user_metadata?.full_name || (currentUser?.email ? currentUser.email.split('@')[0] : 'Sobat Sirkular ClothLoop');

  // Effective metrics (0 if not logged in)
  const totalWeight = isLoggedIn ? (dropOrders.reduce((a, o) => a + (o.estimatedWeightKg ?? (o.itemCount * 0.4)), 0) || userTotalKgDiverted) : 0;
  const totalWater = isLoggedIn ? (dropOrders.reduce((a, o) => a + o.waterSavedLiters, 0) || userTotalWaterSaved) : 0;
  const totalCo2 = isLoggedIn ? (dropOrders.reduce((a, o) => a + o.co2SavedKg, 0) || userTotalCo2Saved) : 0;
  const totalItems = isLoggedIn ? (dropOrders.reduce((a, o) => a + o.itemCount, 0) || Math.round(totalWeight * 2.5)) : 0;
  const effectivePoints = isLoggedIn ? clothPoints : 0;

  // Current user's tier status based on points
  const currentTierIndex = LEVEL_TIERS.findIndex(t => effectivePoints >= t.minPts && (t.maxPts === Infinity || effectivePoints <= t.maxPts));
  const activeIndex = currentTierIndex !== -1 ? currentTierIndex : (effectivePoints >= 100000 ? LEVEL_TIERS.length - 1 : 0);
  const tier = LEVEL_TIERS[activeIndex];
  const nextTier = activeIndex < LEVEL_TIERS.length - 1 ? LEVEL_TIERS[activeIndex + 1] : null;
  const progressPct = nextTier 
    ? Math.min(100, Math.max(5, Math.round(((effectivePoints - tier.minPts) / (nextTier.minPts - tier.minPts)) * 100)))
    : 100;

  // DYNAMIC LEADERBOARD: Only inserts user if logged in AND has points > 0
  const sortedLeaderboard = useMemo(() => {
    const combined = [...BASE_COMMUNITY_MEMBERS.map(m => ({ ...m, isCurrentUser: false }))];

    if (isLoggedIn && effectivePoints > 0) {
      const userEntry = {
        id: 'current-user',
        name: `${userName} (Anda)`,
        city: 'Akun Anda',
        clothesCount: totalItems,
        points: effectivePoints,
        isCurrentUser: true,
        medal: '',
      };
      combined.push(userEntry);
    }

    combined.sort((a, b) => b.points - a.points);

    return combined.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      tierName: getTierName(entry.points),
      medal: index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '',
    }));
  }, [isLoggedIn, userName, totalItems, effectivePoints]);

  const handleCopyVerification = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/impact?cert=CL-IMP-2026-${Math.abs(effectivePoints + 884).toString(16).toUpperCase()}`);
      setCopiedLink(true);
      addNotification('success', 'Tautan Disalin', 'Tautan sertifikat digital resmi telah disalin ke clipboard.');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#FAFAF8] text-[#1E293B]">

      {/* ── HERO SECTION: Latar Hijau dengan Animasi Sirkular Tenang & Teks Kuning ── */}
      <div className="relative bg-gradient-to-br from-emerald-900 via-[#064e3b] to-teal-950 text-white border-b border-emerald-800/60 py-12 sm:py-16 overflow-hidden">
        
        {/* Latar Animasi Alur Sirkular Tekstil & Eco-Loop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <motion.div
            className="absolute -right-20 -top-20 w-[440px] h-[440px] rounded-full border border-emerald-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-8 rounded-full border border-dashed border-teal-300/25" />
            <div className="absolute inset-20 rounded-full border border-emerald-400/15" />
          </motion.div>

          <motion.div
            className="absolute -left-16 -bottom-16 w-[360px] h-[360px] rounded-full border border-emerald-500/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-10 rounded-full border border-dashed border-emerald-300/20" />
          </motion.div>

          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="container-site relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              {/* Teks Kuning Tanpa Lingkaran / Icon */}
              <span className="text-amber-300 font-bold uppercase tracking-wider text-xs block mb-2 font-mono">
                Poin dan Dampak Nyata
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                Portofolio Kontribusi Sirkular
              </h1>
              
              <p className="text-sm sm:text-base text-emerald-100/90 mt-2 font-normal leading-relaxed">
                Catatan resmi pengalihan limbah tekstil dari TPA, penghematan sumber daya air, serta akumulasi poin aktif Anda.
              </p>
            </div>

            {/* Status Level & Poin Pengguna */}
            <div className="bg-emerald-950/70 p-4 sm:p-5 rounded-2xl border border-emerald-600/40 shadow-sm flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl bg-emerald-700/80 text-emerald-200 flex items-center justify-center font-bold shrink-0">
                <Award size={24} />
              </div>
              <div>
                <span className="text-[10px] text-emerald-300 font-medium uppercase tracking-wider block">Level Sirkular</span>
                <strong className="text-base text-white font-extrabold tracking-tight block">
                  {isLoggedIn ? tier.name : 'Tamu Sirkular'}
                </strong>
                {isLoggedIn ? (
                  <span className="text-xs text-amber-300 font-mono font-bold block mt-0.5">
                    +{formatNumber(effectivePoints)} ClothPoints
                  </span>
                ) : (
                  <Link href="/auth/login" className="text-xs text-amber-300 font-bold hover:underline block mt-0.5">
                    Masuk untuk mencatat poin &rarr;
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="container-site py-10 sm:py-14 flex flex-col gap-10">

        {/* ── 1. METRIK DAMPAK LINGKUNGAN BERSIH ── */}
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-extrabold text-[var(--ink-primary)] tracking-tight">
              Akumulasi Manfaat Nyata
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Air Bersih */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[var(--border-hairline)] shadow-xs flex flex-col justify-between gap-3">
              <span className="text-xs font-bold text-sky-700 flex items-center gap-1.5">
                <Droplets size={14} className="text-sky-600" /> Air Bersih
              </span>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--forest-deep)] tracking-tight font-mono">
                  {formatNumber(Math.round(totalWater))}
                </span>
                <span className="text-xs text-gray-500 block font-normal mt-0.5">Liter Terhemat</span>
              </div>
            </div>

            {/* Emisi Karbon */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[var(--border-hairline)] shadow-xs flex flex-col justify-between gap-3">
              <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                <Wind size={14} className="text-amber-600" /> Emisi Karbon
              </span>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-800 tracking-tight font-mono">
                  {totalCo2.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500 block font-normal mt-0.5">kg CO₂e Terhindar</span>
              </div>
            </div>

            {/* Pakaian */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[var(--border-hairline)] shadow-xs flex flex-col justify-between gap-3">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Leaf size={14} className="text-emerald-600" /> Pakaian
              </span>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--forest-deep)] tracking-tight font-mono">
                  {totalItems}
                </span>
                <span className="text-xs text-gray-500 block font-normal mt-0.5">Helai Dialihkan ({totalWeight.toFixed(1)} kg)</span>
              </div>
            </div>

            {/* Jumlah Point */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[var(--border-hairline)] shadow-xs flex flex-col justify-between gap-3">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Award size={14} className="text-emerald-600" /> Jumlah Point
              </span>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--forest-deep)] tracking-tight font-mono">
                  {formatNumber(effectivePoints)}
                </span>
                <span className="text-xs text-gray-500 block font-normal mt-0.5">ClothPoints Aktif</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. SERTIFIKAT DAMPAK NYATA RESMI (HANYA MUNCUL JIKA SUDAH LOGIN, JIKA BELUM MUNCUL AJAKAN LOGIN) ── */}
        {isLoggedIn ? (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border-hairline)] shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[var(--ink-primary)] tracking-tight">
                  Sertifikat Dampak Nyata
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Dokumen resmi kontribusi Anda dalam pelestarian lingkungan dan ekonomi sirkular tekstil nasional.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopyVerification}
                  className="btn-secondary text-xs py-2 px-3.5 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  {copiedLink ? 'Tersalin' : 'Salin Tautan'}
                </button>
                <button 
                  onClick={handlePrintCertificate}
                  className="btn-secondary text-xs py-2 px-3.5 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer bg-white"
                >
                  <Printer size={14} />
                  Cetak / Simpan PDF
                </button>
              </div>
            </div>

            {/* DOKUMEN SERTIFIKAT ASLI */}
            <div className="bg-[#FAFBF9] rounded-2xl border-2 border-emerald-700/30 p-6 sm:p-10 shadow-2xs font-sans">
              <div className="flex flex-col sm:flex-row justify-between items-center pb-5 border-b border-emerald-900/15 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg">
                    CL
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-emerald-950 tracking-tight leading-none">ClothLoop Indonesia</h4>
                    <span className="text-[10px] text-emerald-700 uppercase tracking-widest font-semibold mt-0.5 block">
                      National Circular Textile Registry
                    </span>
                  </div>
                </div>

                <div className="text-center sm:text-right font-mono">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">No. Sertifikat Digital</span>
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-300/50 block mt-0.5">
                    CL-IMP-2026-{Math.abs(effectivePoints + 884).toString(16).toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="py-8 text-center max-w-xl mx-auto flex flex-col items-center">
                <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-widest mb-2">
                  SERTIFIKAT KONTRIBUSI SIRKULAR & LINGKUNGAN
                </span>
                
                <p className="text-xs text-gray-500 mb-1">Diberikan secara resmi kepada:</p>
                
                {/* Nama Pengguna Sesuai Akun */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight my-1">
                  {userName}
                </h3>

                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Telah berpartisipasi aktif dalam gerakan sirkularitas tekstil nasional melalui penyaluran pakaian bekas layak guna dan bahan daur ulang:
                </p>

                {/* Rangkuman 3 Metrik di Sertifikat */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full my-6 py-4 px-4 rounded-xl bg-white border border-emerald-200/80 font-mono text-center">
                  <div>
                    <strong className="text-lg sm:text-xl font-bold text-sky-700 block">
                      {formatNumber(Math.round(totalWater))} L
                    </strong>
                    <span className="text-[10px] text-gray-600 font-sans block mt-0.5">Air Dihemat</span>
                  </div>
                  <div className="border-x border-emerald-100 px-2">
                    <strong className="text-lg sm:text-xl font-bold text-amber-700 block">
                      {totalCo2.toFixed(1)} kg
                    </strong>
                    <span className="text-[10px] text-gray-600 font-sans block mt-0.5">Reduksi CO₂e</span>
                  </div>
                  <div>
                    <strong className="text-lg sm:text-xl font-bold text-emerald-800 block">
                      {totalItems} Helai
                    </strong>
                    <span className="text-[10px] text-gray-600 font-sans block mt-0.5">Pakaian</span>
                  </div>
                </div>

                {/* QR & Verifikasi */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-emerald-900/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white border border-emerald-300 p-1 flex items-center justify-center">
                      <QrCode size={36} className="text-emerald-950" />
                    </div>
                    <div className="text-left">
                      <strong className="text-xs text-emerald-900 font-bold block">Status: Terverifikasi</strong>
                      <span className="text-[10px] text-gray-500 font-mono">ID: {currentUser?.id ? currentUser.id.slice(0, 8) : 'CL-USR-DEFAULT'}</span>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold">
                      <ShieldCheck size={12} />
                      ClothLoop Certified
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      ClothLoop Circular Network Indonesia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* Ajakan Masuk/Daftar untuk Mendapatkan Sertifikat */
          <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[var(--border-hairline)] shadow-xs text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4 border border-emerald-200 shadow-2xs">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)] tracking-tight">
              Sertifikat Dampak Nyata ClothLoop
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-lg leading-relaxed">
              Dapatkan sertifikat resmi terverifikasi atas kontribusi Anda dalam pengalihan limbah tekstil dan konservasi air dengan masuk atau mendaftarkan akun Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link href="/auth/login" className="btn-primary text-xs sm:text-sm py-2.5 px-6 rounded-xl font-bold shadow-md no-underline">
                Masuk ke Akun
              </Link>
              <Link href="/auth/register" className="btn-secondary text-xs sm:text-sm py-2.5 px-6 rounded-xl font-bold bg-white no-underline">
                Daftar Akun Baru
              </Link>
            </div>
          </section>
        )}

        {/* ── 3. TINGKATAN LEVEL & KEUNTUNGAN ANGGOTA ── */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border-hairline)] shadow-xs">
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-[var(--ink-primary)] tracking-tight">
              Tingkatan Level & Keuntungan Anggota
            </h3>
          </div>

          {/* Bar Progres Level */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-6">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-[var(--ink-primary)]">
                Level Anda: <strong className="text-emerald-700 font-extrabold">{tier.name}</strong>
              </span>
              {nextTier ? (
                <span className="text-gray-500 font-medium font-mono">
                  Kurang <strong className="text-emerald-800">{formatNumber(nextTier.minPts - effectivePoints)} Pts</strong> menuju {nextTier.name}
                </span>
              ) : (
                <span className="text-emerald-700 font-bold font-mono">Tingkat Tertinggi (Loop Legend)</span>
              )}
            </div>
            
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Grid Kategori Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {LEVEL_TIERS.map((t, idx) => {
              const isActive = effectivePoints >= t.minPts && (t.maxPts === Infinity || effectivePoints <= t.maxPts);
              const isPassed = effectivePoints > t.maxPts;

              return (
                <div 
                  key={t.name}
                  className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${
                    isActive 
                      ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400/40' 
                      : isPassed 
                      ? 'bg-white border-emerald-200' 
                      : 'bg-slate-50/70 border-slate-200 opacity-70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isActive ? 'bg-emerald-600 text-white' : isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        Level {idx + 1}
                      </span>
                      {isActive && (
                        <span className="text-[10px] text-emerald-700 font-bold">
                          Aktif
                        </span>
                      )}
                      {isPassed && <CheckCircle2 size={14} className="text-emerald-600" />}
                    </div>
                    <strong className="text-sm font-extrabold text-[var(--ink-primary)] block tracking-tight">
                      {t.name}
                    </strong>
                    <span className="text-[11px] text-gray-500 font-mono block mt-0.5">
                      {t.maxPts === Infinity ? `≥ ${formatNumber(t.minPts)} Pts` : `${formatNumber(t.minPts)} - ${formatNumber(t.maxPts)} Pts`}
                    </span>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200 text-[11px] text-gray-600">
                    <span className="font-semibold text-emerald-950 block mb-0.5">Keuntungan:</span>
                    {t.perk}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. PAPAN PERINGKAT KOMUNITAS (HANYA MEMUAT USER JIKA TERDAFTAR & PUNYA POIN) ── */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[var(--border-hairline)] shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-amber-500" />
              <h3 className="text-2xl font-extrabold text-[var(--ink-primary)] tracking-tight">
                Papan Peringkat Kontributor Sirkular
              </h3>
            </div>
          </div>

          <div className="divide-y divide-[var(--border-hairline)]">
            {sortedLeaderboard.map(c => {
              const isTop3 = c.rank <= 3;
              return (
                <div 
                  key={c.id} 
                  className={`py-3.5 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl flex justify-between items-center text-xs transition-colors ${
                    c.isCurrentUser 
                      ? 'bg-emerald-50 border border-emerald-300 shadow-2xs font-semibold' 
                      : c.rank === 1 
                      ? 'bg-amber-50/70' 
                      : isTop3 
                      ? 'bg-slate-50/60' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center font-mono shrink-0 ${
                      c.rank === 1 
                        ? 'bg-amber-400 text-amber-950' 
                        : c.rank === 2 
                        ? 'bg-slate-300 text-slate-900' 
                        : c.rank === 3 
                        ? 'bg-amber-700 text-amber-50' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {c.rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className={`text-sm ${c.isCurrentUser ? 'text-emerald-900 font-black' : 'text-[var(--ink-primary)] font-extrabold'}`}>
                          {c.name}
                        </strong>
                        {c.medal && <span className="text-xs">{c.medal}</span>}
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {c.city} &middot; <strong className="text-emerald-700 font-semibold">{c.tierName}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <strong className="text-[var(--forest-deep)] font-extrabold text-sm font-mono">
                      {c.clothesCount} <span className="text-xs font-normal text-gray-500">Helai</span>
                    </strong>
                    <span className="text-[11px] text-amber-700 font-mono font-bold">
                      +{formatNumber(c.points)} Pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <span>Poin dihitung: 300 - 3.000 Pts per helai pakaian berdasarkan jenis bahan.</span>
            <Link 
              href="/drop" 
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              Donasi Pakaian via Drop Baju <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
