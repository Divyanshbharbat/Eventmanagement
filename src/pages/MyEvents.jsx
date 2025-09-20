import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../index";
import { useAuth } from "../Cprovider";
import { motion } from "framer-motion";

export default function MyEvents() {
  const { user, loading } = useAuth();
  const [myEvents, setMyEvents] = useState([]);
  const [showTableId, setShowTableId] = useState(null);
useEffect(()=>{
  window.scrollTo(0, 0);
},[])
  useEffect(() => {
    if (!loading && user) {
      const fetchEventsAndRegistrations = async () => {
        // 1. Fetch events created by user
        const q = query(collection(db, "events"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 2. For each event, fetch its registrations
        for (let event of eventsData) {
          const regQuery = query(collection(db, "registrations"), where("eventId", "==", event.id));
          const regSnap = await getDocs(regQuery);
          const participantsList = regSnap.docs.map(r => r.data()); // teamName + participants
          event.participantsList = participantsList;
        }

        setMyEvents(eventsData);
      };

      fetchEventsAndRegistrations();
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-purple-800 font-semibold text-xl">Loading your events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8 text-center">
        My Events
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        {myEvents.length === 0 && (
          <p className="text-center text-gray-700">You haven't created any events yet.</p>
        )}

        {myEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-purple-300 flex flex-col gap-6"
          >
            <img
              src={event.img}
              alt={event.title}
              className="w-full md:w-1/3 h-48 md:h-56 object-cover rounded-xl border border-purple-200"
            />

            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-purple-800">{event.title}</h2>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Category:</span> {event.category} |{" "}
                <span className="font-semibold">Location:</span> {event.location} |{" "}
                <span className="font-semibold">Team Size:</span> {event.teamSize}
              </p>

              <div className="mt-2">
                <button
                  onClick={() => setShowTableId(showTableId === event.id ? null : event.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {showTableId === event.id ? "Hide Teams" : "Show Teams"}
                </button>
              </div>

              {showTableId === event.id && (
                <div className="mt-4 overflow-x-auto">
                  {event.participantsList && event.participantsList.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300 text-left">
                      <thead>
                        <tr className="bg-purple-600 text-white">
                          <th className="border px-4 py-2">Team Name</th>
                          <th className="border px-4 py-2">Participants</th>
                        </tr>
                      </thead>
                      <tbody>
                        {event.participantsList.map((team, idx) => (
                          <tr key={idx} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{team.teamName}</td>
                            <td className="border px-4 py-2">
                              {team.participants
                                ? team.participants.map((m, i) => <div key={i}>{m.name}</div>)
                                : "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500 mt-2">No teams yet</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
