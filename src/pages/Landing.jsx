import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Globe,
  Star,
  Laptop,
  Briefcase,
  Palette,
  Dumbbell,
  Music,
  Utensils,
  BookOpen,
  HeartPulse,
} from "lucide-react";

export default function Landing() {
  const categories = [
    { name: "Technology", icon: <Laptop size={28} />, color: "bg-blue-500" },
    { name: "Business", icon: <Briefcase size={28} />, color: "bg-green-500" },
    { name: "Arts", icon: <Palette size={28} />, color: "bg-purple-500" },
    { name: "Sports", icon: <Dumbbell size={28} />, color: "bg-orange-500" },
    { name: "Music", icon: <Music size={28} />, color: "bg-pink-500" },
    { name: "Food", icon: <Utensils size={28} />, color: "bg-yellow-500" },
    { name: "Education", icon: <BookOpen size={28} />, color: "bg-indigo-500" },
    { name: "Health", icon: <HeartPulse size={28} />, color: "bg-red-500" },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 relative">
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28 md:pt-32">

        {/* Hero Section */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 leading-snug sm:leading-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-purple-600">EventManager</span>
        </motion.h1>

        <motion.p
          className="mb-8 text-base sm:text-lg md:text-xl text-gray-600 max-w-xl sm:max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Discover amazing events happening around you or create your own
          memorable experiences. Connect with your community and make every
          moment count.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/create-event"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md hover:shadow-lg transition font-semibold rounded-full"
          >
            Create Event
          </Link>
          <Link
            to="/all-events"
            className="px-6 py-3 border border-purple-500 text-purple-600 hover:bg-purple-50 transition font-semibold rounded-full"
          >
            Browse Events
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900">1,234</h3>
            <p className="text-gray-600">Total Events</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Users className="w-8 h-8 text-purple-700 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900">12,456</h3>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Globe className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900">45</h3>
            <p className="text-gray-600">Cities</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900">98%</h3>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          className="mt-16 sm:mt-20 w-full max-w-6xl px-2 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
            Event Categories
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Find events that match your interests
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`${cat.color} flex flex-col items-center justify-center p-6 text-white rounded-lg shadow hover:shadow-lg transition`}
              >
                {cat.icon}
                <span className="mt-3 font-semibold text-sm sm:text-base">{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
