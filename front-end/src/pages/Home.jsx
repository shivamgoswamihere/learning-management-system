import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/courseSlice";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import herobg from "../assets/herobg.jpg";
import fetchbg from "../assets/example.jpg";
import reviewbg from "../assets/reviewbg.png";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import html5 from "../assets/html5.svg";
import css3 from "../assets/css3.svg";
import javascript from "../assets/js.svg";
import nodejs from "../assets/node-js.svg";
import python from "../assets/python.svg";
import react from "../assets/react.svg";
import vue from "../assets/vuejs.svg";
import angular from "../assets/angular.svg";
import CourseCategories from "../components/CourseCategories";

const Home = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [additionalCourses, setAdditionalCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      let index = 1;
      setFeaturedCourse(courses[index]);
      setAdditionalCourses(courses.slice(1, 7));
      const interval = setInterval(() => {
        index = (index + 1) % courses.length;
        setFeaturedCourse(courses[index]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [courses]);

  const icons = [
    { src: html5, alt: "HTML5" },
    { src: css3, alt: "CSS3" },
    { src: javascript, alt: "JavaScript", bg: true },
    { src: nodejs, alt: "Node.js" },
    { src: python, alt: "Python" },
    { src: react, alt: "React" },
    { src: vue, alt: "Vue.js" },
    { src: angular, alt: "Angular" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Emma Hart",
      text: "Massa amet, at dolor tellus pellentesque aenean in eget massa tincidunt habitasse volutpat adipiscing sed id sit auctor eu vivamus nulla.",
      image: "/images/emma.jpg",
    },
    {
      id: 2,
      name: "Eddie Johnson",
      text: "Ut morbi felis, felis massa quam sit massa, amet, bibendum pulvinar elit in adipiscing amet imperdiet ac felis congue enim, elementum orci.",
      image: "/images/eddie.jpg",
    },
    {
      id: 3,
      name: "Jonathan Doe",
      text: "Donec in varius facilisis justo, curabitur aliquet sit justo sed sit interdum diam dolor ornare quis a felis adipiscing hendrerit quisque enim.",
      image: "/images/jonathan.jpg",
    },
    {
      id: 4,
      name: "Mike Edward",
      text: "Pulvinar dui vitae enim, diam et nulla elit nam leo lacinia et, a, pulvinar gravida enim in blandit mauris vitae volutpat urna, sed justo hendrerit.",
      image: "/images/mike.jpg",
    },
  ];

  return (
    <div className="font-sans bg-white">
      {/* Hero Section with Slider */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left: Text Content */}
          <div className="w-full md:w-1/2">
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wide">
              ● On-Demand Course
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
              {featuredCourse ? featuredCourse.title : "Loading..."}
            </h1>
            <p className="text-lg text-gray-300 mt-4">
              {featuredCourse ? featuredCourse.description : "Please wait..."}
            </p>
            <div className="mt-6 flex gap-4">
              {featuredCourse && (
                <Link
                  to={`/CourseDetails/${featuredCourse._id}`}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md"
                >
                  Start Course
                </Link>
              )}
              <Link
                to="/courses"
                className="border border-white px-6 py-3 rounded-lg font-semibold"
              >
                View All Courses →
              </Link>
            </div>
          </div>

          {/* Right: Image with Play Button */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={featuredCourse ? featuredCourse.thumbnail : "Loading..."}
              alt="Hero Course"
              className="w-full h-[300px] object-fill rounded-lg shadow-lg"
            />
            {/* Play Button Overlay */}
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:bg-yellow-500 transition">
                <FaPlay className="text-2xl" />
              </button>
            </div> */}
          </div>
        </div>
      </section>
      <div className="mt-5 flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-10 py-6 bg-white max-w-screen-lg mx-auto">
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={icon.alt}
            className="w-12 sm:w-14 md:w-16 lg:w-20 h-12 filter grayscale opacity-80 transition hover:opacity-100"
          />
        ))}
      </div>

      {/* Review Section */}
      {/* <section className="py-16 px-6 md:px-16 relative flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 relative">
          <img
            src={reviewbg}
            alt="Happy Student"
            className="w-full rounded-lg "
          />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <h3 className="text-sm text-gray-500 uppercase">
            What Our Happy Students Say
          </h3>
          <p className="mt-3 text-2xl font-semibold text-gray-800">
            "Mauris auctor sit consequat sed aenean purus egestas porta vel
            fermentum, nec nisi at eget non, nisi tincidunt tempus."
          </p>
          <p className="mt-4 text-lg font-semibold text-gray-900">
            Elena Miles
          </p>
          <p className="text-gray-500">Student</p>
          <Link
            to="/reviews"
            className="mt-6 inline-block text-blue-600 font-semibold"
          >
            Read All Reviews →
          </Link>
        </div>
      </section> */}

      {/* Featured Course */}
      
      {/* Additional Courses */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">More Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalCourses.map((course) => (
            <CourseCard
              key={course._id}
              image={course.thumbnail || "https://via.placeholder.com/300"}
              category={course.category || "General"}
              heading={course.title || "Untitled Course"}
              level={course.level || "Beginner"}
              duration={course.duration || "N/A"}
              link={`/CourseDetails/${course._id}`} // ✅ Dynamic Link
            />
          ))}
        </div>
      </section>

      {/* Course Categories */}
      {/* <CourseCategories /> */}

      {/* Testimonials */}
      {/* <section className="bg-gray-100 py-16 px-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Trusted by Thousands of Students and Tutors
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-start relative"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full absolute -top-6 left-6 border-4 border-white shadow-md"
              />
              <p className="text-gray-700 italic mt-10">"{testimonial.text}"</p>
              <p className="mt-4 text-gray-900 font-semibold">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
        <button className="mt-8 px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
          Start Learning
        </button>
      </section> */}

      {/* Membership Section */}
      {/* <section className="py-16 px-10 text-center">
        <h2 className="text-3xl font-bold">All Access Membership</h2>
        <p className="mt-2 text-gray-600">
          Get unlimited access to all courses.
        </p>
        <Link
          to="/subscribe"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Subscribe & Save
        </Link>
      </section> */}
    </div>
  );
};

export default Home;
