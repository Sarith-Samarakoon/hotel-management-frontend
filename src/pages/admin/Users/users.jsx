import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./user.css"; // Add your custom styles here

export default function AdminUsers() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [usersIsLoaded, setUsersIsLoaded] = useState(false);

  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = (page) => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users?page=${
          page + 1
        }&limit=${itemsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setUsers(res.data.users);
        setTotalPages(res.data.pagination.totalPages);
        setUsersIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function deleteUser(email) {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete the user "${email}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(
                import.meta.env.VITE_BACKEND_URL + "/api/users/" + email,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                setUsersIsLoaded(false);
                toast.success("User deleted successfully!");
              })
              .catch(() => {
                toast.error("Error Deleting User!");
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing if No is clicked
          },
        },
      ],
    });
  }

  function changeUserType(id, newType) {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/change-type/${id}`,
        { type: newType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUsersIsLoaded(false); // Refresh the user list
        toast.success("User type updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update user type!");
      });
  }

  function toggleUserDisabled(id, disabled) {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/disable/${id}`,
        { disabled },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUsersIsLoaded(false); // Refresh the user list
        toast.success(
          disabled
            ? "User disabled successfully!"
            : "User enabled successfully!"
        );
      })
      .catch(() => {
        toast.error("Failed to change user status!");
      });
  }

  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-4xl font-extrabold mb-8  tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
          Users
        </h1>
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden mb-5">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-2 px-5 border-b font-medium">Email</th>
              <th className="py-2 px-5 border-b font-medium">Image</th>
              <th className="py-2 px-5 border-b font-medium">First Name</th>
              <th className="py-2 px-5 border-b font-medium">Last Name</th>
              <th className="py-2 px-5 border-b font-medium">Type</th>
              <th className="py-2 px-5 border-b font-medium">WhatsApp</th>
              <th className="py-2 px-5 border-b font-medium">Phone</th>
              <th className="py-2 px-5 border-b font-medium">Disabled</th>
              <th className="py-2 px-5 border-b font-medium">Email Verified</th>
              <th className="py-2 px-5 border-b font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-1 px-2 border-b text-gray-700">
                  {user.email}
                </td>
                <td className="py-1 px-2 border-b">
                  <img
                    src={
                      user.image ||
                      "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
                    } // Default sample image URL
                    alt={`${user.firstName || "User"} ${
                      user.lastName || "Image"
                    }`}
                    className="w-16 h-16 object-cover rounded-full shadow-md"
                  />
                </td>

                <td className="py-1 px-2 border-b text-gray-700">
                  {user.firstName}
                </td>
                <td className="py-1 px-2 border-b text-gray-700">
                  {user.lastName}
                </td>
                <td className="py-1 px-2 border-b text-gray-700">
                  {user.type}
                </td>
                <td className="py-1 px-2 border-b text-gray-700">
                  {user.whatsApp}
                </td>
                <td className="py-1 px-2 border-b text-gray-700">
                  {user.phone}
                </td>
                <td className="py-1 px-2 border-b text-gray-700">
                  {user.disabled ? "Yes" : "No"}
                </td>
                <td className="py-1 px-2 border-b text-gray-700">
                  {user.emailVerified ? "Yes" : "No"}
                </td>
                <td className="py-1 px-2 border-b text-gray-700 flex space-x-2">
                  {/* Toggle Button */}
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <span className="text-sm text-gray-700">
                      {user.disabled ? "Disabled" : "Enabled"}
                    </span>
                    <input
                      type="checkbox"
                      checked={!user.disabled}
                      onChange={() =>
                        toggleUserDisabled(user._id, !user.disabled)
                      }
                      className="hidden"
                    />
                    <div
                      className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
                        user.disabled ? "" : "bg-green-500"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                          user.disabled ? "" : "translate-x-4"
                        }`}
                      ></div>
                    </div>
                  </label>
                  <button
                    onClick={() => deleteUser(user.email)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FaTrash className="mr-2 text-lg" /> <span>Delete</span>
                  </button>
                  <button
                    onClick={() =>
                      confirmAlert({
                        title: "Change User Type",
                        message: "Select a new type for the user.",
                        buttons: [
                          {
                            label: "Customer",
                            onClick: () => changeUserType(user._id, "customer"),
                          },
                          {
                            label: "Admin",
                            onClick: () => changeUserType(user._id, "admin"),
                          },
                        ],
                      })
                    }
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FaEdit className="mr-2 text-lg" />
                    <span>Change Type</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
}
