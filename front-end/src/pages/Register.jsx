import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState } from "../redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";

function Register({ isOpen, onClose, onLoginClick }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "learner",
  });

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  // 🔍 Debugging: Log success changes
  useEffect(() => {
    console.log("🔍 Success state:", success);

    if (success) {
      alert("User registered successfully!"); // ✅ Alert user
      setTimeout(() => {
        onClose(); // ✅ Close modal
        dispatch(resetAuthState()); // ✅ Reset auth state
      }, 300); // 🛠 Small delay for smooth transition
    }
  }, [success, dispatch, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Register</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
                &times;
              </button>
            </div>

            {error && <p className="text-red-500">{error.message}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-sm font-medium">Username</label>
                <input type="text" name="username" className="w-full p-2 border rounded-md" 
                  placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Email</label>
                <input type="email" name="email" className="w-full p-2 border rounded-md" 
                  placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Password</label>
                <input type="password" name="password" className="w-full p-2 border rounded-md" 
                  placeholder="Enter password" value={formData.password} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Role</label>
                <select name="role" className="w-full p-2 border rounded-md" value={formData.role} onChange={handleChange}>
                  <option value="learner">Learner</option>
                  <option value="trainer">Trainer</option>
                  <option value="admin">Admin</option>
                  <option value="examinee">Examinee</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <button onClick={onLoginClick} className="text-blue-600 hover:underline">
                Login here
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Register;
