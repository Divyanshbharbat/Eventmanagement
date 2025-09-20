import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-bold">
              EM
            </div>
            <span className="text-lg font-bold">EventManager</span>
          </div>
          <p className="text-sm leading-relaxed">
            The ultimate platform for creating, managing, and discovering amazing events.
            <br />Connect with your community and make every event memorable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
    <ul className="flex flex-col gap-4">
  <li>
    <NavLink 
      to="/home" 
      className={({ isActive }) => 
        `hover:text-white ${isActive ? "text-white font-bold" : ""}`
      }
    >
      Home
    </NavLink>
  </li>
  <li>
    <NavLink 
      to="/all-events" 
      className={({ isActive }) => 
        `hover:text-white ${isActive ? "text-white font-bold" : ""}`
      }
    >
      All Events
    </NavLink>
  </li>
  <li>
    <NavLink 
      to="/create-event" 
      className={({ isActive }) => 
        `hover:text-white ${isActive ? "text-white font-bold" : ""}`
      }
    >
      Create Event
    </NavLink>
  </li>
  <li>
    <NavLink 
      to="/admin" 
      className={({ isActive }) => 
        `hover:text-white ${isActive ? "text-white font-bold" : ""}`
      }
    >
      Admin
    </NavLink>
  </li>
</ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © 2024 EventManager. All rights reserved.
      </div>
    </footer>
  );
}
