export type DropMethod = 'DROPOFF' | 'PICKUP';
export type DropOrderStatus = 'PENDING' | 'RECEIVED' | 'SORTING' | 'COMPLETED';
export type GarmentCondition = 'LIKE_NEW' | 'GENTLY_USED' | 'UPCYCLED' | 'VINTAGE';
export type GarmentCategory = 'Semua' | 'Wanita' | 'Pria' | 'Denim & Jeans' | 'Outerwear' | 'Upcycled Bags' | 'Vintage';
export type CraftServiceType = 'REPAIR' | 'REWORK' | 'CUSTOM_PATCHWORK' | 'UPCYCLE_BAG';

export interface DropPoint {
  id: string;
  name: string;
  category: 'Coffee Shop Partner' | 'Mall Drop Box' | 'Bank Sampah Digital' | 'Retail Boutique';
  address: string;
  city: 'Jakarta Selatan' | 'Jakarta Pusat' | 'Bandung' | 'Surabaya' | 'Bali' | 'Yogyakarta';
  latitude: number;
  longitude: number;
  operatingHours: string;
  acceptedTypes: string[];
  contactPhone: string;
  image: string;
  capacityPercentage: number;
  totalCollectedKg: number;
}

export interface DropOrder {
  id: string;
  bookingCode: string;
  userId: string;
  userName: string;
  userPhone: string;
  userAddress?: string;
  method: DropMethod;
  dropPointId?: string;
  dropPointName?: string;
  courierService?: string;
  estimatedWeightKg: number;
  actualWeightKg?: number;
  itemCount: number;
  garmentTypes: string[];
  status: DropOrderStatus;
  pointsAwarded: number;
  waterSavedLiters: number;
  co2SavedKg: number;
  createdAt: string;
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

export interface CartItem {
  item: MarketItem;
  quantity: number;
}
