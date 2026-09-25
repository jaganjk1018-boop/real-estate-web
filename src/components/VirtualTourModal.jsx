'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Calendar,
  Layers,
  Sparkles,
  BedDouble,
  Bath,
  Maximize2
} from 'lucide-react';
import { formatLocalizedPrice, formatLocalizedArea } from '../lib/utils';
import { useRealEstateStore } from '../lib/store';
import ThreeDVirtualTourViewer from './ThreeDVirtualTourViewer';

export default function VirtualTourModal({ property, isOpen, onClose, onScheduleVisit }) {
  const { currency, unit } = useRealEstateStore();
  const [mounted, setMounted] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background page scroll while modal is active
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

  // Reset room index when opened for a new property
  useEffect(() => {
    if (isOpen) {
      setCurrentRoomIndex(0);
    }
  }, [isOpen, property?.id]);

  if (!isOpen || !property || !mounted) return null;

  const rooms = property.virtualTourRooms && property.virtualTourRooms.length > 0 
    ? property.virtualTourRooms 
    : [
        {
          id: 'room-1',
          name: 'Main Living Salon',
          panoramaUrl: property.images?.[0] || '/images/images.jpg',
          description: 'Expansive open-plan living area with bespoke finishes and direct terrace flow.'
        }
      ];

  const currentRoom = rooms[currentRoomIndex] || rooms[0];

  return createPortal(
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-1 sm:p-4 md:p-6 animate-in fade-in duration-300"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-[1400px] h-[92vh] bg-[#070c14] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/10 bg-[#0B1523] z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] font-bold shadow-md shrink-0">
              <span className="font-serif font-black text-sm">3D</span>
            </div>
            
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-extrabold uppercase tracking-widest border border-[#D4AF37]/40">
                  Spatial 4K WebGL Scan
                </span>
                <span className="text-[11px] text-gray-400 hidden sm:inline">•</span>
                <span className="text-[11px] text-emerald-400 font-semibold hidden sm:flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Matterport LiDAR Calibrated
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif truncate max-w-lg">
                {property.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onScheduleVisit?.(property)}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:brightness-110 text-[#1E3A5F] font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book VIP Concierge Visit</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/15 transition-all"
              title="Close 3D Tour (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D WebGL Spatial Viewer Engine */}
        <div className="relative flex-1 overflow-hidden">
          <ThreeDVirtualTourViewer
            property={property}
            currentRoomIndex={currentRoomIndex}
            onRoomChange={(idx) => setCurrentRoomIndex(idx)}
            onScheduleVisit={onScheduleVisit}
          />
        </div>

        {/* Bottom Room Selector Strip */}
        <div className="px-5 sm:px-7 py-3 bg-[#0B1523] border-t border-white/10 flex items-center justify-between gap-4 z-20 shrink-0">
          
          {/* Room Thumbnails / Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0 flex items-center gap-1.5 mr-1">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              Spaces ({rooms.length}):
            </span>

            {rooms.map((room, idx) => {
              const isActive = currentRoomIndex === idx;
              return (
                <button
                  key={room.id || idx}
                  onClick={() => setCurrentRoomIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#1E3A5F] font-bold shadow-md shadow-[#D4AF37]/30 scale-102'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#1E3A5F]' : 'bg-[#D4AF37]'}`} />
                  <span>{room.name}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Estate Metadata */}
          <div className="hidden lg:flex items-center gap-4 text-xs text-gray-300 shrink-0 border-l border-white/10 pl-4 font-mono">
            <div>
              <span className="text-gray-500 uppercase text-[9px] block">Price</span>
              <strong className="text-[#D4AF37] font-serif text-sm font-black">
                {formatLocalizedPrice(property.price, currency, property.priceSuffix, property.currency)}
              </strong>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-[#D4AF37]" />
                {property.bedrooms} Beds
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-[#D4AF37]" />
                {property.bathrooms} Baths
              </span>
              {property.areaSqFt && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {formatLocalizedArea(property.areaSqFt, unit)}
                  </span>
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
}
