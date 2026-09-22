'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  MessageCircle, 
  Plane, 
  Car, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Wine 
} from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import { formatLocalizedPrice } from '../lib/utils';

export default function ScheduleVisitModal({ property, isOpen, onClose }) {
  const { addInquiry, currency } = useRealEstateStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Default preferred date to tomorrow
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    visitFormat: 'In-Person Tour',
    arrivalMode: 'Rolls-Royce Chauffeur',
    catering: 'Champagne & Caviar',
    ndaAgreed: true,
    preferredDate: getTomorrowDate(),
    preferredTime: '14:00 PM',
    message: ''
  });
  const [createdPass, setCreatedPass] = useState(null);

  // Lock background page scroll so the main page stays completely stationary / fixed ("standed")
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
      if (e.key === 'Escape') {
        setCreatedPass(null);
        onClose();
      }
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

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityTag = (property?.address?.city || 'LUX').replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() || 'LUX';
    const randomPassCode = `VIP-${Math.floor(1000 + Math.random() * 9000)}-${cityTag}`;

    const newRecord = addInquiry({
      propertyId: property?.id || 'general',
      propertyTitle: property?.title || 'Trophy Architectural Estate',
      fullName: formData.fullName || 'Julian Montgomery',
      email: formData.email || 'client@privatewealth.com',
      phone: formData.phone || '+91 98401 28941',
      inquiryType: 'Schedule Site Visit',
      preferredDate: formData.preferredDate || getTomorrowDate(),
      preferredTime: formData.preferredTime || '14:00 PM',
      visitFormat: formData.visitFormat || 'In-Person Tour',
      arrivalMode: formData.arrivalMode || 'Rolls-Royce Chauffeur',
      catering: formData.catering || 'Champagne & Caviar',
      ndaAgreed: formData.ndaAgreed ?? true,
      vipPassId: randomPassCode,
      pipelineStage: 'VIP Tour Confirmed',
      message: formData.message || `VIP viewing requested via ${formData.arrivalMode || 'Chauffeur'} with ${formData.catering || 'Beverages'}.`
    });

    try {
      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newRecord,
          vipPassId: randomPassCode
        })
      }).catch(() => {});
    } catch (err) {}

    setCreatedPass({
      ...newRecord,
      vipPassId: randomPassCode,
      arrivalMode: formData.arrivalMode || 'Rolls-Royce Chauffeur',
      catering: formData.catering || 'Champagne & Caviar'
    });
  };

  const handleDownloadICS = () => {
    const rawDate = (formData.preferredDate || '20260325').replace(/-/g, '');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//JK Realty Luxury Real Estate//VIP Viewing Pass//EN
BEGIN:VEVENT
SUMMARY:VIP Private Estate Viewing: ${property?.title || 'Trophy Estate'}
DESCRIPTION:VIP Escort Arrival Mode: ${formData.arrivalMode || 'Chauffeur'}. Catering: ${formData.catering || 'Beverages'}. Pass ID: ${createdPass?.vipPassId || 'VIP-PASS'}
LOCATION:${property?.address ? `${property.address.street || ''}, ${property.address.city || ''}` : 'Private Estate Location'}
DTSTART:${rawDate}T140000Z
DTEND:${rawDate}T160000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `VIP_Viewing_${createdPass?.vipPassId || 'Pass'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello JK Realty Concierge, I am interested in scheduling a private VIP viewing for "${property?.title || 'Tambaram Royal Avenue Prime Villa Plot'}" with pass request ${createdPass?.vipPassId || 'VIP-REQUEST'}. My name is ${formData.fullName || 'a client'}.`
    );
    window.open(`https://wa.me/919840128941?text=${text}`, '_blank');
  };

  return createPortal(
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setCreatedPass(null);
          onClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-xl max-h-[85vh] bg-white border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#FAF8F5] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#8A5A00]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E3A5F] font-serif">
                VIP Private Viewing Experience
              </h3>
              <p className="text-[11px] text-[#4B5563]">
                White-glove chauffeur, helicopter arrival & discrete sommelier service
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCreatedPass(null);
              onClose();
            }}
            className="p-2 rounded-xl bg-white hover:bg-gray-100 text-[#4B5563] hover:text-[#1E3A5F] border border-gray-200 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 min-h-0 overscroll-contain space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#D4AF37] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#FAF8F5]">
          {createdPass ? (
            /* VIP DIGITAL BOARDING PASS CARD */
            <div className="space-y-6 animate-in zoom-in-95">
              <div className="relative rounded-3xl border border-[#D4AF37]/60 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] p-6 shadow-xl overflow-hidden">
                
                {/* Top Boarding Pass Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <div>
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#8A5A00] font-black block">
                      JK REALTY VIP PRIVATE PASS
                    </span>
                    <h4 className="text-lg font-bold text-[#1E3A5F] font-serif mt-0.5">
                      {createdPass.propertyTitle}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#4B5563] block">Pass Identifier</span>
                    <span className="text-xs font-mono font-bold text-[#1E3A5F] tracking-widest">{createdPass.vipPassId}</span>
                  </div>
                </div>

                {/* Pass Details Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-200 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-[#4B5563] block font-semibold">Guest Principal</span>
                    <span className="font-bold text-[#1E3A5F]">{createdPass.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#4B5563] block font-semibold">Scheduled Window</span>
                    <span className="font-bold text-[#8A5A00]">{createdPass.preferredDate} @ {createdPass.preferredTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#4B5563] block font-semibold">Arrival Escort Mode</span>
                    <span className="font-medium text-[#1F2937] flex items-center gap-1">
                      {createdPass?.arrivalMode?.includes('Helicopter') ? <Plane className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Car className="w-3.5 h-3.5 text-[#1E3A5F]" />}
                      {createdPass?.arrivalMode || 'Rolls-Royce Chauffeur'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#4B5563] block font-semibold">Concierge Provision</span>
                    <span className="font-medium text-[#1F2937] flex items-center gap-1">
                      <Wine className="w-3.5 h-3.5 text-rose-600" />
                      {createdPass?.catering || 'Champagne & Caviar'}
                    </span>
                  </div>
                </div>

                {/* Simulated QR Pass */}
                <div className="pt-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Security Clearance: CONFIRMED</span>
                    </div>
                    <p className="text-[10px] text-[#4B5563] max-w-[260px]">
                      Present digital QR or iCal pass to security gate upon estate perimeter approach.
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-[#1E3A5F] p-1.5 flex items-center justify-center shadow-md">
                    {/* Stylized QR Matrix */}
                    <div className="w-full h-full border-2 border-white grid grid-cols-3 gap-0.5 p-0.5">
                      <div className="bg-white" />
                      <div className="bg-transparent" />
                      <div className="bg-white" />
                      <div className="bg-transparent" />
                      <div className="bg-white" />
                      <div className="bg-transparent" />
                      <div className="bg-white" />
                      <div className="bg-transparent" />
                      <div className="bg-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleDownloadICS}
                  className="w-full sm:w-1/2 py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#1E3A5F]/20 transition-all"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Apple / Google Calendar</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="w-full sm:w-1/2 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-300 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Notify Concierge via WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Property Snapshot */}
              {property && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#1E3A5F] truncate">{property.title}</h4>
                    <p className="text-[11px] text-[#4B5563]">{property.address.neighborhood}, {property.address.city}</p>
                    <span className="text-[11px] font-bold text-[#1E3A5F] font-serif">{formatLocalizedPrice(property.price, currency, property.priceSuffix, property.currency)}</span>
                  </div>
                </div>
              )}

              {/* Arrival Escort Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1F2937] flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Arrival & Escort Mode</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Rolls-Royce Chauffeur', label: 'Rolls-Royce Escort' },
                    { id: 'Private Helicopter Flyover', label: 'Private Helicopter' },
                    { id: 'In-Person Tour', label: 'White-Glove Walkthrough' },
                    { id: 'Live 4K Drone Stream', label: '4K Drone Virtual Stream' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, arrivalMode: mode.id })}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                        formData.arrivalMode === mode.id
                          ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] font-bold shadow-sm'
                          : 'bg-[#FAF8F5] text-[#1F2937] border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Catering Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1F2937] flex items-center gap-1.5">
                  <Wine className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Concierge Hospitality & Sommelier Service</span>
                </label>
                <select
                  value={formData.catering}
                  onChange={(e) => setFormData({ ...formData, catering: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-gray-300 text-xs text-[#1F2937] focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                >
                  <option value="Champagne & Caviar">Dom Pérignon & Petrossian Caviar Service</option>
                  <option value="Sommelier Wine Tasting">Grand Cru Bordeaux Wine Flight</option>
                  <option value="Artisan Espresso Bar">Artisan Single-Origin Espresso & Pastries</option>
                  <option value="Discreet Sparkling Water">Discreet Alkaline Spring Water Only</option>
                </select>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#1F2937]">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-gray-300 text-xs text-[#1F2937] focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#1F2937]">Preferred Time Window</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-gray-300 text-xs text-[#1F2937] focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  >
                    <option value="10:00 AM">10:00 AM (Morning Natural Light)</option>
                    <option value="14:00 PM">02:00 PM (Midday Solar Arc)</option>
                    <option value="17:30 PM">05:30 PM (Golden Hour Sunset)</option>
                    <option value="20:00 PM">08:00 PM (Night Architectural Lights)</option>
                  </select>
                </div>
              </div>

              {/* Client Contact Inputs */}
              <div className="space-y-2 pt-1 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Principal Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-gray-300 text-xs text-[#1F2937] placeholder:text-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Private Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-gray-300 text-xs text-[#1F2937] placeholder:text-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Direct Mobile / WhatsApp"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-gray-300 text-xs text-[#1F2937] placeholder:text-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                />
              </div>

              {/* NDA Checkbox */}
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-200 cursor-pointer text-xs text-[#1F2937]">
                <input
                  type="checkbox"
                  checked={formData.ndaAgreed}
                  onChange={(e) => setFormData({ ...formData, ndaAgreed: e.target.checked })}
                  className="accent-[#1E3A5F] w-4 h-4 rounded"
                />
                <span>Execute Mutual Non-Disclosure Agreement (Principal Confidentiality Protected)</span>
              </label>

              {/* Submit Button */}
              <div className="pt-2 pb-2 shrink-0">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#1E3A5F]/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Confirm VIP Viewing & Issue Digital Pass</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>,
    document.body
  );
}
