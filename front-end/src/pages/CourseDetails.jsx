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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
  {/* Course Information */}
  <div className="col-span-1 md:col-span-3 mt-2 md:mt-0">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
      {selectedCourse.title}
    </h1>
    <p className="text-gray-600 mt-2 text-sm md:text-base">
      {selectedCourse.description}
    </p>

    {/* Additional Details */}
    <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
      <p>
        <strong>Category:</strong> {selectedCourse.category}
      </p>
      <p>
        <strong>Certification:</strong>{" "}
        {selectedCourse.certificationAvailable ? "Yes" : "No"}
      </p>
      <p>
        <strong>{selectedCourse.duration}</strong> total hours
      </p>
      <p>{selectedCourse.level || "Beginner"}</p>
    </div>

    {/* Prerequisites */}
    {selectedCourse.prerequisites && (
      <p className="text-sm text-gray-500 mt-3">
        <strong>Prerequisites:</strong> {selectedCourse.prerequisites}
      </p>
    )}

    {/* Pricing and Button */}
    <div className="mt-4">
      <div className="text-lg font-bold text-green-700">
        ₹{selectedCourse.price || "449"}{" "}
      </div>
      <button
        onClick={handleEnroll}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 mt-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        {loading ? "Enrolling..." : "Enroll Now"}
      </button>
    </div>
  </div>

  {/* Course Thumbnail on the Right Side */}
  <div className="col-span-1 md:col-span-2 relative w-full h-52 md:h-60 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
    <img
      src={selectedCourse.thumbnail || "https://via.placeholder.com/800x400"}
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
  <div className="mt-8 text-black">
    {/* Course Lessons Heading */}
    <h2 className="text-2xl font-bold mb-6 text-gray-800">📚 Course Lessons</h2>

    {selectedCourse?.lessons?.length > 0 ? (
      <div className="space-y-6">
        {selectedCourse.lessons.map((lesson, index) => (
          <div
            key={lesson._id}
            className="border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Lesson Header */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <h4 className="text-lg font-semibold text-gray-900">
                Lesson {index + 1}: {lesson.title}
              </h4>
            </div>

            {/* Video Player (Smaller and Properly Sized) */}
            <div className="flex justify-center items-center p-4">
              <video
                src={lesson.videoUrl}
                controls
                className="w-[70%] h-auto max-w-[700px] rounded-md shadow-md"
              />
            </div>

            {/* Lesson Info */}
            <div className="p-4">
              {/* <p className="text-gray-700">🕒 Duration: {lesson.duration || "N/A"} mins</p> */}
              {lesson.description && (
                <p className="text-gray-600 mt-2">{lesson.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-lg text-center text-gray-500 bg-gray-100 py-4 rounded-lg">
        🚫 No lessons available for this course.
      </p>
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
              className="border border-gray-300 p-5 m-5 rounded-lg bg-gray-50 hover:shadow-md transition-all duration-300"
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