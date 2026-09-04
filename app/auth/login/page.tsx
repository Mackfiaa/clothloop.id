'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useApp } from '@/lib/store';
import { ArrowRight, Lock, Mail, AlertCircle, CheckCircle2, Shield } from 'lucide-react';

function translateAuthError(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return 'Email atau kata sandi tidak cocok. Silakan periksa kembali.';
  }
  if (message.includes('Email not confirmed')) {
    return 'Email belum diverifikasi. Silakan cek inbox atau coba masuk kembali.';
  }
  if (message.includes('Too many requests')) {
    return 'Terlalu banyak percobaan masuk. Harap tunggu beberapa saat.';
  }
  return message;
}

export default function LoginPage() {
  const { addNotification } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

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

        const roleName = profile?.role || 'USER';
        addNotification(
          'success',
          'Berhasil Masuk',
          `Selamat datang kembali, ${profile?.full_name || data.user.email} (${roleName}).`
        );
        window.location.href = '/';
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kendala saat proses masuk';
      setErrorMsg(translateAuthError(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[var(--surface-main)] py-10">
      <div className="max-w-md w-full bg-white p-6 sm:p-9 border border-[var(--border-hairline)] shadow-sm">
        
        {/* Brand Heading */}
        <div className="text-center mb-6">
          <span className="label-eyebrow block mb-1">Masuk ke Akun</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[var(--ink-primary)]">
            ClothLoop.id
          </h1>
          <p className="text-xs text-[var(--ink-muted)] mt-1">
            Akses dashboard Eco-Citizen, Toko Preloved, Studio Rework, atau Mitra Kurir.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Alamat Email</span>
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
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Kata Sandi</span>
            </div>
            <div className="relative">
              <Lock size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="input-minimal text-xs pl-5"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center text-xs py-2.5 mt-2 cursor-pointer"
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Platform'}
            <ArrowRight size={13} />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] text-center text-xs text-[var(--ink-muted)]">
          Belum memiliki akun terdaftar?{' '}
          <Link href="/auth/register" className="font-semibold text-[var(--forest-deep)] underline">
            Daftar Akun Baru
          </Link>
        </div>

      </div>
    </div>
  );
}
