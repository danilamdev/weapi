import '../styles/forecast.css'

export default function Forecast({forecast}){
  return (
    <div className="main-forecast">
      <h2>forecast...</h2>
      <div className="forecast-container">
      {
        forecast.map( d => (
          <div key={d.date} className="forecast-card">
            <p>{new Date(d.date).toLocaleString('es',{weekday:'long'})}</p>
          </div>
        ))
      }
      </div>
    </div>
  )
}