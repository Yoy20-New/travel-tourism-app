const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export interface Guide {
  id: string
  user: User
  bio: string
  specializations: string[]
  languages: string[]
  experience: number
  rating: number
  totalBookings: number
  pricePerHour: number
  isVerified: boolean
  photos: string[]
  certifications: string[]
}

export interface Package {
  id: string
  name: string
  description: string
  type: string
  price: number
  duration: number
  features: string[]
  inclusions: string[]
  exclusions: string[]
  images: string[]
  maxParticipants: number
  difficulty: string
  culturalHighlights: string[]
}

export interface CulturalSite {
  id: string
  name: string
  description: string
  type: string
  latitude: number
  longitude: number
  address: string
  culturalSignificance: string
  historicalPeriod?: string
  entryFee?: number
  images: string[]
  facts: string[]
  localInsights: string[]
  isHiddenGem: boolean
  rating: number
}

export interface Trip {
  id: string
  tripNumber: string
  originName: string
  destName: string
  startTime: string
  endTime?: string
  mode: string
  purpose: string
  notes?: string
  isCompleted: boolean
  companions: Array<{
    id: string
    name: string
    age: number
    relation: string
  }>
}

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error)
      throw error
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<{ user: User; token: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // Guides endpoints
  async getGuides(): Promise<Guide[]> {
    return this.request('/guides')
  }

  async getGuide(id: string): Promise<Guide> {
    return this.request(`/guides/${id}`)
  }

  // Packages endpoints
  async getPackages(): Promise<Package[]> {
    return this.request('/packages')
  }

  async getPackage(id: string): Promise<Package> {
    return this.request(`/packages/${id}`)
  }

  // Cultural Sites endpoints
  async getCulturalSites(): Promise<CulturalSite[]> {
    return this.request('/cultural-sites')
  }

  async getCulturalSite(id: string): Promise<CulturalSite> {
    return this.request(`/cultural-sites/${id}`)
  }

  // Trips endpoints
  async getTrips(): Promise<Trip[]> {
    return this.request('/trips')
  }

  async createTrip(tripData: Partial<Trip>): Promise<Trip> {
    return this.request('/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    })
  }

  // Dashboard endpoints
  async getDashboardData(): Promise<{
    recentTrips: Trip[]
    savedPackages: Package[]
    guideMessages: any[]
  }> {
    return this.request('/dashboard')
  }
}

export const api = new ApiService()
export default api
