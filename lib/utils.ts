export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}

export function generateBookingCode(prefix: string = 'CLD'): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  return `${prefix}-${date}-${random}`;
}

// Reward Points based on Textile Category (300 - 3.000 Pts)
export const TEXTILE_POINT_RATES: { [key: string]: { label: string; pointsPerItem: number; desc: string } } = {
  'Kain Perca': { label: 'Kain Perca / Potongan Sisa', pointsPerItem: 300, desc: 'Limbah potongan kain perca (bobot poin dasar)' },
  'Kaos / Katun': { label: 'Kaos & Pakaian Katun', pointsPerItem: 600, desc: 'Kaos sehari-hari dan pakaian katun santai' },
  'Kemeja & Celana': { label: 'Kemeja & Celana Bahan', pointsPerItem: 1000, desc: 'Pakaian kerja dan kemeja formal' },
  'Denim & Jeans': { label: 'Denim & Jeans Tebal', pointsPerItem: 1800, desc: 'Celana dan jaket denim serat berat' },
  'Outerwear & Jaket': { label: 'Outerwear & Jaket Tebal', pointsPerItem: 2400, desc: 'Mantel, jaket windbreaker, dan sweater tebal' },
  'Batik & Sutra': { label: 'Batik Tulis & Kain Sutra', pointsPerItem: 3000, desc: 'Kain tradisional bernilai arsip tinggi (poin tertinggi)' },
};

export function calculateEcoImpact(weightKg: number, itemCount: number = 0, selectedCategory: string = 'Kaos / Katun') {
  const waterSaved = Math.round(weightKg * 2700);
  const co2Saved = Number((weightKg * 3.6).toFixed(1));
  
  const rate = TEXTILE_POINT_RATES[selectedCategory]?.pointsPerItem || 600;
  const count = itemCount > 0 ? itemCount : Math.max(1, Math.round(weightKg * 2.5));
  const points = Math.min(30000, Math.max(300, count * rate));

  return {
    waterSaved,
    co2Saved,
    points,
  };
}
