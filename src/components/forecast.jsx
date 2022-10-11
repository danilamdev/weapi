import '../styles/forecast.css'
import ICONS from '../utils/icons'

import { useAutoAnimate } from '@formkit/auto-animate/react'


export default function Forecast({forecast}){

  const [parent] = useAutoAnimate({duration: 1000})

  return (
    <div className="forecast-back">
      <div className="main-forecast">
        <h2 className='forecast-title'>forecast</h2>
        <div ref={parent} className="forecast-container">
        {
          forecast.map( d => (
            <div key={d.date} className="forecast-card">
              <p className='date'>{new Date(d.date).toLocaleString('es',{weekday:'long'})}</p>
              <img className='forecast-icon' src={ICONS[d?.condition?.code]?.(1) ?? ''} alt={d?.condition?.text} />
              <div className='forecast-description'>
                <p style={{ marginBottom: '1em', textAlign: 'center'}}>{d.condition.text}</p>
              </div>
              <div className='forecast-data'>
                <p>max temp: <span>{d.max_temp} °c</span></p>
                <p>min temp: <span>{d.min_temp} °c</span> </p>
                <p>humedad: <span>{d.humedad} %</span> </p>
                <p>visibility: <span>{d.visibility} km</span></p>
                <p>wind: <span>{d.max_wind} km</span></p>
                <p>rain: <span>{d.will_rain} %</span></p>
              </div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  )
}