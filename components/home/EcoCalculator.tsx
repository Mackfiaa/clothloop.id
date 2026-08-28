'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Droplets, Wind } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

const garmentTypes = [
  { id: 'mixed',   label: 'Campuran',      kg: 0.40 },
  { id: 'tshirt',  label: 'Kaos / Katun',  kg: 0.25 },
  { id: 'jeans',   label: 'Denim / Jeans', kg: 0.70 },
  { id: 'jacket',  label: 'Jaket / Outer', kg: 0.90 },
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
    <section style={{ background: 'var(--white)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container-editorial" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

        {/* Section Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* Left: Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <span className="label-caps">Kalkulator Dampak Sirkular</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginTop: '0.75rem', lineHeight: 1.1 }}>
                Berapa baju tak terpakai<br />
                <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>di lemarimu?</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--ink-muted)', marginTop: '1rem', lineHeight: 1.7, maxWidth: '28rem' }}>
                Setiap kilogram tekstil yang diselamatkan dari TPA menghemat 2.700 liter air bersih dan mencegah 3,6 kg emisi CO₂.
              </p>
            </div>

            {/* Garment Type Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span className="label-caps">Jenis pakaian dominan</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {garmentTypes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      padding: '0.5rem 1.125rem',
                      border: type === t.id ? '1px solid var(--forest)' : '1px solid var(--line)',
                      background: type === t.id ? 'var(--forest)' : 'transparent',
                      color: type === t.id ? '#ffffff' : 'var(--ink-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      borderRadius: 0,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-caps">Jumlah pakaian</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: 'var(--ink)' }}>
                  {count}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 400, color: 'var(--ink-muted)', marginLeft: '0.5rem' }}>helai · {totalKg} kg</span>
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={count}
                onChange={e => setCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--forest)', cursor: 'pointer', height: '2px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-faint)' }}>
                <span>1 helai</span>
                <span>50 helai</span>
              </div>
            </div>

            <Link
              href={`/drop?items=${count}&weight=${totalKg}`}
              className="btn-primary"
              style={{ alignSelf: 'flex-start' }}
            >
              Donasikan {count} baju ini
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: Big Numbers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderLeft: '1px solid var(--line)', paddingLeft: '3rem' }}>

            {[
              {
                label: 'Air bersih terhemat',
                value: formatNumber(water),
                unit: 'Liter',
                sub: `Setara ${Math.round(water / 2)} hari air minum`,
                icon: <Droplets size={18} strokeWidth={1.5} style={{ color: 'var(--sage)' }} />,
              },
              {
                label: 'Emisi CO₂ dicegah',
                value: co2,
                unit: 'kg CO₂e',
                sub: `Setara ~${Math.round(co2 * 10)} km kendaraan`,
                icon: <Wind size={18} strokeWidth={1.5} style={{ color: 'var(--sage)' }} />,
              },
              {
                label: 'ClothPoints reward',
                value: `+${formatNumber(points)}`,
                unit: 'Poin',
                sub: 'Dapat ditukar voucher & sertifikat',
                icon: <span style={{ fontSize: '1.125rem' }}>🪙</span>,
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: '2rem 0',
                  borderBottom: i < 2 ? '1px solid var(--line)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {stat.icon}
                  <span className="label-caps">{stat.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 700, color: 'var(--forest)', lineHeight: 1 }}>
                    {stat.value}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink-muted)', fontWeight: 400 }}>
                    {stat.unit}
                  </span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
