import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AdminEvent() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // Number of events per page

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const fetchEvents = (page) => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/events?page=${
          page + 1
        }&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setEvents(res.data.events);
        setTotalPages(res.data.pagination.totalPages);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch events!");
      });
  };

  const deleteEvent = (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete this event?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`${import.meta.env.VITE_BACKEND_URL}/api/events/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(() => {
                fetchEvents(currentPage); // Refresh events
                toast.success("Event deleted successfully!");
              })
              .catch(() => {
                toast.error("Error deleting event!");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handlePlusClick = () => {
    navigate("/admin/add-event");
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePlusClick}
        className="bg-gradient-to-r from-pink-500 to-red-600 w-[60px] h-[60px] rounded-full text-3xl text-white flex justify-center items-center fixed bottom-5 right-5 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      >
        <FaPlus />
      </button>
      <div className="p-4">
        <h1 className="text-4xl font-extrabold mb-8 tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
          Event Management
        </h1>
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-6 border-b font-medium">Event Name</th>
              <th className="py-3 px-6 border-b font-medium">Start Date</th>
              <th className="py-3 px-6 border-b font-medium">End Date</th>
              <th className="py-3 px-6 border-b font-medium">Description</th>
              <th className="py-3 px-6 border-b font-medium">Image</th>
              <th className="py-3 px-6 border-b font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 border-b text-gray-700">
                  {event.name}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {new Date(event.startDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {new Date(event.endDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {event.description || "No Description"}
                </td>
                <td className="py-4 px-6 border-b">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-16 h-16 object-cover rounded-full shadow-md"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-4 px-6 border-b text-gray-700 flex space-x-2 mt-6">
                  <button
                    onClick={() => deleteEvent(event._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <Link
                    to={"/admin/update-event"}
                    state={event}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
}
