import '../styles/toggle.css'
import DarkIcon from './dark-icon'
import LigthIcon from './light-icon'

export default function Toggle({darkMode, setDarkMode}){

  const handleDarkMode = (e) => {
    setDarkMode(prev => !prev)
    document.body.classList.toggle('dark')
  }


  return (
    <div className="toggle" onClick={handleDarkMode}>
      {
        darkMode 
          ? <LigthIcon/>
          : <DarkIcon />
      }
    </div>
  )
}