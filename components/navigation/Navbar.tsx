'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ShoppingBag, Recycle, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/drop', label: 'ClothDrop' },
  { href: '/market', label: 'Preloved' },
  { href: '/craft', label: 'Craft Studio' },
  { href: '/impact', label: 'Eco Impact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = cart.reduce((a, c) => a + c.quantity, 0);

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
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

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

              {/* CTA — hidden mobile */}
              <Link
                href="/drop"
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem', display: 'none' }}
                // show on md
              >
                <Recycle size={13} />
                Drop Baju
              </Link>
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
