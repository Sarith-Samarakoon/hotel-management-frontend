import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";

export default function AdminGalleryItems() {
  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryIsLoaded, setGalleryIsLoaded] = useState(false);
  const [galleryCurrentPage, setGalleryCurrentPage] = useState(0);
  const [galleryTotalPages, setGalleryTotalPages] = useState(1);
  const galleryItemsPerPage = 5; // Items per page for gallery

  const navigate = useNavigate();

  useEffect(() => {
    fetchGalleryItems(galleryCurrentPage);
  }, [galleryCurrentPage]);

  const fetchGalleryItems = (page) => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery?page=${
          page + 1
        }&limit=${galleryItemsPerPage}`
      )
      .then((res) => {
        setGalleryItems(res.data.list);
        setGalleryTotalPages(res.data.pagination.totalPages);
        setGalleryIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching gallery items:", err.message);
        toast.error("Failed to fetch gallery items!");
      });
  };

  function deleteGalleryItem(id) {
    confirmAlert({
      title: "Confirm Deletion",
      message:
        "Are you sure you want to delete this gallery item? This action cannot be undone.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + id, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              .then(() => {
                setIsLoaded(false);
                toast.success("Gallery item has been deleted successfully!");
              })
              .catch((err) => {
                console.error("Error deleting gallery item:", err.message);
                toast.error("Error deleting gallery item!");
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing when No is clicked
          },
        },
      ],
    });
  }

  const handlePlusClick = () => {
    navigate("/admin/add-gallery-item");
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePlusClick}
        className="bg-gradient-to-r from-pink-500 to-red-600 w-[60px] h-[60px] rounded-full text-3xl text-white flex justify-center items-center fixed bottom-5 right-5 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      >
        <FaPlus />
      </button>
      <div className="p-4">
        <h1 className="text-4xl font-extrabold mb-8  tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
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
                <td className="py-4 px-6 border-b text-gray-700 flex space-x-2 mt-6">
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
        <div className="flex justify-center mt-6">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={galleryTotalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={({ selected }) => setGalleryCurrentPage(selected)}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}
