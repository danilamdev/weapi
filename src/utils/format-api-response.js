export function formatApiResponse(data) {
  const { location, current } = data
  const { lat, lon, name, country, region, localtime } = location
  const { condition, feelslike_c: senTerm, humidity, temp_c, wind_dir, wind_kph, precip_mm, is_day, pressure_mb: pressure, vis_km, uv } = current

  let currentW = {
    lat, lon, name, country, region, localtime, condition, senTerm, humidity, temp_c, wind_dir, wind_kph, precip_mm, is_day, pressure, vis_km, uv
  }

  return currentW
}