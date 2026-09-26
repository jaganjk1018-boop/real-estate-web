import React, { useState, useEffect, useCallback, useMemo, createContext, useContext } from 'react';
import { PROPERTIES_DATA } from '../data/properties';
import { INITIAL_BROKER_RATES } from '../data/areaMarketData';
import { DEFAULT_SETTINGS, INITIAL_SETTINGS_LOGS } from '../data/defaultSettings';
import { subscribeToFirebaseAuthState, firebaseLogout, isFirebaseConfigured } from './firebase';

const DEMO_USERS = [
  {
    id: 'user-1',
    name: 'Julian Montgomery',
    email: 'julian@montgomerycapital.com',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-2',
    name: 'Victoria Sterling',
    email: 'victoria@sterlingestates.com',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

// Asynchronous non-blocking storage writer to prevent UI thread lockup / hitching
const asyncStorageSave = (key, value) => {
  if (typeof window === 'undefined') return;
  const runner = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
  runner(() => {
    try {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch (e) {
      console.warn(`Storage write deferred notification for ${key}:`, e);
    }
  });
};

const RealEstateContext = createContext(null);

function useRealEstateStoreInternal() {
  const [properties, setProperties] = useState(PROPERTIES_DATA);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currency, setCurrencyState] = useState('USD');
  const [unit, setUnitState] = useState('sqft'); // 'sqft' | 'sqm'
  const [vaultNotes, setVaultNotes] = useState({}); // { [propertyId]: [{ id, text, createdAt }] }
  const [vaultCollections, setVaultCollections] = useState([
    { id: 'col-1', name: 'Trophy Penthouses', propertyIds: ['prop-2', 'prop-4'], createdAt: '2025-01-10' },
    { id: 'col-2', name: 'Waterfront Sanctuaries', propertyIds: ['prop-3'], createdAt: '2025-01-15' }
  ]);
  const [brokerRates, setBrokerRates] = useState(INITIAL_BROKER_RATES);
  const [platformSettings, setPlatformSettings] = useState(DEFAULT_SETTINGS);
  const [settingsLogs, setSettingsLogs] = useState(INITIAL_SETTINGS_LOGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('aura_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedCompare = localStorage.getItem('aura_compare');
      if (savedCompare) setCompareList(JSON.parse(savedCompare));

      const savedCurrency = localStorage.getItem('aura_currency');
      if (savedCurrency) setCurrencyState(savedCurrency);

      const savedUnit = localStorage.getItem('aura_unit');
      if (savedUnit) setUnitState(savedUnit);

      const savedNotes = localStorage.getItem('aura_vault_notes');
      if (savedNotes) setVaultNotes(JSON.parse(savedNotes));

      const savedCollections = localStorage.getItem('aura_vault_collections');
      if (savedCollections) setVaultCollections(JSON.parse(savedCollections));

      const savedBrokerRates = localStorage.getItem('aura_broker_rates');
      if (savedBrokerRates) {
        setBrokerRates(JSON.parse(savedBrokerRates));
      }

      const savedSettings = localStorage.getItem('aura_platform_settings');
      if (savedSettings) {
        setPlatformSettings(JSON.parse(savedSettings));
      }

      const savedLogs = localStorage.getItem('aura_settings_logs');
      if (savedLogs) {
        setSettingsLogs(JSON.parse(savedLogs));
      }

      const savedInquiries = localStorage.getItem('aura_inquiries');
      if (savedInquiries) {
        setInquiries(JSON.parse(savedInquiries));
      } else {
        const seedInquiries = [
          {
            id: 'inq-101',
            propertyId: 'prop-1',
            propertyTitle: 'The Bel-Air Obsidian Villa',
            fullName: 'David Sterling',
            email: 'david@sterlingholdings.com',
            phone: '+1 310 555 0192',
            inquiryType: 'Schedule Site Visit',
            preferredDate: '2025-03-22',
            preferredTime: '14:00',
            visitFormat: 'In-Person Tour',
            arrivalMode: 'Rolls-Royce Chauffeur',
            catering: 'Champagne & Caviar',
            ndaAgreed: true,
            vipPassId: 'VIP-7701-LA',
            pipelineStage: 'VIP Tour Confirmed',
            message: 'Looking to view the great room, private spa, and check boundary privacy.',
            status: 'Contacted',
            createdAt: '2025-02-18 10:30 AM'
          },
          {
            id: 'inq-102',
            propertyId: 'prop-2',
            propertyTitle: 'The Sky Crest Penthouse',
            fullName: 'Claire Beaumont',
            email: 'c.beaumont@luxuryliving.fr',
            phone: '+33 6 12 34 56 78',
            inquiryType: 'Schedule Site Visit',
            preferredDate: '2025-03-25',
            preferredTime: '16:00',
            visitFormat: 'In-Person Tour',
            arrivalMode: 'Private Helicopter Flyover',
            catering: 'Sommelier Wine Tasting',
            ndaAgreed: true,
            vipPassId: 'VIP-8924-NYC',
            pipelineStage: 'Offer Under Negotiation',
            message: 'Private elevator protocol review and 432 Park view corridor confirmation.',
            status: 'Contacted',
            createdAt: '2025-02-17 04:15 PM'
          },
          {
            id: 'inq-103',
            propertyId: 'prop-3',
            propertyTitle: 'The Venetian Waterfront Sanctuary',
            fullName: 'Marcus Aurelius Vance',
            email: 'marcus@vancecapital.ch',
            phone: '+41 22 819 9000',
            inquiryType: 'Inquiry',
            arrivalMode: 'Private Yacht Marina Arrival',
            catering: 'Artisan Espresso Bar',
            ndaAgreed: true,
            vipPassId: 'VIP-9302-MIA',
            pipelineStage: 'New Lead',
            message: 'Docking depth validation for 130ft tri-deck yacht with private tender slip.',
            status: 'New',
            createdAt: '2025-02-19 09:45 AM'
          }
        ];
        setInquiries(seedInquiries);
        asyncStorageSave('aura_inquiries', seedInquiries);
      }

      const savedProps = localStorage.getItem('aura_custom_properties');
      if (savedProps) {
        try {
          const parsed = JSON.parse(savedProps);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const baseIds = new Set(PROPERTIES_DATA.map((p) => p.id));
            const customAdditions = parsed.filter((p) => !baseIds.has(p.id));
            const parsedMap = new Map(parsed.map((p) => [p.id, p]));
            const mergedBase = PROPERTIES_DATA.map((p) => parsedMap.get(p.id) || p);
            setProperties([...customAdditions, ...mergedBase]);
          }
        } catch (e) {
          console.error('Error hydrating custom properties', e);
        }
      }

      const savedUser = localStorage.getItem('aura_user');
      if (savedUser !== null) {
        try {
          setCurrentUser(JSON.parse(savedUser));
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(DEMO_USERS[0]);
      }
    } catch (e) {
      console.error('Failed to load real estate state', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Listen to live Firebase Auth state changes
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = subscribeToFirebaseAuthState((fbUser) => {
        if (fbUser) {
          setCurrentUser(fbUser);
          asyncStorageSave('aura_user', fbUser);
        }
      });
    } catch (err) {
      console.warn('Firebase auth listener notification:', err);
    }
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Live Cross-Tab Multi-User Concurrency Synchronization
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorageSync = (e) => {
      if (!e.key || !e.newValue) return;
      try {
        if (e.key === 'aura_favorites') setFavorites(JSON.parse(e.newValue));
        if (e.key === 'aura_compare') setCompareList(JSON.parse(e.newValue));
        if (e.key === 'aura_currency') setCurrencyState(e.newValue);
        if (e.key === 'aura_unit') setUnitState(e.newValue);
        if (e.key === 'aura_inquiries') setInquiries(JSON.parse(e.newValue));
        if (e.key === 'aura_user') setCurrentUser(JSON.parse(e.newValue));
        if (e.key === 'aura_custom_properties') {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setProperties(parsed);
        }
        if (e.key === 'aura_broker_rates') {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setBrokerRates(parsed);
        }
        if (e.key === 'aura_platform_settings') {
          const parsed = JSON.parse(e.newValue);
          if (parsed) setPlatformSettings(parsed);
        }
      } catch (err) {}
    };
    window.addEventListener('storage', handleStorageSync);
    return () => window.removeEventListener('storage', handleStorageSync);
  }, []);

  const setCurrency = useCallback((newCurr) => {
    setCurrencyState(newCurr);
    asyncStorageSave('aura_currency', newCurr);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('aura_currency_changed', { detail: newCurr }));
    }
  }, []);

  const setUnit = useCallback((newUnit) => {
    setUnitState(newUnit);
    asyncStorageSave('aura_unit', newUnit);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('aura_unit_changed', { detail: newUnit }));
    }
  }, []);

  useEffect(() => {
    const handleCurrencySync = (e) => {
      if (e.detail && e.detail !== currency) {
        setCurrencyState(e.detail);
      }
    };
    const handleUnitSync = (e) => {
      if (e.detail && e.detail !== unit) {
        setUnitState(e.detail);
      }
    };
    window.addEventListener('aura_currency_changed', handleCurrencySync);
    window.addEventListener('aura_unit_changed', handleUnitSync);
    return () => {
      window.removeEventListener('aura_currency_changed', handleCurrencySync);
      window.removeEventListener('aura_unit_changed', handleUnitSync);
    };
  }, [currency, unit]);

  const toggleFavorite = useCallback((propertyId) => {
    setFavorites((prev) => {
      const updated = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      asyncStorageSave('aura_favorites', updated);
      return updated;
    });
  }, []);

  const isFavorite = useCallback((propertyId) => favorites.includes(propertyId), [favorites]);

  const toggleCompare = useCallback((propertyId) => {
    setCompareList((prev) => {
      let updated;
      if (prev.includes(propertyId)) {
        updated = prev.filter((id) => id !== propertyId);
      } else {
        if (prev.length >= 4) {
          alert('You can compare a maximum of 4 properties at a time.');
          return prev;
        }
        updated = [...prev, propertyId];
      }
      asyncStorageSave('aura_compare', updated);
      return updated;
    });
  }, []);

  const isComparing = useCallback((propertyId) => compareList.includes(propertyId), [compareList]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    if (typeof window !== 'undefined') {
      try { localStorage.removeItem('aura_compare'); } catch (e) {}
    }
  }, []);

  // Vault Notes & Collections
  const addVaultNote = useCallback((propertyId, text) => {
    if (!text || !text.trim()) return;
    setVaultNotes((prev) => {
      const currentList = prev[propertyId] || [];
      const newNote = {
        id: `note-${Date.now()}`,
        text: text.trim(),
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };
      const updated = {
        ...prev,
        [propertyId]: [newNote, ...currentList]
      };
      asyncStorageSave('aura_vault_notes', updated);
      return updated;
    });
  }, []);

  const deleteVaultNote = useCallback((propertyId, noteId) => {
    setVaultNotes((prev) => {
      const currentList = prev[propertyId] || [];
      const updated = {
        ...prev,
        [propertyId]: currentList.filter((n) => n.id !== noteId)
      };
      asyncStorageSave('aura_vault_notes', updated);
      return updated;
    });
  }, []);

  const createVaultCollection = useCallback((name, initialPropId = null) => {
    if (!name || !name.trim()) return;
    setVaultCollections((prev) => {
      const newCol = {
        id: `col-${Date.now()}`,
        name: name.trim(),
        propertyIds: initialPropId ? [initialPropId] : [],
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      const updated = [...prev, newCol];
      asyncStorageSave('aura_vault_collections', updated);
      return updated;
    });
  }, []);

  const togglePropertyInCollection = useCallback((collectionId, propertyId) => {
    setVaultCollections((prev) => {
      const updated = prev.map((col) => {
        if (col.id === collectionId) {
          const exists = col.propertyIds.includes(propertyId);
          return {
            ...col,
            propertyIds: exists
              ? col.propertyIds.filter((id) => id !== propertyId)
              : [...col.propertyIds, propertyId]
          };
        }
        return col;
      });
      asyncStorageSave('aura_vault_collections', updated);
      return updated;
    });
  }, []);

  const addInquiry = useCallback((newInquiry) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const created = {
      ...newInquiry,
      id: `inq-${Date.now()}-${randomCode}`,
      status: 'New',
      pipelineStage: newInquiry.pipelineStage || 'New Lead',
      vipPassId: newInquiry.vipPassId || `VIP-${randomCode}-${(newInquiry.propertyTitle || 'AURA').slice(0, 3).toUpperCase()}`,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setInquiries((prev) => {
      const updated = [created, ...prev];
      asyncStorageSave('aura_inquiries', updated);
      return updated;
    });
    return created;
  }, []);

  const updateInquiryStatus = useCallback((inquiryId, status) => {
    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq));
      asyncStorageSave('aura_inquiries', updated);
      return updated;
    });
  }, []);

  const updateInquiryStage = useCallback((inquiryId, pipelineStage) => {
    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === inquiryId ? { ...inq, pipelineStage } : inq));
      asyncStorageSave('aura_inquiries', updated);
      return updated;
    });
  }, []);

  const addProperty = useCallback((newProperty) => {
    setProperties((prev) => {
      const updated = [newProperty, ...prev];
      asyncStorageSave('aura_custom_properties', updated);
      return updated;
    });
  }, []);

  const updateProperty = useCallback((updatedProp) => {
    setProperties((prev) => {
      const updated = prev.map((p) => (p.id === updatedProp.id ? updatedProp : p));
      asyncStorageSave('aura_custom_properties', updated);
      return updated;
    });
  }, []);

  const deleteProperty = useCallback((id) => {
    setProperties((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      asyncStorageSave('aura_custom_properties', updated);
      return updated;
    });
  }, []);

  const loginAs = useCallback((user) => {
    setCurrentUser(user);
    if (user) {
      asyncStorageSave('aura_user', user);
    } else {
      asyncStorageSave('aura_user', null);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      firebaseLogout().catch(() => {});
    } catch (e) {}
    loginAs(null);
  }, [loginAs]);

  // Broker Rate Submissions & Admin Approval
  const submitBrokerRate = useCallback((rateData) => {
    const newSubmission = {
      ...rateData,
      id: `br-${Date.now()}`,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      verifiedBadge: false
    };
    setBrokerRates((prev) => {
      const updated = [newSubmission, ...prev];
      asyncStorageSave('aura_broker_rates', updated);
      return updated;
    });
    return newSubmission;
  }, []);

  const approveBrokerRate = useCallback((rateId) => {
    setBrokerRates((prev) => {
      const updated = prev.map((item) =>
        item.id === rateId ? { ...item, status: 'approved', verifiedBadge: true } : item
      );
      asyncStorageSave('aura_broker_rates', updated);
      return updated;
    });
  }, []);

  const rejectBrokerRate = useCallback((rateId) => {
    setBrokerRates((prev) => {
      const updated = prev.map((item) =>
        item.id === rateId ? { ...item, status: 'rejected' } : item
      );
      asyncStorageSave('aura_broker_rates', updated);
      return updated;
    });
  }, []);

  // Platform Settings Audit & Persistence Methods
  const addSettingsLog = useCallback((category, action) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      adminUser: currentUser?.name ? `${currentUser.name} (${currentUser.role || 'Admin'})` : 'Julian Montgomery (Super Admin)',
      category,
      action,
      ipAddress: '192.168.1.104',
      status: 'Success'
    };
    setSettingsLogs((prev) => {
      const updated = [newLog, ...prev];
      asyncStorageSave('aura_settings_logs', updated);
      return updated;
    });
  }, [currentUser]);

  const updatePlatformSettings = useCallback((categoryKey, newCategoryValues) => {
    setPlatformSettings((prev) => {
      const updated = {
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          ...newCategoryValues
        }
      };
      asyncStorageSave('aura_platform_settings', updated);
      return updated;
    });
    addSettingsLog(categoryKey, `Updated configuration settings for ${categoryKey}`);
  }, [addSettingsLog]);

  const saveAllPlatformSettings = useCallback((updatedSettings) => {
    setPlatformSettings(updatedSettings);
    asyncStorageSave('aura_platform_settings', updatedSettings);
    addSettingsLog('Platform Engine', 'Saved comprehensive platform settings batch');
  }, [addSettingsLog]);

  const resetPlatformSettings = useCallback(() => {
    setPlatformSettings(DEFAULT_SETTINGS);
    asyncStorageSave('aura_platform_settings', DEFAULT_SETTINGS);
    addSettingsLog('Platform Engine', 'Reset all 11 settings categories to factory defaults');
  }, [addSettingsLog]);

  // Seller Listing Submission & Mandate Management
  const submitSellerListing = useCallback((listingData) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingRef = `SELL-2026-${randomSuffix}`;
    const newPropId = `prop-sell-${Date.now()}`;

    const newProperty = {
      id: newPropId,
      trackingRef,
      title: listingData.title || 'Exclusive Seller Listed Property',
      slug: (listingData.title || 'seller-property').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: listingData.tagline || 'Direct from Owner • Verified Seller Listing',
      description: listingData.description || 'Exclusive prime property listed directly by the verified owner through JK Realty.',
      price: Number(listingData.price) || 5000000,
      currency: listingData.currency || currency || '$',
      type: listingData.type || 'buy',
      category: listingData.category || 'Luxury Villa',
      isLand: listingData.category === 'Empty Land' || !!listingData.isLand,
      status: 'For Sale',
      sellerVerificationStatus: 'Under Review',
      isFeatured: listingData.planTier === 'spotlight' || listingData.planTier === 'vip',
      isVerified: true,
      isHot: true,
      isSellerListing: true,
      sellerInfo: {
        name: listingData.sellerName,
        phone: listingData.sellerPhone,
        email: listingData.sellerEmail,
        contactPreference: listingData.contactPreference || 'Phone',
        planTier: listingData.planTier || 'marketplace',
        notes: listingData.sellerNotes || ''
      },
      rating: 5.0,
      reviewCount: 0,
      bedrooms: Number(listingData.bedrooms) || 0,
      bathrooms: Number(listingData.bathrooms) || 0,
      areaSqFt: Number(listingData.areaSqFt) || 2400,
      garages: Number(listingData.garages) || 0,
      yearBuilt: Number(listingData.yearBuilt) || 2024,
      address: {
        street: listingData.street || 'Prime Residential Avenue',
        neighborhood: listingData.neighborhood || 'Central Enclave',
        city: listingData.city || 'Los Angeles',
        state: listingData.state || 'CA',
        zipCode: listingData.zipCode || '90210',
        country: listingData.country || 'United States',
        lat: Number(listingData.lat) || 34.0522,
        lng: Number(listingData.lng) || -118.2437
      },
      images: Array.isArray(listingData.images) && listingData.images.length > 0 
        ? listingData.images 
        : [
            listingData.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
          ],
      amenities: Array.isArray(listingData.amenities) && listingData.amenities.length > 0
        ? listingData.amenities 
        : ['Smart Home Automation', '24/7 Gated Security', 'Private Parking'],
      legalSection: listingData.legalSection || {
        ownershipVerification: 'Owner Direct Verification in Progress',
        ecStatus: listingData.clearances || 'Clear Title & Freehold Ownership Verified'
      },
      agent: {
        name: 'JK Realty Seller Advisory Desk',
        role: 'Exclusive Listing Agent',
        phone: '+1 (800) 555-REALTY',
        email: 'sellers@jkrealty.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
      },
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Prepend to properties
    addProperty(newProperty);

    // Also add to inquiries for the Admin CRM pipeline
    addInquiry({
      propertyId: newPropId,
      propertyTitle: newProperty.title,
      fullName: listingData.sellerName,
      email: listingData.sellerEmail,
      phone: listingData.sellerPhone,
      inquiryType: 'Property Seller Mandate',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Morning',
      visitFormat: 'Listing Intake Verification',
      arrivalMode: 'Seller Concierge Desk',
      vipPassId: trackingRef,
      pipelineStage: 'Listing Mandate Received',
      message: `Seller Mandate Submission: Category: ${newProperty.category}, Price: ${newProperty.currency}${newProperty.price.toLocaleString()}, Location: ${newProperty.address.city}, Plan: ${listingData.planTier || 'Standard Marketplace'}. Notes: ${listingData.sellerNotes || 'None'}.`,
      status: 'New'
    });

    return { success: true, property: newProperty, trackingRef };
  }, [addProperty, addInquiry, currency]);

  // Memoize store value to prevent massive unnecessary re-render cascades
  return useMemo(() => ({
    properties,
    favorites,
    compareList,
    inquiries,
    currentUser,
    currency,
    unit,
    vaultNotes,
    vaultCollections,
    isLoaded,
    demoUsers: DEMO_USERS,
    setCurrency,
    setUnit,
    toggleFavorite,
    isFavorite,
    toggleCompare,
    isComparing,
    clearCompare,
    addVaultNote,
    deleteVaultNote,
    createVaultCollection,
    togglePropertyInCollection,
    addInquiry,
    updateInquiryStatus,
    updateInquiryStage,
    addProperty,
    updateProperty,
    deleteProperty,
    loginAs,
    logout,
    brokerRates,
    submitBrokerRate,
    approveBrokerRate,
    rejectBrokerRate,
    submitSellerListing,
    platformSettings,
    settingsLogs,
    updatePlatformSettings,
    saveAllPlatformSettings,
    resetPlatformSettings,
    addSettingsLog,
    isFirebaseConfigured: isFirebaseConfigured()
  }), [
    properties,
    favorites,
    compareList,
    inquiries,
    currentUser,
    currency,
    unit,
    vaultNotes,
    vaultCollections,
    isLoaded,
    brokerRates,
    platformSettings,
    settingsLogs,
    setCurrency,
    setUnit,
    toggleFavorite,
    isFavorite,
    toggleCompare,
    isComparing,
    clearCompare,
    addVaultNote,
    deleteVaultNote,
    createVaultCollection,
    togglePropertyInCollection,
    addInquiry,
    updateInquiryStatus,
    updateInquiryStage,
    addProperty,
    updateProperty,
    deleteProperty,
    loginAs,
    logout,
    submitBrokerRate,
    approveBrokerRate,
    rejectBrokerRate,
    submitSellerListing,
    updatePlatformSettings,
    saveAllPlatformSettings,
    resetPlatformSettings,
    addSettingsLog
  ]);
}

export function RealEstateProvider({ children }) {
  const store = useRealEstateStoreInternal();
  return (
    <RealEstateContext.Provider value={store}>
      {children}
    </RealEstateContext.Provider>
  );
}

export function useRealEstateStore() {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error('useRealEstateStore must be used within a <RealEstateProvider>');
  }
  return context;
}
