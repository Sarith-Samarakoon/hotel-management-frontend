import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

export default function FeedbackForm({
  booking,
  onClose,
  onFeedbackSubmitted,
}) {
  const [rating, setRating] = useState(0); // Changed to a number for star ratings
  const [hover, setHover] = useState(null); // For hover effects on stars
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    window.location.href = "/login";
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackData = {
      rating,
      message,
    };

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedback/`,
        { ...feedbackData, bookingId: booking.bookingId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Feedback submitted successfully!");
        onClose();
        onFeedbackSubmitted();
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        toast.error("Failed to submit feedback.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Feedback for Room {booking.roomId}
        </h2>
        <form onSubmit={handleFeedbackSubmit}>
          {/* Star Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex items-center justify-center">
              {Array(5)
                .fill(0)
                .map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className={`text-2xl cursor-pointer ${
                        currentRating <= (hover || rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(currentRating)}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  );
                })}
            </div>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Share your experience..."
              rows="4"
              required
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
