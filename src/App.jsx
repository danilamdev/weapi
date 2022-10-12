import { useEffect, useState } from 'react';
import './App.css'

import Home from './components/home'
import Toggle from './components/toggle';
import Forecast from './components/forecast';
import { useGetWeather } from './hooks/useGetWeather';


function App() {
  const {city, setCity, current: c, forecast:f} = useGetWeather()
  const [darkMode, setDarkMode] = useState(false)

  let isDarkMode = window.matchMedia('@media (prefers-color-scheme: dark)').matches
  
  useEffect(()=> {
    const location = window.localStorage.getItem('city')
    if(!location) return

    setCity(location)
  },[])

  useEffect(()=> {
    if(isDarkMode || darkMode){
      document.body.classList.add('dark')
    }
  },[])

  return (
    <main className="App">
      <header>
        <div className="toggle-container">
          <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <div className='header-container'>
          {c && (
            <div className='stat-container'>
              <p className='temp'>{c?.temp_c}<span style={{fontSize: '.5em'}}>c</span> </p>
              <p className='location'>{c?.name}</p>
              <small className='region'>{`${c?.region}, ${c?.country}`}</small>
              <time dateTime={c?.localtime} className='time'>{c?.localtime.split(' ')[1]}</time>
            </div>
          )}
        </div>
      </header>
    
      <Home 
        city={city}
        setCity={setCity}
        current={c}
      />
      {c && (
        <>
          <details className='details-app' >
            <summary>Mas detalles...</summary>
              <div className="details-info">
                <p>temperatura: <span>{c?.temp_c}°c</span></p>
                <p>sens T.: <span>{c?.senTerm}°c</span></p>
                <p>vel. viento: <span>{c?.wind_kph}km</span></p>
                <p>direccion viento: <span>{c?.wind_dir}</span></p>
                <p>visibilidad: <span>{c?.vis_km}km</span></p>
                <p>presion: <span>{c?.pressure} hPa</span></p>
                <p>uv: <span>{c?.uv}</span></p>
              </div>
          </details>
          <Forecast forecast={f}/>
        
         <iframe
            className='map-iframe'
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/view?zoom=13&key=AIzaSyAmiDJ06VXvbY1j8vptnimXALOohmn96tY&center=${c.lat},${c.lon}`}>
          </iframe>

        </>
      )}
     
    </main>
  )
}

export default App
