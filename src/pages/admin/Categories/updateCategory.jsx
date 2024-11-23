import { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload";
import { getDownloadURL } from "firebase/storage";
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

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     // Form submission logic here
  //     console.log({
  //       name,
  //       price,
  //       features: features.split(","), // Convert features to an array
  //       description,
  //       image,
  //     });
  //     const featuresArray = features.split(",");
  //     if (image == null) {
  //       const categoryInfo = {
  //         price: price,
  //         features: featuresArray,
  //         description: description,
  //         image: location.state.image,
  //       };
  //       axios
  //         .put(
  //           import.meta.env.VITE_BACKEND_URL + "/api/category/" + name,
  //           categoryInfo,
  //           {
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           console.log(res);
  //           setIsLoading(true);
  //           toast.success("Category updated successfully!", {
  //             position: "top-right",
  //             autoClose: 3000, // Close after 3 seconds
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //           navigate("/admin/category");
  //         });
  //     }else{
  //     uploadMedia(image).then((snapshot) => {
  //       getDownloadURL(snapshot.ref).then((url) => {
  //         console.log("File uploaded successfully:", url);
  //         const categoryInfo = {
  //           price: price,
  //           features: featuresArray,
  //           description: description,
  //           image: url,
  //         };
  //         axios
  //           .put(
  //             import.meta.env.VITE_BACKEND_URL + "/api/category/" + name,
  //             categoryInfo,
  //             {
  //               headers: {
  //                 Authorization: "Bearer " + token,
  //               },
  //             }
  //           )
  //           .then((res) => {
  //             console.log(res);
  //             setIsLoading(true);
  //             toast.success("Category updated successfully!", {
  //               position: "top-right",
  //               autoClose: 3000, // Close after 3 seconds
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //             });
  //             navigate("/admin/category");
  //           });
  //       });
  //     });
  //   }
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const featuresArray = features.split(",");

      const categoryInfo = {
        price: price,
        features: featuresArray,
        description: description,
        image: image,
      };

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
          setIsLoading(false);
          toast.success("Category created successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/admin/category");
          }, 2000);
        })
        .catch((err) => {
          console.error("Error creating category:", err.message);
          setIsLoading(false);
          toast.error("Error creating category!", {
            position: "top-right",
            autoClose: 2000,
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
        {/* <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
            required
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
