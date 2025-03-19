import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Adjust for better UI

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, users]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 flex items-center text-gray-700 hover:text-gray-900"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">All Users</h2>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search users by name or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-md w-full max-w-md"
        />
      </div>

      {loading && <p className="text-center text-gray-600">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && currentUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUsers.map((user) => (
            <div 
              key={user._id} 
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              {/* Profile Picture */}
              <img 
                src={user.profilePicture || "/default-avatar.png"} 
                alt={user.fullName} 
                className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
              />

              {/* User Info */}
              <h3 className="text-lg font-semibold mt-3">{user.fullName || "N/A"}</h3>
              <p className="text-gray-600 capitalize">{user.role}</p>

              {/* View Details Button */}
              <button
                onClick={() => navigate(`/users/${user._id}`)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No users found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition disabled:bg-gray-400"
        >
          Previous
        </button>
        
        <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
        
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
