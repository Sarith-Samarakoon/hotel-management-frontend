import { Route, Routes } from "react-router-dom";
import AdminBooking from "../admin/Booking/adminBooking";
import AdminCategories from "../admin/Categories/adminCategories";
import AdminGalleryItems from "../admin/GalleryItem/galleryItem";
import AdminFeedback from "../admin/Feedback/feedback";
import AdminRooms from "../admin/Rooms/rooms";
import AdminUsers from "../admin/Users/users";
import AddCategoryForm from "../admin/Categories/addCategoryForm";
import { Link } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { FaHotel, FaUsers, FaComments, FaImages } from "react-icons/fa"; // Added relevant icons

export default function AdminPage() {
  return (
    <div className="w-full max-h-[100vh] overflow-hidden flex">
      <div className="w-[20%] bg-blue-400 h-[100vh] flex flex-col">
        <div className="text-white text-[30px] hover:font-bold  flex justify-start items-center px-4">
          <Link to="/admin/booking" className="flex items-center gap-2">
            <CiBookmarkCheck />
            <span>Bookings</span>
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold  flex justify-start items-center px-4">
          <Link to="/admin/category" className="flex items-center gap-2">
            <MdOutlineCategory />
            <span>Categories</span>
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold  flex justify-start items-center px-4">
          <Link to="/admin/room" className="flex items-center gap-2">
            <FaHotel />
            <span>Rooms</span>
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold  flex justify-start items-center px-4">
          <Link to="/admin/user" className="flex items-center gap-2">
            <FaUsers />
            <span>Users</span>
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold  flex justify-start items-center px-4">
          <Link to="/admin/feedback" className="flex items-center gap-2">
            <FaComments />
            <span>Feedback</span>
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold  flex justify-start items-center px-4">
          <Link to="/admin/gallery-item" className="flex items-center gap-2">
            <FaImages />
            <span>Gallery Items</span>
          </Link>
        </div>
      </div>

      <div className="w-[80%] max-h-[100vh] bg-blue-900 overflow-y-scroll">
        <Routes path="/*">
          <Route path="/booking" element={<AdminBooking />} />
          <Route path="/category" element={<AdminCategories />} />
          <Route path="/add-category" element={<AddCategoryForm />} />
          <Route path="/room" element={<AdminRooms />} />
          <Route path="/user" element={<AdminUsers />} />
          <Route path="/feedback" element={<AdminFeedback />} />
          <Route path="/gallery-item" element={<AdminGalleryItems />} />
        </Routes>
      </div>
    </div>
  );
}
