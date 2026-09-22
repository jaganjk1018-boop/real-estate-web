'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  Star, 
  Users, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  X, 
  Search,
  Sparkles,
  ArrowUpRight,
  Download,
  BarChart2,
  TrendingUp,
  MapPin,
  Car,
  Plane,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  Settings
} from 'lucide-react';
import { useRealEstateStore } from '../../lib/store';
import { formatPrice, formatNumber, formatLocalizedPrice, formatLocalizedArea } from '../../lib/utils';
import { AGENTS_DATA } from '../../data/agents';

export default function AdminPage() {
  const { 
    properties, 
    inquiries, 
    updateInquiryStatus, 
    updateInquiryStage,
    addProperty, 
    updateProperty, 
    deleteProperty,
    currentUser,
    currency,
    unit
  } = useRealEstateStore();

  const [activeTab, setActiveTab] = useState('properties'); // 'properties' | 'sellers' | 'inquiries' | 'customers' | 'analytics'
  const [searchTerm, setSearchTerm] = useState('');
  const [sellerStatusFilter, setSellerStatusFilter] = useState('all');
  const [sellerSearchTerm, setSellerSearchTerm] = useState('');

  const exportInquiriesCSV = () => {
    const headers = ['Inquiry ID', 'Client Name', 'Email', 'Phone', 'Property Title', 'Type', 'Arrival Mode', 'VIP Pass', 'Pipeline Stage', 'Status', 'Date'];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.fullName}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      `"${i.propertyTitle}"`,
      `"${i.inquiryType}"`,
      `"${i.arrivalMode || 'Standard'}"`,
      `"${i.vipPassId || 'N/A'}"`,
      `"${i.pipelineStage || 'New Lead'}"`,
      `"${i.status}"`,
      `"${i.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Aura_Inquiries_Pipeline_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Property Add/Edit Modal
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    tagline: '',
    description: '',
    price: 5000000,
    type: 'buy',
    category: 'Luxury Villa',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 6500,
    garages: 2,
    yearBuilt: 2024,
    city: 'Los Angeles',
    state: 'CA',
    neighborhood: 'Bel-Air',
    street: '100 Sunset Boulevard',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    amenities: 'Infinity Edge Pool, Private Spa & Sauna, Smart Home Automation'
  });

  // Calculate KPI Analytics
  const totalPortfolioValue = properties.reduce((acc, p) => acc + p.price, 0);
  const totalVisits = inquiries.filter((i) => i.inquiryType === 'Schedule Site Visit').length;
  const newLeads = inquiries.filter((i) => i.status === 'New').length;
  const sellerProperties = properties.filter((p) => p.isSellerListing);
  const pendingSellerVerifications = sellerProperties.filter((p) => (p.sellerVerificationStatus || 'Under Review') === 'Under Review').length;

  const handleOpenAddModal = () => {
    setEditingProperty(null);
    setPropertyForm({
      title: '',
      tagline: '',
      description: '',
      price: 5000000,
      type: 'buy',
      category: 'Luxury Villa',
      status: 'For Sale',
      isFeatured: true,
      isVerified: true,
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 6500,
      garages: 2,
      yearBuilt: 2024,
      city: 'Los Angeles',
      state: 'CA',
      neighborhood: 'Bel-Air',
      street: '100 Sunset Boulevard',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      amenities: 'Infinity Edge Pool, Private Spa & Sauna, Smart Home Automation'
    });
    setIsPropertyModalOpen(true);
  };

  const handleOpenEditModal = (prop) => {
    setEditingProperty(prop);
    setPropertyForm({
      title: prop.title,
      tagline: prop.tagline,
      description: prop.description,
      price: prop.price,
      type: prop.type,
      category: prop.category,
      status: prop.status,
      isFeatured: prop.isFeatured,
      isVerified: prop.isVerified,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      areaSqFt: prop.areaSqFt,
      garages: prop.garages,
      yearBuilt: prop.yearBuilt,
      city: prop.address.city,
      state: prop.address.state,
      neighborhood: prop.address.neighborhood,
      street: prop.address.street,
      imageUrl: prop.images[0] || '',
      amenities: prop.amenities.join(', ')
    });
    setIsPropertyModalOpen(true);
  };

  const handleSaveProperty = (e) => {
    e.preventDefault();
    const amenitiesArr = propertyForm.amenities.split(',').map((a) => a.trim()).filter(Boolean);

    if (editingProperty) {
      updateProperty({
        ...editingProperty,
        title: propertyForm.title,
        tagline: propertyForm.tagline,
        description: propertyForm.description,
        price: Number(propertyForm.price),
        type: propertyForm.type,
        category: propertyForm.category,
        status: propertyForm.status,
        isFeatured: propertyForm.isFeatured,
        isVerified: propertyForm.isVerified,
        bedrooms: Number(propertyForm.bedrooms),
        bathrooms: Number(propertyForm.bathrooms),
        areaSqFt: Number(propertyForm.areaSqFt),
        garages: Number(propertyForm.garages),
        yearBuilt: Number(propertyForm.yearBuilt),
        address: {
          ...editingProperty.address,
          street: propertyForm.street,
          city: propertyForm.city,
          state: propertyForm.state,
          neighborhood: propertyForm.neighborhood
        },
        images: [propertyForm.imageUrl, ...editingProperty.images.slice(1)],
        amenities: amenitiesArr
      });
    } else {
      const newId = `prop-${Date.now()}`;
      addProperty({
        id: newId,
        title: propertyForm.title,
        slug: propertyForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tagline: propertyForm.tagline || 'Newly listed luxury architectural estate',
        description: propertyForm.description || 'Exclusive prime estate offering bespoke finishes and premier privacy.',
        price: Number(propertyForm.price),
        currency: '$',
        type: propertyForm.type,
        category: propertyForm.category,
        status: propertyForm.status,
        isFeatured: propertyForm.isFeatured,
        isVerified: propertyForm.isVerified,
        rating: 5.0,
        reviewCount: 1,
        bedrooms: Number(propertyForm.bedrooms),
        bathrooms: Number(propertyForm.bathrooms),
        areaSqFt: Number(propertyForm.areaSqFt),
        garages: Number(propertyForm.garages),
        yearBuilt: Number(propertyForm.yearBuilt),
        address: {
          street: propertyForm.street,
          neighborhood: propertyForm.neighborhood,
          city: propertyForm.city,
          state: propertyForm.state,
          zipCode: '90001',
          country: 'United States',
          lat: 34.0522,
          lng: -118.2437
        },
        images: [
          propertyForm.imageUrl,
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
        ],
        amenities: amenitiesArr,
        nearby: [
          { name: 'Private Airport Heliport', distance: '1.2 miles', type: 'Airport', rating: 5.0 },
          { name: 'Premier Medical Pavilion', distance: '2.5 miles', type: 'Hospital', rating: 4.9 }
        ],
        agent: AGENTS_DATA[0],
        createdAt: new Date().toISOString().split('T')[0]
      });
    }

    setIsPropertyModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#FAF8F5] text-[#1F2937]">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#1E3A5F] text-[10px] font-black uppercase tracking-widest border border-[#D4AF37]/40 flex items-center gap-1 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8A5A00]" />
              Administrative Command Center
            </span>
            <span className="text-xs text-[#4B5563]">
              Signed in as: <strong className="text-[#1E3A5F]">{currentUser?.name || 'Administrator'}</strong>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1E3A5F] font-serif">
            JK Portal Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/settings"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50/60 text-[#1E3A5F] font-bold text-xs flex items-center gap-1.5 shadow-sm border border-[#D4AF37]/50 transition-all"
            title="Configure All 11 Engine Settings Categories"
          >
            <Settings className="w-4 h-4 text-[#8A5A00]" />
            <span>Platform Settings (11)</span>
          </Link>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs flex items-center gap-1.5 shadow-md border border-[#D4AF37]/40 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Add New Estate</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-card space-y-1">
          <span className="text-[11px] text-[#4B5563] font-bold uppercase">Total Asset Valuation</span>
          <div className="text-2xl font-black text-[#1E3A5F] font-serif">
            {formatLocalizedPrice(totalPortfolioValue, currency)}
          </div>
          <span className="text-[10px] text-emerald-800 font-bold">Across {properties.length} active listings</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-card space-y-1">
          <span className="text-[11px] text-[#4B5563] font-bold uppercase">Scheduled Site Visits</span>
          <div className="text-2xl font-black text-[#1E3A5F] font-serif">{totalVisits}</div>
          <span className="text-[10px] text-[#4B5563] font-medium">In-person & VIP chauffeur tours</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-card space-y-1">
          <span className="text-[11px] text-[#4B5563] font-bold uppercase">Active Lead Inquiries</span>
          <div className="text-2xl font-black text-[#8A5A00] font-serif">{inquiries.length}</div>
          <span className="text-[10px] text-[#1E3A5F] font-bold">{newLeads} awaiting contact</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-card space-y-1">
          <span className="text-[11px] text-[#4B5563] font-bold uppercase">Est. Monthly Wealth ARR</span>
          <div className="text-2xl font-black text-emerald-800 font-serif">{formatLocalizedPrice(42800, currency)}/mo</div>
          <span className="text-[10px] text-[#4B5563] font-medium">Management & private club desks</span>
        </div>

      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {[
          { id: 'properties', label: `Manage Listings (${properties.length})` },
          { id: 'sellers', label: `Seller Mandates (${sellerProperties.length})` },
          { id: 'inquiries', label: `Inquiries & VIP Visits (${inquiries.length})` },
          { id: 'analytics', label: 'Portfolio Analytics & Pipeline' },
          { id: 'customers', label: 'Client Directory' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#1E3A5F] text-white shadow-md'
                : 'text-[#4B5563] hover:text-[#1E3A5F] hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}

        <Link
          href="/admin/settings"
          className="px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all text-[#8A5A00] hover:text-[#1E3A5F] hover:bg-amber-50/60 border border-[#D4AF37]/50 flex items-center gap-1.5 shrink-0"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Platform Settings Module (11)</span>
        </Link>
      </div>

      {/* 1. PROPERTIES MANAGEMENT TAB */}
      {activeTab === 'properties' && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-card space-y-4 p-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search listing by title or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>
            <span className="text-xs text-[#4B5563] font-medium">
              Total Managed: <strong className="text-[#1E3A5F]">{properties.length} Estates</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[750px]">
              <thead>
                <tr className="border-b border-gray-200 text-[#1E3A5F] font-bold">
                  <th className="p-3">Estate</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Featured</th>
                  <th className="p-3">Agent</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties
                  .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.address.city.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((prop) => (
                    <tr key={prop.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-12 h-10 rounded-lg object-cover border border-gray-200 shadow-xs"
                        />
                        <div>
                          <strong className="text-[#1E3A5F] block font-bold max-w-[200px] truncate">
                            {prop.title}
                          </strong>
                          <span className="text-[10px] text-[#4B5563]">
                            {prop.address.city}, {prop.address.state}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-[#374151] font-semibold">{prop.category}</td>
                      <td className="p-3 text-emerald-800 font-serif font-bold">
                        {formatLocalizedPrice(prop.price, currency, prop.priceSuffix, prop.currency)}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8F5] text-[#1E3A5F] border border-gray-200">
                          {prop.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => updateProperty({ ...prop, isFeatured: !prop.isFeatured })}
                          className={`p-1.5 rounded-lg border transition-all ${
                            prop.isFeatured
                              ? 'bg-amber-50 text-[#8A5A00] border-amber-300 shadow-xs'
                              : 'bg-[#FAF8F5] text-gray-400 border-gray-200 hover:text-[#8A5A00]'
                          }`}
                          title="Toggle Featured on Homepage"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="p-3 text-[#374151] font-medium">
                        {prop.agent.name}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/properties/${prop.id}`}
                            className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#1E3A5F] text-[#1E3A5F] hover:text-white border border-gray-200 transition-all shadow-xs"
                            title="View Public Page"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleOpenEditModal(prop)}
                            className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#D4AF37] text-[#1E3A5F] hover:text-[#1E3A5F] border border-gray-200 transition-all shadow-xs"
                            title="Edit Estate"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${prop.title}"?`)) {
                                deleteProperty(prop.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all shadow-xs"
                            title="Delete Estate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* 1.5 SELLER MANDATES & LISTINGS TAB */}
      {activeTab === 'sellers' && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-card space-y-6 p-6">
          
          {/* Header & Sub-stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#8A5A00] text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Owner Representation Portal
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1E3A5F] font-serif">
                Seller Submissions & Listing Mandates
              </h3>
              <p className="text-xs text-[#4B5563]">
                Review title clearances, manage verification badges, and coordinate buyer viewings with property owners.
              </p>
            </div>

            <Link
              href="/sell"
              className="px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm border border-[#D4AF37]/30 transition-all self-start sm:self-auto"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Submit New Seller Listing</span>
            </Link>
          </div>

          {/* Mini KPI Cards for Seller Tab */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-500">Total Seller Mandates</span>
              <div className="text-xl font-serif font-black text-[#1E3A5F]">{sellerProperties.length}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#8A5A00]">Pending Verification</span>
              <div className="text-xl font-serif font-black text-[#8A5A00]">{pendingSellerVerifications}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-800">Verified & Active</span>
              <div className="text-xl font-serif font-black text-emerald-800">
                {sellerProperties.filter((p) => p.sellerVerificationStatus === 'Verified Active').length}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-500">Total Seller Asset Value</span>
              <div className="text-xl font-serif font-black text-[#1E3A5F]">
                {formatLocalizedPrice(sellerProperties.reduce((acc, p) => acc + p.price, 0), currency)}
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search owner name, phone, or title..."
                value={sellerSearchTerm}
                onChange={(e) => setSellerSearchTerm(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {[
                { id: 'all', label: 'All Mandates' },
                { id: 'review', label: 'Under Review' },
                { id: 'verified', label: 'Verified Active' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSellerStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    sellerStatusFilter === f.id
                      ? 'bg-[#1E3A5F] text-white font-bold shadow-xs'
                      : 'bg-[#FAF8F5] text-gray-600 hover:text-black border border-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          {sellerProperties.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead>
                  <tr className="border-b border-gray-200 text-[#1E3A5F] font-bold">
                    <th className="p-3">Reference / Property</th>
                    <th className="p-3">Owner Contact</th>
                    <th className="p-3">Mandate Tier</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Verification</th>
                    <th className="p-3">Featured</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sellerProperties
                    .filter((p) => {
                      if (sellerStatusFilter === 'review') return (p.sellerVerificationStatus || 'Under Review') === 'Under Review';
                      if (sellerStatusFilter === 'verified') return p.sellerVerificationStatus === 'Verified Active';
                      return true;
                    })
                    .filter((p) => {
                      if (!sellerSearchTerm.trim()) return true;
                      const q = sellerSearchTerm.toLowerCase();
                      const matchTitle = p.title.toLowerCase().includes(q);
                      const matchOwner = p.sellerInfo?.name?.toLowerCase().includes(q);
                      const matchPhone = p.sellerInfo?.phone?.toLowerCase().includes(q);
                      const matchRef = p.trackingRef?.toLowerCase().includes(q);
                      return matchTitle || matchOwner || matchPhone || matchRef;
                    })
                    .map((prop) => {
                      const isUnderReview = (prop.sellerVerificationStatus || 'Under Review') === 'Under Review';
                      return (
                        <tr key={prop.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={prop.images[0]}
                                alt={prop.title}
                                className="w-12 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                              />
                              <div className="space-y-0.5">
                                <span className="font-mono text-[10px] font-bold text-[#8A5A00] block">
                                  {prop.trackingRef || 'SELL-MANDATE'}
                                </span>
                                <strong className="text-[#1E3A5F] block font-bold max-w-[200px] truncate">
                                  {prop.title}
                                </strong>
                                <span className="text-[10px] text-gray-500">
                                  {prop.address.city}, {prop.category}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3 space-y-1">
                            <strong className="block text-[#1E3A5F] font-bold">
                              {prop.sellerInfo?.name || 'Private Owner'}
                            </strong>
                            {prop.sellerInfo?.phone && (
                              <a
                                href={`tel:${prop.sellerInfo.phone}`}
                                className="text-[11px] text-gray-600 hover:text-[#1E3A5F] flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3 text-[#D4AF37]" />
                                <span>{prop.sellerInfo.phone}</span>
                              </a>
                            )}
                            {prop.sellerInfo?.email && (
                              <a
                                href={`mailto:${prop.sellerInfo.email}`}
                                className="text-[10px] text-gray-400 hover:text-black flex items-center gap-1"
                              >
                                <Mail className="w-2.5 h-2.5" />
                                <span>{prop.sellerInfo.email}</span>
                              </a>
                            )}
                          </td>

                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              prop.sellerInfo?.planTier === 'vip'
                                ? 'bg-[#1E3A5F] text-[#D4AF37]'
                                : prop.sellerInfo?.planTier === 'spotlight'
                                ? 'bg-amber-100 text-[#8A5A00]'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {prop.sellerInfo?.planTier || 'Marketplace'}
                            </span>
                          </td>

                          <td className="p-3 text-emerald-800 font-serif font-bold text-sm">
                            {formatLocalizedPrice(prop.price, currency)}
                          </td>

                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => {
                                const newStatus = isUnderReview ? 'Verified Active' : 'Under Review';
                                updateProperty({
                                  ...prop,
                                  sellerVerificationStatus: newStatus,
                                  isVerified: newStatus === 'Verified Active'
                                });
                              }}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all flex items-center gap-1 ${
                                !isUnderReview
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                              title="Click to toggle verification status"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{prop.sellerVerificationStatus || 'Under Review'}</span>
                            </button>
                          </td>

                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => updateProperty({ ...prop, isFeatured: !prop.isFeatured })}
                              className={`p-1.5 rounded-lg border transition-all ${
                                prop.isFeatured
                                  ? 'bg-amber-50 text-[#8A5A00] border-amber-300 shadow-xs'
                                  : 'bg-[#FAF8F5] text-gray-400 border-gray-200 hover:text-[#8A5A00]'
                              }`}
                              title="Toggle Featured on Homepage"
                            >
                              <Star className="w-3.5 h-3.5" />
                            </button>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/properties/${prop.id}`}
                                className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#1E3A5F] text-[#1E3A5F] hover:text-white border border-gray-200 transition-all shadow-xs"
                                title="View Public Page"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleOpenEditModal(prop)}
                                className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#D4AF37] text-[#1E3A5F] hover:text-[#1E3A5F] border border-gray-200 transition-all shadow-xs"
                                title="Edit Estate Details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete seller mandate "${prop.title}"?`)) {
                                    deleteProperty(prop.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all shadow-xs"
                                title="Delete Mandate"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-[#FAF8F5] rounded-2xl border border-dashed border-gray-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-[#8A5A00] flex items-center justify-center mx-auto font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1E3A5F]">No Seller Mandates Recorded Yet</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Properties submitted by owners via the `/sell` intake portal will automatically populate here with owner contact details and title clearances.
              </p>
              <div className="pt-2">
                <Link
                  href="/sell"
                  className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Open Seller Intake Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 2. INQUIRIES & SITE VISITS TAB */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
            <div>
              <h3 className="text-base font-bold text-[#1E3A5F] font-serif">
                Private Inquiries, VIP Visits & Deal Pipeline
              </h3>
              <span className="text-xs text-[#4B5563]">Manage VIP arrivals, pass verification, and conversion stages</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#8A5A00] font-bold">Total: {inquiries.length} requests</span>
              <button
                onClick={exportInquiriesCSV}
                className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#1E3A5F] text-[#1E3A5F] hover:text-white text-xs font-bold flex items-center gap-1.5 border border-gray-300 transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#8A5A00]" />
                <span>Export Pipeline CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-gray-200 text-[#1E3A5F] font-bold">
                  <th className="p-3">Client & VIP Pass</th>
                  <th className="p-3">Estate / Interest</th>
                  <th className="p-3">Arrival Mode & Slot</th>
                  <th className="p-3">Dispatched</th>
                  <th className="p-3">Pipeline Stage</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-3">
                      <strong className="text-[#1E3A5F] block font-bold">{inq.fullName}</strong>
                      <span className="text-[#4B5563] text-[10px] block font-medium">{inq.email} • {inq.phone}</span>
                      {inq.vipPassId && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded bg-[#FFFDF5] text-[#8A5A00] text-[9px] font-mono font-bold border border-[#8A5A00]/30 shadow-xs">
                          Pass: {inq.vipPassId}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-[#1F2937]">
                      <span className="font-bold block max-w-[200px] truncate text-[#1E3A5F]">
                        {inq.propertyTitle || 'General Advisory'}
                      </span>
                      <p className="text-[10px] text-[#4B5563] italic line-clamp-1 mt-0.5">
                        &ldquo;{inq.message}&rdquo;
                      </p>
                      {inq.catering && (
                        <span className="text-[9px] text-[#8A5A00] font-semibold block mt-0.5">
                          Provision: {inq.catering}
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] text-[#1E3A5F] border border-gray-200 text-[10px] font-bold flex items-center gap-1 w-fit shadow-xs">
                        {inq.arrivalMode?.includes('Helicopter') ? <Plane className="w-3 h-3 text-[#8A5A00]" /> : <Car className="w-3 h-3 text-[#1E3A5F]" />}
                        {inq.arrivalMode || inq.visitFormat || 'In-Person'}
                      </span>
                      {inq.preferredDate && (
                        <span className="text-[10px] text-[#4B5563] block mt-1 font-medium">
                          {inq.preferredDate} @ {inq.preferredTime}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-[#4B5563] text-[11px] font-mono">{inq.createdAt}</td>
                    <td className="p-3">
                      <select
                        value={inq.pipelineStage || 'New Lead'}
                        onChange={(e) => updateInquiryStage(inq.id, e.target.value)}
                        className="bg-[#FAF8F5] border border-gray-300 rounded-lg px-2.5 py-1 text-[11px] text-[#1E3A5F] font-bold focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="New Lead">1. New Lead</option>
                        <option value="NDA Signed">2. NDA Signed</option>
                        <option value="VIP Tour Confirmed">3. VIP Tour Confirmed</option>
                        <option value="Offer Under Negotiation">4. Offer Under Negotiation</option>
                        <option value="Under Contract">5. Under Contract</option>
                        <option value="Closed">6. Closed / Transacted</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                        className="bg-[#FAF8F5] border border-gray-300 rounded-lg px-2 py-1 text-[11px] text-[#1E3A5F] font-bold focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PORTFOLIO ANALYTICS & PIPELINE INTELLIGENCE TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Top 3 Analytic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Market Distribution */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <h4 className="text-sm font-bold text-white font-serif flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c5a880]" />
                Geographic Market Distribution
              </h4>
              
              <div className="space-y-3 text-xs">
                {[
                  { city: 'Los Angeles & Bel-Air', count: properties.filter(p => p.address.city.toLowerCase().includes('los angeles')).length, percent: 35 },
                  { city: 'New York (Manhattan)', count: properties.filter(p => p.address.city.toLowerCase().includes('new york')).length, percent: 25 },
                  { city: 'Miami & Biscayne Bay', count: properties.filter(p => p.address.city.toLowerCase().includes('miami')).length, percent: 20 },
                  { city: 'San Francisco & Aspen', count: properties.filter(p => p.address.city.toLowerCase().includes('san francisco') || p.address.city.toLowerCase().includes('aspen')).length, percent: 20 },
                ].map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>{m.city}</span>
                      <span className="font-bold text-white">{m.count} Estates ({m.percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#c5a880] h-full rounded-full" style={{ width: `${m.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Allocation */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <h4 className="text-sm font-bold text-white font-serif flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#c5a880]" />
                Asset Class Allocation
              </h4>

              <div className="space-y-3 text-xs">
                {[
                  { cat: 'Luxury Villas', count: properties.filter(p => p.category === 'Luxury Villa').length, percent: 40 },
                  { cat: 'Penthouses', count: properties.filter(p => p.category === 'Penthouse').length, percent: 25 },
                  { cat: 'Waterfront Estates', count: properties.filter(p => p.category === 'Waterfront Estate').length, percent: 20 },
                  { cat: 'Townhouses & Lofts', count: properties.filter(p => p.category === 'Townhouse' || p.category === 'Modern Apartment').length, percent: 15 }
                ].map((c, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>{c.cat}</span>
                      <span className="font-bold text-white">{c.count} Assets</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#c5a880] to-emerald-400 h-full rounded-full" style={{ width: `${c.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deal Conversion Pipeline Funnel */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <h4 className="text-sm font-bold text-white font-serif flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Deal Stage Conversion
              </h4>

              <div className="space-y-2 text-xs">
                {[
                  { stage: '1. New Leads', count: inquiries.filter(i => (i.pipelineStage || 'New Lead') === 'New Lead').length, color: 'bg-blue-500' },
                  { stage: '2. NDA Signed', count: inquiries.filter(i => i.pipelineStage === 'NDA Signed').length, color: 'bg-cyan-500' },
                  { stage: '3. VIP Tour Confirmed', count: inquiries.filter(i => i.pipelineStage === 'VIP Tour Confirmed').length, color: 'bg-amber-500' },
                  { stage: '4. Offer Under Negotiation', count: inquiries.filter(i => i.pipelineStage === 'Offer Under Negotiation').length, color: 'bg-rose-500' },
                  { stage: '5. Under Contract / Closed', count: inquiries.filter(i => i.pipelineStage === 'Under Contract' || i.pipelineStage === 'Closed').length, color: 'bg-emerald-500' },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${s.color}`} />
                      <span className="text-slate-300">{s.stage}</span>
                    </div>
                    <span className="font-bold text-white">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Aggregate Portfolio Value Summary Banner */}
          <div className="glass-panel p-6 rounded-3xl border border-[#c5a880]/30 bg-gradient-to-r from-[#0d1424] via-[#090e1a] to-[#0d1424] flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block">
                GLOBAL REALTY UNDERWRITING PORTFOLIO
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mt-1">
                Active Capital Under Management: {formatLocalizedPrice(totalPortfolioValue, currency)}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Computed across all premier residential masterplans, beachfront sanctuaries, and trophy penthouses.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportInquiriesCSV}
                className="px-5 py-3 rounded-2xl bg-[#c5a880] hover:bg-[#d5ba92] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#c5a880]/20"
              >
                <Download className="w-4 h-4" />
                <span>Export Executive Report</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 3. CUSTOMER DATABASE TAB */}
      {activeTab === 'customers' && (
        <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white font-serif">
            Registered Clientele & Private Investors
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="p-3">Name</th>
                  <th className="p-3">Classification</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Verification Tier</th>
                  <th className="p-3 text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: 'Julian Montgomery', role: 'Accredited Buyer', email: 'julian@montgomerycapital.com', tier: 'Tier 1 Ultra-HNW' },
                  { name: 'Lord Henry Vane', role: 'Institutional Buyer', email: 'vane@vaneholdings.co.uk', tier: 'Tier 1 Family Office' },
                  { name: 'Elena Rostova', role: 'Listing Broker', email: 'elena.rostova@aurarealty.com', tier: 'Verified Principal' },
                  { name: 'Alexander Sterling', role: 'Managing Principal', email: 'alexander.s@aurarealty.com', tier: 'Super Admin' },
                  { name: 'Claire Beaumont', role: 'Accredited Buyer', email: 'c.beaumont@luxuryliving.fr', tier: 'Tier 2 Investor' }
                ].map((c, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">{c.name}</td>
                    <td className="p-3 text-slate-300">{c.role}</td>
                    <td className="p-3 text-slate-400">{c.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                        {c.tier}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[10px] text-amber-400 font-semibold cursor-pointer hover:underline">
                        View Dossier
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Property Add/Edit Modal */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950">
              <h3 className="text-base font-bold text-white font-serif">
                {editingProperty ? 'Edit Property Details' : 'Add New Luxury Listing'}
              </h3>
              <button
                onClick={() => setIsPropertyModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-slate-400 font-semibold block mb-1">Estate Title</label>
                  <input
                    type="text"
                    required
                    value={propertyForm.title}
                    onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                    placeholder="e.g. The Bel-Air Diamond Villa"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={propertyForm.price}
                    onChange={(e) => setPropertyForm({ ...propertyForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Category</label>
                  <select
                    value={propertyForm.category}
                    onChange={(e) => setPropertyForm({ ...propertyForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Modern Apartment">Modern Apartment</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Waterfront Estate">Waterfront Estate</option>
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="Retail Plaza">Retail Plaza</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Type</label>
                  <select
                    value={propertyForm.type}
                    onChange={(e) => setPropertyForm({ ...propertyForm, type: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={propertyForm.bedrooms}
                    onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={propertyForm.bathrooms}
                    onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Area SqFt</label>
                  <input
                    type="number"
                    value={propertyForm.areaSqFt}
                    onChange={(e) => setPropertyForm({ ...propertyForm, areaSqFt: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">City</label>
                  <input
                    type="text"
                    value={propertyForm.city}
                    onChange={(e) => setPropertyForm({ ...propertyForm, city: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Neighborhood</label>
                  <input
                    type="text"
                    value={propertyForm.neighborhood}
                    onChange={(e) => setPropertyForm({ ...propertyForm, neighborhood: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Primary Image URL</label>
                <input
                  type="url"
                  required
                  value={propertyForm.imageUrl}
                  onChange={(e) => setPropertyForm({ ...propertyForm, imageUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Amenities (comma-separated)</label>
                <input
                  type="text"
                  value={propertyForm.amenities}
                  onChange={(e) => setPropertyForm({ ...propertyForm, amenities: e.target.value })}
                  placeholder="Infinity Edge Pool, Wine Tasting Cellar, Spa..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={propertyForm.description}
                  onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={propertyForm.isFeatured}
                    onChange={(e) => setPropertyForm({ ...propertyForm, isFeatured: e.target.checked })}
                    className="rounded border-white/10"
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={propertyForm.isVerified}
                    onChange={(e) => setPropertyForm({ ...propertyForm, isVerified: e.target.checked })}
                    className="rounded border-white/10"
                  />
                  <span>Verified Legal Audit</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPropertyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold shadow-lg"
                >
                  {editingProperty ? 'Save Changes' : 'Create Listing'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
