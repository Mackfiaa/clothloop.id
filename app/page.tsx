'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Recycle, ShoppingBag, Scissors, Award, MapPin, ChevronRight } from 'lucide-react';
import { EcoCalculator } from '@/components/home/EcoCalculator';
import { ConditionBadge } from '@/components/ui/Badge';
import { MOCK_MARKET_ITEMS, MOCK_ARTISANS, MOCK_DROP_POINTS, NATIONAL_IMPACT_METRICS } from '@/lib/constants';
import { formatRupiah, formatNumber } from '@/lib/utils';
import { useApp } from '@/lib/store';

const MARQUEE_STATS = [
  { label: 'kg pakaian diselamatkan', value: '148,920' },
  { label: 'liter air terhemat', value: '402 juta' },
  { label: 'eco-citizens bergabung', value: '18,450+' },
  { label: 'drop points aktif', value: '68' },
  { label: 'artisan terverifikasi', value: '142' },
  { label: 'kg CO₂ dicegah', value: '536,112' },
];

const pillars = [
  {
    num: '01',
    icon: Recycle,
    title: 'ClothDrop',
    sub: 'Donasi & Daur Ulang',
    body: '68+ titik kumpul di kota besar Indonesia. Antar mandiri atau kurir penjemputan — pakaian lamamu mendapat pelacakan QR real-time.',
    href: '/drop',
    bg: 'var(--sage-faint)',
  },
  {
    num: '02',
    icon: ShoppingBag,
    title: 'Preloved',
    sub: 'Marketplace Terkurasi',
    body: 'Setiap item melalui 12 tahap QC, panduan ukuran akurat, dan dilindungi Escrow. Belanja aman, tanpa tipu-tipu.',
    href: '/market',
    bg: 'var(--cream-deep)',
  },
  {
    num: '03',
    icon: Scissors,
    title: 'ClothCraft',
    sub: 'Upcycling & Rework Studio',
    body: 'Hubungkan pakaian rusak dengan artisan spesialis Sashiko, Patchwork, dan Batik Rework. Karya unik, bukan sekadar tambal.',
    href: '/craft',
    bg: 'var(--terracotta-light)',
  },
  {
    num: '04',
    icon: Award,
    title: 'Eco Impact',
    sub: 'Tracker & Rewards',
    body: 'Pantau kontribusi nyata penyelamatan air dan CO₂. Kumpulkan ClothPoints — tukar dengan voucher, kopi, hingga adopsi pohon mangrove.',
    href: '/impact',
    bg: 'var(--golden-light)',
  },
];

