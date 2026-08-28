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

export function calculateEcoImpact(weightKg: number) {
  const waterSaved = Math.round(weightKg * 2700);
  const co2Saved = Number((weightKg * 3.6).toFixed(1));
  const points = Math.round(weightKg * 100);
  return {
    waterSaved,
    co2Saved,
    points,
  };
}
