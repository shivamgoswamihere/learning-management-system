import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateExam } from "../redux/examSlice";

const EditExam = ({ exam, isOpen, onClose }) => {
  const dispatch = useDispatch();

  // State for updated exam data
  const [updatedExam, setUpdatedExam] = useState({
    title: "",
    description: "",
    duration: 0,
    sections: [],
  });

  // Populate state when modal opens
  useEffect(() => {
    if (isOpen && exam) {
      setUpdatedExam({
        title: exam.title || "",
        description: exam.description || "",
        duration: exam.duration || 0,
        sections: exam.sections || [],
      });
    }
  }, [exam, isOpen]);

  // Handle input changes for exam details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExam((prevData) => ({
      ...prevData,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  // Handle section change
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...updatedExam.sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setUpdatedExam((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // Add new section
  const addSection = () => {
    setUpdatedExam((prevData) => ({
      ...prevData,
      sections: [
        ...prevData.sections,
        { title: "", description: "", questions: [] },
      ],
    }));
  };

  // Remove section
  const removeSection = (index) => {
    const updatedSections = updatedExam.sections.filter((_, i) => i !== index);
    setUpdatedExam((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // Handle question change
  const handleQuestionChange = (sectionIndex, questionIndex, field, value) => {
    const updatedSections = [...updatedExam.sections];
    updatedSections[sectionIndex].questions[questionIndex] = {
      ...updatedSections[sectionIndex].questions[questionIndex],
      [field]: value,
    };
    setUpdatedExam((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // Add new question to section
  const addQuestion = (sectionIndex) => {
    const updatedSections = [...updatedExam.sections];
    updatedSections[sectionIndex].questions.push({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setUpdatedExam((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // Remove question from section
  const removeQuestion = (sectionIndex, questionIndex) => {
    const updatedSections = [...updatedExam.sections];
    updatedSections[sectionIndex].questions = updatedSections[
      sectionIndex
    ].questions.filter((_, i) => i !== questionIndex);
    setUpdatedExam((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      title: updatedExam.title,
      description: updatedExam.description,
      duration: updatedExam.duration,
      sections: updatedExam.sections,
    };

    try {
      await dispatch(updateExam({ examId: exam._id, updatedData }));
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Failed to update exam:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Exam</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Exam Details */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={updatedExam.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={updatedExam.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Duration (in minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={updatedExam.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              min="1"
            />
          </div>

          {/* Section Management */}
          {updatedExam.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4 border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">
                  Section {sectionIndex + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  className="text-red-500 text-sm"
                >
                  Remove Section
                </button>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Section Title</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(sectionIndex, "title", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">
                  Section Description
                </label>
                <textarea
                  value={section.description}
                  onChange={(e) =>
                    handleSectionChange(sectionIndex, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Question Management */}
              {section.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="mb-3 border p-3 rounded-md bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold">
                      Question {questionIndex + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeQuestion(sectionIndex, questionIndex)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <label className="block text-sm font-medium">Question Text</label>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) =>
                      handleQuestionChange(
                        sectionIndex,
                        questionIndex,
                        "questionText",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded-md mb-2"
                  />

                  <label className="block text-sm font-medium">Options</label>
                  {question.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...question.options];
                        updatedOptions[optionIndex] = e.target.value;
                        handleQuestionChange(
                          sectionIndex,
                          questionIndex,
                          "options",
                          updatedOptions
                        );
                      }}
                      className="w-full p-2 border rounded-md mb-2"
                    />
                  ))}

                  <label className="block text-sm font-medium">
                    Correct Answer
                  </label>
                  <input
                    type="text"
                    value={question.correctAnswer}
                    onChange={(e) =>
                      handleQuestionChange(
                        sectionIndex,
                        questionIndex,
                        "correctAnswer",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => addQuestion(sectionIndex)}
                className="bg-green-500 text-white text-sm px-3 py-1 rounded-md mt-2"
              >
                Add Question
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md mb-4"
          >
            Add Section
          </button>

          {/* Submit & Cancel */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditExam;
