import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/header'; // Import the Header component

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
    </>
  );
}

export default App
