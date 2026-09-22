'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  Home, 
  TrendingUp, 
  Award, 
  MapPin, 
  Sparkles, 
  Bell, 
  DollarSign, 
  ShieldCheck, 
  BarChart2, 
  Search, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Check, 
  Lock, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Globe, 
  MessageSquare, 
  Send, 
  Cpu, 
  Smartphone, 
  Activity, 
  ArrowLeft,
  X,
  Compass,
  Key
} from 'lucide-react';
import { useRealEstateStore } from '../../../lib/store';
import { DEFAULT_SETTINGS } from '../../../data/defaultSettings';

export default function AdminSettingsPage() {
  const { 
    platformSettings, 
    settingsLogs, 
    updatePlatformSettings, 
    saveAllPlatformSettings, 
    resetPlatformSettings,
    currency
  } = useRealEstateStore();

  // Local working copy of settings for batch editing & save detection
  const [localSettings, setLocalSettings] = useState(platformSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccessNotification, setSaveSuccessNotification] = useState(false);
  const [showMaskedKeys, setShowMaskedKeys] = useState(false);
  const [auditFilter, setAuditFilter] = useState('all');
  const [auditSearch, setAuditSearch] = useState('');
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [newStatusInput, setNewStatusInput] = useState('');

  // Sync initial state once store is ready
  useEffect(() => {
    if (platformSettings) {
      setLocalSettings(platformSettings);
    }
  }, [platformSettings]);

  // Track if there are unsaved local modifications
  const isDirty = useMemo(() => {
    return JSON.stringify(localSettings) !== JSON.stringify(platformSettings);
  }, [localSettings, platformSettings]);

  // Helper to update deeply nested fields
  const handleFieldChange = (category, field, value) => {
    setLocalSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubFieldChange = (category, parentField, subField, value) => {
    setLocalSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentField]: {
          ...prev[category][parentField],
          [subField]: value
        }
      }
    }));
  };

  // Save all changes
  const handleSaveAll = () => {
    saveAllPlatformSettings(localSettings);
    setSaveSuccessNotification(true);
    setTimeout(() => setSaveSuccessNotification(false), 3500);
  };

  // Reset to factory defaults
  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all 11 settings categories to factory defaults? This action will be logged in the audit trail.')) {
      resetPlatformSettings();
      setLocalSettings(DEFAULT_SETTINGS);
      setSaveSuccessNotification(true);
      setTimeout(() => setSaveSuccessNotification(false), 3500);
    }
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localSettings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `JK_Realty_Settings_Backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          setLocalSettings(parsed);
          saveAllPlatformSettings(parsed);
          alert('Settings successfully imported and applied!');
        } catch (err) {
          alert('Invalid JSON configuration file.');
        }
      };
    }
  };

  // Categories definition for the sidebar
  const categoriesList = [
    { id: 'general', label: '1. General Settings', icon: Building2, desc: 'Company Identity & Socials', badge: 'Active' },
    { id: 'user', label: '2. User Settings', icon: Users, desc: 'Registration & OTP Auth', badge: 'Protected' },
    { id: 'property', label: '3. Property Settings', icon: Home, desc: 'Approval & Categories', badge: 'Live' },
    { id: 'areaMarket', label: '4. Area & Market Rates', icon: TrendingUp, desc: 'Source & Growth Period', badge: 'Synced' },
    { id: 'broker', label: '5. Broker Settings', icon: Award, desc: 'Licensing & Commission', badge: 'Configured' },
    { id: 'map', label: '6. Map & Location', icon: MapPin, desc: 'API Keys & Radius HUD', badge: 'Active' },
    { id: 'ai', label: '7. AI Engine Settings', icon: Sparkles, desc: 'Valuation & LLM Match', badge: 'GPT-4o' },
    { id: 'notification', label: '8. Notifications', icon: Bell, desc: 'WhatsApp, SMS & Email', badge: 'Live' },
    { id: 'financial', label: '9. Financial Settings', icon: DollarSign, desc: 'EMI, Taxes & Currency', badge: currency },
    { id: 'security', label: '10. Security & Audit', icon: ShieldCheck, desc: '2FA, RBAC & Logs', badge: '98/100' },
    { id: 'analytics', label: '11. Analytics Engine', icon: BarChart2, desc: 'Demand & Heatmaps', badge: 'Tracking' },
  ];

  // Filter categories by search
  const filteredCategories = categoriesList.filter((cat) => 
    cat.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A1120] text-gray-100 flex flex-col selection:bg-[#D4AF37] selection:text-[#0A1120]">
      
      {/* 1. TOP ADMINISTRATIVE COMMAND HEADER */}
      <header className="sticky top-0 z-40 bg-[#0F1E36]/95 backdrop-blur-xl border-b border-[#D4AF37]/25 shadow-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#D4AF37] transition-all border border-[#D4AF37]/30 flex items-center justify-center"
              title="Return to Admin Control Center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4AF37]">
                <span>JK Realty System Engine</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">Enterprise Edition 2026</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-serif text-white tracking-wide flex items-center gap-2">
                <span>Platform Settings Console</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/40">
                  SYSTEM READY
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Actions & Save Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Import / Export JSON buttons */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <label className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Import JSON</span>
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>

              <button
                type="button"
                onClick={handleExportJSON}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
                title="Export complete configuration backup"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Export Backup</span>
              </button>
            </div>

            {/* Reset Factory Defaults */}
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 border border-rose-800/40 transition-all flex items-center gap-1.5"
              title="Reset all 11 categories to initial defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>

            {/* Save Changes Button */}
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={!isDirty}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all ${
                isDirty
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89422] text-[#0A1120] hover:scale-102 cursor-pointer animate-pulse shadow-[#D4AF37]/30'
                  : 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/10'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>{isDirty ? 'Save Changes' : 'All Saved'}</span>
            </button>

          </div>

        </div>
      </header>

      {/* Floating Save Alert Banner */}
      {saveSuccessNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#162C48] border-2 border-[#D4AF37] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <strong className="block text-white font-bold">Settings Persisted Successfully</strong>
            <span className="text-gray-300 text-[11px]">Configuration changes are live across the real estate portal.</span>
          </div>
          <button onClick={() => setSaveSuccessNotification(false)} className="text-gray-400 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. PLATFORM HEALTH STRIP */}
      <section className="bg-[#0F1E36]/60 border-b border-white/5 px-4 sm:px-8 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-gray-400">Maps Provider:</span>
              <strong className="text-emerald-400 font-mono uppercase">{localSettings.map.provider}</strong>
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="text-gray-400">AI Intelligence:</span>
              <strong className="text-[#D4AF37] font-mono">{localSettings.ai.aiModelProvider.toUpperCase()}</strong>
            </div>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="text-gray-400">WhatsApp Gateway:</span>
              <strong className="text-emerald-400 font-mono">
                {localSettings.notification.whatsappNotificationsEnabled ? 'ONLINE' : 'DISABLED'}
              </strong>
            </div>

            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="text-gray-400">Area Rate Engine:</span>
              <strong className="text-blue-400 font-mono uppercase">{localSettings.areaMarket.rateSource}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400">Security Score:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
              98/100 (Tier-1 Enterprise)
            </span>
          </div>

        </div>
      </section>

      {/* 3. MAIN WORKSPACE WITH SIDEBAR */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="w-full lg:w-80 shrink-0 space-y-4">
          
          {/* Search bar inside settings */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search setting category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#162C48] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 bg-[#0F1E36] p-2.5 rounded-3xl border border-white/10 shadow-xl">
            {filteredCategories.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1E3A5F] to-[#162C48] text-white border border-[#D4AF37]/50 shadow-md scale-101'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-[#D4AF37] text-[#0F1E36]' : 'bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/20'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs truncate leading-snug">{item.label}</div>
                      <div className="text-[10px] text-gray-400 truncate">{item.desc}</div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold shrink-0 ml-2 ${
                    isActive
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                      : 'bg-white/5 text-gray-400'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Platform Meta Info Card */}
          <div className="p-4 rounded-2xl bg-[#0F1E36]/70 border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between text-gray-400 text-[11px]">
              <span>Last Synchronized:</span>
              <span className="text-white font-mono">Today, 2:15 PM</span>
            </div>
            <div className="flex justify-between text-gray-400 text-[11px]">
              <span>Active Admin:</span>
              <span className="text-[#D4AF37] font-semibold">Super Admin</span>
            </div>
            <div className="flex justify-between text-gray-400 text-[11px]">
              <span>Audit Entries:</span>
              <span className="text-white font-mono">{settingsLogs.length} Records</span>
            </div>
          </div>

        </aside>

        {/* RIGHT MAIN CONFIGURATION WORKSPACE */}
        <main className="flex-1 min-w-0 space-y-8">
          
          {/* ========================================================= */}
          {/* 1. GENERAL SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                    Category 1 of 11
                  </span>
                  <h2 className="text-2xl font-black font-serif text-white">General Platform Identity Settings</h2>
                  <p className="text-xs text-gray-400">Configure global corporate branding, contact concierge desks, and public social footprints.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Company Name */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">Company Name</label>
                  <input
                    type="text"
                    value={localSettings.general.companyName}
                    onChange={(e) => handleFieldChange('general', 'companyName', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="text-[10px] text-gray-400">Used across headers, transactional emails, and legal contracts.</span>
                </div>

                {/* Company Tagline */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">Brand Architectural Tagline</label>
                  <input
                    type="text"
                    value={localSettings.general.tagline}
                    onChange={(e) => handleFieldChange('general', 'tagline', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="text-[10px] text-gray-400">Displayed in meta titles and hero intros.</span>
                </div>

                {/* Company Address */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">Corporate Headquarters Address</label>
                  <input
                    type="text"
                    value={localSettings.general.companyAddress}
                    onChange={(e) => handleFieldChange('general', 'companyAddress', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Contact Number */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">Toll-Free Concierge Number</label>
                  <input
                    type="text"
                    value={localSettings.general.contactNumber}
                    onChange={(e) => handleFieldChange('general', 'contactNumber', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Support Email */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">Support / Concierge Email</label>
                  <input
                    type="email"
                    value={localSettings.general.supportEmail}
                    onChange={(e) => handleFieldChange('general', 'supportEmail', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Website URL */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">Canonical Website URL</label>
                  <input
                    type="url"
                    value={localSettings.general.websiteUrl}
                    onChange={(e) => handleFieldChange('general', 'websiteUrl', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Corporate Reg Number */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">Brokerage License / Reg No.</label>
                  <input
                    type="text"
                    value={localSettings.general.corporateRegistrationNumber}
                    onChange={(e) => handleFieldChange('general', 'corporateRegistrationNumber', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Social Media Links Sub-card */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Social Media Channel Links</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] text-gray-400 block mb-1">Instagram URL</span>
                      <input
                        type="text"
                        value={localSettings.general.socialMedia.instagram}
                        onChange={(e) => handleSubFieldChange('general', 'socialMedia', 'instagram', e.target.value)}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block mb-1">LinkedIn URL</span>
                      <input
                        type="text"
                        value={localSettings.general.socialMedia.linkedin}
                        onChange={(e) => handleSubFieldChange('general', 'socialMedia', 'linkedin', e.target.value)}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block mb-1">X / Twitter URL</span>
                      <input
                        type="text"
                        value={localSettings.general.socialMedia.twitter}
                        onChange={(e) => handleSubFieldChange('general', 'socialMedia', 'twitter', e.target.value)}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block mb-1">YouTube Channel URL</span>
                      <input
                        type="text"
                        value={localSettings.general.socialMedia.youtube}
                        onChange={(e) => handleSubFieldChange('general', 'socialMedia', 'youtube', e.target.value)}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. USER SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'user' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 2 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">User Registration & Authentication Settings</h2>
                <p className="text-xs text-gray-400">Control buyer onboarding verification, mobile OTP gateways, and privacy profiles.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* User Registration Toggle */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Public User Registration</h3>
                    <p className="text-[11px] text-gray-400">Allow new clients & investors to create accounts directly on the platform.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('user', 'registrationEnabled', !localSettings.user.registrationEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.user.registrationEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.user.registrationEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Email Verification */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Mandatory Email Verification</h3>
                    <p className="text-[11px] text-gray-400">Require activation link confirmation before accessing private vault documents.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('user', 'emailVerificationRequired', !localSettings.user.emailVerificationRequired)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.user.emailVerificationRequired ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.user.emailVerificationRequired ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Mobile OTP Verification */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">Mobile OTP Verification</h3>
                      <p className="text-[11px] text-gray-400">Send one-time passcodes to phone numbers during sign up and VIP booking.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('user', 'mobileOtpVerificationEnabled', !localSettings.user.mobileOtpVerificationEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                        localSettings.user.mobileOtpVerificationEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        localSettings.user.mobileOtpVerificationEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">SMS / OTP Gateway Provider</label>
                    <select
                      value={localSettings.user.otpProvider}
                      onChange={(e) => handleFieldChange('user', 'otpProvider', e.target.value)}
                      className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="twilio">Twilio Global SMS Engine</option>
                      <option value="aws_sns">AWS SNS Worldwide Telephony</option>
                      <option value="msg91">MSG91 Priority Enterprise Route</option>
                    </select>
                  </div>
                </div>

                {/* Profile Visibility */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Default Profile Visibility</h3>
                  <p className="text-[11px] text-gray-400">Determines who can see buyer names in discussion boards & offers.</p>
                  <select
                    value={localSettings.user.profileVisibilityDefault}
                    onChange={(e) => handleFieldChange('user', 'profileVisibilityDefault', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="verified_only">Verified Members & Brokers Only</option>
                    <option value="public">Public Connoisseur Showcase</option>
                    <option value="private">Completely Private & Anonymized</option>
                  </select>
                </div>

                {/* Notification Preferences Sub-card */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Default User Notification Preferences</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { key: 'newListings', label: 'New Trophy Listings' },
                      { key: 'priceDrops', label: 'Price Drop Alerts' },
                      { key: 'marketReports', label: 'Quarterly Intel Reports' },
                      { key: 'vipEvents', label: 'Private Chauffeur Tour Events' },
                    ].map((pref) => {
                      const enabled = localSettings.user.defaultNotifications[pref.key];
                      return (
                        <div
                          key={pref.key}
                          onClick={() => handleSubFieldChange('user', 'defaultNotifications', pref.key, !enabled)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            enabled ? 'bg-[#1E3A5F] border-[#D4AF37] text-white' : 'bg-[#162C48] border-white/10 text-gray-400'
                          }`}
                        >
                          <span className="text-xs font-semibold">{pref.label}</span>
                          <CheckCircle2 className={`w-4 h-4 ${enabled ? 'text-[#D4AF37]' : 'text-gray-600'}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. PROPERTY SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'property' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 3 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">Property Management & Lifecycle Settings</h2>
                <p className="text-xs text-gray-400">Manage listing verification policies, automatic expirations, categories, and inventory statuses.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Property Approval Required */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Manual Property Approval</h3>
                    <p className="text-[11px] text-gray-400">All broker and owner submitted listings require admin verification before public launch.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('property', 'propertyApprovalRequired', !localSettings.property.propertyApprovalRequired)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.property.propertyApprovalRequired ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.property.propertyApprovalRequired ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Auto Property Expiry */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">Auto Listing Expiry</h3>
                      <p className="text-[11px] text-gray-400">Automatically move stale listings into off-market vault review.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('property', 'autoPropertyExpiryEnabled', !localSettings.property.autoPropertyExpiryEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                        localSettings.property.autoPropertyExpiryEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        localSettings.property.autoPropertyExpiryEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Expiry Duration</label>
                    <select
                      value={localSettings.property.expiryDurationDays}
                      onChange={(e) => handleFieldChange('property', 'expiryDurationDays', Number(e.target.value))}
                      className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value={30}>30 Days (High Velocity)</option>
                      <option value={60}>60 Days (Standard Luxury)</option>
                      <option value={90}>90 Days (Ultra-Trophy Estate)</option>
                      <option value={180}>180 Days (Long-Horizon Commercial / Land)</option>
                    </select>
                  </div>
                </div>

                {/* Featured Property Duration */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Featured Homepage Spotlight Duration</h3>
                  <p className="text-[11px] text-gray-400">Number of days a property holds the Gold featured ribbon on the homepage carousel.</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="7"
                      max="60"
                      step="7"
                      value={localSettings.property.featuredPropertyDurationDays}
                      onChange={(e) => handleFieldChange('property', 'featuredPropertyDurationDays', Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                    <span className="font-bold font-mono text-sm text-[#D4AF37] shrink-0">
                      {localSettings.property.featuredPropertyDurationDays} Days
                    </span>
                  </div>
                </div>

                {/* Max Images Allowed */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Max 4K Photos Allowed Per Listing</h3>
                  <p className="text-[11px] text-gray-400">Maximum media uploads permitted per verified estate dossier.</p>
                  <input
                    type="number"
                    value={localSettings.property.maxImagesPerProperty}
                    onChange={(e) => handleFieldChange('property', 'maxImagesPerProperty', Number(e.target.value))}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Property Categories Management */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Property Categories Management</h3>
                      <p className="text-[11px] text-gray-400">Active asset classes selectable in search and intake forms.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {localSettings.property.categories.map((cat, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-[#162C48] border border-white/15 text-xs font-medium text-white flex items-center gap-2">
                        <span>{cat}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = localSettings.property.categories.filter((_, i) => i !== idx);
                            handleFieldChange('property', 'categories', updated);
                          }}
                          className="text-gray-400 hover:text-rose-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add Category */}
                  <div className="flex items-center gap-2 max-w-md pt-2">
                    <input
                      type="text"
                      placeholder="Add new category (e.g. Eco-Sanctuary)..."
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      className="w-full bg-[#162C48] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newCategoryInput.trim()) {
                          handleFieldChange('property', 'categories', [...localSettings.property.categories, newCategoryInput.trim()]);
                          setNewCategoryInput('');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#D4AF37] hover:text-[#0F1E36] text-white text-xs font-bold transition-all shrink-0"
                    >
                      Add
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. AREA & MARKET RATE SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'areaMarket' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 4 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">Area Intelligence & Market Rate Calculation Engine</h2>
                <p className="text-xs text-gray-400">Configure benchmark rate data sources, automated recalculation frequency, and trendline algorithms.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Area Rate Source Selection */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Area Rate Source Selection</h3>
                    <p className="text-[11px] text-gray-400">Select the authoritative benchmark methodology for calculating average price per sq.ft.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {[
                      { id: 'listings_avg', title: 'Property Listings Average', desc: 'Synthesizes active asking rates' },
                      { id: 'broker_reports', title: 'Broker Reports', desc: 'Certified local broker transactions' },
                      { id: 'owner_reports', title: 'Owner Reports', desc: 'Direct registered seller disclosures' },
                      { id: 'admin_manual', title: 'Admin Manual Update', desc: 'Direct sovereign override control' },
                      { id: 'combined', title: 'Combined Method', desc: 'Weighted multi-factor econometric index' },
                    ].map((src) => {
                      const isSelected = localSettings.areaMarket.rateSource === src.id;
                      return (
                        <div
                          key={src.id}
                          onClick={() => handleFieldChange('areaMarket', 'rateSource', src.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-1.5 ${
                            isSelected
                              ? 'border-[#D4AF37] bg-[#1E3A5F]/80 text-white shadow-lg'
                              : 'border-white/10 bg-[#162C48] text-gray-300 hover:border-white/30'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold">{src.title}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                          </div>
                          <p className="text-[10px] text-gray-400">{src.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Area Rate Update Frequency */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Area Rate Update Frequency</h3>
                  <p className="text-[11px] text-gray-400">How frequently the econometric engine indexes neighborhood rate averages.</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'realtime', label: 'Real-Time (Instant Recalc)' },
                      { id: 'daily', label: 'Daily Midnight Sync' },
                      { id: 'weekly', label: 'Weekly Consolidated' },
                      { id: 'monthly', label: 'Monthly Institutional' },
                    ].map((freq) => (
                      <button
                        key={freq.id}
                        type="button"
                        onClick={() => handleFieldChange('areaMarket', 'updateFrequency', freq.id)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          localSettings.areaMarket.updateFrequency === freq.id
                            ? 'bg-[#D4AF37] text-[#0A1120] font-black border-[#D4AF37]'
                            : 'bg-[#162C48] text-gray-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {freq.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Growth Calculation Period */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Growth Calculation Period</h3>
                  <p className="text-[11px] text-gray-400">Baseline timeframe used to calculate (+X% YoY or MoM) growth indicators.</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: '1_month', label: '1 Month Horizon' },
                      { id: '3_months', label: '3 Months (Quarterly)' },
                      { id: '6_months', label: '6 Months (Half-Year)' },
                      { id: '1_year', label: '1 Year (Annual Baseline)' },
                    ].map((period) => (
                      <button
                        key={period.id}
                        type="button"
                        onClick={() => handleFieldChange('areaMarket', 'growthCalculationPeriod', period.id)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          localSettings.areaMarket.growthCalculationPeriod === period.id
                            ? 'bg-[#D4AF37] text-[#0A1120] font-black border-[#D4AF37]'
                            : 'bg-[#162C48] text-gray-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Market Trend Analysis Enable/Disable */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">AI Market Trend Analysis</h3>
                    <p className="text-[11px] text-gray-400">Enable predictive trendline banners ("High Growth Zone", "Trophy Investment Hub") on Area Intel page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('areaMarket', 'marketTrendAnalysisEnabled', !localSettings.areaMarket.marketTrendAnalysisEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.areaMarket.marketTrendAnalysisEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.areaMarket.marketTrendAnalysisEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. BROKER SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'broker' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 5 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">Broker Network & Escrow Commission Settings</h2>
                <p className="text-xs text-gray-400">Define agent registration approval protocols, verification requirements, and commission split matrix.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Broker Registration Approval */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Broker Registration Mode</h3>
                  <p className="text-[11px] text-gray-400">Determine whether broker signups require senior partner document clearance.</p>
                  <select
                    value={localSettings.broker.brokerRegistrationApproval}
                    onChange={(e) => handleFieldChange('broker', 'brokerRegistrationApproval', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="manual_review">Manual Admin Document Review & Approval</option>
                    <option value="instant">Instant Automated License Number Check</option>
                  </select>
                </div>

                {/* Lead Assignment Rules */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Lead Routing Assignment Rules</h3>
                  <p className="text-[11px] text-gray-400">Algorithm governing how incoming VIP buyer inquiries are routed to agents.</p>
                  <select
                    value={localSettings.broker.leadAssignmentRule}
                    onChange={(e) => handleFieldChange('broker', 'leadAssignmentRule', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="round_robin">Fair Round-Robin Queue</option>
                    <option value="territory_based">Territory & Locality Specialization</option>
                    <option value="seniority_based">Senior Partner Performance Tiering</option>
                  </select>
                </div>

                {/* Broker Rating System */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Public Broker Rating System</h3>
                    <p className="text-[11px] text-gray-400">Display 5-star transaction ratings and verified closing badges on agent profiles.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('broker', 'ratingSystemEnabled', !localSettings.broker.ratingSystemEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.broker.ratingSystemEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.broker.ratingSystemEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Broker Commission Settings */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Standard Commission Splits (%)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Listing Broker %</span>
                      <input
                        type="number"
                        step="0.1"
                        value={localSettings.broker.commission.standardListingCommissionPercent}
                        onChange={(e) => handleSubFieldChange('broker', 'commission', 'standardListingCommissionPercent', Number(e.target.value))}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Buyer Broker %</span>
                      <input
                        type="number"
                        step="0.1"
                        value={localSettings.broker.commission.buyerBrokerCommissionPercent}
                        onChange={(e) => handleSubFieldChange('broker', 'commission', 'buyerBrokerCommissionPercent', Number(e.target.value))}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Broker Verification Documents Checklist */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Mandatory Broker Verification Documents</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {localSettings.broker.requiredVerificationDocs.map((doc, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#162C48] border border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-200 font-medium">{doc}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. MAP & LOCATION SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'map' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 6 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">Geospatial Mapping & Coordinate Settings</h2>
                <p className="text-xs text-gray-400">Manage Google Maps and Mappls SDK API keys, default anchor viewports, and radius HUD.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Google Maps API Key */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Google Maps JavaScript API Key</label>
                    <button
                      type="button"
                      onClick={() => setShowMaskedKeys(!showMaskedKeys)}
                      className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      {showMaskedKeys ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showMaskedKeys ? 'Mask' : 'Reveal'}</span>
                    </button>
                  </div>
                  <input
                    type={showMaskedKeys ? 'text' : 'password'}
                    value={localSettings.map.googleMapsApiKey}
                    onChange={(e) => handleFieldChange('map', 'googleMapsApiKey', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="text-[10px] text-gray-400">Powers 3D aerial photogrammetry and street view vantage.</span>
                </div>

                {/* Mappls API Key */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Mappls (MapmyIndia) SDK API Key</label>
                  </div>
                  <input
                    type={showMaskedKeys ? 'text' : 'password'}
                    value={localSettings.map.mapplsApiKey}
                    onChange={(e) => handleFieldChange('map', 'mapplsApiKey', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="text-[10px] text-gray-400">Used for Indian sub-continent cadastre mapping and Patta survey plots.</span>
                </div>

                {/* Default Map Coordinates */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Default Map Focus Coordinates</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Latitude</span>
                      <input
                        type="number"
                        step="0.0001"
                        value={localSettings.map.defaultLocation.lat}
                        onChange={(e) => handleSubFieldChange('map', 'defaultLocation', 'lat', Number(e.target.value))}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Longitude</span>
                      <input
                        type="number"
                        step="0.0001"
                        value={localSettings.map.defaultLocation.lng}
                        onChange={(e) => handleSubFieldChange('map', 'defaultLocation', 'lng', Number(e.target.value))}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Nearby Places Search Radius */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Nearby Facilities Search Radius</h3>
                  <p className="text-[11px] text-gray-400">Radius in km around properties to discover schools, hospitals, and transit hubs.</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="25"
                      step="0.5"
                      value={localSettings.map.nearbyPlacesSearchRadiusKm}
                      onChange={(e) => handleFieldChange('map', 'nearbyPlacesSearchRadiusKm', Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                    <span className="font-bold font-mono text-sm text-[#D4AF37] shrink-0">
                      {localSettings.map.nearbyPlacesSearchRadiusKm} km
                    </span>
                  </div>
                </div>

                {/* Satellite View Toggle */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Default Satellite & 3D Topographic Terrain View</h3>
                    <p className="text-[11px] text-gray-400">Load photorealistic satellite imagery as the primary map layer on property detail pages.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('map', 'satelliteViewEnabled', !localSettings.map.satelliteViewEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.map.satelliteViewEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.map.satelliteViewEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. AI SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 7 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">Artificial Intelligence & Model Gateway Settings</h2>
                <p className="text-xs text-gray-400">Configure LLM providers, recommendation sensitivity, spatial valuation, and automated report generation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* AI Chat Assistant */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">AI Concierge Chat Assistant</h3>
                      <p className="text-[11px] text-gray-400">Floating chatbot handling buyer questions about zoning, finishes, and visits.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('ai', 'aiChatAssistantEnabled', !localSettings.ai.aiChatAssistantEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                        localSettings.ai.aiChatAssistantEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        localSettings.ai.aiChatAssistantEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Primary LLM Provider Engine</label>
                    <select
                      value={localSettings.ai.aiModelProvider}
                      onChange={(e) => handleFieldChange('ai', 'aiModelProvider', e.target.value)}
                      className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="gpt-4o">OpenAI GPT-4o (Multimodal Spatial Reasoning)</option>
                      <option value="claude-3.5">Anthropic Claude 3.5 Sonnet (High Precision Contracts)</option>
                      <option value="gemini-1.5-pro">Google Gemini 1.5 Pro (Large Context Window)</option>
                    </select>
                  </div>
                </div>

                {/* AI Property Recommendation */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">AI Property Matchmaker</h3>
                      <p className="text-[11px] text-gray-400">Vector similarity matching based on buyer lifestyle questions.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('ai', 'aiPropertyRecommendationEnabled', !localSettings.ai.aiPropertyRecommendationEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                        localSettings.ai.aiPropertyRecommendationEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        localSettings.ai.aiPropertyRecommendationEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Match Sensitivity Algorithm</label>
                    <select
                      value={localSettings.ai.recommendationSensitivity}
                      onChange={(e) => handleFieldChange('ai', 'recommendationSensitivity', e.target.value)}
                      className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="conservative">Strict Exact Match (Zero Deviation)</option>
                      <option value="balanced">Balanced (Considers Adjacent Neighborhoods)</option>
                      <option value="exploratory">Exploratory (Discovers High-Upside Off-Market Gems)</option>
                    </select>
                  </div>
                </div>

                {/* AI Area Analysis */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">AI Area & Livability Intelligence</h3>
                    <p className="text-[11px] text-gray-400">Generates comprehensive neighborhood scorecards and transit analysis.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('ai', 'aiAreaAnalysisEnabled', !localSettings.ai.aiAreaAnalysisEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.ai.aiAreaAnalysisEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.ai.aiAreaAnalysisEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* AI Property Valuation */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">AI Property Valuation Algorithm</h3>
                    <p className="text-[11px] text-gray-400">Powers instant valuation modals and seller yield estimates.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('ai', 'aiPropertyValuationEnabled', !localSettings.ai.aiPropertyValuationEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.ai.aiPropertyValuationEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.ai.aiPropertyValuationEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 8. NOTIFICATION SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'notification' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 8 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">Notification & Messaging Channels</h2>
                <p className="text-xs text-gray-400">Configure multi-channel alerts for inquiries, WhatsApp Business API, and site visit passes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Email Notifications */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">Email Notification Gateway</h3>
                      <p className="text-[11px] text-gray-400">Transactional emails, PDF receipts, and monthly investor digests.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('notification', 'emailNotificationsEnabled', !localSettings.notification.emailNotificationsEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                        localSettings.notification.emailNotificationsEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        localSettings.notification.emailNotificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Email Delivery Service</label>
                    <select
                      value={localSettings.notification.emailProvider}
                      onChange={(e) => handleFieldChange('notification', 'emailProvider', e.target.value)}
                      className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="sendgrid">SendGrid Dynamic Templates</option>
                      <option value="postmark">Postmark Enterprise High-Deliverability</option>
                      <option value="smtp">Custom Enterprise Private SMTP</option>
                    </select>
                  </div>
                </div>

                {/* WhatsApp Business API */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">WhatsApp Business API</h3>
                      <p className="text-[11px] text-gray-400">Instant VIP chauffeur arrival alerts & brochure PDFs via WhatsApp.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('notification', 'whatsappNotificationsEnabled', !localSettings.notification.whatsappNotificationsEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                        localSettings.notification.whatsappNotificationsEnabled ? 'bg-[#D4AF37]' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        localSettings.notification.whatsappNotificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">WhatsApp Business Virtual Number</label>
                    <input
                      type="text"
                      value={localSettings.notification.whatsappBusinessNumber}
                      onChange={(e) => handleFieldChange('notification', 'whatsappBusinessNumber', e.target.value)}
                      className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                {/* Inquiry Instant Alerts */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Lead Inquiry Instant Alerts</h3>
                    <p className="text-[11px] text-gray-400">Push notification to listing directors the second an inquiry is submitted.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('notification', 'inquiryInstantAlerts', !localSettings.notification.inquiryInstantAlerts)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.notification.inquiryInstantAlerts ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.notification.inquiryInstantAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Site Visit Alerts */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">VIP Site Visit Arrival Alerts</h3>
                    <p className="text-[11px] text-gray-400">SMS & push alerts to on-site security guards when VIP passes are scanned.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('notification', 'siteVisitVipAlerts', !localSettings.notification.siteVisitVipAlerts)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.notification.siteVisitVipAlerts ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.notification.siteVisitVipAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 9. FINANCIAL SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'financial' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 9 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">Financial Engine, Taxes & Currency Settings</h2>
                <p className="text-xs text-gray-400">Configure mortgage interest rates, municipal stamp duty, EMI benchmarks, and display currencies.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Default Currency */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Default Display Currency</h3>
                  <p className="text-[11px] text-gray-400">Primary currency format for unauthenticated visitors.</p>
                  <select
                    value={localSettings.financial.defaultCurrency}
                    onChange={(e) => handleFieldChange('financial', 'defaultCurrency', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="USD">USD ($) - United States Dollar</option>
                    <option value="INR">INR (₹) - Indian Rupee (Crores & Lakhs)</option>
                    <option value="EUR">EUR (€) - Eurozone</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="AED">AED (د.إ) - UAE Dirham</option>
                  </select>
                </div>

                {/* Base Mortgage Interest Rate */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Benchmark Mortgage Interest Rate (%)</h3>
                  <p className="text-[11px] text-gray-400">Default rate used by the Financial Suite and property detail EMI calculators.</p>
                  <input
                    type="number"
                    step="0.05"
                    value={localSettings.financial.loanInterestRate.baseRatePercent}
                    onChange={(e) => handleSubFieldChange('financial', 'loanInterestRate', 'baseRatePercent', Number(e.target.value))}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                  />
                </div>

                {/* EMI Default Tenure */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Default Loan Tenure (Years)</h3>
                  <p className="text-[11px] text-gray-400">Baseline amortization duration in the EMI simulator.</p>
                  <select
                    value={localSettings.financial.emiCalculator.defaultTenureYears}
                    onChange={(e) => handleSubFieldChange('financial', 'emiCalculator', 'defaultTenureYears', Number(e.target.value))}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white font-bold"
                  >
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years (Standard)</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>

                {/* Property Taxes & Stamp Duty */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Estimated Stamp Duty & Tax (%)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Stamp Duty %</span>
                      <input
                        type="number"
                        step="0.25"
                        value={localSettings.financial.propertyTax.stampDutyPercent}
                        onChange={(e) => handleSubFieldChange('financial', 'propertyTax', 'stampDutyPercent', Number(e.target.value))}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Annual Tax %</span>
                      <input
                        type="number"
                        step="0.05"
                        value={localSettings.financial.propertyTax.annualPropertyTaxPercent}
                        onChange={(e) => handleSubFieldChange('financial', 'propertyTax', 'annualPropertyTaxPercent', Number(e.target.value))}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 10. SECURITY & AUDIT SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 10 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">Security Controls & Live Activity Audit Trail</h2>
                <p className="text-xs text-gray-400">Enforce two-factor authentication, manage session limits, and inspect immutable administrator audit logs.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Two Factor Authentication */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Two-Factor Authentication (2FA) Enforcement</h3>
                  <p className="text-[11px] text-gray-400">Security requirement policy for logging into management desks.</p>
                  <select
                    value={localSettings.security.twoFactorAuthMode}
                    onChange={(e) => handleFieldChange('security', 'twoFactorAuthMode', e.target.value)}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="mandatory_admins_optional_users">Mandatory for Admins & Brokers (Recommended)</option>
                    <option value="mandatory_all">Mandatory for All Users & Buyers</option>
                    <option value="disabled">Disabled (Test Environment Only)</option>
                  </select>
                </div>

                {/* Session Timeout */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Admin Session Timeout</h3>
                  <p className="text-[11px] text-gray-400">Automatically logout inactive administrator sessions.</p>
                  <select
                    value={localSettings.security.sessionTimeoutMinutes}
                    onChange={(e) => handleFieldChange('security', 'sessionTimeoutMinutes', Number(e.target.value))}
                    className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value={15}>15 Minutes of Inactivity</option>
                    <option value={30}>30 Minutes of Inactivity</option>
                    <option value={60}>60 Minutes of Inactivity</option>
                    <option value={240}>4 Hours</option>
                  </select>
                </div>

                {/* Login Security Lockout */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Login Brute-Force Defense</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Max Failed Attempts</span>
                      <input
                        type="number"
                        value={localSettings.security.loginSecurity.maxFailedAttempts}
                        onChange={(e) => handleSubFieldChange('security', 'loginSecurity', 'maxFailedAttempts', Number(e.target.value))}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Lockout Duration (Mins)</span>
                      <input
                        type="number"
                        value={localSettings.security.loginSecurity.lockoutDurationMinutes}
                        onChange={(e) => handleSubFieldChange('security', 'loginSecurity', 'lockoutDurationMinutes', Number(e.target.value))}
                        className="w-full bg-[#162C48] border border-white/10 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Admin Access Control (RBAC) */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Active RBAC Security Roles</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {localSettings.security.adminAccessControl.rbacRoles.map((role, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#162C48] border border-white/10 text-[10px] font-mono text-gray-200">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* LIVE ACTIVITY AUDIT LOG TABLE */}
              <div className="p-5 rounded-3xl bg-[#0F1E36] border border-white/10 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span>Live Administrator Activity Audit Log</span>
                    </h3>
                    <p className="text-[11px] text-gray-400">Tamper-evident record of all system modifications and configuration updates.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Filter audit actions..."
                      value={auditSearch}
                      onChange={(e) => setAuditSearch(e.target.value)}
                      className="bg-[#162C48] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-white/10 text-[#D4AF37] font-bold">
                        <th className="p-3">Timestamp</th>
                        <th className="p-3">Administrator</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Action Description</th>
                        <th className="p-3">IP Origin</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {settingsLogs
                        .filter((log) => !auditSearch.trim() || log.action.toLowerCase().includes(auditSearch.toLowerCase()) || log.category.toLowerCase().includes(auditSearch.toLowerCase()))
                        .map((log) => (
                          <tr key={log.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-3 text-gray-400 text-[11px]">{log.timestamp}</td>
                            <td className="p-3 text-white font-bold">{log.adminUser}</td>
                            <td className="p-3 text-[#D4AF37]">{log.category}</td>
                            <td className="p-3 text-gray-300 font-sans">{log.action}</td>
                            <td className="p-3 text-gray-400 text-[11px]">{log.ipAddress}</td>
                            <td className="p-3 text-right">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                {log.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 11. ANALYTICS SETTINGS PANEL */}
          {/* ========================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Category 11 of 11
                </span>
                <h2 className="text-2xl font-black font-serif text-white">Analytics, Demand Scoring & Heatmap Settings</h2>
                <p className="text-xs text-gray-400">Calibrate mathematical weights for Area Demand scores, Investment ROI formulas, and user session heatmaps.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Investment Score Formula Weights */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0F1E36] border border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Investment Score Formula Weight Allocation (100% Total)</h3>
                      <p className="text-[11px] text-gray-400">Controls how the 1-10 Investment Score is calculated across estates.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#162C48] border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300 font-semibold">Rental Yield</span>
                        <span className="text-[#D4AF37] font-bold font-mono">{localSettings.analytics.investmentScoreFormulaWeights.rentalYieldWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={localSettings.analytics.investmentScoreFormulaWeights.rentalYieldWeight}
                        onChange={(e) => handleSubFieldChange('analytics', 'investmentScoreFormulaWeights', 'rentalYieldWeight', Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#162C48] border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300 font-semibold">Historical Appreciation</span>
                        <span className="text-[#D4AF37] font-bold font-mono">{localSettings.analytics.investmentScoreFormulaWeights.historicalAppreciationWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={localSettings.analytics.investmentScoreFormulaWeights.historicalAppreciationWeight}
                        onChange={(e) => handleSubFieldChange('analytics', 'investmentScoreFormulaWeights', 'historicalAppreciationWeight', Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#162C48] border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300 font-semibold">Infrastructure Growth</span>
                        <span className="text-[#D4AF37] font-bold font-mono">{localSettings.analytics.investmentScoreFormulaWeights.infrastructureGrowthWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={localSettings.analytics.investmentScoreFormulaWeights.infrastructureGrowthWeight}
                        onChange={(e) => handleSubFieldChange('analytics', 'investmentScoreFormulaWeights', 'infrastructureGrowthWeight', Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#162C48] border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300 font-semibold">Legal Title Clearance</span>
                        <span className="text-[#D4AF37] font-bold font-mono">{localSettings.analytics.investmentScoreFormulaWeights.legalClearanceWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={localSettings.analytics.investmentScoreFormulaWeights.legalClearanceWeight}
                        onChange={(e) => handleSubFieldChange('analytics', 'investmentScoreFormulaWeights', 'legalClearanceWeight', Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Popularity Tracking */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Property Popularity & 360 Engagement Tracking</h3>
                    <p className="text-[11px] text-gray-400">Track view corridor hotspots and average seconds spent inside virtual tours.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('analytics', 'propertyPopularityTracking', !localSettings.analytics.propertyPopularityTracking)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.analytics.propertyPopularityTracking ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.analytics.propertyPopularityTracking ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* User Activity Heatmap Tracking */}
                <div className="p-5 rounded-2xl bg-[#0F1E36] border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Anonymized Session Heatmaps</h3>
                    <p className="text-[11px] text-gray-400">GDPR-compliant cursor heatmaps to optimize floor plan and gallery layouts.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFieldChange('analytics', 'userActivityHeatmapTracking', !localSettings.analytics.userActivityHeatmapTracking)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      localSettings.analytics.userActivityHeatmapTracking ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      localSettings.analytics.userActivityHeatmapTracking ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
