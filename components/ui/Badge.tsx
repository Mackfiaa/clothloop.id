import React from 'react';
import { GarmentCondition } from '@/lib/types';

interface ConditionBadgeProps {
  condition: GarmentCondition;
}

const map: Record<GarmentCondition, { label: string; bg: string; color: string }> = {
  LIKE_NEW: { label: 'Like New', bg: 'var(--sage-faint)', color: 'var(--forest)' },
  GENTLY_USED: { label: 'Gently Used', bg: 'var(--cream-deep)', color: 'var(--ink-secondary)' },
  UPCYCLED: { label: 'Upcycled', bg: 'var(--terracotta-light)', color: 'var(--terracotta)' },
  VINTAGE: { label: 'Vintage', bg: 'var(--golden-light)', color: 'var(--golden)' },
};

export function ConditionBadge({ condition }: ConditionBadgeProps) {
  const c = map[condition];
  if (!c) return null;
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.2rem 0.625rem',
      background: c.bg,
      color: c.color,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '0.625rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    }}>
      {c.label}
    </span>
  );
}
