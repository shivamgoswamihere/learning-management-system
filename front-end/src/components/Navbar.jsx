import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex flex-row justify-between px-10 py-4 bg-white text-black shadow-xl ">
      <div className="logo ">
        <img className="w-20" src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg" />
      </div>
      <div className="searchbar">Search something</div>
      <div>Courses</div>
      <div className="buttons">
        <button className="btn">Login</button>
        <button className="btn">Sign Up</button>
      </div>
      <div className="addtoCart">Cart</div>
    </div>
  );
}

export default Navbar;
