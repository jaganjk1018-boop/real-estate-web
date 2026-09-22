// Default configuration schema for all 11 settings categories of JK Realty Platform

export const DEFAULT_SETTINGS = {
  // 1. General Settings
  general: {
    companyName: 'JK Realty Fine Living',
    tagline: 'Ultra-Luxury Architectural Estates & Private Land Portfolios',
    companyLogo: '/logo.svg',
    companyAddress: '10480 Bellagio Road, Bel-Air, Los Angeles, CA 90077',
    contactNumber: '+1 (800) 555-REALTY',
    supportEmail: 'concierge@jkrealty.com',
    websiteUrl: 'https://jkrealty.com',
    socialMedia: {
      instagram: 'https://instagram.com/jkrealty.luxury',
      linkedin: 'https://linkedin.com/company/jkrealty-luxury',
      twitter: 'https://x.com/jkrealty',
      youtube: 'https://youtube.com/@jkrealty'
    },
    operatingHours: 'Monday – Saturday: 08:00 AM – 08:00 PM PST',
    corporateRegistrationNumber: 'CA-DRE-01984210'
  },

  // 2. User Settings
  user: {
    registrationEnabled: true,
    emailVerificationRequired: true,
    mobileOtpVerificationEnabled: true,
    otpProvider: 'twilio', // 'twilio' | 'aws_sns' | 'msg91'
    profileVisibilityDefault: 'verified_only', // 'public' | 'verified_only' | 'private'
    defaultNotifications: {
      newListings: true,
      priceDrops: true,
      marketReports: true,
      vipEvents: true
    },
    allowSocialLogin: true,
    requireKycForBidding: true
  },

  // 3. Property Settings
  property: {
    propertyApprovalRequired: true, // Manual admin review before live publishing
    autoPropertyExpiryEnabled: true,
    expiryDurationDays: 90, // 30 | 60 | 90 | 180
    featuredPropertyDurationDays: 30, // 7 | 14 | 30 | 60
    categories: [
      'Luxury Villa',
      'Duplex Penthouse',
      'Empty Land & Plots',
      'Waterfront Estate',
      'Modern Apartment',
      'Commercial Space',
      'Historic Manor'
    ],
    propertyStatuses: [
      'For Sale',
      'Under Contract',
      'Sold',
      'For Lease',
      'Off-Market Vault'
    ],
    maxImagesPerProperty: 24,
    allowVirtualTourUpload: true,
    enableDroneCinematographyRequests: true
  },

  // 4. Area & Market Rate Settings
  areaMarket: {
    rateSource: 'combined', // 'listings_avg' | 'broker_reports' | 'owner_reports' | 'admin_manual' | 'combined'
    sourceWeights: {
      listingsAvgWeight: 35,
      brokerReportsWeight: 35,
      ownerReportsWeight: 10,
      adminManualWeight: 20
    },
    updateFrequency: 'daily', // 'realtime' | 'daily' | 'weekly' | 'monthly'
    growthCalculationPeriod: '1_year', // '1_month' | '3_months' | '6_months' | '1_year'
    marketTrendAnalysisEnabled: true,
    volatilityAlertThresholdPercent: 7.5,
    autoFlagSuspiciousPriceDeviations: true
  },

  // 5. Broker Settings
  broker: {
    brokerRegistrationApproval: 'manual_review', // 'instant' | 'manual_review'
    requiredVerificationDocs: [
      'Government Real Estate License',
      'Tax Identification / GST / PAN',
      'Errors & Omissions (E&O) Insurance Policy',
      'Corporate Office Proof of Address'
    ],
    ratingSystemEnabled: true,
    allowClientReviews: true,
    leadAssignmentRule: 'round_robin', // 'round_robin' | 'territory_based' | 'seniority_based'
    commission: {
      standardListingCommissionPercent: 1.5,
      buyerBrokerCommissionPercent: 1.5,
      luxuryTrophySplitPercent: 2.5,
      minimumEscrowFee: 2500
    }
  },

  // 6. Map & Location Settings
  map: {
    provider: 'google_maps', // 'google_maps' | 'mappls'
    googleMapsApiKey: 'AIzaSyA8_SAMPLE_KEY_JK_9824XQ10',
    mapplsApiKey: 'map_live_948201_tn_in_sample',
    defaultLocation: {
      city: 'Los Angeles',
      lat: 34.0522,
      lng: -118.2437,
      defaultZoom: 13
    },
    nearbyPlacesSearchRadiusKm: 5.0, // in km
    satelliteViewEnabled: true,
    terrain3dEnabled: true,
    showNearbyFacilitiesHUD: true
  },

  // 7. AI Settings
  ai: {
    aiChatAssistantEnabled: true,
    aiModelProvider: 'gpt-4o', // 'gpt-4o' | 'claude-3.5' | 'gemini-1.5-pro'
    aiPropertyRecommendationEnabled: true,
    recommendationSensitivity: 'balanced', // 'conservative' | 'balanced' | 'exploratory'
    aiAreaAnalysisEnabled: true,
    aiInvestmentScoreEnabled: true,
    aiMarketInsightsEnabled: true,
    aiPropertyValuationEnabled: true,
    valuationConfidenceMarginPercent: 4.5,
    autoGenerateListingSummaries: true
  },

  // 8. Notification Settings
  notification: {
    emailNotificationsEnabled: true,
    emailProvider: 'sendgrid', // 'smtp' | 'sendgrid' | 'postmark'
    smsNotificationsEnabled: true,
    smsGateway: 'twilio',
    whatsappNotificationsEnabled: true,
    whatsappBusinessNumber: '+1 310 555 0192',
    inquiryInstantAlerts: true,
    siteVisitVipAlerts: true,
    brokerLeadAssignmentPush: true,
    dailyDigestEmail: true
  },

  // 9. Financial Settings
  financial: {
    defaultCurrency: 'USD', // 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED'
    multiCurrencyAutoConversion: true,
    emiCalculator: {
      defaultTenureYears: 20,
      defaultDownPaymentPercent: 20
    },
    loanInterestRate: {
      baseRatePercent: 6.75,
      primeCustomerDiscountPercent: 0.5,
      commercialLoanRatePercent: 8.25
    },
    propertyTax: {
      annualPropertyTaxPercent: 1.15,
      stampDutyPercent: 5.0,
      legalRegistrationFeePercent: 1.0
    }
  },

  // 10. Security Settings
  security: {
    twoFactorAuthMode: 'mandatory_admins_optional_users', // 'disabled' | 'mandatory_all' | 'mandatory_admins_optional_users'
    loginSecurity: {
      maxFailedAttempts: 5,
      lockoutDurationMinutes: 30,
      ipRateLimitingEnabled: true
    },
    sessionTimeoutMinutes: 60, // 15 | 30 | 60 | 120 | 240
    adminAccessControl: {
      enforceIpWhitelist: false,
      rbacRoles: ['Super Admin', 'Listing Director', 'Financial Auditor', 'Legal Counsel', 'VIP Broker Desk']
    },
    activityLoggingEnabled: true,
    gdprCompliantDataExport: true
  },

  // 11. Analytics Settings
  analytics: {
    areaDemandCalculationWeights: {
      searchViewsWeight: 40,
      inquiryVolumeWeight: 30,
      vaultFavoritesWeight: 20,
      avgDaysOnMarketWeight: 10
    },
    investmentScoreFormulaWeights: {
      rentalYieldWeight: 30,
      historicalAppreciationWeight: 35,
      infrastructureGrowthWeight: 20,
      legalClearanceWeight: 15
    },
    propertyPopularityTracking: true,
    userActivityHeatmapTracking: true,
    anonymizeUserIps: true,
    googleAnalyticsId: 'G-JKREALTY2026'
  }
};

