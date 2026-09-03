'use client';

import React, { useState, useEffect } from 'react';
import { Award, Droplets, Wind, Leaf, Gift, Trophy, Share2 } from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatNumber } from '@/lib/utils';
import { NATIONAL_IMPACT_METRICS } from '@/lib/constants';
import { fetchRewardVouchers } from '@/lib/supabase/data';
import { RewardVoucher } from '@/lib/types';

const LEVEL_TIERS = [
  { name: 'Eco Seedling', minPts: 0, maxPts: 499, color: 'var(--sage-light)', accent: 'var(--sage)', icon: '🌱' },
  { name: 'Green Weaver', minPts: 500, maxPts: 1999, color: 'var(--cream-deep)', accent: 'var(--sage)', icon: '🌿' },
  { name: 'Circular Artisan', minPts: 2000, maxPts: 4999, color: 'var(--terracotta-light)', accent: 'var(--terracotta)', icon: '🧵' },
  { name: 'Eco Guardian', minPts: 5000, maxPts: 9999, color: 'var(--golden-light)', accent: 'var(--golden)', icon: '🛡️' },
  { name: 'Loop Legend', minPts: 10000, maxPts: Infinity, color: 'var(--forest)', accent: '#fff', icon: '♾️' },
];

export default function ImpactPage() {
  const { userPoints: clothPoints, userTotalWaterSaved, userTotalCo2Saved, userTotalKgDiverted, dropOrders, addNotification } = useApp();
  const [activeCert, setActiveCert] = useState(false);
  const [vouchers, setVouchers] = useState<RewardVoucher[]>([]);

  useEffect(() => {
    fetchRewardVouchers().then(setVouchers);
  }, []);

  const totalWeight = dropOrders.reduce((a, o) => a + o.estimatedWeightKg, 0) || userTotalKgDiverted;
  const totalWater = dropOrders.reduce((a, o) => a + o.waterSavedLiters, 0) || userTotalWaterSaved;
  const totalCo2 = dropOrders.reduce((a, o) => a + o.co2SavedKg, 0) || userTotalCo2Saved;
  const totalItems = dropOrders.reduce((a, o) => a + o.itemCount, 0) || Math.round(totalWeight * 2.5);

  const tier = LEVEL_TIERS.findLast(t => clothPoints >= t.minPts) || LEVEL_TIERS[0];
  const nextTier = LEVEL_TIERS.find(t => t.minPts > clothPoints);
  const progressPct = nextTier ? Math.round(((clothPoints - tier.minPts) / (nextTier.minPts - tier.minPts)) * 100) : 100;

  const handleRedeem = (title: string, cost: number) => {
    addNotification('success', 'Voucher diklaim!', `${title} akan dikirim ke WhatsApp dalam 5 menit.`);
  };

  return (
    <div>

      {/* Header */}
      <div style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '3.5rem 0 3rem' }}>
        <div className="container-editorial">
          <span className="label-caps">Eco Impact Dashboard</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'end', marginTop: '0.75rem' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.75rem)', lineHeight: 1.08 }}>
              Dampak nyata<br /><em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>kontribusimu.</em>
            </h1>

            {/* Level Badge */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', alignSelf: 'end' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-caps">Tingkat Sirkularitas</span>
                {nextTier && (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                    {formatNumber(nextTier.minPts - clothPoints)} pts ke {nextTier.name}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{tier.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>{tier.name}</p>
                  <div style={{ height: '3px', background: 'var(--line)', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progressPct}%`, background: 'var(--sage)', transition: 'width 0.5s ease' }} />
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-faint)', marginTop: '0.5rem' }}>{progressPct}% menuju level berikutnya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-editorial" style={{ paddingTop: '4rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '5rem' }}>

        {/* Big Impact Stats */}
        <section>
          <span className="label-caps" style={{ display: 'block', marginBottom: '2rem' }}>Kontribusi Pribadimu</span>

          {/* Each stat fills a full row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { icon: <Droplets size={20} strokeWidth={1.25} style={{ color: 'var(--sage)' }} />, label: 'Air bersih terhemat', value: totalWater > 0 ? formatNumber(Math.round(totalWater)) : '0', unit: 'Liter', sub: `Dari kontribusi aktifmu` },
              { icon: <Wind size={20} strokeWidth={1.25} style={{ color: 'var(--sage)' }} />, label: 'Emisi CO₂ dicegah', value: totalCo2 > 0 ? totalCo2.toFixed(1) : '0', unit: 'kg CO₂e', sub: `${totalWeight} kg tekstil diselamatkan` },
              { icon: <Leaf size={20} strokeWidth={1.25} style={{ color: 'var(--sage)' }} />, label: 'Pakaian diberikan kehidupan baru', value: totalItems > 0 ? String(totalItems) : '0', unit: 'Helai', sub: 'Melalui donasi dan preloved' },
              { icon: <Award size={20} strokeWidth={1.25} style={{ color: 'var(--golden)' }} />, label: 'ClothPoints terkumpul', value: formatNumber(clothPoints), unit: 'Poin', sub: 'Tukar dengan reward di bawah ini' },
            ].map((s) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', padding: '1.75rem 0', borderBottom: '1px solid var(--line)' }}>
                <div style={{ width: '10rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  {s.icon}
                  <span className="label-caps" style={{ fontSize: '0.5625rem' }}>{s.label}</span>
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 700, color: 'var(--forest)', lineHeight: 1, flex: 1 }}>{s.value}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink-muted)', width: '5rem', flexShrink: 0 }}>{s.unit}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-faint)', display: 'none', width: '14rem', flexShrink: 0 }} className="md:block">{s.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* National Impact */}
        <section style={{ background: 'var(--forest)', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <span className="label-caps" style={{ color: 'var(--sage-light)' }}>Dampak Nasional Komunitas ClothLoop</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#fff', marginTop: '0.5rem', lineHeight: 1.1 }}>
              Bersama 18K+ eco-citizens
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
            {[
              { val: formatNumber(NATIONAL_IMPACT_METRICS.totalDivertedKg), unit: 'kg', label: 'Tekstil diselamatkan' },
              { val: `${(NATIONAL_IMPACT_METRICS.totalWaterSavedLiters / 1_000_000).toFixed(0)}M`, unit: 'Liter', label: 'Air bersih terjaga' },
              { val: formatNumber(NATIONAL_IMPACT_METRICS.totalCo2AvoidedKg), unit: 'kg', label: 'CO₂ dicegah' },
              { val: formatNumber(NATIONAL_IMPACT_METRICS.activeDonors), unit: '+', label: 'Eco-citizens' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '2.5rem', color: '#fff', lineHeight: 1 }}>{s.val}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--sage-light)' }}>{s.unit}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'rgba(200,221,209,0.6)', marginTop: '0.375rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ClothPoints & Vouchers */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <span className="label-caps" style={{ display: 'block', marginBottom: '1rem' }}>Saldo ClothPoints</span>
            <div style={{ borderTop: '3px solid var(--golden)', paddingTop: '1.25rem' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--golden)', lineHeight: 1, display: 'block' }}>
                {formatNumber(clothPoints)}
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', color: 'var(--ink-muted)' }}>Poin tersedia</span>
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  ['1 kg donasi', '+100 poin'],
                  ['Beli preloved', '+50 poin'],
                  ['Request craft', '+75 poin'],
                ].map(([act, pts]) => (
                  <div key={act} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', padding: '0.5rem 0', borderBottom: '1px solid var(--line)' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>{act}</span>
                    <span style={{ color: 'var(--golden)', fontWeight: 600 }}>{pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span className="label-caps">Tukar Voucher & Reward</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {vouchers.map((voucher) => {
                const canRedeem = clothPoints >= voucher.pointsCost;
                return (
                  <div
                    key={voucher.id}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 0', borderBottom: '1px solid var(--line)', gap: '1rem', flexWrap: 'wrap' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{voucher.logo}</span>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>{voucher.title}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{voucher.description}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1rem', color: canRedeem ? 'var(--golden)' : 'var(--ink-faint)' }}>{formatNumber(voucher.pointsCost)} pts</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-faint)' }}>s.d. {voucher.validUntil}</p>
                      </div>
                      <button
                        onClick={() => handleRedeem(voucher.title, voucher.pointsCost)}
                        disabled={!canRedeem}
                        className="btn-primary"
                        style={{ padding: '0.5rem 1.125rem', fontSize: '0.75rem', opacity: canRedeem ? 1 : 0.35, cursor: canRedeem ? 'pointer' : 'default' }}
                      >
                        <Gift size={13} />
                        Klaim
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <span className="label-caps">Sertifikat Dampak</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginTop: '0.5rem', lineHeight: 1.1 }}>Bukti kontribusi yang bisa dibagikan.</h2>
            </div>
            <button onClick={() => setActiveCert(!activeCert)} className="btn-secondary">
              <Trophy size={14} strokeWidth={1.5} />
              {activeCert ? 'Tutup' : 'Lihat Sertifikat'}
            </button>
          </div>

          {activeCert && (
            <div style={{ border: '2px solid var(--ink)', padding: '3rem', fontFamily: "'Playfair Display', serif" }}>
              {/* Newspaper-style certificate */}
              <div style={{ textAlign: 'center', borderBottom: '1px solid var(--ink)', paddingBottom: '2rem', marginBottom: '2rem' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem', color: 'var(--ink-muted)' }}>
                  Republic of ClothLoop · Certificate of Impact · {new Date().getFullYear()}
                </p>
                <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                  Sertifikat Dampak Sirkular
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.875rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
                  Diterbitkan oleh Platform ClothLoop.id
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                {[
                  [formatNumber(Math.round(totalWater)), 'liter', 'Air Bersih Terhemat'],
                  [totalCo2.toFixed(1), 'kg', 'CO₂ Emisi Dicegah'],
                  [String(totalItems), 'helai', 'Pakaian Diselamatkan'],
                  [formatNumber(clothPoints), 'pts', 'ClothPoints Diraih'],
                ].map(([v, u, l]) => (
                  <div key={l} style={{ borderRight: '1px solid var(--line)', padding: '1rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 700, display: 'block', lineHeight: 1 }}>{v}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.75rem', color: 'var(--ink-muted)', display: 'block', marginTop: '0.25rem' }}>{u}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginTop: '0.5rem' }}>{l}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--ink)', paddingTop: '1.5rem' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  clothloop.id · {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--ink-muted)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  <Share2 size={14} strokeWidth={1.5} />
                  Bagikan Sertifikat
                </button>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
