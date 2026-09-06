import { 
  MarketItem, 
  CraftProduct
} from '@/lib/types';
import { createClient } from './client';

// ── Types for Portal Operations ──

export interface CourierProfile {
  id: string;
  name: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  vehiclePlate: string;
  walletBalance: number;
  totalCompletedPickups: number;
  isAddressConfirmed: boolean;
}

export interface PickupTaskItem {
  id: string;
  orderId: string;
  userName: string;
  userPhone: string;
  userCity: string;
  userAddress: string;
  estimatedWeight: string;
  itemSummary: string;
  earningsFee: number;
  verificationCode: string;
  status: 'READY_FOR_PICKUP' | 'IN_TRANSIT' | 'DELIVERED';
  createdAt: string;
}

export interface DropBoxApplication {
  id: string;
  businessName: string;
  businessType: string;
  address: string;
  city: string;
  picName: string;
  picPhone: string;
  picEmail: string;
  status: 'PENDING' | 'SURVEY' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface ArtisanStudioItem {
  id: string;
  name: string;
  brandName: string;
  city: string;
  address: string;
  contactPerson: string;
  phone: string;
  verificationCode: string;
}

export interface ArtisanStudioInventory {
  fabricStockKg: number;
  fabricPiecesCount: number;
  completedProductsCount: number;
  totalDonationsReceived: number;
  studioVerificationCode: string;
}

// ── Shared Constants ──

export const INDONESIA_MAJOR_CITIES = [
  'Jakarta Selatan',
  'Jakarta Pusat',
  'Jakarta Barat',
  'Jakarta Timur',
  'Jakarta Utara',
  'Bandung',
  'Surabaya',
  'Malang',
  'Yogyakarta',
  'Semarang',
  'Denpasar',
  'Medan',
  'Makassar',
  'Palembang',
  'Tangerang',
  'Tangerang Selatan',
  'Bekasi',
  'Depok',
  'Bogor'
];

export const ARTISAN_STUDIO_DIRECTORY: ArtisanStudioItem[] = [
  {
    id: 'artisan-std-1',
    name: 'Studio Daur Asri',
    brandName: 'Daur Asri Upcycle',
    city: 'Jakarta Selatan',
    address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan',
    contactPerson: 'Mbak Ratna',
    phone: '0812-8822-9901',
    verificationCode: 'AS-JKT-882',
  },
  {
    id: 'artisan-std-2',
    name: 'Atelier Sashiko Nusantara',
    brandName: 'Sashiko Nawa',
    city: 'Bandung',
    address: 'Jl. Dago Giri No. 18, Dago Atas, Bandung',
    contactPerson: 'Kang Asep',
    phone: '0813-2211-7788',
    verificationCode: 'AS-BDG-412',
  },
  {
    id: 'artisan-std-3',
    name: 'Bengkel Tenun Daur Ulang Jogja',
    brandName: 'Tenun Lestari',
    city: 'Yogyakarta',
    address: 'Jl. Prawirotaman No. 25, Mergangsan, Yogyakarta',
    contactPerson: 'Mas Bayu',
    phone: '0818-4455-6677',
    verificationCode: 'AS-JOG-109',
  },
  {
    id: 'artisan-std-4',
    name: 'Studio Kriya Rekacipta Surabaya',
    brandName: 'Rekacipta Eco',
    city: 'Surabaya',
    address: 'Jl. Rungkut Industri No. 12, Surabaya',
    contactPerson: 'Ibu Endang',
    phone: '0812-9988-1122',
    verificationCode: 'AS-SBY-776',
  },
  {
    id: 'artisan-std-5',
    name: 'Malang Upcycle Craft Center',
    brandName: 'Malang Kreasi Kain',
    city: 'Malang',
    address: 'Jl. Soekarno Hatta No. 88, Lowokwaru, Malang',
    contactPerson: 'Bapak Dimas',
    phone: '0857-1122-3344',
    verificationCode: 'AS-MLG-331',
  },
];

// Initial mock courier pickup orders
export const COURIER_INITIAL_TASKS: PickupTaskItem[] = [
  {
    id: 'task-jkt-1',
    orderId: 'DON-JKT-9041',
    userName: 'Dewi Lestari',
    userPhone: '0812-7744-1122',
    userCity: 'Jakarta Selatan',
    userAddress: 'Jl. Fatmawati Raya No. 42, Cilandak Barat, Jakarta Selatan',
    estimatedWeight: '3.5 Kg (5 Pcs)',
    itemSummary: '3 Kaos Katun, 2 Kemeja Katun',
    earningsFee: 15000,
    verificationCode: 'PICKUP-9041',
    status: 'READY_FOR_PICKUP',
    createdAt: '2026-09-05T08:30:00Z',
  },
  {
    id: 'task-jkt-2',
    orderId: 'DON-JKT-9088',
    userName: 'Budi Santoso',
    userPhone: '0813-8899-2211',
    userCity: 'Jakarta Selatan',
    userAddress: 'Jl. Radio Dalam Raya No. 15, Gandaria Utara, Jakarta Selatan',
    estimatedWeight: '5.2 Kg (8 Pcs)',
    itemSummary: '4 Celana Denim, 4 Kaos Katun',
    earningsFee: 15000,
    verificationCode: 'PICKUP-9088',
    status: 'READY_FOR_PICKUP',
    createdAt: '2026-09-05T09:15:00Z',
  },
  {
    id: 'task-bdg-1',
    orderId: 'DON-BDG-3104',
    userName: 'Anisa Rahma',
    userPhone: '0821-4455-6677',
    userCity: 'Bandung',
    userAddress: 'Jl. Dago No. 112, Coblong, Bandung',
    estimatedWeight: '4.0 Kg (6 Pcs)',
    itemSummary: '2 Jaket Denim, 4 Kaos',
    earningsFee: 15000,
    verificationCode: 'PICKUP-3104',
    status: 'READY_FOR_PICKUP',
    createdAt: '2026-09-05T07:45:00Z',
  },
  {
    id: 'task-sby-1',
    orderId: 'DON-SBY-8821',
    userName: 'Rendra Hendrawan',
    userPhone: '0811-3322-1100',
    userCity: 'Surabaya',
    userAddress: 'Jl. Manyar Kertoarjo No. 8, Gubeng, Surabaya',
    estimatedWeight: '6.0 Kg (9 Pcs)',
    itemSummary: '5 Kemeja, 4 Celana Katun',
    earningsFee: 15000,
    verificationCode: 'PICKUP-8821',
    status: 'READY_FOR_PICKUP',
    createdAt: '2026-09-05T10:00:00Z',
  },
  {
    id: 'task-jog-1',
    orderId: 'DON-JOG-1120',
    userName: 'Kartika Sari',
    userPhone: '0878-9900-1122',
    userCity: 'Yogyakarta',
    userAddress: 'Jl. Kaliurang KM 5, Sleman, Yogyakarta',
    estimatedWeight: '3.0 Kg (4 Pcs)',
    itemSummary: '2 Kain Batik, 2 Kemeja Katun',
    earningsFee: 15000,
    verificationCode: 'PICKUP-1120',
    status: 'READY_FOR_PICKUP',
    createdAt: '2026-09-05T11:20:00Z',
  },
  {
    id: 'task-mlg-1',
    orderId: 'DON-MLG-4451',
    userName: 'Fajar Nugroho',
    userPhone: '0856-7788-9900',
    userCity: 'Malang',
    userAddress: 'Jl. Ijen No. 45, Klojen, Malang',
    estimatedWeight: '4.8 Kg (7 Pcs)',
    itemSummary: '3 Jaket Outer, 4 Kaos Katun',
    earningsFee: 15000,
    verificationCode: 'PICKUP-4451',
    status: 'READY_FOR_PICKUP',
    createdAt: '2026-09-05T08:50:00Z',
  }
];

export const INITIAL_DROP_BOX_APPLICATIONS: DropBoxApplication[] = [
  {
    id: 'dba-1',
    businessName: 'Kopi Toko Djawa Senopati',
    businessType: 'Kafe & Resto',
    address: 'Jl. Senopati No. 44, Kebayoran Baru',
    city: 'Jakarta Selatan',
    picName: 'Dimas Aditya',
    picPhone: '0812-9988-7766',
    picEmail: 'senopati@kopitokodjawa.com',
    status: 'PENDING',
    createdAt: '2026-09-05T10:30:00Z',
  },
  {
    id: 'dba-2',
    businessName: 'Universitas Brawijaya (Fakultas Teknik)',
    businessType: 'Kampus & Universitas',
    address: 'Jl. Veteran, Ketawanggede',
    city: 'Malang',
    picName: 'Dr. Ir. Bambang S.',
    picPhone: '0813-3344-5566',
    picEmail: 'dekanat.ft@ub.ac.id',
    status: 'SURVEY',
    createdAt: '2026-09-04T14:15:00Z',
  },
  {
    id: 'dba-3',
    businessName: 'Creative Hub Dago 108',
    businessType: 'Co-Working & Komunitas',
    address: 'Jl. Ir. H. Juanda No. 108',
    city: 'Bandung',
    picName: 'Siti Sarah',
    picPhone: '0878-1122-3344',
    picEmail: 'info@dago108hub.id',
    status: 'APPROVED',
    createdAt: '2026-09-03T09:00:00Z',
  }
];

// Helper to safely access localStorage
function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ═══════════════════════════════════════════════════════════════════════
// 1. SELLER PRELOVED DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════════════

export function getCustomSellerItems(): MarketItem[] {
  return getLocal<MarketItem[]>('clothloop_seller_items', []);
}

export function getAllMarketItemsWithSellers(): MarketItem[] {
  return getCustomSellerItems();
}

export function saveNewPrelovedItem(item: MarketItem): void {
  const current = getCustomSellerItems();
  const updated = [item, ...current.filter(p => p.id !== item.id)];
  setLocal('clothloop_seller_items', updated);

  try {
    const supabase = createClient();
    supabase.from('market_items').upsert({
      id: item.id,
      title: item.title,
      brand: item.brand,
      seller_name: item.sellerName,
      seller_city: item.sellerCity,
      price: item.price,
      original_price: item.originalPrice,
      condition: item.condition,
      category: item.category,
      size: item.size,
      measurements: item.measurements,
      material: item.material,
      story: item.story,
      images: item.images,
      water_saved_liters: item.waterSavedLiters,
      co2_saved_kg: item.co2SavedKg,
      is_verified_qc: item.isVerifiedQC,
      status: item.status,
      rating: item.rating,
      review_count: item.reviewCount,
    }).then(() => {});
  } catch {}
}

export function updatePrelovedItem(item: MarketItem): void {
  const current = getCustomSellerItems();
  const updated = current.map(p => p.id === item.id ? item : p);
  setLocal('clothloop_seller_items', updated);

  try {
    const supabase = createClient();
    supabase.from('market_items').upsert({
      id: item.id,
      title: item.title,
      brand: item.brand,
      seller_name: item.sellerName,
      seller_city: item.sellerCity,
      price: item.price,
      original_price: item.originalPrice,
      condition: item.condition,
      category: item.category,
      size: item.size,
      measurements: item.measurements,
      material: item.material,
      story: item.story,
      images: item.images,
      water_saved_liters: item.waterSavedLiters,
      co2_saved_kg: item.co2SavedKg,
      is_verified_qc: item.isVerifiedQC,
      status: item.status,
      rating: item.rating,
      review_count: item.reviewCount,
    }).then(() => {});
  } catch {}
}

export function deletePrelovedItem(itemId: string): void {
  const current = getCustomSellerItems();
  const updated = current.filter(p => p.id !== itemId);
  setLocal('clothloop_seller_items', updated);

  try {
    const supabase = createClient();
    supabase.from('market_items').delete().eq('id', itemId).then(() => {});
  } catch {}
}

export function getSellerOrders(): any[] {
  return getLocal<any[]>('clothloop_seller_orders', []);
}

export function saveSellerOrder(order: any): void {
  const current = getSellerOrders();
  const updated = [order, ...current];
  setLocal('clothloop_seller_orders', updated);
}

export function updateSellerOrderStatus(orderId: string, status: string): void {
  const current = getSellerOrders();
  const updated = current.map((o) => (o.id === orderId ? { ...o, status } : o));
  setLocal('clothloop_seller_orders', updated);
}

// ═══════════════════════════════════════════════════════════════════════
// 2. UMKM & PERAJIN CRAFT DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════════════

export function getCustomCraftProducts(): CraftProduct[] {
  return getLocal<CraftProduct[]>('clothloop_artisan_crafts', []);
}

export function getAllCraftProductsWithArtisans(): CraftProduct[] {
  return getCustomCraftProducts();
}

export function saveNewCraftProduct(product: CraftProduct): void {
  const current = getCustomCraftProducts();
  const updated = [product, ...current.filter(p => p.id !== product.id)];
  setLocal('clothloop_artisan_crafts', updated);

  try {
    const supabase = createClient();
    supabase.from('craft_products').upsert({
      id: product.id,
      title: product.title,
      artisan_name: product.artisanName,
      artisan_studio: product.artisanStudio,
      artisan_city: product.artisanCity,
      price: product.price,
      original_price: product.originalPrice,
      category: product.category,
      technique: product.technique,
      material_saved: product.materialSaved,
      dimensions: product.dimensions,
      story: product.story,
      images: product.images,
      stock_count: product.stockCount,
      rating: product.rating,
      review_count: product.reviewCount,
      water_saved_liters: product.waterSavedLiters,
      co2_saved_kg: product.co2SavedKg,
    }).then(() => {});
  } catch {}
}

export function updateCraftProduct(product: CraftProduct): void {
  const current = getCustomCraftProducts();
  const updated = current.map(p => p.id === product.id ? product : p);
  setLocal('clothloop_artisan_crafts', updated);

  try {
    const supabase = createClient();
    supabase.from('craft_products').upsert({
      id: product.id,
      title: product.title,
      artisan_name: product.artisanName,
      artisan_studio: product.artisanStudio,
      artisan_city: product.artisanCity,
      price: product.price,
      original_price: product.originalPrice,
      category: product.category,
      technique: product.technique,
      material_saved: product.materialSaved,
      dimensions: product.dimensions,
      story: product.story,
      images: product.images,
      stock_count: product.stockCount,
      rating: product.rating,
      review_count: product.reviewCount,
      water_saved_liters: product.waterSavedLiters,
      co2_saved_kg: product.co2SavedKg,
    }).then(() => {});
  } catch {}
}

export function deleteCraftProduct(productId: string): void {
  const current = getCustomCraftProducts();
  const updated = current.filter(p => p.id !== productId);
  setLocal('clothloop_artisan_crafts', updated);

  try {
    const supabase = createClient();
    supabase.from('craft_products').delete().eq('id', productId).then(() => {});
  } catch {}
}

export function getArtisanInventory(studioName: string = 'Studio Daur Asri'): ArtisanStudioInventory {
  const fallback: ArtisanStudioInventory = {
    fabricStockKg: 0,
    fabricPiecesCount: 0,
    completedProductsCount: 0,
    totalDonationsReceived: 0,
    studioVerificationCode: 'AS-JKT-882',
  };
  return getLocal<ArtisanStudioInventory>(`clothloop_inventory_${studioName}`, fallback);
}

export function addFabricStockToArtisan(studioName: string, piecesCount: number, kgEst: number): void {
  const current = getArtisanInventory(studioName);
  const updated: ArtisanStudioInventory = {
    ...current,
    fabricStockKg: Number((current.fabricStockKg + kgEst).toFixed(1)),
    fabricPiecesCount: current.fabricPiecesCount + piecesCount,
    totalDonationsReceived: current.totalDonationsReceived + 1,
  };
  setLocal(`clothloop_inventory_${studioName}`, updated);
}

export function getArtisanOrders(): any[] {
  return getLocal<any[]>('clothloop_artisan_orders', []);
}

export function saveArtisanOrder(order: any): void {
  const current = getArtisanOrders();
  const updated = [order, ...current];
  setLocal('clothloop_artisan_orders', updated);
}

export function updateCraftOrderStatus(orderId: string, status: string): void {
  const current = getArtisanOrders();
  const updated = current.map((o) => (o.id === orderId ? { ...o, status } : o));
  setLocal('clothloop_artisan_orders', updated);
}

// ═══════════════════════════════════════════════════════════════════════
// 3. MITRA KURIR JEMPUT DATA OPERATIONS (STRICT CITY LOCK & SYNC)
// ═══════════════════════════════════════════════════════════════════════

export function getCourierProfile(userProfile?: any, currentUser?: any): CourierProfile {
  const fallback: CourierProfile = {
    id: currentUser?.id || 'courier-user-1',
    name: userProfile?.full_name || '',
    phone: userProfile?.phone || '',
    city: userProfile?.city || 'Jakarta Selatan',
    district: userProfile?.district || '',
    address: userProfile?.address || '',
    vehiclePlate: userProfile?.vehicle_plate || '',
    walletBalance: 0,
    totalCompletedPickups: 0,
    isAddressConfirmed: true,
  };
  const local = getLocal<CourierProfile>('clothloop_courier_profile', fallback);
  // If userProfile from database has updated info, merge it
  if (userProfile && (userProfile.city || userProfile.full_name)) {
    return {
      ...local,
      name: local.name || userProfile.full_name || '',
      phone: local.phone || userProfile.phone || '',
      city: local.city || userProfile.city || 'Jakarta Selatan',
      district: local.district || userProfile.district || '',
      address: local.address || userProfile.address || '',
      vehiclePlate: local.vehiclePlate || userProfile.vehicle_plate || '',
      isAddressConfirmed: true,
    };
  }
  return local;
}

export async function saveCourierProfile(profile: CourierProfile): Promise<void> {
  setLocal('clothloop_courier_profile', profile);

  // Sync to database profiles table
  try {
    const supabase = createClient();
    if (profile.id && profile.id !== 'courier-user-1') {
      await supabase.from('profiles').update({
        full_name: profile.name,
        city: profile.city,
        district: profile.district,
        address: profile.address,
        phone: profile.phone,
        vehicle_plate: profile.vehiclePlate,
        updated_at: new Date().toISOString(),
      }).eq('id', profile.id);
    }
  } catch {
    // ignore
  }
}

export function getCourierTasks(): PickupTaskItem[] {
  return getLocal<PickupTaskItem[]>('clothloop_courier_tasks', COURIER_INITIAL_TASKS);
}

export function addCourierPickupTask(order: any): void {
  if (order.method !== 'PICKUP') return; // Strict: Drop-off does NOT go to courier!

  const tasks = getCourierTasks();
  if (tasks.some((t) => t.id === order.id || t.orderId === order.bookingCode)) {
    return;
  }

  const userCity = order.userCity || 'Jakarta Selatan';
  const newTask: PickupTaskItem = {
    id: order.id,
    orderId: order.bookingCode,
    userName: order.userName || 'Donatur ClothLoop',
    userPhone: order.userPhone || '-',
    userCity: userCity,
    userAddress: order.userAddress || `Alamat Penjemputan di ${userCity}`,
    estimatedWeight: `${order.itemCount} Helai Pakaian`,
    itemSummary: order.garmentTypes && order.garmentTypes.length > 0 
      ? order.garmentTypes.join(', ') 
      : `${order.itemCount} Helai Pakaian Donasi`,
    earningsFee: 15000,
    verificationCode: order.bookingCode,
    status: 'READY_FOR_PICKUP',
    createdAt: order.createdAt || new Date().toISOString(),
  };

  const updated = [newTask, ...tasks];
  setLocal('clothloop_courier_tasks', updated);
}

export function getCourierTasksForCity(city: string): PickupTaskItem[] {
  if (!city) return [];
  const all = getCourierTasks();
  const normalizedCity = city.toLowerCase().trim();
  return all.filter((t) => {
    const taskCity = (t.userCity || '').toLowerCase().trim();
    return taskCity === normalizedCity || taskCity.includes(normalizedCity) || normalizedCity.includes(taskCity);
  });
}

export function startCourierHeadingToDonor(taskId: string): { success: boolean; message: string } {
  const tasks = getCourierTasks();
  const target = tasks.find((t) => t.id === taskId || t.orderId === taskId);
  if (!target) return { success: false, message: 'Tugas penjemputan tidak ditemukan' };

  // Update task status (keep READY_FOR_PICKUP or custom heading flag)
  const updatedTasks = tasks.map((t) => (t.id === target.id ? { ...t, isHeadingToDonor: true } : t));
  setLocal('clothloop_courier_tasks', updatedTasks);

  // Sync to DropOrders in local storage & Supabase
  try {
    const dropOrders = getLocal<any[]>('clothloop_drop_orders', []);
    let donorUserId: string | null = null;
    const updatedDrops = dropOrders.map((o) => {
      if (o.id === target.id || o.bookingCode === target.orderId) {
        donorUserId = o.userId;
        return { ...o, status: 'COURIER_PICKUP' };
      }
      return o;
    });
    setLocal('clothloop_drop_orders', updatedDrops);
    if (donorUserId) {
      setLocal(`clothloop_drop_orders_${donorUserId}`, updatedDrops.filter(o => o.userId === donorUserId));
    }

    const supabase = createClient();
    supabase.from('drop_orders').update({
      status: 'COURIER_PICKUP',
    }).eq('booking_code', target.orderId).then(() => {});
  } catch {}

  return { success: true, message: `Status diperbarui! Donatur dapat melihat kurir sedang menuju ke lokasi.` };
}

export function completeCourierPickup(taskId: string, inputCode?: string): { success: boolean; message: string } {
  const tasks = getCourierTasks();
  const target = tasks.find((t) => t.id === taskId || t.orderId === taskId || (inputCode && t.verificationCode.toLowerCase() === inputCode.toLowerCase().trim()));
  if (!target) return { success: false, message: 'Tugas penjemputan tidak ditemukan' };

  // Update task status to IN_TRANSIT
  const updatedTasks = tasks.map((t) => (t.id === target.id ? { ...t, status: 'IN_TRANSIT' as const } : t));
  setLocal('clothloop_courier_tasks', updatedTasks);

  const profile = getCourierProfile();
  const courierDisplayName = profile.name || 'Kurir Mitra ClothLoop (Express)';

  // Sync to DropOrders in local storage
  let matchedOrder: any = null;
  try {
    const dropOrders = getLocal<any[]>('clothloop_drop_orders', []);
    const updatedDrops = dropOrders.map((o) => {
      if (o.id === target.id || o.bookingCode === target.orderId) {
        matchedOrder = {
          ...o,
          status: 'RECEIVED',
          pointsCredited: true,
          scannedAt: new Date().toISOString(),
          courierName: courierDisplayName,
        };
        return matchedOrder;
      }
      return o;
    });
    setLocal('clothloop_drop_orders', updatedDrops);

    if (matchedOrder && matchedOrder.userId) {
      const userOrders = getLocal<any[]>(`clothloop_drop_orders_${matchedOrder.userId}`, []);
      const updatedUserDrops = userOrders.map((o) => (o.bookingCode === target.orderId || o.id === target.id ? matchedOrder : o));
      setLocal(`clothloop_drop_orders_${matchedOrder.userId}`, updatedUserDrops.length > 0 ? updatedUserDrops : [matchedOrder, ...userOrders]);
    }
  } catch {}

  const ptsAwarded = matchedOrder?.pointsAwarded || 300;
  const donorUserId = matchedOrder?.userId;

  // Auto-credit points and update impact to donor's profile
  if (donorUserId && donorUserId !== 'usr-guest') {
    try {
      const currentSavedPts = Number(localStorage.getItem(`clothloop_points_${donorUserId}`)) || 0;
      const newTotalPts = currentSavedPts + ptsAwarded;
      localStorage.setItem(`clothloop_points_${donorUserId}`, String(newTotalPts));
    } catch {}

    try {
      const supabase = createClient();
      // Update drop_orders table in Supabase
      supabase.from('drop_orders').update({
        status: 'RECEIVED',
      }).eq('booking_code', target.orderId).then(() => {});

      // Fetch and update profile in Supabase
      supabase.from('profiles').select('*').eq('id', donorUserId).single().then(({ data: donorProf }) => {
        if (donorProf) {
          const addedKg = matchedOrder?.estimatedWeightKg || (matchedOrder?.itemCount ? matchedOrder.itemCount * 0.4 : 2.0);
          const newPts = (donorProf.cloth_points || 0) + ptsAwarded;
          const newKg = Number(((Number(donorProf.total_kg_diverted) || 0) + addedKg).toFixed(1));
          const newWater = (Number(donorProf.total_water_saved_liters) || 0) + (matchedOrder?.waterSavedLiters || 2700);
          const newCo2 = Number(((Number(donorProf.total_co2_saved_kg) || 0) + (matchedOrder?.co2SavedKg || 3.6)).toFixed(1));

          supabase.from('profiles').update({
            cloth_points: newPts,
            total_kg_diverted: newKg,
            total_water_saved_liters: newWater,
            total_co2_saved_kg: newCo2,
          }).eq('id', donorUserId).then(() => {});
        }
      });
    } catch {}
  } else {
    // If no userId, update Supabase drop_orders row directly
    try {
      const supabase = createClient();
      supabase.from('drop_orders').update({
        status: 'RECEIVED',
      }).eq('booking_code', target.orderId).then(() => {});
    } catch {}
  }

  // Add courier incentive bonus
  const updatedProfile: CourierProfile = {
    ...profile,
    walletBalance: profile.walletBalance + (target.earningsFee || 15000),
    totalCompletedPickups: profile.totalCompletedPickups + 1,
  };
  saveCourierProfile(updatedProfile);

  return { 
    success: true, 
    message: `Penjemputan donasi (${target.orderId}) terverifikasi! Status donatur berubah jadi RECEIVED (+${ptsAwarded} Poin Cair ke Donatur), dan insentif Rp 15.000 masuk ke dompet kurir.` 
  };
}

export function completeArtisanDelivery(taskId: string, inputCode?: string): { success: boolean; message: string } {
  const tasks = getCourierTasks();
  const target = tasks.find((t) => t.id === taskId || t.orderId === taskId);
  if (!target) return { success: false, message: 'Tugas tidak ditemukan' };

  // Mark task as delivered
  const updatedTasks = tasks.map((t) => (t.id === target.id ? { ...t, status: 'DELIVERED' as const } : t));
  setLocal('clothloop_courier_tasks', updatedTasks);

  // Sync drop order status to DELIVERED_TO_ARTISAN
  try {
    const dropOrders = getLocal<any[]>('clothloop_drop_orders', []);
    let donorUserId: string | null = null;
    const updatedDrops = dropOrders.map((o) => {
      if (o.id === target.id || o.bookingCode === target.orderId) {
        donorUserId = o.userId;
        return { ...o, status: 'DELIVERED_TO_ARTISAN' };
      }
      return o;
    });
    setLocal('clothloop_drop_orders', updatedDrops);
    if (donorUserId) {
      setLocal(`clothloop_drop_orders_${donorUserId}`, updatedDrops.filter(o => o.userId === donorUserId));
    }

    const supabase = createClient();
    supabase.from('drop_orders').update({
      status: 'DELIVERED_TO_ARTISAN',
    }).eq('booking_code', target.orderId).then(() => {});
  } catch {}

  // Add raw material weight to artisan inventory
  addFabricStockToArtisan('Studio Daur Asri', 5, 3.5);

  return { success: true, message: 'Penyerahan kain ke Studio Perajin sukses diverifikasi! Status donasi donatur terupdate ke Studio Rekonstruksi.' };
}

// ═══════════════════════════════════════════════════════════════════════
// 4. FINANCIAL & WITHDRAWALS
// ═══════════════════════════════════════════════════════════════════════

export function requestBankWithdrawal(
  roleOrObj: 'COURIER' | 'SELLER' | 'ARTISAN' | any,
  amount?: number,
  bankName?: string,
  accountNumber?: string,
  accountHolder?: string
): { success: boolean; message: string } {
  let role: 'COURIER' | 'SELLER' | 'ARTISAN' = 'SELLER';
  let amt = 0;
  let bName = 'BCA';
  let accNum = '';
  let accHolder = '';

  if (typeof roleOrObj === 'object' && roleOrObj !== null) {
    role = roleOrObj.artisanId ? 'ARTISAN' : roleOrObj.sellerId ? 'SELLER' : roleOrObj.courierId ? 'COURIER' : 'SELLER';
    amt = Number(roleOrObj.amount) || 0;
    bName = roleOrObj.bankName || 'BCA';
    accNum = roleOrObj.accountNumber || '';
    accHolder = roleOrObj.accountHolder || '';
  } else {
    role = roleOrObj || 'SELLER';
    amt = amount || 0;
    bName = bankName || 'BCA';
    accNum = accountNumber || '';
    accHolder = accountHolder || '';
  }

  if (role === 'COURIER') {
    const courier = getCourierProfile();
    if (courier.walletBalance < amt) {
      return { success: false, message: 'Saldo tidak mencukupi' };
    }
    const updated: CourierProfile = {
      ...courier,
      walletBalance: Math.max(0, courier.walletBalance - amt),
    };
    saveCourierProfile(updated);
  }

  const withdrawals = getLocal<any[]>('clothloop_withdrawals', []);
  withdrawals.unshift({
    id: `WD-${Date.now().toString().slice(-6)}`,
    role,
    amount: amt,
    bankName: bName,
    accountNumber: accNum,
    accountHolder: accHolder,
    status: 'PROCESSED',
    createdAt: new Date().toISOString(),
  });
  setLocal('clothloop_withdrawals', withdrawals);

  return { success: true, message: 'Pengajuan penarikan dana berhasil diproses.' };
}

export const submitBankWithdrawal = requestBankWithdrawal;

export function getWithdrawalHistory(role?: string): any[] {
  const list = getLocal<any[]>('clothloop_withdrawals', []);
  if (role) return list.filter((w) => w.role === role);
  return list;
}

// ═══════════════════════════════════════════════════════════════════════
// 5. MASTER ADMIN ECOSYSTEM STATS & USER REGISTRY
// ═══════════════════════════════════════════════════════════════════════

export interface RegisteredUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  city?: string;
  createdAt: string;
}

