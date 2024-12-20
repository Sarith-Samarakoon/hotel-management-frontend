import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AdminCategories() {
  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // Number of categories per page

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const fetchCategories = (page) => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/category?page=${
          page + 1
        }&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCategories(res.data.categories);
        setTotalPages(res.data.pagination.totalPages);
        setCategoriesIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch categories!");
      });
  };

  const deleteCategory = (name) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete the category "${name}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/category/${name}`,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .then(() => {
                fetchCategories(currentPage);
                toast.success("Category deleted successfully!");
              })
              .catch(() => {
                toast.error("Error Deleting Category!");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handlePlusClick = () => {
    navigate("/admin/add-category");
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
        <h1 className="text-4xl font-extrabold mb-8 tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
          Categories
        </h1>
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-6 border-b font-medium">Category Name</th>
              <th className="py-3 px-6 border-b font-medium">Price</th>
              <th className="py-3 px-6 border-b font-medium">Bed Type</th>
              <th className="py-3 px-6 border-b font-medium">Features</th>
              <th className="py-3 px-6 border-b font-medium">Description</th>
              <th className="py-3 px-6 border-b font-medium">Ratings</th>
              <th className="py-3 px-6 border-b font-medium">Image</th>
              <th className="py-3 px-6 border-b font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-4 px-6  text-gray-700">{category.name}</td>
                <td className="py-4 px-6  text-gray-700">${category.price}</td>
                <td className="py-4 px-6  text-gray-700">{category.bedtype}</td>
                <td className="py-4 px-6  text-gray-700">
                  {category.features.join(", ")}
                </td>
                <td className="py-4 px-6  text-gray-700">
                  {category.description}
                </td>
                <td className="py-4 px-6  text-yellow-500 flex mt-8">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(category.ratings || 0)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  <span className="ml-2 text-sm text-gray-500">
                    ({(category.ratings || 0).toFixed(1)})
                  </span>
                </td>
                <td className="py-4 px-6 ">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded-full shadow-md"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-4 px-6  text-gray-700 flex space-x-2">
                  <button
                    onClick={() => deleteCategory(category.name)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <Link
                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
                    to={"/admin/update-category"}
                    state={category}
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
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={({ selected }) => setCurrentPage(selected)}
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
