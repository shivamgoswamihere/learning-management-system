import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";

function Navbar() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Functions to open and close modals
  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  return (
    <>
      <div className="flex flex-row justify-between px-10 py-4 bg-white text-black shadow-xl">
        <div className="logo">
          <img
            className="w-20"
            src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
            alt="Logo"
          />
        </div>
        <div className="searchbar">Search something</div>
        <div>Courses</div>
        <div className="buttons">
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
        </div>
        <div className="addtoCart">Cart</div>
      </div>

      {/* Login & Register Modals */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onRegisterClick={openRegister} />
      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onLoginClick={openLogin} />
    </>
  );
}

export default Navbar;
