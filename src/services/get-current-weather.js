import { formatApiResponse } from "../utils/format-api-response";

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e14db7a24cmsh538a58d88fac34dp1f94bcjsn1db82463bf0b',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};


export async function getCurrentWeather(city) {
  const response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options)
  const data = await response.json()

  return formatApiResponse(data)
}
