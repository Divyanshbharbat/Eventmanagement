import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventCard from "../Components/EventCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../index";

export default function Home() {
  const [events, setEvents] = useState([]);

  // Fetch approved events from Firestore
  const fetchEvents = async () => {
    try {
      const q = query(collection(db, "events"), where("status", "==", true));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    } catch (err) {
      console.error("Error fetching events: ", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section 
        className="relative h-[80vh] sm:h-[90vh] flex flex-col justify-center items-center text-center bg-cover bg-center overflow-hidden px-4"
        style={{ backgroundImage: "url('/hero-background.jpg')" }}
      >
        <div className="relative z-10 max-w-3xl">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg leading-snug sm:leading-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Discover & Join <span className="text-purple-400">Unforgettable Events</span>
          </motion.h1>

          <motion.p 
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Explore upcoming events, connect with amazing people, and create lasting memories.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <a 
              href="all-events"
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-semibold shadow-lg transition"
            >
              Explore Events
            </a>
            <a 
              href="/create-event"
              className="px-6 py-3 bg-white text-blue-700 hover:bg-gray-100 rounded-full font-semibold shadow-lg transition"
            >
              Create Event
            </a>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-12 sm:py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-center">Upcoming Events</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {events.length > 0 ? (
            events.map(event => (
              <motion.div
                key={event.id}
                className="hover:scale-105 transform transition duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 mt-10">No upcoming events available.</p>
          )}
        </motion.div>
      </section>

      {/* Why Events Section */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Why Attend Events?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { img: "https://cdn.leonardo.ai/users/91c398ec-b0c3-4153-970f-9ac8075e2f67/generations/d93e350b-3ee7-48c4-9c16-42fe461fe273/segments/4:4:1/Flux_Dev_create_a_picture_of_a_group_of_people_from_diverse_ba_3.jpg", title: "Networking", desc: "Connect with like-minded people and grow your opportunities." },
            { img: "https://cdn.leonardo.ai/users/91c398ec-b0c3-4153-970f-9ac8075e2f67/generations/d93e350b-3ee7-48c4-9c16-42fe461fe273/segments/2:4:1/Flux_Dev_create_a_picture_of_a_group_of_people_from_diverse_ba_1.jpg", title: "Learning", desc: "Gain knowledge from experts, workshops, and experiences." },
            { img: "https://cdn.leonardo.ai/users/91c398ec-b0c3-4153-970f-9ac8075e2f67/generations/d93e350b-3ee7-48c4-9c16-42fe461fe273/segments/1:4:1/Flux_Dev_create_a_picture_of_a_group_of_people_from_diverse_ba_0.jpg", title: "Experience", desc: "Participate in fun and engaging events to create memories." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center p-6 border rounded-lg bg-white hover:shadow-md transition"
              whileHover={{ scale: 1.03 }}
            >
              <img src={item.img} alt={item.title} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-400 text-center text-white rounded-xl mx-2 sm:mx-10 md:mx-20 shadow-xl">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Host Your Own Event!
        </motion.h2>
        <motion.p
          className="mb-6 text-base sm:text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Create and manage your events easily on our platform.
        </motion.p>
        <motion.a
          href="/create-event"
          className="px-6 sm:px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition duration-300 inline-block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Create Event
        </motion.a>
      </section>

    </div>
  );
}
