import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//bootstrap - included
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Register from './pages/Register.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
   
    <Routes>
     <Route path='/' element = {<Home/>}/>
     <Route path='/about' element = {<About/>}/>
     <Route path='/register' element = {<Register/>}/>
     <Route path='/login' element = {<Login/>}/>
     <Route path='/login' element = {<Login/>}/>

    </Routes>

    <Footer/>
    
    </BrowserRouter>
  </StrictMode>,
)
