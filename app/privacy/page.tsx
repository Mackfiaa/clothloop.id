'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundDecor } from '@/components/ui/BackgroundDecor';

export default function PrivacyPage() {
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
              Kebijakan Privasi Data.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 max-w-xl leading-relaxed">
              Pembaruan Terakhir: September 2026. Kami berkomitmen menjaga keamanan data pribadi seluruh anggota ekosistem ClothLoop.id.
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
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p>
              Saat Anda mendaftar atau menggunakan layanan ClothLoop, kami mengumpulkan data yang Anda berikan secara langsung, termasuk nama lengkap, alamat email, nomor telepon atau WhatsApp, alamat penjemputan atau pengiriman pakaian, serta preferensi peran akun (Eco-Citizen, Seller, UMKM, atau Mitra Kurir).
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] mb-2 tracking-tight">
              2. Penggunaan Informasi
            </h2>
            <p>
              Informasi Anda digunakan semata-mata untuk keperluan operasional sirkular:
            </p>
            <ul className="list-disc pl-5 mt-1.5 flex flex-col gap-1.5">
              <li>Memproses penyerahan donasi pakaian dan mengkalkulasi reward ClothPoints secara akurat.</li>
              <li>Mengatur jadwal penjemputan oleh armada kurir atau mitra drop-point rekanan.</li>
              <li>Menghubungkan Anda dengan master perajin ClothCraft untuk konsultasi rekonstruksi pakaian.</li>
              <li>Memverifikasi transaksi jual beli preloved di bawah proteksi sistem rekening bersama (escrow).</li>
              <li>Menghitung metrik audit lingkungan (liter air dihemat dan kilogram emisi CO₂ dicegah).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] mb-2 tracking-tight">
              3. Keamanan & Kerahasiaan Data
            </h2>
            <p>
              Kami tidak pernah menjual atau menyewakan data pribadi Anda kepada pihak ketiga manapun untuk tujuan periklanan. Semua data transaksi dan autentikasi disimpan menggunakan enkripsi tingkat lanjut di database Supabase PostgreSQL dengan Row-Level Security (RLS).
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] mb-2 tracking-tight">
              4. Kontak Pengelola Data
            </h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai data pribadi Anda atau ingin mengajukan penghapusan akun, Anda dapat menghubungi tim perlindungan data kami melalui email di <strong className="text-[var(--ink-primary)]">privacy@clothloop.id</strong>.
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
