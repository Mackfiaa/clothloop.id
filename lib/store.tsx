'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DropOrder, DropOrderStatus, CartItem, UpcycleRequest, RewardVoucher, MarketItem, UserRole, CraftOrder, CraftOrderStatus } from './types';
import { createClient } from './supabase/client';
import { fetchDropOrdersFromSupabase, fetchMarketplaceOrdersFromSupabase, saveMarketplaceOrderToSupabase, updateMarketplaceOrderStatusInSupabase } from './supabase/data';
import { addCourierPickupTask } from './supabase/portalData';
import { User } from '@supabase/supabase-js';

interface AppNotification {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  business_name?: string;
  city?: string;
  district?: string;
  address?: string;
  vehicle_plate?: string;
  vehicle_type?: string;
  cloth_points: number;
  total_water_saved_liters: number;
  total_co2_saved_kg: number;
  total_kg_diverted: number;
}

interface AppContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  userPoints: number;
  userTotalWaterSaved: number;
  userTotalCo2Saved: number;
  userTotalKgDiverted: number;
  cart: CartItem[];
  dropOrders: DropOrder[];
  craftOrders: CraftOrder[];
  upcycleRequests: UpcycleRequest[];
  redeemedVouchers: RewardVoucher[];
  notifications: AppNotification[];
  addToCart: (item: MarketItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addDropOrder: (order: DropOrder) => void;
  confirmCourierScan: (bookingCode: string) => boolean;
  updateOrderStatus: (bookingCode: string, status: DropOrderStatus) => void;
  addCraftOrder: (order: CraftOrder) => void;
  updateCraftOrderStatus: (orderNumber: string, status: CraftOrderStatus) => void;
  deductUserPoints: (amount: number) => void;
  addUpcycleRequest: (req: UpcycleRequest) => void;
  redeemVoucher: (voucher: RewardVoucher) => boolean;
  addNotification: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
  removeNotification: (id: string) => void;
  signOut: () => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [userPoints, setUserPoints] = useState<number>(0);
  const [userTotalWaterSaved, setUserTotalWaterSaved] = useState<number>(0);
  const [userTotalCo2Saved, setUserTotalCo2Saved] = useState<number>(0);
  const [userTotalKgDiverted, setUserTotalKgDiverted] = useState<number>(0);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dropOrders, setDropOrders] = useState<DropOrder[]>([]);
  const [craftOrders, setCraftOrders] = useState<CraftOrder[]>([]);
  const [upcycleRequests, setUpcycleRequests] = useState<UpcycleRequest[]>([]);
  const [redeemedVouchers, setRedeemedVouchers] = useState<RewardVoucher[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const addNotification = useCallback((type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4500);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Fetch user profile from Supabase
  const fetchProfile = useCallback(async (user: User) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        setUserProfile(data as UserProfile);
        setUserPoints(data.cloth_points ?? 0);
        setUserTotalWaterSaved(Number(data.total_water_saved_liters) || 0);
        setUserTotalCo2Saved(Number(data.total_co2_saved_kg) || 0);
        setUserTotalKgDiverted(Number(data.total_kg_diverted) || 0);
        
        try {
          const { recordNewRegisteredUser } = await import('@/lib/supabase/portalData');
          recordNewRegisteredUser({
            id: data.id,
            fullName: data.full_name,
            email: data.email || user.email || '',
            phone: data.phone,
            role: data.role || 'USER',
            city: data.city,
          });
        } catch {}
      }
    } catch {
      // fallback to defaults
    }
  }, []);

  // Load orders strictly for the logged-in user
  const loadUserOrders = useCallback(async (userId: string) => {
    try {
      const drops = await fetchDropOrdersFromSupabase(userId);
      setDropOrders(drops);
      const crafts = await fetchMarketplaceOrdersFromSupabase(userId);
      setCraftOrders(crafts);
    } catch {
      setDropOrders([]);
      setCraftOrders([]);
    }
  }, []);

  // Supabase Auth Listener
  useEffect(() => {
    try {
      const supabase = createClient();
      
      // Get initial session
      supabase.auth.getUser().then(({ data: { user } }) => {
        setCurrentUser(user);
        if (user) {
          fetchProfile(user);
          loadUserOrders(user.id);
        } else {
          setDropOrders([]);
          setCraftOrders([]);
          setUserPoints(0);
        }
      });

      // Listen to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        const user = session?.user ?? null;
        setCurrentUser(user);
        if (user) {
          fetchProfile(user);
          loadUserOrders(user.id);
        } else {
          setUserProfile(null);
          setDropOrders([]);
          setCraftOrders([]);
          setUserPoints(0);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // ignore
    }
  }, [fetchProfile, loadUserOrders]);

  // Load from LocalStorage for guest cart
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('clothloop_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {
      // ignore
    }
  }, []);

  // Save cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('clothloop_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setCurrentUser(null);
      setUserProfile(null);
      setDropOrders([]);
      setCraftOrders([]);
      setUserPoints(0);
      try {
        localStorage.removeItem('clothloop_drop_orders');
        localStorage.removeItem('clothloop_craft_orders');
        localStorage.removeItem('clothloop_points');
      } catch {}
      addNotification('info', 'Sampai Jumpa', 'Kamu telah keluar dari akun.');
    } catch {
      // ignore
    }
  };

  const addToCart = (item: MarketItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    addNotification('success', 'Item Ditambahkan ke Keranjang', `${item.title} siap di-checkout.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
    addNotification('info', 'Item Dihapus', 'Item telah dikeluarkan dari keranjang belanja.');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addDropOrder = async (order: DropOrder) => {
    // Ensure points are not credited yet
    const orderWithState: DropOrder = {
      ...order,
      pointsCredited: false,
      status: order.method === 'PICKUP' ? 'PENDING' : 'PENDING',
    };

    setDropOrders((prev) => {
      const updated = [orderWithState, ...prev];
      try {
        localStorage.setItem('clothloop_drop_orders', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Auto-dispatch task to couriers in the same city if method is PICKUP
    if (orderWithState.method === 'PICKUP') {
      try {
        addCourierPickupTask(orderWithState);
      } catch {}
    }

    // If user logged in, persist to Supabase
    if (currentUser) {
      try {
        const supabase = createClient();
        await supabase.from('drop_orders').insert({
          id: orderWithState.id,
          booking_code: orderWithState.bookingCode,
          user_id: currentUser.id,
          user_name: orderWithState.userName,
          user_phone: orderWithState.userPhone,
          user_address: orderWithState.userAddress,
          method: orderWithState.method,
          drop_point_id: orderWithState.dropPointId,
          drop_point_name: orderWithState.dropPointName,
          courier_service: orderWithState.courierService,
          estimated_weight_kg: orderWithState.estimatedWeightKg,
          actual_weight_kg: orderWithState.actualWeightKg,
          item_count: orderWithState.itemCount,
          garment_types: orderWithState.garmentTypes,
          status: orderWithState.status,
          points_awarded: orderWithState.pointsAwarded,
          water_saved_liters: orderWithState.waterSavedLiters,
          co2_saved_kg: orderWithState.co2SavedKg,
          qr_code_value: orderWithState.qrCodeValue,
          notes: orderWithState.notes,
        });
      } catch {
        // ignore
      }
    }

    addNotification(
      'info',
      'Tiket Booking Berhasil Dibuat',
      `Kode Resi: ${order.bookingCode}. Tunjukkan QR Code saat kurir menjemput / petugas menerima pakaian untuk mencairkan +${order.pointsAwarded} Poin!`
    );
  };

  const confirmCourierScan = (bookingCode: string): boolean => {
    const targetOrder = dropOrders.find(
      (o) => o.bookingCode.toLowerCase() === bookingCode.toLowerCase()
    );

    if (!targetOrder) {
      addNotification('warning', 'Kode Tidak Ditemukan', `Kode booking ${bookingCode} tidak terdaftar.`);
      return false;
    }

    if (targetOrder.pointsCredited) {
      addNotification('info', 'Sudah Pernah Discan', `Kode ${bookingCode} telah diverifikasi sebelumnya.`);
      return true;
    }

    const nowIso = new Date().toISOString();
    const updatedOrders = dropOrders.map((o) => {
      if (o.bookingCode.toLowerCase() === bookingCode.toLowerCase()) {
        return {
          ...o,
          status: 'RECEIVED' as DropOrderStatus,
          pointsCredited: true,
          scannedAt: nowIso,
          courierName: o.courierName || 'Kurir Mitra ClothLoop (Express)',
        };
      }
      return o;
    });

    setDropOrders(updatedOrders);

    // Now credit points and impact to user profile
    const newPoints = userPoints + targetOrder.pointsAwarded;
    const addedKg = targetOrder.estimatedWeightKg || (targetOrder.itemCount * 0.4);
    const newKg = Number((userTotalKgDiverted + addedKg).toFixed(1));
    const newWater = userTotalWaterSaved + targetOrder.waterSavedLiters;
    const newCo2 = Number((userTotalCo2Saved + targetOrder.co2SavedKg).toFixed(1));

    setUserPoints(newPoints);
    setUserTotalKgDiverted(newKg);
    setUserTotalWaterSaved(newWater);
    setUserTotalCo2Saved(newCo2);

    if (currentUser) {
      try {
        const supabase = createClient();
        supabase.from('profiles').update({
          cloth_points: newPoints,
          total_kg_diverted: newKg,
          total_water_saved_liters: newWater,
          total_co2_saved_kg: newCo2,
        }).eq('id', currentUser.id);

        supabase.from('drop_orders').update({
          status: 'RECEIVED',
        }).eq('booking_code', bookingCode);
      } catch {
        // ignore
      }
    }

    addNotification(
      'success',
      'Scan Kurir Berhasil! Poin Masuk',
      `Selamat! +${targetOrder.pointsAwarded} ClothPoints resmi masuk ke akun Anda untuk kode ${targetOrder.bookingCode}.`
    );

    return true;
  };

  const updateOrderStatus = (bookingCode: string, status: DropOrderStatus) => {
    setDropOrders((prev) =>
      prev.map((o) =>
        o.bookingCode.toLowerCase() === bookingCode.toLowerCase()
          ? { ...o, status }
          : o
      )
    );
  };

  const addUpcycleRequest = (req: UpcycleRequest) => {
    setUpcycleRequests((prev) => [req, ...prev]);
    addNotification(
      'success',
      'Permintaan Upcycling Terkirim',
      `Permintaan kamu ke ${req.artisanName} telah diteruskan. Estimasi biaya: Rp ${req.estimatedPrice.toLocaleString('id-ID')}`
    );
  };

  const redeemVoucher = (voucher: RewardVoucher): boolean => {
    if (userPoints < voucher.pointsCost) {
      addNotification(
        'warning',
        'ClothPoints Tidak Cukup',
        `Kamu butuh ${voucher.pointsCost} poin, saat ini kamu memiliki ${userPoints} poin.`
      );
      return false;
    }

    setUserPoints((prev) => prev - voucher.pointsCost);
    setRedeemedVouchers((prev) => [voucher, ...prev]);
    addNotification(
      'success',
      'Voucher Berhasil Diklaim',
      `Kode voucher untuk ${voucher.partnerBrand} telah masuk ke daftar voucher aktifmu.`
    );
    return true;
  };

  const addCraftOrder = (order: CraftOrder) => {
    setCraftOrders((prev) => [order, ...prev]);
    try {
      localStorage.setItem('clothloop_craft_orders', JSON.stringify([order, ...craftOrders]));
    } catch {}
    saveMarketplaceOrderToSupabase(order);
    addNotification(
      'success',
      'Pesanan Berhasil Dicatat',
      `Pesanan ${order.orderNumber} tercatat di database dengan perlindungan escrow 100%.`
    );
  };

  const updateCraftOrderStatus = (orderNumber: string, status: CraftOrderStatus) => {
    setCraftOrders((prev) => {
      const updated = prev.map((o) => {
        if (o.orderNumber.toLowerCase() === orderNumber.toLowerCase()) {
          const isDone = status === 'COMPLETED';
          return {
            ...o,
            status,
            escrowStatus: isDone ? 'RELEASED_TO_ARTISAN' : o.escrowStatus,
          };
        }
        return o;
      });
      try {
        localStorage.setItem('clothloop_craft_orders', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    updateMarketplaceOrderStatusInSupabase(orderNumber, status);

    if (status === 'COMPLETED') {
      addNotification(
        'success',
        'Pesanan Selesai Diterima!',
        `Terima kasih! Dana transaksi telah diteruskan ke studio perajin lokal.`
      );
    }
  };

  const deductUserPoints = (amount: number) => {
    setUserPoints((prev) => Math.max(0, prev - amount));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        userProfile,
        userPoints,
        userTotalWaterSaved,
        userTotalCo2Saved,
        userTotalKgDiverted,
        cart,
        dropOrders,
        craftOrders,
        upcycleRequests,
        redeemedVouchers,
        notifications,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addDropOrder,
        confirmCourierScan,
        updateOrderStatus,
        addCraftOrder,
        updateCraftOrderStatus,
        deductUserPoints,
        addUpcycleRequest,
        redeemVoucher,
        addNotification,
        removeNotification,
        signOut,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
