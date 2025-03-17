import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCourse } from "../redux/courseSlice";

const UpdateCourseModal = ({ course, isOpen, onClose }) => {
    const dispatch = useDispatch();

    const [updatedData, setUpdatedData] = useState({
        title: course?.title || "",
        description: course?.description || "",
        price: course?.price || 0,
        duration: course?.duration || "",
        prerequisites: course?.prerequisites || "",
        certificationAvailable: course?.certificationAvailable || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateCourse({ courseId: course._id, updatedData }));
        onClose(); // Close modal after update
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className=" p-6 rounded shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Update Course</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="title"
                        value={updatedData.title}
                        onChange={handleChange}
                        className="border p-2"
                        placeholder="Course Title"
                        required
                    />
                    <textarea
                        name="description"
                        value={updatedData.description}
                        onChange={handleChange}
                        className="border p-2"
                        placeholder="Course Description"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={updatedData.price}
                        onChange={handleChange}
                        className="border p-2"
                        placeholder="Price"
                    />
                    <input
                        type="text"
                        name="duration"
                        value={updatedData.duration}
                        onChange={handleChange}
                        className="border p-2"
                        placeholder="Duration"
                    />
                    <input
                        type="text"
                        name="prerequisites"
                        value={updatedData.prerequisites}
                        onChange={handleChange}
                        className="border p-2"
                        placeholder="Prerequisites"
                    />
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="certificationAvailable"
                            checked={updatedData.certificationAvailable}
                            onChange={handleChange}
                        />
                        Certification Available
                    </label>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCourseModal;
