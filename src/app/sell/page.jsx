'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Upload, 
  Camera, 
  Eye, 
  Lock, 
  FileText, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  HelpCircle,
  Clock,
  Download,
  Share2,
  ChevronDown,
  Layers,
  Trees,
  Check,
  Zap
} from 'lucide-react';
import { useRealEstateStore } from '../../lib/store';
import { formatLocalizedPrice, formatLocalizedArea } from '../../lib/utils';

export default function SellPropertyPage() {
  const { submitSellerListing, currency, unit } = useRealEstateStore();

  // Active Main View: 'valuation' or 'listing'
  const [activeSection, setActiveSection] = useState('valuation');
  
  // ==========================================
  // 1. AI VALUATION CALCULATOR STATE
  // ==========================================
  const [valCategory, setValCategory] = useState('Luxury Villa');
  const [valCity, setValCity] = useState('Los Angeles');
  const [valArea, setValArea] = useState(6500);
  const [valCondition, setValCondition] = useState('pristine'); // 'brand_new' | 'pristine' | 'classic'
  const [valRoadWidth, setValRoadWidth] = useState('40ft'); // 'standard' | '40ft' | 'avenue'
  const [valHasPool, setValHasPool] = useState(true);
  const [valHasSmartHome, setValHasSmartHome] = useState(true);
  const [valHasVaastu, setValHasVaastu] = useState(true);
  const [valHasClearTitle, setValHasClearTitle] = useState(true);

  // Dynamic Base Rate per sq ft depending on category & city
  const calculateValuation = () => {
    let rate = 800; // USD base
    if (currency === 'INR') rate = 6500; // INR base per sq ft

    if (valCategory === 'Duplex Penthouse') rate *= 1.35;
    else if (valCategory === 'Waterfront Estate') rate *= 1.5;
    else if (valCategory === 'Empty Land') rate *= 0.7;
    else if (valCategory === 'Commercial Space') rate *= 1.15;

    if (valCity === 'New York' || valCity === 'Manhattan') rate *= 1.4;
    else if (valCity === 'Miami') rate *= 1.15;
    else if (valCity === 'Chennai' && currency === 'INR') rate = 4800;

    if (valCondition === 'brand_new') rate *= 1.15;
    if (valCondition === 'pristine') rate *= 1.08;

    if (valRoadWidth === 'avenue') rate *= 1.12;
    else if (valRoadWidth === '40ft') rate *= 1.06;

    if (valHasPool) rate *= 1.04;
    if (valHasSmartHome) rate *= 1.03;
    if (valHasClearTitle) rate *= 1.08;

    const fairValue = Math.round(rate * Number(valArea));
    const conservativeValue = Math.round(fairValue * 0.92);
    const premiumValue = Math.round(fairValue * 1.14);
    const estDays = fairValue > 15000000 ? '28 - 45 Days' : '14 - 24 Days';
    const matchingBuyers = Math.min(48, Math.max(7, Math.round(valArea / 180)));

    return {
      rate: Math.round(rate),
      fairValue,
      conservativeValue,
      premiumValue,
      estDays,
      matchingBuyers
    };
  };

  const valResult = calculateValuation();

  // ==========================================
  // 2. MULTI-STEP SELLER LISTING FORM STATE
  // ==========================================
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const [formData, setFormData] = useState({
    // Step 1: Identity
    title: '',
    tagline: '',
    category: 'Luxury Villa',
    type: 'buy',
    ownershipType: 'Freehold Title',
    
    // Step 2: Pricing & Specs
    price: 6500000,
    areaSqFt: 6500,
    bedrooms: 5,
    bathrooms: 6,
    garages: 3,
    yearBuilt: 2025,

    // Step 3: Location
    city: 'Los Angeles',
    neighborhood: 'Bel-Air',
    street: '10480 Bellagio Road',
    state: 'CA',
    zipCode: '90077',
    country: 'United States',
    clearances: 'Clear Patta & 35-yr Nil Encumbrance Certificate',

    // Step 4: Amenities & Notes
    amenities: [
      'Infinity Edge Pool',
      'Smart Home Automation',
      '24/7 Gated Security',
      'Private Wine Tasting Cellar',
      'Tesla EV Charging Ports'
    ],
    description: '',
    sellerNotes: '',

    // Step 5: Visuals
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    requestDroneVirtualTour: true,

    // Step 6: Seller Contact & Plan
    sellerName: '',
    sellerEmail: '',
    sellerPhone: '',
    contactPreference: 'Phone',
    planTier: 'spotlight' // 'marketplace' | 'spotlight' | 'vip'
  });

  // Pre-fill listing form from AI Valuation
  const handleApplyValuationToListing = () => {
    setFormData((prev) => ({
      ...prev,
      category: valCategory,
      city: valCity,
      areaSqFt: Number(valArea),
      price: valResult.fairValue,
      title: `${valCategory} in Prime ${valCity}`,
      tagline: `Exceptional ${valArea.toLocaleString()} sq.ft luxury estate with verified documentation`,
      amenities: [
        valHasPool ? 'Infinity Edge Pool' : null,
        valHasSmartHome ? 'Smart Home Automation' : null,
        valHasVaastu ? 'Vaastu & Solar Aligned' : null,
        'Gated Security & Guard Booth',
        'Private Landscaped Grounds'
      ].filter(Boolean)
    }));
    setActiveSection('listing');
    setCurrentStep(1);
    // Smooth scroll to form
    const el = document.getElementById('seller-intake-wizard');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const luxuryPhotoPresets = [
    {
      title: 'Modern Bel-Air Villa',
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85'
    },
    {
      title: 'High-Floor Skyline Penthouse',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85'
    },
    {
      title: 'Waterfront Bayfront Sanctuary',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    },
    {
      title: 'Prime Gated Land Acreage',
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85'
    }
  ];

  const toggleAmenity = (amenityName) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenityName);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenityName)
          : [...prev.amenities, amenityName]
      };
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep < 6) setCurrentStep((s) => s + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmitListing = (e) => {
    e.preventDefault();

    if (!formData.sellerName || !formData.sellerPhone) {
      alert('Please provide your name and contact phone number to finalize your seller listing mandate.');
      return;
    }

    const res = submitSellerListing({
      ...formData,
      price: Number(formData.price),
      areaSqFt: Number(formData.areaSqFt),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      garages: Number(formData.garages),
      currency: currency === 'INR' ? '₹' : '$',
      isLand: formData.category === 'Empty Land'
    });

    setSubmissionResult(res);
    setIsSubmitted(true);
  };

  const handleDownloadDossier = () => {
    if (!submissionResult) return;
    const dossierText = `========================================================================
   JK REALTY LUXURY SELLER MANDATE INTAKE CERTIFICATE
   Reference Code : ${submissionResult.trackingRef}
   Submission Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
========================================================================

PROPERTY DETAILS:
  Title             : ${formData.title || 'Exclusive Seller Property'}
  Category          : ${formData.category}
  Asking Price      : ${currency === 'INR' ? '₹' : '$'}${Number(formData.price).toLocaleString()}
  Built-up / Plot   : ${Number(formData.areaSqFt).toLocaleString()} Sq Ft
  Location          : ${formData.street}, ${formData.neighborhood}, ${formData.city}, ${formData.state}
  Ownership Type    : ${formData.ownershipType}
  Title Clearances  : ${formData.clearances}

SELLER INFORMATION:
  Owner Name        : ${formData.sellerName}
  Contact Phone     : ${formData.sellerPhone}
  Email Address     : ${formData.sellerEmail || 'Not provided'}
  Preferred Channel : ${formData.contactPreference}
  Selected Mandate  : ${formData.planTier.toUpperCase()} REPRESENTATION TIER

REPRESENTATION PRIVILEGES:
  - Listed on JK Realty Global Marketplace & Syndication Desks
  - Dedicated Senior Valuation & Closing Escrow Officer Assigned
  - Complimentary 4K Cinematography & 3D Spatial Staging Request Logged
  - Direct Matching with 12,000+ Pre-Vetted High-Net-Worth Buyers

For inquiries regarding this mandate, quote Reference Code: ${submissionResult.trackingRef}
Hotline: +1 (800) 555-REALTY | Email: sellers@jkrealty.com
========================================================================`;

    const blob = new Blob([dossierText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JK_Realty_Seller_Mandate_${submissionResult.trackingRef}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-16 pb-24 bg-[#FAF8F5] text-[#1F2937]">
      
      {/* 1. LUXURY SELLER HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1E3A5F] via-[#162C48] to-[#1E3A5F] text-white pt-16 pb-20 px-4 sm:px-8">
        
        {/* Architectural Ambient Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80"
            alt="Luxury Architecture"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-8">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Owner & Broker Advisory
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-[10px] font-semibold uppercase tracking-wider">
              Zero Upfront Listing Fee
            </span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif leading-tight text-white tracking-wide">
              Sell Your Luxury Property With Absolute Discretion & Maximum Valuation
            </h1>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              Unlock unmatched global exposure to 12,000+ pre-vetted family offices, institutional investors, and sovereign buyers. Experience algorithmic pricing accuracy, 3D spatial staging, and swift escrow closing.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-[#D4AF37]">$3.2 Billion+</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Volume Closed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-white">24 Days</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Average Time to Offer</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-[#D4AF37]">99.4%</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Asking Price Realized</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-white">12,000+</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Verified Global Buyers</div>
            </div>
          </div>

          {/* Section Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                setActiveSection('valuation');
                const el = document.getElementById('seller-valuation-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg ${
                activeSection === 'valuation'
                  ? 'bg-[#D4AF37] text-[#1E3A5F] shadow-[#D4AF37]/20 scale-102'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              <span>AI Instant Valuation</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('listing');
                const el = document.getElementById('seller-intake-wizard');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg ${
                activeSection === 'listing'
                  ? 'bg-[#D4AF37] text-[#1E3A5F] shadow-[#D4AF37]/20 scale-102'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <Building2 className="w-4 h-4 stroke-[2.5]" />
              <span>List Property Now (6 Steps)</span>
            </button>
          </div>

        </div>

      </section>

      {/* 2. AI INSTANT HOME VALUATION & SELLER YIELD ESTIMATOR */}
      <section id="seller-valuation-section" className="max-w-6xl mx-auto px-4 sm:px-8 scroll-mt-28">
        
        <div className="bg-white rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-card space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-black text-[#8A5A00] uppercase tracking-[0.25em] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Algorithmic Appraisal Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
                Instant AI Seller Valuation Calculator
              </h2>
              <p className="text-xs text-[#4B5563] mt-1">
                Estimate fair market value, target premium list price, and active qualified buyers waiting in our private vault.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">Active Currency:</span>
              <span className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-gray-200 text-[#1E3A5F] font-bold text-xs">
                {currency}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form: Valuation Parameters (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                    Property Category
                  </label>
                  <select
                    value={valCategory}
                    onChange={(e) => setValCategory(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Duplex Penthouse">Duplex Penthouse</option>
                    <option value="Empty Land">Empty Land & Plot</option>
                    <option value="Waterfront Estate">Waterfront Estate</option>
                    <option value="Modern Apartment">Modern Apartment</option>
                    <option value="Commercial Space">Commercial Space</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                    Metro / City Location
                  </label>
                  <select
                    value={valCity}
                    onChange={(e) => setValCity(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Los Angeles">Los Angeles (Bel-Air, Beverly Hills)</option>
                    <option value="New York">New York (Manhattan, Central Park)</option>
                    <option value="Miami">Miami (Star Island, Biscayne Bay)</option>
                    <option value="Chennai">Chennai (Tambaram, OMR, ECR)</option>
                    <option value="San Francisco">San Francisco / Silicon Valley</option>
                  </select>
                </div>
              </div>

              {/* Area Slider */}
              <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center text-xs font-bold text-[#1E3A5F]">
                  <span>Built-up / Plot Area:</span>
                  <span className="text-[#8A5A00] font-black text-sm">
                    {valArea.toLocaleString()} {unit === 'sqft' ? 'Sq. Ft.' : 'Sq. Meters'}
                  </span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="25000"
                  step="100"
                  value={valArea}
                  onChange={(e) => setValArea(Number(e.target.value))}
                  className="w-full accent-[#1E3A5F] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                  <span>800 sq.ft</span>
                  <span>10,000 sq.ft</span>
                  <span>25,000 sq.ft</span>
                </div>
              </div>

              {/* Condition & Road Width */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                    Construction Age / Condition
                  </label>
                  <select
                    value={valCondition}
                    onChange={(e) => setValCondition(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="brand_new">Brand New (2025-2026 Completed)</option>
                    <option value="pristine">Pristine / Recently Upgraded</option>
                    <option value="classic">Well Maintained Luxury Classic</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                    Road Access Frontage
                  </label>
                  <select
                    value={valRoadWidth}
                    onChange={(e) => setValRoadWidth(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="avenue">60ft+ Main Arterial Boulevard</option>
                    <option value="40ft">40ft Wide Asphalt Tar Road</option>
                    <option value="standard">Standard 24ft Gated Enclave Road</option>
                  </select>
                </div>
              </div>

              {/* Value Driver Toggles */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block">
                  Key Value Drivers & Premiums
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setValHasPool(!valHasPool)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      valHasPool
                        ? 'bg-amber-50 text-[#1E3A5F] border-[#D4AF37] font-bold'
                        : 'bg-white text-gray-400 border-gray-200'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${valHasPool ? 'text-[#8A5A00]' : 'opacity-0'}`} />
                    <span>Private Pool</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValHasSmartHome(!valHasSmartHome)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      valHasSmartHome
                        ? 'bg-amber-50 text-[#1E3A5F] border-[#D4AF37] font-bold'
                        : 'bg-white text-gray-400 border-gray-200'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${valHasSmartHome ? 'text-[#8A5A00]' : 'opacity-0'}`} />
                    <span>Smart Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValHasVaastu(!valHasVaastu)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      valHasVaastu
                        ? 'bg-amber-50 text-[#1E3A5F] border-[#D4AF37] font-bold'
                        : 'bg-white text-gray-400 border-gray-200'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${valHasVaastu ? 'text-[#8A5A00]' : 'opacity-0'}`} />
                    <span>Vaastu / North-East</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValHasClearTitle(!valHasClearTitle)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      valHasClearTitle
                        ? 'bg-amber-50 text-[#1E3A5F] border-[#D4AF37] font-bold'
                        : 'bg-white text-gray-400 border-gray-200'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${valHasClearTitle ? 'text-[#8A5A00]' : 'opacity-0'}`} />
                    <span>Clear Freehold</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Output: Live Appraisal Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#FAF8F5] to-[#F5F2EB] p-6 rounded-3xl border border-[#D4AF37]/40 space-y-6 shadow-sm">
              
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8A5A00] block">
                  Algorithmic Fair Market Valuation
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#1E3A5F] font-serif">
                  {formatLocalizedPrice(valResult.fairValue, currency)}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Est. Rate: <strong className="text-[#1E3A5F]">{formatLocalizedPrice(valResult.rate, currency)}</strong> / sq.ft
                </div>
              </div>

              {/* Scenarios Table */}
              <div className="space-y-2.5 pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Quick Liquidity (14 Days):</span>
                  <span className="font-bold text-[#1E3A5F]">
                    {formatLocalizedPrice(valResult.conservativeValue, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Target Premium List Price:</span>
                  <span className="font-bold text-emerald-800">
                    {formatLocalizedPrice(valResult.premiumValue, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Est. Average Time to Offer:</span>
                  <span className="font-bold text-[#1E3A5F]">{valResult.estDays}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Matching Vault Buyers:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    {valResult.matchingBuyers} Pre-Vetted HNW Leads
                  </span>
                </div>
              </div>

              {/* Apply Valuation CTA */}
              <button
                type="button"
                onClick={handleApplyValuationToListing}
                className="w-full py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg border border-[#D4AF37]/30 group"
              >
                <span>USE THIS VALUATION TO LIST</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-[10px] text-gray-400 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8A5A00]" />
                <span>Private & confidential. Zero impact on tax public registry.</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 3. MULTI-STEP LUXURY LISTING INTAKE PORTAL */}
      <section id="seller-intake-wizard" className="max-w-6xl mx-auto px-4 sm:px-8 scroll-mt-28">
        
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-12 shadow-card space-y-8">
          
          {/* Header & Step Tracker */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-black text-[#8A5A00] uppercase tracking-[0.25em] block mb-1">
                  Owner Representation Portal
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
                  List Your Property for Sale
                </h2>
                <p className="text-xs text-[#4B5563] mt-0.5">
                  Complete the 6-step intake to publish your property on the JK Realty global marketplace.
                </p>
              </div>

              <div className="text-xs font-bold text-[#1E3A5F] bg-[#FAF8F5] px-4 py-2 rounded-xl border border-gray-200">
                Step <span className="text-[#8A5A00]">{currentStep}</span> of 6
              </div>
            </div>

            {/* Step Progress Indicators */}
            <div className="grid grid-cols-6 gap-2">
              {[
                '1. Identity',
                '2. Price & Specs',
                '3. Location',
                '4. Amenities',
                '5. Photos',
                '6. Contact & Plan'
              ].map((stepLabel, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;
                return (
                  <div key={idx} className="space-y-1">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-600'
                          : isCurrent
                          ? 'bg-[#1E3A5F]'
                          : 'bg-gray-100'
                      }`}
                    />
                    <span
                      className={`hidden md:block text-[10px] font-semibold truncate ${
                        isCurrent
                          ? 'text-[#1E3A5F] font-bold'
                          : isCompleted
                          ? 'text-emerald-700'
                          : 'text-gray-400'
                      }`}
                    >
                      {stepLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Wizard */}
          {!isSubmitted ? (
            <form onSubmit={currentStep === 6 ? handleSubmitListing : handleNextStep} className="space-y-8">
              
              {/* STEP 1: PROPERTY IDENTITY */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-[#1E3A5F] font-serif border-b border-gray-100 pb-2">
                    Step 1: Property Identity & Categorization
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Property Listing Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. The Bel-Air Crown Obsidian Villa or 2,400 Sq.Ft Prime Corner Plot"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Key Architectural Tagline
                      </label>
                      <input
                        type="text"
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        placeholder="e.g. Ultra-modern architectural masterpiece with panoramic sunset vistas"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Property Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Luxury Villa">Luxury Villa</option>
                        <option value="Penthouse">Duplex Penthouse</option>
                        <option value="Empty Land">Empty Land & Villa Plot</option>
                        <option value="Waterfront Estate">Waterfront Estate</option>
                        <option value="Modern Apartment">Modern Apartment / Flat</option>
                        <option value="Commercial Space">Commercial Space / Office</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Ownership & Title Type
                      </label>
                      <select
                        value={formData.ownershipType}
                        onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Freehold Title">100% Clear Freehold Title</option>
                        <option value="Patta & CMDA/DTCP Sanctioned">Clear Patta & CMDA/DTCP Approved</option>
                        <option value="RERA Registered">RERA Registered Compound</option>
                        <option value="Corporate / Trust Ownership">Corporate / Family Trust Held</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PRICING & DIMENSIONS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-[#1E3A5F] font-serif border-b border-gray-100 pb-2">
                    Step 2: Asking Price & Architectural Dimensions
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Asking Price ({currency}) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-bold text-[#1E3A5F] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="text-[10px] text-gray-500 mt-1 block">
                        Formatted: {formatLocalizedPrice(formData.price, currency)}
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Total Built-up / Plot Area (Sq Ft) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.areaSqFt}
                        onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="text-[10px] text-gray-500 mt-1 block">
                        Rate: ~{Math.round(formData.price / (formData.areaSqFt || 1)).toLocaleString()} / sq.ft
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Garages / Parking Bays
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.garages}
                        onChange={(e) => setFormData({ ...formData, garages: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Year Built / Delivery Date
                      </label>
                      <input
                        type="number"
                        value={formData.yearBuilt}
                        onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: LOCATION & LEGAL CLEARANCES */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-[#1E3A5F] font-serif border-b border-gray-100 pb-2">
                    Step 3: Location & Clear Title Clearances
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Street Address or Plot No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        placeholder="e.g. 10480 Bellagio Road or Plot 28, Royal Avenue"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Neighborhood / Locality *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        placeholder="e.g. Bel-Air or Tambaram West"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Los Angeles or Chennai"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="e.g. CA or Tamil Nadu"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. United States or India"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Legal Document Clearance Notes
                      </label>
                      <input
                        type="text"
                        value={formData.clearances}
                        onChange={(e) => setFormData({ ...formData, clearances: e.target.value })}
                        placeholder="e.g. 35-yr Nil Encumbrance Certificate, CMDA Planning Permit No. 1142/2024, Single Freehold Owner"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: AMENITIES & HIGHLIGHTS */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-[#1E3A5F] font-serif border-b border-gray-100 pb-2">
                    Step 4: Luxury Amenities & Architectural Description
                  </h3>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block">
                      Select Key Features & Amenities
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {[
                        'Infinity Edge Pool',
                        'Smart Home Automation',
                        'Private Spa & Sauna',
                        'Wine Tasting Cellar',
                        'Tesla EV Charging Ports',
                        '24/7 Gated Security',
                        'Panoramic City Views',
                        'Private Cinema Room',
                        'Private Helipad Envelope',
                        'Vaastu Compliant',
                        '3-Phase Underground EB',
                        'Sweet Potable Groundwater'
                      ].map((amenity) => {
                        const selected = formData.amenities.includes(amenity);
                        return (
                          <button
                            type="button"
                            key={amenity}
                            onClick={() => toggleAmenity(amenity)}
                            className={`p-3 rounded-xl border text-xs text-left font-medium transition-all flex items-center justify-between ${
                              selected
                                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm font-semibold'
                                : 'bg-[#FAF8F5] text-gray-700 border-gray-200 hover:border-[#D4AF37]'
                            }`}
                          >
                            <span>{amenity}</span>
                            {selected && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Detailed Public Property Description
                      </label>
                      <textarea
                        rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Provide details about spatial layout, Italian finishes, ceiling heights, landscape architecture, and view corridors..."
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Private Seller Notes (Confidential to JK Advisory Team)
                      </label>
                      <input
                        type="text"
                        value={formData.sellerNotes}
                        onChange={(e) => setFormData({ ...formData, sellerNotes: e.target.value })}
                        placeholder="e.g. Preferred closing date within 45 days, open to partial cash/equity, NDA required before viewings..."
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: VISUAL ASSETS & VIRTUAL TOUR */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-[#1E3A5F] font-serif border-b border-gray-100 pb-2">
                    Step 5: Visual Media & 360° Spatial Tour
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Primary Cover Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Image Presets */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                        Or select a sample luxury preset image:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {luxuryPhotoPresets.map((preset, idx) => (
                          <div
                            key={idx}
                            onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                            className={`cursor-pointer group rounded-xl overflow-hidden border-2 transition-all ${
                              formData.imageUrl === preset.url
                                ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-md'
                                : 'border-transparent hover:border-gray-300 opacity-75 hover:opacity-100'
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={preset.url}
                              alt={preset.title}
                              className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-1.5 bg-white text-[10px] font-bold text-[#1E3A5F] truncate text-center">
                              {preset.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 360 Drone Staging Box */}
                    <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#D4AF37]/40 flex items-start gap-3 mt-4">
                      <input
                        type="checkbox"
                        id="droneCheckbox"
                        checked={formData.requestDroneVirtualTour}
                        onChange={(e) => setFormData({ ...formData, requestDroneVirtualTour: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-[#1E3A5F] cursor-pointer"
                      />
                      <label htmlFor="droneCheckbox" className="text-xs text-[#1F2937] cursor-pointer">
                        <strong className="block text-[#1E3A5F] font-bold">
                          Request Complimentary JK Realty 4K Drone & Spatial 360° Virtual Tour Crew
                        </strong>
                        <span className="text-gray-500">
                          Our architectural cinematography team will capture ultra-high-resolution aerial drone footage and Matterport-compatible 360° walk-through scans for verified buyers.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: SELLER CONTACT & PLAN TIER */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-[#1E3A5F] font-serif border-b border-gray-100 pb-2">
                    Step 6: Seller Contact Details & Representation Mandate
                  </h3>

                  {/* Owner Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Owner / Representative Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.sellerName}
                        onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                        placeholder="e.g. Julian Montgomery or S. Ramanujam"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Direct Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.sellerPhone}
                        onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
                        placeholder="+1 (310) 555-0199 or +91 98400 12345"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.sellerEmail}
                        onChange={(e) => setFormData({ ...formData, sellerEmail: e.target.value })}
                        placeholder="julian@montgomerycapital.com"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1.5">
                        Preferred Contact Method
                      </label>
                      <select
                        value={formData.contactPreference}
                        onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-[#1F2937] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Phone">Direct Phone Call</option>
                        <option value="WhatsApp">WhatsApp Message</option>
                        <option value="Email">Email Communication</option>
                      </select>
                    </div>
                  </div>

                  {/* Plan Tier Selection */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block">
                      Choose Your Representation Tier
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Tier 1: Free Marketplace */}
                      <div
                        onClick={() => setFormData({ ...formData, planTier: 'marketplace' })}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-2.5 ${
                          formData.planTier === 'marketplace'
                            ? 'border-[#1E3A5F] bg-[#FAF8F5] shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase text-[#1E3A5F]">Marketplace</span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                            FREE TO LIST
                          </span>
                        </div>
                        <div className="text-lg font-bold text-[#1E3A5F]">1.5% at Closing</div>
                        <p className="text-[11px] text-gray-500">
                          Listed on JK Realty public portal, basic buyer inquiries routed directly to your phone.
                        </p>
                      </div>

                      {/* Tier 2: Spotlight Premier (Recommended) */}
                      <div
                        onClick={() => setFormData({ ...formData, planTier: 'spotlight' })}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-2.5 relative ${
                          formData.planTier === 'spotlight'
                            ? 'border-[#D4AF37] bg-amber-50/40 shadow-lg ring-1 ring-[#D4AF37]'
                            : 'border-gray-200 hover:border-[#D4AF37] bg-white'
                        }`}
                      >
                        <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#8A5A00] text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                          POPULAR
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase text-[#8A5A00]">Spotlight Premier</span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-[#8A5A00]">
                            RECOMMENDED
                          </span>
                        </div>
                        <div className="text-lg font-bold text-[#1E3A5F]">2.0% at Closing</div>
                        <p className="text-[11px] text-gray-600">
                          Featured homepage placement, AI buyer vault matching, complimentary 4K drone cinematography.
                        </p>
                      </div>

                      {/* Tier 3: White-Glove VIP */}
                      <div
                        onClick={() => setFormData({ ...formData, planTier: 'vip' })}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-2.5 ${
                          formData.planTier === 'vip'
                            ? 'border-[#1E3A5F] bg-[#FAF8F5] shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase text-[#1E3A5F]">White-Glove VIP</span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#1E3A5F] text-white">
                            OFF-MARKET
                          </span>
                        </div>
                        <div className="text-lg font-bold text-[#1E3A5F]">Bespoke Terms</div>
                        <p className="text-[11px] text-gray-500">
                          Total privacy in our unlisted client vault, Rolls-Royce/Chauffeur escorted viewings, global PR syndicate.
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 text-xs font-bold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-2 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {currentStep < 6 ? (
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-md hover:shadow-lg group"
                  >
                    <span>Proceed to Step {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-9 py-4 rounded-xl bg-[#8A5A00] hover:bg-[#724a00] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-xl hover:scale-102 group cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SUBMIT & PUBLISH PROPERTY</span>
                  </button>
                )}
              </div>

            </form>
          ) : (
            
            /* SUCCESS CONFIRMATION STATE */
            <div className="space-y-8 text-center py-6 animate-in zoom-in-95 duration-500">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-[#8A5A00] font-mono font-bold text-xs">
                  Reference: {submissionResult?.trackingRef}
                </span>
                <h3 className="text-3xl font-black text-[#1E3A5F] font-serif">
                  Property Listed Successfully!
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your luxury estate mandate has been registered and added to the JK Realty portfolio. A senior advisory partner has been assigned to verify title documents and initiate qualified buyer matchmaking.
                </p>
              </div>

              {/* Created Property Preview Card */}
              {submissionResult?.property && (
                <div className="max-w-md mx-auto bg-[#FAF8F5] p-4 rounded-2xl border border-[#D4AF37]/40 text-left shadow-sm flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={submissionResult.property.images[0]}
                    alt={submissionResult.property.title}
                    className="w-24 h-20 rounded-xl object-cover border border-gray-200"
                  />
                  <div className="space-y-1 overflow-hidden">
                    <span className="px-2 py-0.5 rounded-full bg-white text-[9px] font-bold text-[#8A5A00] border border-amber-200">
                      {submissionResult.property.category}
                    </span>
                    <h4 className="font-bold text-sm text-[#1E3A5F] truncate">
                      {submissionResult.property.title}
                    </h4>
                    <div className="text-xs font-serif font-black text-emerald-800">
                      {formatLocalizedPrice(submissionResult.property.price, currency)}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {submissionResult.property.address.city}, {submissionResult.property.address.state}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <Link
                  href="/properties"
                  className="px-6 py-3 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#162c48] transition-all shadow-md"
                >
                  View in Properties Catalog
                </Link>

                <button
                  type="button"
                  onClick={handleDownloadDossier}
                  className="px-6 py-3 rounded-xl bg-white border border-[#D4AF37] text-[#1E3A5F] text-xs font-bold uppercase tracking-wider hover:bg-amber-50 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-[#8A5A00]" />
                  <span>Download Mandate Dossier</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({
                      title: '',
                      tagline: '',
                      category: 'Luxury Villa',
                      type: 'buy',
                      ownershipType: 'Freehold Title',
                      price: 5000000,
                      areaSqFt: 5000,
                      bedrooms: 4,
                      bathrooms: 5,
                      garages: 2,
                      yearBuilt: 2025,
                      city: 'Los Angeles',
                      neighborhood: 'Bel-Air',
                      street: '',
                      state: 'CA',
                      zipCode: '90077',
                      country: 'United States',
                      clearances: 'Clear Title Verified',
                      amenities: ['Smart Home Automation', '24/7 Gated Security'],
                      description: '',
                      sellerNotes: '',
                      imageUrl: luxuryPhotoPresets[0].url,
                      requestDroneVirtualTour: true,
                      sellerName: '',
                      sellerEmail: '',
                      sellerPhone: '',
                      contactPreference: 'Phone',
                      planTier: 'spotlight'
                    });
                  }}
                  className="px-5 py-3 rounded-xl text-gray-500 hover:text-black text-xs font-semibold"
                >
                  List Another Property
                </button>
              </div>

            </div>
          )}

        </div>

      </section>

      {/* 4. WHY LIST WITH JK REALTY (SELLER ADVANTAGES) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-black text-[#8A5A00] uppercase tracking-[0.25em]">
            The JK Representation Advantage
          </span>
          <h2 className="text-3xl font-black text-[#1E3A5F] font-serif">
            Why Discerning Sellers Entrust JK Realty
          </h2>
          <p className="text-xs text-gray-600">
            A bespoke private brokerage model tailored for architectural estates and trophy land holdings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-card space-y-3 hover:border-[#D4AF37] transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8A5A00] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1E3A5F]">Total NDA Discretion</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We protect family wealth privacy. Properties can remain unlisted from public registries and shared strictly with vetted buyers after pre-qualification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-card space-y-3 hover:border-[#D4AF37] transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8A5A00] flex items-center justify-center font-bold">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1E3A5F]">4K Drone & 3D Spatial Staging</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Complementary architectural cinematography captures view corridors, dusk aesthetics, and room transitions to captivate cross-border remote buyers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-card space-y-3 hover:border-[#D4AF37] transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8A5A00] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1E3A5F]">Legal Escrow & Title Defense</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our in-house legal counsel certifies Patta, CMDA/DTCP sanctions, and Nil Encumbrance documentation, removing friction during negotiation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SELLER FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-black text-[#8A5A00] uppercase tracking-[0.25em]">
            Clarity & Guidance
          </span>
          <h2 className="text-2xl font-black text-[#1E3A5F] font-serif">
            Frequently Asked Seller Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Is there any upfront cost to list my property on JK Realty?',
              a: 'No. Listing on JK Realty is completely free of any upfront fees. Our success commission is only payable upon the successful execution and registered closing of the sale deed.'
            },
            {
              q: 'How accurate is the AI Instant Valuation Tool?',
              a: 'Our algorithmic valuation model combines real-time registry transaction benchmarks, neighborhood historical trendlines, road width premiums, and spatial amenities to provide a 96.8% accuracy corridor.'
            },
            {
              q: 'Can I sell my property privately without public photos or addresses?',
              a: 'Yes. With our White-Glove VIP Mandate, your property is placed exclusively in our private off-market vault. Details are shared under strict Non-Disclosure Agreements with vetted buyers only.'
            },
            {
              q: 'How long does the verification and live publishing process take?',
              a: 'Once submitted through this portal, your property is instantly registered. A dedicated JK Realty advisor will verify your title clearance notes within 24 business hours to award the verified seller badge.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <h4 className="font-bold text-xs sm:text-sm text-[#1E3A5F] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{item.q}</span>
              </h4>
              <p className="text-xs text-gray-500 pl-6 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
