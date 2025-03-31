import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser } from "../redux/userSlice"; // ✅ Use updateUser for profile picture update
import { Link } from "react-router-dom";
import TrainerCourses from "../components/TrainerCourses";
import { fetchResults } from "../redux/examSlice";
import { getEnrolledCourses } from "../redux/courseSlice";
import TrainerExams from "../components/TrainerExams";
import EnrolledCourses from "../components/EnrolledCourses";
import ExamResults from "../components/ExamResults";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);
  const { enrolledCourses } = useSelector((state) => state.courses);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // ✅ New state for modal

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(getEnrolledCourses());
    dispatch(fetchResults());
  }, [dispatch]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };



  const handleProfileUpdate = async () => {
    if (selectedFile && currentUser) {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);

      try {
        await dispatch(updateUser({ id: currentUser._id, updates: formData })); // ✅ Use updateUser thunk
        setPreview(null); // ✅ Clear preview only after successful update
        setSelectedFile(null);
        setModalOpen(false); // ✅ Close modal after update
      } catch (error) {
        console.error("Profile picture update failed:", error);
      }
    }
  };
  const { results, loading: resultsLoading, error: resultsError } = useSelector(
    (state) => state.exam
  );




  if (loading)
    return <p className="text-center text-lg font-semibold text-gray-600">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!currentUser) return <p className="text-center">No user profile found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg my-5 rounded-lg border border-gray-200">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 border-b pb-6 relative">
        {/* Profile Picture Section */}
        <div className="relative">
          <button onClick={() => setModalOpen(true)} className="focus:outline-none">
            <img
              src={preview || currentUser.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-300 shadow-lg object-cover"
            />
          </button>
          <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
            {currentUser.role.toUpperCase()}
          </span>
        </div>

        {/* User Info */}
        <div className="mt-4 md:mt-0 text-center md:text-left flex-grow">
          <h2 className="text-3xl font-bold text-gray-800">{currentUser.fullName}</h2>
          <p className="text-gray-600 text-lg">@{currentUser.username}</p>
        </div>

        {/* Settings Icon */}
        <Link
          to="/updateUser"
          className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-600 hover:text-gray-800 transition"
        >
          <label className="bg-blue-500 text-white px-4 py-2 cursor-pointer">
            Edit Profile
          </label>
        </Link>
      </div>

      {/* Profile Picture Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 overflow-y-auto">
          <div className="bg-white p-6 mt-20 rounded-lg shadow-lg w-[20%]">
            <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>

            {/* Display the full image */}
            <img
              src={preview || currentUser.profilePicture || "/default-avatar.png"}
              alt="Full Profile"
              className="w-full rounded-lg shadow-lg"
            />

            <div className="mt-4 flex justify-between">
              <label htmlFor="profile-upload" className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
                Update Picture
              </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <button onClick={() => setModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </div>

            {selectedFile && (
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleProfileUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* General Information */}
      <div className="mt-6 grid md:grid-cols-2 gap-6 text-gray-700">
        {currentUser.privacySettings?.showEmail && (
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
        )}
        {currentUser.privacySettings?.showPhone && currentUser.phoneNumber && (
          <p>
            <strong>Phone:</strong> {currentUser.phoneNumber}
          </p>
        )}

        {currentUser.dateOfBirth && (
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(currentUser.dateOfBirth).toLocaleDateString()}
          </p>
        )}
        {currentUser.address?.city && (
          <p>
            <strong>Address:</strong> {currentUser.address.city}, {currentUser.address.state},{" "}
            {currentUser.address.country}
          </p>
        )}

      </div>

      {/* Role-Specific Sections */}
      {currentUser.role === "learner" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg">
          {/* ✅ Learner Details Section */}
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Learner Dashboard</h3>

          <div className="bg-white p-4 rounded-lg shadow-md space-y-3 mb-6">
            {currentUser.qualification && (
              <p className="text-gray-700">
                🎓 <span className="font-semibold">Qualification:</span> {currentUser.qualification} (
                {currentUser.qualificationStatus})
              </p>
            )}
            {currentUser.degree && (
              <p className="text-gray-700">
                🎯 <span className="font-semibold">Degree:</span> {currentUser.degree}
              </p>
            )}
            {currentUser.privacySettings?.showProfession && currentUser.profession && (
              <p className="text-gray-700">
                💼 <span className="font-semibold">Profession:</span> {currentUser.profession}
              </p>
            )}
            {currentUser.organization?.name && (
              <p className="text-gray-700">
                🏢 <span className="font-semibold">Organization:</span> {currentUser.organization.name}
              </p>
            )}
            {currentUser.interests && (
              <p className="text-gray-700">
                🎨 <span className="font-semibold">Interests:</span> {currentUser.interests}
              </p>
            )}
          </div>

          {/* ✅ Enrolled Courses Section */}
          {/* ✅ Use the new component */}
          {currentUser.role === "learner" && enrolledCourses.length > 0 && (
            <EnrolledCourses enrolledCourses={enrolledCourses} />
          )}

        </div>
      )}

      {(currentUser?.role === "examinee" || currentUser?.role === "learner") && results?.length > 0 && (
        <ExamResults results={results} />
      )}



      {currentUser.role === "trainer" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-800 mb-4">Trainer Dashboard</h3>
          {currentUser.socialLinks.linkedIn && (
            <p>
              <strong>Linkedin:</strong> {currentUser.socialLinks.linkedIn}

            </p>
          )}
          {currentUser.socialLinks.github && (
            <p>
              <strong>Github:</strong> {currentUser.socialLinks.github}

            </p>
          )}

          <div className="bg-white p-4 rounded-lg shadow-md space-y-3 mb-6">
            {currentUser.professionalTitle && (
              <p className="text-gray-700">
                <span className="font-semibold">🎓 Professional Title:</span> {currentUser.professionalTitle}
              </p>
            )}
            {currentUser.totalExperience && (
              <p className="text-gray-700">
                <span className="font-semibold">💼 Total Experience:</span> {currentUser.totalExperience} years
              </p>
            )}
            {currentUser.careerDescription && (
              <p className="text-gray-700">
                <span className="font-semibold">📝 Career Description:</span> {currentUser.careerDescription}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/courseForm">
              <button className="flex items-center justify-center px-5 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900 transition">
                ➕ Add Course
              </button>
            </Link>
            <Link to="/create-exam">
              <button className="flex items-center justify-center px-5 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900 transition">
                📝 Add Exam
              </button>
            </Link>
            <Link to="/trainer-courses">
              <button className="flex items-center justify-center px-5 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900 transition">
                📚 My Courses
              </button>
            </Link>
            <Link to="/trainer-exams">
              <button className="flex items-center justify-center px-5 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900 transition">
                📊 View Created Exams
              </button>
            </Link>
          </div>
        </div>
      )}




      {currentUser.role === "admin" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-red-700">Admin Details</h3>
          {currentUser.accessLevel && (
            <p>
              <strong>Access Level:</strong> {currentUser.accessLevel}
            </p>
          )}
          <div className="mt-4">
            <Link
              to="/admin/dash"
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>

      )}
    </div>
  );
};

export default Profile;
