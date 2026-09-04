'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Recycle, 
  ShoppingBag, 
  Scissors, 
  Award, 
  MapPin, 
  Droplets, 
  Wind, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EcoCalculator } from '@/components/home/EcoCalculator';
import { CardSlideshow, SlideItem } from '@/components/ui/CardSlideshow';
import { ConditionBadge } from '@/components/ui/Badge';
import { formatRupiah, formatNumber } from '@/lib/utils';
import { useApp } from '@/lib/store';
import { fetchMarketItems, fetchArtisans, fetchDropPoints } from '@/lib/supabase/data';
import { MarketItem, ArtisanProfile, DropPoint } from '@/lib/types';

// Dynamically import OpenStreetMap component to prevent SSR hydration errors
const DropPointMap = dynamic(
  () => import('@/components/map/DropPointMap').then((mod) => mod.DropPointMap),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: '300px', background: 'var(--surface-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-muted)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem' }}>
        Memuat OpenStreetMap...
      </div>
    ),
  }
);

const HERO_SLIDES: SlideItem[] = [
  {
    id: 'hs-1',
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=80',
    tag: 'Craft Studio',
    title: 'Sashiko Denim Kimono',
    subtitle: 'Rework 2 denim usang oleh Studio BoroBoro',
  },
  {
    id: 'hs-2',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    tag: 'Drop Hub',
    title: 'Senopati Collection Point',
    subtitle: 'Titik serah mandiri rekanan kafe Jaksel',
  },
  {
    id: 'hs-3',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tag: 'Preloved QC',
    title: 'Upcycled Utility Bag',
    subtitle: 'Material denim tebal terverifikasi kurasi',
  },
];

const LIFECYCLE_STEPS = [
  {
    id: 'step-1',
    step: '01',
    icon: Recycle,
    title: 'Donasi & Kumpulkan',
    desc: 'Serahkan pakaian tak terpakai ke 68+ titik rekanan atau panggil kurir penjemputan dari rumah.',
    metric: '+100 poin per kg',
  },
  {
    id: 'step-2',
    step: '02',
    icon: Scissors,
    title: 'Kurasi & Rework Studio',
    desc: 'Pakaian layak masuk katalog preloved, pakaian rusak dirombak oleh master perajin lokal.',
    metric: 'Hemat 2.700L air / kg',
  },
  {
    id: 'step-3',
    step: '03',
    icon: ShoppingBag,
    title: 'Marketplace & Rewards',
    desc: 'Belanja pakaian QC bergaransi escrow atau tukarkan poin dengan voucher mitra ramah bumi.',
    metric: 'Proteksi escrow 100%',
  },
];

const PILLARS = [
  {
    num: '01',
    icon: Recycle,
    title: 'ClothDrop',
    sub: 'Donasi Tekstil',
    body: 'Titik serah mandiri dan jemput kurir dengan pelacakan transparan.',
    href: '/drop',
  },
  {
    num: '02',
    icon: ShoppingBag,
    title: 'Preloved',
    sub: 'Marketplace QC',
    body: 'Katalog pakaian bekas terkurasi dengan jaminan kondisi dan ukuran.',
    href: '/market',
  },
  {
    num: '03',
    icon: Scissors,
    title: 'ClothCraft',
    sub: 'Studio Rework',
    body: 'Layanan reparasi dan sulam tangan bersama perajin daur ulang.',
    href: '/craft',
  },
  {
    num: '04',
    icon: Award,
    title: 'Eco Impact',
    sub: 'Audit Poin',
    body: 'Catatan penghematan air, emisi, dan saldo poin reward.',
    href: '/impact',
  },
];

