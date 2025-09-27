import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function CulturalPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Cultural Experiences
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in authentic cultural experiences. Discover ancient traditions, 
              sacred sites, and the living heritage of local communities.
            </p>
          </div>

          {/* Featured Cultural Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Ancient Sites', icon: '🏛️', description: 'Explore temples, ruins, and historical monuments' },
              { title: 'Traditional Arts', icon: '🎨', description: 'Witness crafts, music, and dance performances' },
              { title: 'Local Festivals', icon: '🎪', description: 'Join authentic cultural celebrations' },
              { title: 'Sacred Places', icon: '🕌', description: 'Visit spiritual sites and ceremonies' },
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          {/* Featured Cultural Sites */}
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8 text-center">
              Featured Cultural Sites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-cultural-400 to-orange-500"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Cultural Site {item}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      A fascinating glimpse into ancient traditions and cultural heritage 
                      preserved through generations.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Location {item}
                      </div>
                      <Link
                        href={`/cultural/${item}`}
                        className="btn-cultural inline-flex items-center px-4 py-2 text-sm"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Map Section */}
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Interactive Cultural Map
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Discover cultural sites near you or in your planned destinations. 
              Our interactive map shows verified cultural locations, hidden gems, and local insights.
            </p>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-cultural-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-cultural-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </div>
                <p className="text-gray-500">Interactive Cultural Map Coming Soon</p>
              </div>
            </div>
            <Link 
              href="/cultural/map" 
              className="btn-cultural inline-flex items-center px-6 py-3"
            >
              View Full Map
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
