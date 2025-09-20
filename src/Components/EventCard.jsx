import { MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Cprovider";

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showFullDesc, setShowFullDesc] = useState(false);
console.log(event)
  const participantColors = useMemo(() => {
    const palette = [
      "bg-red-200 text-red-900",
      "bg-blue-200 text-blue-900",
      "bg-green-200 text-green-900",
      "bg-purple-200 text-purple-900",
      "bg-yellow-200 text-yellow-900",
      "bg-pink-200 text-pink-900",
    ];
    return Array.from({ length: event.participants || 0 }, (_, i) => palette[i % palette.length]);
  }, [event.participants]);

  const handleJoin = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/event/${event.id}`);
    }
  };

  const toggleDescription = () => setShowFullDesc(!showFullDesc);

  return (
    <div className="w-full max-w-sm bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg hover:shadow-2xl overflow-hidden rounded-lg text-white transform transition duration-500 hover:-translate-y-2 hover:scale-105">
      
      {/* Image */}
      <div className="relative h-44 group overflow-hidden rounded-t-lg">
        <img
          src={event.img}
          alt={event.title}
          className="w-full h-full object-cover transition duration-500 group-hover:brightness-75"
        />
        {/* Category */}
        <span className="absolute top-3 left-3 bg-white/30 text-white text-xs font-medium px-3 py-1 rounded-full">
          {event.category}
        </span>
        {/* Prize Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
          <p className="text-2xl font-bold text-white">🏆 Prize Pool: ₹{event.prize}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col">
        <h2 className="text-lg font-bold text-white">{event.title}</h2>

        {/* Description with Read More */}
        <p className="text-white text-sm mt-1">
          {showFullDesc ? event.description : `${event.description.slice(0, 100)}... `}
          {event.description.length > 100 && (
            <button
              onClick={toggleDescription}
              className="text-yellow-300 font-semibold ml-1 hover:underline"
            >
              {showFullDesc ? "Show Less" : "Read More"}
            </button>
          )}
        </p>

        {/* Event Details */}
        <div className="mt-3 space-y-2 text-sm text-white">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            <span>{event.location}</span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-white" />
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-semibold shadow-sm">
              {event.participants > 0
                ? `${event.participants} participant${event.participants > 1 ? "s" : ""}`
                : "No participants yet"}
            </span>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Start:</span>
            <span>{event.startDate}</span>
            <span className="text-sm font-semibold text-white ml-2">End:</span>
            <span>{event.endDate}</span>
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={handleJoin}
          className="mt-4 w-full bg-white text-purple-900 py-2 font-medium rounded-md hover:bg-indigo-700 transition shadow-md hover:shadow-xl"
        >
          Join Event
        </button>
      </div>
    </div>
  );
}
