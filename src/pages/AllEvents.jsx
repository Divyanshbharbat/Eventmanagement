import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EventCard from '../Components/EventCard'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../index";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch events with status = true
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, "events"), where("status", "==", true));
        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
     

      {/* Hero Section */}
      <section className="h-64 flex flex-col justify-center items-center text-center relative">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-purple-900"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Explore All Events
        </motion.h1>
        <motion.p
          className="text-purple-700 mt-2 max-w-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Discover approved events and join amazing experiences around you.
        </motion.p>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by event title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-purple-400 p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        />
      </section>

      {/* Events Grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {loading ? (
          <p className="text-center text-purple-600 font-medium">
            Loading events...
          </p>
        ) : filteredEvents.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                className="hover:scale-105 transform transition duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-purple-600">No events found.</p>
        )}
      </section>
    </div>
  );
}
