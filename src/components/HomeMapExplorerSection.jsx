'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Sparkles, 
  Layers, 
  Compass, 
  Calendar, 
  Eye, 
  Navigation, 
  ChevronRight, 
  X, 
  BedDouble, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  GraduationCap, 
  Hospital, 
  Train, 
  Plane, 
  ShoppingBag, 
  Store, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ExternalLink,
  ChevronLeft,
  Trees,
  Satellite,
  Map as MapIcon,
  Mountain,
  Share2
} from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import { formatLocalizedPrice, formatLocalizedArea } from '../lib/utils';
import { getPropertyLocationData } from '../data/locationFacilities';

const REGION_TABS = [
  { id: 'all', label: 'All Global Markets' },
  { id: 'california', label: '🌴 California (Bel-Air & SF)' },
  { id: 'newyork', label: '🗽 New York (Manhattan)' },
  { id: 'florida', label: '🏖️ Florida (Miami Beach)' },
  { id: 'colorado', label: '🏔️ Colorado (Aspen)' },
  { id: 'chennai', label: '🌲 Chennai (Tambaram Plots)' }
];

const MAP_MODES = [
  { id: 'k', label: 'Satellite', icon: Satellite },
  { id: 'm', label: 'Streets', icon: MapIcon },
  { id: 'h', label: 'Hybrid', icon: Layers },
  { id: 'p', label: 'Terrain', icon: Mountain }
];

