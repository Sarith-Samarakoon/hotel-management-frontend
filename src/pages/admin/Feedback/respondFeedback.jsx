import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function RespondFeedback() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if no feedback data is passed via state
  if (!location.state) {
    window.location.href = "/admin/feedback";
  }

  // Feedback details from location state
  const {
    userName,
    userEmail,
    message,
    rating,
    roomId,
    _id,
    adminResponse,
    responded,
  } = location.state;

  const [response, setResponse] = useState(adminResponse || ""); // Admin response
  const [isResponded, setIsResponded] = useState(responded || false);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // API call to update the feedback with admin response
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedback/${_id}`,
        { adminResponse: response, responded: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Response submitted successfully!");
        setIsResponded(true);
        navigate("/admin/feedback");
      })
      .catch((err) => {
        console.error("Error submitting response:", err);
        toast.error("Failed to submit response.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-[500px] space-y-6"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Respond to Feedback
        </h1>

        {/* Feedback Details */}
        <div>
          <label className="block font-medium mb-1">User Name</label>
          <input
            type="text"
            value={userName}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">User Email</label>
          <input
            type="text"
            value={userEmail}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Room ID</label>
          <input
            type="text"
            value={roomId}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Rating</label>
          <div className="flex space-x-1">
            {Array.from({ length: rating }).map((_, i) => (
              <span
                key={i}
                className="text-yellow-500 text-lg"
                aria-label="Star"
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">User Message</label>
          <textarea
            value={message}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none"
            rows="3"
          />
        </div>

        {/* Admin Response */}
        <div>
          <label className="block font-medium mb-1">Your Response</label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              isResponded
                ? "bg-gray-100 focus:ring-gray-300"
                : "focus:ring-blue-500"
            }`}
            rows="4"
            placeholder="Write your response here..."
            disabled={isResponded}
            required={!isResponded}
          />
          {isResponded && (
            <div className="flex items-center mt-2 text-green-600 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.93-5.477l-3-3a.75.75 0 011.06-1.06l2.22 2.22 5.47-5.47a.75.75 0 111.06 1.06l-6 6a.75.75 0 01-1.06 0z"
                  clipRule="evenodd"
                />
              </svg>
              Response Submitted
              <button
                type="button"
                onClick={() => setIsResponded(false)}
                className="ml-4 text-blue-500 underline"
              >
                Edit Response
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        {!isResponded && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex justify-center"
          >
            {isLoading ? (
              <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
            ) : (
              <span>Submit Response</span>
            )}
          </button>
        )}
      </form>
    </div>
  );
}
