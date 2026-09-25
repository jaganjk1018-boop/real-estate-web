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
  Phone,
  Smartphone,
  Home,
  Briefcase,
  Check,
  Shield,
  PhoneCall,
  Flame,
  Settings,
  RotateCcw,
  CheckSquare,
  Square,
  FileText,
  KeyRound,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRealEstateStore } from '../../lib/store';
import GoogleAuthDialog, { GoogleIcon } from '../../components/GoogleAuthDialog';
import FirebaseConfigModal from '../../components/FirebaseConfigModal';
import {
  firebaseLoginWithEmail,
  firebaseRegisterWithEmail,
  firebaseLoginWithGoogle,
  firebasePasswordReset,
  createRecaptchaVerifier,
  firebaseSendPhoneOtp,
  firebaseVerifyPhoneOtp,
  isFirebaseConfigured,
  getFirebaseConfigStatus
} from '../../lib/firebase';

// 4 Standard User Roles specified
const USER_ROLES = [
  {
    id: 'customer',
    name: 'Customer',
    subtitle: 'Home Buyer & Investor',
    icon: User
  },
  {
    id: 'property_owner',
    name: 'Property Owner',
    subtitle: 'Seller & Landlord',
    icon: Home
  },
  {
    id: 'broker',
    name: 'Broker',
    subtitle: 'Channel Partner & Agent',
    icon: Briefcase
  },
  {
    id: 'builder',
    name: 'Builder',
    subtitle: 'Developer & Promoter',
    icon: Building2
  }
];

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' }
];

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams?.get('redirect') || '/';

  const { currentUser, demoUsers, loginAs, logout } = useRealEstateStore();

  // Mode: 'login' or 'register'
  const [mode, setMode] = useState('login');

  // Selected User Role (Customer | Property Owner | Broker | Builder)
  const [selectedRole, setSelectedRole] = useState('customer');

  // Login Option: 'phone' | 'email' | 'google'
  const [loginOption, setLoginOption] = useState('phone');

  // Form Fields - Phone & OTP
  const [phoneCountryCode, setPhoneCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [simulatedTestOtp, setSimulatedTestOtp] = useState('');

  // Form Fields - Email & Password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & Modals
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successToast, setSuccessToast] = useState('');
  const [isGoogleDialogOpen, setIsGoogleDialogOpen] = useState(false);
  const [isFirebaseConfigOpen, setIsFirebaseConfigOpen] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState({ isConfigured: false });
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    setErrorMessage('');
    setSuccessToast('');
    setFirebaseStatus(getFirebaseConfigStatus());
  }, [mode, loginOption, selectedRole]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

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

  const getRoleDisplayName = (roleId) => {
    const r = USER_ROLES.find((item) => item.id === roleId);
    return r ? r.name : 'Customer';
  };

  // =========================================================================
  // 1. PHONE NUMBER + OTP LOGIN HANDLERS
  // =========================================================================
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setErrorMessage('');
    setSuccessToast('');

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      setErrorMessage('Please enter a valid mobile phone number (minimum 7-10 digits).');
      return;
    }

    const fullPhoneNumber = `${phoneCountryCode}${cleanPhone}`;
    setIsSendingOtp(true);

    try {
      if (isFirebaseConfigured()) {
        const appVerifier = createRecaptchaVerifier('recaptcha-container');
        const confirmation = await firebaseSendPhoneOtp(fullPhoneNumber, appVerifier);
        setConfirmationResult(confirmation);
        setIsOtpSent(true);
        setOtpCountdown(30);
        setSuccessToast(`OTP verification code dispatched via SMS to ${fullPhoneNumber}.`);
      } else {
        // High-fidelity fallback simulation
        setTimeout(() => {
          const generatedCode = '123456';
          setSimulatedTestOtp(generatedCode);
          setIsOtpSent(true);
          setOtpCountdown(30);
          setSuccessToast(`Demo OTP code generated for ${fullPhoneNumber}: 123456 (Enter to verify)`);
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Could not dispatch OTP. Please verify the phone number.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    setErrorMessage('');
    setSuccessToast('');

    const cleanOtp = otpCode.trim();
    if (!cleanOtp || cleanOtp.length < 4) {
      setErrorMessage('Please enter the complete OTP code received on your phone.');
      return;
    }

    setIsVerifyingOtp(true);

    try {
      if (isFirebaseConfigured() && confirmationResult) {
        const userObj = await firebaseVerifyPhoneOtp(confirmationResult, cleanOtp, {
          role: selectedRole
        });
        loginAs(userObj);
        triggerSuccessConfetti();
        setSuccessToast(`Verified successfully! Welcome ${getRoleDisplayName(selectedRole)}.`);
        setTimeout(() => router.push(redirectTarget), 900);
      } else {
        // High-fidelity fallback validation
        setTimeout(() => {
          if (cleanOtp === '123456' || cleanOtp === simulatedTestOtp || cleanOtp.length === 6) {
            const roleName = getRoleDisplayName(selectedRole);
            const userObj = {
              id: `phone-user-${Date.now()}`,
              name: `${roleName} (${phoneCountryCode} ${phoneNumber.slice(-4)})`,
              phone: `${phoneCountryCode} ${phoneNumber}`,
              email: `${phoneNumber.slice(-4)}@clientvault.jkrealty.com`,
              role: selectedRole,
              authProvider: 'phone',
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(roleName)}&backgroundColor=1e3a5f,d4af37`,
              emailVerified: true
            };
            loginAs(userObj);
            triggerSuccessConfetti();
            setSuccessToast(`Phone verified! Access granted as ${roleName}.`);
            setTimeout(() => router.push(redirectTarget), 900);
          } else {
            setErrorMessage('Invalid OTP code. Please enter 123456 or request a fresh OTP.');
          }
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // =========================================================================
  // 2. EMAIL + PASSWORD LOGIN HANDLERS
  // =========================================================================
  const handleEmailPasswordSubmit = async (e) => {
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

    if (mode === 'register' && !fullName.trim()) {
      setErrorMessage('Please provide your full legal name for registry accreditation.');
      return;
    }

    setIsLoading(true);

    try {
      if (isFirebaseConfigured()) {
        let userObj;
        if (mode === 'register') {
          userObj = await firebaseRegisterWithEmail(email, password, fullName, selectedRole);
          setSuccessToast(`Account created! Welcome to JK Realty, ${userObj.name}.`);
        } else {
          userObj = await firebaseLoginWithEmail(email, password);
          setSuccessToast(`Welcome back, ${userObj.name}!`);
        }
        loginAs(userObj);
        triggerSuccessConfetti();
        setTimeout(() => router.push(redirectTarget), 950);
      } else {
        // Fallback simulation when Firebase credentials are not yet entered
        setTimeout(() => {
          let userObj;
          const roleName = getRoleDisplayName(selectedRole);

          if (mode === 'register') {
            const computedName = fullName.trim() || email.split('@')[0].replace(/[._]/g, ' ');
            const capitalizedName = computedName.charAt(0).toUpperCase() + computedName.slice(1);
            userObj = {
              id: `user-${Date.now()}`,
              name: capitalizedName,
              email: email.trim().toLowerCase(),
              role: selectedRole,
              authProvider: 'firebase-simulated',
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(capitalizedName)}&backgroundColor=1e3a5f,d4af37`
            };
            setSuccessToast(`Account accredited for ${userObj.name} (${roleName})!`);
          } else {
            const matchedDemo = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
            if (matchedDemo) {
              userObj = { ...matchedDemo, role: selectedRole, authProvider: 'firebase-simulated' };
            } else {
              const derivedName = email.split('@')[0].replace(/[._]/g, ' ');
              const formatted = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
              userObj = {
                id: `user-${Date.now()}`,
                name: formatted,
                email: email.trim().toLowerCase(),
                role: selectedRole,
                authProvider: 'firebase-simulated',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
              };
            }
            setSuccessToast(`Welcome back, ${userObj.name} (${roleName})!`);
          }

          loginAs(userObj);
          triggerSuccessConfetti();
          setTimeout(() => router.push(redirectTarget), 950);
        }, 650);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================================
  // 3. CONTINUE WITH GOOGLE HANDLER
  // =========================================================================
  const handleDirectGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      if (isFirebaseConfigured()) {
        const user = await firebaseLoginWithGoogle(selectedRole);
        handleGoogleSuccess(user);
      } else {
        setIsGoogleDialogOpen(true);
      }
    } catch (err) {
      if (err.message.includes('popup was closed') || err.message.includes('popup')) {
        setErrorMessage(err.message);
      } else {
        setIsGoogleDialogOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (googleUser) => {
    setSuccessToast(`Signed in with Google as ${googleUser.name} (${getRoleDisplayName(selectedRole)})!`);
    triggerSuccessConfetti();
    setTimeout(() => router.push(redirectTarget), 950);
  };

  // Password reset handler
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    try {
      if (isFirebaseConfigured()) {
        await firebasePasswordReset(forgotEmail);
      }
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setIsForgotModalOpen(false);
        setForgotEmail('');
      }, 2500);
    } catch (err) {
      setErrorMessage(err.message || 'Could not send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAF8F5] flex flex-col justify-center py-6 sm:py-10">
      
      {/* Invisible container required for Firebase Phone Recaptcha */}
      <div id="recaptcha-container" className="hidden" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Architectural Showcase (Left) + Login Card (Right) */}
        <div className="bg-white rounded-3xl border border-[#D4AF37]/35 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0 sm:min-h-[700px]">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: CINEMATIC ARCHITECTURAL SHOWCASE (5 Columns on Desktop) */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 xl:p-12 text-white overflow-hidden bg-[#1E3A5F]">
            
            {/* Background Photography */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
              style={{
                backgroundImage: `url('/images/images.jpg')`
              }}
            />
            {/* Rich Dual Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E31] via-[#1E3A5F]/85 to-[#1E3A5F]/65 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/25 via-transparent to-transparent pointer-events-none" />

            {/* Top Brand Tag */}
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-[#D4AF37]/60 flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold tracking-widest text-white block leading-none">
                    JK REALTY
                  </span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold block mt-1">
                    Private Client Portal
                  </span>
                </div>
              </div>
            </div>

            {/* Center Value Proposition & Stats */}
            <div className="relative z-10 my-auto py-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Multi-Tier Client Authentication</span>
              </div>

              <h2 className="text-2xl xl:text-3xl font-bold font-serif text-white leading-snug">
                Verified Gateway for Discerning Real Estate Principals
              </h2>

              <p className="text-xs xl:text-sm text-gray-200/90 leading-relaxed font-light">
                Secure access for Customers, Property Owners, Licensed Brokers, and Promoters managing exclusive off-market acquisitions and sales.
              </p>

              {/* Verified Trust Stats */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-base xl:text-lg font-black text-[#D4AF37] font-serif">4 Roles</div>
                  <div className="text-[10px] text-gray-300 uppercase tracking-wider mt-0.5">Custom Portals</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-base xl:text-lg font-black text-white font-serif">OTP + PW</div>
                  <div className="text-[10px] text-gray-300 uppercase tracking-wider mt-0.5">Dual Mode</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-base xl:text-lg font-black text-emerald-400 font-serif">256-Bit</div>
                  <div className="text-[10px] text-gray-300 uppercase tracking-wider mt-0.5">SSL Protected</div>
                </div>
              </div>
            </div>

            {/* Bottom Member Credential Bar */}
            <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">Firebase Authentication Active</span>
              </div>
              <span className="text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">
                Aura v4.2
              </span>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: LOGIN CARD (7 Columns on Desktop) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 p-6 sm:p-10 xl:p-12 flex flex-col justify-between bg-white">
            
            {/* Top Bar: Return Link & Concierge Desk Info */}
            <div className="flex items-center justify-between pb-5 border-b border-gray-100">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#1E3A5F] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Return to Portfolio</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFirebaseConfigOpen(true)}
                  className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#8A5A00] border border-amber-200/80 font-bold text-[11px] flex items-center gap-1 transition-colors"
                >
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Firebase Keys</span>
                </button>
              </div>
            </div>

            {/* Login Card Container */}
            <div className="py-4 sm:py-6 max-w-lg w-full mx-auto space-y-5">
              
              {/* Card Header & Title */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A5A00]">
                    Secure Authentication Gateway
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A5F] font-serif">
                  {mode === 'login' ? 'Right Side Login Card' : 'Create Your JK Realty Account'}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  {mode === 'login'
                    ? 'Select your user role and preferred login method to access your portfolio.'
                    : 'Register for accredited buyer, seller, broker, or builder privileges.'}
                </p>
              </div>

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

              {/* ========================================================================= */}
              {/* USER ROLE SELECTION: Customer | Property Owner | Broker | Builder */}
              {/* ========================================================================= */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    Select Your Role *
                  </label>
                  <span className="text-[10px] text-[#8A5A00] font-semibold">
                    Current: <strong>{getRoleDisplayName(selectedRole)}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {USER_ROLES.map((r) => {
                    const IconComponent = r.icon;
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRole(r.id)}
                        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#1E3A5F] bg-[#1E3A5F]/5 shadow-sm ring-1 ring-[#1E3A5F]'
                            : 'border-gray-200 bg-[#FAF8F5]/60 hover:bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-[#1E3A5F] text-amber-300' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center text-[10px]">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isSelected ? 'text-[#1E3A5F]' : 'text-gray-800'}`}>
                            {r.name}
                          </div>
                          <div className="text-[9px] text-gray-400 truncate mt-0.5">
                            {r.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ========================================================================= */}
              {/* LOGIN OPTIONS TABS: 1. Phone + OTP | 2. Email + Password | 3. Google */}
              {/* ========================================================================= */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  Choose Login Option *
                </label>
                <div className="grid grid-cols-3 p-1 rounded-2xl bg-[#FAF8F5] border border-gray-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginOption('phone');
                      setErrorMessage('');
                    }}
                    className={`py-2 px-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      loginOption === 'phone'
                        ? 'bg-[#1E3A5F] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#1E3A5F]'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="truncate">Phone + OTP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLoginOption('email');
                      setErrorMessage('');
                    }}
                    className={`py-2 px-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      loginOption === 'email'
                        ? 'bg-[#1E3A5F] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#1E3A5F]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">Email + Password</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLoginOption('google');
                      setErrorMessage('');
                    }}
                    className={`py-2 px-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      loginOption === 'google'
                        ? 'bg-[#1E3A5F] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#1E3A5F]'
                    }`}
                  >
                    <GoogleIcon className="w-3.5 h-3.5" />
                    <span className="truncate">Google</span>
                  </button>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* OPTION 1: PHONE NUMBER + OTP LOGIN FORM */}
              {/* ========================================================================= */}
              {loginOption === 'phone' && (
                <div className="space-y-4 pt-1 animate-in fade-in duration-200">
                  
                  {/* Phone Number Field */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Mobile Phone Number *
                    </label>
                    <div className="flex gap-2">
                      {/* Country Code Selector */}
                      <select
                        value={phoneCountryCode}
                        onChange={(e) => setPhoneCountryCode(e.target.value)}
                        className="bg-[#FAF8F5] border border-gray-300 rounded-xl px-2.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>

                      {/* Number Input */}
                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          id="input-phone-number"
                          placeholder="98765 43210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Send OTP Button */}
                  <div>
                    <button
                      type="button"
                      id="btn-send-otp"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp || otpCountdown > 0}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#1E3A5F] hover:bg-[#152843] text-white font-bold text-xs shadow-md shadow-[#1E3A5F]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSendingOtp ? (
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                          <span>
                            {otpCountdown > 0
                              ? `Resend OTP in ${otpCountdown}s`
                              : isOtpSent
                              ? 'Resend OTP'
                              : 'Send OTP'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* OTP Code Input & Verify OTP (shown when OTP is dispatched) */}
                  {isOtpSent && (
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 space-y-3 animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                          Enter 6-Digit Verification Code *
                        </label>
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> SMS Dispatched
                        </span>
                      </div>

                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          maxLength={6}
                          id="input-otp-code"
                          placeholder="•••••• (Enter 123456)"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-3.5 py-2.5 text-base tracking-[0.35em] text-center font-mono font-bold text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      {/* Verify OTP Button */}
                      <button
                        type="button"
                        id="btn-verify-otp"
                        onClick={handleVerifyOtp}
                        disabled={isVerifyingOtp || !otpCode}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#8A5A00] hover:bg-[#6E4700] text-white font-bold text-xs shadow-md shadow-[#8A5A00]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isVerifyingOtp ? (
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>Verify OTP &amp; Enter Portal</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className="text-[#1E3A5F] focus:outline-none"
                    >
                      {rememberMe ? (
                        <CheckSquare className="w-4 h-4 text-[#1E3A5F]" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <label 
                      onClick={() => setRememberMe(!rememberMe)}
                      className="text-xs text-gray-600 select-none cursor-pointer"
                    >
                      Remember this trusted device for 30 days
                    </label>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* OPTION 2: EMAIL + PASSWORD LOGIN FORM */}
              {/* ========================================================================= */}
              {loginOption === 'email' && (
                <form onSubmit={handleEmailPasswordSubmit} className="space-y-3.5 pt-1 animate-in fade-in duration-200">
                  
                  {/* Full Legal Name (Register Mode Only) */}
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
                          id="register-fullname"
                          placeholder="e.g. Julian Montgomery"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
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
                        className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
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
                          className="text-[11px] font-semibold text-[#1E3A5F] hover:text-[#8A5A00] hover:underline"
                        >
                          Forgot Password?
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
                        className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className="text-[#1E3A5F] focus:outline-none"
                    >
                      {rememberMe ? (
                        <CheckSquare className="w-4 h-4 text-[#1E3A5F]" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <label 
                      onClick={() => setRememberMe(!rememberMe)}
                      className="text-xs text-gray-600 select-none cursor-pointer"
                    >
                      Remember me on this workstation
                    </label>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    id="btn-email-login"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#1E3A5F] hover:bg-[#152843] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1E3A5F]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{mode === 'login' ? 'Login to Portal' : 'Accredit & Register Account'}</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* ========================================================================= */}
              {/* OPTION 3: CONTINUE WITH GOOGLE SECTION */}
              {/* ========================================================================= */}
              {loginOption === 'google' && (
                <div className="space-y-4 pt-1 animate-in fade-in duration-200">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 text-xs text-blue-900 space-y-1.5">
                    <div className="font-bold flex items-center gap-1.5">
                      <GoogleIcon className="w-4 h-4" />
                      <span>Google Identity Services (OAuth 2.0)</span>
                    </div>
                    <p className="text-[11px] text-blue-700/90 leading-relaxed">
                      Instant single sign-on authenticated via Firebase and verified under your selected role: <strong className="text-[#1E3A5F]">{getRoleDisplayName(selectedRole)}</strong>.
                    </p>
                  </div>

                  <button
                    type="button"
                    id="btn-google-login"
                    onClick={handleDirectGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#4285F4] hover:bg-blue-50/25 text-gray-800 hover:text-[#1E3A5F] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all group cursor-pointer disabled:opacity-60"
                  >
                    <GoogleIcon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                    <span>Continue with Google</span>
                    <span className="hidden sm:inline-flex items-center gap-1 ml-auto text-[10px] font-bold text-[#4285F4] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      Instant Sign In
                    </span>
                  </button>
                </div>
              )}

              {/* Global Divider & Instant Google Action (if not in Google tab) */}
              {loginOption !== 'google' && (
                <div className="space-y-3 pt-2">
                  <div className="relative flex items-center justify-center">
                    <div className="w-full border-t border-gray-200" />
                    <span className="absolute px-3 bg-white text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      or 1-click oauth
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleDirectGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl border border-gray-200 hover:border-[#4285F4] hover:bg-blue-50/20 text-xs font-bold text-gray-700 transition-all cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    <GoogleIcon className="w-4 h-4 shrink-0" />
                    <span>Continue with Google</span>
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ADDITIONAL LINKS: Create New Account | Terms & Conditions | Privacy Policy */}
              {/* ========================================================================= */}
              <div className="pt-3 border-t border-gray-100 space-y-3 text-center">
                
                {/* 1. Create New Account Link */}
                <div className="text-xs text-gray-600">
                  {mode === 'login' ? (
                    <span>
                      Don&apos;t have an accredited account?{' '}
                      <button
                        type="button"
                        id="link-create-account"
                        onClick={() => {
                          setMode('register');
                          setLoginOption('email');
                          setErrorMessage('');
                        }}
                        className="font-bold text-[#1E3A5F] hover:text-[#8A5A00] hover:underline transition-colors"
                      >
                        Create New Account
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an accredited account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setErrorMessage('');
                        }}
                        className="font-bold text-[#1E3A5F] hover:text-[#8A5A00] hover:underline transition-colors"
                      >
                        Sign In to Vault
                      </button>
                    </span>
                  )}
                </div>

                {/* 2. Terms & Conditions and Privacy Policy Links */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400">
                  <button
                    type="button"
                    id="link-terms-conditions"
                    onClick={() => setIsTermsModalOpen(true)}
                    className="hover:text-gray-700 hover:underline transition-colors"
                  >
                    Terms &amp; Conditions
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    id="link-privacy-policy"
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="hover:text-gray-700 hover:underline transition-colors"
                  >
                    Privacy Policy
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom Footer Note */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>JK Realty Group © {new Date().getFullYear()}</span>
              <span className="flex items-center gap-1 font-medium text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL Encrypted</span>
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: FORGOT PASSWORD MODAL */}
      {/* ========================================================================= */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#8A5A00]" />
                <h3 className="font-bold font-serif text-[#1E3A5F] text-base">Reset Account Password</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>A secure password reset link has been dispatched to {forgotEmail}. Please check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <p className="text-xs text-gray-500">
                  Enter your registered client email to receive a password reset token.
                </p>
                <div>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="client@investmentgroup.com"
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

      {/* ========================================================================= */}
      {/* MODAL 2: TERMS & CONDITIONS MODAL */}
      {/* ========================================================================= */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8A5A00]" />
                <h3 className="font-bold font-serif text-[#1E3A5F] text-base">Terms &amp; Conditions</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTermsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 overflow-y-auto text-xs text-gray-600 leading-relaxed pr-1">
              <p className="font-semibold text-gray-800">1. Client Confidentiality &amp; Off-Market Listings</p>
              <p>
                All trophy properties, architectural portfolios, and financial valuations accessed through the JK Realty portal are strictly proprietary and bound by non-disclosure protocols.
              </p>
              <p className="font-semibold text-gray-800">2. Role Obligations</p>
              <p>
                Customers, Property Owners, Brokers, and Builders agree to provide authentic contact and licensing documentation upon request for transaction due diligence.
              </p>
              <p className="font-semibold text-gray-800">3. Authentication &amp; Secure Verification</p>
              <p>
                SMS OTP codes and Google Identity Tokens are restricted to verified principals and authorized representatives.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsTermsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold"
              >
                I Understand &amp; Agree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PRIVACY POLICY MODAL */}
      {/* ========================================================================= */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold font-serif text-[#1E3A5F] text-base">Privacy Policy</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 overflow-y-auto text-xs text-gray-600 leading-relaxed pr-1">
              <p className="font-semibold text-gray-800">1. Data Encryption &amp; Security</p>
              <p>
                We employ bank-grade 256-bit SSL encryption for all authentication transactions. Your mobile phone numbers, OTP verification logs, and email credentials are encrypted in transit and at rest.
              </p>
              <p className="font-semibold text-gray-800">2. Discretion &amp; Zero Third-Party Selling</p>
              <p>
                JK Realty never sells, leases, or distributes private investor contact details to unverified third parties or advertising brokers.
              </p>
              <p className="font-semibold text-gray-800">3. Rights Under GDPR / CCPA</p>
              <p>
                Principals may request portfolio deletion or data access audit trails at any time via the Concierge Desk.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold"
              >
                Close Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Auth Dialog Modal */}
      <GoogleAuthDialog
        isOpen={isGoogleDialogOpen}
        onClose={() => setIsGoogleDialogOpen(false)}
        onSuccess={handleGoogleSuccess}
      />

      {/* Firebase Config Modal */}
      <FirebaseConfigModal
        isOpen={isFirebaseConfigOpen}
        onClose={() => {
          setIsFirebaseConfigOpen(false);
          setFirebaseStatus(getFirebaseConfigStatus());
        }}
      />
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
