import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Footer from "./components/Footer";
import Header from './components/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header active_page="home" />
      <div className="App">
        <h1>Welcome to Critter Haven Crafts!</h1>
        <p>Your one-stop shop for adorable, handmade critter-themed crafts. Explore our collection of unique items, perfect for any critter lover.</p>
        <img src={heroImg} alt="Hero Image" className="hero-image" />
      </div>
      <Footer />
    </>
  )
}

export default App
