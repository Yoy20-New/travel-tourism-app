import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PackagesPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Travel Packages
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover curated travel packages designed to showcase cultural treasures 
              and hidden gems with expert local guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Placeholder packages */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-cultural-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Cultural Heritage Package {item}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore ancient sites, local traditions, and hidden cultural gems 
                    with experienced guides.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      $299
                    </span>
                    <Link
                      href={`/packages/${item}`}
                      className="btn-primary inline-flex items-center px-4 py-2 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Custom Packages Available
            </h3>
            <p className="text-gray-600 mb-6">
              Need something specific? Our travel experts can create a personalized 
              package tailored to your interests and cultural preferences.
            </p>
            <Link 
              href="/packages/custom" 
              className="btn-cultural inline-flex items-center px-6 py-3"
            >
              Request Custom Package
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
