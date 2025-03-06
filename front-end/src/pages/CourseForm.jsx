import { useState } from "react";
import axios from "axios";

const CourseForm = () => {
    const [course, setCourse] = useState({ title: "", description: "", category: "", price: 0 });

    const handleChange = (e) => setCourse({ ...course, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/courses/create", course);
        console.log(response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Course Title" onChange={handleChange} />
            <textarea name="description" placeholder="Description" onChange={handleChange} />
            <button type="submit">Create Course</button>
        </form>
    );
};
export default CourseForm;
