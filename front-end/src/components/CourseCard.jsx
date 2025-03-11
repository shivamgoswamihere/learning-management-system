import React from "react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

function CourseCard({ image, category, heading, level, duration, link }) {
  return (
    <Link to={link} className="group">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all group-hover:shadow-2xl p-4">
        {/* Course Image */}
        <div className="h-[180px] w-full overflow-hidden rounded-lg">
          <img
            src={image}
            alt="Course"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-all"
          />
        </div>

        {/* Course Info */}
        <div className="mt-4 space-y-2">
          {/* Category */}
          <span className="text-sm font-semibold uppercase text-blue-500">
            {category}
          </span>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900">{heading}</h2>

          {/* Level & Duration */}
          <div className="flex items-center justify-between text-gray-600 text-sm">
            <span className="flex items-center">
              🏅 {level}
            </span>
            <span className="flex items-center">
              <FaClock className="mr-1" /> {duration}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
