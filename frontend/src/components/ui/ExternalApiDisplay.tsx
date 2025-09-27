"use client"

import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Clock, DollarSign, Cloud, Sun, Thermometer } from 'lucide-react'
import externalApi, { GooglePlacesResult, WikipediaResult, UnsplashImage, WeatherData } from '@/lib/externalApis'

interface PlacesSearchProps {
  onPlaceSelect: (place: GooglePlacesResult) => void
  searchQuery?: string
}

export function PlacesSearch({ onPlaceSelect, searchQuery = '' }: PlacesSearchProps) {
  const [query, setQuery] = useState(searchQuery)
  const [results, setResults] = useState<GooglePlacesResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const places = await externalApi.searchPlaces(searchTerm)
      setResults(places)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search places')
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for places..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Places Found:</h3>
          {results.map((place) => (
            <div
              key={place.place_id}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors"
              onClick={() => onPlaceSelect(place)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{place.name}</h4>
                {place.rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{place.rating}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{place.formatted_address}</span>
              </div>
              
              {place.opening_hours && (
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {place.opening_hours.open_now ? 'Open now' : 'Closed'}
                  </span>
                </div>
              )}
              
              {place.price_level && (
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {'$'.repeat(place.price_level)} price range
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface WikipediaSearchProps {
  onArticleSelect: (article: WikipediaResult) => void
  searchQuery?: string
}

export function WikipediaSearch({ onArticleSelect, searchQuery = '' }: WikipediaSearchProps) {
  const [query, setQuery] = useState(searchQuery)
  const [results, setResults] = useState<WikipediaResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const articles = await externalApi.searchWikipedia(searchTerm)
      setResults(articles)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search Wikipedia')
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Wikipedia articles..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Wikipedia Articles:</h3>
          {results.map((article) => (
            <div
              key={article.pageid}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors"
              onClick={() => onArticleSelect(article)}
            >
              <div className="flex gap-4">
                {article.thumbnail && (
                  <img
                    src={article.thumbnail.source}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {article.extract.substring(0, 200)}...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface UnsplashImageSearchProps {
  onImageSelect: (image: UnsplashImage) => void
  searchQuery?: string
}

export function UnsplashImageSearch({ onImageSelect, searchQuery = '' }: UnsplashImageSearchProps) {
  const [query, setQuery] = useState(searchQuery)
  const [results, setResults] = useState<UnsplashImage[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const images = await externalApi.searchUnsplashImages(searchTerm, 12)
      setResults(images)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search images')
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Images Found:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((image) => (
              <div
                key={image.id}
                className="group cursor-pointer"
                onClick={() => onImageSelect(image)}
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={image.urls.small}
                    alt={image.alt_description || 'Unsplash image'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 truncate">
                  by {image.user.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface WeatherDisplayProps {
  latitude: number
  longitude: number
}

export function WeatherDisplay({ latitude, longitude }: WeatherDisplayProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const weatherData = await externalApi.getWeatherData(latitude, longitude)
        setWeather(weatherData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data')
      } finally {
        setIsLoading(false)
      }
    }

    if (latitude && longitude) {
      fetchWeather()
    }
  }, [latitude, longitude])

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-600">Loading weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  if (!weather) return null

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Weather in {weather.name}</h3>
        <div className="flex items-center">
          {weather.weather[0].main === 'Clear' ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Cloud className="w-6 h-6 text-gray-500" />
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <Thermometer className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-2xl font-bold text-gray-900">{Math.round(weather.main.temp)}°C</span>
          </div>
          <p className="text-sm text-gray-600">Feels like {Math.round(weather.main.feels_like)}°C</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-900">{weather.weather[0].description}</p>
          <p className="text-sm text-gray-600">Humidity: {weather.main.humidity}%</p>
          <p className="text-sm text-gray-600">Wind: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  )
}
