// // import React, { useState, useEffect } from "react";
// // import { useDispatch } from "react-redux";
// // import { updateExam } from "../redux/examSlice";

// // const EditExam = ({ exam, onClose }) => {
// //   const dispatch = useDispatch();

// //   // State for updated exam data
// //   const [updatedExam, setUpdatedExam] = useState({
// //     title: "",
// //     description: "",
// //     duration: 0,
// //     sections: [],
// //   });

// //   // Populate state when component loads
// //   useEffect(() => {
// //     if (exam) {
// //       setUpdatedExam({
// //         title: exam.title || "",
// //         description: exam.description || "",
// //         duration: exam.duration || 0,
// //         sections: exam.sections || [],
// //       });
// //     }
// //   }, [exam]);

// //   // Handle input changes for exam details
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setUpdatedExam((prevData) => ({
// //       ...prevData,
// //       [name]: name === "duration" ? Number(value) : value,
// //     }));
// //   };

// //   // Handle section change
// //   const handleSectionChange = (index, field, value) => {
// //     const updatedSections = [...updatedExam.sections];
// //     updatedSections[index] = { ...updatedSections[index], [field]: value };
// //     setUpdatedExam((prevData) => ({
// //       ...prevData,
// //       sections: updatedSections,
// //     }));
// //   };

// //   // Add new section
// //   const addSection = () => {
// //     setUpdatedExam((prevData) => ({
// //       ...prevData,
// //       sections: [
// //         ...prevData.sections,
// //         { title: "", description: "", questions: [] },
// //       ],
// //     }));
// //   };

// //   // Remove section
// //   const removeSection = (index) => {
// //     const updatedSections = updatedExam.sections.filter((_, i) => i !== index);
// //     setUpdatedExam((prevData) => ({
// //       ...prevData,
// //       sections: updatedSections,
// //     }));
// //   };

// //   // Handle question change
// //   const handleQuestionChange = (sectionIndex, questionIndex, field, value) => {
// //     const updatedSections = [...updatedExam.sections];
// //     updatedSections[sectionIndex].questions[questionIndex] = {
// //       ...updatedSections[sectionIndex].questions[questionIndex],
// //       [field]: value,
// //     };
// //     setUpdatedExam((prevData) => ({
// //       ...prevData,
// //       sections: updatedSections,
// //     }));
// //   };

// //   // Add new question to section
// //   const addQuestion = (sectionIndex) => {
// //     const updatedSections = [...updatedExam.sections];
// //     updatedSections[sectionIndex].questions.push({
// //       questionText: "",
// //       options: ["", "", "", ""],
// //       correctAnswer: "",
// //     });
// //     setUpdatedExam((prevData) => ({
// //       ...prevData,
// //       sections: updatedSections,
// //     }));
// //   };

// //   // Remove question from section
// //   const removeQuestion = (sectionIndex, questionIndex) => {
// //     const updatedSections = [...updatedExam.sections];
// //     updatedSections[sectionIndex].questions = updatedSections[
// //       sectionIndex
// //     ].questions.filter((_, i) => i !== questionIndex);
// //     setUpdatedExam((prevData) => ({
// //       ...prevData,
// //       sections: updatedSections,
// //     }));
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const updatedData = {
// //       title: updatedExam.title,
// //       description: updatedExam.description,
// //       duration: updatedExam.duration,
// //       sections: updatedExam.sections,
// //     };

// //     try {
// //       await dispatch(updateExam({ examId: exam._id, updatedData }));
// //       onClose(); // Close after successful update
// //     } catch (error) {
// //       console.error("Failed to update exam:", error);
// //     }
// //   };

// //   return (
// //     <div className="bg-white w-full max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
// //       <div className="flex justify-between items-center mb-4">
// //         <h2 className="text-2xl font-bold">Edit Exam</h2>
// //         <button
// //           onClick={onClose}
// //           className="text-gray-500 hover:text-gray-700 text-xl"
// //         >
// //           &times;
// //         </button>
// //       </div>

// //       <form onSubmit={handleSubmit}>
// //         {/* Exam Details */}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium">Title</label>
// //           <input
// //             type="text"
// //             name="title"
// //             value={updatedExam.title}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-md"
// //             required
// //           />
// //         </div>

// //         <div className="mb-4">
// //           <label className="block text-sm font-medium">Description</label>
// //           <textarea
// //             name="description"
// //             value={updatedExam.description}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-md"
// //           />
// //         </div>

// //         <div className="mb-4">
// //           <label className="block text-sm font-medium">
// //             Duration (in minutes)
// //           </label>
// //           <input
// //             type="number"
// //             name="duration"
// //             value={updatedExam.duration}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-md"
// //             min="1"
// //           />
// //         </div>

// //         {/* Section Management */}
// //         {updatedExam.sections.map((section, sectionIndex) => (
// //           <div key={sectionIndex} className="mb-4 border p-4 rounded-lg">
// //             <div className="flex justify-between items-center mb-2">
// //               <h3 className="text-lg font-semibold">
// //                 Section {sectionIndex + 1}
// //               </h3>
// //               <button
// //                 type="button"
// //                 onClick={() => removeSection(sectionIndex)}
// //                 className="text-red-500 text-sm"
// //               >
// //                 Remove Section
// //               </button>
// //             </div>

// //             <div className="mb-2">
// //               <label className="block text-sm font-medium">Section Title</label>
// //               <input
// //                 type="text"
// //                 value={section.title}
// //                 onChange={(e) =>
// //                   handleSectionChange(sectionIndex, "title", e.target.value)
// //                 }
// //                 className="w-full p-2 border rounded-md"
// //               />
// //             </div>

// //             <div className="mb-2">
// //               <label className="block text-sm font-medium">
// //                 Section Description
// //               </label>
// //               <textarea
// //                 value={section.description}
// //                 onChange={(e) =>
// //                   handleSectionChange(
// //                     sectionIndex,
// //                     "description",
// //                     e.target.value
// //                   )
// //                 }
// //                 className="w-full p-2 border rounded-md"
// //               />
// //             </div>

// //             {/* Question Management */}
// //             {section.questions.map((question, questionIndex) => (
// //               <div
// //                 key={questionIndex}
// //                 className="mb-3 border p-3 rounded-md bg-gray-50"
// //               >
// //                 <div className="flex justify-between items-center mb-2">
// //                   <h4 className="text-sm font-semibold">
// //                     Question {questionIndex + 1}
// //                   </h4>
// //                   <button
// //                     type="button"
// //                     onClick={() =>
// //                       removeQuestion(sectionIndex, questionIndex)
// //                     }
// //                     className="text-red-500 text-sm"
// //                   >
// //                     Remove
// //                   </button>
// //                 </div>

// //                 <label className="block text-sm font-medium">
// //                   Question Text
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={question.questionText}
// //                   onChange={(e) =>
// //                     handleQuestionChange(
// //                       sectionIndex,
// //                       questionIndex,
// //                       "questionText",
// //                       e.target.value
// //                     )
// //                   }
// //                   className="w-full p-2 border rounded-md mb-2"
// //                 />

// //                 <label className="block text-sm font-medium">Options</label>
// //                 {question.options.map((option, optionIndex) => (
// //                   <input
// //                     key={optionIndex}
// //                     type="text"
// //                     value={option}
// //                     onChange={(e) => {
// //                       const updatedOptions = [...question.options];
// //                       updatedOptions[optionIndex] = e.target.value;
// //                       handleQuestionChange(
// //                         sectionIndex,
// //                         questionIndex,
// //                         "options",
// //                         updatedOptions
// //                       );
// //                     }}
// //                     className="w-full p-2 border rounded-md mb-2"
// //                   />
// //                 ))}

// //                 <label className="block text-sm font-medium">
// //                   Correct Answer
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={question.correctAnswer}
// //                   onChange={(e) =>
// //                     handleQuestionChange(
// //                       sectionIndex,
// //                       questionIndex,
// //                       "correctAnswer",
// //                       e.target.value
// //                     )
// //                   }
// //                   className="w-full p-2 border rounded-md"
// //                 />
// //               </div>
// //             ))}

// //             <button
// //               type="button"
// //               onClick={() => addQuestion(sectionIndex)}
// //               className="bg-green-500 text-white text-sm px-3 py-1 rounded-md mt-2"
// //             >
// //               Add Question
// //             </button>
// //           </div>
// //         ))}

// //         <button
// //           type="button"
// //           onClick={addSection}
// //           className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md mb-4"
// //         >
// //           Add Section
// //         </button>

// //         {/* Submit & Cancel */}
// //         <div className="flex justify-end gap-2 mt-4">
// //           <button
// //             type="button"
// //             onClick={onClose}
// //             className="px-4 py-2 bg-gray-500 text-white rounded-md"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="submit"
// //             className="px-4 py-2 bg-blue-600 text-white rounded-md"
// //           >
// //             Save Changes
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default EditExam;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchExams,
//   updateExam,
//   updateQuestion,
//   addQuestions,
// } from "../redux/examSlice"; // Update your paths accordingly
// import { useParams, useNavigate } from "react-router-dom";

// const EditExamPage = () => {
//   const { examId } = useParams(); // Get exam ID from URL
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { exams, loading, error } = useSelector((state) => state.exam);

//   // ✅ State for exam details
//   const [examData, setExamData] = useState({
//     title: "",
//     duration: 0,
//     description: "",
//   });

//   // ✅ State for questions
//   const [questions, setQuestions] = useState([
//     { questionId: "", text: "", options: ["", "", "", ""], correctOption: 0 },
//   ]);

//   // ✅ Fetch exam and questions on load
//   useEffect(() => {
//     if (!exams.length) {
//       dispatch(fetchExams());
//     } else {
//       const selectedExam = exams.find((exam) => exam._id === examId);
//       if (selectedExam) {
//         setExamData({
//           title: selectedExam.title,
//           duration: selectedExam.duration,
//           description: selectedExam.description,
//         });
//         setQuestions(selectedExam.questions || []);
//       }
//     }
//   }, [dispatch, exams, examId]);

//   // ✅ Handle input changes for exam
//   const handleExamChange = (e) => {
//     setExamData({ ...examData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle question input changes
//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   // ✅ Add new question
//   const addNewQuestion = () => {
//     setQuestions([
//       ...questions,
//       { questionId: "", text: "", options: ["", "", "", ""], correctOption: 0 },
//     ]);
//   };

//   // ✅ Remove question
//   const removeQuestion = (index) => {
//     const updatedQuestions = questions.filter((_, i) => i !== index);
//     setQuestions(updatedQuestions);
//   };

//   // ✅ Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // ✅ Update Exam Details
//       await dispatch(updateExam({ examId, updatedData: examData })).unwrap();

//       // ✅ Update or Add Questions
//       const updatedQuestions = questions.filter((q) => q.text.trim() !== "");

//       if (updatedQuestions.length) {
//         const existingQuestions = updatedQuestions.filter((q) => q.questionId);
//         const newQuestions = updatedQuestions.filter((q) => !q.questionId);

//         // ✅ Update existing questions
//         for (const question of existingQuestions) {
//           await dispatch(
//             updateQuestion({
//               questionId: question.questionId,
//               updatedData: question,
//             })
//           ).unwrap();
//         }

//         // ✅ Add new questions
//         if (newQuestions.length) {
//           await dispatch(
//             addQuestions({ examId, questions: newQuestions })
//           ).unwrap();
//         }
//       }

//       alert("Exam and questions updated successfully!");
//       navigate("/exams"); // Redirect to exams list
//     } catch (error) {
//       alert("Error updating exam: " + error.message);
//     }
//   };

//   if (loading) return <p>Loading exam details...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Edit Exam</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* ✅ Exam Details */}
//         <div>
//           <label className="block font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={examData.title}
//             onChange={handleExamChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Duration (minutes)</label>
//           <input
//             type="number"
//             name="duration"
//             value={examData.duration}
//             onChange={handleExamChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Description</label>
//           <textarea
//             name="description"
//             value={examData.description}
//             onChange={handleExamChange}
//             rows="3"
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* ✅ Question Management */}
//         <h3 className="text-xl font-bold mt-6">Questions</h3>
//         {questions.map((question, index) => (
//           <div key={index} className="border p-4 rounded mb-4">
//             <input
//               type="text"
//               placeholder="Enter question text"
//               value={question.text}
//               onChange={(e) =>
//                 handleQuestionChange(index, "text", e.target.value)
//               }
//               className="w-full p-2 border rounded mb-2"
//               required
//             />
//             {question.options.map((option, optIndex) => (
//               <input
//                 key={optIndex}
//                 type="text"
//                 placeholder={`Option ${optIndex + 1}`}
//                 value={option}
//                 onChange={(e) => {
//                   const updatedOptions = [...question.options];
//                   updatedOptions[optIndex] = e.target.value;
//                   handleQuestionChange(index, "options", updatedOptions);
//                 }}
//                 className="w-full p-2 border rounded mb-1"
//                 required
//               />
//             ))}
//             <select
//               value={question.correctOption}
//               onChange={(e) =>
//                 handleQuestionChange(
//                   index,
//                   "correctOption",
//                   parseInt(e.target.value)
//                 )
//               }
//               className="w-full p-2 border rounded mb-2"
//             >
//               {question.options.map((_, i) => (
//                 <option key={i} value={i}>
//                   Correct Option {i + 1}
//                 </option>
//               ))}
//             </select>
//             <button
//               type="button"
//               onClick={() => removeQuestion(index)}
//               className="bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Remove Question
//             </button>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addNewQuestion}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add New Question
//         </button>

//         {/* ✅ Submit Button */}
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-6 py-2 rounded mt-4"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditExamPage;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExams,
  updateExam,
  updateQuestion,
  addQuestions,
} from "../redux/examSlice"; // Update paths if necessary
import { useParams, useNavigate } from "react-router-dom";

const EditExamPage = () => {
  const { examId } = useParams(); // Get exam ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { exams, loading, error } = useSelector((state) => state.exam);

  // ✅ State for exam details
  const [examData, setExamData] = useState({
    title: "",
    duration: 0,
    description: "",
  });

  // ✅ State for questions
  const [questions, setQuestions] = useState([]);

  // ✅ Fetch exam and questions on load
  useEffect(() => {
    if (!exams.length) {
      dispatch(fetchExams());
    } else {
      const selectedExam = exams.find((exam) => exam._id === examId);
      if (selectedExam) {
        setExamData({
          title: selectedExam.title || "",
          duration: selectedExam.duration || 0,
          description: selectedExam.description || "",
        });
        setQuestions(selectedExam.questions || []);
      }
    }
  }, [dispatch, exams, examId]);
  

  // ✅ Handle input changes for exam
  const handleExamChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  // ✅ Handle question input changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value || (field === "options" ? ["", "", "", ""] : ""),
    };
    setQuestions(updatedQuestions);
  };
  
  

  // ✅ Add new question
  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionId: "",
        text: "",
        options: ["", "", "", ""],
        correctOption: 0,
      },
    ]);
  };
  

  // ✅ Remove question
  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Update Exam Details
      await dispatch(updateExam({ examId, updatedData: examData })).unwrap();

      // ✅ Update or Add Questions
      const updatedQuestions = questions.filter((q) => q.text.trim() !== "");

      if (updatedQuestions.length) {
        const existingQuestions = updatedQuestions.filter((q) => q.questionId);
        const newQuestions = updatedQuestions.filter((q) => !q.questionId);

        // ✅ Update existing questions
        for (const question of existingQuestions) {
          await dispatch(
            updateQuestion({
              questionId: question.questionId,
              updatedData: question,
            })
          ).unwrap();
        }

        // ✅ Add new questions
        if (newQuestions.length) {
          await dispatch(
            addQuestions({ examId, questions: newQuestions })
          ).unwrap();
        }
      }

      alert("Exam and questions updated successfully!");
      navigate("/exams"); // Redirect to exams list
    } catch (error) {
      alert("Error updating exam: " + error.message);
    }
  };

  if (loading) return <p>Loading exam details...</p>;
  if (error) {
    const errorMessage =
      typeof error === "string" ? error : JSON.stringify(error);
    return <p>Error: {errorMessage}</p>;
  }
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Exam</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Exam Details */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={examData.title}
            onChange={handleExamChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={examData.duration}
            onChange={handleExamChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={examData.description}
            onChange={handleExamChange}
            rows="3"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ✅ Question Management */}
        <h3 className="text-xl font-bold mt-6">Questions</h3>
        {questions.map((question, index) => (
          <div key={index} className="border p-4 rounded mb-4">
            <input
              type="text"
              placeholder="Enter question text"
              value={question.text}
              onChange={(e) =>
                handleQuestionChange(index, "text", e.target.value)
              }
              className="w-full p-2 border rounded mb-2"
              required
            />
            {question.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...question.options];
                  updatedOptions[optIndex] = e.target.value;
                  handleQuestionChange(index, "options", updatedOptions);
                }}
                className="w-full p-2 border rounded mb-1"
                required
              />
            ))}
            <select
  value={question.correctOption ?? 0}
  onChange={(e) =>
    handleQuestionChange(index, "correctOption", parseInt(e.target.value, 10))
  }
  className="w-full p-2 border rounded mb-2"
>
  {question.options?.map((option, optIndex) => (
    <option key={optIndex} value={optIndex}>
      {option || `Option ${optIndex + 1}`}
    </option>
  ))}
</select>


            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove Question
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addNewQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Question
        </button>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditExamPage;
