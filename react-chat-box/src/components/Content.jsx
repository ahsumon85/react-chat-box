import WeatherApp from './weather/WeatherApp'

function Content() {
  return (
    <main className="content">
      <h2>Learn React with WeatherAPI</h2>
      <p>
        Build a real weather app and learn JSX, components, props, state, events, lists, and
        conditional rendering along the way.
      </p>
      <WeatherApp />
    </main>
  )
}

export default Content
