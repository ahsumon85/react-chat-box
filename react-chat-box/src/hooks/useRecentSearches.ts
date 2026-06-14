import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'weather-recent-cities'

interface UseRecentSearchesResult {
  recent: string[]
  addRecent: (cityName: string) => void
}

function useRecentSearches(): UseRecentSearchesResult {
  const [recent, setRecent] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as string[]) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent))
  }, [recent])

  const addRecent = useCallback((cityName: string) => {
    setRecent((prev) =>
      [cityName, ...prev.filter((city) => city !== cityName)].slice(0, 5)
    )
  }, [])

  return { recent, addRecent }
}

export default useRecentSearches
