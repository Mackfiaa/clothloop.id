'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface KineticTextileDecorProps {
  density?: 'soft' | 'bold' | 'minimal';
}

export function KineticTextileDecor({ density = 'bold' }: KineticTextileDecorProps) {
  const isSoft = density === 'soft';
  const isMinimal = density === 'minimal';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10" aria-hidden="true">
      
      {/* ── 1. CONTINUOUS SASHIKO RUNNING STITCH WAVES ────────── */}
      <svg
        className={`absolute top-0 left-0 w-full h-80 pointer-events-none ${isSoft ? 'opacity-25' : 'opacity-55'}`}
        viewBox="0 0 1400 240"
        fill="none"
      >
        {/* Wave 1 - Emerald Running Stitch */}
        <motion.path
          d="M-100,80 Q250,15 600,105 T1300,75 T1700,110"
          stroke="#059669"
          strokeWidth={isSoft ? '2' : '3.5'}
          strokeDasharray="14 16"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -300 }}
          transition={{ repeat: Infinity, duration: isSoft ? 22 : 14, ease: 'linear' }}
        />
        {!isSoft && (
          <>
            {/* Wave 2 - Bold Terracotta Clay Stitch */}
            <motion.path
              d="M-100,135 Q300,210 750,70 T1400,145 T1800,95"
              stroke="#ea580c"
              strokeWidth="3"
              strokeDasharray="10 12"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 240 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            />
            {/* Wave 3 - Glowing Golden Thread Arc */}
            <motion.path
              d="M-100,195 Q400,95 900,185 T1600,115"
              stroke="#d97706"
              strokeWidth="2.8"
              strokeDasharray="8 10"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -200 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            />
          </>
        )}
      </svg>

      {/* ── 2. SEWING NEEDLE WITH FLOWING GOLDEN THREAD ───────── */}
      <motion.div
        className={`absolute top-[10%] left-[2%] ${isSoft ? 'opacity-35' : 'opacity-85'} hidden sm:block`}
        animate={{
          y: [0, isSoft ? -16 : -32, 0],
          x: [0, isSoft ? 10 : 20, 0],
          rotate: isSoft ? [-15, 8, -15] : [-28, 15, -28],
        }}
        transition={{ repeat: Infinity, duration: isSoft ? 12 : 8.5, ease: 'easeInOut' }}
      >
        <svg width={isSoft ? "72" : "96"} height={isSoft ? "72" : "96"} viewBox="0 0 96 96" fill="none" className="filter drop-shadow-md">
          {/* Metallic Needle Body */}
          <line x1="14" y1="82" x2="78" y2="18" stroke="#064e3b" strokeWidth={isSoft ? "2.5" : "4"} strokeLinecap="round" />
          <line x1="14" y1="82" x2="78" y2="18" stroke="#10b981" strokeWidth={isSoft ? "1.5" : "2"} strokeLinecap="round" opacity="0.8" />
          <ellipse cx="78" cy="18" rx="7" ry="3" transform="rotate(-45 78 18)" fill="#047857" stroke="#064e3b" strokeWidth="1.5" />
          <circle cx="79.5" cy="16.5" r="2.5" fill="#ffffff" />
          {/* Looping Golden Thread Path */}
          <motion.path
            d="M78,18 Q98,42 72,68 Q46,92 20,78 Q-6,62 12,35 Q28,16 56,38 Q80,58 94,32"
            stroke="#d97706"
            strokeWidth={isSoft ? "1.8" : "2.8"}
            strokeDasharray="6 6"
            strokeLinecap="round"
            fill="none"
            animate={{ strokeDashoffset: [0, -140] }}
            transition={{ repeat: Infinity, duration: isSoft ? 11 : 7, ease: 'linear' }}
          />
        </svg>
      </motion.div>

      {/* ── 3. THREAD SPOOLS (KELOS BENANG) ───────────────────── */}
      {/* Spool 1 (Amber Silk Thread - Top Right) */}
      <motion.div
        className={`absolute top-[6%] right-[5%] ${isSoft ? 'opacity-40' : 'opacity-85'}`}
        animate={{
          y: [0, isSoft ? -14 : -26, 0],
          x: [0, isSoft ? -6 : -12, 0],
          rotate: isSoft ? [0, 12, -8, 0] : [0, 24, -15, 0],
        }}
        transition={{ repeat: Infinity, duration: isSoft ? 11 : 8, ease: 'easeInOut' }}
      >
        <svg width={isSoft ? "48" : "68"} height={isSoft ? "48" : "68"} viewBox="0 0 52 52" fill="none" className="filter drop-shadow-lg">
          {/* Inner thread core */}
          <rect x="14" y="8" width="24" height="36" rx="3" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
          {/* Thread coils */}
          <line x1="14" y1="12" x2="38" y2="12" stroke="#d97706" strokeWidth="2.8" />
          <line x1="14" y1="16" x2="38" y2="16" stroke="#ea580c" strokeWidth="2.8" />
          <line x1="14" y1="20" x2="38" y2="20" stroke="#d97706" strokeWidth="2.8" />
          <line x1="14" y1="24" x2="38" y2="24" stroke="#ea580c" strokeWidth="2.8" />
          <line x1="14" y1="28" x2="38" y2="28" stroke="#d97706" strokeWidth="2.8" />
          <line x1="14" y1="32" x2="38" y2="32" stroke="#ea580c" strokeWidth="2.8" />
          <line x1="14" y1="36" x2="38" y2="36" stroke="#d97706" strokeWidth="2.8" />
          <line x1="14" y1="40" x2="38" y2="40" stroke="#ea580c" strokeWidth="2.8" />
          {/* Wooden Flanges */}
          <rect x="9" y="4" width="34" height="6" rx="2.5" fill="#78350f" stroke="#451a03" strokeWidth="1.2" />
          <rect x="9" y="42" width="34" height="6" rx="2.5" fill="#78350f" stroke="#451a03" strokeWidth="1.2" />
        </svg>
      </motion.div>

      {/* Spool 2 & Heavy Ornaments (Only in Bold / Non-soft modes) */}
      {!isSoft && (
        <>
          {/* Spool 2 (Emerald Cotton Thread - Mid Left) */}
          <motion.div
            className="absolute top-[44%] left-[3%] opacity-80"
            animate={{
              y: [0, 28, 0],
              x: [0, 16, 0],
              rotate: [-18, 18, -18],
            }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 0.8 }}
          >
            <svg width="64" height="64" viewBox="0 0 52 52" fill="none" className="filter drop-shadow-lg">
              <rect x="14" y="8" width="24" height="36" rx="3" fill="#6ee7b7" stroke="#047857" strokeWidth="1" />
              <line x1="14" y1="13" x2="38" y2="13" stroke="#059669" strokeWidth="2.8" />
              <line x1="14" y1="17" x2="38" y2="17" stroke="#10b981" strokeWidth="2.8" />
              <line x1="14" y1="21" x2="38" y2="21" stroke="#047857" strokeWidth="2.8" />
              <line x1="14" y1="25" x2="38" y2="25" stroke="#10b981" strokeWidth="2.8" />
              <line x1="14" y1="29" x2="38" y2="29" stroke="#059669" strokeWidth="2.8" />
              <line x1="14" y1="33" x2="38" y2="33" stroke="#10b981" strokeWidth="2.8" />
              <line x1="14" y1="37" x2="38" y2="37" stroke="#047857" strokeWidth="2.8" />
              <rect x="9" y="4" width="34" height="6" rx="2.5" fill="#064e3b" stroke="#022c22" strokeWidth="1.2" />
              <rect x="9" y="42" width="34" height="6" rx="2.5" fill="#064e3b" stroke="#022c22" strokeWidth="1.2" />
            </svg>
          </motion.div>

          {/* ── 4. CHUNKY YARN BALL (GULUNGAN BENANG RAJUT) ─────────────── */}
          <motion.div
            className="absolute top-[28%] right-[4%] opacity-75 hidden md:block"
            animate={{
              rotate: [0, 360],
              y: [0, -22, 0],
              x: [0, -10, 0],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 18, ease: 'linear' },
              y: { repeat: Infinity, duration: 6.5, ease: 'easeInOut' },
              x: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
            }}
          >
            <svg width="68" height="68" viewBox="0 0 56 56" fill="none" className="filter drop-shadow-md">
              <circle cx="28" cy="28" r="23" fill="#ea580c" fillOpacity="0.45" stroke="#c2410c" strokeWidth="2.8" />
              <path d="M10,28 Q28,8 46,28" stroke="#9a3412" strokeWidth="2.4" />
              <path d="M14,38 Q28,16 42,38" stroke="#9a3412" strokeWidth="2.4" />
              <path d="M28,6 Q10,28 28,50" stroke="#f97316" strokeWidth="2.4" strokeDasharray="4 4" />
              <path d="M38,10 Q20,28 38,46" stroke="#9a3412" strokeWidth="2.2" />
              <path d="M46,28 Q60,42 52,54" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* ── 5. ARTISAN CRAFT SCISSORS (GUNTING JAHIT KUNINGAN) ──────── */}
          <motion.div
            className="absolute top-[65%] right-[7%] opacity-80 hidden sm:block"
            animate={{
              rotate: [-20, 25, -20],
              y: [0, -26, 0],
              x: [0, -15, 0],
            }}
            transition={{ repeat: Infinity, duration: 9.5, ease: 'easeInOut' }}
          >
            <svg width="72" height="72" viewBox="0 0 60 60" fill="none" className="filter drop-shadow-lg">
              {/* Finger Loops */}
              <circle cx="16" cy="44" r="9" stroke="#047857" strokeWidth="3" fill="#a7f3d0" fillOpacity="0.6" />
              <circle cx="44" cy="44" r="9" stroke="#047857" strokeWidth="3" fill="#a7f3d0" fillOpacity="0.6" />
              {/* Blades */}
              <line x1="22" y1="36" x2="42" y2="8" stroke="#064e3b" strokeWidth="3.8" strokeLinecap="round" />
              <line x1="38" y1="36" x2="18" y2="8" stroke="#064e3b" strokeWidth="3.8" strokeLinecap="round" />
              {/* Brass Pivot Screw */}
              <circle cx="30" cy="24" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* ── 6. BOLD ARTISAN BUTTONS (KANCING VINTAGE 4-LUBANG) ──────── */}
          {/* Button 1 (Amber Wood - Mid Page) */}
          <motion.div
            className="absolute top-[18%] right-[16%] opacity-80"
            animate={{
              rotate: [0, 360],
              y: [0, 24, 0],
              scale: [1, 1.14, 1],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 16, ease: 'linear' },
              y: { repeat: Infinity, duration: 6.5, ease: 'easeInOut' },
              scale: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
            }}
          >
            <svg width="50" height="50" viewBox="0 0 42 42" fill="none" className="filter drop-shadow-md">
              <circle cx="21" cy="21" r="19" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
              <circle cx="21" cy="21" r="13" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="15" cy="15" r="2.8" fill="#451a03" />
              <circle cx="27" cy="15" r="2.8" fill="#451a03" />
              <circle cx="15" cy="27" r="2.8" fill="#451a03" />
              <circle cx="27" cy="27" r="2.8" fill="#451a03" />
              <line x1="15" y1="15" x2="27" y2="27" stroke="#ea580c" strokeWidth="2.2" />
              <line x1="27" y1="15" x2="15" y2="27" stroke="#ea580c" strokeWidth="2.2" />
            </svg>
          </motion.div>

          {/* Button 2 (Clay Terracotta - Lower Left) */}
          <motion.div
            className="absolute bottom-[24%] left-[6%] opacity-80 hidden md:block"
            animate={{
              rotate: [360, 0],
              y: [0, -24, 0],
              x: [0, 10, 0],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 20, ease: 'linear' },
              y: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
              x: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
            }}
          >
            <svg width="46" height="46" viewBox="0 0 38 38" fill="none" className="filter drop-shadow-md">
              <circle cx="19" cy="19" r="17" fill="#ffedd5" stroke="#c2410c" strokeWidth="3" />
              <circle cx="13" cy="19" r="2.8" fill="#7c2d12" />
              <circle cx="25" cy="19" r="2.8" fill="#7c2d12" />
              <circle cx="19" cy="13" r="2.8" fill="#7c2d12" />
              <circle cx="19" cy="25" r="2.8" fill="#7c2d12" />
              <line x1="13" y1="19" x2="25" y2="19" stroke="#9a3412" strokeWidth="2.4" />
              <line x1="19" y1="13" x2="19" y2="25" stroke="#9a3412" strokeWidth="2.4" />
            </svg>
          </motion.div>

          {/* ── 7. BOLD PATCHWORK SWATCHES (BORO DENIM & ECOPRINT PERCA) ── */}
          {/* Patchwork Hexagon 1 (Emerald Indigo Boro) */}
          <motion.div
            className="absolute top-[55%] left-[2%] opacity-75"
            animate={{
              rotate: [-24, 34, -24],
              y: [0, -28, 0],
              x: [0, 18, 0],
            }}
            transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut' }}
          >
            <svg width="66" height="66" viewBox="0 0 54 54" fill="none" className="filter drop-shadow-md">
              <polygon
                points="27,3 50,15 50,39 27,51 4,39 4,15"
                fill="#047857"
                fillOpacity="0.4"
                stroke="#065f46"
                strokeWidth="2.8"
                strokeDasharray="6 4"
              />
              <line x1="4" y1="15" x2="50" y2="39" stroke="#34d399" strokeWidth="1.8" />
              <line x1="4" y1="39" x2="50" y2="15" stroke="#34d399" strokeWidth="1.8" />
              <circle cx="27" cy="27" r="4" fill="#fbbf24" />
            </svg>
          </motion.div>

          {/* Patchwork Square 2 (Amber Batik Patch) */}
          <motion.div
            className="absolute top-[78%] right-[3%] opacity-75 hidden sm:block"
            animate={{
              rotate: [28, -24, 28],
              y: [0, 30, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut', delay: 1 }}
          >
            <svg width="68" height="68" viewBox="0 0 56 56" fill="none" className="filter drop-shadow-md">
              <rect
                x="6"
                y="6"
                width="44"
                height="44"
                rx="9"
                fill="#f59e0b"
                fillOpacity="0.4"
                stroke="#b45309"
                strokeWidth="3"
                strokeDasharray="7 5"
              />
              <circle cx="28" cy="28" r="14" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="6" y1="28" x2="50" y2="28" stroke="#d97706" strokeWidth="1.5" />
              <line x1="28" y1="6" x2="28" y2="50" stroke="#d97706" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </>
      )}

    </div>
  );
}
