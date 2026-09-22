'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { 
  X, 
  Trash2, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import { formatPrice, formatNumber, formatLocalizedPrice, formatLocalizedArea } from '../lib/utils';

export default function CompareModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const { properties, compareList, toggleCompare, clearCompare, currency, unit } = useRealEstateStore();

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

  const comparedProperties = properties.filter((p) => compareList.includes(p.id));

  return createPortal(
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-6 animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white border-2 border-[#D4AF37]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#FAF8F5] z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E3A5F] font-serif">
                Property Comparison ({comparedProperties.length}/4)
              </h3>
              <p className="text-[11px] text-[#4B5563]">
                Detailed side-by-side architectural & pricing evaluation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedProperties.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-gray-100 text-[#4B5563] hover:text-[#1E3A5F] border border-gray-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-auto p-6">
          {comparedProperties.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-gray-200 flex items-center justify-center mx-auto text-[#1E3A5F]">
                <Layers className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h4 className="text-lg font-bold text-[#1E3A5F] font-serif">No Properties Selected</h4>
              <p className="text-xs text-[#4B5563] max-w-sm mx-auto">
                Browse any property card and click the layers icon to compare up to 4 estates side-by-side.
              </p>
              <div className="pt-2">
                <Link
                  href="/properties"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs inline-block transition-all shadow-sm"
                >
                  Explore Properties
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3 text-[#1F2937] font-bold w-40">Attribute</th>
                    {comparedProperties.map((prop) => (
                      <th key={prop.id} className="p-3 w-64 min-w-[220px]">
                        <div className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            className="w-full h-32 object-cover rounded-xl border border-gray-200 mb-2 shadow-sm"
                          />
                          <button
                            onClick={() => toggleCompare(prop.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 text-white transition-colors"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <h4 className="font-bold text-sm text-[#1E3A5F] line-clamp-1">{prop.title}</h4>
                          <span className="text-[#1E3A5F] font-serif font-black text-base block mt-0.5">
                            {formatLocalizedPrice(prop.price, currency, prop.priceSuffix, prop.currency)}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Location</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 text-[#1F2937]">
                        {p.address.neighborhood}, {p.address.city}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Category</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 text-[#1F2937] font-medium">
                        {p.category}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Price / Unit Area</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 text-[#996515] font-bold">
                        {formatLocalizedPrice(Math.round(p.price / (p.areaSqFt || 1)), currency, '/sqft', p.currency)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Area</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 text-[#1F2937]">
                        {formatLocalizedArea(p.areaSqFt, unit)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Bedrooms / Baths</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 text-[#1F2937]">
                        {p.bedrooms} Beds / {p.bathrooms} Baths
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Garages</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 text-[#1F2937]">
                        {p.garages} Cars
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Year Built</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 text-[#1F2937]">
                        {p.yearBuilt}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Rating</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 text-[#1F2937]">
                        ★ {p.rating} ({p.reviewCount} reviews)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Assigned Agent</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3 text-[#1F2937]">
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.agent.photo}
                            alt={p.agent.name}
                            className="w-6 h-6 rounded-full object-cover border border-[#D4AF37]"
                          />
                          <span className="font-semibold text-[#1E3A5F]">{p.agent.name}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#4B5563] font-semibold">Action</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-3">
                        <Link
                          href={`/properties/${p.id}`}
                          onClick={onClose}
                          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs transition-all shadow-sm"
                        >
                          <span>Full Details</span>
                          <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>,
    document.body
  );
}
