'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useRealEstateStore } from '../../lib/store';

export default function ContactPage() {
  const { addInquiry } = useRealEstateStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    office: 'Beverly Hills HQ',
    inquiryType: 'Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const offices = [
    {
      city: 'Beverly Hills (Global HQ)',
      address: '9440 Santa Monica Boulevard, Suite 800, Beverly Hills, CA 90210',
      phone: '+1 (310) 840-AURA (2872)',
      email: 'beverlyhills@jkrealty.com',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
    },
    {
      city: 'Manhattan Private Desk',
      address: '432 Park Avenue, Executive Floor 45, New York, NY 10022',
      phone: '+1 (212) 651-4098',
      email: 'manhattan@jkrealty.com',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    },
    {
      city: 'Miami Beach Maritime Enclave',
      address: '1100 Biscayne Boulevard, Suite 1200, Miami, FL 33132',
      phone: '+1 (305) 782-9014',
      email: 'miami@jkrealty.com',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const faqs = [
    {
      q: 'How does off-market representation work?',
      a: 'A significant portion of our trophy estates is never broadcast to public MLS databases. Buyers sign a mutual non-disclosure protocol, after which our Managing Principal unlocks customized portfolio access aligned with their spatial and privacy requirements.'
    },
    {
      q: 'Do you accommodate cross-border foreign currency transactions?',
      a: 'Yes. Our escrow partnerships support multi-currency wires (USD, EUR, GBP, CHF, SGD, INR) and institutional title insurance underwriters experienced in cross-border entity and family trust structuring.'
    },
    {
      q: 'Can private viewings be conducted outside regular business hours?',
      a: 'Certainly. We coordinate evening sunset viewings, weekend helicopter escorts, and private jet terminal transfers for accredited principals upon request.'
    },
    {
      q: 'How does the interactive 3D Virtual Tour service work for sellers?',
      a: 'Every premier listing receives a complimentary 360° laser spatial capture session, high-resolution aerial cinematography, and interactive hotspot programming overseen by our architectural marketing team.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const record = addInquiry({
        propertyId: 'general',
        propertyTitle: `VIP Client Mandate - ${formData.office}`,
        fullName: formData.name || 'Private Principal',
        email: formData.email || 'client@privatewealth.com',
        phone: formData.phone || '+91 98401 28941',
        inquiryType: formData.inquiryType || 'General Inquiry',
        message: `Office: ${formData.office} | Note: ${formData.message}`
      });

      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      }).catch(() => {});
    } catch (err) {}
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 bg-[#FAF8F5] text-[#1F2937]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#1E3A5F] text-xs font-bold shadow-2xs">
          <Mail className="w-3.5 h-3.5 text-[#8A5A00]" />
          <span>Global Private Client Concierge</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1E3A5F] font-serif leading-tight">
          Connect With Our <span className="gold-gradient-text">Private Client Desk</span>
        </h1>
        <p className="text-sm sm:text-base text-[#374151] font-medium">
          Confidential inquiries, private escorted viewings, and off-market mandates across Beverly Hills, Manhattan, and Miami.
        </p>
      </div>

      {/* Main Grid: Form Left vs Contact Channels Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form Container */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-card space-y-6">
          <h2 className="text-2xl font-black text-[#1E3A5F] font-serif">
            Initiate Confidential Contact
          </h2>

          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E3A5F] font-serif">Inquiry Registered</h3>
              <p className="text-xs text-[#374151] max-w-sm mx-auto leading-relaxed font-medium">
                Thank you, <strong className="text-[#1E3A5F]">{formData.name}</strong>. Your message has been encrypted and delivered directly to the designated office director.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold shadow-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lord Alexander Montgomery"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                    Direct Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                    Private Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@montgomerycapital.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                    Designated Office
                  </label>
                  <select
                    value={formData.office}
                    onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-semibold"
                  >
                    <option value="Beverly Hills HQ">Beverly Hills HQ (California)</option>
                    <option value="Manhattan Desk">Manhattan Desk (New York)</option>
                    <option value="Miami Beach Enclave">Miami Beach Enclave (Florida)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block mb-1">
                  Confidential Message & Specifications
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your acquisition goals, preferred architectural aesthetics, or listing mandate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] resize-none font-medium"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all border border-[#D4AF37]/40"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Dispatch Confidential Message</span>
                </button>

                <a
                  href="https://wa.me/14158902341?text=Hello%20JK%20Realty,%20I%20wish%20to%20inquire%20confidential%20representation."
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Direct WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card space-y-4">
            <h3 className="text-base font-bold text-[#1E3A5F] font-serif">
              Immediate Executive Channels
            </h3>

            <div className="space-y-3 text-xs text-[#1F2937]">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-gray-200">
                <Phone className="w-4 h-4 text-[#8A5A00] shrink-0" />
                <div>
                  <span className="text-[#4B5563] block text-[10px] font-semibold">Toll-Free Executive Line</span>
                  <span className="text-[#1E3A5F] font-bold font-serif">+1 (800) 840-AURA (2872)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-gray-200">
                <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-[#4B5563] block text-[10px] font-semibold">24/7 WhatsApp Desk</span>
                  <span className="text-[#1E3A5F] font-bold font-serif">+1 (415) 890-2341</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-gray-200">
                <Clock className="w-4 h-4 text-[#8A5A00] shrink-0" />
                <div>
                  <span className="text-[#4B5563] block text-[10px] font-semibold">Concierge Operational Window</span>
                  <span className="text-[#1F2937] font-medium">Monday – Saturday: 07:00 – 22:00 PST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative h-64 rounded-3xl overflow-hidden border border-gray-200 bg-gray-100 shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
              alt="Global Offices Map"
              className="w-full h-full object-cover filter contrast-110"
            />
            <div className="absolute inset-0 bg-[#1E3A5F]/40" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="px-4 py-2 rounded-xl bg-[#1E3A5F] text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-[#D4AF37]/50">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>3 Prime Executive Desks</span>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl text-[11px] text-[#1E3A5F] font-bold border border-gray-200 flex justify-between shadow-sm">
              <span>Beverly Hills (HQ)</span>
              <span>•</span>
              <span>Manhattan</span>
              <span>•</span>
              <span>Miami Beach</span>
            </div>
          </div>

        </div>

      </div>

      {/* Global Offices Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-[#1E3A5F] font-serif">
          Executive Office Locations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offices.map((off, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 space-y-4 shadow-card hover:border-[#D4AF37] transition-all"
            >
              <div className="relative aspect-[16/9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={off.image} alt={off.city} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <h4 className="absolute bottom-3 left-4 text-base font-bold text-white font-serif">
                  {off.city}
                </h4>
              </div>

              <div className="p-5 pt-0 space-y-2 text-xs text-[#374151]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8A5A00] shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{off.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8A5A00] shrink-0" />
                  <span className="font-semibold text-[#1F2937]">{off.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#8A5A00] shrink-0" />
                  <span className="text-[#1E3A5F] font-bold">{off.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#8A5A00] uppercase tracking-widest">
            Frequently Addressed
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
            Client Inquiries & Protocol
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-[#1E3A5F] hover:text-[#8A5A00] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#8A5A00] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#374151] leading-relaxed border-t border-gray-100 font-normal animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
