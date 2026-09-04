'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
  AlertCircle
} from 'lucide-react';
import { DropMethod, DropOrder, DropPoint } from '@/lib/types';
import { calculateEcoImpact, formatNumber, generateBookingCode } from '@/lib/utils';
import { useApp } from '@/lib/store';
import { fetchDropPoints } from '@/lib/supabase/data';
import { CardSlideshow, SlideItem } from '@/components/ui/CardSlideshow';

// Dynamically import OpenStreetMap component to prevent SSR hydration errors
const DropPointMap = dynamic(
  () => import('@/components/map/DropPointMap').then((mod) => mod.DropPointMap),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: '320px', background: 'var(--surface-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-muted)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem' }}>
        Memuat OpenStreetMap...
      </div>
    ),
  }
);

const DROP_GALLERY_SLIDES: SlideItem[] = [
  {
    id: 'dp-1',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    tag: 'Mitra Kafe',
    title: 'Anomali Coffee Senopati',
    subtitle: 'Kotak serah mandiri di area depan kafe',
  },
  {
    id: 'dp-2',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    tag: 'Pusat Perbelanjaan',
    title: 'Grand Indonesia West Mall',
    subtitle: 'Drop Box Lantai 2 area lift lobby',
  },
  {
    id: 'dp-3',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tag: 'Bank Sampah',
    title: 'Nyampah Baik Bandung',
    subtitle: 'Timbangan digital terintegrasi sistem poin',
  },
];

const TIME_SLOTS = [
  '09:00 - 12:00 (Pagi)',
  '13:00 - 16:00 (Siang)',
  '16:00 - 19:00 (Sore)',
];

