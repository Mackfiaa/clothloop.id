import { createClient } from './client';
import { DropPoint, MarketItem, ArtisanProfile, RewardVoucher, DropOrder, CraftOrder, CraftOrderStatus } from '@/lib/types';

// ── Drop Points (180 Titik Seluruh Indonesia) ──
export const DROP_POINTS_MOCK: DropPoint[] = [
  {
    "id": "dp-jakarta-selatan-1",
    "name": "Drop Box Pinggir Jalan Pelataran Senopati",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Pelataran No. 15, Jakarta Selatan (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Selatan",
    "province": "DKI Jakarta",
    "latitude": -6.2615,
    "longitude": 106.8106,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-001",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 47,
    "totalCollectedKg": 233
  },
  {
    "id": "dp-jakarta-selatan-2",
    "name": "Teras Kafe Mitra Pedestrian Cilandak Town",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Pedestrian No. 35, Jakarta Selatan (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Selatan",
    "province": "DKI Jakarta",
    "latitude": -6.2495,
    "longitude": 106.8246,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-002",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 54,
    "totalCollectedKg": 266
  },
  {
    "id": "dp-jakarta-selatan-3",
    "name": "Shelter Komunitas Kemang Creative Hub",
    "category": "Shelter Komunitas",
    "address": "Jl. Kemang No. 55, Jakarta Selatan (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Selatan",
    "province": "DKI Jakarta",
    "latitude": -6.2765,
    "longitude": 106.7996,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-003",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 61,
    "totalCollectedKg": 299
  },
  {
    "id": "dp-jakarta-pusat-1",
    "name": "Teras Kafe Mitra Sabang Menteng Pedestrian",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Sabang No. 15, Jakarta Pusat (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Pusat",
    "province": "DKI Jakarta",
    "latitude": -6.1805,
    "longitude": 106.8284,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-004",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 68,
    "totalCollectedKg": 332
  },
  {
    "id": "dp-jakarta-pusat-2",
    "name": "Shelter Komunitas Taman Ismail Marzuki Cikini",
    "category": "Shelter Komunitas",
    "address": "Jl. Taman No. 35, Jakarta Pusat (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Pusat",
    "province": "DKI Jakarta",
    "latitude": -6.1685,
    "longitude": 106.8424,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-005",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 75,
    "totalCollectedKg": 365
  },
  {
    "id": "dp-jakarta-pusat-3",
    "name": "Bank Sampah Digital Pelataran Lapangan Banteng",
    "category": "Bank Sampah Digital",
    "address": "Jl. Pelataran No. 55, Jakarta Pusat (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Pusat",
    "province": "DKI Jakarta",
    "latitude": -6.1955,
    "longitude": 106.8174,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-006",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 82,
    "totalCollectedKg": 398
  },
  {
    "id": "dp-jakarta-barat-1",
    "name": "Teras Kafe Tanjung Duren",
    "category": "Shelter Komunitas",
    "address": "Jl. Teras No. 15, Jakarta Barat (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Barat",
    "province": "DKI Jakarta",
    "latitude": -6.1683,
    "longitude": 106.7588,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-007",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 89,
    "totalCollectedKg": 431
  },
  {
    "id": "dp-jakarta-barat-2",
    "name": "Bank Sampah Digital Trotoar Tomang Raya",
    "category": "Bank Sampah Digital",
    "address": "Jl. Trotoar No. 35, Jakarta Barat (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Barat",
    "province": "DKI Jakarta",
    "latitude": -6.1563,
    "longitude": 106.7728,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-008",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 46,
    "totalCollectedKg": 464
  },
  {
    "id": "dp-jakarta-barat-3",
    "name": "Drop Box Pinggir Jalan Puri Indah Green Plaza",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Puri No. 55, Jakarta Barat (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Barat",
    "province": "DKI Jakarta",
    "latitude": -6.1833,
    "longitude": 106.7478,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-009",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 53,
    "totalCollectedKg": 497
  },
  {
    "id": "dp-jakarta-timur-1",
    "name": "Bank Sampah Digital Komunitas Sirkular Rawamangun",
    "category": "Bank Sampah Digital",
    "address": "Jl. Komunitas No. 15, Jakarta Timur (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Timur",
    "province": "DKI Jakarta",
    "latitude": -6.225,
    "longitude": 106.9004,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-010",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 60,
    "totalCollectedKg": 530
  },
  {
    "id": "dp-jakarta-timur-2",
    "name": "Teras Raden Inten Duren Sawit",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Teras No. 35, Jakarta Timur (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Timur",
    "province": "DKI Jakarta",
    "latitude": -6.213,
    "longitude": 106.9144,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-011",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 67,
    "totalCollectedKg": 563
  },
  {
    "id": "dp-jakarta-timur-3",
    "name": "Teras Kafe Mitra Cibubur Junction Pedestrian",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Cibubur No. 55, Jakarta Timur (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Timur",
    "province": "DKI Jakarta",
    "latitude": -6.24,
    "longitude": 106.8894,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-012",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 74,
    "totalCollectedKg": 596
  },
  {
    "id": "dp-jakarta-utara-1",
    "name": "Drop Box Pinggir Jalan Pelataran Danau Sunter",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Pelataran No. 15, Jakarta Utara (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Utara",
    "province": "DKI Jakarta",
    "latitude": -6.1384,
    "longitude": 106.864,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-013",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 81,
    "totalCollectedKg": 629
  },
  {
    "id": "dp-jakarta-utara-2",
    "name": "Pluit Village Eco Shelter",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Pluit No. 35, Jakarta Utara (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Utara",
    "province": "DKI Jakarta",
    "latitude": -6.1264,
    "longitude": 106.878,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-014",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 88,
    "totalCollectedKg": 662
  },
  {
    "id": "dp-jakarta-utara-3",
    "name": "Shelter Komunitas Kelapa Gading Boulevard",
    "category": "Shelter Komunitas",
    "address": "Jl. Kelapa No. 55, Jakarta Utara (Area Pedestrian & Parkir Terbuka)",
    "city": "Jakarta Utara",
    "province": "DKI Jakarta",
    "latitude": -6.1534,
    "longitude": 106.853,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-015",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 45,
    "totalCollectedKg": 695
  },
  {
    "id": "dp-bogor-1",
    "name": "Teras Pajajaran Baranangsiang",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Teras No. 15, Bogor (Area Pedestrian & Parkir Terbuka)",
    "city": "Bogor",
    "province": "Jawa Barat",
    "latitude": -6.5971,
    "longitude": 106.806,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-016",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 52,
    "totalCollectedKg": 728
  },
  {
    "id": "dp-bogor-2",
    "name": "Shelter Komunitas Lapangan Sempur Jogging Track",
    "category": "Shelter Komunitas",
    "address": "Jl. Lapangan No. 35, Bogor (Area Pedestrian & Parkir Terbuka)",
    "city": "Bogor",
    "province": "Jawa Barat",
    "latitude": -6.5851,
    "longitude": 106.82,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-017",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 59,
    "totalCollectedKg": 761
  },
  {
    "id": "dp-bogor-3",
    "name": "Bank Sampah Digital Air Mancur Heritage Spot",
    "category": "Bank Sampah Digital",
    "address": "Jl. Air No. 55, Bogor (Area Pedestrian & Parkir Terbuka)",
    "city": "Bogor",
    "province": "Jawa Barat",
    "latitude": -6.6121,
    "longitude": 106.795,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-018",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 66,
    "totalCollectedKg": 794
  },
  {
    "id": "dp-depok-1",
    "name": "Shelter Komunitas Margonda Raya UI Gate",
    "category": "Shelter Komunitas",
    "address": "Jl. Margonda No. 15, Depok (Area Pedestrian & Parkir Terbuka)",
    "city": "Depok",
    "province": "Jawa Barat",
    "latitude": -6.4025,
    "longitude": 106.7942,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-019",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 73,
    "totalCollectedKg": 827
  },
  {
    "id": "dp-depok-2",
    "name": "Bank Sampah Digital Sawangan Elok Pedestrian",
    "category": "Bank Sampah Digital",
    "address": "Jl. Sawangan No. 35, Depok (Area Pedestrian & Parkir Terbuka)",
    "city": "Depok",
    "province": "Jawa Barat",
    "latitude": -6.3905,
    "longitude": 106.8082,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-020",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 80,
    "totalCollectedKg": 860
  },
  {
    "id": "dp-depok-3",
    "name": "Drop Box Pinggir Jalan Grand Depok City Boulevard",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Grand No. 55, Depok (Area Pedestrian & Parkir Terbuka)",
    "city": "Depok",
    "province": "Jawa Barat",
    "latitude": -6.4175,
    "longitude": 106.7832,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-021",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 87,
    "totalCollectedKg": 893
  },
  {
    "id": "dp-tangerang-1",
    "name": "Bank Sampah Digital Jalur Sutera Alam Sutera",
    "category": "Bank Sampah Digital",
    "address": "Jl. Jalur No. 15, Tangerang (Area Pedestrian & Parkir Terbuka)",
    "city": "Tangerang",
    "province": "Banten",
    "latitude": -6.1783,
    "longitude": 106.6319,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-022",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 44,
    "totalCollectedKg": 226
  },
  {
    "id": "dp-tangerang-2",
    "name": "Drop Box Pinggir Jalan Modernland Green Corner",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Modernland No. 35, Tangerang (Area Pedestrian & Parkir Terbuka)",
    "city": "Tangerang",
    "province": "Banten",
    "latitude": -6.1663,
    "longitude": 106.6459,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-023",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 51,
    "totalCollectedKg": 259
  },
  {
    "id": "dp-tangerang-3",
    "name": "Teras Kafe Mitra Tangcity Mall Pedestrian",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Tangcity No. 55, Tangerang (Area Pedestrian & Parkir Terbuka)",
    "city": "Tangerang",
    "province": "Banten",
    "latitude": -6.1933,
    "longitude": 106.6209,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-024",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 58,
    "totalCollectedKg": 292
  },
  {
    "id": "dp-tangerang-selatan-1",
    "name": "Drop Box Pinggir Jalan Bintaro Sektor 9 Creative Hub",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Bintaro No. 15, Tangerang Selatan (Area Pedestrian & Parkir Terbuka)",
    "city": "Tangerang Selatan",
    "province": "Banten",
    "latitude": -6.2886,
    "longitude": 106.7179,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-025",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 65,
    "totalCollectedKg": 325
  },
  {
    "id": "dp-tangerang-selatan-2",
    "name": "Teras Kafe Mitra BSD The Breeze Pelataran",
    "category": "Teras Kafe Mitra",
    "address": "Jl. BSD No. 35, Tangerang Selatan (Area Pedestrian & Parkir Terbuka)",
    "city": "Tangerang Selatan",
    "province": "Banten",
    "latitude": -6.2766,
    "longitude": 106.7319,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-026",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 72,
    "totalCollectedKg": 358
  },
  {
    "id": "dp-tangerang-selatan-3",
    "name": "Shelter Komunitas Pamulang Square Green Spot",
    "category": "Shelter Komunitas",
    "address": "Jl. Pamulang No. 55, Tangerang Selatan (Area Pedestrian & Parkir Terbuka)",
    "city": "Tangerang Selatan",
    "province": "Banten",
    "latitude": -6.3036,
    "longitude": 106.7069,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-027",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 79,
    "totalCollectedKg": 391
  },
  {
    "id": "dp-bekasi-1",
    "name": "Teras Kafe Mitra Summarecon Bekasi Patriot",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Summarecon No. 15, Bekasi (Area Pedestrian & Parkir Terbuka)",
    "city": "Bekasi",
    "province": "Jawa Barat",
    "latitude": -6.2383,
    "longitude": 106.9756,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-028",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 86,
    "totalCollectedKg": 424
  },
  {
    "id": "dp-bekasi-2",
    "name": "Harapan Indah Eco Shelter",
    "category": "Shelter Komunitas",
    "address": "Jl. Harapan No. 35, Bekasi (Area Pedestrian & Parkir Terbuka)",
    "city": "Bekasi",
    "province": "Jawa Barat",
    "latitude": -6.2263,
    "longitude": 106.9896,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-029",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 43,
    "totalCollectedKg": 457
  },
  {
    "id": "dp-bekasi-3",
    "name": "Galaxy City Teras Selatan",
    "category": "Bank Sampah Digital",
    "address": "Jl. Galaxy No. 55, Bekasi (Area Pedestrian & Parkir Terbuka)",
    "city": "Bekasi",
    "province": "Jawa Barat",
    "latitude": -6.2533,
    "longitude": 106.9646,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-030",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 50,
    "totalCollectedKg": 490
  },
  {
    "id": "dp-bandung-1",
    "name": "Shelter Komunitas Nyampah Baik Dago Atas",
    "category": "Shelter Komunitas",
    "address": "Jl. Nyampah No. 15, Bandung (Area Pedestrian & Parkir Terbuka)",
    "city": "Bandung",
    "province": "Jawa Barat",
    "latitude": -6.9175,
    "longitude": 107.6191,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-031",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 57,
    "totalCollectedKg": 523
  },
  {
    "id": "dp-bandung-2",
    "name": "Teras Riau Creative Hub",
    "category": "Bank Sampah Digital",
    "address": "Jl. Teras No. 35, Bandung (Area Pedestrian & Parkir Terbuka)",
    "city": "Bandung",
    "province": "Jawa Barat",
    "latitude": -6.9055,
    "longitude": 107.6331,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-032",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 64,
    "totalCollectedKg": 556
  },
  {
    "id": "dp-bandung-3",
    "name": "Eco Shelter Buah Batu",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Eco No. 55, Bandung (Area Pedestrian & Parkir Terbuka)",
    "city": "Bandung",
    "province": "Jawa Barat",
    "latitude": -6.9325,
    "longitude": 107.6081,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-033",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 71,
    "totalCollectedKg": 589
  },
  {
    "id": "dp-cimahi-1",
    "name": "Bank Sampah Digital Baros Creative Workshop",
    "category": "Bank Sampah Digital",
    "address": "Jl. Baros No. 15, Cimahi (Area Pedestrian & Parkir Terbuka)",
    "city": "Cimahi",
    "province": "Jawa Barat",
    "latitude": -6.8723,
    "longitude": 107.5422,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-034",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 78,
    "totalCollectedKg": 622
  },
  {
    "id": "dp-cimahi-2",
    "name": "Drop Box Pinggir Jalan Alun-Alun Cimahi Trotoar",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Alun-Alun No. 35, Cimahi (Area Pedestrian & Parkir Terbuka)",
    "city": "Cimahi",
    "province": "Jawa Barat",
    "latitude": -6.8603,
    "longitude": 107.5562,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-035",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 85,
    "totalCollectedKg": 655
  },
  {
    "id": "dp-cimahi-3",
    "name": "Teras Kafe Mitra Cimindi Green Point",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Cimindi No. 55, Cimahi (Area Pedestrian & Parkir Terbuka)",
    "city": "Cimahi",
    "province": "Jawa Barat",
    "latitude": -6.8873,
    "longitude": 107.5312,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-036",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 42,
    "totalCollectedKg": 688
  },
  {
    "id": "dp-cirebon-1",
    "name": "Kesambi Drajat Shelter",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Kesambi No. 15, Cirebon (Area Pedestrian & Parkir Terbuka)",
    "city": "Cirebon",
    "province": "Jawa Barat",
    "latitude": -6.732,
    "longitude": 108.5523,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-037",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 49,
    "totalCollectedKg": 721
  },
  {
    "id": "dp-cirebon-2",
    "name": "Teras Kafe Mitra Kartini Heritage Corner",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Kartini No. 35, Cirebon (Area Pedestrian & Parkir Terbuka)",
    "city": "Cirebon",
    "province": "Jawa Barat",
    "latitude": -6.72,
    "longitude": 108.5663,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-038",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 56,
    "totalCollectedKg": 754
  },
  {
    "id": "dp-cirebon-3",
    "name": "Shelter Komunitas Grage City Pedestrian",
    "category": "Shelter Komunitas",
    "address": "Jl. Grage No. 55, Cirebon (Area Pedestrian & Parkir Terbuka)",
    "city": "Cirebon",
    "province": "Jawa Barat",
    "latitude": -6.747,
    "longitude": 108.5413,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-039",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 63,
    "totalCollectedKg": 787
  },
  {
    "id": "dp-sukabumi-1",
    "name": "Teras Kafe Mitra Cikole Surya Kencana",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Cikole No. 15, Sukabumi (Area Pedestrian & Parkir Terbuka)",
    "city": "Sukabumi",
    "province": "Jawa Barat",
    "latitude": -6.9277,
    "longitude": 106.93,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-040",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 70,
    "totalCollectedKg": 820
  },
  {
    "id": "dp-sukabumi-2",
    "name": "Shelter Komunitas Baros Daur Ulang Perca",
    "category": "Shelter Komunitas",
    "address": "Jl. Baros No. 35, Sukabumi (Area Pedestrian & Parkir Terbuka)",
    "city": "Sukabumi",
    "province": "Jawa Barat",
    "latitude": -6.9157,
    "longitude": 106.944,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-041",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 77,
    "totalCollectedKg": 853
  },
  {
    "id": "dp-sukabumi-3",
    "name": "Bank Sampah Digital Pelabuhan Ratu Eco Hub",
    "category": "Bank Sampah Digital",
    "address": "Jl. Pelabuhan No. 55, Sukabumi (Area Pedestrian & Parkir Terbuka)",
    "city": "Sukabumi",
    "province": "Jawa Barat",
    "latitude": -6.9427,
    "longitude": 106.919,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-042",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 84,
    "totalCollectedKg": 886
  },
  {
    "id": "dp-tasikmalaya-1",
    "name": "Shelter Komunitas Indihiang Mitra Bordir",
    "category": "Shelter Komunitas",
    "address": "Jl. Indihiang No. 15, Tasikmalaya (Area Pedestrian & Parkir Terbuka)",
    "city": "Tasikmalaya",
    "province": "Jawa Barat",
    "latitude": -7.3274,
    "longitude": 108.2207,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-043",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 41,
    "totalCollectedKg": 219
  },
  {
    "id": "dp-tasikmalaya-2",
    "name": "Bank Sampah Digital Cihideung Alun-Alun",
    "category": "Bank Sampah Digital",
    "address": "Jl. Cihideung No. 35, Tasikmalaya (Area Pedestrian & Parkir Terbuka)",
    "city": "Tasikmalaya",
    "province": "Jawa Barat",
    "latitude": -7.3154,
    "longitude": 108.2347,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-044",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 48,
    "totalCollectedKg": 252
  },
  {
    "id": "dp-tasikmalaya-3",
    "name": "Drop Box Pinggir Jalan Hazet Heritage Walk",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Hazet No. 55, Tasikmalaya (Area Pedestrian & Parkir Terbuka)",
    "city": "Tasikmalaya",
    "province": "Jawa Barat",
    "latitude": -7.3424,
    "longitude": 108.2097,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-045",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 55,
    "totalCollectedKg": 285
  },
  {
    "id": "dp-serang-1",
    "name": "Bank Sampah Digital Alun-Alun Barat Kota Serang",
    "category": "Bank Sampah Digital",
    "address": "Jl. Alun-Alun No. 15, Serang (Area Pedestrian & Parkir Terbuka)",
    "city": "Serang",
    "province": "Banten",
    "latitude": -6.1104,
    "longitude": 106.164,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-046",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 62,
    "totalCollectedKg": 318
  },
  {
    "id": "dp-serang-2",
    "name": "Drop Box Pinggir Jalan Ciceri Boulevard Pedestrian",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Ciceri No. 35, Serang (Area Pedestrian & Parkir Terbuka)",
    "city": "Serang",
    "province": "Banten",
    "latitude": -6.0984,
    "longitude": 106.178,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-047",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 69,
    "totalCollectedKg": 351
  },
  {
    "id": "dp-serang-3",
    "name": "Teras Kafe Mitra Pakupatan Kampus Untirta",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Pakupatan No. 55, Serang (Area Pedestrian & Parkir Terbuka)",
    "city": "Serang",
    "province": "Banten",
    "latitude": -6.1254,
    "longitude": 106.153,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-048",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 76,
    "totalCollectedKg": 384
  },
  {
    "id": "dp-semarang-1",
    "name": "Drop Box Pinggir Jalan Kota Lama Letjen Suprapto",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Kota No. 15, Semarang (Area Pedestrian & Parkir Terbuka)",
    "city": "Semarang",
    "province": "Jawa Tengah",
    "latitude": -6.9667,
    "longitude": 110.4167,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-049",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 83,
    "totalCollectedKg": 417
  },
  {
    "id": "dp-semarang-2",
    "name": "Teras Kafe Mitra Tembalang Undip Campus Gate",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Tembalang No. 35, Semarang (Area Pedestrian & Parkir Terbuka)",
    "city": "Semarang",
    "province": "Jawa Tengah",
    "latitude": -6.9547,
    "longitude": 110.4307,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-050",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 40,
    "totalCollectedKg": 450
  },
  {
    "id": "dp-semarang-3",
    "name": "Shelter Komunitas Simpang Lima Green Walk",
    "category": "Shelter Komunitas",
    "address": "Jl. Simpang No. 55, Semarang (Area Pedestrian & Parkir Terbuka)",
    "city": "Semarang",
    "province": "Jawa Tengah",
    "latitude": -6.9817,
    "longitude": 110.4057,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-051",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 47,
    "totalCollectedKg": 483
  },
  {
    "id": "dp-surakarta--solo--1",
    "name": "Teras Kafe Mitra Slamet Riyadi Sriwedari",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Slamet No. 15, Surakarta (Solo) (Area Pedestrian & Parkir Terbuka)",
    "city": "Surakarta (Solo)",
    "province": "Jawa Tengah",
    "latitude": -7.5755,
    "longitude": 110.8243,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-052",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 54,
    "totalCollectedKg": 516
  },
  {
    "id": "dp-surakarta--solo--2",
    "name": "Shelter Komunitas Laweyan Heritage Batik Yard",
    "category": "Shelter Komunitas",
    "address": "Jl. Laweyan No. 35, Surakarta (Solo) (Area Pedestrian & Parkir Terbuka)",
    "city": "Surakarta (Solo)",
    "province": "Jawa Tengah",
    "latitude": -7.5635,
    "longitude": 110.8383,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-053",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 61,
    "totalCollectedKg": 549
  },
  {
    "id": "dp-surakarta--solo--3",
    "name": "Bank Sampah Digital Manahan Stadium Corner",
    "category": "Bank Sampah Digital",
    "address": "Jl. Manahan No. 55, Surakarta (Solo) (Area Pedestrian & Parkir Terbuka)",
    "city": "Surakarta (Solo)",
    "province": "Jawa Tengah",
    "latitude": -7.5905,
    "longitude": 110.8133,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-054",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 68,
    "totalCollectedKg": 582
  },
  {
    "id": "dp-magelang-1",
    "name": "Shelter Komunitas Alun-Alun Utara Magelang",
    "category": "Shelter Komunitas",
    "address": "Jl. Alun-Alun No. 15, Magelang (Area Pedestrian & Parkir Terbuka)",
    "city": "Magelang",
    "province": "Jawa Tengah",
    "latitude": -7.4706,
    "longitude": 110.2178,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-055",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 75,
    "totalCollectedKg": 615
  },
  {
    "id": "dp-magelang-2",
    "name": "Bank Sampah Digital Mertoyudan Art Gallery",
    "category": "Bank Sampah Digital",
    "address": "Jl. Mertoyudan No. 35, Magelang (Area Pedestrian & Parkir Terbuka)",
    "city": "Magelang",
    "province": "Jawa Tengah",
    "latitude": -7.4586,
    "longitude": 110.2318,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-056",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 82,
    "totalCollectedKg": 648
  },
  {
    "id": "dp-magelang-3",
    "name": "Drop Box Pinggir Jalan Borobudur Heritage Access",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Borobudur No. 55, Magelang (Area Pedestrian & Parkir Terbuka)",
    "city": "Magelang",
    "province": "Jawa Tengah",
    "latitude": -7.4856,
    "longitude": 110.2068,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-057",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 89,
    "totalCollectedKg": 681
  },
  {
    "id": "dp-yogyakarta-1",
    "name": "Bank Sampah Digital KainKala Prawirotaman",
    "category": "Bank Sampah Digital",
    "address": "Jl. KainKala No. 15, Yogyakarta (Area Pedestrian & Parkir Terbuka)",
    "city": "Yogyakarta",
    "province": "DI Yogyakarta",
    "latitude": -7.7956,
    "longitude": 110.3695,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-058",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 46,
    "totalCollectedKg": 714
  },
  {
    "id": "dp-yogyakarta-2",
    "name": "Drop Box Pinggir Jalan Tirtodipuran Creative Yard",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Tirtodipuran No. 35, Yogyakarta (Area Pedestrian & Parkir Terbuka)",
    "city": "Yogyakarta",
    "province": "DI Yogyakarta",
    "latitude": -7.7836,
    "longitude": 110.3835,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-059",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 53,
    "totalCollectedKg": 747
  },
  {
    "id": "dp-yogyakarta-3",
    "name": "Teras Kafe Mitra Malioboro Pedestrian Walk",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Malioboro No. 55, Yogyakarta (Area Pedestrian & Parkir Terbuka)",
    "city": "Yogyakarta",
    "province": "DI Yogyakarta",
    "latitude": -7.8106,
    "longitude": 110.3585,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-060",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 60,
    "totalCollectedKg": 780
  },
  {
    "id": "dp-sleman-1",
    "name": "Drop Box Pinggir Jalan Affandi Gejayan Kampus",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Affandi No. 15, Sleman (Area Pedestrian & Parkir Terbuka)",
    "city": "Sleman",
    "province": "DI Yogyakarta",
    "latitude": -7.7156,
    "longitude": 110.3556,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-061",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 67,
    "totalCollectedKg": 813
  },
  {
    "id": "dp-sleman-2",
    "name": "Teras Kafe Mitra Kaliurang KM 5 Corner",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Kaliurang No. 35, Sleman (Area Pedestrian & Parkir Terbuka)",
    "city": "Sleman",
    "province": "DI Yogyakarta",
    "latitude": -7.7036,
    "longitude": 110.3696,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-062",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 74,
    "totalCollectedKg": 846
  },
  {
    "id": "dp-sleman-3",
    "name": "Seturan Youth Shelter",
    "category": "Shelter Komunitas",
    "address": "Jl. Seturan No. 55, Sleman (Area Pedestrian & Parkir Terbuka)",
    "city": "Sleman",
    "province": "DI Yogyakarta",
    "latitude": -7.7306,
    "longitude": 110.3446,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-063",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 81,
    "totalCollectedKg": 879
  },
  {
    "id": "dp-bantul-1",
    "name": "Teras Kafe Mitra Kasongan Daur Ulang Perca",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Kasongan No. 15, Bantul (Area Pedestrian & Parkir Terbuka)",
    "city": "Bantul",
    "province": "DI Yogyakarta",
    "latitude": -7.8894,
    "longitude": 110.3297,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-064",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 88,
    "totalCollectedKg": 212
  },
  {
    "id": "dp-bantul-2",
    "name": "Shelter Komunitas Sewon ISI Creative Spot",
    "category": "Shelter Komunitas",
    "address": "Jl. Sewon No. 35, Bantul (Area Pedestrian & Parkir Terbuka)",
    "city": "Bantul",
    "province": "DI Yogyakarta",
    "latitude": -7.8774,
    "longitude": 110.3437,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-065",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 45,
    "totalCollectedKg": 245
  },
  {
    "id": "dp-bantul-3",
    "name": "Bank Sampah Digital Parangtritis Eco Hub",
    "category": "Bank Sampah Digital",
    "address": "Jl. Parangtritis No. 55, Bantul (Area Pedestrian & Parkir Terbuka)",
    "city": "Bantul",
    "province": "DI Yogyakarta",
    "latitude": -7.9044,
    "longitude": 110.3187,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-066",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 52,
    "totalCollectedKg": 278
  },
  {
    "id": "dp-surabaya-1",
    "name": "Shelter Komunitas Tunjungan Heritage Trotoar",
    "category": "Shelter Komunitas",
    "address": "Jl. Tunjungan No. 15, Surabaya (Area Pedestrian & Parkir Terbuka)",
    "city": "Surabaya",
    "province": "Jawa Timur",
    "latitude": -7.2575,
    "longitude": 112.7521,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-067",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 59,
    "totalCollectedKg": 311
  },
  {
    "id": "dp-surabaya-2",
    "name": "Bank Sampah Digital Gubeng Raya Stasiun Walk",
    "category": "Bank Sampah Digital",
    "address": "Jl. Gubeng No. 35, Surabaya (Area Pedestrian & Parkir Terbuka)",
    "city": "Surabaya",
    "province": "Jawa Timur",
    "latitude": -7.2455,
    "longitude": 112.7661,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-068",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 66,
    "totalCollectedKg": 344
  },
  {
    "id": "dp-surabaya-3",
    "name": "Drop Box Pinggir Jalan Rungkut MERR Eco Plaza",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Rungkut No. 55, Surabaya (Area Pedestrian & Parkir Terbuka)",
    "city": "Surabaya",
    "province": "Jawa Timur",
    "latitude": -7.2725,
    "longitude": 112.7411,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-069",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 73,
    "totalCollectedKg": 377
  },
  {
    "id": "dp-malang-1",
    "name": "Bank Sampah Digital Kopi Kayutangan Heritage",
    "category": "Bank Sampah Digital",
    "address": "Jl. Kopi No. 15, Malang (Area Pedestrian & Parkir Terbuka)",
    "city": "Malang",
    "province": "Jawa Timur",
    "latitude": -7.9666,
    "longitude": 112.6326,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-070",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 80,
    "totalCollectedKg": 410
  },
  {
    "id": "dp-malang-2",
    "name": "Drop Box Pinggir Jalan Soekarno Hatta Youth Center",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Soekarno No. 35, Malang (Area Pedestrian & Parkir Terbuka)",
    "city": "Malang",
    "province": "Jawa Timur",
    "latitude": -7.9546,
    "longitude": 112.6466,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-071",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 87,
    "totalCollectedKg": 443
  },
  {
    "id": "dp-malang-3",
    "name": "Teras Kafe Mitra Ijen Boulevard Pedestrian",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Ijen No. 55, Malang (Area Pedestrian & Parkir Terbuka)",
    "city": "Malang",
    "province": "Jawa Timur",
    "latitude": -7.9816,
    "longitude": 112.6216,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-072",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 44,
    "totalCollectedKg": 476
  },
  {
    "id": "dp-sidoarjo-1",
    "name": "Drop Box Pinggir Jalan Alun-Alun Sidoarjo Posko",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Alun-Alun No. 15, Sidoarjo (Area Pedestrian & Parkir Terbuka)",
    "city": "Sidoarjo",
    "province": "Jawa Timur",
    "latitude": -7.4478,
    "longitude": 112.7183,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-073",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 51,
    "totalCollectedKg": 509
  },
  {
    "id": "dp-sidoarjo-2",
    "name": "Waru Terminal Shelter",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Waru No. 35, Sidoarjo (Area Pedestrian & Parkir Terbuka)",
    "city": "Sidoarjo",
    "province": "Jawa Timur",
    "latitude": -7.4358,
    "longitude": 112.7323,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-074",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 58,
    "totalCollectedKg": 542
  },
  {
    "id": "dp-sidoarjo-3",
    "name": "Shelter Komunitas Pondok Jati Green Spot",
    "category": "Shelter Komunitas",
    "address": "Jl. Pondok No. 55, Sidoarjo (Area Pedestrian & Parkir Terbuka)",
    "city": "Sidoarjo",
    "province": "Jawa Timur",
    "latitude": -7.4628,
    "longitude": 112.7073,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-075",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 65,
    "totalCollectedKg": 575
  },
  {
    "id": "dp-kediri-1",
    "name": "Teras Kafe Mitra Simpang Lima Gumul Pedestrian",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Simpang No. 15, Kediri (Area Pedestrian & Parkir Terbuka)",
    "city": "Kediri",
    "province": "Jawa Timur",
    "latitude": -7.848,
    "longitude": 112.0178,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-076",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 72,
    "totalCollectedKg": 608
  },
  {
    "id": "dp-kediri-2",
    "name": "Shelter Komunitas Dhoho Heritage Walk",
    "category": "Shelter Komunitas",
    "address": "Jl. Dhoho No. 35, Kediri (Area Pedestrian & Parkir Terbuka)",
    "city": "Kediri",
    "province": "Jawa Timur",
    "latitude": -7.836,
    "longitude": 112.0318,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-077",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 79,
    "totalCollectedKg": 641
  },
  {
    "id": "dp-kediri-3",
    "name": "Bank Sampah Digital Brawijaya Memorial Corner",
    "category": "Bank Sampah Digital",
    "address": "Jl. Brawijaya No. 55, Kediri (Area Pedestrian & Parkir Terbuka)",
    "city": "Kediri",
    "province": "Jawa Timur",
    "latitude": -7.863,
    "longitude": 112.0068,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-078",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 86,
    "totalCollectedKg": 674
  },
  {
    "id": "dp-jember-1",
    "name": "Shelter Komunitas Alun-Alun PB Sudirman",
    "category": "Shelter Komunitas",
    "address": "Jl. Alun-Alun No. 15, Jember (Area Pedestrian & Parkir Terbuka)",
    "city": "Jember",
    "province": "Jawa Timur",
    "latitude": -8.1721,
    "longitude": 113.7002,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-079",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 43,
    "totalCollectedKg": 707
  },
  {
    "id": "dp-jember-2",
    "name": "Bank Sampah Digital Kampus UNEJ Kalimantan",
    "category": "Bank Sampah Digital",
    "address": "Jl. Kampus No. 35, Jember (Area Pedestrian & Parkir Terbuka)",
    "city": "Jember",
    "province": "Jawa Timur",
    "latitude": -8.1601,
    "longitude": 113.7142,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-080",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 50,
    "totalCollectedKg": 740
  },
  {
    "id": "dp-jember-3",
    "name": "Drop Box Pinggir Jalan Gajah Mada Eco Point",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Gajah No. 55, Jember (Area Pedestrian & Parkir Terbuka)",
    "city": "Jember",
    "province": "Jawa Timur",
    "latitude": -8.1871,
    "longitude": 113.6892,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-081",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 57,
    "totalCollectedKg": 773
  },
  {
    "id": "dp-banyuwangi-1",
    "name": "Bank Sampah Digital Taman Blambangan Pelataran",
    "category": "Bank Sampah Digital",
    "address": "Jl. Taman No. 15, Banyuwangi (Area Pedestrian & Parkir Terbuka)",
    "city": "Banyuwangi",
    "province": "Jawa Timur",
    "latitude": -8.2192,
    "longitude": 114.3692,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-082",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 64,
    "totalCollectedKg": 806
  },
  {
    "id": "dp-banyuwangi-2",
    "name": "Drop Box Pinggir Jalan Rogojampi Heritage Yard",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Rogojampi No. 35, Banyuwangi (Area Pedestrian & Parkir Terbuka)",
    "city": "Banyuwangi",
    "province": "Jawa Timur",
    "latitude": -8.2072,
    "longitude": 114.3832,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-083",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 71,
    "totalCollectedKg": 839
  },
  {
    "id": "dp-banyuwangi-3",
    "name": "Teras Kafe Mitra Pantai Boom Coastal Hub",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Pantai No. 55, Banyuwangi (Area Pedestrian & Parkir Terbuka)",
    "city": "Banyuwangi",
    "province": "Jawa Timur",
    "latitude": -8.2342,
    "longitude": 114.3582,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-084",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 78,
    "totalCollectedKg": 872
  },
  {
    "id": "dp-denpasar-1",
    "name": "Drop Box Pinggir Jalan Renon Puputan Jogging Track",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Renon No. 15, Denpasar (Area Pedestrian & Parkir Terbuka)",
    "city": "Denpasar",
    "province": "Bali",
    "latitude": -8.6705,
    "longitude": 115.2126,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-085",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 85,
    "totalCollectedKg": 205
  },
  {
    "id": "dp-denpasar-2",
    "name": "Teras Kafe Mitra Sanur Bypass Coastal Corner",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Sanur No. 35, Denpasar (Area Pedestrian & Parkir Terbuka)",
    "city": "Denpasar",
    "province": "Bali",
    "latitude": -8.6585,
    "longitude": 115.2266,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-086",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 42,
    "totalCollectedKg": 238
  },
  {
    "id": "dp-denpasar-3",
    "name": "Shelter Komunitas Teuku Umar Creative Spot",
    "category": "Shelter Komunitas",
    "address": "Jl. Teuku No. 55, Denpasar (Area Pedestrian & Parkir Terbuka)",
    "city": "Denpasar",
    "province": "Bali",
    "latitude": -8.6855,
    "longitude": 115.2016,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-087",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 49,
    "totalCollectedKg": 271
  },
  {
    "id": "dp-badung-1",
    "name": "Batu Bolong Canggu Eco Shelter",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Batu No. 15, Badung (Area Pedestrian & Parkir Terbuka)",
    "city": "Badung",
    "province": "Bali",
    "latitude": -8.5833,
    "longitude": 115.1833,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-088",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 56,
    "totalCollectedKg": 304
  },
  {
    "id": "dp-badung-2",
    "name": "Shelter Komunitas Seminyak Kayu Aya Corner",
    "category": "Shelter Komunitas",
    "address": "Jl. Seminyak No. 35, Badung (Area Pedestrian & Parkir Terbuka)",
    "city": "Badung",
    "province": "Bali",
    "latitude": -8.5713,
    "longitude": 115.1973,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-089",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 63,
    "totalCollectedKg": 337
  },
  {
    "id": "dp-badung-3",
    "name": "Bank Sampah Digital Kuta Sunset Road Yard",
    "category": "Bank Sampah Digital",
    "address": "Jl. Kuta No. 55, Badung (Area Pedestrian & Parkir Terbuka)",
    "city": "Badung",
    "province": "Bali",
    "latitude": -8.5983,
    "longitude": 115.1723,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-090",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 70,
    "totalCollectedKg": 370
  },
  {
    "id": "dp-gianyar-1",
    "name": "Shelter Komunitas Hanoman Ubud Green Corner",
    "category": "Shelter Komunitas",
    "address": "Jl. Hanoman No. 15, Gianyar (Area Pedestrian & Parkir Terbuka)",
    "city": "Gianyar",
    "province": "Bali",
    "latitude": -8.5442,
    "longitude": 115.3267,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-091",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 77,
    "totalCollectedKg": 403
  },
  {
    "id": "dp-gianyar-2",
    "name": "Sukawati Art Village Shelter",
    "category": "Bank Sampah Digital",
    "address": "Jl. Sukawati No. 35, Gianyar (Area Pedestrian & Parkir Terbuka)",
    "city": "Gianyar",
    "province": "Bali",
    "latitude": -8.5322,
    "longitude": 115.3407,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-092",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 84,
    "totalCollectedKg": 436
  },
  {
    "id": "dp-gianyar-3",
    "name": "Drop Box Pinggir Jalan Tegallalang Scenic Drop",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Tegallalang No. 55, Gianyar (Area Pedestrian & Parkir Terbuka)",
    "city": "Gianyar",
    "province": "Bali",
    "latitude": -8.5592,
    "longitude": 115.3157,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-093",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 41,
    "totalCollectedKg": 469
  },
  {
    "id": "dp-mataram--lombok--1",
    "name": "Bank Sampah Digital Cakranegara Pejanggik",
    "category": "Bank Sampah Digital",
    "address": "Jl. Cakranegara No. 15, Mataram (Lombok) (Area Pedestrian & Parkir Terbuka)",
    "city": "Mataram (Lombok)",
    "province": "Nusa Tenggara Barat",
    "latitude": -8.5833,
    "longitude": 116.1167,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-094",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 48,
    "totalCollectedKg": 502
  },
  {
    "id": "dp-mataram--lombok--2",
    "name": "Drop Box Pinggir Jalan Ampenan Kota Tua Heritage",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Ampenan No. 35, Mataram (Lombok) (Area Pedestrian & Parkir Terbuka)",
    "city": "Mataram (Lombok)",
    "province": "Nusa Tenggara Barat",
    "latitude": -8.5713,
    "longitude": 116.1307,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-095",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 55,
    "totalCollectedKg": 535
  },
  {
    "id": "dp-mataram--lombok--3",
    "name": "Teras Kafe Mitra Udayana Pedestrian Walk",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Udayana No. 55, Mataram (Lombok) (Area Pedestrian & Parkir Terbuka)",
    "city": "Mataram (Lombok)",
    "province": "Nusa Tenggara Barat",
    "latitude": -8.5983,
    "longitude": 116.1057,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-096",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 62,
    "totalCollectedKg": 568
  },
  {
    "id": "dp-kupang-1",
    "name": "Drop Box Pinggir Jalan Pantai Tedis Kota Lama",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Pantai No. 15, Kupang (Area Pedestrian & Parkir Terbuka)",
    "city": "Kupang",
    "province": "Nusa Tenggara Timur",
    "latitude": -10.1772,
    "longitude": 123.607,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-097",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 69,
    "totalCollectedKg": 601
  },
  {
    "id": "dp-kupang-2",
    "name": "Teras Kafe Mitra Oebobo El Tari Boulevard",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Oebobo No. 35, Kupang (Area Pedestrian & Parkir Terbuka)",
    "city": "Kupang",
    "province": "Nusa Tenggara Timur",
    "latitude": -10.1652,
    "longitude": 123.621,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-098",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 76,
    "totalCollectedKg": 634
  },
  {
    "id": "dp-kupang-3",
    "name": "Shelter Komunitas Kelapa Lima Coastal Yard",
    "category": "Shelter Komunitas",
    "address": "Jl. Kelapa No. 55, Kupang (Area Pedestrian & Parkir Terbuka)",
    "city": "Kupang",
    "province": "Nusa Tenggara Timur",
    "latitude": -10.1922,
    "longitude": 123.596,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-099",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 83,
    "totalCollectedKg": 667
  },
  {
    "id": "dp-banda-aceh-1",
    "name": "Teras Kafe Mitra Blang Padang Iskandar Muda",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Blang No. 15, Banda Aceh (Area Pedestrian & Parkir Terbuka)",
    "city": "Banda Aceh",
    "province": "Aceh",
    "latitude": 5.5483,
    "longitude": 95.3238,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-100",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 40,
    "totalCollectedKg": 700
  },
  {
    "id": "dp-banda-aceh-2",
    "name": "Shelter Komunitas Darussalam Kampus USK",
    "category": "Shelter Komunitas",
    "address": "Jl. Darussalam No. 35, Banda Aceh (Area Pedestrian & Parkir Terbuka)",
    "city": "Banda Aceh",
    "province": "Aceh",
    "latitude": 5.5603,
    "longitude": 95.3378,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-101",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 47,
    "totalCollectedKg": 733
  },
  {
    "id": "dp-banda-aceh-3",
    "name": "Bank Sampah Digital Peunayong Heritage Walk",
    "category": "Bank Sampah Digital",
    "address": "Jl. Peunayong No. 55, Banda Aceh (Area Pedestrian & Parkir Terbuka)",
    "city": "Banda Aceh",
    "province": "Aceh",
    "latitude": 5.5333,
    "longitude": 95.3128,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-102",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 54,
    "totalCollectedKg": 766
  },
  {
    "id": "dp-medan-1",
    "name": "Shelter Komunitas Merdeka Walk Balai Kota",
    "category": "Shelter Komunitas",
    "address": "Jl. Merdeka No. 15, Medan (Area Pedestrian & Parkir Terbuka)",
    "city": "Medan",
    "province": "Sumatera Utara",
    "latitude": 3.5952,
    "longitude": 98.6722,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-103",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 61,
    "totalCollectedKg": 799
  },
  {
    "id": "dp-medan-2",
    "name": "Bank Sampah Digital Setiabudi Tanjung Sari",
    "category": "Bank Sampah Digital",
    "address": "Jl. Setiabudi No. 35, Medan (Area Pedestrian & Parkir Terbuka)",
    "city": "Medan",
    "province": "Sumatera Utara",
    "latitude": 3.6072,
    "longitude": 98.6862,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-104",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 68,
    "totalCollectedKg": 832
  },
  {
    "id": "dp-medan-3",
    "name": "Drop Box Pinggir Jalan Ringroad Manhattan Square",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Ringroad No. 55, Medan (Area Pedestrian & Parkir Terbuka)",
    "city": "Medan",
    "province": "Sumatera Utara",
    "latitude": 3.5802,
    "longitude": 98.6612,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-105",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 75,
    "totalCollectedKg": 865
  },
  {
    "id": "dp-padang-1",
    "name": "Bank Sampah Digital Pantai Padang Purus",
    "category": "Bank Sampah Digital",
    "address": "Jl. Pantai No. 15, Padang (Area Pedestrian & Parkir Terbuka)",
    "city": "Padang",
    "province": "Sumatera Barat",
    "latitude": -0.9471,
    "longitude": 100.4172,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-106",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 82,
    "totalCollectedKg": 898
  },
  {
    "id": "dp-padang-2",
    "name": "Drop Box Pinggir Jalan Khatib Sulaiman Boulevard",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Khatib No. 35, Padang (Area Pedestrian & Parkir Terbuka)",
    "city": "Padang",
    "province": "Sumatera Barat",
    "latitude": -0.9351,
    "longitude": 100.4312,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-107",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 89,
    "totalCollectedKg": 231
  },
  {
    "id": "dp-padang-3",
    "name": "Teras Kafe Mitra Imam Bonjol Alun-Alun",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Imam No. 55, Padang (Area Pedestrian & Parkir Terbuka)",
    "city": "Padang",
    "province": "Sumatera Barat",
    "latitude": -0.9621,
    "longitude": 100.4062,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-108",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 46,
    "totalCollectedKg": 264
  },
  {
    "id": "dp-pekanbaru-1",
    "name": "Drop Box Pinggir Jalan Arifin Achmad Sidomulyo",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Arifin No. 15, Pekanbaru (Area Pedestrian & Parkir Terbuka)",
    "city": "Pekanbaru",
    "province": "Riau",
    "latitude": 0.5071,
    "longitude": 101.4478,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-109",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 53,
    "totalCollectedKg": 297
  },
  {
    "id": "dp-pekanbaru-2",
    "name": "Teras Kafe Mitra Sudirman City Center",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Sudirman No. 35, Pekanbaru (Area Pedestrian & Parkir Terbuka)",
    "city": "Pekanbaru",
    "province": "Riau",
    "latitude": 0.5191,
    "longitude": 101.4618,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-110",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 60,
    "totalCollectedKg": 330
  },
  {
    "id": "dp-pekanbaru-3",
    "name": "Shelter Komunitas Diponegoro Taman Hijau",
    "category": "Shelter Komunitas",
    "address": "Jl. Diponegoro No. 55, Pekanbaru (Area Pedestrian & Parkir Terbuka)",
    "city": "Pekanbaru",
    "province": "Riau",
    "latitude": 0.4921,
    "longitude": 101.4368,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-111",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 67,
    "totalCollectedKg": 363
  },
  {
    "id": "dp-batam-1",
    "name": "Teras Kafe Mitra Nagoya Lubuk Baja Point",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Nagoya No. 15, Batam (Area Pedestrian & Parkir Terbuka)",
    "city": "Batam",
    "province": "Kepulauan Riau",
    "latitude": 1.1301,
    "longitude": 104.0529,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-112",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 74,
    "totalCollectedKg": 396
  },
  {
    "id": "dp-batam-2",
    "name": "Shelter Komunitas Batam Center Mega Mall Gate",
    "category": "Shelter Komunitas",
    "address": "Jl. Batam No. 35, Batam (Area Pedestrian & Parkir Terbuka)",
    "city": "Batam",
    "province": "Kepulauan Riau",
    "latitude": 1.1421,
    "longitude": 104.0669,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-113",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 81,
    "totalCollectedKg": 429
  },
  {
    "id": "dp-batam-3",
    "name": "Bank Sampah Digital Harbour Bay Eco Corner",
    "category": "Bank Sampah Digital",
    "address": "Jl. Harbour No. 55, Batam (Area Pedestrian & Parkir Terbuka)",
    "city": "Batam",
    "province": "Kepulauan Riau",
    "latitude": 1.1151,
    "longitude": 104.0419,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-114",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 88,
    "totalCollectedKg": 462
  },
  {
    "id": "dp-tanjungpinang-1",
    "name": "Shelter Komunitas Gedung Gonggong Tepi Laut",
    "category": "Shelter Komunitas",
    "address": "Jl. Gedung No. 15, Tanjungpinang (Area Pedestrian & Parkir Terbuka)",
    "city": "Tanjungpinang",
    "province": "Kepulauan Riau",
    "latitude": 0.9167,
    "longitude": 104.45,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-115",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 45,
    "totalCollectedKg": 495
  },
  {
    "id": "dp-tanjungpinang-2",
    "name": "Bank Sampah Digital Bintan Center Green Yard",
    "category": "Bank Sampah Digital",
    "address": "Jl. Bintan No. 35, Tanjungpinang (Area Pedestrian & Parkir Terbuka)",
    "city": "Tanjungpinang",
    "province": "Kepulauan Riau",
    "latitude": 0.9287,
    "longitude": 104.464,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-116",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 52,
    "totalCollectedKg": 528
  },
  {
    "id": "dp-tanjungpinang-3",
    "name": "Drop Box Pinggir Jalan Pamedan Ahmad Yani",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Pamedan No. 55, Tanjungpinang (Area Pedestrian & Parkir Terbuka)",
    "city": "Tanjungpinang",
    "province": "Kepulauan Riau",
    "latitude": 0.9017,
    "longitude": 104.439,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-117",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 59,
    "totalCollectedKg": 561
  },
  {
    "id": "dp-jambi-1",
    "name": "Bank Sampah Digital Telanaipura Kolonel Abunjani",
    "category": "Bank Sampah Digital",
    "address": "Jl. Telanaipura No. 15, Jambi (Area Pedestrian & Parkir Terbuka)",
    "city": "Jambi",
    "province": "Jambi",
    "latitude": -1.6101,
    "longitude": 103.6131,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-118",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 66,
    "totalCollectedKg": 594
  },
  {
    "id": "dp-jambi-2",
    "name": "Drop Box Pinggir Jalan Sipin Mayor Abdurrahman",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Sipin No. 35, Jambi (Area Pedestrian & Parkir Terbuka)",
    "city": "Jambi",
    "province": "Jambi",
    "latitude": -1.5981,
    "longitude": 103.6271,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-119",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 73,
    "totalCollectedKg": 627
  },
  {
    "id": "dp-jambi-3",
    "name": "Teras Kafe Mitra Taman Jomblo Eco Spot",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Taman No. 55, Jambi (Area Pedestrian & Parkir Terbuka)",
    "city": "Jambi",
    "province": "Jambi",
    "latitude": -1.6251,
    "longitude": 103.6021,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-120",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 80,
    "totalCollectedKg": 660
  },
  {
    "id": "dp-palembang-1",
    "name": "Drop Box Pinggir Jalan Kambang Iwak Tasik",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Kambang No. 15, Palembang (Area Pedestrian & Parkir Terbuka)",
    "city": "Palembang",
    "province": "Sumatera Selatan",
    "latitude": -2.9761,
    "longitude": 104.7754,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-121",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 87,
    "totalCollectedKg": 693
  },
  {
    "id": "dp-palembang-2",
    "name": "Teras Kafe Mitra Jakabaring Sport City Gate",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Jakabaring No. 35, Palembang (Area Pedestrian & Parkir Terbuka)",
    "city": "Palembang",
    "province": "Sumatera Selatan",
    "latitude": -2.9641,
    "longitude": 104.7894,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-122",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 44,
    "totalCollectedKg": 726
  },
  {
    "id": "dp-palembang-3",
    "name": "Shelter Komunitas Ampera Waterfront Walk",
    "category": "Shelter Komunitas",
    "address": "Jl. Ampera No. 55, Palembang (Area Pedestrian & Parkir Terbuka)",
    "city": "Palembang",
    "province": "Sumatera Selatan",
    "latitude": -2.9911,
    "longitude": 104.7644,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-123",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 51,
    "totalCollectedKg": 759
  },
  {
    "id": "dp-bengkulu-1",
    "name": "Teras Kafe Mitra Pantai Panjang Sport Center",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Pantai No. 15, Bengkulu (Area Pedestrian & Parkir Terbuka)",
    "city": "Bengkulu",
    "province": "Bengkulu",
    "latitude": -3.8004,
    "longitude": 102.2655,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-124",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 58,
    "totalCollectedKg": 792
  },
  {
    "id": "dp-bengkulu-2",
    "name": "Shelter Komunitas Ratu Samban Anggut",
    "category": "Shelter Komunitas",
    "address": "Jl. Ratu No. 35, Bengkulu (Area Pedestrian & Parkir Terbuka)",
    "city": "Bengkulu",
    "province": "Bengkulu",
    "latitude": -3.7884,
    "longitude": 102.2795,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-125",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 65,
    "totalCollectedKg": 825
  },
  {
    "id": "dp-bengkulu-3",
    "name": "Bank Sampah Digital Benteng Marlborough Heritage",
    "category": "Bank Sampah Digital",
    "address": "Jl. Benteng No. 55, Bengkulu (Area Pedestrian & Parkir Terbuka)",
    "city": "Bengkulu",
    "province": "Bengkulu",
    "latitude": -3.8154,
    "longitude": 102.2545,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-126",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 72,
    "totalCollectedKg": 858
  },
  {
    "id": "dp-bandar-lampung-1",
    "name": "Shelter Komunitas Saburai Enggal Sriwijaya",
    "category": "Shelter Komunitas",
    "address": "Jl. Saburai No. 15, Bandar Lampung (Area Pedestrian & Parkir Terbuka)",
    "city": "Bandar Lampung",
    "province": "Lampung",
    "latitude": -5.3971,
    "longitude": 105.2668,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-127",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 79,
    "totalCollectedKg": 891
  },
  {
    "id": "dp-bandar-lampung-2",
    "name": "Bank Sampah Digital Way Halim Sultan Agung",
    "category": "Bank Sampah Digital",
    "address": "Jl. Way No. 35, Bandar Lampung (Area Pedestrian & Parkir Terbuka)",
    "city": "Bandar Lampung",
    "province": "Lampung",
    "latitude": -5.3851,
    "longitude": 105.2808,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-128",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 86,
    "totalCollectedKg": 224
  },
  {
    "id": "dp-bandar-lampung-3",
    "name": "Drop Box Pinggir Jalan Raden Intan City Point",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Raden No. 55, Bandar Lampung (Area Pedestrian & Parkir Terbuka)",
    "city": "Bandar Lampung",
    "province": "Lampung",
    "latitude": -5.4121,
    "longitude": 105.2558,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-129",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 43,
    "totalCollectedKg": 257
  },
  {
    "id": "dp-pangkalpinang-1",
    "name": "Bank Sampah Digital Taman Merdeka Sudirman",
    "category": "Bank Sampah Digital",
    "address": "Jl. Taman No. 15, Pangkalpinang (Area Pedestrian & Parkir Terbuka)",
    "city": "Pangkalpinang",
    "province": "Bangka Belitung",
    "latitude": -2.1333,
    "longitude": 106.1167,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-130",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 50,
    "totalCollectedKg": 290
  },
  {
    "id": "dp-pangkalpinang-2",
    "name": "Gabek Veteran Green Shelter",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Gabek No. 35, Pangkalpinang (Area Pedestrian & Parkir Terbuka)",
    "city": "Pangkalpinang",
    "province": "Bangka Belitung",
    "latitude": -2.1213,
    "longitude": 106.1307,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-131",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 57,
    "totalCollectedKg": 323
  },
  {
    "id": "dp-pangkalpinang-3",
    "name": "Teras Kafe Mitra Pasir Padi Coastal Point",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Pasir No. 55, Pangkalpinang (Area Pedestrian & Parkir Terbuka)",
    "city": "Pangkalpinang",
    "province": "Bangka Belitung",
    "latitude": -2.1483,
    "longitude": 106.1057,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-132",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 64,
    "totalCollectedKg": 356
  },
  {
    "id": "dp-pontianak-1",
    "name": "Drop Box Pinggir Jalan Waterfront Kapuas Alun-Alun",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Waterfront No. 15, Pontianak (Area Pedestrian & Parkir Terbuka)",
    "city": "Pontianak",
    "province": "Kalimantan Barat",
    "latitude": -0.0263,
    "longitude": 109.3425,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-133",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 71,
    "totalCollectedKg": 389
  },
  {
    "id": "dp-pontianak-2",
    "name": "Teras Kafe Mitra Gajah Mada Chinatown Hub",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Gajah No. 35, Pontianak (Area Pedestrian & Parkir Terbuka)",
    "city": "Pontianak",
    "province": "Kalimantan Barat",
    "latitude": -0.0143,
    "longitude": 109.3565,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-134",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 78,
    "totalCollectedKg": 422
  },
  {
    "id": "dp-pontianak-3",
    "name": "Shelter Komunitas Ahmad Yani Mega Mall Gate",
    "category": "Shelter Komunitas",
    "address": "Jl. Ahmad No. 55, Pontianak (Area Pedestrian & Parkir Terbuka)",
    "city": "Pontianak",
    "province": "Kalimantan Barat",
    "latitude": -0.0413,
    "longitude": 109.3315,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-135",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 85,
    "totalCollectedKg": 455
  },
  {
    "id": "dp-palangkaraya-1",
    "name": "Teras Kafe Mitra Bundaran Besar Yos Sudarso",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Bundaran No. 15, Palangkaraya (Area Pedestrian & Parkir Terbuka)",
    "city": "Palangkaraya",
    "province": "Kalimantan Tengah",
    "latitude": -2.2089,
    "longitude": 113.9189,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-136",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 42,
    "totalCollectedKg": 488
  },
  {
    "id": "dp-palangkaraya-2",
    "name": "Shelter Komunitas Tjilik Riwut Memorial Point",
    "category": "Shelter Komunitas",
    "address": "Jl. Tjilik No. 35, Palangkaraya (Area Pedestrian & Parkir Terbuka)",
    "city": "Palangkaraya",
    "province": "Kalimantan Tengah",
    "latitude": -2.1969,
    "longitude": 113.9329,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-137",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 49,
    "totalCollectedKg": 521
  },
  {
    "id": "dp-palangkaraya-3",
    "name": "Sanaman Mantikei Shelter",
    "category": "Bank Sampah Digital",
    "address": "Jl. Sanaman No. 55, Palangkaraya (Area Pedestrian & Parkir Terbuka)",
    "city": "Palangkaraya",
    "province": "Kalimantan Tengah",
    "latitude": -2.2239,
    "longitude": 113.9079,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-138",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 56,
    "totalCollectedKg": 554
  },
  {
    "id": "dp-banjarmasin-1",
    "name": "Shelter Komunitas Siring Menara Pandang Martapura",
    "category": "Shelter Komunitas",
    "address": "Jl. Siring No. 15, Banjarmasin (Area Pedestrian & Parkir Terbuka)",
    "city": "Banjarmasin",
    "province": "Kalimantan Selatan",
    "latitude": -3.3194,
    "longitude": 114.5908,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-139",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 63,
    "totalCollectedKg": 587
  },
  {
    "id": "dp-banjarmasin-2",
    "name": "Bank Sampah Digital Kayu Tangi Hasan Basri",
    "category": "Bank Sampah Digital",
    "address": "Jl. Kayu No. 35, Banjarmasin (Area Pedestrian & Parkir Terbuka)",
    "city": "Banjarmasin",
    "province": "Kalimantan Selatan",
    "latitude": -3.3074,
    "longitude": 114.6048,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-140",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 70,
    "totalCollectedKg": 620
  },
  {
    "id": "dp-banjarmasin-3",
    "name": "Drop Box Pinggir Jalan Lambung Mangkurat City Hub",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Lambung No. 55, Banjarmasin (Area Pedestrian & Parkir Terbuka)",
    "city": "Banjarmasin",
    "province": "Kalimantan Selatan",
    "latitude": -3.3344,
    "longitude": 114.5798,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-141",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 77,
    "totalCollectedKg": 653
  },
  {
    "id": "dp-balikpapan-1",
    "name": "Bank Sampah Digital Pantai Melawai Sudirman",
    "category": "Bank Sampah Digital",
    "address": "Jl. Pantai No. 15, Balikpapan (Area Pedestrian & Parkir Terbuka)",
    "city": "Balikpapan",
    "province": "Kalimantan Timur",
    "latitude": -1.2654,
    "longitude": 116.8312,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-142",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 84,
    "totalCollectedKg": 686
  },
  {
    "id": "dp-balikpapan-2",
    "name": "Drop Box Pinggir Jalan MT Haryono Ringroad",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. MT No. 35, Balikpapan (Area Pedestrian & Parkir Terbuka)",
    "city": "Balikpapan",
    "province": "Kalimantan Timur",
    "latitude": -1.2534,
    "longitude": 116.8452,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-143",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 41,
    "totalCollectedKg": 719
  },
  {
    "id": "dp-balikpapan-3",
    "name": "Teras Kafe Mitra Balikpapan Baru Grand City",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Balikpapan No. 55, Balikpapan (Area Pedestrian & Parkir Terbuka)",
    "city": "Balikpapan",
    "province": "Kalimantan Timur",
    "latitude": -1.2804,
    "longitude": 116.8202,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-144",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 48,
    "totalCollectedKg": 752
  },
  {
    "id": "dp-samarinda-1",
    "name": "Drop Box Pinggir Jalan Tepian Mahakam Gajah Mada",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Tepian No. 15, Samarinda (Area Pedestrian & Parkir Terbuka)",
    "city": "Samarinda",
    "province": "Kalimantan Timur",
    "latitude": -0.5022,
    "longitude": 117.1536,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-145",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 55,
    "totalCollectedKg": 785
  },
  {
    "id": "dp-samarinda-2",
    "name": "Teras Kafe Mitra Taman Samarendah Juanda",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Taman No. 35, Samarinda (Area Pedestrian & Parkir Terbuka)",
    "city": "Samarinda",
    "province": "Kalimantan Timur",
    "latitude": -0.4902,
    "longitude": 117.1676,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-146",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 62,
    "totalCollectedKg": 818
  },
  {
    "id": "dp-samarinda-3",
    "name": "Shelter Komunitas Pahlawan Plaza Mulia Walk",
    "category": "Shelter Komunitas",
    "address": "Jl. Pahlawan No. 55, Samarinda (Area Pedestrian & Parkir Terbuka)",
    "city": "Samarinda",
    "province": "Kalimantan Timur",
    "latitude": -0.5172,
    "longitude": 117.1426,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-147",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 69,
    "totalCollectedKg": 851
  },
  {
    "id": "dp-tarakan-1",
    "name": "Teras Kafe Mitra Taman Berlabuh Lingkas",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Taman No. 15, Tarakan (Area Pedestrian & Parkir Terbuka)",
    "city": "Tarakan",
    "province": "Kalimantan Utara",
    "latitude": 3.3,
    "longitude": 117.6333,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-148",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 76,
    "totalCollectedKg": 884
  },
  {
    "id": "dp-tarakan-2",
    "name": "Shelter Komunitas Kampung Enam Amal",
    "category": "Shelter Komunitas",
    "address": "Jl. Kampung No. 35, Tarakan (Area Pedestrian & Parkir Terbuka)",
    "city": "Tarakan",
    "province": "Kalimantan Utara",
    "latitude": 3.312,
    "longitude": 117.6473,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-149",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 83,
    "totalCollectedKg": 217
  },
  {
    "id": "dp-tarakan-3",
    "name": "Bank Sampah Digital Yos Sudarso Port Walk",
    "category": "Bank Sampah Digital",
    "address": "Jl. Yos No. 55, Tarakan (Area Pedestrian & Parkir Terbuka)",
    "city": "Tarakan",
    "province": "Kalimantan Utara",
    "latitude": 3.285,
    "longitude": 117.6223,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-150",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 40,
    "totalCollectedKg": 250
  },
  {
    "id": "dp-makassar-1",
    "name": "Shelter Komunitas Pantai Losari Penghibur",
    "category": "Shelter Komunitas",
    "address": "Jl. Pantai No. 15, Makassar (Area Pedestrian & Parkir Terbuka)",
    "city": "Makassar",
    "province": "Sulawesi Selatan",
    "latitude": -5.1477,
    "longitude": 119.4327,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-151",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 47,
    "totalCollectedKg": 283
  },
  {
    "id": "dp-makassar-2",
    "name": "Bank Sampah Digital Pettarani Creative Square",
    "category": "Bank Sampah Digital",
    "address": "Jl. Pettarani No. 35, Makassar (Area Pedestrian & Parkir Terbuka)",
    "city": "Makassar",
    "province": "Sulawesi Selatan",
    "latitude": -5.1357,
    "longitude": 119.4467,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-152",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 54,
    "totalCollectedKg": 316
  },
  {
    "id": "dp-makassar-3",
    "name": "Drop Box Pinggir Jalan Panakkukang Boulevard",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Panakkukang No. 55, Makassar (Area Pedestrian & Parkir Terbuka)",
    "city": "Makassar",
    "province": "Sulawesi Selatan",
    "latitude": -5.1627,
    "longitude": 119.4217,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-153",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 61,
    "totalCollectedKg": 349
  },
  {
    "id": "dp-mamuju-1",
    "name": "Bank Sampah Digital Anjungan Pantai Manakarra",
    "category": "Bank Sampah Digital",
    "address": "Jl. Anjungan No. 15, Mamuju (Area Pedestrian & Parkir Terbuka)",
    "city": "Mamuju",
    "province": "Sulawesi Barat",
    "latitude": -2.6789,
    "longitude": 118.8878,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-154",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 68,
    "totalCollectedKg": 382
  },
  {
    "id": "dp-mamuju-2",
    "name": "Drop Box Pinggir Jalan Simboro Ahmad Yani",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Simboro No. 35, Mamuju (Area Pedestrian & Parkir Terbuka)",
    "city": "Mamuju",
    "province": "Sulawesi Barat",
    "latitude": -2.6669,
    "longitude": 118.9018,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-155",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 75,
    "totalCollectedKg": 415
  },
  {
    "id": "dp-mamuju-3",
    "name": "Teras Kafe Mitra Jenderal Sudirman Port Point",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Jenderal No. 55, Mamuju (Area Pedestrian & Parkir Terbuka)",
    "city": "Mamuju",
    "province": "Sulawesi Barat",
    "latitude": -2.6939,
    "longitude": 118.8768,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-156",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 82,
    "totalCollectedKg": 448
  },
  {
    "id": "dp-palu-1",
    "name": "Drop Box Pinggir Jalan Pantai Talise Rajamoili",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Pantai No. 15, Palu (Area Pedestrian & Parkir Terbuka)",
    "city": "Palu",
    "province": "Sulawesi Tengah",
    "latitude": -0.9003,
    "longitude": 119.8778,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-157",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 89,
    "totalCollectedKg": 481
  },
  {
    "id": "dp-palu-2",
    "name": "Teras Kafe Mitra Palu Selatan Sam Ratulangi",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Palu No. 35, Palu (Area Pedestrian & Parkir Terbuka)",
    "city": "Palu",
    "province": "Sulawesi Tengah",
    "latitude": -0.8883,
    "longitude": 119.8918,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-158",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 46,
    "totalCollectedKg": 514
  },
  {
    "id": "dp-palu-3",
    "name": "Shelter Komunitas Taman Vatulemo Plaza",
    "category": "Shelter Komunitas",
    "address": "Jl. Taman No. 55, Palu (Area Pedestrian & Parkir Terbuka)",
    "city": "Palu",
    "province": "Sulawesi Tengah",
    "latitude": -0.9153,
    "longitude": 119.8668,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-159",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 53,
    "totalCollectedKg": 547
  },
  {
    "id": "dp-kendari-1",
    "name": "Teras Kafe Mitra Tugu Religi MTQ Square",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Tugu No. 15, Kendari (Area Pedestrian & Parkir Terbuka)",
    "city": "Kendari",
    "province": "Sulawesi Tenggara",
    "latitude": -3.9985,
    "longitude": 122.5126,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-160",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 60,
    "totalCollectedKg": 580
  },
  {
    "id": "dp-kendari-2",
    "name": "Shelter Komunitas Wua-Wua MT Haryono",
    "category": "Shelter Komunitas",
    "address": "Jl. Wua-Wua No. 35, Kendari (Area Pedestrian & Parkir Terbuka)",
    "city": "Kendari",
    "province": "Sulawesi Tenggara",
    "latitude": -3.9865,
    "longitude": 122.5266,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-161",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 67,
    "totalCollectedKg": 613
  },
  {
    "id": "dp-kendari-3",
    "name": "Bank Sampah Digital Kendari Beach By Pass",
    "category": "Bank Sampah Digital",
    "address": "Jl. Kendari No. 55, Kendari (Area Pedestrian & Parkir Terbuka)",
    "city": "Kendari",
    "province": "Sulawesi Tenggara",
    "latitude": -4.0135,
    "longitude": 122.5016,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-162",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 74,
    "totalCollectedKg": 646
  },
  {
    "id": "dp-gorontalo-1",
    "name": "Shelter Komunitas Taruna Remaja Nani Wartabone",
    "category": "Shelter Komunitas",
    "address": "Jl. Taruna No. 15, Gorontalo (Area Pedestrian & Parkir Terbuka)",
    "city": "Gorontalo",
    "province": "Gorontalo",
    "latitude": 0.5435,
    "longitude": 123.0568,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-163",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 81,
    "totalCollectedKg": 679
  },
  {
    "id": "dp-gorontalo-2",
    "name": "Bank Sampah Digital Dulalowo HB Jassin",
    "category": "Bank Sampah Digital",
    "address": "Jl. Dulalowo No. 35, Gorontalo (Area Pedestrian & Parkir Terbuka)",
    "city": "Gorontalo",
    "province": "Gorontalo",
    "latitude": 0.5555,
    "longitude": 123.0708,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-164",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 88,
    "totalCollectedKg": 712
  },
  {
    "id": "dp-gorontalo-3",
    "name": "Drop Box Pinggir Jalan Limboto Lake Entrance",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Limboto No. 55, Gorontalo (Area Pedestrian & Parkir Terbuka)",
    "city": "Gorontalo",
    "province": "Gorontalo",
    "latitude": 0.5285,
    "longitude": 123.0458,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-165",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 45,
    "totalCollectedKg": 745
  },
  {
    "id": "dp-manado-1",
    "name": "Bank Sampah Digital Boulevard Megamas Tendean",
    "category": "Bank Sampah Digital",
    "address": "Jl. Boulevard No. 15, Manado (Area Pedestrian & Parkir Terbuka)",
    "city": "Manado",
    "province": "Sulawesi Utara",
    "latitude": 1.4748,
    "longitude": 124.8428,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-166",
    "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 52,
    "totalCollectedKg": 778
  },
  {
    "id": "dp-manado-2",
    "name": "Drop Box Pinggir Jalan Malalayang Beach Walk",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Malalayang No. 35, Manado (Area Pedestrian & Parkir Terbuka)",
    "city": "Manado",
    "province": "Sulawesi Utara",
    "latitude": 1.4868,
    "longitude": 124.8568,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-167",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 59,
    "totalCollectedKg": 811
  },
  {
    "id": "dp-manado-3",
    "name": "Teras Kafe Mitra Sam Ratulangi City Hub",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Sam No. 55, Manado (Area Pedestrian & Parkir Terbuka)",
    "city": "Manado",
    "province": "Sulawesi Utara",
    "latitude": 1.4598,
    "longitude": 124.8318,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-168",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 66,
    "totalCollectedKg": 844
  },
  {
    "id": "dp-ambon-1",
    "name": "Drop Box Pinggir Jalan Lapangan Merdeka Pattimura",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Lapangan No. 15, Ambon (Area Pedestrian & Parkir Terbuka)",
    "city": "Ambon",
    "province": "Maluku",
    "latitude": -3.6554,
    "longitude": 128.1908,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-169",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 73,
    "totalCollectedKg": 877
  },
  {
    "id": "dp-ambon-2",
    "name": "Teras Kafe Mitra Pantai Losari Ambon",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Pantai No. 35, Ambon (Area Pedestrian & Parkir Terbuka)",
    "city": "Ambon",
    "province": "Maluku",
    "latitude": -3.6434,
    "longitude": 128.2048,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-170",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 80,
    "totalCollectedKg": 210
  },
  {
    "id": "dp-ambon-3",
    "name": "Shelter Komunitas Mardika Waterfront Walk",
    "category": "Shelter Komunitas",
    "address": "Jl. Mardika No. 55, Ambon (Area Pedestrian & Parkir Terbuka)",
    "city": "Ambon",
    "province": "Maluku",
    "latitude": -3.6704,
    "longitude": 128.1798,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-171",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 87,
    "totalCollectedKg": 243
  },
  {
    "id": "dp-ternate-1",
    "name": "Teras Kafe Mitra Landmark Pantai Falajawa",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Landmark No. 15, Ternate (Area Pedestrian & Parkir Terbuka)",
    "city": "Ternate",
    "province": "Maluku Utara",
    "latitude": 0.7889,
    "longitude": 127.3889,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-172",
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 44,
    "totalCollectedKg": 276
  },
  {
    "id": "dp-ternate-2",
    "name": "Shelter Komunitas Bastiong Port Corner",
    "category": "Shelter Komunitas",
    "address": "Jl. Bastiong No. 35, Ternate (Area Pedestrian & Parkir Terbuka)",
    "city": "Ternate",
    "province": "Maluku Utara",
    "latitude": 0.8009,
    "longitude": 127.4029,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-173",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 51,
    "totalCollectedKg": 309
  },
  {
    "id": "dp-ternate-3",
    "name": "Bank Sampah Digital Ngaralamo Alun-Alun",
    "category": "Bank Sampah Digital",
    "address": "Jl. Ngaralamo No. 55, Ternate (Area Pedestrian & Parkir Terbuka)",
    "city": "Ternate",
    "province": "Maluku Utara",
    "latitude": 0.7739,
    "longitude": 127.3779,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-174",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 58,
    "totalCollectedKg": 342
  },
  {
    "id": "dp-jayapura-1",
    "name": "Shelter Komunitas Taman Imbi Dok II Sam Ratulangi",
    "category": "Shelter Komunitas",
    "address": "Jl. Taman No. 15, Jayapura (Area Pedestrian & Parkir Terbuka)",
    "city": "Jayapura",
    "province": "Papua",
    "latitude": -2.5337,
    "longitude": 140.7181,
    "operatingHours": "08.00 - 21.00 WITA",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-175",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 65,
    "totalCollectedKg": 375
  },
  {
    "id": "dp-jayapura-2",
    "name": "Bank Sampah Digital Abepura Square Kotaraja",
    "category": "Bank Sampah Digital",
    "address": "Jl. Abepura No. 35, Jayapura (Area Pedestrian & Parkir Terbuka)",
    "city": "Jayapura",
    "province": "Papua",
    "latitude": -2.5217,
    "longitude": 140.7321,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-176",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 72,
    "totalCollectedKg": 408
  },
  {
    "id": "dp-jayapura-3",
    "name": "Drop Box Pinggir Jalan Hamadi Coastal Hub",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Hamadi No. 55, Jayapura (Area Pedestrian & Parkir Terbuka)",
    "city": "Jayapura",
    "province": "Papua",
    "latitude": -2.5487,
    "longitude": 140.7071,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-177",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 79,
    "totalCollectedKg": 441
  },
  {
    "id": "dp-sorong-1",
    "name": "Bank Sampah Digital Taman Sorong Basuki Rahmat KM 8",
    "category": "Bank Sampah Digital",
    "address": "Jl. Taman No. 15, Sorong (Area Pedestrian & Parkir Terbuka)",
    "city": "Sorong",
    "province": "Papua Barat Daya",
    "latitude": -0.8762,
    "longitude": 131.2558,
    "operatingHours": "08.00 - 20.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-178",
    "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 86,
    "totalCollectedKg": 474
  },
  {
    "id": "dp-sorong-2",
    "name": "Drop Box Pinggir Jalan Pelabuhan Sorong Yos Sudarso",
    "category": "Drop Box Pinggir Jalan",
    "address": "Jl. Pelabuhan No. 35, Sorong (Area Pedestrian & Parkir Terbuka)",
    "city": "Sorong",
    "province": "Papua Barat Daya",
    "latitude": -0.8642,
    "longitude": 131.2698,
    "operatingHours": "24 Jam Akses Mandiri",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-179",
    "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 43,
    "totalCollectedKg": 507
  },
  {
    "id": "dp-sorong-3",
    "name": "Teras Kafe Mitra Aimas Heritage Point",
    "category": "Teras Kafe Mitra",
    "address": "Jl. Aimas No. 55, Sorong (Area Pedestrian & Parkir Terbuka)",
    "city": "Sorong",
    "province": "Papua Barat Daya",
    "latitude": -0.8912,
    "longitude": 131.2448,
    "operatingHours": "07.00 - 22.00 WIB",
    "acceptedTypes": [
      "Kaos & Katun",
      "Kemeja",
      "Denim",
      "Outerwear",
      "Kain Perca"
    ],
    "contactPhone": "0812-8822-180",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "capacityPercentage": 50,
    "totalCollectedKg": 540
  }
];


export async function fetchDropPoints(): Promise<DropPoint[]> {
  try {
    let customPoints: DropPoint[] = [];
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('clothloop_dropbox_apps');
        if (raw) {
          const apps = JSON.parse(raw);
          customPoints = apps
            .filter((a: any) => a.status === 'APPROVED')
            .map((a: any) => ({
              id: a.id,
              name: a.businessName,
              category: a.businessType || 'Mitra Drop-Box Terverifikasi',
              address: `${a.address}, Kota ${a.city}`,
              city: a.city,
              province: 'Indonesia',
              latitude: -6.2297 + (Math.random() * 0.04 - 0.02),
              longitude: 106.8166 + (Math.random() * 0.04 - 0.02),
              operatingHours: '08.00 - 22.00 WIB',
              acceptedTypes: ['Kaos & Katun', 'Kemeja', 'Denim', 'Outerwear', 'Kain Perca'],
              contactPhone: a.picPhone || '0812-8822-000',
              image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
              capacityPercentage: 10,
              totalCollectedKg: 0,
            }));
        }
      } catch {}
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('drop_points')
      .select('*')
      .order('city', { ascending: true });

    // Always prefer complete DROP_POINTS_MOCK containing 180+ points across all Indonesian cities
    if (error || !data || data.length < DROP_POINTS_MOCK.length) {
      return [...customPoints, ...DROP_POINTS_MOCK];
    }

    const remotePoints = data.map((d: any) => ({
      id: d.id,
      name: d.name,
      category: d.category,
      address: d.address,
      city: d.city,
      province: d.province,
      latitude: Number(d.latitude),
      longitude: Number(d.longitude),
      operatingHours: d.operating_hours || d.operatingHours || '08.00 - 20.00 WIB',
      acceptedTypes: d.accepted_types || d.acceptedTypes || ['Kaos', 'Kemeja', 'Denim'],
      contactPhone: d.contact_phone || d.contactPhone || '0812-8822-1000',
      image: d.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      capacityPercentage: d.capacity_percentage || d.capacityPercentage || 50,
      totalCollectedKg: Number(d.total_collected_kg || d.totalCollectedKg) || 300,
    }));

    return [...customPoints, ...remotePoints];
  } catch {
    return DROP_POINTS_MOCK;
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

// ── Craft Products (Ready to Buy) ───────────────────
import { CraftProduct } from '@/lib/types';

export const CRAFT_PRODUCTS_MOCK: CraftProduct[] = [
  {
    id: 'cp-1',
    title: 'Noragi Haori Boro Indigo Patchwork',
    artisanName: 'Bima Santoso',
    artisanStudio: 'Studio Rework Bandung',
    artisanCity: 'Bandung',
    price: 345000,
    originalPrice: 420000,
    category: 'Busana Upcycled',
    technique: 'Sashiko Stitch & Boro Patchwork',
    materialSaved: '3 Helai Denim Celana Afkir',
    dimensions: 'All Size (Lebar Dada 62cm, Panjang 72cm)',
    story: 'Karya outerwear bergaya Noragi Jepang yang dikonstruksi tangan dari tiga celana jeans vintage berbeda tone warna, diperkuat tusukan benang Sashiko putih tahan banting.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&auto=format&fit=crop&q=80',
    ],
    stockCount: 4,
    rating: 4.9,
    reviewCount: 18,
    waterSavedLiters: 8100,
    co2SavedKg: 10.8,
  },
  {
    id: 'cp-2',
    title: 'Botanical Quilted Tote Bag Daun Jati',
    artisanName: 'Ratna Ayu',
    artisanStudio: 'KainKala Studio',
    artisanCity: 'Yogyakarta',
    price: 185000,
    originalPrice: 225000,
    category: 'Tas & Pouch',
    technique: 'Perca Quilt & Ecoprint Daun Jati',
    materialSaved: '1,2 kg Potongan Perca Katun',
    dimensions: '40cm x 36cm (Muat Laptop 15 Inch)',
    story: 'Tas jinjing tebal empuk dengan lapisan batting kapas daur ulang. Warna cokelat keemasan didapat dari pewarnaan alami daun jati kebun lereng Merapi.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=80',
    ],
    stockCount: 7,
    rating: 5.0,
    reviewCount: 32,
    waterSavedLiters: 3240,
    co2SavedKg: 4.3,
  },
  {
    id: 'cp-3',
    title: 'Reversible Corduroy Bucket Hat Mosaic',
    artisanName: 'Fahri Ilham',
    artisanStudio: 'Sasirangan Lab',
    artisanCity: 'Banjarmasin',
    price: 135000,
    originalPrice: 160000,
    category: 'Aksesoris & Topi',
    technique: 'Multi-panel Vintage Corduroy Stitch',
    materialSaved: '2 Kemeja Korduroi Bekas',
    dimensions: 'Lingkar Kepala 58 - 60cm',
    story: 'Topi bucket dua muka (bisa dibalik). Satu sisi mozaik korduroi hangat earth tone, sisi lain katun polos motif tribal halus.',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    ],
    stockCount: 5,
    rating: 4.8,
    reviewCount: 14,
    waterSavedLiters: 2700,
    co2SavedKg: 3.6,
  },
  {
    id: 'cp-4',
    title: 'Heavyweight Canvas Utility Workwear Vest',
    artisanName: 'Bima Santoso',
    artisanStudio: 'Studio Rework Bandung',
    artisanCity: 'Bandung',
    price: 295000,
    originalPrice: 350000,
    category: 'Busana Upcycled',
    technique: 'Multi-pocket Reconstruction',
    materialSaved: '2 Jaket Kanvas Afkir Pabrik',
    dimensions: 'All Size (Lebar Dada 58cm, Panjang 65cm)',
    story: 'Rompi utilitarian kuat dengan 6 saku serbaguna. Dibuat dari sisa kain seragam mekanik kanvas tebal 14oz.',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    ],
    stockCount: 3,
    rating: 4.9,
    reviewCount: 9,
    waterSavedLiters: 5400,
    co2SavedKg: 7.2,
  },
  {
    id: 'cp-5',
    title: 'Sashiko Zip Pouch & Tech Organizer',
    artisanName: 'Siti Hanifah',
    artisanStudio: 'Jahit Lestari',
    artisanCity: 'Solo',
    price: 85000,
    originalPrice: 110000,
    category: 'Tas & Pouch',
    technique: 'Traditional Hand Sashiko',
    materialSaved: 'Perca Denim & Kain Tenun Lurik',
    dimensions: '22cm x 15cm x 5cm',
    story: 'Pouch tangan serbaguna untuk charger, headset, dan alat tulis dengan bantalan empuk di dalamnya dan resleting YKK kuningan.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    ],
    stockCount: 12,
    rating: 5.0,
    reviewCount: 26,
    waterSavedLiters: 1350,
    co2SavedKg: 1.8,
  },
  {
    id: 'cp-6',
    title: 'Batik Lawasan Cushion Cover Mosaic (Set of 2)',
    artisanName: 'Ratna Ayu',
    artisanStudio: 'KainKala Studio',
    artisanCity: 'Yogyakarta',
    price: 165000,
    originalPrice: 195000,
    category: 'Home Living',
    technique: 'Patchwork Perca Batik Lawas',
    materialSaved: 'Potongan Sisa Kain Batik Sutra & Katun',
    dimensions: '45cm x 45cm',
    story: 'Sarung bantal sofa artistik yang menggabungkan potongan motif batik Parang, Kawung, dan Megamendung lawas dengan jahitan tepi rapi.',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    ],
    stockCount: 6,
    rating: 4.9,
    reviewCount: 21,
    waterSavedLiters: 4050,
    co2SavedKg: 5.4,
  },
];

export async function fetchCraftProducts(): Promise<CraftProduct[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('craft_products')
      .select('*')
      .order('rating', { ascending: false });

    if (error || !data || data.length === 0) {
      return CRAFT_PRODUCTS_MOCK;
    }

    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      artisanName: d.artisan_name,
      artisanStudio: d.artisan_studio,
      artisanCity: d.artisan_city,
      price: Number(d.price),
      originalPrice: d.original_price ? Number(d.original_price) : undefined,
      category: d.category,
      technique: d.technique,
      materialSaved: d.material_saved,
      dimensions: d.dimensions,
      story: d.story,
      images: d.images || [],
      stockCount: Number(d.stock_count) || 1,
      rating: Number(d.rating) || 5.0,
      reviewCount: Number(d.review_count) || 0,
      waterSavedLiters: Number(d.water_saved_liters) || 0,
      co2SavedKg: Number(d.co2_saved_kg) || 0,
    }));
  } catch {
    return CRAFT_PRODUCTS_MOCK;
  }
}

