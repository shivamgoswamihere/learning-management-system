import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import CourseDetails from "./pages/CourseDetails.jsx";
import Profile from "./pages/Profile.jsx";
import CreateCourseForm from "./components/CreateCourseForm.jsx";
import CoursesList from "./pages/Courses.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CourseDetails" element={<CourseDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courseForm" element={<CreateCourseForm />} />
          <Route path="/courses" element={<CoursesList />} />
        </Routes>
        <Footer/>
      </Router>

    </>
  );
}

export default App;
