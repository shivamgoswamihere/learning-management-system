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
import CreateExam from "./pages/CreateExam.jsx";
import ExamList from "./pages/ExamList.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutUsPage from './pages/AboutUsPage.jsx';
import StartExam from "./pages/StartExam.jsx";
import UsersList from "./components/UsersList.jsx";
import UserDetails from "./components/UserDetails.jsx";
function App() {

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
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/exams" element={<ExamList />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/exam/start/:examId" element={<StartExam />} />
          <Route path="/usersList" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
        <Footer/>
      </Router>

    </>
  );
}

export default App;