// ── Drop Orders (Riwayat Donasi Pakaian) Database Sync ──
export async function fetchDropOrdersFromSupabase(userId?: string): Promise<DropOrder[]> {
  if (!userId) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('drop_orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return [];

    return data.map((d: any) => ({
      id: d.id,
      bookingCode: d.booking_code,
      userId: d.user_id || 'usr-guest',
      userName: d.user_name,
      userPhone: d.user_phone,
      userAddress: d.user_address,
      method: d.method as any,
      dropPointId: d.drop_point_id,
      dropPointName: d.drop_point_name,
      courierService: d.courier_service,
      scheduledDate: d.scheduled_date || '2026-09-06',
      scheduledSlot: d.scheduled_slot || '09.00 - 12.00 (Pagi)',
      itemCount: Number(d.item_count) || 1,
      garmentTypes: d.garment_types || [],
      status: d.status as any,
      pointsAwarded: Number(d.points_awarded) || 300,
      pointsCredited: d.status === 'RECEIVED' || d.status === 'COMPLETED',
      waterSavedLiters: Number(d.water_saved_liters) || 2700,
      co2SavedKg: Number(d.co2_saved_kg) || 3.6,
      createdAt: d.created_at,
      qrCodeValue: d.qr_code_value || `CLD-VERIFY:${d.booking_code}:${d.points_awarded}PTS`,
      notes: d.notes,
    }));
  } catch {
    return [];
  }
}

