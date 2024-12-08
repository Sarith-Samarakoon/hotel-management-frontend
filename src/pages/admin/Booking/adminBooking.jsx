import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Items per page

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const fetchBookings = (page) => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings?page=${
          page + 1
        }&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setBookings(response.data.bookings);
        setTotalPages(response.data.pagination.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch bookings."
        );
      })
      .finally(() => setLoading(false));
  };

  const deleteBooking = (bookingId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete booking ID "${bookingId}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                toast.success("Booking deleted successfully!");
                fetchBookings(currentPage); // Refresh bookings after deletion
              })
              .catch((error) => {
                console.error("Error deleting booking:", error);
                toast.error("Failed to delete booking.");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
        Bookings
      </h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white text-center">
                <th className="px-4 py-2 border">Booking ID</th>
                <th className="px-4 py-2 border">Room ID</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Guests</th>
                <th className="px-4 py-2 border">Notes</th>
                <th className="px-4 py-2 border">Booked Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Reason</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-gray-100">
                  <td className="px-4 py-2  text-gray-700">
                    {booking.bookingId}
                  </td>
                  <td className="px-4 py-2  text-gray-700">{booking.roomId}</td>
                  <td className="px-4 py-2  text-gray-700">{booking.email}</td>
                  <td className="px-4 py-2  text-gray-700">
                    {new Date(booking.start).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2  text-gray-700">
                    {new Date(booking.end).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2  text-gray-700">{booking.guests}</td>
                  <td className="px-4 py-2  text-gray-700">
                    {booking.notes || "-"}
                  </td>
                  <td className="px-4 py-2  text-gray-700">
                    {new Date(booking.timesStamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-2  text-gray-700">
                    {booking.status || "Pending"}
                  </td>
                  <td className="px-4 py-2  text-gray-700">
                    {booking.reason || "-"}
                  </td>
                  <td className="px-4 py-2  text-gray-700 flex space-x-2">
                    <button
                      onClick={() => deleteBooking(booking.bookingId)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                    <Link
                      className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
                      to={"/admin/update-bookings"}
                      state={booking}
                    >
                      <FaEdit className="mr-2" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
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
      )}
    </div>
  );
}
