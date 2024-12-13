import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBed,
  FaCalendarAlt,
  FaTag,
  FaUserFriends,
  FaStickyNote,
  FaInfoCircle,
  FaTrashAlt,
  FaExclamationCircle,
  FaEdit,
  FaCommentDots,
} from "react-icons/fa";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/footer";
import { toast } from "react-toastify";
import EditBookingForm from "./editBooking"; // Import the EditBookingForm component
import FeedbackForm from "./feedbackForm"; // Import FeedbackForm component

export default function MyBookedRooms() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null); // State for the booking being edited
  const [rooms, setRooms] = useState({}); // State to store maxGuests by roomId
  const [categories, setCategories] = useState({}); // State to store category names by roomId
  const [feedbackBooking, setFeedbackBooking] = useState(null); // State for feedback

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const fetchBookings = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBookings(response.data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error.message);
        toast.error(
          error.response?.data?.message || "Failed to fetch bookings."
        );
      })
      .finally(() => setLoading(false));
  };

  const fetchRoomsAndCategories = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const roomsData = response.data.rooms.reduce((acc, room) => {
          acc[room.roomId] = {
            maxGuests: room.maxGuests,
            category: room.categoryName, // Assume room has a categoryName field
          };
          return acc;
        }, {});
        setRooms(roomsData);
        // Extract categories for easier mapping
        const categoriesData = response.data.rooms.reduce((acc, room) => {
          acc[room.roomId] = room.category; // Map roomId to categoryName
          return acc;
        }, {});
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error.message);
        toast.error(error.response?.data?.message || "Failed to fetch rooms.");
      });
  };

  const cancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
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
          toast.success("Booking canceled successfully!");
          fetchBookings(); // Refresh bookings after cancellation
        })
        .catch((error) => {
          console.error("Error canceling booking:", error.message);
          toast.error(
            error.response?.data?.message || "Failed to cancel booking."
          );
        });
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchRoomsAndCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-200 to-purple-200">
      <Header />
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          My Booked Rooms
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-medium text-gray-600 animate-pulse">
              Loading your bookings...
            </p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <FaInfoCircle className="text-gray-400 text-6xl mb-4" />
            <p className="text-lg text-gray-600">You have no booked rooms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    <FaBed className="inline text-blue-600 mr-2" />
                    Room {booking.roomId}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <FaTag className="inline text-pink-500 mr-2" />
                    Category: {categories[booking.roomId] || "Unknown"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <FaCalendarAlt className="inline text-blue-500 mr-2" />
                    {new Date(booking.start).toLocaleDateString()} -{" "}
                    {new Date(booking.end).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <FaUserFriends className="inline text-green-500 mr-2" />
                    {booking.guests} Guests
                  </p>
                  <p className="text-gray-600 mb-2">
                    <FaStickyNote className="inline text-yellow-500 mr-2" />
                    {booking.notes || "No notes available"}
                  </p>
                  {booking.status === "cancelled" && (
                    <p className="text-red-600 font-semibold mt-2">
                      <FaExclamationCircle className="inline mr-2" />
                      Reason: {booking.reason || "No reason provided"}
                    </p>
                  )}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : booking.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                  <div className="flex gap-2 mt-4">
                    {booking.status === "pending" && (
                      <button
                        onClick={() => cancelBooking(booking.bookingId)}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex justify-center items-center transition-colors"
                      >
                        <FaTrashAlt className="mr-2" /> Cancel
                      </button>
                    )}
                    {booking.status === "pending" && (
                      <button
                        onClick={() => setEditingBooking(booking)}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex justify-center items-center transition-colors"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => setFeedbackBooking(booking)}
                        className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-700 flex justify-center items-center transition-colors"
                      >
                        <FaCommentDots className="mr-2" /> Feedback
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />

      {/* Edit Booking Modal */}
      {editingBooking && rooms[editingBooking.roomId] && (
        <EditBookingForm
          booking={editingBooking}
          maxGuests={rooms[editingBooking.roomId]?.maxGuests || 1} // Pass maxGuests to form
          onClose={() => setEditingBooking(null)}
          onBookingUpdated={fetchBookings}
        />
      )}

      {/* Feedback Modal */}
      {feedbackBooking && (
        <FeedbackForm
          booking={feedbackBooking}
          onClose={() => setFeedbackBooking(null)}
          onFeedbackSubmitted={fetchBookings}
        />
      )}
    </div>
  );
}
