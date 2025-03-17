import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import CourseDetails from "./pages/CourseDetails.jsx";
import Profile from "./pages/Profile.jsx";
import CourseForm from "./pages/CourseForm.jsx";
import CoursesList from "./pages/Courses.jsx";
import Settings from "./components/Settings.jsx";
import CreateExam from "./pages/CreateExam.jsx";
import ExamList from "./pages/ExamList.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CourseDetails/:id" element={<CourseDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courseForm" element={<CourseForm />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/updateUser" element={<Settings />} />
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/exam" element={<ExamList />} />
        </Routes>
        <Footer/>
      </Router>

    </>
  );
}

export default App;
