'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  QrCode, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Keyboard, 
  ArrowRight,
  Package,
  Building2,
  Coins
} from 'lucide-react';
import { PickupTaskItem, ArtisanStudioItem } from '@/lib/supabase/portalData';

export interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'PICKUP_DONOR' | 'DELIVERY_ARTISAN';
  task?: PickupTaskItem | null;
  targetStudio?: ArtisanStudioItem | null;
  defaultCode?: string;
  onScanSuccess?: (code: string) => void;
  onVerifySuccess?: (code: string, mode: 'PICKUP_DONOR' | 'DELIVERY_ARTISAN') => void;
}

export function QrScannerModal({
  isOpen,
  onClose,
  mode,
  task,
  targetStudio,
  defaultCode = '',
  onScanSuccess,
  onVerifySuccess,
}: QrScannerModalProps) {
  const [activeTab, setActiveTab] = useState<'CAMERA' | 'MANUAL'>('CAMERA');
  const [manualCode, setManualCode] = useState(defaultCode);
  const [isScanning, setIsScanning] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setManualCode(defaultCode || (mode === 'PICKUP_DONOR' ? task?.verificationCode || '' : targetStudio?.verificationCode || ''));
      setErrorMsg(null);
      setSuccessResult(null);
      setIsScanning(true);
      setActiveTab('CAMERA');
    }
  }, [isOpen, defaultCode, mode, task, targetStudio]);

  if (!isOpen) return null;

  const triggerSuccess = (code: string) => {
    setSuccessResult(code);
    setIsScanning(false);
    setTimeout(() => {
      if (onScanSuccess) {
        onScanSuccess(code);
      }
      if (onVerifySuccess) {
        onVerifySuccess(code, mode);
      }
      onClose();
    }, 1200);
  };

  const handleSimulateCameraScan = (code: string) => {
    triggerSuccess(code);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) {
      setErrorMsg('Mohon masukkan kode verifikasi terlebih dahulu');
      return;
    }
    triggerSuccess(manualCode.trim().toUpperCase());
  };

  const samplePickupCode = task?.verificationCode || 'PICKUP-9041';
  const sampleStudioCode = targetStudio?.verificationCode || 'AS-JKT-882';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200"
      >
        {/* Modal Header */}
        <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl ${mode === 'PICKUP_DONOR' ? 'bg-emerald-50 text-emerald-800' : 'bg-purple-50 text-purple-800'}`}>
              <QrCode size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 leading-tight">
                {mode === 'PICKUP_DONOR' ? 'Scan QR Donatur Pakaian' : 'Scan QR Studio Perajin'}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {mode === 'PICKUP_DONOR' 
                  ? 'Konfirmasi fisik penjemputan donasi di alamat warga'
                  : 'Konfirmasi penyerahan bahan baku tekstil ke studio'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher: Camera vs Manual Input */}
        <div className="px-5 pt-3">
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('CAMERA')}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'CAMERA' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Camera size={14} />
              <span>Kamera QR Scanner</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('MANUAL')}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'MANUAL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Keyboard size={14} />
              <span>Input Manual Kode</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successResult && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-3 animate-fade-in">
              <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-xs">Verifikasi Berhasil!</p>
                <p className="text-[11px] text-emerald-700 font-mono">Kode: {successResult}</p>
              </div>
            </div>
          )}

          {activeTab === 'CAMERA' ? (
            <div className="space-y-4">
              {/* Simulated Camera Viewfinder */}
              <div className="relative aspect-square max-h-[220px] bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-emerald-500/40">
                {/* Scanning Laser Animation */}
                {isScanning && !successResult && (
                  <motion.div
                    animate={{ y: [-90, 90, -90] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="absolute w-4/5 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(52,211,153,0.8)] z-10"
                  />
                )}

                {/* Target Corners */}
                <div className="w-40 h-40 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center relative">
                  <span className="text-[11px] font-mono text-emerald-300/80 tracking-widest uppercase">
                    Arahkan ke QR Code
                  </span>
                </div>
              </div>

              {/* One-Click Quick Scan Simulation */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Simulasi Scan Kode Cepat:</span>
                  <span className="text-[10px] text-slate-400">Klik untuk test</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSimulateCameraScan(mode === 'PICKUP_DONOR' ? samplePickupCode : sampleStudioCode)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white font-mono font-bold text-xs hover:bg-emerald-900 transition-colors shadow-xs"
                  >
                    Scan Kode: {mode === 'PICKUP_DONOR' ? samplePickupCode : sampleStudioCode}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4 py-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {mode === 'PICKUP_DONOR' ? 'Kode Verifikasi Booking Donatur' : 'Kode QR Studio Perajin'}
                </label>
                <input
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                  placeholder={mode === 'PICKUP_DONOR' ? 'Contoh: PICKUP-9041' : 'Contoh: AS-JKT-882'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50"
                  autoFocus
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {mode === 'PICKUP_DONOR' 
                    ? 'Mintalah kode booking yang tertera pada aplikasi donatur.' 
                    : 'Mintalah kode studio yang tertera pada poster / portal perajin penerima.'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Konfirmasi & Selesaikan Tugas</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

        </div>
      </motion.div>
    </div>
  );
}

export default QrScannerModal;
