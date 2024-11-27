import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddGalleryItemForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Upload the image to Supabase
      uploadMediaToSupabase(image)
        .then(() => {
          // Retrieve the public URL of the uploaded image
          const { data, error } = supabase.storage
            .from("Images")
            .getPublicUrl(image.name);

          if (error) {
            throw new Error("Failed to get public URL for the image");
          }

          const publicUrl = data.publicUrl;
          console.log("Uploaded image public URL:", publicUrl); // Debug log

          // Prepare the gallery item info payload
          const galleryItemInfo = {
            item: {
              name: name,
              description: description,
              image: publicUrl,
            },
          };

          // Send the gallery item info to the backend
          return axios.post(
            import.meta.env.VITE_BACKEND_URL + "/api/gallery",
            galleryItemInfo,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
        })
        .then((res) => {
          console.log("Gallery item added successfully:", res.data);
          setIsLoading(false); // Stop loading
          // Show success toast
          toast.success("Gallery item added successfully!", {
            position: "top-right",
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/admin/gallery-item"); // Redirect to gallery items page
          }, 2000);
        })
        .catch((err) => {
          console.error("Error adding gallery item:", err.message);
          setIsLoading(false); // Stop loading on error
          // Show error toast
          toast.error("Error adding gallery item!", {
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
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg"
      >
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 mt-1 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Add Gallery Item</span>
          )}
        </button>
      </form>
    </div>
  );
}
