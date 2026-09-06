'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
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
  CheckCircle2,
  Zap,
  Building2
} from 'lucide-react';
import { EcoCalculator } from '@/components/home/EcoCalculator';
import { TextileWasteChart } from '@/components/home/TextileWasteChart';
import { LeaderboardPodium } from '@/components/home/LeaderboardPodium';
import { CraftShowcase } from '@/components/home/CraftShowcase';
import { CardSlideshow, SlideItem } from '@/components/ui/CardSlideshow';
import { formatNumber } from '@/lib/utils';
import { fetchDropPoints } from '@/lib/supabase/data';
import { DropPoint } from '@/lib/types';
import { BackgroundDecor } from '@/components/ui/BackgroundDecor';

const DropPointMap = dynamic(
  () => import('@/components/map/DropPointMap').then((mod) => mod.DropPointMap),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: '340px', background: 'var(--surface-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-muted)', fontSize: '0.8125rem' }}>
        Memuat OpenStreetMap Titik Kumpul...
      </div>
    ),
  }
);

const PLATFORM_PERFORMANCE_SLIDES: SlideItem[] = [
  {
    id: 'perf-1',
    image: '/images/hero/hero-waste-mountain.jpg',
    tag: '148.9 Ton Pakaian Terkelola',
    title: 'Penyelamatan 148.9 Ton Pakaian dari TPA',
    subtitle: 'Disalurkan ke 140+ studio perajin lokal dan mitra daur ulang bersama 18.400+ donatur di berbagai kota.',
  },
  {
    id: 'perf-2',
    image: '/images/hero/hero-thrift-box.jpg',
    tag: 'Pakaian Preloved Terkurasi',
    title: 'Kurasi & Pengemasan Pakaian Siap Pakai',
    subtitle: 'Setiap helai pakaian disortir teliti, lolos uji QC standar tinggi, dan siap memiliki babak kedua.',
  },
  {
    id: 'perf-3',
    image: '/images/hero/hero-sewing-artisan.jpg',
    tag: '140+ Mitra UMKM Penjahit',
    title: 'Rekonstruksi & Daur Ulang Kain Perca',
    subtitle: 'Pemberdayaan penjahit lokal untuk mentransformasi limbah kain menjadi produk bernilai ekonomi tinggi.',
  },
  {
    id: 'perf-4',
    image: '/images/hero/hero-craft-handmade.jpg',
    tag: 'Karya Kriya Upcycling',
    title: 'Kreasi Produk Kerajinan Siap Beli',
    subtitle: 'Pouch, tas, dan aksesoris estetik buatan tangan perajin lokal binaan ClothLoop.',
  },
];

const LIFECYCLE_STEPS = [
  {
    id: 'step-1',
    step: '01',
    icon: Recycle,
    title: 'Donasi & Kumpulkan',
    desc: 'Antar pakaian ke 180+ titik rekanan drop box atau pesan kurir penjemputan dari rumah.',
    metric: '300 - 3.000 Pts / helai',
  },
  {
    id: 'step-2',
    step: '02',
    icon: Scissors,
    title: 'Kurasi & Penjualan Kerajinan',
    desc: 'Pakaian afkir disulap menjadi aneka produk kerajinan siap beli (tas, outer, topi, dekorasi) oleh UMKM.',
    metric: '100% Upcycled Karya Tangan',
  },
  {
    id: 'step-3',
    step: '03',
    icon: ShoppingBag,
    title: 'Marketplace & Rewards',
    desc: 'Belanja kerajinan tekstil dan pakaian preloved bergaransi atau tukarkan poin menjadi potongan belanja.',
    metric: 'Garansi Escrow 100%',
  },
];

