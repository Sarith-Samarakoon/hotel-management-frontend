import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Example categories JSON (replace this with actual API data if needed)
const categoriesData = [
  {
    _id: "6715012248142d8a66e342e5",
    name: "LuxuryHotelSuite",
  },
  {
    _id: "671df423dcaf9bb6675f964b",
    name: "Deluxe Suite",
  },
  {
    _id: "671df45edcaf9bb6675f964d",
    name: "Standard Room",
  },
  {
    _id: "671df46adcaf9bb6675f964f",
    name: "Family Suite",
  },
  {
    _id: "67417764dbae4dec166789c7",
    name: "Semi Luxury",
  },
  {
    _id: "675c9be14416e8576e509ea6",
    name: "Oceanfront Villa",
  },
  {
    _id: "675c9c5a4416e8576e509ea8",
    name: "Penthouse Suite",
  },
  {
    _id: "675c9cb04416e8576e509eac",
    name: "Junior Suite",
  },
  {
    _id: "675c9cde4416e8576e509eae",
    name: "Honeymoon Suite",
  },
  {
    _id: "675c9d684416e8576e509eb0",
    name: "Poolside Cottage",
  },
  {
    _id: "675c9dc14416e8576e509eb2",
    name: "Executive Suite",
  },
  {
    _id: "675c9dfa4416e8576e509eb4",
    name: "Beachfront Bungalow",
  },
  {
    _id: "675c9ec64416e8576e509eb6",
    name: "Royal Suite",
  },
];

const BookingSection = () => {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !category || !startDate || !endDate || !guests) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date must be after the start date.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/create-by-category`,
        {
          email,
          category,
          start: startDate,
          end: endDate,
          guests,
        }
      );
      toast.success(response.data.message);

      // Reset the form after successful submission
      setEmail("");
      setCategory("");
      setStartDate("");
      setEndDate("");
      setGuests("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Booking failed. Please try again."
      );
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg py-8 px-4 md:px-10 -mt-20 relative z-10 rounded-lg mx-auto w-11/12 md:w-3/4">
      <ToastContainer /> {/* Add ToastContainer */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 border border-gray-300 p-2 rounded-md m-2"
            required
          />
          <select
            className="flex-1 border border-gray-300 p-2 rounded-md m-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Room Category
            </option>
            {categoriesData.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Number of Guests"
            className="flex-1 border border-gray-300 p-2 rounded-md m-2"
            min="1"
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded-md m-2"
            min={today} // Block past dates for the start date
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded-md m-2"
            min={startDate || today} // Ensure end date is after start date
            required
          />
          <button
            type="submit"
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md m-2 hover:bg-red-700"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingSection;
