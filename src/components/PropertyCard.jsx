'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Layers, 
  BedDouble, 
  Bath, 
  Maximize, 
  MapPin, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  ShieldCheck,
  FolderPlus,
  Trees,
  Award
} from 'lucide-react';
import { formatLocalizedPrice, formatLocalizedArea } from '../lib/utils';
import { useRealEstateStore } from '../lib/store';

function PropertyCard({ 
  property, 
  onOpenTour, 
  onScheduleVisit,
  onAddToVault 
}) {
  const { 
    toggleFavorite, 
    isFavorite, 
    toggleCompare, 
    isComparing, 
    currency, 
    unit,
    vaultCollections,
    togglePropertyInCollection 
  } = useRealEstateStore();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVaultMenu, setShowVaultMenu] = useState(false);

  const fav = isFavorite(property.id);
  const comparing = isComparing(property.id);

  return (
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-[#E5E7EB] hover:border-[#D4AF37] transition-all duration-300 shadow-card hover:shadow-luxury-hover bg-white">
      
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF8F5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.images[activeImageIndex] || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {(property.isLand || property.category === 'Empty Land') && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white shadow-md">
              <Trees className="w-3 h-3" />
              Empty Land Plot
            </span>
          )}
          {property.isFeatured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#1E3A5F] shadow-md">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
          {property.isHot && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-md">
              <Flame className="w-3 h-3" />
              Trophy Pick
            </span>
          )}
          {property.isVerified && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-emerald-800 border border-emerald-300 shadow-sm backdrop-blur-md">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Verified
            </span>
          )}
          {property.isSellerListing && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#1E3A5F] text-[#D4AF37] border border-[#D4AF37]/50 shadow-md">
              <Award className="w-3 h-3 text-[#D4AF37]" />
              Direct Owner Mandate
            </span>
          )}
        </div>

        {/* Top Right Action Icons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Vault Add Toggle */}
          <div className="relative">
            <button
              type="button"
              suppressHydrationWarning
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowVaultMenu(!showVaultMenu);
              }}
              title="Save to Client Vault Collection"
              className="p-2 rounded-xl backdrop-blur-md bg-white/90 text-[#1E3A5F] hover:text-[#D4AF37] hover:bg-white border border-gray-200 shadow-sm transition-all"
            >
              <FolderPlus className="w-4 h-4" />
            </button>

            {/* Quick Vault Collection Dropdown */}
            {showVaultMenu && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-[#D4AF37]/50 rounded-2xl p-2 shadow-2xl z-30 space-y-1 animate-in fade-in zoom-in-95 text-xs text-left"
              >
                <span className="block px-2.5 py-1 text-[10px] uppercase font-bold text-[#1E3A5F] tracking-wider">
                  Save to Vault:
                </span>
                {vaultCollections.map((col) => {
                  const inCol = col.propertyIds.includes(property.id);
                  return (
                    <button
                      key={col.id}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => togglePropertyInCollection(col.id, property.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                        inCol ? 'bg-[#FAF8F5] text-[#1E3A5F] font-bold border border-[#D4AF37]/30' : 'text-[#1F2937] hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate">{col.name}</span>
                      {inCol && <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Compare Toggle */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(property.id);
            }}
            title={comparing ? "Remove from comparison" : "Add to comparison"}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
              comparing
                ? 'bg-[#D4AF37] text-[#1E3A5F] font-bold border border-[#D4AF37]'
                : 'bg-white/90 text-[#1E3A5F] hover:text-[#D4AF37] hover:bg-white border border-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Favorite Toggle */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            title={fav ? "Remove from saved" : "Save property"}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
              fav
                ? 'bg-rose-500 text-white border border-rose-500'
                : 'bg-white/90 text-[#1E3A5F] hover:text-rose-500 hover:bg-white border border-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Status Pill (Bottom Left of Image) */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-[#1E3A5F] border border-gray-200 shadow-sm backdrop-blur-md">
            {property.status} • {property.category}
          </span>
        </div>

        {/* 3D Virtual Tour Button (Bottom Right of Image) */}
        {property.virtualTourRooms && property.virtualTourRooms.length > 0 && (
          <button
            type="button"
            suppressHydrationWarning
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenTour?.(property);
            }}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#D4AF37] hover:bg-[#c49f2e] text-[#1E3A5F] shadow-lg backdrop-blur-md transition-all hover:scale-105"
            title="Launch 3D Virtual Tour"
          >
            <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>360° Tour</span>
          </button>
        )}
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="text-xl font-bold text-[#1E3A5F] font-serif">
              {formatLocalizedPrice(property.price, currency, property.priceSuffix, property.currency)}
            </div>
            {property.originalPrice && (
              <span className="text-xs line-through text-[#6B7280] font-semibold">
                {formatLocalizedPrice(property.originalPrice, currency, '', property.currency)}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-base font-bold text-[#1F2937] group-hover:text-[#1E3A5F] transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#374151] font-medium mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#8A5A00] shrink-0" />
            <span className="truncate">
              {property.address.neighborhood}, {property.address.city}, {property.address.state}
            </span>
          </div>
        </div>

        {/* Key Specs Bar */}
        {(property.isLand || property.category === 'Empty Land') ? (
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-emerald-100 text-xs text-[#1F2937] bg-emerald-50/60 rounded-xl px-3">
            <div className="flex items-center gap-1.5 truncate">
              <Trees className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate font-semibold text-emerald-800">Vacant Land</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8A5A00] shrink-0" />
              <span className="truncate text-[11px] text-[#374151] font-medium">
                {property.landDetails?.approvals ? 'Approved' : 'Clear Title'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 truncate justify-end">
              <Maximize className="w-4 h-4 text-[#8A5A00] shrink-0" />
              <span className="font-bold text-[#1E3A5F]">{formatLocalizedArea(property.areaSqFt, unit)}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-gray-100 text-xs text-[#374151] bg-[#FAF8F5] rounded-xl px-3">
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-[#8A5A00]" />
              <span className="text-[#1F2937] font-medium">{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Corporate'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#8A5A00]" />
              <span className="text-[#1F2937] font-medium">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-[#8A5A00]" />
              <span className="text-[#1E3A5F] font-bold">{formatLocalizedArea(property.areaSqFt, unit)}</span>
            </div>
          </div>
        )}

        {/* Footer with Agent Mini Info & View Action */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.agent.photo}
              alt={property.agent.name}
              className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]/60 shadow-sm"
            />
            <div className="text-[11px] leading-tight">
              <span className="text-[#1F2937] block font-semibold truncate max-w-[110px]">
                {property.agent.name}
              </span>
              <span className="text-[#8A5A00] font-black text-[10px]">
                ★ {property.agent.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => onScheduleVisit?.(property)}
              className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#1E3A5F] text-[#1E3A5F] hover:text-white border border-[#1E3A5F]/20 text-[11px] font-bold transition-all shadow-sm"
            >
              VIP Tour
            </button>
            <Link
              href={`/properties/${property.id}`}
              className="p-1.5 rounded-lg bg-[#1E3A5F] hover:bg-[#D4AF37] text-white hover:text-[#1E3A5F] transition-all shadow-sm"
              title="View full architectural portfolio"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

export default React.memo(PropertyCard);
