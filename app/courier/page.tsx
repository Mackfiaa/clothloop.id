'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  MapPin,
  QrCode,
  Wallet,
  CheckCircle2,
  Clock,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Phone,
  PackageCheck,
  AlertCircle,
  Banknote,
  DollarSign,
  ChevronRight,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import RolePortalNavbar from '@/components/portal/RolePortalNavbar';
import QrScannerModal from '@/components/courier/QrScannerModal';
import { useApp } from '@/lib/store';
import {
  CourierProfile,
  PickupTaskItem,
  getCourierProfile,
  saveCourierProfile,
  getCourierTasksForCity,
  completeCourierPickup,
  completeArtisanDelivery,
  requestBankWithdrawal,
  getWithdrawalHistory,
  INDONESIA_MAJOR_CITIES,
  ARTISAN_STUDIO_DIRECTORY
} from '@/lib/supabase/portalData';

export default function CourierPortalPage() {
  const router = useRouter();
  const { currentUser, userProfile, addNotification } = useApp();
  const [courier, setCourier] = useState<CourierProfile>(() => getCourierProfile(userProfile, currentUser));
  const [tasks, setTasks] = useState<PickupTaskItem[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'active' | 'wallet' | 'profile'>('tasks');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Form states for profile/domicile setup
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState(INDONESIA_MAJOR_CITIES[0]);
  const [formDistrict, setFormDistrict] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formPlate, setFormPlate] = useState('');

  // QR Scanner Modal State
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState<'PICKUP_DONOR' | 'DELIVERY_ARTISAN'>('PICKUP_DONOR');
  const [selectedTask, setSelectedTask] = useState<PickupTaskItem | null>(null);

  // Withdrawal state
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawBank, setWithdrawBank] = useState('Bank Central Asia (BCA)');
  const [withdrawNumber, setWithdrawNumber] = useState('');
  const [withdrawName, setWithdrawName] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Sync profile when user profile or auth changes
  useEffect(() => {
    const prof = getCourierProfile(userProfile, currentUser);
    setCourier(prof);
    setWithdrawals(getWithdrawalHistory('COURIER'));
    setFormName(prof.name || userProfile?.full_name || '');
    setFormCity(prof.city || INDONESIA_MAJOR_CITIES[0]);
    setFormDistrict(prof.district || '');
    setFormAddress(prof.address || '');
    setFormPhone(prof.phone || userProfile?.phone || '');
    setFormPlate(prof.vehiclePlate || '');
  }, [userProfile, currentUser]);

  // Load tasks strictly for the courier's confirmed domicile city
  useEffect(() => {
    if (courier.isAddressConfirmed && courier.city) {
      const loadedTasks = getCourierTasksForCity(courier.city);
      setTasks(loadedTasks);
    } else {
      setTasks([]);
    }
  }, [courier.city, courier.isAddressConfirmed]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCity || !formAddress.trim() || !formPhone.trim()) {
      addNotification('warning', 'Data Belum Lengkap', 'Harap lengkapi nama, nomor telepon, kota, dan alamat operasional.');
      return;
    }
    const updated: CourierProfile = {
      ...courier,
      id: currentUser?.id || courier.id,
      name: formName.trim(),
      city: formCity,
      district: formDistrict.trim(),
      address: formAddress.trim(),
      phone: formPhone.trim(),
      vehiclePlate: formPlate.trim(),
      isAddressConfirmed: true,
    };
    await saveCourierProfile(updated);
    setCourier(updated);
    setIsEditingProfile(false);
    addNotification('success', 'Domisili Tersimpan', `Wilayah operasional Kota ${formCity} berhasil dikonfirmasi dan tersimpan.`);
  };

  const handleOpenPickupScanner = (task: PickupTaskItem) => {
    setSelectedTask(task);
    setScannerMode('PICKUP_DONOR');
    setScannerOpen(true);
  };

  const handleOpenDeliveryScanner = (task: PickupTaskItem) => {
    setSelectedTask(task);
    setScannerMode('DELIVERY_ARTISAN');
    setScannerOpen(true);
  };

  const handleScanSuccess = (code: string) => {
    if (!selectedTask) return;

    if (scannerMode === 'PICKUP_DONOR') {
      const res = completeCourierPickup(selectedTask.id, code);
      if (res.success) {
        setCourier(getCourierProfile());
        setTasks(getCourierTasksForCity(courier.city));
        addNotification('success', 'Donasi Terverifikasi', res.message);
      }
    } else {
      const res = completeArtisanDelivery(selectedTask.id, code);
      if (res.success) {
        setCourier(getCourierProfile());
        setTasks(getCourierTasksForCity(courier.city));
        addNotification('success', 'Serah Terima Selesai', res.message);
      }
    }
  };

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(withdrawAmount, 10);
    if (!amt || amt < 50000 || amt > courier.walletBalance) {
      addNotification('warning', 'Penarikan Gagal', 'Pastikan saldo mencukupi (minimal Rp 50.000).');
      return;
    }

    const res = requestBankWithdrawal('COURIER', amt, withdrawBank, withdrawNumber, withdrawName);
    if (res.success) {
      setCourier(getCourierProfile());
      setWithdrawals(getWithdrawalHistory('COURIER'));
      setWithdrawSuccess(true);
      addNotification('success', 'Penarikan Diproses', `Pengajuan penarikan dana sebesar Rp ${amt.toLocaleString('id-ID')} berhasil.`);
      setTimeout(() => {
        setWithdrawSuccess(false);
        setWithdrawAmount('');
        setWithdrawNumber('');
        setWithdrawName('');
      }, 3000);
    }
  };

  const pendingPickupTasks = tasks.filter((t) => t.status === 'READY_FOR_PICKUP');
  const inTransitTasks = tasks.filter((t) => t.status === 'IN_TRANSIT');
  const completedTasks = tasks.filter((t) => t.status === 'DELIVERED');

  const assignedStudio = ARTISAN_STUDIO_DIRECTORY.find((s) => s.city.toLowerCase() === (courier.city || '').toLowerCase()) || ARTISAN_STUDIO_DIRECTORY[0];

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-900 pb-24">
      <RolePortalNavbar
        role="KURIR"
        roleTitle="Mitra Kurir Jemput"
        userEmail={courier.phone ? `${courier.phone} (Kurir)` : userProfile?.email || 'kurir@clothloop.id'}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
        customTabs={[
          { id: 'tasks', label: 'Tugas Jemput Donasi', count: pendingPickupTasks.length },
          { id: 'active', label: 'Dalam Pengiriman Studio', count: inTransitTasks.length },
          { id: 'wallet', label: 'Dompet Insentif' },
          { id: 'profile', label: 'Wilayah Kerja & Domisili' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* DOMICILE / ADDRESS BANNER */}
        {!courier.isAddressConfirmed || isEditingProfile ? (
          <div className="mb-8 bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">
                  Kunci Wilayah Operasional
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 mt-1 font-serif">
                  Tentukan Kota Domisili & Pangkalan Kurir
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
                  Sistem ClothLoop hanya menampilkan penjemputan pakaian donasi di kota yang sama dengan domisili Anda untuk efisiensi rute dan serah-terima ke Studio Perajin lokal.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Nama Lengkap Kurir</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Nama sesuai identitas"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white text-stone-900 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Nomor WhatsApp Aktif</label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white text-stone-900 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Kota Wilayah Kerja (Kunci Kota)</label>
                  <select
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white font-bold text-xs text-stone-900"
                  >
                    {INDONESIA_MAJOR_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Kecamatan Domisili</label>
                  <input
                    type="text"
                    required
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    placeholder="Contoh: Kebayoran Baru"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white text-stone-900 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Plat Nomor Kendaraan</label>
                  <input
                    type="text"
                    required
                    value={formPlate}
                    onChange={(e) => setFormPlate(e.target.value)}
                    placeholder="Contoh: B 4821 SBK"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white text-stone-900 text-xs font-medium font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Alamat Lengkap Titik Pangkal</label>
                <textarea
                  rows={2}
                  required
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW, dan patokan terdekat"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white text-stone-900 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-1">
                {courier.isAddressConfirmed && (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-100"
                  >
                    Batal
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Simpan & Kunci Wilayah Kota
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mb-6 bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 rounded-3xl p-5 sm:p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs border border-emerald-900/60">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 text-emerald-300 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Wilayah Operasional Aktif
                  </span>
                  <span className="text-xs text-stone-200 font-mono font-bold bg-white/10 px-2 py-0.5 rounded">
                    {courier.vehiclePlate || 'Kendaraan Terdaftar'}
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold font-serif mt-0.5 text-white">
                  Kota {courier.city} • <span className="font-sans font-normal text-sm text-emerald-200">{courier.district}</span>
                </h1>
                <p className="text-xs text-stone-300 mt-0.5 max-w-xl leading-relaxed">
                  {courier.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors cursor-pointer"
              >
                Ganti Kota
              </button>
              <div className="bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-400/30 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-300" />
                <span className="text-xs text-stone-200 font-medium">Saldo:</span>
                <span className="text-sm font-bold text-emerald-200">Rp {courier.walletBalance.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Daftar Penjemputan Donasi {courier.city ? `(Kota ${courier.city})` : ''}
                </h2>
                <p className="text-stone-600 text-xs mt-0.5">
                  Pesanan jemput donasi pakaian dari donatur di Kota {courier.city || 'Anda'}.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-200 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Insentif tetap: <strong className="text-emerald-950 font-black">Rp 15.000 / alamat</strong></span>
              </div>
            </div>

            {pendingPickupTasks.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-3xl p-10 text-center shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 mx-auto flex items-center justify-center mb-2.5">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Belum Ada Permintaan Jemput Baju Baru</h3>
                <p className="text-stone-600 text-xs max-w-md mx-auto mt-1 leading-relaxed">
                  Permintaan jemput donasi pakaian di Kota {courier.city || 'Anda'} akan muncul otomatis di sini ketika donatur melakukan booking penjemputan.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingPickupTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-emerald-300 transition-colors relative overflow-hidden flex flex-col justify-between shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 font-mono">
                            {task.orderId}
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {task.estimatedWeight}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-stone-900 font-serif mt-1">
                          {task.userName}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-0.5 font-medium">
                          <Phone className="w-3 h-3 text-stone-500" />
                          <span>{task.userPhone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone-600 font-medium block">Insentif</span>
                        <span className="text-sm font-black text-emerald-800">
                          +Rp {task.earningsFee.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs space-y-1.5 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-stone-900 text-xs leading-snug">{task.userAddress}</p>
                          <p className="text-stone-600 text-[11px] mt-0.5">Kota {task.userCity}</p>
                        </div>
                      </div>
                      <div className="border-t border-stone-200 pt-1.5 flex items-center justify-between text-stone-700 text-[11px]">
                        <span className="font-medium">Isi Paket:</span>
                        <span className="font-bold text-stone-900">{task.itemSummary}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPickupScanner(task)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Scan QR Donatur / Input Kode</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: IN TRANSIT / ACTIVE DELIVERIES TO ARTISAN */}
        {activeTab === 'active' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                Paket Dalam Pengantaran ke Studio Perajin
              </h2>
              <p className="text-stone-600 text-xs mt-0.5">
                Bawa paket pakaian donasi yang telah Anda jemput ke Studio Perajin ClothLoop di Kota {courier.city}.
              </p>
            </div>

            {/* ASSIGNED STUDIO BANNER */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-emerald-800 font-bold tracking-wide">
                    Studio Perajin Tujuan ({assignedStudio.city})
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 font-serif mt-0.5">
                    {assignedStudio.name} ({assignedStudio.brandName})
                  </h3>
                  <p className="text-stone-600 text-xs mt-0.5">
                    {assignedStudio.address} • PIC: {assignedStudio.contactPerson} ({assignedStudio.phone})
                  </p>
                </div>
              </div>
              <div className="text-xs text-stone-700 bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200 shrink-0">
                Kode Verifikasi: <strong className="text-stone-900 font-mono font-bold text-xs ml-1">{assignedStudio.verificationCode}</strong>
              </div>
            </div>

            {inTransitTasks.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-3xl p-10 text-center shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 mx-auto flex items-center justify-center mb-2.5">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Tidak Ada Paket Dalam Pengantaran</h3>
                <p className="text-stone-600 text-xs max-w-md mx-auto mt-1 leading-relaxed">
                  Ambil tugas penjemputan donasi terlebih dahulu di tab &quot;Tugas Jemput Donasi&quot; untuk memulai pengantaran ke studio.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inTransitTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border-2 border-emerald-600/30 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono">
                            {task.orderId}
                          </span>
                          <span className="text-[11px] text-amber-900 font-bold">
                            Menuju Studio Perajin
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-stone-900 font-serif mt-1">
                          Donatur: {task.userName}
                        </h4>
                        <p className="text-xs text-stone-600 mt-0.5">
                          Asal: {task.userAddress}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone-600 block">Insentif</span>
                        <span className="text-sm font-black text-emerald-800">
                          Rp {task.earningsFee.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-200/80 text-xs space-y-1.5 mb-4">
                      <div className="flex items-center justify-between text-stone-800">
                        <span className="text-stone-600 font-medium">Estimasi Bobot:</span>
                        <span className="font-bold text-stone-900">{task.estimatedWeight}</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-800">
                        <span className="text-stone-600 font-medium">Isi Pakaian:</span>
                        <span className="font-bold text-stone-900">{task.itemSummary}</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-800">
                        <span className="text-stone-600 font-medium">Studio Drop:</span>
                        <span className="font-bold text-emerald-950">{assignedStudio.name}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenDeliveryScanner(task)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Scan QR Studio Perajin ({assignedStudio.brandName})</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: WALLET & WITHDRAWAL */}
        {activeTab === 'wallet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-5">
              {/* Balance Card with High Contrast */}
              <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 rounded-3xl p-5 text-white relative overflow-hidden shadow-xs border border-emerald-900">
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-300 font-bold">Dompet Insentif Kurir</span>
                    <Wallet className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div className="text-2xl font-black font-serif mt-2 text-white">
                    Rp {courier.walletBalance.toLocaleString('id-ID')}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-stone-200 font-medium">
                    <span>Total Jemputan Selesai:</span>
                    <strong className="font-bold text-emerald-200 text-xs">{courier.totalCompletedPickups} Alamat</strong>
                  </div>
                </div>
              </div>

              {/* Bank Withdrawal Form */}
              <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs">
                <h3 className="text-sm font-bold text-stone-900 font-serif mb-1">
                  Tarik Saldo ke Rekening Bank
                </h3>
                <p className="text-stone-600 text-xs mb-3.5 leading-relaxed">
                  Minimal penarikan insentif Rp 50.000. Transfer instan tanpa potongan admin.
                </p>

                {withdrawSuccess && (
                  <div className="mb-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl p-2.5 text-xs flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Pengajuan penarikan dana berhasil diproses!</span>
                  </div>
                )}

                <form onSubmit={handleWithdrawalSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Pilih Bank Tujuan</label>
                    <select
                      value={withdrawBank}
                      onChange={(e) => setWithdrawBank(e.target.value)}
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
                    <label className="block text-xs font-bold text-stone-800 mb-1">Nomor Rekening / No. HP E-Wallet</label>
                    <input
                      type="text"
                      required
                      value={withdrawNumber}
                      onChange={(e) => setWithdrawNumber(e.target.value)}
                      placeholder="Contoh: 8271928192"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Nama Pemilik Rekening</label>
                    <input
                      type="text"
                      required
                      value={withdrawName}
                      onChange={(e) => setWithdrawName(e.target.value)}
                      placeholder="Sesuai buku tabungan"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Nominal Penarikan (Rp)</label>
                    <input
                      type="number"
                      required
                      min={50000}
                      max={courier.walletBalance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Contoh: 50000"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 font-medium"
                    />
                  </div>

                    <button
                      type="submit"
                      disabled={courier.walletBalance < 50000}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs mt-1 transition-colors cursor-pointer ${
                        courier.walletBalance >= 50000
                          ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                          : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      Tarik Dana Sekarang
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Earnings Income & Withdrawal History */}
              <div className="lg:col-span-2 space-y-5">
                {/* 1. Riwayat Penjemputan Selesai (Masuk) */}
                <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-stone-100">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 font-serif">
                        Riwayat Insentif Penjemputan Selesai (+ Masuk)
                      </h3>
                      <p className="text-stone-600 text-xs mt-0.5">
                        Daftar donasi yang telah sukses Anda serahkan ke Studio Perajin ClothLoop.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl">
                      {completedTasks.length} Jemputan
                    </span>
                  </div>

                  {completedTasks.length === 0 ? (
                    <div className="text-center py-8 text-stone-500 text-xs">
                      Belum ada penjemputan donasi yang diselesaikan. Insentif flat Rp 15.000 akan otomatis masuk setelah penyerahan kain ke studio terverifikasi.
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-100">
                      {completedTasks.map((t) => (
                        <div key={t.id} className="py-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-stone-900 font-mono">{t.orderId}</span>
                                <span className="text-xs text-emerald-800 font-bold">
                                  Selesai & Diserahkan
                                </span>
                              </div>
                              <p className="text-xs text-stone-700 mt-0.5 font-medium">
                                Donatur: {t.userName} • {t.itemSummary}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black text-emerald-800">
                              +Rp {t.earningsFee.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] text-stone-500 block font-medium">Insentif Masuk</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Riwayat Penarikan Saldo Dompet (Keluar) */}
                <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-stone-100">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 font-serif">
                        Riwayat Penarikan Dana ke Rekening (- Keluar)
                      </h3>
                      <p className="text-stone-600 text-xs mt-0.5">
                        Catatan pengiriman saldo insentif kurir ke bank atau e-wallet.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-xl font-mono">
                      {withdrawals.length} Transaksi
                    </span>
                  </div>

                  {withdrawals.length === 0 ? (
                    <div className="text-center py-8 text-stone-500 text-xs">
                      Belum ada riwayat penarikan dana. Ajukan penarikan saldo insentif melalui formulir di samping.
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-100">
                      {withdrawals.map((w) => (
                        <div key={w.id} className="py-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
                              <Banknote className="w-4 h-4" />
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
                              -Rp {Number(w.amount).toLocaleString('id-ID')}
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

        {/* TAB CONTENT: PROFILE / DOMICILE */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 max-w-2xl shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif mb-1">
              Data Profil & Domisili Kurir
            </h2>
            <p className="text-stone-600 text-xs mb-5 leading-relaxed">
              Informasi kurir dan verifikasi wilayah operasional penjemputan ClothLoop. Data tersinkronisasi dengan akun Anda.
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Nama Lengkap</span>
                <span className="font-bold text-stone-900">{courier.name || '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Kota Domisili (Wilayah Kunci)</span>
                <span className="font-bold text-emerald-900">{courier.city ? `Kota ${courier.city}` : '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Kecamatan</span>
                <span className="font-bold text-stone-900">{courier.district || '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Alamat Pangkalan</span>
                <span className="font-semibold text-stone-900 text-right max-w-xs">{courier.address || '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Nomor WhatsApp</span>
                <span className="font-bold text-stone-900">{courier.phone || '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Plat Kendaraan</span>
                <span className="font-bold text-stone-900 font-mono">{courier.vehiclePlate || '-'}</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-stone-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Ubah Alamat / Domisili Kota
              </button>
            </div>
          </div>
        )}
      </main>

      {/* QR SCANNER & MANUAL CODE MODAL */}
      <QrScannerModal
        isOpen={scannerOpen}
        onClose={() => {
          setScannerOpen(false);
          setSelectedTask(null);
        }}
        onScanSuccess={handleScanSuccess}
        mode={scannerMode}
        task={selectedTask}
        targetStudio={assignedStudio}
      />
    </div>
  );
}
