import './home.css'
import ICONS from '../utils/icons'

import Search from './search'

import { getCurrentLoc } from '../services/get-current-location'
import { getCurrentWeather } from '../services/get-current-weather'

export default function Home({cw, setCw}){

  const handleClick = async () => {
    const location = await getCurrentLoc()
    const locationStr = `${location.lat},${location.lon}`

    window.localStorage.setItem('city',locationStr)

    const currentWeather = await getCurrentWeather(locationStr)
    setCw(currentWeather)
    }
  console.log(ICONS[cw?.condition?.code])
  console.log(cw)
  return (
    <section>
      <div className="main-app">
        <h1>We<span>api</span></h1>

        {cw 
          ? null 
          : (
          <div className="no-content">
            <div className="button" onClick={handleClick}>Get your <span>location</span></div>
          </div>
          )
        }

        {cw && (
          <>
            {/* <img className='icon' src={`/all/clear-${cw?.is_day ? 'day' : 'night'}.svg`} alt="clear" /> */}
            <img className='icon' src={ICONS[cw?.condition?.code]?.(cw?.is_day) ?? ''} alt={cw?.condition?.text} />

            <Search setCw={setCw}/>

            <h2 className='condition'>{cw?.condition?.text}</h2>
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