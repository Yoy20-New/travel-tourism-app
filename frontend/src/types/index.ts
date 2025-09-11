// User and Authentication Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  isEmailVerified: boolean
  role: 'user' | 'admin' | 'guide'
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  language: string
  currency: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    shareLocation: boolean
    publicProfile: boolean
  }
}

// Trip and Travel Types
export interface Trip {
  id: string
  tripNumber: string
  userId: string
  origin: Location
  destination: Location
  startTime: Date
  endTime?: Date
  mode: TransportMode
  purpose: TripPurpose
  companions: Companion[]
  notes?: string
  photos?: string[]
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Location {
  id?: string
  name: string
  address: string
  coordinates: {
    latitude: number
    longitude: number
  }
  type: LocationType
  culturalSignificance?: string
}

export interface Companion {
  id: string
  name: string
  age: number
  relation: string
  tripId: string
}

export type TransportMode = 
  | 'walking'
  | 'bicycle'
  | 'motorcycle'
  | 'car'
  | 'bus'
  | 'train'
  | 'flight'
  | 'boat'
  | 'other'

export type TripPurpose = 
  | 'leisure'
  | 'business'
  | 'cultural'
  | 'religious'
  | 'educational'
  | 'medical'
  | 'shopping'
  | 'family'
  | 'other'

export type LocationType =
  | 'cultural_site'
  | 'historical_monument'
  | 'religious_site'
  | 'museum'
  | 'cave'
  | 'hidden_gem'
  | 'natural_landmark'
  | 'restaurant'
  | 'accommodation'
  | 'transport_hub'
  | 'other'

// Guide and Booking Types
export interface Guide {
  id: string
  userId: string
  user: User
  bio: string
  specializations: string[]
  languages: string[]
  experience: number // years
  rating: number
  totalBookings: number
  pricePerHour: number
  availability: GuideAvailability[]
  certifications: string[]
  photos: string[]
  reviews: Review[]
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface GuideAvailability {
  id: string
  guideId: string
  date: Date
  startTime: string
  endTime: string
  isBooked: boolean
}

export interface Booking {
  id: string
  userId: string
  guideId: string
  guide: Guide
  date: Date
  startTime: string
  endTime: string
  location: Location
  groupSize: number
  totalAmount: number
  status: BookingStatus
  specialRequests?: string
  createdAt: Date
  updatedAt: Date
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export interface Review {
  id: string
  userId: string
  guideId?: string
  packageId?: string
  rating: number
  comment: string
  photos?: string[]
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

// Subscription and Package Types
export interface Package {
  id: string
  name: string
  description: string
  type: PackageType
  price: number
  duration: number // days
  features: string[]
  inclusions: string[]
  exclusions: string[]
  images: string[]
  isActive: boolean
  seasonalDiscount?: number
  maxParticipants: number
  difficulty: 'easy' | 'moderate' | 'challenging'
  culturalHighlights: string[]
  itinerary: ItineraryItem[]
  createdAt: Date
  updatedAt: Date
}

export type PackageType = 
  | 'festival'
  | 'peak_season'
  | 'off_season'
  | 'cultural_immersion'
  | 'adventure'
  | 'religious'
  | 'family'
  | 'luxury'

export interface ItineraryItem {
  id: string
  day: number
  title: string
  description: string
  location: Location
  startTime: string
  endTime: string
  activities: string[]
}

export interface Subscription {
  id: string
  userId: string
  packageId: string
  package: Package
  startDate: Date
  endDate: Date
  status: SubscriptionStatus
  amount: number
  paymentId: string
  autoRenew: boolean
  createdAt: Date
  updatedAt: Date
}

export type SubscriptionStatus = 
  | 'active'
  | 'expired'
  | 'cancelled'
  | 'pending_payment'
  | 'suspended'

// Cultural and Map Types
export interface CulturalSite {
  id: string
  name: string
  description: string
  location: Location
  type: LocationType
  culturalSignificance: string
  historicalPeriod?: string
  openingHours?: OpeningHours
  entryFee?: number
  images: string[]
  facts: string[]
  localInsights: string[]
  isHiddenGem: boolean
  rating: number
  reviews: Review[]
  createdAt: Date
  updatedAt: Date
}

export interface OpeningHours {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
  holidays?: string
}

export interface MapMarker {
  id: string
  type: LocationType
  coordinates: {
    latitude: number
    longitude: number
  }
  title: string
  description?: string
  isHidden: boolean
}

// API and State Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message: string
  error?: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

// Form Types
export interface TripFormData {
  tripNumber: string
  origin: string
  destination: string
  mode: TransportMode
  purpose: TripPurpose
  startTime: Date
  companions: Omit<Companion, 'id' | 'tripId'>[]
  notes?: string
}

export interface LoginFormData {
  email: string
  password?: string
  rememberMe: boolean
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  acceptTerms: boolean
  acceptPrivacy: boolean
  marketingConsent: boolean
}

export interface OtpFormData {
  email: string
  otp: string
}

// Store/State Types
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface TripState {
  trips: Trip[]
  currentTrip: Trip | null
  isLoading: boolean
}

export interface GuideState {
  guides: Guide[]
  selectedGuide: Guide | null
  bookings: Booking[]
  isLoading: boolean
}

export interface MapState {
  markers: MapMarker[]
  selectedMarker: MapMarker | null
  userLocation: {
    latitude: number
    longitude: number
  } | null
  isLoading: boolean
}
