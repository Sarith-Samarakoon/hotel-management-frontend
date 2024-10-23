import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineWhatsApp,
  AiOutlinePhone,
  AiOutlineTeam,
} from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("customer");
  const [emailVerified] = useState(true);
  const [disabled] = useState(false);

  function handleLogin() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        whatsApp: whatsApp,
        phone: phone,
        type: type,
        disabled: disabled,
        emailVerified: emailVerified,
      })
      .then((res) => {
        console.log(res);

        // Reset form fields after successful submission
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setWhatsApp("");
        setPhone("");
        setType("customer");

        // Show success alert
        alert("Sign up successful!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
      <div className="w-[400px] h-[850px] backdrop-blur-md rounded-lg flex flex-col items-center justify-center relative">
        <h1 className="text-3xl p-[15px] font-bold text-white absolute top-[10px] text-center">
          Sign Up
        </h1>
        <div className="w-[80%] flex flex-col space-y-[10px] mb-[70px]">
          {/* Email input with icon */}
          <label className="text-white text-sm">Email Address</label>
          <div className="relative w-full">
            <AiOutlineMail
              className="absolute left-3 top-[15px] text-white"
              size={24}
            />
            <input
              type="text"
              placeholder="Enter your email address"
              className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]" // Adjust for icon
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* Password input with icon */}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {/* First name input with icon */}
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
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          {/* Last name input with icon */}
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
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          {/* WhatsApp input with icon */}
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
              onChange={(e) => {
                setWhatsApp(e.target.value);
              }}
            />
          </div>

          {/* Phone input with icon */}
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
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          {/* User type dropdown with icon */}
          <label className="text-white text-sm">User Type</label>
          <div className="relative w-full">
            <AiOutlineTeam
              className="absolute left-3 top-[15px] text-white"
              size={24}
            />
            <select
              className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
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

        <button
          className="w-[80%] absolute bottom-[70px] bg-red-500 h-[50px] text-white rounded-lg font-bold p-[15px] hover:bg-red-700 transition-all duration-300"
          onClick={handleLogin}
        >
          Sign Up
        </button>

        <Link to="/login" className="absolute bottom-[20px] text-white ">
          Already have an account?{" "}
          <span className="hover:text-red-500 font-bold transition-colors duration-300">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
}