// Seed Activity Logs for Settings Audit Trail
export const INITIAL_SETTINGS_LOGS = [
  {
    id: 'log-101',
    timestamp: '2026-03-18 11:42 AM',
    adminUser: 'Julian Montgomery (Super Admin)',
    category: 'Security Settings',
    action: 'Enforced 2FA for Broker & Admin Portals',
    ipAddress: '192.168.1.104',
    status: 'Success'
  },
  {
    id: 'log-102',
    timestamp: '2026-03-17 04:15 PM',
    adminUser: 'Elena Rostova (Listing Director)',
    category: 'Area & Market Rate',
    action: 'Changed Area Rate Source to Combined Method',
    ipAddress: '192.168.1.112',
    status: 'Success'
  },
  {
    id: 'log-103',
    timestamp: '2026-03-16 09:30 AM',
    adminUser: 'Julian Montgomery (Super Admin)',
    category: 'AI Settings',
    action: 'Enabled GPT-4o Spatial Valuation & Area Analysis',
    ipAddress: '192.168.1.104',
    status: 'Success'
  },
  {
    id: 'log-104',
    timestamp: '2026-03-15 02:20 PM',
    adminUser: 'System Administrator',
    category: 'Financial Settings',
    action: 'Updated Base Mortgage Benchmark to 6.75%',
    ipAddress: '10.0.0.1',
    status: 'Success'
  }
];
