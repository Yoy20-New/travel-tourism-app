// Static sample data for development/testing
export const sampleGuides = [
  {
    id: '1',
    user: {
      id: '1',
      email: 'maria@example.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      role: 'GUIDE'
    },
    bio: 'Passionate about sharing the rich cultural heritage of our region. Specializes in ancient temples, traditional crafts, and local cuisine.',
    specializations: ['Cultural Heritage', 'Ancient Temples', 'Traditional Crafts', 'Local Cuisine'],
    languages: ['English', 'Spanish', 'French'],
    experience: 8,
    rating: 4.9,
    totalBookings: 127,
    pricePerHour: 45,
    isVerified: true,
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
    certifications: ['Certified Tourism Guide', 'Cultural Heritage Expert']
  },
  {
    id: '2',
    user: {
      id: '2',
      email: 'carlos@example.com',
      firstName: 'Carlos',
      lastName: 'Rodriguez',
      role: 'GUIDE'
    },
    bio: 'Expert local guide with 10 years of experience. Passionate about cultural heritage and hidden gems.',
    specializations: ['Cultural Sites', 'Hidden Gems', 'Local History'],
    languages: ['English', 'Spanish'],
    experience: 10,
    rating: 4.7,
    totalBookings: 89,
    pricePerHour: 40,
    isVerified: true,
    photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'],
    certifications: ['Certified Tourism Guide']
  }
]

export const samplePackages = [
  {
    id: '1',
    name: 'Cultural Heritage Experience',
    description: 'Immerse yourself in authentic cultural traditions with visits to ancient sites, artisan workshops, and local ceremonies.',
    type: 'CULTURAL_IMMERSION',
    price: 299,
    duration: 3,
    features: [
      'Professional local guide',
      'Traditional lunch included',
      'Artisan workshop experience',
      'Temple ceremony participation',
      'Transportation included'
    ],
    inclusions: [
      'All entrance fees',
      'Traditional meals',
      'Professional photography',
      'Cultural ceremony participation',
      'Artisan-made souvenir'
    ],
    exclusions: [
      'Personal expenses',
      'Travel insurance',
      'Alcoholic beverages'
    ],
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    maxParticipants: 8,
    difficulty: 'EASY',
    culturalHighlights: [
      'Ancient Temple Complex',
      'Traditional Pottery Workshop',
      'Local Music Performance',
      'Sacred Ceremony Participation'
    ]
  }
]

export const sampleCulturalSites = [
  {
    id: '1',
    name: 'Ancient Temple of Wisdom',
    description: 'A magnificent temple complex dating back to the 12th century, showcasing traditional architecture and spiritual heritage.',
    type: 'RELIGIOUS_SITE',
    latitude: 40.7589,
    longitude: -73.9851,
    address: '123 Heritage Street, Cultural District',
    culturalSignificance: 'Sacred site for pilgrims and center of traditional ceremonies',
    historicalPeriod: '12th Century',
    entryFee: 15,
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
      'https://images.unsplash.com/photo-1585339277909-b4db2d745e87?w=800'
    ],
    facts: [
      'Built without modern machinery over 20 years',
      'Contains over 1000 hand-carved sculptures',
      'Survived multiple earthquakes due to unique construction'
    ],
    localInsights: [
      'Best visited during sunrise for magical lighting',
      'Local monks offer blessing ceremonies on weekends',
      'Hidden meditation chamber behind the main altar'
    ],
    isHiddenGem: false,
    rating: 4.8
  }
]
