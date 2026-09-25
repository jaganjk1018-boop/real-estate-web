import React, { useState, useEffect, createContext, useContext } from 'react';
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
        localStorage.setItem('aura_inquiries', JSON.stringify(seedInquiries));
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
          try {
            localStorage.setItem('aura_user', JSON.stringify(fbUser));
          } catch (e) {}
        }
      });
    } catch (err) {
      console.warn('Firebase auth listener notification:', err);
    }
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const setCurrency = (newCurr) => {
    setCurrencyState(newCurr);
    try {
      localStorage.setItem('aura_currency', newCurr);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('aura_currency_changed', { detail: newCurr }));
      }
    } catch (e) {}
  };

  const setUnit = (newUnit) => {
    setUnitState(newUnit);
    try {
      localStorage.setItem('aura_unit', newUnit);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('aura_unit_changed', { detail: newUnit }));
      }
    } catch (e) {}
  };

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

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      const updated = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      try {
        localStorage.setItem('aura_favorites', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  const toggleCompare = (propertyId) => {
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
      try {
        localStorage.setItem('aura_compare', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isComparing = (propertyId) => compareList.includes(propertyId);

  const clearCompare = () => {
    setCompareList([]);
    try {
      localStorage.removeItem('aura_compare');
    } catch (e) {}
  };

  // Vault Notes & Collections
  const addVaultNote = (propertyId, text) => {
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
      try {
        localStorage.setItem('aura_vault_notes', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteVaultNote = (propertyId, noteId) => {
    setVaultNotes((prev) => {
      const currentList = prev[propertyId] || [];
      const updated = {
        ...prev,
        [propertyId]: currentList.filter((n) => n.id !== noteId)
      };
      try {
        localStorage.setItem('aura_vault_notes', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const createVaultCollection = (name, initialPropId = null) => {
    if (!name || !name.trim()) return;
    setVaultCollections((prev) => {
      const newCol = {
        id: `col-${Date.now()}`,
        name: name.trim(),
        propertyIds: initialPropId ? [initialPropId] : [],
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      const updated = [...prev, newCol];
      try {
        localStorage.setItem('aura_vault_collections', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const togglePropertyInCollection = (collectionId, propertyId) => {
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
      try {
        localStorage.setItem('aura_vault_collections', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const addInquiry = (newInquiry) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const created = {
      ...newInquiry,
      id: `inq-${Date.now()}`,
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
      try {
        localStorage.setItem('aura_inquiries', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return created;
  };

  const updateInquiryStatus = (inquiryId, status) => {
    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq));
      try {
        localStorage.setItem('aura_inquiries', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateInquiryStage = (inquiryId, pipelineStage) => {
    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === inquiryId ? { ...inq, pipelineStage } : inq));
      try {
        localStorage.setItem('aura_inquiries', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const addProperty = (newProperty) => {
    setProperties((prev) => {
      const updated = [newProperty, ...prev];
      try {
        localStorage.setItem('aura_custom_properties', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateProperty = (updatedProp) => {
    setProperties((prev) => {
      const updated = prev.map((p) => (p.id === updatedProp.id ? updatedProp : p));
      try {
        localStorage.setItem('aura_custom_properties', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteProperty = (id) => {
    setProperties((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('aura_custom_properties', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const loginAs = (user) => {
    setCurrentUser(user);
    try {
      if (user) {
        localStorage.setItem('aura_user', JSON.stringify(user));
      } else {
        localStorage.setItem('aura_user', 'null');
      }
    } catch (e) {}
  };

  const logout = () => {
    try {
      firebaseLogout().catch(() => {});
    } catch (e) {}
    loginAs(null);
  };

  // Broker Rate Submissions & Admin Approval
  const submitBrokerRate = (rateData) => {
    const newSubmission = {
      ...rateData,
      id: `br-${Date.now()}`,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      verifiedBadge: false
    };
    setBrokerRates((prev) => {
      const updated = [newSubmission, ...prev];
      try {
        localStorage.setItem('aura_broker_rates', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return newSubmission;
  };

  const approveBrokerRate = (rateId) => {
    setBrokerRates((prev) => {
      const updated = prev.map((item) =>
        item.id === rateId ? { ...item, status: 'approved', verifiedBadge: true } : item
      );
      try {
        localStorage.setItem('aura_broker_rates', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const rejectBrokerRate = (rateId) => {
    setBrokerRates((prev) => {
      const updated = prev.map((item) =>
        item.id === rateId ? { ...item, status: 'rejected' } : item
      );
      try {
        localStorage.setItem('aura_broker_rates', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Seller Listing Submission & Mandate Management
  const submitSellerListing = (listingData) => {
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
  };

  // Platform Settings Audit & Persistence Methods
  const addSettingsLog = (category, action) => {
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
      try {
        localStorage.setItem('aura_settings_logs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updatePlatformSettings = (categoryKey, newCategoryValues) => {
    setPlatformSettings((prev) => {
      const updated = {
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          ...newCategoryValues
        }
      };
      try {
        localStorage.setItem('aura_platform_settings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    addSettingsLog(categoryKey, `Updated configuration settings for ${categoryKey}`);
  };

  const saveAllPlatformSettings = (updatedSettings) => {
    setPlatformSettings(updatedSettings);
    try {
      localStorage.setItem('aura_platform_settings', JSON.stringify(updatedSettings));
    } catch (e) {}
    addSettingsLog('Platform Engine', 'Saved comprehensive platform settings batch');
  };

  const resetPlatformSettings = () => {
    setPlatformSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem('aura_platform_settings', JSON.stringify(DEFAULT_SETTINGS));
    } catch (e) {}
    addSettingsLog('Platform Engine', 'Reset all 11 settings categories to factory defaults');
  };

  return {
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
  };
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
  if (context) {
    return context;
  }
  return useRealEstateStoreInternal();
}
