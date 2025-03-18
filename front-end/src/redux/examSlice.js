import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base API URL
const API_BASE_URL = "http://localhost:5000/api/exams";

// ✅ Function to check if the token is valid
const isTokenValid = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.exp * 1000 > Date.now(); // Check if the token is expired
  } catch (error) {
    return false;
  }
};

// ✅ Get token from localStorage or state
const getToken = (getState) => {
  const token = localStorage.getItem("token") || getState().auth?.token;
  if (token && isTokenValid(token)) {
    return token.trim();
  }
  return null;
};

// ✅ Fetch all exams
export const fetchExams = createAsyncThunk("exam/fetchExams", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch exams");
  }
});


export const createExam = createAsyncThunk("exam/create", async (examData, { rejectWithValue }) => {
  try {
    const token = getToken(); // Get token before making request
    const response = await axios.post("/api/exams/create", examData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addQuestions = createAsyncThunk("exam/addQuestions", async (data, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.post("/api/exams/add-questions", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
const examSlice = createSlice({
  name: "exam",
  initialState: { exams: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Exams
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Create Exam
      .addCase(createExam.fulfilled, (state, action) => {
        state.exams.push(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Add Questions
      .addCase(addQuestions.fulfilled, (state, action) => {
        const updatedExam = state.exams.find((exam) => exam._id === action.payload.examId);
        if (updatedExam) {
          updatedExam.questions = [...updatedExam.questions, ...action.payload.questions];
        }
      })
      .addCase(addQuestions.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default examSlice.reducer;
