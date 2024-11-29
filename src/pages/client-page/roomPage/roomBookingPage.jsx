import { useLocation, useNavigate } from "react-router-dom";
import {
  FaTag,
  FaDollarSign,
  FaUserAlt,
  FaStar,
  FaWifi,
  FaBed,
  FaStickyNote,
} from "react-icons/fa";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useState } from "react";
import BookingForm from "./bookingForm"; // Import the BookingForm component

export default function RoomBooking() {
  const navigate = useNavigate();
  const { state } = useLocation(); // Access passed data from navigation
  const { category, rooms } = state || {};
  const [selectedRoom, setSelectedRoom] = useState(null); // State for the selected room
  const [isBookingOpen, setIsBookingOpen] = useState(false); // State to toggle booking form

  // Handle case where no data is passed
  if (!category || !rooms) {
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        <Header />
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            No Details Available
          </h1>
          <button
            onClick={() => navigate("/rooms")}
            className="py-3 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all"
          >
            Go Back to Rooms
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Function to handle opening the booking form
  const openBookingForm = (room) => {
    setSelectedRoom(room);
    setIsBookingOpen(true);
  };

  // Function to close the booking form
  const closeBookingForm = () => {
    setSelectedRoom(null);
    setIsBookingOpen(false);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <Header />
      <div className="p-10">
        {/* Category Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600">{category.description}</p>
          <div className="flex items-center space-x-6 mt-6">
            <div className="flex items-center text-gray-700">
              <FaTag className="text-indigo-500 mr-2" />
              <span className="text-sm">{category.features.join(", ")}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaDollarSign className="text-green-500 mr-2" />
              <span className="text-sm font-semibold">
                ${category.price} / night
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(category.ratings || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Rooms Section */}
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Available Rooms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Room Carousel */}
              <div className="relative">
                <Carousel
                  showThumbs={false}
                  showIndicators={true}
                  showStatus={false}
                  infiniteLoop
                  autoPlay
                  dynamicHeight={false}
                  className="h-52"
                >
                  {room.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Room ${room.roomId} - Image ${idx + 1}`}
                      className="w-full h-52 object-cover"
                    />
                  ))}
                </Carousel>
                <span
                  className={`absolute top-4 left-4 px-3 py-1 text-sm font-bold rounded-full ${
                    room.available ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {room.available ? "Available" : "Booked"}
                </span>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    Room {room.roomId}
                  </h3>
                </div>
                <div className="flex items-center space-x-4 text-gray-600 mt-2">
                  {/* Bed Type */}
                  <div className="flex items-center space-x-1">
                    <FaBed className="text-blue-500" />
                    <span className="text-sm">{category.bedtype || "N/A"}</span>
                  </div>
                  {/* Max Guests */}
                  <div className="flex items-center space-x-1">
                    <FaUserAlt className="text-green-500" />
                    <span className="text-sm">Max {room.maxGuests} Guests</span>
                  </div>
                  {/* Wi-Fi */}
                  <div className="flex items-center space-x-1">
                    <FaWifi className="text-yellow-500" />
                    <span className="text-sm">Wi-Fi</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {room.specialDescription || "No description available"}
                </p>

                {/* Notes Section */}
                {room.notes && (
                  <div className="mt-4 bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center mb-2 text-gray-700">
                      <FaStickyNote className="text-orange-500 mr-2" />
                      <h4 className="text-md font-semibold">Notes:</h4>
                    </div>
                    <p className="text-sm text-gray-600">{room.notes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 flex justify-between items-center border-t">
                <button
                  onClick={() => openBookingForm(room)}
                  className="py-2 px-4 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form Modal */}
      {isBookingOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <BookingForm room={selectedRoom} onClose={closeBookingForm} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
