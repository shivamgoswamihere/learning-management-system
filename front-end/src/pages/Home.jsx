import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import herobg  from "../assets/herobg.jpg"
import fetchbg  from "../assets/example.jpg"

const Home = () => {


  return (
    <div className="font-sans bg-white">
      {/* Hero Section with Slider */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2">
          <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wide">
            ● On-Demand Course
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
            Complete Python Masterclass for Web Development
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Amet facilisi phasellus lacus, sit massa, erat placerat aenean aliquet ultrices eleifend enim enim lacus elit.
          </p>
          <div className="mt-6 flex gap-4">
            <Link to="/course/python" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md">
              Start Course
            </Link>
            <Link to="/courses" className="border border-white px-6 py-3 rounded-lg font-semibold">
              View All Courses →
            </Link>
          </div>
        </div>

        {/* Right: Image with Play Button */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={herobg}
            alt="Hero Course"
            className="w-full rounded-lg shadow-lg"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:bg-yellow-500 transition">
              <FaPlay className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </section>

      {/* Featured Course */}
      <section className="py-16 px-6 md:px-16 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left: Course Image */}
        <div className="w-full md:w-1/2">
          <img 
            src={fetchbg} 
            alt="Featured Course" 
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Course Details */}
        <div className="w-full md:w-1/2 text-left">
          <span className="text-yellow-500 font-semibold uppercase tracking-wide text-sm">
            ● Featured Course
          </span>
          <h2 className="text-4xl font-bold mt-2 leading-snug">
            Getting Started With Python 3 for Beginner
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Nibh enim nisi amet et nunc varius facilisis nulla non urna 
            pulvinar felis, faucibus id placerat.
          </p>

          {/* Course Highlights */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-gray-700">
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-600" /> Fundamental
            </p>
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-600" /> Conditional branching
            </p>
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-600" /> Input and output
            </p>
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-600" /> +8 more lessons
            </p>
          </div>

          {/* Button */}
          <Link 
            to="/course/python-3"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">
            Start Course
          </Link>
        </div>
      </div>
    </section>

      {/* Course Categories */}
      <section className="py-16 px-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Vue.js'].map((category, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{category}</h3>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-10 text-center">
        <h2 className="text-3xl font-bold">What Our Happy Students Say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((id) => (
            <div key={id} className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-700 italic">"This course changed my career!"</p>
              <p className="mt-4 text-gray-900 font-semibold">- Student {id}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-16 px-10 text-center">
        <h2 className="text-3xl font-bold">All Access Membership</h2>
        <p className="mt-2 text-gray-600">Get unlimited access to all courses.</p>
        <Link to="/subscribe" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">Subscribe & Save</Link>
      </section>
    </div>
  );
};

export default Home;
