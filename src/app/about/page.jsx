'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Globe2, 
  Phone, 
  Mail, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { AGENTS_DATA } from '../../data/agents';

export default function AboutPage() {
  const milestones = [
    { year: '2014', title: 'Founded in Beverly Hills', desc: 'Established as a private advisory desk for architectural collectors.' },
    { year: '2018', title: 'Manhattan & Miami Expansion', desc: 'Inaugurated dedicated penthouse and deep-water waterfront divisions.' },
    { year: '2022', title: '$2B+ Transaction Milestone', desc: 'Ranked in the top 0.1% of luxury real estate advisory groups globally.' },
    { year: '2025', title: 'Next-Gen 3D & AI Innovation', desc: 'Pioneered spatial 360° virtual tours and algorithmic buyer matching.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 bg-[#FAF8F5] text-[#1F2937]">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#1E3A5F] text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#8A5A00]" />
          <span>The JK Heritage</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1E3A5F] font-serif leading-tight">
          Pioneering the Future of <span className="gold-gradient-text">Architectural Luxury</span>
        </h1>
        <p className="text-sm sm:text-base text-[#374151] leading-relaxed font-medium">
          Founded on the uncompromising pursuit of architectural distinction, absolute client discretion, and institutional-grade real estate representation.
        </p>
      </div>

      {/* Hero Visual Image Banner */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-gray-200 shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=85"
          alt="JK Realty Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/90 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-xl text-white">
          <span className="text-[#D4AF37] text-xs font-black uppercase tracking-widest block mb-1">Our Philosophy</span>
          <h3 className="text-xl sm:text-3xl font-bold font-serif leading-snug">&ldquo;A trophy property is not merely real estate; it is a liveable sculpture and a multi-generational legacy.&rdquo;</h3>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#1E3A5F]" />
          </div>
          <h2 className="text-2xl font-black text-[#1E3A5F] font-serif">Our Mission</h2>
          <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-normal">
            To provide ultra-high-net-worth individuals, family offices, and architectural connoisseurs with uncompromised, confidential access to the world’s most coveted residential and commercial spaces.
          </p>
          <ul className="space-y-2 text-xs text-[#1F2937] pt-2 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
              Rigorous title and legal due diligence on every asset
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
              Non-disclosure protocols safeguarding purchaser privacy
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
              Bespoke private wealth and debt structuring advisory
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
            <Globe2 className="w-6 h-6 text-[#1E3A5F]" />
          </div>
          <h2 className="text-2xl font-black text-[#1E3A5F] font-serif">Our Global Vision</h2>
          <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-normal">
            To bridge premier global capitals — from Los Angeles and Manhattan to London, Zurich, and Dubai — through immersive 3D spatial tours, AI match algorithms, and bespoke concierge escrow services.
          </p>
          <ul className="space-y-2 text-xs text-[#1F2937] pt-2 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
              Seamless international currency and wire escrow coordination
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
              Zero-friction remote 360° virtual inspections
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
              Carbon-neutral & net-zero sustainable estates focus
            </li>
          </ul>
        </div>

      </div>

      {/* Leadership & Advisory Team */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#8A5A00] uppercase tracking-widest">
            Executive Directors
          </span>
          <h2 className="text-3xl font-black text-[#1E3A5F] font-serif">
            Meet the Advisory Team
          </h2>
          <p className="text-xs sm:text-sm text-[#374151] font-medium">
            Decades of combined transactional excellence in prime residential and commercial real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS_DATA.map((agent) => (
            <div
              key={agent.id}
              className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-[#D4AF37] text-center space-y-4 transition-all flex flex-col justify-between shadow-card"
            >
              <div className="space-y-3">
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1E3A5F] font-serif">{agent.name}</h3>
                  <span className="text-xs text-[#8A5A00] block font-bold mt-0.5">{agent.title}</span>
                  <span className="text-[11px] text-[#4B5563] block mt-1 font-medium">
                    {agent.experienceYears} Years • {agent.dealsClosed} Estates Closed
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {agent.languages.map((lang) => (
                    <span key={lang} className="text-[9px] px-2 py-0.5 rounded-full bg-[#FAF8F5] text-[#1E3A5F] font-bold border border-gray-200">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-2">
                <a
                  href={`https://wa.me/${agent.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-all shadow-2xs"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${agent.phone}`}
                  className="p-2 rounded-xl bg-[#FAF8F5] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white border border-gray-200 transition-all shadow-2xs"
                  title="Call"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="p-2 rounded-xl bg-[#FAF8F5] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white border border-gray-200 transition-all shadow-2xs"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Milestones Timeline */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-black text-[#8A5A00] uppercase tracking-widest block mb-1">
            Proven Track Record
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
            A Decade of Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-card space-y-2 relative"
            >
              <span className="text-2xl font-black text-[#1E3A5F] font-serif block">
                {m.year}
              </span>
              <h4 className="text-sm font-bold text-[#1E3A5F]">{m.title}</h4>
              <p className="text-xs text-[#374151] leading-relaxed font-normal">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/40 shadow-card text-center space-y-5">
        <h3 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
          Ready to Discuss Your Portfolio?
        </h3>
        <p className="text-xs sm:text-sm text-[#374151] max-w-xl mx-auto font-medium">
          Our senior principals are at your disposal for confidential acquisitions, listings, and private market appraisals.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all border border-[#D4AF37]/40"
          >
            Connect With Our Desk
          </Link>
          <Link
            href="/properties"
            className="px-6 py-3.5 rounded-xl bg-[#FAF8F5] text-[#1E3A5F] hover:bg-gray-100 text-xs font-bold border border-gray-300"
          >
            Browse Properties
          </Link>
        </div>
      </div>

    </div>
  );
}
