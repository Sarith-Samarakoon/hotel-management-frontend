import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function BookingForm({ room, onClose }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [notes, setNotes] = useState("");
  const [guests, setGuests] = useState(1); // Default number of guests
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Redirect to login if no token is found
  if (!token) {
    window.location.href = "/login";
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingData = {
      roomId: room.roomId, // Pass the roomId for the booking
      start,
      end,
      notes,
      guests, // Include the number of guests in the booking
      // Optional if booking is category-based
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in Authorization header
        },
      })
      .then((response) => {
        toast.success(
          response.data.message || "Booking request submitted successfully!"
        );
        onClose(); // Close the modal after submission
      })
      .catch((error) => {
        console.error("Booking error:", error);
        toast.error(
          error.response?.data?.message || "Failed to submit booking request."
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Book Room {room.roomId}
      </h2>
      <form onSubmit={handleBookingSubmit}>
        {/* Start Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Guests */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="1"
            max={room.maxGuests || 10} // Optional validation for max guests
            required
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Additional notes (optional)"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-gray-500 text-white text-sm font-bold rounded-lg mr-4 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`py-2 px-4 bg-indigo-600 text-white text-sm font-bold rounded-lg ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Book Now"}
          </button>
        </div>
      </form>
    </div>
  );
}
