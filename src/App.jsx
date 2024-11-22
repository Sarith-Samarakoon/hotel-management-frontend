import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage/admin";
import HomePage from "./pages/client-page/homePage";
import TestComponent from "./components/test/test";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/login/register";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes path="/">
          <Route path="/*" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/admin/*" element={<AdminPage />}></Route>
          <Route path="/test" element={<TestComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
