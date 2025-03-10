// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/courses";

// // ✅ Fetch All Courses (Public)
// export const fetchAllCourses = createAsyncThunk("courses/fetchAll", async (_, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`${API_URL}/all-courses`);
//         return response.data.courses; // Extracting the courses array
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
//     }
// });

// // ✅ Fetch Single Course (Authenticated Users)
// export const fetchCourseById = createAsyncThunk("courses/fetchById", async (courseId, { rejectWithValue, getState }) => {
//     try {
//         const token = getState().auth.token; // Get token from Redux state
//         const config = {
//             headers: { Authorization: `Bearer ${token}` }
//         };
//         const response = await axios.get(`${API_URL}/${courseId}`, config);

//         console.log("Fetched course:", response.data); // ✅ Debugging

//         return response.data.course; // Ensure returning `course` field
//     } catch (error) {
//         console.error("Fetch error:", error.response?.data); // ✅ Debugging
//         return rejectWithValue(error.response?.data?.message || "Failed to fetch course");
//     }
// });

// // ✅ Create Course (Trainer Only)
// export const createCourse = createAsyncThunk("courses/create", async (courseData, { rejectWithValue, getState }) => {
//     try {
//         const token = getState().auth.token; // Get token from Redux state
//         const config = {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 Authorization: `Bearer ${token}`, // ✅ Attach token
//             },
//         };
//         const response = await axios.post(`${API_URL}/create-course`, courseData, config);
//         return response.data.course;
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to create course");
//     }
// });

// // ✅ Redux Slice
// const courseSlice = createSlice({
//     name: "courses",
//     initialState: { 
//         courses: [], 
//         selectedCourse: null,
//         loading: false, 
//         error: null, 
//         success: false 
//     },
//     reducers: {
//         resetCourseState: (state) => {
//             state.success = false;
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // ✅ Fetch All Courses
//             .addCase(fetchAllCourses.pending, (state) => { state.loading = true; })
//             .addCase(fetchAllCourses.fulfilled, (state, action) => {
//                 state.courses = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchAllCourses.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // ✅ Fetch Single Course
//             .addCase(fetchCourseById.pending, (state) => { state.loading = true; })
//             .addCase(fetchCourseById.fulfilled, (state, action) => {
//                 state.selectedCourse = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchCourseById.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // ✅ Create Course
//             .addCase(createCourse.pending, (state) => { state.loading = true; })
//             .addCase(createCourse.fulfilled, (state, action) => {
//                 state.courses.push(action.payload);
//                 state.loading = false;
//                 state.success = true;
//             })
//             .addCase(createCourse.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { resetCourseState } = courseSlice.actions;
// export default courseSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/courses";

// // ✅ Fetch All Courses (Public)
// export const fetchAllCourses = createAsyncThunk("courses/fetchAll", async (_, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`${API_URL}/all-courses`);
//         return response.data.courses; // Extracting the courses array
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
//     }
// });

// // ✅ Fetch Single Course (Include Lessons)
// export const fetchCourseById = createAsyncThunk("courses/fetchById", async (courseId, { rejectWithValue, getState }) => {
//     try {
//         const token = getState().auth.token; 
//         const config = {
//             headers: { Authorization: `Bearer ${token}` }
//         };
//         const response = await axios.get(`${API_URL}/${courseId}`, config);

//         console.log("Fetched course:", response.data); // ✅ Debugging

//         return response.data.course; // Ensure returning `course` with lessons
//     } catch (error) {
//         console.error("Fetch error:", error.response?.data); // ✅ Debugging
//         return rejectWithValue(error.response?.data?.message || "Failed to fetch course");
//     }
// });

// // ✅ Create Course (Now Includes Lessons)
// export const createCourse = createAsyncThunk("courses/create", async (courseData, { rejectWithValue, getState }) => {
//     try {
//         const token = getState().auth.token; 
//         const config = {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         console.log("Submitting course data:", courseData); // ✅ Debugging

//         const response = await axios.post(`${API_URL}/create-course`, courseData, config);
//         return response.data.course;
//     } catch (error) {
//         console.error("Create course error:", error.response?.data); // ✅ Debugging
//         return rejectWithValue(error.response?.data?.message || "Failed to create course");
//     }
// });

// // ✅ Redux Slice
// const courseSlice = createSlice({
//     name: "courses",
//     initialState: { 
//         courses: [], 
//         selectedCourse: null,
//         loading: false, 
//         error: null, 
//         success: false 
//     },
//     reducers: {
//         resetCourseState: (state) => {
//             state.success = false;
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // ✅ Fetch All Courses
//             .addCase(fetchAllCourses.pending, (state) => { state.loading = true; })
//             .addCase(fetchAllCourses.fulfilled, (state, action) => {
//                 state.courses = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchAllCourses.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // ✅ Fetch Single Course (Includes Lessons)
//             .addCase(fetchCourseById.pending, (state) => { state.loading = true; })
//             .addCase(fetchCourseById.fulfilled, (state, action) => {
//                 state.selectedCourse = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchCourseById.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // ✅ Create Course (Includes Lessons)
//             .addCase(createCourse.pending, (state) => { state.loading = true; })
//             .addCase(createCourse.fulfilled, (state, action) => {
//                 state.courses.push(action.payload);
//                 state.loading = false;
//                 state.success = true;
//             })
//             .addCase(createCourse.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { resetCourseState } = courseSlice.actions;
// export default courseSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

// ✅ Fetch All Courses (Public)
export const fetchAllCourses = createAsyncThunk("courses/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/all-courses`);
        return response.data.courses;
    } catch (error) {
        console.error("Error fetching courses:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
    }
});

// ✅ Fetch Single Course (Include Lessons)
export const fetchCourseById = createAsyncThunk("courses/fetchById", async (courseId, { rejectWithValue, getState }) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(`${API_URL}/${courseId}`, config);
        return response.data.course;
    } catch (error) {
        console.error("Error fetching course by ID:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch course");
    }
});

// ✅ Create Course (Includes Lessons)
export const createCourse = createAsyncThunk("courses/create", async (courseData, { rejectWithValue, getState }) => {
    try {
        const token = getState().auth.token; 
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post(`${API_URL}/create-course`, courseData, config);
        return response.data.course;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to create course");
    }
});


// ✅ Redux Slice
const courseSlice = createSlice({
    name: "courses",
    initialState: {
        courses: [],
        selectedCourse: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetCourseState: (state) => {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Fetch All Courses
            .addCase(fetchAllCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.courses = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Fetch Single Course
            .addCase(fetchCourseById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.selectedCourse = action.payload;
                state.loading = false;
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
                state.courses.push(action.payload);
                state.loading = false;
                state.success = true;
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
