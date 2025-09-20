import { useState, useEffect } from "react";
import { db } from "../index";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import EventCard from '../Components/EventCard'
import { useAuth } from "../Cprovider";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔒 Restrict access
  useEffect(() => {
    if (!user || user.email !== "bharbatdivyansh1@gmail.com") {
      navigate("/"); 
    }
  }, [user, navigate]);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    } catch (err) {
      console.error("Error fetching events: ", err);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users: ", err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  // Accept Event
  const handleAcceptEvent = async (id) => {
    try {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, { status: "accept" });
      setEvents(events.map((ev) => (ev.id === id ? { ...ev, status: "accept" } : ev)));
    } catch (err) {
      console.error("Error updating event: ", err);
    }
  };

  // Delete Event
  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
      setEvents(events.filter((ev) => ev.id !== id));
    } catch (err) {
      console.error("Error deleting event: ", err);
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-purple-900 mb-10">
        Admin Panel
      </h1>

      {/* EVENTS SECTION */}
      <h2 className="text-2xl font-bold text-purple-900 mb-6">📅 Manage Events</h2>
      {events.length === 0 ? (
        <p className="text-purple-600 text-center mb-10">No events available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-purple-200"
            >
              <EventCard event={event} />

              {/* Status Badge */}
              <span
                className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full shadow-md ${
                  event.status === "accept"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {event.status === "accept" ? "Approved" : "Pending"}
              </span>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                {event.status !== "accept" && (
                  <button
                    onClick={() => handleAcceptEvent(event.id)}
                    className="flex-1 bg-purple-700 text-white py-2 rounded-lg shadow hover:bg-purple-800 transition font-medium"
                  >
                    Accept
                  </button>
                )}
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg shadow hover:bg-red-700 transition font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* USERS SECTION */}
      <h2 className="text-2xl font-bold text-purple-900 mb-6">👥 Manage Users</h2>
      {users.length === 0 ? (
        <p className="text-purple-600 text-center">No users registered</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-purple-200 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Id</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-purple-200">
                
                  <td className="px-6 py-3 text-purple-900">{u.id || "N/A"}</td>

                  <td className="px-6 py-3 text-purple-900">{u.email}</td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
