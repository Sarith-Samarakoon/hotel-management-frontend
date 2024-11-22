import { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import toast from "react-hot-toast";

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

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //   setIsLoading(true);
  //     // Form submission logic here
  //     console.log({
  //       name,
  //       price,
  //       features: features.split(","), // Convert features to an array
  //       description,
  //       image,
  //     });
  //     const featuresArray = features.split(",");
  //     uploadMedia(image).then((snapshot) => {
  //       getDownloadURL(snapshot.ref).then((url) => {
  //         console.log("File uploaded successfully:", url);
  //         const categoryInfo = {
  //           name: name,
  //           price: price,
  //           features: featuresArray,
  //           description: description,
  //         };

  //         axios
  //           .post(
  //             import.meta.env.VITE_BACKEND_URL + "/api/category",
  //             categoryInfo,
  //             {
  //               headers: {
  //                 Authorization: "Bearer " + token,
  //               },
  //             }
  //           )
  //           .then((res) => {
  //             console.log(res);
  //           });
  //       });
  //     });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Introduce a delay using setTimeout
    setTimeout(() => {
      // Convert features to an array
      const featuresArray = features.split(",");

      // Construct the category information object
      const categoryInfo = {
        name: name,
        price: price,
        features: featuresArray,
        description: description,
        image: image,
      };

      axios
        .post(
          import.meta.env.VITE_BACKEND_URL + "/api/category",
          categoryInfo,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log("Category created successfully:", res.data);
          setIsLoading(false); // Stop loading
          toast.success("Category created successfully!");
        })
        .catch((err) => {
          console.error("Error creating category:", err.message);
          setIsLoading(false); // Stop loading on error
          toast.error("Error creating category!");
        });
    }, 2000); // Delay for 1 second
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
            <span>Add Category</span>
          )}
        </button>
      </form>
    </div>
  );
}
