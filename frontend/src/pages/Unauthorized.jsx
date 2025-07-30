import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center space-y-6">
        <div className="flex justify-center text-red-500">
          <AlertCircle size={48} />
        </div>
        <h2 className="text-2xl font-semibold text-primary">Access Denied</h2>
        <p className="text-gray-600">
          You must be logged in to view this page.
        </p>
        <Link
          to="/login"
          className="text-primary hover:underline text-base transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
