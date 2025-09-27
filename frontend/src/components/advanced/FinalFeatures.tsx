"use client"

import { useState, useEffect } from 'react'
import { 
  Watch, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Star, 
  Badge,
  Bell,
  Wifi,
  Battery,
  Calendar,
  Clock,
  Plane,
  CloudSnow,
  CheckCircle
} from 'lucide-react'
import advancedFeaturesService from '@/lib/advancedFeatures'
import { 
  WearableNotification, 
  GuideContact 
} from '@/types/advanced'

// 6. Wearables Integration Component
export function WearablesIntegration() {
  const [notifications, setNotifications] = useState<WearableNotification[]>([])
  const [deviceConnected, setDeviceConnected] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState({
    name: 'Apple Watch Series 9',
    battery: 78,
    lastSync: '2 minutes ago'
  })
  const [newNotification, setNewNotification] = useState<{
    type: 'boarding' | 'weather' | 'reminder' | 'emergency'
    title: string
    message: string
    scheduledTime: string
    priority: 'low' | 'medium' | 'high'
  }>({
    type: 'reminder',
    title: '',
    message: '',
    scheduledTime: '',
    priority: 'medium'
  })

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    
    // Mock device connection
    setTimeout(() => setDeviceConnected(true), 1000)
  }, [])

  const scheduleNotification = async () => {
    if (!newNotification.title || !newNotification.message || !newNotification.scheduledTime) return

    const notification: WearableNotification = {
      id: Date.now().toString(),
      ...newNotification,
      data: { origin: 'tourify' }
    }

    try {
      await advancedFeaturesService.scheduleWearableNotification(notification)
      setNotifications([notification, ...notifications])
      setNewNotification({
        type: 'reminder',
        title: '',
        message: '',
        scheduledTime: '',
        priority: 'medium'
      })
    } catch (error) {
      console.error('Error scheduling notification:', error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'boarding': return <Plane className="w-4 h-4" />
      case 'weather': return <CloudSnow className="w-4 h-4" />
      case 'reminder': return <Bell className="w-4 h-4" />
      case 'emergency': return <Bell className="w-4 h-4 text-red-500" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const quickNotifications = [
    {
      type: 'boarding' as const,
      title: 'Flight Boarding',
      message: 'Gate 12 - Boarding starts in 30 minutes',
      scheduledTime: new Date(Date.now() + 30 * 60 * 1000).toISOString().slice(0, 16),
      priority: 'high' as const
    },
    {
      type: 'weather' as const,
      title: 'Weather Alert',
      message: 'Rain expected in 2 hours - pack an umbrella',
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16),
      priority: 'medium' as const
    },
    {
      type: 'reminder' as const,
      title: 'Check-in Reminder',
      message: 'Hotel check-in opens at 3 PM',
      scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString().slice(0, 16),
      priority: 'medium' as const
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Watch className="w-5 h-5 mr-2 text-blue-600" />
          Wearables Integration
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${deviceConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {deviceConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Device Status */}
        {deviceConnected && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-900">{deviceInfo.name}</h4>
              <div className="flex items-center gap-2">
                <Battery className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">{deviceInfo.battery}%</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-blue-600">
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                <span>Synced</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Last sync: {deviceInfo.lastSync}</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Notifications */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Quick Notifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickNotifications.map((quick, index) => (
              <button
                key={index}
                onClick={() => setNewNotification(quick)}
                className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getNotificationIcon(quick.type)}
                  <span className="font-medium text-sm">{quick.title}</span>
                </div>
                <p className="text-xs text-gray-600">{quick.message}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Custom Notification */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Schedule Notification</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newNotification.type}
                onChange={(e) => setNewNotification({...newNotification, type: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="reminder">Reminder</option>
                <option value="boarding">Boarding Alert</option>
                <option value="weather">Weather Alert</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newNotification.priority}
                onChange={(e) => setNewNotification({...newNotification, priority: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                placeholder="Notification title"
                value={newNotification.title}
                onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
              <input
                type="datetime-local"
                value={newNotification.scheduledTime}
                onChange={(e) => setNewNotification({...newNotification, scheduledTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                placeholder="Notification message"
                value={newNotification.message}
                onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={2}
              />
            </div>
          </div>

          <button
            onClick={scheduleNotification}
            disabled={!newNotification.title || !newNotification.message || !newNotification.scheduledTime}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Schedule Notification
          </button>
        </div>

        {/* Scheduled Notifications */}
        {notifications.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Scheduled Notifications</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border-l-4 ${getPriorityColor(notification.priority)}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <span className="font-medium text-sm">{notification.title}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                        notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'}`}
                    >
                      {notification.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.scheduledTime).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!deviceConnected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Connect Your Device</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Connect your smartwatch or fitness tracker to receive travel notifications directly on your wrist.
            </p>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm">
              Connect Device
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// 8. Local Guides Contact System Component
export function LocalGuidesContacts() {
  const [guides, setGuides] = useState<GuideContact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGuide, setSelectedGuide] = useState<GuideContact | null>(null)
  const [searchLocation, setSearchLocation] = useState('')

  useEffect(() => {
    loadGuides()
  }, [])

  const loadGuides = async () => {
    try {
      const guideList = await advancedFeaturesService.getGuideContacts()
      setGuides(guideList)
    } catch (error) {
      console.error('Error loading guides:', error)
    } finally {
      setLoading(false)
    }
  }

  const contactGuide = async (guideId: string, method: 'phone' | 'whatsapp') => {
    try {
      await advancedFeaturesService.contactGuide(guideId, method, 
        `Hi! I found you through Tourify app. I'm interested in booking a cultural tour. Could you please share more details about your services?`
      )
    } catch (error) {
      console.error('Error contacting guide:', error)
      alert('Error contacting guide: ' + (error as Error).message)
    }
  }

  const getSpecialtyIcon = (specialty: string) => {
    const icons = {
      'Cultural Tours': '🏛️',
      'Historical Sites': '🏺',
      'Photography': '📸',
      'Food Tours': '🍜',
      'Art & Culture': '🎨',
      'Hidden Gems': '💎',
      'Traditional Culture': '🎋',
      'Temples': '🏯',
      'Gardens': '🌸'
    }
    return icons[specialty as keyof typeof icons] || '🗺️'
  }

  const filteredGuides = guides.filter(guide => 
    !searchLocation || 
    `${guide.location.city} ${guide.location.region} ${guide.location.country}`.toLowerCase().includes(searchLocation.toLowerCase())
  )

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Phone className="w-5 h-5 mr-2 text-green-600" />
          Local Guides Directory
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{guides.length} guides</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search by location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Guides List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{guide.name}</h4>
                    {guide.isVerified && (
                      <Badge className="w-4 h-4 text-green-600" />
                    )}
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{guide.rating || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {guide.location.city}, {guide.location.region}, {guide.location.country}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {guide.languages.map((lang) => (
                      <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {guide.specialties.map((specialty) => (
                      <span key={specialty} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded flex items-center gap-1">
                        <span>{getSpecialtyIcon(specialty)}</span>
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>{guide.phoneNumber}</span>
                  </div>
                  {guide.whatsappNumber && (
                    <div className="flex items-center gap-2 mt-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp available</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => contactGuide(guide.guideId, 'phone')}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </button>
                  {guide.whatsappNumber && (
                    <button
                      onClick={() => contactGuide(guide.guideId, 'whatsapp')}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchLocation ? 
              `No guides found for "${searchLocation}"` :
              'No guides available'
            }
          </div>
        )}

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <strong>Verified Guides:</strong> All guides are verified with proper credentials and 
              positive reviews. Direct contact ensures immediate communication for your travel needs.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

