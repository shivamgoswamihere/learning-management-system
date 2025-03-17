import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-200 text-black py-6 px-4 mt-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Logo & Description */}
        <div>
          <Link to="/" className="logo">
            <img className="w-50" src="logo.svg" alt="Logo" />
          </Link>
          <p className="text-sm mt-2">
            Empowering learners with quality education anytime, anywhere.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/courses" className="hover:text-gray-400">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-gray-400">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="#" className="hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className=" text-center text-sm mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Cognimatter. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
