export type DropMethod = 'DROPOFF' | 'PICKUP';

export type DropOrderStatus = 
  | 'PENDING'            // Menunggu serah terima / penjemputan
  | 'COURIER_PICKUP'     // Kurir dalam perjalanan / menjemput
  | 'RECEIVED'           // Telah discan & diterima kurir (poin cair)
  | 'SORTING'            // Sedang kurasi & sortir serat tekstil
  | 'DELIVERED_TO_ARTISAN' // Sampai di studio perajin UMKM
  | 'COMPLETED';         // Selesai didaur ulang / diolah jadi kerajinan

export type GarmentCondition = 'LIKE_NEW' | 'GENTLY_USED' | 'UPCYCLED' | 'VINTAGE';
export type GarmentCategory = 'Semua' | 'Wanita' | 'Pria' | 'Denim & Jeans' | 'Outerwear' | 'Upcycled Bags' | 'Vintage';
export type CraftServiceType = 'REPAIR' | 'REWORK' | 'CUSTOM_PATCHWORK' | 'UPCYCLE_BAG';
export type UserRole = 'USER' | 'SELLER' | 'UMKM' | 'KURIR' | 'ADMIN';

export interface UserRoleOption {
  id: UserRole;
  title: string;
  subtitle: string;
  badge: string;
}

export interface DropPoint {
  id: string;
  name: string;
  category: 'Drop Box Pinggir Jalan' | 'Teras Kafe Mitra' | 'Bank Sampah Digital' | 'Shelter Komunitas' | 'Pusat Daur Ulang' | string;
  address: string;
  city: string;
  province?: string;
  latitude: number;
  longitude: number;
  operatingHours: string;
  acceptedTypes: string[];
  contactPhone: string;
  image: string;
  capacityPercentage: number;
  totalCollectedKg: number;
}

export interface GarmentItemBreakdown {
  category: string;
  quantity: number;
  pointsPerItem: number;
}

export interface DropOrder {
  id: string;
  bookingCode: string;
  userId: string;
  userName: string;
  userPhone: string;
  userCity?: string;
  userDistrict?: string;
  userAddress?: string;
  method: DropMethod;
  dropPointId?: string;
  dropPointName?: string;
  dropPointAddress?: string;
  courierService?: string;
  courierName?: string;
  scheduledDate?: string;
  scheduledSlot?: string;
  estimatedWeightKg?: number;
  actualWeightKg?: number;
  itemCount: number;
  garmentBreakdown?: GarmentItemBreakdown[];
  garmentTypes: string[];
  status: DropOrderStatus;
  pointsAwarded: number;
  pointsCredited: boolean;
  waterSavedLiters: number;
  co2SavedKg: number;
  createdAt: string;
  scannedAt?: string;
  assignedArtisanStudio?: string;
  qrCodeValue: string;
  notes?: string;
}

export interface MarketItem {
  id: string;
  title: string;
  brand?: string;
  sellerName: string;
  sellerAvatar?: string;
  sellerCity: string;
  price: number;
  originalPrice?: number;
  condition: GarmentCondition;
  category: GarmentCategory;
  size: string;
  measurements: {
    chestWidthCm: number;
    lengthCm: number;
    sleeveLengthCm?: number;
    waistWidthCm?: number;
  };
  material: string;
  story: string;
  images: string[];
  waterSavedLiters: number;
  co2SavedKg: number;
  isVerifiedQC: boolean;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  rating: number;
  reviewCount: number;
}

export interface ArtisanProfile {
  id: string;
  name: string;
  workshopName: string;
  specialty: string[];
  city: string;
  avatar: string;
  coverImage: string;
  rating: number;
  completedOrders: number;
  yearsOfExperience: number;
  bio: string;
  startingPrice: number;
  portfolio: {
    id: string;
    title: string;
    beforeImage: string;
    afterImage: string;
    description: string;
    price: number;
  }[];
  isAvailable: boolean;
}

