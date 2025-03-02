import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import CourseDetails from "./pages/CourseDetails.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CourseDetails" element={<CourseDetails />} />
        </Routes>
        <Footer/>
      </Router>

    </>
  );
}

export default App;
