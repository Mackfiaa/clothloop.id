'use client';

import React, { useEffect, useRef } from 'react';
import { DropPoint } from '@/lib/types';
import L from 'leaflet';

interface DropPointMapProps {
  points: DropPoint[];
  selectedPointId?: string;
  onSelectPoint?: (id: string) => void;
  height?: string;
}

export function DropPointMap({
  points,
  selectedPointId,
  onSelectPoint,
  height = '340px',
}: DropPointMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialLat = -6.8;
    const initialLng = 108.8;
    const initialZoom = 6;

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
          width: 28px;
          height: 28px;
          background: ${isSelected ? '#1b3628' : '#ffffff'};
          color: ${isSelected ? '#ffffff' : '#1b3628'};
          border: 1.5px solid #1b3628;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
        ">
          CL
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'clothloop-pin',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      });

      const marker = L.marker([point.latitude, point.longitude], { icon: customIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: 'DM Sans', sans-serif; padding: 2px; max-width: 220px;">
          <span style="font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #757169; display: block; margin-bottom: 2px;">
            ${point.city} &middot; ${point.category}
          </span>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 13px; font-weight: 700; color: #191817; margin: 0 0 4px 0; line-height: 1.2;">
            ${point.name}
          </h4>
          <p style="font-size: 11px; color: #757169; margin: 0 0 6px 0; line-height: 1.35;">
            ${point.address}
          </p>
          <div style="font-size: 10px; color: #1b3628; font-weight: 600; margin-bottom: 6px;">
            Operasional: ${point.operatingHours}
          </div>
          <button id="btn-select-${point.id}" style="
            width: 100%;
            background: #1b3628;
            color: #ffffff;
            border: none;
            padding: 6px 8px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
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

    if (!selectedPointId && points.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [points, selectedPointId, onSelectPoint]);

  // Smooth flyTo selected point
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPointId) return;

    const selectedPoint = points.find((p) => p.id === selectedPointId);
    if (selectedPoint) {
      map.flyTo([selectedPoint.latitude, selectedPoint.longitude], 13, { duration: 1.0 });
      const marker = markersRef.current.get(selectedPointId);
      if (marker) marker.openPopup();
    }
  }, [selectedPointId, points]);

  return (
    <div style={{ position: 'relative', width: '100%', height, border: '1px solid var(--border-hairline)' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />
      <div className="absolute top-2 right-2 z-10 bg-white/95 px-2.5 py-1 border border-[var(--border-hairline)] text-[10px] text-[var(--ink-secondary)] font-mono">
        OpenStreetMap Network
      </div>
    </div>
  );
}
