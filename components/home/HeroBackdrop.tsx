'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-gradient-to-br from-[#032e23] via-[#054e3a] to-[#02221b]">
      {/* ── 1. LUXURIOUS AURORA LIGHTING ORBS ── */}
      <motion.div 
        className="absolute -top-24 -left-20 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-45 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #10b981 0%, #059669 45%, transparent 70%)',
        }}
        animate={{
          x: [0, 45, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: 'easeInOut',
        }}
      />
      <motion.div 
        className="absolute top-[20%] right-[-10%] w-[45rem] h-[45rem] rounded-full blur-3xl opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #34d399 0%, #047857 40%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -35, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div 
        className="absolute -bottom-28 left-[25%] w-[38rem] h-[38rem] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #f59e0b 0%, #059669 50%, transparent 70%)',
        }}
        animate={{
          x: [0, 35, 0],
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* ── 2. CONTINUOUS FLOWING SASHIKO RUNNING STITCH WAVES ── */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        {/* Wave 1: Neon Mint Sashiko Curve */}
        <motion.path
          d="M-120,130 Q320,30 750,170 T1600,110 T2200,160"
          fill="none"
          stroke="#34d399"
          strokeWidth="2.5"
          strokeDasharray="14 16"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -300] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        />
        {/* Wave 2: Golden Amber Silk Ribbon Curve */}
        <motion.path
          d="M-120,320 Q450,210 950,380 T1900,290"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeDasharray="10 12"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, 240] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        {/* Wave 3: Emerald Loom Warp Thread */}
        <motion.path
          d="M-120,580 Q380,720 980,540 T2000,640"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="2.2"
          strokeDasharray="12 14"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -260] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* ── 3. WOVEN FABRIC MICRO-GRID OVERLAY (ANYAMAN KAIN) ── */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #34d399 1.5px, transparent 1.5px),
            linear-gradient(to bottom, #34d399 1.5px, transparent 1.5px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── 4. FLOATING ARTISAN TEXTILE ARTIFACTS ── */}

      {/* Spool 1: Golden Silk Spool (Top Right) */}
      <motion.div
        className="absolute top-[8%] right-[8%] opacity-85 hidden sm:block"
        animate={{
          y: [0, -22, 0],
          x: [0, 14, 0],
          rotate: [0, 18, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="68" height="68" viewBox="0 0 60 60" fill="none" className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          <ellipse cx="30" cy="12" rx="20" ry="6" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
          <rect x="18" y="12" width="24" height="36" fill="#065f46" />
          <line x1="18" y1="18" x2="42" y2="18" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 1" />
          <line x1="18" y1="24" x2="42" y2="24" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 1" />
          <line x1="18" y1="30" x2="42" y2="30" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 1" />
          <line x1="18" y1="36" x2="42" y2="36" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 1" />
          <line x1="18" y1="42" x2="42" y2="42" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 1" />
          <ellipse cx="30" cy="48" rx="20" ry="6" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
          <ellipse cx="30" cy="12" rx="5" ry="2" fill="#022c22" />
        </svg>
      </motion.div>

      {/* Sewing Needle & Golden Thread (Top Left) */}
      <motion.div
        className="absolute top-[14%] left-[4%] opacity-80 hidden md:block"
        animate={{
          y: [0, 24, -10, 0],
          x: [0, -12, 10, 0],
          rotate: [-20, 15, -25, -20],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          <path d="M20 60 L60 20 C62 18 64 18 64 20 C64 22 62 24 60 26 L20 60 Z" fill="#e2e8f0" stroke="#34d399" strokeWidth="1.2" />
          <ellipse cx="59" cy="21" rx="1.5" ry="3" fill="#064e3b" transform="rotate(-45 59 21)" />
          <path
            d="M59 21 C68 12, 78 28, 65 40 C52 52, 38 38, 48 56 C56 70, 72 65, 78 78"
            stroke="#fbbf24"
            strokeWidth="2.2"
            strokeDasharray="5 4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Tailor Brass Scissors (Bottom Left) */}
      <motion.div
        className="absolute bottom-[18%] left-[6%] opacity-75 hidden sm:block"
        animate={{
          y: [0, -26, 12, 0],
          x: [0, 18, -8, 0],
          rotate: [15, -20, 20, 15],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="74" height="74" viewBox="0 0 60 60" fill="none" className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <circle cx="16" cy="44" r="9" stroke="#34d399" strokeWidth="2" fill="#064e3b" fillOpacity="0.6" />
          <circle cx="44" cy="44" r="9" stroke="#34d399" strokeWidth="2" fill="#064e3b" fillOpacity="0.6" />
          <path d="M22 38 L38 14" stroke="#a7f3d0" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M38 38 L22 14" stroke="#a7f3d0" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="30" cy="26" r="3" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Vintage 4-Hole Button (Center Left) */}
      <motion.div
        className="absolute top-[48%] left-[2%] opacity-75 hidden lg:block"
        animate={{
          y: [0, 30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="48" height="48" viewBox="0 0 40 40" fill="none" className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
          <circle cx="20" cy="20" r="18" fill="#047857" stroke="#34d399" strokeWidth="2" />
          <circle cx="20" cy="20" r="13" fill="#065f46" stroke="#6ee7b7" strokeWidth="1" strokeDasharray="2.5 2.5" />
          <circle cx="16" cy="16" r="2.2" fill="#022c22" />
          <circle cx="24" cy="16" r="2.2" fill="#022c22" />
          <circle cx="16" cy="24" r="2.2" fill="#022c22" />
          <circle cx="24" cy="24" r="2.2" fill="#022c22" />
          <line x1="16" y1="16" x2="24" y2="24" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="24" y1="16" x2="16" y2="24" stroke="#fbbf24" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* ── 5. FLOATING GLOWING PARTICLES (KINETIC PETALS & SPARKS) ── */}
      <motion.div
        className="absolute top-[25%] left-[20%] w-4 h-4 rounded-full bg-emerald-300/40 blur-[1px]"
        animate={{ y: [0, -35, 0], x: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[70%] left-[30%] w-5 h-5 rounded-full bg-amber-400/30 blur-[2px]"
        animate={{ y: [0, -30, 0], x: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[28%] right-[20%] w-6 h-6 rounded-full bg-teal-300/35 blur-[2px]"
        animate={{ y: [0, 40, 0], x: [0, -25, 0], opacity: [0.3, 0.75, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute top-[18%] right-[32%] w-3 h-3 rounded-full bg-emerald-200/50 blur-[1px]"
        animate={{ y: [0, -20, 0], x: [0, 15, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── 6. GEOMETRIC CIRCULAR SASHIKO EMBROIDERY RING ── */}
      <svg className="absolute -right-16 -top-16 w-[34rem] h-[34rem] text-emerald-300/15 pointer-events-none" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 8" />
        <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="75" stroke="#fbbf24" strokeOpacity="0.25" strokeWidth="0.8" strokeDasharray="4 6" />
      </svg>
    </div>
  );
}
