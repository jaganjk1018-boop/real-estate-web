'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown, 
  Building2, 
  Award, 
  ArrowRight, 
  ShieldCheck,
  Flame,
  X
} from 'lucide-react';
import { AGENT_SUBSCRIPTIONS, PROMOTION_PACKAGES } from '../../data/pricingPlans';
import { formatPrice } from '../../lib/utils';
import { useRealEstateStore } from '../../lib/store';

export default function PricingPage() {
  const { currency } = useRealEstateStore();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annually'
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 bg-[#FAF8F5] text-[#1F2937]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#1E3A5F] text-xs font-bold shadow-2xs">
          <Crown className="w-3.5 h-3.5 text-[#8A5A00]" />
          <span>Seller & Client Advisory Services</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1E3A5F] font-serif leading-tight">
          Seller Marketing & <span className="gold-gradient-text">Listing Promotion</span>
        </h1>
        <p className="text-sm sm:text-base text-[#374151] font-medium">
          Showcase your trophy property to verified high-intent luxury buyers worldwide with bespoke marketing, 360° virtual tours, and private syndication.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="flex justify-center items-center gap-3 pt-4">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-[#1E3A5F]' : 'text-[#6B7280]'}`}>
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
            className="w-12 h-6 rounded-full bg-gray-200 p-1 border border-gray-300 relative transition-colors"
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#1E3A5F] transition-transform ${
                billingCycle === 'annually' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === 'annually' ? 'text-[#1E3A5F]' : 'text-[#6B7280]'}`}>
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300 shadow-2xs">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* 1. AGENT SUBSCRIPTION PLANS */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
            Agent & Brokerage Membership
          </h2>
          <p className="text-xs text-[#374151] font-medium mt-1">
            Choose your tier for active listing syndication and direct lead capture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {AGENT_SUBSCRIPTIONS.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : Math.round(plan.priceAnnually / 12);
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between border bg-white transition-all duration-300 shadow-card ${
                  plan.popular
                    ? 'border-2 border-[#D4AF37] shadow-luxury-hover scale-105 z-10'
                    : 'border-gray-200 hover:border-[#D4AF37]/50'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#1E3A5F] text-white border border-[#D4AF37]/40 shadow-md">
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-5">
                  <div>
                    <span className="text-xs text-[#8A5A00] uppercase font-black tracking-wider">
                      {plan.targetAudience}
                    </span>
                    <h3 className="text-2xl font-black text-[#1E3A5F] font-serif mt-1">{plan.name}</h3>
                    <p className="text-xs text-[#374151] font-medium mt-2 leading-relaxed">{plan.tagline}</p>
                  </div>

                  <div className="pb-4 border-b border-gray-200">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#1E3A5F] font-serif">
                        {formatPrice(price, currency)}
                      </span>
                      <span className="text-xs text-[#6B7280] font-semibold">/ month</span>
                    </div>
                    {billingCycle === 'annually' && (
                      <span className="text-[10px] text-emerald-800 font-bold block mt-1">
                        Billed annually ({formatPrice(plan.priceAnnually, currency)} / yr)
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 text-xs text-[#1F2937]">
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanModal(plan.name)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
                      plan.popular
                        ? 'bg-[#1E3A5F] hover:bg-[#162c48] text-white border border-[#D4AF37]/40'
                        : 'bg-[#FAF8F5] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white border border-gray-300'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. PROPERTY PROMOTION & FEATURED ADS PACKAGES */}
      <div className="space-y-8 pt-8 border-t border-gray-200">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] text-[#1E3A5F] text-xs font-bold border border-[#D4AF37]/40">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            <span>Listing Boost Packages</span>
          </div>
          <h2 className="text-3xl font-black text-[#1E3A5F] font-serif">
            Amplify Your Trophy Property Reach
          </h2>
          <p className="text-xs sm:text-sm text-[#374151] font-medium">
            Accelerate buyer inquiries with homepage spotlight banners, social media blasts, and verified 3D tour badge syndication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMOTION_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 hover:border-[#D4AF37] space-y-5 flex flex-col justify-between shadow-card transition-all"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-[#1E3A5F] font-serif">{pkg.name}</h3>
                    <span className="text-[11px] text-[#8A5A00] font-black block mt-0.5">
                      Duration: {pkg.duration}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#1E3A5F] font-serif">
                    {formatPrice(pkg.price, currency)}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-200 text-[11px] text-[#1E3A5F] font-bold">
                  🚀 Impact: {pkg.reach}
                </div>

                <ul className="space-y-2.5 text-xs text-[#1F2937] pt-1">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setSelectedPlanModal(pkg.name)}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#1E3A5F] hover:text-white text-[#1E3A5F] font-bold text-xs border border-gray-300 transition-all shadow-sm"
                >
                  Activate Promotion
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Checkout / Inquiry Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-white border-2 border-[#D4AF37]/50 rounded-3xl p-6 shadow-2xl space-y-4 text-[#1F2937]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-base font-black text-[#1E3A5F] font-serif">
                Activate {selectedPlanModal}
              </h3>
              <button
                onClick={() => {
                  setSelectedPlanModal(null);
                  setInquirySuccess(false);
                }}
                className="text-gray-400 hover:text-black p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {inquirySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#1E3A5F] font-serif">Order Initialized</h4>
                <p className="text-xs text-[#374151] font-medium">
                  Our agency desk has received your subscription request. An activation invoice and credentials link will be sent to your email.
                </p>
                <button
                  onClick={() => {
                    setSelectedPlanModal(null);
                    setInquirySuccess(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#1E3A5F] text-xs text-white font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInquirySuccess(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] block mb-1">Realtor / Agency Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sterling Real Estate Advisory"
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="director@agency.com"
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#1E3A5F] block mb-1">Direct Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all mt-2 border border-[#D4AF37]/40"
                >
                  Complete Enrollment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
