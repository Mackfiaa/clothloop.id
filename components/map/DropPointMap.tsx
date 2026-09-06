'use client';

import React, { useEffect, useRef } from 'react';
import { DropPoint } from '@/lib/types';
import L from 'leaflet';
import { Globe, MapPin } from 'lucide-react';

interface DropPointMapProps {
  points: DropPoint[];
  selectedPointId?: string;
  onSelectPoint?: (id: string) => void;
  height?: string;
  autoFitAll?: boolean;
}

export function DropPointMap({
  points,
  selectedPointId,
  onSelectPoint,
  height = '340px',
  autoFitAll = true,
}: DropPointMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const boundsRef = useRef<L.LatLngBounds | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center of Indonesia archipelago
    const initialLat = -2.5;
    const initialLng = 118.0;
    const initialZoom = 5;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: initialZoom,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    if (points.length === 0) return;

    const bounds = L.latLngBounds([]);

    points.forEach((point) => {
      const isSelected = point.id === selectedPointId;

      const iconHtml = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: ${isSelected ? '#059669' : '#064e3b'};
          color: #ffffff;
          border: 2px solid ${isSelected ? '#34d399' : '#ffffff'};
          box-shadow: 0 4px 10px rgba(0,0,0,0.35);
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        ">
          <div style="
            transform: rotate(45deg);
            font-size: 11px;
            font-weight: 800;
            font-family: sans-serif;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            CL
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'clothloop-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([point.latitude, point.longitude], { 
        icon: customIcon,
        title: `${point.name} (${point.city})`,
      }).addTo(map);

      // Tooltip on hover
      marker.bindTooltip(`<strong>${point.name}</strong><br/><span style="font-size:10px; color:#064e3b;">${point.city} &bull; ${point.category}</span>`, {
        direction: 'top',
        offset: [0, -30],
        opacity: 0.95,
      });

      // Popup Content on click
      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px; max-width: 240px;">
          <span style="font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #059669; display: block; margin-bottom: 2px;">
            ${point.city} &middot; ${point.category}
          </span>
          <h4 style="font-size: 13px; font-weight: 800; color: #111827; margin: 0 0 4px 0; line-height: 1.25; letter-spacing: -0.02em;">
            ${point.name}
          </h4>
          <p style="font-size: 11px; color: #4b5563; margin: 0 0 6px 0; line-height: 1.35;">
            ${point.address}
          </p>
          <div style="font-size: 10px; color: #064e3b; font-weight: 700; margin-bottom: 8px; background: #ecfdf5; padding: 3px 6px; border-radius: 4px; border: 1px solid #a7f3d0;">
            🕒 Jam Operasional: ${point.operatingHours}
          </div>
          <button id="btn-select-${point.id}" style="
            width: 100%;
            background: #064e3b;
            color: #ffffff;
            border: none;
            padding: 7px 10px;
            font-size: 11px;
            font-weight: 700;
            border-radius: 6px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          ">
            Pilih Lokasi Ini
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-select-${point.id}`);
        if (btn && onSelectPoint) {
          btn.onclick = () => {
            onSelectPoint(point.id);
            marker.closePopup();
          };
        }
      });

      marker.on('click', () => {
        if (onSelectPoint) onSelectPoint(point.id);
      });

      markersRef.current.set(point.id, marker);
      bounds.extend([point.latitude, point.longitude]);
    });

    boundsRef.current = bounds;

    // Fit bounds across all points initially if points changed or autoFit requested
    if (bounds.isValid() && (!selectedPointId || autoFitAll)) {
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 12 });
    }
  }, [points, onSelectPoint]);

  // Handle selected point flyTo when user clicks a specific point
  const prevSelectedRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPointId) return;

    // Only fly if user actively changed the selected point
    if (prevSelectedRef.current !== selectedPointId) {
      prevSelectedRef.current = selectedPointId;
      const selectedPoint = points.find((p) => p.id === selectedPointId);
      if (selectedPoint) {
        map.flyTo([selectedPoint.latitude, selectedPoint.longitude], 14, { duration: 1.2 });
        const marker = markersRef.current.get(selectedPointId);
        if (marker) {
          setTimeout(() => marker.openPopup(), 400);
        }
      }
    }
  }, [selectedPointId, points]);

  const handleFitAll = () => {
    const map = mapInstanceRef.current;
    if (!map || !boundsRef.current || !boundsRef.current.isValid()) return;
    map.fitBounds(boundsRef.current, { padding: [30, 30], maxZoom: 12 });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height, border: '1px solid var(--border-hairline)' }} className="rounded-2xl overflow-hidden">
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />
      
      {/* Top Controls Overlay */}
      <div className="absolute top-2.5 right-2.5 z-10 flex gap-1.5 items-center">
        <button
          type="button"
          onClick={handleFitAll}
          className="bg-white/95 hover:bg-white text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-900/20 text-[10px] font-bold shadow-md cursor-pointer transition-all flex items-center gap-1"
          title="Tampilkan seluruh titik kumpul di peta Indonesia"
        >
          <Globe size={12} className="text-emerald-700" />
          <span>Lihat Semua ({points.length} Titik)</span>
        </button>
      </div>

      {/* Bottom Left Legend */}
      <div className="absolute bottom-2.5 left-2.5 z-10 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-emerald-900/15 text-[10px] text-emerald-950 font-bold shadow-sm flex items-center gap-1.5 pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-700 ring-2 ring-emerald-400" />
        <span>{points.length} Titik Kumpul Terdaftar di Indonesia</span>
      </div>
    </div>
  );
}
