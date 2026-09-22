'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Activity, 
  Calculator, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Building2, 
  Train, 
  Road, 
  Hospital, 
  GraduationCap, 
  Calendar, 
  PlusCircle, 
  Check, 
  X, 
  FileText, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCw,
  Award,
  Users,
  Send,
  Zap,
  HelpCircle,
  Coins
} from 'lucide-react';
import { AREA_MARKET_DATA } from '../data/areaMarketData';
import { useRealEstateStore } from '../lib/store';
import { formatNumberIndian } from '../lib/utils';
import { compareAreas } from '../lib/areaIntelligenceEngine';

export default function AreaMarketRateIntelligence({ 
  initialAreaId = 'tambaram',
  isEmbeddedInProperty = false,
  property = null 
}) {
  const { 
    brokerRates, 
    submitBrokerRate, 
    approveBrokerRate, 
    rejectBrokerRate,
    currentUser
  } = useRealEstateStore();

  const [selectedAreaId, setSelectedAreaId] = useState(initialAreaId);
  const [comparisonAreaId, setComparisonAreaId] = useState('omr');
  const [activeTimeframe, setActiveTimeframe] = useState('1Y'); // '1M' | '3M' | '6M' | '1Y'
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminQueueOpen, setIsAdminQueueOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // New broker rate form state
  const [brokerForm, setBrokerForm] = useState({
    brokerName: currentUser?.name || 'R. Senthil Nathan',
    brokerPhone: '+91 98401 28941',
    brokerAgency: 'Premier Chennai Land Assets',
    areaId: initialAreaId,
    submittedRateSqFt: 4650,
    listingType: 'Plotted Layout Sale',
    evidenceSource: 'Recent SRO Registered Sale Deed'
  });

  const area = useMemo(() => {
    return AREA_MARKET_DATA[selectedAreaId] || AREA_MARKET_DATA['tambaram'];
  }, [selectedAreaId]);

  const comparisonArea = useMemo(() => {
    return AREA_MARKET_DATA[comparisonAreaId] || AREA_MARKET_DATA['omr'];
  }, [comparisonAreaId]);

  const comparisonResult = useMemo(() => {
    return compareAreas(area, comparisonArea);
  }, [area, comparisonArea]);

  // Approved broker rates for selected area
  const areaBrokerRates = useMemo(() => {
    return brokerRates.filter(r => r.areaId === selectedAreaId);
  }, [brokerRates, selectedAreaId]);

  const pendingBrokerRates = useMemo(() => {
    return brokerRates.filter(r => r.status === 'pending');
  }, [brokerRates]);

  // Price history data points for selected timeframe
  const historyData = area.priceHistory[activeTimeframe] || area.priceHistory['1Y'];

  // Handle broker submission
  const handleBrokerSubmit = (e) => {
    e.preventDefault();
    submitBrokerRate({
      brokerName: brokerForm.brokerName,
      brokerPhone: brokerForm.brokerPhone,
      brokerAgency: brokerForm.brokerAgency,
      areaId: brokerForm.areaId,
      areaName: AREA_MARKET_DATA[brokerForm.areaId]?.name || brokerForm.areaId,
      submittedRateSqFt: Number(brokerForm.submittedRateSqFt),
      listingType: brokerForm.listingType,
      evidenceSource: brokerForm.evidenceSource
    });
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
    }, 2000);
  };

  // SVG Chart min/max scaling
  const rates = historyData.map(d => d.rate);
  const minRate = Math.min(...rates) * 0.96;
  const maxRate = Math.max(...rates) * 1.04;
  const range = maxRate - minRate || 1;

  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = historyData.map((d, index) => {
    const x = paddingX + (index / (historyData.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((d.rate - minRate) / range) * (svgHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaFillD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`
    : '';

  return (
    <div className="space-y-8 scroll-mt-28" id="area-intelligence-suite">
      
      {/* 1. Main Header & Area Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#D4AF37]/40 shadow-card">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live Market Rate Engine</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#1E3A5F] font-mono text-xs font-semibold">
              {area.totalActiveListings} Active Listings Analyzed
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#1E3A5F] font-serif tracking-tight">
            Area Market Rate Intelligence System
          </h2>
          <div className="text-sm sm:text-base font-bold text-[#8A5A00] flex items-center gap-2">
            <span>📍 {area.name} Micro-Market Real-Time Valuation & Growth Dynamics</span>
          </div>
          <p className="text-xs sm:text-sm text-[#374151] max-w-2xl font-medium">
            {area.tagline} • Official formula aggregation across active listings, verified broker filings, and Sub-Registrar sale deeds.
          </p>
        </div>

        {/* Action Controls: Area Selector & Broker Rate Submit Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono uppercase font-bold text-[#1E3A5F]">Select Region</label>
            <select
              value={selectedAreaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              className="bg-[#FAF8F5] border border-gray-300 text-[#1F2937] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#D4AF37] shadow-sm"
            >
              <option value="tambaram">📍 Tambaram (South Chennai Hub)</option>
              <option value="omr">📍 OMR - Sholinganallur (IT Expressway)</option>
              <option value="guindy">📍 Guindy - Kathipara (Business Gateway)</option>
              <option value="ecr">📍 ECR - Akkarai (Coastal Villa Belt)</option>
              <option value="bel-air">📍 Bel-Air (Platinum Triangle, LA)</option>
            </select>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="self-end px-4 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs flex items-center gap-1.5 shadow-md border border-[#D4AF37]/40 hover:brightness-105 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Submit Market Rate</span>
          </button>

          {pendingBrokerRates.length > 0 && (
            <button
              onClick={() => setIsAdminQueueOpen(!isAdminQueueOpen)}
              className="self-end px-3 py-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Queue ({pendingBrokerRates.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Approval Queue Drawer (if opened) */}
      {isAdminQueueOpen && pendingBrokerRates.length > 0 && (
        <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-300 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Broker Rate Submission Approvals (Admin Simulator)</span>
            </div>
            <button onClick={() => setIsAdminQueueOpen(false)} className="text-gray-500 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingBrokerRates.map((sub) => (
              <div key={sub.id} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-[#1F2937] block">{sub.brokerName}</span>
                    <span className="text-gray-500 text-[11px]">{sub.brokerAgency} • {sub.areaName}</span>
                  </div>
                  <span className="text-base font-bold text-emerald-700 font-serif">₹{formatNumberIndian(sub.submittedRateSqFt)}/sq.ft</span>
                </div>
                <p className="text-gray-500 text-[11px]">Evidence: {sub.evidenceSource}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => approveBrokerRate(sub.id)}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-all"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Verify</span>
                  </button>
                  <button
                    onClick={() => rejectBrokerRate(sub.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] flex items-center justify-center gap-1 transition-all border border-rose-200"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature 1: Area Rate Dashboard Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Metric 1: Current Avg Rate */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5E7EB] hover:border-[#D4AF37] transition-all shadow-card space-y-1">
          <span className="text-[11px] font-mono text-[#4B5563] uppercase block font-semibold">Current Avg Rate</span>
          <div className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
            {area.currencySymbol}{formatNumberIndian(area.currentAvgRateSqFt)}
            <span className="text-xs font-normal text-gray-500">/sq.ft</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+{area.oneYearGrowth}% (1 Year)</span>
          </div>
        </div>

        {/* Metric 2: Minimum Rate */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5E7EB] hover:border-[#D4AF37] transition-all shadow-card space-y-1">
          <span className="text-[11px] font-mono text-[#4B5563] uppercase block font-semibold">Minimum Rate</span>
          <div className="text-2xl sm:text-3xl font-black text-[#1F2937] font-serif">
            {area.currencySymbol}{formatNumberIndian(area.minRateSqFt)}
            <span className="text-xs font-normal text-gray-500">/sq.ft</span>
          </div>
          <span className="text-[11px] text-gray-500 block">Lowest registered parcel</span>
        </div>

        {/* Metric 3: Maximum Rate */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5E7EB] hover:border-[#D4AF37] transition-all shadow-card space-y-1">
          <span className="text-[11px] font-mono text-[#4B5563] uppercase block font-semibold">Maximum Rate</span>
          <div className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
            {area.currencySymbol}{formatNumberIndian(area.maxRateSqFt)}
            <span className="text-xs font-normal text-gray-500">/sq.ft</span>
          </div>
          <span className="text-[11px] text-gray-500 block font-medium">Prime highway frontage</span>
        </div>

        {/* Metric 4: Total Active Listings */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5E7EB] hover:border-[#D4AF37] transition-all shadow-card space-y-1">
          <span className="text-[11px] font-mono text-[#4B5563] uppercase block font-semibold">Active Listings</span>
          <div className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
            {area.totalActiveListings}
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block">{area.totalPropertiesSold} Sold in 12M</span>
        </div>

        {/* Metric 5: Demand & Updated Date */}
        <div className="p-5 rounded-3xl bg-emerald-50/50 border border-emerald-200 shadow-card space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-800 uppercase font-bold">Demand Level</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-800 font-serif">
            {area.demandLevel}
          </div>
          <span className="text-[10px] text-gray-600 block font-mono">
            Updated: {area.lastUpdated}
          </span>
        </div>

      </div>

      {/* Feature 2 & 3: Automatic Rate Calculation Formula & Interactive Price History Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Growth Chart (1M, 3M, 6M, 1Y) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-card space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#8A5A00] uppercase tracking-widest">
                <BarChart3 className="w-4 h-4" />
                <span>Price History & Trajectory Tracking</span>
              </div>
              <h3 className="text-xl font-bold text-[#1E3A5F] font-serif mt-0.5">
                Historical Price Appreciation Chart
              </h3>
            </div>

            {/* Timeframe selector: 1M, 3M, 6M, 1Y */}
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-gray-200 text-xs">
              {['1M', '3M', '6M', '1Y'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTimeframe === tf
                      ? 'bg-[#1E3A5F] text-white shadow-sm'
                      : 'text-[#4B5563] hover:text-[#1E3A5F] hover:bg-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Animated Interactive Chart */}
          <div className="relative w-full overflow-hidden bg-[#FAF8F5] rounded-2xl p-4 border border-gray-100">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
              <defs>
                <linearGradient id="areaGradientLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0.25, 0.5, 0.75].map((factor, idx) => (
                <line
                  key={idx}
                  x1={paddingX}
                  y1={paddingY + factor * (svgHeight - paddingY * 2)}
                  x2={svgWidth - paddingX}
                  y2={paddingY + factor * (svgHeight - paddingY * 2)}
                  stroke="#E5E7EB"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Gradient Area */}
              <path d={areaFillD} fill="url(#areaGradientLight)" />

              {/* Trend Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#1E3A5F"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {points.map((pt, idx) => (
                <g key={idx} className="group cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill="#FFFFFF"
                    stroke="#D4AF37"
                    strokeWidth="3"
                    className="transition-all hover:scale-150"
                  />
                  {/* Point Tooltip */}
                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fill="#1E3A5F"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    ₹{formatNumberIndian(pt.rate)}
                  </text>
                  <text
                    x={pt.x}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    fill="#4B5563"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="semibold"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-[#4B5563] pt-2 border-t border-gray-100 font-mono">
            <span>Range: ₹{formatNumberIndian(Math.round(minRate / 0.96))} - ₹{formatNumberIndian(Math.round(maxRate / 1.04))}/sq.ft</span>
            <span className="text-emerald-700 font-bold">+{area.oneYearGrowth}% Trailing 12-Month Performance</span>
          </div>

        </div>

        {/* Right Col: Feature 2 - Automatic Rate Calculation Formula Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-card space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A5F] uppercase tracking-widest">
              <Calculator className="w-4 h-4 text-[#D4AF37]" />
              <span>Feature 2: Automatic Formula Engine</span>
            </div>

            <h3 className="text-xl font-bold text-[#1E3A5F] font-serif">
              Algorithmic Rate Calculation
            </h3>

            {/* Formula display block */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 space-y-2 font-mono text-xs">
              <span className="text-gray-500 uppercase text-[10px] block font-bold">Standard Mathematical Formula:</span>
              <p className="text-[#1E3A5F] font-bold text-xs leading-relaxed">
                Average Area Rate =<br/>
                Total Price Per Sq.ft of All Active Property Listings<br/>
                ÷<br/>
                Total Number of Listings
              </p>
            </div>

            {/* Real Calculation variables */}
            <div className="space-y-2 text-xs text-[#1F2937]">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Sum of All Listing Rates:</span>
                <span className="font-mono font-semibold text-[#1E3A5F]">₹{formatNumberIndian(area.activeListingsRateSum)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Active Listing Inventory:</span>
                <span className="font-mono font-semibold text-[#1E3A5F]">{area.totalActiveListings} Listings</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Calculated Area Average:</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">₹{formatNumberIndian(area.currentAvgRateSqFt)}/sq.ft</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 text-[11px] text-[#4B5563]">
            Dynamically recalibrates whenever a new verified listing or approved broker submission is committed.
          </div>
        </div>

      </div>

      {/* Feature 4 & 5: Market Insights & Data Sources Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Feature 4: Market Insights Cards */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-card space-y-5">
          <div className="flex items-center gap-2 text-xs font-black text-[#8A5A00] uppercase tracking-widest">
            <Activity className="w-4 h-4" />
            <span>Feature 4: Market Dynamics & Inventory Velocity</span>
          </div>

          <h3 className="text-xl font-bold text-[#1E3A5F] font-serif">
            Demand, Momentum & Liquidity Index
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            
            {/* Price Increased % */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="text-[11px] uppercase font-mono font-bold">Price Increased</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-emerald-900 font-serif">{area.priceIncreasedPct}%</div>
              <span className="text-[11px] text-gray-600">Of listings adjusted upward</span>
            </div>

            {/* Price Decreased % */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-1">
              <div className="flex items-center justify-between text-rose-800">
                <span className="text-[11px] uppercase font-mono font-bold">Price Decreased</span>
                <ArrowDownRight className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-rose-900 font-serif">{area.priceDecreasedPct}%</div>
              <span className="text-[11px] text-gray-600">Rare price cuts on distress sales</span>
            </div>

            {/* Properties Available vs Sold */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 space-y-1">
              <span className="text-[11px] uppercase font-mono text-gray-500 font-semibold">Inventory Liquidity</span>
              <div className="text-lg font-bold text-[#1E3A5F] font-serif">
                {area.totalActiveListings} Available • {area.totalPropertiesSold} Sold
              </div>
              <span className="text-[11px] text-emerald-700 font-bold">High absorption velocity</span>
            </div>

            {/* Absorption Rate */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 space-y-1">
              <span className="text-[11px] uppercase font-mono text-gray-500 font-semibold">Absorption Rate</span>
              <div className="text-2xl font-black text-[#1E3A5F] font-serif">
                {area.absorptionRateMonths} Mo
              </div>
              <span className="text-[11px] text-gray-500 font-medium">Average months to sell</span>
            </div>

          </div>
        </div>

        {/* Feature 5: Multi-Source Data Engine */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-card space-y-5">
          <div className="flex items-center gap-2 text-xs font-black text-[#8A5A00] uppercase tracking-widest">
            <Layers className="w-4 h-4 text-[#8A5A00]" />
            <span>Feature 5: Multi-Source Verification Matrix</span>
          </div>

          <h3 className="text-xl font-bold text-[#1E3A5F] font-serif">
            Weighted Data Ingestion Sources
          </h3>

          <div className="space-y-3">
            {area.dataSources.map((src, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-gray-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                    <span className="font-bold text-[#1F2937]">{src.name}</span>
                    {src.verified && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 shrink-0">
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[#8A5A00] font-black shrink-0">{src.share}% Weight</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#4B5563]">
                  <span>Sample: {src.count} records</span>
                  <span className="font-mono text-[#1E3A5F] font-bold">Avg: ₹{formatNumberIndian(src.avgRate)}/sq.ft</span>
                </div>

                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#1E3A5F] rounded-full" style={{ width: `${src.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Feature 6: Verified Broker Rates Feed */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-[#8A5A00] uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Feature 6: Broker Submitted Market Rates</span>
            </div>
            <h3 className="text-xl font-bold text-[#1E3A5F] font-serif mt-0.5">
              Verified Broker Market Rate Filings
            </h3>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#1E3A5F] hover:text-white border border-gray-300 text-[#1E3A5F] text-xs font-semibold flex items-center gap-1.5 transition-all w-fit shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Submit Broker Rate</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areaBrokerRates.map((sub) => (
            <div key={sub.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#1F2937] text-xs">{sub.brokerName}</span>
                    {sub.verifiedBadge && (
                      <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700" title="Verified Broker Badge">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#4B5563] block font-medium">{sub.brokerAgency}</span>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-emerald-700 font-serif">
                    ₹{formatNumberIndian(sub.submittedRateSqFt)}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">/sq.ft</span>
                </div>
              </div>

              <div className="text-[11px] text-[#4B5563] space-y-1 pt-1 border-t border-gray-200">
                <span className="text-gray-500 block">Type: {sub.listingType}</span>
                <span className="text-[#1E3A5F] font-medium block truncate">Doc: {sub.evidenceSource}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature 7: Area Comparison Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D4AF37]/40 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-[#8A5A00] uppercase tracking-widest">
              <Layers className="w-4 h-4" />
              <span>Feature 7: Real Estate Area Comparison Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] font-serif mt-0.5">
              Side-by-Side Area Analytics
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-mono">Compare with:</span>
            <select
              value={comparisonAreaId}
              onChange={(e) => setComparisonAreaId(e.target.value)}
              className="bg-[#FAF8F5] border border-gray-300 text-[#1F2937] rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
            >
              {Object.keys(AREA_MARKET_DATA)
                .filter(id => id !== selectedAreaId)
                .map(id => (
                  <option key={id} value={id}>{AREA_MARKET_DATA[id].name}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 uppercase font-mono text-[11px]">
                <th className="py-3 px-4">Metric</th>
                <th className="py-3 px-4 text-[#1E3A5F] font-bold text-sm">{area.name} (Area A)</th>
                <th className="py-3 px-4 text-emerald-700 font-bold text-sm">{comparisonArea.name} (Area B)</th>
                <th className="py-3 px-4 text-right">Variance / Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#1F2937]">
              
              <tr>
                <td className="py-3.5 px-4 font-semibold text-gray-500">Current Average Rate</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#1E3A5F] text-sm">
                  ₹{formatNumberIndian(area.currentAvgRateSqFt)}/sq.ft
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#1E3A5F] text-sm">
                  ₹{formatNumberIndian(comparisonArea.currentAvgRateSqFt)}/sq.ft
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-semibold">
                  {comparisonResult.rateDelta > 0 ? `+₹${formatNumberIndian(comparisonResult.rateDelta)}` : `-₹${formatNumberIndian(Math.abs(comparisonResult.rateDelta))}`}
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-gray-500">1-Year Capital Growth %</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                  +{area.oneYearGrowth}%
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                  +{comparisonArea.oneYearGrowth}%
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                  {comparisonResult.growthDelta > 0 ? `+${comparisonResult.growthDelta}% faster` : `${Math.abs(comparisonResult.growthDelta)}% delta`}
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-gray-500">Demand Score</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#D4AF37]">
                  {area.demandScore}/10 ({area.demandLevel})
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#D4AF37]">
                  {comparisonArea.demandScore}/10 ({comparisonArea.demandLevel})
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-gray-500">
                  {comparisonResult.demandDelta > 0 ? `+${comparisonResult.demandDelta} pts` : `${comparisonResult.demandDelta} pts`}
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-gray-500">Active Listings Pool</td>
                <td className="py-3.5 px-4 font-mono">{area.totalActiveListings} Listings</td>
                <td className="py-3.5 px-4 font-mono">{comparisonArea.totalActiveListings} Listings</td>
                <td className="py-3.5 px-4 text-right text-gray-500">Inventory Ratio</td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-gray-500">Major Infrastructure Projects</td>
                <td className="py-3.5 px-4 text-emerald-700 font-semibold">{area.futureDevelopments.length} Active Mega Projects</td>
                <td className="py-3.5 px-4 text-emerald-700 font-semibold">{comparisonArea.futureDevelopments.length} Active Mega Projects</td>
                <td className="py-3.5 px-4 text-right text-gray-500">Upcoming Drivers</td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Comparative Verdict Banner */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <span className="text-[#1F2937] font-medium">{comparisonResult.verdict}</span>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-[#1E3A5F] text-white font-bold text-[11px] whitespace-nowrap shadow-sm">
            Top Recommendation: {comparisonResult.winner}
          </span>
        </div>
      </div>

      {/* Feature 8: Future Development Information */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A5F] uppercase tracking-widest">
              <Road className="w-4 h-4 text-[#D4AF37]" />
              <span>Feature 8: Future Infrastructure & Urban Expansions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] font-serif mt-0.5">
              Catalyst Infrastructure Tracker
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            {area.futureDevelopments.length} Tracked Developments
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {area.futureDevelopments.map((dev) => (
            <div key={dev.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-[#D4AF37] transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                    {dev.category}
                  </span>
                  <span className="text-[11px] text-[#D4AF37] font-mono font-bold">
                    {dev.impactScore}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#1E3A5F] font-serif">{dev.title}</h4>
                <p className="text-xs text-[#4B5563] leading-relaxed font-light">{dev.description}</p>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <span>Distance: {dev.distanceFromCenter}</span>
                <span className="text-emerald-700 font-bold">{dev.expectedCompletion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature 9: AI Market Analysis Generator (Luxury Regal Navy Statement Card) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E3A5F] via-[#162C48] to-[#0F1B2B] border-2 border-[#D4AF37]/50 shadow-2xl space-y-6 text-white">
        <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>Feature 9: AI Market Analysis & Strategic Forecast</span>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-black text-white font-serif leading-snug">
            &ldquo;{area.aiAnalysis.headline}&rdquo;
          </h3>
          <p className="text-sm text-slate-200 leading-relaxed font-light">
            {area.aiAnalysis.detailedInsight}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
            <span className="text-[11px] font-mono text-slate-300 uppercase">2028 Target Forecast</span>
            <div className="text-lg font-bold text-emerald-300 font-mono">
              {area.aiAnalysis.targetPrice2028}
            </div>
            <span className="text-[10px] text-slate-300">Based on CMRL & infra timeline</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
            <span className="text-[11px] font-mono text-slate-300 uppercase">Constructed Villa Yield</span>
            <div className="text-lg font-bold text-[#D4AF37] font-mono">
              {area.aiAnalysis.rentalYieldRange}
            </div>
            <span className="text-[10px] text-slate-300">Estimated residential yield</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
            <span className="text-[11px] font-mono text-slate-300 uppercase">Investment Verdict</span>
            <div className="text-sm font-bold text-white">
              {area.aiAnalysis.investmentVerdict}
            </div>
            <span className="text-[10px] text-emerald-300">Risk Profile: {area.aiAnalysis.riskScore}</span>
          </div>

        </div>
      </div>

      {/* Broker Rate Submission Modal Form */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-[#1F2937]">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A5F] uppercase tracking-widest">
                <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Feature 6: Broker Rate Update Portal</span>
              </div>
              <h3 className="text-xl font-bold text-[#1E3A5F] font-serif">Submit Latest Market Rate</h3>
              <p className="text-xs text-[#4B5563]">
                Brokers can submit latest transacted rates. Submissions are queued for admin verification before inclusion in the formula.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Rate Submitted Successfully!</h4>
                <p className="text-xs text-emerald-800">
                  Your rate has been submitted to the admin verification queue and will appear with a Verified Badge once cleared.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBrokerSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-gray-600 block mb-1 font-semibold">Target Area</label>
                  <select
                    value={brokerForm.areaId}
                    onChange={(e) => setBrokerForm({ ...brokerForm, areaId: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 text-[#1F2937] rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="tambaram">Tambaram (South Chennai Hub)</option>
                    <option value="omr">OMR - Sholinganallur</option>
                    <option value="guindy">Guindy - Kathipara</option>
                    <option value="ecr">ECR - Akkarai</option>
                    <option value="bel-air">Bel-Air</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-600 block mb-1 font-semibold">Broker Name</label>
                    <input
                      type="text"
                      required
                      value={brokerForm.brokerName}
                      onChange={(e) => setBrokerForm({ ...brokerForm, brokerName: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-gray-300 text-[#1F2937] rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-1 font-semibold">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={brokerForm.brokerPhone}
                      onChange={(e) => setBrokerForm({ ...brokerForm, brokerPhone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-gray-300 text-[#1F2937] rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-600 block mb-1 font-semibold">Submitted Rate (₹/sq.ft)</label>
                    <input
                      type="number"
                      required
                      value={brokerForm.submittedRateSqFt}
                      onChange={(e) => setBrokerForm({ ...brokerForm, submittedRateSqFt: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-gray-300 text-[#1E3A5F] font-mono font-bold text-sm rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-1 font-semibold">Transaction Category</label>
                    <select
                      value={brokerForm.listingType}
                      onChange={(e) => setBrokerForm({ ...brokerForm, listingType: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-gray-300 text-[#1F2937] rounded-xl px-3 py-2"
                    >
                      <option value="Plotted Layout Sale">Plotted Layout Sale</option>
                      <option value="Residential Villa Land">Residential Villa Land</option>
                      <option value="Commercial Development Site">Commercial Development</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 block mb-1 font-semibold">Verification Document Reference</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SRO Registered Sale Deed / Bank Valuation Report"
                    value={brokerForm.evidenceSource}
                    onChange={(e) => setBrokerForm({ ...brokerForm, evidenceSource: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 text-[#1F2937] rounded-xl px-3 py-2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all mt-2 border border-[#D4AF37]/40"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Submit for Admin Clearance</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
