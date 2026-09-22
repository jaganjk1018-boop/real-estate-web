'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { X, User, Lock, Mail, Sparkles } from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import GoogleAuthDialog, { GoogleIcon } from './GoogleAuthDialog';

export default function AuthModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const { currentUser, demoUsers, loginAs } = useRealEstateStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleOpen, setIsGoogleOpen] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAs({
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0] || 'Registered Client',
      email: email || 'client@example.com',
      role: 'buyer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md max-h-[85vh] bg-white border-2 border-[#D4AF37]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/20 shadow-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E3A5F] font-serif">
                {isRegister ? 'Client Registration' : 'Client Access Portal'}
              </h3>
              <p className="text-[11px] text-[#4B5563]">
                Secure access for buyers, verified agents & administrators
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-gray-100 text-[#4B5563] hover:text-[#1E3A5F] transition-all border border-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 min-h-0 overscroll-contain">
          
          {/* 1-Click Demo Profiles */}
          <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/30 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#996515] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              1-Click Demo Switcher
            </span>
            <div className="grid grid-cols-1 gap-1.5">
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
                        ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold shadow-sm'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-[#1F2937]'
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
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => setIsGoogleOpen(true)}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-blue-50/20 hover:border-[#4285F4] text-xs font-bold text-gray-800 transition-all cursor-pointer shadow-xs"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-gray-200" />
            <span className="absolute px-2 bg-white text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
              or
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isRegister && (
              <div>
                <label className="text-[11px] font-semibold text-[#1F2937] uppercase tracking-wider block mb-1">
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
            )}

            <div>
              <label className="text-[11px] font-semibold text-[#1F2937] uppercase tracking-wider block mb-1">
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
              <label className="text-[11px] font-semibold text-[#1F2937] uppercase tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs shadow-md shadow-[#1E3A5F]/20 transition-all mt-2"
            >
              {isRegister ? 'Complete Registration' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center pt-1 text-xs text-[#4B5563]">
            {isRegister ? (
              <span>
                Already an accredited member?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-[#1E3A5F] hover:text-[#D4AF37] hover:underline font-bold transition-colors"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Need access to exclusive off-market listings?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-[#1E3A5F] hover:text-[#D4AF37] hover:underline font-bold transition-colors"
                >
                  Register Account
                </button>
              </span>
            )}
          </div>

          {/* Dedicated Login Page Link */}
          <div className="text-center pt-2 border-t border-gray-100">
            <Link
              href="/login"
              onClick={onClose}
              className="text-[11px] text-[#1E3A5F] hover:text-[#8A5A00] font-bold inline-flex items-center gap-1 hover:underline"
            >
              <span>Go to Dedicated Login Page</span>
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
    </div>,
    document.body
  );
}
