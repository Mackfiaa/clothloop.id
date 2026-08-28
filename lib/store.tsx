'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DropOrder, CartItem, UpcycleRequest, RewardVoucher, MarketItem } from './types';
import { MOCK_MARKET_ITEMS, MOCK_REWARD_VOUCHERS } from './constants';

interface AppNotification {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
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
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
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

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const savedPoints = localStorage.getItem('clothloop_points');
      if (savedPoints) setUserPoints(Number(savedPoints));

      const savedCart = localStorage.getItem('clothloop_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedDropOrders = localStorage.getItem('clothloop_drop_orders');
      if (savedDropOrders) setDropOrders(JSON.parse(savedDropOrders));
    } catch {
      // ignore
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('clothloop_points', userPoints.toString());
      localStorage.setItem('clothloop_cart', JSON.stringify(cart));
      localStorage.setItem('clothloop_drop_orders', JSON.stringify(dropOrders));
    } catch {
      // ignore
    }
  }, [userPoints, cart, dropOrders]);

  const addNotification = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
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

  const addDropOrder = (order: DropOrder) => {
    setDropOrders((prev) => [order, ...prev]);
    // update eco impact
    setUserPoints((prev) => prev + order.pointsAwarded);
    setUserTotalKgDiverted((prev) => Number((prev + order.estimatedWeightKg).toFixed(1)));
    setUserTotalWaterSaved((prev) => prev + order.waterSavedLiters);
    setUserTotalCo2Saved((prev) => Number((prev + order.co2SavedKg).toFixed(1)));

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
