import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../../utils/mediaUpload";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddStaffForm() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [salary, setSalary] = useState(0);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Upload the image to Supabase
      uploadMediaToSupabase(image)
        .then(() => {
          const { data, error } = supabase.storage
            .from("Images")
            .getPublicUrl(image.name);
          if (error) {
            throw new Error("Failed to get public URL for the image");
          }

          const publicUrl = data.publicUrl;

          // Prepare payload
          const staffInfo = {
            name,
            position,
            email,
            phoneNumber,
            dateOfJoining,
            employmentType,
            salary,
            image: publicUrl,
          };

          console.log("Payload sent to backend:", staffInfo);

          // Send payload to backend
          return axios.post(
            import.meta.env.VITE_BACKEND_URL + "/api/staff",
            staffInfo,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
        })
        .then(() => {
          setIsLoading(false);
          toast.success("Staff member added successfully!");
          // Reset form
          setName("");
          setPosition("");
          setDepartment("");
          setEmail("");
          setPhoneNumber("");
          setDateOfJoining("");
          setEmploymentType("");
          setSalary(0);
          setImage(null);
        })
        .catch((err) => {
          console.error("Error adding staff member:", err.message);
          setIsLoading(false);
          toast.error("Error adding staff member!");
        });
    }, 1000);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Add New Staff Member</h1>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter staff name"
            required
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

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Profile Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Add Staff</span>
          )}
        </button>
      </form>
    </div>
  );
}
