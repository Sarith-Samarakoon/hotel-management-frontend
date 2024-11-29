import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTag from "../userData/userdata";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path) => {
    setIsMenuOpen(false); // Close the menu if open (for mobile)
    navigate(path);
  };

  return (
    <div>
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigateTo("/")} // Navigate to Home on logo click
          >
            <img
              src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Golden%20Horizon%20Villa%20Logo.webp?t=2024-11-27T09%3A38%3A05.191Z"
              alt="Golden Horizon Villa Logo"
              className="w-20 h-20 object-cover rounded-full"
            />
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
              Golden Horizon Hotel
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex space-x-6 text-white font-semibold">
            <button
              onClick={() => navigateTo("/")}
              className="relative group transition duration-300"
            >
              <span className="hover:text-blue-300 transition duration-300">
                Home
              </span>
              <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-300 transition-all duration-300"></span>
            </button>
            <button
              onClick={() => navigateTo("/about-us")}
              className="relative group transition duration-300"
            >
              <span className="hover:text-blue-300 transition duration-300">
                About Us
              </span>
              <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-300 transition-all duration-300"></span>
            </button>
            <button
              onClick={() => navigateTo("/rooms")}
              className="relative group transition duration-300"
            >
              <span className="hover:text-blue-300 transition duration-300">
                Rooms
              </span>
              <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-300 transition-all duration-300"></span>
            </button>
            <button
              onClick={() => navigateTo("/gallery")}
              className="relative group transition duration-300"
            >
              <span className="hover:text-blue-300 transition duration-300">
                Gallery
              </span>
              <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-300 transition-all duration-300"></span>
            </button>
            <button
              onClick={() => navigateTo("/reviews")}
              className="relative group transition duration-300"
            >
              <span className="hover:text-blue-300 transition duration-300">
                Reviews
              </span>
              <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-300 transition-all duration-300"></span>
            </button>
            <button
              onClick={() => navigateTo("/inquiries")}
              className="relative group transition duration-300"
            >
              <span className="hover:text-blue-300 transition duration-300">
                Inquiries
              </span>
              <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-300 transition-all duration-300"></span>
            </button>
            <button
              onClick={() => navigateTo("/contact-us")}
              className="relative group transition duration-300"
            >
              <span className="hover:text-blue-300 transition duration-300">
                Contact Us
              </span>
              <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-300 transition-all duration-300"></span>
            </button>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <UserTag />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none ml-4"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Links */}
        {isMenuOpen && (
          <div className="lg:hidden bg-blue-600">
            <ul className="space-y-4 py-4 px-4 text-white">
              <li>
                <button
                  onClick={() => navigateTo("/")}
                  className="block w-full text-left hover:bg-blue-700 rounded-md px-4 py-2"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/about-us")}
                  className="block w-full text-left hover:bg-blue-700 rounded-md px-4 py-2"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/rooms")}
                  className="block w-full text-left hover:bg-blue-700 rounded-md px-4 py-2"
                >
                  Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/gallery")}
                  className="block w-full text-left hover:bg-blue-700 rounded-md px-4 py-2"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/reviews")}
                  className="block w-full text-left hover:bg-blue-700 rounded-md px-4 py-2"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/inquiries")}
                  className="block w-full text-left hover:bg-blue-700 rounded-md px-4 py-2"
                >
                  Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/contact-us")}
                  className="block w-full text-left hover:bg-blue-700 rounded-md px-4 py-2"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
