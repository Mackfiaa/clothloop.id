'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useApp } from '@/lib/store';
import { ArrowRight, Lock, Mail, User, Phone, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

function translateAuthError(message: string): string {
  if (message.includes('User already registered')) {
    return 'Email ini sudah terdaftar. Silakan langsung masuk di halaman login.';
  }
  if (message.includes('Password should be at least 6 characters')) {
    return 'Password minimal harus 6 karakter.';
  }
  return message;
}

export default function RegisterPage() {
  const { addNotification } = useApp();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    if (password.length < 6) {
      setErrorMsg('Password minimal terdiri dari 6 karakter.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
          },
        },
      });

      if (error) {
        setErrorMsg(translateAuthError(error.message));
        setLoading(false);
        return;
      }

      if (data?.user) {
        // If session created or user registered, sign in automatically
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (!signInErr) {
          addNotification('success', 'Akun Berhasil Dibuat! 🎉', `Selamat datang di ClothLoop, ${fullName}! Bonus +100 ClothPoints telah ditambahkan.`);
          window.location.href = '/';
        } else {
          // If already signed in via session
          window.location.href = '/';
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat registrasi';
      setErrorMsg(translateAuthError(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 3.75rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <div style={{
        maxWidth: '60rem',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--white)',
        border: '1px solid var(--line)',
        overflow: 'hidden',
        boxShadow: '0 12px 48px rgba(15, 14, 13, 0.05)',
      }} className="grid-cols-1 md:grid-cols-2">

        {/* Left: Editorial Image & Benefits */}
        <div style={{ position: 'relative', minHeight: '32rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3rem', background: 'var(--forest)' }} className="hidden md:flex">
          <div style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
            <Image
              src="/hero-flatlay.jpg"
              alt="ClothLoop Sustainable Fashion Community"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <span className="label-caps" style={{ color: 'var(--sage-light)' }}>
              Gabung Gerakan
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.25rem', color: '#fff', marginTop: '1rem', lineHeight: 1.12 }}>
              Jadilah bagian dari<br />
              <em style={{ fontStyle: 'italic', color: 'var(--sage-light)' }}>18.000+ Eco-Citizens</em> Indonesia.
            </h2>
          </div>

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.5rem' }}>
            {[
              'Bonus +100 ClothPoints langsung saat mendaftar',
              'Pelacakan dampak air & karbon digital personal',
              'Jual preloved dengan proteksi escrow gratis',
              'Akses prioritas ke artisan upcycling terbaik',
            ].map((benefit, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--sage-light)', flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)' }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Registration Form */}
        <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.625rem', background: 'var(--golden-light)', color: 'var(--golden)', marginBottom: '0.75rem' }}>
              <Sparkles size={13} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.04em' }}>BONUS +100 CLOTHPOINTS</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: 'var(--ink)', marginTop: '0.25rem', lineHeight: 1.15 }}>
              Buat akun baru
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink-muted)', marginTop: '0.5rem' }}>
              Sudah punya akun?{' '}
              <Link href="/auth/login" style={{ color: 'var(--forest)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                Masuk di sini
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

          <form onSubmit={handleRegister} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <span className="label-caps" style={{ fontSize: '0.625rem', display: 'block', marginBottom: '0.375rem' }}>Nama Lengkap</span>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Raditya Wicaksana"
                  className="input-underline"
                  style={{ paddingRight: '2rem' }}
                />
                <User size={16} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-faint)' }} />
              </div>
            </div>

            <div>
              <span className="label-caps" style={{ fontSize: '0.625rem', display: 'block', marginBottom: '0.375rem' }}>Nomor WhatsApp</span>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
                  className="input-underline"
                  style={{ paddingRight: '2rem' }}
                />
                <Phone size={16} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-faint)' }} />
              </div>
            </div>

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
              <span className="label-caps" style={{ fontSize: '0.625rem', display: 'block', marginBottom: '0.375rem' }}>Password (min. 6 karakter)</span>
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
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Mendaftarkan Akun...' : (
                <>
                  Daftar & Klaim +100 Poin <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
              Dengan mendaftar, kamu menyetujui Ketentuan Layanan & Kebijakan Privasi ClothLoop.id
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
