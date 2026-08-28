'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { formatRupiah, formatNumber } from '@/lib/utils';
import { X, Trash2, ShoppingBag, Droplets, Wind, ArrowRight, CheckCircle2 } from 'lucide-react';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, clearCart, addNotification } = useApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((a, c) => a + c.item.price * c.quantity, 0);
  const totalWater = cart.reduce((a, c) => a + c.item.waterSavedLiters * c.quantity, 0);
  const totalCo2 = cart.reduce((a, c) => a + c.item.co2SavedKg * c.quantity, 0);
  const shipping = subtotal > 0 ? 15000 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      setIsComplete(true);
      addNotification('success', 'Pesanan berhasil', 'Dana ditahan escrow. Penjual akan segera mengirmkan paketmu.');
    }, 1600);
  };

  const handleClose = () => { setIsCartOpen(false); setIsComplete(false); };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(15,14,13,0.45)', backdropFilter: 'blur(2px)' }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '26rem',
          background: 'var(--white)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 48px rgba(0,0,0,0.12)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--ink)' }}>
              Keranjang
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: '0.125rem' }}>
              {cart.length} item preloved
            </p>
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', padding: '0.25rem' }}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem' }}>

          {isComplete ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', paddingTop: '3rem' }}>
              <CheckCircle2 size={48} style={{ color: 'var(--sage)' }} strokeWidth={1.25} />
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.375rem', color: 'var(--ink)' }}>Pesanan Berhasil!</h4>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '18rem' }}>
                Pembayaran escrow aman. Kamu akan mendapat notifikasi saat paket dikirim penjual.
              </p>
              {totalWater > 0 && (
                <div style={{ background: 'var(--sage-faint)', border: '1px solid var(--sage-light)', borderRadius: '0', padding: '1rem', width: '100%', textAlign: 'left' }}>
                  <span className="label-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Dampak belanjamu</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--forest)' }}>
                    Hemat {formatNumber(totalWater)}L air · {totalCo2.toFixed(1)} kg CO₂
                  </p>
                </div>
              )}
              <button onClick={handleClose} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
                Lanjut Belanja
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', paddingTop: '3rem' }}>
              <ShoppingBag size={40} strokeWidth={1} style={{ color: 'var(--ink-faint)' }} />
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: 'var(--ink)' }}>Keranjang kosong</h4>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                Temukan pakaian preloved terkurasi di ClothMarket kami.
              </p>
              <Link href="/market" onClick={handleClose} className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                Jelajahi Preloved
              </Link>
            </div>
          ) : (
            <>
              {/* Eco Banner */}
              {(totalWater > 0) && (
                <div style={{ background: 'var(--forest)', color: 'white', padding: '0.875rem 1rem', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem' }}>
                    <Droplets size={14} style={{ color: 'rgba(200,221,209,0.9)' }} />
                    <span>{formatNumber(totalWater)} L air</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem' }}>
                    <Wind size={14} style={{ color: 'rgba(200,221,209,0.9)' }} />
                    <span>{totalCo2.toFixed(1)} kg CO₂</span>
                  </div>
                </div>
              )}

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {cart.map(({ item, quantity }, i) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1.25rem 0',
                      borderBottom: i < cart.length - 1 ? '1px solid var(--line)' : 'none',
                    }}
                  >
                    <div style={{ position: 'relative', width: '5rem', height: '5rem', flexShrink: 0, overflow: 'hidden', background: 'var(--cream-deep)' }}>
                      <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="80px" />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: '0.125rem' }}>{item.brand}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '0.9375rem', color: 'var(--ink)' }}>
                          {formatRupiah(item.price)}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--line)', padding: '0.125rem 0.5rem' }}>
                            <button onClick={() => updateCartQuantity(item.id, quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', lineHeight: 1, width: '1.25rem', textAlign: 'center' }}>−</button>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 500, minWidth: '1rem', textAlign: 'center' }}>{quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', lineHeight: 1, width: '1.25rem', textAlign: 'center' }}>+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-faint)', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--terracotta)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-faint)')}>
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!isComplete && cart.length > 0 && (
          <div style={{ borderTop: '1px solid var(--line)', padding: '1.5rem 1.75rem', background: 'var(--white)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
              {[
                ['Subtotal', formatRupiah(subtotal)],
                ['Ongkir (eco courier)', formatRupiah(shipping)],
                ['Proteksi Escrow', 'Gratis'],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
                  <span>{label}</span>
                  <span style={{ color: val === 'Gratis' ? 'var(--sage)' : 'var(--ink)', fontWeight: val === 'Gratis' ? 600 : 400 }}>{val}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.0625rem', color: 'var(--ink)' }}>
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', opacity: isCheckingOut ? 0.7 : 1 }}
            >
              {isCheckingOut ? 'Memproses...' : (
                <>Bayar Aman (Escrow) <ArrowRight size={14} /></>
              )}
            </button>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-faint)', textAlign: 'center', marginTop: '0.75rem' }}>
              Dana dilepas ke penjual setelah kamu konfirmasi terima barang
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
