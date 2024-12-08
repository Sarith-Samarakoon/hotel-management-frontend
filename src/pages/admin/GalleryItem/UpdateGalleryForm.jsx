import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateGalleryItemForm() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if no data is passed
  if (location.state == null) {
    window.location.href = "/admin/gallery-items";
  }

  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [image, setImage] = useState(location.state.image);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Prepare the gallery item info with the existing image by default
      const galleryItemInfo = {
        name: name,
        description: description,
        image: location.state.image, // Default to the existing image
      };

      // Check if a new image is uploaded
      if (image && typeof image === "object" && image.name) {
        // Upload the new image to Supabase
        uploadMediaToSupabase(image)
          .then(() => {
            // Retrieve the public URL of the uploaded image
            const { data, error } = supabase.storage
              .from("Images")
              .getPublicUrl(image.name);

            if (error) {
              throw new Error("Failed to get public URL for the image");
            }

            // Update the image URL in the gallery item info
            galleryItemInfo.image = data.publicUrl;

            // Send updated gallery item info to the backend
            return axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${
                location.state._id
              }`,
              galleryItemInfo,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          })
          .then((res) => {
            console.log("Gallery item updated successfully:", res.data);
            toast.success("Gallery item updated successfully!");
            setTimeout(() => {
              navigate("/admin/gallery-item");
            }, 2000);
          })
          .catch((err) => {
            console.error("Error updating gallery item:", err.message);
            toast.error("Error updating gallery item!");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        // If no new image is uploaded, only update the other details
        axios
          .put(
            `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${
              location.state._id
            }`,
            galleryItemInfo,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log("Gallery item updated successfully:", res.data);
            toast.success("Gallery item updated successfully!");
            setTimeout(() => {
              navigate("/admin/gallery-item");
            }, 2000);
          })
          .catch((err) => {
            console.error("Error updating gallery item:", err.message);
            toast.error("Error updating gallery item!");
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
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Update Gallery Item</h1>

        {/* Gallery Item Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter item name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            required
          ></textarea>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update Gallery Item</span>
          )}
        </button>
      </form>
    </div>
  );
}
