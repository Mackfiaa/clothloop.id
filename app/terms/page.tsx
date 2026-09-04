'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="overflow-x-hidden">

      {/* Header */}
      <div className="bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-12 sm:py-16">
        <div className="container-site">
          <span className="label-eyebrow text-[var(--forest-deep)] block mb-1">Dokumen Legal</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-5xl font-bold text-[var(--ink-primary)] leading-tight max-w-2xl">
            Syarat & Ketentuan Layanan.
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2 max-w-xl leading-relaxed">
            Pembaruan Terakhir: September 2026. Ketentuan penggunaan platform ClothLoop.id bagi Donatur, Pembeli, Penjual, UMKM, dan Mitra Kurir.
          </p>
        </div>
      </div>

      <div className="container-site py-10 sm:py-16 max-w-3xl">
        <div className="bg-white p-6 sm:p-10 border border-[var(--border-hairline)] flex flex-col gap-6 text-xs text-[var(--ink-secondary)] leading-relaxed">
          
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-2">
              1. Ketentuan Donasi Tekstil (ClothDrop)
            </h2>
            <p>
              Donatur wajib memastikan pakaian yang diserahkan dalam keadaan kering dan bebas dari limbah berbahaya/kimiawi. Setiap 1 kg pakaian yang diserahkan dan diverifikasi petugas berhak atas 100 ClothPoints. ClothLoop berhak menentukan apakah pakaian layak disalurkan, direparasi, atau didaur ulang seratnya.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-2">
              2. Jual Beli Preloved & Escrow
            </h2>
            <p>
              Semua transaksi jual beli di katalog Preloved dilindungi rekening bersama escrow ClothLoop. Penjual wajib menyertakan foto asli dan deskripsi kondisi yang jujur. Pembeli berhak mengajukan retur dalam 48 jam sejak paket diterima apabila terbukti ada cacat yang tidak disebutkan di deskripsi produk.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-2">
              3. Jasa Rekonstruksi & Rework (ClothCraft)
            </h2>
            <p>
              Estimasi biaya pada kalkulator bersifat indikasi awal. Biaya akhir disepakati antara klien dan perajin setelah inspeksi visual bahan. Pakaian yang telah dipotong/dijahit ulang sesuai kesepakatan desain tidak dapat dibatalkan secara sepihak.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-2">
              4. Poin Reward & Penukaran
            </h2>
            <p>
              ClothPoints tidak dapat diuangkan secara langsung, melainkan dapat ditukarkan dengan voucher diskon mitra ramah lingkungan atau didonasikan untuk program adopsi bibit mangrove pesisir.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
