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


     // New Filters
     const [priceFilter, setPriceFilter] = useState("");       // "free" or "paid"
     const [typeFilter, setTypeFilter] = useState("");         // "free" or "paid"
     const [durationFilter, setDurationFilter] = useState(""); // "short" (0-2 hours), "medium" (2-5 hours), "long" (5+ hours)
     const [levelFilter, setLevelFilter] = useState("");       // "beginner", "intermediate", "hard"


    useEffect(() => {
        dispatch(fetchAllCourses());
    }, [dispatch]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("query") || "";
        setSearchQuery(query);
    }, [location.search]);

    useEffect(() => {

        let filtered = [...courses];

        if (searchQuery.trim() === "") {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
         
        }

         // Apply filters
         if (priceFilter) {
            filtered = filtered.filter(course => {
                const price = course.price;

                switch (priceFilter) {
                    case "<500":
                        return price < 500;
                    case "500-1000":
                        return price >= 500 && price <= 1000;
                    case "1000-1500":
                        return price > 1000 && price <= 1500;
                    case "1500-2000":
                        return price > 1500 && price <= 2000;
                    case ">2000":
                        return price > 2000;
                    default:
                        return true;
                }
            });
        }

        if (typeFilter) {
            filtered = filtered.filter((course) =>
                typeFilter === "free" ? course.price === 0 : course.price > 0
            );
        }
        

        if (durationFilter) {
            filtered = filtered.filter(course => {
                const duration = course.duration;
                if (durationFilter === "short") return duration <= 2;
                if (durationFilter === "medium") return duration > 2 && duration <= 5;
                if (durationFilter === "long") return duration > 5;
                return true;
            });
        }

        if (levelFilter) {
            filtered = filtered.filter(course => 
                course.courseLevel.toLowerCase() === levelFilter.toLowerCase()
            );
            
        }

        setFilteredCourses(filtered);
        setCurrentPage(1); // ✅ Reset to first page on search
    }, [courses, searchQuery, priceFilter, typeFilter, durationFilter, levelFilter]);

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
         Available Courses
    </h1>

    {/* Filters */}
    <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     {/* Price Filter */}
                     <div>
                        <label className="block font-bold mb-2">Price Range</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="<500">Less than ₹500</option>
                            <option value="500-1000">₹500 - ₹1000</option>
                            <option value="1000-1500">₹1000 - ₹1500</option>
                            <option value="1500-2000">₹1500 - ₹2000</option>
                            <option value=">2000">More than ₹2000</option>
                        </select>
                    </div>


                    {/* Type Filter */}
                    <div>
                        <label className="block font-bold mb-2">Type</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>

                    {/* Duration Filter */}
                    <div>
                        <label className="block font-bold mb-2">Duration</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={durationFilter}
                            onChange={(e) => setDurationFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="short">0-2 hours</option>
                            <option value="medium">2-5 hours</option>
                            <option value="long">5+ hours</option>
                        </select>
                    </div>

                    {/* Level Filter */}
                    <div>
                        <label className="block font-bold mb-2">Level</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advance">Advance</option>
                        </select>
                    </div>
                </div>
            </div>


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
