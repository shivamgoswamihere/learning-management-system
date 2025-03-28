import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatedExams } from "../redux/examSlice";
import { useNavigate } from "react-router-dom";

const TrainerExams = () => {
    const dispatch = useDispatch();
    const { exams, loading, error } = useSelector((state) => state.exam);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCreatedExams());
    }, [dispatch]);

    return (
            <div className="container mx-auto p-6">
              <button onClick={() => navigate(-1)} className="mb-2 mx-6 px-4 py-1 bg-black text-white hover:bg-gray-900">
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-center mb-4">Created Exams</h2>
              
              {loading && <p className="text-center text-gray-500">Loading...</p>}
              {/* {error && <p className="text-center text-red-500">{error}</p>} */}
          
              {exams.length === 0 && !loading && !error && (
                <p className="text-center text-gray-500">No exams found.</p>
              )}
          
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map((exam) => (
                 <div key={exam._id} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
  <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
  <p className="text-gray-700 mb-2">
    <strong>Subject:</strong> {exam.subject}
  </p>
  <p className="text-gray-700 mb-2">
    <strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}
  </p>
  <p className="text-gray-700 mb-2">
    <strong>Duration:</strong> {exam.duration} minutes
  </p>
  <p className="text-gray-700 mb-2">
    <strong>Total Marks:</strong> {exam.totalMarks}
  </p>

  {/* ✅ Edit Button to Navigate to Edit Page */}
  <button
    onClick={() => navigate(`/exams/edit/${exam._id}`)}
    className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
  >
    Edit Exam
  </button>
  
</div>


                ))}
              </div>
            </div>
          );
};

export default TrainerExams;