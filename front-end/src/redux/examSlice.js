import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base API URL
const API_BASE_URL = "http://localhost:5000/api/exams";

export const fetchExams = createAsyncThunk("exam/fetchExams", async () => {
  const response = await axios.get(`${API_BASE_URL}/all`);
  return response.data;
});

export const createExam = createAsyncThunk("exam/createExam", async (examData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, examData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // Ensure token is included
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating exam:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  });
  

export const addQuestions = createAsyncThunk("exam/addQuestions", async (data) => {
  const response = await axios.post(`${API_BASE_URL}/add-questions`, data);
  return response.data;
});

const examSlice = createSlice({
  name: "exam",
  initialState: { exams: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.exams = action.payload;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.exams.push(action.payload);
      })
      .addCase(addQuestions.fulfilled, (state, action) => {
        const updatedExam = state.exams.find((exam) => exam._id === action.payload.examId);
        if (updatedExam) {
          updatedExam.questions.push(...action.payload.questions);
        }
      });
  },
});

export default examSlice.reducer;
