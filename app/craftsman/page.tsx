'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scissors, 
  Plus, 
  Package, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Truck, 
  QrCode, 
  Search, 
  Layers, 
  Sparkles, 
  Building2, 
  Copy, 
  Check, 
  X, 
  Wallet,
  Inbox,
  DollarSign,
  Maximize2,
  ScanLine,
  Printer,
  Download,
  Edit3,
  Trash2,
  UploadCloud,
  ImageIcon
} from 'lucide-react';
import { RolePortalNavbar } from '@/components/portal/RolePortalNavbar';
import { useApp } from '@/lib/store';
import { CraftProduct, CraftProductCategory } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import { 
  getAllCraftProductsWithArtisans, 
  saveNewCraftProduct,
  updateCraftProduct,
  deleteCraftProduct,
  getCustomCraftProducts,
  getArtisanInventory,
  addFabricStockToArtisan,
  getArtisanOrders,
  saveArtisanOrder,
  updateCraftOrderStatus,
  submitBankWithdrawal,
  getWithdrawalHistory
} from '@/lib/supabase/portalData';
import { fetchCraftProducts } from '@/lib/supabase/data';
import { INDONESIA_CITIES } from '@/lib/constants';

function StudioQrSvg({ value, size = 160, className = '' }: { value: string; size?: number; className?: string }) {
  return (
    <div className={`relative bg-white p-2.5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 160 160" 
        className="w-full h-auto max-w-[220px]"
        aria-label={`QR Code ${value}`}
      >
        {/* Background */}
        <rect width="160" height="160" fill="#FFFFFF" rx="8" />
        {/* Top-Left Finder */}
        <rect x="12" y="12" width="40" height="40" rx="6" fill="#064e3b" />
        <rect x="20" y="20" width="24" height="24" rx="4" fill="#FFFFFF" />
        <rect x="26" y="26" width="12" height="12" rx="2" fill="#064e3b" />
        {/* Top-Right Finder */}
        <rect x="108" y="12" width="40" height="40" rx="6" fill="#064e3b" />
        <rect x="116" y="20" width="24" height="24" rx="4" fill="#FFFFFF" />
        <rect x="122" y="26" width="12" height="12" rx="2" fill="#064e3b" />
        {/* Bottom-Left Finder */}
        <rect x="12" y="108" width="40" height="40" rx="6" fill="#064e3b" />
        <rect x="20" y="116" width="24" height="24" rx="4" fill="#FFFFFF" />
        <rect x="26" y="122" width="12" height="12" rx="2" fill="#064e3b" />
        {/* Matrix Pattern Blocks */}
        <rect x="60" y="16" width="8" height="8" fill="#064e3b" />
        <rect x="76" y="16" width="8" height="8" fill="#064e3b" />
        <rect x="92" y="16" width="8" height="8" fill="#064e3b" />
        <rect x="68" y="28" width="8" height="8" fill="#064e3b" />
        <rect x="84" y="28" width="8" height="8" fill="#064e3b" />
        <rect x="60" y="40" width="8" height="8" fill="#064e3b" />
        <rect x="76" y="40" width="8" height="8" fill="#064e3b" />
        <rect x="92" y="40" width="8" height="8" fill="#064e3b" />
        
        {/* Timing Lines */}
        <rect x="16" y="60" width="8" height="8" fill="#064e3b" />
        <rect x="32" y="60" width="8" height="8" fill="#064e3b" />
        <rect x="48" y="60" width="8" height="8" fill="#064e3b" />
        <rect x="64" y="60" width="8" height="8" fill="#064e3b" />
        <rect x="80" y="60" width="8" height="8" fill="#064e3b" />
        <rect x="96" y="60" width="8" height="8" fill="#064e3b" />
        <rect x="112" y="60" width="8" height="8" fill="#064e3b" />
        <rect x="128" y="60" width="8" height="8" fill="#064e3b" />
        <rect x="144" y="60" width="8" height="8" fill="#064e3b" />
        
        <rect x="60" y="76" width="8" height="8" fill="#064e3b" />
        <rect x="76" y="76" width="8" height="8" fill="#064e3b" />
        <rect x="92" y="76" width="8" height="8" fill="#064e3b" />
        <rect x="16" y="76" width="8" height="8" fill="#064e3b" />
        <rect x="32" y="76" width="8" height="8" fill="#064e3b" />
        <rect x="120" y="76" width="8" height="8" fill="#064e3b" />
        <rect x="136" y="76" width="8" height="8" fill="#064e3b" />
        
        <rect x="60" y="92" width="8" height="8" fill="#064e3b" />
        <rect x="76" y="92" width="8" height="8" fill="#064e3b" />
        <rect x="92" y="92" width="8" height="8" fill="#064e3b" />
        <rect x="108" y="92" width="8" height="8" fill="#064e3b" />
        <rect x="124" y="92" width="8" height="8" fill="#064e3b" />
        <rect x="140" y="92" width="8" height="8" fill="#064e3b" />

        <rect x="60" y="108" width="8" height="8" fill="#064e3b" />
        <rect x="76" y="108" width="8" height="8" fill="#064e3b" />
        <rect x="92" y="108" width="8" height="8" fill="#064e3b" />
        <rect x="108" y="108" width="8" height="8" fill="#064e3b" />
        <rect x="124" y="108" width="8" height="8" fill="#064e3b" />
        <rect x="140" y="108" width="8" height="8" fill="#064e3b" />

        <rect x="68" y="124" width="8" height="8" fill="#064e3b" />
        <rect x="84" y="124" width="8" height="8" fill="#064e3b" />
        <rect x="100" y="124" width="8" height="8" fill="#064e3b" />
        <rect x="116" y="124" width="8" height="8" fill="#064e3b" />
        <rect x="132" y="124" width="8" height="8" fill="#064e3b" />

        <rect x="60" y="140" width="8" height="8" fill="#064e3b" />
        <rect x="76" y="140" width="8" height="8" fill="#064e3b" />
        <rect x="92" y="140" width="8" height="8" fill="#064e3b" />
        <rect x="108" y="140" width="8" height="8" fill="#064e3b" />
        <rect x="124" y="140" width="8" height="8" fill="#064e3b" />
        <rect x="140" y="140" width="8" height="8" fill="#064e3b" />

        {/* Center Logo Badge */}
        <circle cx="80" cy="80" r="16" fill="#FFFFFF" stroke="#064e3b" strokeWidth="2.5" />
        <circle cx="80" cy="80" r="12" fill="#064e3b" />
        <path d="M75 85 C75 75 85 73 85 73 C85 73 85 83 75 85 Z" fill="#34d399" />
      </svg>
    </div>
  );
}

export default function CraftsmanPortalPage() {
  const { currentUser, userProfile, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TEXTILE_RECEIPT' | 'PRODUCTS' | 'ORDERS' | 'FINANCE'>('OVERVIEW');
  const [products, setProducts] = useState<CraftProduct[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [inventory, setInventory] = useState(() => getArtisanInventory());
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Manual Receipt State
  const [isManualReceiptOpen, setIsManualReceiptOpen] = useState(false);
  const [receiptPieces, setReceiptPieces] = useState(5);
  const [receiptSource, setReceiptSource] = useState('Kiriman Drop Box Mitra');

  // Upload Craft Modal State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [artisanCity, setArtisanCity] = useState(userProfile?.city || INDONESIA_CITIES[0]);
  const [category, setCategory] = useState<CraftProductCategory>('Tas & Pouch');
  const [technique, setTechnique] = useState('Sashiko Boro Stitching');
  const [materialSaved, setMaterialSaved] = useState('Denim & Katun Bekas');
  const [price, setPrice] = useState(145000);
  const [originalPrice, setOriginalPrice] = useState(220000);
  const [dimensions, setDimensions] = useState('35 x 40 cm');
  const [story, setStory] = useState('');
  const [stockCount, setStockCount] = useState(10);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');

  // Edit Craft Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editArtisanCity, setEditArtisanCity] = useState('');
  const [editCategory, setEditCategory] = useState<CraftProductCategory>('Tas & Pouch');
  const [editTechnique, setEditTechnique] = useState('');
  const [editMaterialSaved, setEditMaterialSaved] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editOriginalPrice, setEditOriginalPrice] = useState(0);
  const [editDimensions, setEditDimensions] = useState('');
  const [editStory, setEditStory] = useState('');
  const [editStockCount, setEditStockCount] = useState(1);
  const [editUploadedImages, setEditUploadedImages] = useState<string[]>([]);
  const [editUrlInput, setEditUrlInput] = useState('');

  // Withdrawal form state
  const [bankName, setBankName] = useState('Bank Central Asia (BCA)');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(50000);

  const studioName = userProfile?.business_name || userProfile?.full_name || 'Studio Daur Asri';

  const loadProducts = async () => {
    const fetched = await fetchCraftProducts();
    setProducts(fetched);
  };

  useEffect(() => {
    loadProducts();
    setInventory(getArtisanInventory(studioName));
    setOrders(getArtisanOrders());
    setWithdrawals(getWithdrawalHistory('ARTISAN'));
  }, [studioName]);

  const totalGMV = orders.reduce((acc, o) => acc + (o.price || 0), 0);
  const artisanNetProfit = Math.round(totalGMV * 0.90);
  const totalWithdrawn = withdrawals.reduce((acc, w) => acc + (Number(w.amount) || 0), 0);
  const availableBalance = Math.max(0, artisanNetProfit - totalWithdrawn);

  const handleCopyCode = (text?: string | React.MouseEvent) => {
    const code = typeof text === 'string' ? text : 'AS-BDG-204';
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    addNotification('info', 'Kode Tersalin', `Kode studio (${code}) berhasil disalin ke clipboard.`);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleManualReceiptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (receiptPieces <= 0) return;
    addFabricStockToArtisan(
      studioName,
      Number(receiptPieces),
      Number((receiptPieces * 0.4).toFixed(1))
    );
    setInventory(getArtisanInventory(studioName));
    setIsManualReceiptOpen(false);
    addNotification('success', 'Tekstil Diterima', `${receiptPieces} pcs bahan kain berhasil dicatat ke inventori.`);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (isEdit) {
            setEditUploadedImages((prev) => [...prev, reader.result as string]);
          } else {
            setUploadedImages((prev) => [...prev, reader.result as string]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddUrlImage = (isEdit = false) => {
    const val = isEdit ? editUrlInput.trim() : urlInput.trim();
    if (!val) return;
    if (isEdit) {
      setEditUploadedImages((prev) => [...prev, val]);
      setEditUrlInput('');
    } else {
      setUploadedImages((prev) => [...prev, val]);
      setUrlInput('');
    }
  };

  const handleRemoveImage = (index: number, isEdit = false) => {
    if (isEdit) {
      setEditUploadedImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleOpenEdit = (item: CraftProduct) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditArtisanCity(item.artisanCity || userProfile?.city || INDONESIA_CITIES[0]);
    setEditCategory(item.category);
    setEditTechnique(item.technique);
    setEditMaterialSaved(item.materialSaved);
    setEditPrice(item.price);
    setEditOriginalPrice(item.originalPrice || 0);
    setEditDimensions(item.dimensions || '');
    setEditStory(item.story);
    setEditStockCount(item.stockCount || 1);
    setEditUploadedImages(item.images && item.images.length > 0 ? [...item.images] : []);
    setIsEditOpen(true);
  };

  const handleDeleteProduct = async (productId: string, productTitle: string) => {
    if (confirm(`Yakin ingin menghapus produk "${productTitle}" dari katalog kerajinan?`)) {
      await deleteCraftProduct(productId);
      await loadProducts();
      addNotification('info', 'Karya Dihapus', `${productTitle} berhasil dihapus dari katalog.`);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editTitle.trim() || editPrice <= 0) {
      addNotification('warning', 'Form Belum Lengkap', 'Harap isi nama karya dan harga jual yang valid.');
      return;
    }

    const finalImages = editUploadedImages.length > 0 
      ? editUploadedImages 
      : ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'];

    const updatedProduct: CraftProduct = {
      id: editingId,
      title: editTitle.trim(),
      artisanName: userProfile?.full_name || 'Perajin Lokal',
      artisanStudio: studioName,
      artisanCity: editArtisanCity || artisanCity,
      price: Number(editPrice),
      originalPrice: Number(editOriginalPrice) || undefined,
      category: editCategory,
      technique: editTechnique,
      materialSaved: editMaterialSaved,
      dimensions: editDimensions,
      story: editStory.trim() || 'Karya daur ulang pakaian bernilai tinggi buatan tangan perajin lokal ClothLoop.',
      images: finalImages,
      stockCount: Number(editStockCount) || 1,
      rating: 5.0,
      reviewCount: 0,
      waterSavedLiters: 3200,
      co2SavedKg: 4.8,
    };

    await updateCraftProduct(updatedProduct);
    await loadProducts();
    setIsEditOpen(false);
    addNotification('success', 'Karya Berhasil Diperbarui', `${editTitle} dan stok berhasil diperbarui.`);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || price <= 0) {
      addNotification('warning', 'Form Belum Lengkap', 'Harap isi nama karya dan harga jual yang valid.');
      return;
    }

    const finalImages = uploadedImages.length > 0
      ? uploadedImages
      : ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'];

    const newProduct: CraftProduct = {
      id: `c-craft-${Date.now()}`,
      title: title.trim(),
      artisanName: userProfile?.full_name || 'Perajin Lokal',
      artisanStudio: studioName,
      artisanCity: artisanCity,
      price: Number(price),
      originalPrice: Number(originalPrice) || undefined,
      category: category,
      technique: technique,
      materialSaved: materialSaved,
      dimensions: dimensions,
      story: story.trim() || 'Karya daur ulang pakaian bernilai tinggi buatan tangan perajin lokal ClothLoop.',
      images: finalImages,
      stockCount: Number(stockCount) || 1,
      rating: 5.0,
      reviewCount: 0,
      waterSavedLiters: 3200,
      co2SavedKg: 4.8,
    };

    await saveNewCraftProduct(newProduct);
    await loadProducts();
    setIsUploadOpen(false);
    addNotification('success', 'Karya Berhasil Ditambahkan', `${title} (Stok: ${stockCount}) telah terdaftar di katalog kerajinan Anda.`);

    // Reset Form
    setTitle('');
    setPrice(145000);
    setStory('');
    setStockCount(10);
    setUploadedImages([]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    updateCraftOrderStatus(orderId, newStatus);
    setOrders(getArtisanOrders());
    addNotification('success', 'Status Diperbarui', `Pesanan ${orderId} telah diperbarui.`);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber || !accountHolder) {
      addNotification('warning', 'Data Rekening Kurang', 'Harap masukkan nomor rekening dan nama pemilik rekening.');
      return;
    }
    if (withdrawAmount <= 0 || withdrawAmount > availableBalance) {
      addNotification('warning', 'Saldo Tidak Cukup', 'Nominal penarikan melebihi saldo laba yang tersedia.');
      return;
    }

    submitBankWithdrawal({
      role: 'ARTISAN',
      bankName,
      accountNumber,
      accountHolder,
      amount: withdrawAmount,
      fee: 0,
      netAmount: withdrawAmount,
      artisanId: currentUser?.id || 'artisan-studio-1',
    });

    setWithdrawals(getWithdrawalHistory('ARTISAN'));
    addNotification('success', 'Penarikan Berhasil Diproses', `Dana sebesar ${formatRupiah(withdrawAmount)} sedang dikirim ke ${bankName} (${accountNumber}).`);
    setAccountNumber('');
    setAccountHolder('');
  };

  const pendingOrders = orders.filter(o => o.status === 'DIKEMAS' || o.status === 'Perlu Dikemas');

  const navTabs = [
    { id: 'OVERVIEW', label: 'Ringkasan Studio' },
    { id: 'TEXTILE_RECEIPT', label: 'Penerimaan Bahan Kain', count: inventory.totalDonationsReceived },
    { id: 'PRODUCTS', label: 'Katalog Kerajinan Saya', count: products.length },
    { id: 'ORDERS', label: 'Pesanan Masuk', count: pendingOrders.length },
    { id: 'FINANCE', label: 'Laba & Escrow' },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-900 pb-24">
      
      {/* ── Top Role Navbar ── */}
      <RolePortalNavbar
        role="UMKM"
        portalTitle="Portal Studio Perajin & UMKM"
        badgeLabel="Studio Upcycling Terverifikasi"
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
        tabs={navTabs}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6">
        
        {/* ── 1. OVERVIEW TAB ── */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            
            {/* Studio Header Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">
                  Dashboard Studio & Produksi Upcycling
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1 font-serif">
                  {studioName}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
                  Pusat operasional rekonstruksi tekstil, manajemen bahan baku kain donasi, dan karya seni berkelanjutan.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsManualReceiptOpen(true)}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Catat Pasokan Kain
                </button>
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Upload Karya Baru</span>
                </button>
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-stone-600 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Stok Bahan Kain</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <Layers size={15} />
                  </div>
                </div>
                <strong className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                  {inventory.fabricPiecesCount} <span className="text-xs font-medium text-stone-500">Helai</span>
                </strong>
                <span className="text-[11px] text-stone-600 mt-2 font-medium">
                  Bahan pakaian donasi siap diolah
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-stone-600 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Karya Aktif Terdaftar</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Scissors size={15} />
                  </div>
                </div>
                <strong className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                  {products.length} <span className="text-xs font-medium text-stone-500">Produk</span>
                </strong>
                <span className="text-[11px] text-stone-600 mt-2 font-medium">
                  {products.length > 0 ? `${products.length} karya siap dipesan` : 'Belum ada karya terdaftar'}
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-stone-600 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Pesanan Masuk</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                    <Package size={15} />
                  </div>
                </div>
                <strong className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                  {orders.length} <span className="text-xs font-medium text-stone-500">Order</span>
                </strong>
                <span className="text-[11px] text-stone-600 mt-2 font-medium">
                  {pendingOrders.length > 0 ? `${pendingOrders.length} perlu dikemas` : 'Tidak ada pesanan tertunda'}
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-300 shadow-xs bg-gradient-to-br from-emerald-50/50 to-white flex flex-col justify-between">
                <div className="flex items-center justify-between text-emerald-900 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Laba Bersih Studio (60%)</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                    <TrendingUp size={15} />
                  </div>
                </div>
                <strong className="text-xl sm:text-2xl font-black text-emerald-950 font-mono">
                  {formatRupiah(artisanNetProfit)}
                </strong>
                <span className="text-[11px] text-emerald-800 font-bold mt-2">
                  60% hasil penjualan perajin (40% platform fee)
                </span>
              </div>

            </div>

            {/* Quick Actions / Verification Code Box with QR Code */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Textile Studio Quick Receiver with QR Code */}
              <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <QrCode size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                      QR Code & Kode Verifikasi Penerimaan Kain
                    </h3>
                    <span className="text-[11px] text-stone-500">Scan via kamera kurir atau input kode verifikasi</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center gap-5">
                  {/* QR Code preview box with hover zoom */}
                  <div 
                    onClick={() => setIsQrModalOpen(true)}
                    className="relative group cursor-pointer shrink-0 bg-white p-2 rounded-2xl border border-stone-300 hover:border-emerald-600 transition-all shadow-xs"
                    title="Klik untuk perbesar QR Code"
                  >
                    <StudioQrSvg value={inventory.studioVerificationCode} size={110} />
                    <div className="absolute inset-0 bg-emerald-950/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center backdrop-blur-[1px]">
                      <Maximize2 size={20} className="mb-1" />
                      <span className="text-[10px] font-bold">Perbesar QR</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-xs text-stone-600 font-medium">Kode Verifikasi Studio:</span>
                      <strong className="text-lg font-mono font-black text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 tracking-wider">
                        {inventory.studioVerificationCode}
                      </strong>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Tunjukkan <strong>QR Code</strong> di samping atau sebutkan kode verifikasi kepada kurir ClothLoop saat mengantarkan pasokan kain donasi ke studio Anda.
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsQrModalOpen(true)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <QrCode size={14} />
                        <span>Tampilkan QR Layar Penuh</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold border border-stone-300 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        {copiedCode ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                        <span>{copiedCode ? 'Tersalin' : 'Salin Kode'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Col: Quick Withdrawal Box */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet size={16} className="text-emerald-800" />
                    <h3 className="text-sm font-bold text-stone-900 font-serif">
                      Saldo Siap Cair
                    </h3>
                  </div>
                  <span className="text-[11px] text-stone-600 block">Sisa saldo studio siap ditarik:</span>
                  <strong className="text-xl sm:text-2xl font-black text-stone-900 font-mono block mt-1">
                    {formatRupiah(availableBalance)}
                  </strong>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Dana hasil penjualan kerajinan dapat langsung dicairkan ke rekening bank studio Anda.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('FINANCE')}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold mt-4 shadow-xs transition-colors cursor-pointer"
                >
                  Tarik Dana ke Rekening Bank
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ── 2. TEXTILE RECEIPT TAB ── */}
        {activeTab === 'TEXTILE_RECEIPT' && (
          <div className="space-y-5">
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Penerimaan & Pasokan Bahan Kain
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Pantau suplai kain perca dan bahan pakaian donasi yang masuk ke studio perajin.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsManualReceiptOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Catat Bahan Masuk</span>
              </button>
            </div>

            {/* QR Studio Reception Station Card */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white p-5 sm:p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800">
              <div className="space-y-3 text-center md:text-left max-w-xl">
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                  QR Code Studio Siap Scan Kurir
                </h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Saat kurir tiba di studio Anda membawa pakaian atau kain donasi, arahkan kurir untuk memindai QR Code ini menggunakan menu <em>Scan QR Studio Perajin</em> pada aplikasi kurir. Bahan kain akan otomatis bertambah ke inventaris studio.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsQrModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Maximize2 size={14} />
                    <span>Buka QR Layar Penuh</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-4 py-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs font-bold border border-emerald-600/50 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                    <span>{copiedCode ? 'Tersalin' : `Salin Kode: ${inventory.studioVerificationCode}`}</span>
                  </button>
                </div>
              </div>

              <div 
                onClick={() => setIsQrModalOpen(true)}
                className="bg-white p-3.5 rounded-2xl shadow-xl shrink-0 cursor-pointer group relative text-stone-900 text-center"
              >
                <StudioQrSvg value={inventory.studioVerificationCode} size={140} />
                <span className="text-[10px] font-mono font-bold text-stone-600 block mt-1.5">
                  {inventory.studioVerificationCode}
                </span>
                <span className="text-[9px] text-emerald-700 font-bold block">
                  Klik untuk Zoom
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-600 font-medium">Total Bahan Kain Tersedia:</span>
                <strong className="text-2xl font-black text-stone-900 font-mono block mt-1">
                  {inventory.fabricPiecesCount} Helai
                </strong>
                <p className="text-xs text-stone-600 mt-1">
                  Helai pakaian donasi siap diolah untuk proyek upcycling studio.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-600 font-medium">Total Pengiriman Donasi Diterima:</span>
                <strong className="text-2xl font-black text-emerald-800 font-mono block mt-1">
                  {inventory.totalDonationsReceived} Kiriman
                </strong>
                <p className="text-xs text-stone-600 mt-1">
                  Diantarkan oleh kurir penjemputan ClothLoop dan mitra drop-box lokal.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── 3. PRODUCTS CATALOG TAB ── */}
        {activeTab === 'PRODUCTS' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Katalog Karya Kerajinan Studio
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Daftar karya upcycling kreatif yang dibuat dan dikelola oleh studio Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Upload Karya Baru</span>
              </button>
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-xs">
                <Inbox className="w-10 h-10 mx-auto text-stone-400 mb-2.5" />
                <h4 className="text-sm font-bold text-stone-900">Belum Ada Karya yang Diupload</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1">
                  Mulai upload karya kerajinan daur ulang tekstil Anda untuk dipajang dan dibeli pembeli.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all">
                    <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                      <Image src={item.images[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                      
                      {/* Technique Badge */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                        {item.technique}
                      </span>

                      {/* Stock Count Badge */}
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-800/90 backdrop-blur-xs text-white text-[10px] font-mono font-bold shadow-xs">
                        Stok: {item.stockCount ?? 1} Unit
                      </span>
                    </div>

                    <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                          {item.category} &bull; {item.dimensions}
                        </span>
                        <h4 className="text-xs font-bold text-stone-900 mt-1 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                          {item.story}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-stone-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-stone-500 block">Harga Jual:</span>
                            <strong className="text-xs font-black text-stone-900 font-mono">
                              {formatRupiah(item.price)}
                            </strong>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            (item.stockCount ?? 1) > 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {(item.stockCount ?? 1) > 0 ? 'Tersedia' : 'Stok Habis'}
                          </span>
                        </div>

                        {/* Action Buttons: Edit & Delete */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-850 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <Edit3 size={12} />
                            <span>Edit / Stok</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(item.id, item.title)}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <Trash2 size={12} />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── 4. ORDERS TAB ── */}
        {activeTab === 'ORDERS' && (
          <div className="space-y-5">
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex justify-between items-center">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Pesanan Masuk Kerajinan
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Pesanan karya dari pembeli yang dilindungi dengan garansi Escrow.
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-xs">
                <Package className="w-10 h-10 mx-auto text-stone-400 mb-2.5" />
                <h4 className="text-sm font-bold text-stone-900">Belum Ada Pesanan Masuk</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1 leading-relaxed">
                  Pesanan dari pembeli akan muncul otomatis di sini setelah transaksi dilakukan.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2.5 border-b border-stone-100">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-stone-100 rounded text-stone-900">
                          {ord.id}
                        </span>
                        <span className="text-xs text-stone-600">{ord.createdAt ? new Date(ord.createdAt).toLocaleDateString('id-ID') : 'Baru saja'}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-900">
                        {ord.status || 'Perlu Dikemas'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900">
                          {ord.craftTitle || 'Karya Kerajinan'}
                        </h4>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Penerima: <strong>{ord.buyerName || 'Pembeli'}</strong> ({ord.buyerCity || 'Kota Pembeli'})
                        </p>
                        <strong className="text-xs font-black text-stone-900 font-mono block mt-1">
                          {formatRupiah(ord.price || 0)} &bull; Hak Bersih Studio: <span className="text-emerald-800">{formatRupiah(ord.artisanEarnings || Math.round((ord.price || 0) * 0.60))}</span>
                        </strong>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                      {ord.status !== 'SELESAI' && (
                        <button 
                          type="button"
                          onClick={() => handleUpdateOrderStatus(ord.id, 'SELESAI')}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                        >
                          Konfirmasi Pengiriman & Selesai
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── 5. FINANCE TAB ── */}
        {activeTab === 'FINANCE' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Withdrawal Form */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                  Pencairan Saldo Studio
                </h3>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl">
                  Tersedia: {formatRupiah(availableBalance)}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tarik laba penjualan karya kerajinan ke rekening bank studio Anda tanpa biaya admin perantara.
              </p>

              <form onSubmit={handleWithdrawSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">Pilih Bank Tujuan</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-white text-stone-900"
                  >
                    <option value="Bank Central Asia (BCA)">Bank BCA (Bank Central Asia)</option>
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Bank BNI">Bank BNI</option>
                    <option value="Bank Syariah Indonesia (BSI)">Bank Syariah Indonesia (BSI)</option>
                    <option value="GoPay">GoPay E-Wallet</option>
                    <option value="OVO">OVO Cash</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">Nomor Rekening</label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Contoh: 8271928192"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 font-medium font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">Nama Pemilik Rekening</label>
                  <input
                    type="text"
                    required
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="Sesuai buku tabungan"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">Jumlah Penarikan (Rp)</label>
                  <input
                    type="number"
                    required
                    min={50000}
                    max={availableBalance || 50000}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 font-medium font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={availableBalance < 50000}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer mt-1 ${
                    availableBalance >= 50000
                      ? 'bg-emerald-800 hover:bg-emerald-900 text-white'
                      : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  Ajukan Pencairan Dana
                </button>
              </form>
            </div>

            {/* Right: Cashflow Summary, History & Split Breakdown */}
            <div className="lg:col-span-2 space-y-5">
              
              {/* Cashflow & Split Breakdown */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                    Ringkasan Keuangan & Arus Kas Studio Perajin
                  </h3>
                  <span className="text-xs font-bold text-emerald-900">
                    Skema Bagi Hasil 60% / 40%
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  ClothLoop menjamin hak studio kerajinan dengan skema escrow: 60% langsung ke saldo perajin, 40% dialokasikan untuk penyediaan bahan kain donasi gratis, pemeliharaan server, kurasi kurir, dan garansi pembeli.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[11px] text-emerald-900 font-bold block">Total Laba Bersih Studio (+)</span>
                    <strong className="text-base sm:text-lg font-black text-emerald-950 font-mono mt-0.5 block">
                      {formatRupiah(artisanNetProfit)}
                    </strong>
                    <span className="text-[10px] text-emerald-700">60% dari GMV {formatRupiah(totalGMV)}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                    <span className="text-[11px] text-stone-600 font-bold block">Total Sudah Ditarik (-)</span>
                    <strong className="text-base sm:text-lg font-black text-rose-700 font-mono mt-0.5 block">
                      {formatRupiah(totalWithdrawn)}
                    </strong>
                    <span className="text-[10px] text-stone-500">{withdrawals.length} pencairan diproses</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                    <span className="text-[11px] text-stone-700 font-bold block">Saldo Tersedia (Sisa)</span>
                    <strong className="text-base sm:text-lg font-black text-stone-900 font-mono mt-0.5 block">
                      {formatRupiah(availableBalance)}
                    </strong>
                    <span className="text-[10px] text-stone-500">Siap dicairkan ke bank</span>
                  </div>
                </div>
              </div>

              {/* Riwayat Penarikan Dana Studio Perajin */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                      Riwayat Penarikan Dana Studio (- Keluar)
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Catatan pengiriman saldo laba kerajinan studio ke rekening bank terdaftar.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-xl font-mono">
                    {withdrawals.length} Transaksi
                  </span>
                </div>

                {withdrawals.length === 0 ? (
                  <div className="text-center py-8 text-stone-500 text-xs">
                    Belum ada riwayat penarikan dana. Ajukan penarikan laba bersih kerajinan melalui formulir di samping.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {withdrawals.map((w) => (
                      <div key={w.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
                            <DollarSign className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-900 font-mono">{w.id}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono">
                                {w.status || 'PROCESSED'}
                              </span>
                            </div>
                            <p className="text-xs text-stone-700 mt-0.5 font-medium">
                              {w.bankName} • No: <strong className="font-mono text-stone-900">{w.accountNumber}</strong> a.n. {w.accountHolder}
                            </p>
                            <span className="text-[10px] text-stone-400">
                              {w.createdAt ? new Date(w.createdAt).toLocaleString('id-ID') : 'Baru saja'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-rose-700 font-mono">
                            -{formatRupiah(Number(w.amount))}
                          </span>
                          <span className="text-[10px] text-emerald-800 font-semibold block">Transfer Berhasil</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* ── MODAL QR CODE VERIFIKASI STUDIO (FULLSCREEN FOR COURIER SCAN) ── */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-stone-200 p-6 text-center relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 mb-4">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    QR Verifikasi Penerimaan
                  </span>
                  <h3 className="text-base font-bold text-stone-900 font-serif mt-1">
                    {studioName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Big High-Contrast QR Code */}
              <div className="relative p-4 bg-stone-50 rounded-2xl border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center my-2">
                <StudioQrSvg value={inventory.studioVerificationCode} size={200} />
                {/* Laser animation indicator */}
                <div className="w-full flex items-center justify-center gap-1.5 mt-3 text-emerald-800 text-xs font-bold">
                  <ScanLine size={14} className="animate-pulse" />
                  <span>Arahkan Kamera Kurir ke QR Ini</span>
                </div>
              </div>

              {/* Verification Code Box */}
              <div className="mt-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-stone-500 block font-medium">Kode Alternatif Input Manual:</span>
                  <strong className="text-base font-mono font-black text-emerald-950 tracking-wider">
                    {inventory.studioVerificationCode}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold border border-stone-300 flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
                  <span>{copiedCode ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              <p className="text-[11px] text-stone-500 mt-3 leading-relaxed">
                Scan QR ini mengonfirmasi serah-terima kain donasi dari kurir dan menambahkan stok kain secara instan ke studio Anda.
              </p>

              <button
                type="button"
                onClick={() => setIsQrModalOpen(false)}
                className="w-full mt-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Tutup QR Code
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL CATAT PENERIMAAN BAHAN KAIN ── */}
      <AnimatePresence>
        {isManualReceiptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 p-5 sm:p-6"
            >
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Catat Pasokan Bahan Kain
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Tambahkan catatan stok bahan baku pakaian donasi masuk.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsManualReceiptOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleManualReceiptSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Jumlah Bahan Kain Masuk (Helai)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={receiptPieces}
                    onChange={(e) => setReceiptPieces(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Sumber Pengiriman / Catatan</label>
                  <input
                    type="text"
                    required
                    value={receiptSource}
                    onChange={(e) => setReceiptSource(e.target.value)}
                    placeholder="Drop box mitra / kurir jemput"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer mt-2"
                >
                  Simpan Stok Masuk
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL UPLOAD PRODUK CRAFT ── */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-5 sm:p-6"
            >
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Upload Karya Kerajinan Baru
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Karya akan tersimpan di katalog studio Anda dan langsung tampil di marketplace kerajinan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {/* 1. Upload Foto Karya */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                    <span>Foto Produk Karya (Wajib)</span>
                    <span className="text-[11px] text-stone-500 font-normal">Format JPG, PNG, WebP</span>
                  </label>

                  {/* File Upload Drop Area */}
                  <div className="border-2 border-dashed border-stone-300 hover:border-emerald-700 bg-stone-50 rounded-2xl p-4 text-center transition-colors relative cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageFileChange(e, false)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UploadCloud size={20} />
                      </div>
                      <span className="text-xs font-bold text-stone-900">Klik atau Tarik Foto ke Sini</span>
                      <span className="text-[10px] text-stone-500">Pilih satu atau beberapa foto dari perangkat Anda</span>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {uploadedImages.length > 0 && (
                    <div className="flex items-center gap-2.5 mt-2.5 overflow-x-auto pb-1">
                      {uploadedImages.map((img, idx) => (
                        <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-stone-200 shrink-0 group">
                          <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" sizes="64px" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, false)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* URL Input Fallback */}
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Atau tempel URL gambar langsung..."
                      className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs bg-white text-stone-900"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddUrlImage(false)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      + URL
                    </button>
                  </div>
                </div>

                {/* 2. Nama Produk */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Nama Karya Kerajinan</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Tote Bag Sashiko Motif Boro Geometris"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                  />
                </div>

                {/* 3. Kategori & Jumlah Stok */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kategori</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                    >
                      <option value="Tas & Pouch">Tas & Pouch</option>
                      <option value="Jaket & Outer Rekonstruksi">Jaket & Outer Rekonstruksi</option>
                      <option value="Topi & Aksesoris">Topi & Aksesoris</option>
                      <option value="Home Living & Dekorasi">Home Living & Dekorasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center justify-between">
                      <span>Jumlah Stok (Unit)</span>
                      <span className="text-[10px] text-emerald-800 font-bold">Stok Awal</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={stockCount}
                      onChange={(e) => setStockCount(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Teknik Kerajinan</label>
                    <input
                      type="text"
                      value={technique}
                      onChange={(e) => setTechnique(e.target.value)}
                      placeholder="Sashiko, Patchwork, dsb"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kota Studio</label>
                    <select
                      value={artisanCity}
                      onChange={(e) => setArtisanCity(e.target.value)}
                      className="w-full px-2 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                    >
                      {INDONESIA_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Bahan Baku Daur Ulang</label>
                    <input
                      type="text"
                      value={materialSaved}
                      onChange={(e) => setMaterialSaved(e.target.value)}
                      placeholder="Denim & Katun"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Dimensi Produk</label>
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="35 x 40 cm"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Harga Jual (Rp)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Harga Retail Pasar (Rp)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Deskripsi & Cerita Upcycling Karya</label>
                  <textarea
                    rows={2}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Ceritakan proses pembuatan dan keunikan karya seni ini..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer mt-1"
                >
                  Terbitkan Karya ke Katalog
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL EDIT PRODUK CRAFT & KELOLA STOK ── */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-5 sm:p-6"
            >
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Edit Karya & Kelola Stok
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Perbarui informasi karya atau tambahkan jumlah stok produk.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                {/* 1. Foto Karya Preview & Upload Baru */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                    <span>Foto Produk Karya</span>
                    <span className="text-[11px] text-stone-500 font-normal">Format JPG, PNG, WebP</span>
                  </label>

                  {/* File Upload Drop Area */}
                  <div className="border-2 border-dashed border-stone-300 hover:border-emerald-700 bg-stone-50 rounded-2xl p-3 text-center transition-colors relative cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageFileChange(e, true)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center gap-1 pointer-events-none">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UploadCloud size={16} />
                      </div>
                      <span className="text-xs font-bold text-stone-900">Upload / Tambah Foto Baru</span>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {editUploadedImages.length > 0 && (
                    <div className="flex items-center gap-2.5 mt-2.5 overflow-x-auto pb-1">
                      {editUploadedImages.map((img, idx) => (
                        <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-stone-200 shrink-0 group">
                          <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" sizes="64px" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, true)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* URL Input Fallback */}
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={editUrlInput}
                      onChange={(e) => setEditUrlInput(e.target.value)}
                      placeholder="Atau tempel URL gambar..."
                      className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs bg-white text-stone-900"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddUrlImage(true)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      + URL
                    </button>
                  </div>
                </div>

                {/* 2. Nama Produk */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Nama Karya Kerajinan</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                  />
                </div>

                {/* 3. Kategori & Jumlah Stok */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kategori</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                    >
                      <option value="Tas & Pouch">Tas & Pouch</option>
                      <option value="Jaket & Outer Rekonstruksi">Jaket & Outer Rekonstruksi</option>
                      <option value="Topi & Aksesoris">Topi & Aksesoris</option>
                      <option value="Home Living & Dekorasi">Home Living & Dekorasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center justify-between">
                      <span>Jumlah Stok (Unit)</span>
                      <span className="text-[10px] text-emerald-800 font-bold">Kelola Stok</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={editStockCount}
                      onChange={(e) => setEditStockCount(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Teknik Kerajinan</label>
                    <input
                      type="text"
                      value={editTechnique}
                      onChange={(e) => setEditTechnique(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kota Studio</label>
                    <select
                      value={editArtisanCity}
                      onChange={(e) => setEditArtisanCity(e.target.value)}
                      className="w-full px-2 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                    >
                      {INDONESIA_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Bahan Baku Daur Ulang</label>
                    <input
                      type="text"
                      value={editMaterialSaved}
                      onChange={(e) => setEditMaterialSaved(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Dimensi Produk</label>
                    <input
                      type="text"
                      value={editDimensions}
                      onChange={(e) => setEditDimensions(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Harga Jual (Rp)</label>
                    <input
                      type="number"
                      required
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Harga Retail Pasar (Rp)</label>
                    <input
                      type="number"
                      value={editOriginalPrice}
                      onChange={(e) => setEditOriginalPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Deskripsi & Cerita Upcycling Karya</label>
                  <textarea
                    rows={2}
                    value={editStory}
                    onChange={(e) => setEditStory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-2 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Simpan Perubahan & Update Stok
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
