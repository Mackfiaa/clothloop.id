'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BotanicalDecor } from './BotanicalDecor';
import { KineticTextileDecor } from './KineticTextileDecor';

interface BackgroundDecorProps {
  variant?: 'default' | 'hero' | 'hero-soft' | 'plain' | 'subtle' | 'market' | 'impact' | 'craft' | 'grid';
  className?: string;
  withBotanical?: boolean;
  withTextile?: boolean;
  botanicalDensity?: 'default' | 'dense' | 'light';
}

export function BackgroundDecor({ 
  variant = 'default', 
  className = '',
  withBotanical = true,
  withTextile = true,
  botanicalDensity = 'default'
}: BackgroundDecorProps) {
  const isPlain = variant === 'plain';
  const isHeroSoft = variant === 'hero' || variant === 'hero-soft';

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden -z-10 select-none ${className}`}>
      {/* Floating Animated Botanical Elements */}
      {withBotanical && !isPlain && (
        <BotanicalDecor density={isHeroSoft ? 'light' : botanicalDensity} />
      )}

      {/* Kinetic Textile Animated Elements (Moving Spools, Looping Thread, Buttons, Sashiko Waves) */}
      {withTextile && !isPlain && (
        <KineticTextileDecor density={isHeroSoft ? 'soft' : 'bold'} />
      )}

      {/* ── Continuous Luminous Ambient Glowing Light Orbs (Only on dynamic sections) ── */}
      {!isPlain && (
        <>
          <motion.div 
            className="absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(5, 150, 105, 0.12) 0%, rgba(16, 185, 129, 0.05) 45%, transparent 70%)',
            }}
            animate={{
              x: [0, 40, 0],
              y: [0, 30, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 14,
              ease: 'easeInOut',
            }}
          />
          <motion.div 
            className="absolute top-[35%] -right-20 w-[42rem] h-[42rem] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(217, 119, 6, 0.10) 0%, rgba(245, 158, 11, 0.04) 50%, transparent 70%)',
            }}
            animate={{
              x: [0, -35, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 16,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </>
      )}

      {/* Static Precision Technical & Geometric Shapes */}
      {variant === 'hero' && (
        <>
          {/* Circular Loop Contour & Thread Arcs */}
          <svg
            className="absolute top-10 right-[8%] w-80 h-80 opacity-30 text-emerald-600"
            viewBox="0 0 300 300"
            fill="none"
          >
            <circle cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="150" cy="150" r="90" stroke="currentColor" strokeWidth="0.75" />
            <path d="M40,150 Q150,40 260,150 T480,150" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
            <circle cx="150" cy="20" r="3" fill="currentColor" />
            <circle cx="280" cy="150" r="3" fill="currentColor" />
          </svg>

          <svg
            className="absolute bottom-12 left-[5%] w-72 h-72 opacity-25 text-amber-600"
            viewBox="0 0 260 260"
            fill="none"
          >
            <rect x="30" y="30" width="200" height="200" rx="36" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="130" cy="130" r="60" stroke="currentColor" strokeWidth="0.75" />
            <path d="M30,130 L230,130" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          </svg>
        </>
      )}

      {variant === 'default' && (
        <>
          {/* Subtle Ring & Corner Thread Motif */}
          <svg
            className="absolute top-8 right-6 w-60 h-60 opacity-25 text-emerald-600"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" />
            <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.6" />
          </svg>

          <svg
            className="absolute -bottom-8 left-8 w-64 h-64 opacity-20 text-emerald-800"
            viewBox="0 0 200 200"
            fill="none"
          >
            <rect x="25" y="25" width="150" height="150" rx="28" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 5" />
            <circle cx="100" cy="100" r="40" stroke="var(--ochre)" strokeWidth="0.6" />
          </svg>
        </>
      )}

      {variant === 'market' && (
        <>
          {/* Clean Fabric Grid & Stamp Motif */}
          <svg
            className="absolute top-16 right-10 w-72 h-72 opacity-20 text-emerald-700"
            viewBox="0 0 240 240"
            fill="none"
          >
            <circle cx="120" cy="120" r="100" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="120" cy="120" r="70" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
            <line x1="20" y1="120" x2="220" y2="120" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="120" y1="20" x2="120" y2="220" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          </svg>
        </>
      )}

      {variant === 'craft' && (
        <>
          {/* Upcycling Craft Motif (Weave & Needle curves) */}
          <svg
            className="absolute top-12 left-10 w-80 h-80 opacity-20 text-amber-700"
            viewBox="0 0 280 280"
            fill="none"
          >
            <path d="M20,70 Q140,20 260,70 T500,70" stroke="currentColor" strokeWidth="0.75" />
            <path d="M20,140 Q140,90 260,140 T500,140" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
            <path d="M20,210 Q140,160 260,210 T500,210" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="140" cy="140" r="75" stroke="var(--emerald-vibrant)" strokeWidth="0.75" />
          </svg>
        </>
      )}

      {variant === 'impact' && (
        <>
          {/* Carbon & Circular Metric Contour */}
          <svg
            className="absolute top-10 right-12 w-96 h-96 opacity-20 text-emerald-600"
            viewBox="0 0 320 320"
            fill="none"
          >
            <circle cx="160" cy="160" r="140" stroke="currentColor" strokeWidth="0.75" strokeDasharray="5 7" />
            <circle cx="160" cy="160" r="100" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="160" cy="160" r="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <path d="M160,20 L160,300" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
            <path d="M20,160 L300,160" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
          </svg>
        </>
      )}

      {/* Subtle Micro-dotted Canvas Layer */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(var(--forest-deep) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
