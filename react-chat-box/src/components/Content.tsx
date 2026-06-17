import WeatherApp from './weather/WeatherApp'

function Content() {
  return (
    <main className="content">
      <h2>Learn React with WeatherAPI</h2>
      <p>
        Build a real weather app and learn components, props, events, lists, Zustand for state,
        Context API, Suspense and lazy loading, and React hooks — useEffect, useRef, useMemo,
        useCallback, and custom hooks.
      </p>
      <WeatherApp />
    </main>
  )
}

export default Content
