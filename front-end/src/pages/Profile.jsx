import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import TrainerCourses from "../components/TrainerCourses";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-lg font-semibold text-gray-600">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!currentUser) return <p className="text-center">No user profile found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg mt-5 rounded-lg border border-gray-200">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 border-b pb-6">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={currentUser.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-300 shadow-lg"
          />
          <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
            {currentUser.role.toUpperCase()}
          </span>
        </div>

        {/* User Info */}
        <div className="mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{currentUser.fullName}</h2>
          <p className="text-gray-600 text-lg">@{currentUser.username}</p>
        </div>
      </div>

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
          {currentUser.organization?.name && (
            <p><strong>Organization:</strong> {currentUser.organization.name}</p>
          )}
          <p><strong>Interests:</strong> {currentUser.interests || "Not provided"}</p>
        </div>
      )}

      {currentUser.role === "trainer" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-yellow-700">Trainer Details</h3>
          <p><strong>Professional Title:</strong> {currentUser.professionalTitle || "Not provided"}</p>
          <p><strong>Total Experience:</strong> {currentUser.totalExperience} years</p>
          <p><strong>Career Description:</strong> {currentUser.careerDescription || "Not provided"}</p>

          <h4 className="font-semibold mt-3">Social Links:</h4>
          <div className="flex space-x-4">
            {currentUser.socialLinks?.linkedIn && <a href={currentUser.socialLinks.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
            {currentUser.socialLinks?.github && <a href={currentUser.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">GitHub</a>}
            {currentUser.socialLinks?.youtube && <a href={currentUser.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">YouTube</a>}
            {currentUser.socialLinks?.twitter && <a href={currentUser.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>}
          </div>
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
        </div>
      )}
    </div>
  );
};

export default Profile;
