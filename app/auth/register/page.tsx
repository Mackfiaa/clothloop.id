'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useApp } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  AlertCircle, 
  ShoppingBag, 
  Scissors, 
  Truck, 
  Store,
  Check
} from 'lucide-react';

const ROLE_OPTIONS: { id: UserRole; title: string; desc: string; icon: React.ElementType }[] = [
  {
    id: 'USER',
    title: 'Eco-Citizen (Donatur)',
    desc: 'Donasi pakaian lama & belanja preloved',
    icon: User,
  },
  {
    id: 'SELLER',
    title: 'Seller Preloved',
    desc: 'Jual pakaian terkurasi QC',
    icon: ShoppingBag,
  },
  {
    id: 'UMKM',
    title: 'UMKM / Perajin Craft',
    desc: 'Buka jasa rework & sulam Sashiko',
    icon: Scissors,
  },
  {
    id: 'KURIR',
    title: 'Mitra Kurir Jemput',
    desc: 'Layanan penjemputan donasi warga',
    icon: Truck,
  },
];

export default function RegisterPage() {
  const { addNotification } = useApp();
  const [role, setRole] = useState<UserRole>('USER');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [vehicleType, setVehicleType] = useState('Motor (Roda 2)');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            role: role,
            business_name: (role === 'SELLER' || role === 'UMKM') ? businessName.trim() : null,
            vehicle_type: (role === 'KURIR') ? vehicleType : null,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        addNotification(
          'success',
          'Pendaftaran Berhasil!',
          `Selamat bergabung sebagai ${ROLE_OPTIONS.find(r => r.id === role)?.title} (+100 poin reward aktif).`
        );
        window.location.href = '/';
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat registrasi';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[var(--surface-main)] py-10">
      <div className="max-w-lg w-full bg-white p-6 sm:p-9 border border-[var(--border-hairline)] shadow-sm">

        {/* Heading */}
        <div className="text-center mb-6">
          <span className="label-eyebrow block mb-1">Registrasi Akun Baru</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[var(--ink-primary)]">
            Gabung Gerakan Sirkular
          </h1>
          <p className="text-xs text-[var(--ink-muted)] mt-1">
            Pilih peran Anda dalam ekosistem pengelolaan pakaian berkelanjutan.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-5">

          {/* 1. Role Selector Radio Grid */}
          <div>
            <span className="label-eyebrow block mb-2 text-[10px]">
              1. Pilih Tipe Akun / Peran Anda
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ROLE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = role === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRole(opt.id)}
                    className={`p-3 text-left border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-[var(--forest-subtle)] border-[var(--forest-deep)] ring-1 ring-[var(--forest-deep)]'
                        : 'bg-white border-[var(--border-hairline)] hover:border-gray-400'
                    }`}
                  >
                    <div className={`p-1.5 rounded-xs shrink-0 ${isSelected ? 'bg-[var(--forest-deep)] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-xs ${isSelected ? 'text-[var(--forest-deep)]' : 'text-[var(--ink-primary)]'}`}>
                        {opt.title}
                      </p>
                      <p className="text-[10px] text-[var(--ink-muted)] mt-0.5 leading-tight">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Personal Information */}
          <div className="flex flex-col gap-3 pt-2 border-t border-[var(--border-hairline)]">
            <span className="label-eyebrow text-[10px]">2. Data Identitas Akun</span>

            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">Nama Lengkap</span>
              <div className="relative">
                <User size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  placeholder="Nama sesuai KTP"
                  className="input-minimal text-xs pl-5"
                />
              </div>
            </div>

            {/* Conditional Business Name for SELLER & UMKM */}
            {(role === 'SELLER' || role === 'UMKM') && (
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">
                  {role === 'SELLER' ? 'Nama Toko / Brand Preloved' : 'Nama Studio / Workshop Kerajinan'}
                </span>
                <div className="relative">
                  <Store size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    required
                    placeholder={role === 'SELLER' ? 'Contoh: ThriftLab Senopati' : 'Contoh: Studio BoroBoro Rework'}
                    className="input-minimal text-xs pl-5"
                  />
                </div>
              </div>
            )}

            {/* Conditional Vehicle Type for KURIR */}
            {role === 'KURIR' && (
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">
                  Jenis Kendaraan Operasional
                </span>
                <select
                  value={vehicleType}
                  onChange={e => setVehicleType(e.target.value)}
                  className="w-full bg-white border border-[var(--border-hairline)] text-xs p-2 font-medium text-[var(--ink-primary)] focus:outline-none"
                >
                  <option value="Motor (Roda 2)">Motor (Roda 2 - Kapasitas s.d. 15 kg)</option>
                  <option value="Mobil Blind Van">Mobil Blind Van (Kapasitas s.d. 150 kg)</option>
                  <option value="Mobil Pick-up Box">Mobil Pick-up Box (Kapasitas s.d. 500 kg)</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">Alamat Email</span>
                <div className="relative">
                  <Mail size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="nama@email.com"
                    className="input-minimal text-xs pl-5"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">Nomor WhatsApp</span>
                <div className="relative">
                  <Phone size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    placeholder="0812xxxxxxx"
                    className="input-minimal text-xs pl-5"
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">Password (Min. 6 Karakter)</span>
              <div className="relative">
                <Lock size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="input-minimal text-xs pl-5"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center text-xs py-2.5 mt-2 cursor-pointer"
          >
            {loading ? 'Mendaftarkan Akun...' : `Daftar sebagai ${ROLE_OPTIONS.find(r => r.id === role)?.title.split(' ')[0]}`}
            <ArrowRight size={13} />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-[var(--border-hairline)] text-center text-xs text-[var(--ink-muted)]">
          Sudah memiliki akun terdaftar?{' '}
          <Link href="/auth/login" className="font-semibold text-[var(--forest-deep)] underline">
            Masuk ke Akun
          </Link>
        </div>

      </div>
    </div>
  );
}
