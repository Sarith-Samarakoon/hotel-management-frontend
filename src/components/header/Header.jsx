import {
  FaHome,
  FaInfoCircle,
  FaBed,
  FaImages,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa"; // Importing icons
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation for route detection
import UserTag from "../userData/userdata";
import Navbar from "../../components/header/Navbar";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const menuItems = [
    { label: "Home", icon: <FaHome />, path: "/" },
    { label: "About Us", icon: <FaInfoCircle />, path: "/about-us" },
    { label: "Rooms", icon: <FaBed />, path: "/rooms" },
    { label: "Gallery", icon: <FaImages />, path: "/gallery" },
    { label: "Reviews", icon: <FaStar />, path: "/reviews" },
    { label: "Inquiries", icon: <FaPhone />, path: "/inquiries" },
    { label: "Contact Us", icon: <FaEnvelope />, path: "/contact-us" },
  ];

  return (
    <div>
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigateTo("/")}
          >
            <img
              src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Golden%20Horizon%20Villa%20Logo.webp?t=2024-11-27T09%3A38%3A05.191Z"
              alt="Golden Horizon Villa Logo"
              className="w-12 h-12 object-cover rounded-full"
            />
            <h1 className="text-white text-2xl font-bold">
              Golden Horizon Hotel
            </h1>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="2xl:hidden text-white focus:outline-none"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden 2xl:flex space-x-6 text-white font-semibold">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigateTo(item.path)}
                className="relative group transition duration-300 flex items-center space-x-2"
              >
                {item.icon}
                <span className="group-hover:text-[#FFD700] transition duration-300">
                  {item.label}
                </span>
                {/* Hover Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFD700] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="hidden 2xl:flex items-center space-x-4">
            <UserTag />
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed inset-0 z-50 flex ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 bg-transparent 2xl:hidden`}
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          ></div>

          {/* Drawer Menu */}
          <div className="w-64 bg-blue-600 text-white flex flex-col z-50">
            {/* UserTag at the Top of Drawer */}
            <div className="p-7 bg-blue-700 flex items-center justify-start space-x-3">
              <UserTag />
            </div>

            <ul className="space-y-4 py-4 px-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigateTo(item.path)}
                    className="hover:text-[#FFD700] block w-full text-left hover:bg-[#1A73E8] rounded-md px-4 py-2 flex items-center space-x-3 transition duration-300"
                  >
                    {item.icon}
                    <span className="hover:text-[#FFD700]">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Render Navbar Only on Home Page */}
      {location.pathname === "/" && <Navbar isMenuOpen={isMenuOpen} />}
    </div>
  );
}

export default Header;
