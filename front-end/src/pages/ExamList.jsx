import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams } from "../redux/examSlice";

const ExamList = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exam.exams);

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  return (
    <div>
      <h2>Exams</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id}>{exam.title} - {exam.code}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExamList;
