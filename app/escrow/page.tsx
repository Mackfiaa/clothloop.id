'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { BackgroundDecor } from '@/components/ui/BackgroundDecor';

export default function EscrowPage() {
  return (
    <div className="relative overflow-x-hidden">

      {/* Header */}
      <div className="relative bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-14 sm:py-20 overflow-hidden">
        <BackgroundDecor variant="impact" />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="label-eyebrow text-[var(--forest-deep)] block mb-1.5">Keamanan Transaksi</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--ink-primary)] leading-tight max-w-2xl tracking-tight">
              Proteksi Escrow & Garansi 100%.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 max-w-xl leading-relaxed">
              Belanja pakaian preloved dan pesan jasa rekonstruksi artisan tanpa rasa khawatir dengan sistem rekening bersama escrow ClothLoop.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-12 sm:py-16 flex flex-col gap-12">

        {/* 1. Tiga Pilar Proteksi */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="card-clean p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="w-10 h-10 rounded-xs bg-[var(--forest-subtle)] text-[var(--forest-deep)] flex items-center justify-center mb-4">
                <Lock size={20} />
              </div>
              <h3 className="text-lg font-bold text-[var(--ink-primary)] mb-1.5 tracking-tight">
                Dana Tertahan Aman
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Pembayaran Anda disimpan di rekening penampung resmi ClothLoop dan tidak akan diteruskan ke penjual/perajin sampai Anda menerima dan memeriksa barang.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--forest-deep)] font-bold pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              Rekening Bersama Resmi
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card-clean p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="w-10 h-10 rounded-xs bg-[var(--forest-subtle)] text-[var(--forest-deep)] flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold text-[var(--ink-primary)] mb-1.5 tracking-tight">
                Jendela Inspeksi 48 Jam
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Anda memiliki waktu 2x24 jam sejak kurir mengantarkan paket untuk memeriksa kesesuaian kondisi pakaian, ukuran cm, dan keaslian material.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--forest-deep)] font-bold pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              Garansi Kondisi & Ukuran
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-clean p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="w-10 h-10 rounded-xs bg-[var(--forest-subtle)] text-[var(--forest-deep)] flex items-center justify-center mb-4">
                <RefreshCw size={20} />
              </div>
              <h3 className="text-lg font-bold text-[var(--ink-primary)] mb-1.5 tracking-tight">
                100% Pengembalian Dana
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Jika barang terbukti cacat tersembunyi yang tidak tertera di deskripsi atau tidak lolos QC, dana Anda kami kembalikan 100% tanpa potongan.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--forest-deep)] font-bold pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              Klaim Retur Cepat
            </span>
          </motion.div>
        </section>

        {/* 2. Alur Pembayaran */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 sm:p-10 border border-[var(--border-hairline)] shadow-sm"
        >
          <div className="max-w-md mb-6">
            <span className="label-eyebrow text-[var(--forest-deep)]">Alur Kerja Escrow</span>
            <h2 className="text-2xl font-extrabold text-[var(--ink-primary)] mt-1 tracking-tight">
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
        </motion.section>

      </div>
    </div>
  );
}
