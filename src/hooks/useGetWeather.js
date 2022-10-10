import { useState, useEffect } from "react"
import { getCurrentWeather } from "../services/get-current-weather"
import { getForecastWeather } from "../services/get-forecast-weather"

const INITIAL_STATE = {
  current: null,
  forecast: null
}

export function useGetWeather() {

  const [weather, setWeather] = useState(INITIAL_STATE)
  const [city, setCity] = useState(null)

  useEffect(() => {

    if (!city) {
      setWeather(INITIAL_STATE)
      return
    }

    const gettingPromises = async () => {
      let [c, f] = await Promise.all([getCurrentWeather(city), getForecastWeather(city)])
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