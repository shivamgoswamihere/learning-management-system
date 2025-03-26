// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createExam, addQuestions } from "../redux/examSlice";

// const CreateExam = () => {
//   const dispatch = useDispatch();
//   const [examData, setExamData] = useState({
//     title: "",
//     code: "",
//     subject: "",
//     category: "",
//     timeLimit: "",
//     numQuestions: "",
//     totalMarks: "",
//     type: "Practice Test",
//   });

//   const [questions, setQuestions] = useState([
//     { text: "", options: ["", "", "", ""], correctAnswer: "" },
//   ]);

//   const handleChange = (e) => {
//     setExamData({ ...examData, [e.target.name]: e.target.value });
//   };

//   const handleQuestionChange = (index, field, value) => {
//     setQuestions((prevQuestions) =>
//       prevQuestions.map((q, i) =>
//         i === index
//           ? {
//               ...q,
//               [field]: field === "options"
//                 ? q.options.map((opt, j) => (j === value.index ? value.text : opt))
//                 : value,
//             }
//           : q
//       )
//     );
//   };

//   const addQuestionField = () => {
//     setQuestions([...questions, { text: "", options: ["", "", "", ""], correctAnswer: "" }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await dispatch(createExam(examData)).unwrap();
//       if (result && result._id) {
//         await dispatch(addQuestions({ examId: result._id, questions }));
//       }
//     } catch (error) {
//       console.error("Error Creating Exam:", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-10 bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl shadow-lg">
//     {/* Header Section */}
//     <h2 className="text-3xl font-extrabold mb-8 text-left text-blue-700">
//       📝 Create Exam
//     </h2>
  
//     {/* Form Section */}
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {/* Exam Details */}
//       <div className="grid grid-cols-2 gap-6">
//         <input
//           className="input-field focus:ring-2 focus:ring-blue-500"
//           type="text"
//           name="title"
//           placeholder="Enter an engaging exam title (e.g., Java Basics Test)"
//           value={examData.title}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="input-field focus:ring-2 focus:ring-blue-500"
//           type="text"
//           name="code"
//           placeholder="Enter a unique exam code (e.g., JBT101)"
//           value={examData.code}
//           onChange={handleChange}
//           required
//         />
//       </div>
  
//       <div className="grid grid-cols-2 gap-6">
//         <input
//           className="input-field focus:ring-2 focus:ring-blue-500"
//           type="text"
//           name="subject"
//           placeholder="Enter the subject (e.g., Computer Science)"
//           value={examData.subject}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="input-field focus:ring-2 focus:ring-blue-500"
//           type="text"
//           name="category"
//           placeholder="Specify the category (e.g., Beginner, Intermediate)"
//           value={examData.category}
//           onChange={handleChange}
//           required
//         />
//       </div>
  
//       <div className="grid grid-cols-3 gap-6">
//         <input
//           className="input-field focus:ring-2 focus:ring-blue-500"
//           type="number"
//           name="timeLimit"
//           placeholder="Set time limit in minutes (e.g., 60)"
//           value={examData.timeLimit}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="input-field focus:ring-2 focus:ring-blue-500"
//           type="number"
//           name="numQuestions"
//           placeholder="Number of questions (e.g., 20)"
//           value={examData.numQuestions}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="input-field focus:ring-2 focus:ring-blue-500"
//           type="number"
//           name="totalMarks"
//           placeholder="Total marks for the exam (e.g., 100)"
//           value={examData.totalMarks}
//           onChange={handleChange}
//           required
//         />
//       </div>
  
//       {/* Exam Type Dropdown */}
//       <div>
//         <label className="block text-gray-700 font-medium mb-2">
//           Select Exam Type:
//         </label>
//         <select
//           className="input-field focus:ring-2 focus:ring-blue-500 w-full"
//           name="type"
//           value={examData.type}
//           onChange={handleChange}
//         >
//           <option value="Practice Test">Practice Test</option>
//           <option value="Certification Exam">Certification Exam</option>
//         </select>
//       </div>
  
//       {/* Add Questions Section */}
//       <h3 className="text-2xl font-bold text-gray-800 mt-8">🧠 Add Questions</h3>
  
//       {questions.map((q, index) => (
//         <div
//           key={index}
//           className="bg-white p-6 rounded-lg shadow-md border border-gray-300"
//         >
//           <input
//             className="input-field w-full focus:ring-2 focus:ring-blue-500"
//             type="text"
//             placeholder={`Enter Question ${index + 1} (e.g., What is Java?)`}
//             value={q.text}
//             onChange={(e) =>
//               handleQuestionChange(index, "text", e.target.value)
//             }
//             required
//           />
  
//           <div className="grid grid-cols-2 gap-4 mt-4">
//             {q.options.map((option, optIndex) => (
//               <input
//                 key={optIndex}
//                 className="input-field focus:ring-2 focus:ring-blue-500"
//                 type="text"
//                 placeholder={`Option ${optIndex + 1} (e.g., OOP Language)`}
//                 value={option}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "options", {
//                     index: optIndex,
//                     text: e.target.value,
//                   })
//                 }
//                 required
//               />
//             ))}
//           </div>
  
