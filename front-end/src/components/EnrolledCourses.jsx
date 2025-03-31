import React, { useState } from "react";
import { Link } from "react-router-dom";

const EnrolledCourses = ({ enrolledCourses }) => {
  const coursesPerPage = 3; // ✅ Change this to adjust pagination size
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Calculate total pages
  const totalPages = Math.ceil(enrolledCourses.length / coursesPerPage);

  // ✅ Get current courses for this page
  const currentCourses = enrolledCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">📚 My Enrolled Courses</h3>

      {currentCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCourses.map((course) => (
            <div key={course._id} className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h4 className="text-lg font-semibold text-gray-800">{course.title}</h4>
              <p className="text-gray-600 text-sm mb-2">{course.description}</p>
              <p className="text-xs text-green-500">
                ✅ Enrolled on: {new Date(course.enrolledDate).toLocaleDateString()}
              </p>

              <Link
                to={`/CourseDetails/${course._id}`}
                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
              >
                📖 Go to Course
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
      )}

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-sm rounded-md ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>
          <span className="text-gray-800 font-semibold">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-sm rounded-md ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
