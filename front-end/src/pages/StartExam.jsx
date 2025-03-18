import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamQuestions } from "../redux/examSlice";

const StartExam = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exam.exams);
  const exam = exams.find((e) => e._id === examId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (!exam || !exam.questions) {
      dispatch(fetchExamQuestions(examId)); // ✅ Fetch only this exam’s questions
    }
  }, [dispatch, examId, exam]);

  if (!exam) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg font-semibold">Loading Exam...</p>
      </div>
    );
  }

  if (!exam.questions || exam.questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">No questions available for this exam.</p>
      </div>
    );
  }

  // ✅ Get current question safely
  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">{exam.title}</h2>
      <p className="text-gray-600 mt-2">Exam Code: {exam.code}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">
          Question {currentQuestionIndex + 1} of {exam.questions.length}
        </h3>
        <p className="text-gray-700 mt-2">{currentQuestion?.questionText || "Loading..."}</p>
      </div>

      <div className="mt-4">
        {currentQuestion?.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(option)}
            className={`block w-full text-left px-4 py-2 rounded-lg mt-2 transition ${
              selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
        disabled={currentQuestionIndex >= exam.questions.length - 1}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {currentQuestionIndex === exam.questions.length - 1 ? "Submit Exam" : "Next Question"}
      </button>
    </div>
  );
};

export default StartExam;
