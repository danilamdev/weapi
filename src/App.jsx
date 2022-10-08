import { useEffect, useState } from 'react';
import './App.css'

import Home from './components/home'
import Forecast from './components/forecast';
import { getCurrentWeather } from './services/get-current-weather';
import { getForecastWeather } from './services/get-forecast-weather'




function App() {
  const [cw, setCw] = useState(null)
  const [forecast, setForecast] = useState([])

  
  useEffect(()=> {
    const location = window.localStorage.getItem('city')
    if(!location) return
    
    async function updateWeather(){
      
      const [currentWeather, forecastWeather] = await Promise.all([getCurrentWeather(location), getForecastWeather()])
      setCw(currentWeather)
      setForecast(forecastWeather)
    }
    updateWeather()
  },[])

  return (
    <main className="App">
      <header>
        <div className='header-container'>
          {cw && (
            <div className='stat-container'>
              <p className='temp'>{cw?.temp_c}<span style={{fontSize: '.5em'}}>c</span> </p>
              <p className='location'>{cw?.name}</p>
              <small className='region'>{`${cw?.region}, ${cw?.country}`}</small>
              <time dateTime={cw?.localtime} className='time'>{cw?.localtime.split(' ')[1]}</time>
            </div>
          )}
         
        </div>
       
      </header>
      <Home cw={cw} setCw={setCw} setForecast={setForecast}/>

      {cw && (
        <>
         <details className='details-app'>
          <summary>Mas detalles...</summary>
          <div className="details-info">
            <p>temperatura: <span>{cw?.temp_c}°c</span></p>
            <p>sensacion termica: <span>{cw?.senTerm}°c</span></p>
            <p>vel. viento: <span>{cw?.wind_kph}km</span></p>
            <p>direccion viento: <span>{cw?.wind_dir}</span></p>
            <p>visibilidad: <span>{cw?.vis_km}km</span></p>
            <p>presion: <span>{cw?.pressure} hPa</span></p>
            <p>uv: <span>{cw?.uv}</span></p>
          </div>
        </details>
        <Forecast forecast={forecast}/>
        </>
      )}
     
    </main>
  )
}

export default App
