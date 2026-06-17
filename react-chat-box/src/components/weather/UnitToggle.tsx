import { useUnits } from '../../context/UnitsContext'
import ConceptBadge from './ConceptBadge'

function UnitToggle() {
  const { unit, setUnit } = useUnits()

  return (
    <section className="weather-section">
      <div className="weather-section__header">
        <h3>Temperature unit</h3>
        <ConceptBadge label="Context API" />
      </div>
      <p className="weather-section__hint">
        <code>UnitsContext</code> shares the unit preference with any nested component via{' '}
        <code>useContext</code> — no prop drilling through <code>WeatherCard</code> or{' '}
        <code>ForecastDay</code>.
      </p>

      <div className="unit-toggle">
        <button
          type="button"
          className={`unit-toggle__btn${unit === 'celsius' ? ' unit-toggle__btn--active' : ''}`}
          onClick={() => setUnit('celsius')}
        >
          °C
        </button>
        <button
          type="button"
          className={`unit-toggle__btn${unit === 'fahrenheit' ? ' unit-toggle__btn--active' : ''}`}
          onClick={() => setUnit('fahrenheit')}
        >
          °F
        </button>
      </div>
    </section>
  )
}

export default UnitToggle
