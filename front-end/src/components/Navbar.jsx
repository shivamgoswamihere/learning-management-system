import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import devdojo from "../assets/DevDojo.png";
// import { fetchCurrentUser } from "../redux/userSlice";

function Navbar() {
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search state
    const { currentUser, loading, error } = useSelector((state) => state.users);

    // useEffect(() => {
    //     dispatch(fetchCurrentUser());
    //   }, [dispatch]);

  const openLogin = () => setModalType("login");
  const openRegister = () => setModalType("register");
  const closeModal = () => setModalType(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/courses?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear input after search
      setMenuOpen(false); // Close menu on mobile
    }
  };
  
  // if (loading)
  //   return <p className="text-center text-lg font-semibold text-gray-600">Loading profile...</p>;
  // if (error) return <p className="text-red-500 text-center">{error}</p>;
  // if (!currentUser) return <p className="text-center">No user profile found.</p>;

  return (
    <>
      <div className="fixed w-full z-10 flex justify-between items-center px-6 md:px-10 py-1 bg-white text-black shadow-lg">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-20" src={devdojo} alt="Logo" />
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Main Navigation (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-md">
          <Link to="/courses" className="hover:text-blue-600 transition-all">Courses</Link>

          {user && (
            <Link to="/exams" className="hover:text-blue-600 transition-all">
              Exams
            </Link>
          )}

          {/* ✅ Search Bar */}
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch} // 🔍 Trigger search on Enter key
            className="hidden md:block px-2 py-1 w-80 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          {user ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md text-gray hover:bg-gray-200 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
             
            {/* <img
              src={currentUser.profilePicture || "/default-avatar.png"}
              alt="Full Profile"
              className="w-6 h-6 rounded-full object-fitg"
            /> */}
                {user.name}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 z-10 bg-white shadow-lg rounded-md">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                    Profile
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={openLogin}>
                Login
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition" onClick={openRegister}>
                Sign Up
              </button>
            </>
          )}

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
          <Link to="/courses" className="text-lg font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>
            Courses
          </Link>

          {user && (
            <Link to="/exams" className="text-lg font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>
              Exams
            </Link>
          )}

          {/* ✅ Mobile Search Bar */}
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="px-4 py-2 w-80 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          {user ? (
            <>
              <Link to="/profile" className="text-lg font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button className="text-red-500 font-medium hover:text-red-700 transition" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={openLogin}>
                Login
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition" onClick={openRegister}>
                Sign Up
              </button>
            </>
          )}

          {user && (
            <Link to="/cart" className="relative flex items-center gap-2 text-lg font-medium" onClick={() => setMenuOpen(false)}>
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-600 transition" />
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                3 {/* Replace with dynamic cart count */}
              </span>
            </Link>
          )}
        </div>
      )}

      {/* Login & Register Modals */}
      {modalType === "login" && <Login isOpen={true} onClose={closeModal} onRegisterClick={openRegister} />}
      {modalType === "register" && <Register isOpen={true} onClose={closeModal} onLoginClick={openLogin} />}
    </>
  );
}

export default Navbar;
