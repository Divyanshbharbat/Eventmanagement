import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../index";
import { useAuth } from "../Cprovider";
import { toast } from "react-hot-toast";

export default function CreateEvent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    teamSize: "",
    imgURL: "",
    prize: "",
    category: "",
  });

  // Scroll to top and check auth
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!loading && !user) {
      toast.success("Please login to create an event");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create an event");
      navigate("/login");
      return;
    }

    const {
      title,
      startDate,
      endDate,
      location,
      teamSize,
      imgURL,
      prize,
      description,
      category,
    } = event;

    if (!title || !startDate || !endDate || !location || !teamSize || !imgURL || !prize || !description || !category) {
      return alert("Please fill all fields including category");
    }

    if (new Date(endDate) < new Date(startDate)) {
      return alert("End date cannot be before start date");
    }

    try {
      await addDoc(collection(db, "events"), {
        ...event,
        teamSize: Number(teamSize),
        participants: 0,
        status: false,
        img: event.imgURL,
        userId: user?.uid,
        createdAt: serverTimestamp(),
      });

      toast.success("Event Created Successfully!");
      setEvent({
        title: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        teamSize: "",
        imgURL: "",
        prize: "",
        category: "",
      });
      navigate("/all-events");
    } catch (err) {
      console.error(err);
      toast.error("Error creating event: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-purple-800 font-semibold text-xl">Checking login status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8 text-center">
        Create New Event
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 rounded-2xl p-6 md:p-8 bg-gradient-to-r from-purple-600 to-blue-500 shadow-2xl border border-purple-300"
      >
        {/* Left: Form */}
        <div className="flex-1">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Event Title"
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="date"
              placeholder="Start Date"
              value={event.startDate}
              onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="date"
              placeholder="End Date"
              value={event.endDate}
              onChange={(e) => setEvent({ ...event, endDate: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="text"
              placeholder="Location"
              value={event.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="number"
              placeholder="Team Size"
              value={event.teamSize}
              onChange={(e) => setEvent({ ...event, teamSize: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={event.imgURL}
              onChange={(e) => setEvent({ ...event, imgURL: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="text"
              placeholder="Prize"
              value={event.prize}
              onChange={(e) => setEvent({ ...event, prize: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <select
              value={event.category}
              onChange={(e) => setEvent({ ...event, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            >
              <option value="">Select Category</option>
              <option value="Technical">Technical</option>
              <option value="Sport">Sport</option>
              <option value="Food">Food</option>
              <option value="Gaming">Gaming</option>
              <option value="Dance">Dance</option>
            </select>
            <textarea
              placeholder="Description"
              value={event.description}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-white text-purple-800 rounded-lg hover:bg-purple-800 transition font-semibold shadow-md hover:shadow-xl"
            >
              Create Event
            </button>
          </form>
        </div>

        {/* Right: Image Preview */}
        <div className="flex-1 flex items-center justify-center">
          {event.imgURL ? (
            <motion.img
              src={event.imgURL}
              alt="Event Preview"
              className="rounded-xl shadow-lg max-h-72 object-cover border border-purple-200"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <div className="w-full h-72 border-2 border-dashed border-purple-300 rounded-xl flex items-center justify-center text-white">
              Image Preview
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
