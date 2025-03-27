// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { updateCourse } from "../redux/courseSlice";

// const UpdateCourseModal = ({ course, isOpen, onClose }) => {
//     const dispatch = useDispatch();
    
//     const [updatedData, setUpdatedData] = useState({
//         title: course?.title || "",
//         description: course?.description || "",
//         price: course?.price || 0,
//         duration: course?.duration || "",
//         prerequisites: course?.prerequisites || "",
//         certificationAvailable: course?.certificationAvailable || false,
//     });

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setUpdatedData((prevData) => ({
//             ...prevData,
//             [name]: type === "checkbox" ? checked : value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await dispatch(updateCourse({ courseId: course._id, updatedData }));
//         onClose(); // Close modal after update
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50 text-gray-600">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -50 }}
//                 transition={{ duration: 0.5, ease: "easeInOut" }}
//                 className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
//             >
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-2xl font-bold">Update Course</h2>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label className="block text-sm font-medium">Title</label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={updatedData.title}
//                             onChange={handleChange}
//                             className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
//                             required
//                         />
//                     </div>

//                     <div className="mb-3">
//                         <label className="block text-sm font-medium">Description</label>
//                         <textarea
//                             name="description"
//                             value={updatedData.description}
//                             onChange={handleChange}
//                             className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
//                             required
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <label className="block text-sm font-medium">Price</label>
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={updatedData.price}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium">Duration</label>
//                             <input
//                                 type="text"
//                                 name="duration"
//                                 value={updatedData.duration}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
//                             />
//                         </div>
//                     </div>

//                     <div className="mb-3">
//                         <label className="block text-sm font-medium">Prerequisites</label>
//                         <input
//                             type="text"
//                             name="prerequisites"
//                             value={updatedData.prerequisites}
//                             onChange={handleChange}
//                             className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
//                         />
//                     </div>

//                     <label className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             name="certificationAvailable"
//                             checked={updatedData.certificationAvailable}
//                             onChange={handleChange}
//                         />
//                         Certification Available
//                     </label>

//                     <div className="flex justify-end gap-2 mt-4">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="bg-gray-500 text-white px-4 py-2 rounded-md"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                         >
//                             Update
//                         </button>
//                     </div>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default UpdateCourseModal;

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
        syllabus: course?.syllabus || [], // Syllabus array
        lessons: course?.lessons || [], // Separate lessons array
    });

    // Handle input changes for course details
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle changes in syllabus module
    const handleSyllabusChange = (index, field, value) => {
        const updatedSyllabus = [...updatedData.syllabus];
        updatedSyllabus[index] = { ...updatedSyllabus[index], [field]: value };
        setUpdatedData((prevData) => ({
            ...prevData,
            syllabus: updatedSyllabus,
        }));
    };

    // Add new syllabus module
    const addSyllabus = () => {
        setUpdatedData((prevData) => ({
            ...prevData,
            syllabus: [
                ...prevData.syllabus,
                { title: "", description: "" },
            ],
        }));
    };

    // Remove syllabus module
    const removeSyllabus = (index) => {
        const updatedSyllabus = updatedData.syllabus.filter((_, i) => i !== index);
        setUpdatedData((prevData) => ({
            ...prevData,
            syllabus: updatedSyllabus,
        }));
    };

    // Handle lesson changes
    const handleLessonChange = (lessonIndex, field, value) => {
        const updatedLessons = [...updatedData.lessons];
        updatedLessons[lessonIndex] = { ...updatedLessons[lessonIndex], [field]: value };
        setUpdatedData((prevData) => ({
            ...prevData,
            lessons: updatedLessons,
        }));
    };

    // Add new lesson
    const addLesson = (syllabusIndex) => {
        setUpdatedData((prevData) => ({
            ...prevData,
            lessons: [
                ...prevData.lessons,
                {
                    syllabusIndex,
                    title: "",
                    description: "",
                    videoUrl: "",
                },
            ],
        }));
    };

    // Remove lesson
    const removeLesson = (lessonIndex) => {
        const updatedLessons = updatedData.lessons.filter((_, i) => i !== lessonIndex);
        setUpdatedData((prevData) => ({
            ...prevData,
            lessons: updatedLessons,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Updated Data:", updatedData);
        await dispatch(updateCourse({ courseId: course._id, updatedData }));
        onClose(); // Close modal after updating
    };

    if (!isOpen) return null;

    return (
        <div className="inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50 text-gray-600">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Update Course</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Course Details */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={updatedData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={updatedData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
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
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={updatedData.duration}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
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
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <label className="flex items-center gap-2 mb-4">
                        <input
                            type="checkbox"
                            name="certificationAvailable"
                            checked={updatedData.certificationAvailable}
                            onChange={handleChange}
                        />
                        Certification Available
                    </label>

                    {/* Syllabus Section */}
                
                                {/* Syllabus Section */}
{updatedData.syllabus.map((syllabusItem, index) => (
    <div key={index} className="mb-4 border p-3 rounded-lg">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Module {index + 1}</h3>
            <button
                type="button"
                onClick={() => removeSyllabus(index)}
                className="text-red-500 text-sm"
            >
                Remove
            </button>
        </div>

        <div className="mb-2">
            <label className="block text-sm font-medium">Module Title</label>
            <input
                type="text"
                value={syllabusItem.title}
                onChange={(e) =>
                    handleSyllabusChange(index, "title", e.target.value)
                }
                className="w-full p-2 border rounded-md"
            />
        </div>

        <div className="mb-2">
            <label className="block text-sm font-medium">
                Module Description
            </label>
            <textarea
                value={syllabusItem.description}
                onChange={(e) =>
                    handleSyllabusChange(index, "description", e.target.value)
                }
                className="w-full p-2 border rounded-md"
            />
        </div>
    </div>
))}

<button
    type="button"
    onClick={addSyllabus}
    className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md mb-4"
>
    Add Module
</button>

{/* Lesson Section (Outside Syllabus) */}
{updatedData.lessons.map((lesson, lessonIndex) => (
    <div key={lessonIndex} className="mt-2 border p-3 rounded-lg">
        <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">
                Lesson {lessonIndex + 1}
            </h4>
            <button
                type="button"
                onClick={() => removeLesson(lessonIndex)}
                className="text-red-500 text-sm"
            >
                Remove
            </button>
        </div>

        <label className="block text-sm font-medium">Lesson Title</label>
        <input
            type="text"
            value={lesson.title}
            onChange={(e) =>
                handleLessonChange(lessonIndex, "title", e.target.value)
            }
            className="w-full p-2 border rounded-md mb-2"
        />

        <label className="block text-sm font-medium">Lesson Description</label>
        <textarea
            value={lesson.description}
            onChange={(e) =>
                handleLessonChange(lessonIndex, "description", e.target.value)
            }
            className="w-full p-2 border rounded-md mb-2"
        />

        <label className="block text-sm font-medium">Video URL</label>
        <input
            type="text"
            value={lesson.videoUrl}
            onChange={(e) =>
                handleLessonChange(lessonIndex, "videoUrl", e.target.value)
            }
            className="w-full p-2 border rounded-md"
        />
    </div>
))}

<button
    type="button"
    onClick={() => addLesson()}
    className="bg-green-500 text-white text-sm px-3 py-1 rounded-md mt-2"
>
    Add Lesson
</button>
           
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default UpdateCourseModal;