export default function HomePage() {
  const { addToCart } = useApp();
  const [marketItems, setMarketItems] = useState<MarketItem[]>([]);
  const [artisans, setArtisans] = useState<ArtisanProfile[]>([]);
  const [dropPoints, setDropPoints] = useState<DropPoint[]>([]);
  const [selectedPointId, setSelectedPointId] = useState<string>('');
  const [activeStepTab, setActiveStepTab] = useState(0);

  useEffect(() => {
    fetchMarketItems().then(setMarketItems);
    fetchArtisans().then(setArtisans);
    fetchDropPoints().then(data => {
      setDropPoints(data);
      if (data.length > 0) setSelectedPointId(data[0].id);
    });
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ── 1. HERO SECTION ───────────────────────────── */}
      <section className="bg-[var(--surface-main)] border-b border-[var(--border-hairline)]">
        <div className="container-site py-8 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* Left Manifesto */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="label-eyebrow text-[var(--forest-deep)]">
                Inisiatif Sirkular Fashion Indonesia
              </span>

              <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--ink-primary)] leading-[1.1] tracking-tight">
                Memperpanjang siklus hidup pakaian.
              </h1>

              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed max-w-lg font-normal">
                ClothLoop menghubungkan donasi pakaian tak terpakai, kurasi preloved bergaransi, dan studio rekonstruksi tekstil untuk mengurangi beban sampah TPA.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <Link href="/drop" className="btn-primary justify-center text-xs py-2.5 px-4">
                  <Recycle size={13} />
                  Serahkan Pakaian
                </Link>
                <Link href="/market" className="btn-secondary justify-center text-xs py-2.5 px-4">
                  Katalog Preloved
                  <ArrowRight size={12} />
                </Link>
              </div>

              {/* Factual Statistics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--border-hairline)] text-xs">
                <div>
                  <strong className="text-[var(--forest-deep)] font-serif text-base sm:text-lg block font-bold">148.9 T</strong>
                  <span className="text-[10px] sm:text-xs text-[var(--ink-muted)]">Tekstil Dikelola</span>
                </div>
                <div>
                  <strong className="text-[var(--forest-deep)] font-serif text-base sm:text-lg block font-bold">402M L</strong>
                  <span className="text-[10px] sm:text-xs text-[var(--ink-muted)]">Air Dihemat</span>
                </div>
                <div>
                  <strong className="text-[var(--forest-deep)] font-serif text-base sm:text-lg block font-bold">18.4K+</strong>
                  <span className="text-[10px] sm:text-xs text-[var(--ink-muted)]">Anggota Terdaftar</span>
                </div>
              </div>
            </div>

            {/* Right Slideshow */}
            <div className="lg:col-span-5">
              <CardSlideshow
                slides={HERO_SLIDES}
                aspectRatio="aspect-[16/11] sm:aspect-[4/3]"
                autoPlay={true}
                interval={5000}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. THREE-STEP LIFECYCLE ───────────────────── */}
      <section className="bg-white py-8 sm:py-12 border-b border-[var(--border-hairline)]">
        <div className="container-site">

          <div className="max-w-md mb-6">
            <span className="label-eyebrow block mb-1">Alur Kerja Platform</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl sm:text-2xl font-bold text-[var(--ink-primary)]">
              Satu ekosistem untuk siklus pakaian.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {LIFECYCLE_STEPS.map((s, idx) => {
              const Icon = s.icon;
              const isActive = activeStepTab === idx;
              return (
                <div
                  key={s.id}
                  onClick={() => setActiveStepTab(idx)}
                  className={`p-4 sm:p-5 border transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                    isActive ? 'bg-[var(--surface-muted)] border-[var(--forest-deep)]' : 'bg-white border-[var(--border-hairline)] hover:border-gray-400'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs font-bold text-[var(--ink-muted)]">{s.step}</span>
                      <Icon size={15} className="text-[var(--forest-deep)]" />
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-bold text-[var(--ink-primary)] mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--border-hairline)] text-[11px] font-semibold text-[var(--forest-deep)]">
                    {s.metric}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 3. FOUR PILLARS ───────────────────────────── */}
      <section className="bg-[var(--surface-main)] py-8 sm:py-12">
        <div className="container-site">

          <div className="mb-6">
            <span className="label-eyebrow">Navigasi Layanan</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl sm:text-2xl font-bold text-[var(--ink-primary)] mt-0.5">
              Jelajahi fitur sirkular.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.num}
                  href={p.href}
                  className="card-clean p-4 sm:p-5 flex flex-col justify-between gap-3 no-underline"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono text-[var(--ink-muted)]">{p.num}</span>
                      <Icon size={14} className="text-[var(--forest-deep)]" />
                    </div>
                    <span className="label-eyebrow block text-[10px] mb-0.5">{p.sub}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-bold text-[var(--ink-primary)] mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                      {p.body}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--forest-deep)] pt-2 border-t border-[var(--border-hairline)]">
                    Buka Halaman <ArrowRight size={10} />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 4. ECO CALCULATOR COMPONENT ───────────────── */}
      <EcoCalculator />

      {/* ── 5. CURATED PRELOVED ───────────────────────── */}
      <section className="bg-[var(--surface-main)] py-8 sm:py-12">
        <div className="container-site">

          <div className="flex justify-between items-end mb-5">
            <div>
              <span className="label-eyebrow">Kurasi Preloved</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl sm:text-2xl font-bold text-[var(--ink-primary)] mt-0.5">
                Katalog pilihan terverifikasi.
              </h2>
            </div>
            <Link href="/market" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-primary)] hover:text-[var(--forest-deep)] flex items-center gap-1">
              Semua Produk <ArrowRight size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {marketItems.slice(0, 4).map((item) => (
              <div key={item.id} className="card-clean p-2 sm:p-2.5 flex flex-col justify-between gap-1.5 group">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--surface-muted)]">
                  <Image
                    src={item.images[0] || '/hero-portrait.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute top-1.5 left-1.5">
                    <ConditionBadge condition={item.condition} />
                  </div>
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex justify-between text-[10px] text-[var(--ink-muted)]">
                    <span className="truncate max-w-[65%]">{item.brand}</span>
                    <span className="font-semibold text-[var(--ink-primary)]">{item.size}</span>
                  </div>

                  <h4 className="font-semibold text-xs text-[var(--ink-primary)] line-clamp-1">
                    {item.title}
                  </h4>

                  <div className="flex justify-between items-center pt-1 border-t border-[var(--border-hairline)] mt-0.5">
                    <span style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-xs sm:text-sm text-[var(--ink-primary)]">
                      {formatRupiah(item.price)}
                    </span>
                    <span className="text-[9px] text-[var(--forest-deep)] font-semibold flex items-center gap-0.5">
                      <Droplets size={9} /> {formatNumber(item.waterSavedLiters)} L
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="btn-primary text-[10px] py-1 justify-center w-full mt-0.5"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. OPENSTREETMAP SECTION ──────────────────── */}
      <section className="bg-white py-8 sm:py-12 border-t border-[var(--border-hairline)]">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="label-eyebrow">Jaringan Titik Kumpul</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl sm:text-2xl font-bold text-[var(--ink-primary)]">
                Temukan ClothDrop terdekat.
              </h2>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Antar pakaian ke kafe rekanan, pusat perbelanjaan, atau bank sampah digital di kota besar Indonesia.
              </p>

              <div className="flex flex-col border border-[var(--border-hairline)] divide-y divide-[var(--border-hairline)] mt-1">
                {dropPoints.slice(0, 3).map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPointId(pt.id)}
                    className="p-2.5 text-left bg-transparent border-none cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="text-[9px] text-[var(--ink-muted)] uppercase tracking-wider block font-semibold">{pt.city} &middot; {pt.category}</span>
                      <span className="text-xs font-semibold text-[var(--ink-primary)]">{pt.name}</span>
                    </div>
                    <ArrowRight size={11} className="text-gray-400" />
                  </button>
                ))}
              </div>

              <Link href="/drop" className="btn-primary w-fit text-xs py-2 px-3 mt-1">
                <MapPin size={12} /> Buka Peta Lengkap
              </Link>
            </div>

            <div className="lg:col-span-7">
              <DropPointMap
                points={dropPoints}
                selectedPointId={selectedPointId}
                onSelectPoint={(id) => setSelectedPointId(id)}
                height="280px"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
