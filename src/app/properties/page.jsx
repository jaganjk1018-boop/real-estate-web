'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  X, 
  RotateCcw, 
  Sparkles, 
  Home, 
  Building2,
  BedDouble,
  DollarSign,
  Heart,
  MapPin
} from 'lucide-react';
import PropertyCard from '../../components/PropertyCard';
import VirtualTourModal from '../../components/VirtualTourModal';
import ScheduleVisitModal from '../../components/ScheduleVisitModal';
import PropertyMapExplorer from '../../components/PropertyMapExplorer';
import { useRealEstateStore } from '../../lib/store';
import { formatPrice, formatLocalizedPrice, formatLocalizedArea } from '../../lib/utils';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { properties, favorites, currency, unit } = useRealEstateStore();

  // Initial params
  const initialType = searchParams.get('type') || 'all';
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || '';
  const initialMinPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const initialMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 30000000;
  const initialBeds = searchParams.get('beds') || 'all';

  // Local Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [bedrooms, setBedrooms] = useState(initialBeds);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' or 'list'
  const [onlyFavorites, setOnlyFavorites] = useState(initialFilter === 'favorites');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Modals
  const [tourProperty, setTourProperty] = useState(null);
  const [visitProperty, setVisitProperty] = useState(null);

  const allAmenities = [
    'Infinity Edge Pool',
    'Private Spa & Sauna',
    'Wine Tasting Cellar',
    'Smart Home Automation',
    'Tesla EV Charging Ports',
    'Deep-water Private Dock',
    'Central Park Views',
    '24/7 White Glove Doorman',
    'Net-Zero Solar & Tesla Powerwalls'
  ];

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setMinPrice(0);
    setMaxPrice(30000000);
    setBedrooms('all');
    setSelectedAmenities([]);
    setSortBy('featured');
    setOnlyFavorites(false);
  };

  // Filtered & Sorted Properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Favorites filter
      if (onlyFavorites && !favorites.includes(prop.id)) return false;

      // Type filter (buy, rent, commercial, residential, land)
      if (selectedType !== 'all') {
        if (selectedType === 'land') {
          if (!prop.isLand && prop.category !== 'Empty Land') return false;
        } else if (prop.type !== selectedType) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && prop.category !== selectedCategory) return false;

      // Price filter
      if (prop.price < minPrice || prop.price > maxPrice) return false;

      // Bedrooms filter
      if (bedrooms !== 'all') {
        const bedNum = Number(bedrooms);
        if (prop.bedrooms < bedNum) return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every((a) =>
          prop.amenities.some((pa) => pa.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAll) return false;
      }

      // Search Query filter (matches title, city, neighborhood, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesCity = prop.address.city.toLowerCase().includes(q);
        const matchesNeighborhood = prop.address.neighborhood.toLowerCase().includes(q);
        const matchesCategory = prop.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCity && !matchesNeighborhood && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      // default 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    properties,
    favorites,
    onlyFavorites,
    selectedType,
    selectedCategory,
    minPrice,
    maxPrice,
    bedrooms,
    selectedAmenities,
    searchQuery,
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#1F2937]">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-[#1E3A5F] text-[10px] font-bold uppercase tracking-widest border border-[#D4AF37]/40 shadow-sm">
              Premier Catalog
            </span>
            {onlyFavorites && (
              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-widest border border-rose-200 flex items-center gap-1 shadow-sm">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                Saved Wishlist
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1E3A5F] font-serif">
            Architectural Properties & Estates
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            Browse our verified inventory of luxury villas, penthouses, empty land plots, and commercial spaces.
          </p>
        </div>

        {/* Top Type Switcher */}
        <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-gray-200 overflow-x-auto shadow-sm">
          {[
            { id: 'all', label: 'All' },
            { id: 'buy', label: 'Buy' },
            { id: 'land', label: 'Empty Land & Plots' },
            { id: 'rent', label: 'Rent' },
            { id: 'commercial', label: 'Commercial' },
            { id: 'residential', label: 'Residential' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedType === type.id
                  ? 'bg-[#1E3A5F] text-white font-bold shadow-md shadow-[#1E3A5F]/20'
                  : 'text-[#4B5563] hover:text-[#1E3A5F] hover:bg-gray-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Seller Callout Banner */}
      <div className="bg-gradient-to-r from-[#FAF8F5] via-amber-50/50 to-[#FAF8F5] border border-[#D4AF37]/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1E3A5F]">
              Have a Luxury Villa, Penthouse, or Land Plot to Sell?
            </h3>
            <p className="text-[11px] text-[#4B5563]">
              Get an instant AI valuation, 0% upfront fees, and direct access to 12,000+ verified global buyers.
            </p>
          </div>
        </div>

        <Link
          href="/sell"
          className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0 border border-[#D4AF37]/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>List for Sale & AI Valuation</span>
        </Link>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-card">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, title, or enclave..."
            className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Tools: Filter Drawer Toggle, Sort, Layout */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Filter Drawer Toggle */}
          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isFilterDrawerOpen || selectedAmenities.length > 0 || bedrooms !== 'all' || minPrice > 0
                ? 'bg-amber-50 text-[#1E3A5F] border-[#D4AF37] font-bold shadow-sm'
                : 'bg-[#FAF8F5] text-[#1E3A5F] border-gray-200 hover:bg-gray-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Filters</span>
            {(selectedAmenities.length > 0 || bedrooms !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            )}
          </button>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF8F5] border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#1F2937] font-medium focus:outline-none focus:border-[#D4AF37] appearance-none pr-8 cursor-pointer shadow-sm"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Listed</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</span>
          </div>

          {/* Grid / List / Radar Map / Split Layout Switcher */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-gray-200 shadow-sm">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 px-2 rounded-lg text-xs flex items-center gap-1 transition-all ${
                layoutMode === 'grid' ? 'bg-[#1E3A5F] text-white font-bold shadow-sm' : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
              title="Grid Catalog"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Grid</span>
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={`p-1.5 px-2 rounded-lg text-xs flex items-center gap-1 transition-all ${
                layoutMode === 'list' ? 'bg-[#1E3A5F] text-white font-bold shadow-sm' : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
              title="List Catalog"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden md:inline">List</span>
            </button>
            <button
              onClick={() => setLayoutMode('map')}
              className={`p-1.5 px-2.5 rounded-lg text-xs flex items-center gap-1 transition-all ${
                layoutMode === 'map' ? 'bg-[#1E3A5F] text-white font-bold shadow-sm' : 'text-[#1E3A5F] hover:text-[#D4AF37]'
              }`}
              title="Interactive Radar Map"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Map View</span>
            </button>
            <button
              onClick={() => setLayoutMode('split')}
              className={`p-1.5 px-2 rounded-lg text-xs flex items-center gap-1 transition-all ${
                layoutMode === 'split' ? 'bg-[#1E3A5F] text-white font-bold shadow-sm' : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
              title="Split Screen Map & Grid"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden md:inline">Split</span>
            </button>
          </div>

        </div>

      </div>

      {/* Expandable Granular Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="bg-white p-6 rounded-3xl border border-[#D4AF37]/30 shadow-card space-y-6 animate-in slide-in-from-top-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              Granular Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-[#1E3A5F] hover:text-[#D4AF37] font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Category Dropdown */}
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1.5">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Categories</option>
                <option value="Empty Land">Empty Land & Plots</option>
                <option value="Luxury Villa">Luxury Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Modern Apartment">Modern Apartment</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Waterfront Estate">Waterfront Estate</option>
                <option value="Commercial Office">Commercial Office</option>
                <option value="Retail Plaza">Retail Plaza</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1.5">
                Min Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">Any Bedroom Count</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
                <option value="6">6+ Bedrooms</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="lg:col-span-2 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 font-semibold">Max Price Threshold:</span>
                <span className="text-[#1E3A5F] font-serif font-bold">{formatPrice(maxPrice, currency)}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={30000000}
                step={50000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A5F]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>$20K</span>
                <span>$15M</span>
                <span>$30M+</span>
              </div>
            </div>

          </div>

          {/* Amenities Multi-Checklist */}
          <div>
            <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-2">
              Must-Have Luxury Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {allAmenities.map((amenity) => {
                const active = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] font-bold shadow-sm'
                        : 'bg-[#FAF8F5] text-[#1F2937] border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Results Header Counter */}
      <div className="flex items-center justify-between text-xs text-[#4B5563] px-1">
        <span>
          Showing <strong className="text-[#1E3A5F] font-bold">{filteredProperties.length}</strong> of {properties.length} Estates
        </span>
        {(searchQuery || selectedType !== 'all' || selectedCategory !== 'all' || selectedAmenities.length > 0) && (
          <button
            onClick={resetFilters}
            className="text-[#1E3A5F] font-semibold hover:underline"
          >
            Clear active filters
          </button>
        )}
      </div>

      {/* Properties Display */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl text-center space-y-4 border border-gray-200 shadow-card">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#1E3A5F] font-serif">No Matching Properties Found</h3>
          <p className="text-xs text-[#4B5563] max-w-md mx-auto">
            We couldn&apos;t find any properties matching your current filter criteria. Try adjusting your price bracket, category, or search term.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs inline-block transition-all shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      ) : layoutMode === 'map' ? (
        <div className="space-y-4 animate-in fade-in">
          <PropertyMapExplorer
            properties={filteredProperties}
            onOpenTour={(p) => setTourProperty(p)}
            onScheduleVisit={(p) => setVisitProperty(p)}
          />
        </div>
      ) : layoutMode === 'split' ? (
        <div className="space-y-8 animate-in fade-in">
          <PropertyMapExplorer
            properties={filteredProperties}
            onOpenTour={(p) => setTourProperty(p)}
            onScheduleVisit={(p) => setVisitProperty(p)}
          />
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-widest mb-4">
              Catalog Portfolio ({filteredProperties.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onOpenTour={(p) => setTourProperty(p)}
                  onScheduleVisit={(p) => setVisitProperty(p)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onOpenTour={(p) => setTourProperty(p)}
              onScheduleVisit={(p) => setVisitProperty(p)}
            />
          ))}
        </div>
      ) : (
        /* List Mode View */
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white p-4 sm:p-5 rounded-3xl flex flex-col md:flex-row gap-6 items-center justify-between border border-gray-200 hover:border-[#D4AF37] shadow-card transition-all"
            >
              <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full sm:w-48 h-36 rounded-2xl object-cover border border-gray-200"
                />
                <div className="space-y-1 text-left w-full sm:w-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                    {property.status} • {property.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#1F2937] font-serif">{property.title}</h3>
                  <p className="text-base font-bold text-[#1E3A5F] font-serif">
                    {formatLocalizedPrice(property.price, currency, property.priceSuffix, property.currency)}
                  </p>
                  <p className="text-xs text-[#4B5563] line-clamp-1 max-w-md">
                    {property.tagline}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#1F2937] pt-1">
                    <span>{property.bedrooms} Beds</span>
                    <span>•</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>•</span>
                    <span>{formatLocalizedArea(property.areaSqFt, unit)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                {property.virtualTourRooms && property.virtualTourRooms.length > 0 && (
                  <button
                    onClick={() => setTourProperty(property)}
                    className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-gray-100 text-[#1E3A5F] text-xs font-semibold border border-gray-200"
                  >
                    3D Tour
                  </button>
                )}
                <button
                  onClick={() => setVisitProperty(property)}
                  className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#1E3A5F] text-[#1E3A5F] hover:text-white border border-[#1E3A5F]/20 text-xs font-semibold transition-all"
                >
                  VIP Visit
                </button>
                <a
                  href={`/properties/${property.id}`}
                  className="px-5 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs shadow-sm"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <VirtualTourModal
        property={tourProperty}
        isOpen={!!tourProperty}
        onClose={() => setTourProperty(null)}
        onScheduleVisit={(p) => {
          setTourProperty(null);
          setVisitProperty(p);
        }}
      />

      <ScheduleVisitModal
        property={visitProperty}
        isOpen={!!visitProperty}
        onClose={() => setVisitProperty(null)}
      />

    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading properties catalog...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
