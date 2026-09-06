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
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { TextileKineticDecor } from '@/components/ui/TextileKineticDecor';

const ROLE_OPTIONS: { id: UserRole; title: string; desc: string; icon: React.ElementType }[] = [
  {
    id: 'USER',
    title: 'Donatur / Pembeli',
    desc: 'Donasi pakaian bekas & belanja preloved',
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

import { recordNewRegisteredUser } from '@/lib/supabase/portalData';

export default function RegisterPage() {
  const { addNotification } = useApp();
  const [role, setRole] = useState<UserRole>('USER');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        recordNewRegisteredUser({
          id: data.user.id,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          role: role,
          createdAt: new Date().toISOString(),
        });

        addNotification(
          'success',
          'Pendaftaran Berhasil',
          `Selamat bergabung sebagai ${ROLE_OPTIONS.find(r => r.id === role)?.title}. Akun Anda telah aktif.`
        );
        if (role === 'SELLER') {
          window.location.href = '/seller';
        } else if (role === 'UMKM') {
          window.location.href = '/craftsman';
        } else if (role === 'KURIR') {
          window.location.href = '/courier';
        } else {
          window.location.href = '/';
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat proses registrasi';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center p-4 py-12 sm:py-16 overflow-hidden">
      <TextileKineticDecor />
      
      <div className="relative z-10 max-w-lg w-full bg-white p-7 sm:p-9 border border-slate-200/90 shadow-xl rounded-3xl">

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Registrasi Akun Baru
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Bergabung bersama ribuan masyarakat dalam ekonomi sirkular tekstil berkelanjutan.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 mb-5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 text-red-600 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-5">

          {/* 1. Role Selector Radio Grid */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              1. Pilih Peran / Tipe Akun Anda
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ROLE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = role === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRole(opt.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/20'
                        : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-700 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'}`}>
                      <Icon size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-xs ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                        {opt.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Personal Information */}
          <div className="flex flex-col gap-3.5 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block">
              2. Data Identitas Akun
            </label>

            {/* Nama Lengkap */}
            <div>
              <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                Nama Lengkap
              </span>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  placeholder="Nama lengkap Anda"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 outline-none transition-all"
                />
              </div>
            </div>

            {/* Conditional Business Name for SELLER & UMKM */}
            {(role === 'SELLER' || role === 'UMKM') && (
              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                  {role === 'SELLER' ? 'Nama Toko / Brand Preloved' : 'Nama Studio / Workshop Kerajinan'}
                </span>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                    <Store size={16} />
                  </div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    required
                    placeholder={role === 'SELLER' ? 'Contoh: ThriftLab Senopati' : 'Contoh: Studio Daur Asri'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Conditional Vehicle Type for KURIR */}
            {role === 'KURIR' && (
              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Jenis Kendaraan Operasional
                </span>
                <select
                  value={vehicleType}
                  onChange={e => setVehicleType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3 px-3.5 text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 outline-none transition-all"
                >
                  <option value="Motor (Roda 2)">Motor (Roda 2 - Kapasitas s.d. 15 kg)</option>
                  <option value="Mobil Blind Van">Mobil Blind Van (Kapasitas s.d. 150 kg)</option>
                  <option value="Mobil Pick-up Box">Mobil Pick-up Box (Kapasitas s.d. 500 kg)</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Alamat Email */}
              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Alamat Email
                </span>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="nama@email.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Nomor WhatsApp
                </span>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                    <Phone size={16} />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    placeholder="0812xxxxxxxx"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Kata Sandi */}
            <div>
              <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                Kata Sandi Baru
              </span>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3 pl-10 pr-10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center text-xs sm:text-sm py-3 rounded-xl mt-1 cursor-pointer font-bold shadow-md hover:scale-[1.01] transition-transform"
          >
            {loading ? 'Memproses Pendaftaran...' : 'Daftar Akun Sekarang'}
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
          Sudah memiliki akun terdaftar?{' '}
          <Link href="/auth/login" className="font-bold text-emerald-800 hover:underline">
            Masuk ke Akun
          </Link>
        </div>

      </div>
    </div>
  );
}
