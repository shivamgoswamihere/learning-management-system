import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_URL = "http://localhost:5000/api/auth";

// ✅ Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      const { token, user } = response.data;
      // ✅ Store token and user details securely
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id); // Store user ID for quick access
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token"); // Clear token on logout
  return null; // Returning null will reset the user state
});

// Auth Slice
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAuthState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Persist user
        localStorage.setItem("token", action.payload.token); // ✅ Persist token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // ✅ Store user
        localStorage.setItem("token", action.payload.token); // ✅ Store token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.success = false;
        localStorage.removeItem("user"); // ✅ Clear on logout
        localStorage.removeItem("token"); // ✅ Clear on logout
      });
  },
});



export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
