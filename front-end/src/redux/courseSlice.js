import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

// ✅ Fetch All Courses (Public)
export const fetchAllCourses = createAsyncThunk(
    "courses/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/all-courses`);
            return response.data.courses;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
        }
    }
); 

// ✅ Fetch Trainer's Courses (Only Trainers)
export const fetchTrainerCourses = createAsyncThunk(
    "courses/fetchTrainer",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            console.log("Token being sent:", token); // Debugging
            
            const response = await axios.get(`${API_URL}/trainer`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            return response.data.courses;
        } catch (error) {
            console.error("Error fetching trainer courses:", error.response?.data);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch trainer courses");
        }
    }
    
);

// ✅ Fetch Single Course (With Lessons)
export const fetchCourseById = createAsyncThunk(
    "courses/fetchById",
    async (courseId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(`${API_URL}/${courseId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch course");
        }
    }
);

// ✅ Create Course
export const createCourse = createAsyncThunk(
    "courses/create",
    async (courseData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            
            const response = await axios.post(`${API_URL}/create-course`, courseData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create course");
        }
    }
);


export const updateCourse = createAsyncThunk(
    "courses/update",
    async ({ courseId, updatedData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.put(`${API_URL}/${courseId}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data.course; // Return updated course
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update course");
        }
    }
);
// ✅ Enroll in Course (POST)
// ✅ Enroll in a Course (POST /enroll/:courseId)
export const enrollCourse = createAsyncThunk(
    "courses/enrollCourse",
    async (courseId, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.token;
        const response = await axios.post(
          `${API_URL}/enroll/${courseId}`,
          null, // No request body needed for enrollment
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Error enrolling in course"
        );
      }
    }
  );
  
  // ✅ Get Enrolled Courses (GET /enrolled)
  export const getEnrolledCourses = createAsyncThunk(
    "courses/getEnrolledCourses",
    async (_, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.token;
        const response = await axios.get(`${API_URL}/enrolled`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.enrolledCourses;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Error fetching enrolled courses"
        );
      }
    }
  );
  
const courseSlice = createSlice({
    name: "courses",
    initialState: {
        courses: [],
        trainerCourses: [],
        enrolledCourses: [],
        selectedCourse: null,
        lessons: [],
        loading: false,
        enrollmentSuccess: null,
        enrollmentError: null,
        error: null,
    },
    reducers: {
        resetCourseState: (state) => {
            state.selectedCourse = null;
            state.lessons = [];
            state.enrollmentSuccess = null;
            state.enrollmentError = null;
            state.error = null;
        },
    },
    
    extraReducers: (builder) => {
        builder
            // ✅ Fetch All Courses
            .addCase(fetchAllCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Fetch Trainer Courses
            .addCase(fetchTrainerCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrainerCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.trainerCourses = action.payload;
            })
            .addCase(fetchTrainerCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Fetch Course + Lessons
            .addCase(fetchCourseById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCourse = action.payload.course;
                state.lessons = action.payload.lessons;
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Create Course
            .addCase(createCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.trainerCourses.push(action.payload); // ✅ Add to trainer courses
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCourse = action.payload; // ✅ Update selected course
                state.courses = state.courses.map((course) =>
                    course._id === action.payload._id ? action.payload : course
                ); // ✅ Update in the course list
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
             // ✅ Enroll Course
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
        state.enrollmentSuccess = null;
        state.enrollmentError = null;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollmentSuccess = action.payload.message;
        state.enrolledCourses.push(action.payload.enrolledCourses);
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        state.enrollmentError = action.payload;
      })

      // ✅ Get Enrolled Courses
      .addCase(getEnrolledCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload;
      })
      .addCase(getEnrolledCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
            
    },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
