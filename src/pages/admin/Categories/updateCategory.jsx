import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import FaStar for star ratings

export default function UpdateCategoryForm() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state == null) {
    window.location.href = "/admin/category";
  }

  const [name, setName] = useState(location.state.name);
  const [price, setPrice] = useState(location.state.price);
  const [features, setFeatures] = useState(location.state.features.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [bedtype, setBedtype] = useState(location.state.bedtype);
  const [ratings, setRatings] = useState(location.state.ratings || 0); // Star ratings
  const [hoverRating, setHoverRating] = useState(0); // For hover effect on stars
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
      const featuresArray = features.split(",");

      // Validate input
      if (!name || !bedtype) {
        toast.error("Please fill in all required fields.");
        setIsLoading(false);
        return;
      }

      // Prepare the category info object with the existing image by default
      const categoryInfo = {
        price,
        features: featuresArray,
        description,
        bedtype,
        ratings, // Include ratings in payload
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

            // Update the image URL in the category info
            categoryInfo.image = data.publicUrl;

            // Send updated category info to the backend
            return axios.put(
              import.meta.env.VITE_BACKEND_URL + "/api/category/" + name,
              categoryInfo,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
          })
          .then(() => {
            toast.success("Category updated successfully!");
            navigate("/admin/category");
          })
          .catch((err) => {
            console.error("Error updating category:", err.message);
            toast.error("Error updating category!");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        // If no new image is uploaded, only update the other details
        axios
          .put(
            import.meta.env.VITE_BACKEND_URL + "/api/category/" + name,
            categoryInfo,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then(() => {
            toast.success("Category updated successfully!");
            navigate("/admin/category");
          })
          .catch((err) => {
            console.error("Error updating category:", err.message);
            toast.error("Error updating category!");
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
        <h1 className="text-2xl font-bold mb-4 text-center">Update Category</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Category Name */}
            <div>
              <label className="block font-medium mb-1">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                required
                disabled
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
                required
              />
            </div>

            {/* Bed Type */}
            <div>
              <label className="block font-medium mb-1">Bed Type</label>
              <select
                value={bedtype}
                onChange={(e) => setBedtype(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a bed type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
                <option value="Twin">Twin</option>
              </select>
            </div>

            {/* Ratings */}
            <div>
              <label className="block font-medium mb-1">Ratings</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      (hoverRating || ratings) >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRatings(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Features */}
            <div>
              <label className="block font-medium mb-1">Features</label>
              <input
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter features (comma-separated)"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update Category</span>
          )}
        </button>
      </form>
    </div>
  );
}
