// Comprehensive Real Estate Area Market Rate Intelligence Data
// Features Tamil Nadu / Chennai growth hubs and international prime enclaves

export const AREA_MARKET_DATA = {
  'tambaram': {
    id: 'tambaram',
    name: 'Tambaram',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600045',
    region: 'South Chennai Hub',
    currency: 'INR',
    currencySymbol: '₹',
    currentAvgRateSqFt: 4500,
    minRateSqFt: 3800,
    maxRateSqFt: 5400,
    oneYearGrowth: 18.0, // +18% (1 Year)
    lastUpdated: '2026-09-15',
    totalActiveListings: 48,
    totalPropertiesSold: 134,
    priceIncreasedPct: 82.5,
    priceDecreasedPct: 3.2,
    demandLevel: 'High Demand',
    demandScore: 9.4,
    investmentScore: 8.9, // ⭐ Investment Score: 8.9/10
    absorptionRateMonths: 2.1,
    tagline: 'Rapidly emerging mega transit-connected residential & plotting corridor',
    
    // Quick Intel Highlight (User land open pannumbodhu showcase)
    quickIntel: {
      areaName: 'Tambaram',
      standardPlotSqFt: 2400, // 2400 sq.ft (1 Ground / 5.51 Cents)
      avgAreaRateFormatted: '₹4,500/sq.ft',
      growth1Year: '+18% (1 Year)',
      schoolDistance: '1.2 km',
      hospitalDistance: '2.1 km',
      railwayDistance: '3 km',
      highwayDistance: '800 m',
      investmentScore: '8.9/10'
    },

    // Formula Breakdown for Automatic Calculation:
    // Total Price Per Sq.ft of All Active Property Listings ÷ Total Number of Listings
    activeListingsRateSum: 216000, // 48 listings * 4,500
    formulaExplanation: 'Average Area Rate = Total Price Per Sq.ft of All Active Property Listings (₹2,16,000) ÷ Total Listings (48) = ₹4,500/sq.ft',

    // Multi-source data weighted blend
    dataSources: [
      { name: 'Active Property Listings', share: 45, count: 48, avgRate: 4520, verified: true },
      { name: 'Broker Submitted Rates', share: 25, count: 32, avgRate: 4490, verified: true },
      { name: 'Owner Submitted Rates', share: 15, count: 19, avgRate: 4460, verified: false },
      { name: 'Sub-Registrar Sale Deeds (TN SRO)', share: 15, count: 41, avgRate: 4480, verified: true }
    ],

    // Interactive Price History Tracking (1M, 3M, 6M, 1Y)
    priceHistory: {
      '1M': [
        { label: 'Week 1', rate: 4440, date: 'Aug 20' },
        { label: 'Week 2', rate: 4460, date: 'Aug 27' },
        { label: 'Week 3', rate: 4485, date: 'Sep 05' },
        { label: 'Current', rate: 4500, date: 'Sep 15' }
      ],
      '3M': [
        { label: 'Jun', rate: 4320, date: '2026-06' },
        { label: 'Jul', rate: 4390, date: '2026-07' },
        { label: 'Aug', rate: 4450, date: '2026-08' },
        { label: 'Sep', rate: 4500, date: '2026-09' }
      ],
      '6M': [
        { label: 'Apr', rate: 4150, date: '2026-04' },
        { label: 'May', rate: 4230, date: '2026-05' },
        { label: 'Jun', rate: 4320, date: '2026-06' },
        { label: 'Jul', rate: 4390, date: '2026-07' },
        { label: 'Aug', rate: 4450, date: '2026-08' },
        { label: 'Sep', rate: 4500, date: '2026-09' }
      ],
      '1Y': [
        { label: 'Oct 25', rate: 3810, date: '2025-10' },
        { label: 'Dec 25', rate: 3950, date: '2025-12' },
        { label: 'Feb 26', rate: 4080, date: '2026-02' },
        { label: 'Apr 26', rate: 4190, date: '2026-04' },
        { label: 'Jun 26', rate: 4320, date: '2026-06' },
        { label: 'Sep 26', rate: 4500, date: '2026-09' } // +18.1%
      ]
    },

    // Future Infrastructure & Development Projects
    futureDevelopments: [
      {
        id: 'dev-1',
        title: 'Chennai Metro Rail (CMRL) Phase-2 Extension',
        category: 'Metro Project',
        icon: 'Train',
        status: 'Under Construction (72% complete)',
        expectedCompletion: 'Q3 2027',
        impactScore: '+14% Expected Price Surge',
        distanceFromCenter: '1.4 km',
        description: 'Airport to Kilambakkam Bus Terminus via Tambaram elevated metro corridor with dedicated station at Tambaram MEPZ.'
      },
      {
        id: 'dev-2',
        title: 'Tambaram-Eastern Bypass 6-Lane Expressway',
        category: 'Highway Project',
        icon: 'Road',
        status: 'Near Completion',
        expectedCompletion: 'Q1 2027',
        impactScore: '+12% Capital Growth',
        distanceFromCenter: '800 m',
        description: 'Connecting GST Road with Velachery-Tambaram Road and OMR, reducing travel time to Sholinganallur IT hub to 22 minutes.'
      },
      {
        id: 'dev-3',
        title: 'MEPZ FinTech & AI Technology Park 2',
        category: 'IT Park',
        icon: 'Building2',
        status: 'Approved & Land Allocated',
        expectedCompletion: '2028',
        impactScore: '+18,000 Direct Tech Jobs',
        distanceFromCenter: '2.5 km',
        description: '45-acre integrated tech park by ELCOT catering to global tech multinationals, creating massive plotted residential demand.'
      },
      {
        id: 'dev-4',
        title: 'Madras Christian College (MCC) Innovation Campus',
        category: 'School / University',
        icon: 'GraduationCap',
        status: 'Operational',
        expectedCompletion: 'Expanded 2026',
        impactScore: 'Premier Academic Zone',
        distanceFromCenter: '1.2 km',
        description: 'Historic autonomous institution with state-of-the-art research centers and CBSE higher secondary sister school.'
      },
      {
        id: 'dev-5',
        title: 'Tambaram Multi-Specialty AIIMS Referral Hospital Hub',
        category: 'Hospital',
        icon: 'Hospital',
        status: 'Active Expansion',
        expectedCompletion: 'Q4 2026',
        impactScore: 'Top Healthcare Access',
        distanceFromCenter: '2.1 km',
        description: '750-bed multi-specialty regional healthcare hub with 24/7 cardiac, trauma, and pediatric care.'
      }
    ],

    // AI Market Analysis Narrative
    aiAnalysis: {
      headline: 'Area prices increased by 18% in the last year due to surging plotted demand and arterial infrastructure developments.',
      detailedInsight: 'Tambaram has evolved from a suburban railway interchange into one of Greater Chennai\'s fastest-appreciating investment epicenters. The dual boost from the CMRL Metro Phase-2 airport-to-Kilambakkam corridor and the Tambaram Eastern Bypass has accelerated institutional builder land acquisitions. With plotted layout inventory recording an absorption velocity of under 2.1 months and groundwater levels standing strong at 30-40 ft, residential plots in Tambaram boast an elite 8.9/10 investment safety score.',
      investmentVerdict: 'Strong Buy for 3-5 Year Plotted & Villa Capital Appreciation',
      targetPrice2028: '₹6,100 - ₹6,500/sq.ft',
      rentalYieldRange: '4.8% - 5.6% for constructed residential villas',
      riskScore: 'Low (CMDA & DTCP regulated cadastral titles)'
    }
  },

  'omr': {
    id: 'omr',
    name: 'OMR - Sholinganallur',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600119',
    region: 'IT Expressway Corridor',
    currency: 'INR',
    currencySymbol: '₹',
    currentAvgRateSqFt: 6200,
    minRateSqFt: 5300,
    maxRateSqFt: 7800,
    oneYearGrowth: 15.4,
    lastUpdated: '2026-09-14',
    totalActiveListings: 64,
    totalPropertiesSold: 188,
    priceIncreasedPct: 79.0,
    priceDecreasedPct: 4.1,
    demandLevel: 'High Demand',
    demandScore: 9.6,
    investmentScore: 9.1,
    absorptionRateMonths: 1.8,
    tagline: 'Chennai\'s high-tech IT corridor with premium gated communities & grade-A commercial hubs',
    
    quickIntel: {
      areaName: 'OMR - Sholinganallur',
      standardPlotSqFt: 2400,
      avgAreaRateFormatted: '₹6,200/sq.ft',
      growth1Year: '+15.4% (1 Year)',
      schoolDistance: '800 m',
      hospitalDistance: '1.5 km',
      railwayDistance: '6.5 km',
      highwayDistance: '100 m',
      investmentScore: '9.1/10'
    },
    activeListingsRateSum: 396800,
    formulaExplanation: 'Average Area Rate = Total Price Per Sq.ft of All Active Property Listings (₹3,96,800) ÷ Total Listings (64) = ₹6,200/sq.ft',

    dataSources: [
      { name: 'Active Property Listings', share: 45, count: 64, avgRate: 6240, verified: true },
      { name: 'Broker Submitted Rates', share: 25, count: 42, avgRate: 6180, verified: true },
      { name: 'Owner Submitted Rates', share: 15, count: 24, avgRate: 6150, verified: false },
      { name: 'Sub-Registrar Sale Deeds (TN SRO)', share: 15, count: 58, avgRate: 6210, verified: true }
    ],

    priceHistory: {
      '1M': [
        { label: 'Week 1', rate: 6150, date: 'Aug 20' },
        { label: 'Week 2', rate: 6170, date: 'Aug 27' },
        { label: 'Week 3', rate: 6190, date: 'Sep 05' },
        { label: 'Current', rate: 6200, date: 'Sep 15' }
      ],
      '3M': [
        { label: 'Jun', rate: 5980, date: '2026-06' },
        { label: 'Jul', rate: 6050, date: '2026-07' },
        { label: 'Aug', rate: 6140, date: '2026-08' },
        { label: 'Sep', rate: 6200, date: '2026-09' }
      ],
      '6M': [
        { label: 'Apr', rate: 5740, date: '2026-04' },
        { label: 'May', rate: 5850, date: '2026-05' },
        { label: 'Jun', rate: 5980, date: '2026-06' },
        { label: 'Jul', rate: 6050, date: '2026-07' },
        { label: 'Aug', rate: 6140, date: '2026-08' },
        { label: 'Sep', rate: 6200, date: '2026-09' }
      ],
      '1Y': [
        { label: 'Oct 25', rate: 5370, date: '2025-10' },
        { label: 'Dec 25', rate: 5520, date: '2025-12' },
        { label: 'Feb 26', rate: 5680, date: '2026-02' },
        { label: 'Apr 26', rate: 5740, date: '2026-04' },
        { label: 'Jun 26', rate: 5980, date: '2026-06' },
        { label: 'Sep 26', rate: 6200, date: '2026-09' }
      ]
    },

    futureDevelopments: [
      {
        id: 'omr-1',
        title: 'CMRL Metro Line 3 (Madhavaram to SIPCOT via OMR)',
        category: 'Metro Project',
        icon: 'Train',
        status: 'Under Construction (Viaduct 65% complete)',
        expectedCompletion: 'Q4 2027',
        impactScore: '+16% Projected Gain',
        distanceFromCenter: '400 m',
        description: 'Dedicated elevated metro line along OMR right into Sholinganallur junction.'
      },
      {
        id: 'omr-2',
        title: 'Multi-Level Flyover at Sholinganallur Junction',
        category: 'Highway Project',
        icon: 'Road',
        status: 'Execution Phase',
        expectedCompletion: 'Q2 2027',
        impactScore: 'Seamless East-West Flow',
        distanceFromCenter: '600 m',
        description: 'Flyover linking ECR Link Road directly to Medavakkam and GST Road without signals.'
      },
      {
        id: 'omr-3',
        title: 'TIDEL Park Neo & AI Innovation Center',
        category: 'IT Park',
        icon: 'Building2',
        status: 'Under Construction',
        expectedCompletion: '2027',
        impactScore: '+25,000 Workforce',
        distanceFromCenter: '1.8 km',
        description: 'Next-generation intelligent computing building with 1.2M sq.ft of Grade-A office space.'
      }
    ],

    aiAnalysis: {
      headline: 'OMR prices gained 15.4% annually, propelled by CMRL Line 3 construction and returning tech workforces.',
      detailedInsight: 'Sholinganallur continues to serve as Chennai\'s technology nerve center. Plotted parcels within 1-2 km of the IT expressway command strong investor premiums due to the scarcity of legal CMDA layouts.',
      investmentVerdict: 'Prime High-Growth Asset with Strong Rental Absorption',
      targetPrice2028: '₹8,000 - ₹8,500/sq.ft',
      rentalYieldRange: '5.2% - 6.1%',
      riskScore: 'Low'
    }
  },

  'guindy': {
    id: 'guindy',
    name: 'Guindy - Kathipara',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600032',
    region: 'Central Business Gateway',
    currency: 'INR',
    currencySymbol: '₹',
    currentAvgRateSqFt: 11200,
    minRateSqFt: 9800,
    maxRateSqFt: 14500,
    oneYearGrowth: 12.8,
    lastUpdated: '2026-09-12',
    totalActiveListings: 26,
    totalPropertiesSold: 71,
    priceIncreasedPct: 74.0,
    priceDecreasedPct: 2.8,
    demandLevel: 'High Demand',
    demandScore: 9.3,
    investmentScore: 9.2,
    absorptionRateMonths: 1.5,
    tagline: 'Prestigious central commercial gateway with immediate airport & metro connectivity',
    
    quickIntel: {
      areaName: 'Guindy - Kathipara',
      standardPlotSqFt: 2400,
      avgAreaRateFormatted: '₹11,200/sq.ft',
      growth1Year: '+12.8% (1 Year)',
      schoolDistance: '1.0 km',
      hospitalDistance: '1.2 km',
      railwayDistance: '1.5 km',
      highwayDistance: '200 m',
      investmentScore: '9.2/10'
    },
    activeListingsRateSum: 291200,
    formulaExplanation: 'Average Area Rate = Total Price Per Sq.ft of All Active Property Listings (₹2,91,200) ÷ Total Listings (26) = ₹11,200/sq.ft',

    dataSources: [
      { name: 'Active Property Listings', share: 45, count: 26, avgRate: 11280, verified: true },
      { name: 'Broker Submitted Rates', share: 25, count: 18, avgRate: 11150, verified: true },
      { name: 'Owner Submitted Rates', share: 15, count: 12, avgRate: 11050, verified: false },
      { name: 'Sub-Registrar Sale Deeds (TN SRO)', share: 15, count: 28, avgRate: 11220, verified: true }
    ],

    priceHistory: {
      '1M': [
        { label: 'Week 1', rate: 11100, date: 'Aug 20' },
        { label: 'Week 2', rate: 11140, date: 'Aug 27' },
        { label: 'Week 3', rate: 11180, date: 'Sep 05' },
        { label: 'Current', rate: 11200, date: 'Sep 15' }
      ],
      '3M': [
        { label: 'Jun', rate: 10800, date: '2026-06' },
        { label: 'Jul', rate: 10950, date: '2026-07' },
        { label: 'Aug', rate: 11100, date: '2026-08' },
        { label: 'Sep', rate: 11200, date: '2026-09' }
      ],
      '6M': [
        { label: 'Apr', rate: 10450, date: '2026-04' },
        { label: 'May', rate: 10620, date: '2026-05' },
        { label: 'Jun', rate: 10800, date: '2026-06' },
        { label: 'Jul', rate: 10950, date: '2026-07' },
        { label: 'Aug', rate: 11100, date: '2026-08' },
        { label: 'Sep', rate: 11200, date: '2026-09' }
      ],
      '1Y': [
        { label: 'Oct 25', rate: 9930, date: '2025-10' },
        { label: 'Dec 25', rate: 10180, date: '2025-12' },
        { label: 'Feb 26', rate: 10350, date: '2026-02' },
        { label: 'Apr 26', rate: 10450, date: '2026-04' },
        { label: 'Jun 26', rate: 10800, date: '2026-06' },
        { label: 'Sep 26', rate: 11200, date: '2026-09' }
      ]
    },

    futureDevelopments: [
      {
        id: 'gn-1',
        title: 'Kathipara Urban Transport & Commercial Interchange',
        category: 'Metro Project',
        icon: 'Train',
        status: 'Operational & Expanding',
        expectedCompletion: 'Continuous',
        impactScore: 'Unmatched Connectivity',
        distanceFromCenter: '500 m',
        description: 'Multi-modal hub integrating Blue Line & Green Line Metro, suburban trains, and bus terminals.'
      },
      {
        id: 'gn-2',
        title: 'Olympia Cyberspace Phase-3 Tower',
        category: 'IT Park',
        icon: 'Building2',
        status: 'Finishing',
        expectedCompletion: 'Q1 2027',
        impactScore: '+12,000 Corporate Professionals',
        distanceFromCenter: '800 m',
        description: 'Ultra-luxury Grade-A office campus attracting top multinational headquarters.'
      }
    ],

    aiAnalysis: {
      headline: 'Guindy properties experienced 12.8% capital expansion, backed by blue-chip headquarters and scarcity of freehold plots.',
      detailedInsight: 'As the central gateway of South and Central Chennai, land availability in Guindy is virtually non-existent, driving sky-high appreciation for any approved redevelopment sites.',
      investmentVerdict: 'Trophy Capital Preservation & Premium High-Yield Asset',
      targetPrice2028: '₹14,500/sq.ft',
      rentalYieldRange: '4.5% - 5.5%',
      riskScore: 'Very Low'
    }
  },

  'ecr': {
    id: 'ecr',
    name: 'ECR - Akkarai & Uthandi',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600119',
    region: 'Scenic Coastal Villa Belt',
    currency: 'INR',
    currencySymbol: '₹',
    currentAvgRateSqFt: 7800,
    minRateSqFt: 6500,
    maxRateSqFt: 11000,
    oneYearGrowth: 16.2,
    lastUpdated: '2026-09-13',
    totalActiveListings: 32,
    totalPropertiesSold: 89,
    priceIncreasedPct: 81.0,
    priceDecreasedPct: 3.5,
    demandLevel: 'High Demand',
    demandScore: 9.5,
    investmentScore: 9.3,
    absorptionRateMonths: 1.9,
    tagline: 'Prestigious beachfront luxury enclave with private beach access and gated farm villa plots',

    quickIntel: {
      areaName: 'ECR - Akkarai',
      standardPlotSqFt: 4800, // 2 Grounds
      avgAreaRateFormatted: '₹7,800/sq.ft',
      growth1Year: '+16.2% (1 Year)',
      schoolDistance: '1.5 km',
      hospitalDistance: '3.0 km',
      railwayDistance: '7.0 km',
      highwayDistance: '200 m',
      investmentScore: '9.3/10'
    },
    activeListingsRateSum: 249600,
    formulaExplanation: 'Average Area Rate = Total Price Per Sq.ft of All Active Property Listings (₹2,49,600) ÷ Total Listings (32) = ₹7,800/sq.ft',

    dataSources: [
      { name: 'Active Property Listings', share: 45, count: 32, avgRate: 7850, verified: true },
      { name: 'Broker Submitted Rates', share: 25, count: 22, avgRate: 7780, verified: true },
      { name: 'Owner Submitted Rates', share: 15, count: 14, avgRate: 7720, verified: false },
      { name: 'Sub-Registrar Sale Deeds (TN SRO)', share: 15, count: 34, avgRate: 7820, verified: true }
    ],

    priceHistory: {
      '1M': [
        { label: 'Week 1', rate: 7720, date: 'Aug 20' },
        { label: 'Week 2', rate: 7750, date: 'Aug 27' },
        { label: 'Week 3', rate: 7780, date: 'Sep 05' },
        { label: 'Current', rate: 7800, date: 'Sep 15' }
      ],
      '3M': [
        { label: 'Jun', rate: 7500, date: '2026-06' },
        { label: 'Jul', rate: 7610, date: '2026-07' },
        { label: 'Aug', rate: 7710, date: '2026-08' },
        { label: 'Sep', rate: 7800, date: '2026-09' }
      ],
      '6M': [
        { label: 'Apr', rate: 7180, date: '2026-04' },
        { label: 'May', rate: 7320, date: '2026-05' },
        { label: 'Jun', rate: 7500, date: '2026-06' },
        { label: 'Jul', rate: 7610, date: '2026-07' },
        { label: 'Aug', rate: 7710, date: '2026-08' },
        { label: 'Sep', rate: 7800, date: '2026-09' }
      ],
      '1Y': [
        { label: 'Oct 25', rate: 6710, date: '2025-10' },
        { label: 'Dec 25', rate: 6890, date: '2025-12' },
        { label: 'Feb 26', rate: 7050, date: '2026-02' },
        { label: 'Apr 26', rate: 7180, date: '2026-04' },
        { label: 'Jun 26', rate: 7500, date: '2026-06' },
        { label: 'Sep 26', rate: 7800, date: '2026-09' }
      ]
    },

    futureDevelopments: [
      {
        id: 'ecr-1',
        title: 'ECR 4-Lane to 6-Lane Coastal Highway Widening',
        category: 'Highway Project',
        icon: 'Road',
        status: 'Under Execution (National Highways Authority)',
        expectedCompletion: '2027',
        impactScore: '+15% Capital Growth',
        distanceFromCenter: '300 m',
        description: 'Complete widening with dedicated pedestrian boardwalks, cycle tracks, and solar lighting.'
      },
      {
        id: 'ecr-2',
        title: 'Akkarai-Sholinganallur Link Road Grade Separator',
        category: 'Highway Project',
        icon: 'Road',
        status: 'Approved',
        expectedCompletion: '2027',
        impactScore: 'Instant OMR IT Reach',
        distanceFromCenter: '1.2 km',
        description: 'Enables residents to reach Elcot SEZ and OMR in under 8 minutes.'
      }
    ],

    aiAnalysis: {
      headline: 'ECR Beachside rates grew 16.2% as High-Net-Worth Individuals prioritize coastal wellness villa sanctuaries.',
      detailedInsight: 'Restricted Coastal Regulation Zone (CRZ) approvals make legitimate freehold layouts along Akkarai and Uthandi exceptionally scarce. The demand for private weekend villas and ultra-luxury custom homes is at an all-time peak.',
      investmentVerdict: 'Elite High-Appreciation Trophy Asset',
      targetPrice2028: '₹10,500/sq.ft',
      rentalYieldRange: '6.5% - 8.2% (Airbnb / Vacation Rental format)',
      riskScore: 'Low-Medium'
    }
  },

  'bel-air': {
    id: 'bel-air',
    name: 'Bel-Air',
    city: 'Los Angeles',
    state: 'California',
    pincode: '90077',
    region: 'Platinum Triangle',
    currency: 'USD',
    currencySymbol: '$',
    currentAvgRateSqFt: 1850,
    minRateSqFt: 1450,
    maxRateSqFt: 2900,
    oneYearGrowth: 9.5,
    lastUpdated: '2026-09-10',
    totalActiveListings: 18,
    totalPropertiesSold: 42,
    priceIncreasedPct: 70.5,
    priceDecreasedPct: 5.2,
    demandLevel: 'High Demand',
    demandScore: 9.1,
    investmentScore: 9.4,
    absorptionRateMonths: 3.4,
    tagline: 'World-renowned private hilltop residential enclave of international titans',

    quickIntel: {
      areaName: 'Bel-Air',
      standardPlotSqFt: 43560, // 1 Acre
      avgAreaRateFormatted: '$1,850/sq.ft',
      growth1Year: '+9.5% (1 Year)',
      schoolDistance: '1.2 km',
      hospitalDistance: '4.2 km',
      railwayDistance: '3.2 km',
      highwayDistance: '800 m',
      investmentScore: '9.4/10'
    },
    activeListingsRateSum: 33300,
    formulaExplanation: 'Average Area Rate = Total Price Per Sq.ft of All Active Property Listings ($33,300) ÷ Total Listings (18) = $1,850/sq.ft',

    dataSources: [
      { name: 'Active Property Listings', share: 45, count: 18, avgRate: 1870, verified: true },
      { name: 'Broker Submitted Rates', share: 25, count: 14, avgRate: 1840, verified: true },
      { name: 'Owner Submitted Rates', share: 15, count: 8, avgRate: 1820, verified: false },
      { name: 'Sub-Registrar Sale Deeds (LA County)', share: 15, count: 24, avgRate: 1855, verified: true }
    ],

    priceHistory: {
      '1M': [
        { label: 'Week 1', rate: 1835, date: 'Aug 20' },
        { label: 'Week 2', rate: 1840, date: 'Aug 27' },
        { label: 'Week 3', rate: 1845, date: 'Sep 05' },
        { label: 'Current', rate: 1850, date: 'Sep 15' }
      ],
      '3M': [
        { label: 'Jun', rate: 1800, date: '2026-06' },
        { label: 'Jul', rate: 1820, date: '2026-07' },
        { label: 'Aug', rate: 1835, date: '2026-08' },
        { label: 'Sep', rate: 1850, date: '2026-09' }
      ],
      '6M': [
        { label: 'Apr', rate: 1750, date: '2026-04' },
        { label: 'May', rate: 1775, date: '2026-05' },
        { label: 'Jun', rate: 1800, date: '2026-06' },
        { label: 'Jul', rate: 1820, date: '2026-07' },
        { label: 'Aug', rate: 1835, date: '2026-08' },
        { label: 'Sep', rate: 1850, date: '2026-09' }
      ],
      '1Y': [
        { label: 'Oct 25', rate: 1690, date: '2025-10' },
        { label: 'Dec 25', rate: 1720, date: '2025-12' },
        { label: 'Feb 26', rate: 1740, date: '2026-02' },
        { label: 'Apr 26', rate: 1750, date: '2026-04' },
        { label: 'Jun 26', rate: 1800, date: '2026-06' },
        { label: 'Sep 26', rate: 1850, date: '2026-09' }
      ]
    },

    futureDevelopments: [
      {
        id: 'ba-1',
        title: 'Sepulveda Transit Subway Line Corridor',
        category: 'Transit Project',
        icon: 'Train',
        status: 'Engineering Planning',
        expectedCompletion: '2030',
        impactScore: '+11% Area Value',
        distanceFromCenter: '1.8 km',
        description: 'High-speed heavy rail underground tunnel connecting San Fernando Valley to Westwood and LAX.'
      },
      {
        id: 'ba-2',
        title: 'Bel-Air Crest Security Infrastructure Upgrade',
        category: 'Security Project',
        icon: 'Shield',
        status: 'Active Deployment',
        expectedCompletion: '2026',
        impactScore: 'Ultra-High Privacy Assurance',
        distanceFromCenter: 'At Entrance Gates',
        description: 'Biometric optical gate readers, AI-powered license plate recognition, and perimeter drone monitoring.'
      }
    ],

    aiAnalysis: {
      headline: 'Bel-Air prices climbed 9.5% annually due to ultra-high global wealth inflow and limited hillside inventory.',
      detailedInsight: 'Hillside ordinance restrictions have dramatically capped new ground-up developments in Bel-Air, ensuring long-term capital defense.',
      investmentVerdict: 'Global Safe-Haven Wealth Preservation',
      targetPrice2028: '$2,200/sq.ft',
      rentalYieldRange: '3.8% - 4.5%',
      riskScore: 'Extremely Low'
    }
  }
};

