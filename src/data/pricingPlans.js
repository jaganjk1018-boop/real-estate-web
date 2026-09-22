export const AGENT_SUBSCRIPTIONS = [
  {
    id: 'plan-starter',
    name: 'Private Seller Essential',
    tagline: 'Ideal for private property owners looking to connect directly with verified luxury buyers.',
    priceMonthly: 149,
    priceAnnually: 1490,
    features: [
      'Active Verified Luxury Listing',
      'Direct Buyer Lead Routing to Email & WhatsApp',
      'Real-Time Visitor & Inquiry Analytics',
      'Complimentary AI Property Valuation Report',
      'Standard Verified Prestige Badge',
      'Standard Concierge Support (24h turnaround)'
    ],
    buttonText: 'List My Property',
    targetAudience: 'Private Property Owners'
  },
  {
    id: 'plan-pro',
    name: 'Premier Estate Showcase',
    tagline: 'Engineered for trophy properties requiring maximum visibility and spatial presentation.',
    priceMonthly: 399,
    priceAnnually: 3990,
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      'High-Priority Listing Placement',
      'Instant SMS & WhatsApp Buyer Alerts',
      'Full 360° Interactive Virtual Tour Hosting',
      'Priority Matching in AI Property Matchmaker',
      'Featured Spotlight on Homepage Carousel',
      'Advanced Micro-Market Valuation & Area Intel Report',
      'Dedicated Senior Private Client Advisor'
    ],
    buttonText: 'Select Premier Showcase',
    targetAudience: 'Luxury Homeowners & Estates'
  },
  {
    id: 'plan-agency',
    name: 'Private Client Bespoke',
    tagline: 'Confidential, white-glove advisory and off-market syndication for ultra-prime portfolios.',
    priceMonthly: 999,
    priceAnnually: 9990,
    features: [
      'Confidential Off-Market Dossier Distribution',
      'Direct Introduction to Pre-Qualified Accredited Buyers',
      'Custom Architectural Video & Drone Microsite',
      'Private Wealth & Family Office Syndication',
      'Global Marketing across International Portals',
      'In-Person Private Tour Escort & VIP Negotiation',
      '24/7 Dedicated Senior Partner Advisory'
    ],
    buttonText: 'Request Bespoke Representation',
    targetAudience: 'HNW Sellers & Portfolio Owners'
  }
];

export const PROMOTION_PACKAGES = [
  {
    id: 'promo-hot',
    name: '7-Day Homepage Spotlight',
    price: 299,
    duration: '7 Days',
    reach: 'Est. 45,000+ views',
    features: [
      'Top-of-homepage carousel placement',
      'Gold "FEATURED" glowing border badge',
      'Social media highlight across Instagram & LinkedIn',
      'Included in weekly High-Net-Worth buyer newsletter'
    ]
  },
  {
    id: 'promo-verified',
    name: 'Verified Prestige Stamp & 3D Tour Scan',
    price: 549,
    duration: 'Full Listing Term',
    reach: '3.4x Higher Inquiries',
    features: [
      'Certified title and property inspection badge',
      'Professional 360° interactive virtual tour scan & setup',
      'Guaranteed inclusion in AI Property Matchmaker engine',
      'Direct buyer inquiries delivered immediately'
    ]
  },
  {
    id: 'promo-omnichannel',
    name: 'Omnichannel Ultra Campaign',
    price: 1299,
    duration: '30 Days',
    reach: 'Est. 180,000+ targeted impressions',
    features: [
      'Targeted Google & Meta ad campaigns managed by our team',
      'Featured placement on Properties Catalog and search results',
      'Dedicated email blast to 12,000+ registered accredited buyers',
      'Bi-weekly detailed buyer interest analytics report'
    ]
  }
];
