import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createExam, addQuestions } from "../redux/examSlice";

const CreateExam = () => {
  const dispatch = useDispatch();
  const [examData, setExamData] = useState({
    title: "",
    code: "",
    subject: "",
    category: "",
    timeLimit: 0,
    numQuestions: 0,
    totalMarks: 0,
    type: "Practice Test"
  });

  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctAnswer: "" }
  ]);

  const handleChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "options") {
      newQuestions[index].options[value.index] = value.text;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const addQuestionField = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Exam Data:", examData); // Debugging log

    try {
      const result = await dispatch(createExam(examData)).unwrap();
      console.log("Exam Created:", result);

      // If exam creation is successful, add questions
      if (result._id) {
        console.log("Adding Questions to Exam:", result._id);
        await dispatch(addQuestions({ examId: result._id, questions }));
      }
    } catch (error) {
      console.error("Error Creating Exam:", error);
    }
  };
 


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Exam Title" value={examData.title} onChange={handleChange} required />
      <input type="text" name="code" placeholder="Exam Code" value={examData.code} onChange={handleChange} required />
      <input type="text" name="subject" placeholder="Subject" value={examData.subject} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={examData.category} onChange={handleChange} required />
      <input type="number" name="timeLimit" placeholder="Time Limit (min)" value={examData.timeLimit} onChange={handleChange} required />
      <input type="number" name="numQuestions" placeholder="Number of Questions" value={examData.numQuestions} onChange={handleChange} required />
      <input type="number" name="totalMarks" placeholder="Total Marks" value={examData.totalMarks} onChange={handleChange} required />
      <select name="type" value={examData.type} onChange={handleChange}>
        <option value="Practice Test">Practice Test</option>
        <option value="Certification Exam">Certification Exam</option>
      </select>

      <h3>Add Questions</h3>
      {questions.map((q, index) => (
        <div key={index}>
          <input type="text" placeholder="Question" value={q.text} onChange={(e) => handleQuestionChange(index, "text", e.target.value)} required />
          {q.options.map((option, optIndex) => (
            <input key={optIndex} type="text" placeholder={`Option ${optIndex + 1}`} value={option} onChange={(e) => handleQuestionChange(index, "options", { index: optIndex, text: e.target.value })} required />
          ))}
          <input type="text" placeholder="Correct Answer" value={q.correctAnswer} onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)} required />
        </div>
      ))}
      <button type="button" onClick={addQuestionField}>Add Another Question</button>

      <button type="submit">Create Exam & Add Questions</button>
    </form>
  );
};

export default CreateExam;
