import { useMemo } from 'react'
import ConceptBadge from './ConceptBadge'

function WeatherSummary({ current, forecastDays }) {
  const summary = useMemo(() => {
    const avgHigh =
      forecastDays.reduce((sum, day) => sum + day.day.maxtemp_c, 0) / forecastDays.length

    let comfort = 'Cold'
    if (current.temp_c >= 30) comfort = 'Hot'
    else if (current.temp_c >= 20) comfort = 'Warm'
    else if (current.temp_c >= 10) comfort = 'Mild'

    return {
      comfort,
      avgHigh: avgHigh.toFixed(1),
      tempRange: `${Math.min(...forecastDays.map((d) => d.day.mintemp_c))}° – ${Math.max(...forecastDays.map((d) => d.day.maxtemp_c))}°`,
    }
  }, [current.temp_c, forecastDays])

  return (
    <section className="weather-section">
      <div className="weather-section__header">
        <h3>Weather summary</h3>
        <ConceptBadge label="useMemo" />
      </div>
      <p className="weather-section__hint">
        <code>useMemo</code> caches a computed value and only recalculates when{' '}
        <code>current.temp_c</code> or <code>forecastDays</code> change — avoiding work on every
        re-render.
      </p>

      <ul className="weather-summary">
        <li>
          <span>Comfort</span>
          <strong>{summary.comfort}</strong>
        </li>
        <li>
          <span>Avg high (3 days)</span>
          <strong>{summary.avgHigh}°C</strong>
        </li>
        <li>
          <span>Forecast range</span>
          <strong>{summary.tempRange}</strong>
        </li>
      </ul>
    </section>
  )
}

export default WeatherSummary
