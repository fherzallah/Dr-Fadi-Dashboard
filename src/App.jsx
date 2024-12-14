import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './main-page/NavBar'
import About from './main-page/About'
import MainPublications from './main-page/main-publicatoins'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllPublications from './publications-page/AllPublications'
import MainPage from './main-page/MainPage'
function App() {
  
  return (
    <div>
      
      <Router>
      <NavBar/>
        <Routes>
          <Route path='/publications' element={<AllPublications/>}></Route>
          <Route path='/' element={<MainPage/>}></Route>
        </Routes>
      </Router>
      {/* <div style={{height:"4000px"}}></div> */}
    </div>
  )
}

export default App
