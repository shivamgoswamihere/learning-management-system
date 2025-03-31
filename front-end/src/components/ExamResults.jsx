import React, { useState } from "react";

const ExamResults = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;

  // Sort results from latest to oldest
  const sortedResults = [...results].sort(
    (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedResults.length / resultsPerPage);

  // Slice results for current page
  const displayedResults = sortedResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-purple-800 mb-4">📊 Exam Results</h3>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedResults.map((result) => (
          <div
            key={result._id}
            className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-purple-200"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              🎯 {result.examTitle || "Exam Name Not Available"}
            </h4>
            <p className="text-sm font-medium text-purple-700 mb-2">
              📌 Exam Type: <span className="font-semibold">{result.examType || "N/A"}</span>
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p>📚 <strong>Obtained Marks:</strong> {result.obtainedMarks}</p>
              <p>✅ <strong>Correct Answers:</strong> {result.correctAnswers}</p>
              <p>❌ <strong>Incorrect Answers:</strong> {result.incorrectAnswers}</p>
              <p>📝 <strong>Total Questions:</strong> {result.totalQuestions}</p>
              <p>📈 <strong>Percentage:</strong> {result.percentage}%</p>
            </div>
            <p className={`text-sm font-semibold mt-3 ${result.passed ? "text-green-600" : "text-red-600"}`}>
              {result.passed ? "🎉 Passed" : "❗ Failed"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ⏰ Submitted on: {new Date(result.submittedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-sm rounded-md ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>
          <span className="text-gray-800 font-semibold">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-sm rounded-md ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamResults;