export function getRegisteredUsers(): RegisteredUser[] {
  return getLocal<RegisteredUser[]>('clothloop_registered_users', []);
}

export function recordNewRegisteredUser(user: Partial<RegisteredUser>): void {
  const users = getRegisteredUsers();
  const exists = users.find(u => (user.id && u.id === user.id) || (user.email && u.email.toLowerCase() === user.email.toLowerCase()));
  if (!exists && (user.email || user.fullName)) {
    const newUser: RegisteredUser = {
      id: user.id || `usr-${Date.now()}`,
      fullName: user.fullName || 'Pengguna Baru',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'USER',
      city: user.city || '',
      createdAt: user.createdAt || new Date().toISOString(),
    };
    setLocal('clothloop_registered_users', [newUser, ...users]);
  }
}

export function getDropBoxApplications(): DropBoxApplication[] {
  return getLocal<DropBoxApplication[]>('clothloop_dropbox_apps', INITIAL_DROP_BOX_APPLICATIONS);
}

export function submitNewDropBoxApplication(appData: {
  businessName: string;
  businessType: string;
  city: string;
  address: string;
  picName: string;
  picPhone: string;
  picEmail?: string;
}): DropBoxApplication {
  const current = getDropBoxApplications();
  const newApp: DropBoxApplication = {
    id: `dba-${Date.now().toString().slice(-6)}`,
    businessName: appData.businessName,
    businessType: appData.businessType,
    city: appData.city,
    address: appData.address,
    picName: appData.picName,
    picPhone: appData.picPhone,
    picEmail: appData.picEmail || '-',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };
  const updated = [newApp, ...current];
  setLocal('clothloop_dropbox_apps', updated);

  try {
    const supabase = createClient();
    supabase.from('drop_box_applications').insert({
      id: newApp.id,
      business_name: newApp.businessName,
      business_type: newApp.businessType,
      city: newApp.city,
      address: newApp.address,
      pic_name: newApp.picName,
      pic_phone: newApp.picPhone,
      pic_email: newApp.picEmail,
      status: newApp.status,
      created_at: newApp.createdAt,
    }).then(() => {});
  } catch {}

  return newApp;
}

