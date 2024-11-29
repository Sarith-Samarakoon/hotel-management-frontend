import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AdminStaff() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [staff, setStaff] = useState([]);
  const [staffIsLoaded, setStaffIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!staffIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/staff", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setStaff(res.data.staff);
          setStaffIsLoaded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [staffIsLoaded]);

  function deleteStaff(id) {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete this staff member?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(import.meta.env.VITE_BACKEND_URL + "/api/staff/" + id, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(() => {
                setStaffIsLoaded(false);
                toast.success("Staff member deleted successfully!");
              })
              .catch(() => {
                toast.error("Error deleting staff member!");
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
    navigate("/admin/add-staff");
  }

  return (
    <div className="w-full">
      <button
        onClick={handlePlusClick}
        className="bg-red-600 w-[60px] h-[60px] rounded-full text-2xl text-center flex justify-center items-center fixed bottom-5 right-7"
      >
        <FaPlus color="white" />
      </button>
      <div className="p-4">
        <h1 className="text-4xl font-extrabold mb-8 tracking-wide leading-snug shadow-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-8 py-4 rounded-full w-[480px]">
          Staff Management
        </h1>
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-6 border-b font-medium">Name</th>
              <th className="py-3 px-6 border-b font-medium">Position</th>
              <th className="py-3 px-6 border-b font-medium">Email</th>
              <th className="py-3 px-6 border-b font-medium">Phone</th>
              <th className="py-3 px-6 border-b font-medium">
                Date of Joining
              </th>
              <th className="py-3 px-6 border-b font-medium">
                Employment Type
              </th>
              <th className="py-3 px-6 border-b font-medium">Salary</th>
              <th className="py-3 px-6 border-b font-medium">Image</th>
              <th className="py-3 px-6 border-b font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 border-b text-gray-700">
                  {member.name}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {member.position}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {member.email}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {member.phoneNumber}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {new Date(member.dateOfJoining).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {member.employmentType}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  ${member.salary}
                </td>
                <td className="py-4 px-6 border-b">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 object-cover rounded-full shadow-md"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-4 px-6 border-b text-gray-700 flex space-x-2">
                  <button
                    onClick={() => deleteStaff(member._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <Link
                    to={"/admin/update-staff"}
                    state={member}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
