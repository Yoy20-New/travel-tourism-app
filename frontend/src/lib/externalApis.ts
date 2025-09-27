import { Loader } from '@googlemaps/js-api-loader'

// Declare global google types
declare global {
  interface Window {
    google: typeof google
  }
}

// Types for external API responses
export interface GooglePlacesResult {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  photos?: Array<{
    photo_reference: string
    height: number
    width: number
  }>
  rating?: number
  types: string[]
  opening_hours?: {
    open_now: boolean
    weekday_text: string[]
  }
  price_level?: number
}

export interface WikipediaResult {
  pageid: number
  title: string
  extract: string
  thumbnail?: {
    source: string
    width: number
    height: number
  }
  coordinates?: Array<{
    lat: number
    lon: number
  }>
}

export interface UnsplashImage {
  id: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string
  user: {
    name: string
    username: string
  }
  width: number
  height: number
}

export interface WeatherData {
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  name: string
  visibility: number
}

class ExternalApiService {
  private googleMapsLoader: Loader | null = null

  constructor() {
    // Initialize Google Maps loader
    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      this.googleMapsLoader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places', 'geometry']
      })
    }
  }

  // Google Places API
  async searchPlaces(query: string, location?: { lat: number, lng: number }): Promise<GooglePlacesResult[]> {
    if (!this.googleMapsLoader) {
      throw new Error('Google Maps API key not configured')
    }

    try {
      const google = await this.googleMapsLoader.load()
      const service = new google.maps.places.PlacesService(document.createElement('div'))

      return new Promise((resolve, reject) => {
        const request: any = {
          query,
          ...(location && { location: new google.maps.LatLng(location.lat, location.lng) })
        }

        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const formattedResults: GooglePlacesResult[] = results.map(place => ({
              place_id: place.place_id || '',
              name: place.name || '',
              formatted_address: place.formatted_address || '',
              geometry: {
                location: {
                  lat: place.geometry?.location?.lat() || 0,
                  lng: place.geometry?.location?.lng() || 0
                }
              },
              photos: place.photos?.map(photo => ({
                photo_reference: (photo as any).photo_reference,
                height: (photo as any).height,
                width: (photo as any).width
              })),
              rating: place.rating,
              types: place.types || [],
              opening_hours: place.opening_hours ? {
                open_now: place.opening_hours.open_now || false,
                weekday_text: place.opening_hours.weekday_text || []
              } : undefined,
              price_level: place.price_level
            }))
            resolve(formattedResults)
          } else {
            reject(new Error(`Places search failed: ${status}`))
          }
        })
      })
    } catch (error) {
      console.error('Error searching places:', error)
      throw error
    }
  }

  async getPlaceDetails(placeId: string): Promise<GooglePlacesResult | null> {
    if (!this.googleMapsLoader) {
      throw new Error('Google Maps API key not configured')
    }

    try {
      const google = await this.googleMapsLoader.load()
      const service = new google.maps.places.PlacesService(document.createElement('div'))

      return new Promise((resolve, reject) => {
        service.getDetails(
          {
            placeId,
            fields: ['place_id', 'name', 'formatted_address', 'geometry', 'photos', 'rating', 'types', 'opening_hours', 'price_level']
          },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              const result: GooglePlacesResult = {
                place_id: place.place_id || '',
                name: place.name || '',
                formatted_address: place.formatted_address || '',
                geometry: {
                  location: {
                    lat: place.geometry?.location?.lat() || 0,
                    lng: place.geometry?.location?.lng() || 0
                  }
                },
                photos: place.photos?.map(photo => ({
                  photo_reference: (photo as any).photo_reference,
                  height: (photo as any).height,
                  width: (photo as any).width
                })),
                rating: place.rating,
                types: place.types || [],
                opening_hours: place.opening_hours ? {
                  open_now: place.opening_hours.open_now || false,
                  weekday_text: place.opening_hours.weekday_text || []
                } : undefined,
                price_level: place.price_level
              }
              resolve(result)
            } else {
              reject(new Error(`Place details failed: ${status}`))
            }
          }
        )
      })
    } catch (error) {
      console.error('Error getting place details:', error)
      throw error
    }
  }

  // Wikipedia API
  async searchWikipedia(query: string, limit: number = 5): Promise<WikipediaResult[]> {
    try {
      const searchResponse = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      )

      if (!searchResponse.ok) {
        throw new Error(`Wikipedia search failed: ${searchResponse.statusText}`)
      }

      const data = await searchResponse.json()

      if (data.type === 'disambiguation') {
        // Handle disambiguation pages by getting the first few results
        const searchResults = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=0&gsrlimit=${limit}&gsrsearch=${encodeURIComponent(query)}&prop=extracts|pageimages|coordinates&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=300&origin=*`
        )
        
        const searchData = await searchResults.json()
        const pages = searchData.query?.pages || {}
        
        return Object.values(pages).map((page: any) => ({
          pageid: page.pageid,
          title: page.title,
          extract: page.extract || '',
          thumbnail: page.thumbnail,
          coordinates: page.coordinates
        }))
      } else {
        // Single page result
        return [{
          pageid: data.pageid || 0,
          title: data.title,
          extract: data.extract || '',
          thumbnail: data.thumbnail,
          coordinates: data.coordinates ? [{ lat: data.coordinates.lat, lon: data.coordinates.lon }] : undefined
        }]
      }
    } catch (error) {
      console.error('Error searching Wikipedia:', error)
      throw error
    }
  }

  // Unsplash API
  async searchUnsplashImages(query: string, count: number = 10): Promise<UnsplashImage[]> {
    if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
      throw new Error('Unsplash API key not configured')
    }

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      )

      if (!response.ok) {
        throw new Error(`Unsplash search failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data.results.map((photo: any) => ({
        id: photo.id,
        urls: photo.urls,
        alt_description: photo.alt_description || '',
        user: {
          name: photo.user.name,
          username: photo.user.username
        },
        width: photo.width,
        height: photo.height
      }))
    } catch (error) {
      console.error('Error searching Unsplash images:', error)
      throw error
    }
  }

  // OpenWeather API (server-side only due to CORS)
  async getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    try {
      // This should be called from your backend API
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      
      if (!response.ok) {
        throw new Error(`Weather API failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  }

  // Helper method to get Google Maps photo URL
  getGooglePlacePhotoUrl(photoReference: string, maxWidth: number = 400): string {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      return ''
    }

    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  }
}

export const externalApi = new ExternalApiService()
export default externalApi