// Initial Broker Submitted Rates Queue (with status: 'pending' or 'approved')
export const INITIAL_BROKER_RATES = [
  {
    id: 'br-1',
    brokerName: 'R. Senthil Nathan',
    brokerPhone: '+91 98401 28941',
    brokerAgency: 'Premier Chennai Land Assets',
    areaId: 'tambaram',
    areaName: 'Tambaram',
    submittedRateSqFt: 4550,
    listingType: 'Plotted Layout Sale (DTCP Approved)',
    evidenceSource: 'Recent SRO Registered Sale Deed (Doc No 4892/2026)',
    status: 'approved',
    submittedDate: '2026-09-12',
    verifiedBadge: true
  },
  {
    id: 'br-2',
    brokerName: 'M. Karthikeyan',
    brokerPhone: '+91 94440 33819',
    brokerAgency: 'South Metro Realty Group',
    areaId: 'tambaram',
    areaName: 'Tambaram (Mudichur Road)',
    submittedRateSqFt: 4600,
    listingType: 'Residential Villa Land',
    evidenceSource: 'Bank Approved Valuation Report (SBI Housing)',
    status: 'approved',
    submittedDate: '2026-09-14',
    verifiedBadge: true
  },
  {
    id: 'br-3',
    brokerName: 'Anand Ramachandran',
    brokerPhone: '+91 98842 11094',
    brokerAgency: 'Corridor Realty Partners',
    areaId: 'omr',
    areaName: 'OMR - Sholinganallur',
    submittedRateSqFt: 6250,
    listingType: 'Gated Villa Plot',
    evidenceSource: 'CMDA Layout Pre-Launch Registry',
    status: 'approved',
    submittedDate: '2026-09-11',
    verifiedBadge: true
  },
  {
    id: 'br-4',
    brokerName: 'D. Balaji & Associates',
    brokerPhone: '+91 97910 88231',
    brokerAgency: 'Coastal Realty Guild',
    areaId: 'ecr',
    areaName: 'ECR - Akkarai',
    submittedRateSqFt: 7900,
    listingType: 'Beachfront Farm Land',
    evidenceSource: 'Nil Encumbrance Parent Title Search',
    status: 'pending',
    submittedDate: '2026-09-15',
    verifiedBadge: false
  }
];
