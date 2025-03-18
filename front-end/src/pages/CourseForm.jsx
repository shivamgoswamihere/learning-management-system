import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../redux/courseSlice";

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
        // bannerImage: null
    });

    const [lessons, setLessons] = useState([]); // Store lessons

    // ✅ Handle Text Inputs & Checkbox
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // ✅ Handle File Inputs (Thumbnail & Banner)
    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    // ✅ Handle Lesson Input Change
    const handleLessonChange = (index, field, value) => {
        const updatedLessons = lessons.map((lesson, i) =>
            i === index ? { ...lesson, [field]: value } : lesson
        );
        setLessons(updatedLessons);
    };

    // ✅ Handle Lesson Video Upload
    const handleLessonFileChange = (index, file) => {
        const updatedLessons = lessons.map((lesson, i) =>
            i === index ? { ...lesson, video: file } : lesson
        );
        setLessons(updatedLessons);
    };

    // ✅ Add New Lesson Dynamically
    const addLesson = () => {
        setLessons([...lessons, {
            title: "",
            description: "",
            video: null,
            order: lessons.length + 1
        }]);
    };

    // ✅ Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const courseData = new FormData();

        // ✅ Append all form fields except lessons
        for (const key in formData) {
            if (formData[key]) {
                if (key === "certificationAvailable") {
                    courseData.append(key, formData[key] ? "true" : "false");
                } else {
                    courseData.append(key, formData[key]);
                }
            }
        }

        // ✅ Append Lesson Details
        lessons.forEach((lesson, index) => {
            courseData.append(`lessons[${index}][title]`, lesson.title);
            courseData.append(`lessons[${index}][description]`, lesson.description);
            courseData.append(`lessons[${index}][order]`, lesson.order);
            if (lesson.video) {
                courseData.append(`lessonVideos`, lesson.video); // ✅ FIX: Keep same key for all videos
            }
        });

        // ✅ Dispatch Course Creation
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
                    <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} required />
                </label>


                {/* ✅ Add Lesson Section */}
                <h3 className="text-lg font-semibold">Add Lessons</h3>
                {lessons.map((lesson, index) => (
                    <div key={index} className="p-4 border rounded mt-2">
                        <input
                            type="text"
                            placeholder="Lesson Title"
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Lesson Description"
                            value={lesson.description}
                            onChange={(e) => handleLessonChange(index, "description", e.target.value)}
                        />
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleLessonFileChange(index, e.target.files[0])}
                        />
                    </div>
                ))}

                <button type="button" onClick={addLesson} className="w-full p-2 bg-green-500 text-white rounded">
                    + Add Lesson
                </button>

                <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded">
                    {loading ? "Creating..." : "Create Course"}
                </button>
            </form>
        </div>
    );
};

export default CourseForm;
