import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import axios from "axios";
import { FaHotel, FaCalendarAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

function InquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userInquiries, setUserInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null); // State to handle FAQ accordion
  const [showFaq, setShowFaq] = useState(false); // State to control FAQ visibility animation
  const [userProfile, setUserProfile] = useState(null); // State for user profile

  const token = localStorage.getItem("token");
  const faqRef = useRef(); // Ref for the FAQ section

  if (token == null) {
    window.location.href = "/login";
  }

  // Fetch user profile and inquiries
  useEffect(() => {
    if (token) {
      setIsLoading(true);

      // Fetch user profile
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserProfile(res.data.user || null);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
        });

      // Fetch inquiries
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserInquiries(response.data.inquiries || []);
        })
        .catch((error) => {
          console.error("Error fetching inquiries:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (token) {
      setIsSubmitted(true);

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setFormData({
            name: "",
            phone: "",
            inquiryType: "",
            message: "",
          });
        })
        .catch((error) => {
          console.error("Error submitting inquiry:", error);
        })
        .finally(() => {
          setIsSubmitted(false);
        });
    }
  };

  // Toggle FAQ visibility
  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I update my inquiry after submitting it?",
      answer:
        "Currently, you cannot edit an inquiry after submission. Please contact our support team for updates.",
    },
    {
      question: "What is the typical response time for inquiries?",
      answer:
        "We aim to respond to all inquiries within 24-48 hours, depending on the nature of the inquiry.",
    },
    {
      question: "Can I cancel my inquiry?",
      answer:
        "Yes, you can cancel your inquiry by contacting our support team with your inquiry ID.",
    },
    {
      question: "What information is required to submit an inquiry?",
      answer:
        "You need to provide your full name, contact details, the type of inquiry, and a detailed message describing your concern.",
    },
    {
      question: "Do I need an account to submit an inquiry?",
      answer:
        "Yes, you need to log in to your account to submit and view inquiries.",
    },
  ];

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowFaq(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-100 via-blue-200 to-purple-200">
      <Header />
      {isSubmitted && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <AiOutlineCheckCircle className="text-green-500 text-5xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">
              Inquiry Submitted!
            </h2>
            <p className="text-gray-600">
              Thank you! We will get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6 text-center">
        <p className="text-lg font-medium text-gray-700">
          The **Inquiry Page** is designed to handle account-specific or
          service-related inquiries. For general questions or feedback, please
          visit our{" "}
          <Link
            to="/contact-us"
            className="text-blue-500 font-bold underline hover:text-blue-700"
          >
            Contact Us
          </Link>{" "}
          page.
        </p>
      </div>

      {/* Layout: Form on the left, Table on the right */}
      <div className="py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inquiry Form */}
          <div className="bg-white shadow-xl rounded-lg p-8">
            <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
              Inquiry Form
            </h1>
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
              {/* Inquiry Type */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Inquiry Type{" "}
                  <FaHotel className="inline ml-2 text-indigo-500" />
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

          {/* Inquiry Table */}
          <div className="bg-white shadow-xl rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Your Inquiries
            </h2>
            {isLoading ? (
              <p className="text-center text-gray-600">Loading inquiries...</p>
            ) : userInquiries.length > 0 ? (
              <div className="space-y-8 overflow-y-auto max-h-[670px] border border-gray-200 p-4 rounded-lg">
                {/* Group inquiries by type */}
                {Object.entries(
                  userInquiries.reduce((grouped, inquiry) => {
                    if (!grouped[inquiry.inquiryType])
                      grouped[inquiry.inquiryType] = [];
                    grouped[inquiry.inquiryType].push(inquiry);
                    return grouped;
                  }, {})
                ).map(([type, inquiries], typeIndex) => (
                  <div
                    key={typeIndex}
                    className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                  >
                    {/* Inquiry Type Heading */}
                    <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                      {type}
                    </h3>
                    {/* Chats under each type */}
                    <div className="space-y-4">
                      {inquiries.map((inquiry, index) => (
                        <div key={index}>
                          {/* User's Inquiry */}
                          <div className="flex items-start flex-row">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                              <img
                                alt="User Avatar"
                                src={
                                  userProfile?.image ||
                                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                className="w-10 h-10 rounded-full"
                              />
                            </div>
                            {/* Chat Bubble */}
                            <div className="ml-4 max-w-lg p-4 rounded-lg shadow bg-blue-100 text-gray-800">
                              {/* Header */}
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-sm">
                                  You
                                </span>
                                <time className="text-xs text-gray-500">
                                  {new Date(
                                    inquiry.createdAt
                                  ).toLocaleTimeString()}
                                </time>
                              </div>
                              {/* Message */}
                              <div>
                                <p className="text-sm">{inquiry.message}</p>
                              </div>
                              {/* Status */}
                              <div className="mt-2 text-xs text-gray-500">
                                Status:{" "}
                                <span
                                  className={`font-semibold ${
                                    inquiry.status === "pending"
                                      ? "text-yellow-500"
                                      : inquiry.status === "approved"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {inquiry.status.charAt(0).toUpperCase() +
                                    inquiry.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Admin's Response */}
                          {inquiry.adminReply && (
                            <div className="flex items-start flex-row-reverse mt-4">
                              {/* Avatar */}
                              <div className="flex-shrink-0">
                                <img
                                  alt="Admin Avatar"
                                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                  className="w-10 h-10 rounded-full"
                                />
                              </div>
                              {/* Chat Bubble */}
                              <div className="mr-4 max-w-lg p-4 rounded-lg shadow bg-gray-200 text-gray-800">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-semibold text-sm">
                                    Admin
                                  </span>
                                  <time className="text-xs text-gray-500">
                                    {new Date(
                                      inquiry.updatedAt || inquiry.createdAt
                                    ).toLocaleTimeString()}
                                  </time>
                                </div>
                                {/* Message */}
                                <div>
                                  <p className="text-sm">
                                    {inquiry.adminReply}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Warning Message */}
                          {inquiry.adminReply && (
                            <div className="flex justify-center mt-2">
                              <p className="text-xs text-red-600 bg-red-50 p-2 rounded shadow">
                                ⚠️ This chat will be deleted after 2 days from{" "}
                                {new Date(
                                  inquiry.updatedAt || inquiry.createdAt
                                ).toLocaleDateString()}
                                .
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No inquiries found for your account.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div
        ref={faqRef}
        className={`py-12 px-4 bg-white transform transition-all duration-700 ${
          showFaq ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg shadow-lg p-4 hover:bg-indigo-50"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-xl font-medium text-gray-800">
                    {faq.question}
                  </h3>
                  {faqOpen === index ? (
                    <HiChevronUp className="text-2xl text-indigo-500" />
                  ) : (
                    <HiChevronDown className="text-2xl text-indigo-500" />
                  )}
                </div>
                {faqOpen === index && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InquiryPage;
