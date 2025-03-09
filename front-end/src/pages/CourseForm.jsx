// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { createCourse, resetCourseState } from "../redux/courseSlice";

// // const CourseForm = () => {
// //     const dispatch = useDispatch();
// //     const { loading, error, success } = useSelector((state) => state.courses);

// //     const [formData, setFormData] = useState({
// //         title: "",
// //         description: "",
// //         category: "",
// //         price: "",
// //         duration: "",
// //         prerequisites: "",
// //         certificationAvailable: false,
// //         thumbnail: null,
// //         bannerImage: null
// //     });

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setFormData({
// //             ...formData,
// //             [name]: type === "checkbox" ? checked : value,
// //         });
// //     };

// //     const handleFileChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.files[0] });
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         const courseData = new FormData();
// //         for (const key in formData) {
// //             if (formData[key]) courseData.append(key, formData[key]);
// //         }

// //         dispatch(createCourse(courseData));
// //     };

// //     return (
// //         <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
// //             <h2 className="text-xl font-semibold mb-4">Create a Course</h2>
// //             {error && <p className="text-red-500">{error}</p>}
// //             {success && <p className="text-green-500">Course created successfully!</p>}

// //             <form onSubmit={handleSubmit} className="space-y-4">
// //                 <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border rounded" required />
// //                 <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required />
// //                 <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border rounded" required />
// //                 <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border rounded" required />
// //                 <input type="text" name="duration" placeholder="Duration" onChange={handleChange} className="w-full p-2 border rounded" required />
// //                 <input type="text" name="prerequisites" placeholder="Prerequisites" onChange={handleChange} className="w-full p-2 border rounded" />
                
// //                 <label className="flex items-center space-x-2">
// //                     <input type="checkbox" name="certificationAvailable" onChange={handleChange} />
// //                     <span>Certification Available</span>
// //                 </label>

// //                 <label className="block">
// //                     Thumbnail:
// //                     <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
// //                 </label>

// //                 <label className="block">
// //                     Banner Image:
// //                     <input type="file" name="bannerImage" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
// //                 </label>

// //                 <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
// //                     {loading ? "Creating..." : "Create Course"}
// //                 </button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default CourseForm;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCourse } from "../redux/courseSlice";

// const CourseForm = () => {
//     const dispatch = useDispatch();
//     const { loading, error, success } = useSelector((state) => state.courses);

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         category: "",
//         price: "",
//         duration: "",
//         prerequisites: "",
//         certificationAvailable: false,
//         thumbnail: null,
//         bannerImage: null
//     });

//     const [lessons, setLessons] = useState([]); // Store lessons

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === "checkbox" ? checked : value,
//         });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//     };

//     const handleLessonChange = (index, field, value) => {
//         const updatedLessons = lessons.map((lesson, i) =>
//             i === index ? { ...lesson, [field]: value } : lesson
//         );
//         setLessons(updatedLessons);
//     };

//     const addLesson = () => {
//         setLessons([...lessons, { title: "", description: "", video: null, order: lessons.length + 1 }]);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const courseData = new FormData();

//         for (const key in formData) {
//             if (formData[key]) courseData.append(key, formData[key]);
//         }

//         lessons.forEach((lesson, index) => {
//             courseData.append(`lessons[${index}][title]`, lesson.title);
//             courseData.append(`lessons[${index}][description]`, lesson.description);
//             courseData.append(`lessons[${index}][order]`, lesson.order);
//             if (lesson.video) {
//                 courseData.append(`lessons[${index}][video]`, lesson.video);
//             }
//         });

//         dispatch(createCourse(courseData));
//     };

//     return (
//         <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Create a Course</h2>
//             {error && <p className="text-red-500">{error}</p>}
//             {success && <p className="text-green-500">Course created successfully!</p>}

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="text" name="duration" placeholder="Duration" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="text" name="prerequisites" placeholder="Prerequisites" onChange={handleChange} className="w-full p-2 border rounded" />
                
//                 <label className="flex items-center space-x-2">
//                     <input type="checkbox" name="certificationAvailable" onChange={handleChange} />
//                     <span>Certification Available</span>
//                 </label>

//                 <label className="block">
//                     Thumbnail:
//                     <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
//                 </label>

//                 <label className="block">
//                     Banner Image:
//                     <input type="file" name="bannerImage" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
//                 </label>

//                 {/* ✅ Lessons Section */}
//                 <h3 className="text-lg font-semibold">Lessons</h3>
//                 {lessons.map((lesson, index) => (
//                     <div key={index} className="p-4 border rounded mt-2">
//                         <input
//                             type="text"
//                             placeholder="Lesson Title"
//                             value={lesson.title}
//                             onChange={(e) => handleLessonChange(index, "title", e.target.value)}
//                             className="w-full p-2 border rounded"
//                             required
//                         />
//                         <textarea
//                             placeholder="Lesson Description"
//                             value={lesson.description}
//                             onChange={(e) => handleLessonChange(index, "description", e.target.value)}
//                             className="w-full p-2 border rounded"
//                         />
//                         <input
//                             type="file"
//                             accept="video/*"
//                             onChange={(e) => handleLessonChange(index, "video", e.target.files[0])}
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>
//                 ))}

//                 <button type="button" onClick={addLesson} className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
//                     Add Lesson
//                 </button>

//                 <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                     {loading ? "Creating..." : "Create Course"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CourseForm;

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
        bannerImage: null
    });

    const [lessons, setLessons] = useState([]); // Store lessons

    // Handle text inputs & checkboxes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle file inputs (thumbnail & banner)
    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    // Handle lessons input
    const handleLessonChange = (index, field, value) => {
        const updatedLessons = lessons.map((lesson, i) =>
            i === index ? { ...lesson, [field]: value } : lesson
        );
        setLessons(updatedLessons);
    };

    // Handle lesson file input (video)
    const handleLessonFileChange = (index, file) => {
        const updatedLessons = lessons.map((lesson, i) =>
            i === index ? { ...lesson, video: file } : lesson
        );
        setLessons(updatedLessons);
    };

    // Add new lesson
    const addLesson = () => {
        setLessons([...lessons, { title: "", description: "", video: null, order: lessons.length + 1 }]);
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const courseData = new FormData();

        // Append all form fields except lessons
        for (const key in formData) {
            if (formData[key]) {
                if (key === "certificationAvailable") {
                    courseData.append(key, formData[key] ? "true" : "false");
                } else {
                    courseData.append(key, formData[key]);
                }
            }
        }

        // Convert lessons to JSON and append
        courseData.append("lessons", JSON.stringify(lessons));

        // Append lesson video files separately
        lessons.forEach((lesson, index) => {
            if (lesson.video) {
                courseData.append(`lessonVideos[${index}]`, lesson.video);
            }
        });

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

                {/* ✅ Lessons Section */}
                <h3 className="text-lg font-semibold">Lessons</h3>
                {lessons.map((lesson, index) => (
                    <div key={index} className="p-4 border rounded mt-2">
                        <input
                            type="text"
                            placeholder="Lesson Title"
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <textarea
                            placeholder="Lesson Description"
                            value={lesson.description}
                            onChange={(e) => handleLessonChange(index, "description", e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleLessonFileChange(index, e.target.files[0])}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                ))}

                <button type="button" onClick={addLesson} className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Add Lesson
                </button>

                <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {loading ? "Creating..." : "Create Course"}
                </button>
            </form>
        </div>
    );
};

export default CourseForm;
