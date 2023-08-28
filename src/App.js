import React, {useContext} from 'react'
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/homepage/HomePage";
import Navbar from "./components/navigatiebar/Navbar";
import AboutUs from "./pages/aboutUs/AboutUs"
import OurSounds from "./pages/ourSounds/OurSounds";
import Search from "./pages/search/Search";
import MySounds from "./pages/mysounds/MySounds";
import {AuthContext} from "./context/AuthContext";




function App() {

    const {isAuthenticated} = useContext(AuthContext);

  return (

      <main>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/about-us" element={<AboutUs/>}></Route>
          <Route path="/our-sounds" element={<OurSounds/>}></Route>
            <Route path="/my-sounds" element={isAuthenticated ? <MySounds/> : <Navigate to='/'/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
        </Routes>
      </main>

  );
}

export default App;
