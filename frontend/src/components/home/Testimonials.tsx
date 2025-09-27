"use client"

import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'NATPAC Researcher',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    text: 'The trip data collection is invaluable for our transportation research. The GPS integration and companion tracking provide exactly the detailed mobility patterns we need.',
  },
  {
    id: 2,
    name: 'Arun Kumar',
    role: 'Cultural Guide',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    text: 'As a local guide, this platform connects me with travelers who truly appreciate cultural authenticity. The booking system and rating feature help build trust with visitors.',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Solo Traveler',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    text: 'Found incredible hidden caves and local festivals through this app. The cultural insights from guides made my Kerala trip unforgettable. Perfect for conscious travelers!',
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            What Our{' '}
            <span className="text-cultural-gradient">Community</span>{' '}
            Says
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From researchers to travelers, see how Tourify is making a difference
            in cultural exploration and scientific research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <StarIcon key={index} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 italic">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              
              <div className="flex items-center gap-3 pt-2">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center space-y-6">
          <div className="bg-cultural-50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Join Our Growing Community
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-cultural-600">50K+</div>
                <div className="text-sm text-gray-600">Active Travelers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cultural-600">2.5K+</div>
                <div className="text-sm text-gray-600">Local Guides</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cultural-600">800+</div>
                <div className="text-sm text-gray-600">Cultural Sites</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cultural-600">1M+</div>
                <div className="text-sm text-gray-600">Trip Records</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
