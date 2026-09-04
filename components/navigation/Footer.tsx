'use client';

import React from 'react';
import Link from 'next/link';
import { Recycle, ArrowRight } from 'lucide-react';

const footerColumns = [
  {
    title: 'Layanan',
    links: [
      { href: '/drop', label: 'ClothDrop (Donasi)' },
      { href: '/market', label: 'Preloved Marketplace' },
      { href: '/craft', label: 'ClothCraft Studio' },
      { href: '/impact', label: 'Eco Impact & Rewards' },
    ],
  },
  {
    title: 'Kemitraan',
    links: [
      { href: '/partner/drop-box', label: 'Daftar Drop Box' },
      { href: '/partner/artisan', label: 'Mitra Perajin' },
      { href: '/impact', label: 'Tukar Voucher' },
      { href: '/about', label: 'Tentang Gerakan' },
    ],
  },
  {
    title: 'Bantuan & Legal',
    links: [
      { href: '/guide/conditions', label: 'Panduan Kondisi QC' },
      { href: '/escrow', label: 'Garansi & Escrow' },
      { href: '/privacy', label: 'Kebijakan Privasi' },
      { href: '/terms', label: 'Syarat & Ketentuan' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-[var(--surface-muted)] border-t border-[var(--border-hairline)] pb-20 md:pb-0">

      {/* Compact CTA Band */}
      <div className="bg-[var(--forest-deep)] py-8 sm:py-12 text-white">
        <div className="container-site flex flex-col items-center text-center gap-3 max-w-xl mx-auto px-4">
          <span className="label-eyebrow text-white/70 text-[10px]">
            Ekonomi Sirkular Tekstil
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl sm:text-3xl font-bold text-white leading-snug">
            Pakaian lama punya babak kedua.
          </h2>
          <p className="text-xs text-white/75 leading-relaxed max-w-md font-light">
            Bergabung bersama 18.000+ warga sirkular yang memilih merawat masa depan tekstil daripada menimbunnya di TPA.
          </p>
          <Link
            href="/drop"
            className="btn-primary bg-white text-[var(--forest-deep)] hover:bg-white/90 border-white text-xs py-2 px-4 mt-1"
          >
            Mulai Serahkan Pakaian
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-site py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-start">

          {/* Brand Column (Spans 2 on mobile) */}
          <div className="col-span-2 flex flex-col gap-2.5">
            <Link href="/" className="flex items-baseline gap-1 no-underline">
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--forest-deep)]">
                ClothLoop
              </span>
              <span className="text-[11px] font-bold text-[var(--ink-muted)]">
                .id
              </span>
            </Link>
            <p className="text-xs text-[var(--ink-secondary)] leading-relaxed max-w-sm">
              Platform sirkular fashion Indonesia yang mengintegrasikan donasi pakaian, marketplace preloved QC, dan studio rekonstruksi perajin lokal.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-[var(--forest-deep)]">
              <Recycle size={12} />
              <span>Zero Waste to Landfill</span>
            </div>
          </div>

          {/* 3 Link Columns in compact layout */}
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-2">
              <span className="label-eyebrow text-[var(--ink-primary)] font-bold text-[10px]">{col.title}</span>
              <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[var(--ink-secondary)] hover:text-[var(--forest-deep)] transition-colors no-underline block truncate"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-hairline)] mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-[var(--ink-muted)]">
          <p className="m-0 text-center sm:text-left">
            &copy; {new Date().getFullYear()} ClothLoop.id &middot; Platform Sirkular Fashion Indonesia.
          </p>
          <p className="m-0 text-center sm:text-right font-mono text-[10px]">
            Jakarta &middot; Bandung &middot; Surabaya &middot; Bali &middot; Jogja
          </p>
        </div>
      </div>

    </footer>
  );
}
