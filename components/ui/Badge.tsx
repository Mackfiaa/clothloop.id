import React from 'react';
import { GarmentCondition } from '@/lib/types';

interface ConditionBadgeProps {
  condition: GarmentCondition;
}

const map: Record<GarmentCondition, { label: string; bg: string; color: string; border: string }> = {
  LIKE_NEW: { label: 'Like New', bg: 'var(--forest-subtle)', color: 'var(--forest-deep)', border: 'rgba(27, 54, 40, 0.2)' },
  GENTLY_USED: { label: 'Gently Used', bg: 'var(--surface-muted)', color: 'var(--ink-secondary)', border: 'var(--border-hairline)' },
  UPCYCLED: { label: 'Upcycled', bg: 'var(--clay-subtle)', color: 'var(--clay)', border: 'rgba(168, 82, 44, 0.2)' },
  VINTAGE: { label: 'Vintage', bg: 'var(--ochre-subtle)', color: 'var(--ochre)', border: 'rgba(140, 109, 45, 0.2)' },
};

export function ConditionBadge({ condition }: ConditionBadgeProps) {
  const c = map[condition];
  if (!c) return null;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.5rem',
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.625rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}
    >
      {c.label}
    </span>
  );
}
