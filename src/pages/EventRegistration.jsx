import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../index"; 
import { doc, getDoc, updateDoc, increment, collection, addDoc } from "firebase/firestore";

export default function EventRegistration() {
  const { uid } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventRef = doc(db, "events", uid);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          const data = eventSnap.data();
          setEvent(data);
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

  const handleChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName) return alert("Please enter a team name");
    setSubmitting(true);

    try {
      await addDoc(collection(db, "registrations"), {
        eventId: uid,
        teamName,
        participants: formData,
        createdAt: new Date(),
      });

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
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-purple-700 mb-6 text-center">
        Register for {event.title}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 rounded-2xl shadow-lg bg-white"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        {/* Participant Cards in 2 columns with white background and subtle shadow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.map((member, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white shadow-lg border border-gray-200 space-y-3"
            >
              <h2 className="font-semibold text-gray-700">Participant {i + 1}</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={member.name}
                onChange={(e) => handleChange(i, "name", e.target.value)}
                className="w-full border px-3 py-2 rounded-md bg-white text-gray-800"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={member.email}
                onChange={(e) => handleChange(i, "email", e.target.value)}
                className="w-full border px-3 py-2 rounded-md bg-white text-gray-800"
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={member.mobile}
                onChange={(e) => handleChange(i, "mobile", e.target.value)}
                className="w-full border px-3 py-2 rounded-md bg-white text-gray-800"
                required
              />
              <input
                type="text"
                placeholder="College Name"
                value={member.college}
                onChange={(e) => handleChange(i, "college", e.target.value)}
                className="w-full border px-3 py-2 rounded-md bg-white text-gray-800"
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-md bg-purple-700 text-white font-semibold hover:bg-purple-800 disabled:opacity-50 transition"
        >
          {submitting ? "Registering..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}
