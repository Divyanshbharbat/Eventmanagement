// src/pages/EventRegistration.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../index"; // your firebase.js config
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
} from "firebase/firestore";

export default function EventRegistration() {
  const { uid } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventRef = doc(db, "events", uid);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          const data = eventSnap.data();
          setEvent(data);

          // initialize form fields based on team size
          const initial = Array.from({ length: data.teamSize || 1 }, () => ({
            name: "",
            email: "",
            mobile: "",
            college: "",
          }));
          setFormData(initial);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [uid]);

  // Handle form input
  const handleChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    setFormData(updated);
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save registration
      await addDoc(collection(db, "registrations"), {
        eventId: uid,
        participants: formData,
        createdAt: new Date(),
      });

      // Increment event participants by 1
      const eventRef = doc(db, "events", uid);
      await updateDoc(eventRef, {
        participants: increment(1),
      });

      alert("✅ Registration Successful!");
      navigate(`/home`);
    } catch (err) {
      console.error("Error registering:", err);
      alert("❌ Failed to register. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading event...</p>;
  if (!event) return <p className="text-center mt-10">Event not found</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">
        Register for {event.title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formData.map((member, i) => (
          <div
            key={i}
            className="border p-4 rounded-md bg-gray-50 space-y-3"
          >
            <h2 className="font-semibold text-gray-700">
              Participant {i + 1}
            </h2>
            <input
              type="text"
              placeholder="Full Name"
              value={member.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={member.email}
              onChange={(e) => handleChange(i, "email", e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={member.mobile}
              onChange={(e) => handleChange(i, "mobile", e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="College Name"
              value={member.college}
              onChange={(e) => handleChange(i, "college", e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? "Registering..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}
