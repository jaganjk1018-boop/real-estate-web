'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Flame, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Key, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  getFirebaseConfig, 
  isFirebaseConfigured, 
  getFirebaseConfigStatus 
} from '../lib/firebase';

export default function FirebaseConfigModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(getFirebaseConfigStatus());
  
  // Custom Config Input Fields for browser-level override/test
  const [apiKey, setApiKey] = useState('');
  const [authDomain, setAuthDomain] = useState('');
  const [projectId, setProjectId] = useState('');
  const [storageBucket, setStorageBucket] = useState('');
  const [messagingSenderId, setMessagingSenderId] = useState('');
  const [appId, setAppId] = useState('');
  const [measurementId, setMeasurementId] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('status'); // 'status' | 'env' | 'custom'

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const currentConfig = getFirebaseConfig();
      setStatus(getFirebaseConfigStatus());
      setApiKey(currentConfig.apiKey || '');
      setAuthDomain(currentConfig.authDomain || '');
      setProjectId(currentConfig.projectId || '');
      setStorageBucket(currentConfig.storageBucket || '');
      setMessagingSenderId(currentConfig.messagingSenderId || '');
      setAppId(currentConfig.appId || '');
      setMeasurementId(currentConfig.measurementId || '');
      setSaveSuccess('');
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const envSnippet = `# Firebase Web App Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=${apiKey || 'your_api_key_here'}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${authDomain || `${projectId || 'your-project'}.firebaseapp.com`}
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${projectId || 'your-project-id'}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${storageBucket || `${projectId || 'your-project'}.firebasestorage.app`}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${messagingSenderId || 'your_sender_id'}
NEXT_PUBLIC_FIREBASE_APP_ID=${appId || 'your_app_id'}
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${measurementId || 'G-XXXXXXXXXX'}`;

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCustomConfig = (e) => {
    e.preventDefault();
    if (!apiKey.trim() || !projectId.trim() || !appId.trim()) {
      alert('Please provide at least API Key, Project ID, and App ID.');
      return;
    }

    const newConfig = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim() || `${projectId.trim()}.firebaseapp.com`,
      projectId: projectId.trim(),
      storageBucket: storageBucket.trim(),
      messagingSenderId: messagingSenderId.trim(),
      appId: appId.trim(),
      measurementId: measurementId.trim()
    };

    try {
      localStorage.setItem('aura_firebase_custom_config', JSON.stringify(newConfig));
      setStatus(getFirebaseConfigStatus());
      setSaveSuccess('Firebase credentials saved successfully to browser storage! Reloading in 1s...');
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.error('Failed to save Firebase custom config:', err);
    }
  };

  const handleResetCustomConfig = () => {
    try {
      localStorage.removeItem('aura_firebase_custom_config');
      setStatus(getFirebaseConfigStatus());
      setSaveSuccess('Cleared custom config. Reverting to environment variables...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {}
  };

  return createPortal(
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-white border border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 shadow-xs">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1E3A5F] font-serif">
                  Firebase Authenticator Setup
                </h3>
                {status.isConfigured ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Live
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-amber-600" /> Pending Keys
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500">
                Official Google Firebase Authentication for JK Realty Luxury Portals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-[#1E3A5F] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 px-6 pt-2 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'status'
                ? 'border-[#1E3A5F] text-[#1E3A5F]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Connection Status
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'custom'
                ? 'border-[#1E3A5F] text-[#1E3A5F]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Direct Config Editor
          </button>
          <button
            onClick={() => setActiveTab('env')}
            className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'env'
                ? 'border-[#1E3A5F] text-[#1E3A5F]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            .env.local Instructions
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 min-h-0 text-xs">
          
          {saveSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveSuccess}</span>
            </div>
          )}

          {/* TAB 1: Status */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                    Firebase Auth Health Status
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Project: <strong className="text-[#1E3A5F]">{status.projectId}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-100">
                    <span className="text-gray-500 font-medium">API Key</span>
                    {status.hasApiKey ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Present
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" /> Missing
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-100">
                    <span className="text-gray-500 font-medium">Auth Domain</span>
                    {status.hasAuthDomain ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Present
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" /> Default
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-100">
                    <span className="text-gray-500 font-medium">Project ID</span>
                    {status.hasProjectId ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Present
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" /> Missing
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-100">
                    <span className="text-gray-500 font-medium">App ID</span>
                    {status.hasAppId ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Present
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" /> Missing
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Supported Auth Providers */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2.5">
                <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block">
                  Configured Firebase Features
                </span>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-gray-800">Email & Password Authentication</div>
                      <div className="text-[10px] text-gray-500">Full client sign up, secure login, and password reset email dispatch</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-gray-800">Google Identity Provider (OAuth 2.0)</div>
                      <div className="text-[10px] text-gray-500">1-click popup authentication through Google Cloud accounts</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <div>
                      <div className="font-bold text-gray-800">Session Persistence & Cross-Tab Sync</div>
                      <div className="text-[10px] text-gray-500">Synchronized with JK Realty Store (Vault, Favorites & Schedule Visit)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick links to Firebase console */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-900 font-semibold text-[11px]">
                    Need to generate or view credentials?
                  </span>
                </div>
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex items-center gap-1 transition-all"
                >
                  <span>Firebase Console</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: Direct Config Editor */}
          {activeTab === 'custom' && (
            <form onSubmit={handleSaveCustomConfig} className="space-y-3.5">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-[11px]">
                  Paste your Firebase web app keys below to activate live authentication immediately without editing server files:
                </p>
                {localStorage.getItem('aura_firebase_custom_config') && (
                  <button
                    type="button"
                    onClick={handleResetCustomConfig}
                    className="text-[10px] text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                    apiKey *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="AIzaSyB..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                      projectId *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="jk-realty-luxury"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                      appId *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1:123456789:web:abcdef"
                      value={appId}
                      onChange={(e) => setAppId(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                      authDomain
                    </label>
                    <input
                      type="text"
                      placeholder="jk-realty.firebaseapp.com"
                      value={authDomain}
                      onChange={(e) => setAuthDomain(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                      messagingSenderId
                    </label>
                    <input
                      type="text"
                      placeholder="84729104829"
                      value={messagingSenderId}
                      onChange={(e) => setMessagingSenderId(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#152843] text-white font-bold text-xs shadow-md shadow-[#1E3A5F]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Save & Activate Firebase Authentication</span>
              </button>
            </form>
          )}

          {/* TAB 3: .env.local Instructions */}
          {activeTab === 'env' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-gray-600 text-[11px]">
                  Add these keys to your project root <code className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-gray-800">.env.local</code> file:
                </p>
              </div>

              <div className="relative">
                <pre className="p-3.5 rounded-2xl bg-gray-900 text-amber-300/90 font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800">
                  {envSnippet}
                </pre>
                <button
                  type="button"
                  onClick={handleCopyEnv}
                  className="absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-[10px] font-semibold flex items-center gap-1 border border-gray-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3 Step Setup Guide */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/30 space-y-2">
                <span className="font-bold text-[#1E3A5F] text-[11px] uppercase tracking-wider block">
                  3-Minute Firebase Setup Guide
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-gray-600">
                  <li>Visit <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-[#1E3A5F] underline font-semibold">Firebase Console</a> and click <strong>Create a project</strong>.</li>
                  <li>Click the <strong>Web (&lt;/&gt;) icon</strong> to register a web app and copy the <code>firebaseConfig</code> object values.</li>
                  <li>Under <strong>Build &gt; Authentication &gt; Sign-in method</strong>, enable <strong>Email/Password</strong> and <strong>Google</strong>.</li>
                </ol>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-[#FAF8F5] flex items-center justify-between">
          <span className="text-[10px] text-gray-400">
            Firebase JS SDK v12.19 & Next.js 15
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
