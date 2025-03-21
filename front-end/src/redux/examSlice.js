import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // ✅ Import js-cookie

// Define the base API URL
const API_BASE_URL = "http://localhost:5000/api/exams";

// ✅ Function to check if the token is valid
const isTokenValid = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.exp * 1000 > Date.now(); // Check if expired
  } catch (error) {
    return false;
  }
};

// ✅ Get token from cookies
const getToken = () => {
  const token = Cookies.get("token");
  return token && isTokenValid(token) ? token.trim() : null;
};

// ✅ Fetch all exams (Accessible by trainers & examinees)
export const fetchExams = createAsyncThunk(
  "exam/fetchExams",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Unauthorized - No token");

      const response = await axios.get(`${API_BASE_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // Ensures cookies are sent
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch exams");
    }
  }
);

// ✅ Create Exam (Only trainers can access)
export const createExam = createAsyncThunk(
  "exam/createExam",
  async (examData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Unauthorized - No token");

      const response = await axios.post(`${API_BASE_URL}/create`, examData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create exam");
    }
  }
);

// ✅ Add Questions to an Exam (Only trainers can access)
export const addQuestions = createAsyncThunk(
  "exam/addQuestions",
  async ({ examId, questions }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Unauthorized - No token");

      const response = await axios.post(
        `${API_BASE_URL}/add-questions`,
        { examId, questions },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add questions");
    }
  }
);

// ✅ Fetch Questions for a Specific Exam (Trainers & Examinees)
// ✅ Fetch a single exam's questions
export const fetchExamQuestions = createAsyncThunk(
  "exam/fetchExamQuestions",
  async (examId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Unauthorized - No token");

      const response = await axios.get(`${API_BASE_URL}/${examId}/questions`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      return { examId, questions: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch questions");
    }
  }
);

// ✅ Enroll in an Exam (Learners & Examinees)
export const enrollExam = createAsyncThunk(
  "exam/enrollExam",
  async (examId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Unauthorized - No token");

      const response = await axios.post(
        `${API_BASE_URL}/enroll/${examId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to enroll in exam");
    }
  }
);

// ✅ Fetch Enrolled Exams for a User
export const fetchEnrolledExams = createAsyncThunk(
  "exam/fetchEnrolledExams",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Unauthorized - No token");

      const response = await axios.get(`${API_BASE_URL}/enrolledExam`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      return response.data.enrolledExams;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch enrolled exams");
    }
  }
);
// ✅ Submit Exam Result
export const submitResult = createAsyncThunk(
  "exam/submitResult",
  async (resultData, { rejectWithValue }) => {
    try {
      const token = getToken(); // ✅ Ensure token is fetched correctly
      if (!token) throw new Error("Unauthorized - No token");

      const response = await axios.post(
        `${API_BASE_URL}/submit-result`, // ✅ Correct URL
        resultData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // ✅ Important
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error submitting result:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to submit result");
    }
  }
);



// ✅ Fetch Results for a User
export const fetchResults = createAsyncThunk(
  "exam/fetchResults",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Unauthorized - Please log in to view results.");
      }

      const response = await axios.get(`${API_BASE_URL}/submitted-results`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // Only needed if backend uses cookies
      });
      

      // ✅ Return results correctly
      return response.data;
    } catch (error) {
      // ✅ Proper error handling
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch results"
      );
    }
  }
);



// ✅ Exam Slice
const examSlice = createSlice({
  name: "exam",
  initialState: {
    exams: [],
    enrolledExams: [],
    results: [], // ✅ Store results
    loading: false,
    status: "idle",
    error: null,},
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Exams
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.exams = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Create Exam
      .addCase(createExam.fulfilled, (state, action) => {
        state.exams.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createExam.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Add Questions
      .addCase(addQuestions.fulfilled, (state, action) => {
        const { examId, questions } = action.payload;
        const updatedExam = state.exams.find((exam) => exam._id === examId);
        if (updatedExam) {
          updatedExam.questions = [...updatedExam.questions, ...questions]; // ✅ Fix updating questions
        }
      })

      .addCase(addQuestions.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Fetch Questions for a Specific Exam
      .addCase(fetchExamQuestions.fulfilled, (state, action) => {
        const { examId, questions } = action.payload;
        const exam = state.exams.find((e) => e._id === examId);
        if (exam) {
          exam.questions = questions; // ✅ Ensure questions are stored
        }
        state.status = "succeeded";
      })
      .addCase(fetchExamQuestions.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
       .addCase(enrollExam.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(enrollExam.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // ✅ Fetch Enrolled Exams
      .addCase(fetchEnrolledExams.fulfilled, (state, action) => {
        state.enrolledExams = action.payload; // Store enrolled exams
        state.status = "succeeded";
      })
      .addCase(fetchEnrolledExams.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(submitResult.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(submitResult.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
    
      // ✅ Fetch Results
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload; // ✅ Ensure correct data assignment
      })
      
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default examSlice.reducer;