export default function DropPage() {
  const { addDropOrder, dropOrders, currentUser, userProfile } = useApp();

  const [pointsList, setPointsList] = useState<DropPoint[]>([]);
  const [method, setMethod] = useState<DropMethod>('DROPOFF');
  const [selectedPointId, setSelectedPointId] = useState<string>('');
  const [cityFilter, setCityFilter] = useState('Semua');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [weight, setWeight] = useState(3.5);
  const [itemCount, setItemCount] = useState(8);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [scheduledDate, setScheduledDate] = useState('Hari Ini');
  const [scheduledSlot, setScheduledSlot] = useState(TIME_SLOTS[0]);
  const [categories, setCategories] = useState<string[]>(['Kaos / Katun', 'Denim']);
  const [activeOrder, setActiveOrder] = useState<DropOrder | null>(null);

  // Status lookup state
  const [lookupCode, setLookupCode] = useState('');
  const [lookupResult, setLookupResult] = useState<DropOrder | null | 'NOT_FOUND'>(null);

  useEffect(() => {
    fetchDropPoints().then(data => {
      setPointsList(data);
      if (data.length > 0) setSelectedPointId(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.full_name) setDonorName(userProfile.full_name);
      if (userProfile.phone) setDonorPhone(userProfile.phone);
    }
  }, [userProfile]);

  const selectedPoint = pointsList.find(p => p.id === selectedPointId) || pointsList[0];
  const { waterSaved, co2Saved, points } = calculateEcoImpact(weight);

  const cities = ['Semua', 'Jakarta Selatan', 'Jakarta Pusat', 'Bandung', 'Surabaya', 'Bali', 'Yogyakarta'];
  const filteredPoints = cityFilter === 'Semua' ? pointsList : pointsList.filter(p => p.city.includes(cityFilter));
  const garmentOptions = ['Kaos / Katun', 'Denim', 'Kemeja', 'Jaket / Outer', 'Kain Perca', 'Sprei & Handuk'];

  const toggleCat = (c: string) => setCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingCode = generateBookingCode('CLD');
    const order: DropOrder = {
      id: Math.random().toString(36).slice(2),
      bookingCode,
      userId: currentUser?.id || 'usr-guest',
      userName: donorName || userProfile?.full_name || 'Donatur ClothLoop',
      userPhone: donorPhone || userProfile?.phone || '',
      userAddress: method === 'PICKUP' ? pickupAddress : undefined,
      method,
      dropPointId: method === 'DROPOFF' && selectedPoint ? selectedPoint.id : undefined,
      dropPointName: method === 'DROPOFF' && selectedPoint ? selectedPoint.name : undefined,
      courierService: method === 'PICKUP' ? 'Gojek / Grab Instant' : undefined,
      estimatedWeightKg: weight,
      itemCount,
      garmentTypes: categories,
      status: 'PENDING',
      pointsAwarded: points,
      waterSavedLiters: waterSaved,
      co2SavedKg: co2Saved,
      createdAt: new Date().toISOString(),
      qrCodeValue: `https://clothloop.id/track/${bookingCode}`,
    };
    addDropOrder(order);
    setActiveOrder(order);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCode) return;
    const found = dropOrders.find(o => o.bookingCode.toLowerCase() === lookupCode.trim().toLowerCase());
    setLookupResult(found || 'NOT_FOUND');
  };

  return (
    <div className="overflow-x-hidden">

      {/* Header */}
      <div className="bg-[var(--forest-deep)] py-10 sm:py-12 text-white">
        <div className="container-site">
          <span className="label-eyebrow text-white/70 block mb-1">ClothDrop Portal</span>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                Penyerahan & Donasi Pakaian
              </h1>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-lg leading-relaxed">
                Antar pakaian ke titik rekanan atau gunakan layanan penjemputan. Dapatkan +100 poin reward per kilogram pakaian.
              </p>
            </div>
            
            {/* Status Lookup */}
            <form onSubmit={handleLookup} className="flex gap-1.5 w-full md:w-auto bg-white/10 p-1.5 border border-white/20">
              <input
                value={lookupCode}
                onChange={e => setLookupCode(e.target.value)}
                placeholder="Cek status (CLD-XXXX)"
                className="bg-transparent border-none text-white text-xs px-2 focus:outline-none placeholder-white/50 w-full md:w-44 font-mono"
              />
              <button type="submit" className="btn-primary text-[10px] py-1 px-3 bg-white text-[var(--forest-deep)] font-semibold border-none cursor-pointer">
                <Search size={12} /> Cek
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Lookup Result Banner */}
      {lookupResult && (
        <div className="bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-3">
          <div className="container-site flex justify-between items-center text-xs">
            {lookupResult === 'NOT_FOUND' ? (
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle size={15} />
                <span>Kode <strong>{lookupCode}</strong> tidak ditemukan dalam sistem.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[var(--forest-deep)]">
                <CheckCircle size={15} />
                <span>Kode <strong>{lookupResult.bookingCode}</strong>: Status <strong>{lookupResult.status}</strong> ({lookupResult.estimatedWeightKg} kg &middot; +{lookupResult.pointsAwarded} Poin)</span>
              </div>
            )}
            <button onClick={() => setLookupResult(null)} className="text-[var(--ink-muted)] hover:text-black text-xs font-semibold cursor-pointer">Tutup</button>
          </div>
        </div>
      )}

      <div className="container-site py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Column (7 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[var(--border-hairline)] flex flex-col gap-6">

            {/* Step 1: Method */}
            <div>
              <span className="label-eyebrow block mb-2">1. Metode Serah Terima</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'DROPOFF', icon: Store, title: 'Antar Mandiri', desc: 'Serahkan ke kotak rekanan terdekat' },
                  { id: 'PICKUP', icon: Truck, title: 'Jemput Kurir', desc: 'Penjemputan langsung dari rumah' },
                ].map(opt => {
                  const Icon = opt.icon;
                  const isSelected = method === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setMethod(opt.id as DropMethod)}
                      className={`p-3.5 text-left border transition-colors cursor-pointer flex flex-col gap-1.5 ${
                        isSelected ? 'bg-[var(--forest-subtle)] border-[var(--forest-deep)]' : 'bg-white border-[var(--border-hairline)] hover:border-gray-400'
                      }`}
                    >
                      <Icon size={16} className={isSelected ? 'text-[var(--forest-deep)]' : 'text-gray-400'} />
                      <div>
                        <p className={`font-semibold text-xs ${isSelected ? 'text-[var(--forest-deep)]' : 'text-[var(--ink-primary)]'}`}>{opt.title}</p>
                        <p className="text-[10px] text-[var(--ink-muted)]">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Location Map or Address */}
            {method === 'DROPOFF' ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="label-eyebrow">2. Lokasi Drop Point ({filteredPoints.length} Titik)</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setViewMode('map')}
                      className={`text-[10px] font-semibold px-2 py-1 border flex items-center gap-1 cursor-pointer ${viewMode === 'map' ? 'bg-[var(--forest-deep)] text-white border-[var(--forest-deep)]' : 'bg-white text-gray-600 border-[var(--border-hairline)]'}`}
                    >
                      <MapIcon size={11} /> Peta
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`text-[10px] font-semibold px-2 py-1 border flex items-center gap-1 cursor-pointer ${viewMode === 'list' ? 'bg-[var(--forest-deep)] text-white border-[var(--forest-deep)]' : 'bg-white text-gray-600 border-[var(--border-hairline)]'}`}
                    >
                      <List size={11} /> Daftar
                    </button>
                  </div>
                </div>

                {/* City filters */}
                <div className="flex gap-1.5 scroll-touch-x pb-2">
                  {cities.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCityFilter(c)}
                      className={`text-[10px] px-2.5 py-1 border whitespace-nowrap cursor-pointer ${cityFilter === c ? 'bg-[var(--forest-deep)] text-white border-[var(--forest-deep)]' : 'bg-transparent text-[var(--ink-muted)] border-[var(--border-hairline)]'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {viewMode === 'map' ? (
                  <DropPointMap
                    points={filteredPoints}
                    selectedPointId={selectedPointId}
                    onSelectPoint={id => setSelectedPointId(id)}
                    height="260px"
                  />
                ) : (
                  <div className="max-h-52 overflow-y-auto border border-[var(--border-hairline)] divide-y divide-[var(--border-hairline)]">
                    {filteredPoints.map(pt => (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => setSelectedPointId(pt.id)}
                        className={`p-2.5 text-left w-full flex justify-between items-center transition-colors cursor-pointer ${selectedPointId === pt.id ? 'bg-[var(--forest-subtle)]' : 'hover:bg-gray-50'}`}
                      >
                        <div>
                          <span className="text-[9px] text-[var(--ink-muted)] uppercase tracking-wider block font-semibold">{pt.city} &middot; {pt.category}</span>
                          <span className="text-xs font-semibold text-[var(--ink-primary)]">{pt.name}</span>
                        </div>
                        {selectedPointId === pt.id && <span className="text-[10px] font-bold text-[var(--forest-deep)]">Terpilih</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <span className="label-eyebrow block mb-1">2. Alamat Lengkap Penjemputan</span>
                <textarea
                  value={pickupAddress}
                  onChange={e => setPickupAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, patokan..."
                  rows={2}
                  required
                  className="input-minimal text-xs"
                />
              </div>
            )}

            {/* Step 3: Date & Slot Picker */}
            <div>
              <span className="label-eyebrow block mb-2">3. Jadwal Waktu Serah Terima</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block mb-1">Hari:</span>
                  <div className="flex gap-1">
                    {['Hari Ini', 'Besok', 'Lusa'].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setScheduledDate(d)}
                        className={`text-xs flex-1 py-1.5 border font-medium cursor-pointer ${scheduledDate === d ? 'bg-[var(--forest-deep)] text-white border-[var(--forest-deep)]' : 'bg-transparent text-[var(--ink-primary)] border-[var(--border-hairline)]'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 uppercase block mb-1">Slot Jam:</span>
                  <select
                    value={scheduledSlot}
                    onChange={e => setScheduledSlot(e.target.value)}
                    className="w-full bg-white border border-[var(--border-hairline)] text-xs p-1.5 font-medium text-[var(--ink-primary)] focus:outline-none"
                  >
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Garments & Contact */}
            <div className="flex flex-col gap-3">
              <span className="label-eyebrow">4. Estimasi Pakaian & Kontak</span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">Perkiraan Berat (kg)</span>
                  <input
                    type="number"
                    value={weight}
                    step={0.5}
                    min={0.5}
                    max={50}
                    onChange={e => setWeight(Number(e.target.value))}
                    className="input-minimal text-lg font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">Jumlah Helai</span>
                  <input
                    type="number"
                    value={itemCount}
                    step={1}
                    min={1}
                    max={200}
                    onChange={e => setItemCount(Number(e.target.value))}
                    className="input-minimal text-lg font-bold"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {garmentOptions.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleCat(g)}
                    className={`text-[10px] px-2 py-1 border cursor-pointer ${categories.includes(g) ? 'bg-[var(--forest-deep)] text-white border-[var(--forest-deep)]' : 'bg-transparent text-gray-600 border-[var(--border-hairline)]'}`}
                  >
                    {categories.includes(g) ? '✓ ' : ''}{g}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <input
                  value={donorName}
                  onChange={e => setDonorName(e.target.value)}
                  required
                  placeholder="Nama Lengkap"
                  className="input-minimal text-xs"
                />
                <input
                  value={donorPhone}
                  onChange={e => setDonorPhone(e.target.value)}
                  required
                  placeholder="Nomor WhatsApp"
                  className="input-minimal text-xs"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary justify-center w-full mt-1">
              Konfirmasi & Buat Tiket Booking
            </button>
          </form>

          {/* Right Column: Slideshow & Factual Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="label-eyebrow block mb-2">Dokumentasi Lokasi Drop Point</span>
              <CardSlideshow
                slides={DROP_GALLERY_SLIDES}
                aspectRatio="aspect-[16/10]"
                autoPlay={true}
                interval={5000}
              />
            </div>

            <div className="bg-[var(--forest-deep)] text-white p-5 border border-[var(--forest-deep)]">
              <span className="label-eyebrow text-white/70 block mb-2 text-[10px]">
                Ringkasan Donasi ({weight} kg)
              </span>

              <div className="flex flex-col gap-2.5 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-white/70">Air Bersih Terhemat:</span>
                  <strong className="font-serif text-sm">{formatNumber(waterSaved)} L</strong>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <span className="text-white/70">Emisi Karbon Dicegah:</span>
                  <strong className="font-serif text-sm">{co2Saved} kg CO₂e</strong>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <span className="text-white/70">Reward Poin:</span>
                  <strong className="font-mono text-sm text-[var(--ochre-subtle)]">+{points} Poin</strong>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Clean Industrial Receipt Modal (Zero AI Slop) */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActiveOrder(null)}>
          <div className="bg-white max-w-sm w-full p-6 border border-[var(--ink-primary)] shadow-lg flex flex-col gap-4 font-mono text-xs" onClick={e => e.stopPropagation()}>
            
            <div className="text-center pb-3 border-b border-dashed border-[var(--border-strong)]">
              <span className="font-serif text-base font-bold tracking-tight block">CLOTHLOOP.ID</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">BUKTI PENYERAHAN TEKSTIL</span>
            </div>

            <div className="flex flex-col gap-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-gray-500">Kode Booking:</span><strong>{activeOrder.bookingCode}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Donatur:</span><span>{activeOrder.userName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Metode:</span><span>{activeOrder.method === 'DROPOFF' ? 'Antar Mandiri' : 'Jemput Kurir'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Jadwal:</span><span>{scheduledDate} ({scheduledSlot.split(' ')[0]})</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Estimasi Berat:</span><span>{activeOrder.estimatedWeightKg} kg ({activeOrder.itemCount} helai)</span></div>
              <div className="flex justify-between pt-1 border-t border-[var(--border-hairline)]"><span className="text-gray-500">Reward Poin:</span><strong className="text-[var(--forest-deep)]">+{activeOrder.pointsAwarded} Poin</strong></div>
            </div>

            <div className="text-[10px] text-gray-500 text-center italic border-t border-dashed border-[var(--border-strong)] pt-3">
              Tunjukkan kode booking ini saat menyerahkan pakaian kepada petugas rekanan.
            </div>

            <button className="btn-primary justify-center text-xs py-2 w-full mt-1" onClick={() => setActiveOrder(null)}>
              Tutup & Simpan Tiket
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
