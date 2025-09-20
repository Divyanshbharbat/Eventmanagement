import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Cprovider";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center text-xl font-bold text-gray-900">
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg mr-2 text-sm font-bold">
            EM
          </div>
          EventManager
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/home" className={linkClass("/home")}>Home</Link>
          <Link to="/all-events" className={linkClass("/all-events")}>All Events</Link>

          {user ? (
            <>
              <Link to="/create-event" className={linkClass("/create-event")}>Create Event</Link>
              <Link to="/admin" className={linkClass("/admin")}>Admin</Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="ml-2 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition font-medium">
                Login
              </Link>
              <Link to="/signup" className="ml-2 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition font-medium">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/home"
            className="block px-6 py-3 border-b border-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/all-events"
            className="block px-6 py-3 border-b border-gray-200"
            onClick={() => setIsOpen(false)}
          >
            All Events
          </Link>

          {user ? (
            <>
              <Link
                to="/create-event"
                className="block px-6 py-3 border-b border-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Create Event
              </Link>
              <Link
                to="/admin"
                className="block px-6 py-3 border-b border-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-left px-6 py-3 border-b border-gray-200 bg-purple-500 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-6 py-3 border-b border-gray-200 bg-purple-600 text-white"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-6 py-3 border-b border-gray-200 bg-purple-600 text-white"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
