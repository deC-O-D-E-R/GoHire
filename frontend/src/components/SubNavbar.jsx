import { Link } from "react-router-dom";
import {
  Briefcase,
  Heart,
  Bell,
  UserCircle,
  BookOpen,
} from "lucide-react";

function SubNavbar() {
  return (
    <div className="bg-white text-foreground shadow-sm">
      <div className="hidden md:flex justify-between max-w-7xl mx-auto px-4 sm:px-8 py-3">
        <IconLink to="/jobs" icon={<Briefcase size={20} />} label="Jobs" />
        <IconLink to="/saved" icon={<Heart size={20} />} label="Saved" />
        <IconLink to="/alerts" icon={<Bell size={20} />} label="Alerts" />
        <IconLink to="/profile" icon={<UserCircle size={20} />} label="Profile" />
        <IconLink to="/resources" icon={<BookOpen size={20} />} label="Resources" />
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white flex justify-between px-6 py-3 border-t z-50">
        <IconLink to="/jobs" icon={<Briefcase size={22} />} />
        <IconLink to="/saved" icon={<Heart size={22} />} />
        <IconLink to="/alerts" icon={<Bell size={22} />} />
        <IconLink to="/profile" icon={<UserCircle size={22} />} />
        <IconLink to="/resources" icon={<BookOpen size={22} />} />
      </div>
    </div>
  );
}

function IconLink({ icon, label, to = "#" }) {
  return (
    <Link to={to} className="flex flex-col items-center text-sm font-medium hover:text-primary transition">
      {icon}
      {label && <span className="mt-1">{label}</span>}
    </Link>
  );
}

export default SubNavbar;
