import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.interceptors.request.use((config) => {
  const publicPaths = ["/api/auth/login", "/api/auth/register"];
  const isPublic = publicPaths.some((path) => config.url.includes(path));

  if (!isPublic) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default instance;
