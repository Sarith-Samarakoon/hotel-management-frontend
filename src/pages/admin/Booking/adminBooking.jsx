import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate, Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Redirect to login if no token is found
  if (!token) {
    window.location.href = "/login";
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch all bookings
  const fetchBookings = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in Authorization header
        },
      })
      .then((response) => {
        setBookings(response.data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch bookings."
        );
      })
      .finally(() => setLoading(false));
  };

  // Handle delete booking
  const deleteBooking = (bookingId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete booking ID "${bookingId}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                toast.success("Booking deleted successfully!");
                fetchBookings(); // Refresh bookings after deletion
              })
              .catch((error) => {
                console.error("Error deleting booking:", error);
                toast.error("Failed to delete booking.");
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing on cancel
          },
        },
      ],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
        Bookings
      </h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white text-center">
              <th className="px-4 py-2 border">Booking ID</th>
              <th className="px-4 py-2 border">Room ID</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Guests</th>
              <th className="px-4 py-2 border">Notes</th>
              <th className="px-4 py-2 border">BookedDate</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Reason</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-gray-700">
                  {booking.bookingId}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {booking.roomId}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {booking.email}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {new Date(booking.start).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {new Date(booking.end).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {booking.guests}
                </td>

                <td className="px-4 py-2 border-b text-gray-700">
                  {booking.notes || "-"}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {new Date(booking.timesStamp).toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {booking.status || "Pending"}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {booking.reason || "-"}
                </td>
                <td className="px-4 py-2 border-b text-gray-700 flex space-x-2">
                  <button
                    onClick={() => deleteBooking(booking.bookingId)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <Link
                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
                    to={"/admin/update-bookings"}
                    state={booking}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
