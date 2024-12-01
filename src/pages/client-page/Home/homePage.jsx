import { useState, useEffect, useRef } from "react"; // Import useRef
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
import WhyChooseUs from "./whyChooseUsPage";

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

  // Ref for the events section
  const eventsRef = useRef(null);

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

  const scrollToEvents = () => {
    if (eventsRef.current) {
      eventsRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
            <button
              onClick={scrollToEvents} // Add scroll function here
              className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
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
      <div className="bg-gray-50 py-16 px-6">
        {/* Welcome Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center container mx-auto">
          {/* Welcome Text */}
          <div>
            <h2 className="text-lg font-bold uppercase text-yellow-500">
              Explore Luxury
            </h2>
            <h1 className="text-5xl font-bold text-gray-900 mt-2">
              Discover <span className="text-orange-500">Golden Horizon</span>
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Indulge in a world of elegance, comfort, and relaxation. Golden
              Horizon offers premium hospitality, luxurious accommodations, and
              unforgettable experiences, all tailored to your desires.
            </p>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {/* Rooms */}
              <div className="flex flex-col items-center border border-gray-200 rounded-lg p-6 bg-white shadow-md">
                <FaBed className="text-4xl text-yellow-500 mb-4" />
                <h3 className="text-4xl font-bold text-gray-800">
                  {roomsCount}
                </h3>
                <p className="text-gray-500 font-semibold">Rooms</p>
              </div>

              {/* Staff */}
              <div className="flex flex-col items-center border border-gray-200 rounded-lg p-6 bg-white shadow-md">
                <FaUsers className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-4xl font-bold text-gray-800">
                  {staffCount}
                </h3>
                <p className="text-gray-500 font-semibold">Staff</p>
              </div>

              {/* Guests */}
              <div className="flex flex-col items-center border border-gray-200 rounded-lg p-6 bg-white shadow-md">
                <FaUserFriends className="text-4xl text-green-500 mb-4" />
                <h3 className="text-4xl font-bold text-gray-800">
                  {guestsCount}
                </h3>
                <p className="text-gray-500 font-semibold">Guests</p>
              </div>
            </div>

            {/* Explore More Button */}
            <div className="mt-6">
              <button className="px-6 py-3 bg-orange-500 text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition">
                Discover More
              </button>
            </div>
          </div>

          {/* Images Section */}
          <div className="grid grid-rows-2 grid-cols-2 gap-4">
            <div className="row-span-2">
              <img
                src="https://i.pinimg.com/736x/c5/87/13/c58713fac4cbf7f36f4632b537382a94.jpg"
                alt="Luxury Room"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <img
              src="https://i.pinimg.com/736x/b6/69/ec/b669eca9524f7bc97b19f50e2c9d0058.jpg"
              alt="Resort View"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src="https://i.pinimg.com/736x/2e/21/14/2e2114ff00286b227ef11b2a5f3124f7.jpg"
              alt="Poolside View"
              className="w-full h-full object-cover rounded-lg"
            />
            {/* <img
              src="https://i.pinimg.com/736x/a2/f4/0f/a2f40f17862ebe5128715d44dbd36510.jpg"
              alt="Relaxation Area"
              className="w-full h-full object-cover rounded-lg"
            /> */}
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <ImageGallery />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Upcoming Events Section */}
      <div
        ref={eventsRef} // Add the ref here
        className="py-16 bg-gray-50 text-center"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-4">
          <FaCalendarAlt className="text-teal-500 text-5xl" />
          <span className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
            Upcoming Events
          </span>
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
