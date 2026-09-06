'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Droplets } from 'lucide-react';
import { ConditionBadge } from '@/components/ui/Badge';
import { BackgroundDecor } from '@/components/ui/BackgroundDecor';

const GRADES = [
  {
    condition: 'LIKE_NEW' as const,
    title: 'Like New (Seperti Baru)',
    badgeColor: '#054e3b',
    criteria: [
      'Pakaian tidak memiliki tanda pemakaian yang terlihat sama sekali.',
      'Warna kain 95-100% cerah, serat rapat, tidak ada susut ataupun luntur.',
      'Semua kancing, ritsleting, dan jahitan asli dalam kondisi sempurna.',
      'Sering kali masih menyertakan tag cadangan atau kemasan asli.',
    ],
  },
  {
    condition: 'GENTLY_USED' as const,
    title: 'Gently Used (Sangat Terawat)',
    badgeColor: '#059669',
    criteria: [
      'Pernah dipakai beberapa kali dengan perawatan sangat baik.',
      'Mungkin ada sedikit tanda pemakaian wajar (fading minor yang seragam).',
      'Tidak ada sobekan, noda membandel, atau lubang serat kain.',
      'Struktur kain dan bentuk kerah tetap kokoh.',
    ],
  },
  {
    condition: 'UPCYCLED' as const,
    title: 'Upcycled (Rekonstruksi & Rework)',
    badgeColor: '#ea580c',
    criteria: [
      'Pakaian atau tas hasil rombakan kreatif oleh mitra perajin ClothCraft.',
      'Menggabungkan potongan material perca berkualitas tinggi (misal Denim + Batik).',
      'Diperkuat dengan jahitan sulam tangan Sashiko atau bordir khusus.',
      'Merupakan produk karya unik (one-of-a-kind).',
    ],
  },
  {
    condition: 'VINTAGE' as const,
    title: 'Vintage (Koleksi Bersejarah)',
    badgeColor: '#d97706',
    criteria: [
      'Pakaian berusia lebih dari 15-20 tahun dengan nilai estetika/arsip tinggi.',
      'Memiliki patina alami, fading vintage otentik, atau wash era 80-90an.',
      'Keaslian label, ritsleting vintage (misal Talon, YKK era lama), dan single stitch diverifikasi tim kurator.',
    ],
  },
];

export default function ConditionGuidePage() {
  return (
    <div className="relative overflow-x-hidden">

      {/* Header */}
      <div className="relative bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-14 sm:py-20 overflow-hidden">
        <BackgroundDecor variant="market" />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="label-eyebrow text-[var(--forest-deep)] block mb-1.5">Standar Kualitas & QC</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--ink-primary)] leading-tight max-w-2xl tracking-tight">
              Panduan Kondisi Pakaian ClothLoop.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 max-w-xl leading-relaxed">
              Setiap helai pakaian di marketplace ClothLoop melalui 12 tahap inspeksi fisik, sanitasi ozon, dan panduan ukuran nyata agar belanja preloved terasa aman tanpa kompromi.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-12 sm:py-16 flex flex-col gap-12">

        {/* 1. 4 Tingkatan Kondisi */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GRADES.map((g, idx) => (
            <motion.div 
              key={g.condition}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white p-6 sm:p-7 border border-[var(--border-hairline)] shadow-sm flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <ConditionBadge condition={g.condition} />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Standar Terverifikasi</span>
                </div>
                <h3 className="text-xl font-extrabold text-[var(--ink-primary)] mb-3 tracking-tight">
                  {g.title}
                </h3>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {g.criteria.map((c, i) => (
                    <li key={i} className="text-xs text-[var(--ink-secondary)] flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 size={14} className="text-[var(--forest-deep)] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 2. Cara Mengukur Pakaian */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 sm:p-10 border border-[var(--border-hairline)] shadow-sm"
        >
          <div className="max-w-md mb-6">
            <span className="label-eyebrow text-[var(--forest-deep)]">Akurasi Ukuran Nyata</span>
            <h2 className="text-2xl font-extrabold text-[var(--ink-primary)] mt-1 tracking-tight">
              Panduan Dimensi Centimeter (Cm)
            </h2>
            <p className="text-xs text-[var(--ink-muted)] mt-1">
              Kami tidak hanya mengandalkan tag ukuran pabrik karena ukuran vintage dan impor sering berbeda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[var(--ink-secondary)]">
            <div className="p-5 bg-[var(--surface-muted)] border border-[var(--border-hairline)] rounded-xs">
              <strong className="text-sm font-bold text-[var(--ink-primary)] block mb-1">Lebar Dada (Chest Width)</strong>
              Diukur dari ujung ketiak kiri ke ujung ketiak kanan dalam posisi pakaian dibentangkan rata (flat-lay).
            </div>
            <div className="p-5 bg-[var(--surface-muted)] border border-[var(--border-hairline)] rounded-xs">
              <strong className="text-sm font-bold text-[var(--ink-primary)] block mb-1">Panjang Baju (Length)</strong>
              Diukur lurus dari titik bahu tertinggi di samping kerah hingga ke ujung keliman bawah pakaian.
            </div>
            <div className="p-5 bg-[var(--surface-muted)] border border-[var(--border-hairline)] rounded-xs">
              <strong className="text-sm font-bold text-[var(--ink-primary)] block mb-1">Lebar Pinggang (Waist)</strong>
              Untuk celana/denim: diukur lurus dari sisi kiri pinggang ke sisi kanan pinggang, dikali dua untuk lingkar.
            </div>
          </div>
        </motion.section>

        {/* 3. Link to Market */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--surface-muted)] p-6 sm:p-8 border border-[var(--border-hairline)]"
        >
          <div>
            <h4 className="font-extrabold text-base text-[var(--ink-primary)] tracking-tight">Ingin Mencoba Belanja Preloved QC?</h4>
            <p className="text-xs text-[var(--ink-muted)] mt-0.5">Semua produk dilindungi jaminan garansi escrow 100%.</p>
          </div>
          <Link href="/market" className="btn-primary text-xs py-2.5 px-5 shrink-0">
            Buka Katalog Preloved <ArrowRight size={13} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
