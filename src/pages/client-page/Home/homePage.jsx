import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBed,
  FaUserFriends,
  FaUsers,
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { BsFileTextFill } from "react-icons/bs";
import Header from "../../../components/header/Header";
import Navbar from "../../../components/header/Navbar";
import Footer from "../../../components/footer/footer";
import Countdown from "./countdown";
import ImageGallery from "./imagesGallery";

export default function HomePage() {
  const images = [
    "https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/3.webp",
    "https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/2.webp?t=2024-11-25T13%3A09%3A03.359Z",
    "https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/1.webp?t=2024-11-25T13%3A08%3A29.354Z",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Live counts
  const [roomsCount, setRoomsCount] = useState(0);
  const [guestsCount, setGuestsCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  // Events
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let interval;
    if (roomsCount < 50 || guestsCount < 120 || staffCount < 25) {
      interval = setInterval(() => {
        setRoomsCount((prev) => (prev < 50 ? prev + 1 : prev));
        setGuestsCount((prev) => (prev < 120 ? prev + 1 : prev));
        setStaffCount((prev) => (prev < 25 ? prev + 1 : prev));
      }, 30); // Increment every 30ms
    }
    return () => clearInterval(interval);
  }, [roomsCount, guestsCount, staffCount]);

  useEffect(() => {
    // Fetch events from the backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events`)
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error.message);
      });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Header />
      <Navbar />
      {/* Hero Section */}
      <div className="relative w-full h-[600px]">
        <div className="relative w-full h-full">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Overlay Text */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
            <h1 className="text-white text-4xl lg:text-6xl font-bold">
              Welcome to the Golden Horizon Hotel
            </h1>
            <p className="text-white text-lg mt-4">
              The perfect place for relaxation and luxury.
            </p>
            <button className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700">
              Explore Now
            </button>
          </div>
        </div>
        {/* Prev and Next Buttons */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-300"
          onClick={prevSlide}
        >
          <FaArrowLeft size={16} className="text-blue-500" />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-300"
          onClick={nextSlide}
        >
          <FaArrowRight size={16} className="text-blue-500" />
        </button>
      </div>
      {/* Booking Section */}
      <div className="bg-white shadow-lg py-8 px-4 md:px-10 -mt-20 relative z-10 rounded-lg mx-auto w-11/12 md:w-3/4">
        <div className="flex flex-wrap justify-between items-center">
          <input
            type="text"
            placeholder="Enter your email"
            className="flex-1 border border-gray-300 p-2 rounded-md m-2"
          />
          <select
            className="flex-1 border border-gray-300 p-2 rounded-md m-2"
            defaultValue=""
          >
            <option value="" disabled>
              Room Type
            </option>
            <option value="1">Luxury</option>
            <option value="2">Double Room</option>
            <option value="3">Triple Room</option>
            <option value="4">Normal</option>
          </select>
          <input
            type="date"
            className="flex-1 border border-gray-300 p-2 rounded-md m-2"
          />
          <input
            type="date"
            className="flex-1 border border-gray-300 p-2 rounded-md m-2"
          />
          <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md m-2 hover:bg-red-700">
            Book Now
          </button>
        </div>
      </div>
      {/* Live Count Section */}
      <div
        className="bg-gray-100 py-5"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/f4/dc/67/f4dc67d77584acdc840d9c1fbef82e0d.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-black ">
          ____OUR STATUS____
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
          {/* Rooms Count */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform">
            <FaBed className="text-6xl text-blue-500 mb-4" />
            <div className="text-6xl font-extrabold text-blue-500 mb-2">
              {roomsCount}
            </div>
            <p className="text-lg font-semibold text-gray-700">Rooms</p>
          </div>

          {/* Guests Count */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform">
            <FaUserFriends className="text-6xl text-green-500 mb-4" />
            <div className="text-6xl font-extrabold text-green-500 mb-2">
              {guestsCount}
            </div>
            <p className="text-lg font-semibold text-gray-700">Guests</p>
          </div>

          {/* Staff Count */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform">
            <FaUsers className="text-6xl text-red-500 mb-4" />
            <div className="text-6xl font-extrabold text-red-500 mb-2">
              {staffCount}
            </div>
            <p className="text-lg font-semibold text-gray-700">Staff</p>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <ImageGallery />

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {/* Desert */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Desert.webp"
              alt="Desert"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <span className="text-white text-lg font-bold">Desert</span>
            </div>
          </div>

          {/* Coffee */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Coffee.webp"
              alt="Coffee"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <span className="text-white text-lg font-bold">Coffee</span>
            </div>
          </div>

          {/* Catering */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Catering.webp"
              alt="Catering"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <span className="text-white text-lg font-bold">Catering</span>
            </div>
          </div>

          {/* Services */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Services.webp"
              alt="Services"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <span className="text-white text-lg font-bold">Services</span>
            </div>
          </div>
        </div>
        <button className="mt-8 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700">
          View All
        </button>
      </div>

      {/* Upcoming Events Section */}
      <div className="py-16 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Countdown */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md z-10">
                <Countdown startDate={event.startDate} />
              </div>

              {/* Event Image */}
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover"
              />

              {/* Content Container */}
              <div className="flex">
                {/* Date Section */}
                <div className="bg-red-500 text-white flex flex-col items-center justify-center px-4 py-6 w-28">
                  <span className="text-3xl font-bold">
                    {new Date(event.startDate).getDate()}
                  </span>
                  <span className="uppercase text-sm font-semibold">
                    {new Date(event.startDate).toLocaleString("default", {
                      month: "short",
                    })}
                  </span>
                  <span className="text-xs">
                    {new Date(event.startDate).getFullYear()}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex-1 p-4">
                  {/* Event Name */}
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaCalendarAlt className="text-indigo-500" />
                    {event.name}
                  </h3>

                  {/* Event Date Range */}
                  <p className="text-black text-sm font-semibold flex items-center gap-2 mt-3">
                    <FaClock className="text-purple-500" />
                    {new Date(event.startDate).toLocaleDateString()} -{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </p>

                  {/* Event Description */}
                  <p className="text-gray-800 mt-2 text-sm text-start flex items-start gap-2">
                    <BsFileTextFill className="text-green-500" size={30} />
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
