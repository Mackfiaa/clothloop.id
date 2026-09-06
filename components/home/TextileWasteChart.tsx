'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Trash2, 
  Flame, 
  Recycle, 
  ArrowRight, 
  TrendingUp, 
  Info,
  Droplets,
  Layers,
  Sparkle
} from 'lucide-react';
import Link from 'next/link';

interface WasteCategory {
  id: string;
  label: string;
  percentage: number;
  tonnage: string;
  desc: string;
  color: string;
  bgGrad: string;
  icon: React.ElementType;
}

const WASTE_BREAKDOWN: WasteCategory[] = [
  {
    id: 'tpa',
    label: 'Tertimbun di TPA',
    percentage: 62,
    tonnage: '1,42 Juta Ton',
    desc: 'Menumpuk di tempat pembuangan akhir dan membutuhkan 20 hingga 200 tahun untuk terurai.',
    color: 'text-[#881337]',
    bgGrad: 'bg-[#881337]',
    icon: Trash2,
  },
  {
    id: 'burn',
    label: 'Dibakar / Cemari Sungai',
    percentage: 26,
    tonnage: '598 Ribu Ton',
    desc: 'Pembakaran terbuka menghasilkan gas beracun dan pelepasan mikroplastik ke ekosistem air.',
    color: 'text-amber-700',
    bgGrad: 'bg-amber-600',
    icon: Flame,
  },
  {
    id: 'recycled',
    label: 'Didaur Ulang / Sirkular',
    percentage: 12,
    tonnage: '276 Ribu Ton',
    desc: 'Berhasil dikumpulkan, didonasikan, direparasi artisan, atau diolah kembali seratnya.',
    color: 'text-[var(--emerald-vibrant)]',
    bgGrad: 'bg-[var(--emerald-vibrant)]',
    icon: Recycle,
  },
];

