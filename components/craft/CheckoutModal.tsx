'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Truck, 
  Coins, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Sparkles, 
  ChevronRight,
  Building,
  Smartphone,
  QrCode
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { CraftOrder, CraftOrderItem } from '@/lib/types';
import { INDONESIA_CITIES } from '@/lib/constants';
import { formatRupiah, formatNumber } from '@/lib/utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CraftOrderItem[];
  onSuccessOrder?: (order: CraftOrder) => void;
}

const PAYMENT_METHODS = [
  {
    category: 'BANK_VA' as const,
    name: 'Bank Transfer (Virtual Account)',
    options: [
      { id: 'va-bri', name: 'BRI Virtual Account', icon: '🏦', desc: 'Verifikasi Otomatis 24 Jam' },
      { id: 'va-bca', name: 'BCA Virtual Account', icon: '🏦', desc: 'Verifikasi Otomatis 24 Jam' },
      { id: 'va-mandiri', name: 'Mandiri Livin VA', icon: '🏦', desc: 'Verifikasi Otomatis 24 Jam' },
      { id: 'va-bni', name: 'BNI Virtual Account', icon: '🏦', desc: 'Verifikasi Otomatis 24 Jam' },
      { id: 'va-permata', name: 'Permata Virtual Account', icon: '🏦', desc: 'Verifikasi Otomatis 24 Jam' },
    ],
  },
  {
    category: 'E_WALLET' as const,
    name: 'E-Wallet Instant',
    options: [
      { id: 'ew-gopay', name: 'GoPay', icon: '🟢', desc: 'Bayar via aplikasi Gojek' },
      { id: 'ew-shopeepay', name: 'ShopeePay', icon: '🟠', desc: 'Bayar via aplikasi Shopee' },
      { id: 'ew-dana', name: 'DANA', icon: '🔵', desc: 'Bayar via aplikasi DANA' },
      { id: 'ew-ovo', name: 'OVO', icon: '🟣', desc: 'Bayar via aplikasi OVO' },
    ],
  },
  {
    category: 'QRIS' as const,
    name: 'QRIS Realtime',
    options: [
      { id: 'qris-all', name: 'QRIS Universal', icon: '📱', desc: 'Scan dengan semua m-Banking / e-Wallet' },
    ],
  },
];

