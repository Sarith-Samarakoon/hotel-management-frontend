import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AdminUsers() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [users, setUsers] = useState([]);
  const [usersIsLoaded, setUsersIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!usersIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsers(res.data.users);
          setUsersIsLoaded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [usersIsLoaded]);

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

  function handlePlusClick() {
    navigate("/admin/add-user");
  }

  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-4xl font-extrabold mb-8  tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
          Users
        </h1>
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-6 border-b font-medium">Email</th>
              <th className="py-3 px-6 border-b font-medium">Image</th>
              <th className="py-3 px-6 border-b font-medium">First Name</th>
              <th className="py-3 px-6 border-b font-medium">Last Name</th>
              <th className="py-3 px-6 border-b font-medium">Type</th>
              <th className="py-3 px-6 border-b font-medium">WhatsApp</th>
              <th className="py-3 px-6 border-b font-medium">Phone</th>
              <th className="py-3 px-6 border-b font-medium">Disabled</th>
              <th className="py-3 px-6 border-b font-medium">Email Verified</th>
              <th className="py-3 px-6 border-b font-medium">Actions</th>
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
                <td className="py-4 px-6 border-b text-gray-700">
                  {user.email}
                </td>
                <td className="py-4 px-6 border-b">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-16 h-16 object-cover rounded-full shadow-md"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td className="py-4 px-6 border-b text-gray-700">
                  {user.firstName}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {user.lastName}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {user.type}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {user.whatsApp}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {user.phone}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {user.disabled ? "Yes" : "No"}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {user.emailVerified ? "Yes" : "No"}
                </td>
                <td className="py-4 px-6 border-b text-gray-700 flex space-x-2">
                  <button
                    onClick={() => {
                      deleteUser(user.email);
                    }}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  {/* <Link
                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
                    to={"/admin/update-user"}
                    state={user}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