export function TextileWasteChart() {
  const [activeCategory, setActiveCategory] = useState<string>('tpa');

  const selectedData = WASTE_BREAKDOWN.find(w => w.id === activeCategory) || WASTE_BREAKDOWN[0];

  return (
    <section className="relative bg-white py-14 sm:py-20 border-b border-[var(--border-hairline)] overflow-hidden">
      {/* Background Micro Ambient */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-40 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(136, 19, 55, 0.08) 0%, rgba(136, 19, 55, 0) 70%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-40 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(5, 150, 105, 0.05) 0%, rgba(5, 150, 105, 0) 70%)',
        }}
      />

      <div className="container-site relative z-10">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-10"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--ink-primary)] leading-tight tracking-tight">
              Indonesia Hasilkan <span className="text-[#881337]">2,3 Juta Ton</span> Limbah Pakaian Tiap Tahun.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 leading-relaxed">
              Data Kementerian Lingkungan Hidup & Kehutanan (KLHK) mencatat industri mode cepat dan tumpukan pakaian tak terpakai menjadi penyumbang limbah masif ke TPA.
            </p>
          </div>

          <div className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-[var(--border-hairline)] flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-rose-950/10 text-[#881337] flex items-center justify-center font-black">
              <TrendingUp size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-extrabold block">Timbulan Harian</span>
              <strong className="text-base font-extrabold text-[var(--ink-primary)] font-mono tabular-nums">~6.300 Ton / Hari</strong>
            </div>
          </div>
        </motion.div>

        {/* ── Visual Bar Breakdown & Distribution ────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="bg-[var(--surface-main)] p-6 sm:p-8 rounded-3xl border border-[var(--border-hairline)] shadow-sm mb-10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <span className="text-xs font-extrabold text-[var(--ink-primary)] uppercase tracking-wider">
              Distribusi Pengelolaan 2.300.000 Ton Limbah Kain
            </span>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Klik segmen untuk rincian data
            </span>
          </div>

          {/* Animated Segmented Multi-Bar */}
          <div className="h-6 sm:h-8 w-full bg-gray-200 rounded-full overflow-hidden flex shadow-inner mb-6 p-1 gap-1">
            {WASTE_BREAKDOWN.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveCategory(item.id)}
                whileHover={{ opacity: 0.9, scaleY: 1.05 }}
                className={`h-full rounded-full transition-all cursor-pointer relative ${item.bgGrad} ${activeCategory === item.id ? 'ring-2 ring-black/40 scale-y-105' : 'opacity-85'}`}
                style={{ width: `${item.percentage}%` }}
                title={`${item.label}: ${item.percentage}% (${item.tonnage})`}
              />
            ))}
          </div>

          {/* Interactive Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WASTE_BREAKDOWN.map((item) => {
              const Icon = item.icon;
              const isSelected = activeCategory === item.id;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveCategory(item.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected 
                      ? 'bg-white border-[var(--forest-deep)] ring-2 ring-[var(--forest-deep)] shadow-md' 
                      : 'bg-white/70 border-[var(--border-hairline)] hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-[var(--forest-subtle)] text-[var(--forest-deep)]' : 'bg-gray-100 text-gray-500'}`}>
                        <Icon size={16} />
                      </div>
                      <span className="text-xs font-bold text-[var(--ink-primary)]">{item.label}</span>
                    </div>
                    <span className={`text-sm font-extrabold ${item.color} font-mono tabular-nums`}>
                      {item.percentage}%
                    </span>
                  </div>

                  <div>
                    <strong className="text-xl sm:text-2xl font-extrabold text-[var(--ink-primary)] tracking-tight block">
                      {item.tonnage}
                    </strong>
                    <p className="text-[11px] text-[var(--ink-secondary)] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── 3 Key Environmental Impact Columns ────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="card-clean p-6 rounded-2xl flex flex-col justify-between gap-3 border-l-4 border-l-[#881337]"
          >
            <div>
              <div className="flex items-center gap-2 text-[#881337] mb-2">
                <Droplets size={16} />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Polusi Air Bersih</span>
              </div>
              <h3 className="text-base font-extrabold text-[var(--ink-primary)] mb-1.5 tracking-tight">
                20% Pencemaran Air Industri
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Pencelupan dan pewarnaan tekstil konvensional melepaskan logam berat dan bahan kimia beracun yang merusak sungai dan air tanah.
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#881337] pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              Sumber: UN Environment
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card-clean p-6 rounded-2xl flex flex-col justify-between gap-3 border-l-4 border-l-amber-500"
          >
            <div>
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <Layers size={16} />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Metana & Mikroplastik</span>
              </div>
              <h3 className="text-base font-extrabold text-[var(--ink-primary)] mb-1.5 tracking-tight">
                200 Tahun Waktu Terurai
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Serat sintetis (poliester & nilon) terurai menjadi mikroplastik berbahaya dan menghasilkan gas metana saat terkubur di TPA.
              </p>
            </div>
            <span className="text-[10px] font-bold text-amber-700 pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              Sumber: Ellen MacArthur Foundation
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-clean p-6 rounded-2xl flex flex-col justify-between gap-3 border-l-4 border-l-[var(--emerald-vibrant)] bg-gradient-to-br from-white to-[var(--forest-subtle)]"
          >
            <div>
              <div className="flex items-center gap-2 text-[var(--forest-deep)] mb-2">
                <Recycle size={16} />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Solusi Sirkular ClothLoop</span>
              </div>
              <h3 className="text-base font-extrabold text-[var(--forest-deep)] mb-1.5 tracking-tight">
                Ubah Beban Jadi Sumber Daya
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Melalui ClothDrop, Marketplace Preloved QC, dan Rekonstruksi ClothCraft, kita menutup siklus limbah tekstil di Indonesia.
              </p>
            </div>
            <Link 
              href="/drop"
              className="text-xs font-extrabold text-[var(--forest-deep)] pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between group no-underline"
            >
              <span>Mulai Donasi Sekarang</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
