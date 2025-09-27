import { 
  CrowdData, 
  EmergencyContact, 
  SOSSession, 
  TravelDiary, 
  DiaryLocation,
  BudgetEstimate, 
  PackingList, 
  WearableNotification, 
  CurrencyRate, 
  Expense, 
  GuideContact 
} from '@/types/advanced'

class AdvancedFeaturesService {
  
  // 1. CROWD AND EVENT ALERTS
  async getCrowdData(placeId: string): Promise<CrowdData> {
    // Mock implementation - in production, integrate with Google Places API Popular Times
    const mockCrowdData: CrowdData = {
      placeId,
      placeName: 'Sample Location',
      currentCrowd: Math.random() > 0.5 ? 'high' : 'low',
      crowdPercentage: Math.floor(Math.random() * 100),
      bestTimeToVisit: ['9:00 AM', '2:00 PM', '6:00 PM'],
      alternativeTimes: ['Early morning (8-10 AM)', 'Late afternoon (4-6 PM)'],
      events: [
        {
          id: '1',
          title: 'Local Festival',
          description: 'Traditional cultural festival happening nearby',
          startTime: '2024-01-20T10:00:00Z',
          endTime: '2024-01-20T18:00:00Z',
          impact: 'high',
          type: 'festival'
        }
      ],
      lastUpdated: new Date().toISOString()
    }

    return mockCrowdData
  }

  async getAlternativeTimeSlots(placeId: string, preferredTime: string): Promise<string[]> {
    // Analyze crowd patterns and suggest better times
    const alternatives = [
      'Try 2 hours earlier',
      'Visit after 4 PM for smaller crowds',
      'Weekday mornings are usually quieter'
    ]
    return alternatives
  }

