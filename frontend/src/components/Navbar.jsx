import { Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="text-2xl font-bold text-primary flex-shrink-0 flex items-center gap-1">
          <span className="text-primary">Go</span>
          <span className="text-accent">Hire</span>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, companies..."
              className="w-full py-2 pl-10 pr-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
        </div>

        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-foreground hover:text-primary transition text-lg">Home</a>
          {isLoggedIn ? (
            <>
              <a href="/dashboard" className="text-foreground hover:text-primary transition text-lg">Dashboard</a>
              <button onClick={handleLogout} className="text-foreground hover:text-primary transition text-lg">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/register" className="text-foreground hover:text-primary transition text-lg">Register</a>
              <a href="/login" className="text-foreground hover:text-primary transition text-lg">Login</a>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white">
          <a href="/" className="block text-foreground hover:text-primary text-base">Home</a>
          {isLoggedIn ? (
            <>
              <a href="/dashboard" className="block text-foreground hover:text-primary text-base">Dashboard</a>
              <button onClick={handleLogout} className="block text-foreground hover:text-primary text-base">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/register" className="block text-foreground hover:text-primary text-base">Register</a>
              <a href="/login" className="block text-foreground hover:text-primary text-base">Login</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
