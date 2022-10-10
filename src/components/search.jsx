import { useState } from 'react'
import '../styles/search.css'

import { usePlacesWidget } from "react-google-autocomplete";

export default function Search({setCity}){
  const [location, setLocation] = useState({place:'', loc: null})
  
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey:'AIzaSyAmiDJ06VXvbY1j8vptnimXALOohmn96tY',
    onPlaceSelected: (place) => {
      const loc = {
        lat : place.geometry.location.lat(),
        lon : place.geometry.location.lng()
      }

      setLocation((prev) => ({place: place.formatted_address, loc}))
    }})


  const onCityChange = (e)=> {
    setLocation((prev) => ({...prev, place: e.target.value}))
  }

  const onSubmitLocation = async (e) => {
    e.preventDefault()
    if(!location.loc) return 

    setCity(`${location.loc.lat},${location.loc.lon}`)
    setLocation({place: '', loc: null})
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input ref={ref} className="searchbox" type="text" placeholder="enter your location..." value={location.place} onChange={onCityChange}/>

      <button className='btn-form' onClick={onSubmitLocation}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </form>
  )
}