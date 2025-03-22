import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById, enrollCourse } from "../redux/courseSlice"; 

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCourse, loading, enrollmentSuccess, enrollmentError, error } = useSelector(
    (state) => state.courses
  );
  const token = useSelector((state) => state.auth.token);
  const [showLessons, setShowLessons] = useState(false);
  const [expandedSyllabusIndex, setExpandedSyllabusIndex] = useState(null);

  useEffect(() => {
    if (id) dispatch(fetchCourseById(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center text-lg">Loading course details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!selectedCourse) return <p className="text-center">Course not found.</p>;

  const handleToggleLessons = () => {
    setShowLessons(!showLessons);
  };

  const toggleSyllabus = (index) => {
    setExpandedSyllabusIndex(expandedSyllabusIndex === index ? null : index);
  };

  const handleEnroll = async () => {
    if (!selectedCourse || !selectedCourse._id) {
      alert("Course ID is missing. Unable to enroll.");
      return;
    }

    if (!token) {
      alert("Please login to enroll.");
      return;
    }

    dispatch(enrollCourse(selectedCourse._id));
  };

  return (
    <div className="max-w-full mx-auto mt-2 text-white">
    <button
      onClick={() => navigate(-1)}
      className="mb-2 mx-6 px-4 py-1 bg-gray-800 text-white hover:bg-gray-700 rounded transition"
    >
      ← Back
    </button>
  
    {/* Header Section */}
    <div className="grid grid-cols-2 gap-5 p-6 bg-gradient-to-r from-indigo-900 to-blue-600 rounded-lg shadow-lg">
      <div className="mt-4">
        <span className="bg-blue-300 text-blue-900 font-semibold p-2 py-1 text-left text-sm rounded">
          Category: {selectedCourse.category}
        </span>
        <h1 className="text-5xl font-extrabold mt-4 text-white">
          {selectedCourse.title}
        </h1>
        <p className="text-gray-200 mt-2">{selectedCourse.description}</p>
  
        <div className="mt-4 space-y-2 text-lg">
          <p>
            <strong className="text-blue-300">Price:</strong>{" "}
            {selectedCourse.price === 0 ? "Free" : `$${selectedCourse.price}`}
          </p>
          <p>
            <strong className="text-blue-300">Duration:</strong>{" "}
            {selectedCourse.duration}
          </p>
          {selectedCourse.prerequisites && (
            <p>
              <strong className="text-blue-300">Prerequisites:</strong>{" "}
              {selectedCourse.prerequisites}
            </p>
          )}
          <p>
            <strong className="text-blue-300">Certification:</strong>{" "}
            {selectedCourse.certificationAvailable ? "Yes" : "No"}
          </p>
        </div>
  
        <button
          onClick={handleEnroll}
          disabled={loading}
          className="bg-orange-500 text-white px-5 py-2 my-6 rounded-lg hover:bg-orange-600 transition-all"
        >
          {loading ? "Enrolling..." : "Enroll in Course"}
        </button>
      </div>
  
      {/* Image Section */}
      <div className="relative w-full h-80 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
        <img
          src={
            selectedCourse.thumbnail || "https://via.placeholder.com/800x400"
          }
          alt={selectedCourse.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  
    {/* Show Lessons Button */}
    <div className="mt-6 mx-6">
      <button
        onClick={handleToggleLessons}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
      >
        {showLessons ? "Hide Lessons" : "Show Lessons"}
      </button>
  
      {showLessons && (
        <div className="mt-4 text-black">
          <h2 className="text-2xl font-bold mb-3">Course Lessons</h2>
          {selectedCourse.lessons.length > 0 ? (
            selectedCourse.lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="border p-4 rounded-lg mt-2 bg-gray-50 shadow"
              >
                <h4 className="font-semibold">{lesson.title}</h4>
                <video
                  src={lesson.videoUrl}
                  controls
                  className="w-full h-40 mt-2 rounded-lg"
                />
              </div>
            ))
          ) : (
            <p>No lessons available.</p>
          )}
        </div>
      )}
    </div>
  
    {/* Syllabus Section */}
    <div className="mt-8 mx-6">
      <h3 className="text-3xl font-bold mb-5 text-gray-900">Syllabus</h3>
      <div className="space-y-4">
        {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 ? (
          selectedCourse.syllabus.map((module, index) => (
            <div
              key={index}
              className="border border-gray-300 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleSyllabus(index)}
                className="w-full text-left font-semibold text-lg flex justify-between items-center focus:outline-none"
              >
                <span className="text-gray-900">{module.title}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">Module Details</span>
                  <span className="text-gray-600">
                    {expandedSyllabusIndex === index ? "▲" : "▼"}
                  </span>
                </div>
              </button>
              {expandedSyllabusIndex === index && (
                <div className="mt-3 text-gray-700 transition-all duration-300">
                  <p className="mt-2 bg-gray-100 p-4 rounded-lg">
                    {module.description}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-lg">No syllabus available.</p>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default CourseDetails;