'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { X } from 'lucide-react';

export function ToastNotification() {
  const { notifications, removeNotification } = useApp();
  if (notifications.length === 0) return null;

  return (
    <div style={{ position: 'fixed', bottom: '5rem', right: '1.5rem', zIndex: 60, display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '22rem', width: '100%' }}>
      {notifications.map(n => (
        <div
          key={n.id}
          style={{
            background: 'var(--ink)',
            color: '#fff',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.875rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: '#fff' }}>{n.title}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem', lineHeight: 1.5 }}>{n.message}</p>
          </div>
          <button
            onClick={() => removeNotification(n.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
