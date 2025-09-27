"use client"

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FileUpload from '@/components/ui/FileUpload'
import { Upload, Plus } from 'lucide-react'

export default function TripsPage() {
  const [importedTrips, setImportedTrips] = useState<any[]>([])
  const [showImport, setShowImport] = useState(false)

  const handleTripImport = (tripData: any[]) => {
    setImportedTrips(tripData)
    console.log('Imported trips:', tripData)
    // Here you would typically send this data to your backend API
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Your Trips
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and track all your travel experiences in one place. 
              View past trips, plan new adventures, and capture memorable moments.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/trips/new" 
              className="btn-primary inline-flex items-center px-6 py-3 justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Plan New Trip
            </Link>
            <button
              onClick={() => setShowImport(!showImport)}
              className="btn-secondary inline-flex items-center px-6 py-3 justify-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Import Trips from CSV
            </button>
          </div>

          {/* Import Section */}
          {showImport && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Import Trips</h2>
              <FileUpload
                uploadType="csv"
                maxFiles={1}
                onFilesProcessed={handleTripImport}
                title="Upload your trip data"
                description="CSV or Excel file with trip information. Download the template to see the required format."
              />
            </div>
          )}

          {/* Show imported trips */}
          {importedTrips.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Imported Trips ({importedTrips.length})
              </h2>
              <div className="space-y-4">
                {importedTrips.slice(0, 5).map((trip, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {trip.originName} → {trip.destName}
                      </h3>
                      <span className="text-sm text-gray-500">{trip.mode}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {new Date(trip.startTime).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">{trip.purpose}</p>
                    {trip.notes && (
                      <p className="text-sm text-gray-500 mt-2 italic">{trip.notes}</p>
                    )}
                  </div>
                ))}
                {importedTrips.length > 5 && (
                  <p className="text-sm text-gray-500">
                    ... and {importedTrips.length - 5} more trips
                  </p>
                )}
              </div>
              <div className="mt-4 flex gap-3">
                <button className="btn-primary">
                  Save All Trips
                </button>
                <button 
                  onClick={() => setImportedTrips([])}
                  className="btn-secondary"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {importedTrips.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No trips yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start planning your first adventure! Create a new trip manually or import existing trip data.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
