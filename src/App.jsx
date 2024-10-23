import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage/admin";
import HomePage from "./pages/client-page/homePage";
import TestComponent from "./components/test/test";
import LoginPage from "./pages/login/login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/">
          <Route path="/*" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/admin/*" element={<AdminPage />}></Route>
          {/* <Route path="/test" element={<TestComponent />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
