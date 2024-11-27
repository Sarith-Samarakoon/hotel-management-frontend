import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateRoomForm() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state == null) {
    window.location.href = "/admin/room";
  }

  const [roomId] = useState(location.state.roomId);
  const [category, setCategory] = useState(location.state.category);
  const [maxGuests, setMaxGuests] = useState(location.state.maxGuests);
  const [available, setAvailable] = useState(location.state.available);
  const [specialDescription, setSpecialDescription] = useState(
    location.state.specialDescription
  );
  const [notes, setNotes] = useState(location.state.notes);
  const [photos, setPhotos] = useState(location.state.photos);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  const handlePhotoUpdate = (index, file) => {
    if (!file) return;

    setIsLoading(true);

    uploadMediaToSupabase(file)
      .then(() => {
        const { data, error } = supabase.storage
          .from("Images")
          .getPublicUrl(file.name);

        if (error) {
          throw new Error("Failed to get public URL for the photo");
        }

        const updatedPhotos = [...photos];
        updatedPhotos[index] = data.publicUrl;
        setPhotos(updatedPhotos);

        toast.success("Photo updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating photo:", err.message);
        toast.error("Error updating photo!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePhotoDelete = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);

    toast.success("Photo removed successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const roomInfo = {
      roomId,
      category,
      maxGuests,
      available,
      specialDescription,
      notes,
      photos,
    };

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + roomId,
        roomInfo,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("Room updated successfully:", res.data);
        toast.success("Room updated successfully!");
        navigate("/admin/room");
      })
      .catch((err) => {
        console.error("Error updating room:", err.message);
        toast.error("Error updating room!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Update Room</h1>

        {/* Room ID */}
        <div>
          <label className="block font-medium mb-1">Room ID</label>
          <input
            type="text"
            value={roomId}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category"
            required
          />
        </div>

        {/* Max Guests */}
        <div>
          <label className="block font-medium mb-1">Max Guests</label>
          <input
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter maximum guests"
            required
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block font-medium mb-1">Available</label>
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value === "true")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Special Description */}
        <div>
          <label className="block font-medium mb-1">Special Description</label>
          <textarea
            value={specialDescription}
            onChange={(e) => setSpecialDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter special description"
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block font-medium mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter notes"
            required
          />
        </div>

        {/* Photos */}
        <div>
          <label className="block font-medium mb-1">Photos</label>
          {photos.map((photo, index) => (
            <div key={index} className="flex items-center gap-4 mt-2">
              {typeof photo === "string" ? (
                <img
                  src={photo}
                  alt="Room photo"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <p>{photo.name}</p>
              )}
              <input
                type="file"
                onChange={(e) => handlePhotoUpdate(index, e.target.files[0])}
                className="border px-2 py-1 rounded-lg"
              />
              <button
                type="button"
                onClick={() => handlePhotoDelete(index)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update Room</span>
          )}
        </button>
      </form>
    </div>
  );
}
