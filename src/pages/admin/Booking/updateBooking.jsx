import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateBookingForm() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state == null) {
    window.location.href = "/admin/bookings";
  }

  const [bookingId] = useState(location.state.bookingId);
  const [roomId, setRoomId] = useState(location.state.roomId);
  const [email, setEmail] = useState(location.state.email);
  const [start, setStart] = useState(location.state.start.split("T")[0]);
  const [end, setEnd] = useState(location.state.end.split("T")[0]);
  const [guests, setGuests] = useState(location.state.guests);
  const [status, setStatus] = useState(location.state.status);
  const [reason, setReason] = useState(location.state.reason || "");
  const [notes, setNotes] = useState(location.state.notes || "");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedBooking = {
      status,
      reason,
      notes,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`,
        updatedBooking,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Booking updated successfully!");
        navigate("/admin/booking");
      })
      .catch((err) => {
        console.error("Error updating booking:", err.message);
        toast.error("Error updating booking!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Update Booking</h1>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className="block font-medium mb-1">Reason (Optional)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter reason (optional)"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update Booking</span>
          )}
        </button>
      </form>
    </div>
  );
}
