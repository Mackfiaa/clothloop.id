'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, ArrowRight, Medal } from 'lucide-react';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';
import { BackgroundDecor } from '@/components/ui/BackgroundDecor';

interface DonorChampion {
  rank: 1 | 2 | 3;
  name: string;
  avatar: string;
  city: string;
  clothesCount: number;
  points: number;
  rankLabel: string;
  avatarBg: string;
  avatarText: string;
  avatarBorder: string;
  metricBg: string;
  metricBorder: string;
  metricTextColor: string;
  badgeStyle: string;
}

const TOP_CONTRIBUTORS: DonorChampion[] = [
  {
    rank: 1,
    name: 'Siti Rahmawati',
    avatar: 'SR',
    city: 'Bandung, Jawa Barat',
    clothesCount: 148,
    points: 184500,
    rankLabel: 'Top 1',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-900',
    avatarBorder: 'border-amber-300',
    metricBg: 'bg-amber-50/80',
    metricBorder: 'border-amber-200/70',
    metricTextColor: 'text-amber-950',
    badgeStyle: 'bg-amber-100 text-amber-900 border-amber-200',
  },
  {
    rank: 2,
    name: 'Budi Santoso',
    avatar: 'BS',
    city: 'Surabaya, Jawa Timur',
    clothesCount: 112,
    points: 139200,
    rankLabel: 'Top 2',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-800',
    avatarBorder: 'border-slate-300',
    metricBg: 'bg-slate-50',
    metricBorder: 'border-slate-200/80',
    metricTextColor: 'text-slate-900',
    badgeStyle: 'bg-slate-100 text-slate-800 border-slate-200',
  },
  {
    rank: 3,
    name: 'Amanda Putri',
    avatar: 'AP',
    city: 'Jakarta Selatan, DKI',
    clothesCount: 86,
    points: 98400,
    rankLabel: 'Top 3',
    avatarBg: 'bg-stone-100',
    avatarText: 'text-stone-800',
    avatarBorder: 'border-stone-300',
    metricBg: 'bg-stone-50',
    metricBorder: 'border-stone-200/80',
    metricTextColor: 'text-stone-900',
    badgeStyle: 'bg-stone-100 text-stone-800 border-stone-200',
  },
];

