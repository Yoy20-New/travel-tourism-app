"use client"

import Link from 'next/link'
import { ArrowRightIcon, MapPinIcon } from '@heroicons/react/24/outline'

const highlights = [
  {
    id: 1,
    name: 'Ancient Cave Temples',
    location: 'Kerala, India',
    description: 'Discover thousand-year-old cave temples with intricate stone carvings and local legends.',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop&crop=center',
    type: 'Hidden Gem',
    culturalFacts: ['Built in 12th century', 'UNESCO World Heritage candidate', 'Local pilgrimage site'],
    isHidden: true,
  },
  {
    id: 2,
    name: 'Traditional Spice Markets',
    location: 'Kochi, India',
    description: 'Experience the aromatic world of ancient spice trading routes and local vendors.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop&crop=center',
    type: 'Cultural Site',
    culturalFacts: ['500+ years of spice trading', 'Colonial Portuguese influence', 'Local cooking workshops'],
    isHidden: false,
  },
  {
    id: 3,
    name: 'Backwater Village Communities',
    location: 'Alleppey, India',
    description: 'Connect with local fishing communities and learn traditional boat-making techniques.',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop&crop=center',
    type: 'Cultural Immersion',
    culturalFacts: ['Traditional fishing methods', 'Eco-friendly living', 'Ancient boat craftsmanship'],
    isHidden: true,
  },
]

export default function CulturalHighlights() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Featured{' '}
            <span className="text-cultural-gradient">Cultural Treasures</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore handpicked cultural sites, hidden gems, and authentic experiences 
            curated by our local guide community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {highlights.map((site) => (
            <div key={site.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <img 
                  src={site.image} 
                  alt={site.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    site.isHidden 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-cultural-100 text-cultural-800'
                  }`}>
                    {site.type}
                  </span>
                </div>
                {site.isHidden && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      🔒 Hidden Gem
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{site.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{site.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">{site.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Cultural Insights:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {site.culturalFacts.map((fact, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-primary-500 mt-1">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-2">
                  <Link 
                    href={`/cultural/${site.id}`}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium group-hover:gap-3 transition-all"
                  >
                    Explore Details
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/cultural" className="btn-cultural inline-flex items-center gap-2">
            Discover More Cultural Sites
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