export function CheckoutModal({ isOpen, onClose, items, onSuccessOrder }: CheckoutModalProps) {
  const { userPoints, deductUserPoints, addCraftOrder, addNotification, removeFromCart, currentUser } = useApp();

  // Address state
  const [receiverName, setReceiverName] = useState('Fian Mackfia');
  const [receiverPhone, setReceiverPhone] = useState('0812-3456-7890');
  const [destinationCity, setDestinationCity] = useState('Jakarta Selatan');
  const [fullAddress, setFullAddress] = useState('Jl. Senopati No. 45, Kebayoran Baru (Kode Pos: 12190)');
  const [saveAsDefault, setSaveAsDefault] = useState(true);

  // Coins toggle
  const [usePoints, setUsePoints] = useState(false);

  // Selected payment
  const [selectedPayment, setSelectedPayment] = useState('va-bri');

  // Step state: 'FORM' | 'PROCESSING' | 'SUCCESS'
  const [step, setStep] = useState<'FORM' | 'PROCESSING' | 'SUCCESS'>('FORM');
  const [completedOrder, setCompletedOrder] = useState<CraftOrder | null>(null);
  const [copiedResi, setCopiedResi] = useState(false);

  // Load default address from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('clothloop_default_shipping_address');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setReceiverName(parsed.name);
        if (parsed.phone) setReceiverPhone(parsed.phone);
        if (parsed.city) setDestinationCity(parsed.city);
        if (parsed.address) setFullAddress(parsed.address);
      }
    } catch {
      // ignore
    }
  }, []);

  // Subtotal calculation
  const subtotal = useMemo(() => {
    return items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  }, [items]);

  // Dynamic J&T shipping cost calculation based on origin city vs destination city
  const { shippingCost, shippingDuration } = useMemo(() => {
    if (items.length === 0) return { shippingCost: 0, shippingDuration: '1-2 Hari' };
    
    // Primary origin city of items (e.g. Bandung / Yogyakarta / Jakarta)
    const originCity = items[0]?.artisanCity || 'Bandung';

    const javaCities = [
      'Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Utara',
      'Bogor', 'Depok', 'Tangerang', 'Tangerang Selatan', 'Bekasi',
      'Bandung', 'Cimahi', 'Cirebon', 'Sukabumi', 'Tasikmalaya', 'Serang',
      'Semarang', 'Surakarta (Solo)', 'Magelang', 'Yogyakarta', 'Sleman', 'Bantul',
      'Surabaya', 'Malang', 'Sidoarjo', 'Kediri', 'Jember', 'Banyuwangi'
    ];

    const isSameCity = originCity.toLowerCase() === destinationCity.toLowerCase();
    const isOriginJava = javaCities.some(c => c.toLowerCase() === originCity.toLowerCase());
    const isDestJava = javaCities.some(c => c.toLowerCase() === destinationCity.toLowerCase());

    if (isSameCity) {
      return { shippingCost: 9000, shippingDuration: '1 Hari Kerja (Same City Delivery)' };
    } else if (isOriginJava && isDestJava) {
      return { shippingCost: 15000, shippingDuration: '1-2 Hari Kerja (Inter-Java Reguler)' };
    } else {
      return { shippingCost: 28000, shippingDuration: '2-4 Hari Kerja (Luar Pulau Express)' };
    }
  }, [items, destinationCity]);

  // Points discount calculation (1 point = Rp 1, max up to 50% of subtotal or user points)
  const maxDiscountAvailable = Math.min(userPoints, Math.floor(subtotal * 0.5));
  const pointsDiscount = usePoints ? maxDiscountAvailable : 0;
  const pointsUsed = usePoints ? pointsDiscount : 0;

  const totalPayment = Math.max(0, subtotal + shippingCost - pointsDiscount);

  let selectedPaymentDetail: { id: string; name: string; icon: string; desc: string; category: any } = { id: 'va-bri', name: 'BRI Virtual Account', icon: '🏦', desc: '', category: 'BANK_VA' };
  for (const cat of PAYMENT_METHODS) {
    const match = cat.options.find(o => o.id === selectedPayment);
    if (match) {
      selectedPaymentDetail = { ...match, category: cat.category };
      break;
    }
  }

  const handleSimulatePayment = () => {
    if (!currentUser) {
      addNotification('warning', 'Masuk Diperlukan', 'Silakan masuk atau daftar terlebih dahulu untuk menyelesaikan pembayaran.');
      window.location.href = '/auth/login';
      return;
    }
    if (!receiverName || !receiverPhone || !fullAddress) {
      addNotification('warning', 'Alamat Belum Lengkap', 'Mohon lengkapi nama penerima, no. telp, dan alamat pengiriman.');
      return;
    }

    setStep('PROCESSING');

    // Save default address if checked
    if (saveAsDefault) {
      try {
        localStorage.setItem('clothloop_default_shipping_address', JSON.stringify({
          name: receiverName,
          phone: receiverPhone,
          city: destinationCity,
          address: fullAddress,
        }));
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      const randomOrderNum = `CL-CRFT-${Math.floor(100000 + Math.random() * 900000)}`;
      const randomTrackingNum = `JT${Math.floor(1000000000 + Math.random() * 9000000000)}`;

      const newOrder: CraftOrder = {
        id: `co-${Date.now()}`,
        orderNumber: randomOrderNum,
        trackingNumber: randomTrackingNum,
        courierName: 'J&T Express EZ',
        items: items,
        receiverName,
        receiverPhone,
        destinationCity,
        fullAddress,
        subtotal,
        shippingCost,
        pointsDiscount,
        pointsUsed,
        totalAmount: totalPayment,
        paymentMethod: selectedPaymentDetail.name,
        paymentCategory: selectedPaymentDetail.category,
        status: 'PACKING',
        escrowStatus: 'HELD_IN_ESCROW',
        createdAt: new Date().toISOString(),
        estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };

      // Deduct points
      if (pointsUsed > 0) {
        deductUserPoints(pointsUsed);
      }

      // Remove checked items from cart
      items.forEach((it) => {
        removeFromCart(it.id);
      });

      // Save order to store
      addCraftOrder(newOrder);
      setCompletedOrder(newOrder);
      setStep('SUCCESS');

      if (onSuccessOrder) {
        onSuccessOrder(newOrder);
      }
    }, 1400);
  };

  const handleCopyResi = (resi: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(resi);
      setCopiedResi(true);
      setTimeout(() => setCopiedResi(false), 2000);
    }
  };

  const handleClose = () => {
    setStep('FORM');
    setCompletedOrder(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
          className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[var(--border-hairline)] my-6 relative flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[var(--border-hairline)] bg-gradient-to-r from-amber-50 via-emerald-50/50 to-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[var(--ink-primary)]">
                  {step === 'SUCCESS' ? 'Struk Pembayaran Berhasil' : 'Checkout & Pengiriman Kerajinan'}
                </h3>
                <p className="text-[11px] text-[var(--ink-muted)] font-medium">
                  {step === 'SUCCESS' ? 'Rekening Escrow ClothLoop Aktif' : 'Garansi Escrow 100% & J&T Express Delivery'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {step === 'PROCESSING' ? (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
                <h4 className="text-lg font-black text-[var(--ink-primary)]">Memproses Pembayaran Simulasi...</h4>
                <p className="text-xs text-[var(--ink-secondary)] max-w-xs">
                  Menghubungkan ke Gateway Bank & Mengunci dana di Rekening Escrow Aman ClothLoop.
                </p>
              </div>
            ) : step === 'SUCCESS' && completedOrder ? (
              /* Success Receipt View */
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Pembayaran Prototype Berhasil
                  </span>
                  <h4 className="text-2xl font-black text-[var(--ink-primary)] mt-2">
                    {formatRupiah(completedOrder.totalAmount)}
                  </h4>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    No. Pesanan: <strong className="text-gray-800">{completedOrder.orderNumber}</strong>
                  </p>
                </div>

                {/* Tracking Code Banner */}
                <div className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-4 text-left shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-white text-red-700 text-[10px] font-black px-2 py-0.5 rounded-sm">J&T EXPRESS</span>
                      <span className="text-xs text-red-100">Resi Pengiriman Otomatis</span>
                    </div>
                    <span className="text-lg font-black font-mono tracking-wider block mt-1">
                      {completedOrder.trackingNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyResi(completedOrder.trackingNumber)}
                    className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy size={13} />
                    <span>{copiedResi ? 'Tersalin!' : 'Salin Resi'}</span>
                  </button>
                </div>

                {/* Escrow Guarantee Box */}
                <div className="w-full bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-left">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <ShieldCheck size={16} />
                    <span>Perlindungan Escrow ClothLoop</span>
                  </div>
                  <p className="text-[11px] text-emerald-900/85 mt-1 leading-relaxed">
                    Dana sebesar <strong>{formatRupiah(completedOrder.totalAmount)}</strong> telah diamankan di rekening bersama. Dana baru akan diteruskan ke studio pengrajin setelah Anda mengonfirmasi barang telah sampai dengan kondisi baik.
                  </p>
                </div>

                {/* Order Breakdown Summary */}
                <div className="w-full bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between text-gray-500">
                    <span>Penerima:</span>
                    <strong className="text-gray-800 text-right">{completedOrder.receiverName} ({completedOrder.receiverPhone})</strong>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tujuan:</span>
                    <strong className="text-gray-800 text-right truncate max-w-[240px]">{completedOrder.destinationCity}</strong>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Metode Pembayaran:</span>
                    <strong className="text-gray-800">{completedOrder.paymentMethod}</strong>
                  </div>
                  {completedOrder.pointsDiscount > 0 && (
                    <div className="flex justify-between text-amber-700 font-bold">
                      <span>Potongan Koin:</span>
                      <span>-{formatRupiah(completedOrder.pointsDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Ongkos Kirim J&T:</span>
                    <strong className="text-gray-800">{formatRupiah(completedOrder.shippingCost)}</strong>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="btn-primary w-full justify-center py-3 font-bold text-xs shadow-md cursor-pointer"
                >
                  Tutup & Lihat Pelacakan di Tab Pesanan
                </button>
              </div>
            ) : (
              /* Checkout Form View */
              <div className="space-y-6">
                {/* 1. Item List Preview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Produk yang di-checkout ({items.length} Barang)</span>
                  </h4>
                  <div className="divide-y divide-gray-100 bg-stone-50/70 rounded-2xl p-3 border border-stone-200">
                    {items.map((it) => (
                      <div key={it.id} className="py-2 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-gray-200 shrink-0 border border-gray-200">
                            <Image src={it.image} alt={it.title} fill className="object-cover" sizes="44px" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-gray-800 truncate">{it.title}</h5>
                            <span className="text-[10px] text-amber-800 block truncate">
                              {it.artisanStudio} &middot; {it.artisanCity}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <strong className="font-mono text-gray-900 block">{formatRupiah(it.price * it.quantity)}</strong>
                          <span className="text-[10px] text-gray-500">{it.quantity}x</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Shipping Address Form */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin size={13} className="text-emerald-600" />
                      <span>Alamat Pengiriman Pembeli</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">Nama Penerima</label>
                      <input
                        type="text"
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-900 focus:outline-none focus:border-emerald-600"
                        placeholder="Nama lengkap penerima"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">Nomor WhatsApp / HP</label>
                      <input
                        type="tel"
                        value={receiverPhone}
                        onChange={(e) => setReceiverPhone(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-900 focus:outline-none focus:border-emerald-600"
                        placeholder="0812-xxxx-xxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Kota / Kabupaten Tujuan (Seluruh Indonesia)</label>
                    <select
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
                    >
                      {INDONESIA_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Alamat Lengkap & Patokan</label>
                    <textarea
                      rows={2}
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-900 focus:outline-none focus:border-emerald-600"
                      placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan/kecamatan, kode pos..."
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
                    <input
                      type="checkbox"
                      checked={saveAsDefault}
                      onChange={(e) => setSaveAsDefault(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 cursor-pointer"
                    />
                    <span className="text-xs text-gray-700 font-medium">Simpan sebagai Alamat Default Pengiriman</span>
                  </label>
                </div>

                {/* 3. J&T Express Shipping Rate Card */}
                <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-600 text-white font-black text-[10px] px-2.5 py-1.5 rounded-lg flex flex-col items-center">
                      <span>J&T</span>
                      <span className="text-[8px] tracking-tight">EXPRESS</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-gray-900">J&T Express EZ Reguler</span>
                        <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">Resmi</span>
                      </div>
                      <span className="text-[11px] text-gray-500 block">
                        Estimasi tiba: {shippingDuration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <strong className="font-mono text-sm text-gray-900 font-black">
                      {formatRupiah(shippingCost)}
                    </strong>
                    <span className="text-[10px] text-gray-400 block">Tarif Realtime J&T</span>
                  </div>
                </div>

                {/* 4. ClothPoints Coin Discount Toggle (Shopee Style) */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shadow-xs">
                      <Coins size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-amber-950">Gunakan Koin ClothPoints</span>
                        <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-1.5 py-0.5 rounded-full">
                          {formatNumber(userPoints)} Poin
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        {userPoints > 0
                          ? `Tukarkan poin untuk hemat hingga ${formatRupiah(maxDiscountAvailable)}`
                          : 'Anda belum memiliki ClothPoints.'}
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      disabled={userPoints <= 0}
                      checked={usePoints}
                      onChange={(e) => setUsePoints(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {/* 5. Payment Method Selection */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard size={13} className="text-emerald-600" />
                    <span>Pilihan Metode Pembayaran (Simulasi Prototype)</span>
                  </h4>

                  <div className="space-y-3">
                    {PAYMENT_METHODS.map((cat) => (
                      <div key={cat.category} className="space-y-1.5">
                        <span className="text-[10px] font-bold text-gray-400 block px-1">{cat.name}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.options.map((opt) => {
                            const isSelected = selectedPayment === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setSelectedPayment(opt.id)}
                                className={`p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-600'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <div className="min-w-0">
                                    <span className="text-xs font-bold text-gray-900 block truncate">{opt.name}</span>
                                    <span className="text-[10px] text-gray-500 block truncate">{opt.desc}</span>
                                  </div>
                                </div>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300'
                                }`}>
                                  {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Footer Total & Submit */}
          {step === 'FORM' && (
            <div className="p-4 sm:p-5 border-t border-[var(--border-hairline)] bg-white shadow-xl flex flex-col gap-3 shrink-0">
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal Produk:</span>
                  <strong className="text-gray-900 font-mono">{formatRupiah(subtotal)}</strong>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Ongkos Kirim J&T Express:</span>
                  <strong className="text-gray-900 font-mono">{formatRupiah(shippingCost)}</strong>
                </div>
                {pointsDiscount > 0 && (
                  <div className="flex justify-between text-amber-700 font-bold">
                    <span>Potongan Koin ClothPoints:</span>
                    <span className="font-mono">-{formatRupiah(pointsDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Proteksi Rekening Escrow:</span>
                  <strong className="text-emerald-600 font-bold">Gratis (100% Aman)</strong>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
                  <span className="font-bold text-sm text-gray-900">Total Pembayaran:</span>
                  <span className="font-black text-xl text-emerald-700 font-mono">
                    {formatRupiah(totalPayment)}
                  </span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSimulatePayment}
                className="btn-primary w-full justify-center py-3 text-xs font-extrabold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Bayar Sekarang ({selectedPaymentDetail.name})</span>
                <ArrowRight size={14} />
              </motion.button>
              <span className="text-[10px] text-gray-400 text-center block">
                Simulasi prototype &middot; Dana Anda aman di Escrow hingga barang diterima
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
