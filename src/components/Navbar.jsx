'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Heart, 
  Layers, 
  Sparkles, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  FolderLock,
  TrendingUp,
  Calculator,
  Eye,
  Tag,
  BookOpen,
  Briefcase,
  PhoneCall,
  ChevronRight,
  Home,
  DollarSign,
  Flame
} from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import { CURRENCY_SYMBOLS } from '../lib/utils';

export default function Navbar({ 
  onOpenAIWizard, 
  onOpenCompare, 
  onOpenAuth, 
  onOpenVault, 
  onOpenVIPBooking 
}) {
  const pathname = usePathname();
  
  // Dropdown states
  const [intelDropdownOpen, setIntelDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [clientMenuOpen, setClientMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // References for outside click dismissal
  const intelRef = useRef(null);
  const aboutRef = useRef(null);
  const currencyRef = useRef(null);
  const clientMenuRef = useRef(null);

  const { 
    favorites, 
    compareList, 
    currentUser, 
    logout,
    currency, 
    setCurrency, 
    unit, 
    setUnit,
    vaultCollections
  } = useRealEstateStore();

  const currencies = ['USD', 'INR', 'EUR', 'GBP', 'AED', 'CHF', 'JPY'];
  const totalVaultItems = vaultCollections.reduce((acc, c) => acc + (c.propertyIds?.length || 0), 0);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (intelRef.current && !intelRef.current.contains(event.target)) {
        setIntelDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAboutDropdownOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setCurrencyDropdownOpen(false);
      }
      if (clientMenuRef.current && !clientMenuRef.current.contains(event.target)) {
        setClientMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIntelDropdownOpen(false);
    setAboutDropdownOpen(false);
    setClientMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ========================================================= */}
          {/* LEFT NAVIGATION: Focused Exclusively on Buyer & Seller */}
          {/* ========================================================= */}
          <nav className="hidden xl:flex items-center gap-6 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#1F2937]">
            
            {/* 1. Properties Link (For Buyers) */}
            <Link 
              href="/properties" 
              className={`py-2 hover:text-[#1E3A5F] transition-colors relative ${
                pathname === '/properties' 
                  ? 'text-[#1E3A5F] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D4AF37]' 
                  : ''
              }`}
            >
              Properties
            </Link>

            {/* 2. Sell Property Link (For Sellers) */}
            <Link 
              href="/sell" 
              className={`py-2 flex items-center gap-1.5 transition-colors relative group ${
                pathname === '/sell' 
                  ? 'text-[#8A5A00] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D4AF37]' 
                  : 'text-[#1F2937] hover:text-[#8A5A00]'
              }`}
            >
              <span>Sell</span>
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#8A5A00] text-[9px] font-bold tracking-normal border border-[#D4AF37]/30">
                Valuation
              </span>
            </Link>

            {/* 2.5 Map Explorer Link */}
            <Link 
              href="/#map-explorer" 
              className="py-2 flex items-center gap-1.5 hover:text-[#1E3A5F] transition-colors group"
            >
              <span>Map Explorer</span>
              <span className="px-1.5 py-0.2 rounded-md bg-[#1E3A5F]/10 text-[#1E3A5F] text-[8px] font-black border border-[#1E3A5F]/20">
                MAPS
              </span>
            </Link>

            {/* 3. Market Intel & Tools Dropdown */}
            <div 
              ref={intelRef}
              className="relative py-2"
              onMouseEnter={() => setIntelDropdownOpen(true)}
              onMouseLeave={() => setIntelDropdownOpen(false)}
            >
              <button 
                onClick={() => setIntelDropdownOpen(!intelDropdownOpen)}
                className={`flex items-center gap-1 hover:text-[#1E3A5F] transition-colors focus:outline-none ${
                  ['/area-intelligence', '/calculators', '/pricing'].includes(pathname) 
                    ? 'text-[#1E3A5F] font-bold' 
                    : ''
                }`}
              >
                <span>Intel & Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-200 ${intelDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {intelDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-gray-200/90 rounded-2xl p-3 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Buyer & Seller Analytics
                  </div>

                  <Link 
                    href="/area-intelligence" 
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center shrink-0 group-hover:bg-[#1E3A5F] group-hover:text-white transition-colors">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1F2937] group-hover:text-[#1E3A5F] flex items-center gap-1.5">
                        <span>Area Market Intel</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 text-[8px] font-black border border-emerald-200">
                          LIVE
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 normal-case tracking-normal mt-0.5">
                        Micro-market rates, capital growth & rental yields
                      </p>
                    </div>
                  </Link>

                  <Link 
                    href="/calculators" 
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#8A5A00]/10 text-[#8A5A00] flex items-center justify-center shrink-0 group-hover:bg-[#8A5A00] group-hover:text-white transition-colors">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1F2937] group-hover:text-[#1E3A5F]">
                        Financial Suite
                      </div>
                      <p className="text-[11px] text-gray-500 normal-case tracking-normal mt-0.5">
                        Mortgage EMI, ROI projections & stamp duty calculator
                      </p>
                    </div>
                  </Link>

                  <Link 
                    href="/properties?hasTour=true" 
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 group-hover:bg-indigo-700 group-hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1F2937] group-hover:text-[#1E3A5F]">
                        360° Virtual Tours
                      </div>
                      <p className="text-[11px] text-gray-500 normal-case tracking-normal mt-0.5">
                        Immersive spatial tours of prime estates
                      </p>
                    </div>
                  </Link>

                  <Link 
                    href="/pricing" 
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1F2937] group-hover:text-[#1E3A5F]">
                        Exclusive Portfolios
                      </div>
                      <p className="text-[11px] text-gray-500 normal-case tracking-normal mt-0.5">
                        Off-market opportunities & curated advisory tiers
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. About & Contact Dropdown */}
            <div 
              ref={aboutRef}
              className="relative py-2"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button 
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`flex items-center gap-1 hover:text-[#1E3A5F] transition-colors focus:outline-none ${
                  ['/about', '/services', '/blog', '/contact'].includes(pathname) 
                    ? 'text-[#1E3A5F] font-bold' 
                    : ''
                }`}
              >
                <span>About</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-200/90 rounded-2xl p-2.5 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 z-50">
                  <Link 
                    href="/about" 
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs normal-case text-[#1F2937] hover:text-[#1E3A5F] hover:bg-[#FAF8F5] transition-colors font-medium"
                  >
                    <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                    <span>Company Legacy & Story</span>
                  </Link>
                  <Link 
                    href="/services" 
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs normal-case text-[#1F2937] hover:text-[#1E3A5F] hover:bg-[#FAF8F5] transition-colors font-medium"
                  >
                    <Building2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Private Client Advisory</span>
                  </Link>
                  <Link 
                    href="/blog" 
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs normal-case text-[#1F2937] hover:text-[#1E3A5F] hover:bg-[#FAF8F5] transition-colors font-medium"
                  >
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    <span>Market Insights & Journal</span>
                  </Link>
                  <Link 
                    href="/contact" 
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs normal-case text-[#1F2937] hover:text-[#1E3A5F] hover:bg-[#FAF8F5] transition-colors font-medium"
                  >
                    <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                    <span>Contact Concierge</span>
                  </Link>
                </div>
              )}
            </div>

          </nav>

          {/* ========================================================= */}
          {/* CENTER BRAND LOGO */}
          {/* ========================================================= */}
          <Link href="/" className="flex flex-col items-center group transition-transform active:scale-95">
            <span className="text-2xl sm:text-3xl font-black tracking-[0.28em] text-[#1E3A5F] font-serif uppercase leading-none group-hover:text-[#8A5A00] transition-colors">
              JK
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.45em] text-[#8A5A00] font-sans uppercase font-bold mt-1">
              REALTY
            </span>
          </Link>

          {/* ========================================================= */}
          {/* RIGHT NAVIGATION: Only Necessary Details & Settings */}
          {/* ========================================================= */}
          <div className="hidden xl:flex items-center gap-4">

            {/* 1. Necessary Setting: Currency & Unit Selector Pill */}
            <div ref={currencyRef} className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-[#1E3A5F] px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer"
                title="Currency & Unit Preferences"
              >
                <span className="font-bold text-[#8A5A00]">{currency}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-500 text-[11px]">{unit === 'sqft' ? 'ft²' : 'm²'}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-200 rounded-2xl p-3 shadow-2xl z-50 space-y-3 text-xs animate-in fade-in zoom-in-95">
                  <div>
                    <span className="block px-1 text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                      Display Currency
                    </span>
                    <div className="grid grid-cols-2 gap-1">
                      {currencies.map((curr) => (
                        <button
                          key={curr}
                          onClick={() => {
                            setCurrency(curr);
                            setCurrencyDropdownOpen(false);
                          }}
                          className={`px-2 py-1.5 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                            currency === curr
                              ? 'bg-[#1E3A5F] text-white font-bold'
                              : 'text-gray-700 hover:bg-[#FAF8F5]'
                          }`}
                        >
                          {curr} ({CURRENCY_SYMBOLS[curr]?.trim()})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="block px-1 text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                      Measurement Unit
                    </span>
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() => {
                          setUnit('sqft');
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`px-2 py-1.5 rounded-lg text-center text-xs font-medium transition-colors cursor-pointer ${
                          unit === 'sqft'
                            ? 'bg-[#1E3A5F] text-white font-bold'
                            : 'text-gray-700 hover:bg-[#FAF8F5]'
                        }`}
                      >
                        Sq Ft (ft²)
                      </button>
                      <button
                        onClick={() => {
                          setUnit('sqm');
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`px-2 py-1.5 rounded-lg text-center text-xs font-medium transition-colors cursor-pointer ${
                          unit === 'sqm'
                            ? 'bg-[#1E3A5F] text-white font-bold'
                            : 'text-gray-700 hover:bg-[#FAF8F5]'
                        }`}
                      >
                        Meters (m²)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Saved Properties (Heart Icon for Buyers) */}
            <Link
              href="/properties?filter=favorites"
              className="relative text-gray-700 hover:text-[#1E3A5F] transition-colors p-2 rounded-lg hover:bg-gray-50"
              title="Saved Properties"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* 3. Primary CTA: VIP Booking / Viewing */}
            <button
              onClick={onOpenVIPBooking}
              className="px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#152843] text-white text-[11px] font-bold tracking-[0.15em] uppercase transition-all shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              VIP Booking
            </button>

            {/* 4. Buyer & Seller Account Menu (No Admin Details!) */}
            <div ref={clientMenuRef} className="relative">
              <button
                onClick={() => setClientMenuOpen(!clientMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                  clientMenuOpen 
                    ? 'bg-[#FAF8F5] border-[#D4AF37] text-[#1E3A5F] shadow-xs' 
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
                title="Buyer & Seller Account Menu"
              >
                {currentUser?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-4 h-4 rounded-full object-cover border border-[#D4AF37]"
                  />
                ) : (
                  <User className="w-4 h-4 text-[#8A5A00]" />
                )}
                <span className="text-xs font-semibold max-w-[90px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Account'}
                </span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${clientMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {clientMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl p-2.5 shadow-2xl z-50 space-y-2 text-xs animate-in fade-in zoom-in-95">
                  
                  {/* Section: Buyer Tools */}
                  <div>
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Buyer Portfolio
                    </div>

                    <button
                      onClick={() => {
                        setClientMenuOpen(false);
                        onOpenVault?.();
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5] text-left text-gray-800 hover:text-[#1E3A5F] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <FolderLock className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-semibold text-xs">Private Client Vault</span>
                      </div>
                      {totalVaultItems > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#8A5A00] font-bold text-[10px]">
                          {totalVaultItems} Saved
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setClientMenuOpen(false);
                        onOpenCompare?.();
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5] text-left text-gray-800 hover:text-[#1E3A5F] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Layers className="w-4 h-4 text-[#1E3A5F]" />
                        <span className="font-semibold text-xs">Compare Properties</span>
                      </div>
                      {compareList.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#1E3A5F] text-white font-bold text-[10px]">
                          {compareList.length} Active
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setClientMenuOpen(false);
                        onOpenAIWizard?.();
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5] text-left text-gray-800 hover:text-[#1E3A5F] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-semibold text-xs">AI Concierge Matchmaker</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[9px] font-bold">
                        Smart
                      </span>
                    </button>
                  </div>

                  {/* Section: Seller Tools */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Seller Tools
                    </div>

                    <Link
                      href="/sell"
                      onClick={() => setClientMenuOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5] text-gray-800 hover:text-[#8A5A00] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Home className="w-4 h-4 text-[#8A5A00]" />
                        <div>
                          <div className="font-semibold text-xs">Sell Your Property</div>
                          <div className="text-[10px] text-gray-400">Instant AI Valuation & Listing</div>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#8A5A00] text-[9px] font-bold">
                        FREE
                      </span>
                    </Link>

                    <Link
                      href="/area-intelligence"
                      onClick={() => setClientMenuOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5] text-gray-800 hover:text-[#1E3A5F] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="w-4 h-4 text-[#1E3A5F]" />
                        <div>
                          <div className="font-semibold text-xs">Area Market Rates</div>
                          <div className="text-[10px] text-gray-400">Neighborhood Price Guidance</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  </div>

                  {/* Section: Client Account & Preferences */}
                  <div className="pt-2 border-t border-gray-100 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setClientMenuOpen(false);
                        onOpenAuth?.();
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 text-left font-semibold text-xs text-[#1E3A5F] border border-amber-200/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>Firebase Authenticator</span>
                      </div>
                      <span className="text-[10px] text-[#8A5A00] font-bold">
                        Modal ⚡
                      </span>
                    </button>

                    <Link
                      href="/login"
                      onClick={() => setClientMenuOpen(false)}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-left font-semibold text-xs text-[#1F2937] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#1E3A5F]" />
                        <span>{currentUser ? `Signed in as ${currentUser.name}` : 'Sign In / Register'}</span>
                      </div>
                      <span className="text-[10px] text-[#8A5A00] font-bold">
                        {currentUser ? 'Switch' : 'Login →'}
                      </span>
                    </Link>

                    {currentUser && (
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setClientMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* ========================================================= */}
          {/* MOBILE VIEW: Clean Action Icons & Hamburger Menu */}
          {/* ========================================================= */}
          <div className="flex xl:hidden items-center gap-2">
            
            {/* Mobile Saved Heart */}
            <Link
              href="/properties?filter=favorites"
              className="p-2 text-gray-700 hover:text-[#1E3A5F] relative"
              title="Saved Properties"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Mobile VIP Booking Button */}
            <button
              onClick={onOpenVIPBooking}
              className="px-3 py-1.5 rounded-lg bg-[#1E3A5F] text-white text-[10px] font-bold tracking-widest uppercase transition-all"
            >
              VIP Book
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#1E3A5F] rounded-lg hover:bg-gray-50 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE DRAWER: Buyer & Seller Focused (Zero Admin Complexity) */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 px-5 py-6 space-y-5 shadow-2xl animate-in slide-in-from-top-3 max-h-[85vh] overflow-y-auto">
          
          {/* Quick Client Action Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIWizard?.();
              }}
              className="p-3 rounded-xl bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#1E3A5F] text-xs font-bold flex items-center gap-2 hover:bg-[#FAF8F5]/80 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div className="text-left">
                <div className="leading-tight">AI Concierge</div>
                <div className="text-[10px] text-gray-500 font-normal">Find Match</div>
              </div>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVault?.();
              }}
              className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-[#1F2937] text-xs font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <FolderLock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div className="text-left">
                <div className="leading-tight">Private Vault</div>
                <div className="text-[10px] text-gray-500 font-normal">{totalVaultItems} Items</div>
              </div>
            </button>
          </div>

          {/* Section 1: For Buyers */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2">
              For Buyers
            </div>
            <Link 
              href="/properties" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-semibold text-gray-800"
            >
              <span>Explore All Properties & Communities</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link 
              href="/#map-explorer" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-semibold text-[#1E3A5F]"
            >
              <div className="flex items-center gap-2">
                <span>Interactive Maps & GPS Explorer</span>
                <span className="px-1.5 py-0.2 rounded-md bg-[#D4AF37]/20 text-[#8A5A00] text-[8px] font-bold">
                  MAPS
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCompare?.();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-semibold text-gray-800 text-left"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1E3A5F]" />
                <span>Compare Shortlist ({compareList.length})</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <Link 
              href="/properties?hasTour=true" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-semibold text-gray-800"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-600" />
                <span>360° Virtual Tours</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link 
              href="/calculators" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-semibold text-gray-800"
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#8A5A00]" />
                <span>Mortgage & EMI Calculators</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>

          {/* Section 2: For Sellers */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2">
              For Sellers
            </div>
            <Link 
              href="/sell" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-amber-50/50 text-sm font-semibold text-[#8A5A00]"
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-[#8A5A00]" />
                <span>Sell Your Property</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#8A5A00] text-[9px] font-bold">
                AI APPRAISAL
              </span>
            </Link>
            <Link 
              href="/area-intelligence" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-semibold text-gray-800"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1E3A5F]" />
                <span>Area Market Rate Intelligence</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                LIVE
              </span>
            </Link>
          </div>

          {/* Section 3: Company & Advisory */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2">
              JK Realty Brokerage
            </div>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              Company Legacy & Story
            </Link>
            <Link 
              href="/services" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              Private Client Advisory & Valuation
            </Link>
            <Link 
              href="/blog" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              Market Insights & Journal
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              Contact Concierge
            </Link>
          </div>

          {/* Mobile Preferences & Auth (Simple Necessary Settings) */}
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Currency:</span>
              <div className="flex items-center gap-1">
                {currencies.slice(0, 4).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      currency === c 
                        ? 'bg-[#1E3A5F] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Area Units:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setUnit('sqft')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    unit === 'sqft' ? 'bg-[#1E3A5F] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sq Ft (ft²)
                </button>
                <button
                  onClick={() => setUnit('sqm')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    unit === 'sqm' ? 'bg-[#1E3A5F] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Meters (m²)
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth?.();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-50 text-[#1E3A5F] border border-amber-200/80 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Firebase Authenticator</span>
              </div>
              <span className="text-[10px] text-[#8A5A00] font-bold">Open ⚡</span>
            </button>

            <div className="flex items-center gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentUser ? currentUser.name : 'Sign In / Register'}</span>
              </Link>
              {currentUser && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

        </div>
      )}
    </header>
  );
}
