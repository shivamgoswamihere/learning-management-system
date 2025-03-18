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
    type: "Practice Test",
  });

  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const handleChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index
          ? {
              ...q,
              [field]: field === "options"
                ? q.options.map((opt, j) => (j === value.index ? value.text : opt))
                : value,
            }
          : q
      )
    );
  };

  const addQuestionField = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createExam(examData)).unwrap();
      if (result && result._id) {
        await dispatch(addQuestions({ examId: result._id, questions }));
      }
    } catch (error) {
      console.error("Error Creating Exam:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Create Exam</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input className="input-field" type="text" name="title" placeholder="Exam Title" value={examData.title} onChange={handleChange} required />
          <input className="input-field" type="text" name="code" placeholder="Exam Code" value={examData.code} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input className="input-field" type="text" name="subject" placeholder="Subject" value={examData.subject} onChange={handleChange} required />
          <input className="input-field" type="text" name="category" placeholder="Category" value={examData.category} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input className="input-field" type="number" name="timeLimit" placeholder="Time Limit (min)" value={examData.timeLimit} onChange={handleChange} required />
          <input className="input-field" type="number" name="numQuestions" placeholder="Number of Questions" value={examData.numQuestions} onChange={handleChange} required />
          <input className="input-field" type="number" name="totalMarks" placeholder="Total Marks" value={examData.totalMarks} onChange={handleChange} required />
        </div>

        <select className="input-field" name="type" value={examData.type} onChange={handleChange}>
          <option value="Practice Test">Practice Test</option>
          <option value="Certification Exam">Certification Exam</option>
        </select>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">Add Questions</h3>

        {questions.map((q, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <input className="input-field w-full" type="text" placeholder="Question" value={q.text} onChange={(e) => handleQuestionChange(index, "text", e.target.value)} required />
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              {q.options.map((option, optIndex) => (
                <input key={optIndex} className="input-field" type="text" placeholder={`Option ${optIndex + 1}`} value={option} onChange={(e) => handleQuestionChange(index, "options", { index: optIndex, text: e.target.value })} required />
              ))}
            </div>

            <input className="input-field mt-2 w-full" type="text" placeholder="Correct Answer" value={q.correctAnswer} onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)} required />
          </div>
        ))}

        <button type="button" onClick={addQuestionField} className="btn-secondary">
          ➕ Add Another Question
        </button>

        <button type="submit" className="btn-primary">
          ✅ Create Exam & Add Questions
        </button>
      </form>
    </div>
  );
};

export default CreateExam;
