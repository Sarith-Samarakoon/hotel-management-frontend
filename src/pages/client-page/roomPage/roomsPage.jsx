import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaBed, FaWifi } from "react-icons/fa";
import toast from "react-hot-toast";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/footer";
import ReactPaginate from "react-paginate";
import Slider from "rc-slider"; // Install rc-slider for range sliders
import "rc-slider/assets/index.css";

export default function Rooms() {
  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [roomsByCategory, setRoomsByCategory] = useState({});
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500]); // Default price range
  const itemsPerPage = 8;

  useEffect(() => {
    if (!categoriesIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then((res) => {
          setCategories(res.data.categories);
          setCategoriesIsLoaded(true);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch categories!");
        });
    }
  }, [categoriesIsLoaded]);

  useEffect(() => {
    categories.forEach((category) => {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/rooms/by-category/${
            category.name
          }`
        )
        .then((res) => {
          setRoomsByCategory((prevState) => ({
            ...prevState,
            [category.name]: res.data.rooms,
          }));
        })
        .catch((err) => {
          console.error(err);
          toast.error(`Failed to fetch rooms for category ${category.name}`);
        });
    });
  }, [categories]);

  // Filtering logic
  const filteredCategories =
    selectedCategory === "All"
      ? categories
      : categories.filter((cat) => cat.name === selectedCategory);

  const filteredByPrice = filteredCategories.filter(
    (cat) => cat.price >= priceRange[0] && cat.price <= priceRange[1]
  );

  const offset = currentPage * itemsPerPage;
  const currentCategories = filteredByPrice.slice(
    offset,
    offset + itemsPerPage
  );
  const totalPages = Math.ceil(filteredByPrice.length / itemsPerPage);

  return (
    <div className="w-full bg-gray-100 min-h-screen bg-gradient-to-r from-indigo-100 via-blue-200 to-purple-200">
      <Header />
      <div className="flex flex-col lg:flex-row gap-8 p-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-pink-300 pb-2">
            Room Filters
          </h2>

          {/* Category Filter */}
          <div className="mb-6">
            <label
              htmlFor="category-filter"
              className="block text-sm font-medium text-pink-200 mb-2"
            >
              Select Category
            </label>
            <select
              id="category-filter"
              className="w-full px-4 py-2 bg-white text-gray-800 rounded-lg shadow focus:ring-pink-400 focus:ring-2 focus:outline-none transition-all duration-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label
              htmlFor="price-range"
              className="block text-sm font-medium text-pink-200 mb-2"
            >
              Price Range
            </label>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Slider
                range
                min={0}
                max={2000}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
                className="mt-2"
                trackStyle={[{ backgroundColor: "#ec4899" }]} // Pink for track
                handleStyle={[
                  { borderColor: "#ec4899", backgroundColor: "#ec4899" },
                  { borderColor: "#ec4899", backgroundColor: "#ec4899" },
                ]}
                railStyle={{ backgroundColor: "#d1d5db" }} // Cool gray for rail
              />
              <div className="mt-2 text-center text-gray-800 font-semibold">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="w-full lg:w-3/4">
          <h1 className="text-5xl font-extrabold mb-8 text-center tracking-tight leading-tight shadow-lg bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-900 text-white px-12 py-6 rounded-xl w-fit mx-auto transform hover:scale-105 transition-transform duration-300">
            Explore Our Rooms
          </h1>
          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative w-full h-60">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                      <FaBed size={50} />
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 text-xs font-bold rounded">
                    ${category.price} / Night
                  </span>
                </div>

                {/* Details Section */}
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    {/* Category Name */}
                    <h2 className="text-lg font-bold text-gray-800 truncate">
                      {category.name}
                    </h2>

                    {/* Ratings */}
                    <div className="flex items-center space-x-1 text-yellow-500">
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
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-gray-600 space-x-4">
                    <div className="flex items-center space-x-1">
                      <FaBed className="text-blue-500" />
                      <span className="text-sm">
                        {category.bedtype || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaWifi className="text-green-500" />
                      <span className="text-sm">Free Wi-Fi</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 text-sm">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {Array.isArray(category.features) &&
                    category.features.length > 0 ? (
                      category.features.map((feature, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {feature.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No features available
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center px-4 py-4 border-t border-gray-200">
                  <button
                    onClick={() =>
                      navigate(`/room-details/${category.name}`, {
                        state: {
                          category,
                          rooms: roomsByCategory[category.name],
                        },
                      })
                    }
                    className="py-3 px-10 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition"
                  >
                    View Rooms
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 py-3 bg-white">
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
      <Footer />
    </div>
  );
}
