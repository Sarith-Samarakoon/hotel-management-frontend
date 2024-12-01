import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import { FaHotel, FaCalendarAlt, FaPhoneAlt, FaUser } from "react-icons/fa";

function InquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., API call)
    console.log(formData);
    alert("Your inquiry has been submitted. We will get back to you shortly!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-100 via-blue-200 to-purple-200">
      <Header />
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl bg-white shadow-xl rounded-lg p-8">
          {/* Title Section */}
          <h1 className="text-5xl font-extrabold text-center text-blue-800 mb-6 tracking-wide">
            Inquiry Form
          </h1>
          <p className="text-center text-gray-600 text-lg mb-10">
            Let us assist you! Fill out the form below, and our team at{" "}
            <span className="text-indigo-500 font-semibold">
              Golden Horizon Hotel
            </span>{" "}
            will respond to your inquiry promptly.
          </p>

          {/* Inquiry Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md"
          >
            {/* Name Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Full Name <FaUser className="inline ml-2 text-indigo-500" />
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Phone Number{" "}
                <FaPhoneAlt className="inline ml-2 text-indigo-500" />
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Inquiry Type Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Inquiry Type <FaHotel className="inline ml-2 text-indigo-500" />
              </label>
              <select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select an inquiry type</option>
                <option value="Booking">Booking Inquiry</option>
                <option value="Event">Event Inquiry</option>
                <option value="Room Details">Room Details</option>
                <option value="General">General Inquiry</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Your Message{" "}
                <FaCalendarAlt className="inline ml-2 text-indigo-500" />
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your inquiry here"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InquiryPage;
