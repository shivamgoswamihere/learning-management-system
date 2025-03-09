import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import Register from "../pages/Register";
import Login from "../pages/Login";

function Navbar() {
  const [modalType, setModalType] = useState(null); // "login" or "register"
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get user state from Redux

  // Functions to toggle modals
  const openLogin = () => setModalType("login");
  const openRegister = () => setModalType("register");
  const closeModal = () => setModalType(null);

  // Logout Handler
  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logout action
  };

  return (
    <>
      <div className="flex flex-row justify-between px-10 py-4 bg-white text-black shadow-xl">
        <Link to="/" className="logo">
          <img
            className="w-20"
            src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
            alt="Logo"
          />
        </Link>
        <div className="searchbar">Search something</div>
        <Link to="/courses"><div>Courses</div></Link>

        {/* Show Profile & Logout if user is logged in */}
        <div className="buttons">
          {user ? (
            <>
              <Link to="/profile" className="btn bg-gray-600 text-white px-4 py-2 rounded-md">
                Profile
              </Link>
              <button
                className="btn ml-5  text-red-500 px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn bg-gray-600 text-white px-4 py-2 rounded-md hover:cursor-pointer"
                onClick={openLogin}
              >
                Login
              </button>
              <button
                className="btn ml-5 bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={openRegister}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <div className="addtoCart">Cart</div>
      </div>

      {/* Smooth Transitions Between Login & Register */}
      {modalType === "login" && <Login isOpen={true} onClose={closeModal} onRegisterClick={openRegister} />}
      {modalType === "register" && <Register isOpen={true} onClose={closeModal} onLoginClick={openLogin} />}
    </>
  );
}

export default Navbar;
