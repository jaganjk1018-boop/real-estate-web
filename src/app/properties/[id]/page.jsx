'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Heart, 
  Layers, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  Calendar, 
  Car, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Phone, 
  Mail, 
  MessageCircle, 
  Share2, 
  ArrowLeft, 
  ShieldCheck, 
  School, 
  Hospital, 
  Train, 
  ShoppingBag,
  Send,
  Star,
  Trees,
  Compass,
  Activity
} from 'lucide-react';
import EMICalculatorWidget from '../../../components/EMICalculatorWidget';
import VirtualTourModal from '../../../components/VirtualTourModal';
import ScheduleVisitModal from '../../../components/ScheduleVisitModal';
import PropertyCard from '../../../components/PropertyCard';
import FloorPlanExplorer from '../../../components/FloorPlanExplorer';
import InvestmentROISimulator from '../../../components/InvestmentROISimulator';
import PropertyLocationIntelligence from '../../../components/PropertyLocationIntelligence';
import LandQuickIntelHUD from '../../../components/LandQuickIntelHUD';
import LandDetailsDossier from '../../../components/LandDetailsDossier';
import AreaMarketRateIntelligence from '../../../components/AreaMarketRateIntelligence';
import AIPropertyValuationModal from '../../../components/AIPropertyValuationModal';
import AIAreaAnalysisModal from '../../../components/AIAreaAnalysisModal';
import AIInvestmentReportModal from '../../../components/AIInvestmentReportModal';
import AIRecommendationModal from '../../../components/AIRecommendationModal';
import { useRealEstateStore } from '../../../lib/store';
import { formatPrice, formatNumber, formatLocalizedPrice, formatLocalizedArea } from '../../../lib/utils';

