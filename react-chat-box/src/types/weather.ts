export interface WeatherLocation {
  name: string
  country: string
}

export interface WeatherCondition {
  text: string
  icon: string
}

export interface WeatherCurrent {
  temp_c: number
  feelslike_c: number
  humidity: number
  wind_kph: number
  wind_dir: string
  condition: WeatherCondition
}

export interface ForecastDay {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    condition: WeatherCondition
  }
}

export interface WeatherData {
  location: WeatherLocation
  current: WeatherCurrent
  forecast: {
    forecastday: ForecastDay[]
  }
}
