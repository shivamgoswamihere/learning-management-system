import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../redux/courseSlice";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCourse, loading, error } = useSelector(
    (state) => state.courses
  );
  const [showLessons, setShowLessons] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);

  useEffect(() => {
    if (id) dispatch(fetchCourseById(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center text-lg">Loading course details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!selectedCourse) return <p className="text-center">Course not found.</p>;

  const handleToggleLessons = () => {
    setShowLessons(!showLessons);
  };

  return (
    <div className="max-w-full mx-auto mt-2 text-white">
      <button onClick={() => navigate(-1)} className="mb-2 mx-6 px-4 py-1 bg-black text-white hover:bg-gray-900">
        ← Back
      </button>

      <div className="grid grid-cols-2 gap-5 p-6 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="mt-4">
          <span className="bg-blue-200 text-blue-900 font-bold p-3 py-1 text-left text-sm">
            Category: {selectedCourse.category}
          </span>
          <h1 className="text-5xl font-bold mt-4">{selectedCourse.title}</h1>
          <p className="text-gray-300 mt-2">{selectedCourse.description}</p>

          <div className="mt-4">
            <p><strong>Price:</strong> {selectedCourse.price === 0 ? "Free" : `$${selectedCourse.price}`}</p>
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            {selectedCourse.trainer?.name && (
              <p><strong>Trainer:</strong> {selectedCourse.trainer.name}</p>
            )}
            <p><strong>Certification:</strong> {selectedCourse.certificationAvailable ? "Yes" : "No"}</p>
          </div>
           {/* ✅ Enrollment Status */}
           {enrollmentSuccess && (
            <p className="success-message">{enrollmentSuccess}</p>
          )}
          {enrollmentError && (
            <p className="error-message">{enrollmentError}</p>
          )}

          <button onClick={handleEnroll} disabled={loading}>
            {loading ? "Enrolling..." : "Enroll in Course"}
          </button>
        </div>

        <div className="relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
          <img src={selectedCourse.thumbnail || "https://via.placeholder.com/800x400"} alt={selectedCourse.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Toggle Lessons */}
      <div className="mt-6">
        <button onClick={() => setShowLessons(!showLessons)} className="bg-blue-600 text-white px-4 py-2 mx-6 rounded hover:bg-blue-700">
          {showLessons ? "Hide Lessons" : "Show Lessons"}
        </button>

        {showLessons && (
          <div className="mt-4 mx-6">
            <h2 className="text-2xl font-bold mb-3">Course Lessons</h2>
            
            {/* ✅ Display Lessons in Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCourse.lessons.length > 0 ? (
                selectedCourse.lessons.map((lesson) => (
                  <div key={lesson._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-white mb-2">{lesson.title}</h4>
                    <VideoPlayer src={lesson.videoUrl} title={lesson.title} /> {/* ✅ Use VideoPlayer */}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No lessons available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
