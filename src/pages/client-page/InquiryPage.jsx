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

          // Reload the page after submission
          window.location.reload();
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
      question: "How do I make a reservation for a room?",
      answer:
        "To make a reservation, please visit our 'Room Reservation' section or contact us directly for availability and special offers. You can also use our website's booking form to check for available rooms.",
    },
    {
      question: "Can I request additional services or amenities?",
      answer:
        "Yes, we offer additional services such as room upgrades, special dietary needs, or transportation requests. Simply mention your requirements when submitting an inquiry or contact our front desk directly.",
    },
    {
      question: "What should I do if I face issues with payment?",
      answer:
        "If you're facing any issues with payments, please contact our support team immediately with your payment details. We will assist you in resolving any payment-related concerns.",
    },
    {
      question: "How can I provide feedback or file a complaint?",
      answer:
        "We value your feedback and aim to continuously improve our services. If you have any complaints or suggestions, please submit an inquiry under the 'Complaints/Feedback' section, and our team will address it promptly.",
    },
    {
      question: "How do I check the status of my inquiry?",
      answer:
        "You can check the status of your inquiry directly on your dashboard after logging in. If you have any questions about its status, feel free to reach out to our support team for updates.",
    },
    {
      question: "Can I cancel my reservation or inquiry?",
      answer:
        "Yes, cancellations are possible. If you need to cancel your reservation or inquiry, please contact our support team as soon as possible. Cancellation policies apply based on the type of reservation or inquiry.",
    },
    {
      question: "What documents do I need to submit for a room reservation?",
      answer:
        "For a room reservation, you will need to provide a valid ID, credit card information for booking confirmation, and any special requests or requirements you may have for your stay.",
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
                  <option value="Room Reservation">Room Reservation</option>
                  <option value="Booking">Booking Inquiry</option>
                  <option value="Event">Event Inquiry</option>
                  <option value="Room Details">Room Details</option>
                  <option value="General">General Inquiry</option>
                  <option value="Special Requests">Special Requests</option>
                  <option value="Payment Issues">Payment Issues</option>
                  <option value="Complaints/Feedback">
                    Complaints/Feedback
                  </option>
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
                                  src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Golden%20Horizon%20Villa%20Logo.webp?t=2024-11-27T09%3A38%3A05.191Z"
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
