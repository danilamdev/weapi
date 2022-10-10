const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e14db7a24cmsh538a58d88fac34dp1f94bcjsn1db82463bf0b',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
}


export async function getForecastWeather(city) {

  const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3&lang=es`, options)
  const data = await response.json()
  const apiResponde = data.forecast.forecastday

  const forecast = apiResponde.map((d => (
    {
      date: d.date.replaceAll('-', ','),
      max_temp: d.day.maxtemp_c,
      min_temp: d.day.mintemp_c,
      max_wind: d.day.maxwind_kph,
      humedad: d.day.avghumidity,
      will_rain: d.day.daily_chance_of_rain,
      condition: d.day.condition,
      visibility: d.day.avgvis_km
    }
  )))

  return forecast
}