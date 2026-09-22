'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  Activity, 
  Calculator, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  Building2,
  Trees
} from 'lucide-react';
import AreaMarketRateIntelligence from '../../components/AreaMarketRateIntelligence';

export default function AreaIntelligencePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] hover:text-[#8A5A00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#8A5A00]" />
          <span>Back to Properties Catalog</span>
        </Link>

        <Link
          href="/properties/prop-13"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-all shadow-xs"
        >
          <Trees className="w-4 h-4 text-emerald-700" />
          <span>View Featured Tambaram Plot (2,400 Sq.Ft)</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF5] border border-[#8A5A00]/40 text-[#8A5A00] text-xs font-black uppercase tracking-wider shadow-xs">
          <Sparkles className="w-4 h-4 text-[#8A5A00]" />
          <span>Institutional Real Estate Analytics & Cadastral Market Valuation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1E3A5F] font-serif tracking-tight drop-shadow-xs">
          Area Market Rate Intelligence System
        </h1>
        <p className="text-sm sm:text-base text-[#374151] font-medium leading-relaxed max-w-2xl mx-auto">
          Comprehensive market rate dashboard with algorithmic formula pricing, 1-year growth trajectory charts, multi-source verified registries, broker rate submissions, and predictive infrastructure impact analysis.
        </p>
      </div>

      {/* Main Intelligence Engine */}
      <AreaMarketRateIntelligence initialAreaId="tambaram" />

    </div>
  );
}
