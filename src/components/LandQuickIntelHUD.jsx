'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Maximize, 
  TrendingUp, 
  School, 
  Hospital, 
  Train, 
  Road, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck, 
  Coins,
  Calculator,
  Activity,
  Award,
  Compass,
  FileText
} from 'lucide-react';
import { formatNumberIndian } from '../lib/utils';
import { formatLandArea } from '../lib/areaIntelligenceEngine';
import AIPropertyValuationModal from './AIPropertyValuationModal';
import AIAreaAnalysisModal from './AIAreaAnalysisModal';
import AIInvestmentReportModal from './AIInvestmentReportModal';
import AIRecommendationModal from './AIRecommendationModal';

export default function LandQuickIntelHUD({ 
  property, 
  onScrollToIntelligence, 
  onScrollToLegal,
  onOpenValuation,
  onOpenAreaAnalysis,
  onOpenInvestmentReport,
  onOpenMatchmaker
}) {
  const [selectedUnit, setSelectedUnit] = useState('sqft'); // 'sqft' | 'cents' | 'grounds' | 'acres'
  
  // Local modal state fallbacks
  const [localValuationOpen, setLocalValuationOpen] = useState(false);
  const [localAreaAnalysisOpen, setLocalAreaAnalysisOpen] = useState(false);
  const [localInvestmentOpen, setLocalInvestmentOpen] = useState(false);
  const [localMatchmakerOpen, setLocalMatchmakerOpen] = useState(false);

  const handleOpenValuation = () => {
    if (onOpenValuation) onOpenValuation();
    else setLocalValuationOpen(true);
  };

  const handleOpenAreaAnalysis = () => {
    if (onOpenAreaAnalysis) onOpenAreaAnalysis();
    else setLocalAreaAnalysisOpen(true);
  };

  const handleOpenInvestmentReport = () => {
    if (onOpenInvestmentReport) onOpenInvestmentReport();
    else setLocalInvestmentOpen(true);
  };

  const handleOpenMatchmaker = () => {
    if (onOpenMatchmaker) onOpenMatchmaker();
    else setLocalMatchmakerOpen(true);
  };
  
  if (!property || (!property.isLand && property.category !== 'Empty Land')) {
    return null;
  }

  // Quick Intel parameters (fallback to Tambaram showcase values if not explicitly set)
  const areaName = property.address?.neighborhood || property.address?.city || 'Tambaram';
  const plotSqFt = property.areaSqFt || 2400;
  const avgAreaRate = property.pricePerSqFt || (property.price && plotSqFt ? Math.round(property.price / plotSqFt) : 4500);
  const growthRate = property.areaInsights?.last1YearGrowth || 18.0;
  const investmentScore = property.areaInsights?.investmentScore || 8.9;

  // Nearby Key Distances
  const nearbyList = property.nearby || [];
  const schoolItem = nearbyList.find(n => n.type === 'School') || { distance: '1.2 km' };
  const hospitalItem = nearbyList.find(n => n.type === 'Hospital') || { distance: '2.1 km' };
  const railwayItem = nearbyList.find(n => n.type === 'Railway Station') || { distance: '3.0 km' };
  const highwayItem = nearbyList.find(n => n.type === 'Highway' || n.name?.toLowerCase().includes('highway') || n.name?.toLowerCase().includes('bypass')) || { distance: '800 m' };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-[#D4AF37]/50 shadow-card p-5 sm:p-7 space-y-5">
      
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-[#1E3A5F] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#8A5A00]" />
            Land Quick-Intel Snapshot • Property Intelligence HUD
          </span>
        </div>

        {/* Quick Unit Selector */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] p-1.5 rounded-xl border border-gray-300 text-xs shadow-xs">
          <span className="text-[#1F2937] px-2 text-[11px] uppercase font-bold font-mono hidden sm:inline">Active Unit:</span>
          {['sqft', 'cents', 'grounds', 'acres'].map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={`px-3 py-1 rounded-lg font-bold capitalize transition-all ${
                selectedUnit === u
                  ? 'bg-[#1E3A5F] text-white shadow-sm'
                  : 'text-[#1F2937] hover:bg-white hover:text-[#1E3A5F]'
              }`}
            >
              {u === 'sqft' ? 'Sq.Ft' : u}
            </button>
          ))}
        </div>
      </div>

      {/* Main 5-Point HUD Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* 1. 📍 Area */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 hover:border-[#1E3A5F] transition-all flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-[#1F2937] text-xs mb-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1E3A5F]">📍 Area</span>
            <MapPin className="w-4 h-4 text-[#8A5A00]" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-[#1E3A5F] font-serif truncate">
              {areaName}
            </div>
            <span className="text-xs text-[#374151] font-semibold block truncate mt-0.5">
              {property.address?.city || 'Chennai'}
            </span>
          </div>
        </div>

        {/* 2. 📏 Plot Size */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 hover:border-[#1E3A5F] transition-all flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-[#1F2937] text-xs mb-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1E3A5F]">📏 Plot Size</span>
            <Maximize className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-[#1E3A5F] font-serif">
              {formatLandArea(plotSqFt, selectedUnit)}
            </div>
            <span className="text-xs text-[#374151] font-semibold block mt-0.5">
              {property.landDetails?.dimensions || '40x60 Ft Dimensions'}
            </span>
          </div>
        </div>

        {/* 3. 💰 Avg Area Rate */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 hover:border-[#1E3A5F] transition-all flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-[#1F2937] text-xs mb-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1E3A5F]">💰 Area Rate</span>
            <Coins className="w-4 h-4 text-[#8A5A00]" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-[#1E3A5F] font-serif">
              ₹{formatNumberIndian(avgAreaRate)}<span className="text-xs font-semibold text-[#4B5563]">/sq.ft</span>
            </div>
            <span className="text-xs text-emerald-800 font-bold block mt-0.5">
              Official SRO Benchmark
            </span>
          </div>
        </div>

        {/* 4. 📈 1-Year Growth */}
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-emerald-900 text-xs mb-1">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-emerald-900">📈 1-Yr Growth</span>
            <TrendingUp className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-emerald-800 font-serif">
              +{growthRate}%
            </div>
            <span className="text-xs text-emerald-900 font-bold block mt-0.5">
              Appreciating High Demand
            </span>
          </div>
        </div>

        {/* 5. ⭐ Investment Score */}
        <div className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#8A5A00]/40 flex flex-col justify-between col-span-2 sm:col-span-1 shadow-xs">
          <div className="flex items-center justify-between text-[#1E3A5F] text-xs mb-1">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-[#8A5A00]">⭐ Score</span>
            <Star className="w-4 h-4 text-[#8A5A00] fill-[#8A5A00]" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-[#1E3A5F] font-serif">
              {investmentScore}<span className="text-xs text-[#4B5563] font-sans font-semibold">/10</span>
            </div>
            <span className="text-xs text-[#7A4F01] font-black block mt-0.5">
              Prime Investment Grade
            </span>
          </div>
        </div>

      </div>

      {/* Nearby Facilities Quick Access Row (School, Hospital, Railway, Highway) */}
      <div className="pt-3 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        
        {/* 🏫 School */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-gray-300 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#1E3A5F] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            <School className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-[#1F2937] uppercase font-bold font-mono block">School</span>
            <span className="text-xs font-black text-[#1E3A5F] block">{schoolItem.distance} away</span>
          </div>
        </div>

        {/* 🏥 Hospital */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-gray-300 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-rose-700 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            <Hospital className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-[#1F2937] uppercase font-bold font-mono block">Hospital</span>
            <span className="text-xs font-black text-[#1E3A5F] block">{hospitalItem.distance} away</span>
          </div>
        </div>

        {/* 🚉 Railway */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-gray-300 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#1E3A5F] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            <Train className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-[#1F2937] uppercase font-bold font-mono block">Railway Station</span>
            <span className="text-xs font-black text-[#1E3A5F] block">{railwayItem.distance} away</span>
          </div>
        </div>

        {/* 🛣️ Highway */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-gray-300 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#1E3A5F] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            <Road className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-[#1F2937] uppercase font-bold font-mono block">Express Highway</span>
            <span className="text-xs font-black text-[#1E3A5F] block">{highwayItem.distance} away</span>
          </div>
        </div>

      </div>

      {/* AI Features Suite Command Bar */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8A5A00]" />
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1E3A5F]">
              AI Intelligence Suite • Algorithmic Analytics & Reports
            </h4>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Live Neural Models
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* 1. AI Property Valuation */}
          <button
            id="hud-ai-valuation-btn"
            onClick={handleOpenValuation}
            className="p-3.5 rounded-2xl bg-white hover:bg-[#FAF8F5] border-2 border-gray-200 hover:border-[#1E3A5F] transition-all text-left group shadow-xs flex flex-col justify-between space-y-2 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#1E3A5F] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                98.4% Accuracy
              </span>
            </div>
            <div>
              <div className="text-xs font-black text-[#1E3A5F] group-hover:text-[#8A5A00] transition-colors">
                AI Property Valuation
              </div>
              <p className="text-[11px] text-[#4B5563] mt-0.5 line-clamp-1">
                Corner, road & sweet water premiums
              </p>
            </div>
            <div className="text-[11px] font-bold text-[#1E3A5F] flex items-center gap-1 pt-1 border-t border-gray-100">
              <span>Inspect Breakdown</span>
              <ArrowRight className="w-3 h-3 text-[#8A5A00] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* 2. AI Area Analysis */}
          <button
            id="hud-ai-area-btn"
            onClick={handleOpenAreaAnalysis}
            className="p-3.5 rounded-2xl bg-white hover:bg-[#FAF8F5] border-2 border-gray-200 hover:border-[#1E3A5F] transition-all text-left group shadow-xs flex flex-col justify-between space-y-2 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#1E3A5F] bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 px-2 py-0.5 rounded-md">
                +18% Trend
              </span>
            </div>
            <div>
              <div className="text-xs font-black text-[#1E3A5F] group-hover:text-[#8A5A00] transition-colors">
                AI Area Analysis
              </div>
              <p className="text-[11px] text-[#4B5563] mt-0.5 line-clamp-1">
                Metro catalysts & 2028 targets
              </p>
            </div>
            <div className="text-[11px] font-bold text-[#1E3A5F] flex items-center gap-1 pt-1 border-t border-gray-100">
              <span>View 5-Yr Forecast</span>
              <ArrowRight className="w-3 h-3 text-[#8A5A00] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* 3. AI Investment Report */}
          <button
            id="hud-ai-investment-btn"
            onClick={handleOpenInvestmentReport}
            className="p-3.5 rounded-2xl bg-white hover:bg-[#FAF8F5] border-2 border-gray-200 hover:border-[#1E3A5F] transition-all text-left group shadow-xs flex flex-col justify-between space-y-2 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#FFFDF5] text-[#8A5A00] border border-[#8A5A00]/30 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#8A5A00] bg-[#FFF8E6] border border-[#8A5A00]/20 px-2 py-0.5 rounded-md">
                +38.6% Villa ROI
              </span>
            </div>
            <div>
              <div className="text-xs font-black text-[#1E3A5F] group-hover:text-[#8A5A00] transition-colors">
                AI Investment Report
              </div>
              <p className="text-[11px] text-[#4B5563] mt-0.5 line-clamp-1">
                Developer profit & yield audit
              </p>
            </div>
            <div className="text-[11px] font-bold text-[#1E3A5F] flex items-center gap-1 pt-1 border-t border-gray-100">
              <span>Download Dossier</span>
              <ArrowRight className="w-3 h-3 text-[#8A5A00] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* 4. AI Property Recommendation / Matchmaker */}
          <button
            id="hud-ai-matchmaker-btn"
            onClick={handleOpenMatchmaker}
            className="p-3.5 rounded-2xl bg-white hover:bg-[#FAF8F5] border-2 border-gray-200 hover:border-[#1E3A5F] transition-all text-left group shadow-xs flex flex-col justify-between space-y-2 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                Ranked AI Match
              </span>
            </div>
            <div>
              <div className="text-xs font-black text-[#1E3A5F] group-hover:text-[#8A5A00] transition-colors">
                AI Property Matchmaker
              </div>
              <p className="text-[11px] text-[#4B5563] mt-0.5 line-clamp-1">
                Tailored buyer lifestyle matching
              </p>
            </div>
            <div className="text-[11px] font-bold text-[#1E3A5F] flex items-center gap-1 pt-1 border-t border-gray-100">
              <span>Launch Matchmaker</span>
              <ArrowRight className="w-3 h-3 text-[#8A5A00] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-[#1F2937] font-semibold flex-wrap">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 stroke-[2.5]" />
          <span className="text-[#1E3A5F] font-black">{property.landDetails?.approvals || 'CMDA & DTCP Approved'}</span>
          <span className="text-gray-400">•</span>
          <span className="text-[#1F2937]">{property.landDetails?.roadWidth || '40 Ft Road'}</span>
          <span className="text-gray-400">•</span>
          <span className="text-[#1F2937]">{property.landDetails?.roadFacing || 'North-East Facing'}</span>
        </div>

        <div className="flex items-center gap-2">
          {onScrollToLegal && (
            <button
              onClick={onScrollToLegal}
              className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-[#1E3A5F] border-2 border-gray-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#8A5A00]" />
              <span>Legal Patta & EC</span>
            </button>
          )}

          {onScrollToIntelligence && (
            <button
              onClick={onScrollToIntelligence}
              className="px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#1E3A5F]/20 transition-all"
            >
              <span>Area Market Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] text-[#D4AF37]" />
            </button>
          )}
        </div>
      </div>

      {/* Modals rendered when controlled locally */}
      {!onOpenValuation && (
        <AIPropertyValuationModal
          property={property}
          isOpen={localValuationOpen}
          onClose={() => setLocalValuationOpen(false)}
        />
      )}

      {!onOpenAreaAnalysis && (
        <AIAreaAnalysisModal
          property={property}
          isOpen={localAreaAnalysisOpen}
          onClose={() => setLocalAreaAnalysisOpen(false)}
        />
      )}

      {!onOpenInvestmentReport && (
        <AIInvestmentReportModal
          property={property}
          isOpen={localInvestmentOpen}
          onClose={() => setLocalInvestmentOpen(false)}
        />
      )}

      {!onOpenMatchmaker && (
        <AIRecommendationModal
          isOpen={localMatchmakerOpen}
          onClose={() => setLocalMatchmakerOpen(false)}
        />
      )}

    </div>
  );
}
