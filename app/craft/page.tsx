'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Send, 
  CheckCircle2, 
  Calculator, 
  MessageCircle
} from 'lucide-react';
import { CraftServiceType, ArtisanProfile } from '@/lib/types';
import { useApp } from '@/lib/store';
import { formatRupiah, generateBookingCode } from '@/lib/utils';
import { fetchArtisans } from '@/lib/supabase/data';

const SERVICE_TYPES: { id: CraftServiceType; label: string; desc: string; basePrice: number }[] = [
  { id: 'REPAIR', label: 'Reparasi & Penambalan', desc: 'Perbaikan serat kain, jahitan lepas, dan lubang.', basePrice: 65000 },
  { id: 'REWORK', label: 'Rework & Rekonstruksi', desc: 'Perubahan total siluet dan bentuk pakaian lama.', basePrice: 150000 },
  { id: 'CUSTOM_PATCHWORK', label: 'Custom Patchwork', desc: 'Aplikasi perca kain lawasan dan sulam tangan.', basePrice: 120000 },
  { id: 'UPCYCLE_BAG', label: 'Upcycle Jadi Tas', desc: 'Konversi denim/outer usang menjadi tas jinjing.', basePrice: 200000 },
];

const FABRIC_COMPLEXITIES = [
  { label: 'Katun / Linen (Standar)', mult: 1.0 },
  { label: 'Denim Jeans (12-14oz)', mult: 1.25 },
  { label: 'Batik / Sutra (Sensitif)', mult: 1.4 },
  { label: 'Kanvas Berat / Kulit', mult: 1.6 },
];