export default function HomePage() {
  const { addToCart } = useApp();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', overflow: 'hidden' }}>
        <div className="container-editorial" style={{ paddingTop: '4rem', paddingBottom: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', minHeight: '88vh' }}>

            {/* Left: Editorial text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '5rem' }}>
              <span className="label-caps" style={{ color: 'var(--sage)' }}>
                Platform Sirkular Fashion Indonesia
              </span>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
              }}>
                Pakaian<br />
                <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>lama</em> punya<br />
                cerita baru.
              </h1>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1.0625rem',
                color: 'var(--ink-muted)',
                lineHeight: 1.75,
                maxWidth: '28rem',
                fontWeight: 300,
              }}>
                Donasikan, jual preloved, atau rework bersama artisan lokal. Satu ekosistem sirkular untuk mengurangi limbah tekstil — tanpa mengorbankan estetika.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <Link href="/drop" className="btn-primary">
                  Mulai Drop Baju
                  <ArrowRight size={15} />
                </Link>
                <Link href="/market" className="btn-secondary">
                  Jelajahi Preloved
                </Link>
              </div>

              {/* Trust Strip */}
              <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}>
                {[
                  ['68+', 'Drop Points'],
                  ['142', 'Artisan Mitra'],
                  ['18K+', 'Eco-Citizens'],
                ].map(([v, l]) => (
                  <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.375rem', color: 'var(--forest)' }}>{v}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Tall editorial image — bleeds to bottom */}
            <div style={{ position: 'relative', alignSelf: 'stretch', minHeight: '560px' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--cream-deep)' }} />
              <Image
                src="/hero-portrait.jpg"
                alt="Sustainable fashion editorial"
                fill
                className="object-cover object-top"
                priority
                sizes="50vw"
              />
              {/* Floating eco tag */}
              <div style={{
                position: 'absolute',
                bottom: '2.5rem',
                left: '-1.5rem',
                background: 'var(--white)',
                padding: '1rem 1.375rem',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                zIndex: 10,
              }}>
                <span className="label-caps" style={{ display: 'block', color: 'var(--sage)', marginBottom: '0.25rem' }}>Dampak Pembelian Ini</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--ink)' }}>
                  Hemat 10.800 Liter Air
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ──────────────────────────────── */}
      <section style={{ background: 'var(--forest)', overflow: 'hidden', padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: '4rem', animation: 'marqueeScroll 30s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...MARQUEE_STATS, ...MARQUEE_STATS].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.0625rem', color: '#fff' }}>{s.value}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--sage-light)', fontWeight: 400 }}>{s.label}</span>
              <span style={{ color: 'var(--sage)', fontSize: '0.75rem', marginLeft: '1rem' }}>·</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marqueeScroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── 4 PILLARS — BROKEN GRID ─────────────────────── */}
      <section style={{ background: 'var(--cream)', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container-editorial">
          <div style={{ marginBottom: '3rem' }}>
            <span className="label-caps">Ekosistem Lengkap</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '0.75rem', lineHeight: 1.1, maxWidth: '30rem' }}>
              Satu platform, seluruh siklus hidup pakaian.
            </h2>
          </div>

          {/* 2-row broken grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
            {pillars.map((p, i) => {
              const Icon = p.icon;
              // Broken grid: col spans: 5, 7, 7, 5
              const spans = [5, 7, 7, 5];
              return (
                <Link
                  key={p.num}
                  href={p.href}
                  className="pillar-card"
                  style={{
                    gridColumn: `span ${spans[i]}`,
                    background: p.bg,
                    padding: '2.5rem',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    minHeight: i % 2 === 0 ? '22rem' : '18rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="label-caps" style={{ color: 'var(--ink-muted)' }}>{p.num}</span>
                    <Icon size={22} strokeWidth={1.25} style={{ color: 'var(--ink-secondary)' }} />
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <span className="label-caps" style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '0.5rem' }}>{p.sub}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.875rem', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '0.875rem' }}>{p.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '24rem' }}>{p.body}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Jelajahi</span>
                    <ChevronRight size={14} style={{ color: 'var(--ink)' }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ECO CALCULATOR ─────────────────────────────── */}
      <EcoCalculator />

      {/* ── HERO FLATLAY + PRELOVED DROPS ──────────────── */}
      <section style={{ background: 'var(--cream)', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container-editorial">

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <span className="label-caps">Koleksi Terkurasi</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginTop: '0.5rem', lineHeight: 1.1 }}>
                Preloved pilihan minggu ini
              </h2>
            </div>
            <Link href="/market" className="hover-dim-sm" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--ink-muted)', textDecoration: 'underline', textUnderlineOffset: '3px', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              Lihat semua <ArrowRight size={13} />
            </Link>
          </div>

          {/* Editorial product grid: 1 large + 2 small */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>

            {/* Large card */}
            {MOCK_MARKET_ITEMS[0] && (() => {
              const item = MOCK_MARKET_ITEMS[0];
              return (
                <div
                  key={item.id}
                  style={{ gridColumn: 'span 5' }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--cream-deep)' }} className="img-hover-zoom">
                    <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="42vw" />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                      <ConditionBadge condition={item.condition} />
                    </div>
                    {hoveredItem === item.id && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,14,13,0.35)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                        <button onClick={() => addToCart(item)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--white)', color: 'var(--ink)' }}>
                          Tambah ke Keranjang
                        </button>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.375rem' }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{item.brand} · {item.size}</p>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--ink)' }}>{formatRupiah(item.price)}</span>
                    </div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.9375rem', color: 'var(--ink)', lineHeight: 1.4 }}>{item.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--sage)', marginTop: '0.375rem' }}>Hemat {formatNumber(item.waterSavedLiters)} L air</p>
                  </div>
                </div>
              );
            })()}

            {/* Right column: flatlay image + 2 smaller products stacked */}
            <div style={{ gridColumn: 'span 7', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: '1.5rem' }}>

              {/* Flatlay editorial image — spans full 2 columns top */}
              <div style={{ gridColumn: 'span 2', position: 'relative', aspectRatio: '16/7', overflow: 'hidden', background: 'var(--cream-deep)' }} className="img-hover-zoom">
                <Image src="/hero-flatlay.jpg" alt="Sustainable fashion flatlay" fill className="object-cover" sizes="60vw" />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '2rem', background: 'linear-gradient(to top, rgba(15,14,13,0.55) 0%, transparent 60%)' }}>
                  <div>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.375rem', fontStyle: 'italic', color: '#fff', display: 'block', lineHeight: 1.2 }}>
                      "Pakaian yang merawat bumi,<br/>bukan membebaninya."
                    </span>
                  </div>
                </div>
              </div>

              {/* Products row */}
              {MOCK_MARKET_ITEMS.slice(1, 3).map(item => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--cream-deep)' }} className="img-hover-zoom">
                    <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="30vw" />
                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                      <ConditionBadge condition={item.condition} />
                    </div>
                    {hoveredItem === item.id && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,14,13,0.35)', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}>
                        <button onClick={() => addToCart(item)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--white)', color: 'var(--ink)', padding: '0.625rem 1rem', fontSize: '0.75rem' }}>
                          + Keranjang
                        </button>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '0.75rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{item.size}</p>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)' }}>{formatRupiah(item.price)}</span>
                    </div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTISANS — FULL BLEED DARK ───────────────────── */}
      <section style={{ background: 'var(--forest)', padding: '6rem 0' }}>
        <div className="container-editorial">

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span className="label-caps" style={{ color: 'var(--sage-light)' }}>ClothCraft Studio</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginTop: '0.5rem', lineHeight: 1.1, color: '#ffffff' }}>
                Karya tangan pengrajin<br /><em style={{ fontStyle: 'italic', color: 'var(--sage-light)' }}>daur ulang</em> Nusantara
              </h2>
            </div>
            <Link href="/craft" className="hover-dim-sm" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--sage-light)', textDecoration: 'underline', textUnderlineOffset: '3px', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              Semua artisan <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {MOCK_ARTISANS.map(artisan => (
              <Link key={artisan.id} href="/craft" className="artisan-card-link" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }} className="img-hover-zoom">
                  <Image src={artisan.coverImage} alt={artisan.name} fill className="object-cover" sizes="30vw" />
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--sage-light)', marginBottom: '0.25rem' }}>{artisan.city} · {artisan.yearsOfExperience} tahun</p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', color: '#ffffff', marginBottom: '0.375rem' }}>{artisan.name}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {artisan.specialty.join(' · ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DROP POINT TEASER ───────────────────────────── */}
      <section style={{ background: 'var(--cream)', padding: '6rem 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container-editorial">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <span className="label-caps">68+ Titik Kumpul</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.1 }}>
                Ada ClothDrop<br />
                <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>di dekatmu.</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', color: 'var(--ink-muted)', lineHeight: 1.75, maxWidth: '24rem' }}>
                Jakarta, Bandung, Surabaya, Bali, Yogyakarta — di kafe rekanan, mall, dan bank sampah digital terdekat.
              </p>
              <Link href="/drop" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                Cari Drop Point
                <MapPin size={14} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {MOCK_DROP_POINTS.slice(0, 4).map((pt, i) => (
                <Link
                  key={pt.id}
                  href={`/drop?point=${pt.id}`}
                  className="drop-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem 0',
                    borderBottom: i < 3 ? '1px solid var(--line)' : 'none',
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-muted)', marginBottom: '0.25rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{pt.city} · {pt.category}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 500, color: 'var(--ink)' }}>{pt.name}</p>
                  </div>
                  <ArrowRight size={16} strokeWidth={1.5} style={{ color: 'var(--ink-faint)', flexShrink: 0, marginLeft: '1rem' }} />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
