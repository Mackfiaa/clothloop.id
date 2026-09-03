'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useApp } from '@/lib/store';
import { ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';

function translateAuthError(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return 'Email atau password salah. Silakan periksa kembali.';
  }
  if (message.includes('Email not confirmed')) {
    return 'Email belum dikonfirmasi. Kami telah memverifikasi akunmu secara otomatis, silakan coba tekan Masuk lagi.';
  }
  if (message.includes('User already registered')) {
    return 'Email ini sudah terdaftar. Silakan masuk.';
  }
  if (message.includes('Password should be at least 6 characters')) {
    return 'Password minimal harus 6 karakter.';
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
        addNotification('success', 'Selamat Datang Kembali!', `Berhasil masuk sebagai ${data.user.email}`);
        // Full navigation ensures cookie sync & fresh auth state
        window.location.href = '/';
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat login';
      setErrorMsg(translateAuthError(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 3.75rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <div style={{
        maxWidth: '56rem',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--white)',
        border: '1px solid var(--line)',
        overflow: 'hidden',
        boxShadow: '0 12px 48px rgba(15, 14, 13, 0.05)',
      }} className="grid-cols-1 md:grid-cols-2">

        {/* Left: Editorial Image & Quote */}
        <div style={{ position: 'relative', minHeight: '28rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3rem', background: 'var(--forest)' }} className="hidden md:flex">
          <div style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
            <Image
              src="/hero-portrait.jpg"
              alt="ClothLoop Sustainable Fashion"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <span className="label-caps" style={{ color: 'var(--sage-light)' }}>
              ClothLoop.id
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#fff', marginTop: '1rem', lineHeight: 1.15 }}>
              Kembali merawat masa depan<br />
              <em style={{ fontStyle: 'italic', color: 'var(--sage-light)' }}>fashion sirkular.</em>
            </h2>
          </div>

          <div style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.5rem' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Setiap donasi pakaian, transaksi preloved, dan karya artisan tersimpan transparan di akunmu.
            </p>
          </div>
        </div>

        {/* Right: Login Form */}
        <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div>
            <span className="label-caps">Selamat Datang</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: 'var(--ink)', marginTop: '0.5rem', lineHeight: 1.15 }}>
              Masuk ke akunmu
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink-muted)', marginTop: '0.5rem' }}>
              Belum punya akun?{' '}
              <Link href="/auth/register" style={{ color: 'var(--forest)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                Daftar gratis
              </Link>
            </p>
          </div>

          {errorMsg && (
            <div style={{ marginTop: '1.5rem', padding: '0.875rem 1rem', background: 'var(--terracotta-light)', border: '1px solid rgba(196,107,58,0.3)', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <AlertCircle size={16} style={{ color: 'var(--terracotta)', flexShrink: 0 }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--terracotta)', lineHeight: 1.4 }}>
                {errorMsg}
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span className="label-caps" style={{ fontSize: '0.625rem', display: 'block', marginBottom: '0.375rem' }}>Email</span>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="input-underline"
                  style={{ paddingRight: '2rem' }}
                />
                <Mail size={16} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-faint)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.375rem' }}>
                <span className="label-caps" style={{ fontSize: '0.625rem' }}>Password</span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-underline"
                  style={{ paddingRight: '2rem' }}
                />
                <Lock size={16} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-faint)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Memproses Masuk...' : (
                <>
                  Masuk Sekarang <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
              Dengan masuk, kamu menyetujui Ketentuan Layanan & Kebijakan Privasi ClothLoop.id
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
