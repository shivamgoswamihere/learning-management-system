import React from "react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

function CourseCard({ image, category, heading, level, duration, link }) {
  return (
    <Link to={link} className="group">
      <div className="bg-white shadow-lg overflow-hidden transition-all group-hover:shadow-2xl border-[1px] border-gray-300 p-4 group-hover:scale-105">
        {/* Course Image */}
        <div className="w-full overflow-hidden">
          <img
            src={image}
            alt="Course"
            className="w-[300px] h-[150px] object-cover transform group-hover:scale-105 transition-all"
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
              <FaClock className="mr-1" />Duration: {duration}hrs
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
