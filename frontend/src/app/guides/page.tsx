import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { formatIndianCurrency } from '@/lib/utils'

export default function GuidesPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Local Guides
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with verified local experts who share authentic cultural insights 
              and reveal hidden gems known only to locals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Placeholder guide profiles */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cultural-400 to-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      G{item}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Guide {item}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cultural Heritage Expert
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-sm text-gray-600 ml-2">4.9 (127 reviews)</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Specializes in ancient temples, traditional crafts, and local cuisine. 
                    Passionate about sharing cultural stories.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-cultural-600">
                    {formatIndianCurrency(3700 + (item * 100))}/day
                  </span>
                  <Link
                    href={`/guides/${item}`}
                    className="btn-cultural inline-flex items-center px-4 py-2 text-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Become a Local Guide
            </h3>
            <p className="text-gray-600 mb-6">
              Share your cultural knowledge and local expertise with travelers from around the world. 
              Join our community of verified guides.
            </p>
            <Link 
              href="/guides/apply" 
              className="btn-primary inline-flex items-center px-6 py-3"
            >
              Apply to be a Guide
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
