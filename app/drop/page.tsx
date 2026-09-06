'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Recycle, 
  MapPin, 
  Truck, 
  Store, 
  ArrowRight, 
  Map as MapIcon, 
  List, 
  Droplets, 
  Wind, 
  Calendar, 
  Search,
  CheckCircle,
  AlertCircle,
  Zap,
  Check,
  Plus,
  Minus,
  QrCode,
  Building2,
  Clock,
  Sparkles,
  Layers,
  Shirt,
  Package,
  ShieldCheck,
  ChevronRight,
  History
} from 'lucide-react';
import { DropMethod, DropOrder, DropOrderStatus, DropPoint, GarmentItemBreakdown } from '@/lib/types';
import { formatNumber, generateBookingCode } from '@/lib/utils';
import { useApp } from '@/lib/store';
import { fetchDropPoints } from '@/lib/supabase/data';
import { GARMENT_CATEGORY_POINTS, TIME_SLOTS, INDONESIA_CITIES } from '@/lib/constants';
import { CardSlideshow, SlideItem } from '@/components/ui/CardSlideshow';
import { DonationTrackerModal } from '@/components/drop/DonationTrackerModal';

// Dynamically import OpenStreetMap component to prevent SSR hydration errors
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

// Real street-level / outdoor drop points documentation
const DROP_GALLERY_SLIDES: SlideItem[] = [
  {
    id: 'dp-1',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    tag: 'Teras Kafe Rekanan',
    title: 'Anomali Coffee Pelataran Senopati',
    subtitle: 'Kotak serah mandiri pinggir jalan di area teras depan kafe (akses mudah 24/7)',
  },
  {
    id: 'dp-2',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tag: 'Drop Box Pedestrian',
    title: 'Shelter Sirkular Sabang Menteng',
    subtitle: 'Drop Box trotoar pinggir jalan dekat taman kuliner tanpa perlu masuk gedung',
  },
  {
    id: 'dp-3',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    tag: 'Shelter Komunitas Terbuka',
    title: 'Nyampah Baik Dago Bandung',
    subtitle: 'Drop Box luar ruang di pelataran taman budaya dengan akses parkir motor & mobil',
  },
  {
    id: 'dp-4',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    tag: 'Bank Sampah Digital',
    title: 'Bank Sampah Patriot Summarecon',
    subtitle: 'Pelataran hijau terbuka dengan sistem timbangan digital otomatis',
  },
];

