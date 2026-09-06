'use client';

import React from 'react';
import { GarmentCondition } from '@/lib/types';

interface ConditionBadgeProps {
  condition: GarmentCondition;
  size?: 'sm' | 'md';
}

const conditionConfig: Record<GarmentCondition, { label: string; bg: string; text: string; border: string }> = {
  LIKE_NEW: {
    label: 'Like New',
    bg: 'rgba(5, 150, 105, 0.9)',
    text: '#ffffff',
    border: 'rgba(5, 150, 105, 1)',
  },
  GENTLY_USED: {
    label: 'Gently Used',
    bg: 'rgba(4, 120, 87, 0.88)',
    text: '#ffffff',
    border: 'rgba(4, 120, 87, 1)',
  },
  UPCYCLED: {
    label: 'Upcycled',
    bg: 'rgba(234, 88, 12, 0.92)',
    text: '#ffffff',
    border: 'rgba(234, 88, 12, 1)',
  },
  VINTAGE: {
    label: 'Vintage',
    bg: 'rgba(217, 119, 6, 0.92)',
    text: '#ffffff',
    border: 'rgba(217, 119, 6, 1)',
  },
};

export function ConditionBadge({ condition, size = 'sm' }: ConditionBadgeProps) {
  const config = conditionConfig[condition] || conditionConfig.GENTLY_USED;
  const isSm = size === 'sm';

  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-wider rounded-md backdrop-blur-xs shadow-xs transition-transform ${
        isSm ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
      }`}
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      {config.label}
    </span>
  );
}
