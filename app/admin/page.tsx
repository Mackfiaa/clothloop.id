'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Users,
  Store,
  Palette,
  Truck,
  DollarSign,
  TrendingUp,
  Inbox,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Search,
  Filter,
  BarChart3,
  Layers,
  MapPin,
  Building2,
  Lock
} from 'lucide-react';
import RolePortalNavbar from '@/components/portal/RolePortalNavbar';
import {
  getAdminStats,
  getDropBoxApplications,
  updateDropBoxApplicationStatus,
  DropBoxApplication,
  getAllMarketItemsWithSellers,
  getAllCraftProductsWithArtisans,
  getCourierTasks,
  ARTISAN_STUDIO_DIRECTORY
} from '@/lib/supabase/portalData';
import { formatRupiah } from '@/lib/utils';

export default function AdminPortalPage() {
  const router = useRouter();
  const [stats, setStats] = useState(getAdminStats());
  const [activeTab, setActiveTab] = useState<'overview' | 'finance' | 'dropbox' | 'tables'>('overview');
  const [dropboxApps, setDropboxApps] = useState<DropBoxApplication[]>([]);
  const [selectedTable, setSelectedTable] = useState<'sellers' | 'artisans' | 'couriers' | 'dropbox'>('sellers');
  const [dropboxFilter, setDropboxFilter] = useState<'ALL' | 'PENDING' | 'SURVEY' | 'APPROVED' | 'REJECTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Preloaded data for explorer
  const [marketItems, setMarketItems] = useState<any[]>([]);
  const [craftProducts, setCraftProducts] = useState<any[]>([]);
  const [courierTasks, setCourierTasks] = useState<any[]>([]);

  const refreshAllData = React.useCallback(() => {
    setStats(getAdminStats());
    setDropboxApps(getDropBoxApplications());
    setMarketItems(getAllMarketItemsWithSellers());
    setCraftProducts(getAllCraftProductsWithArtisans());
    setCourierTasks(getCourierTasks());
  }, []);

  useEffect(() => {
    refreshAllData();

    const handleSync = () => refreshAllData();
    window.addEventListener('storage', handleSync);
    window.addEventListener('focus', handleSync);
    const interval = setInterval(refreshAllData, 2500);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('focus', handleSync);
      clearInterval(interval);
    };
  }, [refreshAllData]);

  const handleUpdateAppStatus = (id: string, status: DropBoxApplication['status']) => {
    updateDropBoxApplicationStatus(id, status);
    refreshAllData();
  };

  const pendingApps = dropboxApps.filter((a) => a.status === 'PENDING');
  const surveyApps = dropboxApps.filter((a) => a.status === 'SURVEY');
  const approvedApps = dropboxApps.filter((a) => a.status === 'APPROVED');
  const rejectedApps = dropboxApps.filter((a) => a.status === 'REJECTED');

  const filteredDropboxApps = dropboxApps.filter((a) => {
    if (dropboxFilter === 'ALL') return true;
    return a.status === dropboxFilter;
  });

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-900 pb-24">
      <RolePortalNavbar
        role="ADMIN"
        roleTitle="Master Admin ClothLoop"
        userEmail="admin@clothloop.id"
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
        customTabs={[
          { id: 'overview', label: 'Ringkasan Ekosistem' },
          { id: 'finance', label: 'Keuangan & Split Bagi Hasil' },
          { id: 'dropbox', label: 'Verifikasi Mitra Drop-Box', count: pendingApps.length + surveyApps.length },
          { id: 'tables', label: 'Eksplor Data Master' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-5 sm:space-y-6">
        {/* TOP ADMIN BANNER - HIGH CONTRAST DARK WITH CRISP LIGHT TEXT */}
        <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 rounded-3xl p-4 sm:p-6 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5 border border-emerald-900/60">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 text-emerald-300 shrink-0">
              <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Hak Akses Super Admin
                </span>
                <span className="text-[10px] sm:text-xs text-stone-300 font-medium hidden sm:inline">&bull; Pusat Kendali Sirkularitas</span>
              </div>
              <h1 className="text-base sm:text-xl font-bold font-serif mt-0.5 sm:mt-1 text-white">
                ClothLoop Central Control
              </h1>
              <p className="text-stone-300 text-[11px] sm:text-xs mt-0.5 max-w-xl leading-relaxed">
                Monitoring 4 entitas pengguna: Donatur/Pembeli, Seller Preloved, UMKM Kerajinan Upcycling, dan Mitra Kurir Jemput.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
            <div className="bg-emerald-500/20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-emerald-400/30 text-left sm:text-right w-full sm:w-auto">
              <span className="text-[10px] sm:text-xs text-stone-300 font-medium block">Total GMV Ekosistem</span>
              <span className="text-base sm:text-lg font-black text-emerald-200 font-mono">
                {formatRupiah(stats.finance.totalGMV)}
              </span>
            </div>
          </div>
        </div>

        {/* TAB 1: ECOSYSTEM OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 4 Role Metric Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Role 1: Donatur / Users */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-900">
                    Donatur & Pembeli
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-black font-serif text-stone-900">
                  {stats.donors.totalDonors.toLocaleString('id-ID')} Akun
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-stone-100 space-y-1 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Tekstil Terkumpul:</span>
                    <strong className="text-stone-900 font-bold">{stats.donors.totalWeightRecycledKg} Kg</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">CO₂e Dicegah:</span>
                    <strong className="text-emerald-800 font-bold">{stats.donors.co2PreventedKg} kg CO₂e</strong>
                  </div>
                </div>
              </div>

              {/* Role 2: Seller Preloved */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-900">
                    Seller Preloved
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                    <Store className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-black font-serif text-stone-900">
                  {stats.sellers.totalSellers.toLocaleString('id-ID')} Mitra
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-stone-100 space-y-1 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Pakaian Terdaftar:</span>
                    <strong className="text-stone-900 font-bold">{stats.sellers.activeListings} Item</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Pakaian Terjual:</span>
                    <strong className="text-blue-800 font-bold">{stats.sellers.totalSoldItems} Pcs</strong>
                  </div>
                </div>
              </div>

              {/* Role 3: UMKM Kerajinan */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-900">
                    Studio Kerajinan Upcycling
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Palette className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-black font-serif text-stone-900">
                  {stats.crafts.totalArtisans.toLocaleString('id-ID')} Studio
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-stone-100 space-y-1 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Bahan Baku Masuk:</span>
                    <strong className="text-stone-900 font-bold">{stats.crafts.totalRawMaterialsKg} Kg</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Kerajinan Terjual:</span>
                    <strong className="text-amber-800 font-bold">{stats.crafts.totalCraftsSold} Karya</strong>
                  </div>
                </div>
              </div>

              {/* Role 4: Mitra Kurir */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-purple-900">
                    Mitra Kurir Jemput
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-black font-serif text-stone-900">
                  {stats.couriers.totalActiveCouriers.toLocaleString('id-ID')} Kurir
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-stone-100 space-y-1 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Penjemputan Selesai:</span>
                    <strong className="text-stone-900 font-bold">{stats.couriers.completedPickups} Titik</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Pending Drop Box Applications */}
              <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                      Aplikasi Mitra Drop Box Baru (Menunggu Survei)
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">Pengajuan baru yang siap dijadwalkan survei lokasi.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('dropbox');
                      setDropboxFilter('PENDING');
                    }}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer bg-transparent border-none"
                  >
                    Lihat ({pendingApps.length})
                  </button>
                </div>

                {pendingApps.length === 0 ? (
                  <div className="text-center py-8 text-stone-500 text-xs">
                    Tidak ada permohonan baru yang menunggu survei.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingApps.map((app) => (
                      <div key={app.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">{app.businessName}</h4>
                          <p className="text-[11px] text-stone-600 mt-0.5">
                            {app.businessType} • Kota {app.city} • PIC: {app.picName} ({app.picPhone})
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateAppStatus(app.id, 'SURVEY')}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            Survei Lokasi
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateAppStatus(app.id, 'REJECTED')}
                            className="px-3 py-1.5 rounded-xl border border-stone-300 text-rose-800 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Tolak
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Quick Operational Status */}
              <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif pb-3 border-b border-stone-100">
                  Transparansi Operasional Sirkular 2026
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex justify-between items-center">
                    <div>
                      <strong className="text-emerald-950 font-bold block">Skema Bagi Hasil: Seller 90% & Perajin 60%</strong>
                      <span className="text-emerald-900 text-[11px]">Seller Preloved: 90% (10% platform fee) • Perajin Upcycling: 60% (40% platform & pasokan bahan baku).</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-900">Aktif</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                    <div>
                      <strong className="text-stone-900 font-bold block">Insentif & Wilayah Kurir Jemput</strong>
                      <span className="text-stone-600 text-[11px]">Tarif flat Rp 15.000/titik. Beroperasi khusus dalam 1 kota domisili lokal (tanpa antarkota).</span>
                    </div>
                    <span className="text-xs font-bold text-stone-700">Lokal / 1 Kota</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FINANCIAL & SPLIT SHARING */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 font-serif mb-1">
                Laporan Keuangan & Split Bagi Hasil Ekosistem
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Rincian pembagian pendapatan dari transaksi Preloved (90% Seller / 10% Platform) dan Produk Kerajinan Upcycling (60% Perajin / 40% Platform).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-xs text-stone-600 font-medium">Total GMV Ekosistem</span>
                  <strong className="text-xl font-black text-stone-900 font-mono block mt-1">
                    {formatRupiah(stats.finance.totalGMV)}
                  </strong>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs text-emerald-900 font-medium">Pendapatan Platform ClothLoop</span>
                  <strong className="text-xl font-black text-emerald-950 font-mono block mt-1">
                    {formatRupiah(stats.finance.platformCommission)}
                  </strong>
                  <span className="text-[10px] text-emerald-800 mt-0.5 block">10% GMV Preloved + 40% GMV Kerajinan</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-xs text-stone-600 font-medium">Total Payout Mitra & Merchant</span>
                  <strong className="text-xl font-black text-stone-900 font-mono block mt-1">
                    {formatRupiah(stats.finance.sellerPayouts)}
                  </strong>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">90% Payout Seller + 60% Payout Perajin</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DROP BOX APPLICATIONS & SURVEY VERIFICATION */}
        {activeTab === 'dropbox' && (
          <div className="space-y-5">
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Verifikasi & Survei Permohonan Mitra Drop Box
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Kelola pendaftaran titik drop box dari halaman web publik: jadwalkan survei fisik lalu setujui penempatan kotak.
                </p>
              </div>

              {/* Status Filter Sub-Tabs */}
              <div className="flex gap-1.5 overflow-x-auto bg-stone-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setDropboxFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    dropboxFilter === 'ALL' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Semua ({dropboxApps.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDropboxFilter('PENDING')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    dropboxFilter === 'PENDING' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Menunggu Survei ({pendingApps.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDropboxFilter('SURVEY')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    dropboxFilter === 'SURVEY' ? 'bg-blue-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Tahap Survei ({surveyApps.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDropboxFilter('APPROVED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    dropboxFilter === 'APPROVED' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Disetujui ({approvedApps.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDropboxFilter('REJECTED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    dropboxFilter === 'REJECTED' ? 'bg-rose-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Ditolak ({rejectedApps.length})
                </button>
              </div>
            </div>

            {filteredDropboxApps.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center shadow-xs text-xs text-stone-500">
                Tidak ada pengajuan mitra drop-box pada kategori ini.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDropboxApps.map((app) => (
                  <div key={app.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-stone-900">{app.businessName}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono ${
                          app.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-900'
                            : app.status === 'SURVEY'
                            ? 'bg-blue-100 text-blue-900'
                            : app.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}>
                          {app.status === 'PENDING' ? 'Menunggu Survei' : app.status === 'SURVEY' ? 'Tahap Survei Lokasi' : app.status === 'APPROVED' ? 'Disetujui & Aktif' : 'Ditolak'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {app.businessType} • {app.address}, Kota {app.city}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        PIC: <strong className="text-stone-800 font-bold">{app.picName}</strong> • WhatsApp: <strong className="text-stone-800 font-bold">{app.picPhone}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* PENDING: Pilihan Survei & Tolak */}
                      {app.status === 'PENDING' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleUpdateAppStatus(app.id, 'SURVEY')}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            Jadwalkan Survei
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateAppStatus(app.id, 'REJECTED')}
                            className="px-3.5 py-1.5 rounded-xl border border-stone-300 text-rose-800 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Tolak
                          </button>
                        </>
                      )}

                      {/* SURVEY: Pilihan Setujui (Approve) & Tolak */}
                      {app.status === 'SURVEY' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleUpdateAppStatus(app.id, 'APPROVED')}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            Setujui Titik Drop-Box
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateAppStatus(app.id, 'REJECTED')}
                            className="px-3.5 py-1.5 rounded-xl border border-stone-300 text-rose-800 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Tolak
                          </button>
                        </>
                      )}

                      {/* APPROVED: Status Aktif */}
                      {app.status === 'APPROVED' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                            ✓ Titik Kumpul Aktif
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateAppStatus(app.id, 'REJECTED')}
                            className="px-2.5 py-1 rounded-lg border border-stone-200 text-stone-500 hover:text-rose-700 hover:bg-stone-50 text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            Nonaktifkan
                          </button>
                        </div>
                      )}

                      {/* REJECTED: Option to Re-evaluate */}
                      {app.status === 'REJECTED' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateAppStatus(app.id, 'SURVEY')}
                          className="px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Tinjau Ulang & Survei
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MASTER DATA EXPLORER */}
        {activeTab === 'tables' && (
          <div className="space-y-5">
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Eksplor Data Master Ekosistem
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Tinjau database katalog pakaian preloved, kerajinan upcycling, dan log tugas kurir.
                </p>
              </div>

              <div className="flex gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setSelectedTable('sellers')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    selectedTable === 'sellers' ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  Katalog Preloved ({marketItems.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTable('artisans')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    selectedTable === 'artisans' ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  Katalog Craft ({craftProducts.length})
                </button>
              </div>
            </div>

            {selectedTable === 'sellers' && (
              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
                {marketItems.length === 0 ? (
                  <div className="text-center py-10 text-stone-500 text-xs">
                    Belum ada pakaian yang diupload oleh seller.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 text-xs">
                    {marketItems.map((item) => (
                      <div key={item.id} className="p-4 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-stone-900 block">{item.title}</span>
                          <span className="text-stone-500">{item.brand} • Size {item.size} • {item.sellerCity}</span>
                        </div>
                        <strong className="text-xs font-mono font-bold text-stone-900">
                          {formatRupiah(item.price)}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedTable === 'artisans' && (
              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
                {craftProducts.length === 0 ? (
                  <div className="text-center py-10 text-stone-500 text-xs">
                    Belum ada karya kerajinan yang diupload oleh perajin.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 text-xs">
                    {craftProducts.map((p) => (
                      <div key={p.id} className="p-4 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-stone-900 block">{p.title}</span>
                          <span className="text-stone-500">{p.technique} • {p.artisanStudio} ({p.artisanCity})</span>
                        </div>
                        <strong className="text-xs font-mono font-bold text-stone-900">
                          {formatRupiah(p.price)}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
