import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './components/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h2>hello</h2>
    <Game />
    </>
  )
}

export default App
