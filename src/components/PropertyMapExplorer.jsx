'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Sparkles, 
  Eye, 
  Calendar, 
  Layers, 
  Plane, 
  UtensilsCrossed, 
  Anchor, 
  Compass, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Navigation,
  Satellite,
  Map as MapIcon,
  Mountain,
  Globe,
  ExternalLink,
  BedDouble,
  Bath,
  Train
} from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import { formatLocalizedPrice, formatLocalizedArea } from '../lib/utils';
import { getPropertyLocationData } from '../data/locationFacilities';

// Regional presets with center coordinates & bounds
const REGIONS = [
  { id: 'all', name: 'All Global Markets', center: '34.0837,-118.4447', zoom: 12 },
  { id: 'india', name: '🇮🇳 All India (Trophy Estates)', center: '19.0760,72.8777', zoom: 11 },
  { id: 'maharashtra', name: '🏙️ Mumbai (Worli Penthouse)', center: '19.0178,72.8173', zoom: 15 },
  { id: 'karnataka', name: '🌿 Bengaluru (Indiranagar Villa)', center: '12.9784,77.6408', zoom: 15 },
  { id: 'delhi', name: '🏛️ Delhi NCR (Lutyens Mansion)', center: '28.6015,77.2185', zoom: 15 },
  { id: 'tamilnadu', name: '🌊 Tamil Nadu (Chennai ECR & Plots)', center: '12.9150,80.2520', zoom: 15 },
  { id: 'telangana', name: '💎 Hyderabad (Jubilee Hills)', center: '17.4319,78.4073', zoom: 15 },
  { id: 'goa', name: '🏖️ Goa (Candolim Beach)', center: '15.5186,73.7667', zoom: 15 },
  { id: 'kerala', name: '🌴 Kerala (Vembanad Backwaters)', center: '9.6175,76.4278', zoom: 15 },
  { id: 'rajasthan', name: '👑 Rajasthan (Udaipur Royal Haveli)', center: '24.5764,73.6835', zoom: 15 },
  { id: 'gujarat', name: '⚡ Gujarat (GIFT City Penthouse)', center: '23.1610,72.6840', zoom: 15 },
  { id: 'california', name: '🌴 California (Bel-Air & SF)', center: '34.0837,-118.4447', zoom: 14 },
  { id: 'newyork', name: '🗽 New York (Manhattan)', center: '40.7615,-73.9718', zoom: 15 },
  { id: 'florida', name: '🏖️ Florida (Miami Beach)', center: '25.7906,-80.1300', zoom: 14 },
  { id: 'colorado', name: '🏔️ Colorado (Aspen Chalets)', center: '39.1911,-106.8175', zoom: 14 }
];

const MAP_MODES = [
  { id: 'h', label: 'Hybrid', icon: Layers },
  { id: 'k', label: 'Satellite', icon: Satellite },
  { id: 'm', label: 'Streets', icon: MapIcon },
  { id: 'p', label: 'Terrain', icon: Mountain }
];

