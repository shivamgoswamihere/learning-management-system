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
    <div className="p-6 bg-gray-200">
    {/* Page Heading */}
    <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        📚 Available Courses
    </h1>

    {/* Search Results Display */}
    {searchQuery && (
        <p className="text-center text-lg text-gray-600 mb-4">
        Search results for:{" "}
        <span className="font-semibold text-blue-600">{searchQuery}</span>
        </p>
    )}

    {/* Courses Grid */}
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
        <div className="col-span-full text-center">
            <p className="text-lg text-gray-500 bg-gray-100 py-4 px-6 rounded-lg shadow">
            🚫 No courses found. Try a different search.
            </p>
        </div>
        )}
    </div>

    {/* Pagination Controls */}
    <div className="flex justify-center items-center mt-10 space-x-4">
        {/* Previous Button (Hidden on First Page) */}
        {currentPage > 1 && (
        <button
            onClick={prevPage}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white shadow-lg hover:bg-gray-700 transition-all flex items-center"
        >
            <span className="mr-2">«</span> Previous
        </button>
        )}

        {/* Page Indicator */}
        <span className="text-lg font-bold text-gray-800">
        Page {currentPage} of {totalPages}
        </span>

        {/* Next Button (Hidden on Last Page) */}
        {currentPage < totalPages && (
        <button
            onClick={nextPage}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all flex items-center"
        >
            Next <span className="ml-2">»</span>
        </button>
        )}
    </div>
    </div>



    );
};

export default CoursesList;
