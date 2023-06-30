import React from 'react'
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/homepage/Homepage"
import Navbar from "./components/navigatiebar/Navbar";
import AboutUs from "./pages/aboutus/AboutUs"
import OurSounds from "./pages/ourSounds/OurSounds";
import Search from "./pages/search/Search";
import MySounds from "./pages/mysounds/MySounds";



function App() {
  return (
      <main>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/about-us" element={<AboutUs/>}></Route>
          <Route path="/our-sounds" element={<OurSounds/>}></Route>
          <Route path="/my-sounds" element={<MySounds/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
        </Routes>
      </main>

  );
}

export default App;
