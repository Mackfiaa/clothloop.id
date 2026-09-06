'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scissors, CheckCircle2, Send, Award, Wallet, Shield, Check } from 'lucide-react';
import { useApp } from '@/lib/store';
import { BackgroundDecor } from '@/components/ui/BackgroundDecor';

export default function PartnerArtisanPage() {
  const { addNotification } = useApp();
  const [artisanName, setArtisanName] = useState('');
  const [workshopName, setWorkshopName] = useState('');
  const [cityName, setCityName] = useState('Bandung');
  const [specialties, setSpecialties] = useState<string[]>(['Sashiko Boro', 'Denim Rework']);
  const [experienceYears, setExperienceYears] = useState(3);
  const [portfolioLink, setPortfolioLink] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableSpecialties = ['Sashiko Boro', 'Denim Rework', 'Batik Lawasan', 'Custom Patchwork', 'Upcycled Bags', 'Reparasi Serat'];

  const toggleSpec = (s: string) => {
    setSpecialties(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification('success', 'Aplikasi Perajin Diterima', `Kurator ClothCraft akan mengulas portofolio ${workshopName} dan menghubungi WhatsApp ${whatsapp}.`);
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-x-hidden">

      {/* Header */}
      <div className="relative bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-14 sm:py-20 overflow-hidden">
        <BackgroundDecor variant="craft" />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="label-eyebrow text-[var(--clay)] block mb-1.5">Kemitraan ClothCraft</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--ink-primary)] leading-tight max-w-2xl tracking-tight">
              Ubah Pakaian Usang Jadi Karya Seni Bernilai Tinggi.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 max-w-xl leading-relaxed">
              Bergabunglah dengan jaringan 140+ perajin tekstil independen, tailor rekonstruksi, dan spesialis Sashiko Nusantara.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-12 sm:py-16 flex flex-col gap-12">

        {/* 1. Keuntungan Mitra Perajin */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="card-clean p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="w-10 h-10 rounded-xs bg-[var(--clay-subtle)] text-[var(--clay)] flex items-center justify-center mb-4">
                <Wallet size={20} />
              </div>
              <h3 className="text-lg font-bold text-[var(--ink-primary)] mb-1.5 tracking-tight">
                Penjualan Produk Pasti & Terjamin
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Jual karya kerajinan daur ulang Anda ke pasar nasional. Pembayaran dilindungi oleh sistem escrow ClothLoop dan langsung cair saat produk diterima pembeli.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--clay)] font-bold pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              Pencairan Escrow 100% Aman
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card-clean p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="w-10 h-10 rounded-xs bg-[var(--clay-subtle)] text-[var(--clay)] flex items-center justify-center mb-4">
                <Scissors size={20} />
              </div>
              <h3 className="text-lg font-bold text-[var(--ink-primary)] mb-1.5 tracking-tight">
                Suplai Bahan Perca Gratis
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Dapatkan akses gratis ke tumpukan kain perca denim, katun, dan batik lawasan hasil sortir donasi ClothDrop untuk bahan rework Anda.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--clay)] font-bold pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              Akses Bahan Kain Berkala
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-clean p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="w-10 h-10 rounded-xs bg-[var(--clay-subtle)] text-[var(--clay)] flex items-center justify-center mb-4">
                <Award size={20} />
              </div>
              <h3 className="text-lg font-bold text-[var(--ink-primary)] mb-1.5 tracking-tight">
                Eksposur Brand Studio Anda
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Profil studio dan portofolio Anda dipromosikan ke puluhan ribu pelanggan pecinta sustainable fashion di seluruh Indonesia.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--clay)] font-bold pt-3 border-t border-[var(--border-hairline)] uppercase tracking-wider">
              Listing Portofolio Resmi
            </span>
          </motion.div>
        </section>

        {/* 2. Registration Form */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 sm:p-10 border border-[var(--border-hairline)] shadow-sm"
        >
          <div className="max-w-md mb-6">
            <span className="label-eyebrow text-[var(--clay)]">Formulir Pendaftaran Perajin</span>
            <h2 className="text-2xl font-extrabold text-[var(--ink-primary)] mt-1 tracking-tight">
              Daftarkan Studio / Workshop Anda
            </h2>
          </div>

          {submitted ? (
            <div className="p-6 bg-[var(--clay-subtle)] border border-[rgba(168,82,44,0.2)] flex flex-col gap-2 rounded-xs">
              <CheckCircle2 size={24} className="text-[var(--clay)]" />
              <h4 className="font-bold text-base text-[var(--clay)]">Pendaftaran Berhasil Dikirim</h4>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Kurator kami akan meninjau portofolio Anda ({workshopName}) dan menghubungi {whatsapp} untuk proses verifikasi kurasi karya.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary text-xs py-1.5 self-start mt-2 cursor-pointer">
                Kirim Formulir Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Nama Lengkap Perajin</span>
                  <input
                    type="text"
                    value={artisanName}
                    onChange={e => setArtisanName(e.target.value)}
                    required
                    placeholder="Nama lengkap Anda"
                    className="input-minimal text-xs"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Nama Brand / Studio</span>
                  <input
                    type="text"
                    value={workshopName}
                    onChange={e => setWorkshopName(e.target.value)}
                    required
                    placeholder="Contoh: Studio Boro Lawas"
                    className="input-minimal text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Kota Domisili</span>
                  <select
                    value={cityName}
                    onChange={e => setCityName(e.target.value)}
                    className="w-full bg-white border border-[var(--border-hairline)] text-xs p-2 font-medium text-[var(--ink-primary)] focus:outline-none"
                  >
                    <option value="Bandung">Bandung</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                    <option value="Surakarta (Solo)">Surakarta (Solo)</option>
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Surabaya">Surabaya</option>
                    <option value="Bali">Bali</option>
                    <option value="Pekalongan">Pekalongan</option>
                  </select>
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Pengalaman Kerja (Tahun)</span>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={experienceYears}
                    onChange={e => setExperienceYears(Number(e.target.value))}
                    required
                    className="input-minimal text-xs"
                  />
                </div>
              </div>

              {/* Specialties */}
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1.5">Keahlian & Teknik Spesialisasi</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableSpecialties.map(s => {
                    const isSelected = specialties.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSpec(s)}
                        className={`text-xs px-2.5 py-1 border transition-colors cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[var(--clay)] text-white border-[var(--clay)]'
                            : 'bg-white text-gray-600 border-[var(--border-hairline)] hover:border-gray-400'
                        }`}
                      >
                        {isSelected && <Check size={11} />}
                        <span>{s}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Link Portofolio / Instagram</span>
                  <input
                    type="text"
                    value={portfolioLink}
                    onChange={e => setPortfolioLink(e.target.value)}
                    required
                    placeholder="https://instagram.com/studioname"
                    className="input-minimal text-xs"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Nomor WhatsApp Aktif</span>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    required
                    placeholder="0812xxxxxxx"
                    className="input-minimal text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary justify-center self-start text-xs py-2.5 px-6 cursor-pointer mt-2"
                style={{ background: 'var(--clay)', borderColor: 'var(--clay)' }}
              >
                <Send size={13} /> Ajukan Pendaftaran Artisan
              </button>
            </form>
          )}
        </motion.section>

      </div>
    </div>
  );
}
