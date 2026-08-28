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
        background: 'var(--ink)',
        borderRadius: '9999px',
        padding: '0.5rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
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
              padding: '0.375rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: active ? 'var(--sage)' : 'transparent',
              color: active ? '#ffffff' : 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              transition: 'background-color 0.2s, color 0.2s',
            }}
          >
            <Icon size={16} strokeWidth={1.75} />
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
