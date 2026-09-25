'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Sparkles, 
  Flame, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Settings,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import GoogleAuthDialog, { GoogleIcon } from './GoogleAuthDialog';
import FirebaseConfigModal from './FirebaseConfigModal';
import { 
  firebaseLoginWithEmail, 
  firebaseRegisterWithEmail, 
  firebaseLoginWithGoogle, 
  firebasePasswordReset, 
  isFirebaseConfigured,
  getFirebaseConfigStatus 
} from '../lib/firebase';

export default function AuthModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const { currentUser, demoUsers, loginAs, logout } = useRealEstateStore();
  
  // Modes: 'login' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState('login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer'); // 'buyer' | 'seller' | 'investor'
  const [showPassword, setShowPassword] = useState(false);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isGoogleOpen, setIsGoogleOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showDemoSwitcher, setShowDemoSwitcher] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState({ isConfigured: false });

  useEffect(() => {
    setMounted(true);
    setFirebaseStatus(getFirebaseConfigStatus());
  }, []);

  // Reset errors and fields on mode change or modal open
  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
    if (isOpen) {
      setFirebaseStatus(getFirebaseConfigStatus());
    }
  }, [authMode, isOpen]);

  // Lock background page scroll
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

  // Handle Firebase Email/Password Sign In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      if (isFirebaseConfigured()) {
        const user = await firebaseLoginWithEmail(email, password);
        loginAs(user);
        setSuccessMessage(`Welcome back, ${user.name}!`);
        setTimeout(() => onClose(), 800);
      } else {
        // Fallback for simulation when Firebase credentials are not yet entered
        setTimeout(() => {
          const userObj = {
            id: `firebase-sim-${Date.now()}`,
            name: email.split('@')[0].replace(/[._]/g, ' '),
            email: email.trim().toLowerCase(),
            role: 'buyer',
            authProvider: 'firebase-simulated',
            avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
            emailVerified: true
          };
          loginAs(userObj);
          setSuccessMessage(`Signed in as ${userObj.name}! (Demo Simulation)`);
          setTimeout(() => onClose(), 800);
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Firebase Email/Password Registration
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      if (isFirebaseConfigured()) {
        const user = await firebaseRegisterWithEmail(email, password, name, role);
        loginAs(user);
        setSuccessMessage(`Account created! Welcome to JK Realty, ${user.name}.`);
        setTimeout(() => onClose(), 900);
      } else {
        // Fallback simulation
        setTimeout(() => {
          const displayName = name.trim() || email.split('@')[0];
          const userObj = {
            id: `firebase-sim-${Date.now()}`,
            name: displayName,
            email: email.trim().toLowerCase(),
            role: role,
            authProvider: 'firebase-simulated',
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=1e3a5f,d4af37`,
            emailVerified: true
          };
          loginAs(userObj);
          setSuccessMessage(`Welcome to JK Realty, ${displayName}!`);
          setTimeout(() => onClose(), 900);
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Firebase Google Sign In
  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      if (isFirebaseConfigured()) {
        const user = await firebaseLoginWithGoogle('buyer');
        loginAs(user);
        setSuccessMessage(`Signed in with Google as ${user.name}!`);
        setTimeout(() => onClose(), 800);
      } else {
        // If Firebase is not configured, open the Google Auth Dialog with presets
        setIsGoogleOpen(true);
      }
    } catch (err) {
      // If popup was cancelled or domain unauthorized, offer fallback
      if (err.message.includes('popup was closed') || err.message.includes('popup')) {
        setErrorMessage(err.message);
      } else {
        // Open fallback Google dialog
        setIsGoogleOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Firebase Password Reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter the email address linked to your account.');
      return;
    }

    setIsLoading(true);

    try {
      if (isFirebaseConfigured()) {
        await firebasePasswordReset(email);
        setSuccessMessage(`A password reset link has been dispatched to ${email}. Check your inbox.`);
      } else {
        setTimeout(() => {
          setSuccessMessage(`Demo: A password reset link has been generated for ${email}.`);
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to send password reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md max-h-[88vh] bg-white border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-[#FAF8F5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1E3A5F] text-amber-300 flex items-center justify-center border border-[#D4AF37]/40 shadow-sm">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#1E3A5F] font-serif">
                    Firebase Authenticator
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${
                    firebaseStatus.isConfigured 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {firebaseStatus.isConfigured ? 'Live' : 'Ready'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Secure access for buyers, verified agents & investors
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsConfigOpen(true)}
                title="Firebase Settings & Credentials"
                className="p-2 rounded-xl text-gray-400 hover:text-[#1E3A5F] hover:bg-gray-100 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-[#1E3A5F] hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex gap-1.5 mt-3 pt-2 border-t border-gray-200/60">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'login'
                  ? 'bg-[#1E3A5F] text-white shadow-xs'
                  : 'bg-white/80 text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'register'
                  ? 'bg-[#1E3A5F] text-white shadow-xs'
                  : 'bg-white/80 text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('forgot')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'forgot'
                  ? 'bg-[#1E3A5F] text-white shadow-xs'
                  : 'bg-white/80 text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
            >
              Reset Pass
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 min-h-0 overscroll-contain">
          
          {/* Status Alerts */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. Continue with Google (Firebase Auth) */}
          {authMode !== 'forgot' && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-blue-50/30 hover:border-[#4285F4] text-xs font-bold text-gray-800 transition-all cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-50"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>Continue with Google (Firebase)</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-gray-200" />
                <span className="absolute px-2 bg-white text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  or with email credentials
                </span>
              </div>
            </div>
          )}

          {/* 2. FORM - SIGN IN */}
          {authMode === 'login' && (
            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="client@investmentgroup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-[#1E3A5F] hover:text-[#D4AF37] hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-9 pr-9 py-2.5 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs shadow-md shadow-[#1E3A5F]/20 transition-all mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In via Firebase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* 3. FORM - REGISTER */}
          {authMode === 'register' && (
            <form onSubmit={handleEmailSignUp} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Julian Montgomery"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Account Privilege Type
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'buyer', label: 'Buyer' },
                    { id: 'seller', label: 'Seller' },
                    { id: 'investor', label: 'Investor' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setRole(t.id)}
                      className={`py-1.5 px-2 rounded-lg text-center text-xs font-bold transition-all border ${
                        role === t.id
                          ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F]'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="client@investmentgroup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-9 pr-9 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs shadow-md shadow-[#1E3A5F]/20 transition-all mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Firebase Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* 4. FORM - RESET PASSWORD */}
          {authMode === 'forgot' && (
            <form onSubmit={handlePasswordReset} className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs">
                Enter your registered email address and we will dispatch a secure Firebase password reset link directly to your inbox.
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="client@investmentgroup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs shadow-md shadow-[#1E3A5F]/20 transition-all mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Reset Email</span>
                    <Mail className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs text-[#1E3A5F] hover:underline font-bold"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Switcher (Collapsible for Clean UX) */}
          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowDemoSwitcher(!showDemoSwitcher)}
              className="w-full flex items-center justify-between py-1 text-[11px] font-bold text-[#996515] uppercase tracking-wider"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                1-Click Preset Demo Accounts
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDemoSwitcher ? 'rotate-180' : ''}`} />
            </button>

            {showDemoSwitcher && (
              <div className="grid grid-cols-1 gap-1.5 mt-2 animate-in fade-in">
                {demoUsers.map((user) => {
                  const isSelected = currentUser?.id === user.id;
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        loginAs(user);
                        onClose();
                      }}
                      className={`px-3 py-2 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold shadow-xs'
                          : 'border-gray-200 bg-[#FAF8F5] hover:bg-white text-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-5 h-5 rounded-full object-cover border border-[#D4AF37]"
                        />
                        <span>{user.name}</span>
                      </div>
                      <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#996515] font-bold">
                        {user.role}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dedicated Login Page Link & Firebase Config Helper */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
            <button
              type="button"
              onClick={() => setIsConfigOpen(true)}
              className="text-gray-500 hover:text-[#1E3A5F] flex items-center gap-1 hover:underline"
            >
              <Flame className="w-3 h-3 text-amber-500" />
              <span>Firebase Keys Helper</span>
            </button>

            <Link
              href="/login"
              onClick={onClose}
              className="text-[#1E3A5F] hover:text-[#8A5A00] font-bold inline-flex items-center gap-1 hover:underline"
            >
              <span>Full Login Portal</span>
              <span>→</span>
            </Link>
          </div>

        </div>

      </div>

      {/* Google Auth Dialog Modal */}
      <GoogleAuthDialog
        isOpen={isGoogleOpen}
        onClose={() => setIsGoogleOpen(false)}
        onSuccess={() => onClose()}
      />

      {/* Firebase Config Modal */}
      <FirebaseConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />
    </div>,
    document.body
  );
}
