'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import EMICalculatorWidget from '../../components/EMICalculatorWidget';
import InvestmentROISimulator from '../../components/InvestmentROISimulator';
import { calculateLoanEligibility, formatPrice } from '../../lib/utils';
import { useRealEstateStore } from '../../lib/store';

export default function CalculatorsPage() {
  const { currency } = useRealEstateStore();
  const [activeTab, setActiveTab] = useState('emi'); // 'emi' | 'eligibility' | 'investment'

  // Loan Eligibility Inputs
  const [monthlyIncome, setMonthlyIncome] = useState(85000);
  const [existingDebts, setExistingDebts] = useState(8000);
  const [interestRate, setInterestRate] = useState(6.25);
  const [tenureYears, setTenureYears] = useState(30);
  const [downPaymentSavings, setDownPaymentSavings] = useState(3000000);

  const eligibility = calculateLoanEligibility(
    monthlyIncome,
    existingDebts,
    interestRate,
    tenureYears,
    downPaymentSavings
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#FAF8F5] text-[#1F2937]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#1E3A5F] text-xs font-bold shadow-2xs">
          <Calculator className="w-3.5 h-3.5 text-[#8A5A00]" />
          <span>Private Wealth Financial & Yield Suite</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1E3A5F] font-serif leading-tight">
          Mortgage & <span className="gold-gradient-text">Investment ROI</span> Calculators
        </h1>
        <p className="text-sm sm:text-base text-[#374151] font-medium">
          Structure jumbo financing, estimate monthly carrying costs, and compute 10-year capital appreciation & rental yields.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center pt-2">
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
            <button
              onClick={() => setActiveTab('emi')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'emi'
                  ? 'bg-[#1E3A5F] text-white shadow-md'
                  : 'text-[#4B5563] hover:text-[#1E3A5F] hover:bg-gray-50'
              }`}
            >
              Mortgage & Carrying Costs
            </button>
            <button
              onClick={() => setActiveTab('eligibility')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'eligibility'
                  ? 'bg-[#1E3A5F] text-white shadow-md'
                  : 'text-[#4B5563] hover:text-[#1E3A5F] hover:bg-gray-50'
              }`}
            >
              Borrowing Capacity
            </button>
            <button
              onClick={() => setActiveTab('investment')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'investment'
                  ? 'bg-[#1E3A5F] text-white shadow-md'
                  : 'text-[#4B5563] hover:text-[#1E3A5F] hover:bg-gray-50'
              }`}
            >
              Investment Yield & 10-Yr ROI
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Mortgage EMI Calculator */}
      {activeTab === 'emi' && (
        <div className="space-y-8 animate-in fade-in">
          <EMICalculatorWidget initialPrice={18500000} />

          {/* Guide / Insights Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-card space-y-2">
              <h4 className="text-sm font-bold text-[#1E3A5F] font-serif">Jumbo Loan Optimization</h4>
              <p className="text-xs text-[#374151] font-normal leading-relaxed">
                For amounts exceeding statutory conforming limits, private bank portfolio lenders often provide interest-only structures and multi-year rate caps.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-card space-y-2">
              <h4 className="text-sm font-bold text-[#1E3A5F] font-serif">Property Taxes & Escrow</h4>
              <p className="text-xs text-[#374151] font-normal leading-relaxed">
                Ad valorem property tax rates typically range between 1.1% and 1.8% depending on municipal zoning, special assessments, and county jurisdiction.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-card space-y-2">
              <h4 className="text-sm font-bold text-[#1E3A5F] font-serif">Asset Pledged Financing</h4>
              <p className="text-xs text-[#374151] font-normal leading-relaxed">
                Pledging marketable securities (equities, treasuries) can substantially reduce stated mortgage spreads and eliminate private mortgage insurance requirements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Loan Eligibility & Borrowing Capacity */}
      {activeTab === 'eligibility' && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/40 shadow-card space-y-8 animate-in fade-in text-[#1F2937]">
          
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
              Determine Your Maximum Purchasing Power
            </h2>
            <p className="text-xs sm:text-sm text-[#374151] font-medium">
              Calculate the maximum estate price you can target based on conservative 43% Debt-To-Income (DTI) underwriting models.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-[#1E3A5F]">Monthly Gross Income</label>
                  <span className="text-sm font-black text-[#1E3A5F] font-serif">{formatPrice(monthlyIncome, currency)} /mo</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={300000}
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A5F]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                  <span>$10K/mo</span>
                  <span>$150K/mo</span>
                  <span>$300K/mo</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-[#1E3A5F]">Existing Monthly Debt Obligations</label>
                  <span className="text-sm font-black text-[#1E3A5F] font-serif">{formatPrice(existingDebts, currency)} /mo</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50000}
                  step={1000}
                  value={existingDebts}
                  onChange={(e) => setExistingDebts(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A5F]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                  <span>$0 (Debt-Free)</span>
                  <span>$25K/mo</span>
                  <span>$50K/mo</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-[#1E3A5F]">Down Payment Savings Available</label>
                  <span className="text-sm font-black text-[#8A5A00] font-serif">{formatPrice(downPaymentSavings, currency)}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={15000000}
                  step={100000}
                  value={downPaymentSavings}
                  onChange={(e) => setDownPaymentSavings(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A5F]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                  <span>$100K</span>
                  <span>$7.5M</span>
                  <span>$15M+</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#1E3A5F]">Interest Rate</label>
                    <span className="text-xs font-black text-[#1E3A5F]">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={3.5}
                    max={9.0}
                    step={0.25}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A5F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E3A5F] block mb-1.5">Tenure</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[15, 20, 30].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setTenureYears(yr)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                          tenureYears === yr
                            ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                            : 'bg-[#FAF8F5] text-[#4B5563] border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {yr} Yrs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Output Calculation Card */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-gray-300 space-y-6 shadow-sm">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#8A5A00] block">
                  Maximum Estimated Estate Budget
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#1E3A5F] font-serif mt-1">
                  {formatPrice(eligibility.maxPropertyBudget, currency)}
                </div>
                <p className="text-xs text-[#4B5563] mt-1 font-medium">
                  Combines eligible loan principal + your cash down payment savings.
                </p>
              </div>

              <div className="space-y-3 text-xs border-y border-gray-200 py-4">
                <div className="flex justify-between">
                  <span className="text-[#4B5563] font-semibold">Max Eligible Mortgage Principal:</span>
                  <strong className="text-[#1E3A5F] font-serif font-black">{formatPrice(eligibility.eligibleLoanAmount, currency)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4B5563] font-semibold">Monthly Borrowing Allocation (EMI):</span>
                  <strong className="text-[#8A5A00] font-serif font-black">{formatPrice(eligibility.estimatedMonthlyEMI, currency)} /mo</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4B5563] font-semibold">Calculated Debt-To-Income (DTI):</span>
                  <strong className="text-emerald-800 font-bold">{eligibility.debtToIncomeRatio}% (Conservative)</strong>
                </div>
              </div>

              <div className="p-3 bg-white border border-gray-200 rounded-2xl text-[11px] text-[#374151] leading-relaxed">
                ✅ With this budget, you qualify for <strong>{eligibility.maxPropertyBudget > 15000000 ? 'Ultra-Prime Trophy Villas & Duplex Penthouses' : 'Prime Architectural Modern Residences'}</strong> in our catalog.
              </div>

              <a
                href={`/properties?maxPrice=${eligibility.maxPropertyBudget}`}
                className="w-full py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <span>View Eligible Estates ({formatPrice(eligibility.maxPropertyBudget, currency)})</span>
              </a>
            </div>

          </div>

        </div>
      )}

      {/* Tab 3: Investment Yield & 10-Year Capital Appreciation Simulator */}
      {activeTab === 'investment' && (
        <div className="space-y-8 animate-in fade-in">
          <InvestmentROISimulator initialPrice={18500000} propertyTitle="Portfolio Model: Prime Architectural Acquisition" />
        </div>
      )}

    </div>
  );
}
