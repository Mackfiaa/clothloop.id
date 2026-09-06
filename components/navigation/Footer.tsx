'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
      { href: '/auth/register', label: 'Mitra Perajin (Daftar)' },
      { href: '/partner/drop-box', label: 'Daftar Drop Box' },
      { href: '/impact', label: 'Poin & Dampak' },
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
  const pathname = usePathname();
  const isPortal = pathname.startsWith('/seller') || pathname.startsWith('/craftsman') || pathname.startsWith('/courier') || pathname.startsWith('/admin');
  if (isPortal) return null;

  return (
    <footer className="w-full bg-[var(--surface-muted)] border-t border-[var(--border-hairline)] pb-20 md:pb-0">

      {/* Main Footer Content */}
      <div className="container-site py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-start">

          {/* Brand Column (Spans 2 on mobile) */}
          <div className="col-span-2 flex flex-col gap-2.5">
            <Link href="/" className="flex items-baseline gap-1 no-underline">
              <span className="text-lg font-extrabold text-[var(--forest-deep)]">
                ClothLoop
              </span>
              <span className="text-[11px] font-bold text-[var(--ink-muted)]">
                .id
              </span>
            </Link>
            <p className="text-xs text-[var(--ink-secondary)] leading-relaxed max-w-sm">
              Platform pengelolaan pakaian bekas terpadu untuk donasi pakaian, jual beli preloved terkurasi, dan kerajinan upcycling karya UMKM lokal.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-[var(--forest-deep)]">
              <Recycle size={12} />
              <span>Gerakan Peduli Lingkungan & Komunitas</span>
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
            &copy; {new Date().getFullYear()} ClothLoop.id &middot; Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </div>

    </footer>
  );
}
