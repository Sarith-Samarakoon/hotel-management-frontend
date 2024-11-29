import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    // Fetch all bookings
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
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Booking ID</th>
              <th className="px-4 py-2 border">Room ID</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td className="px-4 py-2 border">{booking.bookingId}</td>
                <td className="px-4 py-2 border">{booking.roomId}</td>
                <td className="px-4 py-2 border">{booking.email}</td>
                <td className="px-4 py-2 border">
                  {new Date(booking.start).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(booking.end).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {booking.status || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
