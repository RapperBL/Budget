import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaUser, FaFlag, FaThLarge, FaCog } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DisplayUser } from '../../Service';

const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");

  // Function to determine if the current path is active
  const isActive = (path) => location.pathname === path;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('Login_User');

    navigate('/');
  };

  const loggedInUsername = localStorage.getItem('Login_User');

  useEffect(() => {
    const getUserData = async () => {
      const data = await DisplayUser();
      const user = data.find(user => user.Login_User === loggedInUsername);
      setUserData(user);
      localStorage.setItem('Login_User', user.Login_User);
    };
    getUserData();
  }, [loggedInUsername]);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg fixed w-full">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Left Section (Logo & Links) */}
        <div className="flex items-center space-x-8">
          {/* Home Icon */}
          <Link
            to="/Home"
            className={`flex items-center space-x-2 ${(isActive("/Home") || isActive("/BudgetReport")) ? "text-blue-400 font-bold" : "hover:text-blue-400"
              } transition-colors`}
              onClick={() => localStorage.removeItem('selectedYear')}
          >
            <FaHome className="w-5 h-5" />
            <span className="font-bold text-lg">Home</span>
          </Link>

          {/* Other Links */}
          <Link
            to="/reports"
            className={`flex items-center space-x-2 ${isActive("/reports") ? "text-blue-400 font-bold" : "hover:text-blue-400"
              } transition-colors`}
          >
            <FaThLarge className="w-5 h-5" />
            <span>Reports</span>
          </Link>
          <Link
            to="/system"
            className={`flex items-center space-x-2 ${isActive("/system") ? "text-blue-400 font-bold" : "hover:text-blue-400"
              } transition-colors`}
          >
            <FaCog className="w-5 h-5" />
            <span>System</span>
          </Link>
        </div>

        {/* Right Section (User Profile) */}
        <div className="relative flex items-center space-x-4">
          <span>{userData.LoginFullName}</span>
          <button
            onClick={toggleDropdown}
            className="focus:outline-none flex items-center space-x-2"
          >
            <FaUser className="w-6 h-6" />
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-40 w-48 bg-white text-gray-800 rounded-lg shadow-lg"
              ref={dropdownRef} // Assigning the dropdown element to the ref
            >
              <a href="/Setting" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
              <a onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
