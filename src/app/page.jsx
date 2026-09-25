'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Clock, 
  Star, 
  Eye, 
  KeyRound, 
  MessageCircle, 
  CheckCircle2, 
  PhoneCall, 
  Send,
  Trees,
  Activity,
  Box,
  Compass,
  Ruler
} from 'lucide-react';
import HeroSearch from '../components/HeroSearch';
import PropertyCard from '../components/PropertyCard';
import VirtualTourModal from '../components/VirtualTourModal';
import ScheduleVisitModal from '../components/ScheduleVisitModal';
import AIRecommendationModal from '../components/AIRecommendationModal';
import HomeMapExplorerSection from '../components/HomeMapExplorerSection';
import ClientOnly from '../components/ClientOnly';
import { useRealEstateStore } from '../lib/store';

export default function HomePage() {
  const { properties } = useRealEstateStore();
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [tourProperty, setTourProperty] = useState(null);
  const [visitProperty, setVisitProperty] = useState(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Filter featured properties
  const displayProperties = properties.filter((p) => {
    if (featuredFilter === 'all') return p.isFeatured;
    if (featuredFilter === 'villa') return p.category === 'Luxury Villa';
    if (featuredFilter === 'penthouse') return p.category === 'Penthouse';
    if (featuredFilter === 'waterfront') return p.category === 'Waterfront Estate';
    if (featuredFilter === 'commercial') return p.type === 'commercial';
    return true;
  });

  const stats = [
    { label: 'Volume Transacted', value: '$3.2 Billion+' },
    { label: 'Trophy Communities', value: '28 Masterplans' },
    { label: 'Client Satisfaction', value: '99.8% Perfect' },
    { label: 'Global Advisory Desks', value: '14 Hubs' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Lord Henry Vane',
      role: 'Private Equity Chairman, London',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'JK Realty orchestrated our acquisition with utter discretion and architectural mastery. The spatial quality and engineering are truly unparalleled.',
      rating: 5,
      property: 'Acquired Bel-Air Estate'
    },
    {
      id: 2,
      name: 'Vivienne Chen',
      role: 'Tech Founder & Connoisseur, SF',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: 'The 360° Virtual Tour allowed us to review floor finishes, skyline view corridors, and ceiling heights before our private flight arrived.',
      rating: 5,
      property: 'Acquired 432 Park Penthouse'
    },
    {
      id: 3,
      name: 'Carlos Mendoza',
      role: 'Real Estate Family Office, Miami',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      comment: 'Their deep understanding of maritime zoning and waterfront docking specifications made our Biscayne Bay estate purchase flawless.',
      rating: 5,
      property: 'Acquired Venetian Islands Waterfront'
    }
  ];

  return (
    <div className="space-y-24 pb-20 bg-[#FAF8F5] text-[#1F2937]">
      
      {/* 1. HERO SECTION (DARK CINEMATIC SOBHA-STYLE LUXURY ARCHITECTURAL THEME) */}
      <section className="relative min-h-[92vh] flex flex-col justify-between items-center px-4 sm:px-8 pt-8 pb-12 overflow-hidden bg-gradient-to-b from-[#070c14] via-[#0b1523] to-[#FAF8F5]">
        
        {/* Atmospheric Background & Ambient Golden Glow */}
        <div className="absolute inset-0 pointer-events-none">
          {/* High-res cinematic architectural estate banner from example img */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/images.jpg"
            alt="Luxury Architectural Estate Banner"
            className="w-full h-full object-cover opacity-60 filter brightness-90 contrast-110"
          />
          {/* Radial Dark Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070c14]/80 via-transparent to-[#FAF8F5]" />
          
          {/* Center Golden Warm Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#D4AF37]/25 via-[#b89422]/10 to-transparent rounded-full blur-[140px]" />
        </div>

        {/* Centerpiece: Illuminated Luxury Monogram with Skyline Silhouette (Sobha-Style J) */}
        <div className="absolute top-[48%] sm:top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 select-none pointer-events-none flex items-center justify-center w-full">
          <div className="relative w-[280px] sm:w-[380px] md:w-[460px] lg:w-[540px] h-[360px] sm:h-[480px] md:h-[560px] lg:h-[620px] flex items-center justify-center">
            
            <svg 
              viewBox="0 0 400 520" 
              className="w-full h-full overflow-visible filter drop-shadow-[0_0_50px_rgba(212,175,55,0.45)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Golden Blur Filter for outer aura */}
                <filter id="heroGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="16" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Clip Path for Letter J - Exactly fitted with safety margins */}
                <clipPath id="heroJClip">
                  <text 
                    x="200" 
                    y="400" 
                    textAnchor="middle" 
                    fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif" 
                    fontWeight="900" 
                    fontSize="430"
                  >
                    J
                  </text>
                </clipPath>

                {/* Linear Golden Gradient for Rim Stroke */}
                <linearGradient id="heroGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF1B8" />
                  <stop offset="35%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#F5D77F" />
                  <stop offset="100%" stopColor="#99730E" />
                </linearGradient>
              </defs>

              {/* 1. Deep Golden Ambient Backlight */}
              <text 
                x="200" 
                y="400" 
                textAnchor="middle" 
                fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif" 
                fontWeight="900" 
                fontSize="430"
                fill="#D4AF37"
                opacity="0.35"
                filter="url(#heroGoldGlow)"
              >
                J
              </text>

              {/* 2. Masked Architectural Estate Banner (images.jpg) inside the Letter J */}
              <g clipPath="url(#heroJClip)">
                <image 
                  href="/images/images.jpg" 
                  x="0" 
                  y="0" 
                  width="400" 
                  height="520" 
                  preserveAspectRatio="xMidYMid slice" 
                />
                {/* Contrast gradient overlay for rich cinematic look */}
                <rect width="400" height="520" fill="rgba(7, 12, 20, 0.25)" />
              </g>

              {/* 3. Outer Glowing Golden Rim Accent Stroke */}
              <text 
                x="200" 
                y="400" 
                textAnchor="middle" 
                fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif" 
                fontWeight="900" 
                fontSize="430"
                fill="none"
                stroke="url(#heroGoldRim)"
                strokeWidth="3.5"
                opacity="0.95"
              >
                J
              </text>

              {/* 4. Fine Inner Golden Shimmer Contour */}
              <text 
                x="200" 
                y="400" 
                textAnchor="middle" 
                fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif" 
                fontWeight="900" 
                fontSize="430"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1"
                opacity="0.4"
              >
                J
              </text>
            </svg>

          </div>
        </div>

        {/* Left Headline: "WELCOME TO Fine Living" */}
        <div className="w-full max-w-7xl mx-auto z-10 pt-16 sm:pt-28 flex flex-col items-start">
          <div className="space-y-1 text-left animate-in fade-in slide-in-from-left-6 duration-700">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.3em] text-white uppercase font-sans drop-shadow-md">
              WELCOME TO
            </h2>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-normal text-[#D4AF37] font-script italic leading-tight select-none drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]">
              Fine living
            </h1>
          </div>
        </div>

        {/* Bottom Floating Horizontal Search Bar */}
        <div className="w-full z-20 pt-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <ClientOnly
            fallback={
              <div className="w-full max-w-5xl mx-auto h-[120px] rounded-2xl bg-white/95 backdrop-blur-2xl border border-[#D4AF37]/30 shadow-luxury flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <HeroSearch onOpenAIWizard={() => setIsAIModalOpen(true)} />
          </ClientOnly>
        </div>

      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#D4AF37] text-center transition-all shadow-card hover:shadow-luxury-hover"
            >
              <div className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#374151] font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. COMMUNITIES & FEATURED ESTATES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <span className="text-[11px] font-black text-[#8A5A00] uppercase tracking-[0.25em] block mb-1">
              Curated Masterplans
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A5F] font-serif tracking-wide">
              Featured Communities
            </h2>
            <p className="text-xs sm:text-sm text-[#374151] mt-1 font-medium">
              Crafted with passion and uncompromising attention to architectural detail.
            </p>
          </div>

          {/* Filter Tabs */}
          <ClientOnly
            fallback={
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['All Communities', 'Luxury Villas', 'Penthouses', 'Waterfront', 'Commercial'].map((lbl, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap bg-white text-[#4B5563] border border-gray-200"
                  >
                    {lbl}
                  </span>
                ))}
              </div>
            }
          >
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Communities' },
                { id: 'villa', label: 'Luxury Villas' },
                { id: 'penthouse', label: 'Penthouses' },
                { id: 'waterfront', label: 'Waterfront' },
                { id: 'commercial', label: 'Commercial' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setFeaturedFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    featuredFilter === tab.id
                      ? 'bg-[#1E3A5F] text-white font-bold shadow-md shadow-[#1E3A5F]/20'
                      : 'bg-white text-[#4B5563] hover:text-[#1E3A5F] border border-gray-200 hover:border-[#D4AF37]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ClientOnly>
        </div>

        {/* Grid */}
        <ClientOnly
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-white border border-gray-200 shadow-sm animate-pulse" />
              ))}
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProperties.slice(0, 6).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onOpenTour={(p) => setTourProperty(p)}
                onScheduleVisit={(p) => setVisitProperty(p)}
              />
            ))}
          </div>
        </ClientOnly>

        {/* View All CTA */}
        <div className="text-center pt-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-xl border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span>DISCOVER ALL COMMUNITIES ({properties.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* 3. INTERACTIVE ESTATE & LAND MAP EXPLORER */}
      <ClientOnly
        fallback={
          <section id="map-explorer" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
            <div className="h-[520px] sm:h-[600px] lg:h-[650px] rounded-3xl bg-[#0F1E31] border border-gray-300 flex items-center justify-center shadow-2xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-[#D4AF37] tracking-widest uppercase font-mono">Initializing GPS Satellite Stage...</span>
              </div>
            </div>
          </section>
        }
      >
        <HomeMapExplorerSection
          onScheduleVisit={(p) => setVisitProperty(p)}
          onOpenTour={(p) => setTourProperty(p)}
        />
      </ClientOnly>

      {/* 3.5 SELL WITH JK REALTY LUXURY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1E3A5F] via-[#162C48] to-[#1E3A5F] text-white p-8 sm:p-14 border border-[#D4AF37]/40 shadow-2xl">
          
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
              alt="Luxury Estate Architecture"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.25em] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Seller Mandate & Valuation Desk
                </span>
                <span className="text-gray-300 text-xs font-medium">0% Upfront Listing Fee</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-serif leading-tight tracking-wide text-white">
                Thinking of Selling Your Luxury Property or Land?
              </h2>

              <p className="text-sm text-gray-300 font-light leading-relaxed max-w-xl">
                Maximize your asset realization with JK Realty’s private advisory. Get an instant AI valuation, leverage our network of 12,000+ accredited global buyers, and receive complimentary 4K drone cinematography.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="text-2xl font-black font-serif text-[#D4AF37]">24 Days</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Avg. Time to Offer</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="text-2xl font-black font-serif text-white">99.4%</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Asking Price Achieved</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black font-serif text-[#D4AF37]">12,000+</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Verified Global Buyers</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/sell"
                  className="px-8 py-4 rounded-xl bg-[#D4AF37] hover:bg-[#b89422] text-[#1E3A5F] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-102"
                >
                  <span>GET FREE AI VALUATION & LIST</span>
                  <ArrowRight className="w-4 h-4 text-[#1E3A5F]" />
                </Link>

                <Link
                  href="/sell#seller-intake-wizard"
                  className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-[0.18em] border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>LIST YOUR PROPERTY NOW</span>
                </Link>
              </div>
            </div>

            {/* Right: Interactive Feature Highlights Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block">
                White-Glove Seller Privileges
              </span>

              <div className="space-y-4 text-xs text-gray-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Algorithmic Valuation Precision</strong>
                    <span className="text-gray-400 text-[11px]">Real-time micro-market registry comps and historical neighborhood pricing analysis.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Complimentary 4K Drone & 3D Tours</strong>
                    <span className="text-gray-400 text-[11px]">Matterport 360° virtual walk-throughs created for remote international buyers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Total Confidentiality & Off-Market Option</strong>
                    <span className="text-gray-400 text-[11px]">Private Client Vault placement with strict NDA-gated viewings.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Direct Title & Legal Escrow Assistance</strong>
                    <span className="text-gray-400 text-[11px]">Clear Patta, CMDA/DTCP and encumbrance certification handled end-to-end.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-center">
                <Link
                  href="/sell"
                  className="text-xs font-bold text-[#D4AF37] hover:underline tracking-wider uppercase inline-flex items-center gap-1"
                >
                  <span>Explore Seller Representation Tiers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. IMMERSIVE VIRTUAL TOUR SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-white p-8 sm:p-14 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8A5A00] block">
                Spatial 360° Innovation
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A5F] font-serif leading-tight">
                Immersive 3D Tours Across Every Room
              </h2>
              <p className="text-sm text-[#374151] font-normal leading-relaxed">
                Step inside master suites, panoramic terraces, and chef culinary salons with interactive material callouts and 360-degree pan control.
              </p>

              <div className="space-y-3 text-xs text-[#1F2937]">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-semibold">360° Photorealistic Spatial Scanning</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-semibold">Interactive Hotspot Material Specs & Elevation Details</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-semibold">Live Guided Virtual Tours with Senior Listing Directors</span>
                </div>
              </div>

              <ClientOnly
                fallback={
                  <div className="pt-2 flex flex-wrap gap-4">
                    <div className="w-36 h-11 bg-gray-200 rounded-xl animate-pulse" />
                    <div className="w-40 h-11 bg-gray-100 rounded-xl animate-pulse" />
                  </div>
                }
              >
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setTourProperty(properties[0])}
                    className="px-8 py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-md border border-[#D4AF37]/40 transition-all"
                  >
                    START 3D TOUR
                  </button>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setIsAIModalOpen(true)}
                    className="px-8 py-3.5 rounded-xl border border-[#1E3A5F]/30 hover:border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#FAF8F5] text-xs uppercase tracking-[0.2em] transition-all font-bold shadow-sm"
                  >
                    AI MATCHMAKER
                  </button>
                </div>
              </ClientOnly>
            </div>

            {/* Advanced 3D Spatial Interactive Preview Card */}
            <div 
              className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl group cursor-pointer bg-[#070c14]" 
              onClick={() => setTourProperty(properties[0])}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                alt="3D Spatial Tour Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 filter brightness-90 group-hover:brightness-100"
              />
              
              {/* Dark Vignette & Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070c14]/90 via-black/20 to-black/40" />

              {/* Top HUD Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                <div className="flex items-center gap-2 bg-[#070c14]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-[10px] font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-emerald-300">Matterport LiDAR 4K</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#070c14]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold shadow-lg">
                  <Box className="w-3.5 h-3.5" />
                  <span>Three.js WebGL Engine</span>
                </div>
              </div>

              {/* Pulsing 3D Spatial Hotspots on the preview */}
              <div className="absolute top-[38%] left-[28%] z-10 pointer-events-none">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-[#1E3A5F]/90 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute -inset-1.5 rounded-full border border-[#D4AF37]/50 animate-ping" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 bg-[#070c14]/90 border border-[#D4AF37]/40 rounded-md px-2 py-0.5 text-[9px] font-bold text-white whitespace-nowrap shadow-md">
                    24ft Acoustic Coffer
                  </div>
                </div>
              </div>

              <div className="absolute top-[52%] right-[22%] z-10 pointer-events-none">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-[#1E3A5F]/90 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute -inset-1.5 rounded-full border border-[#D4AF37]/50 animate-ping" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 bg-[#070c14]/90 border border-[#D4AF37]/40 rounded-md px-2 py-0.5 text-[9px] font-bold text-white whitespace-nowrap shadow-md">
                    Automated Pocket Glazing
                  </div>
                </div>
              </div>

              {/* Center Launch Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="p-4 rounded-2xl bg-[#1E3A5F]/90 border-2 border-[#D4AF37] text-white flex flex-col items-center gap-2 shadow-2xl backdrop-blur-md group-hover:scale-110 group-hover:border-white transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#FFF2CE] text-[#1E3A5F] flex items-center justify-center shadow-md">
                    <Eye className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-black tracking-[0.2em] uppercase font-serif text-[#D4AF37]">
                    Launch 3D Spatial Tour
                  </span>
                  <span className="text-[10px] text-gray-300 font-sans font-medium">
                    Click to enter 360° WebGL Experience
                  </span>
                </div>
              </div>

              {/* Bottom Feature Pill Strip */}
              <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] text-gray-300 bg-[#070c14]/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 pointer-events-none">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Compass className="w-3 h-3 text-[#D4AF37]" />
                  360° Photosphere
                </span>
                <span className="text-gray-500">•</span>
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Box className="w-3 h-3 text-[#D4AF37]" />
                  3D Dollhouse
                </span>
                <span className="text-gray-500">•</span>
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Ruler className="w-3 h-3 text-[#D4AF37]" />
                  Laser HUD
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHY JK REALTY (THE BENCHMARK) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black text-[#8A5A00] uppercase tracking-[0.25em]">
            The JK Benchmark
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E3A5F] font-serif">
            Uncompromising Craftsmanship
          </h2>
          <p className="text-xs sm:text-sm text-[#374151] font-medium">
            Every home is conceived, designed, and constructed under our backward integration philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#D4AF37] transition-all shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-wider font-serif">Backward Integration</h3>
            <p className="text-xs text-[#374151] font-medium leading-relaxed">
              We oversee every single phase in-house — from conceptual architectural blueprints to precision joinery and marble installation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#D4AF37] transition-all shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-wider font-serif">German Engineering</h3>
            <p className="text-xs text-[#374151] font-medium leading-relaxed">
              Structural rigor and acoustic insulation conforming to the world&apos;s most stringent European engineering tolerances.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#D4AF37] transition-all shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-wider font-serif">On-Time Handover</h3>
            <p className="text-xs text-[#374151] font-medium leading-relaxed">
              A decades-long flawless record of on-schedule or early delivery with 100% transparent escrow account management.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#D4AF37] transition-all shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-wider font-serif">Private Concierge</h3>
            <p className="text-xs text-[#374151] font-medium leading-relaxed">
              24/7 client representation desk coordinating private vehicle transport, property inspections, and legal conveyance.
            </p>
          </div>
        </div>
      </section>

      {/* 5.5 AREA MARKET RATE INTELLIGENCE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-[#D4AF37]/50 p-8 sm:p-12 shadow-card space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs font-bold border border-emerald-200 flex items-center gap-1.5 shadow-sm">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  Live Market Intelligence
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#1E3A5F] font-mono text-xs font-bold">
                  Plotted Corridors & Land Dossiers
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A5F] font-serif leading-tight">
                Area Market Rate Intelligence System
              </h2>
              <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
                Empowering buyers, brokers, and investors with real-time algorithmic valuation. Track 1-year historical appreciation, CMRL Metro & highway infrastructure catalysts, and explore verified legal land dossiers with Patta, Chitta, FMB sketches, and 35-year Nil Encumbrance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href="/area-intelligence"
                className="px-6 py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs uppercase tracking-widest text-center shadow-md border border-[#D4AF37]/40 transition-all"
              >
                Launch Intelligence Suite
              </Link>
              <Link
                href="/properties/prop-13"
                className="px-6 py-3.5 rounded-xl bg-[#FAF8F5] hover:bg-white text-[#1E3A5F] font-bold text-xs border border-gray-300 text-center transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>View Tambaram Plot (2,400 Sq.Ft)</span>
                <span className="text-emerald-700 font-mono">₹4,500/sq.ft</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200">
              <span className="text-[11px] font-mono text-[#4B5563] uppercase block font-bold">Featured Hub</span>
              <span className="text-lg font-bold text-[#1E3A5F] font-serif block">Tambaram Corridor</span>
              <span className="text-[11px] text-emerald-800 font-mono font-black">+18% (1 Year Growth)</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200">
              <span className="text-[11px] font-mono text-[#4B5563] uppercase block font-bold">Avg Market Rate</span>
              <span className="text-lg font-bold text-[#1E3A5F] font-serif block">₹4,500 / sq.ft</span>
              <span className="text-[11px] text-[#4B5563] font-mono font-semibold">Verified SRO Records</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200">
              <span className="text-[11px] font-mono text-[#4B5563] uppercase block font-bold">Standard Plot</span>
              <span className="text-lg font-bold text-[#1E3A5F] font-serif block">2,400 sq.ft (1 Ground)</span>
              <span className="text-[11px] text-[#8A5A00] font-mono font-black">5.51 Cents Extent</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200">
              <span className="text-[11px] font-mono text-[#4B5563] uppercase block font-bold">Investment Rating</span>
              <span className="text-lg font-bold text-[#1E3A5F] font-serif block">8.9 / 10 Score</span>
              <span className="text-[11px] text-emerald-800 font-mono font-black">High Demand Level</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-black text-[#8A5A00] uppercase tracking-[0.25em]">
            Client Testimonials
          </span>
          <h2 className="text-3xl font-black text-[#1E3A5F] font-serif">
            Endorsements of Distinction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-2xl border border-[#E5E7EB] hover:border-[#D4AF37] transition-all shadow-card space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#8A5A00]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#8A5A00]" />
                  ))}
                </div>
                <p className="text-xs text-[#1F2937] font-normal leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/60 shadow-sm"
                />
                <div className="text-xs">
                  <h4 className="font-bold text-[#1E3A5F]">{t.name}</h4>
                  <span className="text-[#4B5563] text-[10px] block font-medium">{t.role}</span>
                  <span className="text-[#8A5A00] text-[10px] font-bold">{t.property}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT / BOOK A PRIVATE VIEWING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-14 rounded-3xl border border-[#D4AF37]/30 shadow-card">
          
          <div className="space-y-5">
            <span className="text-[11px] font-black text-[#8A5A00] uppercase tracking-[0.25em] block">
              Private Appointments
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A5F] font-serif leading-tight">
              Schedule Your Private Viewing
            </h2>
            <p className="text-sm text-[#374151] font-normal leading-relaxed">
              Experience the craftsmanship firsthand. Arrange an escorted tour of our show residences and private enclaves with our client directors.
            </p>

            <div className="space-y-3 pt-2 text-xs text-[#1F2937]">
              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-[#8A5A00]" />
                <span className="font-semibold text-[#1F2937]">Executive Concierge: +1 (800) 840-AURA (2872)</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold text-[#1F2937]">Instant WhatsApp Concierge: +1 (415) 890-2341</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <ClientOnly
              fallback={
                <div className="h-72 rounded-2xl bg-white border border-gray-200 animate-pulse flex items-center justify-center">
                  <span className="text-xs text-gray-400 font-medium">Loading appointment desk...</span>
                </div>
              }
            >
              {contactSubmitted ? (
                <div className="py-10 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E3A5F] font-serif">Viewing Registered</h3>
                  <p className="text-xs text-[#374151] font-medium">
                    Our private client desk will confirm your appointment schedule within 2 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E3A5F]">
                    Request Escorted Walkthrough
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#1E3A5F] font-bold block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        suppressHydrationWarning
                        placeholder="Lord Julian Montgomery"
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] shadow-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#1E3A5F] font-bold block mb-1">Mobile / Phone</label>
                      <input
                        type="tel"
                        required
                        suppressHydrationWarning
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] shadow-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#1E3A5F] font-bold block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      suppressHydrationWarning
                      placeholder="julian@montgomerycapital.com"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] shadow-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#1E3A5F] font-bold block mb-1">Preferred Community</label>
                    <select
                      suppressHydrationWarning
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] shadow-sm font-semibold"
                    >
                      <option>The Bel-Air Obsidian Villa</option>
                      <option>The Sky Crest Penthouse (Manhattan)</option>
                      <option>Biscayne Bay Oceanfront Palace</option>
                      <option>The Silicon Valley Eco Manor</option>
                      <option>Tambaram Royal Avenue Prime Villa Plot</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    suppressHydrationWarning
                    className="w-full py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 mt-2 shadow-md border border-[#D4AF37]/40"
                  >
                    Confirm Appointment
                  </button>
                </form>
              )}
            </ClientOnly>
          </div>

        </div>
      </section>

      {/* Global Interactive Modals */}
      <ClientOnly>
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

        <AIRecommendationModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
        />
      </ClientOnly>

    </div>
  );
}
