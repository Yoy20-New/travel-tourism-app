import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        passwordHash: await hash('password123', 12),
        isEmailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'guide@example.com',
        firstName: 'Maria',
        lastName: 'Garcia',
        phone: '+1234567891',
        role: 'GUIDE',
        passwordHash: await hash('password123', 12),
        isEmailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        passwordHash: await hash('admin123', 12),
        isEmailVerified: true,
      },
    }),
  ])

  // Create guide profiles
  const guides = await Promise.all([
    prisma.guide.create({
      data: {
        userId: users[1].id,
        bio: 'Passionate about sharing the rich cultural heritage of our region. Specializes in ancient temples, traditional crafts, and local cuisine.',
        specializations: ['Cultural Heritage', 'Ancient Temples', 'Traditional Crafts', 'Local Cuisine'],
        languages: ['English', 'Spanish', 'French'],
        experience: 8,
        rating: 4.9,
        totalBookings: 127,
        pricePerHour: 45.0,
        isVerified: true,
        photos: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        ],
        certifications: ['Certified Tourism Guide', 'Cultural Heritage Expert'],
      },
    }),
  ])

  // Create more sample guides
  for (let i = 2; i <= 6; i++) {
    const guideUser = await prisma.user.create({
      data: {
        email: `guide${i}@example.com`,
        firstName: `Guide`,
        lastName: `${i}`,
        role: 'GUIDE',
        passwordHash: await hash('password123', 12),
        isEmailVerified: true,
      },
    })

    await prisma.guide.create({
      data: {
        userId: guideUser.id,
        bio: `Expert local guide with ${i + 5} years of experience. Passionate about cultural heritage and hidden gems.`,
        specializations: ['Cultural Sites', 'Hidden Gems', 'Local History'],
        languages: ['English', 'Local Language'],
        experience: i + 5,
        rating: 4.5 + (Math.random() * 0.4),
        totalBookings: Math.floor(Math.random() * 200) + 50,
        pricePerHour: 35.0 + (Math.random() * 20),
        isVerified: true,
        photos: [
          `https://images.unsplash.com/photo-150700321116${i}-0a1dd7228f2d?w=400`,
        ],
        certifications: ['Certified Tourism Guide'],
      },
    })
  }

  // Create cultural sites
  const culturalSites = await Promise.all([
    prisma.culturalSite.create({
      data: {
        name: 'Ancient Temple of Wisdom',
        description: 'A magnificent temple complex dating back to the 12th century, showcasing traditional architecture and spiritual heritage.',
        type: 'RELIGIOUS_SITE',
        latitude: 40.7589,
        longitude: -73.9851,
        address: '123 Heritage Street, Cultural District',
        culturalSignificance: 'Sacred site for pilgrims and center of traditional ceremonies',
        historicalPeriod: '12th Century',
        entryFee: 15.0,
        images: [
          'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
          'https://images.unsplash.com/photo-1585339277909-b4db2d745e87?w=800',
        ],
        facts: [
          'Built without modern machinery over 20 years',
          'Contains over 1000 hand-carved sculptures',
          'Survived multiple earthquakes due to unique construction',
        ],
        localInsights: [
          'Best visited during sunrise for magical lighting',
          'Local monks offer blessing ceremonies on weekends',
          'Hidden meditation chamber behind the main altar',
        ],
        isHiddenGem: false,
        rating: 4.8,
      },
    }),
    prisma.culturalSite.create({
      data: {
        name: 'Secret Artisan Cave',
        description: 'Hidden cave system where local artisans have created pottery for over 500 years. Only accessible with local guides.',
        type: 'CAVE',
        latitude: 40.7505,
        longitude: -73.9934,
        address: 'Mountain Trail, Hidden Valley',
        culturalSignificance: 'Traditional pottery techniques passed down through generations',
        historicalPeriod: '16th Century - Present',
        entryFee: 25.0,
        images: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        ],
        facts: [
          'Natural cave system formed over millennia',
          'Home to 5 master pottery families',
          'Uses clay from sacred mountain springs',
        ],
        localInsights: [
          'Pottery workshops available by appointment',
          'Best examples found in the deepest chamber',
          'Local legend says the clay has healing properties',
        ],
        isHiddenGem: true,
        rating: 4.9,
      },
    }),
    prisma.culturalSite.create({
      data: {
        name: 'Heritage Museum',
        description: 'Comprehensive collection of local artifacts, traditional costumes, and interactive cultural exhibits.',
        type: 'MUSEUM',
        latitude: 40.7614,
        longitude: -73.9776,
        address: '456 Museum Avenue, Arts Quarter',
        culturalSignificance: 'Preserves and showcases regional cultural heritage',
        historicalPeriod: 'Various periods - 8th to 20th Century',
        entryFee: 12.0,
        images: [
          'https://images.unsplash.com/photo-1566127992404-346d784a7f7e?w=800',
        ],
        facts: [
          'Over 10,000 artifacts in collection',
          'Interactive virtual reality experiences',
          'Rotating exhibitions featuring local artists',
        ],
        localInsights: [
          'Free guided tours on Sundays',
          'Special night events during full moons',
          'Hidden archive open to researchers',
        ],
        isHiddenGem: false,
        rating: 4.6,
      },
    }),
  ])

  // Create travel packages
  const packages = await Promise.all([
    prisma.package.create({
      data: {
        name: 'Cultural Heritage Experience',
        description: 'Immerse yourself in authentic cultural traditions with visits to ancient sites, artisan workshops, and local ceremonies.',
        type: 'CULTURAL_IMMERSION',
        price: 299.0,
        duration: 3,
        features: [
          'Professional local guide',
          'Traditional lunch included',
          'Artisan workshop experience',
          'Temple ceremony participation',
          'Transportation included',
        ],
        inclusions: [
          'All entrance fees',
          'Traditional meals',
          'Professional photography',
          'Cultural ceremony participation',
          'Artisan-made souvenir',
        ],
        exclusions: [
          'Personal expenses',
          'Travel insurance',
          'Alcoholic beverages',
        ],
        images: [
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        ],
        maxParticipants: 8,
        difficulty: 'EASY',
        culturalHighlights: [
          'Ancient Temple Complex',
          'Traditional Pottery Workshop',
          'Local Music Performance',
          'Sacred Ceremony Participation',
        ],
      },
    }),
    prisma.package.create({
      data: {
        name: 'Hidden Gems Adventure',
        description: 'Discover secret locations known only to locals, including hidden caves, secluded temples, and artisan villages.',
        type: 'ADVENTURE',
        price: 450.0,
        duration: 5,
        features: [
          'Expert local guide',
          'Small group experience',
          'Off-the-beaten-path locations',
          'Traditional accommodations',
          'All meals included',
        ],
        inclusions: [
          'Accommodation for 4 nights',
          'All meals',
          'Transportation',
          'Guide services',
          'Special access permits',
        ],
        exclusions: [
          'International flights',
          'Personal gear',
          'Tips for guides',
        ],
        images: [
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
        ],
        maxParticipants: 6,
        difficulty: 'MODERATE',
        culturalHighlights: [
          'Secret Cave System',
          'Hidden Artisan Village',
          'Mountain Temple',
          'Traditional Ceremonies',
        ],
      },
    }),
  ])

  // Create sample trips
  await prisma.trip.create({
    data: {
      userId: users[0].id,
      tripNumber: 'TRP-001-2024',
      originName: 'Home',
      originLat: 40.7505,
      originLng: -73.9934,
      destName: 'Ancient Temple of Wisdom',
      destLat: 40.7589,
      destLng: -73.9851,
      startTime: new Date('2024-01-15T09:00:00Z'),
      endTime: new Date('2024-01-15T17:00:00Z'),
      mode: 'CAR',
      purpose: 'CULTURAL',
      notes: 'Visited with family for cultural exploration',
      isCompleted: true,
      companions: {
        create: [
          {
            name: 'Jane Doe',
            age: 32,
            relation: 'Spouse',
          },
          {
            name: 'Tommy Doe',
            age: 8,
            relation: 'Child',
          },
        ],
      },
    },
  })

  console.log('✅ Database seeding completed successfully!')
  console.log(`Created:`)
  console.log(`- ${users.length} users`)
  console.log(`- ${guides.length + 5} guides`)
  console.log(`- ${culturalSites.length} cultural sites`)
  console.log(`- ${packages.length} packages`)
  console.log(`- 1 sample trip`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
