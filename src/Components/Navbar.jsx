import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Cprovider";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-md font-medium transition ${
      location.pathname === path
        ? "bg-purple-100 text-purple-600"
        : "text-gray-700 hover:text-purple-600"
    }`;

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 h-16 flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center text-xl font-bold text-gray-900">
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg mr-2 text-sm font-bold">
            EM
          </div>
          EventManager
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/home" className={linkClass("/home")}>
            Home
          </Link>

          <Link to="/all-events" className={linkClass("/all-events")}>
            All Events
          </Link>

          {user ? (
            <>
              <Link to="/create-event" className={linkClass("/create-event")}>
                Create Event
              </Link>

              <Link to="/admin" className={linkClass("/admin")}>
                Admin
              </Link>

              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-2 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ml-2 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
