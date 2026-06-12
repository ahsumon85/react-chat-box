import ConceptBadge from './ConceptBadge'

function WeatherCard({ location, current }) {
  return (
    <section className="weather-section">
      <div className="weather-section__header">
        <h3>Current weather</h3>
        <ConceptBadge label="Props" />
      </div>
      <p className="weather-section__hint">
        This component receives <code>location</code> and <code>current</code> as props from its parent — it does not fetch data itself.
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

        <p className="weather-card__temp">{current.temp_c}°C</p>

        <ul className="weather-card__details">
          <li>Feels like: {current.feelslike_c}°C</li>
          <li>Humidity: {current.humidity}%</li>
          <li>Wind: {current.wind_kph} km/h {current.wind_dir}</li>
        </ul>
      </div>
    </section>
  )
}

export default WeatherCard
