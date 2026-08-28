'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Recycle, MapPin, Clock, Phone, QrCode, CheckCircle2, Truck, Store, ArrowRight } from 'lucide-react';
import { MOCK_DROP_POINTS } from '@/lib/constants';
import { DropMethod, DropOrder } from '@/lib/types';
import { calculateEcoImpact, formatNumber, generateBookingCode } from '@/lib/utils';
import { useApp } from '@/lib/store';

export default function DropPage() {
  const { addDropOrder, dropOrders } = useApp();

  const [method, setMethod] = useState<DropMethod>('DROPOFF');
  const [selectedPointId, setSelectedPointId] = useState(MOCK_DROP_POINTS[0].id);
  const [cityFilter, setCityFilter] = useState('Semua');
  const [weight, setWeight] = useState(3.5);
  const [itemCount, setItemCount] = useState(8);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [categories, setCategories] = useState<string[]>(['Kaos / Katun', 'Denim']);
  const [activeOrder, setActiveOrder] = useState<DropOrder | null>(null);

  const selectedPoint = MOCK_DROP_POINTS.find(p => p.id === selectedPointId) || MOCK_DROP_POINTS[0];
  const { waterSaved, co2Saved, points } = calculateEcoImpact(weight);

  const cities = ['Semua', 'Jakarta Selatan', 'Jakarta Pusat', 'Bandung', 'Surabaya', 'Bali', 'Yogyakarta'];
  const filteredPoints = cityFilter === 'Semua' ? MOCK_DROP_POINTS : MOCK_DROP_POINTS.filter(p => p.city.includes(cityFilter));

  const garmentOptions = ['Kaos / Katun', 'Denim', 'Kemeja', 'Jaket / Outer', 'Kain Perca', 'Sprei & Handuk'];

  const toggleCat = (c: string) => setCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingCode = generateBookingCode('CLD');
    const order: DropOrder = {
      id: Math.random().toString(36).slice(2),
      bookingCode,
      userId: 'usr-1',
      userName: donorName || 'Anonim',
      userPhone: donorPhone,
      userAddress: method === 'PICKUP' ? pickupAddress : undefined,
      method,
      dropPointId: method === 'DROPOFF' ? selectedPoint.id : undefined,
      dropPointName: method === 'DROPOFF' ? selectedPoint.name : undefined,
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

  return (
    <div>

      {/* Header */}
      <div style={{ background: 'var(--forest)', padding: '4rem 0 3rem' }}>
        <div className="container-editorial">
          <span className="label-caps" style={{ color: 'var(--sage-light)' }}>ClothDrop Hub</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.25rem, 5vw, 4rem)', color: '#fff', marginTop: '0.75rem', lineHeight: 1.08, maxWidth: '30rem' }}>
            Selamatkan pakaianmu dari landfill.
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--sage-light)', fontSize: '1rem', marginTop: '1rem', maxWidth: '28rem', lineHeight: 1.7, fontWeight: 300 }}>
            Antar ke drop-box terdekat atau minta penjemputan kurir. Setiap helai tercatat transparan dengan QR digital.
          </p>
        </div>
      </div>

      <div className="container-editorial" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left: Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            {/* Step 1: Method */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span className="label-caps">1. Pilih Metode</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { id: 'DROPOFF', icon: Store, label: 'Antar Mandiri', sub: 'Drop ke titik terdekat' },
                  { id: 'PICKUP', icon: Truck, label: 'Jemput Kurir', sub: 'Penjemputan dari rumah' },
                ].map(opt => {
                  const Icon = opt.icon;
                  const active = method === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setMethod(opt.id as DropMethod)}
                      style={{
                        padding: '1.25rem',
                        border: active ? '1px solid var(--forest)' : '1px solid var(--line)',
                        background: active ? 'var(--sage-faint)' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} style={{ color: active ? 'var(--forest)' : 'var(--ink-muted)' }} />
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: active ? 'var(--forest)' : 'var(--ink)' }}>{opt.label}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: '0.125rem' }}>{opt.sub}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drop Point Selector */}
            {method === 'DROPOFF' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="label-caps">2. Pilih Titik Drop</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{filteredPoints.length} titik aktif</span>
                </div>

                {/* City pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cities.map(c => (
                    <button key={c} type="button" onClick={() => setCityFilter(c)}
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 500, padding: '0.375rem 0.875rem', border: cityFilter === c ? '1px solid var(--forest)' : '1px solid var(--line)', background: cityFilter === c ? 'var(--forest)' : 'transparent', color: cityFilter === c ? '#fff' : 'var(--ink-muted)', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {c}
                    </button>
                  ))}
                </div>

                {/* Drop Point List */}
                <div style={{ maxHeight: '16rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)' }}>
                  {filteredPoints.map((pt, i) => (
                    <button key={pt.id} type="button" onClick={() => setSelectedPointId(pt.id)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 0',
                        borderBottom: '1px solid var(--line)',
                        background: 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                        opacity: selectedPointId === pt.id ? 1 : 0.7,
                      }}>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{pt.city} · {pt.category}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: selectedPointId === pt.id ? 'var(--forest)' : 'var(--ink)' }}>{pt.name}</p>
                      </div>
                      {selectedPointId === pt.id && (
                        <CheckCircle2 size={16} strokeWidth={1.5} style={{ color: 'var(--sage)', flexShrink: 0 }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pickup Address */}
            {method === 'PICKUP' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span className="label-caps">2. Alamat Penjemputan</span>
                <textarea
                  value={pickupAddress}
                  onChange={e => setPickupAddress(e.target.value)}
                  placeholder="Jl. Kemang Raya No. 15, Jakarta Selatan..."
                  rows={3}
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--line-strong)', padding: '0.5rem 0', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink)', outline: 'none', resize: 'none' }}
                />
              </div>
            )}

            {/* Weight & Count */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span className="label-caps">3. Estimasi Pakaian</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {[
                  { label: 'Berat (kg)', value: weight, setter: (v: number) => setWeight(v), step: 0.5, min: 0.5, max: 50 },
                  { label: 'Jumlah (helai)', value: itemCount, setter: (v: number) => setItemCount(v), step: 1, min: 1, max: 200 },
                ].map(field => (
                  <div key={field.label}>
                    <span className="label-caps" style={{ fontSize: '0.625rem', display: 'block', marginBottom: '0.5rem' }}>{field.label}</span>
                    <input
                      type="number"
                      value={field.value}
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      onChange={e => field.setter(Number(e.target.value))}
                      className="input-underline"
                      style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                    />
                  </div>
                ))}
              </div>

              {/* Categories */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {garmentOptions.map(g => (
                  <button key={g} type="button" onClick={() => toggleCat(g)}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', padding: '0.375rem 0.875rem', border: categories.includes(g) ? '1px solid var(--forest)' : '1px solid var(--line)', background: categories.includes(g) ? 'var(--forest)' : 'transparent', color: categories.includes(g) ? '#fff' : 'var(--ink-muted)', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {categories.includes(g) ? '✓ ' : ''}{g}
                  </button>
                ))}
              </div>
            </div>

            {/* Identity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span className="label-caps">4. Data Donatur</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <span className="label-caps" style={{ fontSize: '0.625rem', display: 'block', marginBottom: '0.5rem' }}>Nama</span>
                  <input value={donorName} onChange={e => setDonorName(e.target.value)} placeholder="Nama lengkap" className="input-underline" />
                </div>
                <div>
                  <span className="label-caps" style={{ fontSize: '0.625rem', display: 'block', marginBottom: '0.5rem' }}>WhatsApp</span>
                  <input value={donorPhone} onChange={e => setDonorPhone(e.target.value)} placeholder="081xxxxxxxxx" className="input-underline" />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
              <QrCode size={15} />
              Generate QR Label Digital
            </button>
          </form>

          {/* Right: Sticky Impact Panel */}
          <div style={{ position: 'sticky', top: '5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Impact Numbers */}
            <div style={{ borderTop: '3px solid var(--forest)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
              <span className="label-caps" style={{ marginBottom: '1.25rem' }}>Estimasi Dampak Booking Ini</span>
              {[
                { label: 'Air bersih terhemat', value: `${formatNumber(waterSaved)} L`, sub: `Dari ${weight} kg pakaian` },
                { label: 'Emisi CO₂ dicegah', value: `${co2Saved} kg`, sub: 'CO₂ equivalent' },
                { label: 'ClothPoints diterima', value: `+${points}`, sub: 'Masuk ke akunmu' },
              ].map((s, i) => (
                <div key={s.label} style={{ padding: '1.25rem 0', borderBottom: i < 2 ? '1px solid var(--line)' : 'none' }}>
                  <span className="label-caps" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.6rem' }}>{s.label}</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.25rem', fontWeight: 700, color: 'var(--forest)', display: 'block', lineHeight: 1.1 }}>{s.value}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-faint)' }}>{s.sub}</span>
                </div>
              ))}
            </div>

            {/* Selected Drop Point Card */}
            {method === 'DROPOFF' && (
              <div style={{ border: '1px solid var(--line)' }}>
                <div style={{ position: 'relative', height: '10rem', background: 'var(--cream-deep)', overflow: 'hidden' }}>
                  <Image src={selectedPoint.image} alt={selectedPoint.name} fill className="object-cover" sizes="35vw" />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span className="label-caps" style={{ display: 'block', marginBottom: '0.375rem' }}>{selectedPoint.category}</span>
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.9375rem', color: 'var(--ink)', marginBottom: '0.875rem', lineHeight: 1.4 }}>{selectedPoint.name}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { icon: MapPin, text: selectedPoint.address },
                      { icon: Clock, text: selectedPoint.operatingHours },
                      { icon: Phone, text: selectedPoint.contactPhone },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                        <Icon size={13} strokeWidth={1.5} style={{ color: 'var(--ink-muted)', marginTop: '0.125rem', flexShrink: 0 }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Past Orders */}
            {dropOrders.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <span className="label-caps" style={{ marginBottom: '1rem' }}>Booking Aktif</span>
                {dropOrders.slice(0, 3).map((ord, i) => (
                  <button key={ord.id} type="button" onClick={() => setActiveOrder(ord)}
                    style={{ display: 'flex', justifyContent: 'space-between', padding: '0.875rem 0', borderBottom: i < dropOrders.length - 1 ? '1px solid var(--line)' : 'none', cursor: 'pointer', textAlign: 'left', background: 'none', border: 'none', width: '100%' }}>
                    <div>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'var(--forest)', marginBottom: '0.125rem' }}>{ord.bookingCode}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{ord.estimatedWeightKg} kg · {ord.itemCount} helai</p>
                    </div>
                    <ArrowRight size={14} strokeWidth={1.5} style={{ color: 'var(--ink-faint)', flexShrink: 0, marginTop: '0.25rem' }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {activeOrder && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15,14,13,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setActiveOrder(null)}>
          <div style={{ background: 'var(--white)', maxWidth: '28rem', width: '100%', padding: '2.5rem' }} onClick={e => e.stopPropagation()}>

            <span className="label-caps" style={{ display: 'block', marginBottom: '1.5rem', color: 'var(--sage)' }}>Label QR Digital — Cetak & Tempel</span>

            {/* QR Block */}
            <div style={{ border: '1px solid var(--ink)', padding: '2rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: "'DM Mono', monospace" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--forest)' }}>ClothLoop</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--ink-muted)' }}>.id</span>
              </div>

              {/* Simulated QR Pattern */}
              <div style={{ background: 'var(--ink)', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '3px', width: '8rem', height: '8rem' }}>
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} style={{ background: ([0,1,7,8,14,15,56,57,63,32,33,34,9,13,24,25,30,31,40,45,50,55].includes(i)) ? '#fff' : 'transparent' }} />
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Kode Booking</span>
                  <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{activeOrder.bookingCode}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Donatur</span>
                  <span style={{ color: 'var(--ink)' }}>{activeOrder.userName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Estimasi</span>
                  <span style={{ color: 'var(--ink)' }}>{activeOrder.estimatedWeightKg} kg · {activeOrder.itemCount} helai</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Metode</span>
                  <span style={{ color: 'var(--forest)', fontWeight: 600 }}>{activeOrder.method === 'DROPOFF' ? `Drop: ${activeOrder.dropPointName}` : 'Pickup Kurir'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--line)' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Reward Estimasi</span>
                  <span style={{ color: 'var(--sage)', fontWeight: 700 }}>+{activeOrder.pointsAwarded} ClothPoints</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setActiveOrder(null)}>
                <QrCode size={14} /> Simpan Label
              </button>
              <button className="btn-secondary" onClick={() => setActiveOrder(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
