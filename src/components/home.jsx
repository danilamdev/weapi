import '../styles/home.css'
import ICONS from '../utils/icons'

import Search from './search'

import { getCurrentLoc } from '../services/get-current-location'

export default function Home({city, setCity, current}){

  const getLocation = async () => {
    const location = await getCurrentLoc()
    const locationStr = `${location.lat},${location.lon}`

    setCity(locationStr)

    window.localStorage.setItem('city',locationStr)
  }
  
  const removeLocation = () => {
    window.localStorage.removeItem('city')
    setCity(null)
  }

  return (
    <section>
      <div className="main-app">
        <h1>We<span>api</span></h1>
        
        {current 
          ? null 
          : (
          <div className="no-content">
            <div className="button" onClick={getLocation}>Get your <span>location</span></div>
          </div>
          )
        }

        {current && (
          <>
            <img className='icon' src={ICONS[current?.condition?.code]?.(current?.is_day) ?? ''} alt={current?.condition?.text} />

            <Search setCity={setCity}/>

            <div className='description'>
              <h2 className='condition'>{current?.condition?.text}</h2>
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
            <p className='localtime'>Actualización {new Date(current?.localtime).toLocaleTimeString('es-AR')}</p>
            <div className="details">
             
              <div className='card-details'>
                <img src="/all/umbrella.svg" alt="humedad" />
                <small>precipitacion</small>
                <p>{current?.precip_mm}<span style={{fontSize: '.6em'}}>mm</span></p>
              </div>
              
              <div className='card-details'>
                <img src="/all/humidity.svg" alt="humedad" />
                <small>humedad</small>
                <p>{current?.humidity}%</p>
              </div>
              
              <div className='card-details'>
                <img src="/all/wind.svg" alt="humedad" />
                <small>viento</small>
                <p>{current?.wind_kph}<span style={{fontSize: '.6em'}}>km</span></p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}