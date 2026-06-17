import { lazy, Suspense, useCallback, useEffect, type FormEvent } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { UnitsProvider } from '../../context/UnitsContext'
import { useWeatherStore } from '../../stores/weatherStore'
import { useRecentSearchesStore } from '../../stores/recentSearchesStore'
import useFocusOnMount from '../../hooks/useFocusOnMount'
import ConceptBadge from './ConceptBadge'
import WeatherSearch from './WeatherSearch'
import UnitToggle from './UnitToggle'
import WeatherDetailsFallback from './WeatherDetailsFallback'

const WeatherCard = lazy(() => import('./WeatherCard'))
const WeatherSummary = lazy(() => import('./WeatherSummary'))
const ForecastList = lazy(() => import('./ForecastList'))

function WeatherApp() {
  const {
    city,
    setCity,
    weather,
    loading,
    error,
    loadWeather,
    fetchCount,
    previousCity,
  } = useWeatherStore(
    useShallow((state) => ({
      city: state.city,
      setCity: state.setCity,
      weather: state.weather,
      loading: state.loading,
      error: state.error,
      loadWeather: state.loadWeather,
      fetchCount: state.fetchCount,
      previousCity: state.previousCity,
    }))
  )

  const { recent, addRecent } = useRecentSearchesStore(
    useShallow((state) => ({
      recent: state.recent,
      addRecent: state.addRecent,
    }))
  )

  const inputRef = useFocusOnMount()

  useEffect(() => {
    loadWeather('London')
  }, [loadWeather])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
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
    (selectedCity: string) => {
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
          <li>
            Restart the dev server (<code>npm run dev</code>)
          </li>
        </ol>
      </div>
    )
  }

  return (
    <UnitsProvider>
      <div className="weather-app">
        <section className="weather-section hooks-overview">
          <div className="weather-section__header">
            <h3>React concepts in this app</h3>
          </div>
          <ul className="hooks-overview__list">
            <li>
              <ConceptBadge label="Zustand" /> city, weather, loading, error, recent searches
            </li>
            <li>
              <ConceptBadge label="Context API" /> share °C / °F unit across detail components
            </li>
            <li>
              <ConceptBadge label="Suspense" /> show fallback while lazy chunks load
            </li>
            <li>
              <ConceptBadge label="lazy" /> code-split WeatherCard, Summary, and Forecast
            </li>
            <li>
              <ConceptBadge label="useEffect" /> fetch weather on mount
            </li>
            <li>
              <ConceptBadge label="useRef" /> focus input on mount
            </li>
            <li>
              <ConceptBadge label="useMemo" /> compute weather summary only when data changes
            </li>
            <li>
              <ConceptBadge label="useCallback" /> stable handlers passed to child components
            </li>
            <li>
              <ConceptBadge label="Custom Hook" /> <code>useFocusOnMount</code>
            </li>
          </ul>
        </section>

        <UnitToggle />

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
            <ConceptBadge label="Zustand" />
            <ConceptBadge label="useEffect" />
          </div>
          <p className="weather-section__hint">
            <code>useWeatherStore</code> holds weather state with Zustand. <code>useEffect</code>{' '}
            loads London automatically when the page opens.
          </p>

          {loading && <p className="weather-status weather-status--loading">Fetching weather…</p>}

          {error && !loading && <p className="weather-status weather-status--error">{error}</p>}

          {!loading && !error && !weather && (
            <p className="weather-status">Search for a city to see the weather.</p>
          )}

          {!loading && weather && (
            <p className="weather-meta">
              API calls: {fetchCount}
              {previousCity && ` · Last fetched: ${previousCity}`}
            </p>
          )}
        </section>

        {!loading && !error && weather && (
          <Suspense fallback={<WeatherDetailsFallback />}>
            <WeatherCard location={weather.location} current={weather.current} />
            <WeatherSummary
              current={weather.current}
              forecastDays={weather.forecast.forecastday}
            />
            <ForecastList days={weather.forecast.forecastday} />
          </Suspense>
        )}
      </div>
    </UnitsProvider>
  )
}

export default WeatherApp
