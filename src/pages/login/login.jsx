import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock, AiOutlineLogin } from "react-icons/ai"; // Import icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);

        const token = localStorage.getItem("token");

        console.log(token);

        if (res.data.user.type === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
      <div className="w-[400px] h-[450px] backdrop-blur-md rounded-lg flex flex-col items-center justify-center relative">
        <h1 className="text-3xl p-[15px] font-bold text-white absolute top-[10px] text-center">
          Login
        </h1>

        <div className="w-[80%] flex flex-col mb-[10px]">
          <label className="text-white mb-[5px]" htmlFor="email">
            Email Address
          </label>
          <div className="relative w-full">
            <AiOutlineMail
              className="absolute left-3 top-[15px] text-white"
              size={24}
            />
            <input
              id="email"
              type="text"
              placeholder="Enter your email address"
              className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]" // Space for icon
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="w-[80%] flex flex-col mb-[70px]">
          <label className="text-white mb-[5px]" htmlFor="password">
            Password
          </label>
          <div className="relative w-full">
            <AiOutlineLock
              className="absolute left-3 top-[15px] text-white"
              size={24}
            />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]" // Space for icon
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <button
          className="w-[80%] absolute bottom-[70px] bg-red-500 h-[50px] text-white rounded-lg font-bold p-[15px] hover:bg-red-700 transition-all duration-300 flex items-center justify-center"
          onClick={handleLogin}
        >
          Login
        </button>

        <Link to="/register" className="absolute bottom-[20px] text-white ">
          Don't have an account?{" "}
          <span className="hover:text-red-500 font-bold transition-colors duration-300">
            SIGN UP
          </span>
        </Link>
      </div>
    </div>
  );
}
