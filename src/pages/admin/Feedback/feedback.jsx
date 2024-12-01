import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaReply, FaStar, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Redirect to login if no token is found
  if (!token) {
    window.location.href = "/login";
  }

  const navigate = useNavigate();

  // Fetch feedback data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      })
      .then((res) => {
        setFeedbacks(res.data.feedback || []); // Ensure data is always an array
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback.");
        setIsLoading(false);
      });
  }, [token]);

  // Handle feedback deletion
  function deleteFeedback(id) {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this feedback?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/feedback/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                setFeedbacks((prev) =>
                  prev.filter((feedback) => feedback._id !== id)
                );
                toast.success("Feedback deleted successfully!");
              })
              .catch(() => {
                toast.error("Error deleting feedback.");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  // Toggle responded status
  function toggleResponded(feedback) {
    const updatedRespondedStatus = !feedback.responded;

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedback/${feedback._id}`,
        { responded: updatedRespondedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setFeedbacks((prev) =>
          prev.map((fb) =>
            fb._id === feedback._id
              ? { ...fb, responded: updatedRespondedStatus }
              : fb
          )
        );
        toast.success(
          `Feedback marked as ${
            updatedRespondedStatus ? "responded" : "not responded"
          } successfully!`
        );
      })
      .catch((err) => {
        console.error("Error toggling responded status:", err);
        toast.error("Failed to update responded status.");
      });
  }

  if (isLoading) {
    return <div className="p-4">Loading feedback...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full p-4">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
        Admin Feedback
      </h1>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="py-2 px-5 border-b font-medium">Profile</th>
            <th className="py-2 px-5 border-b font-medium">User</th>
            <th className="py-2 px-5 border-b font-medium">Room ID</th>
            <th className="py-2 px-5 border-b font-medium">Rating</th>
            <th className="py-2 px-5 border-b font-medium">Message</th>
            <th className="py-2 px-5 border-b font-medium">Response</th>
            <th className="py-2 px-5 border-b font-medium">Responded</th>
            <th className="py-2 px-5 border-b font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr
              key={feedback._id}
              className="hover:bg-gray-100 bg-white border-b"
            >
              {/* Profile Image */}
              <td className="px-2 py-1">
                <img
                  src={feedback.userProfileImage}
                  alt={feedback.userName}
                  className="w-12 h-12 object-cover rounded-full shadow-md"
                />
              </td>
              {/* User Info */}
              <td className="px-2 py-1">
                <p className="font-bold text-gray-700">{feedback.userName}</p>
                <p className="text-sm text-gray-500">{feedback.userEmail}</p>
              </td>
              {/* Room ID */}
              <td className="px-2 py-1 text-gray-700">{feedback.roomId}</td>
              {/* Rating */}
              <td className="px-2 py-1 flex items-center text-yellow-500">
                {Array.from({ length: feedback.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </td>
              {/* Message */}
              <td className="px-2 py-1 text-gray-700">{feedback.message}</td>
              {/* Admin Response */}
              <td className="px-2 py-1 text-gray-700">
                {feedback.adminResponse ? (
                  <p>{feedback.adminResponse}</p>
                ) : (
                  <span className="text-red-500">No Response</span>
                )}
              </td>
              {/* Responded Status */}

              <td className="px-2 py-1 flex-col items-center">
                {/* Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={feedback.responded}
                    onChange={() => toggleResponded(feedback)}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-green-500">
                    <div
                      className={`w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full shadow-md transform transition-all ${
                        feedback.responded ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </label>
                <br />
                {/* Status Text */}
                <span
                  className={`mt-2 text-sm font-bold ${
                    feedback.responded ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {feedback.responded ? "Responded" : "Not Responded"}
                </span>
              </td>

              {/* Actions */}
              <td className="px-2 py-1 flex space-x-2">
                <button
                  onClick={() => deleteFeedback(feedback._id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
                <button
                  onClick={() =>
                    navigate("/admin/respond-feedback", { state: feedback })
                  }
                  className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
                >
                  <FaReply className="mr-2" /> Respond
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
