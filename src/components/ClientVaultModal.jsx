'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { 
  ShieldCheck, 
  X, 
  FolderPlus, 
  Folder, 
  StickyNote, 
  Bell, 
  Download, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Heart, 
  Eye, 
  ExternalLink 
} from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import { formatLocalizedPrice } from '../lib/utils';

export default function ClientVaultModal({ isOpen, onClose, onOpenTour }) {
  const [mounted, setMounted] = useState(false);
  const { 
    properties, 
    favorites, 
    vaultNotes, 
    vaultCollections, 
    addVaultNote, 
    deleteVaultNote, 
    createVaultCollection, 
    togglePropertyInCollection, 
    currency, 
    currentUser 
  } = useRealEstateStore();

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

  const [activeTab, setActiveTab] = useState('collections'); // 'collections' | 'notes' | 'alerts'
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState(vaultCollections[0]?.id || null);
  const [activeNotePropId, setActiveNotePropId] = useState(properties[0]?.id || '');
  const [newNoteText, setNewNoteText] = useState('');

  if (!isOpen || !mounted) return null;

  const currentCollection = vaultCollections.find((c) => c.id === selectedCollectionId) || vaultCollections[0];
  const collectionProperties = currentCollection
    ? properties.filter((p) => currentCollection.propertyIds.includes(p.id))
    : [];

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    createVaultCollection(newCollectionName.trim());
    setNewCollectionName('');
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeNotePropId) return;
    addVaultNote(activeNotePropId, newNoteText.trim());
    setNewNoteText('');
  };

  const exportVaultSummary = () => {
    const summary = {
      client: currentUser?.name || 'Private Principal',
      exportedAt: new Date().toISOString(),
      collections: vaultCollections.map((col) => ({
        name: col.name,
        properties: properties.filter((p) => col.propertyIds.includes(p.id)).map((p) => ({
          title: p.title,
          priceUSD: p.price,
          location: `${p.address.neighborhood}, ${p.address.city}`
        }))
      })),
      notes: vaultNotes
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aura_Vault_Export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 max-w-4xl w-full h-[85vh] flex flex-col justify-between shadow-2xl relative overflow-hidden text-[#1F2937]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#1E3A5F] hover:text-[#8A5A00] p-2 z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="border-b border-gray-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 flex items-center justify-center text-[#1E3A5F]">
              <ShieldCheck className="w-6 h-6 text-[#1E3A5F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#1E3A5F] font-serif">
                  My Private Vault
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-[#1E3A5F] border border-[#D4AF37]/40 shadow-2xs">
                  Principal Confidential
                </span>
              </div>
              <p className="text-xs text-[#4B5563] mt-0.5">
                Curated acquisition dossiers, private diligence notes, and portfolio collections for {currentUser ? currentUser.name : 'Private Investor'}.
              </p>
            </div>
          </div>

          <button
            onClick={exportVaultSummary}
            className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#1E3A5F] hover:text-white text-[#1E3A5F] text-xs font-bold flex items-center gap-1.5 border border-gray-300 transition-all self-start sm:self-center shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#8A5A00]" />
            <span>Export Dossier</span>
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 pt-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('collections')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'collections'
                ? 'border-[#1E3A5F] text-[#1E3A5F]'
                : 'border-transparent text-[#4B5563] hover:text-[#1E3A5F]'
            }`}
          >
            <Folder className="w-4 h-4 text-[#8A5A00]" />
            <span>Curated Collections ({vaultCollections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'notes'
                ? 'border-[#1E3A5F] text-[#1E3A5F]'
                : 'border-transparent text-[#4B5563] hover:text-[#1E3A5F]'
            }`}
          >
            <StickyNote className="w-4 h-4 text-[#8A5A00]" />
            <span>Diligence Notes ({Object.values(vaultNotes).reduce((acc, l) => acc + l.length, 0)})</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'alerts'
                ? 'border-[#1E3A5F] text-[#1E3A5F]'
                : 'border-transparent text-[#4B5563] hover:text-[#1E3A5F]'
            }`}
          >
            <Bell className="w-4 h-4 text-[#8A5A00]" />
            <span>Market & Price Alerts</span>
          </button>
        </div>

        {/* Main Body */}
        <div className="flex-1 min-h-0 overflow-y-auto py-6">
          
          {/* TAB 1: COLLECTIONS */}
          {activeTab === 'collections' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
              
              {/* Collection Folders List (4 cols) */}
              <div className="md:col-span-4 space-y-4 border-r border-gray-200 pr-4">
                <form onSubmit={handleCreateCollection} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="New Collection name..."
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-gray-300 text-xs text-[#1F2937] placeholder:text-gray-400 focus:outline-none focus:border-[#1E3A5F] font-medium"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#1E3A5F] text-white hover:bg-[#162c48] transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>

                <div className="space-y-1.5">
                  {vaultCollections.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setSelectedCollectionId(col.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between border transition-all ${
                        (selectedCollectionId || vaultCollections[0]?.id) === col.id
                          ? 'bg-[#FAF8F5] text-[#1E3A5F] border-[#1E3A5F] font-bold shadow-xs'
                          : 'bg-white text-[#4B5563] border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Folder className="w-3.5 h-3.5 text-[#8A5A00]" />
                        {col.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] text-[#1E3A5F] font-bold">
                        {col.propertyIds.length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Collection Estates Grid (8 cols) */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <h4 className="text-sm font-bold text-[#1E3A5F] font-serif">
                    {currentCollection ? currentCollection.name : 'Select a collection'}
                  </h4>
                  <span className="text-xs text-[#4B5563] font-semibold">
                    {collectionProperties.length} Properties Saved
                  </span>
                </div>

                {collectionProperties.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {collectionProperties.map((prop) => (
                      <div key={prop.id} className="bg-white border border-gray-200 rounded-2xl p-3 space-y-3 shadow-card">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#1E3A5F]/90 text-xs font-bold text-white shadow-sm">
                            {formatLocalizedPrice(prop.price, currency, prop.priceSuffix, prop.currency)}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-xs font-bold text-[#1E3A5F] truncate">{prop.title}</h5>
                          <span className="text-[10px] text-[#4B5563] block font-medium">{prop.address.neighborhood}, {prop.address.city}</span>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
                          <button
                            onClick={() => {
                              onClose();
                              onOpenTour?.(prop);
                            }}
                            className="text-[11px] text-[#8A5A00] font-bold hover:underline flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" /> 360° Tour
                          </button>
                          <Link
                            href={`/properties/${prop.id}`}
                            onClick={onClose}
                            className="text-[11px] text-[#1E3A5F] font-bold hover:text-[#8A5A00] flex items-center gap-1"
                          >
                            View Specs <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#4B5563] text-xs space-y-2">
                    <p className="font-semibold">No properties added to this collection yet.</p>
                    <p className="text-[11px] text-gray-400">
                      Use the "Vault" icon on any property card or detail page to add estates to this dossier.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: DILIGENCE NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="bg-[#FAF8F5] border border-gray-200 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <select
                    value={activeNotePropId}
                    onChange={(e) => setActiveNotePropId(e.target.value)}
                    className="w-full sm:w-1/2 px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs text-[#1F2937] focus:outline-none focus:border-[#1E3A5F] font-medium"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Enter private note (e.g. Schedule private inspection, offer ceiling $22M)..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="w-full sm:w-1/2 px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs text-[#1F2937] placeholder:text-gray-400 focus:outline-none focus:border-[#1E3A5F] font-medium"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#1E3A5F] text-white font-bold text-xs hover:bg-[#162c48] whitespace-nowrap transition-colors shadow-sm"
                  >
                    Add Diligence Note
                  </button>
                </div>
              </form>

              {/* Notes List */}
              <div className="space-y-3">
                {Object.keys(vaultNotes).length > 0 ? (
                  Object.entries(vaultNotes).map(([propId, notesList]) => {
                    const prop = properties.find((p) => p.id === propId);
                    if (!notesList || notesList.length === 0) return null;

                    return (
                      <div key={propId} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <Link href={`/properties/${propId}`} onClick={onClose} className="text-xs font-bold text-[#1E3A5F] hover:underline">
                            {prop?.title || propId}
                          </Link>
                          <span className="text-[10px] text-[#4B5563] font-semibold">{notesList.length} notes</span>
                        </div>

                        <div className="space-y-2">
                          {notesList.map((n) => (
                            <div key={n.id} className="flex items-center justify-between bg-[#FAF8F5] p-2.5 rounded-xl text-xs text-[#1F2937] border border-gray-100">
                              <div className="space-y-0.5">
                                <p className="font-medium">{n.text}</p>
                                <span className="text-[10px] text-gray-400">{n.createdAt}</span>
                              </div>
                              <button
                                onClick={() => deleteVaultNote(propId, n.id)}
                                className="text-gray-400 hover:text-rose-600 p-1 transition-colors"
                                title="Delete note"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-[#4B5563] text-xs font-medium">
                    No private diligence notes yet. Add thoughts and strategy notes to any trophy estate.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ALERTS */}
          {activeTab === 'alerts' && (
            <div className="max-w-xl mx-auto py-4 space-y-4 text-xs">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-card">
                <h4 className="text-sm font-bold text-[#1E3A5F] font-serif flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#8A5A00]" />
                  Confidential Market Alert Subscriptions
                </h4>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 cursor-pointer">
                    <div>
                      <span className="font-bold text-[#1E3A5F] block">Price Adjustment Alerts</span>
                      <span className="text-[10px] text-[#4B5563]">Receive private telegram/email alerts for any price reductions on saved properties.</span>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#1E3A5F] w-4 h-4" />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 cursor-pointer">
                    <div>
                      <span className="font-bold text-[#1E3A5F] block">Off-Market Pocket Listings</span>
                      <span className="text-[10px] text-[#4B5563]">Immediate access to unlisted estates prior to public press distribution.</span>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#1E3A5F] w-4 h-4" />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 cursor-pointer">
                    <div>
                      <span className="font-bold text-[#1E3A5F] block">Zoning & Coastal Regulation Updates</span>
                      <span className="text-[10px] text-[#4B5563]">Notified if coastal or municipal masterplan regulations shift.</span>
                    </div>
                    <input type="checkbox" className="accent-[#1E3A5F] w-4 h-4" />
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-[#4B5563]">
          <span className="font-medium">Encrypted with Client Confidentiality Protocol</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] text-white font-bold transition-all shadow-sm"
          >
            Close Vault
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