export function LeaderboardPodium() {
  const champ1 = TOP_CONTRIBUTORS.find((c) => c.rank === 1)!;
  const champ2 = TOP_CONTRIBUTORS.find((c) => c.rank === 2)!;
  const champ3 = TOP_CONTRIBUTORS.find((c) => c.rank === 3)!;

  return (
    <section className="relative py-16 sm:py-24 bg-[#fbfbfa] border-b border-[var(--border-hairline)] overflow-hidden">
      <BackgroundDecor variant="subtle" />

      <div className="container-site relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
              Top 3 Donatur Pakaian Terbanyak
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2 leading-relaxed">
              Apresiasi bagi anggota komunitas yang aktif menyerahkan pakaian tak terpakai untuk didaur ulang. Dapatkan <strong>300 - 3.000 ClothPoints</strong> per helai pakaian yang Anda donasikan.
            </p>
          </motion.div>
        </div>

        {/* ── 3 PODIUM DISPLAY ── */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 items-end mb-12">
          
          {/* PODIUM 2 (Top 2 - Kiri: Lumayan Dikasih Spotlight) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="order-2 md:order-1 bg-white rounded-2xl p-6 border-2 border-slate-300/90 shadow-sm flex flex-col items-center text-center hover:border-slate-400 transition-all z-10"
          >
            <div className="flex items-center justify-center w-full mb-3.5">
              <span className="text-[11px] font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-md border border-slate-300 flex items-center gap-1 font-mono">
                🥈 Top 2
              </span>
            </div>

            <div className="w-15 h-15 rounded-full bg-slate-100 text-slate-800 font-black text-base flex items-center justify-center border-2 border-slate-300 ring-2 ring-slate-100 mb-3">
              {champ2.avatar}
            </div>

            <h3 className="text-sm font-extrabold text-[var(--ink-primary)]">
              {champ2.name}
            </h3>
            <span className="text-[11px] text-[var(--ink-muted)] mt-0.5">{champ2.city}</span>

            <div className="w-full my-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Donasi</span>
              <strong className="text-2xl font-black text-slate-900 tabular-nums font-mono">
                {formatNumber(champ2.clothesCount)} <span className="text-xs font-bold text-slate-600">Helai Baju</span>
              </strong>
            </div>

            <div className="flex items-center justify-between w-full text-xs pt-3 mt-auto border-t border-slate-100">
              <span className="text-slate-500 text-[11px] font-medium">ClothPoints:</span>
              <span className="font-extrabold text-slate-800 text-xs font-mono">+{formatNumber(champ2.points)} Pts</span>
            </div>
          </motion.div>

          {/* PODIUM 1 (Top 1 - TENGAH: Paling Menonjol & Digedein) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="order-1 md:order-2 bg-gradient-to-b from-amber-50/90 via-white to-amber-50/40 rounded-3xl p-7 border-2 border-amber-300 shadow-md flex flex-col items-center text-center relative md:-translate-y-4 md:scale-105 z-20 hover:border-amber-400 transition-all"
          >
            <div className="flex items-center justify-center w-full mb-4">
              <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-200 to-yellow-300 px-3.5 py-1 rounded-full border border-amber-300 flex items-center gap-1 shadow-2xs font-mono">
                👑 Top 1
              </span>
            </div>

            <div className="relative mb-3">
              <div className="w-18 h-18 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 text-amber-950 font-black text-xl flex items-center justify-center border-2 border-white shadow-sm ring-4 ring-amber-100">
                {champ1.avatar}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shadow-xs font-black">
                ★
              </span>
            </div>

            <h3 className="text-base font-black text-[var(--ink-primary)]">
              {champ1.name}
            </h3>
            <span className="text-[11px] text-[var(--ink-muted)] mt-0.5">{champ1.city}</span>

            <div className="w-full my-4 p-4 bg-amber-100/60 rounded-2xl border border-amber-200/80 flex flex-col items-center justify-center gap-0.5 shadow-2xs">
              <span className="text-[10px] uppercase font-black text-amber-800 tracking-wider">Total Donasi Terbanyak</span>
              <strong className="text-3xl font-black text-amber-950 tabular-nums font-mono">
                {formatNumber(champ1.clothesCount)} <span className="text-xs font-bold text-amber-800">Helai Baju</span>
              </strong>
            </div>

            <div className="flex items-center justify-between w-full text-xs pt-3 mt-auto border-t border-amber-100">
              <span className="text-amber-800 text-[11px] font-medium">Total ClothPoints:</span>
              <span className="font-black text-amber-900 text-sm font-mono">+{formatNumber(champ1.points)} Pts</span>
            </div>
          </motion.div>

          {/* PODIUM 3 (Top 3 - Kanan: Agak Diredupin) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="order-3 md:order-3 bg-stone-50/70 rounded-2xl p-5 border border-stone-200 shadow-2xs flex flex-col items-center text-center opacity-85 hover:opacity-100 transition-opacity z-10"
          >
            <div className="flex items-center justify-center w-full mb-3">
              <span className="text-[11px] font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-md border border-stone-200 flex items-center gap-1 font-mono">
                🥉 Top 3
              </span>
            </div>

            <div className="w-13 h-13 rounded-full bg-stone-100 text-stone-700 font-bold text-sm flex items-center justify-center border border-stone-300 mb-2.5">
              {champ3.avatar}
            </div>

            <h3 className="text-xs font-bold text-[var(--ink-primary)]">
              {champ3.name}
            </h3>
            <span className="text-[10px] text-[var(--ink-muted)] mt-0.5">{champ3.city}</span>

            <div className="w-full my-3 p-3 bg-stone-100/60 rounded-xl border border-stone-200/60 flex flex-col items-center justify-center gap-0.5">
              <span className="text-[9px] uppercase font-semibold text-stone-500 tracking-wider">Total Donasi</span>
              <strong className="text-xl font-bold text-stone-800 tabular-nums font-mono">
                {formatNumber(champ3.clothesCount)} <span className="text-xs font-medium text-stone-600">Helai Baju</span>
              </strong>
            </div>

            <div className="flex items-center justify-between w-full text-xs pt-2.5 mt-auto border-t border-stone-200/50">
              <span className="text-stone-500 text-[10px]">ClothPoints:</span>
              <span className="font-semibold text-stone-700 text-xs font-mono">+{formatNumber(champ3.points)} Pts</span>
            </div>
          </motion.div>

        </div>

        {/* ── Points Distribution Guide & Action Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 border border-emerald-100">
              <Trophy size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--ink-primary)] flex items-center gap-2">
                Ingin Menjadi Salah Satu dari Top 3 Donatur Terbanyak?
              </h4>
              <p className="text-xs text-[var(--ink-secondary)] mt-1 leading-relaxed max-w-xl">
                Mulai serahkan pakaian tak terpakai Anda dari sekarang, kumpulkan ClothPoints sebanyak-banyaknya, dan raih posisi teratas di papan peringkat komunitas ClothLoop!
              </p>
            </div>
          </div>

          <Link
            href="/drop"
            className="btn-primary shrink-0 text-xs py-2.5 px-5 font-bold shadow-xs whitespace-nowrap group no-underline"
          >
            <span>Mulai Donasi Sekarang</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

