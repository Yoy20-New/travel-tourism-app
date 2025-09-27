import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Overview of your travel activity, saved packages, and guide interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Trips</h3>
              <p className="text-gray-600 text-sm">You haven&apos;t logged any trips yet.</p>
              <Link href="/trips" className="btn-primary inline-flex items-center px-4 py-2 mt-4 text-sm">
                Log a Trip
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Saved Packages</h3>
              <p className="text-gray-600 text-sm">No saved packages yet.</p>
              <Link href="/packages" className="btn-cultural inline-flex items-center px-4 py-2 mt-4 text-sm">
                Browse Packages
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Guide Messages</h3>
              <p className="text-gray-600 text-sm">No messages yet.</p>
              <Link href="/guides" className="btn-primary inline-flex items-center px-4 py-2 mt-4 text-sm">
                Find a Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
