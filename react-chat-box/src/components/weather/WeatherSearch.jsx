import ConceptBadge from './ConceptBadge'

function WeatherSearch({ city, onCityChange, onSubmit, loading }) {
  return (
    <section className="weather-section">
      <div className="weather-section__header">
        <h3>Search a city</h3>
      </div>
      <p className="weather-section__hint">
        <code>onChange</code> updates state as you type. <code>onSubmit</code> runs when you click the button or press Enter.
      </p>

      <form className="weather-search" onSubmit={onSubmit}>
        <input
          type="text"
          className="weather-search__input"
          placeholder="e.g. London, Tokyo, New York"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
        />
        <button type="submit" className="weather-search__btn" disabled={loading}>
          {loading ? 'Loading…' : 'Get Weather'}
        </button>
      </form>
    </section>
  )
}

export default WeatherSearch
