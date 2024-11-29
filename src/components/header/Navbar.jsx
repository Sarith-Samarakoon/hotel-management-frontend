import { FaFacebookF, FaTwitter, FaInstagram, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      className="absolute top-17 left-0 w-full z-50"
      style={{
        background: "transparent",
        backdropFilter: "blur(0px)",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-end items-center mr-0">
        <div className="flex items-center space-x-6">
          {/* Social Media Icons */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebookF size={25} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter size={25} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={25} />
          </a>

          {/* Settings Icon with Text */}
          <Link
            to="/settings"
            className="text-white hover:text-blue-600 transition duration-300 flex items-center space-x-2"
            aria-label="Settings"
          >
            <FaCog size={25} />
            <span className="hidden sm:inline text-lg font-medium">
              Settings
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
