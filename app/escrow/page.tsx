'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

export default function EscrowPage() {
  return (
    <div className="overflow-x-hidden">

      {/* Header */}
      <div className="bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-12 sm:py-16">
        <div className="container-site">
          <span className="label-eyebrow text-[var(--forest-deep)] block mb-1">Keamanan Transaksi</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-5xl font-bold text-[var(--ink-primary)] leading-tight max-w-2xl">
            Proteksi Escrow & Garansi 100%.
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2 max-w-xl leading-relaxed">
            Belanja pakaian preloved dan pesan jasa rekonstruksi artisan tanpa rasa khawatir dengan sistem rekening bersama escrow ClothLoop.
          </p>
        </div>
      </div>

      <div className="container-site py-10 sm:py-16 flex flex-col gap-12">

        {/* 1. Tiga Pilar Proteksi */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-clean p-6 flex flex-col justify-between gap-3">
            <div>
              <Lock size={22} className="text-[var(--forest-deep)] mb-3" />
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-1">
                Dana Tertahan Aman
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Pembayaran Anda disimpan di rekening penampung resmi ClothLoop dan tidak akan diteruskan ke penjual/perajin sampai Anda menerima dan memeriksa barang.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--forest-deep)] font-semibold pt-2 border-t border-[var(--border-hairline)]">
              Rekening Bersama Resmi
            </span>
          </div>

          <div className="card-clean p-6 flex flex-col justify-between gap-3">
            <div>
              <ShieldCheck size={22} className="text-[var(--forest-deep)] mb-3" />
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-1">
                Jendela Inspeksi 48 Jam
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Anda memiliki waktu 2x24 jam sejak kurir mengantarkan paket untuk memeriksa kesesuaian kondisi pakaian, ukuran cm, dan keaslian material.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--forest-deep)] font-semibold pt-2 border-t border-[var(--border-hairline)]">
              Garansi Kondisi & Ukuran
            </span>
          </div>

          <div className="card-clean p-6 flex flex-col justify-between gap-3">
            <div>
              <RefreshCw size={22} className="text-[var(--forest-deep)] mb-3" />
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-1">
                100% Pengembalian Dana
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Jika barang terbukti cacat tersembunyi yang tidak tertera di deskripsi atau tidak lolos QC, dana Anda kami kembalikan 100% tanpa potongan.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--forest-deep)] font-semibold pt-2 border-t border-[var(--border-hairline)]">
              Klaim Retur Cepat
            </span>
          </div>
        </section>

        {/* 2. Alur Pembayaran */}
        <section className="bg-white p-6 sm:p-10 border border-[var(--border-hairline)]">
          <div className="max-w-md mb-6">
            <span className="label-eyebrow text-[var(--forest-deep)]">Alur Kerja Escrow</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[var(--ink-primary)] mt-1">
              Bagaimana Dana Anda Dilindungi?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-[var(--ink-secondary)]">
            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
              <span className="font-mono text-xs font-bold text-[var(--forest-deep)] block mb-1">01 / CHECKOUT</span>
              <strong className="text-[var(--ink-primary)] block mb-1">Pembayaran Terverifikasi</strong>
              Pembeli membayar pesanan, dana masuk ke rekening penampung escrow ClothLoop.
            </div>
            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
              <span className="font-mono text-xs font-bold text-[var(--forest-deep)] block mb-1">02 / PENGIRIMAN</span>
              <strong className="text-[var(--ink-primary)] block mb-1">Kurir Mengantar Paket</strong>
              Penjual mengirim pakaian yang telah lolos QC ke alamat pembeli dengan nomor resi terintegrasi.
            </div>
            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
              <span className="font-mono text-xs font-bold text-[var(--forest-deep)] block mb-1">03 / INSPEKSI</span>
              <strong className="text-[var(--ink-primary)] block mb-1">Cek Fisik 48 Jam</strong>
              Pembeli memeriksa barang. Jika sesuai, pembeli mengklik &ldquo;Konfirmasi Terima&rdquo;.
            </div>
            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
              <span className="font-mono text-xs font-bold text-[var(--forest-deep)] block mb-1">04 / PELEPASAN</span>
              <strong className="text-[var(--forest-deep)] block mb-1">Dana Diteruskan</strong>
              ClothLoop meneruskan pembayaran ke saldo penjual/perajin dan menerbitkan poin reward.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
