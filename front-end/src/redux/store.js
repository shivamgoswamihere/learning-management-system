import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice"; 
import courseReducer from "./courseSlice"; // Correct path

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    courses: courseReducer,
  },
});

export default store;
