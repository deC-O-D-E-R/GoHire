import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedPage from "./pages/ProtectedPage";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import UploadResume from "./pages/UploadResume";
import Profile from "./pages/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedPage>
            <Dashboard />
          </ProtectedPage>
        }
      />
      <Route
        path="/upload-resume"
        element={
          <ProtectedPage>
            <UploadResume />
          </ProtectedPage>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedPage>
            <Profile />
          </ProtectedPage>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
