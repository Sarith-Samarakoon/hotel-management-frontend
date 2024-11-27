import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock, AiOutlineLogin } from "react-icons/ai";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    // Validate input
    if (!email || !password) {
      toast.error("Please enter both email and password!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);

        const token = localStorage.getItem("token");
        console.log("Token:", token);

        // Redirect based on user type
        if (res.data.user.type === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.error("Login error:", err.response?.data || err.message);
        toast.error(
          err.response?.data?.message || "Failed to login. Try again!",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      })
      .finally(() => {
        setIsLoading(false);
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
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[40px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-[15px] text-white"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <FaEyeSlash size={24} />
              ) : (
                <FaEye size={24} />
              )}
            </button>
          </div>
        </div>

        <button
          className="w-[80%] absolute bottom-[70px] bg-red-500 h-[50px] text-white rounded-lg font-bold p-[15px] hover:bg-red-700 transition-all duration-300 flex items-center justify-center"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>

        <Link to="/register" className="absolute bottom-[20px] text-white">
          Don't have an account?{" "}
          <span className="hover:text-red-500 font-bold transition-colors duration-300">
            SIGN UP
          </span>
        </Link>
      </div>
    </div>
  );
}
