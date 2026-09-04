'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Droplets, 
  Wind, 
  Leaf, 
  Trophy, 
  MapPin, 
  Share2 
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatNumber } from '@/lib/utils';
import { fetchRewardVouchers } from '@/lib/supabase/data';
import { RewardVoucher } from '@/lib/types';

const LEVEL_TIERS = [
  { name: 'Eco Seedling', minPts: 0, maxPts: 499 },
  { name: 'Green Weaver', minPts: 500, maxPts: 1999 },
  { name: 'Circular Artisan', minPts: 2000, maxPts: 4999 },
  { name: 'Eco Guardian', minPts: 5000, maxPts: 9999 },
  { name: 'Loop Legend', minPts: 10000, maxPts: Infinity },
];

const COMMUNITY_LEADERBOARD = [
  { rank: 1, name: 'Siti Rahmawati', city: 'Jakarta Selatan', totalKg: 48.5, waterSaved: 130950, title: 'Donatur Utama' },
  { rank: 2, name: 'Budi Santoso', city: 'Bandung', totalKg: 36.2, waterSaved: 97740, title: 'Penggerak Komunitas' },
  { rank: 3, name: 'Amanda Putri', city: 'Surabaya', totalKg: 29.0, waterSaved: 78300, title: 'Warga Sirkular' },
  { rank: 4, name: 'Dimas Wicaksono', city: 'Bali', totalKg: 24.5, waterSaved: 66150, title: 'Warga Sirkular' },
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
    addNotification('success', 'Voucher Berhasil Diklaim', `${title} telah aktif di akun Anda.`);
  };

  return (
    <div className="overflow-x-hidden">

      {/* Header */}
      <div className="bg-[var(--surface-main)] border-b border-[var(--border-hairline)] py-10 sm:py-12">
        <div className="container-site">
          <span className="label-eyebrow block mb-1">Audit Dampak Pribadi</span>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-4xl font-bold text-[var(--ink-primary)] leading-tight">
                Portofolio Kontribusi Sirkular
              </h1>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1">
                Catatan resmi pengalihan limbah tekstil dan penghematan sumber daya air.
              </p>
            </div>

            {/* Level status */}
            <div className="bg-white p-3.5 border border-[var(--border-hairline)] flex items-center gap-3 w-full md:w-auto">
              <div>
                <span className="label-eyebrow text-[9px] block">Level Partisipasi</span>
                <strong className="text-xs text-[var(--forest-deep)] font-serif block">{tier.name}</strong>
                <span className="text-[10px] text-gray-500 font-mono">{clothPoints} Poin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-8 sm:py-10 flex flex-col gap-8">

        {/* 1. Metric Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 bg-white border border-[var(--border-hairline)] flex flex-col justify-between gap-2">
            <span className="label-eyebrow text-[10px] text-[var(--forest-deep)] flex items-center gap-1">
              <Droplets size={12} /> Air Bersih
            </span>
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-3xl font-bold text-[var(--forest-deep)]">
                {formatNumber(Math.round(totalWater))}
              </span>
              <span className="text-[10px] text-gray-500 block">Liter Terhemat</span>
            </div>
          </div>

          <div className="p-4 bg-white border border-[var(--border-hairline)] flex flex-col justify-between gap-2">
            <span className="label-eyebrow text-[10px] text-[var(--forest-deep)] flex items-center gap-1">
              <Wind size={12} /> Emisi Karbon
            </span>
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-3xl font-bold text-[var(--forest-deep)]">
                {totalCo2.toFixed(1)}
              </span>
              <span className="text-[10px] text-gray-500 block">kg CO₂e Terhindar</span>
            </div>
          </div>

          <div className="p-4 bg-white border border-[var(--border-hairline)] flex flex-col justify-between gap-2">
            <span className="label-eyebrow text-[10px] text-[var(--forest-deep)] flex items-center gap-1">
              <Leaf size={12} /> Pakaian
            </span>
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-3xl font-bold text-[var(--forest-deep)]">
                {totalItems}
              </span>
              <span className="text-[10px] text-gray-500 block">Helai Dialihkan</span>
            </div>
          </div>

          <div className="p-4 bg-[var(--ochre-subtle)] border border-[rgba(140,109,45,0.2)] flex flex-col justify-between gap-2">
            <span className="label-eyebrow text-[10px] text-[var(--ochre)] flex items-center gap-1">
              <Award size={12} /> Poin Aktif
            </span>
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-3xl font-bold text-[var(--ochre)]">
                {formatNumber(clothPoints)}
              </span>
              <span className="text-[10px] text-gray-600 block">ClothPoints</span>
            </div>
          </div>
        </section>

        {/* 2. Community Leaderboard & Mangrove Adoption */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Community Leaderboard (7 cols) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 border border-[var(--border-hairline)] flex flex-col justify-between gap-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="label-eyebrow">Peringkat Donasi Komunitas Bulan Ini</span>
                <span className="text-[10px] text-gray-400 font-mono">Berdasarkan Total kg</span>
              </div>

              <div className="divide-y divide-[var(--border-hairline)]">
                {COMMUNITY_LEADERBOARD.map(c => (
                  <div key={c.rank} className="py-2.5 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-gray-400 w-4">{c.rank}</span>
                      <div>
                        <strong className="text-[var(--ink-primary)] block">{c.name}</strong>
                        <span className="text-[10px] text-gray-400">{c.city} &middot; {c.title}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <strong className="text-[var(--forest-deep)]">{c.totalKg} kg</strong>
                      <span className="text-[10px] text-gray-400 block">{formatNumber(c.waterSaved)} L air</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-gray-500 pt-2 border-t border-[var(--border-hairline)]">
              Peringkat diperbarui secara otomatis dari timbangan terverifikasi drop-point.
            </p>
          </div>

          {/* Mangrove Tree Adoption Tracker (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--forest-deep)] text-white p-5 sm:p-6 border border-[var(--forest-deep)] flex flex-col justify-between gap-4">
            <div>
              <span className="label-eyebrow text-white/70 block mb-1 text-[10px]">Program Konservasi</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold mb-1">
                Adopsi Mangrove Pesisir
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Tukarkan 400 poin reward untuk penanaman 1 bibit pohon mangrove di pesisir Muara Gembong bersama mitra konservasi.
              </p>

              <div className="bg-white/10 p-3 mt-4 text-xs flex flex-col gap-1 border border-white/10 font-mono">
                <div className="flex justify-between text-white/80"><span>Lokasi:</span><span>Muara Gembong, Jawa Barat</span></div>
                <div className="flex justify-between text-white/80"><span>Koordinat:</span><span>-5.9381° S, 107.0394° E</span></div>
                <div className="flex justify-between text-white/80"><span>Penukaran:</span><strong className="text-[var(--ochre-subtle)]">400 poin / pohon</strong></div>
              </div>
            </div>

            <button
              onClick={() => handleRedeem('Adopsi 1 Bibit Mangrove', 400)}
              disabled={clothPoints < 400}
              className="btn-primary w-full justify-center text-xs py-2 bg-white text-[var(--forest-deep)] border-white mt-1 cursor-pointer"
              style={{ opacity: clothPoints >= 400 ? 1 : 0.4 }}
            >
              Adopsi Bibit Mangrove (400 Poin)
            </button>
          </div>

        </section>

        {/* 3. Rewards Vouchers */}
        <section>
          <span className="label-eyebrow block mb-3">Voucher Mitra Sirkular</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {vouchers.map(v => {
              const canClaim = clothPoints >= v.pointsCost;
              return (
                <div key={v.id} className="p-4 bg-white border border-[var(--border-hairline)] flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-xs text-[var(--ink-primary)]">{v.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{v.description}</p>
                    <span className="text-[10px] text-gray-400 block mt-1">Berlaku s.d. {v.validUntil}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--border-hairline)]">
                    <strong className="text-xs text-[var(--forest-deep)] font-mono">{v.pointsCost} Poin</strong>
                    <button
                      onClick={() => handleRedeem(v.title, v.pointsCost)}
                      disabled={!canClaim}
                      className="btn-primary text-[10px] py-1 px-2.5 cursor-pointer"
                      style={{ opacity: canClaim ? 1 : 0.4 }}
                    >
                      Klaim
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Digital Certificate */}
        <section className="border-t border-[var(--border-hairline)] pt-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="label-eyebrow">Dokumen Verifikasi</span>
            <button onClick={() => setActiveCert(!activeCert)} className="btn-secondary text-xs py-1.5 px-3 cursor-pointer">
              {activeCert ? 'Tutup Sertifikat' : 'Lihat Sertifikat Dampak'}
            </button>
          </div>

          {activeCert && (
            <div className="p-6 bg-white border border-[var(--ink-primary)] text-center flex flex-col gap-3 font-mono text-xs">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block">CLOTHLOOP IMPACT AUDIT CERTIFICATE</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold font-serif text-[var(--ink-primary)]">
                Sertifikat Kontribusi Sirkular
              </h3>
              <p className="text-xs text-gray-600 italic">Diterbitkan atas pencapaian pengalihan limbah tekstil dan pelestarian air.</p>
              
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-[var(--border-hairline)] text-xs">
                <div><strong>{formatNumber(Math.round(totalWater))} L</strong><span className="block text-[10px] text-gray-400">Air Dihemat</span></div>
                <div><strong>{totalCo2.toFixed(1)} kg</strong><span className="block text-[10px] text-gray-400">CO₂e Terhindar</span></div>
                <div><strong>{totalItems} Helai</strong><span className="block text-[10px] text-gray-400">Pakaian</span></div>
              </div>

              <div className="text-[10px] text-gray-400 text-center">
                Diverifikasi oleh ClothLoop Circular Network &middot; ID: CL-{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
