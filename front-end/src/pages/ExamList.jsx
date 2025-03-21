import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams, enrollExam } from "../redux/examSlice";
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

 
  const handleEnroll = (examId, isEnrolled) => {
    if (isEnrolled) {
      navigate(`/exam/start/${examId}`); // ✅ Navigate if already enrolled
    } else {
      dispatch(enrollExam(examId))
        .unwrap()
        .then(() => {
          alert("Successfully enrolled in the exam!");
          navigate(`/exam/start/${examId}`); // ✅ Navigate after enrollment
        })
        .catch((err) => {
          alert(err.message || "Failed to enroll.");
        });
    }
  };
  

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
            <li
              key={exam._id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {exam.title}
          </h3>
          <p className="text-gray-600">Code: {exam.code}</p>
          <p className="text-gray-600">Subject: {exam.subject}</p>
          <p className="text-gray-600">Time Limit: {exam.timeLimit} min</p>
          <p className="text-gray-600">Number of Questions: {exam.numQuestions}</p>
          <p className="text-gray-600">Total Marks: {exam.totalMarks}</p>
        </div>


              <div className="flex space-x-4">
                {/* Role-based Exam Actions */}
                {user?.role === "examinee" || user?.role === "trainer" || user?.role === "learner" || user?.role === "admin" ? (
                  <>
                    <button
                      onClick={() => navigate(`/exam/start/${exam._id}`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      Start Exam
                    </button>
                    {/* {!exam.isEnrolled ? (
                      <button
                        onClick={() => handleEnroll(exam._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                      >
                        Enroll
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Already Enrolled
                      </span>
                    )} */}
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">Not authorized</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamList;
