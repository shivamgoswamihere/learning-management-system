import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourses = createAsyncThunk("courses/fetch", async () => {
    const response = await axios.get("/api/courses");
    return response.data;
});

const courseSlice = createSlice({
    name: "courses",
    initialState: { courses: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => { state.loading = true; })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.courses = action.payload;
                state.loading = false;
            })
            .addCase(fetchCourses.rejected, (state) => { state.loading = false; });
    },
});

export default courseSlice.reducer;
