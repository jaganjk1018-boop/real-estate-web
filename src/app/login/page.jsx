'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle,
  KeyRound,
  Check,
  Award,
  BadgeCheck,
  Shield,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRealEstateStore } from '../../lib/store';
import GoogleAuthDialog, { GoogleIcon } from '../../components/GoogleAuthDialog';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams?.get('redirect') || '/';

  const { currentUser, demoUsers, loginAs, logout } = useRealEstateStore();

  // Mode: 'login' or 'register'
  const [mode, setMode] = useState('login');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accountType, setAccountType] = useState('buyer'); // 'buyer' | 'seller' | 'investor'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & Modals
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successToast, setSuccessToast] = useState('');
  const [isGoogleDialogOpen, setIsGoogleDialogOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  useEffect(() => {
    setErrorMessage('');
    setSuccessToast('');
  }, [mode]);

  const triggerSuccessConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#1E3A5F', '#996515', '#4285F4']
      });
    } catch (e) {}
  };

  const handleEmailPasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessToast('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      let userObj;

      if (mode === 'register') {
        const computedName = fullName.trim() || email.split('@')[0].replace(/[._]/g, ' ');
        const capitalizedName = computedName.charAt(0).toUpperCase() + computedName.slice(1);
        userObj = {
          id: `user-${Date.now()}`,
          name: capitalizedName,
          email: email.trim().toLowerCase(),
          role: accountType,
          authProvider: 'password',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(capitalizedName)}&backgroundColor=1e3a5f,d4af37`
        };
        setSuccessToast(`Welcome to JK Realty, ${userObj.name}! Initializing your vault...`);
      } else {
        const matchedDemo = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (matchedDemo) {
          userObj = { ...matchedDemo, authProvider: 'password' };
        } else {
          const derivedName = email.split('@')[0].replace(/[._]/g, ' ');
          const formatted = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
          userObj = {
            id: `user-${Date.now()}`,
            name: formatted,
            email: email.trim().toLowerCase(),
            role: 'buyer',
            authProvider: 'password',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          };
        }
        setSuccessToast(`Welcome back, ${userObj.name}!`);
      }

      loginAs(userObj);
      triggerSuccessConfetti();

      setTimeout(() => {
        router.push(redirectTarget);
      }, 950);
    }, 750);
  };

  const handleGoogleSuccess = (googleUser) => {
    setSuccessToast(`Signed in with Google as ${googleUser.name}!`);
    triggerSuccessConfetti();
    setTimeout(() => {
      router.push(redirectTarget);
    }, 950);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setIsForgotModalOpen(false);
      setForgotEmail('');
    }, 2200);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAF8F5] flex flex-col justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        
        {/* Main Grid: Architectural Showcase (Left) + Form Suite (Right) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#D4AF37]/30 shadow-xl sm:shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0 sm:min-h-[640px] lg:min-h-[700px]">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: CINEMATIC ARCHITECTURAL SHOWCASE (5 Columns on Desktop) */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 xl:p-12 text-white overflow-hidden bg-[#1E3A5F]">
            
            {/* Architectural Background Photography from example img */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
              style={{
                backgroundImage: `url('/images/images.jpg')`
              }}
            />
            {/* Rich Dual Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E31] via-[#1E3A5F]/80 to-[#1E3A5F]/60 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/25 via-transparent to-transparent pointer-events-none" />

            {/* Top Brand Tag */}
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-[#D4AF37]/60 flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold tracking-widest text-white block leading-none">
                    JK REALTY
                  </span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold block mt-0.5">
                    Private Client Portal
                  </span>
                </div>
              </div>
            </div>

            {/* Center Value Proposition & Quote */}
            <div className="relative z-10 my-auto py-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Accredited Investor Gateway</span>
              </div>

              <h2 className="text-2xl xl:text-3xl font-bold font-serif text-white leading-snug">
                Discreet Access to Landmark Architectural Estates
              </h2>

              <p className="text-xs xl:text-sm text-gray-200/90 leading-relaxed font-light">
                &ldquo;The institutional gateway trusted by sovereign wealth funds, family offices, and discerning principals acquiring trophy residences worldwide.&rdquo;
              </p>

              {/* Verified Trust Stats */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-base xl:text-lg font-black text-[#D4AF37] font-serif">$4.8B+</div>
                  <div className="text-[10px] text-gray-300 uppercase tracking-wider mt-0.5">Volume</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-base xl:text-lg font-black text-white font-serif">100%</div>
                  <div className="text-[10px] text-gray-300 uppercase tracking-wider mt-0.5">Off-Market</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-base xl:text-lg font-black text-emerald-400 font-serif">Verified</div>
                  <div className="text-[10px] text-gray-300 uppercase tracking-wider mt-0.5">Title Escrow</div>
                </div>
              </div>
            </div>

            {/* Bottom Member Credential Bar */}
            <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">256-Bit SSL Encrypted Session</span>
              </div>
              <span className="text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">
                Aura Protocol v4.2
              </span>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: THE AUTHENTICATION SUITE (7 Columns on Desktop) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 p-6 sm:p-10 xl:p-14 flex flex-col justify-between">
            
            {/* Top Bar: Return Link & Concierge Desk Info */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#1E3A5F] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Return to Portfolio</span>
              </Link>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <PhoneCall className="w-3 h-3 text-[#8A5A00]" />
                <span>Concierge Desk: <strong className="text-gray-700 font-medium">+1 (800) 555-REALTY</strong></span>
              </div>
            </div>

            {/* Form Content Wrapper */}
            <div className="py-4 sm:py-6 max-w-md w-full mx-auto space-y-4 sm:space-y-5">
              
              {/* Mobile Luxury Monogram Header (visible only on mobile/tablet) */}
              <div className="flex lg:hidden items-center justify-between pb-3 border-b border-gray-100">
                <Link href="/" className="inline-flex items-center gap-2.5 group">
                  <div className="w-9 h-9 rounded-xl bg-[#1E3A5F] border border-[#D4AF37] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-serif text-sm font-black tracking-wider text-[#1E3A5F] block leading-none">
                      JK REALTY
                    </span>
                    <span className="text-[8px] tracking-[0.2em] uppercase text-[#8A5A00] font-bold block mt-0.5">
                      Private Client Portal
                    </span>
                  </div>
                </Link>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL</span>
                </div>
              </div>

              {/* Heading */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A5A00]">
                    Secure Client Access
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A5F] font-serif">
                  {mode === 'login' ? 'Sign In to Your Vault' : 'Apply for Client Access'}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  {mode === 'login'
                    ? 'Enter your accredited credentials or authenticate with Google.'
                    : 'Create your private investor portfolio to access off-market estates.'}
                </p>
              </div>

              {/* Active User Alert (If Already Signed In) */}
              {currentUser && (
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#1E3A5F] truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">{currentUser.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <Link
                      href="/"
                      className="px-2.5 py-1 rounded-lg bg-[#1E3A5F] text-white text-xs font-bold hover:bg-[#152843]"
                    >
                      Enter Vault
                    </Link>
                    <button
                      type="button"
                      onClick={() => logout()}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              {/* Success Toast */}
              {successToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="font-semibold">{successToast}</div>
                </div>
              )}

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>{errorMessage}</div>
                </div>
              )}

              {/* Mode Toggle Pills (Sign In / Register) */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#FAF8F5] border border-gray-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`py-2 rounded-xl transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-[#1E3A5F] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#1E3A5F]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`py-2 rounded-xl transition-all cursor-pointer ${
                    mode === 'register'
                      ? 'bg-[#1E3A5F] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#1E3A5F]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* ========================================================================= */}
              {/* PRIMARY "CONTINUE WITH GOOGLE" BUTTON */}
              {/* ========================================================================= */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  id="btn-google-login"
                  onClick={() => setIsGoogleDialogOpen(true)}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#4285F4] hover:bg-blue-50/25 text-gray-800 hover:text-[#1E3A5F] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all group cursor-pointer"
                >
                  <GoogleIcon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                  <span>Continue with Google</span>
                  <span className="hidden sm:inline-block ml-auto text-[10px] font-bold text-[#4285F4] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">
                    Instant 1-Click
                  </span>
                </button>
              </div>

              {/* Luxury Hairline Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-gray-200" />
                <span className="absolute px-3 bg-white text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  or with email &amp; password
                </span>
              </div>

              {/* ========================================================================= */}
              {/* EMAIL & PASSWORD AUTHENTICATION FORM */}
              {/* ========================================================================= */}
              <form onSubmit={handleEmailPasswordSubmit} className="space-y-3.5">
                
                {/* Full Legal Name (Register Mode) */}
                {mode === 'register' && (
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Julian Montgomery"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      id="login-email"
                      placeholder="client@investmentgroup.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      Password *
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(email);
                          setIsForgotModalOpen(true);
                        }}
                        className="text-[11px] font-semibold text-[#8A5A00] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      id="login-password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-base sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#1E3A5F] focus:ring-[#D4AF37] border-gray-300"
                    />
                    <span>Remember me on this device</span>
                  </label>
                </div>

                {/* Primary CTA Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  id="btn-submit-auth"
                  className="w-full py-3 px-4 rounded-2xl bg-[#1E3A5F] hover:bg-[#152843] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#1E3A5F]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 mt-1"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Sign In to Client Portal' : 'Complete Registration'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* 1-Click Instant Demo Credentials */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8A5A00] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    Instant Demo Profiles
                  </span>
                  <span className="text-[10px] text-gray-400">1-click test login</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {demoUsers.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        loginAs(u);
                        triggerSuccessConfetti();
                        setSuccessToast(`Signed in as ${u.name}!`);
                        setTimeout(() => router.push(redirectTarget), 800);
                      }}
                      className="p-2 rounded-xl border border-gray-200 bg-[#FAF8F5] hover:bg-white hover:border-[#D4AF37] text-left transition-all flex items-center gap-2 group cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-6 h-6 rounded-full object-cover border border-[#D4AF37] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-gray-900 group-hover:text-[#1E3A5F] truncate">
                          {u.name.split(' ')[0]}
                        </div>
                        <div className="text-[9px] text-gray-500 capitalize truncate">{u.role}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Security Footer */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-2">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Institutional 256-Bit TLS Bank Encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/about" className="hover:text-[#1E3A5F] hover:underline">
                  Terms of Access
                </Link>
                <span>•</span>
                <Link href="/about" className="hover:text-[#1E3A5F] hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Google Authentication Dialog Modal */}
      <GoogleAuthDialog
        isOpen={isGoogleDialogOpen}
        onClose={() => setIsGoogleDialogOpen(false)}
        onSuccess={handleGoogleSuccess}
      />

      {/* Forgot Password Recovery Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#8A5A00] flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#1E3A5F] font-serif">
                  Reset Vault Access
                </h3>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Password reset token dispatched to <strong>{forgotEmail}</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-gray-600">
                  Enter your registered client email. We will transmit an encrypted one-time access token to your inbox.
                </p>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="client@investments.com"
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#152843] text-white text-xs font-bold shadow-sm cursor-pointer"
                  >
                    Send Reset Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#1E3A5F] border-t-[#D4AF37] rounded-full animate-spin" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
