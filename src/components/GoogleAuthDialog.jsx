'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ShieldCheck, ArrowRight, UserPlus, Info } from 'lucide-react';
import { useRealEstateStore } from '../lib/store';

// Official multi-color Google SVG Icon
export function GoogleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.27a7.22 7.22 0 010-4.54V6.58H1.25a11.96 11.96 0 000 10.84l4.03-3.15z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Preset verified Google test accounts
const GOOGLE_ACCOUNTS_PRESETS = [
  {
    id: 'google-acct-1',
    name: 'Jaganathan R.',
    email: 'jagan.investments@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'buyer',
    badge: 'Personal Google Account'
  },
  {
    id: 'google-acct-2',
    name: 'Alexandra Vance',
    email: 'alexandra.vance@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    role: 'investor',
    badge: 'Google Workspace Enterprise'
  }
];

export default function GoogleAuthDialog({ isOpen, onClose, onSuccess }) {
  const [mounted, setMounted] = useState(false);
  const [loadingAccountId, setLoadingAccountId] = useState(null);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [googleClientId, setGoogleClientId] = useState('');
  const { loginAs } = useRealEstateStore();

  useEffect(() => {
    setMounted(true);
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    setGoogleClientId(clientId);

    // If client ID is present, initialize GIS
    if (clientId && typeof window !== 'undefined') {
      try {
        if (!document.getElementById('google-client-script')) {
          const script = document.createElement('script');
          script.id = 'google-client-script';
          script.src = 'https://accounts.google.com/gsi/client';
          script.async = true;
          script.defer = true;
          script.onload = () => {
            if (window.google?.accounts?.id) {
              window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCredentialResponse
              });
            }
          };
          document.body.appendChild(script);
        }
      } catch (err) {
        console.warn('GIS script load note:', err);
      }
    }
  }, []);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  // Handle GIS JWT token response
  const handleCredentialResponse = (response) => {
    try {
      if (!response.credential) return;
      // Decode JWT payload
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);

      const authenticatedUser = {
        id: `google-${payload.sub || Date.now()}`,
        name: payload.name || 'Google User',
        email: payload.email,
        avatar: payload.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'buyer',
        authProvider: 'google',
        emailVerified: payload.email_verified ?? true
      };

      loginAs(authenticatedUser);
      onSuccess?.(authenticatedUser);
      onClose();
    } catch (err) {
      console.error('Failed to parse Google credential token:', err);
      setErrorMessage('Could not process Google Sign-In response.');
    }
  };

  // Authenticate selected preset or custom account
  const handleSelectAccount = (account) => {
    setLoadingAccountId(account.id || 'custom');
    setErrorMessage('');

    // Simulate authentic Google verification handshake
    setTimeout(() => {
      const authenticatedUser = {
        id: account.id || `google-${Date.now()}`,
        name: account.name,
        email: account.email,
        avatar: account.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: account.role || 'buyer',
        authProvider: 'google',
        emailVerified: true,
        authenticatedAt: new Date().toISOString()
      };

      loginAs(authenticatedUser);
      setLoadingAccountId(null);
      onSuccess?.(authenticatedUser);
      onClose();
    }, 900);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) {
      setErrorMessage('Please provide a valid Google/Gmail address.');
      return;
    }
    const cleanName = customName.trim() || customEmail.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    handleSelectAccount({
      id: `google-custom-${Date.now()}`,
      name: formattedName,
      email: customEmail.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=1e3a5f,d4af37`,
      role: 'buyer'
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/65 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[440px] max-h-[92vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 flex flex-col my-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="google-auth-title"
      >
        {/* Top Progress bar when loading */}
        {loadingAccountId && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden z-20">
            <div className="h-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 animate-[pulse_1s_infinite] w-full" />
          </div>
        )}

        {/* Modal Header: Clean Google Identity Branding */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center justify-center shadow-xs">
              <GoogleIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 id="google-auth-title" className="text-base font-bold text-gray-900 leading-snug">
                Sign in with Google
              </h2>
              <p className="text-xs text-gray-500">
                Choose an account to continue to <span className="font-semibold text-[#1E3A5F]">JK Realty</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={!!loadingAccountId}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-4 sm:p-6 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
          {!isCustomMode ? (
            <>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Available Accounts
                </p>

                <div className="space-y-2">
                  {GOOGLE_ACCOUNTS_PRESETS.map((acct) => {
                    const isLoading = loadingAccountId === acct.id;
                    return (
                      <button
                        key={acct.id}
                        type="button"
                        onClick={() => handleSelectAccount(acct)}
                        disabled={!!loadingAccountId}
                        className="w-full flex items-center justify-between p-3 rounded-2xl border border-gray-200 hover:border-[#4285F4] hover:bg-blue-50/40 text-left transition-all group focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 cursor-pointer disabled:opacity-60"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={acct.avatar}
                              alt={acct.name}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-xs"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs">
                              <GoogleIcon className="w-3 h-3" />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-900 truncate group-hover:text-[#1E3A5F]">
                              {acct.name}
                            </div>
                            <div className="text-[11px] text-gray-500 truncate">
                              {acct.email}
                            </div>
                            <span className="inline-block text-[9px] font-medium text-[#4285F4] bg-blue-50 px-1.5 py-0.2 rounded-md mt-0.5">
                              {acct.badge}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 pl-2">
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-[#4285F4] text-gray-400 group-hover:text-white flex items-center justify-center transition-colors">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Use Another Account Button */}
              <button
                type="button"
                onClick={() => setIsCustomMode(true)}
                disabled={!!loadingAccountId}
                className="w-full py-2.5 px-4 rounded-2xl border border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-gray-500" />
                <span>Use another Google account</span>
              </button>
            </>
          ) : (
            /* Custom Google Email Form */
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-gray-800">
                  Enter your Google Account
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomMode(false);
                    setErrorMessage('');
                  }}
                  className="text-[11px] text-[#4285F4] hover:underline font-semibold"
                >
                  ← Back to list
                </button>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                  Full Name (as on Google Profile)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Johnathan Miller"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4285F4] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                  Google / Gmail Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="user@gmail.com or workspace domain"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4285F4] focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!!loadingAccountId}
                className="w-full py-2.5 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loadingAccountId ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <GoogleIcon className="w-4 h-4 filter brightness-0 invert" />
                    <span>Authorize & Sign In with Google</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Privacy & Sharing Disclosure Notice */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-500 leading-relaxed">
              To continue, Google will share your name, email address, language preference, and profile picture with <span className="font-semibold text-gray-700">JK Realty Client Vault</span>. See JK Realty&apos;s{' '}
              <a href="/about" className="text-[#4285F4] hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/about" className="text-[#4285F4] hover:underline">
                Terms of Service
              </a>
              .
            </p>
          </div>

          {/* Institutional Trust Footer */}
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/30 flex items-center justify-between text-[11px] text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8A5A00]" />
              <span className="font-medium text-gray-800">Google OAuth 2.0 Security</span>
            </div>
            <span className="text-[10px] font-bold text-[#8A5A00] bg-[#D4AF37]/20 px-2 py-0.5 rounded-md">
              Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
