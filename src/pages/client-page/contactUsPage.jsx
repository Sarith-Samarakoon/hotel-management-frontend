import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get token from localStorage (if needed for authentication)
  const token = localStorage.getItem("token");

  // Redirect to login if no token is found (Optional, if authentication is required)
  if (!token) {
    window.location.href = "/login";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contactData = {
      name,
      email,
      message,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/contacts`, contactData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in Authorization header (if needed)
        },
      })
      .then((response) => {
        toast.success(
          "We received your message and will get back to you shortly"
        );
        setName(""); // Reset form fields
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error submitting contact form:", error);
        toast.error(error.response?.data?.message || "Failed to send message.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center h-[400px] rounded-lg overflow-hidden shadow-xl mb-12"
          style={{
            backgroundImage: `url('https://d1a4iw41dxc5af.cloudfront.net/assets/files/16142/dlx_property_lobby_113.2000x500.jpg?6pq4ad')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent flex justify-center items-center">
            <h1 className="text-white text-5xl sm:text-6xl font-bold text-center drop-shadow-lg">
              Contact Us
            </h1>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Details */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-semibold text-blue-700 mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Have questions? Need assistance? We're here to help! Reach out to
              us using the contact information below.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-blue-600 text-2xl" />
                <p className="text-gray-700 text-lg">
                  hotel@goldenhorizonhotel.com
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-blue-600 text-2xl" />
                <p className="text-gray-700 text-lg">+94 123 456 789</p>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                <p className="text-gray-700 text-lg">
                  123 Golden Street, Horizon City
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-semibold text-blue-700 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                className="w-full border border-gray-300 p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors shadow-lg ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>

        {/* Google Map Section */}
        <section className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Golden Horizon Villa Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8378274342253!2d144.95565181586637!3d-37.817378942021554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df0e8f0c7%3A0x183b17b23f111b4!2sGolden%20Horizon%20Villa!5e0!3m2!1sen!2slk!4v1638168259145!5m2!1sen!2slk"
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