export default function HomeMapExplorerSection({ onScheduleVisit, onOpenTour }) {
  const { properties, currency, unit } = useRealEstateStore();
  
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeProperty, setActiveProperty] = useState(properties[0] || null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [mapMode, setMapMode] = useState('h'); // Default to Hybrid (Satellite + Roads)
  const [zoom, setZoom] = useState(15);

  const [mapProvider, setMapProvider] = useState('google'); // 'google' | 'osm'
  const [isMapLoading, setIsMapLoading] = useState(false);

  // Region filtering
  const filteredProperties = useMemo(() => {
    if (selectedRegion === 'all') return properties;
    if (selectedRegion === 'chennai') {
      return properties.filter(p => p.address?.city?.toLowerCase().includes('chennai') || p.isLand);
    }
    if (selectedRegion === 'california') {
      return properties.filter(p => {
        const c = p.address?.city?.toLowerCase() || '';
        return c.includes('los angeles') || c.includes('beverly') || c.includes('san francisco');
      });
    }
    if (selectedRegion === 'newyork') {
      return properties.filter(p => p.address?.city?.toLowerCase().includes('new york'));
    }
    if (selectedRegion === 'florida') {
      return properties.filter(p => p.address?.city?.toLowerCase().includes('miami'));
    }
    if (selectedRegion === 'colorado') {
      return properties.filter(p => p.address?.city?.toLowerCase().includes('aspen'));
    }
    return properties;
  }, [properties, selectedRegion]);

  const activeLocData = useMemo(() => {
    if (!activeProperty) return null;
    return getPropertyLocationData(activeProperty);
  }, [activeProperty]);

  const handleSelectProperty = (prop) => {
    setIsMapLoading(true);
    setActiveProperty(prop);
    setCurrentImgIdx(0);
    setIsSidePanelOpen(true);
  };

  // Map embed URL (Google Maps or OpenStreetMap)
  const mapEmbedUrl = useMemo(() => {
    const lat = activeProperty?.address?.lat || 34.0837;
    const lng = activeProperty?.address?.lng || -118.4447;
    
    if (mapProvider === 'osm') {
      const latDelta = 0.012;
      const lngDelta = 0.016;
      const bbox = `${lng - lngDelta}%2C${lat - latDelta}%2C${lng + lngDelta}%2C${lat + latDelta}`;
      return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
    }

    const query = `${lat},${lng}`;
    return `https://maps.google.com/maps?q=${query}&t=${mapMode}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
  }, [activeProperty, mapProvider, mapMode, zoom]);

  // Direct Google Maps search/directions URL
  const googleMapsDirectionsUrl = useMemo(() => {
    if (!activeProperty?.address) return 'https://maps.google.com';
    const { lat, lng, street, city } = activeProperty.address;
    if (lat && lng) {
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street}, ${city}`)}`;
  }, [activeProperty]);

  return (
    <section id="map-explorer" className="relative py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#8A5A00] font-bold font-mono">
              Live Google Maps GPS Satellite Network
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1E3A5F] font-serif tracking-tight">
            Explore Estates by <span className="text-[#8A5A00] font-normal italic">Satellite &amp; Coordinates</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Interact with live satellite mapping, real street-level routing, and topographic contours. Click any property below to pan the map directly to its GPS coordinates.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
          {REGION_TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              suppressHydrationWarning
              onClick={() => {
                setSelectedRegion(tab.id);
                const match = properties.find(p => {
                  if (tab.id === 'all') return true;
                  if (tab.id === 'chennai') return p.address?.city?.toLowerCase().includes('chennai');
                  if (tab.id === 'california') return p.address?.city?.toLowerCase().includes('los angeles');
                  if (tab.id === 'newyork') return p.address?.city?.toLowerCase().includes('new york');
                  if (tab.id === 'florida') return p.address?.city?.toLowerCase().includes('miami');
                  if (tab.id === 'colorado') return p.address?.city?.toLowerCase().includes('aspen');
                  return true;
                });
                if (match) setActiveProperty(match);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedRegion === tab.id
                  ? 'bg-[#1E3A5F] text-white font-bold border-[#1E3A5F] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:text-[#1E3A5F] hover:border-[#D4AF37]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAP STAGE CONTAINER */}
      <div className="relative h-[520px] sm:h-[600px] lg:h-[650px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-300 shadow-2xl bg-[#0F1E31] flex flex-col">
        
        {/* TOP MAP CONTROLS TOOLBAR */}
        <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          
          {/* Active Property Location Tag */}
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-[#1E3A5F] font-bold shadow-lg pointer-events-auto flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <MapPin className="w-4 h-4 text-[#8A5A00]" />
            <span className="truncate max-w-[200px] sm:max-w-xs">
              {activeProperty?.title || 'Selected Estate'} • {activeProperty?.address?.city}
            </span>
          </div>

          {/* Map Layer Mode Switcher & Provider Toggle */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-gray-200 shadow-lg pointer-events-auto">
            {mapProvider === 'google' && MAP_MODES.map(mode => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setMapMode(mode.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    mapMode === mode.id
                      ? 'bg-[#1E3A5F] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-[#1E3A5F]'
                  }`}
                  title={`${mode.label} View`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              );
            })}

            {/* Provider Switch (Google vs OpenStreetMap) */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setMapProvider(prev => (prev === 'google' ? 'osm' : 'google'))}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                mapProvider === 'osm'
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
              title="Toggle Google Satellite or OpenStreetMap"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{mapProvider === 'google' ? 'OSM' : 'Google'}</span>
            </button>

            <div className="h-4 w-px bg-gray-200 mx-0.5 hidden sm:block" />

            {/* Direct Open in Google Maps */}
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#8A5A00] hover:bg-amber-50 flex items-center gap-1 transition-colors"
              title="Open full view in Google Maps"
            >
              <span>GPS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* MAP CANVAS (REAL GOOGLE MAPS / OSM EMBED) */}
        <div className="relative flex-1 w-full h-full bg-[#0F1E31] overflow-hidden">
          
          {/* Subtle loading spinner overlay */}
          {isMapLoading && (
            <div className="absolute inset-0 z-10 bg-[#0F1E31]/40 backdrop-blur-xs flex items-center justify-center pointer-events-none transition-opacity duration-300">
              <div className="p-3 rounded-2xl bg-white/90 shadow-2xl flex items-center gap-2 text-[#1E3A5F] text-xs font-bold">
                <div className="w-4 h-4 border-2 border-[#1E3A5F] border-t-transparent rounded-full animate-spin" />
                <span>Locating Coordinates...</span>
              </div>
            </div>
          )}

          <iframe
            key={`${mapProvider}-${activeProperty?.id}-${mapMode}-${zoom}`}
            src={mapEmbedUrl}
            title="JK Realty Real Estate Live GPS Map"
            className="w-full h-full border-0 filter contrast-105"
            loading="lazy"
            allowFullScreen
            onLoad={() => setIsMapLoading(false)}
          />

          {/* Floating Zoom Controls */}
          <div className="absolute right-3 bottom-24 sm:bottom-28 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-gray-200 shadow-xl">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setZoom(prev => Math.min(prev + 1, 19))}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#1E3A5F] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setZoom(prev => Math.max(prev - 1, 10))}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#1E3A5F] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setZoom(15)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#1E3A5F] transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Open Inspector Button (If closed) */}
          {!isSidePanelOpen && activeProperty && (
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setIsSidePanelOpen(true)}
              className="absolute top-16 right-3 z-20 px-3.5 py-2 rounded-xl bg-[#1E3A5F] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xl hover:bg-[#152843] transition-all cursor-pointer animate-in fade-in"
            >
              <span>Inspect {activeProperty.title.split(' ')[0]} Details</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

        </div>

        {/* BOTTOM QUICK PROPERTY CAROUSEL STRIP */}
        <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pointer-events-auto scrollbar-none py-1">
            {filteredProperties.map(prop => {
              const isSelected = activeProperty?.id === prop.id;
              return (
                <button
                  key={prop.id}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => handleSelectProperty(prop)}
                  className={`p-2 rounded-2xl flex items-center gap-2.5 shrink-0 border transition-all cursor-pointer backdrop-blur-md shadow-xl text-left ${
                    isSelected
                      ? 'bg-[#1E3A5F] text-white border-[#D4AF37] scale-102 ring-2 ring-[#D4AF37]/50'
                      : 'bg-white/95 text-gray-800 border-gray-200 hover:bg-white hover:border-[#D4AF37]'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-11 h-11 rounded-xl object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold truncate max-w-[140px] sm:max-w-[180px]">
                      {prop.title}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] mt-0.5">
                      <span className={isSelected ? 'text-[#D4AF37] font-bold' : 'text-[#8A5A00] font-bold'}>
                        {formatLocalizedPrice(prop.price, currency, prop.priceSuffix, prop.currency)}
                      </span>
                      <span className={isSelected ? 'text-gray-300' : 'text-gray-500'}>
                        {prop.address.city}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE SIDE SLIDE-OVER DRAWER (Desktop Side / Mobile Overlay) */}
        {/* ========================================================================= */}
        {isSidePanelOpen && activeProperty && (
          <div className="absolute inset-0 sm:inset-y-0 sm:right-0 sm:left-auto w-full sm:w-[380px] md:w-[420px] h-full bg-white/98 backdrop-blur-xl border-l border-gray-200 flex flex-col justify-between p-5 overflow-y-auto z-30 animate-in slide-in-from-right-6 duration-300 shadow-2xl">
            
            <div className="space-y-4">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-[11px] uppercase tracking-widest text-[#1E3A5F] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Live GPS Estate Dossier
                </span>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setIsSidePanelOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black transition-all cursor-pointer"
                  title="Close Inspector"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Carousel */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-gray-200 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeProperty.images[currentImgIdx] || activeProperty.images[0]}
                  alt={activeProperty.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Carousel Nav */}
                {activeProperty.images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImgIdx(prev => (prev === 0 ? activeProperty.images.length - 1 : prev - 1));
                      }}
                      className="p-1 rounded-full bg-black/60 text-white hover:bg-black"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImgIdx(prev => (prev === activeProperty.images.length - 1 ? 0 : prev + 1));
                      }}
                      className="p-1 rounded-full bg-black/60 text-white hover:bg-black"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#1E3A5F] font-bold text-[10px] uppercase shadow-sm">
                    {activeProperty.category}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <div className="text-base font-black font-serif text-[#D4AF37]">
                    {formatLocalizedPrice(activeProperty.price, currency, activeProperty.priceSuffix, activeProperty.currency)}
                  </div>
                  <div className="text-[11px] text-gray-200 truncate">
                    {activeProperty.address.street}, {activeProperty.address.city}
                  </div>
                </div>
              </div>

              {/* Quick Specs Strip */}
              <div className="grid grid-cols-3 gap-2 text-center p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-200 text-xs">
                {activeProperty.isLand ? (
                  <>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Category</span>
                      <strong className="text-[#1E3A5F] font-bold font-mono">Villa Plot</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Extent</span>
                      <strong className="text-[#1E3A5F] font-bold font-mono">5.51 Cents</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Area</span>
                      <strong className="text-[#1E3A5F] font-bold font-mono">{formatLocalizedArea(activeProperty.areaSqFt, unit)}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Bedrooms</span>
                      <strong className="text-[#1E3A5F] font-bold">{activeProperty.bedrooms} Beds</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Baths</span>
                      <strong className="text-[#1E3A5F] font-bold">{activeProperty.bathrooms} Baths</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Living Area</span>
                      <strong className="text-[#1E3A5F] font-bold font-mono">{formatLocalizedArea(activeProperty.areaSqFt, unit)}</strong>
                    </div>
                  </>
                )}
              </div>

              {/* Nearby Infrastructure Proximity */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Proximity &amp; Transit Infrastructure
                </span>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {activeProperty.nearby && activeProperty.nearby.length > 0 ? (
                    activeProperty.nearby.slice(0, 4).map((nb, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <Train className="w-3.5 h-3.5 text-[#1E3A5F] shrink-0" />
                          <span className="text-gray-700 truncate">{nb.name}</span>
                        </div>
                        <span className="font-mono text-emerald-700 font-bold shrink-0 text-[11px] pl-2">
                          {nb.distance}
                        </span>
                      </div>
                    ))
                  ) : (
                    activeLocData?.amenities?.slice(0, 4).map((a, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100 text-xs">
                        <span className="text-gray-700 truncate">{a.name}</span>
                        <span className="font-mono text-emerald-700 font-bold shrink-0 text-[11px]">
                          {a.distance}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => onScheduleVisit?.(activeProperty)}
                  className="py-2.5 px-3 rounded-xl bg-[#1E3A5F] hover:bg-[#152843] text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                >
                  Book VIP Tour
                </button>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => onOpenTour?.(activeProperty)}
                  className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-gray-100 text-[#1E3A5F] border border-gray-300 font-bold text-xs transition-all cursor-pointer"
                >
                  360° Virtual Tour
                </button>
              </div>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>Turn-by-Turn GPS Directions in Google Maps</span>
              </a>
            </div>

          </div>
        )}

      </div>

    </section>
  );
}
