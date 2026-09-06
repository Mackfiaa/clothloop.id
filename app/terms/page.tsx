'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundDecor } from '@/components/ui/BackgroundDecor';

export default function TermsPage() {
  return (
    <div className="relative overflow-x-hidden">

      {/* Header */}
      <div className="relative bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-14 sm:py-20 overflow-hidden">
        <BackgroundDecor variant="default" />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="label-eyebrow text-[var(--forest-deep)] block mb-1.5">Dokumen Legal</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--ink-primary)] leading-tight max-w-2xl tracking-tight">
              Syarat & Ketentuan Layanan.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 max-w-xl leading-relaxed">
              Pembaruan Terakhir: September 2026. Ketentuan penggunaan platform ClothLoop.id bagi Donatur, Pembeli, Penjual, UMKM, dan Mitra Kurir.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-12 sm:py-16 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-7 sm:p-10 border border-[var(--border-hairline)] shadow-sm flex flex-col gap-6 text-xs text-[var(--ink-secondary)] leading-relaxed rounded-sm"
        >
          
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] mb-2 tracking-tight">
              1. Ketentuan Donasi Tekstil (ClothDrop)
            </h2>
            <p>
              Donatur wajib memastikan pakaian yang diserahkan dalam keadaan kering dan bebas dari limbah berbahaya atau kimiawi. Setiap 1 kg pakaian yang diserahkan dan diverifikasi petugas berhak atas 100 ClothPoints. ClothLoop berhak menentukan apakah pakaian layak disalurkan, direparasi, atau didaur ulang seratnya.
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] mb-2 tracking-tight">
              2. Jual Beli Preloved & Escrow
            </h2>
            <p>
              Semua transaksi jual beli di katalog Preloved dilindungi rekening bersama escrow ClothLoop. Penjual wajib menyertakan foto asli dan deskripsi kondisi yang jujur. Pembeli berhak mengajukan retur dalam 48 jam sejak paket diterima apabila terbukti ada cacat yang tidak disebutkan di deskripsi produk.
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] mb-2 tracking-tight">
              3. Jasa Rekonstruksi & Rework (ClothCraft)
            </h2>
            <p>
              Estimasi biaya pada kalkulator bersifat indikasi awal. Biaya akhir disepakati antara klien dan perajin setelah inspeksi visual bahan. Pakaian yang telah dipotong atau dijahit ulang sesuai kesepakatan desain tidak dapat dibatalkan secara sepihak.
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] mb-2 tracking-tight">
              4. Poin Reward & Penukaran
            </h2>
            <p>
              ClothPoints tidak dapat diuangkan secara langsung, melainkan dapat ditukarkan dengan voucher diskon mitra ramah lingkungan atau didonasikan untuk program adopsi bibit mangrove pesisir.
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