export default function DropPage() {
  const { addDropOrder, dropOrders, currentUser, userProfile, confirmCourierScan, addNotification } = useApp();

  const [pointsList, setPointsList] = useState<DropPoint[]>([]);
  const [method, setMethod] = useState<DropMethod>('DROPOFF');
  const [selectedPointId, setSelectedPointId] = useState<string>('');
  const [cityFilter, setCityFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [orderTab, setOrderTab] = useState<'ACTIVE' | 'HISTORY'>('ACTIVE');

  // Garment Category Quantities (Strictly count-based, no kg)
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({
    perca: 0,
    kaos: 0,
    kemeja: 0,
    denim: 0,
    jaket: 0,
    batik: 0,
  });

  // Donor Details
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');

  // Pick-up Address Details
  const [pickupCity, setPickupCity] = useState(INDONESIA_CITIES[0]);
  const [pickupDistrict, setPickupDistrict] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');

  // Schedule (Calendar Date + 3 Slots)
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [scheduledDate, setScheduledDate] = useState(todayStr);
  const [scheduledSlot, setScheduledSlot] = useState(TIME_SLOTS[0]);

  // Modals
  const [activeOrder, setActiveOrder] = useState<DropOrder | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<DropOrder | null>(null);

  // Status lookup state
  const [lookupCode, setLookupCode] = useState('');
  const [lookupResult, setLookupResult] = useState<DropOrder | null | 'NOT_FOUND'>(null);

  const activeOrders = useMemo(() => {
    return dropOrders.filter(o => o.status !== 'COMPLETED');
  }, [dropOrders]);

  const historyOrders = useMemo(() => {
    return dropOrders.filter(o => o.status === 'COMPLETED');
  }, [dropOrders]);

  useEffect(() => {
    fetchDropPoints().then(data => {
      setPointsList(data);
    });
  }, []);

  // Filter Drop Points by City & Search Query
  const filteredPoints = useMemo(() => {
    return pointsList.filter(p => {
      const matchCity = cityFilter === 'Semua' || p.city === cityFilter || p.province === cityFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        p.name.toLowerCase().includes(q) || 
        p.address.toLowerCase().includes(q) || 
        p.city.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q);
      return matchCity && matchSearch;
    });
  }, [pointsList, cityFilter, searchQuery]);

  const selectedPoint = selectedPointId ? pointsList.find(p => p.id === selectedPointId) || null : null;

  // Complete list of Indonesian cities & regencies
  const availableCities = useMemo(() => {
    return ['Semua', ...INDONESIA_CITIES];
  }, []);

  // Calculate Total Items and Points
  const totalItemCount = useMemo(() => {
    return Object.values(categoryCounts).reduce((a, b) => a + b, 0);
  }, [categoryCounts]);

  const totalPointsAwarded = useMemo(() => {
    return GARMENT_CATEGORY_POINTS.reduce((sum, cat) => {
      const count = categoryCounts[cat.id] || 0;
      return sum + (count * cat.pointsPerItem);
    }, 0);
  }, [categoryCounts]);

  // Estimated Environmental Impact (derived from garment count & type)
  const totalWaterSaved = useMemo(() => {
    return GARMENT_CATEGORY_POINTS.reduce((sum, cat) => {
      const count = categoryCounts[cat.id] || 0;
      return sum + (count * cat.weightEstKg * 2700);
    }, 0);
  }, [categoryCounts]);

  const totalCo2Saved = useMemo(() => {
    const raw = GARMENT_CATEGORY_POINTS.reduce((sum, cat) => {
      const count = categoryCounts[cat.id] || 0;
      return sum + (count * cat.weightEstKg * 3.6);
    }, 0);
    return Number(raw.toFixed(1));
  }, [categoryCounts]);

  const handleCountChange = (catId: string, delta: number) => {
    setCategoryCounts(prev => ({
      ...prev,
      [catId]: Math.max(0, (prev[catId] || 0) + delta)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      addNotification('warning', 'Masuk Diperlukan', 'Silakan masuk atau daftar terlebih dahulu untuk menggunakan layanan donasi pakaian.');
      window.location.href = '/auth/login?redirect=/drop';
      return;
    }
    if (totalItemCount === 0) {
      alert('Mohon masukkan minimal 1 helai pakaian pada kategori tekstil.');
      return;
    }
    if (method === 'DROPOFF' && !selectedPointId) {
      alert('Silakan pilih salah satu titik kumpul pada peta atau daftar lokasi terlebih dahulu.');
      return;
    }

    const bookingCode = generateBookingCode('CLD');
    const garmentBreakdown: GarmentItemBreakdown[] = GARMENT_CATEGORY_POINTS
      .filter(cat => (categoryCounts[cat.id] || 0) > 0)
      .map(cat => ({
        category: cat.name,
        quantity: categoryCounts[cat.id],
        pointsPerItem: cat.pointsPerItem,
      }));

    const selectedGarmentNames = garmentBreakdown.map(g => `${g.category} (${g.quantity} helai)`);

    const order: DropOrder = {
      id: Math.random().toString(36).slice(2),
      bookingCode,
      userId: currentUser?.id || 'usr-guest',
      userName: donorName || userProfile?.full_name || 'Donatur ClothLoop',
      userPhone: donorPhone || userProfile?.phone || '',
      userCity: method === 'PICKUP' ? pickupCity : undefined,
      userDistrict: method === 'PICKUP' ? pickupDistrict : undefined,
      userAddress: method === 'PICKUP' ? `${pickupAddress}, Kec. ${pickupDistrict || '-'}, ${pickupCity}` : undefined,
      method,
      dropPointId: method === 'DROPOFF' && selectedPoint ? selectedPoint.id : undefined,
      dropPointName: method === 'DROPOFF' && selectedPoint ? selectedPoint.name : undefined,
      dropPointAddress: method === 'DROPOFF' && selectedPoint ? selectedPoint.address : undefined,
      courierService: method === 'PICKUP' ? 'ClothLoop Courier Express' : undefined,
      scheduledDate,
      scheduledSlot,
      itemCount: totalItemCount,
      garmentBreakdown,
      garmentTypes: selectedGarmentNames,
      status: 'PENDING',
      pointsAwarded: totalPointsAwarded,
      pointsCredited: false,
      waterSavedLiters: Math.round(totalWaterSaved),
      co2SavedKg: totalCo2Saved,
      createdAt: new Date().toISOString(),
      qrCodeValue: `CLD-VERIFY:${bookingCode}:${totalPointsAwarded}PTS`,
    };

    addDropOrder(order);
    setActiveOrder(order);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCode) return;
    const found = dropOrders.find(o => o.bookingCode.toLowerCase() === lookupCode.trim().toLowerCase());
    if (found) {
      setLookupResult(found);
      setTrackingOrder(found);
    } else {
      setLookupResult('NOT_FOUND');
    }
  };

  return (
    <div className="relative overflow-x-hidden">

      {/* ── 1. HEADER WITH MOVING KINETIC BACKGROUND ANIMATION ── */}
      <div className="relative bg-gradient-to-br from-[#053d2f] via-[#04563e] to-[#022c22] py-14 sm:py-20 text-white overflow-hidden">
        
        {/* Subtle Kinetic Animation Waves & Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1], 
              x: [0, 20, 0], 
              y: [0, -15, 0],
              opacity: [0.3, 0.45, 0.3] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-28 w-[36rem] h-[36rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, #10b981 0%, #059669 45%, transparent 70%)' }}
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 0.95, 1.1], 
              x: [0, -25, 0], 
              y: [0, 20, 0],
              opacity: [0.2, 0.35, 0.2] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-36 right-0 w-[40rem] h-[40rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, #34d399 0%, #047857 50%, transparent 70%)' }}
          />

          {/* Animated Flowing SVG Textile Sashiko Threads */}
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M-100,100 C200,20 400,180 700,80 C1000,-20 1200,150 1500,60"
              stroke="#6ee7b7"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              fill="none"
              animate={{ pathOffset: [0, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M-100,220 C250,140 450,300 800,190 C1150,80 1350,260 1600,160"
              stroke="#a7f3d0"
              strokeWidth="1"
              fill="none"
              animate={{ pathOffset: [1, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        <div className="container-site relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="mb-2">
                <span className="text-xs font-mono font-extrabold text-amber-300 tracking-wider uppercase">
                  ClothDrop Portal
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Penyerahan & Donasi Pakaian
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-xl leading-relaxed font-normal">
                Antar pakaian ke titik kumpul pinggir jalan terdekat atau pesan kurir penjemputan dari rumah. Dapatkan reward <strong className="text-amber-300">300 - 3.000 ClothPoints</strong> per helai pakaian yang diserahkan.
              </p>
            </div>
            
            {/* Status Lookup */}
            <form onSubmit={handleLookup} className="flex gap-2 w-full md:w-auto bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-lg">
              <input
                value={lookupCode}
                onChange={e => setLookupCode(e.target.value)}
                placeholder="Cek status donasi (CLD-...)"
                className="bg-transparent border-none text-white text-xs px-3 focus:outline-none placeholder-white/50 w-full md:w-52 font-mono font-bold"
              />
              <motion.button 
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="btn-primary text-xs py-2 px-4 bg-white text-[var(--forest-deep)] hover:bg-emerald-50 font-bold border-none cursor-pointer rounded-xl shadow-xs shrink-0"
              >
                <Search size={13} className="inline mr-1" /> Lacak
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Lookup Result Banner */}
      <AnimatePresence>
        {lookupResult && lookupResult !== 'NOT_FOUND' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-emerald-50 border-b border-emerald-200 py-3.5"
          >
            <div className="container-site flex justify-between items-center text-xs">
              <div className="flex items-center gap-2 text-emerald-900 font-medium">
                <CheckCircle size={16} className="text-emerald-600" />
                <span>Kode <strong>{lookupResult.bookingCode}</strong>: Status <strong>{lookupResult.status}</strong> ({lookupResult.itemCount} helai pakaian &middot; <strong className="text-emerald-700">+{lookupResult.pointsAwarded} Pts</strong>)</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setTrackingOrder(lookupResult)}
                  className="text-xs font-bold text-emerald-800 underline cursor-pointer bg-transparent border-none"
                >
                  Buka Timeline Pelacak
                </button>
                <button onClick={() => setLookupResult(null)} className="text-gray-400 hover:text-black text-xs font-bold cursor-pointer bg-transparent border-none">Tutup</button>
              </div>
            </div>
          </motion.div>
        )}
        {lookupResult === 'NOT_FOUND' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-rose-50 border-b border-rose-200 py-3.5"
          >
            <div className="container-site flex justify-between items-center text-xs text-rose-800">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-600" />
                <span>Kode resi <strong>{lookupCode}</strong> tidak ditemukan. Pastikan format penulisan benar (contoh: CLD-XXXXXX).</span>
              </div>
              <button onClick={() => setLookupResult(null)} className="text-rose-400 hover:text-rose-900 text-xs font-bold cursor-pointer bg-transparent border-none">Tutup</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-site py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT COLUMN: BOOKING FORM (7 cols) ── */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[var(--border-hairline)] shadow-sm flex flex-col gap-6">

            {/* 1. Method Selection */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-extrabold text-[var(--ink-primary)] uppercase tracking-wider">
                  1. Pilih Metode Penyerahan
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {pointsList.length > 0 ? `${pointsList.length} titik drop-off aktif` : '180 titik drop-off aktif'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('DROPOFF')}
                  className={`p-4 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    method === 'DROPOFF' 
                      ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs' 
                      : 'bg-white border-[var(--border-hairline)] hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Store size={20} className={method === 'DROPOFF' ? 'text-emerald-700' : 'text-gray-400'} />
                    {method === 'DROPOFF' && <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Aktif</span>}
                  </div>
                  <strong className="text-xs font-extrabold text-[var(--ink-primary)]">Antar Mandiri (Drop-off)</strong>
                  <span className="text-[11px] text-[var(--ink-secondary)]">
                    {pointsList.length || 180} Lokasi Drop-off
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('PICKUP')}
                  className={`p-4 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    method === 'PICKUP' 
                      ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs' 
                      : 'bg-white border-[var(--border-hairline)] hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Truck size={20} className={method === 'PICKUP' ? 'text-emerald-700' : 'text-gray-400'} />
                    {method === 'PICKUP' && <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Aktif</span>}
                  </div>
                  <strong className="text-xs font-extrabold text-[var(--ink-primary)]">Jemput di Rumah (Pick-up)</strong>
                  <span className="text-[11px] text-[var(--ink-secondary)]">
                    Kurir resmi ClothLoop jemput ke depan pintu rumah
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Location / Address Input */}
            {method === 'DROPOFF' ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-xs font-extrabold text-[var(--ink-primary)] uppercase tracking-wider">
                    2. Pilih Titik Kumpul
                  </span>
                  <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setViewMode('map')}
                      className={`text-[11px] px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                        viewMode === 'map' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      <MapIcon size={12} className="inline mr-1" /> Peta
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`text-[11px] px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                        viewMode === 'list' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      <List size={12} className="inline mr-1" /> Daftar
                    </button>
                  </div>
                </div>

                {/* Search Box & City Filter */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Cari nama tempat, jalan, atau kota..."
                      className="w-full pl-8 pr-3 py-2 text-xs bg-[var(--surface-muted)] border border-[var(--border-hairline)] rounded-xl focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                  <select
                    value={cityFilter}
                    onChange={e => setCityFilter(e.target.value)}
                    className="bg-[var(--surface-muted)] border border-[var(--border-hairline)] rounded-xl text-xs px-3 py-2 font-bold text-[var(--ink-primary)] focus:outline-none focus:border-emerald-600"
                  >
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {viewMode === 'map' ? (
                  <div className="rounded-2xl overflow-hidden border border-emerald-900/15 shadow-xs">
                    <DropPointMap
                      points={filteredPoints.length > 0 ? filteredPoints : pointsList}
                      selectedPointId={selectedPointId}
                      onSelectPoint={id => setSelectedPointId(id)}
                      height="300px"
                    />
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto divide-y divide-[var(--border-hairline)] border rounded-2xl">
                    {filteredPoints.map(p => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPointId(p.id)}
                        className={`p-3.5 text-xs cursor-pointer flex justify-between items-center transition-colors ${
                          selectedPointId === p.id ? 'bg-emerald-50 border-l-4 border-emerald-600' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-[var(--ink-primary)] font-bold">{p.name}</strong>
                            <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                              {p.category}
                            </span>
                          </div>
                          <span className="text-[11px] text-[var(--ink-secondary)] block mt-0.5">
                            {p.address} &bull; {p.operatingHours}
                          </span>
                        </div>
                        {selectedPointId === p.id && (
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                            Terpilih
                          </span>
                        )}
                      </div>
                    ))}
                    {filteredPoints.length === 0 && (
                      <div className="p-6 text-center text-xs text-gray-500">
                        Tidak ada titik kumpul yang cocok dengan pencarian.
                      </div>
                    )}
                  </div>
                )}

                {selectedPoint && (
                  <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider block">
                        Lokasi Drop-Off Terpilih:
                      </span>
                      <strong className="text-[var(--ink-primary)] font-extrabold text-sm">
                        {selectedPoint.name} ({selectedPoint.city})
                      </strong>
                      <span className="text-[11px] text-emerald-900/80 block mt-0.5">
                        {selectedPoint.address}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-900 font-mono font-bold bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                      Buka: {selectedPoint.operatingHours}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* 2. Pick-up Detailed Address */
              <div className="flex flex-col gap-3">
                <span className="text-xs font-extrabold text-[var(--ink-primary)] uppercase tracking-wider">
                  2. Alamat Lengkap Penjemputan Kurir
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block mb-1">
                      Kota / Kabupaten
                    </label>
                    <select
                      value={pickupCity}
                      onChange={e => setPickupCity(e.target.value)}
                      className="w-full bg-[var(--surface-muted)] border border-[var(--border-hairline)] rounded-xl text-xs p-2.5 font-bold text-[var(--ink-primary)] focus:outline-none focus:border-emerald-600"
                    >
                      {INDONESIA_CITIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block mb-1">
                      Kecamatan
                    </label>
                    <input
                      value={pickupDistrict}
                      onChange={e => setPickupDistrict(e.target.value)}
                      required
                      placeholder="Contoh: Kebayoran Baru, Sukajadi, Gubeng..."
                      className="input-minimal text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block mb-1">
                    Detail Alamat & Patokan Rumah
                  </label>
                  <textarea
                    value={pickupAddress}
                    onChange={e => setPickupAddress(e.target.value)}
                    required
                    placeholder="Masukkan nama jalan, nomor rumah, RT/RW, kelurahan, dan patokan pagar/gedung..."
                    rows={2}
                    className="input-minimal text-xs font-medium"
                  />
                </div>
              </div>
            )}

            {/* 3. Schedule (Calendar Date + 3 Time Slots) */}
            <div>
              <span className="text-xs font-extrabold text-[var(--ink-primary)] uppercase tracking-wider block mb-2.5">
                3. Jadwal Penyerahan / Penjemputan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block mb-1">
                    Pilih Tanggal (Kalender)
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayStr}
                      value={scheduledDate}
                      onChange={e => setScheduledDate(e.target.value)}
                      required
                      className="w-full bg-[var(--surface-muted)] border border-[var(--border-hairline)] rounded-xl text-xs p-2.5 font-bold text-[var(--ink-primary)] focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block mb-1">
                    Sesi Jam Operasional
                  </label>
                  <select
                    value={scheduledSlot}
                    onChange={e => setScheduledSlot(e.target.value)}
                    className="w-full bg-[var(--surface-muted)] border border-[var(--border-hairline)] rounded-xl text-xs p-2.5 font-bold text-[var(--ink-primary)] focus:outline-none focus:border-emerald-600"
                  >
                    {TIME_SLOTS.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Quantity & Category Estimation (Strictly Garment Counts & Point Calculation) */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-extrabold text-[var(--ink-primary)] uppercase tracking-wider">
                  4. Jumlah Helai & Kategori Pakaian
                </span>
                <span className="text-xs font-mono font-bold text-[var(--emerald-vibrant)]">
                  Total: {totalItemCount} Helai
                </span>
              </div>

              <p className="text-[11px] text-[var(--ink-secondary)]">
                Tentukan jumlah helai pakaian yang ingin Anda sumbangkan pada masing-masing jenis di bawah. Poin dihitung otomatis sesuai ketentuan per kategori.
              </p>

              {/* Category Counter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {GARMENT_CATEGORY_POINTS.map(cat => {
                  const currentCount = categoryCounts[cat.id] || 0;
                  return (
                    <div 
                      key={cat.id}
                      className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                        currentCount > 0 
                          ? 'bg-emerald-50/50 border-emerald-400 ring-1 ring-emerald-400/30' 
                          : 'bg-[var(--surface-muted)] border-[var(--border-hairline)]'
                      }`}
                    >
                      <div className="flex-1 pr-2">
                        <strong className="text-xs font-bold text-[var(--ink-primary)] block">
                          {cat.name}
                        </strong>
                        <span className="text-[10px] font-bold text-emerald-700">
                          +{cat.pointsPerItem} Pts / helai
                        </span>
                      </div>

                      {/* Counter Stepper */}
                      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-emerald-900/10 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => handleCountChange(cat.id, -1)}
                          disabled={currentCount === 0}
                          className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-700 flex items-center justify-center border-none cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-6 text-center font-mono font-extrabold text-xs text-[var(--ink-primary)]">
                          {currentCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCountChange(cat.id, 1)}
                          className="w-6 h-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center border-none cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Donor Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <input
                  value={donorName}
                  onChange={e => setDonorName(e.target.value)}
                  required
                  placeholder="Nama Lengkap Donatur *"
                  className="input-minimal text-xs font-medium"
                />
                <input
                  value={donorPhone}
                  onChange={e => setDonorPhone(e.target.value)}
                  required
                  placeholder="Nomor WhatsApp Aktif *"
                  className="input-minimal text-xs font-medium"
                />
              </div>
            </div>

            {/* Submit Confirmation Button */}
            <motion.button 
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn-primary justify-center w-full py-3.5 font-bold shadow-md rounded-2xl"
            >
              Konfirmasi
            </motion.button>
          </form>

          {/* ── RIGHT COLUMN: SLIDESHOW & DONATION SUMMARY (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Documentation Slideshow (Outdoor / Street-level drop boxes) */}
            <div>
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block mb-2">
                Dokumentasi Titik Kumpul Luar Ruang
              </span>
              <CardSlideshow
                slides={DROP_GALLERY_SLIDES}
                aspectRatio="aspect-[16/10]"
                autoPlay={true}
                interval={5000}
              />
            </div>

            {/* Donation Summary Card (High contrast typography) */}
            <div className="bg-gradient-to-br from-[#053d2f] via-[#04563e] to-[#022c22] text-white p-6 sm:p-7 rounded-3xl shadow-xl flex flex-col gap-4 border border-emerald-800/40">
              <div className="flex justify-between items-center pb-3 border-b border-white/15">
                <span className="text-xs font-extrabold text-emerald-200 uppercase tracking-wider">
                  Ringkasan Donasi ({totalItemCount} Helai Pakaian)
                </span>
                <span className="text-[10px] font-mono font-bold bg-white/15 text-white px-2 py-0.5 rounded-md">
                  {method === 'DROPOFF' ? 'Drop-off' : 'Pick-up'}
                </span>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-white/85">Air Bersih Terhemat:</span>
                  <strong className="text-base font-extrabold text-white tracking-tight">
                    {formatNumber(Math.round(totalWaterSaved))} Liter
                  </strong>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <span className="text-white/85">Emisi Karbon Dicegah:</span>
                  <strong className="text-base font-extrabold text-white tracking-tight">
                    {totalCo2Saved} kg CO₂e
                  </strong>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <div>
                    <span className="text-white/85 block">Potensi Reward:</span>
                    <span className="text-[10px] text-emerald-300">*(Dicairkan setelah kurir scan)</span>
                  </div>
                  <strong className="font-mono text-xl font-extrabold text-amber-300">
                    +{totalPointsAwarded} ClothPoints
                  </strong>
                </div>
              </div>

              <div className="bg-white/10 p-3 rounded-2xl text-[11px] text-emerald-100 leading-relaxed border border-white/10">
                Poin akan otomatis aktif di saldo akun setelah kurir atau petugas titik kumpul memindai QR Code pada bukti booking.
              </div>
            </div>

            {/* ── DONASI AKTIF & RIWAYAT PENYERAHAN (STATUS, QR CODE & PELACAK) ── */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[var(--border-hairline)] shadow-sm flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-[var(--border-hairline)]">
                <div>
                  <h3 className="text-sm font-extrabold text-[var(--ink-primary)] tracking-tight flex items-center gap-1.5">
                    <History size={16} className="text-emerald-700" />
                    <span>Donasi Aktif & Riwayat</span>
                  </h3>
                  <p className="text-[11px] text-[var(--ink-secondary)]">
                    Buka kode QR untuk kurir atau pantau perjalanan pakaian Anda
                  </p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-xl text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setOrderTab('ACTIVE')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer border-none ${
                      orderTab === 'ACTIVE' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'text-gray-600 hover:text-black bg-transparent'
                    }`}
                  >
                    Berjalan ({activeOrders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderTab('HISTORY')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer border-none ${
                      orderTab === 'HISTORY' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'text-gray-600 hover:text-black bg-transparent'
                    }`}
                  >
                    Selesai ({historyOrders.length})
                  </button>
                </div>
              </div>

              {!currentUser ? (
                <div className="text-center py-8 px-4 bg-emerald-50/40 rounded-2xl border border-dashed border-emerald-200 flex flex-col items-center gap-2.5">
                  <Package size={26} className="text-emerald-700" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Belum Ada Riwayat Donasi</span>
                    <span className="text-[11px] text-gray-600 block mt-0.5 max-w-xs">
                      Silakan masuk atau daftar terlebih dahulu agar riwayat donasi pakaian tercatat di database akun Anda.
                    </span>
                  </div>
                  <Link
                    href="/auth/login?redirect=/drop"
                    className="btn-primary text-xs py-2 px-4 font-bold rounded-xl mt-1 no-underline"
                  >
                    Masuk / Daftar
                  </Link>
                </div>
              ) : (
                <>
                  {/* Active Orders List */}
                  {orderTab === 'ACTIVE' && (
                    <div className="flex flex-col gap-3">
                      {activeOrders.length === 0 ? (
                        <div className="text-center py-8 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                          <Package size={24} className="mx-auto text-gray-400 mb-1.5" />
                          <span className="text-xs font-bold text-gray-700 block">Belum ada donasi yang sedang berjalan</span>
                          <span className="text-[11px] text-gray-500">Isi formulir di sebelah kiri untuk membuat tiket booking baru.</span>
                        </div>
                      ) : (
                        activeOrders.map(order => {
                          const getStatusBadge = (status: DropOrderStatus) => {
                            switch (status) {
                              case 'PENDING':
                                return { label: 'Menunggu Penjemputan / Serah Terima', color: 'bg-amber-100 text-amber-900 border-amber-300' };
                              case 'COURIER_PICKUP':
                                return { label: 'Kurir Sedang Menuju Lokasi', color: 'bg-blue-100 text-blue-900 border-blue-300' };
                              case 'RECEIVED':
                                return { label: 'Diterima Kurir (Poin Cair)', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
                              case 'SORTING':
                                return { label: 'Proses Kurasi & Sortir', color: 'bg-purple-100 text-purple-900 border-purple-300' };
                              case 'DELIVERED_TO_ARTISAN':
                                return { label: 'Tiba di Studio Perajin', color: 'bg-teal-100 text-teal-900 border-teal-300' };
                              default:
                                return { label: status, color: 'bg-gray-100 text-gray-800 border-gray-300' };
                            }
                          };
                          const statusInfo = getStatusBadge(order.status);

                          return (
                            <div key={order.id} className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-900/10 hover:border-emerald-600/40 transition-all flex flex-col gap-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <span className="font-mono font-bold text-xs text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs">
                                      {order.bookingCode}
                                    </span>
                                    <span className="text-[10px] text-[var(--ink-secondary)]">
                                      &bull; {order.method === 'PICKUP' ? 'Pick-up' : 'Drop-off'}
                                    </span>
                                  </div>
                                  <span className="text-xs font-bold text-[var(--ink-primary)] block">
                                    {order.itemCount} Helai Pakaian ({order.method === 'PICKUP' ? order.courierService : order.dropPointName})
                                  </span>
                                  <span className="text-[11px] text-[var(--ink-secondary)]">
                                    Jadwal: {order.scheduledDate || 'Hari Ini'} ({order.scheduledSlot?.split(' ')[0] || '09.00-12.00'})
                                  </span>
                                </div>

                                <div className="flex flex-col items-end gap-1.5">
                                  <div className="flex items-center justify-center font-mono font-extrabold text-xs text-amber-900 bg-amber-100 border border-amber-300 rounded-xl px-3 py-1.5 text-center shadow-2xs">
                                    +{order.pointsAwarded} Pts
                                  </div>
                                  <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${statusInfo.color} text-center`}>
                                    {statusInfo.label}
                                  </span>
                                </div>
                              </div>

                              {/* Quick Action Buttons */}
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900/10">
                                <button
                                  type="button"
                                  onClick={() => setActiveOrder(order)}
                                  className="btn-primary text-[11px] py-2 px-2.5 font-bold flex items-center justify-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs cursor-pointer border-none text-center"
                                >
                                  <QrCode size={12} /> Buka QR Kurir
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setTrackingOrder(order)}
                                  className="btn-secondary text-[11px] py-2 px-2.5 font-bold flex items-center justify-center gap-1 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-300 cursor-pointer text-center"
                                >
                                  <Truck size={12} /> Lacak Perjalanan
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* Completed History List */}
                  {orderTab === 'HISTORY' && (
                    <div className="flex flex-col gap-2.5">
                      {historyOrders.length === 0 ? (
                        <div className="text-center py-8 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                          <span className="text-xs font-bold text-gray-700 block">Belum ada donasi yang selesai</span>
                        </div>
                      ) : (
                        historyOrders.map(order => (
                          <div key={order.id} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-xs text-gray-800">
                                  {order.bookingCode}
                                </span>
                                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                                  Selesai (Poin Aktif)
                                </span>
                              </div>
                              <span className="text-[11px] text-gray-600 block mt-0.5">
                                {order.itemCount} Helai &bull; Air: {formatNumber(order.waterSavedLiters)} L &bull; CO₂: {order.co2SavedKg} kg
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center font-mono text-xs font-extrabold text-emerald-900 bg-emerald-100 border border-emerald-300 rounded-xl px-3 py-1.5 text-center shadow-2xs">
                                +{order.pointsAwarded} Pts
                              </div>
                              <button
                                type="button"
                                onClick={() => setTrackingOrder(order)}
                                className="p-2 bg-white hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-600 cursor-pointer flex items-center justify-center"
                                title="Lihat Timeline"
                              >
                                <ChevronRight size={14} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

          </div>

        </div>

        {/* ── 5. PARTNERSHIP CALL TO ACTION BANNER (PERUSAHAAN / KAMPUS / INSTITUSI) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mt-12 bg-gradient-to-r from-emerald-900 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800/40 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="max-w-2xl">
            <div className="mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Kemitraan Drop-Box Sirkular
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ingin Memasang Drop Box di Kampus, Kantor, atau Kafe Anda?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/85 mt-2 leading-relaxed font-normal">
              ClothLoop menyediakan fasilitas drop box gratis, logistik penjemputan berkala, serta laporan audit dampak lingkungan bagi institusi dan perusahaan mitra.
            </p>
          </div>

          <Link
            href="/partner/drop-box"
            className="btn-primary py-3.5 px-6 font-bold text-xs whitespace-nowrap bg-white text-[var(--forest-deep)] hover:bg-emerald-50 border-none shadow-lg no-underline rounded-2xl shrink-0"
          >
            <Building2 size={15} className="mr-1.5" /> Ajukan Pasang Drop Box
          </Link>
        </motion.div>

        {/* ── 6. KARYA KERAJINAN TEKSTIL (HASIL DONASI PAKAIAN) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mt-8 bg-[var(--forest-deep)] py-8 sm:py-10 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/50 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="max-w-2xl text-left">
            <span className="text-amber-300 text-[10px] tracking-wider uppercase font-bold block mb-1">
              Karya Kerajinan Tekstil
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
              Lihat Kerajinan dari Hasil Pakaian yang Telah Kamu Sumbangkan
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mt-1 font-normal">
              Pakaian yang Anda donasikan diolah kembali oleh studio perajin lokal menjadi produk kerajinan bernilai guna tinggi dan ramah lingkungan.
            </p>
          </div>

          <Link
            href="/craft"
            className="btn-primary bg-white text-[var(--forest-deep)] hover:bg-white/90 border-white text-xs py-3 px-5 font-bold shadow-md rounded-2xl whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Lihat Produk Kerajinan</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>

      {/* ── 6. BOOKING CONFIRMATION RECEIPT MODAL WITH QR CODE & COURIER SCAN SIMULATION ── */}
      <AnimatePresence>
        {activeOrder && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setActiveOrder(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-emerald-900/15 shadow-2xl flex flex-col gap-4 font-sans text-xs max-h-[92vh] overflow-y-auto" 
              onClick={e => e.stopPropagation()}
            >
              {/* Receipt Header */}
              <div className="text-center pb-3 border-b border-dashed border-gray-300">
                <span className="text-lg font-extrabold tracking-tight block text-emerald-900">CLOTHLOOP.ID</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">BUKTI BOOKING PENYERAHAN PAKAIAN</span>
              </div>

              {/* QR Code Graphic */}
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="w-36 h-36 bg-white p-2.5 rounded-xl border border-gray-300 shadow-xs flex flex-col items-center justify-center relative">
                  {/* Stylized QR Code Pattern */}
                  <svg className="w-full h-full text-emerald-950" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="28" height="28" rx="4" />
                    <rect x="9" y="9" width="20" height="20" fill="white" />
                    <rect x="13" y="13" width="12" height="12" fill="currentColor" />

                    <rect x="67" y="5" width="28" height="28" rx="4" />
                    <rect x="71" y="9" width="20" height="20" fill="white" />
                    <rect x="75" y="13" width="12" height="12" fill="currentColor" />

                    <rect x="5" y="67" width="28" height="28" rx="4" />
                    <rect x="9" y="71" width="20" height="20" fill="white" />
                    <rect x="13" y="75" width="12" height="12" fill="currentColor" />

                    {/* QR micro dots */}
                    <rect x="40" y="8" width="6" height="6" />
                    <rect x="50" y="18" width="8" height="8" />
                    <rect x="42" y="32" width="6" height="6" />
                    <rect x="15" y="42" width="8" height="8" />
                    <rect x="30" y="42" width="6" height="6" />
                    <rect x="48" y="42" width="10" height="10" />
                    <rect x="65" y="42" width="8" height="8" />
                    <rect x="80" y="42" width="6" height="6" />
                    <rect x="40" y="60" width="8" height="8" />
                    <rect x="55" y="60" width="6" height="6" />
                    <rect x="42" y="75" width="8" height="8" />
                    <rect x="65" y="70" width="10" height="10" />
                    <rect x="80" y="80" width="8" height="8" />
                  </svg>
                </div>
                <span className="font-mono text-sm font-extrabold text-emerald-900 mt-2">
                  {activeOrder.bookingCode}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  Tunjukkan kode ini kepada kurir / petugas saat serah terima
                </span>
              </div>

              {/* Order Info */}
              <div className="flex flex-col gap-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-gray-500">Donatur:</span>
                  <strong className="text-[var(--ink-primary)]">{activeOrder.userName} ({activeOrder.userPhone})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Metode:</span>
                  <span className="font-bold text-emerald-800">{activeOrder.method === 'DROPOFF' ? 'Drop-off Mandiri' : 'Pick-up Kurir'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Jadwal:</span>
                  <span className="font-bold">{activeOrder.scheduledDate} ({activeOrder.scheduledSlot?.split(' ')[0]})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Jumlah Pakaian:</span>
                  <strong className="text-emerald-900">{activeOrder.itemCount} Helai</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-500">Estimasi Reward:</span>
                  <strong className="text-amber-600 font-extrabold text-xs">+{activeOrder.pointsAwarded} ClothPoints</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status Poin:</span>
                  <span className={`font-bold ${activeOrder.pointsCredited ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {activeOrder.pointsCredited ? 'Telah Masuk ke Saldo' : 'Menunggu Scan Kurir'}
                  </span>
                </div>
              </div>

              {/* Courier Simulation Scan Button */}
              {!activeOrder.pointsCredited && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center flex flex-col gap-2">
                  <span className="text-[11px] text-amber-900 font-medium">
                    🔍 Uji Coba: Simulasikan kurir memindai QR code ini sekarang:
                  </span>
                  <button
                    onClick={() => {
                      confirmCourierScan(activeOrder.bookingCode);
                      setActiveOrder(prev => prev ? { ...prev, pointsCredited: true, status: 'RECEIVED' } : null);
                    }}
                    className="btn-primary text-xs py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold border-none cursor-pointer rounded-lg shadow-xs"
                  >
                    <QrCode size={13} className="inline mr-1" /> Simulasi Scan Kurir (Cairkan Poin)
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-gray-300">
                <button 
                  className="btn-secondary text-xs py-2.5 w-full flex items-center justify-center text-center font-bold"
                  onClick={() => {
                    setTrackingOrder(activeOrder);
                    setActiveOrder(null);
                  }}
                >
                  Buka Pelacak Donasi
                </button>
                <button 
                  className="btn-primary text-xs py-2.5 w-full flex items-center justify-center text-center font-bold" 
                  onClick={() => setActiveOrder(null)}
                >
                  Simpan Tiket
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 7. DONATION TRACKER MODAL ── */}
      <DonationTrackerModal
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
      />

    </div>
  );
}
