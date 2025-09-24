import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="border-bottom border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
            <Plane size={24} />
          </div>
          <span>TripAI</span>
        </Link>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 font-medium text-gray-600 hover:text-black transition-colors">
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-bold leading-none">{user?.name}</span>
                  <span className="text-xs text-gray-400">{user?.email}</span>
                </div>
                <button 
                  onClick={() => { logout(); navigate('/login'); }}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-all"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-bold text-gray-600 hover:text-black">Login</Link>
              <Link to="/register" className="bg-black text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
