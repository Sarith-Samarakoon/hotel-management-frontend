import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ImageCarousel({ photos }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-32 h-32">
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
        onClick={handlePreviousPhoto}
      >
        <FaArrowLeft size={16} className="text-blue-500" />
      </button>
      <img
        src={photos[currentPhotoIndex]}
        alt="Room Photo"
        className="w-full h-full object-cover shadow-md"
      />
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
        onClick={handleNextPhoto}
      >
        <FaArrowRight size={16} className="text-blue-500" />
      </button>
    </div>
  );
}

export default function AdminRooms() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4; // Number of items per page
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms(currentPage);
  }, [currentPage]);

  const fetchRooms = (page) => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms?page=${
          page + 1
        }&limit=${itemsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setRooms(res.data.rooms);
        setFilteredRooms(res.data.rooms); // Initialize filteredRooms with all rooms
        setTotalPages(res.data.pagination.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err.message);
        toast.error("Failed to fetch rooms!");
      });
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    setFilteredRooms(
      rooms.filter((room) =>
        room.roomId.toString().toLowerCase().includes(query)
      )
    );
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredRooms(rooms); // Reset to show all rooms
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const deleteRoom = (roomId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete the room with ID "${roomId}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(
                import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + roomId,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then(() => {
                toast.success("Room deleted successfully!");
                fetchRooms(currentPage); // Refresh rooms
              })
              .catch(() => {
                toast.error("Error deleting room!");
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
    <div className="w-full">
      <button
        onClick={() => navigate("/admin/add-room")}
        className="bg-gradient-to-r from-pink-500 to-red-600 w-[60px] h-[60px] rounded-full text-3xl text-white flex justify-center items-center fixed bottom-5 right-5 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      >
        <FaPlus />
      </button>

      <div className="p-4 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
          Rooms
        </h1>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search by Room ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
          />
          {searchQuery ? (
            <FaTimes
              size={20}
              className="absolute top-2.5 right-4 text-black cursor-pointer"
              onClick={handleClearSearch}
            />
          ) : (
            <FaSearch
              size={20}
              className="absolute top-2.5 right-4 text-black cursor-pointer"
              onClick={handleSearch}
            />
          )}
        </div>
      </div>

      <div className="p-4">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-6 border-b font-medium">Room ID</th>
              <th className="py-3 px-6 border-b font-medium">Category</th>
              <th className="py-3 px-6 border-b font-medium">Max Guests</th>
              <th className="py-3 px-6 border-b font-medium">Photos</th>
              <th className="py-3 px-6 border-b font-medium">
                Special Description
              </th>
              <th className="py-3 px-6 border-b font-medium">Notes</th>
              <th className="py-3 px-6 border-b font-medium">Status</th>
              <th className="py-3 px-6 border-b font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-4 px-6  text-gray-700">{room.roomId}</td>
                <td className="py-4 px-6  text-gray-700">{room.category}</td>
                <td className="py-4 px-6  text-gray-700">{room.maxGuests}</td>
                <td className="py-4 px-6 ">
                  {room.photos && room.photos.length > 0 ? (
                    <ImageCarousel photos={room.photos} />
                  ) : (
                    "No Photos"
                  )}
                </td>
                <td className="py-4 px-6  text-gray-700">
                  {room.specialDescription}
                </td>
                <td className="py-4 px-6  text-gray-700">{room.notes}</td>
                <td className="py-4 px-6 ">
                  <span
                    className={`py-1 px-3 rounded-full text-white font-semibold ${
                      room.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {room.available ? "Available" : "Booked"}
                  </span>
                </td>
                <td className="py-4 px-6  text-gray-700 flex space-x-2 mt-10">
                  <button
                    onClick={() => deleteRoom(room.roomId)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <Link
                    to={"/admin/update-room"}
                    state={room}
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
