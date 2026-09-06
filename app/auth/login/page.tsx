'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useApp } from '@/lib/store';
import { ArrowRight, Lock, Mail, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { TextileKineticDecor } from '@/components/ui/TextileKineticDecor';

function translateAuthError(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return 'Email atau kata sandi tidak cocok. Pastikan akun sudah terdaftar dan kata sandi benar.';
  }
  if (message.includes('Email not confirmed')) {
    return 'Email belum dikonfirmasi. Harap periksa inbox/spam email Anda untuk klik tautan verifikasi, atau nonaktifkan "Confirm email" di dashboard Supabase.';
  }
  if (message.includes('Too many requests')) {
    return 'Terlalu banyak percobaan masuk. Harap tunggu beberapa saat sebelum mencoba kembali.';
  }
  if (message.includes('User not found') || message.includes('user not found')) {
    return 'Akun dengan email ini belum terdaftar. Silakan lakukan pendaftaran terlebih dahulu.';
  }
  return message;
}

export default function LoginPage() {
  const { addNotification } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    // 1. Direct Master Admin Support
    if (email.trim().toLowerCase() === 'admin@clothloop.id' && password === 'AdminClothLoop2026!') {
      addNotification(
        'success',
        'Selamat Datang Super Admin',
        'Otentikasi Master Admin ClothLoop terverifikasi.'
      );
      window.location.href = '/admin';
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMsg(translateAuthError(error.message));
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Fetch role from profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, role')
          .eq('id', data.user.id)
          .single();

        const roleName = profile?.role || (data.user.user_metadata?.role as string) || 'USER';
        addNotification(
          'success',
          'Berhasil Masuk',
          `Selamat datang kembali, ${profile?.full_name || data.user.email}.`
        );

        // Redirect based on role
        if (roleName === 'SELLER') {
          window.location.href = '/seller';
        } else if (roleName === 'UMKM') {
          window.location.href = '/craftsman';
        } else if (roleName === 'KURIR') {
          window.location.href = '/courier';
        } else if (roleName === 'ADMIN') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/';
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kendala saat proses masuk';
      setErrorMsg(translateAuthError(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center p-4 py-12 sm:py-16 overflow-hidden">
      <TextileKineticDecor />
      
      <div className="relative z-10 max-w-md w-full bg-white p-7 sm:p-9 border border-slate-200/90 shadow-xl rounded-3xl">
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Masuk ke Akun
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Kelola donasi pakaian, pesanan kerajinan, dan kumpulkan poin sirkular.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 mb-5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 text-red-600 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          {/* Email Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Alamat Email
            </label>
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

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Kata Sandi
              </label>
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Masukkan kata sandi"
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

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center text-xs sm:text-sm py-3 rounded-xl mt-2 cursor-pointer font-bold shadow-md hover:scale-[1.01] transition-transform"
          >
            {loading ? 'Memverifikasi Akun...' : 'Masuk ke Platform'}
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
          Belum memiliki akun terdaftar?{' '}
          <Link href="/auth/register" className="font-bold text-emerald-800 hover:underline">
            Daftar Akun Baru
          </Link>
        </div>

      </div>
    </div>
  );
}
