import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Base API URL
const API_URL = "http://localhost:5000/api/users";

// ✅ Thunk: Fetch all users (Admin only)
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) return rejectWithValue("No authentication token found.");

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users.");
    }
  }
);

// ✅ Thunk: Fetch user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (_id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) return rejectWithValue("No authentication token found.");

      const response = await axios.get(`${API_URL}/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user.");
    }
  }
);

// ✅ Thunk: Fetch current logged-in user
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) return rejectWithValue("No authentication token found.");

      const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch current user.");
    }
  }
);

// ✅ Thunk: Update user profile (Partial Update)
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) return rejectWithValue("No authentication token found.");

      const response = await axios.patch(`${API_URL}/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": updates instanceof FormData ? "multipart/form-data" : "application/json",
        },
      });

      const updatedUser = response.data.user;
      Cookies.set("user", JSON.stringify(updatedUser)); // ✅ Update stored user in cookies

      return updatedUser; // ✅ Return updated user data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user.");
    }
  }
);

// ✅ Thunk: Update profile picture
export const updateProfilePicture = createAsyncThunk(
  "users/updateProfilePicture",
  async ({ id, file }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) return rejectWithValue("No authentication token found.");

      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axios.patch(`${API_URL}/${id}/profile-picture`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = response.data.user;
      Cookies.set("user", JSON.stringify(updatedUser)); // ✅ Update stored user in cookies

      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile picture.");
    }
  }
);

// ✅ Redux Slice
const storedUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
const storedToken = Cookies.get("token") || null;

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: null,
    currentUser: storedUser, // ✅ Use stored user from cookies
    token: storedToken, // ✅ Use stored token from cookies
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update user profile
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload; // ✅ Update current user
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update profile picture
      .addCase(updateProfilePicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload; // ✅ Update current user
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
