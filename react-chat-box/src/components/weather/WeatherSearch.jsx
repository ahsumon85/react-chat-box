import ConceptBadge from './ConceptBadge'

function WeatherSearch({
  city,
  onCityChange,
  onSubmit,
  loading,
  inputRef,
  recentSearches,
  onRecentSelect,
}) {
  return (
    <section className="weather-section">
      <div className="weather-section__header">
        <h3>Search a city</h3>
        <ConceptBadge label="useCallback" />
        <ConceptBadge label="useRef" />
      </div>
      <p className="weather-section__hint">
        <code>useRef</code> focuses the input on mount. <code>useCallback</code> keeps{' '}
        <code>onSubmit</code> and <code>onRecentSelect</code> stable so child components do not
        re-render unnecessarily.
      </p>

      <form className="weather-search" onSubmit={onSubmit}>
        <input
          ref={inputRef}
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

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <span className="recent-searches__label">Recent:</span>
          {recentSearches.map((recentCity) => (
            <button
              key={recentCity}
              type="button"
              className="recent-searches__btn"
              onClick={() => onRecentSelect(recentCity)}
            >
              {recentCity}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export default WeatherSearch
