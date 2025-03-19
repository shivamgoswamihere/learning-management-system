import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser } from "../redux/userSlice"; // ✅ Use updateUser for profile picture update
import { Link } from "react-router-dom";
import TrainerCourses from "../components/TrainerCourses";
import set from "../assets/settings.svg";
import { getEnrolledCourses } from "../redux/courseSlice";

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

  if (loading)
    return <p className="text-center text-lg font-semibold text-gray-600">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!currentUser) return <p className="text-center">No user profile found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg mt-5 rounded-lg border border-gray-200">
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
          <img src={set} className="h-6 w-6 md:h-7 md:w-7" />
        </Link>
      </div>

      {/* Profile Picture Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
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
        <p><strong>Email:</strong> {currentUser.privacySettings?.showEmail ? currentUser.email : "Hidden"}</p>
        <p><strong>Phone:</strong> {currentUser.privacySettings?.showPhone ? currentUser.phoneNumber || "N/A" : "Hidden"}</p>
        <p><strong>Gender:</strong> {currentUser.gender || "Not specified"}</p>
        <p><strong>Date of Birth:</strong> {currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toLocaleDateString() : "Not provided"}</p>
        <p><strong>Address:</strong> {currentUser.address?.city}, {currentUser.address?.state}, {currentUser.address?.country}</p>
      </div>

      {/* Role-Specific Sections */}
      {currentUser.role === "learner" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-700">Learner Details</h3>
          <p><strong>Qualification:</strong> {currentUser.qualification} ({currentUser.qualificationStatus})</p>
          <p><strong>Degree:</strong> {currentUser.degree}</p>
          <p><strong>Profession:</strong> {currentUser.privacySettings?.showProfession ? currentUser.profession || "N/A" : "Hidden"}</p>
          {currentUser.organization?.name && <p><strong>Organization:</strong> {currentUser.organization.name}</p>}
          <p><strong>Interests:</strong> {currentUser.interests || "Not provided"}</p>
          <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">My Enrolled Courses</h3>
        
        {loading && <p className="text-blue-500">Loading courses...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        
        {enrolledCourses?.length === 0 && !loading && (
          <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
        )}

        <ul className="space-y-4">
          {enrolledCourses?.map((course) => (
            <li key={course._id} className="p-4 bg-gray-100 rounded-md shadow">
              <h4 className="text-lg font-semibold">{course.title}</h4>
              <p className="text-gray-600">{course.description}</p>
              <p className="text-sm text-green-500">Enrolled on: {new Date(course.enrolledDate).toLocaleDateString()}</p>
              <p className="text-sm text-red-500"><Link to={`/CourseDetails/${course._id}`}>Go to Course</Link></p>
            

            </li>
            
          ))}
        </ul>
      </div>
        </div>
      )}

      {currentUser.role === "trainer" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-yellow-700">Trainer Details</h3>
          <p><strong>Professional Title:</strong> {currentUser.professionalTitle || "Not provided"}</p>
          <p><strong>Total Experience:</strong> {currentUser.totalExperience} years</p>
          <p><strong>Career Description:</strong> {currentUser.careerDescription || "Not provided"}</p>
          <Link to="/courseForm">
            <button className="mt-4 px-5 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-900">
              Add Course
            </button>
          </Link>
          <Link to="/create-exam">
            <button className="mt-4 px-5 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-900">
              Add Exam
            </button>
          </Link>
          <TrainerCourses />
        </div>
      )}

      {currentUser.role === "examinee" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-green-700">Examinee Details</h3>
          <p><strong>Can Enroll in Courses:</strong> {currentUser.canEnrollCourses ? "Yes" : "No"}</p>
        </div>
      )}

      {currentUser.role === "admin" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-red-700">Admin Details</h3>
          <p><strong>Access Level:</strong> {currentUser.accessLevel || "Not specified"}</p>
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
