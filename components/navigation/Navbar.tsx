'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/store';
import { formatNumber } from '@/lib/utils';
import { ShoppingBag, User as UserIcon, LogOut, Scissors, Store, Truck } from 'lucide-react';
import { UserRole } from '@/lib/types';

const ROLE_LABELS: Record<UserRole, { label: string; bg: string; color: string; border: string }> = {
  USER: { label: 'Donatur', bg: 'var(--forest-subtle)', color: 'var(--emerald-vibrant)', border: 'rgba(5, 150, 105, 0.25)' },
  SELLER: { label: 'Seller Preloved', bg: 'var(--ochre-subtle)', color: 'var(--ochre)', border: 'rgba(217, 119, 6, 0.25)' },
  UMKM: { label: 'UMKM Artisan', bg: 'var(--clay-subtle)', color: 'var(--clay)', border: 'rgba(234, 88, 12, 0.25)' },
  KURIR: { label: 'Mitra Kurir', bg: '#eff6ff', color: '#2563eb', border: 'rgba(37, 99, 235, 0.25)' },
  ADMIN: { label: 'Administrator', bg: '#f3f4f6', color: '#1f2937', border: 'rgba(31, 41, 55, 0.25)' },
};

export function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen, currentUser, userProfile, userPoints, signOut } = useApp();
  const [scrolled, setScrolled] = useState(false);
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

  const isPortal = pathname.startsWith('/seller') || pathname.startsWith('/craftsman') || pathname.startsWith('/courier') || pathname.startsWith('/admin');
  if (isPortal) return null;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--surface-main)]/92 backdrop-blur-md border-b border-[var(--border-hairline)] shadow-2xs'
          : 'bg-[var(--surface-main)] border-b border-[var(--border-hairline)]'
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-0.5 shrink-0 no-underline group">
            <span className="text-xl font-extrabold text-[var(--forest-deep)] tracking-tight group-hover:text-[var(--emerald-vibrant)] transition-colors">
              ClothLoop
            </span>
            <span className="text-[11px] font-bold text-[var(--emerald-bright)] font-mono">
              .id
            </span>
          </Link>

          {/* Right Section: Auth, Points & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">

            {/* User ClothPoints Badge (Only Visible when Logged In) */}
            {currentUser && (
              <Link
                href="/impact"
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 border border-amber-300/90 rounded-full text-amber-800 transition-all no-underline shadow-2xs group"
                title="ClothPoints Anda"
              >
                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] sm:text-[10px] font-black group-hover:scale-110 transition-transform shadow-2xs font-mono">
                  P
                </span>
                <span className="text-[11px] sm:text-xs font-black font-mono tracking-tight text-amber-900 flex items-center gap-0.5">
                  {formatNumber(userPoints)} <span className="text-[9px] sm:text-[10px] font-bold text-amber-700">Pts</span>
                </span>
              </Link>
            )}

            {/* Cart Trigger with Bounce Badge */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Keranjang Belanja"
              className="relative p-2 text-[var(--ink-primary)] hover:text-[var(--emerald-vibrant)] cursor-pointer bg-white border border-[var(--border-hairline)] rounded-full shadow-2xs flex items-center justify-center transition-colors"
            >
              <ShoppingBag size={15} strokeWidth={2} />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--emerald-vibrant)] text-white text-[9px] font-extrabold flex items-center justify-center font-mono shadow-xs"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* User Dropdown / Single Auth Buttons */}
            {currentUser ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 border border-[var(--border-hairline)] bg-white rounded-full text-xs text-[var(--ink-primary)] font-medium cursor-pointer shadow-2xs hover:border-[var(--emerald-vibrant)] transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[var(--emerald-vibrant)] text-white flex items-center justify-center text-[10px] font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden lg:inline max-w-[100px] truncate font-bold text-xs">
                    {displayName}
                  </span>
                  <span
                    className="text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider border hidden sm:inline-block"
                    style={{ backgroundColor: roleConfig.bg, color: roleConfig.color, borderColor: roleConfig.border }}
                  >
                    {roleConfig.label}
                  </span>
                </motion.button>

                {/* Animated Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl border border-[var(--border-hairline)] shadow-xl z-50 flex flex-col overflow-hidden"
                    >
                      <div className="p-4 border-b border-[var(--border-hairline)] bg-[var(--surface-muted)]">
                        <div className="flex justify-between items-start gap-1">
                          <p className="font-bold text-xs text-[var(--ink-primary)] truncate">{displayName}</p>
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider border"
                            style={{ backgroundColor: roleConfig.bg, color: roleConfig.color, borderColor: roleConfig.border }}
                          >
                            {role}
                          </span>
                        </div>
                        <p className="text-[10px] text-[var(--ink-muted)] truncate mt-0.5">{currentUser.email}</p>
                        {userProfile?.business_name && (
                          <p className="text-[10px] text-[var(--emerald-vibrant)] font-bold mt-1 truncate flex items-center gap-1">
                            <Store size={10} className="shrink-0" /> {userProfile.business_name}
                          </p>
                        )}
                        <div className="mt-2 pt-2 border-t border-[var(--border-hairline)] flex justify-between items-center text-[10px]">
                          <span className="text-gray-500 font-medium">ClothPoints:</span>
                          <strong className="text-[var(--ochre)] font-mono text-xs font-bold">+{formatNumber(userPoints)} Pts</strong>
                        </div>
                      </div>

                      <Link
                        href="/impact"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-3 text-xs text-[var(--ink-primary)] hover:bg-[var(--forest-subtle)] border-b border-[var(--border-hairline)] no-underline transition-colors font-semibold"
                      >
                        <UserIcon size={13} className="text-[var(--emerald-vibrant)]" />
                        <span>Portofolio Dampak & Poin</span>
                      </Link>

                      {role === 'SELLER' && (
                        <Link
                          href="/seller"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 p-3 text-xs text-[var(--ink-primary)] hover:bg-amber-50/60 border-b border-[var(--border-hairline)] no-underline transition-colors font-semibold"
                        >
                          <Store size={13} className="text-amber-600" />
                          <span>Portal Dashboard Seller</span>
                        </Link>
                      )}

                      {role === 'UMKM' && (
                        <Link
                          href="/craftsman"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 p-3 text-xs text-[var(--ink-primary)] hover:bg-emerald-50/60 border-b border-[var(--border-hairline)] no-underline transition-colors font-semibold"
                        >
                          <Scissors size={13} className="text-emerald-600" />
                          <span>Portal Studio Perajin</span>
                        </Link>
                      )}

                      {role === 'KURIR' && (
                        <Link
                          href="/courier"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 p-3 text-xs text-[var(--ink-primary)] hover:bg-blue-50/60 border-b border-[var(--border-hairline)] no-underline transition-colors font-semibold"
                        >
                          <Truck size={13} className="text-blue-600" />
                          <span>Portal Mitra Kurir Jemput</span>
                        </Link>
                      )}

                      {role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 p-3 text-xs text-[var(--ink-primary)] hover:bg-stone-100 border-b border-[var(--border-hairline)] no-underline transition-colors font-semibold"
                        >
                          <Store size={13} className="text-stone-800" />
                          <span>Master Admin Control</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={async () => {
                          setUserDropdownOpen(false);
                          await signOut();
                        }}
                        className="flex items-center gap-2 p-3 text-xs text-rose-600 hover:bg-rose-50 text-left cursor-pointer border-none bg-transparent transition-colors font-bold"
                      >
                        <LogOut size={13} />
                        <span>Keluar Akun</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href="/auth/login"
                  className="text-xs font-bold text-[var(--ink-primary)] hover:text-emerald-700 px-2.5 sm:px-3 py-1.5 transition-colors no-underline"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary text-xs py-1.5 px-3 sm:px-3.5 rounded-full font-bold shadow-xs no-underline"
                >
                  Daftar
                </Link>
              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}

