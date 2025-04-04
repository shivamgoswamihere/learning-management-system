import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams, enrollExam } from "../redux/examSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const ExamList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams, status, error } = useSelector((state) => state.exam);
  const { user } = useSelector((state) => state.auth); // Get logged-in user

  const [selectedType, setSelectedType] = useState("All"); // State to filter exams

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExams()); // Fetch exams only if not already loaded
    }
  }, [dispatch, status]);

  // Handle enroll button click
  const handleEnroll = (examId, isEnrolled) => {
    if (isEnrolled) {
      navigate(`/exam/start/${examId}`); // ✅ Navigate if already enrolled
    } else {
      dispatch(enrollExam(examId))
        .unwrap()
        .then(() => {
          toast.success("Successfully enrolled in the exam!");
          navigate(`/exam/start/${examId}`); // ✅ Navigate after enrollment
        })
        .catch((err) => {
          toast.error(err.message || "Failed to enroll.");
        });
    }
  };

  // Filter exams based on selected type
  const filteredExams =
    selectedType === "All"
      ? exams
      : exams.filter((exam) => exam.type === selectedType);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-blue-500 text-lg font-semibold">Loading Exams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Exams</h2>

      {/* Filter Buttons */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setSelectedType("All")}
          className={`px-4 py-2 rounded-lg shadow ${
            selectedType === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedType("Practice Test")}
          className={`px-4 py-2 rounded-lg shadow ${
            selectedType === "Practice Test"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Practice Test
        </button>
        <button
          onClick={() => setSelectedType("Certification Exam")}
          className={`px-4 py-2 rounded-lg shadow ${
            selectedType === "Certification Exam"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Certification Exam
        </button>
      </div>

      {filteredExams.length === 0 ? (
        <p className="text-gray-600">No exams available for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam._id}
              className="p-4 bg-white shadow rounded-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {exam.title}
                </h3>
                <p className="text-gray-600">Code: {exam.code}</p>
                <p className="text-gray-600">Subject: {exam.subject}</p>
                <p className="text-gray-600">Category: {exam.category}</p>
                <p className="text-gray-600">
                  Time Limit: {exam.timeLimit} min
                </p>
                <p className="text-gray-600">
                  Number of Questions: {exam.numQuestions}
                </p>
                <p className="text-gray-600">Total Marks: {exam.totalMarks}</p>
                <p className="text-gray-700 font-semibold">
                  Exam Type: {exam.type}
                </p>
              </div>

              <div className="mt-4">
                {/* Role-based Exam Actions */}
                {user?.role === "examinee" ||
                user?.role === "trainer" ||
                user?.role === "learner" ||
                user?.role === "admin" ? (
                  <button
                    onClick={() => navigate(`/exam/start/${exam._id}`)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Start Exam
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm">Not authorized</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamList;
