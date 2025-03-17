// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define the base API URL
// const API_BASE_URL = "http://localhost:5000/api/exams";


// // Fetch all exams
// export const fetchExams = createAsyncThunk("exam/fetchExams", async () => {
//   const response = await axios.get(`${API_BASE_URL}/all`);
//   return response.data;
// });

// // Create an exam
// export const createExam = createAsyncThunk("exam/createExam", async (examData, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem("token"); // Fetch the latest token
//     const headers = token ? { Authorization: `Bearer ${token}` } : {};
//     console.log("Auth Token being sent:", token); // Debugging
    
//     const response = await axios.post(`${API_BASE_URL}/create`, examData, { headers });
//     return response.data;
//   } catch (error) {
//     console.error("Error creating exam:", error.response?.data || error.message);
//     return rejectWithValue(error.response?.data || "Something went wrong");
//   }
// });


// export const addQuestions = createAsyncThunk("exam/addQuestions", async (data, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem("token");
//     const headers = token ? { Authorization: `Bearer ${token}` } : {};
//     const response = await axios.post(`${API_BASE_URL}/add-questions`, data, { headers });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Something went wrong");
//   }
// });



// const examSlice = createSlice({
//   name: "exam",
//   initialState: { exams: [], status: "idle", error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchExams.fulfilled, (state, action) => {
//         state.exams = action.payload;
//       })
//       .addCase(createExam.fulfilled, (state, action) => {
//         state.exams.push(action.payload);
//       })
//       .addCase(addQuestions.fulfilled, (state, action) => {
//         const updatedExam = state.exams.find((exam) => exam._id === action.payload.examId);
//         if (updatedExam) {
//           updatedExam.questions = [...updatedExam.questions, ...action.payload.questions];
//         }
//       });
//   },
// });

// export default examSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base API URL
const API_BASE_URL = "http://localhost:5000/api/exams";

// Function to check if the token is valid
const isTokenValid = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.exp * 1000 > Date.now(); // Convert exp to milliseconds and compare with current time
  } catch (error) {
    return false;
  }
};

// Fetch all exams
export const fetchExams = createAsyncThunk("exam/fetchExams", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch exams");
  }
});

// Create an exam
export const createExam = createAsyncThunk("exam/createExam", async (examData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token || !isTokenValid(token)) {
      console.error("Token is missing or expired. Please log in again.");
      return rejectWithValue("Token is missing or expired. Please log in again.");
    }

    const headers = { Authorization: `Bearer ${token.trim()}` };

    console.log("Auth Token being sent:", token);
    console.log("Headers being sent:", headers);

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
    const token = localStorage.getItem("token");

    if (!token || !isTokenValid(token)) {
      console.error("Token is missing or expired. Please log in again.");
      return rejectWithValue("Token is missing or expired. Please log in again.");
    }

    const headers = { Authorization: `Bearer ${token.trim()}` };

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
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createExam.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addQuestions.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default examSlice.reducer;
