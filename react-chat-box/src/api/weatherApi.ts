import type { WeatherData } from '../types/weather'

const API_BASE = 'https://api.weatherapi.com/v1'

interface WeatherApiErrorResponse {
  error?: {
    message?: string
  }
}

function getApiKey(): string | undefined {
  return import.meta.env.VITE_WEATHER_API_KEY
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const key = getApiKey()
  if (!key) {
    throw new Error(
      'Missing API key. Add VITE_WEATHER_API_KEY to your .env.local file.'
    )
  }

  const url = `${API_BASE}/forecast.json?key=${key}&q=${encodeURIComponent(city)}&days=3`
  const response = await fetch(url)

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as WeatherApiErrorResponse
    throw new Error(data.error?.message || 'Failed to fetch weather')
  }

  return response.json() as Promise<WeatherData>
}
