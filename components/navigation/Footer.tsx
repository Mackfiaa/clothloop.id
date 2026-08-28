'use client';

import React from 'react';
import Link from 'next/link';
import { Recycle, ArrowRight } from 'lucide-react';

const cols = [
  {
    title: 'Platform',
    links: [
      { href: '/drop', label: 'ClothDrop — Donasi & Daur Ulang' },
      { href: '/market', label: 'Preloved Marketplace' },
      { href: '/craft', label: 'Craft Studio & Upcycling' },
      { href: '/impact', label: 'Eco Impact & Rewards' },
    ],
  },
  {
    title: 'Mitra & Komunitas',
    links: [
      { href: '/drop', label: 'Daftarkan Drop-Point' },
      { href: '/craft', label: 'Bergabung sebagai Artisan' },
      { href: '/impact', label: 'Redeem ClothPoints' },
      { href: '/', label: 'Tentang ClothLoop' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/', label: 'Kebijakan Privasi' },
      { href: '/', label: 'Syarat & Ketentuan' },
      { href: '/', label: 'Escrow & Proteksi Pembeli' },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: 'var(--cream-deep)', borderTop: '1px solid var(--line)' }}>

      {/* CTA Band */}
      <div style={{ background: 'var(--forest)', padding: '4rem 0' }}>
        <div className="container-editorial" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
          <span className="label-caps" style={{ color: 'var(--sage-light)' }}>
            Ekonomi Sirkular Fashion
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', maxWidth: '34rem', lineHeight: 1.12 }}>
            Setiap helai pakaian punya babak kedua.
          </h2>
          <p style={{ color: 'rgba(200,221,209,0.8)', fontSize: '0.9375rem', maxWidth: '28rem', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
            Bergabung bersama 18.000+ eco-citizens Indonesia yang memilih sirkularitas atas landfill.
          </p>
          <Link href="/drop" className="btn-primary" style={{ background: 'var(--sage-light)', color: 'var(--forest)', marginTop: '0.5rem' }}>
            Mulai Drop Baju
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-editorial" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem' }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: '1 / span 1' }}>
            <div>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.25rem', color: 'var(--forest)' }}>
                  ClothLoop<span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 500 }}>.id</span>
                </span>
              </Link>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", maxWidth: '18rem' }}>
              Platform sirkular fashion Indonesia yang menghubungkan donasi pakaian, preloved terkurasi, dan studio rework artisan lokal.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Recycle size={14} style={{ color: 'var(--sage)' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: 'var(--sage)', letterSpacing: '0.04em' }}>
                ZERO WASTE TO LANDFILL
              </span>
            </div>
          </div>

          {/* Nav Columns */}
          {cols.map((col) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <span className="label-caps">{col.title}</span>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.8125rem',
                    color: 'var(--ink-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--line)', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
            © 2026 ClothLoop.id — Platform Ekonomi Sirkular Tekstil Indonesia
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
            halo@clothloop.id · +62 812-8899-1001
          </span>
        </div>
      </div>
    </footer>
  );
}
