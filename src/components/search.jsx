import { useState } from 'react'
import './search.css'

import { getCurrentWeather } from '../services/get-current-weather'

export default function Search({setCw}){

  const [city, setCity] = useState('')

  const onCityChange = (e)=> {
    setCity(e.target.value)
  }

  const handleClick = async (e) => {
    e.preventDefault()

    const currentWeather = await getCurrentWeather(city)
    console.log({weather: currentWeather})
    setCw(currentWeather)

    setCity('')
  }

  return (
    <form>
      <input className="searchbox" type="text" placeholder="enter your location..." value={city} onChange={onCityChange}/>

      <button className='btn-form' onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </form>
  )
}