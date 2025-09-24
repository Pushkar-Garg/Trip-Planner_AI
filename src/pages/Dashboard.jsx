import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    axios.get('/api/trips', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTrips(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="p-12 text-center">Loading your trips...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">My Trips</h1>
          <p className="text-gray-500">Your past travel generations.</p>
        </div>
        <Link 
          to="/" 
          className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
        >
          Plan New Trip
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg mb-4">No trips generated yet.</p>
          <Link to="/" className="text-black font-bold hover:underline">Start planning now</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden flex flex-col"
            >
              <div className="h-40 bg-gray-100 relative">
                 <img 
                  src={`https://picsum.photos/seed/${trip.location}/600/400`} 
                  alt={trip.location}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl">{trip.location}</h3>
                  <p className="text-sm opacity-80">{trip.days} Days • {trip.budget}</p>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(trip.created_at).toLocaleDateString()}</span>
                </div>
                <Link 
                  to={`/results/${trip.id}`}
                  className="w-full py-3 rounded-xl border border-black font-bold flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all"
                >
                  View Itinerary <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
