import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AdminMessages() {
  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  const [messages, setMessages] = useState([]);
  const [messagesIsLoaded, setMessagesIsLoaded] = useState(false);

  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    if (!messagesIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setMessages(res.data.messages);
          setMessagesIsLoaded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [messagesIsLoaded]);

  function deleteMessage(id) {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete this message?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(
                import.meta.env.VITE_BACKEND_URL + "/api/contacts/" + id,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .then(() => {
                setMessagesIsLoaded(false);
                toast.success("Message deleted successfully!");
              })
              .catch(() => {
                toast.error("Error Deleting Message!");
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing if No is clicked
          },
        },
      ],
    });
  }

  function toggleReadStatus(id) {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL +
          "/api/contacts/toggle-read-status/" +
          id,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setMessagesIsLoaded(false);
        toast.success("Message status updated successfully!");
        navigate("/admin/contact");
      })
      .catch(() => {
        toast.error("Error updating message status!");
      });
  }

  return (
    <div className="w-full">
      <div className="p-4">
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
              <th className="py-3 px-6 border-b font-medium">Name</th>
              <th className="py-3 px-6 border-b font-medium">Email</th>
              <th className="py-3 px-6 border-b font-medium">Message</th>
              <th className="py-3 px-6 border-b font-medium">Date</th>
              <th className="py-3 px-6 border-b font-medium">Status</th>
              <th className="py-3 px-6 border-b font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 border-b text-gray-700">
                  {message.name}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {message.email}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {message.message}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {(() => {
                    const parsedDate = new Date(message.createdAt);
                    if (isNaN(parsedDate.getTime())) {
                      return "Invalid Date";
                    }
                    return format(parsedDate, "MM/dd/yyyy hh:mm a");
                  })()}
                </td>

                <td className="py-4 px-6 border-b text-gray-700">
                  {message.read ? (
                    <span className="text-green-500">Read</span>
                  ) : (
                    <span className="text-red-500">Unread</span>
                  )}
                </td>
                <td className="py-4 px-6 border-b text-gray-700 flex space-x-2">
                  <button
                    onClick={() => toggleReadStatus(message._id)}
                    className="bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-700 flex items-center"
                  >
                    <FaCheckCircle className="mr-2" />{" "}
                    {message.read ? "Mark as Unread" : "Mark as Read"}
                  </button>
                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
