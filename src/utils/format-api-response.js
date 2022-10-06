export function formatApiResponse(data) {
  const { location, current } = data
  const { lat, lon, name, country, region, localtime } = location
  const { condition, feelslike_c: senTerm, humidity, temp_c, wind_dir, wind_kph, precip_mm, is_day } = current

  let currentW = {
    lat, lon, name, country, region, localtime, condition, senTerm, humidity, temp_c, wind_dir, wind_kph, precip_mm, is_day
  }

  return currentW
}