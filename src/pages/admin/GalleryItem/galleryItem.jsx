import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function AdminGalleryItems() {
  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery/")
        .then((res) => {
          setGalleryItems(res.data.list);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching gallery items:", err.message);
          toast.error("Failed to fetch gallery items!");
        });
    }
  }, [isLoaded]);

  function deleteGalleryItem(id) {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setIsLoaded(false);
        toast.success("Galley item has been deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting gallery item:", err.message);
        toast.error("Error deleting gallery item!");
      });
  }

  const handlePlusClick = () => {
    navigate("/admin/add-gallery-item");
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePlusClick}
        className="bg-red-600 w-[60px] h-[60px] rounded-full text-2xl text-center flex justify-center items-center fixed bottom-5 right-7"
      >
        <FaPlus color="white" />
      </button>
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-6 text-white">
          Gallery Items
        </h1>
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-6 border-b font-medium">Name</th>
              <th className="py-3 px-6 border-b font-medium">Image</th>
              <th className="py-3 px-6 border-b font-medium">Description</th>
              <th className="py-3 px-6 border-b font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleryItems.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 border-b text-gray-700">
                  {item.name}
                </td>
                <td className="py-4 px-6 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full shadow-md"
                  />
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {item.description}
                </td>
                <td className="py-4 px-6 border-b text-gray-700 flex space-x-2">
                  <button
                    onClick={() => deleteGalleryItem(item._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <Link
                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
                    to={"/admin/update-gallery-item"}
                    state={item}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
