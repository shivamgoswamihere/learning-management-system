import  React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../redux/courseSlice";
import { useParams, useNavigate } from "react-router-dom";

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { course, loading, error } = useSelector((state) => state.courses);

    useEffect(() => {
        if (id) {
            dispatch(fetchCourseById(id));
        }
    }, [dispatch, id, navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return course ? (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
        </div>
    ) : <p className="text-center">Course not found</p>;
};

export default CourseDetails;
