import "./login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function EmailVerification() {
  const [email, setEmail] = useState(""); // State for email
  const [otp, setOtp] = useState(""); // State for OTP
  const [isLoading, setIsLoading] = useState(false); // Loading state for submit button

  const navigate = useNavigate(); // For redirection

  // Function to handle email verification
  const handleVerifyEmail = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate inputs
    if (!email || !otp) {
      toast.error("Both email and OTP are required.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsLoading(true); // Enable loading state

    // API request for email verification
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify-email`, {
        email,
        otp: parseInt(otp, 10), // Ensure OTP is sent as a number
      })
      .then((res) => {
        toast.success("Email verified successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to login page
        navigate("/login");
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            "Verification failed! Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      })
      .finally(() => {
        setIsLoading(false); // Disable loading state
      });
  };

  return (
    <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
      <div className="w-[500px] bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Email Verification
        </h1>
        <form onSubmit={handleVerifyEmail} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* OTP Field */}
          <div>
            <label className="block text-gray-700">OTP</label>
            <input
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        {/* Back to Registration Link */}
        <Link to="/register" className="block text-center mt-4 text-blue-500">
          Back to Register
        </Link>
      </div>
    </div>
  );
}
