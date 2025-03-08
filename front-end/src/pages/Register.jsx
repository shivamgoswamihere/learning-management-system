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
    profilePicture: "",
  });

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
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_preset"); 
   
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/drhk6uycr/image/upload", {
          method: "POST",
          body: formData,
        });
  
        const data = await res.json();
        setFormData((prev) => ({ ...prev, profilePicture: data.secure_url })); // Cloudinary image URL
        setImagePreview(data.secure_url);
      } catch (error) {
        console.error("Image upload error:", error);
      }
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
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
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>

            {error && <p className="text-red-500">{error.message}</p>}

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className="mb-3">
                    <label className="block text-sm font-medium">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded-md"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="mt-2 w-24 h-24 rounded-full object-cover"
                      />
                    )}
                  </div>

                  {/* Full Name */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium">
                      Full Name
                    </label>
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
                    <label className="block text-sm font-medium">
                      Username
                    </label>
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
                    <label className="block text-sm font-medium">
                      Password
                    </label>
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

                  <button
                    type="button"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    onClick={() => setStep(2)}
                  >
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
                        <label className="block text-sm font-medium">
                          Qualification
                        </label>
                        <select
                          name="qualification"
                          className="w-full p-2 border rounded-md"
                          value={formData.qualification}
                          onChange={handleChange}
                        >
                          <option value="">Select Qualification</option>
                          <option value="High School">High School</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Bachelor's Degree">
                            Bachelor's Degree
                          </option>
                          <option value="Master's Degree">
                            Master's Degree
                          </option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm font-medium">
                          Degree
                        </label>
                        <select
                          name="degree"
                          className="w-full p-2 border rounded-md"
                          value={formData.degree}
                          onChange={handleChange}
                        >
                          <option value="">Select Degree</option>
                          <option value="B.Tech">B.Tech</option>
                          <option value="B.Sc">B.Sc</option>
                          <option value="B.A">B.A</option>
                          <option value="M.Tech">M.Tech</option>
                          <option value="M.Sc">M.Sc</option>
                          <option value="M.A">M.A</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      {/* <div className="mb-3">
                    <label className="block text-sm font-medium">
                      Qualification Status
                    </label>
                    <input
                      type="text"
                      name="qualificationStatus"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your qualification status"
                      value={formData.qualificationStatus}
                      onChange={handleChange}
                    />
                  </div> */}

                  {/* Profession */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium">
                      Profession
                    </label>
                    <input
                      type="text"
                      name="profession"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your profession"
                      value={formData.profession}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Organization */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your organization"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Interests */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium">
                      Interests
                    </label>
                    <input
                      type="text"
                      name="interests"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your interests"
                      value={formData.interests}
                      onChange={handleChange}
                    />
                  </div>
                    </>
                  )}

                  {formData.role === "trainer" && (
                    <>
                      <div className="mb-3">
                        <label className="block text-sm font-medium">
                          Professional Title
                        </label>
                        <input
                          type="text"
                          name="professionalTitle"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your title"
                          value={formData.professionalTitle}
                          onChange={handleChange}
                        />
                      </div>
                       {/* Total Experience */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium">
                      Total Experience (in years)
                    </label>
                    <input
                      type="number"
                      name="totalExperience"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your total experience"
                      value={formData.totalExperience}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Social Links */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="socialLinks.linkedIn"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter LinkedIn URL"
                      value={formData.socialLinks.linkedIn}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium">GitHub</label>
                    <input
                      type="url"
                      name="socialLinks.github"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter GitHub URL"
                      value={formData.socialLinks.github}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium">YouTube</label>
                    <input
                      type="url"
                      name="socialLinks.youtube"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter YouTube URL"
                      value={formData.socialLinks.youtube}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium">Twitter</label>
                    <input
                      type="url"
                      name="socialLinks.twitter"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter Twitter URL"
                      value={formData.socialLinks.twitter}
                      onChange={handleChange}
                    />
                  </div>
                    </>
                  )}

                  {formData.role === "admin" && (
                    <div className="mb-3">
                      <label className="block text-sm font-medium">
                        Access Level
                      </label>
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
                      <label className="block text-sm font-medium">
                        Can Enroll Courses
                      </label>
                      <input
                        type="checkbox"
                        name="canEnrollCourses"
                        checked={formData.canEnrollCourses}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            canEnrollCourses: e.target.checked,
                          })
                        }
                      />
                    </div>
                  )}
                  

                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="bg-gray-600 text-white p-2 rounded-md"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                    type="button"
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    onClick={() => setStep(3)}
                  >
                    Next
                  </button>
                   
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                 {/* Phone Number */}
                 <div className="mb-3">
                    <label className="block text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Gender */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium">Gender</label>
                    <select
                      name="gender"
                      className="w-full p-2 border rounded-md"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="w-full p-2 border rounded-md"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-between">
                  <button
                      type="button"
                      className="bg-gray-600 text-white p-2 rounded-md"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </button>
                  <button
                      type="submit"
                      className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
                    </div>
                </>
              )}

            </form>

            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <button
                onClick={onLoginClick}
                className="text-blue-600 hover:underline"
              >
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
