import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/courseSlice";

const CoursesList = () => {
    const dispatch = useDispatch();
    const { courses, loading, error } = useSelector((state) => state.courses);

    useEffect(() => {
        dispatch(fetchAllCourses()); // ✅ Fetch all courses
    }, [dispatch]);

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Available Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={course.thumbnail || "https://via.placeholder.com/300"}
                            alt={course.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{course.title}</h2>
                            <p className="text-gray-600">{course.description.slice(0, 100)}...</p>
                            <div className="mt-3 flex justify-between items-center">
                                <span className="text-green-600 font-semibold">
                                    {course.price === 0 ? "Free" : `$${course.price}`}
                                </span>
                                <Link to={`/CourseDetails/${course._id}`}> {/* ✅ Correct Route */}
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        View Course
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesList;