export default function CraftPage() {
  const { addNotification } = useApp();
  const [artisans, setArtisans] = useState<ArtisanProfile[]>([]);
  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanProfile | null>(null);
  const [service, setService] = useState<CraftServiceType>('REWORK');
  const [garmentDesc, setGarmentDesc] = useState('');
  const [visionDesc, setVisionDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Cost Estimator State
  const [calcService, setCalcService] = useState<CraftServiceType>('REWORK');
  const [calcFabric, setCalcFabric] = useState(0);
  const [calcUnits, setCalcUnits] = useState(1);

  // Per-artisan portfolio index
  const [artisanSlideIdx, setArtisanSlideIdx] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    fetchArtisans().then(data => {
      setArtisans(data);
      if (data.length > 0) setSelectedArtisan(data[0]);
    });
  }, []);

  const selectedService = SERVICE_TYPES.find(s => s.id === service)!;
  const calcBase = SERVICE_TYPES.find(s => s.id === calcService)?.basePrice || 150000;
  const estimatedCost = Math.round(calcBase * FABRIC_COMPLEXITIES[calcFabric].mult * calcUnits);
  const estimatedDays = calcService === 'REPAIR' ? '2-3 Hari Kerja' : calcService === 'UPCYCLE_BAG' ? '4-6 Hari Kerja' : '5-8 Hari Kerja';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArtisan) return;
    const code = generateBookingCode('CCR');
    addNotification('success', 'Permintaan Terkirim', `Kode konsultasi ${code}. Perajin akan menghubungi via WhatsApp.`);
    setSubmitted(true);
  };

  return (
    <div className="overflow-x-hidden">

      {/* Header */}
      <div className="bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-10 sm:py-12">
        <div className="container-site">
          <span className="label-eyebrow text-[var(--clay)] block mb-1">ClothCraft Studio</span>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-4xl font-bold text-[var(--ink-primary)] leading-tight">
                Studio Rekonstruksi & Sulam Tekstil
              </h1>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1 max-w-lg">
                Hubungkan pakaian lama yang rusak dengan master perajin spesialis Sashiko, Patchwork, dan Batik Lawasan Nusantara.
              </p>
            </div>

            <a
              href="https://wa.me/6281234567890?text=Halo%20ClothLoop%20Craft,%20saya%20ingin%20konsultasi%20rework%20pakaian"
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <MessageCircle size={14} /> Konsultasi WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container-site py-8 sm:py-10 flex flex-col gap-10">

        {/* 1. Cost Estimator Widget */}
        <section className="bg-white p-5 sm:p-6 border border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 mb-3">
            <Calculator size={15} className="text-[var(--clay)]" />
            <span className="label-eyebrow text-[var(--clay)]">Kalkulator Estimasi Biaya Rework</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <span className="text-[10px] text-gray-500 uppercase block mb-1">Layanan:</span>
              <select
                value={calcService}
                onChange={e => setCalcService(e.target.value as CraftServiceType)}
                className="w-full bg-white border border-[var(--border-hairline)] text-xs p-2 font-medium text-[var(--ink-primary)] focus:outline-none"
              >
                {SERVICE_TYPES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 uppercase block mb-1">Karakter Bahan:</span>
              <select
                value={calcFabric}
                onChange={e => setCalcFabric(Number(e.target.value))}
                className="w-full bg-white border border-[var(--border-hairline)] text-xs p-2 font-medium text-[var(--ink-primary)] focus:outline-none"
              >
                {FABRIC_COMPLEXITIES.map((f, i) => <option key={i} value={i}>{f.label}</option>)}
              </select>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 uppercase block mb-1">Jumlah Item:</span>
              <input
                type="number"
                min={1}
                max={10}
                value={calcUnits}
                onChange={e => setCalcUnits(Math.max(1, Number(e.target.value)))}
                className="w-full bg-white border border-[var(--border-hairline)] text-xs p-2 font-bold text-[var(--ink-primary)] focus:outline-none"
              />
            </div>

            <div className="p-3 bg-[var(--clay-subtle)] border border-[rgba(168,82,44,0.2)] flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-600 block">Estimasi ({estimatedDays}):</span>
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-base text-[var(--clay)]">
                  {formatRupiah(estimatedCost)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Artisan Directory */}
        <section>
          <span className="label-eyebrow block mb-3">Direktori Perajin Terverifikasi</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {artisans.map(artisan => {
              const isSelected = selectedArtisan?.id === artisan.id;
              const currentSlide = artisanSlideIdx[artisan.id] || 0;
              const portfolioImages = [artisan.coverImage, 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=600&q=80'];

              return (
                <div
                  key={artisan.id}
                  onClick={() => setSelectedArtisan(artisan)}
                  className={`border p-3.5 bg-white flex flex-col justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'border-[var(--clay)] ring-1 ring-[var(--clay)]' : 'border-[var(--border-hairline)] hover:border-gray-400'
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface-muted)]">
                    <Image
                      src={portfolioImages[currentSlide] || artisan.coverImage}
                      alt={artisan.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setArtisanSlideIdx(prev => ({ ...prev, [artisan.id]: (currentSlide + 1) % portfolioImages.length }));
                      }}
                      className="absolute bottom-2 right-2 text-[9px] bg-black/75 text-white px-2 py-0.5 font-mono cursor-pointer"
                    >
                      Portofolio #{currentSlide + 1}
                    </button>

                    {isSelected && (
                      <div className="absolute top-2 left-2 bg-[var(--clay)] text-white text-[9px] px-2 py-0.5 font-semibold uppercase">
                        Dipilih
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-base text-[var(--ink-primary)]">
                        {artisan.name}
                      </h3>
                      <span className="text-xs text-[var(--ink-muted)] font-mono">{artisan.completedOrders} proyek</span>
                    </div>
                    <p className="text-[11px] text-[var(--ink-muted)]">{artisan.city} &middot; {artisan.yearsOfExperience} tahun pengalaman</p>
                    <p className="text-xs text-[var(--clay)] font-medium mt-1">{artisan.specialty.join(' · ')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Inquiry Form */}
        {selectedArtisan && (
          <section className="bg-white p-6 sm:p-8 border border-[var(--border-hairline)]">
            <span className="label-eyebrow text-[var(--clay)]">Formulir Permintaan Konsultasi ({selectedArtisan.name})</span>

            {submitted ? (
              <div className="p-4 bg-[var(--forest-subtle)] border border-[rgba(27,54,40,0.2)] mt-3 flex flex-col gap-1.5">
                <CheckCircle2 size={20} className="text-[var(--forest-deep)]" />
                <h4 className="font-serif font-bold text-sm text-[var(--forest-deep)]">Permintaan Telah Diterima</h4>
                <p className="text-xs text-[var(--ink-secondary)]">Perajin {selectedArtisan.name} akan menghubungi nomor WhatsApp terdaftar dalam waktu 24 jam.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary text-xs py-1 self-start mt-2 cursor-pointer">Kirim Permintaan Lain</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Kondisi & Kerusakan Pakaian</span>
                    <textarea
                      value={garmentDesc}
                      onChange={e => setGarmentDesc(e.target.value)}
                      placeholder="Jelaskan jenis pakaian, bahan, dan letak kerusakan..."
                      rows={2}
                      required
                      className="input-minimal text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Ekspektasi Desain / Rework</span>
                    <textarea
                      value={visionDesc}
                      onChange={e => setVisionDesc(e.target.value)}
                      placeholder="Jelaskan keinginan rekonstruksi siluet, warna, atau teknik..."
                      rows={2}
                      required
                      className="input-minimal text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary justify-center self-start text-xs py-2 px-4 cursor-pointer"
                  style={{ background: 'var(--clay)', borderColor: 'var(--clay)' }}
                >
                  <Send size={13} /> Kirim Permintaan ke Perajin
                </button>
              </form>
            )}
          </section>
        )}

      </div>

    </div>
  );
}