export default function PropertyDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { properties, toggleFavorite, isFavorite, toggleCompare, isComparing, addInquiry, currency, unit } = useRealEstateStore();

  const property = properties.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [modalTourProperty, setModalTourProperty] = useState(property);
  const [modalVisitProperty, setModalVisitProperty] = useState(property);
  const [copiedLink, setCopiedLink] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [isAreaAnalysisOpen, setIsAreaAnalysisOpen] = useState(false);
  const [isInvestmentOpen, setIsInvestmentOpen] = useState(false);
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1E3A5F] font-serif">Property Not Found</h2>
        <p className="text-sm text-[#4B5563]">The requested luxury estate could not be found or has been moved.</p>
        <Link href="/properties" className="px-6 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs inline-block shadow-sm">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const fav = isFavorite(property.id);
  const comparing = isComparing(property.id);

  // Similar properties
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.category === property.category || p.type === property.type))
    .slice(0, 3);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    try {
      const record = addInquiry({
        propertyId: property.id,
        propertyTitle: property.title,
        fullName: inquiryForm.name || 'Private Buyer',
        email: inquiryForm.email || 'buyer@privatewealth.com',
        phone: inquiryForm.phone || '+91 98401 28941',
        inquiryType: 'Inquiry',
        message: inquiryForm.message || `Inquiring regarding private purchase terms for ${property.title}`
      });

      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      }).catch(() => {});
    } catch (err) {}
    setInquirySent(true);
  };

  const scrollToSection = (sectionId) => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: property.title,
          text: property.tagline,
          url: window.location.href
        }).catch(() => {
          navigator.clipboard?.writeText(window.location.href);
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 3000);
        });
      } else {
        navigator.clipboard?.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Copied Link Toast */}
      {copiedLink && (
        <div className="fixed top-24 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#1E3A5F] text-white border border-[#D4AF37] shadow-xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Estate link copied to clipboard!</span>
        </div>
      )}

      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#1E3A5F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#8A5A00]" />
          <span>Back to All Estates</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Virtual Tour Button */}
          {property.virtualTourRooms && property.virtualTourRooms.length > 0 && (
            <button
              onClick={() => {
                setModalTourProperty(property);
                setIsTourOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFFDF5] text-[#8A5A00] border border-[#8A5A00]/40 hover:bg-[#FFF8E6] text-xs font-bold transition-all shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>3D Virtual Tour</span>
            </button>
          )}

          {/* Compare Button */}
          <button
            onClick={() => toggleCompare(property.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              comparing
                ? 'bg-[#1E3A5F] text-white font-bold border-[#1E3A5F] shadow-sm'
                : 'bg-white text-[#1F2937] border-gray-200 hover:border-[#D4AF37] hover:bg-[#FAF8F5]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{comparing ? 'Comparing' : 'Compare'}</span>
          </button>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`p-2 rounded-xl border transition-all ${
              fav
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white text-[#4B5563] border-gray-200 hover:text-rose-500 hover:border-rose-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white text-[#4B5563] border border-gray-200 hover:text-[#1E3A5F] hover:border-[#D4AF37] transition-all shadow-sm"
            title="Share Estate"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title & Price Strip */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-gray-200">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37]/15 text-[#996515] border border-[#D4AF37]/30">
              {property.status}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-[#1E3A5F]/10 text-[#1E3A5F] border border-[#1E3A5F]/20">
              {property.category}
            </span>
            {property.isVerified && (
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Title
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E3A5F] font-serif leading-tight">
            {property.title}
          </h1>
          <p className="text-sm text-[#4B5563] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{property.address.street}, {property.address.neighborhood}, {property.address.city}, {property.address.state} {property.address.zipCode}</span>
          </p>
        </div>

        {/* Pricing Block */}
        <div className="text-left lg:text-right space-y-1">
          <span className="text-xs text-[#4B5563] uppercase font-semibold tracking-wider block">
            Guide Price
          </span>
          <div className="text-3xl sm:text-4xl font-black text-[#1E3A5F] font-serif">
            {formatLocalizedPrice(property.price, currency, property.priceSuffix, property.currency)}
          </div>
          <div className="text-xs text-[#4B5563]">
            {formatLocalizedArea(property.areaSqFt, unit)} • {property.bedrooms} Beds • {property.bathrooms} Baths
          </div>
        </div>
      </div>

      {/* High-Resolution Interactive Image Gallery */}
      <div className="space-y-4">
        {/* Main Hero Viewer */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[560px] w-full rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-xl bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          
          {/* 3D Tour Overlay Pill */}
          {property.virtualTourRooms && (
            <button
              onClick={() => {
                setModalTourProperty(property);
                setIsTourOpen(true);
              }}
              className="absolute bottom-6 left-6 z-10 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs shadow-2xl backdrop-blur-md transition-all hover:scale-105 border border-[#D4AF37]/40"
            >
              <Eye className="w-4 h-4 text-[#D4AF37] stroke-[2.5]" />
              <span>Step Inside 360° Virtual Tour</span>
            </button>
          )}

          <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full text-xs text-white border border-white/20 font-medium">
            Photo {activeImageIndex + 1} of {property.images.length}
          </div>
        </div>

        {/* Thumbnails Row */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 overflow-x-auto pb-2">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                activeImageIndex === idx
                  ? 'border-[#D4AF37] scale-95 shadow-md shadow-[#D4AF37]/20 ring-2 ring-[#D4AF37]/40'
                  : 'border-gray-200 opacity-80 hover:opacity-100 hover:border-[#D4AF37]'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Super Unique Feature: Land Quick-Intel Snapshot HUD (User Land Open Pannumbodhu) */}
      {(property.isLand || property.category === 'Empty Land') && (
        <LandQuickIntelHUD
          property={property}
          onScrollToLegal={() => scrollToSection('land-dossier-section')}
          onScrollToIntelligence={() => scrollToSection('area-intelligence-suite')}
          onOpenValuation={() => setIsValuationOpen(true)}
          onOpenAreaAnalysis={() => setIsAreaAnalysisOpen(true)}
          onOpenInvestmentReport={() => setIsInvestmentOpen(true)}
          onOpenMatchmaker={() => setIsMatchmakerOpen(true)}
        />
      )}

      {/* Main Content Grid: Left Details vs Right Sticky Booking / Agent Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Details, Amenities, Map, Nearby */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Key Specifications Strip */}
          {property.isLand || property.category === 'Empty Land' ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-emerald-200 shadow-card text-center">
              <div className="space-y-1 border-r border-gray-100 last:border-none">
                <div className="flex items-center justify-center text-emerald-600 mb-1">
                  <Trees className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-[#1E3A5F] block font-serif">
                  Vacant Land
                </span>
                <span className="text-[11px] text-[#4B5563] uppercase font-medium">Property Type</span>
              </div>

              <div className="space-y-1 border-r border-gray-100 last:border-none">
                <div className="flex items-center justify-center text-[#D4AF37] mb-1">
                  <Maximize className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-[#1E3A5F] block font-serif">
                  {formatNumber(property.areaSqFt)}
                </span>
                <span className="text-[11px] text-[#4B5563] uppercase font-medium">Plot Area (SqFt)</span>
              </div>

              <div className="space-y-1 border-r border-gray-100 last:border-none">
                <div className="flex items-center justify-center text-[#1E3A5F] mb-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-[#1E3A5F] block font-serif truncate px-1" title={property.landDetails?.approvals || 'Clear Title'}>
                  {property.landDetails?.approvals || 'DTCP & RERA Approved'}
                </span>
                <span className="text-[11px] text-[#4B5563] uppercase font-medium">Approvals</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center text-[#D4AF37] mb-1">
                  <Car className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-[#1E3A5F] block font-serif truncate px-1">
                  {property.landDetails?.roadWidth || '60 Ft Road'}
                </span>
                <span className="text-[11px] text-[#4B5563] uppercase font-medium">Road Access</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-gray-200 shadow-card text-center">
              <div className="space-y-1 border-r border-gray-100 last:border-none">
                <div className="flex items-center justify-center text-[#D4AF37] mb-1">
                  <BedDouble className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-[#1E3A5F] block font-serif">
                  {property.bedrooms > 0 ? property.bedrooms : 'Commercial'}
                </span>
                <span className="text-[11px] text-[#4B5563] uppercase font-medium">Bedrooms</span>
              </div>

              <div className="space-y-1 border-r border-gray-100 last:border-none">
                <div className="flex items-center justify-center text-[#D4AF37] mb-1">
                  <Bath className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-[#1E3A5F] block font-serif">
                  {property.bathrooms}
                </span>
                <span className="text-[11px] text-[#4B5563] uppercase font-medium">Bathrooms</span>
              </div>

              <div className="space-y-1 border-r border-gray-100 last:border-none">
                <div className="flex items-center justify-center text-[#D4AF37] mb-1">
                  <Maximize className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-[#1E3A5F] block font-serif">
                  {formatNumber(property.areaSqFt)}
                </span>
                <span className="text-[11px] text-[#4B5563] uppercase font-medium">Total SqFt</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center text-[#D4AF37] mb-1">
                  <Car className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-[#1E3A5F] block font-serif">
                  {property.garages}
                </span>
                <span className="text-[11px] text-[#4B5563] uppercase font-medium">Garages</span>
              </div>
            </div>
          )}

          {/* Architectural Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3A5F] font-serif">Architectural Overview</h2>
            <p className="text-sm text-[#374151] leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          {/* Luxury Amenities Grid */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3A5F] font-serif">
              {property.isLand ? 'Plot Infrastructure & Features' : 'Curated Amenities & Highlights'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gray-200 text-xs text-[#1F2937] hover:border-[#D4AF37] transition-all shadow-sm"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/15 text-[#996515] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Land Details Dossier (Specifications, Legal Documents, EC, Patta, Chitta, FMB Sketch, Approvals) or FloorPlanExplorer */}
          {property.isLand || property.category === 'Empty Land' ? (
            <LandDetailsDossier property={property} />
          ) : (
            <div className="pt-2">
              <FloorPlanExplorer 
                property={property} 
                onOpenTourRoom={(p, rId) => setIsTourOpen(true)} 
              />
            </div>
          )}

          {/* Feature 10: Property Page Integration - Area Market Rate Intelligence System */}
          <div className="pt-6 space-y-4" id="area-intelligence-suite">
            <div className="border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2 text-xs font-black text-[#8A5A00] uppercase tracking-widest">
                <Activity className="w-4 h-4 text-[#8A5A00]" />
                <span>Micro-Market Valuation & Price Dynamics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif mt-1">
                Area Market Rate Intelligence System
              </h2>
            </div>
            <AreaMarketRateIntelligence 
              initialAreaId={
                property.id === 'prop-13' ? 'tambaram' :
                (property.address?.neighborhood?.toLowerCase().includes('tambaram') || property.address?.city?.toLowerCase().includes('tambaram')) ? 'tambaram' :
                property.address?.neighborhood?.toLowerCase().includes('omr') ? 'omr' :
                property.address?.neighborhood?.toLowerCase().includes('guindy') ? 'guindy' :
                property.address?.neighborhood?.toLowerCase().includes('ecr') ? 'ecr' :
                property.address?.city === 'Los Angeles' ? 'bel-air' : 'tambaram'
              }
              isEmbeddedInProperty={true}
              property={property}
            />
          </div>

          {/* Comprehensive Location & Map Intelligence Suite (12 Categories, Exact GPS, Route Simulator & Area Score) */}
          <div className="pt-2">
            <PropertyLocationIntelligence property={property} />
          </div>

          {/* Executive Investment ROI & Rental Yield Simulator */}
          <div className="pt-4">
            <InvestmentROISimulator 
              initialPrice={property.price} 
              propertyTitle={property.title} 
            />
          </div>

          {/* Integrated EMI Calculator for this specific Property */}
          <div className="pt-4">
            <EMICalculatorWidget initialPrice={property.price} />
          </div>

        </div>

        {/* Right Sticky Col: Assigned Agent Card & Direct Booking / Inquiry */}
        <div className="space-y-6">
          
          {/* Agent Profile Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card hover:border-[#D4AF37]/40 space-y-5 sticky top-28">
            
            <div className="flex items-center gap-3.5 pb-4 border-b border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={property.agent.photo}
                alt={property.agent.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-md"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block">
                  Listing Principal
                </span>
                <h3 className="text-base font-bold text-[#1E3A5F] font-serif">{property.agent.name}</h3>
                <span className="text-xs text-[#4B5563] block">{property.agent.title}</span>
                <div className="flex items-center gap-2 text-[11px] text-[#996515] font-semibold mt-0.5">
                  <span>★ {property.agent.rating} Rating</span>
                  <span>•</span>
                  <span>{property.agent.dealsClosed} Estates Closed</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => setIsVisitOpen(true)}
                className="w-full py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#1E3A5F]/20 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Schedule Private Site Visit</span>
              </button>

              <a
                href={`https://wa.me/${property.agent.whatsapp}?text=${encodeURIComponent(`Hello ${property.agent.name}, I am inquiring regarding "${property.title}".`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Private Chat</span>
              </a>

              <a
                href={`tel:${property.agent.phone}`}
                className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-gray-100 text-[#1E3A5F] border border-gray-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call {property.agent.phone}</span>
              </a>
            </div>

            {/* Quick Inquiry Form */}
            <div className="pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider mb-2.5">
                Send Direct Offer or Inquiry
              </h4>

              {inquirySent ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in zoom-in-95">
                  <span className="text-xs font-bold text-emerald-700 block">Inquiry Dispatched!</span>
                  <p className="text-[11px] text-[#4B5563]">Agent {property.agent.name} has been notified.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setInquirySent(false);
                      setInquiryForm({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="px-4 py-1.5 rounded-lg bg-[#1E3A5F] hover:bg-[#162C48] text-white text-[10px] font-bold shadow-xs transition-all cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                  <textarea
                    rows={2}
                    placeholder="Inquiry notes..."
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white resize-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#B89628] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* AI Intelligence & Valuation Suite Widget */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8A5A00]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#1E3A5F]">
                  AI Advisory Suite
                </h4>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full">
                Active AI
              </span>
            </div>

            <div className="space-y-2">
              <button
                id="sidebar-ai-valuation-btn"
                onClick={() => setIsValuationOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-white hover:border-[#1E3A5F] border border-gray-200 text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1E3A5F] text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E3A5F] block group-hover:text-[#8A5A00]">
                      AI Valuation Engine
                    </span>
                    <span className="text-[10px] text-[#4B5563]">Fair market & factor premiums</span>
                  </div>
                </div>
                <span className="text-xs text-[#8A5A00] font-bold">Launch →</span>
              </button>

              <button
                id="sidebar-ai-area-btn"
                onClick={() => setIsAreaAnalysisOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-white hover:border-[#1E3A5F] border border-gray-200 text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E3A5F] block group-hover:text-[#8A5A00]">
                      Micro-Market Demographics
                    </span>
                    <span className="text-[10px] text-[#4B5563]">Metro catalysts & 5-yr trends</span>
                  </div>
                </div>
                <span className="text-xs text-[#8A5A00] font-bold">Audit →</span>
              </button>

              <button
                id="sidebar-ai-investment-btn"
                onClick={() => setIsInvestmentOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-white hover:border-[#1E3A5F] border border-gray-200 text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FFFDF5] text-[#8A5A00] border border-[#8A5A00]/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E3A5F] block group-hover:text-[#8A5A00]">
                      AI Investment Dossier
                    </span>
                    <span className="text-[10px] text-[#4B5563]">5-Yr ROI & rental yield report</span>
                  </div>
                </div>
                <span className="text-xs text-[#8A5A00] font-bold">Report →</span>
              </button>

              <button
                id="sidebar-ai-matchmaker-btn"
                onClick={() => setIsMatchmakerOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-white hover:border-[#1E3A5F] border border-gray-200 text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center shrink-0">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E3A5F] block group-hover:text-[#8A5A00]">
                      AI Property Matchmaker
                    </span>
                    <span className="text-[10px] text-[#4B5563]">Find matching luxury estates</span>
                  </div>
                </div>
                <span className="text-xs text-[#8A5A00] font-bold">Match →</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Similar Properties Recommendation Strip */}
      {similarProperties.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-gray-200">
          <div>
            <span className="text-xs font-black text-[#8A5A00] uppercase tracking-widest block mb-1">
              Complementary Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] font-serif">
              Similar Architectural Estates
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onOpenTour={(item) => {
                  setModalTourProperty(item);
                  setIsTourOpen(true);
                }}
                onScheduleVisit={(item) => {
                  setModalVisitProperty(item);
                  setIsVisitOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <VirtualTourModal
        property={modalTourProperty}
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onScheduleVisit={(p) => {
          setIsTourOpen(false);
          setModalVisitProperty(p || modalTourProperty);
          setIsVisitOpen(true);
        }}
      />

      <ScheduleVisitModal
        property={modalVisitProperty}
        isOpen={isVisitOpen}
        onClose={() => setIsVisitOpen(false)}
      />

      {/* AI Feature Modals */}
      <AIPropertyValuationModal
        property={property}
        isOpen={isValuationOpen}
        onClose={() => setIsValuationOpen(false)}
      />

      <AIAreaAnalysisModal
        property={property}
        isOpen={isAreaAnalysisOpen}
        onClose={() => setIsAreaAnalysisOpen(false)}
      />

      <AIInvestmentReportModal
        property={property}
        isOpen={isInvestmentOpen}
        onClose={() => setIsInvestmentOpen(false)}
      />

      <AIRecommendationModal
        isOpen={isMatchmakerOpen}
        onClose={() => setIsMatchmakerOpen(false)}
      />

    </div>
  );
}
