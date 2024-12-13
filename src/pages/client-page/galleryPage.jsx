import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import ReactPaginate from "react-paginate";

export default function Gallery() {
  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryIsLoaded, setGalleryIsLoaded] = useState(false);
  const [galleryCurrentPage, setGalleryCurrentPage] = useState(0);
  const [galleryTotalPages, setGalleryTotalPages] = useState(1);
  const galleryItemsPerPage = 8; // Items per page for gallery

  const [staff, setStaff] = useState([]);
  const [staffIsLoaded, setStaffIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4; // Items per page for staff

  useEffect(() => {
    fetchGalleryItems(galleryCurrentPage);
  }, [galleryCurrentPage]);

  const fetchGalleryItems = (page) => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery?page=${
          page + 1
        }&limit=${galleryItemsPerPage}`
      )
      .then((res) => {
        setGalleryItems(res.data.list);
        setGalleryTotalPages(res.data.pagination.totalPages);
        setGalleryIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching gallery items:", err.message);
        toast.error("Failed to fetch gallery items!");
      });
  };

  useEffect(() => {
    fetchStaff(currentPage);
  }, [currentPage]);

  const fetchStaff = (page) => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/staff?page=${
          page + 1
        }&limit=${itemsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setStaff(res.data.staff);
        setTotalPages(res.data.pagination.totalPages);
        setStaffIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching staff data:", err.message);
        toast.error("Failed to fetch staff details!");
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-blue-200 to-purple-200">
      <Header />
      <div className="flex-grow">
        {/* Gallery Section */}
        <div
          className="p-6 shadow-md bg-gradient-to-r from-blue-50 via-white to-blue-50 relative"
          style={{
            backgroundImage: `url('https://files.oaiusercontent.com/file-SDRWZnshUa3GoQSqU8YTNQ?se=2024-11-27T18%3A54%3A46Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dcd933682-1e68-45c8-b7ac-09776cbdf37e.webp&sig=lPnmafq4ya6twcZ3zOJRiNv3hniVINXTEhuALAawvvA%3D')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          {/* Blur Layer */}
          <div
            className="absolute inset-0 bg-black bg-opacity-25"
            style={{
              backdropFilter: "blur(10px)", // Adjust the blur value as needed
            }}
          ></div>

          {/* Caption Content */}
          <h1 className="relative text-center text-5xl font-extrabold text-black mb-6 tracking-wide">
            Explore Our{" "}
            <span className="text-white underline decoration-slice">
              Gallery
            </span>
          </h1>
          <p className="relative text-center text-black text-lg mb-10 font-bold leading-relaxed max-w-3xl mx-auto">
            Immerse yourself in the captivating beauty of{" "}
            <span className="text-blue-800 font-extrabold">
              Golden Horizon Hotel
            </span>
            . Our gallery showcases stunning views of our luxurious
            accommodations, serene outdoor spaces, and exquisite dining
            experiences. From the tranquil poolside to the elegantly designed
            interiors, every corner of our hotel is crafted to provide an
            unforgettable experience.
          </p>
        </div>

        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-300 text-center line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination for Gallery */}
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={galleryTotalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={({ selected }) => setGalleryCurrentPage(selected)}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>

        {/* Staff Section */}
        <div
          className="p-6 shadow-md bg-gradient-to-r from-blue-50 via-white to-blue-50 relative"
          style={{
            backgroundImage: `url('https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/staff.webp?t=2024-11-28T19%3A18%3A15.211Z')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-25"
            style={{
              backdropFilter: "blur(10px)", // Adjust the blur value as needed
            }}
          ></div>
          <h1 className="relative text-center text-5xl font-extrabold text-black mb-6 tracking-wide">
            Meet Our{" "}
            <span className="text-white underline decoration-slice">
              Exceptional Staff
            </span>
          </h1>
          <p className="relative text-center text-black text-lg mb-10 font-bold leading-relaxed max-w-3xl mx-auto">
            Our dedicated and professional team at{" "}
            <span className="text-blue-800 font-extrabold">
              Golden Horizon Hotel{" "}
            </span>
            is committed to ensuring your stay is nothing short of
            extraordinary. Discover the friendly faces behind our unparalleled
            service and attention to detail.
          </p>
        </div>

        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
            {staff.map((member, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />

                  {/* Social Media Icons */}
                  <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-orange-500 size-10 items-center justify-center text-white text-2xl hover:text-blue-500 transition-colors rounded-full"
                      >
                        <FaFacebookF />
                      </a>
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-orange-500 size-10 items-center justify-center text-white text-2xl hover:text-pink-500 transition-colors rounded-full"
                      >
                        <FaInstagram />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-orange-500 size-10 items-center justify-center text-white text-2xl hover:text-blue-700 transition-colors rounded-full"
                      >
                        <FaLinkedinIn />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
