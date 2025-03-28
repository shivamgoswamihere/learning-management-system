import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamQuestions, submitResult, generateCertificate } from "../redux/examSlice";

const StartExam = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exam.exams);
  const exam = exams.find((e) => e._id === examId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam?.timeLimit * 60 || 0);
  const navigate = useNavigate();
  const { certificateUrl, status, error } = useSelector((state) => state.exam);


  useEffect(() => {
    if (!exam || !exam.questions) {
      dispatch(fetchExamQuestions(examId));
    }
  }, [dispatch, examId, exam]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setTimeUp(true);
    }
  }, [timeLeft, showResult]);

  if (!exam) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Loading Exam...</div>;
  }

  if (!exam.questions || exam.questions.length === 0) {
    return <div className="flex items-center justify-center h-screen text-red-500">No questions available.</div>;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];

  const handleAnswerSelect = (option) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion._id]: option }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitResult(); // Submit result on finish
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const correctAnswers = exam.questions.reduce((acc, question) => {
    acc[question._id] = question.correctAnswer;
    return acc;
  }, {});

  const marksPerQuestion = exam.totalMarks / exam.questions.length;

  const calculateResults = () => {
    const correct = Object.keys(selectedAnswers).filter(
      (key) => selectedAnswers[key] === correctAnswers[key]
    ).length;

    const incorrect = Object.keys(selectedAnswers).length - correct;
    const obtainedMarks = correct * marksPerQuestion;

    return {
      correct,
      incorrect,
      obtainedMarks,
      totalQuestions: exam.questions.length,
    };
  };

  const handleSubmitResult = () => {
    const resultData = calculateResults();

    dispatch(
      submitResult({
        examId,
        result: {
          selectedAnswers,
          ...resultData,
        },
      })
    );
  };

  // 🚀 Handle Certificate Download


  const handleGenerateCertificate = () => {
    dispatch(generateCertificate(examId));
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">{exam.title}</h2>
      <p className="text-gray-600 mt-2">Exam Code: {exam.code}</p>
      <p className="text-gray-600 mt-2">Total Marks: {exam.totalMarks}</p>
      <p className="text-gray-600 mt-2">Number of Questions: {exam.questions.length}</p>
      <p className="text-red-600 font-bold mt-2">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Question {currentQuestionIndex + 1} of {exam.questions.length}</h3>
        <p className="text-gray-700 mt-2">{currentQuestion?.text}</p>
      </div>

      <div className="mt-4">
        {currentQuestion?.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`block w-full px-4 py-2 rounded-lg mt-2 transition ${selectedAnswers[currentQuestion._id] === option ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition disabled:bg-gray-400"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion._id]}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {currentQuestionIndex === exam.questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      {showResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-bold">Exam Results</h2>
            <p className="mt-4 text-green-600">Correct Answers: {calculateResults().correct}</p>
            <p className="text-red-600">Incorrect Answers: {calculateResults().incorrect}</p>
            <p className="mt-4 font-bold text-gray-700">
              Marks Obtained: <span className="text-blue-600">{calculateResults().obtainedMarks} / {exam.totalMarks}</span>
            </p>

            {exam?.type === "Certification Exam" && (
              certificateUrl ? (
                <a
                  href={certificateUrl}
                  download
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Download Certificate
                </a>
              ) : (
                <button
                  onClick={handleGenerateCertificate}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Generating..." : "Generate Certificate"}
                </button>
              )
            )}



            <button
              onClick={() => navigate("/exams")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {timeUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-bold text-red-600">Time's Up!</h2>
            <p className="mt-4 text-gray-600">The exam time has expired. Please submit your answers.</p>
            <button
              onClick={() => {
                handleSubmitResult();
                setShowResult(true);
                setTimeUp(false);
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Submit & View Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartExam;
