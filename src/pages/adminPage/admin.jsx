import { Route, Routes, Link, useLocation } from "react-router-dom";
import Dashboard from "../admin/Dashboard/dashboard";
import AdminSettings from "../admin/Dashboard/adminSettings";
import AdminBooking from "../admin/Booking/adminBooking";
import AdminCategories from "../admin/Categories/adminCategories";
import AdminGalleryItems from "../admin/GalleryItem/galleryItem";
import AdminFeedback from "../admin/Feedback/feedback";
import AdminRooms from "../admin/Rooms/rooms";
import AdminUsers from "../admin/Users/users";
import AddCategoryForm from "../admin/Categories/addCategoryForm";
import AddRoomForm from "../admin/Rooms/addRooms";
import UpdateRoomForm from "../admin/Rooms/updateRooms";
import UpdateCategoryForm from "../admin/Categories/updateCategory";
import AddGalleryItemForm from "../admin/GalleryItem/AddGalleryItemForm";
import UpdateGalleryItemForm from "../admin/GalleryItem/UpdateGalleryForm";
import Staff from "../admin/Staff/adminStaff";
import AddStaffForm from "../admin/Staff/addStaff";
import UpdateStaffForm from "../admin/Staff/updateStaff";
import Event from "../admin/Events/adminEvents";
import AddEventForm from "../admin/Events/addEvent";
import UpdateEventForm from "../admin/Events/updateEvent";
import {
  FaHeart,
  FaBell,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaCog,
} from "react-icons/fa"; // Import icons
import { CiBookmarkCheck } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import {
  FaHotel,
  FaUsers,
  FaComments,
  FaImages,
  FaChartLine,
} from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const location = useLocation();

  // State to store admin profile data
  const [adminProfile, setAdminProfile] = useState({
    firstName: "Admin",
    lastName: "",
    email: "",
    image:
      "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg", // Default profile image
  });

  // State for live time
  const [currentTime, setCurrentTime] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme state

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const users = res.data.users; // Assume the API returns a list of users
          const loggedInUserEmail = JSON.parse(atob(token.split(".")[1])).email; // Decode email from token
          const user = users.find((u) => u.email === loggedInUserEmail); // Find the logged-in user by email

          if (user) {
            const { firstName, lastName, email, image } = user;
            setAdminProfile({
              firstName: firstName || "Admin",
              lastName: lastName || "",
              email: email || "Not Available",
              image:
                image ||
                "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg", // Use placeholder if no image
            });
          } else {
            console.error("Logged-in user not found in response.");
          }
        })
        .catch((err) => {
          console.error("Error fetching admin profile:", err.message);
        });
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-[20%] bg-gradient-to-b from-blue-600 to-blue-900 h-full flex flex-col text-white shadow-xl">
        {/* Admin Profile Section */}
        <div className="flex flex-col items-center bg-blue-700 py-6 px-4 rounded-b-xl shadow-md">
          <div className="relative w-20 h-20">
            <img
              src={
                adminProfile.image ||
                "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
              } // Dynamic or placeholder image
              alt="Admin Profile"
              className="w-full h-full rounded-full border-4 border-white shadow-lg"
            />
            {/* Presence Indicator */}
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
          </div>

          <h2 className="text-lg font-bold mt-4">
            {adminProfile.firstName} {adminProfile.lastName}
          </h2>
          <p className="text-sm text-gray-300">{adminProfile.email}</p>
        </div>

        {/* Sidebar Title */}
        <div className="text-center py-4 font-bold text-xl tracking-wide bg-blue-800 shadow-md">
          Admin Dashboard
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-6 space-y-3">
          {[
            {
              name: "Dashboard",
              icon: <FaChartLine />,
              link: "/admin/",
            },
            {
              name: "Bookings",
              icon: <CiBookmarkCheck />,
              link: "/admin/booking",
            },
            {
              name: "Categories",
              icon: <MdOutlineCategory />,
              link: "/admin/category",
            },
            { name: "Rooms", icon: <FaHotel />, link: "/admin/room" },
            { name: "Users", icon: <HiUsers />, link: "/admin/user" },
            { name: "Feedback", icon: <FaComments />, link: "/admin/feedback" },
            {
              name: "Gallery Items",
              icon: <FaImages />,
              link: "/admin/gallery-item",
            },
            { name: "Staff", icon: <FaUsers />, link: "/admin/staff" }, // New Staff Link
            { name: "Events", icon: <FaBell />, link: "/admin/event" }, // New Event Link
          ].map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className={`flex items-center gap-3 px-6 py-1 text-3xl font-medium rounded-lg transition-colors ${
                location.pathname === item.link
                  ? "bg-blue-600 shadow-xl"
                  : "hover:bg-blue-500 hover:shadow-sm"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`w-[80%] overflow-y-auto transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <header
          className={`${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } shadow px-6 py-4 flex justify-between items-center transition-colors duration-300`}
        >
          {/* Title */}
          <h1 className="text-2xl font-extrabold tracking-wide text-blue-600 sm:text-3xl md:text-4xl lg:text-5xl">
            Golden Horizon Villa{" "}
            <span className="text-teal-600">Admin Panel</span>
          </h1>

          {/* Date, Time, Icons, and Logout */}
          <div className="flex items-center gap-6">
            {/* Date and Time */}
            <div
              className={`flex flex-col items-center justify-center ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-blue-100 text-blue-900"
              } rounded-lg px-4 py-2 shadow-sm`}
            >
              <p className="text-sm font-medium">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-lg font-bold">
                {new Date().toLocaleTimeString()}
              </p>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-7">
              <FaHeart
                className={`${
                  isDarkMode ? "text-red-400" : "text-red-500"
                } text-xl hover:scale-110 transition-transform cursor-pointer`}
                title="Favorites"
              />
              <FaEnvelope
                className={`${
                  isDarkMode ? "text-blue-400" : "text-blue-500"
                } text-xl hover:scale-110 transition-transform cursor-pointer`}
                title="Messages"
              />
              <FaBell
                className={`${
                  isDarkMode ? "text-yellow-400" : "text-yellow-500"
                } text-xl hover:scale-110 transition-transform cursor-pointer`}
                title="Notifications"
              />
              <Link to="/admin/settings" title="Settings">
                <FaCog
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } text-xl hover:scale-110 transition-transform cursor-pointer`}
                />
              </Link>
            </div>

            {/* Theme Toggle */}
            <button
              className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon />}
            </button>

            {/* Logout Button */}
            <button
              className={`${
                isDarkMode
                  ? "bg-red-700 hover:bg-red-600"
                  : "bg-red-500 hover:bg-red-700"
              } text-white px-4 py-2 rounded-lg transition-colors`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/booking" element={<AdminBooking />} />
            <Route path="/category" element={<AdminCategories />} />
            <Route path="/add-category" element={<AddCategoryForm />} />
            <Route path="/update-category" element={<UpdateCategoryForm />} />
            <Route path="/room" element={<AdminRooms />} />
            <Route path="/update-room" element={<UpdateRoomForm />} />
            <Route path="/user" element={<AdminUsers />} />
            <Route path="/feedback" element={<AdminFeedback />} />
            <Route path="/gallery-item" element={<AdminGalleryItems />} />
            <Route path="/add-gallery-item" element={<AddGalleryItemForm />} />
            <Route
              path="/update-gallery-item"
              element={<UpdateGalleryItemForm />}
            />
            <Route path="/staff" element={<Staff />} />
            <Route path="/add-staff" element={<AddStaffForm />} />
            <Route path="/update-staff" element={<UpdateStaffForm />} />
            <Route path="/event" element={<Event />} />
            <Route path="/add-event" element={<AddEventForm />} />
            <Route path="/update-event" element={<UpdateEventForm />} />
            <Route path="/add-room" element={<AddRoomForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
