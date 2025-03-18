import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams } from "../redux/examSlice";
import { useNavigate } from "react-router-dom";

const ExamList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams, status, error } = useSelector((state) => state.exam);
  const { user } = useSelector((state) => state.auth); // Get logged-in user

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExams()); // Fetch exams only if not already loaded
    }
  }, [dispatch, status]);

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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Exams</h2>
      
      {exams.length === 0 ? (
        <p className="text-gray-600">No exams available.</p>
      ) : (
        <ul className="space-y-4">
          {exams.map((exam) => (
            <li key={exam._id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{exam.title}</h3>
                <p className="text-gray-600">Code: {exam.code}</p>
              </div>
              {/* Show "Start Exam" button only for Examinee & Trainer roles */}
              {user?.role === "examinee" || user?.role === "trainer" ? (
                <button
                  onClick={() => navigate(`/exam/start/${exam._id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Start Exam
                </button>
              ) : (
                <p className="text-gray-500 text-sm">Not authorized to start</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamList;
