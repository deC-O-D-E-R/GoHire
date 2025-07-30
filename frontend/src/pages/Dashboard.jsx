import { useNavigate } from "react-router-dom";
import { Briefcase, BarChart2, User, Settings, LogOut } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-primary">
            Welcome to your Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-teal-800 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card icon={<Briefcase />} title="My Applications" />
          <Card icon={<BarChart2 />} title="Analytics" />
          <Card icon={<User />} title="My Profile" />
          <Card icon={<Settings />} title="Account Settings" />
          <Card icon={<Briefcase />} title="Saved Jobs" />
          <Card icon={<BarChart2 />} title="Job Alerts" />
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-start space-y-4 hover:shadow-2xl transition">
      <div className="text-primary">{icon}</div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">Click to view more details</p>
    </div>
  );
}

export default Dashboard;
