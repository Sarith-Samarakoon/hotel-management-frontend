import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage/admin";
import HomePage from "./pages/client-page/homePage";
import AboutUs from "./pages/client-page/aboutusPage";
import Gallery from "./pages/client-page/galleryPage";
import ContactUs from "./pages/client-page/contactUsPage";
import Rooms from "./pages/client-page/roomsPage";
import RoomDetails from "./pages/client-page/roomBookingPage";
import UploadComponent from "./components/test/test3";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/login/register";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <ToastContainer position="top-right" reverseOrder={false} />
        <Routes path="/">
          <Route path="/*" element={<HomePage />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/rooms" element={<Rooms />}></Route>
          <Route path="/room-details/:category" element={<RoomDetails />} />
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/admin/*" element={<AdminPage />}></Route>
          <Route path="/test" element={<UploadComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
