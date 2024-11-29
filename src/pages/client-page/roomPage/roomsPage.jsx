import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTag, FaDollarSign, FaWifi, FaBed, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/footer";

export default function Rooms() {
  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [roomsByCategory, setRoomsByCategory] = useState({});
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

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

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header />
      <div className="p-8">
        <h1 className="text-5xl font-extrabold mb-12 text-center tracking-tight leading-tight shadow-lg bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-900 text-white px-12 py-6 rounded-xl w-fit mx-auto transform hover:scale-105 transition-transform duration-300">
          Explore Our Rooms
        </h1>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
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
                            i < Math.round(category.ratings || 0) // Default value of 0 if ratings is undefined
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
                    <span className="text-sm">{category.bedtype || "N/A"}</span>
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
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
