import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import TripForm from './pages/TripForm';
import TripResults from './pages/TripResults';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#FDFDFD] text-black font-sans">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <TripForm />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/results/:id" element={
                <ProtectedRoute>
                  <TripResults />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="py-12 border-t border-black/5 mt-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                © 2026 TripAI • Powered by Gemini 3 Flash
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
