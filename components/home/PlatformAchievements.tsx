'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, 
  Recycle, 
  Leaf, 
  Wind, 
  Users, 
  Scissors, 
  ShieldCheck, 
  ArrowUpRight, 
  Award,
  TrendingUp,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

const LIVE_IMPACTS = [
  { text: 'Siti R. mendonasikan 8 helai katun di Senopati Eco Hub', time: '1 mnt lalu', icon: Recycle, color: 'text-emerald-400' },
  { text: 'Studio Rework Bandung menyelesaikan 1 jaket Noragi Boro', time: '4 mnt lalu', icon: Scissors, color: 'text-amber-400' },
  { text: 'Budi S. menukar 400 pts untuk 1 bibit mangrove Muara Gembong', time: '8 mnt lalu', icon: Leaf, color: 'text-teal-400' },
  { text: 'Amanda P. membeli Tote Bag Quilted Daun Jati', time: '12 mnt lalu', icon: ShieldCheck, color: 'text-orange-400' },
];

export function PlatformAchievements() {
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIdx((prev) => (prev + 1) % LIVE_IMPACTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const activeTicker = LIVE_IMPACTS[tickerIdx];
  const TickerIcon = activeTicker.icon;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-[#063c2e] to-teal-950 p-6 sm:p-7 text-white shadow-2xl border-2 border-emerald-500/40">
      
      {/* Background Animated Gradient Glows */}
      <div 
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-40 blur-2xl"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none opacity-30 blur-2xl"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />

      {/* Header Pill & Title */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-emerald-900/80 px-2.5 py-1 rounded-full border border-emerald-500/40 font-mono">
            Audit Dampak Nasional 2026
          </span>
        </div>

        <span className="text-[10px] text-emerald-300 font-bold flex items-center gap-1 font-mono">
          <ShieldCheck size={13} className="text-emerald-400" />
          Terverifikasi
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-4">
        Pencapaian Ekosistem ClothLoop
      </h3>

      {/* ── 4 KEY METRIC CARDS ── */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        
        {/* Metric 1: Air Bersih */}
        <div className="p-3.5 bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md rounded-2xl border border-white/15 flex flex-col justify-between gap-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase font-bold text-emerald-300 tracking-wider">Air Dihemat</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center">
              <Droplets size={13} />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-black font-mono text-emerald-200 tracking-tight">
            402M <span className="text-xs font-sans text-emerald-300 font-bold">L</span>
          </strong>
          <span className="text-[10px] text-emerald-100/70">Setara 1.100 tangki air</span>
        </div>

        {/* Metric 2: Tekstil Dikelola */}
        <div className="p-3.5 bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md rounded-2xl border border-white/15 flex flex-col justify-between gap-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase font-bold text-amber-300 tracking-wider">Limbah Dialihkan</span>
            <div className="w-6 h-6 rounded-lg bg-amber-500/30 text-amber-300 flex items-center justify-center">
              <Recycle size={13} />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-black font-mono text-amber-200 tracking-tight">
            148.9 <span className="text-xs font-sans text-amber-300 font-bold">Ton</span>
          </strong>
          <span className="text-[10px] text-amber-100/70">Dari TPA 6 kota besar</span>
        </div>

        {/* Metric 3: Emisi Karbon */}
        <div className="p-3.5 bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md rounded-2xl border border-white/15 flex flex-col justify-between gap-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase font-bold text-teal-300 tracking-wider">CO₂e Terhindar</span>
            <div className="w-6 h-6 rounded-lg bg-teal-500/30 text-teal-300 flex items-center justify-center">
              <Wind size={13} />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-black font-mono text-teal-200 tracking-tight">
            536.2 <span className="text-xs font-sans text-teal-300 font-bold">Ton</span>
          </strong>
          <span className="text-[10px] text-teal-100/70">Setara 29.800 pohon</span>
        </div>

        {/* Metric 4: Warga Sirkular */}
        <div className="p-3.5 bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md rounded-2xl border border-white/15 flex flex-col justify-between gap-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase font-bold text-yellow-300 tracking-wider">Warga & UMKM</span>
            <div className="w-6 h-6 rounded-lg bg-yellow-500/30 text-yellow-300 flex items-center justify-center">
              <Users size={13} />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-black font-mono text-yellow-200 tracking-tight">
            18.4K+
          </strong>
          <span className="text-[10px] text-yellow-100/70">140+ studio perajin</span>
        </div>

      </div>

      {/* ── LIVE ACTIVITY TICKER ── */}
      <div className="bg-black/35 rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <TickerIcon size={14} className={activeTicker.color} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tickerIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-xs truncate"
            >
              <p className="font-bold text-white truncate text-[11px] sm:text-xs">{activeTicker.text}</p>
              <span className="text-[9px] text-emerald-300/80 font-mono">{activeTicker.time}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <Link
          href="/impact"
          className="text-[10px] font-bold text-emerald-300 hover:text-white shrink-0 flex items-center gap-0.5 no-underline"
        >
          <span>Portofolio</span>
          <ArrowUpRight size={12} />
        </Link>
      </div>

      {/* CTA Button */}
      <Link
        href="/impact"
        className="w-full btn-primary justify-center text-xs py-3 font-black bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 border-none shadow-lg hover:brightness-110 no-underline transition-transform active:scale-98"
      >
        <Leaf size={14} />
        <span>Lihat Laporan Audit Dampak Lengkap</span>
      </Link>

    </div>
  );
}
