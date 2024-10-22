import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage/admin";
import HomePage from "./pages/client-page/homePage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/">
          <Route path="/*" element={<HomePage />}></Route>
          <Route path="/admin/*" element={<AdminPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
