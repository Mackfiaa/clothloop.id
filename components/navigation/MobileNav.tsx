'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Recycle, ShoppingBag, Scissors, Award } from 'lucide-react';

const links = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/drop', label: 'Drop Baju', icon: Recycle },
  { href: '/craft', label: 'Kerajinan', icon: Scissors },
  { href: '/market', label: 'Preloved', icon: ShoppingBag },
  { href: '/impact', label: 'Poin & Dampak', icon: Award },
];

export function MobileNav() {
  const pathname = usePathname();

  const isPortal = pathname.startsWith('/seller') || pathname.startsWith('/craftsman') || pathname.startsWith('/courier') || pathname.startsWith('/admin');
  if (isPortal) return null;

  return (
    <nav
      className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#121a15]/50 backdrop-blur-xl border border-white/15 rounded-full px-2 sm:px-3 py-1.5 flex items-center gap-1 sm:gap-2 shadow-2xl transition-all"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
      }}
    >
      {links.map((l) => {
        const Icon = l.icon;
        const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);

        return (
          <Link
            key={l.href}
            href={l.href}
            className="no-underline relative group select-none"
          >
            <motion.div
              layout
              animate={{
                scale: active ? 1.12 : 1,
                y: active ? -2 : 0,
              }}
              whileHover={{ scale: active ? 1.14 : 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={{
                type: 'spring',
                stiffness: 450,
                damping: 26,
              }}
              className={`flex flex-col items-center justify-center px-3 sm:px-3.5 py-1.5 rounded-full transition-all relative ${
                active
                  ? 'bg-white/20 text-white font-extrabold shadow-md border border-white/25'
                  : 'text-white/65 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <Icon
                size={16}
                strokeWidth={active ? 2.3 : 1.75}
                className={active ? 'text-white' : 'text-white/70'}
              />
              <span className="text-[9px] sm:text-[10px] tracking-tight font-sans mt-0.5 whitespace-nowrap">
                {l.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}

