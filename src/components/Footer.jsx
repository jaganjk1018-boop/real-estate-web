'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Award, 
  Clock, 
  MessageCircle,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import ClientOnly from './ClientOnly';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="bg-[#1E3A5F] text-slate-200 border-t-2 border-[#D4AF37]/40 pt-16 pb-12 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#162c48] border border-white/10 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-serif">100% Verified Titles</h4>
              <p className="text-xs text-slate-300">Every estate undergoes rigorous legal vetting, Patta audit & 30-year search.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#162c48] border border-white/10 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-serif">Trophy Plotted Portfolio</h4>
              <p className="text-xs text-slate-300">Curated high-growth villa plots, duplex penthouses & commercial towers.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#162c48] border border-white/10 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-serif">Private Wealth Advisory</h4>
              <p className="text-xs text-slate-300">24/7 confidential advisory for institutional & private land investors.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#1E3A5F] font-bold shadow-md">
                <Building2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black tracking-widest text-white uppercase font-serif">
                JK <span className="text-[#D4AF37]">REALTY</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Pioneering next-generation luxury real estate and plotted land intelligence. From Chennai high-growth corridors to Beverly Hills trophy estates and Manhattan duplex penthouses.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/919840128941?text=Hello%20JK%20Realty,%20I%20am%20interested%20in%20luxury%20properties"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Advisory
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/10 text-xs font-semibold transition-all"
              >
                <span>Inquire</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          </div>

          {/* Col: Explore Properties */}
          <div className="space-y-3">
            <h5 className="text-white text-sm font-semibold uppercase tracking-wider">Properties</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties?type=buy" className="hover:text-amber-400 transition-colors">
                  Buy Luxury Properties
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Sell Your Property</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 font-bold">AI VALUATION</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=rent" className="hover:text-amber-400 transition-colors">
                  Rent Ultra-Prime Penthouses
                </Link>
              </li>
              <li>
                <Link href="/properties?type=commercial" className="hover:text-amber-400 transition-colors">
                  Commercial Offices & Plazas
                </Link>
              </li>
              <li>
                <Link href="/properties?type=residential" className="hover:text-amber-400 transition-colors">
                  Residential Eco-Manors
                </Link>
              </li>
              <li>
                <Link href="/properties?filter=featured" className="hover:text-amber-400 transition-colors">
                  Featured Trophy Homes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col: Services & Tools */}
          <div className="space-y-3">
            <h5 className="text-white text-sm font-semibold uppercase tracking-wider">Services & Tools</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sell" className="hover:text-amber-400 transition-colors">
                  List Property for Sale
                </Link>
              </li>
              <li>
                <Link href="/sell#seller-valuation-section" className="hover:text-amber-400 transition-colors">
                  Free Instant AI Property Valuation
                </Link>
              </li>
              <li>
                <Link href="/area-intelligence" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Area Market Rate Intelligence</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20">LIVE</span>
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-amber-400 transition-colors">
                  Mortgage & EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators#eligibility" className="hover:text-amber-400 transition-colors">
                  Loan Eligibility Estimator
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-amber-400 transition-colors">
                  Exclusive Client Portfolios
                </Link>
              </li>
            </ul>
          </div>

          {/* Col: Direct Contact & Offices */}
          <div className="space-y-3">
            <h5 className="text-white text-sm font-semibold uppercase tracking-wider">Headquarters</h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>9440 Santa Monica Blvd, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (800) 840-AURA (2872)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>concierge@jkrealty.com</span>
              </div>
            </div>
            
            {/* Newsletter Input */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block mb-1 font-semibold">VIP Market Brief:</span>
              <ClientOnly
                fallback={
                  <div className="h-8 w-48 bg-slate-900/60 rounded-xl border border-white/10 flex items-center px-3 text-[11px] text-slate-500">
                    Enter private email
                  </div>
                }
              >
                {subscribed ? (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Subscribed to VIP Market Brief</span>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => { 
                      e.preventDefault(); 
                      if (newsletterEmail) setSubscribed(true); 
                    }} 
                    className="flex gap-1.5"
                  >
                    <input
                      type="email"
                      required
                      suppressHydrationWarning
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter private email"
                      className="bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] flex-1"
                    />
                    <button
                      type="submit"
                      suppressHydrationWarning
                      className="px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c29e2f] text-[#1E3A5F] font-black text-xs transition-all shadow-sm"
                      title="Subscribe"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </ClientOnly>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} JK Realty Architectural Real Estate Group. All rights reserved. Equal Housing Opportunity.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">About Company</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Market Insights</Link>
            <Link href="/services" className="hover:text-white transition-colors">Client Advisory</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Concierge</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
