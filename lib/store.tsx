'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DropOrder, CartItem, UpcycleRequest, RewardVoucher, MarketItem, UserRole } from './types';
import { createClient } from './supabase/client';
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
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  business_name?: string;
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
  upcycleRequests: UpcycleRequest[];
  redeemedVouchers: RewardVoucher[];
  notifications: AppNotification[];
  addToCart: (item: MarketItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addDropOrder: (order: DropOrder) => void;
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

  const [userPoints, setUserPoints] = useState<number>(450);
  const [userTotalWaterSaved, setUserTotalWaterSaved] = useState<number>(24300);
  const [userTotalCo2Saved, setUserTotalCo2Saved] = useState<number>(32.4);
  const [userTotalKgDiverted, setUserTotalKgDiverted] = useState<number>(9.0);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dropOrders, setDropOrders] = useState<DropOrder[]>([]);
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
        setUserPoints(data.cloth_points ?? 100);
        setUserTotalWaterSaved(Number(data.total_water_saved_liters) || 0);
        setUserTotalCo2Saved(Number(data.total_co2_saved_kg) || 0);
        setUserTotalKgDiverted(Number(data.total_kg_diverted) || 0);
      }
    } catch {
      // fallback to defaults
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
        }
      });

      // Listen to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        const user = session?.user ?? null;
        setCurrentUser(user);
        if (user) {
          fetchProfile(user);
        } else {
          setUserProfile(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // ignore
    }
  }, [fetchProfile]);

  // Load from LocalStorage for guest cart/orders
  useEffect(() => {
    try {
      const savedPoints = localStorage.getItem('clothloop_points');
      if (savedPoints && !currentUser) setUserPoints(Number(savedPoints));

      const savedCart = localStorage.getItem('clothloop_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedDropOrders = localStorage.getItem('clothloop_drop_orders');
      if (savedDropOrders) setDropOrders(JSON.parse(savedDropOrders));
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Save to LocalStorage
  useEffect(() => {
    try {
      if (!currentUser) {
        localStorage.setItem('clothloop_points', userPoints.toString());
      }
      localStorage.setItem('clothloop_cart', JSON.stringify(cart));
      localStorage.setItem('clothloop_drop_orders', JSON.stringify(dropOrders));
    } catch {
      // ignore
    }
  }, [userPoints, cart, dropOrders, currentUser]);

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setCurrentUser(null);
      setUserProfile(null);
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
    setDropOrders((prev) => [order, ...prev]);
    // update local eco impact
    const newPoints = userPoints + order.pointsAwarded;
    const newKg = Number((userTotalKgDiverted + order.estimatedWeightKg).toFixed(1));
    const newWater = userTotalWaterSaved + order.waterSavedLiters;
    const newCo2 = Number((userTotalCo2Saved + order.co2SavedKg).toFixed(1));

    setUserPoints(newPoints);
    setUserTotalKgDiverted(newKg);
    setUserTotalWaterSaved(newWater);
    setUserTotalCo2Saved(newCo2);

    // If user logged in, persist to Supabase
    if (currentUser) {
      try {
        const supabase = createClient();
        await supabase.from('drop_orders').insert({
          id: order.id,
          booking_code: order.bookingCode,
          user_id: currentUser.id,
          user_name: order.userName,
          user_phone: order.userPhone,
          user_address: order.userAddress,
          method: order.method,
          drop_point_id: order.dropPointId,
          drop_point_name: order.dropPointName,
          courier_service: order.courierService,
          estimated_weight_kg: order.estimatedWeightKg,
          actual_weight_kg: order.actualWeightKg,
          item_count: order.itemCount,
          garment_types: order.garmentTypes,
          status: order.status,
          points_awarded: order.pointsAwarded,
          water_saved_liters: order.waterSavedLiters,
          co2_saved_kg: order.co2SavedKg,
          qr_code_value: order.qrCodeValue,
          notes: order.notes,
        });

        await supabase.from('profiles').update({
          cloth_points: newPoints,
          total_kg_diverted: newKg,
          total_water_saved_liters: newWater,
          total_co2_saved_kg: newCo2,
        }).eq('id', currentUser.id);
      } catch {
        // ignore
      }
    }

    addNotification(
      'success',
      'Booking ClothDrop Berhasil! 🎉',
      `Kode Booking: ${order.bookingCode}. Kamu mendapatkan estimasi +${order.pointsAwarded} ClothPoints!`
    );
  };

  const addUpcycleRequest = (req: UpcycleRequest) => {
    setUpcycleRequests((prev) => [req, ...prev]);
    addNotification(
      'success',
      'Permintaan Upcycling Terkirim 🧵',
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
      'Voucher Berhasil Diklaim! 🎁',
      `Kode voucher untuk ${voucher.partnerBrand} telah masuk ke daftar voucher aktifmu.`
    );
    return true;
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
        upcycleRequests,
        redeemedVouchers,
        notifications,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addDropOrder,
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
