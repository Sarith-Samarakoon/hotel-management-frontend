import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEdit,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaWhatsapp,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/footer";
import UpdateSettings from "./userUpdate"; // Import the update form

export default function Settings() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [user, setUser] = useState(null); // State for the logged-in user's details
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user); // Assuming the API returns the user object
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load user details.");
      });
  }, [token]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
        <p className="text-gray-600 text-xl font-medium">
          Loading user details...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <Header />
      <div className="py-10">
        <div className="bg-white rounded-xl shadow-lg max-w-lg mx-auto p-8">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            User Details
          </h1>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <img
              src={user.image || "https://via.placeholder.com/150"}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-32 h-32 rounded-full shadow-md border-4 border-gray-300"
            />
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <FaUser className="mr-3 text-blue-600" />
              <p className="text-lg font-medium">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="flex items-center text-gray-700">
              <FaEnvelope className="mr-3 text-green-600" />
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <FaPhoneAlt className="mr-3 text-yellow-600" />
              <p className="text-lg font-medium">
                {user.phone || "Not Provided"}
              </p>
            </div>
            <div className="flex items-center text-gray-700">
              <FaWhatsapp className="mr-3 text-green-600" size={22} />
              <p className="text-lg font-medium">
                WhatsApp: {user.whatsApp || "Not Provided"}
              </p>
            </div>

            <div className="flex items-center text-gray-700">
              <FaCheckCircle
                className={`mr-3 ${
                  user.emailVerified ? "text-green-500" : "text-red-500"
                }`}
              />
              <p className="text-lg font-medium">
                Email Verified: {user.emailVerified ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex items-center text-gray-700">
              <FaUser className="mr-3 text-purple-600" />
              <p className="text-lg font-medium">Type: {user.type}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-8 flex justify-center">
            {
              <Link
                className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md font-medium hover:bg-blue-700 transition-all flex items-center"
                onClick={() => setIsModalOpen(true)} // Open modal
                state={user} // Pass user data to the modal
              >
                <FaEdit className="mr-2" /> Edit Profile
              </Link>
            }
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <UpdateSettings closeModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
