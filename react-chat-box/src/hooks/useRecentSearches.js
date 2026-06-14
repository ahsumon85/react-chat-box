import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'weather-recent-cities'

function useRecentSearches() {
  const [recent, setRecent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent))
  }, [recent])

  const addRecent = useCallback((cityName) => {
    setRecent((prev) =>
      [cityName, ...prev.filter((city) => city !== cityName)].slice(0, 5)
    )
  }, [])

  return { recent, addRecent }
}

export default useRecentSearches
