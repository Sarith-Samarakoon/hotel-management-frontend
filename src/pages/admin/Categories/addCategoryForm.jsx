import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddCategoryForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
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

      // Upload the image to Supabase
      uploadMediaToSupabase(image)
        .then((res) => {
          // Get the public URL of the uploaded image
          const { data, error } = supabase.storage
            .from("Images")
            .getPublicUrl(image.name);
          if (error) {
            throw new Error("Failed to get public URL for the image");
          }

          const publicUrl = data.publicUrl;
          console.log("Uploaded image public URL:", publicUrl); // Debug log

          // Prepare the category info payload
          const categoryInfo = {
            name,
            price,
            features: featuresArray,
            description,
            image: publicUrl, // Use the public URL from Supabase
          };

          // Post the category info to the backend
          return axios.post(
            import.meta.env.VITE_BACKEND_URL + "/api/category",
            categoryInfo,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
        })
        .then((res) => {
          console.log("Category created successfully:", res.data);
          setIsLoading(false); // Stop loading
          // Show success toast
          toast.success("Category created successfully!", {
            position: "top-right",
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // Optional: Reset the form fields
          setName("");
          setPrice(0);
          setFeatures("");
          setDescription("");
          setImage("");
        })
        .catch((err) => {
          console.error("Error creating category:", err.message);
          setIsLoading(false); // Stop loading on error
          // Show error toast
          toast.error("Error creating category!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }, 1000);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Add New Category</h1>

        {/* Category Name */}
        <div>
          <label className="block font-medium mb-1">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
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
            <span>Add Category</span>
          )}
        </button>
      </form>
    </div>
  );
}
