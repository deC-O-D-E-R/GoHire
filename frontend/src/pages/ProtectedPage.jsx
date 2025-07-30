import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

function ProtectedPage({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/protected/JWTvalidate")
      .then(() => setAuthorized(true))
      .catch(() => navigate("/unauthorized"));
  }, [navigate]);

  if (!authorized) return null;

  return <>{children}</>;
}

export default ProtectedPage;
