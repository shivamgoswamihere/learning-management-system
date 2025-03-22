import React, { useState } from "react";
import { motion } from "framer-motion";
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
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50 text-gray-600">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Update Course</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={updatedData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={updatedData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={updatedData.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={updatedData.duration}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium">Prerequisites</label>
                        <input
                            type="text"
                            name="prerequisites"
                            value={updatedData.prerequisites}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
                        />
                    </div>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="certificationAvailable"
                            checked={updatedData.certificationAvailable}
                            onChange={handleChange}
                        />
                        Certification Available
                    </label>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default UpdateCourseModal;