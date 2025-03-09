import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [modalType, setModalType] = useState(null); // "login" or "register"
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get user state from Redux
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Functions to toggle modals
  const openLogin = () => setModalType("login");
  const openRegister = () => setModalType("register");
  const closeModal = () => setModalType(null);

  // Logout Handler
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center px-10 py-4 bg-white text-black shadow-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-24"
            src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
            alt="Logo"
          />
        </Link>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for courses..."
          className="px-4 py-2 w-96 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-lg font-medium">
          <Link to="/courses" className="hover:text-blue-600 transition-all">
            Courses
          </Link>

          {/* Profile & Logout */}
          {user ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle className="text-2xl" />
                {user.name}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 z-10 bg-white shadow-lg rounded-md">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={openLogin}
              >
                Login
              </button>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                onClick={openRegister}
              >
                Sign Up
              </button>
            </>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-600 transition" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              3 {/* Replace with dynamic cart count */}
            </span>
          </Link>
        </div>
      </div>

      {/* Login & Register Modals */}
      {modalType === "login" && (
        <Login isOpen={true} onClose={closeModal} onRegisterClick={openRegister} />
      )}
      {modalType === "register" && (
        <Register isOpen={true} onClose={closeModal} onLoginClick={openLogin} />
      )}
    </>
  );
}

export default Navbar;
 