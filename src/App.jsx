import './App.css'

import Home from './components/home'

function App() {

  return (
    <main className="App">
      <header>
        <p>25</p>
        <div style={{overflow: "hidden"}}>
          <svg
            className='header-divider'
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fill: '#ffffff', width: '100%', height: 50, transform: 'rotate(180deg)' }}
          >
            <path d="M1200 120L0 16.48V0h1200v120z" />
          </svg>
        </div>
      </header>
      <Home />
    </main>
  )
}

export default App