export async function saveDropOrderToSupabase(order: DropOrder): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.from('drop_orders').upsert({
      id: order.id,
      booking_code: order.bookingCode,
      user_id: order.userId,
      user_name: order.userName,
      user_phone: order.userPhone,
      user_address: order.userAddress || `${order.userCity || ''} ${order.userDistrict || ''}`,
      method: order.method,
      drop_point_id: order.dropPointId,
      drop_point_name: order.dropPointName,
      courier_service: order.courierService,
      item_count: order.itemCount,
      garment_types: order.garmentTypes,
      status: order.status,
      points_awarded: order.pointsAwarded,
      water_saved_liters: order.waterSavedLiters,
      co2_saved_kg: order.co2SavedKg,
      qr_code_value: order.qrCodeValue,
      notes: order.notes,
      created_at: order.createdAt,
    });
  } catch {
    // ignore
  }
}

// ── Marketplace & Craft Orders (Riwayat Pembelian & Pelacakan) Database Sync ──
export async function fetchMarketplaceOrdersFromSupabase(userId?: string): Promise<CraftOrder[]> {
  if (!userId) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('marketplace_orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return [];

    return data.map((d: any) => ({
      id: d.id,
      orderNumber: d.order_number,
      trackingNumber: d.tracking_number,
      courierName: d.courier_name || 'J&T Express EZ',
      items: typeof d.items === 'string' ? JSON.parse(d.items) : d.items,
      receiverName: d.receiver_name,
      receiverPhone: d.receiver_phone,
      destinationCity: d.destination_city,
      fullAddress: d.full_address,
      subtotal: Number(d.subtotal),
      shippingCost: Number(d.shipping_cost),
      pointsDiscount: Number(d.points_discount) || 0,
      pointsUsed: Number(d.points_used) || 0,
      totalAmount: Number(d.total_amount),
      paymentMethod: d.payment_method,
      paymentCategory: d.payment_category as any,
      status: d.status as any,
      escrowStatus: d.escrow_status as any,
      createdAt: d.created_at,
      estimatedDeliveryDate: d.estimated_delivery_date || '2026-09-08',
    }));
  } catch {
    return [];
  }
}

