import '../styles/home.css'
import ICONS from '../utils/icons'

import Search from './search'

import { getCurrentLoc } from '../services/get-current-location'
import { getCurrentWeather } from '../services/get-current-weather'
import { getForecastWeather } from '../services/get-forecast-weather'

export default function Home({cw, setCw, setForecast}){

  const getLocation = async () => {
    const location = await getCurrentLoc()
    const locationStr = `${location.lat},${location.lon}`

    window.localStorage.setItem('city',locationStr)

    const [currentWeather, forecastWeather] = await Promise.all([getCurrentWeather(locationStr), getForecastWeather()])

    // const currentWeather = await getCurrentWeather(locationStr)
    setCw(currentWeather)
    setForecast(forecastWeather)
  }
  
  const removeLocation = () => {
    window.localStorage.removeItem('city')
    setCw(null)
  }
  
  return (
    <section>
      <div className="main-app">
        <h1>We<span>api</span></h1>
        {cw 
          ? null 
          : (
          <div className="no-content">
            <div className="button" onClick={getLocation}>Get your <span>location</span></div>
          </div>
          )
        }

        {cw && (
          <>
            {/* <img className='icon' src={`/all/clear-${cw?.is_day ? 'day' : 'night'}.svg`} alt="clear" /> */}
            <img className='icon' src={ICONS[cw?.condition?.code]?.(cw?.is_day) ?? ''} alt={cw?.condition?.text} />

            <Search setCw={setCw}/>

            <div className='description'>
              <h2 className='condition'>{cw?.condition?.text}</h2>
              <button onClick={()=> removeLocation()}>
                <svg 
                  className="location-icon" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </button>
            </div>
            <p className='localtime'>Actualización {new Date(cw?.localtime).toLocaleTimeString('es-AR')}</p>
            <div className="details">
             
              <div className='card-details'>
                <img src="/all/umbrella.svg" alt="humedad" />
                <small>precipitacion</small>
                <p>{cw?.precip_mm}<span style={{fontSize: '.6em'}}>mm</span></p>
              </div>
              
              <div className='card-details'>
                <img src="/all/humidity.svg" alt="humedad" />
                <small>humedad</small>
                <p>{cw?.humidity}%</p>
              </div>
              
              <div className='card-details'>
                <img src="/all/wind.svg" alt="humedad" />
                <small>viento</small>
                <p>{cw?.wind_kph}<span style={{fontSize: '.6em'}}>km</span></p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}