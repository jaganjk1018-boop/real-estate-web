'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  RotateCcw
} from 'lucide-react';
import { PROPERTIES_DATA } from '../data/properties';
import { formatPrice, formatLocalizedPrice } from '../lib/utils';
import { useRealEstateStore } from '../lib/store';

export default function AIRecommendationModal({ isOpen, onClose }) {
  const { currency } = useRealEstateStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    objective: 'buy-luxury',
    budget: '15m-plus',
    lifestyle: 'Modern Architectural',
    amenityPriority: 'Infinity Edge Pool',
    preferredLocation: 'Los Angeles'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

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

  if (!isOpen || !mounted) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      runAIAlgorithm();
    }
  };

  const runAIAlgorithm = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Intelligent matching algorithm
      const scored = PROPERTIES_DATA.map((prop) => {
        let score = 75; // base score

        // Location match
        if (prop.address.city.toLowerCase().includes(answers.preferredLocation.toLowerCase())) {
          score += 12;
        }

        // Category/Lifestyle match
        if (answers.lifestyle === 'Modern Architectural' && (prop.category === 'Luxury Villa' || prop.category === 'Penthouse')) {
          score += 8;
        } else if (answers.lifestyle === 'Waterfront Marine' && prop.category === 'Waterfront Estate') {
          score += 15;
        } else if (answers.lifestyle === 'Heritage Charm' && prop.category === 'Townhouse') {
          score += 15;
        }

        // Amenities match
        if (prop.amenities.some((a) => a.toLowerCase().includes(answers.amenityPriority.toLowerCase()))) {
          score += 6;
        }

        // Budget match
        if (answers.budget === 'under10m' && prop.price <= 10000000) score += 6;
        if (answers.budget === '10m-to-20m' && prop.price >= 10000000 && prop.price <= 20000000) score += 6;
        if (answers.budget === '15m-plus' && prop.price >= 15000000) score += 7;

        // Cap at 99%
        const finalScore = Math.min(99, score);

        let aiRationale = 'Strong architectural synergy and prime geographic placement for your criteria.';
        if (prop.category === 'Waterfront Estate') {
          aiRationale = 'Exceptional deep-water maritime capability with curated private dock access.';
        } else if (prop.category === 'Luxury Villa' && prop.amenities.includes('Net-Zero Solar & Tesla Powerwalls')) {
          aiRationale = 'Matches your priority for sustainable net-zero energy independence.';
        } else if (prop.category === 'Penthouse') {
          aiRationale = 'Optimal sky-high privacy, wrap-around Central Park vistas & white-glove security.';
        }

        return {
          ...prop,
          matchScore: finalScore,
          aiRationale
        };
      });

      scored.sort((a, b) => b.matchScore - a.matchScore);
      setRecommendations(scored.slice(0, 3));
      setIsAnalyzing(false);
      setStep(5); // Results step
    }, 1200);
  };

  const restartQuiz = () => {
    setStep(1);
    setRecommendations([]);
    setIsAnalyzing(false);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white border-2 border-[#D4AF37]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E3A5F] font-serif">
                Aura AI Property Matchmaker
              </h3>
              <p className="text-[11px] text-[#4B5563]">
                Algorithmically curated estates tailored to your investment & living DNA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-gray-100 text-[#4B5563] hover:text-[#1E3A5F] border border-gray-200 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 min-h-0 overscroll-contain">
          
          {/* Progress Bar (for Steps 1-4) */}
          {step <= 4 && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-[#4B5563] mb-2 font-medium">
                <span>Step {step} of 4</span>
                <span className="text-[#996515] font-bold">{step * 25}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1E3A5F] transition-all duration-300"
                  style={{ width: `${step * 25}%` }}
                />
              </div>
            </div>
          )}

          {/* Step 1: Objective & Budget */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <h4 className="text-lg font-bold text-[#1E3A5F] font-serif">
                What is your acquisition objective & budget horizon?
              </h4>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#1F2937] uppercase tracking-wider block">
                  Budget Bracket
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'under10m', title: 'Under $10M', desc: 'Prime Residential & Apartments' },
                    { id: '10m-to-20m', title: '$10M - $20M', desc: 'Trophy Villas & Waterfront' },
                    { id: '15m-plus', title: '$20M+ Elite', desc: 'Ultra-Prime Duplex Penthouses' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, budget: item.id })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        answers.budget === item.id
                          ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 shadow-sm ring-1 ring-[#1E3A5F]'
                          : 'border-gray-200 bg-[#FAF8F5] hover:bg-gray-100 text-[#1F2937]'
                      }`}
                    >
                      <span className="block font-bold text-sm text-[#1E3A5F]">{item.title}</span>
                      <span className="block text-[11px] text-[#4B5563] mt-1">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Architecture & Vibe */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <h4 className="text-lg font-bold text-[#1E3A5F] font-serif">
                Which architectural aesthetic best reflects your lifestyle?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Modern Architectural', label: 'Contemporary Architectural Villa', sub: 'Glass walls, infinity pool, cantilevered decks' },
                  { id: 'Skyline Penthouse', label: 'Duplex Skyline Penthouse', sub: 'Wrap-around sky terrace, skyline views' },
                  { id: 'Waterfront Marine', label: 'Coastal Waterfront Compound', sub: 'Private deep-water yacht slip, ocean breezes' },
                  { id: 'Heritage Charm', label: 'Historic Village Townhouse', sub: 'Carved wood millwork, private courtyard garden' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAnswers({ ...answers, lifestyle: item.id })}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      answers.lifestyle === item.id
                        ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 shadow-sm ring-1 ring-[#1E3A5F]'
                        : 'border-gray-200 bg-[#FAF8F5] hover:bg-gray-100 text-[#1F2937]'
                    }`}
                  >
                    <span className="block font-bold text-sm text-[#1E3A5F]">{item.label}</span>
                    <span className="block text-[11px] text-[#4B5563] mt-1">{item.sub}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-[#4B5563] hover:text-[#1E3A5F] hover:bg-gray-100 text-sm font-semibold transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Priority Amenities */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <h4 className="text-lg font-bold text-[#1E3A5F] font-serif">
                Select your most crucial non-negotiable luxury amenity:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Infinity Edge Pool', label: 'Infinity Edge Pool & Sunset Deck' },
                  { id: 'Private Spa & Sauna', label: 'Wellness Spa, Sauna & Cold Plunge' },
                  { id: 'Wine Tasting Cellar', label: '1,000+ Bottle Wine Cellar Vault' },
                  { id: 'Net-Zero Solar', label: 'Solar Net-Zero Eco System' },
                  { id: 'Deep-water Private Dock', label: 'Deep-water Mega-Yacht Mooring' },
                  { id: '24/7 White Glove Doorman', label: '24/7 Security & Concierge Service' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAnswers({ ...answers, amenityPriority: item.id })}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      answers.amenityPriority === item.id
                        ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold'
                        : 'border-gray-200 bg-[#FAF8F5] text-[#1F2937] hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xs font-semibold">{item.label}</span>
                    {answers.amenityPriority === item.id && (
                      <Check className="w-4 h-4 text-[#1E3A5F]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-[#4B5563] hover:text-[#1E3A5F] hover:bg-gray-100 text-sm font-semibold transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Preferred Geography */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <h4 className="text-lg font-bold text-[#1E3A5F] font-serif">
                Where would you like your primary or secondary sanctuary situated?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Los Angeles', label: 'Los Angeles / Bel-Air & Beverly Hills', desc: 'Sunset vistas, iconic estates' },
                  { id: 'New York', label: 'Manhattan / Central Park & Greenwich', desc: 'Skyline penthouses & historic brownstones' },
                  { id: 'Miami Beach', label: 'Miami Beach / Venetian Islands', desc: 'Tropical oceanfront & yacht slips' },
                  { id: 'Los Altos Hills', label: 'Silicon Valley / Los Altos Hills', desc: 'Tech enclaves & eco-manors' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAnswers({ ...answers, preferredLocation: item.id })}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      answers.preferredLocation === item.id
                        ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 ring-1 ring-[#1E3A5F]'
                        : 'border-gray-200 bg-[#FAF8F5] text-[#1F2937] hover:bg-gray-100'
                    }`}
                  >
                    <span className="block font-bold text-sm text-[#1E3A5F]">{item.label}</span>
                    <span className="block text-[11px] text-[#4B5563] mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-[#4B5563] hover:text-[#1E3A5F] hover:bg-gray-100 text-sm font-semibold transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#B89628] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#D4AF37]/25 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Matches</span>
                </button>
              </div>
            </div>
          )}

          {/* Loading Analyzing State */}
          {isAnalyzing && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#1E3A5F]/20 border-t-[#1E3A5F] animate-spin" />
              <div className="space-y-1">
                <h5 className="text-base font-bold text-[#1E3A5F] font-serif">Analyzing Architectural Database</h5>
                <p className="text-xs text-[#4B5563]">Weighting lifestyle scores, spatial topography, and privacy boundaries...</p>
              </div>
            </div>
          )}

          {/* Step 5: Recommendations Result */}
          {!isAnalyzing && step === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#996515] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    AI Match Complete
                  </span>
                  <h4 className="text-lg font-bold text-[#1E3A5F] font-serif">
                    Top Recommended Luxury Estates
                  </h4>
                </div>
                <button
                  onClick={restartQuiz}
                  className="flex items-center gap-1 text-xs text-[#4B5563] hover:text-[#1E3A5F] transition-colors font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Retake</span>
                </button>
              </div>

              {/* Recommended Cards List */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {recommendations.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#D4AF37]/60 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-20 h-20 rounded-xl object-cover border border-gray-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#D4AF37]/15 text-[#996515] border border-[#D4AF37]/30">
                            {prop.matchScore}% Match
                          </span>
                          <span className="text-[11px] text-[#4B5563] font-medium">
                            {prop.address.city}, {prop.address.state}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-[#1E3A5F] mt-1">
                          {prop.title}
                        </h5>
                        <p className="text-xs font-serif text-[#1E3A5F] font-black mt-0.5">
                          {formatLocalizedPrice(prop.price, currency, prop.priceSuffix, prop.currency)}
                        </p>
                        <p className="text-[11px] text-[#4B5563] line-clamp-1 mt-1 italic">
                          💡 {prop.aiRationale}
                        </p>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex sm:flex-col gap-2 shrink-0">
                      <Link
                        href={`/properties/${prop.id}`}
                        onClick={onClose}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs text-center transition-all shadow-sm"
                      >
                        View Estate
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/properties"
                  onClick={onClose}
                  className="text-xs text-[#1E3A5F] hover:text-[#D4AF37] hover:underline font-bold transition-colors"
                >
                  Browse all properties catalog →
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>,
    document.body
  );
}
