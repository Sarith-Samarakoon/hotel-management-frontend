import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
          <label className="text-white text-sm">Email Address</label>
          <input
            type="text"
            placeholder="Enter your email address"
            className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label className="text-white text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px]"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <label className="text-white text-sm">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px]"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <label className="text-white text-sm">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px]"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <label className="text-white text-sm">WhatsApp Number</label>
          <input
            type="text"
            placeholder="Enter your WhatsApp number"
            className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px]"
            value={whatsApp}
            onChange={(e) => {
              setWhatsApp(e.target.value);
            }}
          />

          <label className="text-white text-sm">Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px]"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />

          {/* Dropdown for selecting type */}
          <label className="text-white text-sm">User Type</label>
          <select
            className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px]"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          className="w-[80%] absolute bottom-[70px] bg-red-500 h-[50px] text-white rounded-lg font-bold p-[15px] hover:bg-red-700 transition-all duration-300"
          onClick={handleLogin}
        >
          Sign Up
        </button>

        {/* Add a link to the login page */}
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
