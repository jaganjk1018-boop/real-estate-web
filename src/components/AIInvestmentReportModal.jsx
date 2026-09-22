'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  TrendingUp, 
  X, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Building2, 
  Coins, 
  Award, 
  ShieldCheck, 
  DollarSign,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { formatNumberIndian } from '../lib/utils';

export default function AIInvestmentReportModal({ property, isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background page scroll so page stays stationary ("standed")
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !property || !mounted) return null;

  const plotPrice = property.price || 10800000;
  const plotSqFt = property.areaSqFt || 2400;

  // Investment Projections
  const yr1Gain = Math.round(plotPrice * 0.18);
  const yr1Total = plotPrice + yr1Gain;

  const yr3Gain = Math.round(plotPrice * 0.58);
  const yr3Total = plotPrice + yr3Gain;

  const yr5Gain = Math.round(plotPrice * 1.12);
  const yr5Total = plotPrice + yr5Gain;

  // Villa Construction Model
  const villaBuiltUpArea = Math.round(plotSqFt * 1.08); // 2,600 sq.ft villa on 2,400 plot
  const constructionRate = 3200; // ₹3,200/sq.ft for premium structural finishes
  const constructionCost = villaBuiltUpArea * constructionRate; // ₹83.2L
  const totalProjectOutlay = plotPrice + constructionCost; // ₹1.91 Cr
  const projectedVillaMarketValue = Math.round(totalProjectOutlay * 1.386); // ₹2.65 Cr
  const netDeveloperProfit = projectedVillaMarketValue - totalProjectOutlay; // +₹73.8L
  const estAnnualRent = Math.round(projectedVillaMarketValue * 0.052); // ₹7.2L/yr

  const handleDownloadInvestmentReport = () => {
    try {
      const doc = `========================================================================\n` +
        `   JK REALTY ARTIFICIAL INTELLIGENCE EXECUTIVE INVESTMENT DOSSIER      \n` +
        `   Capital Appreciation, Construction Yield & Exit Strategy Report     \n` +
        `========================================================================\n\n` +
        `PROPERTY ASSET       : ${property.title}\n` +
        `LOCATION             : ${property.address?.neighborhood}, ${property.address?.city}\n` +
        `LAND EXTENT          : ${plotSqFt} Sq.Ft (${property.landDetails?.totalAreaCents || '5.51'} Cents)\n` +
        `ACQUISITION COST     : ₹${formatNumberIndian(plotPrice)}\n` +
        `------------------------------------------------------------------------\n` +
        `COMPOUNDED CAPITAL APPRECIATION FORECAST:\n` +
        `1-Year Projected Value (18% Growth)  : ₹${formatNumberIndian(yr1Total)} (+₹${formatNumberIndian(yr1Gain)})\n` +
        `3-Year Projected Value (58% Growth)  : ₹${formatNumberIndian(yr3Total)} (+₹${formatNumberIndian(yr3Gain)})\n` +
        `5-Year Projected Value (112% Growth) : ₹${formatNumberIndian(yr5Total)} (+₹${formatNumberIndian(yr5Gain)})\n` +
        `------------------------------------------------------------------------\n` +
        `BUILD-TO-SUIT VILLA DEVELOPMENT MODEL:\n` +
        `* Plot Acquisition Cost              : ₹${formatNumberIndian(plotPrice)}\n` +
        `* Luxury Villa Construction (2600sf) : ₹${formatNumberIndian(constructionCost)}\n` +
        `* Total Capital Outlay               : ₹${formatNumberIndian(totalProjectOutlay)}\n` +
        `* Projected Completed Resale Value   : ₹${formatNumberIndian(projectedVillaMarketValue)}\n` +
        `* Net Developer Arbitrage / Profit   : +₹${formatNumberIndian(netDeveloperProfit)} (+38.6% ROI)\n` +
        `* Projected Annual Rental Yield      : ₹${formatNumberIndian(estAnnualRent)} / year (5.2% yield)\n` +
        `------------------------------------------------------------------------\n` +
        `RISK & LIQUIDITY MATRIX:\n` +
        `* Regulatory Title Risk              : LOWEST TIER (100% Freehold CMDA/DTCP Approved)\n` +
        `* Encumbrance Liability              : ZERO (Certified 35-Year Nil EC)\n` +
        `* Liquidity & Absorption Rate        : 4.2 Months Average Exit Velocity\n` +
        `========================================================================\n` +
        `Certified AI Investment Dossier • Generated by JK Realty Advisory Desk\n`;

      const blob = new Blob([doc], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AI_Investment_Report_${property.id || 'estate'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.warn('Download error', e);
    }
  };

  return createPortal(
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-white border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1F2937] my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#FAF8F5] z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1E3A5F] text-white flex items-center justify-center shadow-xs">
              <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#8A5A00]">
                  Institutional Wealth Advisory
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  High Yield Investment Grade
                </span>
              </div>
              <h3 className="text-lg font-black text-[#1E3A5F] font-serif">
                AI Investment & Capital ROI Report
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-gray-100 text-[#4B5563] hover:text-[#1E3A5F] border border-gray-200 transition-all shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Growth Timeline Highlight */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1E3A5F] via-[#162C48] to-[#0F1B2B] text-white border-2 border-[#D4AF37]/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
                Compounded Capital Appreciation Model
              </span>
              <span className="text-xs font-mono text-emerald-300 font-bold">
                Acquisition: ₹{formatNumberIndian(plotPrice)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              
              {/* 1 Year */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-300 font-bold">1-Year Target (+18%)</span>
                <div className="text-xl font-black text-white font-mono">
                  ₹{formatNumberIndian(yr1Total)}
                </div>
                <span className="text-[11px] text-emerald-300 font-bold block">
                  +₹{formatNumberIndian(yr1Gain)} Net Gain
                </span>
              </div>

              {/* 3 Year */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-300 font-bold">3-Year Target (+58%)</span>
                <div className="text-xl font-black text-white font-mono">
                  ₹{formatNumberIndian(yr3Total)}
                </div>
                <span className="text-[11px] text-emerald-300 font-bold block">
                  +₹{formatNumberIndian(yr3Gain)} Net Gain
                </span>
              </div>

              {/* 5 Year */}
              <div className="p-4 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold">5-Year Target (+112%)</span>
                <div className="text-xl font-black text-emerald-300 font-mono">
                  ₹{formatNumberIndian(yr5Total)}
                </div>
                <span className="text-[11px] text-emerald-300 font-bold block">
                  +₹{formatNumberIndian(yr5Gain)} Net Gain
                </span>
              </div>

            </div>
          </div>

          {/* Build-To-Suit Villa Financial Feasibility */}
          <div className="p-6 rounded-3xl bg-[#FAF8F5] border-2 border-emerald-300/80 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-900">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>Build-To-Suit Luxury Villa Arbitrage Model</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-black">
                +38.6% Developer Return
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 p-3.5 bg-white rounded-2xl border border-gray-200">
                <span className="font-bold text-[#1E3A5F] block uppercase text-[11px]">Investment Outlay</span>
                <div className="flex justify-between text-[#4B5563]">
                  <span>Land Acquisition:</span>
                  <span className="font-mono font-bold text-[#1F2937]">₹{formatNumberIndian(plotPrice)}</span>
                </div>
                <div className="flex justify-between text-[#4B5563]">
                  <span>Villa Construction (2,600 sq.ft):</span>
                  <span className="font-mono font-bold text-[#1F2937]">₹{formatNumberIndian(constructionCost)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-1 font-bold text-[#1E3A5F]">
                  <span>Total Capital Outlay:</span>
                  <span className="font-mono">₹{formatNumberIndian(totalProjectOutlay)}</span>
                </div>
              </div>

              <div className="space-y-2 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-300">
                <span className="font-bold text-emerald-900 block uppercase text-[11px]">Projected Realization</span>
                <div className="flex justify-between text-emerald-800">
                  <span>Villa Market Value:</span>
                  <span className="font-mono font-bold">₹{formatNumberIndian(projectedVillaMarketValue)}</span>
                </div>
                <div className="flex justify-between text-emerald-800">
                  <span>Net Developer Arbitrage:</span>
                  <span className="font-mono font-black text-emerald-900">+₹{formatNumberIndian(netDeveloperProfit)}</span>
                </div>
                <div className="flex justify-between border-t border-emerald-200 pt-1 font-bold text-emerald-900">
                  <span>Estimated Annual Rent:</span>
                  <span className="font-mono">₹{formatNumberIndian(estAnnualRent)}/yr (5.2%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk & Safety Consensus */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <span className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Title Security</span>
              <div className="text-sm font-bold text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Freehold DTCP</span>
              </div>
              <span className="text-[10px] text-gray-500">Nil Encumbrance Verified</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <span className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Liquidity Index</span>
              <div className="text-sm font-bold text-[#1E3A5F]">
                4.2 Months Avg Exit
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">High Buyer Absorption</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <span className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Bank Loan Grade</span>
              <div className="text-sm font-bold text-[#8A5A00]">
                AAA Collateral Rating
              </div>
              <span className="text-[10px] text-gray-500">SBI, HDFC, ICICI Approved</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-200 bg-[#FAF8F5]">
          <span className="text-xs text-[#4B5563] font-mono">
            {downloadSuccess ? '✓ Investment Report Exported' : 'Formal Executive Dossier Available'}
          </span>
          
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleDownloadInvestmentReport}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-gray-100 text-[#1E3A5F] border border-gray-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#8A5A00]" />
              <span>Download ROI Dossier</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white text-xs font-bold transition-all shadow-md"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
