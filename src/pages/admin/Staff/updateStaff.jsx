import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateStaffForm() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    window.location.href = "/admin/staff";
  }

  const [name, setName] = useState(location.state.name);
  const [position, setPosition] = useState(location.state.position);
  const [department, setDepartment] = useState(location.state.department);
  const [email, setEmail] = useState(location.state.email);
  const [phoneNumber, setPhoneNumber] = useState(location.state.phoneNumber);
  const [dateOfJoining, setDateOfJoining] = useState(
    new Date(location.state.dateOfJoining).toISOString().split("T")[0] // Format the date for <input type="date" />
  );
  const [employmentType, setEmploymentType] = useState(
    location.state.employmentType
  );
  const [salary, setSalary] = useState(location.state.salary);
  const [image, setImage] = useState(location.state.image);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Validate required fields
      if (!name || !position || !department || !email || !phoneNumber) {
        toast.error("Please fill in all required fields.");
        setIsLoading(false);
        return;
      }

      // Prepare the staff info object with the existing image by default
      const staffInfo = {
        position,
        email,
        phoneNumber,
        dateOfJoining,
        employmentType,
        salary,
        image: location.state.image, // Default to the existing image
      };

      // Check if a new image is uploaded
      if (image && typeof image === "object" && image.name) {
        // Upload the new image
        uploadMediaToSupabase(image)
          .then(() => {
            const { data, error } = supabase.storage
              .from("Images")
              .getPublicUrl(image.name);

            if (error) {
              throw new Error("Failed to get public URL for the image");
            }

            // Update the image URL in the staff info
            staffInfo.image = data.publicUrl;

            // Send updated staff info to the backend
            return axios.put(
              import.meta.env.VITE_BACKEND_URL +
                "/api/staff/" +
                location.state._id,
              staffInfo,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
          })
          .then(() => {
            toast.success("Staff member updated successfully!");
            navigate("/admin/staff");
          })
          .catch((err) => {
            console.error("Error updating staff member:", err.message);
            toast.error("Error updating staff member!");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        // If no new image is uploaded, only update the other details
        axios
          .put(
            import.meta.env.VITE_BACKEND_URL +
              "/api/staff/" +
              location.state._id,
            staffInfo,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then(() => {
            toast.success("Staff member updated successfully!");
            navigate("/admin/staff");
          })
          .catch((err) => {
            console.error("Error updating staff member:", err.message);
            toast.error("Error updating staff member!");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, 1000);
  };

  return (
    <div className="w-full h-screen lg:h-[80vh] md:h-[70vh] sm:h-[60vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-[720px] space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Update Staff Member
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter staff name"
                required
                disabled
              />
            </div>

            {/* Position */}
            <div>
              <label className="block font-medium mb-1">Position</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter position"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Date of Joining */}
            <div>
              <label className="block font-medium mb-1">Date of Joining</label>
              <input
                type="date"
                value={dateOfJoining}
                onChange={(e) => setDateOfJoining(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="block font-medium mb-1">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select employment type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Salary */}
            <div>
              <label className="block font-medium mb-1">Salary</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter salary"
                required
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block font-medium mb-1">Profile Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update Staff</span>
          )}
        </button>
      </form>
    </div>
  );
}
