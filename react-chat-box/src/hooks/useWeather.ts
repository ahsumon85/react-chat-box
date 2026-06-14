import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { fetchWeather } from '../api/weatherApi'
import type { WeatherData } from '../types/weather'

interface UseWeatherResult {
  city: string
  setCity: (city: string) => void
  weather: WeatherData | null
  loading: boolean
  error: string | null
  loadWeather: (searchCity: string) => Promise<void>
  fetchCountRef: RefObject<number>
  previousCityRef: RefObject<string | null>
}

function useWeather(initialCity = 'London'): UseWeatherResult {
  const [city, setCity] = useState(initialCity)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCountRef = useRef(0)
  const previousCityRef = useRef<string | null>(null)

  const loadWeather = useCallback(async (searchCity: string) => {
    setLoading(true)
    setError(null)
    fetchCountRef.current += 1

    try {
      const data = await fetchWeather(searchCity)
      setWeather(data)
      previousCityRef.current = searchCity
    } catch (err) {
      setWeather(null)
      setError(err instanceof Error ? err.message : 'Failed to fetch weather')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadWeather(initialCity)
  }, [initialCity, loadWeather])

  return {
    city,
    setCity,
    weather,
    loading,
    error,
    loadWeather,
    fetchCountRef,
    previousCityRef,
  }
}

export default useWeather
