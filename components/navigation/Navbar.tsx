'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { formatNumber } from '@/lib/utils';
import { ShoppingBag, Recycle, Menu, X, User as UserIcon, LogOut, Sparkles } from 'lucide-react';

const navLinks = [
  { href: '/drop', label: 'ClothDrop' },
  { href: '/market', label: 'Preloved' },
  { href: '/craft', label: 'Craft Studio' },
  { href: '/impact', label: 'Eco Impact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen, currentUser, userProfile, userPoints, signOut } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalItems = cart.reduce((a, c) => a + c.quantity, 0);
  const displayName = userProfile?.full_name || currentUser?.email?.split('@')[0] || 'Member';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          backgroundColor: scrolled ? 'rgba(247,244,239,0.95)' : 'var(--cream)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'border-color 0.3s, background-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        <div className="container-editorial">
          <div style={{ display: 'flex', alignItems: 'center', height: '3.75rem', gap: '2rem' }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '0.375rem', flexShrink: 0 }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'var(--forest)',
                letterSpacing: '-0.01em',
              }}>
                ClothLoop
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.6875rem',
                color: 'var(--ink-muted)',
                letterSpacing: '0.04em',
              }}>
                .id
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav style={{ display: 'none', flex: 1, gap: '0.25rem' }} className="md:flex">
              {navLinks.map((l) => {
                const active = pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8125rem',
                      fontWeight: active ? 600 : 400,
                      color: active ? 'var(--forest)' : 'var(--ink-muted)',
                      textDecoration: 'none',
                      padding: '0.375rem 0.875rem',
                      borderBottom: active ? '1px solid var(--forest)' : '1px solid transparent',
                      letterSpacing: '0.01em',
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = 'var(--ink)'; }}
                    onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = 'var(--ink-muted)'; }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>

              {/* User Auth Section */}
              {currentUser ? (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'none',
                      border: '1px solid var(--line)',
                      padding: '0.3125rem 0.75rem',
                      cursor: 'pointer',
                      color: 'var(--ink)',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    <span style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '9999px',
                      background: 'var(--forest)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                    }}>
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden sm:inline" style={{ maxWidth: '7rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {displayName}
                    </span>
                    <span style={{ background: 'var(--golden-light)', color: 'var(--golden)', padding: '0.125rem 0.375rem', fontSize: '0.625rem', fontWeight: 700 }}>
                      {formatNumber(userPoints)} pts
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      width: '13rem',
                      background: 'var(--white)',
                      border: '1px solid var(--line)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      zIndex: 60,
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--line)', background: 'var(--cream)' }}>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)' }}>{displayName}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-muted)', marginTop: '0.125rem' }}>{currentUser.email}</p>
                      </div>

                      <Link
                        href="/impact"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.625rem',
                          padding: '0.75rem 1rem',
                          textDecoration: 'none',
                          color: 'var(--ink)',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.8125rem',
                          borderBottom: '1px solid var(--line)',
                        }}
                      >
                        <Sparkles size={14} style={{ color: 'var(--golden)' }} />
                        <span>Eco Impact & Saldo Poin</span>
                      </Link>

                      <button
                        onClick={async () => {
                          setUserDropdownOpen(false);
                          await signOut();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.625rem',
                          padding: '0.75rem 1rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--terracotta)',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.8125rem',
                          textAlign: 'left',
                        }}
                      >
                        <LogOut size={14} />
                        <span>Keluar Akun</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden sm:flex">
                  <Link
                    href="/auth/login"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8125rem',
                      color: 'var(--ink)',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/auth/register"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--forest)',
                      padding: '0.375rem 0.875rem',
                      border: '1px solid var(--forest)',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Daftar
                  </Link>
                </div>
              )}

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Keranjang"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.375rem 0.5rem',
                  color: 'var(--ink-secondary)',
                }}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '0.125rem',
                    right: '0',
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '9999px',
                    background: 'var(--terracotta)',
                    color: '#fff',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {totalItems}
                  </span>
                )}
              </button>

              {/* CTA — Drop Baju */}
              <Link href="/drop" className="hidden md:flex btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}>
                <Recycle size={13} />
                Drop Baju
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-secondary)', padding: '0.375rem' }}
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            background: 'var(--cream)',
            borderTop: '1px solid var(--line)',
            padding: '1.5rem',
          }} className="md:hidden">
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {/* User status on mobile */}
              <div style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--line)' }}>
                {currentUser ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.125rem', color: 'var(--ink)' }}>{displayName}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--golden)', fontWeight: 600 }}>{formatNumber(userPoints)} ClothPoints</p>
                    </div>
                    <button
                      onClick={async () => {
                        setMobileOpen(false);
                        await signOut();
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--terracotta)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', cursor: 'pointer' }}
                    >
                      Keluar
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="btn-secondary"
                      style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem' }}
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem' }}
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>

              {navLinks.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    padding: '0.75rem 0',
                    borderBottom: i < navLinks.length - 1 ? '1px solid var(--line)' : 'none',
                    display: 'block',
                  }}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/drop"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{ marginTop: '1.5rem', justifyContent: 'center' }}
              >
                Mulai Drop Baju Sekarang
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
