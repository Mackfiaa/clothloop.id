'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Droplets } from 'lucide-react';
import { ConditionBadge } from '@/components/ui/Badge';

const GRADES = [
  {
    condition: 'LIKE_NEW' as const,
    title: 'Like New (Seperti Baru)',
    badgeColor: '#1b3628',
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
    badgeColor: '#38614a',
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
    badgeColor: '#a8522c',
    criteria: [
      'Pakaian atau tas hasil rombakan kreatif oleh mitra perajin ClothCraft.',
      'Menggabungkan potongan material perca berkualitas tinggi (misal Denim + Batik).',
      'Diperkuat dengan jahitan sulam tangan Sashiko atau bordir khusus.',
      'Merupakan produk *one-of-a-kind* (satu-satunya di dunia).',
    ],
  },
  {
    condition: 'VINTAGE' as const,
    title: 'Vintage (Koleksi Bersejarah)',
    badgeColor: '#8c6d2d',
    criteria: [
      'Pakaian berusia lebih dari 15-20 tahun dengan nilai estetika/arsip tinggi.',
      'Memiliki patina alami, fading vintage otentik, atau wash era 80-90an.',
      'Keaslian label, ritsleting vintage (misal Talon, YKK era lama), dan single stitch diverifikasi tim kurator.',
    ],
  },
];

export default function ConditionGuidePage() {
  return (
    <div className="overflow-x-hidden">

      {/* Header */}
      <div className="bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-12 sm:py-16">
        <div className="container-site">
          <span className="label-eyebrow text-[var(--forest-deep)] block mb-1">Standar Kualitas & QC</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-5xl font-bold text-[var(--ink-primary)] leading-tight max-w-2xl">
            Panduan Kondisi Pakaian ClothLoop.
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2 max-w-xl leading-relaxed">
            Setiap helai pakaian di marketplace ClothLoop melalui 12 tahap inspeksi fisik, sanitasi ozon, dan panduan ukuran nyata agar belanja preloved terasa aman tanpa kejutan.
          </p>
        </div>
      </div>

      <div className="container-site py-10 sm:py-16 flex flex-col gap-12">

        {/* 1. 4 Tingkatan Kondisi */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GRADES.map((g) => (
            <div key={g.condition} className="bg-white p-6 border border-[var(--border-hairline)] flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <ConditionBadge condition={g.condition} />
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Standar Terverifikasi</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[var(--ink-primary)] mb-2">
                  {g.title}
                </h3>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {g.criteria.map((c, i) => (
                    <li key={i} className="text-xs text-[var(--ink-secondary)] flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 size={13} className="text-[var(--forest-deep)] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* 2. Cara Mengukur Pakaian */}
        <section className="bg-white p-6 sm:p-10 border border-[var(--border-hairline)]">
          <div className="max-w-md mb-6">
            <span className="label-eyebrow text-[var(--forest-deep)]">Akurasi Ukuran Nyata</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[var(--ink-primary)] mt-1">
              Panduan Dimensi Centimeter (Cm)
            </h2>
            <p className="text-xs text-[var(--ink-muted)] mt-1">
              Kami tidak hanya mengandalkan tag ukuran pabrik (S/M/L) karena ukuran vintage dan impor sering berbeda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[var(--ink-secondary)]">
            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
              <strong className="text-sm font-bold text-[var(--ink-primary)] block mb-1">Lebar Dada (Chest Width)</strong>
              Diukur dari ujung ketiak kiri ke ujung ketiak kanan dalam posisi pakaian dibentangkan rata (flat-lay).
            </div>
            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
              <strong className="text-sm font-bold text-[var(--ink-primary)] block mb-1">Panjang Baju (Length)</strong>
              Diukur lurus dari titik bahu tertinggi di samping kerah hingga ke ujung keliman bawah pakaian.
            </div>
            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
              <strong className="text-sm font-bold text-[var(--ink-primary)] block mb-1">Lebar Pinggang (Waist)</strong>
              Untuk celana/denim: diukur lurus dari sisi kiri pinggang ke sisi kanan pinggang, dikali dua untuk lingkar.
            </div>
          </div>
        </section>

        {/* 3. Link to Market */}
        <div className="flex justify-between items-center bg-[var(--surface-muted)] p-6 border border-[var(--border-hairline)]">
          <div>
            <h4 className="font-serif font-bold text-base text-[var(--ink-primary)]">Ingin Mencoba Belanja Preloved QC?</h4>
            <p className="text-xs text-[var(--ink-muted)]">Semua produk dilindungi jaminan garansi escrow 100%.</p>
          </div>
          <Link href="/market" className="btn-primary text-xs py-2 px-4">
            Buka Katalog Preloved <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </div>
  );
}
