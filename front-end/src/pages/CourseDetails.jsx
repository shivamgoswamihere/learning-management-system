import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CourseDeatils = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1350px] mx-auto px-4">
        <div className="hero grid grid-cols-2 gap-2 my-2">
          <div className="image bg-amber-600 w-full h-full rounded-sm"></div>
          <div className="details flex flex-col gap-5">
            <h2 className="text-3xl font-bold">
              Full Stack Development Course
            </h2>
            <p>Duration: 6 months</p>
            <p>Course Fee: $1000</p>
            <p>
              Course Description: This course is designed to teach students the
              skills needed to become a full stack developer. Students will
              learn about front-end and back-end development, as well as
              database management and security.
            </p>
            <button className="bg-black text-white p-2 rounded-sm">
              Enroll Now
            </button>
          </div>
        </div>
        <div className="fullDetails">
          <div className="learnings"></div>
          <div className="trainer"></div>
        </div>
        <div className="Course">
          <div className="CourseContent"></div>
          <div className="videoplayer"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDeatils;
