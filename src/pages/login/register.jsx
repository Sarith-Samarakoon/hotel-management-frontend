import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineWhatsApp,
  AiOutlinePhone,
  AiOutlineTeam,
} from "react-icons/ai";
import { uploadMediaToSupabase, supabase } from "../../utils/mediaUpload";

export default function Register() {
  // State variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("customer");
  const [image, setImage] = useState(null); // Profile picture state
  const [emailVerified] = useState(true);
  const [disabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for submit button

  // Function to handle form submission
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form behavior
    setIsLoading(true); // Enable loading state

    // Image upload and user registration logic
    uploadMediaToSupabase(image)
      .then((res) => {
        // Retrieve public URL of the uploaded image
        const { data, error } = supabase.storage
          .from("Images")
          .getPublicUrl(image.name);

        if (error) {
          throw new Error("Failed to get public URL for the image");
        }

        const publicUrl = data.publicUrl;
        console.log("Uploaded image public URL:", publicUrl);

        // Prepare the user registration payload
        const userData = {
          email,
          password,
          firstName,
          lastName,
          whatsApp,
          phone,
          type,
          disabled,
          emailVerified,
          image: publicUrl, // Add profile picture URL
        };

        console.log("Payload sent to backend:", userData);

        // Send the registration data to the backend
        return axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/users",
          userData
        );
      })
      .then((res) => {
        console.log("User registered successfully:", res.data);

        // Display success message and reset form fields
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setWhatsApp("");
        setPhone("");
        setType("customer");
        setImage(null);
        setIsLoading(false); // Disable loading state
      })
      .catch((err) => {
        console.error("Error during registration:", err.message);

        // Display error message
        toast.error("Registration failed! Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setIsLoading(false); // Disable loading state
      });
  };

  return (
    <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
      <div className="w-[800px] h-[700px] backdrop-blur-md rounded-lg flex flex-col items-center justify-start p-4 relative">
        <h1 className="text-3xl font-bold text-white text-center">
          Create an Account
        </h1>

        {/* Image Upload Field */}
        <div className="flex flex-col items-center mt-6">
          <label className="text-white text-sm mb-2">
            Upload Profile Picture
          </label>
          <div className="relative w-[100px] h-[100px]">
            {/* Placeholder or uploaded image */}
            <img
              src={
                image
                  ? URL.createObjectURL(image) // Preview uploaded image
                  : "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg" // Placeholder image
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-[2px] border-white cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()} // Trigger file input on click
            />
            <input
              id="fileInput"
              type="file"
              className="hidden" // Hide the file input
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])} // Handle image selection
            />
          </div>
        </div>

        {/* Form Fields */}
        <form className="w-[90%] flex flex-wrap justify-between mt-[30px] space-y-[10px]">
          {/* Left Column */}
          <div className="w-[45%] flex flex-col space-y-[10px]">
            <label className="text-white text-sm">Email Address</label>
            <div className="relative w-full">
              <AiOutlineMail
                className="absolute left-3 top-[15px] text-white"
                size={24}
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="text-white text-sm">Password</label>
            <div className="relative w-full">
              <AiOutlineLock
                className="absolute left-3 top-[15px] text-white"
                size={24}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label className="text-white text-sm">First Name</label>
            <div className="relative w-full">
              <AiOutlineUser
                className="absolute left-3 top-[15px] text-white"
                size={24}
              />
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <label className="text-white text-sm">Last Name</label>
            <div className="relative w-full">
              <AiOutlineUser
                className="absolute left-3 top-[15px] text-white"
                size={24}
              />
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[45%] flex flex-col space-y-[10px]">
            <label className="text-white text-sm">WhatsApp Number</label>
            <div className="relative w-full">
              <AiOutlineWhatsApp
                className="absolute left-3 top-[15px] text-white"
                size={24}
              />
              <input
                type="text"
                placeholder="Enter your WhatsApp number"
                className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
                value={whatsApp}
                onChange={(e) => setWhatsApp(e.target.value)}
              />
            </div>

            <label className="text-white text-sm">Phone Number</label>
            <div className="relative w-full">
              <AiOutlinePhone
                className="absolute left-3 top-[15px] text-white"
                size={24}
              />
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <label className="text-white text-sm">User Type</label>
            <div className="relative w-full">
              <AiOutlineTeam
                className="absolute left-3 top-[15px] text-white"
                size={24}
              />
              <select
                className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option className="text-black font-bold" value="customer">
                  Customer
                </option>
                <option className="text-black font-bold" value="admin">
                  Admin
                </option>
              </select>
            </div>
          </div>
        </form>

        {/* Submit Button */}
        <button
          className="w-[50%] mt-6 bg-red-500 h-[50px] text-white rounded-lg font-bold p-[15px] hover:bg-red-700 transition-all duration-300"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <Link to="/login" className="absolute bottom-[10px] text-white">
          Already have an account?{" "}
          <span className="hover:text-red-500 font-bold transition-colors duration-300">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
}
