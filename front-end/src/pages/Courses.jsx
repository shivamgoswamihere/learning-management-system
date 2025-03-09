import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/courseSlice";
import CourseCard from "../components/CourseCard";

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
                    <CourseCard
                        key={course._id}
                        image={course.thumbnail || "https://via.placeholder.com/300"}
                        heading={course.title || "Untitled Course"}
                        description={course.description || "No description available."}
                        link={`/CourseDetails/${course._id}`} // ✅ Dynamic Link
                    />
                ))}
            </div>
        </div>
    );
};

export default CoursesList;
