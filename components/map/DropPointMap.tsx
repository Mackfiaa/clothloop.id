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
  height = '420px',
}: DropPointMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already initialized
    if (mapInstanceRef.current) return;

    // Center of Indonesia (Java focus default)
    const initialLat = -6.5;
    const initialLng = 108.5;
    const initialZoom = 6;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: initialZoom,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Popups when points change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    if (points.length === 0) return;

    const bounds = L.latLngBounds([]);

    points.forEach((point) => {
      const isSelected = point.id === selectedPointId;

      // Custom DivIcon with ClothLoop Theme
      const iconHtml = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: ${isSelected ? 'var(--forest)' : '#ffffff'};
          color: ${isSelected ? '#ffffff' : 'var(--forest)'};
          border: 2px solid var(--forest);
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
          transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
            <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
            <path d="m14 16-3 3 3 3"/>
            <path d="M8.293 13.596 3.5 9.5 8.293 5.404"/>
            <path d="m17 7 3-3-3-3"/>
            <path d="M15.5 9.5 20.3 5.4 15.5 1.3"/>
          </svg>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'clothloop-map-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([point.latitude, point.longitude], { icon: customIcon }).addTo(map);

      // Popup content
      const popupContent = `
        <div style="font-family: 'DM Sans', sans-serif; padding: 4px; max-width: 220px;">
          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b6760; display: block; margin-bottom: 2px;">
            ${point.city} &middot; ${point.category}
          </span>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 700; color: #0f0e0d; margin: 0 0 6px 0; line-height: 1.2;">
            ${point.name}
          </h4>
          <p style="font-size: 11px; color: #6b6760; margin: 0 0 6px 0; line-height: 1.4;">
            ${point.address}
          </p>
          <div style="font-size: 10px; color: #1a3b2a; font-weight: 600; margin-bottom: 8px;">
            ⏰ ${point.operatingHours}
          </div>
          <button id="btn-select-${point.id}" style="
            width: 100%;
            background: #1a3b2a;
            color: #ffffff;
            border: none;
            padding: 6px 10px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.04em;
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
        if (onSelectPoint) {
          onSelectPoint(point.id);
        }
      });

      markersRef.current.set(point.id, marker);
      bounds.extend([point.latitude, point.longitude]);
    });

    // If single or no selection, fit all points
    if (!selectedPointId && points.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [points, selectedPointId, onSelectPoint]);

  // Smooth Fly-to selected point
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPointId) return;

    const selectedPoint = points.find((p) => p.id === selectedPointId);
    if (selectedPoint) {
      map.flyTo([selectedPoint.latitude, selectedPoint.longitude], 14, {
        duration: 1.2,
      });

      const marker = markersRef.current.get(selectedPointId);
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedPointId, points]);

  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden', border: '1px solid var(--line)' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />
      
      {/* Overlay badge */}
      <div style={{
        position: 'absolute',
        top: '0.75rem',
        right: '0.75rem',
        zIndex: 10,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
        padding: '0.375rem 0.75rem',
        border: '1px solid var(--line)',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.6875rem',
        color: 'var(--ink-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: 'var(--forest)' }} />
        <span>OpenStreetMap Live Data</span>
      </div>
    </div>
  );
}