export function updateDropBoxApplicationStatus(id: string, status: DropBoxApplication['status']): void {
  const current = getDropBoxApplications();
  const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
  setLocal('clothloop_dropbox_apps', updated);

  try {
    const supabase = createClient();
    supabase.from('drop_box_applications').update({ status }).eq('id', id).then(() => {});
  } catch {}
}

export function getAdminStats() {
  const registeredUsers = getRegisteredUsers();
  const sellerOrders = getSellerOrders();
  const artisanOrders = getArtisanOrders();
  const customItems = getCustomSellerItems();
  const customCrafts = getCustomCraftProducts();
  const courierTasks = getCourierTasks();
  const courierProfile = getCourierProfile();
  const dropOrders = getLocal<any[]>('clothloop_drop_orders', []);

  const completedTasks = courierTasks.filter((t) => t.status === 'DELIVERED').length;

  const totalSellerGMV = sellerOrders.reduce((sum: number, o: any) => sum + (o.price || 0), 0);
  const totalArtisanGMV = artisanOrders.reduce((sum: number, o: any) => sum + (o.price || 0), 0);
  const totalGMV = totalSellerGMV + totalArtisanGMV;

  const platformCommission = Math.round(totalSellerGMV * 0.10 + totalArtisanGMV * 0.40);
  const sellerPayouts = Math.round(totalSellerGMV * 0.90 + totalArtisanGMV * 0.60);
  const courierPayouts = completedTasks * 15000;

  // Donatur & Pembeli: strictly real registered user count
  const userRoleCount = registeredUsers.filter(u => u.role === 'USER' || !u.role).length;
  const totalDonors = userRoleCount;

  // Real diverted textile weight from completed pickups & drop collections
  const totalDropWeight = dropOrders.reduce((sum: number, o: any) => sum + (Number(o.actual_weight_kg || o.actualWeightKg || o.estimated_weight_kg || o.estimatedWeightKg) || 3.0), 0);
  const totalPickupWeight = completedTasks * 3.5;
  const totalWeightRecycledKg = Number((totalDropWeight + totalPickupWeight).toFixed(1));
  
  // GHG Carbon Accounting: 1 kg recycled textile prevents ~2.1 kg CO2e emissions
  const co2PreventedKg = Number((totalWeightRecycledKg * 2.1).toFixed(1));
  // Water conservation: ~30 Liters per kg textile
  const waterSavedLiters = Math.round(totalWeightRecycledKg * 30);

  // Distinct Sellers count
  const distinctSellerNames = new Set([
    ...registeredUsers.filter(u => u.role === 'SELLER').map(u => u.fullName || u.email),
    ...customItems.map(i => i.sellerName).filter(Boolean),
  ]);
  const totalSellers = Math.max(distinctSellerNames.size, customItems.length > 0 ? 1 : 0);

  // Distinct Artisans & Raw Materials inventory
  const distinctArtisanStudios = new Set([
    ...registeredUsers.filter(u => u.role === 'UMKM').map(u => u.fullName || u.email),
    ...customCrafts.map(c => c.artisanStudio || c.artisanName).filter(Boolean),
  ]);
  const totalArtisans = Math.max(distinctArtisanStudios.size, customCrafts.length > 0 ? 1 : 0);

  // Calculate live fabric stock across studios
  const studioNames = ['Studio Daur Asri', 'Atelier Sashiko Nusantara', 'Bengkel Tenun Daur Ulang Jogja', 'Studio Kriya Rekacipta Surabaya', 'Malang Upcycle Craft Center'];
  let totalArtisanFabricStock = 0;
  studioNames.forEach(s => {
    const inv = getArtisanInventory(s);
    totalArtisanFabricStock += inv.fabricStockKg || 0;
  });
  const totalRawMaterialsKg = Number(Math.max(totalArtisanFabricStock, totalWeightRecycledKg).toFixed(1));

  // Couriers: count active or registered couriers
  const totalActiveCouriers = courierProfile.isAddressConfirmed ? 1 : registeredUsers.filter(u => u.role === 'KURIR').length;

  return {
    finance: {
      totalGMV,
      totalSellerGMV,
      totalArtisanGMV,
      platformCommission,
      sellerPayouts,
      courierPayouts,
    },
    donors: {
      totalDonors,
      totalWeightRecycledKg,
      co2PreventedKg,
      waterSavedLiters,
    },
    sellers: {
      totalSellers,
      activeListings: customItems.length,
      totalSoldItems: sellerOrders.length,
    },
    crafts: {
      totalArtisans,
      totalRawMaterialsKg,
      totalCraftsSold: artisanOrders.length,
    },
    couriers: {
      totalActiveCouriers,
      completedPickups: completedTasks,
      operationalModel: 'Domisili Lokal Masing-Masing Kurir',
    },
  };
}
