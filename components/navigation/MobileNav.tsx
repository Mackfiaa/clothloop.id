'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Recycle, ShoppingBag, Scissors, Award } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/drop', label: 'Drop', icon: Recycle },
  { href: '/market', label: 'Preloved', icon: ShoppingBag },
  { href: '/craft', label: 'Craft', icon: Scissors },
  { href: '/impact', label: 'Impact', icon: Award },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        background: '#191817',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '9999px',
        padding: '0.4rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
      }}
    >
      {links.map((l) => {
        const Icon = l.icon;
        const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.125rem',
              padding: '0.35rem 0.65rem',
              borderRadius: '9999px',
              backgroundColor: active ? '#1b3628' : 'transparent',
              color: active ? '#ffffff' : 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              transition: 'background-color 0.15s, color 0.15s',
            }}
          >
            <Icon size={15} strokeWidth={1.75} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.5625rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}>
              {l.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
