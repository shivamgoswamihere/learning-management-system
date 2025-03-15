import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTrainerCourses } from "../redux/courseSlice";

const TrainerCourses = () => {
  const dispatch = useDispatch();
  const { trainerCourses, loading, error } = useSelector((state) => state.courses);
  const { currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (currentUser?.role === "trainer") {
      dispatch(fetchTrainerCourses());
    }
  }, [dispatch, currentUser]);

  if (loading) return <p className="text-center">Loading your courses...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (trainerCourses.length === 0) return <p className="text-center">No courses found.</p>;

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-yellow-700 mb-4">Your Created Courses</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainerCourses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h4 className="mt-2 text-lg font-semibold text-gray-800">{course.title}</h4>
            <p className="text-gray-600">{course.category}</p>
            <p className="text-gray-500">Price: ${course.price}</p>
            <Link to={`/CourseDetails/${course._id}`} className="text-blue-500 hover:underline">
              View Course
            </Link>
          </div>
        ))}
      </div>
      <Link to="/courseForm">
        <button className="mt-4 px-5 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-900">
          Add Course
        </button>
      </Link>
    </div>
  );
};

export default TrainerCourses;
