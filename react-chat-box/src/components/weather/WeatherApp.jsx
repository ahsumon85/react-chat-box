import { useCallback } from 'react'
import useWeather from '../../hooks/useWeather'
import useRecentSearches from '../../hooks/useRecentSearches'
import useFocusOnMount from '../../hooks/useFocusOnMount'
import ConceptBadge from './ConceptBadge'
import WeatherSearch from './WeatherSearch'
import WeatherCard from './WeatherCard'
import WeatherSummary from './WeatherSummary'
import ForecastList from './ForecastList'

function WeatherApp() {
  const {
    city,
    setCity,
    weather,
    loading,
    error,
    loadWeather,
    fetchCountRef,
    previousCityRef,
  } = useWeather('London')

  const { recent, addRecent } = useRecentSearches()
  const inputRef = useFocusOnMount()

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const trimmed = city.trim()
      if (trimmed) {
        loadWeather(trimmed)
        addRecent(trimmed)
      }
    },
    [city, loadWeather, addRecent]
  )

  const handleRecentSelect = useCallback(
    (selectedCity) => {
      setCity(selectedCity)
      loadWeather(selectedCity)
      addRecent(selectedCity)
    },
    [setCity, loadWeather, addRecent]
  )

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  if (!apiKey) {
    return (
      <div className="content__card weather-setup">
        <h3>Setup WeatherAPI</h3>
        <ol>
          <li>
            Sign up free at{' '}
            <a href="https://www.weatherapi.com/signup.aspx" target="_blank" rel="noreferrer">
              weatherapi.com
            </a>
          </li>
          <li>
            Add your key to <code>.env.local</code>:
            <pre>VITE_WEATHER_API_KEY=your_key_here</pre>
          </li>
          <li>Restart the dev server (<code>npm run dev</code>)</li>
        </ol>
      </div>
    )
  }

  return (
    <div className="weather-app">
      <section className="weather-section hooks-overview">
        <div className="weather-section__header">
          <h3>React Hooks in this app</h3>
        </div>
        <ul className="hooks-overview__list">
          <li>
            <ConceptBadge label="useState" /> city, weather, loading, error, recent searches
          </li>
          <li>
            <ConceptBadge label="useEffect" /> fetch weather on mount; save recent cities to
            localStorage
          </li>
          <li>
            <ConceptBadge label="useRef" /> focus input; track API call count without re-renders
          </li>
          <li>
            <ConceptBadge label="useMemo" /> compute weather summary only when data changes
          </li>
          <li>
            <ConceptBadge label="useCallback" /> stable handlers passed to child components
          </li>
          <li>
            <ConceptBadge label="Custom Hooks" /> <code>useWeather</code>,{' '}
            <code>useRecentSearches</code>, <code>useFocusOnMount</code>
          </li>
        </ul>
      </section>

      <WeatherSearch
        city={city}
        onCityChange={setCity}
        onSubmit={handleSubmit}
        loading={loading}
        inputRef={inputRef}
        recentSearches={recent}
        onRecentSelect={handleRecentSelect}
      />

      <section className="weather-section">
        <div className="weather-section__header">
          <h3>Status</h3>
          <ConceptBadge label="useState" />
          <ConceptBadge label="useEffect" />
          <ConceptBadge label="Custom Hook" />
        </div>
        <p className="weather-section__hint">
          <code>useWeather</code> (custom hook) uses <code>useState</code> for data and{' '}
          <code>useEffect</code> to load London automatically when the page opens.
        </p>

        {loading && <p className="weather-status weather-status--loading">Fetching weather…</p>}

        {error && !loading && (
          <p className="weather-status weather-status--error">{error}</p>
        )}

        {!loading && !error && !weather && (
          <p className="weather-status">Search for a city to see the weather.</p>
        )}

        {!loading && weather && (
          <p className="weather-meta">
            API calls: {fetchCountRef.current}
            {previousCityRef.current && ` · Last fetched: ${previousCityRef.current}`}
          </p>
        )}
      </section>

      {!loading && !error && weather && (
        <>
          <WeatherCard location={weather.location} current={weather.current} />
          <WeatherSummary
            current={weather.current}
            forecastDays={weather.forecast.forecastday}
          />
          <ForecastList days={weather.forecast.forecastday} />
        </>
      )}
    </div>
  )
}

export default WeatherApp
