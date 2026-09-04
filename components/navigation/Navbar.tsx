'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { formatNumber } from '@/lib/utils';
import { ShoppingBag, Recycle, Menu, X, User as UserIcon, LogOut, PackageCheck, Scissors, Store, Truck } from 'lucide-react';
import { UserRole } from '@/lib/types';

const navLinks = [
  { href: '/drop', label: 'ClothDrop' },
  { href: '/market', label: 'Preloved' },
  { href: '/craft', label: 'Craft Studio' },
  { href: '/impact', label: 'Eco Impact' },
];

const ROLE_LABELS: Record<UserRole, { label: string; bg: string; color: string }> = {
  USER: { label: 'Eco-Citizen', bg: 'var(--forest-subtle)', color: 'var(--forest-deep)' },
  SELLER: { label: 'Seller Preloved', bg: 'var(--ochre-subtle)', color: 'var(--ochre)' },
  UMKM: { label: 'UMKM Artisan', bg: 'var(--clay-subtle)', color: 'var(--clay)' },
  KURIR: { label: 'Mitra Kurir', bg: '#e8f0fe', color: '#1a56db' },
  ADMIN: { label: 'Administrator', bg: '#f3f4f6', color: '#1f2937' },
};

export function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen, currentUser, userProfile, userPoints, signOut } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalItems = cart.reduce((a, c) => a + c.quantity, 0);
  const displayName = userProfile?.full_name || currentUser?.email?.split('@')[0] || 'Member';
  const role: UserRole = userProfile?.role || 'USER';
  const roleConfig = ROLE_LABELS[role] || ROLE_LABELS.USER;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[var(--surface-main)]/95 backdrop-blur-md border-b border-[var(--border-hairline)] shadow-xs'
          : 'bg-[var(--surface-main)] border-b border-[var(--border-hairline)]'
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 shrink-0 no-underline">
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[var(--forest-deep)] tracking-tight">
              ClothLoop
            </span>
            <span className="text-[11px] font-bold text-[var(--ink-muted)]">
              .id
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => {
              const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-xs font-medium tracking-wide transition-colors no-underline py-1 border-b-2 ${
                    active
                      ? 'text-[var(--forest-deep)] border-[var(--forest-deep)] font-semibold'
                      : 'text-[var(--ink-secondary)] border-transparent hover:text-[var(--ink-primary)]'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Auth & Cart Actions */}
          <div className="flex items-center gap-3 shrink-0">

            {/* User Dropdown / Auth Buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 border border-[var(--border-hairline)] bg-white text-xs text-[var(--ink-primary)] font-medium cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[var(--forest-deep)] text-white flex items-center justify-center text-[10px] font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline max-w-[100px] truncate">
                    {displayName}
                  </span>
                  <span
                    className="text-[9px] font-semibold px-1.5 py-0.5 rounded-xs uppercase tracking-wider"
                    style={{ backgroundColor: roleConfig.bg, color: roleConfig.color }}
                  >
                    {roleConfig.label}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-[var(--border-hairline)] shadow-lg z-50 flex flex-col">
                    <div className="p-3 border-b border-[var(--border-hairline)] bg-[var(--surface-muted)]">
                      <div className="flex justify-between items-start gap-1">
                        <p className="font-bold text-xs text-[var(--ink-primary)] truncate">{displayName}</p>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.2 rounded-xs uppercase tracking-wider"
                          style={{ backgroundColor: roleConfig.bg, color: roleConfig.color }}
                        >
                          {role}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--ink-muted)] truncate mt-0.5">{currentUser.email}</p>
                      {userProfile?.business_name && (
                        <p className="text-[10px] text-[var(--forest-deep)] font-semibold mt-1 truncate">
                          🏢 {userProfile.business_name}
                        </p>
                      )}
                    </div>

                    <Link
                      href="/impact"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 p-3 text-xs text-[var(--ink-primary)] hover:bg-gray-50 border-b border-[var(--border-hairline)] no-underline"
                    >
                      <UserIcon size={13} className="text-[var(--forest-deep)]" />
                      <span>Portofolio Dampak & Poin</span>
                    </Link>

                    {/* Role-tailored shortcut links */}
                    {role === 'SELLER' && (
                      <Link
                        href="/market"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-3 text-xs text-[var(--ink-primary)] hover:bg-gray-50 border-b border-[var(--border-hairline)] no-underline"
                      >
                        <Store size={13} className="text-[var(--ochre)]" />
                        <span>Katalog & Penjualan Saya</span>
                      </Link>
                    )}

                    {role === 'UMKM' && (
                      <Link
                        href="/craft"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-3 text-xs text-[var(--ink-primary)] hover:bg-gray-50 border-b border-[var(--border-hairline)] no-underline"
                      >
                        <Scissors size={13} className="text-[var(--clay)]" />
                        <span>Kelola Antrean Rework</span>
                      </Link>
                    )}

                    {role === 'KURIR' && (
                      <Link
                        href="/drop"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-3 text-xs text-[var(--ink-primary)] hover:bg-gray-50 border-b border-[var(--border-hairline)] no-underline"
                      >
                        <Truck size={13} className="text-blue-600" />
                        <span>Jadwal Penjemputan Donasi</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await signOut();
                      }}
                      className="flex items-center gap-2 p-3 text-xs text-[var(--clay)] hover:bg-red-50 text-left cursor-pointer border-none bg-transparent"
                    >
                      <LogOut size={13} />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-xs font-medium text-[var(--ink-primary)] hover:text-[var(--forest-deep)] px-2.5 py-1.5 no-underline"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-secondary text-xs py-1.5 px-3 uppercase tracking-wider"
                >
                  Daftar
                </Link>
              </div>
            )}

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Keranjang Belanja"
              className="relative p-2 text-[var(--ink-primary)] hover:text-[var(--forest-deep)] cursor-pointer bg-transparent border-none flex items-center justify-center"
            >
              <ShoppingBag size={18} strokeWidth={1.75} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-0 w-4 h-4 rounded-full bg-[var(--forest-deep)] text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  {totalItems}
                </span>
              )}
            </button>

            {/* CTA Drop Button (Desktop) */}
            <Link
              href="/drop"
              className="hidden lg:flex btn-primary text-xs py-1.5 px-3"
            >
              <Recycle size={13} />
              Drop Pakaian
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-[var(--ink-primary)] cursor-pointer bg-transparent border-none"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--surface-main)] border-t border-[var(--border-hairline)] px-5 py-6 flex flex-col gap-5 shadow-lg">
          
          {/* User Section on Mobile */}
          <div className="pb-4 border-b border-[var(--border-hairline)]">
            {currentUser ? (
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-base text-[var(--ink-primary)]">{displayName}</p>
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider"
                      style={{ backgroundColor: roleConfig.bg, color: roleConfig.color }}
                    >
                      {roleConfig.label}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--forest-deep)] font-semibold font-mono">{formatNumber(userPoints)} Poin</p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    setMobileOpen(false);
                    await signOut();
                  }}
                  className="text-xs text-[var(--clay)] font-semibold cursor-pointer bg-transparent border-none"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary text-xs py-2 justify-center"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-xs py-2 justify-center"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Links on Mobile */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-bold font-serif text-[var(--ink-primary)] hover:text-[var(--forest-deep)] py-2.5 border-b border-[var(--border-hairline)] last:border-b-0 no-underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/drop"
            onClick={() => setMobileOpen(false)}
            className="btn-primary justify-center text-xs py-3 w-full mt-2"
          >
            <Recycle size={14} /> Serahkan Pakaian Sekarang
          </Link>
        </div>
      )}
    </header>
  );
}