export interface UpcycleRequest {
  id: string;
  requestId: string;
  customerName: string;
  customerPhone: string;
  artisanId: string;
  artisanName: string;
  serviceType: CraftServiceType;
  garmentOriginalDescription: string;
  targetTransformation: string;
  estimatedPrice: number;
  uploadedPhotoUrl?: string;
  specialInstructions?: string;
  status: 'SUBMITTED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
}

export interface RewardVoucher {
  id: string;
  title: string;
  partnerBrand: string;
  logo: string;
  category: 'Discount' | 'Eco Coffee' | 'Upcycle Workshop' | 'Tree Planting';
  pointsCost: number;
  description: string;
  discountValue: string;
  validUntil: string;
  terms: string[];
}

export type CraftProductCategory = 'Semua' | 'Tas & Pouch' | 'Busana Upcycled' | 'Aksesoris & Topi' | 'Home Living';

export interface CraftProduct {
  id: string;
  title: string;
  artisanName: string;
  artisanStudio: string;
  artisanCity: string;
  price: number;
  originalPrice?: number;
  category: CraftProductCategory;
  technique: string;
  materialSaved: string;
  dimensions?: string;
  story: string;
  images: string[];
  stockCount: number;
  rating: number;
  reviewCount: number;
  waterSavedLiters: number;
  co2SavedKg: number;
}

export interface CartItem {
  item: MarketItem;
  quantity: number;
}

export type CraftOrderStatus = 
  | 'PACKING'              // Barang Masih Dikemas
  | 'HANDED_TO_COURIER'    // Barang Sudah Diserahkan ke Kurir
  | 'IN_TRANSIT'           // Barang dalam Proses Pengantaran
  | 'DELIVERED'            // Barang Telah Sampai
  | 'COMPLETED';           // Selesai / Diterima Pembeli

export interface CraftOrderItem {
  id: string;
  title: string;
  artisanStudio: string;
  artisanCity: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CraftOrder {
  id: string;
  orderNumber: string;
  userId?: string;
  trackingNumber: string;
  courierName: string;
  items: CraftOrderItem[];
  receiverName: string;
  receiverPhone: string;
  destinationCity: string;
  fullAddress: string;
  subtotal: number;
  shippingCost: number;
  pointsDiscount: number;
  pointsUsed: number;
  totalAmount: number;
  paymentMethod: string;
  paymentCategory: 'BANK_VA' | 'E_WALLET' | 'QRIS';
  status: CraftOrderStatus;
  escrowStatus: 'HELD_IN_ESCROW' | 'RELEASED_TO_ARTISAN';
  createdAt: string;
  estimatedDeliveryDate: string;
}

// ── Portal Support Types ──
export interface CourierProfile {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  fullAddress: string;
  vehicleType: string;
  vehiclePlate: string;
  walletBalance: number;
  totalCompletedPickups: number;
  isAvailable: boolean;
}

export interface BankWithdrawal {
  id: string;
  courierId?: string;
  sellerId?: string;
  artisanId?: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: 'PENDING' | 'SUCCESS' | 'REJECTED';
  createdAt: string;
}

export interface DropBoxApplication {
  id: string;
  institutionName: string;
  institutionType: 'KAMPUS' | 'KANTOR' | 'KAFE' | 'KOMUNITAS' | 'PERUMAHAN';
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  city: string;
  fullAddress: string;
  estimatedFootTraffic: string;
  status: 'MENUNGGU_REVIEW' | 'DISETUJUI' | 'SURVEI_LOKASI' | 'TERPASANG' | 'DITOLAK';
  notes?: string;
  createdAt: string;
}

export interface ArtisanStudioInventory {
  fabricStockKg: number;
  fabricPiecesCount: number;
  completedProductsCount: number;
  totalDonationsReceived: number;
  studioVerificationCode: string;
}

