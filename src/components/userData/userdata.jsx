import axios from "axios";
import { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { FaSignOutAlt } from "react-icons/fa";

function UserTag(props) {
  const [name, setName] = useState("Guest");
  const [profileImage, setProfileImage] = useState(
    "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg" // Default profile picture
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true); // User is logged in if token exists
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("API Response:", res.data);

          const users = res.data.users; // API returns 'users' array
          const loggedInUserEmail = JSON.parse(atob(token.split(".")[1])).email; // Decode token to get email
          const user = users.find((u) => u.email === loggedInUserEmail); // Match user by email

          if (user) {
            setName(`${user.firstName || "Guest"} ${user.lastName || ""}`);
            setProfileImage(
              user.image ||
                "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
            ); // Use user image or default
          } else {
            console.error("Logged-in user not found in response.");
            setName("Guest");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setName("Guest");
          setProfileImage(
            "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
          );
        });
    } else {
      setIsLoggedIn(false); // User is not logged in if token is absent
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update login status
    window.location.href = "/login"; // Redirect to login page
  };

  const handleLogin = () => {
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="absolute right-0 flex items-center cursor-pointer mr-2">
      <img
        src={profileImage}
        alt="User Avatar"
        className="rounded-full w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
      />
      <span className="text-white ml-[5px] text-xl">{name}</span>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg text-white hover:text-gray-300 transition duration-300 flex items-center space-x-1"
        >
          <FaSignOutAlt size={20} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="ml-4 bg-green-600 text-white font-bold px-4 py-2 rounded-lg text-white hover:text-gray-300 transition duration-300 flex items-center space-x-1"
        >
          <FaSignOutAlt size={20} />
          <span className="hidden sm:inline">LogIn / SignUp</span>
        </button>
      )}
    </div>
  );
}

export default UserTag;
