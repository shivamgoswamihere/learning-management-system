import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./App.css";
import CourseDetails from "./pages/CourseDetails.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CourseDetails" element={<CourseDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
