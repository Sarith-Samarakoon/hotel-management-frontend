import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate, Link } from "react-router-dom";

export default function InquiryPage() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingInquiry, setEditingInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Redirect to login if no token is found
  if (!token) {
    window.location.href = "/login";
  }

  const navigate = useNavigate(); // Initialize navigation hook

  // Fetch inquiries
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInquiries(res.data.inquiries || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching inquiries:", err);
        setError("Failed to load inquiries.");
        setIsLoading(false);
      });
  }, [token]);

  // Delete inquiry
  function deleteInquiry(id) {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this inquiry?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(() => {
                setInquiries((prev) =>
                  prev.filter((inquiry) => inquiry._id !== id)
                );
                toast.success("Inquiry deleted successfully!");
              })
              .catch(() => {
                toast.error("Error deleting inquiry.");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  // Update inquiry
  function updateInquiry() {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiry/${editingInquiry._id}`,
        {
          status: editingInquiry.status,
          adminReply: editingInquiry.adminReply,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setInquiries((prev) =>
          prev.map((item) =>
            item._id === editingInquiry._id
              ? {
                  ...item,
                  status: editingInquiry.status,
                  adminReply: editingInquiry.adminReply,
                }
              : item
          )
        );
        toast.success("Inquiry updated successfully!");
        navigate("/admin/admin-inquiry");
        setEditingInquiry(null);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error("Error updating inquiry:", err);
        toast.error("Failed to update inquiry.");
      });
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate("/admin/contact")} // Navigate to inquiries
          className="text-4xl font-extrabold tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[48%] text-center"
        >
          Contact Messages
        </button>
        <button
          onClick={() => navigate("/admin/admin-inquiry")} // Navigate to inquiries
          className="text-4xl font-extrabold tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[48%] text-center"
        >
          User Inquiries
        </button>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="py-2 px-5 border-b font-medium">User</th>
            <th className="py-2 px-5 border-b font-medium">Type</th>
            <th className="py-2 px-5 border-b font-medium">Message</th>
            <th className="py-2 px-5 border-b font-medium">Status</th>
            <th className="py-2 px-5 border-b font-medium">Admin Response</th>
            <th className="py-2 px-5 border-b font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr
              key={inquiry._id}
              className="hover:bg-gray-100 bg-white border-b"
            >
              {/* User Info */}
              <td className="px-2 py-1">
                <p className="font-bold text-gray-700">{inquiry.name}</p>
                <p className="text-sm text-gray-500">{inquiry.userEmail}</p>
              </td>
              {/* Inquiry Type */}
              <td className="px-2 py-1 text-gray-700">{inquiry.inquiryType}</td>
              {/* Message */}
              <td className="px-2 py-1 text-gray-700">{inquiry.message}</td>
              {/* Status */}
              <td className="px-2 py-1">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-bold ${
                    inquiry.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : inquiry.status === "reviewed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {inquiry.status.charAt(0).toUpperCase() +
                    inquiry.status.slice(1)}
                </span>
              </td>
              {/* Admin Response */}
              <td className="px-2 py-1 text-gray-700">
                {inquiry.adminReply || (
                  <span className="text-red-500">No Response</span>
                )}
              </td>
              {/* Actions */}
              <td className="px-2 py-1 flex space-x-2">
                <button
                  onClick={() => {
                    setEditingInquiry(inquiry);
                    setIsModalOpen(true);
                  }}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => deleteInquiry(inquiry._id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing */}
      {isModalOpen && editingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Inquiry</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={editingInquiry.status}
                onChange={(e) =>
                  setEditingInquiry({
                    ...editingInquiry,
                    status: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Response</label>
              <textarea
                value={editingInquiry.adminReply}
                onChange={(e) =>
                  setEditingInquiry({
                    ...editingInquiry,
                    adminReply: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={updateInquiry}
                className="bg-green-600 text-white py-2 px-4 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