export default function PropertyMapExplorer({ 
  properties, 
  onOpenTour, 
  onScheduleVisit,
  activePropertyId = null,
  onSelectProperty = null
}) {
  const { currency, unit, platformSettings } = useRealEstateStore();
  const mapplsApiKey = platformSettings?.map?.mapplsApiKey || process.env.NEXT_PUBLIC_MAPPLS_API_KEY || '2fce9761ffdc4509a89e6b83b27c49db';
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activePropId, setActivePropId] = useState(activePropertyId || properties[0]?.id);
  const [mapMode, setMapMode] = useState('h');
  const [mapProvider, setMapProvider] = useState('google'); // 'google' | 'mappls' | 'osm'
  const [zoomLevel, setZoomLevel] = useState(15);
  const [isLoadingMap, setIsLoadingMap] = useState(false);

  // Region filtering
  const filteredProperties = useMemo(() => {
    if (selectedRegion === 'all') return properties;
    if (selectedRegion === 'india') {
      return properties.filter(p => p.address?.country?.toLowerCase() === 'india' || p.isLand);
    }
    if (selectedRegion === 'maharashtra') {
      return properties.filter(p => p.address?.state?.toLowerCase().includes('maharashtra') || p.address?.city?.toLowerCase().includes('mumbai'));
    }
    if (selectedRegion === 'karnataka') {
      return properties.filter(p => p.address?.state?.toLowerCase().includes('karnataka') || p.address?.city?.toLowerCase().includes('bengaluru') || p.address?.city?.toLowerCase().includes('bangalore'));
    }
    if (selectedRegion === 'delhi') {
      return properties.filter(p => p.address?.state?.toLowerCase().includes('delhi') || p.address?.city?.toLowerCase().includes('delhi'));
    }
    if (selectedRegion === 'tamilnadu' || selectedRegion === 'chennai') {
      return properties.filter(p => p.address?.state?.toLowerCase().includes('tamil nadu') || p.address?.city?.toLowerCase().includes('chennai') || p.isLand);
    }
    if (selectedRegion === 'telangana') {
      return properties.filter(p => p.address?.state?.toLowerCase().includes('telangana') || p.address?.city?.toLowerCase().includes('hyderabad'));
    }
    if (selectedRegion === 'goa') {
      return properties.filter(p => p.address?.state?.toLowerCase().includes('goa') || p.address?.city?.toLowerCase().includes('candolim'));
    }
    if (selectedRegion === 'kerala') {
      return properties.filter(p => p.address?.state?.toLowerCase().includes('kerala') || p.address?.city?.toLowerCase().includes('kochi'));
    }
    if (selectedRegion === 'rajasthan') {
      return properties.filter(p => p.address?.state?.toLowerCase().includes('rajasthan') || p.address?.city?.toLowerCase().includes('udaipur'));
    }
    if (selectedRegion === 'gujarat') {
      return properties.filter(p => p.address?.state?.toLowerCase().includes('gujarat') || p.address?.city?.toLowerCase().includes('ahmedabad'));
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

  const activeProperty = useMemo(() => {
    return properties.find(p => p.id === activePropId) || filteredProperties[0] || properties[0];
  }, [properties, filteredProperties, activePropId]);

  const activeLocData = useMemo(() => {
    if (!activeProperty) return null;
    return getPropertyLocationData(activeProperty);
  }, [activeProperty]);

  // Coordinates extraction
  const coords = useMemo(() => {
    if (activeProperty?.address?.lat && activeProperty?.address?.lng) {
      return {
        lat: activeProperty.address.lat,
        lng: activeProperty.address.lng,
        query: `${activeProperty.address.lat},${activeProperty.address.lng}`
      };
    }
    if (activeProperty?.address) {
      const q = encodeURIComponent(`${activeProperty.address.street}, ${activeProperty.address.city}, ${activeProperty.address.state}`);
      return { lat: 34.0837, lng: -118.4447, query: q };
    }
    return { lat: 34.0837, lng: -118.4447, query: 'Los Angeles, CA' };
  }, [activeProperty]);

  // Real Map Embed URL (Google Maps, Mappls, or OpenStreetMap)
  const mapEmbedUrl = useMemo(() => {
    if (mapProvider === 'osm') {
      const latDelta = 0.012;
      const lngDelta = 0.016;
      const bbox = `${coords.lng - lngDelta}%2C${coords.lat - latDelta}%2C${coords.lng + lngDelta}%2C${coords.lat + latDelta}`;
      return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`;
    }
    if (mapProvider === 'mappls') {
      return `https://maps.mappls.com/?@${coords.lat},${coords.lng},${zoomLevel}z`;
    }
    return `https://maps.google.com/maps?q=${coords.query}&t=${mapMode}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;
  }, [mapProvider, coords, mapMode, zoomLevel]);

  // Direct turn-by-turn GPS URL (Mappls or Google Maps)
  const directGpsUrl = useMemo(() => {
    if (mapProvider === 'mappls' && activeProperty?.address?.lat && activeProperty?.address?.lng) {
      return `https://maps.mappls.com/?@${activeProperty.address.lat},${activeProperty.address.lng},17z`;
    }
    if (activeProperty?.address?.lat && activeProperty?.address?.lng) {
      return `https://www.google.com/maps/search/?api=1&query=${activeProperty.address.lat},${activeProperty.address.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activeProperty?.address?.street}, ${activeProperty?.address?.city}`)}`;
  }, [activeProperty, mapProvider]);

  const handleSelectProperty = (prop) => {
    setActivePropId(prop.id);
    onSelectProperty?.(prop);
  };

  const handleRegionChange = (reg) => {
    setSelectedRegion(reg.id);
    const isIndianTab = ['india', 'maharashtra', 'karnataka', 'delhi', 'tamilnadu', 'telangana', 'goa', 'kerala', 'rajasthan', 'gujarat', 'chennai'].includes(reg.id);
    if (isIndianTab) {
      setMapProvider('mappls');
    }
    const match = properties.find(p => {
      if (reg.id === 'all') return true;
      if (reg.id === 'india') return p.address?.country?.toLowerCase() === 'india' || p.isLand;
      if (reg.id === 'maharashtra') return p.address?.state?.toLowerCase().includes('maharashtra') || p.address?.city?.toLowerCase().includes('mumbai');
      if (reg.id === 'karnataka') return p.address?.state?.toLowerCase().includes('karnataka') || p.address?.city?.toLowerCase().includes('bengaluru') || p.address?.city?.toLowerCase().includes('bangalore');
      if (reg.id === 'delhi') return p.address?.state?.toLowerCase().includes('delhi') || p.address?.city?.toLowerCase().includes('delhi');
      if (reg.id === 'tamilnadu' || reg.id === 'chennai') return p.address?.state?.toLowerCase().includes('tamil nadu') || p.address?.city?.toLowerCase().includes('chennai') || p.isLand;
      if (reg.id === 'telangana') return p.address?.state?.toLowerCase().includes('telangana') || p.address?.city?.toLowerCase().includes('hyderabad');
      if (reg.id === 'goa') return p.address?.state?.toLowerCase().includes('goa') || p.address?.city?.toLowerCase().includes('candolim');
      if (reg.id === 'kerala') return p.address?.state?.toLowerCase().includes('kerala') || p.address?.city?.toLowerCase().includes('kochi');
      if (reg.id === 'rajasthan') return p.address?.state?.toLowerCase().includes('rajasthan') || p.address?.city?.toLowerCase().includes('udaipur');
      if (reg.id === 'gujarat') return p.address?.state?.toLowerCase().includes('gujarat') || p.address?.city?.toLowerCase().includes('ahmedabad');
      if (reg.id === 'california') return p.address?.city?.toLowerCase().includes('los angeles') || p.address?.city?.toLowerCase().includes('beverly') || p.address?.city?.toLowerCase().includes('san francisco');
      if (reg.id === 'newyork') return p.address?.city?.toLowerCase().includes('new york');
      if (reg.id === 'florida') return p.address?.city?.toLowerCase().includes('miami');
      if (reg.id === 'colorado') return p.address?.city?.toLowerCase().includes('aspen');
      return true;
    });
    if (match) {
      setActivePropId(match.id);
      onSelectProperty?.(match);
    }
  };

  const resetView = () => {
    setSelectedRegion('all');
    setZoomLevel(15);
    if (properties[0]) {
      setActivePropId(properties[0].id);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-gray-200 bg-[#0F1E31] shadow-2xl flex flex-col xl:flex-row h-[740px]">
      
      {/* LEFT: Live Real Map Canvas Area */}
      <div className="relative flex-1 h-full overflow-hidden bg-[#0a121e] flex flex-col">
        
        {/* TOP CONTROLS TOOLBAR */}
        <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          
          {/* Region Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl pointer-events-auto overflow-x-auto max-w-full scrollbar-none">
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => handleRegionChange(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'bg-[#1E3A5F] text-white font-bold shadow-sm'
                    : 'text-gray-700 hover:text-[#1E3A5F] hover:bg-gray-100'
                }`}
              >
                {reg.name}
              </button>
            ))}
          </div>

          {/* Map Controls: Provider & Layer Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl pointer-events-auto">
            
            {/* Map Mode Buttons (Satellite / Streets / Hybrid / Terrain) */}
            {mapProvider === 'google' && MAP_MODES.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setMapMode(mode.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    mapMode === mode.id
                      ? 'bg-[#1E3A5F] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-[#1E3A5F]'
                  }`}
                  title={`${mode.label} Mode`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              );
            })}

            {/* Provider Switch (Google vs Mappls vs OSM) */}
            <div className="flex items-center gap-1 border-l border-gray-200 pl-1 ml-0.5">
              <button
                onClick={() => setMapProvider('google')}
                className={`px-2 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mapProvider === 'google'
                    ? 'bg-[#1E3A5F] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-[#1E3A5F]'
                }`}
                title="Google Maps"
              >
                Google
              </button>
              <button
                onClick={() => setMapProvider('mappls')}
                className={`px-2 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mapProvider === 'mappls'
                    ? 'bg-[#8A5A00] text-white shadow-xs font-black'
                    : 'text-gray-600 hover:bg-amber-50 hover:text-[#8A5A00]'
                }`}
                title="Mappls (MapmyIndia) Precision GPS & Cadastre Network"
              >
                Mappls
              </button>
              <button
                onClick={() => setMapProvider('osm')}
                className={`px-2 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mapProvider === 'osm'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
                title="OpenStreetMap Standard"
              >
                OSM
              </button>
            </div>

            <div className="h-4 w-px bg-gray-200 mx-0.5 hidden sm:block" />

            {/* Turn-by-Turn GPS Direct Link */}
            <a
              href={directGpsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-xl text-xs font-bold text-[#8A5A00] hover:bg-amber-50 flex items-center gap-1 transition-colors"
              title={`Open direct live GPS in ${mapProvider === 'mappls' ? 'Mappls' : 'Google Maps'}`}
            >
              <span>{mapProvider === 'mappls' ? 'Mappls GPS' : 'GPS'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* REAL INTERACTIVE MAP IFRAME CONTAINER */}
        <div className="relative flex-1 w-full h-full bg-[#0a121e] overflow-hidden">
          
          <iframe
            key={`${mapProvider}-${activeProperty?.id}-${mapMode}-${zoomLevel}`}
            src={mapEmbedUrl}
            title="JK Realty Interactive Live Property Map"
            className="w-full h-full border-0 filter contrast-105"
            loading="lazy"
            allowFullScreen
          />

          {/* Floating Zoom & Reset Controls */}
          <div className="absolute right-3 bottom-24 sm:bottom-28 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-gray-200 shadow-xl pointer-events-auto">
            <button
              onClick={() => setZoomLevel(z => Math.min(19, z + 1))}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#1E3A5F] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(z => Math.max(10, z - 1))}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#1E3A5F] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#1E3A5F] transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Active Property Coordinates Badge */}
          <div className="absolute top-16 left-3 z-20 pointer-events-none hidden sm:block">
            <div className="px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-[11px] text-white flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-gray-300">
                GPS: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
              </span>
              <span className="text-[#D4AF37] font-bold">
                • {activeProperty?.address?.city}
              </span>
            </div>
          </div>

        </div>

        {/* BOTTOM QUICK PROPERTY CAROUSEL STRIP */}
        <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pointer-events-auto scrollbar-none py-1">
            {filteredProperties.map((prop) => {
              const isSelected = activeProperty?.id === prop.id;
              return (
                <button
                  key={prop.id}
                  onClick={() => handleSelectProperty(prop)}
                  className={`p-2 rounded-2xl flex items-center gap-2.5 shrink-0 border transition-all cursor-pointer backdrop-blur-md shadow-xl text-left ${
                    isSelected
                      ? 'bg-[#1E3A5F] text-white border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-102'
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
                        {prop.address?.city}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* RIGHT: Active Property Interactive Dossier Panel */}
      <div className="w-full xl:w-96 h-auto xl:h-full bg-[#070b13] border-t xl:border-t-0 xl:border-l border-white/10 p-5 flex flex-col justify-between overflow-y-auto z-20">
        {activeProperty ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                {activeProperty.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 truncate max-w-[180px]">
                <Navigation className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span className="truncate">{activeProperty.address?.neighborhood || activeProperty.address?.city}</span>
              </span>
            </div>

            {/* Photo Preview Carousel */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group/img border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProperty.images[0]}
                alt={activeProperty.title}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div className="text-lg font-black font-serif text-[#D4AF37]">
                  {formatLocalizedPrice(activeProperty.price, currency, activeProperty.priceSuffix, activeProperty.currency)}
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  {formatLocalizedArea(activeProperty.areaSqFt, unit)}
                </div>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="text-lg font-bold text-white font-serif leading-snug">
                {activeProperty.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {activeProperty.tagline}
              </p>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 text-center">
              {activeProperty.isLand ? (
                <>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Type</span>
                    <span className="text-xs font-bold text-white">Villa Plot</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Extent</span>
                    <span className="text-xs font-bold text-white">5.51 Cents</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Zoning</span>
                    <span className="text-xs font-bold text-white">CMDA Patta</span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Bedrooms</span>
                    <span className="text-sm font-bold text-white">{activeProperty.bedrooms} Suites</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Bathrooms</span>
                    <span className="text-sm font-bold text-white">{activeProperty.bathrooms} Baths</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Year</span>
                    <span className="text-sm font-bold text-white">{activeProperty.yearBuilt}</span>
                  </div>
                </>
              )}
            </div>

            {/* Proximity Transit Infrastructure */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                Transit &amp; Neighborhood Proximity
              </span>
              <div className="space-y-1 text-xs text-slate-300 max-h-32 overflow-y-auto pr-1">
                {activeProperty.nearby && activeProperty.nearby.length > 0 ? (
                  activeProperty.nearby.slice(0, 3).map((nb, i) => (
                    <div key={i} className="flex items-center justify-between py-1 px-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="flex items-center gap-1.5 text-slate-300 truncate">
                        <Train className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{nb.name}</span>
                      </span>
                      <span className="font-mono text-emerald-400 font-bold shrink-0 text-[11px] pl-2">
                        {nb.distance}
                      </span>
                    </div>
                  ))
                ) : (
                  activeLocData?.amenities?.slice(0, 3).map((a, i) => (
                    <div key={i} className="flex items-center justify-between py-1 px-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-slate-300 truncate">{a.name}</span>
                      <span className="font-mono text-emerald-400 font-bold shrink-0 text-[11px]">
                        {a.distance}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenTour?.(activeProperty)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>360° Tour</span>
                </button>
                <button
                  onClick={() => onScheduleVisit?.(activeProperty)}
                  className="py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#b89422] text-[#1E3A5F] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>VIP Tour</span>
                </button>
              </div>

              <a
                href={directGpsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Turn-by-Turn GPS Directions</span>
              </a>

              <Link
                href={`/properties/${activeProperty.id}`}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all border border-white/10"
              >
                <span>View Full Architectural Portfolio</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <h4 className="text-sm font-bold text-white font-serif">Explore Trophy Markets</h4>
            <p className="text-xs text-slate-400">
              Select any property from the quick carousel to view GPS coordinates, proximity radar, and launch 360° tours.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
