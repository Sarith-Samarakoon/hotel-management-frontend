import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateSettings({ closeModal }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [email, setEmail] = useState(location.state.email);
  const [phone, setPhone] = useState(location.state.phone);
  const [whatsApp, setWhatsApp] = useState(location.state.whatsApp);
  const [image, setImage] = useState(location.state.image);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userInfo = {
      firstName,
      lastName,
      email,
      phone,
      whatsApp,
      image: location.state.image, // Default to the existing image
    };

    const updateUserAPI = (updatedInfo) =>
      axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${location.state._id}`,
        updatedInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

    if (image && typeof image === "object" && image.name) {
      // Upload the new image to Supabase
      uploadMediaToSupabase(image)
        .then(() => {
          const { data, error } = supabase.storage
            .from("Images")
            .getPublicUrl(image.name);

          if (error) {
            throw new Error("Failed to get public URL for the image");
          }

          userInfo.image = data.publicUrl;
          return updateUserAPI(userInfo);
        })
        .then(() => {
          toast.success("Settings updated successfully!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          console.error("Error updating settings:", err.message);
          toast.error("Error updating settings!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      updateUserAPI(userInfo)
        .then(() => {
          toast.success("Settings updated successfully!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          console.error("Error updating settings:", err.message);
          toast.error("Error updating settings!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageUpload").click();
  };

  return (
    <div className="flex items-center justify-center min-h bg-gradient-to-r from-gray-100 to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Settings
        </h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-gray-300 group-hover:border-blue-500 transition-all cursor-pointer"
              onClick={handleImageClick}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <p className="text-sm text-white font-medium">Change</p>
            </div>
          </div>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <p className="text-sm text-gray-600 mt-2">
            Click on the image to update
          </p>
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            placeholder="Enter first name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            placeholder="Enter last name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            placeholder="Enter email"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            placeholder="Enter phone number"
          />
        </div>

        {/* WhatsApp */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp Number
          </label>
          <input
            type="text"
            value={whatsApp}
            onChange={(e) => setWhatsApp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            placeholder="Enter WhatsApp number"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition-all w-full mr-2"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 shadow-md transition-all w-full ml-2"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
