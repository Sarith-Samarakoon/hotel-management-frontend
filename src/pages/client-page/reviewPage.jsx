import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaQuoteLeft, FaQuoteRight, FaStar, FaDoorOpen } from "react-icons/fa";
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
        setReviews(res.data.feedback);
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
          <h1 className="text-5xl font-extrabold text-center text-blue-800 mb-10 tracking-wide">
            Guest Feedback
          </h1>
          <p className="text-center text-gray-600 text-lg mb-12">
            Discover what our guests have shared about their stay at{" "}
            <span className="text-indigo-500 font-semibold">
              Golden Horizon Hotel
            </span>
            .
          </p>

          {/* Feedback Section */}
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-5">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md flex flex-col items-center"
                  style={{
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {/* User Avatar */}
                  <div className="relative mb-4">
                    <img
                      src={
                        review.userProfileImage ||
                        "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      alt={`${review.userName}'s Avatar`}
                      className="w-24 h-24 rounded-full shadow-md border-4 border-indigo-500"
                      style={{
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                  {/* User Info */}
                  <h3 className="text-xl font-bold text-indigo-700 mb-1">
                    {review.userName}
                  </h3>
                  <span className="text-sm text-gray-500 mb-4">
                    {new Date(review.timestamp).toLocaleDateString()}
                  </span>

                  {/* Room ID */}
                  <div className="flex items-center text-gray-700 mb-4">
                    <FaDoorOpen className="text-indigo-500 mr-2" />
                    <span className="text-sm font-medium">
                      Room ID: {review.roomId}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex space-x-1 mb-4">
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
                    <p className="mt-4 text-sm text-gray-700 bg-indigo-100 border-l-4 border-indigo-400 p-4 rounded-md">
                      <strong className="text-indigo-700">
                        Admin Response:
                      </strong>{" "}
                      {review.adminResponse}
                    </p>
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