export async function saveMarketplaceOrderToSupabase(order: CraftOrder): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.from('marketplace_orders').upsert({
      id: order.id,
      order_number: order.orderNumber,
      tracking_number: order.trackingNumber,
      courier_name: order.courierName,
      items: order.items,
      receiver_name: order.receiverName,
      receiver_phone: order.receiverPhone,
      destination_city: order.destinationCity,
      full_address: order.fullAddress,
      subtotal: order.subtotal,
      shipping_cost: order.shippingCost,
      points_discount: order.pointsDiscount,
      points_used: order.pointsUsed,
      total_amount: order.totalAmount,
      payment_method: order.paymentMethod,
      payment_category: order.paymentCategory,
      status: order.status,
      escrow_status: order.escrowStatus,
      estimated_delivery_date: order.estimatedDeliveryDate,
      created_at: order.createdAt,
    });
  } catch {
    // ignore
  }
}

export async function updateMarketplaceOrderStatusInSupabase(orderNumber: string, status: CraftOrderStatus): Promise<void> {
  try {
    const supabase = createClient();
    const isDone = status === 'COMPLETED';
    await supabase.from('marketplace_orders').update({
      status,
      escrow_status: isDone ? 'RELEASED_TO_ARTISAN' : 'HELD_IN_ESCROW',
    }).eq('order_number', orderNumber);
  } catch {
    // ignore
  }
}

