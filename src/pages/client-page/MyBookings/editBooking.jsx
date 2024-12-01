import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditBookingForm({
  booking,
  maxGuests,
  onClose,
  onBookingUpdated,
}) {
  const [startDate, setStartDate] = useState(
    booking ? new Date(booking.start).toISOString().substr(0, 10) : ""
  );
  const [endDate, setEndDate] = useState(
    booking ? new Date(booking.end).toISOString().substr(0, 10) : ""
  );
  const [guests, setGuests] = useState(booking ? booking.guests : 1);
  const [notes, setNotes] = useState(booking ? booking.notes : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (guests > maxGuests) {
      toast.error(`Maximum allowed guests: ${maxGuests}`);
      return;
    }

    setIsSubmitting(true);

    const updatedBooking = {
      start: startDate,
      end: endDate,
      guests,
      notes,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${booking.bookingId}`,
        updatedBooking,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Booking updated successfully!");
        onBookingUpdated(); // Callback to refresh bookings
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating booking:", error.message);
        toast.error(
          error.response?.data?.message || "Failed to update booking."
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Edit Booking {booking.bookingId}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Guests */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Number of Guests (Max: {maxGuests})
            </label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min="1"
              max={maxGuests} // Enforce maxGuests
              required
            />
            {guests > maxGuests && (
              <p className="text-red-500 text-sm mt-1">
                Maximum guests allowed is {maxGuests}.
              </p>
            )}
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

          {/* Buttons */}
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
              disabled={isSubmitting || guests > maxGuests}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
