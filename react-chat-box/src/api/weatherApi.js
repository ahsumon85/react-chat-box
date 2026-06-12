const API_BASE = 'https://api.weatherapi.com/v1'

function getApiKey() {
  return import.meta.env.VITE_WEATHER_API_KEY
}

export async function fetchWeather(city) {
  const key = getApiKey()
  if (!key) {
    throw new Error(
      'Missing API key. Add VITE_WEATHER_API_KEY to your .env.local file.'
    )
  }

  const url = `${API_BASE}/forecast.json?key=${key}&q=${encodeURIComponent(city)}&days=3`
  const response = await fetch(url)

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error?.message || 'Failed to fetch weather')
  }

  return response.json()
}
