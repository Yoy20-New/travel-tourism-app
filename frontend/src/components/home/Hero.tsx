"use client"

import Link from 'next/link'
import { MapPinIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  return (
    <section className="hero-gradient min-h-screen flex items-center cultural-pattern">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-balance">
              Discover{' '}
              <span className="text-cultural-gradient">Cultural Treasures</span>{' '}
              & Hidden Gems
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-balance">
              Connect with local guides, capture your travel data, and explore authentic cultural experiences 
              with our comprehensive travel platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary inline-flex items-center justify-center px-8 py-3 text-base">
              Start Your Journey
            </Link>
            <Link href="/cultural" className="btn-cultural inline-flex items-center justify-center px-8 py-3 text-base">
              Explore Cultural Sites
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <MapPinIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold">Track Your Trips</h3>
              <p className="text-sm text-gray-600">
                Capture trip data with GPS integration and store your travel memories securely.
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-cultural-100 rounded-full flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-cultural-600" />
              </div>
              <h3 className="font-semibold">Local Guides</h3>
              <p className="text-sm text-gray-600">
                Connect with verified local guides who share authentic cultural insights.
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <GlobeAltIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold">Hidden Gems</h3>
              <p className="text-sm text-gray-600">
                Discover secret spots, caves, and cultural places known only to locals.
              </p>
            </div>
          </div>

          <div className="pt-8">
            <p className="text-sm text-gray-500">
              Supporting NATPAC scientific research through comprehensive trip data collection
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
