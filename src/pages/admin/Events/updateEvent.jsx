import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateEventForm() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    window.location.href = "/admin/event";
  }

  const [name, setName] = useState(location.state.name);
  const [startDate, setStartDate] = useState(
    new Date(location.state.startDate).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(location.state.endDate).toISOString().split("T")[0]
  );
  const [description, setDescription] = useState(location.state.description);
  const [image, setImage] = useState(location.state.image);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  // Get today's date in YYYY-MM-DD format for validation
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Validate required fields
      if (!name || !startDate || !endDate) {
        toast.error("Please fill in all required fields.");
        setIsLoading(false);
        return;
      }

      // Prepare the event info object with the existing image by default
      const eventInfo = {
        name,
        startDate,
        endDate,
        description,
        image: location.state.image, // Default to the existing image
      };

      // Check if a new image is uploaded
      if (image && typeof image === "object" && image.name) {
        // Upload the new image
        uploadMediaToSupabase(image)
          .then(() => {
            const { data, error } = supabase.storage
              .from("Images")
              .getPublicUrl(image.name);

            if (error) {
              throw new Error("Failed to get public URL for the image");
            }

            // Update the image URL in the event info
            eventInfo.image = data.publicUrl;

            // Send updated event info to the backend
            return axios.put(
              import.meta.env.VITE_BACKEND_URL +
                "/api/events/" +
                location.state._id,
              eventInfo,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
          })
          .then(() => {
            toast.success("Event updated successfully!");
            navigate("/admin/event");
          })
          .catch((err) => {
            console.error("Error updating event:", err.message);
            toast.error("Error updating event!");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        // If no new image is uploaded, only update the other details
        axios
          .put(
            import.meta.env.VITE_BACKEND_URL +
              "/api/events/" +
              location.state._id,
            eventInfo,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then(() => {
            toast.success("Event updated successfully!");
            navigate("/admin/event");
          })
          .catch((err) => {
            console.error("Error updating event:", err.message);
            toast.error("Error updating event!");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, 1000);
  };

  return (
    <div className="w-full h-screen lg:h-[80vh] md:h-[70vh] sm:h-[60vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-[720px] space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Update Event</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Event Name */}
            <div>
              <label className="block font-medium mb-1">Event Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event name"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={today} // Disable past dates
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* End Date */}
            <div>
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={today} // Disable past dates
              />
            </div>

            {/* Image */}
            <div>
              <label className="block font-medium mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Full-Width Section */}
        <div className="space-y-4">
          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event description"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update Event</span>
          )}
        </button>
      </form>
    </div>
  );
}
