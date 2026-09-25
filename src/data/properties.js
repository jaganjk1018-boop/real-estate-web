import { AGENTS_DATA } from './agents';

export const PROPERTIES_DATA = [
  {
    id: 'prop-1',
    title: 'The Bel-Air Obsidian Villa',
    slug: 'the-bel-air-obsidian-villa',
    tagline: 'Ultra-modern architectural triumph with panoramic sunset city views',
    description: 'Perched high above Bel-Air, this architectural masterpiece redefines contemporary luxury. Featuring floor-to-ceiling automated Fleetwood glass walls, a zero-edge infinity pool cascading toward the skyline, a private temperature-controlled 1,200-bottle wine cellar, and an executive wellness spa with sauna and steam room. Masterfully built with imported Italian marble and warm bespoke walnut cabinetry.',
    price: 18500000,
    originalPrice: 19800000,
    currency: '$',
    type: 'buy',
    category: 'Luxury Villa',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 4.98,
    reviewCount: 38,
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 11450,
    garages: 4,
    yearBuilt: 2024,
    address: {
      street: '10480 Bellagio Road',
      neighborhood: 'Bel-Air',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90077',
      country: 'United States',
      lat: 34.0837,
      lng: -118.4447
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-1',
        name: 'Great Room & Lounge',
        panoramaUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90',
        description: 'Double-height 24ft ceilings with recessed architectural ambient lighting and open terrace access.',
        hotspots: [
          { id: 'hs-1', title: 'Automated Fireplace', x: 28, y: 62, description: 'Custom 14-foot bio-ethanol floating bronze fireplace.' },
          { id: 'hs-2', title: 'Infinity Terrace', x: 74, y: 48, description: 'Heated outdoor lounge facing downtown sunset vistas.' }
        ]
      },
      {
        id: 'room-2',
        name: 'Master Sanctuary Suite',
        panoramaUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=90',
        description: 'Dual walk-in dressing galleries, private firepit balcony, and Calacatta marble soaking tub.'
      },
      {
        id: 'room-3',
        name: 'Chef Culinary Kitchen',
        panoramaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
        description: 'Miele & Gaggenau appliances, hidden prep pantry, and custom waterfall quartzite island.'
      }
    ],
    amenities: [
      'Infinity Edge Pool',
      'Private Spa & Sauna',
      'Wine Tasting Cellar',
      'Smart Home Automation',
      'Private Cinema Room',
      'Tesla EV Charging Ports',
      'Gated Security & Guard Booth',
      'Panoramic City Views'
    ],
    nearby: [
      { name: 'Bel-Air Country Club', distance: '0.6 miles', type: 'Park', rating: 4.9 },
      { name: 'The Center for Medical Excellence', distance: '2.4 miles', type: 'Hospital', rating: 4.8 },
      { name: 'Harvard-Westlake School', distance: '3.1 miles', type: 'School', rating: 5.0 },
      { name: 'Rodeo Drive Luxury Boutiques', distance: '4.2 miles', type: 'Shopping', rating: 4.9 }
    ],
    agent: AGENTS_DATA[0],
    createdAt: '2025-01-15'
  },
  {
    id: 'prop-2',
    title: 'The Sky Crest Penthouse',
    slug: 'the-sky-crest-penthouse',
    tagline: 'Duplex crown jewel above Manhattan with private rooftop helipad access',
    description: 'Commanding uninterrupted 360-degree vistas of Central Park and the Manhattan skyline. This 8,200-square-foot duplex penthouse features private keyed elevator entry, a 1,500 sq ft wrap-around sky terrace with outdoor summer kitchen, soaring 14-foot ceilings, and solid white oak chevron flooring throughout.',
    price: 24500000,
    currency: '$',
    type: 'buy',
    category: 'Penthouse',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    rating: 5.0,
    reviewCount: 42,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 8200,
    garages: 2,
    yearBuilt: 2023,
    address: {
      street: '432 Park Avenue, Penthouse 78',
      neighborhood: 'Midtown East',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'United States',
      lat: 40.7615,
      lng: -73.9718
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-1',
        name: 'Sky Living Salon',
        panoramaUrl: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=2000&q=90',
        description: 'Corner living room framed by 10x10 foot glass windows overlooking Central Park reservoir.'
      },
      {
        id: 'room-2',
        name: 'Sky Terrace & Hot Tub',
        panoramaUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=90',
        description: 'Open air heated spa terrace perched 800 feet in the Manhattan sky.'
      }
    ],
    amenities: [
      'Central Park Views',
      'Private Sky Terrace',
      '24/7 White Glove Doorman',
      'Valet Underground Parking',
      'Private Olympic Pool & Gym',
      'Wine Sommelier Vault',
      'Residents Private Restaurant'
    ],
    nearby: [
      { name: 'Central Park South Gate', distance: '0.2 miles', type: 'Park', rating: 5.0 },
      { name: 'Fifth Avenue Luxury Corridor', distance: '0.1 miles', type: 'Shopping', rating: 4.9 },
      { name: 'Mount Sinai Hospital Center', distance: '1.2 miles', type: 'Hospital', rating: 4.8 },
      { name: 'Lexington Ave / 59th St Station', distance: '0.1 miles', type: 'Metro', rating: 4.7 }
    ],
    agent: AGENTS_DATA[1],
    createdAt: '2025-01-20'
  },
  {
    id: 'prop-3',
    title: 'Biscayne Bay Oceanfront Palace',
    slug: 'biscayne-bay-oceanfront-palace',
    tagline: 'Private deep-water yacht slip and serene tropical modernism',
    description: 'Located in the exclusive Venetian Islands enclave, this resort-style waterfront estate provides 100 feet of prime water frontage, accommodating a mega-yacht up to 90 feet. Highlights include an infinity pool blending seamlessly into Biscayne Bay, lush tropical courtyard gardens, a rooftop stargazing deck, and an indoor-outdoor summer kitchen.',
    price: 15750000,
    currency: '$',
    type: 'buy',
    category: 'Waterfront Estate',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    rating: 4.94,
    reviewCount: 29,
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 9350,
    garages: 3,
    yearBuilt: 2024,
    address: {
      street: '235 San Marino Drive',
      neighborhood: 'Venetian Islands',
      city: 'Miami Beach',
      state: 'FL',
      zipCode: '33139',
      country: 'United States',
      lat: 25.7907,
      lng: -80.1584
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-1',
        name: 'Waterfront Living Pavilion',
        panoramaUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=90',
        description: 'Seamless glass panels sliding into pocket walls toward the deep-water dock.'
      }
    ],
    amenities: [
      'Deep-water Private Dock',
      'Infinity Bayfront Pool',
      'Rooftop Stargazing Terrace',
      'Outdoor Summer Kitchen',
      'Hurricane Impact Glass',
      'Security Gatehouse',
      'Wine Display & Bar'
    ],
    nearby: [
      { name: 'Miami Beach Marina', distance: '1.4 miles', type: 'Park', rating: 4.8 },
      { name: 'Mount Sinai Medical Center Miami', distance: '2.8 miles', type: 'Hospital', rating: 4.7 },
      { name: 'Lincoln Road District', distance: '1.5 miles', type: 'Shopping', rating: 4.9 }
    ],
    agent: AGENTS_DATA[1],
    createdAt: '2025-02-01'
  },
  {
    id: 'prop-4',
    title: 'The Lumina Glass House',
    slug: 'the-lumina-glass-house',
    tagline: 'Minimalist Scandinavian luxury rental nestled in prime Beverly Grove',
    description: 'Available for short or long-term luxury lease. Fully furnished with custom designer pieces by Minotti and Poliform. Boasting private plunge pool, lush bamboo privacy hedging, zero-noise smart acoustics, and an upper-level primary retreat featuring a Japanese soaking tub.',
    price: 24500,
    priceSuffix: '/ month',
    currency: '$',
    type: 'rent',
    category: 'Modern Apartment',
    status: 'For Rent',
    isFeatured: true,
    isVerified: true,
    rating: 4.91,
    reviewCount: 19,
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqFt: 4600,
    garages: 2,
    yearBuilt: 2022,
    address: {
      street: '8312 West 4th Street',
      neighborhood: 'Beverly Grove',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90048',
      country: 'United States',
      lat: 34.0689,
      lng: -118.3712
    },
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    amenities: [
      'Fully Furnished Designer Decor',
      'Private Heated Plunge Pool',
      'Bamboo Privacy Enclosure',
      'Electric Vehicle Charger',
      'Weekly Housekeeping Included',
      'High-Speed Fiber Internet'
    ],
    nearby: [
      { name: 'Cedars-Sinai Medical Center', distance: '0.8 miles', type: 'Hospital', rating: 4.9 },
      { name: 'The Grove & Farmers Market', distance: '0.5 miles', type: 'Shopping', rating: 4.8 },
      { name: 'Fairfax District Arts Hub', distance: '0.4 miles', type: 'Park', rating: 4.7 }
    ],
    agent: AGENTS_DATA[3],
    createdAt: '2025-02-10'
  },
  {
    id: 'prop-5',
    title: 'One Hudson Yards Horizon Suite',
    slug: 'one-hudson-yards-horizon-suite',
    tagline: 'Executive high-floor rental with Hudson River and Vessel panoramas',
    description: 'Experience ultra-luxury high-rise living in Manhattan’s most innovative enclave. Featuring custom Scavolini kitchen cabinetry, Dornbracht fixtures, motorized blackout shades, 24/7 concierge, in-building Equinox Club access, and private resident bowling alley and screening lounge.',
    price: 18000,
    priceSuffix: '/ month',
    currency: '$',
    type: 'rent',
    category: 'Penthouse',
    status: 'For Rent',
    isFeatured: false,
    isVerified: true,
    rating: 4.88,
    reviewCount: 14,
    bedrooms: 3,
    bathrooms: 3.5,
    areaSqFt: 3100,
    garages: 1,
    yearBuilt: 2021,
    address: {
      street: '530 West 30th Street, 42B',
      neighborhood: 'Hudson Yards',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      lat: 40.7538,
      lng: -74.0022
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85'
    ],
    amenities: [
      'Hudson River Panoramic Views',
      'Equinox Club Access Included',
      '24/7 White Glove Concierge',
      'Private Screening Theater',
      'Indoor Bowling Alley',
      'Sky Lounge with Catering Bar'
    ],
    nearby: [
      { name: 'The High Line Promenade', distance: '0.05 miles', type: 'Park', rating: 4.9 },
      { name: 'Hudson Yards Shopping Mall', distance: '0.1 miles', type: 'Shopping', rating: 4.8 },
      { name: '34th St-Hudson Yards Subway', distance: '0.2 miles', type: 'Metro', rating: 4.7 }
    ],
    agent: AGENTS_DATA[0],
    createdAt: '2025-02-14'
  },
  {
    id: 'prop-6',
    title: 'Financial District Apex Tower',
    slug: 'financial-district-apex-tower',
    tagline: 'Turnkey Class-A corporate headquarters floor with executive boardroom',
    description: 'Fully wired modern commercial office suite spanning the entire 24th floor. Features acoustic conference pods, a 28-seat boardroom with video conferencing walls, open collaborative desking for 90+ staff, executive private offices with skyline views, a barista café lounge, and dedicated server room with redundant cooling.',
    price: 42000,
    priceSuffix: '/ month',
    currency: '$',
    type: 'commercial',
    category: 'Commercial Office',
    status: 'For Rent',
    isFeatured: true,
    isVerified: true,
    rating: 4.96,
    reviewCount: 22,
    bedrooms: 0,
    bathrooms: 6,
    areaSqFt: 14500,
    garages: 8,
    yearBuilt: 2020,
    address: {
      street: '180 Maiden Lane, 24th Floor',
      neighborhood: 'Financial District',
      city: 'New York',
      state: 'NY',
      zipCode: '10038',
      country: 'United States',
      lat: 40.7061,
      lng: -74.0049
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85'
    ],
    amenities: [
      'Fiber Optic 10Gbps Redundant Line',
      '28-Person Executive Boardroom',
      'Barista Coffee & Catering Bar',
      'Biometric Keycard Security Access',
      'Freight Elevator & Loading Dock',
      'LEED Platinum Certified Building',
      '24/7 Building Security & Engineering'
    ],
    nearby: [
      { name: 'Fulton Street Transit Center', distance: '0.3 miles', type: 'Metro', rating: 4.8 },
      { name: 'New York Stock Exchange', distance: '0.4 miles', type: 'Shopping', rating: 4.9 },
      { name: 'Downtown Medical Pavilion', distance: '0.6 miles', type: 'Hospital', rating: 4.6 }
    ],
    agent: AGENTS_DATA[2],
    createdAt: '2025-01-10'
  },
  {
    id: 'prop-7',
    title: 'The Rodeo Galleria Plaza',
    slug: 'the-rodeo-galleria-plaza',
    tagline: 'Premier flagship retail and gallery space with high footfall exposure',
    description: 'Spectacular retail corner property offering 80 feet of clear glass frontage on a high-traffic luxury shopping corridor. Features 16ft ceiling heights, custom brass accents, mezzanine VIP private showing salon, security vault, and direct rear loading access.',
    price: 8900000,
    currency: '$',
    type: 'commercial',
    category: 'Retail Plaza',
    status: 'For Sale',
    isFeatured: false,
    isVerified: true,
    rating: 4.89,
    reviewCount: 16,
    bedrooms: 0,
    bathrooms: 4,
    areaSqFt: 7800,
    garages: 4,
    yearBuilt: 2019,
    address: {
      street: '420 North Beverly Drive',
      neighborhood: 'Golden Triangle',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      country: 'United States',
      lat: 34.0694,
      lng: -118.4012
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=85'
    ],
    amenities: [
      '80ft Glass Streetfront Exposure',
      'Mezzanine VIP Showing Lounge',
      'Heavy Duty Reinforced Vault',
      'Dedicated Customer Valet Drop-off',
      'Full Commercial HVAC System'
    ],
    nearby: [
      { name: 'Rodeo Drive Promenade', distance: '0.1 miles', type: 'Shopping', rating: 5.0 },
      { name: 'Beverly Gardens Park', distance: '0.3 miles', type: 'Park', rating: 4.8 },
      { name: 'Beverly Hills City Hall', distance: '0.4 miles', type: 'Airport', rating: 4.7 }
    ],
    agent: AGENTS_DATA[2],
    createdAt: '2025-01-25'
  },
  {
    id: 'prop-8',
    title: 'The Silicon Valley Eco Manor',
    slug: 'the-silicon-valley-eco-manor',
    tagline: 'Net-zero sustainable luxury estate with private olive grove and solar microgrid',
    description: 'A revolutionary marriage of organic sustainable architecture and contemporary opulence. Powered by an integrated Tesla solar roof and Powerwall system, this estate is 100% self-sufficient. Highlights include passive geothermal climate control, filtered indoor air exchange, organic heirloom vegetable gardens, and private tennis/pickleball court.',
    price: 13900000,
    currency: '$',
    type: 'residential',
    category: 'Luxury Villa',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    rating: 4.99,
    reviewCount: 35,
    bedrooms: 5,
    bathrooms: 6.5,
    areaSqFt: 8600,
    garages: 3,
    yearBuilt: 2024,
    address: {
      street: '13020 Elena Road',
      neighborhood: 'Los Altos Hills',
      city: 'Los Altos Hills',
      state: 'CA',
      zipCode: '94022',
      country: 'United States',
      lat: 37.3752,
      lng: -122.1482
    },
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    amenities: [
      'Net-Zero Solar & Tesla Powerwalls',
      'Tennis & Pickleball Court',
      'Private Olive Grove & Orchard',
      'Saltwater Lap Pool',
      'Geothermal Floor Heating',
      'Commercial Grade Air Filtration'
    ],
    nearby: [
      { name: 'Stanford University & Medical Center', distance: '4.8 miles', type: 'School', rating: 5.0 },
      { name: 'Foothill College Nature Trails', distance: '1.2 miles', type: 'Park', rating: 4.9 },
      { name: 'Downtown Los Altos Boutiques', distance: '2.5 miles', type: 'Shopping', rating: 4.8 }
    ],
    agent: AGENTS_DATA[3],
    createdAt: '2025-02-05'
  },
  {
    id: 'prop-9',
    title: 'The Greenwich Heritage Townhouse',
    slug: 'the-greenwich-heritage-townhouse',
    tagline: 'Exquisitely restored historic 25ft-wide brownstone with private secret garden',
    description: 'A rare historic treasure in the heart of Greenwich Village. Built in 1898 and meticulously restored by world-renowned AD100 architects. Features six levels served by an ornate glass elevator, seven wood-burning fireplaces, a landscaped English garden, wine grotto, and full-floor master suite.',
    price: 16800000,
    currency: '$',
    type: 'residential',
    category: 'Townhouse',
    status: 'For Sale',
    isFeatured: false,
    isVerified: true,
    rating: 4.95,
    reviewCount: 27,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7100,
    garages: 1,
    yearBuilt: 1898,
    address: {
      street: '42 West 11th Street',
      neighborhood: 'Greenwich Village',
      city: 'New York',
      state: 'NY',
      zipCode: '10011',
      country: 'United States',
      lat: 40.7348,
      lng: -73.9965
    },
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85'
    ],
    amenities: [
      'Private Landscaped English Garden',
      '7 Restored Wood-Burning Fireplaces',
      'Custom Internal Glass Elevator',
      'Wine Grotto & Tasting Vault',
      'Hand-Carved Walnut Millwork'
    ],
    nearby: [
      { name: 'Washington Square Park', distance: '0.3 miles', type: 'Park', rating: 4.9 },
      { name: 'New York University (NYU)', distance: '0.4 miles', type: 'School', rating: 4.8 },
      { name: 'W 4th St - Washington Sq Station', distance: '0.3 miles', type: 'Metro', rating: 4.7 }
    ],
    agent: AGENTS_DATA[0],
    createdAt: '2025-02-12'
  },
  {
    id: 'prop-10',
    title: 'Green City Eco Plots & Sanctuary Land',
    slug: 'green-city-eco-plots-and-sanctuary-land',
    tagline: 'DTCP & RERA approved gated villa plot with 60ft avenue road and clear freehold title',
    description: 'A rare opportunity to build your bespoke architectural trophy estate inside Green City Eco Sanctuary. Featuring wide 60-foot blacktop avenue frontage, underground 3-phase electricity, dedicated municipal water connections, and lush native avenue trees. Fully DTCP and RERA certified with pristine freehold documentation, soil test certification, and round-the-clock gated security.',
    price: 3450000,
    originalPrice: 3800000,
    currency: '$',
    type: 'buy',
    category: 'Empty Land',
    isLand: true,
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 4.98,
    reviewCount: 29,
    bedrooms: 0,
    bathrooms: 0,
    areaSqFt: 34848,
    garages: 0,
    yearBuilt: 2025,
    landDetails: {
      zoning: 'Residential Villa Plot (R-1)',
      frontage: '120 ft Main Frontage',
      roadWidth: '60 ft Blacktop Avenue',
      approvals: 'DTCP & RERA Approved',
      ownership: '100% Clear Freehold Title',
      utilities: 'Underground 3-Phase Power & Water'
    },
    address: {
      street: 'Plot No. 14, Green City Boulevard',
      neighborhood: 'Green City Corridor',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'United States',
      lat: 34.0720,
      lng: -118.4200
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=85'
    ],
    amenities: [
      '100% Clear Freehold Title',
      'DTCP & RERA Approved',
      '60ft Wide Blacktop Road',
      'Underground 3-Phase Power',
      'Municipal Water Connection',
      'Storm Water Drainage System',
      'Perimeter Gated Security',
      'Avenue Shade Trees'
    ],
    nearby: [
      { name: 'Green City Preparatory School', distance: '1.2 km', type: 'School', rating: 4.9 },
      { name: 'Green City Multi-Specialty Hospital', distance: '2.5 km', type: 'Hospital', rating: 4.8 },
      { name: 'Avenue Central Bus Stand', distance: '500 m', type: 'Bus Stand', rating: 4.7 },
      { name: 'Grand Central Metro Station', distance: '4.0 km', type: 'Railway Station', rating: 4.8 },
      { name: 'Metropolitan International Airport', distance: '12.0 km', type: 'Airport', rating: 4.9 },
      { name: 'Promenade Luxury Shopping Mall', distance: '3.0 km', type: 'Shopping Mall', rating: 5.0 }
    ],
    agent: AGENTS_DATA[0],
    createdAt: '2025-02-18'
  },
  {
    id: 'prop-11',
    title: 'The Bel-Air Crest Promontory Land Parcel',
    slug: 'the-bel-air-crest-promontory-land-parcel',
    tagline: 'Shovel-ready 1.8-acre promontory with 360° city-to-ocean vistas and RTI blueprints',
    description: 'Perched at the highest cul-de-sac of Bel-Air, this 1.8-acre vacant promontory pad offers an unprecedented canvas for a 20,000+ sq ft architectural mega-mansion. Features completed grading, fully approved RTI blueprints by a world-class architectural firm, geotechnical clearance, and unobstructed sunset corridors stretching from Downtown Los Angeles to Santa Monica bay.',
    price: 11800000,
    originalPrice: 12500000,
    currency: '$',
    type: 'buy',
    category: 'Empty Land',
    isLand: true,
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 5.0,
    reviewCount: 34,
    bedrooms: 0,
    bathrooms: 0,
    areaSqFt: 78408,
    garages: 0,
    yearBuilt: 2025,
    landDetails: {
      zoning: 'Exclusive Residential Estate (RE-40)',
      frontage: '210 ft Hilltop Crest',
      roadWidth: '45 ft Private Gated Access',
      approvals: 'RTI Approved Plans for 22,000 sq ft',
      ownership: 'Freehold Title with Complete Survey',
      utilities: 'Dual Water Meters & 400A Electric Stub'
    },
    address: {
      street: '10980 Bellagio Summit Road',
      neighborhood: 'Bel-Air',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90077',
      country: 'United States',
      lat: 34.0910,
      lng: -118.4510
    },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85'
    ],
    amenities: [
      'RTI Ready Construction Permits',
      'Panoramic 360° Ocean & Skyline Views',
      'Completed Soil & Geotech Clearance',
      '210ft Hillside Frontage',
      '24/7 Gated Armed Security Patrol',
      'Dual 2-inch Water Utility Inlets',
      'Heavy Duty Retaining Infrastructure',
      'Private Cul-de-Sac Gate Access'
    ],
    nearby: [
      { name: 'Harvard-Westlake Preparatory School', distance: '2.8 km', type: 'School', rating: 5.0 },
      { name: 'Cedars-Sinai Medical Center', distance: '4.5 km', type: 'Hospital', rating: 4.9 },
      { name: 'Bel-Air Transit Bus Stand', distance: '800 m', type: 'Bus Stand', rating: 4.6 },
      { name: 'Westwood Metro Rail Hub', distance: '3.2 km', type: 'Railway Station', rating: 4.8 },
      { name: 'Van Nuys Private Aviation Airport', distance: '13.8 km', type: 'Airport', rating: 5.0 },
      { name: 'Rodeo Drive Luxury Boutiques', distance: '4.0 km', type: 'Shopping Mall', rating: 5.0 }
    ],
    agent: AGENTS_DATA[0],
    createdAt: '2025-02-19'
  },
  {
    id: 'prop-12',
    title: 'Malibu Coastal Oceanfront Bluff Acreage',
    slug: 'malibu-coastal-oceanfront-bluff-acreage',
    tagline: '3.2 Acres of pristine oceanfront land with private direct beach trail and coastal permits',
    description: 'A once-in-a-generation oceanfront land parcel directly on the Pacific Coast. Spanning 3.2 contiguous acres with over 280 linear feet of private bluff frontage. California Coastal Commission approved building envelope for a contemporary glass compound, private helipad landing pad, and private funicular or switchback trail to a secluded golden sand beach.',
    price: 16500000,
    originalPrice: 17900000,
    currency: '$',
    type: 'buy',
    category: 'Empty Land',
    isLand: true,
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 5.0,
    reviewCount: 41,
    bedrooms: 0,
    bathrooms: 0,
    areaSqFt: 139392,
    garages: 0,
    yearBuilt: 2025,
    landDetails: {
      zoning: 'Coastal Residential Agricultural',
      frontage: '280 ft Direct Ocean Bluff',
      roadWidth: 'Highway Access with Private Drive',
      approvals: 'Coastal Commission Cleared',
      ownership: 'Freehold Title & Riparian Rights',
      utilities: 'Public Utilities at Property Edge'
    },
    address: {
      street: '32800 Pacific Coast Highway',
      neighborhood: 'El Pescador Bluff',
      city: 'Malibu',
      state: 'CA',
      zipCode: '90265',
      country: 'United States',
      lat: 34.0320,
      lng: -118.8450
    },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1600&q=85'
    ],
    amenities: [
      'Private Direct Beach Access',
      'Coastal Commission Approved',
      '280ft Ocean Bluff Frontage',
      'Private Helipad Envelope',
      'Full Topographic Boundary Survey',
      'Clear Riparian Water Rights',
      'Gated Private Entry Driveway',
      'Sunset Pacific Horizon Corridor'
    ],
    nearby: [
      { name: 'Malibu High & Middle School', distance: '3.5 km', type: 'School', rating: 4.8 },
      { name: 'Malibu Urgent Care & Medical Hub', distance: '4.2 km', type: 'Hospital', rating: 4.7 },
      { name: 'PCH Coastal Bus Stand', distance: '300 m', type: 'Bus Stand', rating: 4.5 },
      { name: 'Santa Monica Transit Terminal', distance: '16.0 km', type: 'Railway Station', rating: 4.8 },
      { name: 'Santa Monica VIP Airport (SMO)', distance: '22.0 km', type: 'Airport', rating: 4.9 },
      { name: 'Malibu Country Mart Luxury Plaza', distance: '5.2 km', type: 'Shopping Mall', rating: 4.9 }
    ],
    agent: AGENTS_DATA[0],
    createdAt: '2025-02-21'
  },
  {
    id: 'prop-13',
    title: 'Tambaram Royal Avenue Prime Villa Plot',
    slug: 'tambaram-royal-avenue-prime-villa-plot',
    tagline: 'CMDA & DTCP approved 2,400 sq.ft plot on 40ft road with 100% clear Patta & 35-yr Nil EC',
    description: 'A prized 2,400 sq.ft (1 Ground / 5.51 Cents) luxury residential plot positioned in the high-growth Tambaram residential corridor. Boasts an auspicious North-East corner orientation, direct frontage onto a 40-foot wide asphalt road, and sweet drinking ground water at 35 feet depth. Fully sanctioned under CMDA and DTCP layout orders with RERA registration. Underground 3-phase TNEB power stub in place, complete with Patta, Chitta, FMB cadastral boundary survey, and 35-year Nil Encumbrance Certificate verified by senior legal counsel.',
    price: 10800000, // ₹1.08 Cr (₹4,500 * 2,400)
    originalPrice: 11500000,
    pricePerSqFt: 4500,
    currency: '₹',
    priceSuffix: '',
    type: 'buy',
    category: 'Empty Land',
    isLand: true,
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 4.98,
    reviewCount: 46,
    bedrooms: 0,
    bathrooms: 0,
    areaSqFt: 2400,
    garages: 0,
    yearBuilt: 2026,
    
    // Exact Land Specifications
    landDetails: {
      totalAreaSqFt: 2400,
      totalAreaCents: 5.51,
      totalAreaGrounds: 1.0,
      totalAreaAcres: 0.055,
      pricePerSqFt: 4500,
      pricePerCent: 196020,
      pricePerGround: 10800000,
      roadFacing: 'North-East (Vaastu Compliant)',
      roadWidth: '40 Ft Asphalt Tar Road',
      surveyNumber: 'Survey No. 482/3B',
      approvals: 'CMDA & DTCP Approved (CMDA/PP/No. 1142/2024)',
      reraNumber: 'TN/01/Layout/8924/2024',
      dimensions: '40 x 60 Ft (40ft Frontage x 60ft Depth)',
      waterAvailability: 'Sweet Potable Groundwater at 35 ft + Municipal CMWSSB Connection Ready',
      ebConnection: '3-Phase Underground Electrical Line with Individual Meter Stub Installed',
      soilType: 'High-Bearing Red Loam & Gravel (Pre-tested for G+3 Villa Construction)',
      fencing: 'Boundary Wall with Demarcated Granite Survey Pillars'
    },

    // Legal Documents & Certifications
    legalSection: {
      ecStatus: '35-Year Nil Encumbrance (Search 1991 - 2026 Verified)',
      ecNumber: 'EC/TN/SRO/TB/2026/84920',
      pattaNumber: 'Patta No. 3921 (Tambaram Taluk, Chengalpattu District)',
      chittaDetails: 'Village No. 42, Khata Register 3921/A, Dry Land Settlement Recorded',
      fmbSketch: 'Cadastral Map FMB-482-3B with boundary stones and field dimensions',
      approvalDocuments: 'CMDA Planning Permit No. 1142/2024 & Local Panchayat NOC',
      ownershipVerification: '100% Clear Freehold Inherited Title • Single Owner • Zero Mutation Discrepancy',
      verifiedByLawyer: 'Adv. S. Ramanujam, Madras High Court (Bar Council TN/4821/2004)'
    },

    // Area Insights & Ratings
    areaInsights: {
      areaName: 'Tambaram',
      areaAvgPriceSqFt: 4500,
      last1YearGrowth: 18.0, // +18% (1 Year)
      demandScore: 9.4,
      investmentScore: 8.9, // ⭐ Investment Score: 8.9/10
      futureProjects: [
        'CMRL Metro Phase-2 Extension (Airport to Kilambakkam via Tambaram)',
        'Tambaram-Eastern Bypass 6-Lane Expressway (800m)',
        'MEPZ FinTech & AI Technology Park 2 (2.5 km)'
      ]
    },

    address: {
      street: 'Plot No. 28, Royal Avenue, GST Bypass Link',
      neighborhood: 'Tambaram West Corridor',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600045',
      country: 'India',
      lat: 12.9249,
      lng: 80.1000
    },

    images: [
      'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85'
    ],

    amenities: [
      'CMDA & DTCP Layout Approved',
      'RERA Registered Layout',
      '40 Ft Wide Blacktop Road',
      'North-East Facing Plot',
      'Sweet Groundwater at 35 Ft',
      '3-Phase Underground EB Connection',
      'Granite Corner Boundary Stones',
      'Gated Community with Solar Streetlights',
      '100% Freehold Clear Title',
      'Storm Water Covered Drainage'
    ],

    nearby: [
      { name: 'Tambaram High Preparatory Academy', distance: '1.2 km', type: 'School', rating: 4.9 },
      { name: 'Tambaram Multi-Specialty AIIMS Referral Hospital', distance: '2.1 km', type: 'Hospital', rating: 4.9 },
      { name: 'Tambaram Junction Railway Station', distance: '3.0 km', type: 'Railway Station', rating: 4.8 },
      { name: 'GST Road & Eastern Bypass Highway', distance: '800 m', type: 'Highway', rating: 4.9 },
      { name: 'Madras Christian College (MCC)', distance: '1.8 km', type: 'College', rating: 5.0 },
      { name: 'Tambaram Central Bus Concourse', distance: '600 m', type: 'Bus Stand', rating: 4.7 },
      { name: 'Chennai International Airport (MAA)', distance: '8.5 km', type: 'Airport', rating: 4.8 },
      { name: 'Grand Galada Luxury Mall & Multiplex', distance: '2.4 km', type: 'Shopping Mall', rating: 4.9 }
    ],

    virtualTourRooms: [
      {
        id: 'room-aerial',
        name: '100ft Aerial Drone Overview - Royal Avenue',
        panoramaUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85',
        description: '360° birds-eye viewpoint of Plot 28, demarcated corner boundary, and direct 40ft road connectivity.',
        hotspots: [
          { id: 'hs-1', title: '40ft Avenue Access', x: 35, y: 65, description: 'Tar blacktop avenue with drainage system.' },
          { id: 'hs-2', title: 'North-East Corner Vaastu', x: 68, y: 40, description: 'Prime auspicious Eesanya corner orientation.' }
        ]
      },
      {
        id: 'room-frontage',
        name: '40ft Road Frontage & Street Vantage',
        panoramaUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2400&q=85',
        description: 'Street-level perspective showing 40-foot frontage, underground 3-phase TNEB pillar, and potable water line.',
        hotspots: [
          { id: 'hs-3', title: '3-Phase EB Stub', x: 45, y: 70, description: 'Dedicated underground transformer feed.' }
        ]
      }
    ],

    agent: AGENTS_DATA[4], // R. Senthil Nathan
    createdAt: '2026-03-01'
  },
  {
    id: 'prop-14',
    title: 'The Worli Sea Face Sky-Palace',
    slug: 'the-worli-sea-face-sky-palace',
    tagline: 'Triplex Crown Sky-Palace with direct Bandra-Worli Sea Link & Arabian Sea vistas',
    description: 'Rising 72 floors above Worli Sea Face, this ultra-exclusive 10,200 sq.ft triplex penthouse represents the absolute pinnacle of Mumbai luxury real estate. Offering sweeping 270-degree panoramic sunset views of the Arabian Sea and the iconic illuminated Bandra-Worli Sea Link. Features a private high-speed elevator opening directly into a double-height grand salon, private heated rooftop pool, temperature-controlled champagne cellar, imported Statuario marble slabs, and an expansive cantilevered observation deck.',
    price: 650000000,
    originalPrice: 700000000,
    currency: '₹',
    type: 'buy',
    category: 'Duplex Penthouse',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 5.0,
    reviewCount: 29,
    bedrooms: 5,
    bathrooms: 7,
    areaSqFt: 10200,
    garages: 4,
    yearBuilt: 2025,
    address: {
      street: 'Worli Sea Face South Pier',
      neighborhood: 'Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400030',
      country: 'India',
      lat: 19.0176,
      lng: 72.8174
    },
    images: [
      '/images/properties/mumbai-sky-palace.jpg',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-sea-salon',
        name: 'Grand Sea Link Salon & Terrace',
        panoramaUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90',
        description: 'Double-height glass hall overlooking the Bandra-Worli Sea Link and Arabian Sea golden hour.'
      },
      {
        id: 'room-rooftop-pool',
        name: 'Private Sky Infinity Pool & Deck',
        panoramaUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=90',
        description: 'Heated open-air infinity pool floating 700 feet above the Mumbai shoreline.'
      }
    ],
    amenities: [
      'Bandra-Worli Sea Link Views',
      'Private Rooftop Infinity Pool',
      'Dedicated High-Speed Biometric Elevator',
      '4 Covered Valet Car Parks',
      '24/7 Concierge & White-Glove Security',
      'Temperature Controlled Wine Cellar',
      'Imported Italian Statuario Marble',
      'Automated VRV Air Conditioning'
    ],
    nearby: [
      { name: 'Four Seasons Luxury Hotel & Rooftop', distance: '1.2 km', type: 'Hospitality', rating: 4.9 },
      { name: 'Mahalaxmi Racecourse & Polo Club', distance: '2.5 km', type: 'Sports', rating: 4.8 },
      { name: 'High Street Phoenix & Palladium Luxury Mall', distance: '1.8 km', type: 'Shopping', rating: 5.0 },
      { name: 'Bandra-Worli Sea Link Toll Entrance', distance: '800 m', type: 'Highway', rating: 4.9 },
      { name: 'Sir H. N. Reliance Foundation Hospital', distance: '4.2 km', type: 'Hospital', rating: 4.9 }
    ],
    legalSection: {
      ecStatus: '30-Year Nil Encumbrance Verified by Crawford Bayley & Co.',
      reraNumber: 'P51900084910 (MahaRERA)',
      ownershipVerification: '100% Freehold Conveyed Title Deed'
    },
    areaInsights: {
      areaName: 'Worli Sea Face, Mumbai',
      areaAvgPriceSqFt: 63700,
      last1YearGrowth: 14.8,
      demandScore: 9.9,
      investmentScore: 9.6
    },
    agent: AGENTS_DATA[1],
    createdAt: '2026-03-05'
  },
  {
    id: 'prop-15',
    title: 'The Indiranagar Zen Villa & Garden Estate',
    slug: 'the-indiranagar-zen-villa-garden-estate',
    tagline: 'Biophilic architectural masterwork with private koi pond & pool in prime Indiranagar',
    description: 'Conceived by award-winning tropical modern architects, this 7,800 sq.ft private bungalow estate in Bangalore’s most prestigious postal code seamlessly blends indoor and outdoor luxury. Features a central water courtyard with Japanese koi pond, floating granite stepping stones, double-height living spaces framed by teak louvers, private lap pool, solar-integrated passive ventilation, smart Lutron lighting, and subterranean private speakeasy lounge.',
    price: 285000000,
    originalPrice: 310000000,
    currency: '₹',
    type: 'buy',
    category: 'Luxury Villa',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 4.97,
    reviewCount: 34,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7800,
    garages: 3,
    yearBuilt: 2024,
    address: {
      street: '12th Main Road, Defense Colony',
      neighborhood: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      zipCode: '560038',
      country: 'India',
      lat: 12.9784,
      lng: 77.6408
    },
    images: [
      '/images/properties/bangalore-zen-villa.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-zen-pond',
        name: 'Central Water Court & Koi Pond',
        panoramaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
        description: 'Landscaped open-sky courtyard with cascading fountains, tropical vertical green wall, and floating stone paths.'
      },
      {
        id: 'room-living-pavilion',
        name: 'Double-Height Living Pavilion',
        panoramaUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90',
        description: 'Open living room with bespoke Burma teak louvers and floor-to-ceiling sliding glass facade.'
      }
    ],
    amenities: [
      'Private Japanese Koi Pond Courtyard',
      'Heated Outdoor Lap Pool & Jacuzzi',
      'Lutron Smart Automation System',
      'Solar Rooftop Grid with Tesla Powerwall Backup',
      'Subterranean Private Wine & Speakeasy Bar',
      'BBMP A-Khata Freehold Clear Title',
      'EV Fast Charging Stations',
      'Italian Marble & Natural Teak Finishes'
    ],
    nearby: [
      { name: 'Indiranagar 100ft Road Gourmet Corridor', distance: '300 m', type: 'Lifestyle', rating: 4.9 },
      { name: 'Embassy GolfLinks Business Park', distance: '3.2 km', type: 'Tech Park', rating: 4.8 },
      { name: 'Manipal Multi-Specialty Hospital', distance: '1.4 km', type: 'Hospital', rating: 4.9 },
      { name: 'Indiranagar Metro Station (Purple Line)', distance: '850 m', type: 'Transit', rating: 4.7 },
      { name: 'Kempegowda International Airport Link (KIAL)', distance: '36 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '35-Year Nil Encumbrance Certified by King & Partridge',
      reraNumber: 'PRM/KA/RERA/1251/2024',
      ownershipVerification: 'BBMP A-Khata Registered • Zero Discrepancy Freehold Title'
    },
    areaInsights: {
      areaName: 'Indiranagar, Bengaluru',
      areaAvgPriceSqFt: 36500,
      last1YearGrowth: 16.4,
      demandScore: 9.7,
      investmentScore: 9.3
    },
    agent: AGENTS_DATA[3],
    createdAt: '2026-03-08'
  },
  {
    id: 'prop-16',
    title: 'The Lutyens Heritage Regal Mansion',
    slug: 'the-lutyens-heritage-regal-mansion',
    tagline: 'Stately neoclassical colonial estate with sprawling 1.2-acre private lawns in Golf Links',
    description: 'An aristocratic residence of historic distinction in the tightly held Lutyens Bungalow Zone of New Delhi. Spanning 1.2 acres of verdant lawns with century-old heritage trees, this palatial colonial estate showcases grand Roman colonnades, neoclassical dome architecture, Belgian crystal chandeliers, private banquet ballroom, high-security embassy-grade perimeter walls, separate staff quarters, and cobblestone porte-cochère driveway.',
    price: 1250000000,
    originalPrice: 1350000000,
    currency: '₹',
    type: 'buy',
    category: 'Historic Manor',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 5.0,
    reviewCount: 19,
    bedrooms: 8,
    bathrooms: 10,
    areaSqFt: 14500,
    garages: 6,
    yearBuilt: 2023,
    address: {
      street: 'Golf Links Boulevard, Lutyens Zone',
      neighborhood: 'Golf Links',
      city: 'New Delhi',
      state: 'Delhi NCR',
      zipCode: '110003',
      country: 'India',
      lat: 28.5983,
      lng: 77.2346
    },
    images: [
      '/images/properties/delhi-lutyens-mansion.jpg',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-colonnade',
        name: 'Grand Neoclassical Facade & Driveway',
        panoramaUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=90',
        description: 'Colonnade porch with classical Roman pillars and circular cobblestone entrance.'
      },
      {
        id: 'room-banquet',
        name: 'State Dining Hall & Library',
        panoramaUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90',
        description: 'Gilded 20ft ceiling hall with antique crystal chandeliers and private cedar library.'
      }
    ],
    amenities: [
      '1.2-Acre Private Manicured Lawns',
      'Heritage Neoclassical Architecture',
      'Embassy-Grade Perimeter Security',
      'Cobblestone Porte-Cochère & 6-Car Port',
      'Grand Ballroom & State Dining Hall',
      'Century-Old Banyan & Neem Shade Canopies',
      'Detached 8-Room Service & Security Quarters',
      'L&DO Clear Freehold Title'
    ],
    nearby: [
      { name: 'Delhi Golf Club (18-Hole Championship Course)', distance: '400 m', type: 'Sports', rating: 5.0 },
      { name: 'Khan Market Gourmet & Diplomatic Boutiques', distance: '900 m', type: 'Shopping', rating: 4.9 },
      { name: 'Lodhi Gardens Heritage Walking Park', distance: '1.5 km', type: 'Park', rating: 5.0 },
      { name: 'India Gate & Central Vista Avenue', distance: '2.1 km', type: 'Landmark', rating: 5.0 },
      { name: 'Indira Gandhi International Airport (DEL)', distance: '14 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '50-Year Verified Sovereign Title by Shardul Amarchand Mangaldas',
      reraNumber: 'DLRERA2024H8912',
      ownershipVerification: 'L&DO Freehold Converted • Nil Litigation Guarantee'
    },
    areaInsights: {
      areaName: 'Golf Links, Lutyens New Delhi',
      areaAvgPriceSqFt: 86000,
      last1YearGrowth: 12.5,
      demandScore: 10.0,
      investmentScore: 9.8
    },
    agent: AGENTS_DATA[0],
    createdAt: '2026-03-02'
  },
  {
    id: 'prop-17',
    title: 'The Jubilee Hills Kohinoor Villa',
    slug: 'the-jubilee-hills-kohinoor-villa',
    tagline: 'Hilltop architectural sanctuary with infinity pool & Durgam Cheruvu skyline views',
    description: 'Perched on an elevated crest on Road No. 36 Jubilee Hills, this 9,400 sq.ft ultra-luxury residence commands breathtaking sunset views over Hyderabad’s IT skyline and Durgam Cheruvu lake. Engineered with Italian travertine stone, double-cantilevered balconies, temperature-controlled infinity pool, home theater with Dolby Atmos, elevator connecting 4 levels, and private roof garden.',
    price: 380000000,
    originalPrice: 410000000,
    currency: '₹',
    type: 'buy',
    category: 'Luxury Villa',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 4.96,
    reviewCount: 22,
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 9400,
    garages: 4,
    yearBuilt: 2024,
    address: {
      street: 'Road No. 36, Hill Crest Drive',
      neighborhood: 'Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500033',
      country: 'India',
      lat: 17.4319,
      lng: 78.4073
    },
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-view-deck',
        name: 'Hill-Crest Infinity Terrace',
        panoramaUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=90',
        description: 'Cantilevered infinity deck facing the illuminated Durgam Cheruvu cable bridge and HITEC City skyline.'
      }
    ],
    amenities: [
      'Panoramic City & Lake Views',
      'Heated Hilltop Infinity Pool',
      'Otis 8-Passenger Biometric Glass Elevator',
      'Dolby Atmos 12-Seat 4K Private Cinema',
      'Italian Travertine Stone Cladding',
      'Full Solar Generation with Inverter Bank',
      'GHMC Approved Sanctioned Layout',
      'Dedicated Maid & Driver Quarters'
    ],
    nearby: [
      { name: 'Durgam Cheruvu Cable-Stayed Bridge', distance: '1.2 km', type: 'Landmark', rating: 4.9 },
      { name: 'KBR National Park Nature Reserve', distance: '1.8 km', type: 'Park', rating: 4.8 },
      { name: 'Apollo Health City Multi-Specialty', distance: '2.4 km', type: 'Hospital', rating: 4.9 },
      { name: 'Inorbit Mall Cyberabad', distance: '3.1 km', type: 'Shopping', rating: 4.7 },
      { name: 'Rajiv Gandhi International Airport (HYD)', distance: '32 km', type: 'Airport', rating: 4.9 }
    ],
    legalSection: {
      ecStatus: '35-Year Nil Encumbrance Certified by High Court Advocates',
      reraNumber: 'TSRERA2024V9812',
      ownershipVerification: 'GHMC Approved Freehold Patta Deed'
    },
    areaInsights: {
      areaName: 'Jubilee Hills, Hyderabad',
      areaAvgPriceSqFt: 40400,
      last1YearGrowth: 17.2,
      demandScore: 9.8,
      investmentScore: 9.4
    },
    agent: AGENTS_DATA[2],
    createdAt: '2026-03-10'
  },
  {
    id: 'prop-18',
    title: 'The Candolim Azure Beachfront Villa',
    slug: 'the-candolim-azure-beachfront-villa',
    tagline: 'Portuguese-modernist coastal sanctuary with direct Arabian Sea beach access in North Goa',
    description: 'Immersed in a private 1-acre coconut palm grove directly on Candolim beach, this 6,800 sq.ft beachfront estate seamlessly combines traditional Goan-Portuguese architecture with modern European minimalism. Featuring laterite stone walls, high timber-vaulted ceilings, open-concept outdoor living pavilion, infinity pool overlooking golden sands, and private direct gate to the Arabian Sea.',
    price: 185000000,
    originalPrice: 200000000,
    currency: '₹',
    type: 'buy',
    category: 'Waterfront Estate',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 4.98,
    reviewCount: 31,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 6800,
    garages: 3,
    yearBuilt: 2024,
    address: {
      street: 'Sinquerim Beach Road',
      neighborhood: 'Candolim Coast',
      city: 'Candolim',
      state: 'Goa',
      zipCode: '403515',
      country: 'India',
      lat: 15.5186,
      lng: 73.7626
    },
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-beach-veranda',
        name: 'Open Veranda & Palm Pool',
        panoramaUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=90',
        description: 'Deep shaded veranda opening into the pool and private beach access path.'
      }
    ],
    amenities: [
      'Direct Private Beachfront Access',
      '1-Acre Mature Coconut Palm Grove',
      'Saltwater Infinity Swimming Pool',
      'Portuguese Heritage Laterite Architecture',
      'Open-Air Culinary Alfresco Pavilion',
      'Full Power Backup & Desalination Plant',
      'Goa CRZ Clearance Verified',
      'High-Speed Satellite Internet'
    ],
    nearby: [
      { name: 'Candolim Beach Water Sports & Cafes', distance: '50 m', type: 'Beach', rating: 4.9 },
      { name: 'Fort Aguada Historic Lighthouse & Marina', distance: '1.8 km', type: 'Landmark', rating: 4.8 },
      { name: 'Taj Fort Aguada Resort & Spa', distance: '1.2 km', type: 'Hospitality', rating: 4.9 },
      { name: 'Manohar International Airport, Mopa (GOX)', distance: '38 km', type: 'Airport', rating: 4.8 },
      { name: 'Dabolim International Airport (GOI)', distance: '36 km', type: 'Airport', rating: 4.7 }
    ],
    legalSection: {
      ecStatus: '30-Year Freehold Nil Encumbrance Certified by Goa Bar Advocates',
      reraNumber: 'GOARERA092491',
      ownershipVerification: 'Goa Coastal Zone Management Authority (GCZMA) Verified NOC'
    },
    areaInsights: {
      areaName: 'Candolim Coast, North Goa',
      areaAvgPriceSqFt: 27200,
      last1YearGrowth: 19.5,
      demandScore: 9.6,
      investmentScore: 9.5
    },
    agent: AGENTS_DATA[1],
    createdAt: '2026-03-11'
  },
  {
    id: 'prop-19',
    title: 'The Vembanad Lakefront Palms Sanctuary',
    slug: 'the-vembanad-lakefront-palms-sanctuary',
    tagline: 'Waterfront Kerala Nalukettu estate with private yacht marina slip on Vembanad Lake',
    description: 'An idyllic 2.2-acre private peninsula estate on the tranquil backwaters of Vembanad Lake. Designed in harmony with classical Kerala Nalukettu architecture featuring teakwood pillars, brass accents, open central Nadumuttam courtyard, modern air-conditioned suites, infinity pool merging with the lake horizon, and private wooden boardwalk with motor yacht mooring jetty.',
    price: 145000000,
    originalPrice: 155000000,
    currency: '₹',
    type: 'buy',
    category: 'Waterfront Estate',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    rating: 4.95,
    reviewCount: 18,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7200,
    garages: 3,
    yearBuilt: 2023,
    address: {
      street: 'Lakefront Peninsula Drive',
      neighborhood: 'Kumarakom - Kochi Corridor',
      city: 'Kochi',
      state: 'Kerala',
      zipCode: '686563',
      country: 'India',
      lat: 9.6175,
      lng: 76.4300
    },
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-nadumuttam',
        name: 'Central Courtyard (Nadumuttam)',
        panoramaUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=90',
        description: 'Open-to-sky raindrops courtyard framed by carved Anjili teak pillars and brass oil lamps.'
      }
    ],
    amenities: [
      '2.2-Acre Private Backwater Peninsula',
      'Deep-Water Motor Yacht Mooring Jetty',
      'Traditional Kerala Nadumuttam Architecture',
      'Infinity Pool Merging with Lake Horizon',
      'Ayurvedic Wellness Spa Pavilion',
      'Solar Powered Eco-Estate Design',
      'Organic Tropical Fruit & Spice Garden',
      'Inland Waterways Authority Clear NOC'
    ],
    nearby: [
      { name: 'Kumarakom Bird Sanctuary Nature Reserve', distance: '1.5 km', type: 'Park', rating: 4.8 },
      { name: 'Kochi Marine Drive Promenade', distance: '38 km', type: 'Lifestyle', rating: 4.7 },
      { name: 'Aster Medcity Multi-Specialty Hospital', distance: '42 km', type: 'Hospital', rating: 4.9 },
      { name: 'Cochin International Airport (COK)', distance: '72 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '40-Year Freehold Title Verified by Menon & Pai Associates',
      reraNumber: 'K-RERA/PRJ/2024/091',
      ownershipVerification: 'Clear Agricultural to Residential Conversion & Freehold Patta'
    },
    areaInsights: {
      areaName: 'Vembanad Backwaters, Kerala',
      areaAvgPriceSqFt: 20100,
      last1YearGrowth: 15.1,
      demandScore: 9.3,
      investmentScore: 9.1
    },
    agent: AGENTS_DATA[3],
    createdAt: '2026-03-09'
  },
  {
    id: 'prop-20',
    title: 'The Udaipur Mewar Royal Haveli Estate',
    slug: 'the-udaipur-mewar-royal-haveli-estate',
    tagline: 'Regal lakeside heritage palace estate overlooking Lake Pichola and City Palace',
    description: 'Embodying the grandeur of Rajput royalty, this authentic lakeside palace estate offers front-row views of Lake Pichola and the City Palace of Udaipur. Meticulously handcrafted by master artisans with Makrana white marble jharokhas, fresco-painted domes, central marble fountain courtyards, private sunset rooftop terrace, royal banquet hall, and temperature-controlled indoor marble swimming pool.',
    price: 420000000,
    originalPrice: 460000000,
    currency: '₹',
    type: 'buy',
    category: 'Historic Manor',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 5.0,
    reviewCount: 26,
    bedrooms: 7,
    bathrooms: 9,
    areaSqFt: 12500,
    garages: 5,
    yearBuilt: 2024,
    address: {
      street: 'Lake Palace Road, Heritage Quarter',
      neighborhood: 'Lake Pichola',
      city: 'Udaipur',
      state: 'Rajasthan',
      zipCode: '313001',
      country: 'India',
      lat: 24.5764,
      lng: 73.6835
    },
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-jharokha-terrace',
        name: 'Mewar Sunset Terrace & Jharokhas',
        panoramaUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=90',
        description: 'Ornate white Makrana marble stone balconies overlooking the shimmering waters of Lake Pichola.'
      }
    ],
    amenities: [
      'Unobstructed Lake Pichola & City Palace Views',
      'Authentic Makrana Marble Jharokhas & Carvings',
      'Heated Indoor Royal Marble Swimming Pool',
      'Fresco-Adorned Banquet Ballroom',
      'Private High-Speed Boat Moorings',
      'Courtyard Lotus Fountains & Zen Pavilions',
      'Heritage Conservation Bureau Approved',
      'Antique Chandelier & Gilded Architecture'
    ],
    nearby: [
      { name: 'City Palace Complex & Museum', distance: '600 m', type: 'Heritage', rating: 5.0 },
      { name: 'Taj Lake Palace Luxury Resort', distance: '400 m (by boat)', type: 'Hospitality', rating: 5.0 },
      { name: 'Jag Mandir Island Palace', distance: '1.1 km', type: 'Landmark', rating: 4.9 },
      { name: 'Maharana Pratap Airport (UDR)', distance: '24 km', type: 'Airport', rating: 4.7 }
    ],
    legalSection: {
      ecStatus: '50-Year Verified Mewar Heritage Freehold Title',
      reraNumber: 'RAJ/RERA/UD/2024/0042',
      ownershipVerification: 'Urban Improvement Trust (UIT) Sanctioned & Heritage Board Clear'
    },
    areaInsights: {
      areaName: 'Lake Pichola, Udaipur',
      areaAvgPriceSqFt: 33600,
      last1YearGrowth: 16.8,
      demandScore: 9.8,
      investmentScore: 9.5
    },
    agent: AGENTS_DATA[0],
    createdAt: '2026-03-04'
  },
  {
    id: 'prop-21',
    title: 'The ECR Coral Bay Beach Villa',
    slug: 'the-ecr-coral-bay-beach-villa',
    tagline: 'Contemporary beachfront villa with infinity pool directly on Chennai’s Golden Coast',
    description: 'Nestled along the prestigious East Coast Road (ECR) in Akkarai, this 8,400 sq.ft architectural residence offers uninterrupted panoramic views of the Bay of Bengal with private direct beach access. Featuring expansive glass walls, imported Travertine facades, an elevated sea-facing infinity edge pool, private home theater, biometric elevator, and manicured coastal coconut lawns.',
    price: 220000000,
    originalPrice: 240000000,
    currency: '₹',
    type: 'buy',
    category: 'Waterfront Estate',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 4.96,
    reviewCount: 27,
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 8400,
    garages: 4,
    yearBuilt: 2025,
    address: {
      street: 'Coral Drive, 4th Seaward Road',
      neighborhood: 'Akkarai, ECR',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600119',
      country: 'India',
      lat: 12.9010,
      lng: 80.2520
    },
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-bay-terrace',
        name: 'Bay of Bengal Beachfront Deck',
        panoramaUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=90',
        description: 'Sunken lounge and infinity edge pool looking onto the breaking waves of Akkarai beach.'
      }
    ],
    amenities: [
      'Direct Private Beach Access Path',
      'Elevated Infinity Edge Pool',
      'Panoramic Bay of Bengal Oceanfront Views',
      'Italian Travertine & Teak Wood Facade',
      'Biometric Keyless Access Control',
      'Private 4K Dolby Home Theater',
      'CMDA Approved & CRZ Permitted',
      'Solar Power with Battery Storage'
    ],
    nearby: [
      { name: 'Akkarai Beachfront & Promenade', distance: '100 m', type: 'Beach', rating: 4.9 },
      { name: 'OMR Sholinganallur IT Tech Corridor', distance: '3.5 km', type: 'Tech Park', rating: 4.8 },
      { name: 'Apollo Speciality Hospital OMR', distance: '6.2 km', type: 'Hospital', rating: 4.9 },
      { name: 'Mayajaal Multiplex & Entertainment Enclave', distance: '4.8 km', type: 'Entertainment', rating: 4.6 },
      { name: 'Chennai International Airport (MAA)', distance: '19 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '35-Year Nil Encumbrance Certified by Madras High Court Advocates',
      reraNumber: 'TN/01/Building/7819/2024',
      ownershipVerification: 'CMDA Planning Permit No. 892/2024 • Patta Registered'
    },
    areaInsights: {
      areaName: 'Akkarai, ECR Chennai',
      areaAvgPriceSqFt: 26190,
      last1YearGrowth: 18.2,
      demandScore: 9.7,
      investmentScore: 9.3
    },
    agent: AGENTS_DATA[4], // R. Senthil Nathan
    createdAt: '2026-03-12'
  },
  {
    id: 'prop-22',
    title: 'The GIFT City Horizon Sky Penthouse',
    slug: 'the-gift-city-horizon-sky-penthouse',
    tagline: 'Next-gen automated smart duplex penthouse in India’s premier international financial hub',
    description: 'Perched on the 34th floor of a landmark tower in Gujarat International Finance Tec-City (GIFT City), this 7,100 sq.ft duplex penthouse represents the future of Indian luxury living. Complete with automated AI climate management, private cantilevered sky garden overlooking the Sabarmati riverfront, triple-height atrium, Gaggenau kitchen, and access to private business helipad and executive boardroom.',
    price: 165000000,
    originalPrice: 180000000,
    currency: '₹',
    type: 'buy',
    category: 'Duplex Penthouse',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    rating: 4.93,
    reviewCount: 16,
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 7100,
    garages: 3,
    yearBuilt: 2025,
    address: {
      street: 'GIFT One Tower, Global Financial Corridor',
      neighborhood: 'GIFT City',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '382355',
      country: 'India',
      lat: 23.1610,
      lng: 72.6840
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-gift-skyline',
        name: 'GIFT City Skyline Atrium',
        panoramaUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=90',
        description: 'Triple-height glass atrium framing the GIFT City smart skyline and Sabarmati river.'
      }
    ],
    amenities: [
      'Cantilevered Sky Garden Terrace',
      'Automated IoT Smart Climate & Glass',
      'Direct Access to Rooftop Business Helipad',
      'Sabarmati Riverfront Panoramic Vistas',
      'Gaggenau & Sub-Zero Fitted Culinary Salon',
      'High-Speed Dedicated Private Elevator',
      'Special Economic Zone (SEZ) Benefits',
      'GujRERA Registered Freehold Title'
    ],
    nearby: [
      { name: 'International Financial Services Centre (IFSC)', distance: '400 m', type: 'Business', rating: 5.0 },
      { name: 'GIFT City Club & Golf Fairways', distance: '1.2 km', type: 'Sports', rating: 4.8 },
      { name: 'Sabarmati Riverfront Promenade', distance: '2.5 km', type: 'Park', rating: 4.9 },
      { name: 'Sardar Vallabhbhai Patel International Airport (AMD)', distance: '18 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '30-Year Clear Freehold Verified by Singhi & Co.',
      reraNumber: 'PR/GJ/GANDHINAGAR/2024/912',
      ownershipVerification: 'GIFT City Special Planning Authority (SPA) Sanctioned'
    },
    areaInsights: {
      areaName: 'GIFT City, Gandhinagar - Ahmedabad',
      areaAvgPriceSqFt: 23200,
      last1YearGrowth: 21.0,
      demandScore: 9.9,
      investmentScore: 9.8
    },
    agent: AGENTS_DATA[2],
    createdAt: '2026-03-14'
  },
  {
    id: 'prop-23',
    title: 'The Boat Club Colonial Heritage Manor',
    slug: 'the-boat-club-colonial-heritage-manor',
    tagline: 'Aristocratic Palladian residence with century-old banyan canopies on Chennai’s iconic Billionaires’ Row',
    description: 'An extraordinarily rare offering on Boat Club Road in R.A. Puram, the most coveted and tightly held pin code in South India. Spanning an expansive 16 grounds (approx 38,400 sq.ft) of lush private grounds along the Adyar riverfront, this stately Palladian colonial manor features sweeping classical porticos, Burma teak double-doors, hand-cut Belgian crystal chandeliers, 6 palatial bedroom suites, a 25-meter temperature-regulated pool, formal banquet ballroom, separate chauffeur and staff quarters, and comprehensive embassy-grade biometric perimeter protection.',
    price: 850000000,
    originalPrice: 920000000,
    currency: '₹',
    type: 'buy',
    category: 'Historic Manor',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 5.0,
    reviewCount: 22,
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 11500,
    garages: 6,
    yearBuilt: 2024,
    address: {
      street: '14 Boat Club Road, Raja Annamalaipuram',
      neighborhood: 'Boat Club, R.A. Puram',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600028',
      country: 'India',
      lat: 13.0245,
      lng: 80.2465
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-boat-foyer',
        name: 'Grand Palladian Portico & Foyer',
        panoramaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
        description: 'Double-height reception portico with custom Burma teak woodwork and imported Italian marble colonnades.',
        hotspots: [
          { id: 'hs-boat-1', title: 'Burma Teak Joinery', x: 30, y: 55, description: 'Handcrafted seasoned Burma teak entrance portal.' },
          { id: 'hs-boat-2', title: 'Belgian Crystal Chandelier', x: 65, y: 35, description: 'Antique custom-restored crystal lighting masterpiece.' }
        ]
      },
      {
        id: 'room-boat-lawn',
        name: 'Adyar Riverfront Verandah & Lawns',
        panoramaUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90',
        description: 'Wraparound verandah overlooking sprawling heritage gardens, ancient banyans, and the private 25m swimming pool.',
        hotspots: [
          { id: 'hs-boat-3', title: '25m Lap Pool', x: 50, y: 65, description: 'Temperature-controlled lap pool framed by frangipani trees.' }
        ]
      }
    ],
    amenities: [
      'Private 16-Ground Freehold Land Parcel',
      '25-Meter Heated Lap Pool & Poolhouse',
      'Burma Teak Architectural Joinery',
      'Belgian Crystal Chandeliers & Statuario Marble',
      'Subterranean 6-Car Climate Controlled Garage',
      '100% DG Power Backup & Solar Microgrid',
      'Dedicated 4-Bedroom Staff & Security Annex',
      'RERA Approved & Clear Patta Title'
    ],
    nearby: [
      { name: 'Madras Boat Club & Adyar River', distance: '250 m', type: 'Club', rating: 5.0 },
      { name: 'The Leela Palace Chennai Luxury Hotel', distance: '1.8 km', type: 'Hotel', rating: 4.9 },
      { name: 'Apollo Hospitals Greams Road Specialist Center', distance: '4.5 km', type: 'Hospital', rating: 4.9 },
      { name: 'Chettinad Vidyashram & Sishya Schools', distance: '1.2 km', type: 'School', rating: 5.0 },
      { name: 'Chennai International Airport (MAA)', distance: '11 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '50-Year Nil Encumbrance Certified by King & Partridge Law Firm',
      reraNumber: 'TN/01/Building/8412/2024',
      ownershipVerification: 'CMDA Planning Permit No. 1042/2024 • Freehold Clear Patta'
    },
    areaInsights: {
      areaName: 'Boat Club Road, R.A. Puram, Chennai',
      areaAvgPriceSqFt: 58000,
      last1YearGrowth: 15.8,
      demandScore: 10.0,
      investmentScore: 9.8
    },
    agent: AGENTS_DATA[4],
    createdAt: '2026-03-15'
  },
  {
    id: 'prop-24',
    title: 'The Poes Garden Sovereign Villa',
    slug: 'the-poes-garden-sovereign-villa',
    tagline: 'Contemporary tropical sanctuary with serene central courtyard in Chennai’s VVIP power enclave',
    description: 'Situated in the ultra-exclusive diplomatic neighborhood of Poes Garden in Alwarpet, this 9,200 sq.ft contemporary architectural villa represents the pinnacle of modern urban sophistication. Designed around an open-to-sky central courtyard with koi ponds and floating vertical gardens, the home showcases Italian Statuario marble floors, motorized acoustic glass walls, a private Otis glass elevator, rooftop heated infinity jacuzzi, custom Poggenpohl kitchen with Miele appliances, and full Lutron circadian smart automation.',
    price: 620000000,
    originalPrice: 660000000,
    currency: '₹',
    type: 'buy',
    category: 'Luxury Villa',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    isHot: true,
    rating: 4.97,
    reviewCount: 19,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 9200,
    garages: 4,
    yearBuilt: 2025,
    address: {
      street: '8 Poes Garden, Off Binny Road, Alwarpet',
      neighborhood: 'Poes Garden, Alwarpet',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600086',
      country: 'India',
      lat: 13.0482,
      lng: 80.2525
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-poes-salon',
        name: 'Double-Height Living Pavilion',
        panoramaUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90',
        description: 'Dramatic 22ft ceiling living space opening seamlessly to the private courtyard reflection pool.',
        hotspots: [
          { id: 'hs-poes-1', title: 'Reflective Koi Pond', x: 40, y: 60, description: 'Sunken courtyard water court with natural granite stones.' }
        ]
      },
      {
        id: 'room-poes-master',
        name: 'Presidential Master Suite',
        panoramaUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=90',
        description: 'Expansive private suite with walk-in Poliform boutique closet and bookmatched marble ensuite bath.'
      }
    ],
    amenities: [
      'Central Open-Sky Courtyard & Water Cascade',
      'Private Hydraulic Glass Capsule Elevator',
      'Rooftop Heated Jacuzzi & Lounge Terrace',
      'Lutron HomeWorks QSX Lighting Automation',
      'Custom Poggenpohl & Gaggenau Chef Kitchen',
      '24/7 Monitored VVIP Security Perimeter',
      'Soundproof Dolby Atmos Screening Salon',
      'German Acoustic Double-Glazed Facade'
    ],
    nearby: [
      { name: 'Semmozhi Poonga Botanical Garden', distance: '850 m', type: 'Park', rating: 4.8 },
      { name: 'Taj Coromandel Luxury Hotel', distance: '1.4 km', type: 'Hotel', rating: 4.9 },
      { name: 'Apollo Speciality Hospital Greams Road', distance: '2.8 km', type: 'Hospital', rating: 4.9 },
      { name: 'Express Avenue & Luxury Boutiques', distance: '2.5 km', type: 'Shopping', rating: 4.8 },
      { name: 'Chennai International Airport (MAA)', distance: '13 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '40-Year Clean Freehold Verified by Senior Advocates of Madras High Court',
      reraNumber: 'TN/01/Building/6920/2024',
      ownershipVerification: 'Greater Chennai Corporation (GCC) Sanctioned Plan • Freehold Patta'
    },
    areaInsights: {
      areaName: 'Poes Garden, Alwarpet, Chennai',
      areaAvgPriceSqFt: 46500,
      last1YearGrowth: 14.2,
      demandScore: 9.9,
      investmentScore: 9.6
    },
    agent: AGENTS_DATA[4],
    createdAt: '2026-03-16'
  },
  {
    id: 'prop-25',
    title: 'The OMR Bayview Sky Palace Penthouse',
    slug: 'the-omr-bayview-sky-palace-penthouse',
    tagline: 'Sky-high duplex penthouse with cantilevered pool and 360° views over Buckingham Canal & Bay of Bengal',
    description: 'Crowning the 32nd and 33rd floors of Chennai’s most iconic tech-corridor residential tower in Sholinganallur, this 7,800 sq.ft duplex sky palace combines cosmopolitan modernism with resort-style privacy. Boasting double-height 24-foot living glass walls, a private cantilevered glass-bottom heated plunge pool, dedicated private high-speed elevator, bespoke wine cellar, Sub-Zero & Wolf culinary suite, and an expansive wraparound sunset terrace framing sea breezes and sparkling city lights.',
    price: 185000000,
    originalPrice: 200000000,
    currency: '₹',
    type: 'buy',
    category: 'Duplex Penthouse',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    rating: 4.95,
    reviewCount: 24,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7800,
    garages: 4,
    yearBuilt: 2025,
    address: {
      street: 'Tower One, Penthouse 32A, Rajiv Gandhi Salai (OMR)',
      neighborhood: 'Sholinganallur, OMR',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600119',
      country: 'India',
      lat: 12.9030,
      lng: 80.2285
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-omr-sky',
        name: '32nd-Floor Sky Living Gallery',
        panoramaUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=90',
        description: 'Breathtaking double-height salon framing 360-degree views of the OMR skyline and the Bay of Bengal.'
      },
      {
        id: 'room-omr-pool',
        name: 'Cantilevered Sunset Sky Pool',
        panoramaUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=90',
        description: 'Glass-edge infinity plunge pool jutting out over the skyline with private sun lounger deck.'
      }
    ],
    amenities: [
      'Private Cantilevered Glass-Bottom Sky Pool',
      'Direct High-Speed Private Keycard Elevator',
      'Double-Height 24ft Acoustic Glazed Salon',
      'Temperature-Controlled 600-Bottle Wine Vault',
      'Sub-Zero & Wolf Professional Appliances',
      '4 Covered Reserved Car Parks with Fast EV Chargers',
      'Private Resident Sky Lounge & Helipad Access',
      'RERA Approved Grade-A Landmark Development'
    ],
    nearby: [
      { name: 'ELCOT SEZ Tech Park & Infosys Campus', distance: '800 m', type: 'Tech Park', rating: 4.8 },
      { name: 'Upcoming CMRL Sholinganallur Metro Junction', distance: '450 m', type: 'Transit', rating: 4.9 },
      { name: 'Apollo Cradle & Specialty Hospital OMR', distance: '1.8 km', type: 'Hospital', rating: 4.8 },
      { name: 'Marina Mall & PVR INOX Cinema', distance: '5.2 km', type: 'Shopping', rating: 4.7 },
      { name: 'Chennai International Airport (MAA)', distance: '16 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '30-Year Encumbrance Certified by Trilegal',
      reraNumber: 'TN/01/Building/5519/2023',
      ownershipVerification: 'CMDA High-Rise Planning Sanction • Individual Undivided Share (UDS) Deeded'
    },
    areaInsights: {
      areaName: 'Sholinganallur, OMR Chennai',
      areaAvgPriceSqFt: 18500,
      last1YearGrowth: 17.5,
      demandScore: 9.8,
      investmentScore: 9.5
    },
    agent: AGENTS_DATA[4],
    createdAt: '2026-03-17'
  },
  {
    id: 'prop-26',
    title: 'The Besant Oceanfront Zen Sanctuary',
    slug: 'the-besant-oceanfront-zen-sanctuary',
    tagline: 'Serene coastal architectural villa steps from Elliot’s Beach with lush tropical garden courtyards',
    description: 'Situated in the artistic and peaceful neighborhood of Kalakshetra Colony in Besant Nagar, this 6,900 sq.ft coastal sanctuary blends minimalist contemporary architecture with indigenous South Indian craft. Nestled amidst towering coconut palms and frangipani blossoms just 150 meters from Elliot’s Beach, the home features natural Kota stone and teak wood finishes, private saltwater lap pool, open-to-sky monsoon courtyards, yoga deck, rooftop stargazing pavilion, and zero-carbon solar battery power.',
    price: 360000000,
    originalPrice: 390000000,
    currency: '₹',
    type: 'buy',
    category: 'Waterfront Estate',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    rating: 4.98,
    reviewCount: 21,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 6900,
    garages: 3,
    yearBuilt: 2024,
    address: {
      street: '12 Beach Road, Kalakshetra Colony, Besant Nagar',
      neighborhood: 'Kalakshetra Colony, Besant Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600090',
      country: 'India',
      lat: 12.9985,
      lng: 80.2718
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-besant-verandah',
        name: 'Ocean Breeze Verandah & Courtyard',
        panoramaUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=90',
        description: 'Teak-decked coastal lounge flowing directly to the central saltwater pool and tropical frangipani courtyard.'
      },
      {
        id: 'room-besant-stargaze',
        name: 'Rooftop Stargazing Pavilion',
        panoramaUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=90',
        description: 'Open-air coastal terrace catching year-round sea breezes with panoramic views of the Bay of Bengal.'
      }
    ],
    amenities: [
      '150 Meters from Elliot’s Beach Promenade',
      'Private Saltwater Lap Pool with Sun Deck',
      'Open-Air Monsoon Courtyards & Water Wall',
      'Natural Kota Stone & Burma Teak Craftsmanship',
      '100% Net-Metered Solar Rooftop Grid',
      'Dedicated Rooftop Yoga & Meditation Shala',
      'Biometric Security & Automated Entry Gate',
      'Sweet Potable Groundwater & Rainwater Harvesting'
    ],
    nearby: [
      { name: 'Elliot’s Beach & Promenade', distance: '150 m', type: 'Beach', rating: 4.9 },
      { name: 'Kalakshetra Foundation & Arts Academy', distance: '600 m', type: 'Culture', rating: 5.0 },
      { name: 'Besant Nagar Gourmet Cafes & Artisanal Bakeries', distance: '350 m', type: 'Dining', rating: 4.8 },
      { name: 'Fortis Malar Multi-Speciality Hospital Adyar', distance: '2.4 km', type: 'Hospital', rating: 4.7 },
      { name: 'Chennai International Airport (MAA)', distance: '14 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '35-Year Encumbrance Certified with Zero Discrepancy',
      reraNumber: 'TN/01/Building/6281/2024',
      ownershipVerification: 'CMDA Coastal Regulatory Zone (CRZ) Clearance • Clear Freehold Title'
    },
    areaInsights: {
      areaName: 'Besant Nagar, Chennai',
      areaAvgPriceSqFt: 34500,
      last1YearGrowth: 13.9,
      demandScore: 9.8,
      investmentScore: 9.4
    },
    agent: AGENTS_DATA[4],
    createdAt: '2026-03-18'
  },
  {
    id: 'prop-27',
    title: 'The Anna Nagar Royal Crest Villa',
    slug: 'the-anna-nagar-royal-crest-villa',
    tagline: 'Stately multi-level independent luxury residence with private elevator and landscaped rooftop garden',
    description: 'Located in the prime residential grid of Anna Nagar West along 2nd Avenue, this 6,400 sq.ft independent luxury residence sits on a 4,800 sq.ft corner freehold plot. Boasting an auspicious North-East Vastu layout, the villa features Italian Statuario marble floors, private Mitsubishi elevator across all three levels, 5-car subterranean parking, dedicated 4K home cinema salon, automated Kohler sensory bathrooms, open terrace banquet pavilion, and 100% solar power backup.',
    price: 280000000,
    originalPrice: 310000000,
    currency: '₹',
    type: 'buy',
    category: 'Luxury Villa',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    rating: 4.94,
    reviewCount: 17,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 6400,
    garages: 5,
    yearBuilt: 2025,
    address: {
      street: 'Plot 42, 2nd Avenue, Shanti Colony Link',
      neighborhood: 'Anna Nagar West',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600040',
      country: 'India',
      lat: 13.0855,
      lng: 80.2110
    },
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-anna-salon',
        name: 'Grand Marble Reception Salon',
        panoramaUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=90',
        description: 'Palatial formal living room with imported Statuario marble flooring and custom teak woodwork.'
      },
      {
        id: 'room-anna-cinema',
        name: 'Private 4K Dolby Cinema Room',
        panoramaUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90',
        description: 'Acoustically isolated cinema with recliners and 140-inch laser projection.'
      }
    ],
    amenities: [
      'Private 4,800 Sq.Ft Corner Freehold Land Plot',
      'Private Mitsubishi Hydraulic Home Elevator',
      'Vastu-Compliant Auspicious North-East Entry',
      'Imported Statuario Italian Marble Throughout',
      'Subterranean 5-Car Garage with EV Stalls',
      'Landscaped Rooftop Terrace Banquet Lounge',
      '24/7 Smart Video Door Surveillance & Alarms',
      'Potable Sweet Water at 40ft & Corporation Line'
    ],
    nearby: [
      { name: 'Anna Nagar Tower Park & Promenade', distance: '650 m', type: 'Park', rating: 4.8 },
      { name: 'Anna Nagar Roundtana Metro Station', distance: '800 m', type: 'Transit', rating: 4.9 },
      { name: 'VR Chennai Mega Shopping & Luxury Mall', distance: '1.9 km', type: 'Shopping', rating: 4.9 },
      { name: 'MGM Healthcare Multi-Speciality Hospital', distance: '2.5 km', type: 'Hospital', rating: 4.8 },
      { name: 'Chennai International Airport (MAA)', distance: '15 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '30-Year Nil Encumbrance Certified by Madras High Court Advocates',
      reraNumber: 'TN/01/Building/7310/2024',
      ownershipVerification: 'Greater Chennai Corporation (GCC) Sanctioned Plan • Freehold Patta'
    },
    areaInsights: {
      areaName: 'Anna Nagar, Chennai',
      areaAvgPriceSqFt: 28500,
      last1YearGrowth: 12.8,
      demandScore: 9.7,
      investmentScore: 9.3
    },
    agent: AGENTS_DATA[4],
    createdAt: '2026-03-19'
  },
  {
    id: 'prop-28',
    title: 'The Covelong Laguna Backwater & Ocean Villa',
    slug: 'the-covelong-laguna-backwater-ocean-villa',
    tagline: 'Contemporary tropical waterfront estate with private boat jetty on Covelong backwaters and ocean views',
    description: 'Enviably located where the tranquil Muttukadu backwaters meet the rolling surf of the Bay of Bengal in Covelong, this 5,800 sq.ft private estate is an entertainer’s paradise. Designed in open tropical Balinese pavilion architecture, it features a private wooden boat jetty for catamarans and jet-skis, negative-edge freshwater pool, panoramic sun decks, organic tropical fruit orchards, private chef kitchen, and seamless connectivity to the scenic ECR coastal highway.',
    price: 145000000,
    originalPrice: 160000000,
    currency: '₹',
    type: 'buy',
    category: 'Waterfront Estate',
    status: 'For Sale',
    isFeatured: true,
    isVerified: true,
    rating: 4.92,
    reviewCount: 15,
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 5800,
    garages: 3,
    yearBuilt: 2025,
    address: {
      street: 'Covelong Beach Road, Near Taj Fisherman’s Cove',
      neighborhood: 'Muttukadu - Covelong, ECR',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '603112',
      country: 'India',
      lat: 12.7930,
      lng: 80.2515
    },
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    virtualTourRooms: [
      {
        id: 'room-covelong-deck',
        name: 'Waterfront Sundeck & Pool',
        panoramaUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2000&q=90',
        description: 'Expansive timber sun terrace facing the backwater lagoon and private boat jetty.'
      },
      {
        id: 'room-covelong-living',
        name: 'Tropical Living Pavilion',
        panoramaUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2000&q=90',
        description: 'Open living room with timber beams and panoramic floor-to-ceiling glass on both waterfronts.'
      }
    ],
    amenities: [
      'Private Wooden Boat Jetty & Watersports Dock',
      'Negative-Edge Waterfront Swimming Pool',
      'Backwater Lagoon & Ocean Horizon Vistas',
      'Balinese Tropical Teak Open Pavilion Style',
      'Organic Mango & Coconut Orchard Grounds',
      'Solar Hybrid Grid with Battery Backup',
      'Gated Private Community with 24/7 Guards',
      'Clear DTCP & Coastal Clear Title'
    ],
    nearby: [
      { name: 'Covelong Point Surfing School & Beach', distance: '400 m', type: 'Beach', rating: 4.9 },
      { name: 'Taj Fisherman’s Cove Resort & Spa', distance: '1.1 km', type: 'Resort', rating: 4.9 },
      { name: 'Muttukadu Boat House & Water Sports Club', distance: '2.5 km', type: 'Recreation', rating: 4.7 },
      { name: 'Chettinad Health City Super Speciality Hospital', distance: '8.5 km', type: 'Hospital', rating: 4.8 },
      { name: 'Chennai International Airport (MAA)', distance: '28 km', type: 'Airport', rating: 4.8 }
    ],
    legalSection: {
      ecStatus: '30-Year Encumbrance Certified by Chengalpattu Registrar',
      reraNumber: 'TN/01/Building/4910/2024',
      ownershipVerification: 'DTCP Layout & CRZ Sanctioned • Patta Freehold'
    },
    areaInsights: {
      areaName: 'Covelong - Muttukadu, ECR Chennai',
      areaAvgPriceSqFt: 19800,
      last1YearGrowth: 19.5,
      demandScore: 9.6,
      investmentScore: 9.4
    },
    agent: AGENTS_DATA[4],
    createdAt: '2026-03-20'
  }
];

