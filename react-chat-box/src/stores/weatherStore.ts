import { create } from 'zustand'
import { fetchWeather } from '../api/weatherApi'
import type { WeatherData } from '../types/weather'

interface WeatherState {
  city: string
  weather: WeatherData | null
  loading: boolean
  error: string | null
  fetchCount: number
  previousCity: string | null
  setCity: (city: string) => void
  loadWeather: (searchCity: string) => Promise<void>
}

export const useWeatherStore = create<WeatherState>((set) => ({
  city: 'London',
  weather: null,
  loading: false,
  error: null,
  fetchCount: 0,
  previousCity: null,
  setCity: (city) => set({ city }),
  loadWeather: async (searchCity) => {
    set((state) => ({
      loading: true,
      error: null,
      fetchCount: state.fetchCount + 1,
    }))

    try {
      const data = await fetchWeather(searchCity)
      set({ weather: data, previousCity: searchCity, loading: false })
    } catch (err) {
      set({
        weather: null,
        error: err instanceof Error ? err.message : 'Failed to fetch weather',
        loading: false,
      })
    }
  },
}))
