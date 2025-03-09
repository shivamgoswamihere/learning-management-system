import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchCurrentUser()); // ✅ Fetch the logged-in user
  }, [dispatch]);

  if (loading) return <p className="text-center text-lg">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!currentUser) return <p className="text-center">No user profile found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-6 border-b pb-4">
        {/* Profile Picture */}
        <img
          src={currentUser.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />

        <div>
          <h2 className="text-2xl font-bold">{currentUser.fullName}</h2>
          <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
            {currentUser.role.toUpperCase()}
          </span>
          <p className="text-gray-600">@{currentUser.username}</p>
        </div>
      </div>

      {/* Common User Details */}
      <div className="mt-4 space-y-2">
        <p><strong>Email:</strong> {currentUser.privacySettings?.showEmail ? currentUser.email : "Hidden"}</p>
        <p><strong>Phone:</strong> {currentUser.privacySettings?.showPhone ? currentUser.phoneNumber || "N/A" : "Hidden"}</p>
        <p><strong>Gender:</strong> {currentUser.gender || "Not specified"}</p>
        <p><strong>Date of Birth:</strong> {currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toLocaleDateString() : "Not provided"}</p>
        <p><strong>Address:</strong> {currentUser.address?.city}, {currentUser.address?.state}, {currentUser.address?.country}</p>
      </div>

      {/* Role-Specific Sections */}
      {currentUser.role === "learner" && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Learner Details</h3>
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
        <div className="mt-6 bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Trainer Details</h3>
          <Link to="/courseForm"><button className="bg-black text-white">Add Course</button></Link>
          <p><strong>Professional Title:</strong> {currentUser.professionalTitle || "Not provided"}</p>
          <p><strong>Total Experience:</strong> {currentUser.totalExperience} years</p>
          <p><strong>Career Description:</strong> {currentUser.careerDescription || "Not provided"}</p>
          <h4 className="font-semibold mt-2">Social Links:</h4>
          <div className="flex space-x-4">
            {currentUser.socialLinks?.linkedIn && <a href={currentUser.socialLinks.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600">LinkedIn</a>}
            {currentUser.socialLinks?.github && <a href={currentUser.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800">GitHub</a>}
            {currentUser.socialLinks?.youtube && <a href={currentUser.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-500">YouTube</a>}
            {currentUser.socialLinks?.twitter && <a href={currentUser.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">Twitter</a>}
          </div>
        </div>
      )}

      {currentUser.role === "examinee" && (
        <div className="mt-6 bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Examinee Details</h3>
          <p><strong>Can Enroll in Courses:</strong> {currentUser.canEnrollCourses ? "Yes" : "No"}</p>
        </div>
      )}

      {currentUser.role === "admin" && (
        <div className="mt-6 bg-red-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Admin Details</h3>
          <p><strong>Access Level:</strong> {currentUser.accessLevel || "Not specified"}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
