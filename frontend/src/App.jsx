import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "@clerk/react"; // <-- Import this
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home.jsx'
import About from './pages/About.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/PageNotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AuthGuard from './components/AuthGuard.jsx'

function App() {
  // Listen to Clerk's authentication state
  const { isSignedIn, isLoaded } = useAuth();
  
  useEffect(() => {
    // Only check for the error when the user is fully loaded AND signed out
    if (isLoaded && !isSignedIn) {
      const authError = sessionStorage.getItem("auth_error");
      
      if (authError) {
        toast.error(authError, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        
        // Clean up so it doesn't show again
        sessionStorage.removeItem("auth_error");
      }
    }
  }, [isSignedIn, isLoaded]); // <-- This array tells React to run this effect whenever auth state changes

  return (
    <>
      <AuthGuard />
      
      <Navbar />

      <Routes>
        <Route path='/' element={<About />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/home/*' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;