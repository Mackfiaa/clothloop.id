'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Store, MapPin, CheckCircle2, Send, Building2, Coffee, ShieldCheck } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function PartnerDropBoxPage() {
  const { addNotification } = useApp();
  const [partnerName, setPartnerName] = useState('');
  const [category, setCategory] = useState('Coffee Shop');
  const [cityName, setCityName] = useState('Jakarta Selatan');
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification('success', 'Pendaftaran Mitra Diterima!', `Tim ClothLoop akan menghubungi ${contactName} (${partnerName}) dalam 1-2 hari kerja.`);
    setSubmitted(true);
  };

  return (
    <div className="overflow-x-hidden">

      {/* Header */}
      <div className="bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] py-12 sm:py-16">
        <div className="container-site">
          <span className="label-eyebrow text-[var(--forest-deep)] block mb-1">Kemitraan Drop-Box</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-5xl font-bold text-[var(--ink-primary)] leading-tight max-w-2xl">
            Jadikan Lokasi Anda Titik Kumpul Sirkular.
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2 max-w-xl leading-relaxed">
            Bergabunglah dengan 68+ kafe, pusat perbelanjaan, dan ruang publik yang menyediakan kotak pengumpulan donasi pakaian ramah lingkungan.
          </p>
        </div>
      </div>

      <div className="container-site py-10 sm:py-16 flex flex-col gap-12">

        {/* 1. Benefit Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-clean p-6 flex flex-col justify-between gap-3">
            <div>
              <Coffee size={20} className="text-[var(--forest-deep)] mb-3" />
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-1">
                Tingkatkan Traffic Pengunjung
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Ribuan donatur aktif mengunjungi lokasi mitra untuk menyerahkan pakaian dan sering kali berbelanja atau menikmati hidangan di tempat Anda.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--forest-deep)] font-semibold pt-2 border-t border-[var(--border-hairline)]">
              +15-25% Kunjungan Baru
            </span>
          </div>

          <div className="card-clean p-6 flex flex-col justify-between gap-3">
            <div>
              <ShieldCheck size={20} className="text-[var(--forest-deep)] mb-3" />
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-1">
                Sertifikat Hijau & Dampak Nyata
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Lokasi Anda mendapatkan laporan berkala total kg tekstil yang berhasil diselamatkan dan sertifikat keberlanjutan resmi.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--forest-deep)] font-semibold pt-2 border-t border-[var(--border-hairline)]">
              Laporan Dampak Bulanan
            </span>
          </div>

          <div className="card-clean p-6 flex flex-col justify-between gap-3">
            <div>
              <Building2 size={20} className="text-[var(--forest-deep)] mb-3" />
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[var(--ink-primary)] mb-1">
                Fasilitas Drop-Box Gratis
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                ClothLoop menyediakan unit kotak pengumpulan berdesain estetik minimalis beserta timbangan dan materi edukasi tanpa biaya sewa.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--forest-deep)] font-semibold pt-2 border-t border-[var(--border-hairline)]">
              Instalasi & Pengambilan Rutin
            </span>
          </div>
        </section>

        {/* 2. Registration Form */}
        <section className="bg-white p-6 sm:p-10 border border-[var(--border-hairline)]">
          <div className="max-w-md mb-6">
            <span className="label-eyebrow text-[var(--forest-deep)]">Formulir Pendaftaran Lokasi</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[var(--ink-primary)] mt-1">
              Daftarkan Usaha / Lokasi Anda
            </h2>
          </div>

          {submitted ? (
            <div className="p-6 bg-[var(--forest-subtle)] border border-[rgba(27,54,40,0.2)] flex flex-col gap-2">
              <CheckCircle2 size={24} className="text-[var(--forest-deep)]" />
              <h4 className="font-serif font-bold text-base text-[var(--forest-deep)]">Pendaftaran Berhasil Dikirim!</h4>
              <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                Tim kemitraan ClothLoop akan meninjau lokasi Anda ({partnerName}, {cityName}) dan menghubungi nomor WhatsApp {contactPhone} untuk jadwal survei dan instalasi drop box.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary text-xs py-1.5 self-start mt-2 cursor-pointer">
                Daftarkan Lokasi Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Nama Tempat / Usaha</span>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={e => setPartnerName(e.target.value)}
                    required
                    placeholder="Contoh: Kopi Titik Temu Senopati"
                    className="input-minimal text-xs"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Kategori Lokasi</span>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-white border border-[var(--border-hairline)] text-xs p-2 font-medium text-[var(--ink-primary)] focus:outline-none"
                  >
                    <option value="Coffee Shop">Coffee Shop / Kafe</option>
                    <option value="Mall / Shopping Center">Pusat Perbelanjaan / Mall</option>
                    <option value="Bank Sampah Digital">Bank Sampah / Pusat Daur Ulang</option>
                    <option value="Co-Working Space">Co-Working Space / Kantor Komunitas</option>
                    <option value="Butik / Retail Store">Butik / Retail Store</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Kota Wilayah</span>
                  <select
                    value={cityName}
                    onChange={e => setCityName(e.target.value)}
                    className="w-full bg-white border border-[var(--border-hairline)] text-xs p-2 font-medium text-[var(--ink-primary)] focus:outline-none"
                  >
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                    <option value="Jakarta Barat">Jakarta Barat</option>
                    <option value="Jakarta Timur">Jakarta Timur</option>
                    <option value="Jakarta Utara">Jakarta Utara</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Surabaya">Surabaya</option>
                    <option value="Bali (Denpasar / Badung)">Bali (Denpasar / Badung)</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                  </select>
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Nama Penanggung Jawab (PIC)</span>
                  <input
                    type="text"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    required
                    placeholder="Nama PIC pengelola lokasi"
                    className="input-minimal text-xs"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Alamat Lengkap</span>
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  placeholder="Nama jalan, nomor, RT/RW, kelurahan, dan patokan letak drop box yang direncanakan..."
                  rows={2}
                  className="input-minimal text-xs"
                />
              </div>

              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Nomor Telepon / WhatsApp PIC</span>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  required
                  placeholder="0812xxxxxxx"
                  className="input-minimal text-xs max-w-sm"
                />
              </div>

              <button
                type="submit"
                className="btn-primary justify-center self-start text-xs py-2.5 px-6 cursor-pointer mt-2"
              >
                <Send size={13} /> Ajukan Kemitraan Titik Kumpul
              </button>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
