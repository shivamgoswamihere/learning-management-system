import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/courseSlice";
import { useLocation } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const CoursesList = () => {
    const dispatch = useDispatch();
    const { courses, loading, error } = useSelector((state) => state.courses);
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);


    useEffect(() => {
        dispatch(fetchAllCourses());
    }, [dispatch]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("query") || "";
        setSearchQuery(query);
    }, [location.search]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCourses(filtered);
        }
        setCurrentPage(1); // ✅ Reset to first page on search
    }, [searchQuery, courses]);

     // Pagination
     const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
 
     const nextPage = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
     const prevPage = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));


    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Available Courses</h1>

            {searchQuery && (
                <p className="text-center text-lg text-gray-600">
                    Search results for: <span className="font-semibold">{searchQuery}</span>
                </p>
            )}

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentCourses.length > 0 ? (
                    currentCourses.map((course) => (
                        <CourseCard
                            key={course._id}
                            image={course.thumbnail || "https://via.placeholder.com/300"}
                            category={course.category || "General"}
                            heading={course.title || "Untitled Course"}
                            level={course.courseLevel || "Beginner"}
                            duration={course.duration || "N/A"}
                            link={`/CourseDetails/${course._id}`}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-lg text-gray-600">No courses found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-4">
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition disabled:bg-gray-400"
                >
                    Previous
                </button>
                
                <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
                
                <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CoursesList;
