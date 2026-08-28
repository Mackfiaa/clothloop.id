'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ShoppingBag, Search, SlidersHorizontal, Droplets, X, ArrowRight } from 'lucide-react';
import { MOCK_MARKET_ITEMS } from '@/lib/constants';
import { GarmentCategory, GarmentCondition } from '@/lib/types';
import { formatRupiah, formatNumber } from '@/lib/utils';
import { ConditionBadge } from '@/components/ui/Badge';
import { useApp } from '@/lib/store';

const CATEGORIES: GarmentCategory[] = ['Semua', 'Wanita', 'Pria', 'Denim & Jeans', 'Outerwear', 'Upcycled Bags', 'Vintage'];
const CONDITIONS: { id: GarmentCondition | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'Semua Kondisi' },
  { id: 'LIKE_NEW', label: 'Like New' },
  { id: 'GENTLY_USED', label: 'Gently Used' },
  { id: 'UPCYCLED', label: 'Upcycled' },
  { id: 'VINTAGE', label: 'Vintage' },
];
const SIZES = ['Semua', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function MarketPage() {
  const { addToCart } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GarmentCategory>('Semua');
  const [condition, setCondition] = useState<GarmentCondition | 'ALL'>('ALL');
  const [size, setSize] = useState('Semua');
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof MOCK_MARKET_ITEMS[0] | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_MARKET_ITEMS.filter(item => {
      if (query && !item.title.toLowerCase().includes(query.toLowerCase()) && !(item.brand ?? '').toLowerCase().includes(query.toLowerCase())) return false;
      if (category !== 'Semua' && item.category !== category) return false;
      if (condition !== 'ALL' && item.condition !== condition) return false;
      if (size !== 'Semua' && item.size !== size) return false;
      if (item.price > maxPrice) return false;
      return true;
    });
  }, [query, category, condition, size, maxPrice]);

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '3.5rem 0 2rem' }}>
        <div className="container-editorial">
          <span className="label-caps">Preloved Marketplace</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.75rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.08, maxWidth: '28rem' }}>
              Fashion sirkular,<br /><em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>terkurasi cermat.</em>
            </h1>
            {/* Search */}
            <div style={{ position: 'relative', width: '22rem', maxWidth: '100%' }}>
              <Search size={15} strokeWidth={1.5} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-faint)' }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari brand, jenis, ukuran..."
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--line-strong)', padding: '0.5rem 0 0.5rem 1.625rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink)', outline: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-editorial" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>

        {/* Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--line)', flexWrap: 'wrap' }}>
          {/* Category pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', flex: 1 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 500, padding: '0.4rem 1rem', border: category === c ? '1px solid var(--ink)' : '1px solid var(--line)', background: category === c ? 'var(--ink)' : 'transparent', color: category === c ? '#fff' : 'var(--ink-muted)', cursor: 'pointer', transition: 'all 0.2s' }}>
                {c}
              </button>
            ))}
          </div>
          <button onClick={() => setFilterOpen(!filterOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid var(--line)', padding: '0.4rem 1rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--ink-muted)', transition: 'all 0.2s', flexShrink: 0 }}>
            <SlidersHorizontal size={13} strokeWidth={1.5} /> Filter
          </button>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'var(--ink-faint)', flexShrink: 0 }}>{filtered.length} item</span>
        </div>

        {/* Expanded Filters */}
        {filterOpen && (
          <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', gap: '2rem', background: 'var(--white)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span className="label-caps">Kondisi</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {CONDITIONS.map(c => (
                  <button key={c.id} onClick={() => setCondition(c.id)}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', padding: '0.375rem 0.875rem', border: condition === c.id ? '1px solid var(--forest)' : '1px solid var(--line)', background: condition === c.id ? 'var(--sage-faint)' : 'transparent', color: condition === c.id ? 'var(--forest)' : 'var(--ink-muted)', cursor: 'pointer' }}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span className="label-caps">Ukuran</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {SIZES.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', padding: '0.375rem 0.875rem', border: size === s ? '1px solid var(--ink)' : '1px solid var(--line)', background: size === s ? 'var(--ink)' : 'transparent', color: size === s ? '#fff' : 'var(--ink-muted)', cursor: 'pointer' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, minWidth: '16rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="label-caps">Harga maks.</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '0.9375rem', color: 'var(--ink)' }}>{formatRupiah(maxPrice)}</span>
              </div>
              <input type="range" min={50000} max={1500000} step={50000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--forest)', cursor: 'pointer' }} />
            </div>
          </div>
        )}

        {/* Masonry-style Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <ShoppingBag size={36} strokeWidth={1} style={{ color: 'var(--ink-faint)', marginBottom: '1rem' }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: 'var(--ink)' }}>Tidak ada item yang cocok</p>
          </div>
        ) : (
          <div style={{ columns: '4 200px', gap: '1.5rem' }}>
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                style={{ breakInside: 'avoid', marginBottom: '1.5rem', cursor: 'pointer' }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedItem(item)}
              >
                {/* Image */}
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--cream-deep)',
                    aspectRatio: idx % 3 === 0 ? '3/4' : idx % 3 === 1 ? '1/1' : '4/5',
                  }}
                  className="img-hover-zoom"
                >
                  <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="25vw" />
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                    <ConditionBadge condition={item.condition} />
                  </div>
                  {hoveredId === item.id && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,14,13,0.28)', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}>
                      <button
                        onClick={e => { e.stopPropagation(); addToCart(item); }}
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', background: 'var(--white)', color: 'var(--ink)', padding: '0.625rem', fontSize: '0.75rem' }}
                      >
                        + Keranjang
                      </button>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div style={{ padding: '0.75rem 0' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--ink-muted)', marginBottom: '0.25rem' }}>{item.brand} · {item.size}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>{formatRupiah(item.price)}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Droplets size={11} strokeWidth={1.5} style={{ color: 'var(--sage)' }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'var(--sage)' }}>{formatNumber(item.waterSavedLiters)} L</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15,14,13,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedItem(null)}>
          <div style={{ background: 'var(--white)', maxWidth: '52rem', width: '100%', maxHeight: '90vh', overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr' }} onClick={e => e.stopPropagation()}>

            {/* Image */}
            <div style={{ position: 'relative', minHeight: '30rem' }} className="img-hover-zoom">
              <Image src={selectedItem.images[0]} alt={selectedItem.title} fill className="object-cover" sizes="50vw" />
            </div>

            {/* Details */}
            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <button onClick={() => setSelectedItem(null)} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)' }}>
                <X size={18} strokeWidth={1.5} />
              </button>

              <div>
                <ConditionBadge condition={selectedItem.condition} />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--ink)', marginTop: '0.875rem', lineHeight: 1.2 }}>{selectedItem.title}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--ink-muted)', marginTop: '0.375rem' }}>{selectedItem.brand}</p>
              </div>

              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.875rem', fontWeight: 700, color: 'var(--ink)' }}>{formatRupiah(selectedItem.price)}</span>

              {/* Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  ['Ukuran', selectedItem.size],
                  ['Kategori', selectedItem.category],
                  ['Material', selectedItem.material],
                  ['Kondisi', selectedItem.condition.replace('_', ' ')],
                  ['Kota Penjual', selectedItem.sellerCity],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid var(--line)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>{k}</span>
                    <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Eco badge */}
              <div style={{ background: 'var(--sage-faint)', padding: '0.875rem', display: 'flex', gap: '1.5rem' }}>
                <div>
                  <span className="label-caps" style={{ display: 'block', fontSize: '0.5625rem', marginBottom: '0.25rem' }}>Air terhemat</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.125rem', color: 'var(--forest)' }}>{formatNumber(selectedItem.waterSavedLiters)} L</span>
                </div>
                <div>
                  <span className="label-caps" style={{ display: 'block', fontSize: '0.5625rem', marginBottom: '0.25rem' }}>CO₂ dicegah</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.125rem', color: 'var(--forest)' }}>{selectedItem.co2SavedKg} kg</span>
                </div>
              </div>

              <button onClick={() => { addToCart(selectedItem); setSelectedItem(null); }} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Tambah ke Keranjang
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
