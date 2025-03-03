import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState } from "../redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";

function Register({ isOpen, onClose, onLoginClick }) {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState(null);
  const [step, setStep] = useState(1); 

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "learner", // Default role
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    qualification: "",
    degree: "",
    qualificationStatus: "",
    profession: "",
    organization: "",
    interests: "",
    professionalTitle: "",
    totalExperience: "",
    socialLinks: {
      linkedIn: "",
      github: "",
      youtube: "",
      twitter: "",
    },
    careerDescription: "",
    accessLevel: "",
    canEnrollCourses: false,
    profilePicture: typeof profilePicture === "string" ? profilePicture : "",  });

  useEffect(() => {
    if (success) {
      alert("User registered successfully!");
      setTimeout(() => {
        onClose();
        dispatch(resetAuthState());
      }, 300);
    }
  }, [success, dispatch, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("socialLinks")) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name.split(".")[1]]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
         <motion.div
          className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto"
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
            {step === 1 && (
             <>
            <div className="mb-3">
                <label className="block text-sm font-medium">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md"
                />
                {imagePreview && <img src={imagePreview} alt="Profile Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />}
              </div>
              {/* Full Name */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Username */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="button" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700" onClick={() => setStep(2)}>
                     Next
                  </button>
</>
            )}
            {step === 2 && (
              <>
              {/* Role Selection */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Role</label>
                <select
                  name="role"
                  className="w-full p-2 border rounded-md"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="learner">Learner</option>
                  <option value="trainer">Trainer</option>
                  <option value="admin">Admin</option>
                  <option value="examinee">Examinee</option>
                </select>
              </div>

              {/* Role-Specific Fields */}
              {formData.role === "learner" && (
                <>
                  <div className="mb-3">
                    <label className="block text-sm font-medium">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your degree"
                      value={formData.degree}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {formData.role === "trainer" && (
                <>
                  <div className="mb-3">
                    <label className="block text-sm font-medium">Professional Title</label>
                    <input
                      type="text"
                      name="professionalTitle"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your title"
                      value={formData.professionalTitle}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {formData.role === "admin" && (
                <div className="mb-3">
                  <label className="block text-sm font-medium">Access Level</label>
                  <select
                    name="accessLevel"
                    className="w-full p-2 border rounded-md"
                    value={formData.accessLevel}
                    onChange={handleChange}
                  >
                    <option value="Full Admin">Full Admin</option>
                    <option value="Content Manager">Content Manager</option>
                    <option value="Finance Manager">Finance Manager</option>
                  </select>
                </div>
              )}

              {formData.role === "examinee" && (
                <div className="mb-3">
                  <label className="block text-sm font-medium">Can Enroll Courses</label>
                  <input
                    type="checkbox"
                    name="canEnrollCourses"
                    checked={formData.canEnrollCourses}
                    onChange={(e) =>
                      setFormData({ ...formData, canEnrollCourses: e.target.checked })
                    }
                  />
                </div>
              )}
              <div className="flex justify-between">
                     <button type="button" className="bg-gray-600 text-white p-2 rounded-md" onClick={() => setStep(1)}>
                       Back
                     </button>
                     <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                       {loading ? "Registering..." : "Register"}
                    </button>
                  </div>
                </>
              )}

            
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

