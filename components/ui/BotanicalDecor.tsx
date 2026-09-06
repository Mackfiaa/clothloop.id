'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

// Organic SVG Botanical Shapes: Leaves, Petals, and Organic Buds
function LeafShape({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M32 4C32 4 14 20 14 38C14 48 22 56 32 60C42 56 50 48 50 38C50 20 32 4 32 4Z"
        fill="currentColor"
        fillOpacity="0.28"
      />
      <path
        d="M32 10V56M32 24L20 32M32 34L44 42M32 44L22 50"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
    </svg>
  );
}

function PetalShape({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M24 4C24 4 12 16 12 28C12 36 17.5 42 24 44C30.5 42 36 36 36 28C36 16 24 4 24 4Z"
        fill="currentColor"
        fillOpacity="0.25"
      />
      <path
        d="M24 12C24 24 24 38 24 40"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

function GinkgoShape({ className = '', size = 36 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" className={className}>
      <path
        d="M30 54V40C16 38 6 26 10 14C18 4 30 18 30 18C30 18 42 4 50 14C54 26 44 38 30 40"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

function FlowerBudShape({ className = '', size = 26 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="14" fill="currentColor" fillOpacity="0.2" />
      <circle cx="20" cy="20" r="8" fill="currentColor" fillOpacity="0.3" />
      <circle cx="20" cy="20" r="3" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

interface BotanicalItem {
  id: number;
  type: 'leaf' | 'petal' | 'ginkgo' | 'bud';
  top: string;
  left: string;
  size: number;
  colorClass: string;
  blurClass: string;
  initialRotate: number;
  driftRangeX: number;
  driftRangeY: number;
  duration: number;
  scrollSpeedFactor: number;
}

const BOTANICAL_ITEMS: BotanicalItem[] = [
  { id: 1, type: 'leaf', top: '8%', left: '6%', size: 44, colorClass: 'text-emerald-500', blurClass: 'blur-[1.5px]', initialRotate: -25, driftRangeX: 24, driftRangeY: 35, duration: 14, scrollSpeedFactor: -120 },
  { id: 2, type: 'petal', top: '15%', left: '88%', size: 36, colorClass: 'text-amber-500', blurClass: 'blur-[2px]', initialRotate: 40, driftRangeX: -30, driftRangeY: 45, duration: 18, scrollSpeedFactor: 160 },
  { id: 3, type: 'ginkgo', top: '35%', left: '3%', size: 48, colorClass: 'text-emerald-600', blurClass: 'blur-[3px]', initialRotate: 15, driftRangeX: 20, driftRangeY: 40, duration: 22, scrollSpeedFactor: -180 },
  { id: 4, type: 'petal', top: '48%', left: '92%', size: 30, colorClass: 'text-orange-400', blurClass: 'blur-[1px]', initialRotate: -45, driftRangeX: -25, driftRangeY: 30, duration: 16, scrollSpeedFactor: 140 },
  { id: 5, type: 'leaf', top: '65%', left: '12%', size: 38, colorClass: 'text-teal-500', blurClass: 'blur-[2.5px]', initialRotate: 65, driftRangeX: 28, driftRangeY: 50, duration: 19, scrollSpeedFactor: -150 },
  { id: 6, type: 'bud', top: '78%', left: '85%', size: 32, colorClass: 'text-emerald-400', blurClass: 'blur-[2px]', initialRotate: 0, driftRangeX: -15, driftRangeY: 25, duration: 13, scrollSpeedFactor: 110 },
  { id: 7, type: 'petal', top: '88%', left: '22%', size: 28, colorClass: 'text-amber-400', blurClass: 'blur-[1px]', initialRotate: 30, driftRangeX: 18, driftRangeY: 35, duration: 15, scrollSpeedFactor: -130 },
];

export function BotanicalDecor({ density = 'default' }: { density?: 'default' | 'dense' | 'light' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 45, stiffness: 200 });

  // Map scroll acceleration
  const velocityYOffset = useTransform(smoothVelocity, [-2000, 0, 2000], [-80, 0, 80]);

  const items = density === 'light' 
    ? BOTANICAL_ITEMS.slice(0, 4) 
    : density === 'dense' 
      ? BOTANICAL_ITEMS 
      : BOTANICAL_ITEMS.slice(0, 6);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10"
      aria-hidden="true"
    >
      {items.map((item) => {
        return (
          <BotanicalParticle 
            key={item.id} 
            item={item} 
            velocityYOffset={velocityYOffset} 
            scrollY={scrollY}
          />
        );
      })}
    </div>
  );
}

function BotanicalParticle({
  item,
  velocityYOffset,
  scrollY,
}: {
  item: BotanicalItem;
  velocityYOffset: any;
  scrollY: any;
}) {
  // Parallax translation tied to vertical scroll
  const scrollOffset = useTransform(scrollY, [0, 2000], [0, item.scrollSpeedFactor]);

  const renderShape = () => {
    switch (item.type) {
      case 'leaf':
        return <LeafShape size={item.size} className={`${item.colorClass} ${item.blurClass}`} />;
      case 'petal':
        return <PetalShape size={item.size} className={`${item.colorClass} ${item.blurClass}`} />;
      case 'ginkgo':
        return <GinkgoShape size={item.size} className={`${item.colorClass} ${item.blurClass}`} />;
      case 'bud':
        return <FlowerBudShape size={item.size} className={`${item.colorClass} ${item.blurClass}`} />;
    }
  };

  return (
    <motion.div
      style={{
        top: item.top,
        left: item.left,
        y: scrollOffset,
      }}
      className="absolute"
    >
      {/* Ambient Continuous Drift Loop (Slow floating fall + sway) */}
      <motion.div
        animate={{
          y: [0, item.driftRangeY, 0],
          x: [0, item.driftRangeX, -item.driftRangeX / 2, 0],
          rotate: [item.initialRotate, item.initialRotate + 18, item.initialRotate - 14, item.initialRotate],
        }}
        transition={{
          duration: item.duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="opacity-60 hover:opacity-90 transition-opacity"
      >
        {renderShape()}
      </motion.div>
    </motion.div>
  );
}
