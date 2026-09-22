'use client';

import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Navigation, 
  Copy, 
  Check, 
  ExternalLink, 
  Layers, 
  Eye, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Hospital, 
  Train, 
  Bus, 
  Plane, 
  ShoppingBag, 
  Store, 
  Fuel, 
  CreditCard, 
  Shield, 
  Trees, 
  Car, 
  Footprints,
  Map as MapIcon
} from 'lucide-react';
import { getPropertyLocationData, FACILITY_CATEGORIES } from '../data/locationFacilities';

export default function PropertyLocationIntelligence({ property }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [mapMode, setMapMode] = useState('light'); // 'light' | 'satellite' | 'street' | 'google'
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);

  const locData = useMemo(() => {
    return getPropertyLocationData(property);
  }, [property]);

  if (!locData) return null;

  const filteredFacilities = useMemo(() => {
    if (activeCategory === 'all') return locData.facilities;
    return locData.facilities.filter(f => f.group === activeCategory);
  }, [locData, activeCategory]);

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(`${locData.lat}, ${locData.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'School':
      case 'College':
        return <GraduationCap className="w-4 h-4" />;
      case 'Hospital':
        return <Hospital className="w-4 h-4" />;
      case 'Bus Stand':
        return <Bus className="w-4 h-4" />;
      case 'Railway Station':
        return <Train className="w-4 h-4" />;
      case 'Airport':
        return <Plane className="w-4 h-4" />;
      case 'Shopping Mall':
        return <ShoppingBag className="w-4 h-4" />;
      case 'Super Market':
        return <Store className="w-4 h-4" />;
      case 'Petrol Bunk':
        return <Fuel className="w-4 h-4" />;
      case 'ATM':
        return <CreditCard className="w-4 h-4" />;
      case 'Police Station':
        return <Shield className="w-4 h-4" />;
      case 'Park':
        return <Trees className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (group) => {
    switch (group) {
      case 'education':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'healthcare':
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'transit':
        return 'text-[#996515] bg-[#D4AF37]/15 border-[#D4AF37]/30';
      case 'lifestyle':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'essentials':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'safety':
        return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      default:
        return 'text-[#1E3A5F] bg-[#1E3A5F]/10 border-[#1E3A5F]/20';
    }
  };

  return (
    <div className="space-y-8 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
      
      {/* 1. LOCATION HEADER & EXACT ADDRESS WITH DIRECTIONS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-[#D4AF37]/15 text-[#996515] border border-[#D4AF37]/30 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              Verified GPS Location
            </span>
            <span className="text-xs text-[#4B5563]">
              {property.address.neighborhood || property.address.city}, {property.address.state}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] font-serif">
            Property Location & Surroundings
          </h2>
          
          <p className="text-sm text-[#4B5563] font-medium flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{locData.exactAddress}</span>
          </p>
        </div>

        {/* GPS Badge & Direction Actions */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Coordinates badge with copy */}
          <button
            onClick={handleCopyCoordinates}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-gray-200 text-xs text-[#1F2937] hover:border-[#D4AF37] transition-all group shadow-sm"
            title="Click to copy GPS coordinates"
          >
            <Compass className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
            <span className="font-mono text-[11px] font-semibold">{locData.coordinatesFormatted}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1E3A5F]" />
            )}
          </button>

          {/* Google Maps Directions Deep Link */}
          <a
            href={locData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs shadow-md shadow-[#1E3A5F]/20 transition-all hover:scale-[1.02]"
          >
            <Navigation className="w-3.5 h-3.5 fill-white text-[#D4AF37]" />
            <span>Get Directions</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>

      {/* 2. INTERACTIVE MAP SECTION WITH LAYER SWITCHER */}
      <div className="space-y-4">
        
        {/* Layer & Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Layer View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#FAF8F5] border border-gray-200 rounded-xl shadow-sm">
            <button
              onClick={() => setMapMode('light')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                mapMode === 'light' 
                  ? 'bg-[#1E3A5F] text-white font-bold shadow-sm' 
                  : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Interactive Map</span>
            </button>
            <button
              onClick={() => setMapMode('satellite')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                mapMode === 'satellite' 
                  ? 'bg-[#1E3A5F] text-white font-bold shadow-sm' 
                  : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Satellite View</span>
            </button>
            <button
              onClick={() => setMapMode('street')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                mapMode === 'street' 
                  ? 'bg-[#1E3A5F] text-white font-bold shadow-sm' 
                  : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Street View</span>
            </button>
            <button
              onClick={() => setMapMode('google')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                mapMode === 'google' 
                  ? 'bg-[#1E3A5F] text-white font-bold shadow-sm' 
                  : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Maps Live</span>
            </button>
          </div>

          {/* Map Zoom & Center Controls */}
          {mapMode !== 'google' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(prev => Math.min(prev + 0.25, 2.0))}
                className="p-2 rounded-lg bg-white border border-gray-200 text-[#1F2937] hover:border-[#D4AF37] transition-all shadow-sm"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#1E3A5F]" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.8))}
                className="p-2 rounded-lg bg-white border border-gray-200 text-[#1F2937] hover:border-[#D4AF37] transition-all shadow-sm"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5 text-[#1E3A5F]" />
              </button>
              <button
                onClick={() => { setZoom(1); setSelectedFacility(null); }}
                className="p-2 rounded-lg bg-white border border-gray-200 text-[#1F2937] hover:border-[#D4AF37] transition-all shadow-sm"
                title="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#1E3A5F]" />
              </button>
            </div>
          )}

        </div>

        {/* Facility Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FACILITY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                activeCategory === cat.id
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] font-semibold shadow-sm'
                  : 'bg-[#FAF8F5] border-gray-200 text-[#4B5563] hover:text-[#1E3A5F] hover:border-gray-300'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-75">
                ({cat.id === 'all' ? locData.facilities.length : locData.facilities.filter(f => f.group === cat.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Active Route Simulator Ribbon (Visible when a facility is clicked) */}
        {selectedFacility && (
          <div className="p-3.5 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1E3A5F] text-[#D4AF37] flex items-center justify-center font-bold shadow-sm">
                <Navigation className="w-4 h-4 fill-[#D4AF37]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1E3A5F] flex items-center gap-2">
                  <span>Route to: {selectedFacility.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#996515] border border-[#D4AF37]/30 font-semibold shadow-sm">
                    {selectedFacility.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#4B5563] mt-0.5">
                  <span className="flex items-center gap-1 text-[#1E3A5F] font-bold">
                    <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {selectedFacility.driveTime} ({selectedFacility.distance})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#4B5563]">
                    <Footprints className="w-3.5 h-3.5" />
                    {selectedFacility.walkTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${locData.lat},${locData.lng}&destination=${encodeURIComponent(selectedFacility.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#1E3A5F] text-white font-bold text-xs flex items-center gap-1 hover:bg-[#162C48] transition-all shadow-sm"
              >
                <span>Navigate in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
              </a>
              <button
                onClick={() => setSelectedFacility(null)}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-xs text-[#4B5563] border border-gray-200"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* MAP CANVAS CONTAINER */}
        <div className="relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden border border-gray-200 bg-[#FAF8F5] select-none shadow-card">
          
          {mapMode === 'google' ? (
            /* Live Google Maps Embed */
            <iframe
              title="Google Map Live"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${locData.lat},${locData.lng}&hl=en&z=15&output=embed`}
              className="w-full h-full border-0"
            />
          ) : mapMode === 'street' ? (
            /* Street View / 360° Neighborhood Panorama */
            <div className="relative w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85"
                alt="Neighborhood Street View"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-[#1E3A5F] font-semibold flex items-center gap-2 shadow-md">
                <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>360° Street Vantage Corridor: {locData.exactAddress}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-lg">
                <div>
                  <h4 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider">Avenue Security & Street Elevation</h4>
                  <p className="text-[11px] text-[#4B5563]">Tree-lined private access lane with underground utilities and 24/7 security booth.</p>
                </div>
                <button 
                  onClick={() => setMapMode('light')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs shadow-sm"
                >
                  Return to Map
                </button>
              </div>
            </div>
          ) : (
            /* Luxury Vector & Satellite Interactive Canvas */
            <div 
              className="relative w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* Satellite / Light Vector Layer */}
              {mapMode === 'satellite' ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2400&q=85"
                    alt="Satellite Terrain"
                    className="w-full h-full object-cover filter contrast-110 brightness-95"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </>
              ) : (
                <div className="w-full h-full bg-[#FAF8F5] relative overflow-hidden">
                  {/* Architectural Road Grid Vector Lines */}
                  <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="city-grid-light" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(30, 58, 95, 0.08)" strokeWidth="1" />
                        <path d="M 30 0 L 30 60 M 0 30 L 60 30" fill="none" stroke="rgba(212, 175, 55, 0.12)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#city-grid-light)" />
                    
                    {/* Simulated Major Arterial Boulevards */}
                    <line x1="0" y1="48%" x2="100%" y2="48%" stroke="#1E3A5F" strokeWidth="3" strokeOpacity="0.3" />
                    <line x1="49%" y1="0" x2="49%" y2="100%" stroke="#1E3A5F" strokeWidth="3" strokeOpacity="0.3" />
                    
                    <line x1="15%" y1="20%" x2="85%" y2="80%" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.4" />
                    <line x1="20%" y1="80%" x2="80%" y2="20%" stroke="rgba(30,58,95,0.15)" strokeWidth="1.5" />
                    
                    {/* Concentric Neighborhood Radar Rings around Property */}
                    <circle cx="50%" cy="50%" r="90" fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="50%" cy="50%" r="180" fill="none" stroke="rgba(30, 58, 95, 0.12)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="270" fill="none" stroke="rgba(30, 58, 95, 0.06)" strokeWidth="1" />

                    {/* Animated Route Line from Property to Selected Facility */}
                    {selectedFacility && (
                      <line 
                        x1="50%" 
                        y1="50%" 
                        x2={`${selectedFacility.mapX}%`} 
                        y2={`${selectedFacility.mapY}%`} 
                        stroke="#1E3A5F" 
                        strokeWidth="3.5" 
                        strokeDasharray="6 6"
                        className="animate-pulse"
                      />
                    )}
                  </svg>
                  
                  {/* Road Labels */}
                  <span className="absolute top-[49%] left-6 text-[10px] font-mono tracking-wider text-[#4B5563] uppercase font-semibold">
                    Grand Boulevard
                  </span>
                  <span className="absolute top-10 left-[50%] text-[10px] font-mono tracking-wider text-[#4B5563] uppercase font-semibold -rotate-90">
                    Aura Avenue Corridor
                  </span>
                </div>
              )}

              {/* CENTER: PROPERTY PIN (GOLD & NAVY BEACON) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
                onClick={() => setSelectedFacility(null)}
              >
                {/* Pulsing Beacon Waves */}
                <div className="absolute w-14 h-14 -top-2 rounded-full bg-[#D4AF37]/25 animate-ping pointer-events-none" />
                <div className="absolute w-10 h-10 -top-0 rounded-full bg-[#1E3A5F]/20 animate-pulse pointer-events-none" />

                {/* Pin Card */}
                <div className="relative px-3.5 py-1.5 rounded-xl bg-[#1E3A5F] text-white font-bold text-xs shadow-2xl flex items-center gap-1.5 border border-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>{property.title}</span>
                </div>
                
                {/* Pointer Arrow */}
                <div className="w-3.5 h-3.5 bg-[#1E3A5F] rotate-45 -mt-1.5 shadow-md border-r border-b border-[#D4AF37]" />
              </div>

              {/* SURROUNDING FACILITY PINS */}
              {filteredFacilities.map(facility => {
                const isSelected = selectedFacility?.id === facility.id;

                return (
                  <div
                    key={facility.id}
                    onClick={() => setSelectedFacility(facility)}
                    style={{ left: `${facility.mapX}%`, top: `${facility.mapY}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-200 group ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    {/* Facility Pin Icon Circle */}
                    <div className={`p-2 rounded-xl border shadow-md flex items-center gap-1 transition-all ${
                      isSelected 
                        ? 'bg-[#1E3A5F] text-white border-[#D4AF37] shadow-lg' 
                        : 'bg-white text-[#1F2937] border-gray-200 hover:border-[#D4AF37]'
                    }`}>
                      {getCategoryIcon(facility.category)}
                      <span className={`text-[10px] font-bold px-1 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'text-[#996515]'
                      }`}>
                        {facility.distance}
                      </span>
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-40">
                      <div className="bg-[#1E3A5F] px-3 py-2 rounded-xl border border-[#D4AF37]/40 shadow-2xl text-center whitespace-nowrap min-w-[140px]">
                        <div className="text-[11px] font-bold text-white">{facility.name}</div>
                        <div className="text-[10px] text-gray-300 mt-0.5">
                          {facility.category} • {facility.driveTime}
                        </div>
                        <div className="text-[9px] text-[#D4AF37] font-semibold mt-1">
                          Click to calculate route
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-[#1E3A5F] rotate-45 -mt-1 border-r border-b border-[#D4AF37]/40" />
                    </div>
                  </div>
                );
              })}

            </div>
          )}

          {/* Map Compass & Quick Stats Watermark */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] text-[#1E3A5F] border border-gray-200 pointer-events-none flex items-center gap-2 shadow-sm font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{locData.lat.toFixed(4)}° N, {Math.abs(locData.lng).toFixed(4)}° W</span>
          </div>

          {/* Radius Legend */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] text-[#4B5563] border border-gray-200 pointer-events-none flex items-center gap-2 shadow-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>Radius: 500m – 15km</span>
          </div>

        </div>

      </div>

      {/* 3. NEARBY FACILITIES DIRECTORY & DISTANCE TABLE */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#1E3A5F] font-serif">
              Nearby Essential & Luxury Facilities
            </h3>
            <p className="text-xs text-[#4B5563] mt-0.5">
              Accurate proximity metrics to transit terminals, top-ranked schools, medical centers & lifestyle hubs.
            </p>
          </div>
          <span className="text-xs text-[#1E3A5F] font-mono font-bold bg-[#FAF8F5] px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
            {filteredFacilities.length} Facilities Listed
          </span>
        </div>

        {/* Responsive Table / Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredFacilities.map(facility => {
            const isSelected = selectedFacility?.id === facility.id;

            return (
              <div
                key={facility.id}
                onClick={() => setSelectedFacility(facility)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#FAF8F5] border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/30 scale-[1.01]'
                    : 'bg-white border-gray-200 hover:border-[#D4AF37]/60 hover:shadow-card shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl border ${getCategoryColor(facility.group)}`}>
                      {getCategoryIcon(facility.category)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1E3A5F] leading-tight">
                        {facility.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#4B5563]">
                        <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[#1F2937] font-medium">
                          {facility.category}
                        </span>
                        <span className="text-[#996515] font-semibold">★ {facility.rating}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#996515] font-bold text-xs whitespace-nowrap border border-[#D4AF37]/30">
                    {facility.distance}
                  </span>
                </div>

                <p className="text-[11px] text-[#4B5563] line-clamp-2 leading-relaxed">
                  {facility.description}
                </p>

                {/* Drive & Walk Proximity + Route Button */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-3 text-[#4B5563]">
                    <span className="flex items-center gap-1 text-[#1E3A5F] font-semibold">
                      <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {facility.driveTime}
                    </span>
                    <span className="flex items-center gap-1 text-[#4B5563]">
                      <Footprints className="w-3.5 h-3.5" />
                      {facility.walkTime}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFacility(facility);
                    }}
                    className="text-xs text-[#1E3A5F] hover:text-[#D4AF37] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>{isSelected ? 'Active Route' : 'Show Route'}</span>
                    <Navigation className="w-3 h-3 text-[#D4AF37]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. AREA INTELLIGENCE SCORE CARD */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF8F5] border border-gray-200 space-y-6 shadow-sm">
        
        {/* Header with Overall Rating */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-widest text-[#996515] font-bold">
                Area Intelligence & Livability Matrix
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] font-serif">
              Neighborhood Scorecard: {locData.areaIntelligence.ratingLabel}
            </h3>
            <p className="text-xs text-[#4B5563]">
              {locData.areaIntelligence.summary}
            </p>
          </div>

          {/* Big Overall Rating Pill */}
          <div className="shrink-0 flex items-center gap-3 bg-white p-3 px-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-right">
              <span className="text-[10px] text-[#4B5563] uppercase tracking-widest block font-medium">Overall Score</span>
              <span className="text-xs text-[#996515] font-semibold">{locData.areaIntelligence.rankPercentile}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-serif text-[#1E3A5F]">
              {locData.areaIntelligence.overall}
              <span className="text-base text-gray-400 font-sans font-normal">/10</span>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars: Education, Healthcare, Transport, Safety */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Education Score */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-[#1E3A5F]">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                Education Score
              </span>
              <span className="text-sm font-bold text-blue-600 font-mono">
                {locData.areaIntelligence.education}/10
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${locData.areaIntelligence.education * 10}%` }} 
              />
            </div>
            <p className="text-[11px] text-[#4B5563]">Top-tier preparatory academies & Tier-1 universities within 10 minutes.</p>
          </div>

          {/* Healthcare Score */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-[#1E3A5F]">
                <Hospital className="w-4 h-4 text-rose-600" />
                Healthcare Score
              </span>
              <span className="text-sm font-bold text-rose-600 font-mono">
                {locData.areaIntelligence.healthcare}/10
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div 
                className="h-full bg-rose-600 rounded-full" 
                style={{ width: `${locData.areaIntelligence.healthcare * 10}%` }} 
              />
            </div>
            <p className="text-[11px] text-[#4B5563]">Level-1 trauma hospitals & private emergency suites under 8 minutes.</p>
          </div>

          {/* Transport Score */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-[#1E3A5F]">
                <Train className="w-4 h-4 text-[#D4AF37]" />
                Transport Score
              </span>
              <span className="text-sm font-bold text-[#996515] font-mono">
                {locData.areaIntelligence.transport}/10
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div 
                className="h-full bg-[#D4AF37] rounded-full" 
                style={{ width: `${locData.areaIntelligence.transport * 10}%` }} 
              />
            </div>
            <p className="text-[11px] text-[#4B5563]">Direct arterial highway links, express bus lanes & transit terminals.</p>
          </div>

          {/* Safety Score */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-[#1E3A5F]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Safety Score
              </span>
              <span className="text-sm font-bold text-emerald-600 font-mono">
                {locData.areaIntelligence.safety}/10
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div 
                className="h-full bg-emerald-600 rounded-full" 
                style={{ width: `${locData.areaIntelligence.safety * 10}%` }} 
              />
            </div>
            <p className="text-[11px] text-[#4B5563]">24/7 dedicated neighborhood security patrols and rapid emergency response.</p>
          </div>

        </div>

      </div>

    </div>
  );
}
