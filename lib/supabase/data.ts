import { createClient } from './client';
import { DropPoint, MarketItem, ArtisanProfile, RewardVoucher, DropOrder } from '@/lib/types';

// ── Drop Points ─────────────────────────────────────
export async function fetchDropPoints(): Promise<DropPoint[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('drop_points')
      .select('*')
      .order('city', { ascending: true });

    if (error || !data) return [];

    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      category: d.category,
      address: d.address,
      city: d.city,
      latitude: d.latitude,
      longitude: d.longitude,
      operatingHours: d.operating_hours,
      acceptedTypes: d.accepted_types || [],
      contactPhone: d.contact_phone,
      image: d.image,
      capacityPercentage: d.capacity_percentage || 0,
      totalCollectedKg: Number(d.total_collected_kg) || 0,
    }));
  } catch {
    return [];
  }
}

// ── Market Items ────────────────────────────────────
export async function fetchMarketItems(): Promise<MarketItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('market_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      brand: d.brand,
      sellerName: d.seller_name,
      sellerAvatar: d.seller_avatar,
      sellerCity: d.seller_city,
      price: Number(d.price),
      originalPrice: d.original_price ? Number(d.original_price) : undefined,
      condition: d.condition,
      category: d.category,
      size: d.size,
      measurements: d.measurements || { chestWidthCm: 0, lengthCm: 0 },
      material: d.material,
      story: d.story,
      images: d.images || [],
      waterSavedLiters: Number(d.water_saved_liters) || 0,
      co2SavedKg: Number(d.co2_saved_kg) || 0,
      isVerifiedQC: d.is_verified_qc ?? true,
      status: d.status || 'AVAILABLE',
      rating: Number(d.rating) || 5.0,
      reviewCount: Number(d.review_count) || 0,
    }));
  } catch {
    return [];
  }
}

// ── Artisans ────────────────────────────────────────
export async function fetchArtisans(): Promise<ArtisanProfile[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('artisan_profiles')
      .select('*')
      .order('rating', { ascending: false });

    if (error || !data) return [];

    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      workshopName: d.workshop_name,
      specialty: d.specialty || [],
      city: d.city,
      avatar: d.avatar,
      coverImage: d.cover_image,
      rating: Number(d.rating) || 5.0,
      completedOrders: Number(d.completed_orders) || 0,
      yearsOfExperience: Number(d.years_of_experience) || 0,
      bio: d.bio,
      startingPrice: Number(d.starting_price) || 0,
      portfolio: d.portfolio || [],
      isAvailable: d.is_available ?? true,
    }));
  } catch {
    return [];
  }
}

// ── Reward Vouchers ─────────────────────────────────
export async function fetchRewardVouchers(): Promise<RewardVoucher[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('reward_vouchers')
      .select('*')
      .order('points_cost', { ascending: true });

    if (error || !data) return [];

    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      partnerBrand: d.partner_brand,
      logo: d.logo,
      category: d.category,
      pointsCost: Number(d.points_cost),
      description: d.description,
      discountValue: d.discount_value,
      validUntil: d.valid_until,
      terms: d.terms || [],
    }));
  } catch {
    return [];
  }
}

// ── User Orders ─────────────────────────────────────
export async function fetchUserDropOrders(userId: string): Promise<DropOrder[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('drop_orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((d: any) => ({
      id: d.id,
      bookingCode: d.booking_code,
      userId: d.user_id,
      userName: d.user_name,
      userPhone: d.user_phone,
      userAddress: d.user_address,
      method: d.method,
      dropPointId: d.drop_point_id,
      dropPointName: d.drop_point_name,
      courierService: d.courier_service,
      estimatedWeightKg: Number(d.estimated_weight_kg),
      actualWeightKg: d.actual_weight_kg ? Number(d.actual_weight_kg) : undefined,
      itemCount: Number(d.item_count),
      garmentTypes: d.garment_types || [],
      status: d.status,
      pointsAwarded: Number(d.points_awarded) || 0,
      waterSavedLiters: Number(d.water_saved_liters) || 0,
      co2SavedKg: Number(d.co2_saved_kg) || 0,
      createdAt: d.created_at,
      qrCodeValue: d.qr_code_value,
      notes: d.notes,
    }));
  } catch {
    return [];
  }
}
