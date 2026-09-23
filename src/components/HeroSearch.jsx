'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Search, Sparkles, TrendingUp, Building2 } from 'lucide-react';

export default function HeroSearch({ onOpenAIWizard }) {
  const router = useRouter();
  const [searchMode, setSearchMode] = useState('buy'); // 'buy' | 'rent' | 'sell'
  const [propertyType, setPropertyType] = useState('All');
  const [bedrooms, setBedrooms] = useState('Select');
  const [priceRange, setPriceRange] = useState('Select');

  // Sell Mode States
  const [sellCategory, setSellCategory] = useState('Luxury Villa');
  const [sellCity, setSellCity] = useState('Los Angeles');
  const [sellArea, setSellArea] = useState('6500');

  const handleAction = (e) => {
    e.preventDefault();

    if (searchMode === 'sell') {
      router.push(`/sell`);
      return;
    }

    const params = new URLSearchParams();
    if (searchMode === 'rent') {
      params.set('type', 'rent');
    } else {
      params.set('type', 'buy');
    }

    if (propertyType !== 'All') params.set('category', propertyType);
    if (bedrooms !== 'Select') params.set('beds', bedrooms);
    if (priceRange !== 'Select') {
      if (priceRange === 'under5m') params.set('maxPrice', '5000000');
      if (priceRange === '5to15m') {
        params.set('minPrice', '5000000');
        params.set('maxPrice', '15000000');
      }
      if (priceRange === 'over15m') params.set('minPrice', '15000000');
    }
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-2">
      
      {/* Top Mode Tabs: Buy, Rent, Sell */}
      <div className="flex items-center gap-1 pl-2">
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setSearchMode('buy')}
          className={`px-5 py-2 rounded-t-xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
            searchMode === 'buy'
              ? 'bg-white text-[#1E3A5F] shadow-sm border-t border-x border-[#D4AF37]/30'
              : 'bg-black/20 text-gray-700 hover:text-[#1E3A5F] backdrop-blur-md'
          }`}
        >
          Buy
        </button>

        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setSearchMode('rent')}
          className={`px-5 py-2 rounded-t-xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
            searchMode === 'rent'
              ? 'bg-white text-[#1E3A5F] shadow-sm border-t border-x border-[#D4AF37]/30'
              : 'bg-black/20 text-gray-700 hover:text-[#1E3A5F] backdrop-blur-md'
          }`}
        >
          Rent
        </button>

        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setSearchMode('sell')}
          className={`px-5 py-2 rounded-t-xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
            searchMode === 'sell'
              ? 'bg-[#1E3A5F] text-white shadow-sm border-t border-x border-[#D4AF37]'
              : 'bg-[#D4AF37]/30 text-[#8A5A00] hover:text-[#1E3A5F] backdrop-blur-md font-bold'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Sell Property</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-[#1E3A5F] text-[8px] font-black">
            AI VALUATION
          </span>
        </button>
      </div>

      {/* Main Bar */}
      <form 
        onSubmit={handleAction}
        className="w-full bg-white/95 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-2xl shadow-luxury overflow-hidden"
      >
        {searchMode !== 'sell' ? (
          
          /* BUY / RENT FORM */
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            
            {/* 1. TYPE */}
            <div className="px-6 py-4 flex flex-col justify-center relative group">
              <label className="text-[10px] font-bold text-[#1E3A5F] uppercase tracking-[0.25em] block mb-1">
                CATEGORY
              </label>
              <div className="relative flex items-center justify-between">
                <select
                  value={propertyType}
                  suppressHydrationWarning
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#1F2937] font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value="All" className="bg-white text-[#1F2937]">All Categories</option>
                  <option value="Empty Land" className="bg-white text-[#1F2937]">Empty Land & Plots</option>
                  <option value="Luxury Villa" className="bg-white text-[#1F2937]">Luxury Villa</option>
                  <option value="Penthouse" className="bg-white text-[#1F2937]">Penthouse</option>
                  <option value="Waterfront Estate" className="bg-white text-[#1F2937]">Waterfront Estate</option>
                  <option value="Modern Apartment" className="bg-white text-[#1F2937]">Apartment</option>
                  <option value="Commercial Office" className="bg-white text-[#1F2937]">Commercial</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] absolute right-0 pointer-events-none stroke-[2.5]" />
              </div>
            </div>

            {/* 2. BEDROOMS */}
            <div className="px-6 py-4 flex flex-col justify-center relative group">
              <label className="text-[10px] font-bold text-[#1E3A5F] uppercase tracking-[0.25em] block mb-1">
                BEDROOMS
              </label>
              <div className="relative flex items-center justify-between">
                <select
                  value={bedrooms}
                  suppressHydrationWarning
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#1F2937] font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value="Select" className="bg-white text-[#1F2937]">Select</option>
                  <option value="3" className="bg-white text-[#1F2937]">3 Bedrooms</option>
                  <option value="4" className="bg-white text-[#1F2937]">4 Bedrooms</option>
                  <option value="5" className="bg-white text-[#1F2937]">5+ Bedrooms</option>
                  <option value="6" className="bg-white text-[#1F2937]">6+ Ultra Estates</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] absolute right-0 pointer-events-none stroke-[2.5]" />
              </div>
            </div>

            {/* 3. PRICE */}
            <div className="px-6 py-4 flex flex-col justify-center relative group">
              <label className="text-[10px] font-bold text-[#1E3A5F] uppercase tracking-[0.25em] block mb-1">
                PRICE TIER
              </label>
              <div className="relative flex items-center justify-between">
                <select
                  value={priceRange}
                  suppressHydrationWarning
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#1F2937] font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value="Select" className="bg-white text-[#1F2937]">Select Range</option>
                  <option value="under5m" className="bg-white text-[#1F2937]">Under $5M / ₹4 Cr</option>
                  <option value="5to15m" className="bg-white text-[#1F2937]">$5M - $15M</option>
                  <option value="over15m" className="bg-white text-[#1F2937]">$15M+ Trophy Tier</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] absolute right-0 pointer-events-none stroke-[2.5]" />
              </div>
            </div>

            {/* 4. FIND PROPERTIES ACTION BUTTON */}
            <div className="p-3 sm:p-4 flex items-center justify-center">
              <button
                type="submit"
                suppressHydrationWarning
                className="w-full h-12 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] border border-[#D4AF37]/30 text-white text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{searchMode === 'rent' ? 'FIND RENTALS' : 'FIND PROPERTIES'}</span>
                <Search className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
              </button>
            </div>

          </div>
        ) : (
          
          /* SELL MODE FORM */
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-[#FAF8F5]/80">
            
            {/* 1. SELLING CATEGORY */}
            <div className="px-6 py-4 flex flex-col justify-center relative group">
              <label className="text-[10px] font-bold text-[#8A5A00] uppercase tracking-[0.25em] block mb-1">
                PROPERTY TO SELL
              </label>
              <div className="relative flex items-center justify-between">
                <select
                  value={sellCategory}
                  suppressHydrationWarning
                  onChange={(e) => setSellCategory(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#1F2937] font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value="Luxury Villa" className="bg-white text-[#1F2937]">Luxury Villa</option>
                  <option value="Empty Land" className="bg-white text-[#1F2937]">Empty Land & Plots</option>
                  <option value="Duplex Penthouse" className="bg-white text-[#1F2937]">Duplex Penthouse</option>
                  <option value="Waterfront Estate" className="bg-white text-[#1F2937]">Waterfront Estate</option>
                  <option value="Modern Apartment" className="bg-white text-[#1F2937]">Apartment</option>
                  <option value="Commercial Space" className="bg-white text-[#1F2937]">Commercial Property</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] absolute right-0 pointer-events-none stroke-[2.5]" />
              </div>
            </div>

            {/* 2. LOCATION */}
            <div className="px-6 py-4 flex flex-col justify-center relative group">
              <label className="text-[10px] font-bold text-[#8A5A00] uppercase tracking-[0.25em] block mb-1">
                LOCATION / METRO
              </label>
              <div className="relative flex items-center justify-between">
                <select
                  value={sellCity}
                  suppressHydrationWarning
                  onChange={(e) => setSellCity(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#1F2937] font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value="Los Angeles" className="bg-white text-[#1F2937]">Los Angeles / Bel-Air</option>
                  <option value="New York" className="bg-white text-[#1F2937]">New York / Manhattan</option>
                  <option value="Miami" className="bg-white text-[#1F2937]">Miami / Biscayne Bay</option>
                  <option value="Mumbai" className="bg-white text-[#1F2937]">Mumbai / Worli & Bandra</option>
                  <option value="Bengaluru" className="bg-white text-[#1F2937]">Bengaluru / Indiranagar</option>
                  <option value="Delhi" className="bg-white text-[#1F2937]">New Delhi / Lutyens NCR</option>
                  <option value="Chennai" className="bg-white text-[#1F2937]">Chennai / ECR & Tambaram</option>
                  <option value="Hyderabad" className="bg-white text-[#1F2937]">Hyderabad / Jubilee Hills</option>
                  <option value="Goa" className="bg-white text-[#1F2937]">Goa / Beachfront</option>
                  <option value="San Francisco" className="bg-white text-[#1F2937]">Silicon Valley</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] absolute right-0 pointer-events-none stroke-[2.5]" />
              </div>
            </div>

            {/* 3. BUILT-UP / PLOT AREA */}
            <div className="px-6 py-4 flex flex-col justify-center relative group">
              <label className="text-[10px] font-bold text-[#8A5A00] uppercase tracking-[0.25em] block mb-1">
                BUILT-UP / PLOT SQ FT
              </label>
              <div className="relative flex items-center justify-between">
                <input
                  type="text"
                  suppressHydrationWarning
                  value={sellArea}
                  onChange={(e) => setSellArea(e.target.value)}
                  placeholder="e.g. 6,500 sq.ft"
                  className="w-full bg-transparent text-sm text-[#1F2937] font-semibold focus:outline-none"
                />
                <span className="text-xs text-gray-400 font-bold">ft²</span>
              </div>
            </div>

            {/* 4. SELLER ACTION BUTTON */}
            <div className="p-3 sm:p-4 flex items-center justify-center">
              <button
                type="submit"
                suppressHydrationWarning
                className="w-full h-12 rounded-xl bg-[#8A5A00] hover:bg-[#724a00] border border-[#D4AF37] text-white text-xs font-black tracking-[0.18em] uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>AI VALUATION & SELL</span>
                <Sparkles className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform" />
              </button>
            </div>

          </div>
        )}
      </form>
    </div>
  );
}
