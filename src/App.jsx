import { useEffect, useState } from 'react';
import './App.css'

import Home from './components/home'
import { getCurrentWeather } from './services/get-current-weather';


function App() {
  const [cw, setCw] = useState(null)

  const removeLocation = () => {
    window.localStorage.removeItem('city')

    setCw(null)
  }

  useEffect(()=> {
    const ciudad = window.localStorage.getItem('city')
    if(!ciudad) return

    async function updateWeather(){
      const currentW = await getCurrentWeather(ciudad)
      console.log('curr', currentW)
      
      setCw(currentW)
    }
    updateWeather()
    

  },[])

  return (
    <main className="App">
      <header>
        <div className='header-container'>
          {cw && <p className='temp'>{cw?.temp_c}<span style={{fontSize: '.5em'}}>c</span> </p>}
          {cw && <p className='location'>{cw?.name}</p>}
          {cw && <small className='region'>{`${cw?.region}, ${cw?.country}`}</small>}
          {cw && <button onClick={()=> removeLocation()}>CHAUUUUUUUUUU</button>}
        </div>
        <div style={{overflow: "hidden"}}>
          <svg
            className='header-divider'
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{  width: '100%', height: 50, transform: 'rotate(180deg)' }}
          >
            <path d="M1200 120L0 16.48V0h1200v120z" />
          </svg>
        </div>
      </header>
      <Home cw={cw} setCw={setCw}/>
    </main>
  )
}

export default App
