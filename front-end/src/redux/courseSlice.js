import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

// ✅ Fetch All Approved Courses (Public)
export const fetchAllCourses = createAsyncThunk(
    "courses/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/all-approved`);
            return response.data.courses;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
        }
    }
);

// ✅ Fetch Pending Courses (Admin Only)
export const getPendingCourses = createAsyncThunk(
    "courses/getPending",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.get(`${API_URL}/pending`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.courses;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch pending courses");
        }
    }
);

// ✅ Fetch Trainer's Courses (Trainer/Admin)
export const fetchTrainerCourses = createAsyncThunk(
    "courses/fetchTrainer",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.get(`${API_URL}/trainer`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.courses;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch trainer courses");
        }
    }
);

// ✅ Fetch Single Course (Requires Valid ID)
export const fetchCourseById = createAsyncThunk(
    "courses/fetchById",
    async (courseId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.get(`${API_URL}/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch course");
        }
    }
);

// ✅ Create Course (Trainer Only)
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

// ✅ Approve or Reject Course (Admin Only)
export const updateCourseApproval = createAsyncThunk(
    "courses/updateApproval",
    async ({ courseId, status, rejectionReason }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.put(
                `${API_URL}/approval/${courseId}`,
                { status, rejectionReason },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data.course;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update course approval");
        }
    }
);

// ✅ Enroll in Course (All Users)
export const enrollCourse = createAsyncThunk(
    "courses/enrollCourse",
    async (courseId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.post(
                `${API_URL}/enroll/${courseId}`,
                null,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error enrolling in course");
        }
    }
);

// ✅ Get Enrolled Courses (All Users)
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
            return rejectWithValue(error.response?.data?.message || "Error fetching enrolled courses");
        }
    }
);

// ✅ Update Course (Trainer/Admin)
export const updateCourse = createAsyncThunk(
    "courses/update",
    async ({ courseId, updatedData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.put(`${API_URL}/${courseId}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.course;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update course");
        }
    }
);

// ✅ Delete Course (Trainer/Admin)
export const deleteCourse = createAsyncThunk(
    "courses/delete",
    async (courseId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            await axios.delete(`${API_URL}/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return courseId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete course");
        }
    }
);

const courseSlice = createSlice({
    name: "courses",
    initialState: {
        courses: [],
        trainerCourses: [],
        enrolledCourses: [],
        pendingCourses: [],
        selectedCourse: null,
        loading: false,
        enrollmentSuccess: null,
        enrollmentError: null,
        error: null,
    },
    reducers: {
        resetCourseState: (state) => {
            state.selectedCourse = null;
            state.enrollmentSuccess = null;
            state.enrollmentError = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCourses.pending, (state) => { state.loading = true; })
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getPendingCourses.fulfilled, (state, action) => {
                state.pendingCourses = action.payload;
            })
            .addCase(fetchTrainerCourses.fulfilled, (state, action) => {
                state.trainerCourses = action.payload;
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.selectedCourse = action.payload.course;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.trainerCourses.push(action.payload);
            })
            .addCase(updateCourseApproval.fulfilled, (state, action) => {
                state.courses = state.courses.map(course =>
                    course._id === action.payload._id ? action.payload : course
                );
            })
            .addCase(enrollCourse.fulfilled, (state, action) => {
                state.enrolledCourses.push(action.payload.enrolledCourses);
            })
            .addCase(getEnrolledCourses.fulfilled, (state, action) => {
                state.enrolledCourses = action.payload;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.trainerCourses = state.trainerCourses.filter(course => course._id !== action.payload);
            });
    },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
