"use client"

import { useState, useEffect } from 'react'
import { 
  AlertTriangle, 
  Shield, 
  BookOpen, 
  Calculator, 
  Package, 
  Watch, 
  CreditCard, 
  Phone,
  MapPin,
  Clock,
  Users,
  Zap,
  MessageCircle,
  DollarSign,
  Calendar,
  Camera,
  Heart,
  Battery,
  Wifi
} from 'lucide-react'
import advancedFeaturesService from '@/lib/advancedFeatures'
import { 
  CrowdData, 
  EmergencyContact, 
  TravelDiary, 
  BudgetEstimate, 
  PackingList, 
  GuideContact,
  CurrencyRate,
  Expense
} from '@/types/advanced'

// 1. Crowd and Event Alerts Component
export function CrowdAlerts({ placeId }: { placeId: string }) {
  const [crowdData, setCrowdData] = useState<CrowdData | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchCrowdData = async () => {
    setLoading(true)
    try {
      const data = await advancedFeaturesService.getCrowdData(placeId)
      setCrowdData(data)
    } catch (error) {
      console.error('Error fetching crowd data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (placeId) {
      fetchCrowdData()
    }
  }, [placeId])

  const getCrowdColor = (crowd: string) => {
    switch (crowd) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'very_high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
  }

  if (!crowdData) return null

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Crowd Alert
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCrowdColor(crowdData.currentCrowd)}`}>
          {crowdData.currentCrowd.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Current Crowd Level</span>
          <span className="font-semibold">{crowdData.crowdPercentage}%</span>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Best Times to Visit:</p>
          <div className="flex flex-wrap gap-2">
            {crowdData.bestTimeToVisit.map((time, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                {time}
              </span>
            ))}
          </div>
        </div>

        {crowdData.events.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Nearby Events:</p>
            {crowdData.events.map((event) => (
              <div key={event.id} className="text-sm p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                <div className="font-medium">{event.title}</div>
                <div className="text-gray-600">{event.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(event.startTime).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {crowdData.alternativeTimes.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Suggestions:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {crowdData.alternativeTimes.map((suggestion, index) => (
                <li key={index} className="flex items-center">
                  <Clock className="w-3 h-3 mr-2 text-gray-400" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// 2. Emergency SOS Component
export function EmergencySOS() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [showAddContact, setShowAddContact] = useState(false)
  const [sosActive, setSosActive] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    phoneNumber: '',
    relationship: '',
    isPrimary: false
  })

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    const contactList = await advancedFeaturesService.getEmergencyContacts()
    setContacts(contactList)
  }

  const handleAddContact = async () => {
    try {
      await advancedFeaturesService.addEmergencyContact(newContact)
      setNewContact({ name: '', phoneNumber: '', relationship: '', isPrimary: false })
      setShowAddContact(false)
      loadContacts()
    } catch (error) {
      console.error('Error adding contact:', error)
    }
  }

  const handleSOS = async () => {
    setSosActive(true)
    try {
      await advancedFeaturesService.triggerSOS()
      // SOS triggered successfully
    } catch (error) {
      console.error('Error triggering SOS:', error)
      alert('Error activating SOS: ' + (error as Error).message)
    }
    setSosActive(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Shield className="w-5 h-5 mr-2 text-red-600" />
          Emergency SOS
        </h3>
        <button
          onClick={handleSOS}
          disabled={sosActive}
          className={`px-4 py-2 rounded-lg font-semibold ${
            sosActive 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {sosActive ? 'Activating...' : 'EMERGENCY SOS'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Emergency Contacts ({contacts.length})</h4>
            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Contact
            </button>
          </div>

          {showAddContact && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-3">
              <input
                type="text"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newContact.phoneNumber}
                onChange={(e) => setNewContact({...newContact, phoneNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Relationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={newContact.isPrimary}
                  onChange={(e) => setNewContact({...newContact, isPrimary: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="isPrimary" className="text-sm">Primary Contact</label>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddContact}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium flex items-center">
                    {contact.name}
                    {contact.isPrimary && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{contact.relationship}</div>
                  <div className="text-sm text-gray-500">{contact.phoneNumber}</div>
                </div>
                <Phone className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No emergency contacts added yet
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <strong>How it works:</strong> Press Emergency SOS to instantly share your location 
              with all your emergency contacts via SMS and notifications.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. AI Travel Diary Component
export function AITravelDiary({ tripId }: { tripId: string }) {
  const [diary, setDiary] = useState<TravelDiary | null>(null)
  const [loading, setLoading] = useState(false)

  const generateDiary = async () => {
    setLoading(true)
    try {
      const generatedDiary = await advancedFeaturesService.generateTravelDiary(tripId)
      setDiary(generatedDiary)
    } catch (error) {
      console.error('Error generating diary:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'amazing': return 'text-green-600 bg-green-100'
      case 'great': return 'text-blue-600 bg-blue-100'
      case 'good': return 'text-yellow-600 bg-yellow-100'
      case 'okay': return 'text-orange-600 bg-orange-100'
      case 'disappointing': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'amazing': return '🤩'
      case 'great': return '😊'
      case 'good': return '🙂'
      case 'okay': return '😐'
      case 'disappointing': return '😞'
      default: return '😐'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
          AI Travel Diary
        </h3>
        <button
          onClick={generateDiary}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            loading 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Diary'}
        </button>
      </div>

      {loading && (
        <div className="space-y-3">
          <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
          <div className="animate-pulse bg-gray-200 h-20 rounded"></div>
        </div>
      )}

      {diary && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold">{diary.title}</h4>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMoodColor(diary.mood)}`}>
              {getMoodEmoji(diary.mood)} {diary.mood}
            </span>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed">{diary.aiGeneratedSummary}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{diary.stats.placesVisited}</div>
              <div className="text-sm text-gray-600">Places Visited</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{diary.stats.distanceTraveled}km</div>
              <div className="text-sm text-gray-600">Distance</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{diary.stats.photosToken}</div>
              <div className="text-sm text-gray-600">Photos</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{Math.round(diary.stats.timeSpent / 60)}h</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium mb-2 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Highlights
              </h5>
              <ul className="space-y-1">
                {diary.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-2 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                Recommendations
              </h5>
              <ul className="space-y-1">
                {diary.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {diary.photos.length > 0 && (
            <div>
              <h5 className="font-medium mb-2 flex items-center">
                <Camera className="w-4 h-4 mr-2 text-gray-600" />
                Photos
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {diary.photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs opacity-0 group-hover:opacity-100 px-2 text-center">
                        {photo.caption}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

