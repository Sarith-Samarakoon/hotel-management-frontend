import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaQuoteLeft, FaQuoteRight, FaStar, FaDoorOpen } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md"; // Admin icon
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import ReactPaginate from "react-paginate";

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerPage = 6; // Items per page

  const token = localStorage.getItem("token");

  // Redirect to login if no token is found
  if (!token) {
    window.location.href = "/login";
  }

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const fetchReviews = (page) => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedback?page=${
          page + 1
        }&limit=${reviewsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in Authorization header
          },
        }
      )
      .then((res) => {
        // Sort feedback by `createdAt` in descending order to show newest first
        const sortedReviews = res.data.feedback.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setReviews(sortedReviews);
        setTotalPages(res.data.pagination.totalPages);
        setReviewsIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-100 via-blue-200 to-purple-200">
      <Header />
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-7xl bg-white shadow-2xl rounded-lg p-8">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mb-4 tracking-tight sm:text-5xl">
              Guest Feedback
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
              Discover what our guests have shared about their stay at{" "}
              <span className="text-indigo-500 font-semibold">
                Golden Horizon Hotel
              </span>
              . Your feedback is our pride.
            </p>
          </div>

          {/* Feedback Section */}
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-5">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 p-6 rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl duration-300"
                  style={{
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {/* User Avatar */}
                  <div className="relative mb-4 flex justify-center">
                    <img
                      src={
                        review.userProfileImage ||
                        "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      alt={`${review.userName}'s Avatar`}
                      className="w-24 h-24 rounded-full shadow-md border-4 border-indigo-500 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  {/* User Info */}
                  <h3 className="text-xl font-semibold text-indigo-700 mb-1 text-center">
                    {review.userName}
                  </h3>
                  <span className="text-sm text-gray-500 mb-4 text-center">
                    {new Date(
                      review.updatedAt || review.createdAt
                    ).toLocaleDateString()}
                  </span>

                  {/* Room ID */}
                  <div className="flex items-center justify-center text-gray-700 mb-4">
                    <FaDoorOpen className="text-indigo-500 mr-2" />
                    <span className="text-sm font-medium">
                      Room ID: {review.roomId}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center space-x-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-lg" />
                    ))}
                  </div>

                  {/* Review Message */}
                  <div className="text-gray-600 italic text-center px-4 relative">
                    <FaQuoteLeft className="absolute top-0 left-2 text-indigo-400 text-xl" />
                    <p className="px-6">{review.message}</p>
                    <FaQuoteRight className="absolute bottom-0 right-2 text-indigo-400 text-xl" />
                  </div>

                  {/* Admin Response */}
                  {review.adminResponse && (
                    <div className="mt-6 bg-indigo-50 p-4 rounded-lg shadow-md flex items-start space-x-4">
                      {/* Admin Profile Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={
                            "https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Golden%20Horizon%20Villa%20Logo.webp?t=2024-11-27T09%3A38%3A05.191Z" // Default image for admin if none is provided
                          }
                          alt="Admin Avatar"
                          className="w-14 h-14 rounded-full shadow-md"
                        />
                      </div>

                      {/* Admin Response */}
                      <div className="flex-1">
                        <strong className="text-indigo-700 text-lg">
                          Admin Response:
                        </strong>
                        <p className="text-gray-700 mt-2">
                          {review.adminResponse}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

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

export default ReviewPage;
