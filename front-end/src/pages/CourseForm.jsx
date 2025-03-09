import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse, resetCourseState } from "../redux/courseSlice";

const CourseForm = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.courses);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        duration: "",
        prerequisites: "",
        certificationAvailable: false,
        thumbnail: null,
        bannerImage: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const courseData = new FormData();
        for (const key in formData) {
            if (formData[key]) courseData.append(key, formData[key]);
        }

        dispatch(createCourse(courseData));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create a Course</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Course created successfully!</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border rounded" required />
                <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="duration" placeholder="Duration" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="prerequisites" placeholder="Prerequisites" onChange={handleChange} className="w-full p-2 border rounded" />
                
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="certificationAvailable" onChange={handleChange} />
                    <span>Certification Available</span>
                </label>

                <label className="block">
                    Thumbnail:
                    <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
                </label>

                <label className="block">
                    Banner Image:
                    <input type="file" name="bannerImage" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
                </label>

                <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {loading ? "Creating..." : "Create Course"}
                </button>
            </form>
        </div>
    );
};

export default CourseForm;
