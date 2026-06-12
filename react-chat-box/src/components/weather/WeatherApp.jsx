import { useState } from 'react'
import { fetchWeather } from '../../api/weatherApi'
import ConceptBadge from './ConceptBadge'
import WeatherSearch from './WeatherSearch'
import WeatherCard from './WeatherCard'
import ForecastList from './ForecastList'

function WeatherApp() {
  const [city, setCity] = useState('London')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  async function loadWeather(searchCity) {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchWeather(searchCity)
      setWeather(data)
    } catch (err) {
      setWeather(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (city.trim()) {
      loadWeather(city.trim())
    }
  }

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
      <WeatherSearch
        city={city}
        onCityChange={setCity}
        onSubmit={handleSubmit}
        loading={loading}
      />


      {!loading && !error && weather && (
        <>
          <WeatherCard location={weather.location} current={weather.current} />
          <ForecastList days={weather.forecast.forecastday} />
        </>
      )}
    </div>
  )
}

export default WeatherApp
