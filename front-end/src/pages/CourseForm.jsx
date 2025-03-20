import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../redux/courseSlice";
import { useNavigate } from "react-router-dom";

const CourseForm = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.courses);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        duration: "",
        prerequisites: "",
        courseLevel: "",
        certificationAvailable: false,
        thumbnail: null,
    });

    const [lessons, setLessons] = useState([]); // Store lessons
    const [syllabus, setSyllabus] = useState([]); // Store syllabus items

    // ✅ Handle Text Inputs & Checkbox
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // ✅ Handle File Inputs (Thumbnail)
    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    // ✅ Handle Syllabus Input Change
    const handleSyllabusChange = (index, field, value) => {
        const updatedSyllabus = syllabus.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setSyllabus(updatedSyllabus);
    };

    // ✅ Add New Syllabus Item
    const addSyllabusItem = () => {
        setSyllabus([...syllabus, { title: "", description: "" }]);
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
        setLessons([
            ...lessons,
            {
                title: "",
                description: "",
                video: null,
                order: lessons.length + 1,
            },
        ]);
    };

    // ✅ Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Validate syllabus before submission
        if (syllabus.some(item => !item.title.trim() || !item.description.trim())) {
            alert("❌ Each syllabus item must have a title and description.");
            return;
        }

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
                courseData.append(`lessonVideos`, lesson.video); // ✅ Keep same key for all videos
            }
        });

        // ✅ Append Syllabus Details (with correct `description` key)
        syllabus.forEach((item, index) => {
            courseData.append(`syllabus[${index}][title]`, item.title);
            courseData.append(`syllabus[${index}][description]`, item.description);
        });

        // ✅ Dispatch Course Creation
        dispatch(createCourse(courseData))
            .then(() => {
                alert("🎉 Course created successfully!");
                navigate("/profile");
            })
            .catch((err) => {
                alert(`❌ Error: ${err.message || "Failed to create course"}`);
            });
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create a Course</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border rounded" required />
                <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="duration" placeholder="Duration" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="prerequisites" placeholder="Prerequisites" onChange={handleChange} className="w-full p-2 border rounded" />
                <select className="w-full p-2 border rounded" name="courseLevel" required onChange={handleChange}>
                    <option value="" disabled selected hidden>Select Course Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advance">Advance</option>
                </select>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="certificationAvailable" onChange={handleChange} />
                    <span>Certification Available</span>
                </label>

                <label className="block">
                    Thumbnail:
                    <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} required />
                </label>

                {/* ✅ Syllabus Section */}
                <h3 className="text-lg font-semibold">Add Syllabus</h3>
                {syllabus.map((item, index) => (
                    <div key={index} className="p-4 border rounded mt-2">
                        <input type="text" placeholder="Syllabus Title" value={item.title} onChange={(e) => handleSyllabusChange(index, "title", e.target.value)} required />
                        <textarea placeholder="Syllabus Description" value={item.description} onChange={(e) => handleSyllabusChange(index, "description", e.target.value)} required />
                    </div>
                ))}
                <button type="button" onClick={addSyllabusItem} className="w-full p-2 bg-blue-500 text-white rounded">+ Add Syllabus</button>

                {/* ✅ Lessons Section */}
                <h3 className="text-lg font-semibold">Add Lessons</h3>
                {lessons.map((lesson, index) => (
                    <div key={index} className="p-4 border rounded mt-2">
                        <input type="text" placeholder="Lesson Title" value={lesson.title} onChange={(e) => handleLessonChange(index, "title", e.target.value)} required />
                        <textarea placeholder="Lesson Description" value={lesson.description} onChange={(e) => handleLessonChange(index, "description", e.target.value)} />
                        <input type="file" accept="video/*" onChange={(e) => handleLessonFileChange(index, e.target.files[0])} />
                    </div>
                ))}
                <button type="button" onClick={addLesson} className="w-full p-2 bg-green-500 text-white rounded">+ Add Lesson</button>

                <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded">
                    {loading ? "Creating..." : "Create Course"}
                </button>
            </form>
        </div>
    );
};

export default CourseForm;
