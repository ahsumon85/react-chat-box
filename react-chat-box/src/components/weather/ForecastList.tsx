import type { ForecastDay as ForecastDayData } from '../../types/weather'
import ConceptBadge from './ConceptBadge'
import ForecastDay from './ForecastDay'

interface ForecastListProps {
  days: ForecastDayData[]
}

function ForecastList({ days }: ForecastListProps) {
  return (
    <section className="weather-section">
      <div className="weather-section__header">
        <h3>3-day forecast</h3>
        <ConceptBadge label="Lists & Keys" />
      </div>
      <p className="weather-section__hint">
        We use <code>.map()</code> to render a list. Each item gets a unique <code>key</code>{' '}
        (here: <code>day.date</code>) so React can track changes efficiently.
      </p>

      <ul className="forecast-list">
        {days.map((day) => (
          <ForecastDay key={day.date} day={day} />
        ))}
      </ul>
    </section>
  )
}

export default ForecastList
