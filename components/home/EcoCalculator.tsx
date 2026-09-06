'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Wind, Award, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { calculateEcoImpact, formatNumber } from '@/lib/utils';

import { BackgroundDecor } from '@/components/ui/BackgroundDecor';

export function EcoCalculator() {
  const [weightKg, setWeightKg] = useState<number>(5.0);

  const { waterSaved, co2Saved, points } = calculateEcoImpact(weightKg);
  const garmentCount = Math.round(weightKg * 2.5);
  const treesEquivalent = Math.max(1, Math.round(co2Saved / 1.8));

  return (
    <section className="bg-gradient-to-b from-[#f8f5ee] to-[#f2eee3] py-12 sm:py-16 border-y border-[var(--border-hairline)] relative overflow-hidden">
      <BackgroundDecor variant="subtle" />

      
      {/* Subtle Luminous Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle Decorative SVG Contours */}
      <svg
        className="absolute top-1/2 -right-16 -translate-y-1/2 w-72 h-72 opacity-25 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="85" stroke="var(--emerald-vibrant)" strokeWidth="1" strokeDasharray="5 7" />
        <circle cx="100" cy="100" r="55" stroke="var(--line-strong)" strokeWidth="0.75" />
      </svg>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Interactive Slider */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] leading-tight">
                Hitung penghematan dari pakaian Anda.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-1.5 leading-relaxed font-normal">
                Geser estimasi berat pakaian yang ingin Anda serahkan untuk melihat kalkulasi sumber daya yang terselamatkan.
              </p>
            </div>

            {/* Slider Widget Card */}
            <div className="bg-[var(--surface-muted)] p-5 sm:p-6 rounded-2xl border border-[var(--border-hairline)] flex flex-col gap-4 shadow-sm">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-[var(--ink-secondary)] uppercase tracking-wider">Estimasi Berat:</span>
                <motion.span 
                  key={weightKg}
                  initial={{ scale: 1.15, color: '#059669' }}
                  animate={{ scale: 1, color: '#111614' }}
                  className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)] font-mono"
                >
                  {weightKg.toFixed(1)} <span className="text-sm font-sans font-semibold text-[var(--ink-muted)]">kg</span>
                </motion.span>
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min={0.5}
                  max={25.0}
                  step={0.5}
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  aria-label="Estimasi berat pakaian dalam kg"
                  className="w-full h-2.5 bg-[var(--line-strong)] rounded-lg appearance-none cursor-pointer accent-[var(--emerald-vibrant)]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono font-medium">
                  <span>0.5 kg (1-2 helai)</span>
                  <span>10 kg (1 kardus)</span>
                  <span>25 kg (Drop besar)</span>
                </div>
              </div>

              <div className="text-[11px] text-[var(--ink-secondary)] font-medium pt-3 border-t border-[var(--border-hairline)] flex justify-between items-center">
                <span>Setara perkiraan:</span>
                <strong className="text-[var(--emerald-vibrant)] font-bold">{garmentCount} helai pakaian</strong>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/drop" className="btn-primary justify-center text-xs py-3 px-4 w-full shadow-md font-bold">
                Serahkan {weightKg.toFixed(1)} kg Pakaian Sekarang
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: 3 Vibrant Metric Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5"
          >
            {/* 1. Water Saved */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-gradient-to-br from-emerald-500/10 via-white to-white p-5 rounded-2xl border border-emerald-500/20 shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--emerald-vibrant)] text-white flex items-center justify-center shadow-xs">
                <Droplets size={18} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--forest-deep)] block mb-1">
                  Air Bersih Terhemat
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={waterSaved}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-3xl sm:text-4xl font-extrabold text-[var(--forest-deep)] tracking-tight tabular-nums">
                      {formatNumber(waterSaved)}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[var(--emerald-vibrant)]">
                      L
                    </span>
                  </motion.div>
                </AnimatePresence>
                <span className="text-[11px] text-[var(--ink-secondary)] block mt-1 font-medium">
                  Liter air bersih dikonservasi
                </span>
              </div>
              <p className="text-[10px] text-emerald-950 font-semibold pt-2.5 border-t border-emerald-500/20 leading-tight">
                Setara {Math.round(waterSaved / 2)} hari kebutuhan air minum satu orang.
              </p>
            </motion.div>

            {/* 2. CO2 Prevented */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-gradient-to-br from-amber-500/10 via-white to-white p-5 sm:p-6 rounded-2xl border border-amber-500/25 shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--ochre)] text-white flex items-center justify-center shadow-xs">
                <Wind size={18} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--clay)] block mb-1">
                  Emisi Karbon Dicegah
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={co2Saved}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-3xl sm:text-4xl font-extrabold text-[var(--clay)] tracking-tight tabular-nums">
                      {co2Saved}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[var(--ochre)]">
                      kg CO₂e
                    </span>
                  </motion.div>
                </AnimatePresence>
                <span className="text-[11px] text-[var(--ink-secondary)] block mt-1 font-medium">
                  Limbah gas rumah kaca dihindari
                </span>
              </div>
              <p className="text-[10px] text-amber-950 font-semibold pt-2.5 border-t border-amber-500/20 leading-tight">
                Setara {treesEquivalent} pohon dewasa menyerap karbon 1 bulan.
              </p>
            </motion.div>

            {/* 3. Reward Points */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white p-5 sm:p-6 rounded-2xl shadow-md flex flex-col justify-between gap-3 relative overflow-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center border border-white/25">
                <Award size={18} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 block mb-1">
                  Reward ClothPoints
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={points}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                      +{points}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-amber-300">
                      Pts
                    </span>
                  </motion.div>
                </AnimatePresence>
                <span className="text-[11px] text-emerald-100/90 block mt-1 font-medium">
                  Poin reward aktif Anda
                </span>
              </div>
              <p className="text-[10px] text-emerald-100/90 pt-2.5 border-t border-white/20 leading-tight font-normal">
                Tukarkan dengan voucher diskon atau adopsi bibit mangrove.
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
