'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { 
  LogOut, 
  ShoppingBag, 
  Scissors, 
  Truck, 
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { UserRole } from '@/lib/types';

export interface RolePortalNavbarProps {
  role: UserRole;
  portalTitle?: string;
  roleTitle?: string;
  badgeLabel?: string;
  userEmail?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  tabs?: { id: string; label: string; count?: number }[];
  customTabs?: { id: string; label: string; count?: number }[];
}

export function RolePortalNavbar({
  role,
  portalTitle,
  roleTitle,
  badgeLabel,
  userEmail,
  activeTab,
  onTabChange,
  tabs,
  customTabs,
}: RolePortalNavbarProps) {
  const { currentUser, userProfile, signOut } = useApp();
  const router = useRouter();

  const title = roleTitle || portalTitle || 'Portal Mitra ClothLoop';
  const tabList = customTabs || tabs || [];

  const getRoleIcon = () => {
    switch (role) {
      case 'SELLER':
        return <ShoppingBag className="w-5 h-5 text-amber-300" />;
      case 'UMKM':
        return <Scissors className="w-5 h-5 text-emerald-300" />;
      case 'KURIR':
        return <Truck className="w-5 h-5 text-purple-300" />;
      case 'ADMIN':
        return <ShieldAlert className="w-5 h-5 text-rose-300" />;
      default:
        return <UserCheck className="w-5 h-5 text-emerald-300" />;
    }
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case 'SELLER':
        return 'text-amber-300';
      case 'UMKM':
        return 'text-emerald-300';
      case 'KURIR':
        return 'text-yellow-300';
      case 'ADMIN':
        return 'text-amber-300';
      default:
        return 'text-emerald-300';
    }
  };

  const getRoleBadgeText = () => {
    switch (role) {
      case 'SELLER':
        return badgeLabel || 'Seller Preloved';
      case 'UMKM':
        return badgeLabel || 'Studio Perajin';
      case 'KURIR':
        return badgeLabel || 'Mitra Kurir Jemput';
      case 'ADMIN':
        return badgeLabel || 'Super Admin';
      default:
        return badgeLabel || 'Member Terdaftar';
    }
  };

  const badgeText = getRoleBadgeText();
  const badgeColor = getRoleBadgeColor();
  const displayEmail = userEmail || currentUser?.email || 'portal@clothloop.id';

  const handleLogout = async () => {
    await signOut();
    router.push('/auth/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand & Portal Info */}
          <div className="flex items-center gap-3.5">
            <Link href="/" className="flex items-baseline gap-1 group no-underline">
              <span className="text-xl font-black text-white tracking-tight font-serif">
                ClothLoop
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">.id</span>
            </Link>

            <div className="h-5 w-[1px] bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center">
                {getRoleIcon()}
              </div>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">
                  {title}
                </h1>
                {badgeText && badgeText !== title && (
                  <span className={`block text-[11px] font-semibold mt-0.5 tracking-wide ${badgeColor}`}>
                    {badgeText}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Links */}
          <div className="flex items-center gap-3">
            {/* User Profile display */}
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-white truncate max-w-[160px]">
                {userProfile?.full_name || displayEmail.split('@')[0]}
              </p>
              <p className="text-[11px] text-slate-400 truncate max-w-[160px]">
                {displayEmail}
              </p>
            </div>

            <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-200 hover:text-rose-200 border border-slate-700 hover:border-rose-500/40 transition-colors text-xs font-semibold cursor-pointer"
              title="Keluar Akun"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        {tabList.length > 0 && onTabChange && (
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-t border-slate-800/90 no-scrollbar">
            {tabList.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-500'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected ? 'bg-emerald-900 text-emerald-100' : 'bg-slate-700 text-slate-100'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

export default RolePortalNavbar;
