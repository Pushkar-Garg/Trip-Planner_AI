import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Calendar, Wallet, Users, Sparkles } from 'lucide-react';
import { generateTripPlan } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function TripForm() {
  const [formData, setFormData] = useState({
    location: '',
    days: 3,
    budget: 'moderate',
    persons: '1-2'
  });
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!formData.location) return alert('Please enter a location');
    setLoading(true);
    try {
      const plan = await generateTripPlan(formData);
      
      // Save to history
      const res = await axios.post('/api/trips', {
        ...formData,
        itinerary: plan
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate(`/results/${res.data.id}`, { state: { plan } });
    } catch (error) {
      console.error(error);
      alert('Failed to generate trip plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Plan Your Next Adventure</h1>
        <p className="text-gray-600 text-lg">Tell us your preferences and let AI craft the perfect itinerary for you.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl shadow-xl border border-black/5">
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 uppercase tracking-wider text-gray-500">
              <MapPin size={16} /> Destination
            </label>
            <input
              type="text"
              placeholder="e.g. Tokyo, Japan"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 uppercase tracking-wider text-gray-500">
              <Calendar size={16} /> Duration (Days)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all"
              value={formData.days}
              onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 uppercase tracking-wider text-gray-500">
              <Wallet size={16} /> Budget
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['cheap', 'moderate', 'luxury'].map((b) => (
                <button
                  key={b}
                  onClick={() => setFormData({ ...formData, budget: b })}
                  className={`py-2 rounded-lg border capitalize transition-all ${
                    formData.budget === b ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 uppercase tracking-wider text-gray-500">
              <Users size={16} /> Travelers
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all appearance-none"
              value={formData.persons}
              onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
            >
              <option value="individual">Individual</option>
              <option value="1-2">1-2 Persons</option>
              <option value="3-4">3-4 Persons</option>
              <option value="5-6">5-6 Persons</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2 pt-4">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Your Trip...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                Generate Trip
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
