'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShoppingBag, 
  Key, 
  TrendingUp, 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  DollarSign,
  ShieldCheck,
  Send
} from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { useRealEstateStore } from '../../lib/store';

export default function ServicesPage() {
  const { currency } = useRealEstateStore();
  // Valuation Form State
  const [valuationData, setValuationData] = useState({
    propertyType: 'Luxury Villa',
    city: 'Los Angeles',
    sqFt: 8500,
    bedrooms: 5,
    bathrooms: 6,
    yearBuilt: 2022,
    hasPool: true,
    hasSmartHome: true,
    hasWineCellar: false,
    hasWaterfront: false
  });

  const [valuationResult, setValuationResult] = useState(null);

  const calculateEstimate = (e) => {
    e.preventDefault();
    
    // Algorithmic valuation baseline
    let baseRatePerSqFt = 1200;
    if (valuationData.city === 'Los Angeles') baseRatePerSqFt = 1600;
    if (valuationData.city === 'New York') baseRatePerSqFt = 2400;
    if (valuationData.city === 'Miami Beach') baseRatePerSqFt = 1800;
    if (valuationData.city === 'Silicon Valley') baseRatePerSqFt = 1750;

    if (valuationData.propertyType === 'Penthouse') baseRatePerSqFt *= 1.35;
    if (valuationData.propertyType === 'Waterfront Estate') baseRatePerSqFt *= 1.45;
    if (valuationData.propertyType === 'Commercial Office') baseRatePerSqFt *= 0.85;

    let totalVal = valuationData.sqFt * baseRatePerSqFt;
    if (valuationData.hasPool) totalVal += 350000;
    if (valuationData.hasSmartHome) totalVal += 150000;
    if (valuationData.hasWineCellar) totalVal += 200000;
    if (valuationData.hasWaterfront) totalVal *= 1.25;

    const lowerBound = Math.round(totalVal * 0.94);
    const upperBound = Math.round(totalVal * 1.06);

    setValuationResult({
      estimatedValue: Math.round(totalVal),
      lowerBound,
      upperBound,
      ratePerSqFt: Math.round(totalVal / valuationData.sqFt)
    });
  };

  const services = [
    {
      icon: ShoppingBag,
      title: 'Trophy Property Acquisition',
      subtitle: 'Buyer Representation',
      desc: 'Confidential buyer mandate for unlisted estates, penthouses, and rare architectural masterpieces. We coordinate discreet viewings, technical property inspection, zoning review, and master contract negotiation.',
      points: [
        'Exclusive access to unlisted off-market private vaults',
        'Helicopter and luxury chauffeur-escorted property tours',
        'Structured deal terms, escrow handling & title insurance'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Global High-End Property Selling',
      subtitle: 'Seller Representation',
      desc: 'Bespoke global syndication strategies targeting ultra-high-net-worth family offices and international buyers. Supported by 360° virtual tours, 4K architectural cinematography, and editorial press features.',
      points: [
        'Proprietary network of 12,000+ accredited verified buyers',
        'Featured placement across Aura Portal & global media',
        'Confidential NDA-guarded viewings with zero public friction'
      ]
    },
    {
      icon: Key,
      title: 'Luxury Leasing & Corporate Suites',
      subtitle: 'Rental Management',
      desc: 'Turnkey high-end leasing for prime residences, duplex penthouses, and corporate executive headquarters. Fully vetted institutional tenants with complete security vetting.',
      points: [
        'Premium long-term and short-term architectural leases',
        'Corporate relocation services for C-suite executives',
        'White-glove lease contract drafting and escrow management'
      ]
    },
    {
      icon: Calculator,
      title: 'Portfolio Valuation & Advisory',
      subtitle: 'Asset Appraisals',
      desc: 'Rigorous comparative market analysis, yield projections, and replacement cost modeling for estate planning, collateralized debt, and acquisition underwriting.',
      points: [
        'Comprehensive econometric appraisal reports',
        'Tax-efficient asset exchange structuring',
        'Commercial tenant covenant analysis'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 bg-[#FAF8F5] text-[#1F2937]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#1E3A5F] text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#8A5A00]" />
          <span>Full-Spectrum Real Estate Services</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1E3A5F] font-serif leading-tight">
          Bespoke Real Estate <span className="gold-gradient-text">Advisory & Representation</span>
        </h1>
        <p className="text-sm sm:text-base text-[#374151] font-medium">
          From private off-market acquisitions and global marketing to algorithmic asset valuations.
        </p>
      </div>

      {/* 4 Core Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-[#D4AF37] space-y-5 flex flex-col justify-between shadow-card transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
                    <Icon className="w-6 h-6 text-[#1E3A5F]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8A5A00] block">
                      {srv.subtitle}
                    </span>
                    <h3 className="text-xl font-black text-[#1E3A5F] font-serif">{srv.title}</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#374151] font-normal leading-relaxed">
                  {srv.desc}
                </p>

                <ul className="space-y-2 pt-2 text-xs text-[#1F2937]">
                  {srv.points.map((pt, pidx) => (
                    <li key={pidx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="font-medium">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="text-xs text-[#1E3A5F] hover:text-[#8A5A00] font-black flex items-center gap-1 transition-colors"
                >
                  <span>Request Service Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE PROPERTY VALUATION ESTIMATOR TOOL */}
      <div id="valuation" className="scroll-mt-24 bg-white p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/50 shadow-card space-y-8">
        
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] text-[#1E3A5F] text-xs font-bold border border-[#D4AF37]/40 shadow-2xs">
            <Calculator className="w-3.5 h-3.5 text-[#8A5A00]" />
            <span>Instant Algorithmic Valuation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E3A5F] font-serif">
            Free Online Property Valuation Estimator
          </h2>
          <p className="text-xs sm:text-sm text-[#374151] font-medium leading-relaxed">
            Estimate your estate&apos;s current market value using real-time neighborhood metrics, luxury amenity multipliers, and prime price-per-square-foot benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Form */}
          <form onSubmit={calculateEstimate} className="lg:col-span-7 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                  Property Category
                </label>
                <select
                  value={valuationData.propertyType}
                  onChange={(e) => setValuationData({ ...valuationData, propertyType: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-semibold"
                >
                  <option value="Luxury Villa">Luxury Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Modern Apartment">Modern Apartment</option>
                  <option value="Waterfront Estate">Waterfront Estate</option>
                  <option value="Commercial Office">Commercial Office</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                  Enclave / Metro City
                </label>
                <select
                  value={valuationData.city}
                  onChange={(e) => setValuationData({ ...valuationData, city: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-semibold"
                >
                  <option value="Los Angeles">Los Angeles (Bel-Air, Beverly Hills)</option>
                  <option value="New York">New York (Manhattan, Central Park)</option>
                  <option value="Miami Beach">Miami Beach (Venetian Islands)</option>
                  <option value="Silicon Valley">Silicon Valley (Los Altos Hills)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                  Interior SqFt
                </label>
                <input
                  type="number"
                  required
                  min={1000}
                  max={50000}
                  step={100}
                  value={valuationData.sqFt}
                  onChange={(e) => setValuationData({ ...valuationData, sqFt: Number(e.target.value) })}
                  className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-semibold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={valuationData.bedrooms}
                  onChange={(e) => setValuationData({ ...valuationData, bedrooms: Number(e.target.value) })}
                  className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-semibold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={valuationData.bathrooms}
                  onChange={(e) => setValuationData({ ...valuationData, bathrooms: Number(e.target.value) })}
                  className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-semibold"
                />
              </div>
            </div>

            {/* Feature Checkboxes */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-2">
                Premium Value Additions
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setValuationData({ ...valuationData, hasPool: !valuationData.hasPool })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all font-bold ${
                    valuationData.hasPool
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                      : 'bg-[#FAF8F5] border-gray-300 text-[#4B5563]'
                  }`}
                >
                  Infinity / Heated Pool
                </button>

                <button
                  type="button"
                  onClick={() => setValuationData({ ...valuationData, hasSmartHome: !valuationData.hasSmartHome })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all font-bold ${
                    valuationData.hasSmartHome
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                      : 'bg-[#FAF8F5] border-gray-300 text-[#4B5563]'
                  }`}
                >
                  Smart Automation & Security
                </button>

                <button
                  type="button"
                  onClick={() => setValuationData({ ...valuationData, hasWineCellar: !valuationData.hasWineCellar })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all font-bold ${
                    valuationData.hasWineCellar
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                      : 'bg-[#FAF8F5] border-gray-300 text-[#4B5563]'
                  }`}
                >
                  Temperature Wine Cellar
                </button>

                <button
                  type="button"
                  onClick={() => setValuationData({ ...valuationData, hasWaterfront: !valuationData.hasWaterfront })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all font-bold ${
                    valuationData.hasWaterfront
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                      : 'bg-[#FAF8F5] border-gray-300 text-[#4B5563]'
                  }`}
                >
                  Waterfront / Yacht Mooring
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all mt-3 border border-[#D4AF37]/40"
            >
              <Calculator className="w-4 h-4 text-[#D4AF37]" />
              <span>Compute Valuation Benchmark</span>
            </button>
          </form>

          {/* Result Output Card */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-3xl border border-gray-300 space-y-5 shadow-sm">
            {valuationResult ? (
              <div className="space-y-5 animate-in zoom-in-95">
                <div className="pb-3 border-b border-gray-200">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#8A5A00] block">
                    Algorithmic Valuation Result
                  </span>
                  <div className="text-3xl font-black text-[#1E3A5F] font-serif mt-1">
                    {formatPrice(valuationResult.estimatedValue, currency)}
                  </div>
                  <span className="text-xs text-[#4B5563] font-semibold">
                    Est. Rate: <strong className="text-[#1E3A5F] font-serif font-black">{formatPrice(valuationResult.ratePerSqFt, currency)}</strong> / sqft
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-white border border-gray-200">
                    <span className="text-[#4B5563] font-semibold">Conservative Range:</span>
                    <span className="text-[#1F2937] font-bold">{formatPrice(valuationResult.lowerBound, currency)}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white border border-gray-200">
                    <span className="text-[#4B5563] font-semibold">Optimistic Range:</span>
                    <span className="text-[#8A5A00] font-black">{formatPrice(valuationResult.upperBound, currency)}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white border border-gray-200">
                    <span className="text-[#4B5563] font-semibold">Est. Marketing Horizon:</span>
                    <span className="text-emerald-800 font-bold">35 - 60 Days</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-2xl text-[11px] text-[#374151] leading-relaxed">
                  💡 This benchmark is an initial calculation. For an official certified appraisal report with escrow representation, book an in-person walkthrough with our Managing Principal.
                </div>

                <Link
                  href="/contact"
                  className="w-full py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Book In-Person Appraisal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto text-[#1E3A5F] shadow-sm">
                  <Sparkles className="w-6 h-6 text-[#8A5A00]" />
                </div>
                <h4 className="text-base font-black text-[#1E3A5F] font-serif">Awaiting Parameter Input</h4>
                <p className="text-xs text-[#4B5563] max-w-xs mx-auto font-medium">
                  Fill in your property dimensions, enclave, and luxury additions to generate an instant estimate.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
