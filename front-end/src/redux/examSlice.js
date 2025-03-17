import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base API URL
const API_BASE_URL = "http://localhost:5000/api/exams";
const token = localStorage.getItem("token");
const headers = token ? { Authorization: `Bearer ${token}` } : {};


// Fetch all exams
export const fetchExams = createAsyncThunk("exam/fetchExams", async () => {
  const response = await axios.get(`${API_BASE_URL}/all`);
  return response.data;
});

// Create an exam
export const createExam = createAsyncThunk("exam/createExam", async (examData, { rejectWithValue }) => {
  try {
    console.log("Auth Token:", localStorage.getItem("token")); // Debugging
    const response = await axios.post(`${API_BASE_URL}/create`, examData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating exam:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});


// Add questions to an exam
export const addQuestions = createAsyncThunk("exam/addQuestions", async (data, { rejectWithValue }) => {
  try {
    console.log("Auth Token:", localStorage.getItem("token")); // Debugging
    const response = await axios.post(`${API_BASE_URL}/add-questions`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error adding questions:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
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
          updatedExam.questions = [...updatedExam.questions, ...action.payload.questions];
        }
      });
  },
});

export default examSlice.reducer;
