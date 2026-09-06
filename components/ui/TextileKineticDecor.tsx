'use client';

import React from 'react';

export function TextileKineticDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-gradient-to-br from-[#064E3B] via-[#043D2E] to-[#022C22]">
      {/* Polos hijau natural tanpa animasi */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
}
