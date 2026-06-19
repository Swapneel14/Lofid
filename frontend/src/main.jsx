import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//bootstrap - included
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import About from './pages/About.jsx'
import Register from './pages/Register.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/PageNotFound.jsx'
import { ClerkProvider } from '@clerk/react'
import AuthGuard from './components/AuthGuard.jsx'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  throw new error("Missing publishable key");
}

createRoot(document.getElementById('root')).render(
  
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthGuard />
      <BrowserRouter>
        <Navbar />

        <Routes>
           <Route path='/' element={<About />} />
          <Route path='/home/*' element={<Home />} />
         
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<NotFound />} />
         

        </Routes>

        <Footer />

      </BrowserRouter>
    </ClerkProvider>
  
)
