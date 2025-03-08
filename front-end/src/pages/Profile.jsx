import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchCurrentUser()); // Fetch the logged-in user
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!currentUser) return <p>No user profile found.</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="border p-4 rounded-md">
        <p><strong>ID:</strong> {currentUser._id}</p>
        <p><strong>Name:</strong> {currentUser.username}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Role:</strong> {currentUser.role}</p>
      </div>
    </div>
  );
};

export default Profile;
