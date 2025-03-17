import React,{ useState } from "react";
import { useDispatch } from "react-redux";
import { createExam } from "../redux/examSlice";

const CreateExam = () => {
  const dispatch = useDispatch();
  const [examData, setExamData] = useState({ title: "", code: "", subject: "", category: "", timeLimit: 0, numQuestions: 0, totalMarks: 0, type: "Practice Test" });

  const handleChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Exam Data:", examData); // Debugging log
  
    try {
      const result = await dispatch(createExam(examData));
      console.log("Create Exam Response:", result);
    } catch (error) {
      console.error("Error Dispatching createExam:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Exam Title" onChange={handleChange} />
      <input type="text" name="code" placeholder="Exam Code" onChange={handleChange} />
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} />
      <input type="number" name="timeLimit" placeholder="Time Limit" onChange={handleChange} />
      <input type="number" name="numQuestions" placeholder="Number of Questions" onChange={handleChange} />
      <input type="number" name="totalMarks" placeholder="Total Marks" onChange={handleChange} />
      <select name="type" onChange={handleChange}>
        <option value="Practice Test">Practice Test</option>
        <option value="Certification Exam">Certification Exam</option>
      </select>
      <button type="submit">Create Exam</button>
    </form>
  );
};

export default CreateExam;