  // 2. EMERGENCY SOS FEATURE
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]')
    return contacts
  }

  async addEmergencyContact(contact: Omit<EmergencyContact, 'id'>): Promise<EmergencyContact> {
    const newContact: EmergencyContact = {
      ...contact,
      id: Date.now().toString()
    }
    
    const contacts = await this.getEmergencyContacts()
    contacts.push(newContact)
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts))
    
    return newContact
  }

  async triggerSOS(): Promise<SOSSession> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const sosSession: SOSSession = {
              id: Date.now().toString(),
              isActive: true,
              startTime: new Date().toISOString(),
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy
              },
              contactsNotified: []
            }

            // Get battery level if available
            if ('getBattery' in navigator) {
              try {
                const battery = await (navigator as any).getBattery()
                sosSession.batteryLevel = Math.round(battery.level * 100)
              } catch (e) {
                console.log('Battery API not available')
              }
            }

            // Notify emergency contacts
            const contacts = await this.getEmergencyContacts()
            await this.notifyEmergencyContacts(sosSession, contacts)

            resolve(sosSession)
          },
          (error) => reject(error)
        )
      } else {
        reject(new Error('Geolocation not supported'))
      }
    })
  }

  private async notifyEmergencyContacts(session: SOSSession, contacts: EmergencyContact[]) {
    const locationUrl = `https://maps.google.com/maps?q=${session.location.lat},${session.location.lng}`
    const message = `🚨 EMERGENCY ALERT from Tourify\n\nI need help! My current location:\n${locationUrl}\n\nTime: ${new Date().toLocaleString()}\nBattery: ${session.batteryLevel || 'Unknown'}%`

    // In production, integrate with SMS/WhatsApp APIs
    console.log('Emergency notification would be sent:', message)
    
    // For demo, show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Emergency SOS Activated', {
        body: 'Emergency contacts have been notified',
        icon: '/icon-emergency.png'
      })
    }
  }

  // 3. AI-BASED TRAVEL DIARY
  async generateTravelDiary(tripId: string): Promise<TravelDiary> {
    // Mock AI-generated content
    const diary: TravelDiary = {
      id: Date.now().toString(),
      tripId,
      date: new Date().toISOString().split('T')[0],
      title: 'Amazing Day in Paradise',
      aiGeneratedSummary: 'What an incredible day exploring local culture! Started with a visit to the ancient temple where the morning light created magical photo opportunities. The local market was bustling with authentic flavors and friendly vendors. Ended the day watching the sunset from the hilltop - absolutely breathtaking views that will stay with me forever.',
      photos: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
          caption: 'Stunning temple architecture in golden hour',
          location: { lat: 12.345, lng: 67.890, placeName: 'Ancient Temple' },
          timestamp: new Date().toISOString()
        }
      ],
      locations: [
        {
          name: 'Ancient Temple',
          lat: 12.345,
          lng: 67.890,
          visitDuration: 120,
          activities: ['Photography', 'Cultural Tour', 'Meditation']
        }
      ] as DiaryLocation[],
      stats: {
        distanceTraveled: 15.5,
        placesVisited: 4,
        photosToken: 23,
        timeSpent: 480,
        transportModes: ['Walking', 'Local Bus'],
        topActivities: ['Sightseeing', 'Food Tasting', 'Photography']
      },
      mood: 'amazing',
      highlights: [
        'Watched sunrise from temple steps',
        'Tried authentic local breakfast',
        'Met friendly local guide',
        'Captured perfect sunset shot'
      ],
      recommendations: [
        'Visit temple early morning for best photos',
        'Try the local street food market',
        'Bring comfortable walking shoes',
        'Respect local customs and dress code'
      ]
    }

    return diary
  }

  // 4. BUDGET ESTIMATOR
  async estimateTripBudget(destination: string, duration: number, travelers: number): Promise<BudgetEstimate> {
    // Mock budget calculation with local pricing data
    const baseRates = {
      accommodation: 50,
      food: 30,
      transport: 25,
      activities: 40,
      shopping: 20,
      miscellaneous: 15
    }

    const breakdown = {
      accommodation: baseRates.accommodation * duration * Math.ceil(travelers / 2),
      food: baseRates.food * duration * travelers,
      transport: baseRates.transport * travelers,
      activities: baseRates.activities * Math.ceil(duration / 2) * travelers,
      shopping: baseRates.shopping * travelers,
      miscellaneous: baseRates.miscellaneous * duration * travelers
    }

    const totalEstimate = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0)

    return {
      tripId: Date.now().toString(),
      totalEstimate,
      currency: 'USD',
      breakdown,
      confidence: 0.85,
      lastUpdated: new Date().toISOString()
    }
  }

  // 5. PACKING ASSISTANT
  async generatePackingList(destination: string, season: string, duration: number): Promise<PackingList> {
    // Get weather context
    const weatherContext = await this.getWeatherContext(destination, season)
    
    // Generate AI-based packing recommendations
    const baseItems = [
      // Essentials
      { name: 'Passport/ID', category: 'documents' as const, quantity: 1, priority: 'essential' as const, isPacked: false },
      { name: 'Phone Charger', category: 'electronics' as const, quantity: 1, priority: 'essential' as const, isPacked: false },
      { name: 'Toothbrush', category: 'toiletries' as const, quantity: 1, priority: 'essential' as const, isPacked: false },
      
      // Weather-based clothing
      ...(weatherContext.conditions.includes('rain') ? [
        { name: 'Rain Jacket', category: 'clothing' as const, quantity: 1, priority: 'recommended' as const, isPacked: false },
        { name: 'Umbrella', category: 'accessories' as const, quantity: 1, priority: 'recommended' as const, isPacked: false }
      ] : []),
      
      ...(weatherContext.averageTemp.low < 15 ? [
        { name: 'Warm Jacket', category: 'clothing' as const, quantity: 1, priority: 'essential' as const, isPacked: false },
        { name: 'Thermal Underwear', category: 'clothing' as const, quantity: 2, priority: 'recommended' as const, isPacked: false }
      ] : []),
      
      // Duration-based items
      { name: 'T-Shirts', category: 'clothing' as const, quantity: Math.min(duration + 1, 7), priority: 'essential' as const, isPacked: false },
      { name: 'Underwear', category: 'clothing' as const, quantity: duration + 2, priority: 'essential' as const, isPacked: false },
      { name: 'Socks', category: 'clothing' as const, quantity: duration + 2, priority: 'essential' as const, isPacked: false },
    ]

    return {
      id: Date.now().toString(),
      tripId: Date.now().toString(),
      destination,
      season,
      duration,
      tripType: ['leisure', 'cultural'],
      items: baseItems.map((item, index) => ({ ...item, id: (index + 1).toString() })),
      weatherContext,
      aiRecommendations: [
        'Pack layers for temperature changes',
        'Bring comfortable walking shoes',
        'Don\'t forget travel insurance documents',
        'Consider packing cubes for organization'
      ]
    }
  }

  private async getWeatherContext(destination: string, season: string): Promise<any> {
    // Mock weather context - in production, integrate with weather API
    return {
      averageTemp: { high: 25, low: 15 },
      conditions: season === 'monsoon' ? ['rain', 'cloudy'] : ['sunny', 'clear'],
      rainyDays: season === 'monsoon' ? 8 : 2,
      recommendation: season === 'monsoon' ? 'Pack rain gear and quick-dry clothes' : 'Light, breathable clothing recommended'
    }
  }

  // 6. WEARABLES INTEGRATION
  async scheduleWearableNotification(notification: WearableNotification): Promise<void> {
    // Store notification for wearable sync
    const notifications = JSON.parse(localStorage.getItem('wearableNotifications') || '[]')
    notifications.push(notification)
    localStorage.setItem('wearableNotifications', JSON.stringify(notifications))

    // Schedule browser notification as fallback
    const scheduledTime = new Date(notification.scheduledTime)
    const now = new Date()
    const delay = scheduledTime.getTime() - now.getTime()

    if (delay > 0) {
      setTimeout(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/icon-notification.png',
            tag: notification.id
          })
        }
      }, delay)
    }
  }

  // 7. CURRENCY AND EXPENSE TRACKER
  async getCurrencyRate(from: string, to: string): Promise<CurrencyRate> {
    try {
      // Mock exchange rate - in production, use real API like ExchangeRate-API
      const mockRate = 1.1 + Math.random() * 0.2 // Random rate between 1.1 and 1.3
      
      return {
        from,
        to,
        rate: parseFloat(mockRate.toFixed(4)),
        lastUpdated: new Date().toISOString()
      }
    } catch (error) {
      throw new Error('Failed to get currency rate')
    }
  }

  async addExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString()
    }
    
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
    expenses.push(newExpense)
    localStorage.setItem('expenses', JSON.stringify(expenses))
    
    return newExpense
  }

  async getTripExpenses(tripId: string): Promise<Expense[]> {
    const allExpenses = JSON.parse(localStorage.getItem('expenses') || '[]')
    return allExpenses.filter((expense: Expense) => expense.tripId === tripId)
  }

  // 8. LOCAL GUIDES CONTACT SYSTEM
  async getGuideContacts(): Promise<GuideContact[]> {
    // Mock guide contacts with phone numbers
    return [
      {
        id: '1',
        guideId: 'guide-001',
        name: 'Rajesh Kumar',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '+91 98765 43210',
        languages: ['English', 'Hindi', 'Local'],
        specialties: ['Cultural Tours', 'Historical Sites', 'Photography'],
        location: {
          city: 'New Delhi',
          region: 'Delhi',
          country: 'India'
        },
        availability: {
          status: 'available' as const,
          nextAvailable: undefined
        },
        responseTime: 15,
        rating: 4.8,
        emergencyContact: false,
        isVerified: true
      },
      {
        id: '2',
        guideId: 'guide-002',
        name: 'Maria Santos',
        phoneNumber: '+34 678 901 234',
        whatsappNumber: '+34 678 901 234',
        languages: ['English', 'Spanish', 'French'],
        specialties: ['Food Tours', 'Art & Culture', 'Hidden Gems'],
        location: {
          city: 'Barcelona',
          region: 'Catalonia',
          country: 'Spain'
        },
        availability: {
          status: 'available' as const,
          nextAvailable: undefined
        },
        responseTime: 12,
        rating: 4.9,
        emergencyContact: true,
        isVerified: true
      },
      {
        id: '3',
        guideId: 'guide-003',
        name: 'Kenji Tanaka',
        phoneNumber: '+81 90 1234 5678',
        whatsappNumber: '+81 90 1234 5678',
        languages: ['English', 'Japanese'],
        specialties: ['Traditional Culture', 'Temples', 'Gardens'],
        location: {
          city: 'Kyoto',
          region: 'Kyoto Prefecture', 
          country: 'Japan'
        },
        availability: {
          status: 'busy' as const,
          nextAvailable: '2024-03-20T10:00:00Z'
        },
        responseTime: 8,
        rating: 4.7,
        emergencyContact: false,
        isVerified: true
      }
    ]
  }

  async contactGuide(guideId: string, method: 'phone' | 'whatsapp', message?: string): Promise<void> {
    const guides = await this.getGuideContacts()
    const guide = guides.find(g => g.guideId === guideId)
    
    if (!guide) {
      throw new Error('Guide not found')
    }

    if (method === 'phone') {
      // Open phone dialer
      window.location.href = `tel:${guide.phoneNumber}`
    } else if (method === 'whatsapp' && guide.whatsappNumber) {
      // Open WhatsApp
      const whatsappMessage = encodeURIComponent(message || 'Hello, I found you through Tourify app. I would like to inquire about your guide services.')
      window.open(`https://wa.me/${guide.whatsappNumber.replace(/[^\d]/g, '')}?text=${whatsappMessage}`, '_blank')
    }
  }
}

export const advancedFeaturesService = new AdvancedFeaturesService()
export default advancedFeaturesService
