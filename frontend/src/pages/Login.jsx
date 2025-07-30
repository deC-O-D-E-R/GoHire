import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import axios from "../utils/axiosInstance";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.data.startsWith("Bearer ")) {
        localStorage.setItem("token", res.data.replace("Bearer ", ""));
        navigate("/");
      } else {
        setError(res.data);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-semibold text-center text-primary">Welcome Back</h2>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full px-12 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Mail className="absolute left-4 top-3.5 text-foreground" size={20} />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full px-12 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Lock className="absolute left-4 top-3.5 text-foreground" size={20} />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded-xl hover:bg-teal-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
