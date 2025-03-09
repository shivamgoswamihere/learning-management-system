import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../redux/courseSlice";

const CourseDetails = () => {
    const { id } = useParams(); // ✅ Get course ID from URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedCourse, loading, error } = useSelector((state) => state.courses);

    useEffect(() => {
        if (id) dispatch(fetchCourseById(id)); // ✅ Fetch course details when component mounts
    }, [dispatch, id]);

    if (loading) return <p className="text-center text-lg">Loading course details...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    if (!selectedCourse) return <p className="text-center">Course not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
                ← Back
            </button>

            <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                    src={selectedCourse.bannerImage || "https://via.placeholder.com/800x400"} 
                    alt={selectedCourse.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="mt-4">
                <h1 className="text-3xl font-bold">{selectedCourse.title}</h1>
                <p className="text-gray-600 mt-2">{selectedCourse.description}</p>

                <div className="mt-4">
                    <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {selectedCourse.category}
                    </span>
                </div>

                <div className="mt-4">
                    <p><strong>Price:</strong> {selectedCourse.price === 0 ? "Free" : `$${selectedCourse.price}`}</p>
                    <p><strong>Duration:</strong> {selectedCourse.duration}</p>
                    {selectedCourse.prerequisites && (
                        <p><strong>Prerequisites:</strong> {selectedCourse.prerequisites}</p>
                    )}
                    <p><strong>Certification:</strong> {selectedCourse.certificationAvailable ? "Yes" : "No"}</p>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Course Thumbnail:</h3>
                    <img 
                        src={selectedCourse.thumbnail || "https://via.placeholder.com/300"} 
                        alt="Course Thumbnail" 
                        className="w-40 h-40 object-cover mt-2 rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
