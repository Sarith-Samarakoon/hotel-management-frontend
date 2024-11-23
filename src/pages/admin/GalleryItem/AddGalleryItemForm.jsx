import { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload.js";
import { getDownloadURL } from "firebase/storage";
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

  //   const handleImageChange = (e) => {
  //     setImage(e.target.files[0]);
  //   };

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     setIsLoading(true);

  //     uploadMedia(image)
  //       .then((snapshot) => {
  //         getDownloadURL(snapshot.ref).then((url) => {
  //           const galleryItemInfo = {
  //             name: name,
  //             description: description,
  //             image: url,
  //           };

  //           axios
  //             .post(
  //               import.meta.env.VITE_BACKEND_URL + "/api/gallery",
  //               galleryItemInfo,
  //               {
  //                 headers: {
  //                   Authorization: "Bearer " + token,
  //                 },
  //               }
  //             )
  //             .then((res) => {
  //               console.log(res);
  //               setIsLoading(false);
  //               navigate("/admin/gallery-items"); // Redirect to gallery page after adding item
  //             })
  //             .catch((err) => {
  //               console.error("Error adding gallery item:", err);
  //               setIsLoading(false);
  //             });
  //         });
  //       })
  //       .catch((err) => {
  //         console.error("Error uploading image:", err);
  //         setIsLoading(false);
  //       });
  //   }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const galleryItemInfo = {
        item: {
          name: name,
          description: description,
          image: image,
        },
      };

      console.log("Gallery Item Info:", galleryItemInfo); // Debug API payload

      axios
        .post(
          import.meta.env.VITE_BACKEND_URL + "/api/gallery/",
          galleryItemInfo,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log("Gallery item added successfully:", res.data);
          setIsLoading(false);
          setTimeout(() => {
            navigate("/admin/gallery-item");
          }, 3000);
          toast.success("Gallery item added successfully!", {
            position: "top-right",
            autoClose: 2000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.error("Error adding gallery item:", err.message);
          setIsLoading(false);
          toast.error("Error adding gallery item!", {
            position: "top-right",
            autoClose: 2000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }, 2000);
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

        {/* <div>
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 mt-1"
            required
          />
        </div> */}

        <div className="mt-4">
          <label className="block text-gray-700">Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg"
            placeholder="Enter image URL"
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
