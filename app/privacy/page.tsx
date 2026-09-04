'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="overflow-x-hidden">

      {/* Header */}
      <div className="bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-12 sm:py-16">
        <div className="container-site">
          <span className="label-eyebrow text-[var(--forest-deep)] block mb-1">Dokumen Legal</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-5xl font-bold text-[var(--ink-primary)] leading-tight max-w-2xl">
            Kebijakan Privasi Data.
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2 max-w-xl leading-relaxed">
            Pembaruan Terakhir: September 2026. Kami berkomitmen menjaga keamanan data pribadi seluruh anggota ekosistem ClothLoop.id.
          </p>
        </div>
      </div>

      <div className="container-site py-10 sm:py-16 max-w-3xl">
        <div className="bg-white p-6 sm:p-10 border border-[var(--border-hairline)] flex flex-col gap-6 text-xs text-[var(--ink-secondary)] leading-relaxed">
          
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-2">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p>
              Saat Anda mendaftar atau menggunakan layanan ClothLoop, kami mengumpulkan data yang Anda berikan secara langsung, termasuk nama lengkap, alamat email, nomor telepon/WhatsApp, alamat penjemputan atau pengiriman pakaian, serta preferensi peran akun (Eco-Citizen, Seller, UMKM, atau Mitra Kurir).
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-2">
              2. Penggunaan Informasi
            </h2>
            <p>
              Informasi Anda digunakan semata-mata untuk:
            </p>
            <ul className="list-disc pl-5 mt-1.5 flex flex-col gap-1">
              <li>Memproses penyerahan donasi pakaian dan mengkalkulasi reward ClothPoints secara akurat.</li>
              <li>Mengatur jadwal penjemputan oleh armada kurir atau mitra drop-point rekanan.</li>
              <li>Menghubungkan Anda dengan master perajin ClothCraft untuk konsultasi rekonstruksi pakaian.</li>
              <li>Memverifikasi transaksi jual beli preloved di bawah proteksi sistem rekening bersama (escrow).</li>
              <li>Menghitung metrik audit lingkungan (liter air dihemat dan kilogram emisi CO₂ dicegah).</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-2">
              3. Keamanan & Kerahasiaan Data
            </h2>
            <p>
              Kami tidak pernah menjual atau menyewakan data pribadi Anda kepada pihak ketiga manapun untuk tujuan periklanan. Semua data transaksi dan autentikasi disimpan menggunakan enkripsi tingkat lanjut di database Supabase PostgreSQL dengan Row-Level Security (RLS).
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-2">
              4. Kontak Pengelola Data
            </h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai data pribadi Anda atau ingin mengajukan penghapusan akun, Anda dapat menghubungi tim perlindungan data kami melalui email di <strong className="text-[var(--ink-primary)]">privacy@clothloop.id</strong>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
