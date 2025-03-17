import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [modalType, setModalType] = useState(null); // "login" or "register"
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get user state from Redux
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Functions to toggle modals
  const openLogin = () => setModalType("login");
  const openRegister = () => setModalType("register");
  const closeModal = () => setModalType(null);

  // Logout Handler
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center px-6 md:px-10 py-4 bg-white text-black shadow-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-40" src="logo.svg" alt="Logo" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Main Navigation (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-lg font-medium">
          <Link to="/courses" className="hover:text-blue-600 transition-all">
            Courses
          </Link>

          {/* Search Bar (Hidden on Mobile) */}
          <input
            type="text"
            placeholder="Search for courses..."
            className="hidden md:block px-4 py-2 w-80 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

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
                    onClick={() => setDropdownOpen(false)}
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

          {/* ✅ Show Cart Icon Only When Logged In */}
          {user && (
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-600 transition" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                3 {/* Replace with dynamic cart count */}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 gap-4 z-20">
          <Link
            to="/courses"
            className="text-lg font-medium hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Courses
          </Link>

          {/* Search Bar (Visible in Mobile) */}
          <input
            type="text"
            placeholder="Search for courses..."
            className="px-4 py-2 w-80 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          {user ? (
            <>
              <Link
                to="/profile"
                className="text-lg font-medium hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                className="text-red-500 font-medium hover:text-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
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

          {/* ✅ Show Cart Only When Logged In */}
          {user && (
            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-lg font-medium"
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-600 transition" />
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                3 {/* Replace with dynamic cart count */}
              </span>
            </Link>
          )}
        </div>
      )}

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