const PILLARS = [
  {
    num: '01',
    icon: Recycle,
    title: 'ClothDrop',
    sub: 'Donasi Tekstil',
    body: 'Titik serah mandiri dan jemput kurir dengan reward 300 - 3.000 ClothPoints.',
    href: '/drop',
    tag: 'Hingga 3.000 Pts',
  },
  {
    num: '02',
    icon: ShoppingBag,
    title: 'Preloved',
    sub: 'Marketplace QC',
    body: 'Pakaian bekas terkurasi dengan jaminan kebersihan, kondisi, dan ukuran pasti.',
    href: '/market',
    tag: 'Garansi Escrow',
  },
  {
    num: '03',
    icon: Scissors,
    title: 'ClothCraft',
    sub: 'Penjualan Kerajinan',
    body: 'Beli aneka produk upcycling siap pakai (tas, baju boro, topi) karya artisan & UMKM lokal binaan.',
    href: '/craft',
    tag: 'Siap Kirim',
  },
  {
    num: '04',
    icon: Award,
    title: 'Eco Impact',
    sub: 'Audit & Portofolio',
    body: 'Catatan penghematan air, emisi karbon, dan saldo reward Anda.',
    href: '/impact',
    tag: 'Adopsi Mangrove',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

export default function HomePage() {
  const [dropPoints, setDropPoints] = useState<DropPoint[]>([]);
  const [selectedPointId, setSelectedPointId] = useState<string>('');
  const [activeStepTab, setActiveStepTab] = useState(0);

  useEffect(() => {
    fetchDropPoints().then(data => {
      setDropPoints(data);
    });
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ── 1. HERO SECTION (MODERN ECO-GREEN GRADIENT) ────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-[#053d2f] via-[#04563e] to-[#022c22] border-b border-emerald-900/30 overflow-hidden text-white">
        {/* Modern Ambient Mesh, Radial Glows & Circular Contour Rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Top-left Emerald Luminous Orb */}
          <div 
            className="absolute -top-32 -left-28 w-[38rem] h-[38rem] rounded-full blur-3xl opacity-35" 
            style={{ background: 'radial-gradient(circle, #10b981 0%, #059669 45%, transparent 70%)' }}
          />
          {/* Bottom-right Mint & Sage Luminous Orb */}
          <div 
            className="absolute -bottom-36 right-0 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-25" 
            style={{ background: 'radial-gradient(circle, #34d399 0%, #047857 50%, transparent 70%)' }}
          />
          {/* Center Subtle Accent Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46rem] h-[26rem] rounded-full blur-3xl opacity-15"
            style={{ background: 'radial-gradient(ellipse, #6ee7b7 0%, transparent 65%)' }}
          />
          {/* Circular Sashiko Thread Arcs / Lingkaran Kontur */}
          <svg className="absolute -right-16 -top-16 w-[28rem] h-[28rem] text-emerald-300/15 pointer-events-none" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 8" />
            <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" />
          </svg>
          {/* Subtle Organic Micro-Dot Canvas Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="container-site py-16 sm:py-24 lg:py-28 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Manifesto */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col gap-5"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.06] tracking-tight"
              >
                Pakaian lama punya{' '}
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-amber-200 drop-shadow-sm">
                  babak kedua.
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-lg font-normal"
              >
                Donasikan pakaian tidak terpakai untuk mengurangi limbah tekstil, dapatkan 300 - 3.000 ClothPoints, dan tukarkan poin untuk belanja produk kerajinan tekstil, pakaian preloved berkualitas, serta dukung studio rekonstruksi perajin lokal.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link 
                    href="/drop" 
                    className="btn-primary justify-center text-xs py-3.5 px-5 font-bold shadow-lg shadow-emerald-950/50 no-underline flex items-center gap-2 font-sans tracking-tight bg-[var(--emerald-vibrant)] hover:bg-[var(--forest-deep)] border-emerald-400/30 text-white"
                  >
                    <Recycle size={15} />
                    <span>Serahkan Pakaian</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link 
                    href="/craft" 
                    className="btn-secondary justify-center text-xs py-3.5 px-5 font-bold no-underline flex items-center gap-2 bg-white text-emerald-950 border border-white/80 shadow-md hover:bg-emerald-50 hover:text-emerald-900 transition-all font-sans tracking-tight"
                  >
                    <Scissors size={15} className="text-emerald-700" />
                    <span>Belanja Kerajinan Siap Beli</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Statistics Strip */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-3 gap-3 pt-5 border-t border-emerald-700/40 text-xs mt-2"
              >
                <div className="bg-emerald-950/50 backdrop-blur-md p-3 rounded-2xl border border-emerald-400/20 shadow-xs hover:border-emerald-400/40 transition-colors">
                  <strong className="text-emerald-300 text-xl block font-extrabold font-mono">148.9 T</strong>
                  <span className="text-[11px] text-emerald-100/80">Pakaian Dikelola</span>
                </div>
                <div className="bg-emerald-950/50 backdrop-blur-md p-3 rounded-2xl border border-emerald-400/20 shadow-xs hover:border-emerald-400/40 transition-colors">
                  <strong className="text-teal-200 text-xl block font-extrabold font-mono">402M L</strong>
                  <span className="text-[11px] text-emerald-100/80">Air Dihemat</span>
                </div>
                <div className="bg-emerald-950/50 backdrop-blur-md p-3 rounded-2xl border border-emerald-400/20 shadow-xs hover:border-emerald-400/40 transition-colors">
                  <strong className="text-amber-300 text-xl block font-extrabold font-mono">18.4K+</strong>
                  <span className="text-[11px] text-emerald-100/80">Donatur Aktif</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Platform Performance News Carousel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-3xl p-1 bg-gradient-to-b from-emerald-400/30 via-emerald-600/20 to-transparent shadow-2xl backdrop-blur-xs">
                <CardSlideshow
                  slides={PLATFORM_PERFORMANCE_SLIDES}
                  aspectRatio="aspect-[16/11] sm:aspect-[4/3]"
                  autoPlay={true}
                  interval={4800}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. INDONESIAN TEXTILE WASTE CRISIS (POLOS / CLEAN MAROON) ── */}
      <TextileWasteChart />

      {/* ── 3. ECO CALCULATOR COMPONENT (GERAK) ───────────────── */}
      <EcoCalculator />

      {/* ── 4. LEADERBOARD 3 BESAR DONATUR (POLOS / CLEAN) ── */}
      <LeaderboardPodium />

      {/* ── 5. THREE-STEP LIFECYCLE (GERAK ANIMASI) ────────── */}
      <section className="relative py-14 sm:py-20 border-b border-emerald-900/10 overflow-hidden bg-gradient-to-b from-[#edf7f1]/95 via-[#f3f9f5]/85 to-[#e6f4ea]/90">
        <BackgroundDecor variant="default" />
        <div className="container-site relative z-10">

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mb-10 text-center sm:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
              Cara Mudah Menggunakan ClothLoop
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2">
              Tiga langkah mudah untuk mendonasikan pakaian, belanja produk preloved, dan mendukung karya perajin lokal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LIFECYCLE_STEPS.map((s, idx) => {
              const Icon = s.icon;
              const isActive = activeStepTab === idx;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveStepTab(idx)}
                  className={`card-clean p-6 flex flex-col justify-between cursor-pointer rounded-3xl transition-all ${
                    isActive 
                      ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-500/20' 
                      : 'border-emerald-900/10 bg-white/90 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        LANGKAH {s.step}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[var(--emerald-vibrant)] text-white' : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-[var(--ink-primary)] mb-2 tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[var(--ink-secondary)] leading-relaxed mb-4">
                      {s.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-emerald-900/10 text-xs font-bold text-[var(--emerald-vibrant)]">
                    <span>{s.metric}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 6. 4 LAYANAN TERINTEGRASI (POLOS / CLEAN) ───── */}
      <section className="relative py-14 sm:py-20 border-b border-[var(--border-hairline)] overflow-hidden bg-white">
        <BackgroundDecor variant="plain" />
        <div className="container-site relative z-10">

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center sm:text-left max-w-xl"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
              Layanan Utama ClothLoop
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2">
              Solusi lengkap dari pengumpulan donasi pakaian, belanja preloved bergaransi, hingga produk kerajinan UMKM.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={p.href}
                    className="card-clean p-6 flex flex-col justify-between gap-5 no-underline h-full block rounded-3xl bg-white/95 backdrop-blur-xs shadow-2xs hover:shadow-lg transition-all border border-emerald-900/10 hover:border-emerald-600/40"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">{p.num}</span>
                        <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-[var(--emerald-vibrant)] px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          {p.tag}
                        </span>
                      </div>
                      <span className="label-eyebrow block text-[10px] mb-0.5 text-emerald-700 font-bold">{p.sub}</span>
                      <h3 className="text-lg font-extrabold text-[var(--ink-primary)] mb-1 tracking-tight">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                        {p.body}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--emerald-vibrant)] pt-3 border-t border-emerald-900/10">
                      Buka Layanan <ArrowRight size={13} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 7. CONTOH KARYA REKONSTRUKSI ARTISAN (GERAK ANIMASI) ───────── */}
      <CraftShowcase />

      {/* ── 8. TITIK KUMPUL TERDEKAT (POLOS / CLEAN) ──── */}
      <section className="relative py-14 sm:py-20 border-b border-[var(--border-hairline)] overflow-hidden bg-white">
        <BackgroundDecor variant="plain" />
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-5 flex flex-col gap-4"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
                  Titik Kumpul Terdekat
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed mt-2 font-normal">
                  Antar pakaian Anda ke kafe rekanan, mall, galeri seni, atau bank sampah terverifikasi di kota Anda.
                </p>
              </div>

              <div className="flex flex-col border border-emerald-900/10 divide-y divide-emerald-900/10 rounded-2xl overflow-hidden shadow-2xs">
                {dropPoints.slice(0, 3).map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPointId(pt.id)}
                    className="p-3.5 text-left bg-white/95 backdrop-blur-xs border-none cursor-pointer flex justify-between items-center hover:bg-emerald-50 transition-colors"
                  >
                    <div>
                      <span className="text-[9px] text-[var(--emerald-vibrant)] uppercase tracking-wider block font-bold">{pt.city} &middot; {pt.category}</span>
                      <span className="text-xs font-bold text-[var(--ink-primary)]">{pt.name}</span>
                    </div>
                    <ArrowRight size={13} className="text-emerald-700" />
                  </button>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/drop" className="btn-primary w-fit text-xs py-3 px-5 font-bold shadow-md no-underline">
                  <MapPin size={13} /> Buka Peta Lengkap & Jadwalkan Kurir
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-7 rounded-3xl overflow-hidden border border-emerald-900/10 shadow-lg"
            >
              <DropPointMap
                points={dropPoints}
                selectedPointId={selectedPointId}
                onSelectPoint={(id) => setSelectedPointId(id)}
                height="340px"
              />
            </motion.div>

          </div>

          {/* ── PARTNERSHIP BANNER FOR ENTERPRISE / CAMPUS / PUBLIC VENUES ── */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="mt-12 bg-gradient-to-r from-emerald-900 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/40 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 block mb-2">
                Kemitraan Drop-Box Baru
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Perusahaan, Kampus, atau Kafe Anda Ingin Menjadi Titik Kumpul?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1.5 leading-relaxed font-normal">
                Sediakan drop box pakaian di lokasi Anda. ClothLoop menanggung pengadaan kotak, logistik berkala, serta sertifikat audit pengurangan emisi karbon.
              </p>
            </div>

            <Link
              href="/partner/drop-box"
              className="btn-primary py-3 px-5 font-bold text-xs whitespace-nowrap bg-white text-[var(--forest-deep)] hover:bg-emerald-50 border-none shadow-md no-underline rounded-2xl shrink-0"
            >
              <Building2 size={14} className="mr-1.5 inline" /> Daftar Mitra Drop Box
            </Link>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
