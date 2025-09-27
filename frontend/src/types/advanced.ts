// Advanced Features Types for Tourify

// 1. Crowd and Event Alerts
export interface CrowdData {
  placeId: string
  placeName: string
  currentCrowd: 'low' | 'medium' | 'high' | 'very_high'
  crowdPercentage: number
  bestTimeToVisit: string[]
  alternativeTimes: string[]
  events: EventAlert[]
  lastUpdated: string
}

export interface EventAlert {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  impact: 'low' | 'medium' | 'high'
  type: 'festival' | 'concert' | 'sports' | 'maintenance' | 'weather'
}

// 2. Emergency SOS
export interface EmergencyContact {
  id: string
  name: string
  phoneNumber: string
  relationship: string
  isPrimary: boolean
}

export interface SOSSession {
  id: string
  isActive: boolean
  startTime: string
  location: {
    lat: number
    lng: number
    accuracy: number
  }
  contactsNotified: string[]
  batteryLevel?: number
}

// 3. AI Travel Diary
export interface TravelDiary {
  id: string
  tripId: string
  date: string
  title: string
  aiGeneratedSummary: string
  photos: DiaryPhoto[]
  locations: DiaryLocation[]
  stats: TripStats
  mood: 'amazing' | 'great' | 'good' | 'okay' | 'disappointing'
  highlights: string[]
  recommendations: string[]
}

export interface DiaryPhoto {
  id: string
  url: string
  caption: string
  location: {
    lat: number
    lng: number
    placeName: string
  }
  timestamp: string
}

export interface DiaryLocation {
  name: string
  lat: number
  lng: number
  visitDuration: number
  activities: string[]
}

export interface TripStats {
  distanceTraveled: number
  placesVisited: number
  photosToken: number
  timeSpent: number
  transportModes: string[]
  topActivities: string[]
}

// 4. Budget Estimator
export interface BudgetEstimate {
  tripId: string
  totalEstimate: number
  currency: string
  breakdown: BudgetBreakdown
  confidence: number
  lastUpdated: string
}

export interface BudgetBreakdown {
  accommodation: number
  food: number
  transport: number
  activities: number
  shopping: number
  miscellaneous: number
}

export interface PriceData {
  location: string
  category: string
  item: string
  averagePrice: number
  priceRange: {
    min: number
    max: number
  }
  currency: string
  lastUpdated: string
}

// 5. Packing Assistant
export interface PackingList {
  id: string
  tripId: string
  destination: string
  season: string
  duration: number
  tripType: string[]
  items: PackingItem[]
  weatherContext: WeatherContext
  aiRecommendations: string[]
}

export interface PackingItem {
  id: string
  name: string
  category: 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'medical' | 'accessories'
  quantity: number
  priority: 'essential' | 'recommended' | 'optional'
  isPacked: boolean
  notes?: string
}

export interface WeatherContext {
  averageTemp: {
    high: number
    low: number
  }
  conditions: string[]
  rainyDays: number
  recommendation: string
}

// 6. Wearables Integration
export interface WearableNotification {
  id: string
  type: 'boarding' | 'weather' | 'reminder' | 'emergency' | 'activity'
  title: string
  message: string
  scheduledTime: string
  priority: 'low' | 'medium' | 'high'
  data?: any
}

export interface WearableDevice {
  id: string
  name: string
  type: 'smartwatch' | 'fitness_tracker'
  isConnected: boolean
  batteryLevel?: number
  lastSync: string
}

// 7. Currency and Expense Tracker
export interface CurrencyRate {
  from: string
  to: string
  rate: number
  lastUpdated: string
}

export interface Expense {
  id: string
  tripId: string
  amount: number
  currency: string
  category: 'food' | 'transport' | 'accommodation' | 'activities' | 'shopping' | 'other'
  description: string
  location?: string
  timestamp: string
  paymentMethod: 'cash' | 'card' | 'digital'
  receipt?: string
}

export interface BudgetTracker {
  tripId: string
  totalBudget: number
  spent: number
  remaining: number
  dailyAverage: number
  categorySpending: Record<string, number>
  alerts: BudgetAlert[]
}

export interface BudgetAlert {
  type: 'overspent' | 'approaching_limit' | 'daily_exceeded'
  message: string
  category?: string
  severity: 'low' | 'medium' | 'high'
}

// 8. Local Guides Contact System
export interface GuideContact {
  id: string
  guideId: string
  name: string
  phoneNumber: string
  whatsappNumber?: string
  telegramId?: string
  languages: string[]
  specialties: string[]
  location: {
    city: string
    region: string
    country: string
  }
  availability: {
    status: 'available' | 'busy' | 'offline'
    nextAvailable?: string
  }
  responseTime: number // average minutes
  rating: number
  isVerified: boolean
  emergencyContact: boolean
}

export interface ContactMessage {
  id: string
  guideId: string
  userId: string
  message: string
  timestamp: string
  type: 'text' | 'location' | 'image' | 'contact'
  isRead: boolean
  platform: 'app' | 'whatsapp' | 'telegram' | 'phone'
}

// Common utility types
export interface Location {
  lat: number
  lng: number
  name: string
  address?: string
}

export interface TimeRange {
  start: string
  end: string
}

export interface APIResponse<T> {
  success: boolean
  data: T
  error?: string
  timestamp: string
}
