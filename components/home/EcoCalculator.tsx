'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Droplets, Wind } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

const garmentTypes = [
  { id: 'mixed',   label: 'Campuran',      kg: 0.40, desc: 'Pakaian harian rata-rata' },
  { id: 'tshirt',  label: 'Kaos / Katun',  kg: 0.25, desc: 'Katun & rajut tipis' },
  { id: 'jeans',   label: 'Denim / Jeans', kg: 0.70, desc: 'Denim 12-14oz tebal' },
  { id: 'jacket',  label: 'Jaket / Outer', kg: 0.90, desc: 'Outerwear, drill & kanvas' },
];

export function EcoCalculator() {
  const [count, setCount] = useState(10);
  const [type, setType] = useState('mixed');

  const selected = garmentTypes.find(t => t.id === type) || garmentTypes[0];
  const totalKg  = Number((count * selected.kg).toFixed(1));
  const water    = Math.round(totalKg * 2700);
  const co2      = Number((totalKg * 3.6).toFixed(1));
  const points   = Math.round(totalKg * 100);

  return (
    <section className="bg-white border-t border-b border-[var(--border-hairline)] py-12 sm:py-16">
      <div className="container-site">

        <div className="max-w-xl mb-8">
          <span className="label-eyebrow block mb-1.5 text-[var(--forest-deep)]">
            Kalkulator Dampak Sirkular
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] leading-tight">
            Hitung potensi penyelamatan pakaian tak terpakai.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-2 leading-relaxed">
            Data audit berdasarkan estimasi rata-rata penghematan konsumsi air industri tekstil (2.700L/kg) dan pencegahan emisi karbon TPA (3,6 kg CO₂e/kg).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Category selection */}
            <div>
              <span className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider block mb-2">
                1. Kategori Pakaian Dominan
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {garmentTypes.map(t => {
                  const active = type === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={`p-3 text-left border transition-colors cursor-pointer ${
                        active ? 'bg-[var(--forest-deep)] text-white border-[var(--forest-deep)]' : 'bg-transparent text-[var(--ink-primary)] border-[var(--border-hairline)] hover:border-gray-400'
                      }`}
                    >
                      <p className="font-semibold text-xs">{t.label}</p>
                      <p className={`text-[10px] mt-0.5 ${active ? 'text-white/80' : 'text-[var(--ink-muted)]'}`}>~{t.kg} kg/helai</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider */}
            <div className="p-5 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
              <div className="flex justify-between items-baseline mb-3">
                <div>
                  <span className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider block">
                    2. Estimasi Jumlah Helai
                  </span>
                  <span className="text-xs text-[var(--ink-muted)]">Perkiraan berat total: ~{totalKg} kg</span>
                </div>
                <div className="text-right">
                  <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-bold text-[var(--forest-deep)]">
                    {count}
                  </span>
                  <span className="text-xs text-[var(--ink-muted)] ml-1">helai</span>
                </div>
              </div>

              <input
                type="range"
                min={1}
                max={50}
                value={count}
                onChange={e => setCount(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5"
                style={{ accentColor: 'var(--forest-deep)' }}
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                <span>1 helai</span>
                <span>25 helai</span>
                <span>50 helai</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <Link
                href={`/drop?items=${count}&weight=${totalKg}`}
                className="btn-primary w-full sm:w-auto justify-center"
              >
                Booking Donasi {count} Pakaian Ini
                <ArrowRight size={13} />
              </Link>
              <span className="text-[11px] text-[var(--ink-muted)]">
                Tersedia opsi antar mandiri atau jemput kurir
              </span>
            </div>

          </div>

          {/* Right: Clean Factual Output (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--forest-deep)] text-white p-6 flex flex-col justify-between gap-6">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-white/15 mb-4">
                <span className="label-eyebrow text-[var(--surface-muted)] text-[10px]">
                  Estimasi Penyelamatan
                </span>
                <span className="bg-white/10 text-white font-mono text-[11px] px-2 py-0.5 border border-white/20 font-semibold">
                  +{points} Poin
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[11px] text-white/70 uppercase tracking-wider block font-semibold mb-0.5">
                    Air Bersih Terjaga
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-bold text-white">
                      {formatNumber(water)}
                    </span>
                    <span className="text-sm text-white/80">Liter</span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-1">
                    Setara konsumsi air minum untuk {Math.round(water / 150)} hari satu keluarga.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[11px] text-white/70 uppercase tracking-wider block font-semibold mb-0.5">
                    Emisi Karbon Terhindar
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-white">
                      {co2}
                    </span>
                    <span className="text-sm text-white/80">kg CO₂e</span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-1">
                    Pencegahan emisi gas metana dari pembusukan tekstil sintetis di TPA.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/15 text-[11px] text-white/70">
              Poin donasi dapat digunakan untuk voucher mitra atau adopsi bibit mangrove.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
