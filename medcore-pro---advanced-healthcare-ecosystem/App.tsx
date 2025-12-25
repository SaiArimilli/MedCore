
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import DoctorPanel from './pages/DoctorPanel';
import Booking from './pages/Booking';
import Pharmacy from './pages/Pharmacy';
import ChatbotPage from './pages/ChatbotPage';
import AdminPanel from './pages/AdminPanel';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: UserRole) => {
    // Mock login logic
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      role: role
    };
    setUser(mockUser);
    localStorage.setItem('med_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('med_user');
  };

  useEffect(() => {
    const stored = localStorage.getItem('med_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/pharmacy" element={<Pharmacy />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={user ? <Dashboard /> : <Navigate to="/auth" />} 
              />
              <Route
                path="/doctor"
                element={user?.role === UserRole.DOCTOR ? <DoctorPanel /> : <Navigate to="/" />}
              />
              <Route 
                path="/admin" 
                element={user?.role === UserRole.ADMIN ? <AdminPanel /> : <Navigate to="/" />} 
              />
              {/* Dev-only preview route for AdminPanel (no auth) */}
              <Route path="/admin-preview" element={<AdminPanel />} />
            </Routes>
          </main>
          
          <footer className="bg-slate-900 text-white py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-blue-400">Med</span>Core Pro
                </h3>
                <p className="text-slate-400">Leading the digital transformation in healthcare. Compassionate care through technology.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                  <li><a href="#" className="hover:text-blue-400">Services</a></li>
                  <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Emergency</h4>
                <p className="text-slate-400">24/7 Helpline: 1-800-MED-CARE</p>
                <button className="mt-4 bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full font-bold transition-colors">
                  SOS Button
                </button>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-slate-400">support@medcorepro.com</p>
                <p className="text-slate-400">Silicon Valley, CA</p>
              </div>
            </div>
            <div className="text-center mt-12 pt-8 border-t border-slate-800 text-slate-500 text-sm">
              &copy; 2024 MedCore Pro. All rights reserved.
            </div>
          </footer>
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
