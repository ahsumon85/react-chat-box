import { useUnits } from '../../context/UnitsContext'
import type { WeatherCurrent, WeatherLocation } from '../../types/weather'
import ConceptBadge from './ConceptBadge'

interface WeatherCardProps {
  location: WeatherLocation
  current: WeatherCurrent
}

function WeatherCard({ location, current }: WeatherCardProps) {
  const { formatTemp } = useUnits()

  return (
    <section className="weather-section">
      <div className="weather-section__header">
        <h3>Current weather</h3>
        <ConceptBadge label="Props" />
        <ConceptBadge label="Context API" />
      </div>
      <p className="weather-section__hint">
        This component receives <code>location</code> and <code>current</code> as props, and reads
        the unit preference from <code>UnitsContext</code> with <code>useUnits()</code>.
      </p>

      <div className="weather-card">
        <div className="weather-card__main">
          <img
            className="weather-card__icon"
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
          />
          <div>
            <h4 className="weather-card__city">
              {location.name}, {location.country}
            </h4>
            <p className="weather-card__condition">{current.condition.text}</p>
          </div>
        </div>

        <p className="weather-card__temp">{formatTemp(current.temp_c)}</p>

        <ul className="weather-card__details">
          <li>Feels like: {formatTemp(current.feelslike_c)}</li>
          <li>Humidity: {current.humidity}%</li>
          <li>
            Wind: {current.wind_kph} km/h {current.wind_dir}
          </li>
        </ul>
      </div>
    </section>
  )
}

export default WeatherCard
