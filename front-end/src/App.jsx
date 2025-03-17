import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import CourseDetails from "./pages/CourseDetails.jsx";
import TrainerCourseDetails from "./pages/TrainerCourseDetails.jsx";
import Profile from "./pages/Profile.jsx";
import CourseForm from "./pages/CourseForm.jsx";
import CoursesList from "./pages/Courses.jsx";
import Settings from "./components/Settings.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutUsPage from './pages/AboutUsPage.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CourseDetails/:id" element={<CourseDetails />} />
          <Route path="/TrainerCourseDetails/:id" element={<TrainerCourseDetails/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courseForm" element={<CourseForm />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/updateUser" element={<Settings />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer/>
      </Router>

    </>
  );
}

export default App;
