import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddRoomForm() {
  const [roomId, setRoomId] = useState("");
  const [category, setCategory] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [specialDescription, setSpecialDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [available, setAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload photos to Supabase
      const uploadedPhotos = await Promise.all(
        photos.map((photo) =>
          uploadMediaToSupabase(photo).then(() => {
            const { data, error } = supabase.storage
              .from("Images")
              .getPublicUrl(photo.name);

            if (error) {
              throw new Error("Failed to get public URL for the photo");
            }

            return data.publicUrl;
          })
        )
      );

      // Prepare payload
      const roomInfo = {
        roomId,
        category,
        maxGuests,
        photos: uploadedPhotos,
        specialDescription,
        notes,
        available,
      };

      console.log("Payload sent to backend:", roomInfo);

      // Send payload to backend
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/rooms",
        roomInfo,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setIsLoading(false);
      toast.success("Room created successfully!");

      // Reset form
      setRoomId("");
      setCategory("");
      setMaxGuests(1);
      setPhotos([]);
      setSpecialDescription("");
      setNotes("");
      setAvailable(true);
    } catch (err) {
      console.error("Error creating room:", err.message);
      setIsLoading(false);
      toast.error("Error creating room!");
    }
  };

  const handlePhotoUpload = (e) => {
    setPhotos([...photos, ...e.target.files]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-screen lg:h-[80vh] md:h-[70vh] sm:h-[60vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-[720px] space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Room</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Room ID */}
            <div>
              <label className="block font-medium mb-1">Room ID</label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room ID"
                required
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
                placeholder="Enter max guests"
                min={1}
                required
              />
            </div>

            {/* Photos */}
            <div>
              <label className="block font-medium mb-1">Photos</label>
              <input
                type="file"
                multiple
                onChange={handlePhotoUpload}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {photos.length > 0 && (
                <div className="mt-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm">{photo.name}</span>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Special Description */}
            <div>
              <label className="block font-medium mb-1">
                Special Description
              </label>
              <textarea
                value={specialDescription}
                onChange={(e) => setSpecialDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter special description"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block font-medium mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any additional notes"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block font-medium mb-1">Availability</label>
              <select
                value={available}
                onChange={(e) => setAvailable(e.target.value === "true")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">Available</option>
                <option value="false">Booked</option>
              </select>
            </div>
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
            <span>Add Room</span>
          )}
        </button>
      </form>
    </div>
  );
}
