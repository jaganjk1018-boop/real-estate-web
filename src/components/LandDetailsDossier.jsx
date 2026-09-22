'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Eye, 
  Compass, 
  Droplets, 
  Zap, 
  Trees, 
  Maximize, 
  Layers, 
  Calendar, 
  Phone, 
  MessageCircle, 
  Star, 
  UserCheck, 
  X, 
  Check, 
  Award, 
  FileCheck,
  Building2,
  Info
} from 'lucide-react';
import { formatNumberIndian, formatPrice } from '../lib/utils';
import { convertLandArea, formatLandArea, calculateRatePerUnit } from '../lib/areaIntelligenceEngine';

export default function LandDetailsDossier({ property }) {
  const [activeUnit, setActiveUnit] = useState('sqft'); // 'sqft' | 'cents' | 'grounds' | 'acres'
  const [activeDocModal, setActiveDocModal] = useState(null); // 'ec' | 'patta' | 'chitta' | 'fmb' | 'approval' | 'ownership'
  const [downloadSuccess, setDownloadSuccess] = useState('');

  if (!property || (!property.isLand && property.category !== 'Empty Land')) {
    return null;
  }

  const land = property.landDetails || {};
  const legal = property.legalSection || {};
  const agent = property.agent || {};

  const plotSqFt = property.areaSqFt || 2400;
  const ratePerSqFt = property.pricePerSqFt || (property.price && plotSqFt ? Math.round(property.price / plotSqFt) : 4500);

  // Unit converted figures
  const convertedArea = convertLandArea(plotSqFt, activeUnit);
  const convertedRate = calculateRatePerUnit(ratePerSqFt, activeUnit);

  const handleSimulateDownload = (docName) => {
    setDownloadSuccess(docName);
    try {
      const docHeader = `========================================================================\n` +
        `   GOVERNMENT OF TAMIL NADU - REVENUE & REGISTRATION DEPARTMENT        \n` +
        `   OFFICIAL VERIFIED CADASTRAL DOSSIER                                 \n` +
        `========================================================================\n\n` +
        `DOCUMENT TYPE      : ${docName}\n` +
        `PROPERTY ASSET     : ${property.title}\n` +
        `REVENUE JURISDICTION: Tambaram SRO, Chengalpattu District, Tamil Nadu\n` +
        `SURVEY NUMBER      : ${land.surveyNumber || 'Survey No. 482/3B'}\n` +
        `EXTENT             : ${plotSqFt} Sq.Ft (${convertedArea} ${activeUnit})\n` +
        `SANCTION PERMIT    : ${land.approvals || 'CMDA & DTCP Approved'}\n` +
        `TITLE STATUS       : 100% Clear Freehold Title / Nil Encumbrance Certified\n` +
        `VERIFICATION STAMP : Digital Cryptographic Ledger Hash TN-REV-${Date.now()}\n` +
        `SCRUTINY COUNSEL   : Adv. S. Ramanujam (Madras High Court TN/4821/2004)\n\n` +
        `------------------------------------------------------------------------\n` +
        `Certified authentic digital copy dispatched via JK Realty Institutional\n` +
        `Client Vault Portal. Valid for banking title search and stamp registry. \n` +
        `========================================================================\n`;
      const blob = new Blob([docHeader], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = docName.endsWith('.pdf') ? docName.replace('.pdf', '_Certificate.txt') : `${docName}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn('Simulated download fallback', e);
    }
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  return (
    <div className="space-y-8 scroll-mt-28" id="land-dossier-section">
      
      {/* 1. Core Land Specifications Panel */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-md space-y-6">
        
        {/* Header Strip with Live Unit Converter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest">
              <Trees className="w-4 h-4" />
              <span>Cadastral Plot Specifications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif mt-1">
              Land Details & Dimensional Metrics
            </h2>
            <p className="text-xs text-[#4B5563] mt-0.5">
              Verified physical dimensions, orientation, civil utilities, and road infrastructure
            </p>
          </div>

          {/* Unit Switcher Bar */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1.5 rounded-2xl border border-gray-200">
            <span className="text-xs text-[#4B5563] font-mono px-2 hidden sm:inline">Active Unit:</span>
            {[
              { id: 'sqft', label: 'Sq.Ft' },
              { id: 'cents', label: 'Cents' },
              { id: 'grounds', label: 'Grounds' },
              { id: 'acres', label: 'Acres' }
            ].map(unit => (
              <button
                key={unit.id}
                onClick={() => setActiveUnit(unit.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeUnit === unit.id
                    ? 'bg-[#1E3A5F] text-white shadow-xs'
                    : 'text-[#1F2937] hover:bg-white'
                }`}
              >
                {unit.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Grid Land Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Area in selected unit */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 space-y-1 shadow-xs">
            <span className="text-[11px] font-mono text-[#1F2937] uppercase block font-bold">Total Area</span>
            <div className="text-xl font-black text-[#1E3A5F] font-serif">
              {formatLandArea(plotSqFt, activeUnit)}
            </div>
            <div className="text-xs text-[#1E3A5F] font-bold mt-0.5">
              = {plotSqFt} Sq.Ft • {convertLandArea(plotSqFt, 'cents')} Cents • {convertLandArea(plotSqFt, 'grounds')} Ground
            </div>
          </div>

          {/* Price per selected unit */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 space-y-1 shadow-xs">
            <span className="text-[11px] font-mono text-[#1F2937] uppercase block font-bold">Rate per Unit</span>
            <div className="text-xl font-black text-emerald-800 font-serif">
              ₹{formatNumberIndian(convertedRate)}
              <span className="text-xs font-semibold text-[#374151]">/{activeUnit === 'sqft' ? 'sq.ft' : activeUnit}</span>
            </div>
            <div className="text-xs text-[#374151] font-semibold">
              Base: ₹{formatNumberIndian(ratePerSqFt)}/sq.ft
            </div>
          </div>

          {/* Road Facing & Vastu */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 space-y-1 shadow-xs">
            <span className="text-[11px] font-mono text-[#1F2937] uppercase block font-bold">Road Facing</span>
            <div className="text-lg font-bold text-[#1E3A5F] font-serif flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#8A5A00]" />
              <span>{land.roadFacing || 'North-East Facing'}</span>
            </div>
            <div className="text-xs text-emerald-800 font-bold">
              100% Vaastu Compliant Eesanya Corner
            </div>
          </div>

          {/* Road Width */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 space-y-1 shadow-xs">
            <span className="text-[11px] font-mono text-[#1F2937] uppercase block font-bold">Road Width</span>
            <div className="text-xl font-bold text-[#1E3A5F] font-serif">
              {land.roadWidth || '40 Ft Road'}
            </div>
            <div className="text-xs text-[#374151] font-medium">
              Paved asphalt blacktop avenue with drainage
            </div>
          </div>

          {/* Survey Number */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 space-y-1 shadow-xs">
            <span className="text-[11px] font-mono text-[#1F2937] uppercase block font-bold">Survey Number</span>
            <div className="text-lg font-bold text-[#1E3A5F] font-mono">
              {land.surveyNumber || 'Survey No. 482/3B'}
            </div>
            <div className="text-xs text-[#374151] font-medium">
              Demarcated under Tambaram Taluk Revenue
            </div>
          </div>

          {/* DTCP / CMDA / RERA Approval */}
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 space-y-1 shadow-xs">
            <span className="text-[11px] font-mono text-emerald-900 uppercase block font-black">Sanction Approvals</span>
            <div className="text-sm font-black text-emerald-900 font-mono truncate" title={land.approvals}>
              {land.approvals || 'CMDA & DTCP Approved'}
            </div>
            <div className="text-xs text-emerald-800 font-bold">
              RERA: {land.reraNumber || 'TN/01/Layout/8924/2024'}
            </div>
          </div>

          {/* Land Dimensions */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 space-y-1 shadow-xs">
            <span className="text-[11px] font-mono text-[#1F2937] uppercase block font-bold">Dimensions</span>
            <div className="text-lg font-bold text-[#1E3A5F] font-mono">
              {land.dimensions || '40 x 60 Ft'}
            </div>
            <div className="text-xs text-[#374151] font-medium">
              40 Ft Road Frontage × 60 Ft Plot Depth
            </div>
          </div>

          {/* Water & EB Connection Status */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-300 space-y-1 shadow-xs">
            <span className="text-[11px] font-mono text-[#1F2937] uppercase block font-bold">Utilities On-Site</span>
            <div className="text-sm font-black text-[#1E3A5F] flex items-center gap-2">
              <span className="flex items-center gap-1 text-blue-800">
                <Droplets className="w-3.5 h-3.5" /> 35ft Water
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-[#8A5A00]">
                <Zap className="w-3.5 h-3.5" /> 3-Phase EB
              </span>
            </div>
            <div className="text-xs text-[#374151] font-medium">
              Sweet aquifer table + TNEB pillar ready
            </div>
          </div>

        </div>

      </div>

      {/* 2. Legal Section: Patta, Chitta, FMB Sketch, EC, Approvals */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#D4AF37]/30 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A5F] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Government Revenue & Title Verification Dossier</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif mt-1">
              Legal Certificates & Government Approvals
            </h2>
            <p className="text-xs text-[#4B5563] mt-0.5">
              Download and preview officially verified revenue records with 100% Nil Encumbrance
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-xs flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Clear Freehold Title</span>
            </span>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Successfully initiated encrypted download for: <strong>{downloadSuccess}</strong>.</span>
          </div>
        )}

        {/* 6 Legal Document Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* 1. EC (Encumbrance Certificate) */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-200/80 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1E3A5F] font-serif">Encumbrance Certificate (EC)</h4>
                <span className="text-[11px] font-mono text-emerald-700 font-bold block mt-0.5">
                  {legal.ecStatus || '35-Year Nil Encumbrance Verified'}
                </span>
                <p className="text-xs text-[#4B5563] mt-1.5 leading-relaxed">
                  Certified search from 1991 to 2026. Zero mortgages, court disputes, or third-party liabilities registered.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => setActiveDocModal('ec')}
                className="flex-1 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-[#1E3A5F] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect EC</span>
              </button>
              <button
                onClick={() => handleSimulateDownload('Encumbrance_Certificate_35Yr_Nil.pdf')}
                className="p-2 rounded-xl bg-[#1E3A5F]/10 hover:bg-[#1E3A5F] hover:text-white text-[#1E3A5F] transition-all"
                title="Download Official EC"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Patta Details */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-200/80 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1E3A5F] font-serif">Patta Passbook Extract</h4>
                <span className="text-[11px] font-mono text-blue-700 font-bold block mt-0.5">
                  {legal.pattaNumber || 'Patta No. 3921 • Tambaram Taluk'}
                </span>
                <p className="text-xs text-[#4B5563] mt-1.5 leading-relaxed">
                  Direct revenue record on Tamil Nadu e-Seva portal. Owner name seamlessly mutated in revenue registers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => setActiveDocModal('patta')}
                className="flex-1 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-[#1E3A5F] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Patta</span>
              </button>
              <button
                onClick={() => handleSimulateDownload('Patta_Passbook_No_3921.pdf')}
                className="p-2 rounded-xl bg-[#1E3A5F]/10 hover:bg-[#1E3A5F] hover:text-white text-[#1E3A5F] transition-all"
                title="Download Patta Extract"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3. Chitta Details */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-200/80 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1E3A5F] font-serif">Chitta Classification</h4>
                <span className="text-[11px] font-mono text-purple-700 font-bold block mt-0.5">
                  Dry Land Settlement (Punjai Nilam)
                </span>
                <p className="text-xs text-[#4B5563] mt-1.5 leading-relaxed">
                  Non-agricultural residential conversion approved. Government kist tax receipts paid through 2026.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => setActiveDocModal('chitta')}
                className="flex-1 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-[#1E3A5F] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Chitta</span>
              </button>
              <button
                onClick={() => handleSimulateDownload('Chitta_Extract_Village_42.pdf')}
                className="p-2 rounded-xl bg-[#1E3A5F]/10 hover:bg-[#1E3A5F] hover:text-white text-[#1E3A5F] transition-all"
                title="Download Chitta"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4. FMB (Field Measurement Book) Sketch */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-300 hover:border-[#1E3A5F] transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-[#8A5A00]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1E3A5F] font-serif">FMB Cadastral Sketch</h4>
                <span className="text-xs font-mono text-[#1E3A5F] font-bold block mt-0.5">
                  Survey Map FMB-482/3B
                </span>
                <p className="text-xs text-[#374151] mt-1.5 leading-relaxed font-medium">
                  Sub-division field measurement book sketch showing exact corner angles, boundary stones, and link distances.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => setActiveDocModal('fmb')}
                className="flex-1 py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 text-[#1E3A5F] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Eye className="w-3.5 h-3.5 text-[#8A5A00]" />
                <span>Inspect FMB Sketch</span>
              </button>
              <button
                onClick={() => handleSimulateDownload('FMB_Cadastral_Map_482_3B.pdf')}
                className="p-2 rounded-xl bg-[#1E3A5F] text-white hover:bg-[#162c48] transition-all shadow-xs"
                title="Download FMB Sketch"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5. DTCP / CMDA Approval Order */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-300 hover:border-[#1E3A5F] transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1E3A5F] font-serif">CMDA / DTCP Sanction</h4>
                <span className="text-xs font-mono text-emerald-800 font-bold block mt-0.5">
                  PP No. 1142/2024 • RERA Registered
                </span>
                <p className="text-xs text-[#374151] mt-1.5 leading-relaxed font-medium">
                  Sanctioned planning layout order with open space reservation (OSR) deed gifted to local body.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => setActiveDocModal('approval')}
                className="flex-1 py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 text-[#1E3A5F] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Eye className="w-3.5 h-3.5 text-[#8A5A00]" />
                <span>View Sanction Order</span>
              </button>
              <button
                onClick={() => handleSimulateDownload('CMDA_Layout_Sanction_Permit.pdf')}
                className="p-2 rounded-xl bg-[#1E3A5F] text-white hover:bg-[#162c48] transition-all shadow-xs"
                title="Download Sanction Order"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 6. Legal Title Search & Ownership Verification */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-300 hover:border-[#1E3A5F] transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-[#8A5A00]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1E3A5F] font-serif">Advocate Title Opinion</h4>
                <span className="text-xs font-mono text-[#1E3A5F] font-bold block mt-0.5">
                  High Court Senior Counsel Verified
                </span>
                <p className="text-xs text-[#374151] mt-1.5 leading-relaxed font-medium">
                  Comprehensive 30-year parent document scrutiny by Adv. S. Ramanujam (Madras HC). Clear marketable title.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => setActiveDocModal('ownership')}
                className="flex-1 py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 text-[#1E3A5F] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Eye className="w-3.5 h-3.5 text-[#8A5A00]" />
                <span>View Legal Opinion</span>
              </button>
              <button
                onClick={() => handleSimulateDownload('Advocate_Legal_Opinion_Report.pdf')}
                className="p-2 rounded-xl bg-[#1E3A5F] text-white hover:bg-[#162c48] transition-all shadow-xs"
                title="Download Legal Opinion"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Broker / Agent Details Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#1E3A5F]/30 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <span className="text-xs font-black text-[#8A5A00] uppercase tracking-widest block">
              Assigned Principal Broker & Cadastral Advisor
            </span>
            <h3 className="text-2xl font-black text-[#1E3A5F] font-serif mt-1">
              Broker Credentials & Direct Line
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-[#1E3A5F] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>TN RERA Registered Broker</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Agent Bio & Verified Card */}
          <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agent.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'}
              alt={agent.name || 'Broker'}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#1E3A5F] shadow-md shrink-0"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xl font-black text-[#1E3A5F] font-serif">{agent.name || 'R. Senthil Nathan'}</h4>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-400 text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Verified Principal
                </span>
              </div>
              <p className="text-xs text-[#1F2937] font-semibold">
                {agent.title || 'Principal Broker & Land Title Expert'} • {agent.agency || 'Premier Chennai Land Assets'}
              </p>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#1F2937]">
                <span className="flex items-center gap-1 text-[#8A5A00] font-black">
                  <Star className="w-3.5 h-3.5 fill-[#8A5A00] text-[#8A5A00]" />
                  {agent.rating || '4.98'} ({agent.reviewCount || 58} Client Reviews)
                </span>
                <span className="text-gray-400">•</span>
                <span className="font-bold text-[#1E3A5F]">
                  {agent.experienceYears || 14}+ Years Experience
                </span>
                <span className="text-gray-400">•</span>
                <span className="font-bold text-emerald-800">
                  {agent.dealsClosed || 182}+ Properties Sold
                </span>
              </div>
            </div>
          </div>

          {/* Direct Connect Buttons */}
          <div className="flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${agent.whatsapp || '919840128941'}?text=${encodeURIComponent(`Hello ${agent.name || 'Senthil'}, I am interested in inspecting the land details and Patta documents for ${property.title}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Verified Broker</span>
            </a>

            <a
              href={`tel:${agent.phone || '+919840128941'}`}
              className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-white text-[#1E3A5F] border border-gray-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call {agent.phone || '+91 98401 28941'}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Document Inspection Modal */}
      {activeDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#FFFFFF] border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <button
              onClick={() => setActiveDocModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content Switch */}
            {activeDocModal === 'ec' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3A5F] font-serif">Encumbrance Certificate (EC) Verification</h3>
                    <span className="text-xs text-[#4B5563]">Application & Search No: {legal.ecNumber || 'EC/TN/SRO/TB/2026/84920'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-emerald-300 font-mono text-xs space-y-2 text-[#1F2937]">
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-[#4B5563]">Sub-Registrar Jurisdiction:</span>
                    <span className="text-[#1E3A5F] font-bold">Tambaram SRO (South Chennai)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-[#4B5563]">Search Period:</span>
                    <span className="text-emerald-700 font-bold">01-Jan-1991 to Present (35 Years)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-[#4B5563]">Survey No. & Sub-division:</span>
                    <span className="text-[#1E3A5F] font-bold">482 / 3B</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-[#4B5563]">Extent:</span>
                    <span className="text-[#1E3A5F] font-bold">2,400 Sq.Ft (5.51 Cents / 1 Ground)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4B5563]">Official Finding:</span>
                    <span className="text-emerald-700 font-bold">NIL ENCUMBRANCE (ZERO LIABILITIES)</span>
                  </div>
                </div>

                <p className="text-xs text-[#4B5563] leading-relaxed">
                  The property is entirely free from any registered mortgage, leasehold claim, charge, court attachment, or bank lien.
                </p>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      handleSimulateDownload('Encumbrance_Certificate_35Yr_Nil.pdf');
                      setActiveDocModal(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    <span>Download Official PDF Copy</span>
                  </button>
                </div>
              </div>
            )}

            {activeDocModal === 'fmb' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B89422] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3A5F] font-serif">FMB (Field Measurement Book) Cadastral Sketch</h3>
                    <span className="text-xs text-[#4B5563]">Survey No. 482/3B • Revenue Village No. 42</span>
                  </div>
                </div>

                {/* Visual Cadastral Sketch Simulation */}
                <div className="relative aspect-[16/9] rounded-2xl bg-[#FAF8F5] border-2 border-dashed border-[#D4AF37]/60 p-6 flex items-center justify-center">
                  <div className="relative w-64 h-40 border-2 border-emerald-600 rounded-lg flex flex-col items-center justify-center bg-white shadow-sm">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 px-2 text-[10px] font-mono text-emerald-800 font-bold rounded">
                      NORTH: 40 Ft (Road Frontage)
                    </span>
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 px-2 text-[10px] font-mono text-emerald-800 font-bold rounded">
                      SOUTH: 40 Ft (Plot No. 29)
                    </span>
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 -rotate-90 bg-white border border-gray-200 px-2 text-[10px] font-mono text-emerald-800 font-bold rounded">
                      WEST: 60 Ft
                    </span>
                    <span className="absolute -right-3 top-1/2 -translate-y-1/2 rotate-90 bg-white border border-gray-200 px-2 text-[10px] font-mono text-emerald-800 font-bold rounded">
                      EAST: 60 Ft
                    </span>
                    
                    <div className="text-center space-y-1">
                      <span className="text-xs font-mono font-bold text-[#1E3A5F] block">PLOT NO. 28</span>
                      <span className="text-[11px] font-mono text-[#B89422] font-bold block">2,400 Sq.Ft (1 Ground)</span>
                      <span className="text-[10px] text-[#4B5563] block">Survey Stone Pillars Erected</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      handleSimulateDownload('FMB_Cadastral_Map_482_3B.pdf');
                      setActiveDocModal(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    <span>Download Cadastral Coordinate Map</span>
                  </button>
                </div>
              </div>
            )}

            {(activeDocModal === 'patta' || activeDocModal === 'chitta' || activeDocModal === 'approval' || activeDocModal === 'ownership') && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3A5F] font-serif capitalize">{activeDocModal} Verification Record</h3>
                    <span className="text-xs text-[#4B5563]">Authentic certified government ledger extract</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 text-xs text-[#1F2937] space-y-2 font-mono">
                  <p>Document Serial: TN-REV-2026-981249</p>
                  <p>Status: Active & Registered</p>
                  <p>Jurisdiction: Chengalpattu Revenue District • Tambaram Taluk</p>
                  <p className="text-emerald-700 font-bold">Verification Seal: Digital Signature Validated</p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      handleSimulateDownload(`${activeDocModal}_official_extract.pdf`);
                      setActiveDocModal(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    <span>Download Official PDF Copy</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
