import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaReply, FaStar, FaCheck } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const navigate = useNavigate();

  const itemsPerPage = 5; // Number of feedbacks per page

  // Fetch feedback data
  useEffect(() => {
    fetchFeedback(currentPage);
  }, [currentPage]);

  const fetchFeedback = (page) => {
    setIsLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedback?page=${
          page + 1
        }&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setFeedbacks(res.data.feedback || []);
        setTotalPages(res.data.pagination.totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        toast.error("Failed to load feedback.");
        setIsLoading(false);
      });
  };

  const deleteFeedback = (id) => {
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
                fetchFeedback(currentPage);
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
  };

  const toggleResponded = (feedback) => {
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
        fetchFeedback(currentPage);
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
  };

  if (isLoading) {
    return <div className="p-4">Loading feedback...</div>;
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
              <td className="px-2 py-1">
                <img
                  src={feedback.userProfileImage}
                  alt={feedback.userName}
                  className="w-12 h-12 object-cover rounded-full shadow-md"
                />
              </td>
              <td className="px-2 py-1">
                <p className="font-bold text-gray-700">{feedback.userName}</p>
                <p className="text-sm text-gray-500">{feedback.userEmail}</p>
              </td>
              <td className="px-2 py-1 text-gray-700">{feedback.roomId}</td>
              <td className="px-2 py-1 flex items-center text-yellow-500">
                {Array.from({ length: feedback.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </td>
              <td className="px-2 py-1 text-gray-700">{feedback.message}</td>
              <td className="px-2 py-1 text-gray-700">
                {feedback.responded ? "Yes" : "No"}
              </td>
              <td className="px-2 py-1 flex space-x-2 mt-1">
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
      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
