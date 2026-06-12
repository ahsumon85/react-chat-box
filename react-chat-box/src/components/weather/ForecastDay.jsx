function ForecastDay({ day }) {
  return (
    <li className="forecast-day">
      <span className="forecast-day__date">{day.date}</span>
      <img
        className="forecast-day__icon"
        src={`https:${day.day.condition.icon}`}
        alt={day.day.condition.text}
      />
      <span className="forecast-day__condition">{day.day.condition.text}</span>
      <span className="forecast-day__temps">
        {day.day.maxtemp_c}° / {day.day.mintemp_c}°
      </span>
    </li>
  )
}

export default ForecastDay
