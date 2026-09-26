'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RouteProgressBar from '../components/RouteProgressBar';
import { RealEstateProvider, useRealEstateStore } from '../lib/store';
import ClientOnly from '../components/ClientOnly';
import { Layers } from 'lucide-react';

// Code-split heavy interactive modals & widgets for lightning performance and zero initial bloat
const LiveChatWidget = dynamic(() => import('../components/LiveChatWidget'), { ssr: false });
const VirtualTourModal = dynamic(() => import('../components/VirtualTourModal'), { ssr: false });
const AIRecommendationModal = dynamic(() => import('../components/AIRecommendationModal'), { ssr: false });
const CompareModal = dynamic(() => import('../components/CompareModal'), { ssr: false });
const ScheduleVisitModal = dynamic(() => import('../components/ScheduleVisitModal'), { ssr: false });
const AuthModal = dynamic(() => import('../components/AuthModal'), { ssr: false });
const ClientVaultModal = dynamic(() => import('../components/ClientVaultModal'), { ssr: false });

function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  const [isAIWizardOpen, setIsAIWizardOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isVIPBookingOpen, setIsVIPBookingOpen] = useState(false);
  const [activeTourProperty, setActiveTourProperty] = useState(null);
  const [activeVisitProperty, setActiveVisitProperty] = useState(null);

  const { compareList, properties } = useRealEstateStore();

  return (
    <>
      {/* Luxury Route Change Progress Bar */}
      <React.Suspense fallback={null}>
        <RouteProgressBar />
      </React.Suspense>

      {/* Global Navigation Header */}
      <ClientOnly
        fallback={
          <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs h-20 flex items-center">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] flex items-center justify-center text-[#D4AF37] font-bold shadow-md">
                  <span className="font-serif font-black text-lg">JK</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-widest text-[#1E3A5F] font-serif uppercase">
                    JK <span className="text-[#8A5A00]">REALTY</span>
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#1F2937]">
                <span>Properties</span>
                <span>Sell</span>
                <span>Area Intelligence</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-24 bg-gray-100 rounded-xl animate-pulse" />
              </div>
            </div>
          </header>
        }
      >
        <Navbar
          onOpenAIWizard={() => setIsAIWizardOpen(true)}
          onOpenCompare={() => setIsCompareOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenVault={() => setIsVaultOpen(true)}
          onOpenVIPBooking={() => setIsVIPBookingOpen(true)}
        />
      </ClientOnly>

      {/* Main Viewport Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Global Footer (hidden on dedicated auth pages) */}
      {!isLoginPage && <Footer />}

      {/* Client-only widgets and modals (isolated from extension DOM mutation) */}
      <ClientOnly>
        {/* Global Floating Live Chat Support Widget */}
        {!isLoginPage && <LiveChatWidget />}

        {/* Global Interactive Modals - Mounted on-demand for smooth memory management */}
        {isAIWizardOpen && (
          <AIRecommendationModal
            isOpen={isAIWizardOpen}
            onClose={() => setIsAIWizardOpen(false)}
          />
        )}

        {isCompareOpen && (
          <CompareModal
            isOpen={isCompareOpen}
            onClose={() => setIsCompareOpen(false)}
          />
        )}

        {isVaultOpen && (
          <ClientVaultModal
            isOpen={isVaultOpen}
            onClose={() => setIsVaultOpen(false)}
            onOpenTour={(prop) => setActiveTourProperty(prop)}
          />
        )}

        {isAuthOpen && (
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
          />
        )}

        {activeTourProperty && (
          <VirtualTourModal
            property={activeTourProperty}
            isOpen={!!activeTourProperty}
            onClose={() => setActiveTourProperty(null)}
            onScheduleVisit={(prop) => {
              setActiveTourProperty(null);
              setActiveVisitProperty(prop);
            }}
          />
        )}

        {(isVIPBookingOpen || activeVisitProperty) && (
          <ScheduleVisitModal
            property={activeVisitProperty || properties?.[0]}
            isOpen={isVIPBookingOpen || !!activeVisitProperty}
            onClose={() => {
              setIsVIPBookingOpen(false);
              setActiveVisitProperty(null);
            }}
          />
        )}

        {/* Floating Compare Notification Pill */}
        {compareList && compareList.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#1E3A5F] text-white border-2 border-[#D4AF37] shadow-2xl animate-in slide-in-from-bottom-4">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <Layers className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold font-serif">
              {compareList.length} {compareList.length === 1 ? 'Estate' : 'Estates'} Selected
            </span>
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-[#1E3A5F] font-black text-xs hover:brightness-110 transition-all shadow-sm"
            >
              Compare Now
            </button>
          </div>
        )}
      </ClientOnly>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>JK REALTY | Luxury Architectural Real Estate, Masterplans & Penthouses</title>
        <meta 
          name="description" 
          content="Discover trophy estates, duplex penthouses, waterfront sanctuaries, and prime investments with JK Realty." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body 
        suppressHydrationWarning 
        className="bg-[#FAF8F5] text-[#1F2937] min-h-screen flex flex-col antialiased selection:bg-[#D4AF37] selection:text-[#1E3A5F]"
      >
        <RealEstateProvider>
          <RootLayoutContent>
            {children}
          </RootLayoutContent>
        </RealEstateProvider>
      </body>
    </html>
  );
}

