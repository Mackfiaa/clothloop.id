'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Scissors, Star, ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { CraftServiceType, ArtisanProfile } from '@/lib/types';
import { useApp } from '@/lib/store';
import { formatRupiah, generateBookingCode } from '@/lib/utils';
import { fetchArtisans } from '@/lib/supabase/data';

const SERVICE_TYPES: { id: CraftServiceType; label: string; desc: string; price: string }[] = [
  { id: 'REPAIR', label: 'Repair & Mending', desc: 'Tambal dan perkuat kain yang rusak dengan teknik presisi tinggi.', price: 'Mulai Rp 65.000' },
  { id: 'REWORK', label: 'Rework & Upcycle', desc: 'Transformasi total dari pakaian lama menjadi siluet baru.', price: 'Mulai Rp 150.000' },
  { id: 'CUSTOM_PATCHWORK', label: 'Custom Patchwork', desc: 'Gabungkan potongan kain menjadi karya tekstil original.', price: 'Mulai Rp 120.000' },
  { id: 'UPCYCLE_BAG', label: 'Upcycle to Bag', desc: 'Sulap kain bekas menjadi tas fungsional berkarakter.', price: 'Mulai Rp 200.000' },
];

export default function CraftPage() {
  const { addNotification } = useApp();
  const [artisans, setArtisans] = useState<ArtisanProfile[]>([]);
  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanProfile | null>(null);
  const [service, setService] = useState<CraftServiceType>('REPAIR');
  const [garmentDesc, setGarmentDesc] = useState('');
  const [visionDesc, setVisionDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchArtisans().then(data => {
      setArtisans(data);
      if (data.length > 0) {
        setSelectedArtisan(data[0]);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArtisan) return;
    const code = generateBookingCode('CCR');
    addNotification('success', 'Request dikirim!', `Kode booking ${code}. ${selectedArtisan.name} akan merespons dalam 24 jam.`);
    setSubmitted(true);
  };

  const selectedService = SERVICE_TYPES.find(s => s.id === service)!;

  return (
    <div>

      {/* Header — Terracotta tinted */}
      <div style={{ background: 'var(--terracotta-light)', borderBottom: '1px solid rgba(196,107,58,0.2)', padding: '4rem 0 3rem' }}>
        <div className="container-editorial">
          <span className="label-caps" style={{ color: 'var(--terracotta)' }}>ClothCraft Studio</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.25rem, 5vw, 4rem)', color: 'var(--ink)', marginTop: '0.75rem', lineHeight: 1.08, maxWidth: '36rem' }}>
            Bukan sekadar tambal.<br /><em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>Reka ulang.</em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--ink-muted)', marginTop: '1rem', maxWidth: '28rem', lineHeight: 1.75, fontWeight: 300 }}>
            Hubungkan pakaian usangmu dengan artisan spesialis daur ulang terpilih dari seluruh Nusantara.
          </p>
        </div>
      </div>

      <div className="container-editorial" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

        {/* Services Grid */}
        <div style={{ marginBottom: '5rem' }}>
          <span className="label-caps" style={{ display: 'block', marginBottom: '1.5rem' }}>Layanan Craft Tersedia</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1px', border: '1px solid var(--line)', background: 'var(--line)' }}>
            {SERVICE_TYPES.map(s => (
              <button
                key={s.id}
                onClick={() => setService(s.id)}
                style={{
                  padding: '1.75rem',
                  background: service === s.id ? 'var(--terracotta-light)' : 'var(--white)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.625rem',
                  transition: 'background 0.2s',
                }}
              >
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.9375rem', color: service === s.id ? 'var(--terracotta)' : 'var(--ink)' }}>{s.label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>{s.desc}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: service === s.id ? 'var(--terracotta)' : 'var(--ink-faint)', marginTop: '0.25rem' }}>{s.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Artisan Directory */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span className="label-caps">Pilih Artisan</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginTop: '0.5rem', lineHeight: 1.1 }}>
                {artisans.length} pengrajin terverifikasi
              </h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {artisans.map(artisan => (
              <button
                key={artisan.id}
                onClick={() => setSelectedArtisan(artisan)}
                style={{
                  border: selectedArtisan?.id === artisan.id ? '1px solid var(--terracotta)' : '1px solid transparent',
                  background: 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Portrait */}
                <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--cream-deep)' }} className="img-hover-zoom">
                  <Image src={artisan.coverImage} alt={artisan.name} fill className="object-cover" sizes="25vw" />
                  {selectedArtisan?.id === artisan.id && (
                    <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'var(--terracotta)', borderRadius: '9999px', padding: '0.25rem' }}>
                      <CheckCircle2 size={16} strokeWidth={2} style={{ color: '#fff' }} />
                    </div>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: '1rem 0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.375rem' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.0625rem', color: 'var(--ink)', lineHeight: 1.3 }}>{artisan.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={11} strokeWidth={0} style={{ fill: 'var(--golden)', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: 'var(--golden)' }}>{artisan.rating}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{artisan.city} · {artisan.yearsOfExperience} tahun pengalaman</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--terracotta)', marginTop: '0.5rem', lineHeight: 1.5 }}>{artisan.specialty.join(' · ')}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--sage)', marginTop: '0.375rem' }}>{artisan.completedOrders} proyek selesai</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Request Form */}
        {selectedArtisan && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

            {/* Left: Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ borderTop: '3px solid var(--terracotta)', paddingTop: '1.5rem', marginBottom: '2.5rem' }}>
                <span className="label-caps" style={{ color: 'var(--terracotta)' }}>Buat Request Upcycling</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', marginTop: '0.5rem', lineHeight: 1.15 }}>
                  Ceritakan visimu.
                </h2>
              </div>

              {submitted ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem' }}>
                  <CheckCircle2 size={36} strokeWidth={1.25} style={{ color: 'var(--terracotta)' }} />
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.375rem', color: 'var(--ink)' }}>Request Terkirim!</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                    <strong>{selectedArtisan.name}</strong> akan merespons dalam 24 jam. Pantau di halaman Eco Impact.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                    Buat Request Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ padding: '1.25rem', background: 'var(--terracotta-light)', border: '1px solid rgba(196,107,58,0.2)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <span className="label-caps" style={{ color: 'var(--terracotta)', fontSize: '0.625rem' }}>Artisan terpilih</span>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>{selectedArtisan.name}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{selectedService.label} · {selectedService.price}</p>
                  </div>

                  {[
                    { label: 'Deskripsi Pakaian', value: garmentDesc, setter: setGarmentDesc, placeholder: "Jaket denim washed ukuran L, ada robekan 5cm di siku kanan..." },
                    { label: 'Visi Hasil Akhir', value: visionDesc, setter: setVisionDesc, placeholder: "Ingin ditambahkan patch bunga sakura di punggung, dengan sulam warna emas..." },
                  ].map(field => (
                    <div key={field.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span className="label-caps" style={{ fontSize: '0.625rem' }}>{field.label}</span>
                      <textarea
                        value={field.value}
                        onChange={e => field.setter(e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                        required
                        style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--line-strong)', padding: '0.5rem 0', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink)', outline: 'none', resize: 'none', width: '100%' }}
                      />
                    </div>
                  ))}

                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', background: 'var(--terracotta)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--ink)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--terracotta)')}>
                    <Send size={14} />
                    Kirim Request ke Artisan
                  </button>
                </form>
              )}
            </div>

            {/* Right: Selected Artisan Detail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '5rem' }}>
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--cream-deep)' }} className="img-hover-zoom">
                <Image src={selectedArtisan.coverImage} alt={selectedArtisan.name} fill className="object-cover" sizes="40vw" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.375rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>{selectedArtisan.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink-muted)', marginBottom: '1rem' }}>{selectedArtisan.city} · {selectedArtisan.yearsOfExperience} tahun</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>{selectedArtisan.bio}</p>
              </div>
              <div style={{ display: 'flex', gap: '2rem', padding: '1.25rem 0', borderTop: '1px solid var(--line)' }}>
                {[
                  [`${selectedArtisan.rating}`, 'Rating'],
                  [`${selectedArtisan.completedOrders}`, 'Proyek'],
                  [`${selectedArtisan.yearsOfExperience}`, 'Tahun'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.5rem', color: 'var(--terracotta)', display: 'block' }}>{v}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
