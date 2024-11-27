import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

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
      if (!name) {
        console.error("Category name is missing.");
        toast.error("Invalid category name.");
        setIsLoading(false);
        return;
      }

      // Prepare the category info object with the existing image by default
      const categoryInfo = {
        price: price,
        features: featuresArray,
        description: description,
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
          .then((res) => {
            console.log("Category updated successfully:", res.data);
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
          .then((res) => {
            console.log("Category updated successfully:", res.data);
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
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Update Category</h1>

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
