import { MapPin, Users } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Cprovider";
import {toast} from 'react-hot-toast'
export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Generate unique participant colors
  const participantColors = useMemo(() => {
    const palette = [
      "bg-red-100 text-red-700",
      "bg-blue-100 text-blue-700",
      "bg-green-100 text-green-700",
      "bg-purple-100 text-purple-700",
      "bg-yellow-100 text-yellow-700",
      "bg-pink-100 text-pink-700",
    ];
    return Array.from({ length: event.participants || 0 }, (_, i) => palette[i % palette.length]);
  }, [event.participants]);

  const handleJoin = () => {
    if (!user) {
      toast.error("Please login to participate in this event");
      navigate("/login");
    } else {
     toast.success(`/event/${event.id}`);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-md overflow-hidden hover:shadow-xl transition duration-300 rounded-lg">
      {/* Image Section */}
      <div className="relative h-44 group overflow-hidden">
        <img
          src={event.img}
          alt={event.title}
          className="w-full h-full object-cover transition duration-500 group-hover:blur-sm"
        />

        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
          {event.category}
        </span>

        {/* Date Badge */}
        <div className="absolute top-3 right-3 bg-white shadow px-3 py-1 text-center rounded-md">
          <p className="text-lg font-bold text-gray-900">{event.day}</p>
          <p className="text-xs text-gray-600">{event.month}</p>
        </div>

        {/* Prize Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
          <p className="text-2xl font-bold text-white">🏆 Prize Pool: ₹{event.prize}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col">
        <h2 className="text-lg font-bold text-purple-700">{event.title}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{event.description}</p>

        {/* Details */}
        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{event.location}</span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-purple-700">
              {event.participants > 0
                ? `${event.participants} participant${event.participants > 1 ? "s" : ""}`
                : "No participants yet"}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleJoin}
          className="mt-4 w-full bg-indigo-600 text-white py-2 font-medium rounded-md hover:bg-indigo-700 transition"
        >
          Join Event
        </button>
      </div>
    </div>
  );
}
