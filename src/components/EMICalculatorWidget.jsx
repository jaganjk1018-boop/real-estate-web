'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { calculateEMI, formatPrice } from '../lib/utils';
import { useRealEstateStore } from '../lib/store';

export default function EMICalculatorWidget({ initialPrice = 18500000 }) {
  const { currency } = useRealEstateStore();
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.25);
  const [tenureYears, setTenureYears] = useState(30);

  React.useEffect(() => {
    if (initialPrice) {
      setPrice(initialPrice);
    }
  }, [initialPrice]);

  const result = calculateEMI(price, downPaymentPercent, interestRate, tenureYears);

  // Calculate percentages for the stacked bar
  const total = result.totalMonthlyTotal || 1;
  const pniPercent = Math.round((result.monthlyPayment / total) * 100);
  const taxPercent = Math.round((result.monthlyPropertyTax / total) * 100);
  const insPercent = Math.round((result.monthlyHomeInsurance / total) * 100);
  const hoaPercent = Math.max(0, 100 - (pniPercent + taxPercent + insPercent));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-card">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1E3A5F] font-serif">
              Mortgage & EMI Estimator
            </h3>
            <p className="text-xs text-[#4B5563]">
              Calculate amortized mortgage payments & capital breakdown
            </p>
          </div>
        </div>

        {/* Quick Readout */}
        <div className="text-left sm:text-right bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-2.5 rounded-2xl shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#4B5563] block">
            Est. Monthly Investment
          </span>
          <span className="text-2xl font-black text-[#1E3A5F] font-serif">
            {formatPrice(result.totalMonthlyTotal, currency)}
            <span className="text-xs font-normal text-[#4B5563]"> /mo</span>
          </span>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        
        {/* Sliders Side */}
        <div className="space-y-6">
          
          {/* Property Price Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-[#1F2937]">Property Valuation</label>
              <span className="text-sm font-bold text-[#1E3A5F] font-serif">{formatPrice(price, currency)}</span>
            </div>
            <input
              type="range"
              min={500000}
              max={30000000}
              step={100000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 accent-[#1E3A5F] rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#4B5563] mt-1 font-medium">
              <span>$500K</span>
              <span>$15M</span>
              <span>$30M</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-[#1F2937]">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-sm font-bold text-[#996515] font-serif">
                {formatPrice(result.downPaymentAmount, currency)}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 accent-[#D4AF37] rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#4B5563] mt-1 font-medium">
              <span>10% ({formatPrice(price * 0.1, currency)})</span>
              <span>20%</span>
              <span>60%</span>
            </div>
          </div>

          {/* Interest Rate & Tenure Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#1F2937]">Interest Rate</label>
                <span className="text-xs font-bold text-[#1E3A5F]">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={3.0}
                max={10.0}
                step={0.25}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 accent-[#1E3A5F] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F2937] block mb-2">
                Loan Term (Years)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[15, 20, 30].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setTenureYears(yr)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      tenureYears === yr
                        ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                        : 'bg-[#FAF8F5] text-[#1F2937] border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {yr} Yrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loan Amount Note */}
          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-gray-200 flex items-center justify-between text-xs">
            <span className="text-[#4B5563] font-medium">Total Borrowed Loan Principal:</span>
            <strong className="text-[#1E3A5F] font-bold">{formatPrice(result.loanAmount, currency)}</strong>
          </div>

        </div>

        {/* Breakdown Output Side */}
        <div className="flex flex-col justify-between space-y-6">
          
          {/* Stacked Percentage Visual Bar */}
          <div>
            <span className="text-xs font-semibold text-[#4B5563] block mb-2">
              Monthly Payment Allocation
            </span>
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-gray-100 border border-gray-200 shadow-inner">
              <div style={{ width: `${pniPercent}%` }} className="h-full bg-[#1E3A5F]" title="Principal & Interest" />
              <div style={{ width: `${taxPercent}%` }} className="h-full bg-[#D4AF37]" title="Property Taxes" />
              <div style={{ width: `${insPercent}%` }} className="h-full bg-emerald-600" title="Home Insurance" />
              <div style={{ width: `${hoaPercent}%` }} className="h-full bg-indigo-500" title="HOA & Maintenance" />
            </div>
          </div>

          {/* Breakdown Items List */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#1E3A5F] shrink-0" />
                <span className="text-[#1F2937] font-medium">Principal & Interest</span>
              </div>
              <span className="font-bold text-[#1E3A5F]">{formatPrice(result.monthlyPayment, currency)} /mo</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#D4AF37] shrink-0" />
                <span className="text-[#1F2937] font-medium">Est. Property Tax (1.2% p.a.)</span>
              </div>
              <span className="font-bold text-[#1E3A5F]">{formatPrice(result.monthlyPropertyTax, currency)} /mo</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                <span className="text-[#1F2937] font-medium">Homeowner Insurance (0.5% p.a.)</span>
              </div>
              <span className="font-bold text-[#1E3A5F]">{formatPrice(result.monthlyHomeInsurance, currency)} /mo</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500 shrink-0" />
                <span className="text-[#1F2937] font-medium">HOA & Reserve Maintenance</span>
              </div>
              <span className="font-bold text-[#1E3A5F]">{formatPrice(result.monthlyHOA, currency)} /mo</span>
            </div>
          </div>

          {/* Lifetime Interest & Total Cost */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 text-xs">
            <div>
              <span className="text-[#4B5563] block text-[11px] font-medium">Total Lifetime Interest:</span>
              <span className="font-bold text-[#1E3A5F]">{formatPrice(result.totalInterest, currency)}</span>
            </div>
            <div>
              <span className="text-[#4B5563] block text-[11px] font-medium">Total Loan Repayments:</span>
              <span className="font-bold text-[#996515]">{formatPrice(result.totalPayment, currency)}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