//           <input
//             className="input-field mt-4 w-full focus:ring-2 focus:ring-blue-500"
//             type="text"
//             placeholder="Enter the correct answer (e.g., Option 1)"
//             value={q.correctAnswer}
//             onChange={(e) =>
//               handleQuestionChange(index, "correctAnswer", e.target.value)
//             }
//             required
//           />
//         </div>
//       ))}
  
//       {/* Add Another Question Button */}
//       <button
//         type="button"
//         onClick={addQuestionField}
//         className="w-full mt-4 bg-green-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-green-600 transition-all shadow-md"
//       >
//         Add Another Question
//       </button>
  
//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
//       >
//         Create Exam & Add Questions
//       </button>
//     </form>
//   </div>
  
  
  
//   );
// };

// export default CreateExam;

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
    timeLimit: "",
    numQuestions: "",
    totalMarks: "",
    type: "Practice Test",
  });

  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctAnswer: "a" },
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
              [field]:
                field === "options"
                  ? q.options.map((opt, j) =>
                      j === value.index ? value.text : opt
                    )
                  : value,
            }
          : q
      )
    );
  };

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctAnswer: "a" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map correct answer (a, b, c, d) to actual option text
      const updatedQuestions = questions.map((q) => ({
        ...q,
        correctAnswer: q.options[
          ["a", "b", "c", "d"].indexOf(q.correctAnswer)
        ], // Get correct option text
      }));
  
      const result = await dispatch(createExam(examData)).unwrap();
      if (result && result._id) {
        await dispatch(addQuestions({ examId: result._id, questions: updatedQuestions }));
      }
    } catch (error) {
      console.error("Error Creating Exam:", error);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-10 bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl shadow-lg">
      {/* Header Section */}
      <h2 className="text-3xl font-extrabold mb-8 text-left text-blue-700">
        📝 Create Exam
      </h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Exam Details */}
        <div className="grid grid-cols-2 gap-6">
          <input
            className="input-field focus:ring-2 focus:ring-blue-500"
            type="text"
            name="title"
            placeholder="Enter an engaging exam title (e.g., Java Basics Test)"
            value={examData.title}
            onChange={handleChange}
            required
          />
          <input
            className="input-field focus:ring-2 focus:ring-blue-500"
            type="text"
            name="code"
            placeholder="Enter a unique exam code (e.g., JBT101)"
            value={examData.code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <input
            className="input-field focus:ring-2 focus:ring-blue-500"
            type="text"
            name="subject"
            placeholder="Enter the subject (e.g., Computer Science)"
            value={examData.subject}
            onChange={handleChange}
            required
          />
          <input
            className="input-field focus:ring-2 focus:ring-blue-500"
            type="text"
            name="category"
            placeholder="Specify the category (e.g., Beginner, Intermediate)"
            value={examData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <input
            className="input-field focus:ring-2 focus:ring-blue-500"
            type="number"
            name="timeLimit"
            placeholder="Set time limit in minutes (e.g., 60)"
            value={examData.timeLimit}
            onChange={handleChange}
            required
          />
          <input
            className="input-field focus:ring-2 focus:ring-blue-500"
            type="number"
            name="numQuestions"
            placeholder="Number of questions (e.g., 20)"
            value={examData.numQuestions}
            onChange={handleChange}
            required
          />
          <input
            className="input-field focus:ring-2 focus:ring-blue-500"
            type="number"
            name="totalMarks"
            placeholder="Total marks for the exam (e.g., 100)"
            value={examData.totalMarks}
            onChange={handleChange}
            required
          />
        </div>

        {/* Exam Type Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Exam Type:
          </label>
          <select
            className="input-field focus:ring-2 focus:ring-blue-500 w-full"
            name="type"
            value={examData.type}
            onChange={handleChange}
          >
            <option value="Practice Test">Practice Test</option>
            <option value="Certification Exam">Certification Exam</option>
          </select>
        </div>

        {/* Add Questions Section */}
        <h3 className="text-2xl font-bold text-gray-800 mt-8">🧠 Add Questions</h3>

        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-300"
          >
            <input
              className="input-field w-full focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder={`Enter Question ${index + 1} (e.g., What is Java?)`}
              value={q.text}
              onChange={(e) =>
                handleQuestionChange(index, "text", e.target.value)
              }
              required
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              {q.options.map((option, optIndex) => (
                <input
                  key={optIndex}
                  className="input-field focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder={`Option ${optIndex + 1} (e.g., OOP Language)`}
                  value={option}
                  onChange={(e) =>
                    handleQuestionChange(index, "options", {
                      index: optIndex,
                      text: e.target.value,
                    })
                  }
                  required
                />
              ))}
            </div>

            {/* Correct Answer Dropdown */}
            <select
              className="input-field mt-4 w-full focus:ring-2 focus:ring-blue-500"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
              required
            >
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
              <option value="d">Option D</option>
            </select>
          </div>
        ))}

        {/* Add Another Question Button */}
        <button
          type="button"
          onClick={addQuestionField}
          className="w-full mt-4 bg-green-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-green-600 transition-all shadow-md"
        >
          Add Another Question
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
        >
          Create Exam & Add Questions
        </button>
      </form>
    </div>
  );
};

export default CreateExam;
