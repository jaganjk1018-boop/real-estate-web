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
  }
];
