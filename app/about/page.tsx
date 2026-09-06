'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Recycle, ShieldCheck, Heart, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { BackgroundDecor } from '@/components/ui/BackgroundDecor';

export default function AboutPage() {
  return (
    <div className="relative overflow-x-hidden">

      {/* Hero Header */}
      <div className="relative bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-14 sm:py-20 overflow-hidden">
        <BackgroundDecor variant="hero" />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="label-eyebrow text-[var(--forest-deep)] block mb-1.5">Tentang Gerakan</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--ink-primary)] leading-tight max-w-2xl tracking-tight">
              Menghidupkan kembali setiap serat pakaian.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 max-w-xl leading-relaxed">
              ClothLoop adalah platform daur ulang dan pengelolaan pakaian bekas yang mengintegrasikan pengumpulan donasi, marketplace preloved terkurasi, dan kerajinan tangan UMKM perajin lokal.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-12 sm:py-16 flex flex-col gap-14">

        {/* 1. Misi & Nilai Inti */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="card-clean p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[var(--ink-muted)]">01 / MISI</span>
              <h3 className="text-xl font-extrabold text-[var(--ink-primary)] mt-2 mb-1.5 tracking-tight">
                Zero Waste to Landfill
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Mengalihkan minimal 500 ton limbah tekstil dari TPA setiap tahun melalui kurasi ulang, donasi transparan, dan rekayasa daur ulang.
              </p>
            </div>
            <div className="text-[11px] font-bold text-[var(--forest-deep)] pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              148.9 Ton Berhasil Dikelola
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card-clean p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[var(--ink-muted)]">02 / MISI</span>
              <h3 className="text-xl font-extrabold text-[var(--ink-primary)] mt-2 mb-1.5 tracking-tight">
                Pemberdayaan Perajin Lokal
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Membuka lapangan kerja berkelanjutan bagi lebih dari 140 master penjahit, penyulam Sashiko, dan perajin batik lawasan di berbagai kota.
              </p>
            </div>
            <div className="text-[11px] font-bold text-[var(--forest-deep)] pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              142 Mitra Studio Terdaftar
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-clean p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[var(--ink-muted)]">03 / MISI</span>
              <h3 className="text-xl font-extrabold text-[var(--ink-primary)] mt-2 mb-1.5 tracking-tight">
                Transparansi Jejak Karbon
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Setiap transaksi dan donasi diaudit secara ilmiah untuk mencatat penghematan air bersih dan pencegahan emisi karbon nyata.
              </p>
            </div>
            <div className="text-[11px] font-bold text-[var(--forest-deep)] pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              402 Juta Liter Air Terjaga
            </div>
          </motion.div>
        </section>

        {/* 2. Model Sirkularitas */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 sm:p-10 border border-[var(--border-hairline)] shadow-sm"
        >
          <div className="max-w-xl mb-8">
            <span className="label-eyebrow text-[var(--forest-deep)]">Arsitektur Ekosistem</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)] mt-1 tracking-tight">
              Bagaimana ClothLoop Bekerja?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[var(--ink-secondary)]">
            <div className="border-l-2 border-[var(--forest-deep)] pl-4">
              <strong className="text-sm font-bold text-[var(--ink-primary)] block mb-1">Tahap 1: Pengumpulan</strong>
              Pakaian masuk melalui 68 titik drop partner atau penjemputan kurir. Ditimbang dan diberi kode identifikasi digital.
            </div>
            <div className="border-l-2 border-[var(--forest-deep)] pl-4">
              <strong className="text-sm font-bold text-[var(--ink-primary)] block mb-1">Tahap 2: Sortir & QC</strong>
              Tim verifikator memeriksa kelayakan serat, kebersihan, dan kondisi pakaian dengan 12 parameter standar.
            </div>
            <div className="border-l-2 border-[var(--forest-deep)] pl-4">
              <strong className="text-sm font-bold text-[var(--forest-deep)] block mb-1">Tahap 3: Restorasi / Rework</strong>
              Pakaian rusak dialihkan ke perajin ClothCraft untuk direparasi atau dirombak menjadi produk baru bernilai seni.
            </div>
            <div className="border-l-2 border-[var(--forest-deep)] pl-4">
              <strong className="text-sm font-bold text-[var(--ink-primary)] block mb-1">Tahap 4: Sirkulasi Ulang</strong>
              Produk dipasarkan kembali dengan garansi escrow, dan donatur mendapatkan poin reward ramah lingkungan.
            </div>
          </div>
        </motion.section>

        {/* 3. Call to Action */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="bg-[var(--forest-deep)] text-white p-8 sm:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 rounded-xs shadow-md"
        >
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-1 tracking-tight">
              Siap Menjadi Bagian dari Gerakan?
            </h3>
            <p className="text-xs text-white/75 max-w-lg leading-relaxed">
              Mulai serahkan pakaian lama yang menumpuk di lemari atau dukung produk upcycle perajin lokal hari ini.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/drop" className="btn-primary bg-white text-[var(--forest-deep)] hover:bg-white/90 border-white text-xs font-bold">
              Serahkan Pakaian
            </Link>
            <Link href="/market" className="btn-secondary text-white border-white/40 hover:bg-white/10 text-xs font-bold">
              Katalog Preloved
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
