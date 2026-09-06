'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Plus, 
  Package, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Tag, 
  Search, 
  Filter, 
  ChevronRight, 
  X, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  Wallet,
  Inbox,
  Edit3,
  Trash2,
  UploadCloud,
  ImageIcon
} from 'lucide-react';
import { RolePortalNavbar } from '@/components/portal/RolePortalNavbar';
import { useApp } from '@/lib/store';
import { MarketItem, GarmentCondition, GarmentCategory } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import { 
  getAllMarketItemsWithSellers, 
  saveNewPrelovedItem,
  updatePrelovedItem,
  deletePrelovedItem,
  getCustomSellerItems,
  getSellerOrders,
  saveSellerOrder,
  updateSellerOrderStatus,
  submitBankWithdrawal,
  getWithdrawalHistory
} from '@/lib/supabase/portalData';
import { fetchMarketItems } from '@/lib/supabase/data';
import { INDONESIA_CITIES } from '@/lib/constants';

export default function SellerPortalPage() {
  const { currentUser, userProfile, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PRODUCTS' | 'ORDERS' | 'FINANCE'>('OVERVIEW');
  const [products, setProducts] = useState<MarketItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');

  // Modal Upload State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [sellerCity, setSellerCity] = useState(userProfile?.city || INDONESIA_CITIES[0]);
  const [category, setCategory] = useState<GarmentCategory>('Wanita');
  const [condition, setCondition] = useState<GarmentCondition>('LIKE_NEW');
  const [size, setSize] = useState('M');
  const [chestWidthCm, setChestWidthCm] = useState(50);
  const [lengthCm, setLengthCm] = useState(68);
  const [material, setMaterial] = useState('100% Katun Organik');
  const [price, setPrice] = useState(85000);
  const [originalPrice, setOriginalPrice] = useState(250000);
  const [story, setStory] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');

  // Modal Edit State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editSellerCity, setEditSellerCity] = useState('');
  const [editCategory, setEditCategory] = useState<GarmentCategory>('Wanita');
  const [editCondition, setEditCondition] = useState<GarmentCondition>('LIKE_NEW');
  const [editSize, setEditSize] = useState('M');
  const [editChestWidthCm, setEditChestWidthCm] = useState(50);
  const [editLengthCm, setEditLengthCm] = useState(68);
  const [editMaterial, setEditMaterial] = useState('100% Katun Organik');
  const [editPrice, setEditPrice] = useState(0);
  const [editOriginalPrice, setEditOriginalPrice] = useState(0);
  const [editStory, setEditStory] = useState('');
  const [editUploadedImages, setEditUploadedImages] = useState<string[]>([]);
  const [editUrlInput, setEditUrlInput] = useState('');

  // Finance Withdrawal State
  const [bankName, setBankName] = useState('Bank Central Asia (BCA)');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(50000);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);

  const loadProducts = async () => {
    const fetched = await fetchMarketItems();
    setProducts(fetched);
  };

  useEffect(() => {
    loadProducts();
    setOrders(getSellerOrders());
    setWithdrawals(getWithdrawalHistory('SELLER'));
  }, []);

  const mySellerName = userProfile?.full_name || 'Seller Preloved Resmi';
  const filteredProducts = products.filter(p => {
    const matchCat = categoryFilter === 'Semua' || p.category === categoryFilter;
    const matchQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const totalGMV = orders.reduce((acc, o) => acc + (o.price || 0), 0);
  const totalNetProfit = Math.round(totalGMV * 0.90);
  const totalWithdrawn = withdrawals.reduce((acc, w) => acc + (Number(w.amount) || 0), 0);
  const availableBalance = Math.max(0, totalNetProfit - totalWithdrawn);

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

  const handleOpenEdit = (item: MarketItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditBrand(item.brand || '');
    setEditSellerCity(item.sellerCity || userProfile?.city || INDONESIA_CITIES[0]);
    setEditCategory(item.category as GarmentCategory || 'Wanita');
    setEditCondition(item.condition);
    setEditSize(item.size);
    setEditChestWidthCm(item.measurements?.chestWidthCm || 50);
    setEditLengthCm(item.measurements?.lengthCm || 68);
    setEditMaterial(item.material || 'Katun');
    setEditPrice(item.price);
    setEditOriginalPrice(item.originalPrice || 0);
    setEditStory(item.story || '');
    setEditUploadedImages(item.images && item.images.length > 0 ? [...item.images] : []);
    setIsEditOpen(true);
  };

  const handleDeleteProduct = async (productId: string, productTitle: string) => {
    if (confirm(`Yakin ingin menghapus pakaian "${productTitle}" dari katalog?`)) {
      await deletePrelovedItem(productId);
      await loadProducts();
      addNotification('info', 'Pakaian Dihapus', `${productTitle} berhasil dihapus dari katalog.`);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editTitle.trim() || editPrice <= 0) {
      addNotification('warning', 'Form Belum Lengkap', 'Harap isi nama pakaian dan harga jual yang valid.');
      return;
    }

    const finalImages = editUploadedImages.length > 0
      ? editUploadedImages
      : ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'];

    const updatedItem: MarketItem = {
      id: editingId,
      title: editTitle.trim(),
      brand: editBrand.trim() || 'Thrift Curated',
      sellerName: mySellerName,
      sellerCity: editSellerCity || sellerCity,
      price: Number(editPrice),
      originalPrice: Number(editOriginalPrice) || undefined,
      condition: editCondition,
      category: editCategory,
      size: editSize,
      measurements: {
        chestWidthCm: Number(editChestWidthCm) || 0,
        lengthCm: Number(editLengthCm) || 0,
      },
      material: editMaterial,
      story: editStory.trim() || 'Pakaian preloved berkualitas dalam kondisi sangat terawat.',
      images: finalImages,
      waterSavedLiters: 2700,
      co2SavedKg: 3.6,
      isVerifiedQC: true,
      status: 'AVAILABLE',
      rating: 5.0,
      reviewCount: 0,
    };

    await updatePrelovedItem(updatedItem);
    await loadProducts();
    setIsEditOpen(false);
    addNotification('success', 'Pakaian Diperbarui', `${editTitle} berhasil diperbarui.`);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || price <= 0) {
      addNotification('warning', 'Form Belum Lengkap', 'Harap isi nama pakaian dan harga jual yang valid.');
      return;
    }

    const finalImages = uploadedImages.length > 0
      ? uploadedImages
      : ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'];

    const newItem: MarketItem = {
      id: `c-item-${Date.now()}`,
      title: title.trim(),
      brand: brand.trim() || 'Thrift Curated',
      sellerName: mySellerName,
      sellerCity: sellerCity,
      price: Number(price),
      originalPrice: Number(originalPrice) || undefined,
      condition: condition,
      category: category,
      size: size,
      measurements: {
        chestWidthCm: Number(chestWidthCm) || 0,
        lengthCm: Number(lengthCm) || 0,
      },
      material: material,
      story: story.trim() || 'Pakaian preloved berkualitas dalam kondisi sangat terawat.',
      images: finalImages,
      waterSavedLiters: 2700,
      co2SavedKg: 3.6,
      isVerifiedQC: true,
      status: 'AVAILABLE',
      rating: 5.0,
      reviewCount: 0,
    };

    await saveNewPrelovedItem(newItem);
    await loadProducts();
    setIsUploadOpen(false);
    addNotification('success', 'Pakaian Berhasil Ditambahkan', `${title} telah terdaftar di katalog pakaian Anda.`);

    // Reset Form
    setTitle('');
    setBrand('');
    setPrice(85000);
    setStory('');
    setUploadedImages([]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    updateSellerOrderStatus(orderId, newStatus);
    setOrders(getSellerOrders());
    addNotification('success', 'Status Diperbarui', `Pesanan ${orderId} telah diubah menjadi ${newStatus}.`);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber || !accountHolder) {
      addNotification('warning', 'Data Rekening Kurang', 'Harap masukkan nomor rekening dan nama pemilik rekening.');
      return;
    }
    if (withdrawAmount <= 0 || withdrawAmount > availableBalance) {
      addNotification('warning', 'Saldo Tidak Cukup', 'Nominal penarikan melebihi saldo tersedia.');
      return;
    }

    submitBankWithdrawal({
      bankName,
      accountNumber,
      accountHolder,
      amount: withdrawAmount,
      fee: 0,
      netAmount: withdrawAmount,
      sellerId: currentUser?.id,
    });

    setWithdrawals(getWithdrawalHistory('SELLER'));
    addNotification('success', 'Penarikan Berhasil Diproses', `Dana sebesar ${formatRupiah(withdrawAmount)} sedang dikirim ke ${bankName} (${accountNumber}).`);
    setAccountNumber('');
    setAccountHolder('');
  };

  const pendingOrders = orders.filter(o => o.status === 'PERLU_DIKEMAS' || o.status === 'Perlu Dikemas');

  const navTabs = [
    { id: 'OVERVIEW', label: 'Ringkasan Toko' },
    { id: 'PRODUCTS', label: 'Katalog Pakaian Saya', count: products.length },
    { id: 'ORDERS', label: 'Pesanan Masuk', count: pendingOrders.length },
    { id: 'FINANCE', label: 'Laba & Dompet' },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-900 pb-24">
      
      {/* ── Top Role Navbar ── */}
      <RolePortalNavbar
        role="SELLER"
        portalTitle="Portal Seller Preloved"
        badgeLabel="Seller Terverifikasi"
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
        tabs={navTabs}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6">
        
        {/* ── 1. OVERVIEW TAB ── */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            
            {/* Hero Welcome Banner */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">
                  Dashboard Penjual Preloved
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1 font-serif">
                  Halo, {mySellerName}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
                  Kelola stok pakaian bekas berkualitas, pantau pesanan yang masuk, dan kembangkan bisnis fashion sirkular ramah lingkungan Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Plus size={15} />
                <span>Upload Pakaian Baru</span>
              </button>
            </div>

            {/* 4 Key Metrik Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-stone-600 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Produk Aktif</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Tag size={15} />
                  </div>
                </div>
                <strong className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                  {products.length} <span className="text-xs font-medium text-stone-500">Item</span>
                </strong>
                <span className="text-[11px] text-stone-600 mt-2 flex items-center gap-1 font-medium">
                  {products.length > 0 ? `${products.length} pakaian aktif` : 'Belum ada produk aktif'}
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-stone-600 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Pesanan Masuk</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <Package size={15} />
                  </div>
                </div>
                <strong className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                  {orders.length} <span className="text-xs font-medium text-stone-500">Order</span>
                </strong>
                <span className="text-[11px] text-stone-600 mt-2 flex items-center gap-1 font-medium">
                  {pendingOrders.length > 0 ? `${pendingOrders.length} perlu diproses` : 'Tidak ada pesanan tertunda'}
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-stone-600 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Omzet Penjualan</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                    <DollarSign size={15} />
                  </div>
                </div>
                <strong className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                  {formatRupiah(totalGMV)}
                </strong>
                <span className="text-[11px] text-stone-500 mt-2 font-medium">
                  Gross Merchandise Value
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-300 shadow-xs bg-gradient-to-br from-emerald-50/50 to-white flex flex-col justify-between">
                <div className="flex items-center justify-between text-emerald-900 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Laba Bersih (90%)</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                    <TrendingUp size={15} />
                  </div>
                </div>
                <strong className="text-xl sm:text-2xl font-black text-emerald-950 font-mono">
                  {formatRupiah(totalNetProfit)}
                </strong>
                <span className="text-[11px] text-emerald-800 font-bold mt-2">
                  Telah dipotong platform fee 10%
                </span>
              </div>

            </div>

            {/* Quick Actions & Recent Uploads */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Products Preview */}
              <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                    Koleksi Pakaian Preloved Terkini
                  </h3>
                  {products.length > 0 && (
                    <button 
                      type="button"
                      onClick={() => setActiveTab('PRODUCTS')}
                      className="text-xs text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none"
                    >
                      <span>Lihat Semua ({products.length})</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>

                {products.length === 0 ? (
                  <div className="text-center py-10 text-stone-500 text-xs">
                    <Inbox className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                    <p className="font-semibold text-stone-800">Belum ada pakaian yang diupload</p>
                    <p className="text-stone-500 mt-0.5">Mulai jual pakaian bekas layak pakai Anda dengan menekan tombol &quot;Upload Pakaian Baru&quot;.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {products.slice(0, 4).map((item) => (
                      <div key={item.id} className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex gap-3 items-center">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                          <Image src={item.images[0] || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'} alt={item.title} fill className="object-cover" sizes="56px" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-amber-800 uppercase block truncate">
                            {item.brand || 'Thrift'} &bull; Size {item.size}
                          </span>
                          <h4 className="text-xs font-bold text-stone-900 truncate">
                            {item.title}
                          </h4>
                          <strong className="text-xs font-black text-stone-900 font-mono block mt-0.5">
                            {formatRupiah(item.price)}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                  <span className="text-[11px] text-stone-600 block">Saldo pendapatan penjualan Anda:</span>
                  <strong className="text-xl sm:text-2xl font-black text-stone-900 font-mono block mt-1">
                    {formatRupiah(totalNetProfit)}
                  </strong>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Dana hasil penjualan dapat langsung dicairkan ke rekening bank operasional Anda tanpa potongan tambahan.
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

        {/* ── 2. PRODUCTS CATALOG TAB ── */}
        {activeTab === 'PRODUCTS' && (
          <div className="space-y-5">
            
            {/* Header Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Katalog Pakaian Preloved
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Daftar koleksi pakaian preloved yang Anda miliki dan kelola di ClothLoop.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Tambah Pakaian</span>
              </button>
            </div>

            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul pakaian atau brand..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="sm:w-44 px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:border-emerald-700 cursor-pointer"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Wanita">Wanita</option>
                <option value="Pria">Pria</option>
                <option value="Denim & Jeans">Denim & Jeans</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Vintage">Vintage</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-xs">
                <Inbox className="w-10 h-10 mx-auto text-stone-400 mb-2.5" />
                <h4 className="text-sm font-bold text-stone-900">Belum Ada Pakaian di Katalog</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1">
                  Upload pakaian pertama Anda sekarang untuk mulai menjual ke pembeli secara sirkular.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all">
                    <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                      <Image src={item.images[0] || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                        {item.condition}
                      </span>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white text-stone-900 text-[10px] font-mono font-bold shadow-xs">
                        Size {item.size}
                      </span>
                    </div>

                    <div className="p-3.5 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                          {item.brand || 'Thrift Curated'} &bull; {item.category}
                        </span>
                        <h4 className="text-xs font-bold text-stone-900 mt-1 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                          {item.story}
                        </p>
                      </div>

                      <div className="pt-2.5 mt-2.5 border-t border-stone-100">
                        <div className="flex items-center justify-between mb-2.5">
                          <div>
                            <span className="text-[10px] text-stone-500 block">Harga Jual:</span>
                            <strong className="text-xs font-black text-stone-900 font-mono">
                              {formatRupiah(item.price)}
                            </strong>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Tersedia
                          </span>
                        </div>

                        {/* Action buttons for Seller */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                          >
                            <Edit3 size={12} />
                            <span>Edit Detail</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(item.id, item.title)}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-bold transition-all cursor-pointer"
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

        {/* ── 3. ORDERS TAB ── */}
        {activeTab === 'ORDERS' && (
          <div className="space-y-5">
            
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex justify-between items-center">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Pesanan Masuk Preloved
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Pantau pesanan pembeli, kemas pakaian, dan serahkan ke kurir pengiriman.
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-xs">
                <Package className="w-10 h-10 mx-auto text-stone-400 mb-2.5" />
                <h4 className="text-sm font-bold text-stone-900">Belum Ada Pesanan Masuk</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1 leading-relaxed">
                  Pesanan dari pembeli akan otomatis muncul di sini setelah pembeli melakukan checkout.
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
                          {ord.itemTitle || 'Pakaian Preloved'}
                        </h4>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Penerima: <strong>{ord.buyerName || 'Pembeli'}</strong> ({ord.buyerCity || 'Kota Pembeli'}) &bull; {ord.courier || 'ClothLoop Express'}
                        </p>
                        <strong className="text-xs font-black text-stone-900 font-mono block mt-1">
                          {formatRupiah(ord.price || 0)} &bull; Hak Bersih Seller: <span className="text-emerald-800">{formatRupiah(ord.sellerEarnings || Math.round((ord.price || 0) * 0.90))}</span>
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
                          Konfirmasi Selesai & Cairkan Dana
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ── 4. FINANCE TAB ── */}
        {activeTab === 'FINANCE' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Withdrawal Form */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                  Formulir Pencairan Saldo
                </h3>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl">
                  Tersedia: {formatRupiah(availableBalance)}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tarik laba bersih penjualan preloved langsung ke rekening bank atau e-wallet tanpa potongan admin.
              </p>

              <form onSubmit={handleWithdrawSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">Pilih Bank / E-Wallet</label>
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
                  <label className="text-xs font-bold text-stone-800 block mb-1">Nomor Rekening / No. HP</label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Contoh: 8271928192"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">Nama Pemilik Rekening</label>
                  <input
                    type="text"
                    required
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="Sesuai buku tabungan / e-wallet"
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

            {/* Right: Cashflow Summary & Withdrawal History */}
            <div className="lg:col-span-2 space-y-5">
              
              {/* Split & Cashflow Breakdown */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                    Ringkasan Keuangan & Arus Kas Seller
                  </h3>
                  <span className="text-xs font-bold text-emerald-900">
                    Skema Bagi Hasil 90% / 10%
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  90% hasil penjualan pakaian langsung masuk ke saldo bersih Anda, 10% dialokasikan untuk pemeliharaan katalog dan server ClothLoop.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[11px] text-emerald-900 font-bold block">Total Laba Bersih (+)</span>
                    <strong className="text-base sm:text-lg font-black text-emerald-950 font-mono mt-0.5 block">
                      {formatRupiah(totalNetProfit)}
                    </strong>
                    <span className="text-[10px] text-emerald-700">90% dari GMV {formatRupiah(totalGMV)}</span>
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

              {/* Riwayat Penarikan Dana Seller */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                      Riwayat Penarikan Dana ke Rekening (- Keluar)
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Catatan pengiriman saldo laba penjualan seller ke bank atau e-wallet.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-xl font-mono">
                    {withdrawals.length} Transaksi
                  </span>
                </div>

                {withdrawals.length === 0 ? (
                  <div className="text-center py-8 text-stone-500 text-xs">
                    Belum ada riwayat penarikan dana. Ajukan penarikan laba bersih penjualan melalui formulir di samping.
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

      {/* ── MODAL UPLOAD PRODUK PRELOVED ── */}
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
                    Upload Pakaian Preloved Baru
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Produk akan langsung tersimpan di katalog toko Anda.
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

              <form onSubmit={handleUploadSubmit} className="space-y-3.5">
                {/* ── UPLOAD FOTO SECTION ── */}
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <UploadCloud size={14} className="text-amber-800" />
                      Foto Pakaian Preloved
                    </label>
                    <span className="text-[10px] text-stone-500 font-medium">Bisa upload beberapa foto</span>
                  </div>

                  {/* File Upload Zone */}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 hover:border-amber-700 bg-white rounded-xl p-4 cursor-pointer transition-all hover:bg-amber-50/20 group">
                    <ImageIcon className="w-7 h-7 text-stone-400 group-hover:text-amber-800 transition-colors mb-1" />
                    <span className="text-xs font-bold text-stone-800 group-hover:text-amber-900">
                      Pilih / Tarik Foto Pakaian ke Sini
                    </span>
                    <span className="text-[10px] text-stone-500 mt-0.5">Format: JPG, PNG, WEBP (Bisa langsung preview)</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageFileChange(e, false)}
                      className="hidden"
                    />
                  </label>

                  {/* Previews */}
                  {uploadedImages.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-stone-600 block mb-1.5">Foto Terpilih ({uploadedImages.length}):</span>
                      <div className="grid grid-cols-4 gap-2">
                        {uploadedImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-stone-200 group bg-stone-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx, false)}
                              className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                              title="Hapus foto"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* URL Input Fallback */}
                  <div className="pt-1 border-t border-stone-200">
                    <span className="text-[10px] text-stone-500 block mb-1">Atau masukkan URL gambar langsung:</span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-stone-300 text-[11px] text-stone-800 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddUrlImage(false)}
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-[11px] font-bold"
                      >
                        + URL
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Judul Produk Pakaian</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Kemeja Flanel Uniqlo Oversized"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Brand / Merk</label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="Uniqlo, Zara, dsb"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kategori</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                    >
                      <option value="Wanita">Wanita</option>
                      <option value="Pria">Pria</option>
                      <option value="Denim & Jeans">Denim & Jeans</option>
                      <option value="Outerwear">Outerwear</option>
                      <option value="Vintage">Vintage</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kondisi</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                    >
                      <option value="LIKE_NEW">Like New (99%)</option>
                      <option value="GENTLY_USED">Gently Used (90%)</option>
                      <option value="VINTAGE">Vintage</option>
                      <option value="UPCYCLED">Upcycled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Ukuran / Size</label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="M / L / XL"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kota Seller</label>
                    <select
                      value={sellerCity}
                      onChange={(e) => setSellerCity(e.target.value)}
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
                    <label className="block text-xs font-bold text-stone-800 mb-1">Lebar Dada (cm)</label>
                    <input
                      type="number"
                      value={chestWidthCm}
                      onChange={(e) => setChestWidthCm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Panjang Baju (cm)</label>
                    <input
                      type="number"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
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
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Harga Retail Asli (Rp)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Cerita Pakaian / Kondisi Detail</label>
                  <textarea
                    rows={2}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Ceritakan keistimewaan, bahan kain, dan riwayat pakaian ini..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer mt-1"
                >
                  Terbitkan Pakaian ke Katalog
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL EDIT PRODUK PRELOVED ── */}
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
                    Edit Detail Pakaian
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Perbarui harga, ukuran, cerita, atau ganti foto pakaian preloved ini.
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

              <form onSubmit={handleEditSubmit} className="space-y-3.5">
                {/* ── EDIT FOTO SECTION ── */}
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <UploadCloud size={14} className="text-amber-800" />
                      Kelola Foto Pakaian
                    </label>
                    <span className="text-[10px] text-stone-500 font-medium">Bisa tambah atau hapus foto</span>
                  </div>

                  {/* File Upload Zone */}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 hover:border-amber-700 bg-white rounded-xl p-4 cursor-pointer transition-all hover:bg-amber-50/20 group">
                    <ImageIcon className="w-7 h-7 text-stone-400 group-hover:text-amber-800 transition-colors mb-1" />
                    <span className="text-xs font-bold text-stone-800 group-hover:text-amber-900">
                      Upload Foto Tambahan / Pengganti
                    </span>
                    <span className="text-[10px] text-stone-500 mt-0.5">Pilih dari perangkat Anda</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageFileChange(e, true)}
                      className="hidden"
                    />
                  </label>

                  {/* Previews */}
                  {editUploadedImages.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-stone-600 block mb-1.5">Foto Aktif ({editUploadedImages.length}):</span>
                      <div className="grid grid-cols-4 gap-2">
                        {editUploadedImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-stone-200 group bg-stone-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx, true)}
                              className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                              title="Hapus foto"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* URL Input Fallback */}
                  <div className="pt-1 border-t border-stone-200">
                    <span className="text-[10px] text-stone-500 block mb-1">Atau masukkan URL gambar:</span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={editUrlInput}
                        onChange={(e) => setEditUrlInput(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-stone-300 text-[11px] text-stone-800 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddUrlImage(true)}
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-[11px] font-bold cursor-pointer"
                      >
                        + URL
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Judul Produk Pakaian</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Contoh: Kemeja Flanel Uniqlo Oversized"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Brand / Merk</label>
                    <input
                      type="text"
                      value={editBrand}
                      onChange={(e) => setEditBrand(e.target.value)}
                      placeholder="Uniqlo, Zara, dsb"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kategori</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                    >
                      <option value="Wanita">Wanita</option>
                      <option value="Pria">Pria</option>
                      <option value="Denim & Jeans">Denim & Jeans</option>
                      <option value="Outerwear">Outerwear</option>
                      <option value="Vintage">Vintage</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kondisi</label>
                    <select
                      value={editCondition}
                      onChange={(e) => setEditCondition(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                    >
                      <option value="LIKE_NEW">Like New (99%)</option>
                      <option value="GENTLY_USED">Gently Used (90%)</option>
                      <option value="VINTAGE">Vintage</option>
                      <option value="UPCYCLED">Upcycled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Ukuran / Size</label>
                    <input
                      type="text"
                      value={editSize}
                      onChange={(e) => setEditSize(e.target.value)}
                      placeholder="M / L / XL"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Kota Seller</label>
                    <select
                      value={editSellerCity}
                      onChange={(e) => setEditSellerCity(e.target.value)}
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
                    <label className="block text-xs font-bold text-stone-800 mb-1">Lebar Dada (cm)</label>
                    <input
                      type="number"
                      value={editChestWidthCm}
                      onChange={(e) => setEditChestWidthCm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Panjang Baju (cm)</label>
                    <input
                      type="number"
                      value={editLengthCm}
                      onChange={(e) => setEditLengthCm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
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
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Harga Retail Asli (Rp)</label>
                    <input
                      type="number"
                      value={editOriginalPrice}
                      onChange={(e) => setEditOriginalPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Cerita Pakaian / Kondisi Detail</label>
                  <textarea
                    rows={2}
                    value={editStory}
                    onChange={(e) => setEditStory(e.target.value)}
                    placeholder="Ceritakan keistimewaan, bahan kain, dan riwayat pakaian ini..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer mt-1"
                >
                  Simpan Perubahan Pakaian
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
