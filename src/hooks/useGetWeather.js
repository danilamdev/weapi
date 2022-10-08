import { useState, useEffect } from "react"
import { getCurrentWeather } from "../services/get-current-weather"
import { getForecastWeather } from "../services/get-forecast-weather"

export function useGetWeather() {

  const [weather, setWeather] = useState({ current: null, forecast: null })
  const [city, setCity] = useState(null)


  useEffect(() => {

    if (!city) return

    const gettingPromises = async () => {
      let [c, f] = await Promise.all([getCurrentWeather(city), getForecastWeather()])
      setWeather((prev) => ({ current: c, forecast: f }))
    }
    gettingPromises()

  }, [city])

  return {
    current: weather.current,
    forecast: weather.forecast,
    city,
    setCity
  }
}