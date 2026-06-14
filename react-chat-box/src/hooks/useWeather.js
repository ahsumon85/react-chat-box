import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchWeather } from '../api/weatherApi'

function useWeather(initialCity = 'London') {
  const [city, setCity] = useState(initialCity)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCountRef = useRef(0)
  const previousCityRef = useRef(null)

  const loadWeather = useCallback(async (searchCity) => {
    setLoading(true)
    setError(null)
    fetchCountRef.current += 1

    try {
      const data = await fetchWeather(searchCity)
      setWeather(data)
      previousCityRef.current = searchCity
    } catch (err) {
      setWeather(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadWeather(initialCity);
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
