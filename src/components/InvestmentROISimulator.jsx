'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  X,
  BarChart3
} from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import { calculateInvestmentROI, formatLocalizedPrice } from '../lib/utils';

export default function InvestmentROISimulator({ initialPrice = 18500000, propertyTitle = null }) {
  const { currency } = useRealEstateStore();

  // Inputs
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [rentalStrategy, setRentalStrategy] = useState('luxury-short-term'); // 'luxury-short-term' | 'corporate-long-term'
  const [occupancyRate, setOccupancyRate] = useState(65);
  const [nightlyRate, setNightlyRate] = useState(Math.round(initialPrice * 0.00035));
  const [monthlyLongTermRent, setMonthlyLongTermRent] = useState(Math.round(initialPrice * 0.0042));
  const [annualAppreciationRate, setAnnualAppreciationRate] = useState(6.0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [mortgageInterestRate, setMortgageInterestRate] = useState(6.25);
  const [isCashPurchase, setIsCashPurchase] = useState(false);
  const [isTeaserOpen, setIsTeaserOpen] = useState(false);

  React.useEffect(() => {
    if (initialPrice) {
      setPropertyPrice(initialPrice);
      setNightlyRate(Math.round(initialPrice * 0.00035));
      setMonthlyLongTermRent(Math.round(initialPrice * 0.0042));
    }
  }, [initialPrice]);

  // Recalculate financial model
  const roiData = useMemo(() => {
    return calculateInvestmentROI(propertyPrice, {
      rentalStrategy,
      nightlyRate,
      occupancyRate: rentalStrategy === 'luxury-short-term' ? occupancyRate : 95,
      monthlyLongTermRent,
      annualAppreciationRate,
      downPaymentPercent: isCashPurchase ? 100 : downPaymentPercent,
      mortgageInterestRate: isCashPurchase ? 0 : mortgageInterestRate
    });
  }, [
    propertyPrice,
    rentalStrategy,
    nightlyRate,
    occupancyRate,
    monthlyLongTermRent,
    annualAppreciationRate,
    downPaymentPercent,
    mortgageInterestRate,
    isCashPurchase
  ]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-8 shadow-card">
      
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Private Wealth Capital Appreciation & Yield Engine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] font-serif mt-2">
            Executive Investment & Rental Yield Simulator
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            Model cash-on-cash returns, 10-year equity escalation, and capitalization rates for prime luxury acquisitions.
          </p>
        </div>

        {/* Action: Generate Memorandum Button */}
        <button
          onClick={() => setIsTeaserOpen(true)}
          className="self-start lg:self-center px-4 py-2.5 rounded-2xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-[#1E3A5F]/20 transition-all"
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>Generate Investment Memorandum</span>
        </button>
      </div>

      {/* Main Grid: Controls + Real-Time ROI Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Dynamic Parameter Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] border border-gray-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#1E3A5F] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#D4AF37]" /> Financial Assumptions
          </h4>

          {/* Acquisition Price Input */}
          <div className="space-y-2">
            <label className="text-xs text-[#1F2937] font-medium flex items-center justify-between">
              <span>Acquisition Value</span>
              <span className="font-bold text-[#1E3A5F] font-serif">{formatLocalizedPrice(propertyPrice, currency)}</span>
            </label>
            <input
              type="range"
              min={2000000}
              max={60000000}
              step={250000}
              value={propertyPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPropertyPrice(val);
                setNightlyRate(Math.round(val * 0.00035));
                setMonthlyLongTermRent(Math.round(val * 0.0042));
              }}
              className="w-full h-2 bg-gray-200 accent-[#1E3A5F] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Strategy Switcher */}
          <div className="space-y-2">
            <label className="text-xs text-[#1F2937] font-medium">Rental Strategy</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRentalStrategy('luxury-short-term')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  rentalStrategy === 'luxury-short-term'
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                    : 'bg-white text-[#1F2937] border-gray-200 hover:bg-gray-50'
                }`}
              >
                Ultra-Luxury Short-Term
              </button>
              <button
                type="button"
                onClick={() => setRentalStrategy('corporate-long-term')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  rentalStrategy === 'corporate-long-term'
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                    : 'bg-white text-[#1F2937] border-gray-200 hover:bg-gray-50'
                }`}
              >
                Corporate Annual Lease
              </button>
            </div>
          </div>

          {/* Strategy Specific Inputs */}
          {rentalStrategy === 'luxury-short-term' ? (
            <>
              <div className="space-y-2">
                <label className="text-xs text-[#1F2937] font-medium flex items-center justify-between">
                  <span>Projected Nightly Villa Rate</span>
                  <span className="font-bold text-[#1E3A5F] font-serif">{formatLocalizedPrice(nightlyRate, currency)}/night</span>
                </label>
                <input
                  type="range"
                  min={1000}
                  max={30000}
                  step={500}
                  value={nightlyRate}
                  onChange={(e) => setNightlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 accent-[#D4AF37] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#1F2937] font-medium flex items-center justify-between">
                  <span>Annual Occupancy Target</span>
                  <span className="font-bold text-[#996515]">{occupancyRate}% ({Math.round(365 * (occupancyRate / 100))} nights)</span>
                </label>
                <input
                  type="range"
                  min={35}
                  max={90}
                  step={5}
                  value={occupancyRate}
                  onChange={(e) => setOccupancyRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 accent-[#D4AF37] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label className="text-xs text-[#1F2937] font-medium flex items-center justify-between">
                <span>Monthly Corporate Rent</span>
                <span className="font-bold text-[#1E3A5F] font-serif">{formatLocalizedPrice(monthlyLongTermRent, currency)}/mo</span>
              </label>
              <input
                type="range"
                min={10000}
                max={250000}
                step={2500}
                value={monthlyLongTermRent}
                onChange={(e) => setMonthlyLongTermRent(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 accent-[#1E3A5F] rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}

          {/* Capital Appreciation Rate */}
          <div className="space-y-2">
            <label className="text-xs text-[#1F2937] font-medium flex items-center justify-between">
              <span>Forecasted Annual Asset Appreciation</span>
              <span className="font-bold text-emerald-700">{annualAppreciationRate}% per year</span>
            </label>
            <input
              type="range"
              min={2.0}
              max={12.0}
              step={0.5}
              value={annualAppreciationRate}
              onChange={(e) => setAnnualAppreciationRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 accent-emerald-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Financing / Cash Purchase Toggle */}
          <div className="pt-2 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#1F2937] font-medium">Financing Structure</span>
              <button
                type="button"
                onClick={() => setIsCashPurchase(!isCashPurchase)}
                className={`text-[11px] font-bold px-3 py-1 rounded-lg border transition-all ${
                  isCashPurchase
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white text-[#4B5563] border-gray-200'
                }`}
              >
                {isCashPurchase ? 'All-Cash Acquisition' : 'Mortgage Leveraged'}
              </button>
            </div>

            {!isCashPurchase && (
              <div className="space-y-2">
                <label className="text-xs text-[#1F2937] font-medium flex items-center justify-between">
                  <span>Down Payment Equity</span>
                  <span className="font-bold text-[#1E3A5F]">{downPaymentPercent}%</span>
                </label>
                <input
                  type="range"
                  min={20}
                  max={60}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 accent-[#1E3A5F] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Financial Intelligence Output & 10-Year Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top KPI Cards (4 Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#FAF8F5] border border-gray-200 rounded-2xl p-4 text-center space-y-1 shadow-sm">
              <span className="text-[10px] text-[#4B5563] uppercase tracking-wider font-semibold">Gross Yield</span>
              <div className="text-xl font-bold text-[#1E3A5F]">{roiData.grossYield}%</div>
              <span className="text-[10px] text-[#4B5563] block">Annual revenue basis</span>
            </div>

            <div className="bg-[#FAF8F5] border border-gray-200 rounded-2xl p-4 text-center space-y-1 shadow-sm">
              <span className="text-[10px] text-[#4B5563] uppercase tracking-wider font-semibold">Cap Rate (NOI)</span>
              <div className="text-xl font-bold text-emerald-700">{roiData.capRate}%</div>
              <span className="text-[10px] text-[#4B5563] block">Net operating yield</span>
            </div>

            <div className="bg-[#FAF8F5] border border-gray-200 rounded-2xl p-4 text-center space-y-1 shadow-sm">
              <span className="text-[10px] text-[#4B5563] uppercase tracking-wider font-semibold">Annual NOI</span>
              <div className="text-base font-bold text-[#1E3A5F] truncate">{formatLocalizedPrice(roiData.netOperatingIncome, currency)}</div>
              <span className="text-[10px] text-[#4B5563] block">After expenses</span>
            </div>

            <div className="bg-[#FAF8F5] border border-gray-200 rounded-2xl p-4 text-center space-y-1 shadow-sm">
              <span className="text-[10px] text-[#4B5563] uppercase tracking-wider font-semibold">Cash-on-Cash</span>
              <div className="text-xl font-bold text-[#D4AF37]">{roiData.cashOnCashReturn}%</div>
              <span className="text-[10px] text-[#4B5563] block">On invested equity</span>
            </div>
          </div>

          {/* Revenue Breakdown Strip */}
          <div className="bg-[#FAF8F5] border border-gray-200 rounded-3xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#4B5563] font-medium">Projected Gross Annual Receipts:</span>
              <span className="font-bold text-[#1E3A5F]">{formatLocalizedPrice(roiData.grossAnnualRevenue, currency)}/yr</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#4B5563] font-medium">Operating Expenses (Management, Tax, Insurance):</span>
              <span className="font-bold text-rose-600">-{formatLocalizedPrice(roiData.totalOperatingExpenses, currency)}/yr</span>
            </div>
            {!isCashPurchase && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#4B5563] font-medium">Annual Debt Service (P&I):</span>
                <span className="font-bold text-[#996515]">-{formatLocalizedPrice(roiData.annualDebtService, currency)}/yr</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-sm font-bold">
              <span className="text-[#1E3A5F]">Net Annual Cash Distribution:</span>
              <span className="text-emerald-700">{formatLocalizedPrice(roiData.annualCashFlow, currency)}</span>
            </div>
          </div>

          {/* 10-Year Wealth Accumulation Schedule */}
          <div className="bg-[#FAF8F5] border border-gray-200 rounded-3xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#1E3A5F] font-serif flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                10-Year Capital Appreciation & Equity Schedule
              </h4>
              <span className="text-[10px] text-[#4B5563] font-medium">Compounded @ {annualAppreciationRate}%</span>
            </div>

            <div className="space-y-3">
              {roiData.projectionSchedule.map((step) => (
                <div key={step.year} className="space-y-1.5 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1E3A5F]">Year {step.year}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#4B5563]">Estate Value: <strong className="text-[#1E3A5F]">{formatLocalizedPrice(step.propertyValue, currency)}</strong></span>
                      <span className="text-emerald-700 font-bold">Total ROI: +{step.totalROI}%</span>
                    </div>
                  </div>

                  {/* Progress bar representing ROI growth */}
                  <div className="w-full bg-gray-100 border border-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#1E3A5F] to-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(10, step.totalROI / 1.5))}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#4B5563] pt-0.5">
                    <span>Cumulative Rental Cash: {formatLocalizedPrice(step.cumulativeRentalCashFlow, currency)}</span>
                    <span>Net Investor Equity: {formatLocalizedPrice(step.estimatedEquity, currency)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* INVESTMENT TEASER MODAL */}
      {isTeaserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative text-[#1F2937]">
            <button
              onClick={() => setIsTeaserOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-[#1E3A5F] p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Teaser Header */}
            <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block">
                  AURA ESTATES PRIVATE WEALTH ADVISORY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] font-serif mt-1">
                  Executive Investment Memorandum
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#996515]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            {/* Memorandum Metrics Summary Table */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF8F5] p-4 rounded-2xl border border-gray-200">
              <div>
                <span className="text-[#4B5563] block text-[10px] uppercase tracking-wider font-semibold">Asset Target</span>
                <span className="font-bold text-[#1E3A5F] text-sm">{propertyTitle || 'Prime Architectural Acquisition'}</span>
              </div>
              <div>
                <span className="text-[#4B5563] block text-[10px] uppercase tracking-wider font-semibold">Acquisition Value</span>
                <span className="font-bold text-[#1E3A5F] text-sm">{formatLocalizedPrice(propertyPrice, currency)}</span>
              </div>
              <div>
                <span className="text-[#4B5563] block text-[10px] uppercase tracking-wider font-semibold">Projected Cap Rate</span>
                <span className="font-bold text-emerald-700 text-sm">{roiData.capRate}%</span>
              </div>
              <div>
                <span className="text-[#4B5563] block text-[10px] uppercase tracking-wider font-semibold">Gross Rental Yield</span>
                <span className="font-bold text-[#1E3A5F] text-sm">{roiData.grossYield}%</span>
              </div>
              <div>
                <span className="text-[#4B5563] block text-[10px] uppercase tracking-wider font-semibold">Annual NOI</span>
                <span className="font-bold text-[#1E3A5F] text-sm">{formatLocalizedPrice(roiData.netOperatingIncome, currency)}</span>
              </div>
              <div>
                <span className="text-[#4B5563] block text-[10px] uppercase tracking-wider font-semibold">10-Year Forecast Value</span>
                <span className="font-bold text-emerald-700 text-sm">{formatLocalizedPrice(roiData.projectionSchedule[3]?.propertyValue || propertyPrice, currency)}</span>
              </div>
            </div>

            <p className="text-xs text-[#4B5563] leading-relaxed">
              This private teaser models pro-forma revenue based on prime trophy market underwriting benchmarks. All projections reflect conservative occupancy models, professional asset management reserves, and municipal assessments.
            </p>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="w-full sm:w-1/2 py-3 rounded-xl bg-white hover:bg-gray-100 text-[#1E3A5F] text-xs font-semibold flex items-center justify-center gap-2 border border-gray-300 shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                <span>Print Executive Teaser</span>
              </button>
              <button
                onClick={() => {
                  alert('Confidential Offering Memorandum dispatched to your verified client profile.');
                  setIsTeaserOpen(false);
                }}
                className="w-full sm:w-1/2 py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#1E3A5F]/20"
              >
                <Download className="w-4 h-4 text-[#D4AF37]" />
                <span>Request Full Underwriting Data Room</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
