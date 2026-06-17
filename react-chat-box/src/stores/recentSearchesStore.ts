import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RecentSearchesState {
  recent: string[]
  addRecent: (cityName: string) => void
}

export const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set) => ({
      recent: [],
      addRecent: (cityName) =>
        set((state) => ({
          recent: [cityName, ...state.recent.filter((city) => city !== cityName)].slice(0, 5),
        })),
    }),
    { name: 'weather-recent-cities' }
  )
)
