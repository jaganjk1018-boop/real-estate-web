'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Info, 
  Calendar,
  Layers
} from 'lucide-react';
import { formatPrice, formatLocalizedPrice } from '../lib/utils';
import { useRealEstateStore } from '../lib/store';

export default function VirtualTourModal({ property, isOpen, onClose, onScheduleVisit }) {
  const { currency, unit } = useRealEstateStore();
  const [mounted, setMounted] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background page scroll so page stays stationary ("standed")
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !property || !mounted) return null;

  const rooms = property.virtualTourRooms || [
    {
      id: 'default-room',
      name: 'Main Living Gallery',
      panoramaUrl: property.images[0],
      description: 'Expansive open-plan living area with bespoke finishes and direct terrace flow.',
      hotspots: [
        { id: 'hs-def', title: 'Architectural Glazing', x: 50, y: 50, description: 'Motorized dual-pane acoustic glass systems.' }
      ]
    }
  ];

  const currentRoom = rooms[currentRoomIndex] || rooms[0];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    // Bound the pan
    setPanOffset({
      x: Math.max(-200, Math.min(200, newX)),
      y: Math.max(-100, Math.min(100, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return createPortal(
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-6 animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#FAF8F5] z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#996515] text-[10px] font-extrabold uppercase tracking-widest border border-[#D4AF37]/30">
                Interactive 3D Tour
              </span>
              <h3 className="text-lg font-bold text-[#1E3A5F] font-serif truncate max-w-md">
                {property.title}
              </h3>
            </div>
            <p className="text-xs text-[#4B5563] mt-0.5">
              Current Perspective: <span className="text-[#1E3A5F] font-bold">{currentRoom.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onScheduleVisit?.(property)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs transition-all shadow-md"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Book In-Person Visit</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-gray-100 text-[#4B5563] hover:text-[#1E3A5F] border border-gray-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Panorama Interactive Canvas */}
        <div 
          className="relative flex-1 bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Main Panorama Image */}
          <div 
            className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${zoom}) translate(${panOffset.x}px, ${panOffset.y}px)`
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentRoom.panoramaUrl}
              alt={currentRoom.name}
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Interactive Hotspots */}
            {currentRoom.hotspots?.map((hs) => (
              <div
                key={hs.id}
                style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot?.id === hs.id ? null : hs);
                }}
              >
                <div className="relative group cursor-pointer pointer-events-auto">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg shadow-[#D4AF37]/50 animate-pulse hover:scale-125 transition-transform">
                    <Info className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/60 absolute -inset-1.5 animate-ping pointer-events-none" />

                  {/* Hotspot Hover Label */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-[#1E3A5F] border border-[#D4AF37]/40 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white whitespace-nowrap shadow-xl">
                    {hs.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Hotspot Info Card */}
          {activeHotspot && (
            <div className="absolute top-6 left-6 max-w-xs bg-white/95 border-2 border-[#D4AF37] p-4 rounded-2xl shadow-2xl backdrop-blur-md z-30 animate-in fade-in slide-in-from-top-4 text-[#1F2937]">
              <div className="flex items-center justify-between pb-1 border-b border-gray-200 mb-2">
                <span className="text-xs font-bold text-[#1E3A5F]">{activeHotspot.title}</span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-gray-400 hover:text-[#1E3A5F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>
          )}

          {/* Floating Canvas Controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 z-20 shadow-md">
            <button
              onClick={() => setZoom((prev) => Math.min(prev + 0.25, 2.5))}
              className="p-2 text-[#1E3A5F] hover:bg-gray-100 rounded-xl transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((prev) => Math.max(prev - 0.25, 0.75))}
              className="p-2 text-[#1E3A5F] hover:bg-gray-100 rounded-xl transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-2 text-[#1E3A5F] hover:bg-gray-100 rounded-xl transition-colors"
              title="Reset View"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Pan Navigation Hint */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-[#1E3A5F] border border-gray-200 pointer-events-none font-medium shadow-sm">
            💡 Click and drag to pan 360° • Click glowing dots for details
          </div>
        </div>

        {/* Bottom Room Switcher Strip */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-t border-gray-200 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-[11px] font-bold text-[#4B5563] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              Spaces:
            </span>
            {rooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => {
                  setCurrentRoomIndex(idx);
                  resetView();
                  setActiveHotspot(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  currentRoomIndex === idx
                    ? 'bg-[#1E3A5F] text-white shadow-sm font-bold'
                    : 'bg-white text-[#1F2937] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs text-[#4B5563] shrink-0">
            <span>Price: <strong className="text-[#1E3A5F] font-serif text-sm font-black">{formatLocalizedPrice(property.price, currency, property.priceSuffix, property.currency)}</strong></span>
            <span>•</span>
            <span>{property.bedrooms} Beds, {property.bathrooms} Baths</span>
          </div>
        </div>

      </div>

    </div>,
    document.body
  );
}
