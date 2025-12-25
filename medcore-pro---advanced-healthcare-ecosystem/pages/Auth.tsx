
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { Lock, Mail, User, Phone, CheckCircle2 } from 'lucide-react';

const Auth: React.FC = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, role);
    }
  };

  // Local mock OAuth handlers (no external Firebase)
  const handleGoogle = async () => {
    const uid = Math.random().toString(36).slice(2, 10);
    login(`${uid}@google.mock`, role);
  };

  const handleFacebook = async () => {
    const uid = Math.random().toString(36).slice(2, 10);
    login(`${uid}@facebook.mock`, role);
  };

  // Read query params to pre-select role and open sign-up when navigated from CTA
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const r = params.get('role');
    const signup = params.get('signup');
    if (r) {
      // Map string role to enum if possible
      if ((Object as any).values(UserRole).includes(r)) {
        setRole(r as UserRole);
      }
    }
    if (signup === '1' || signup === 'true') {
      setIsLogin(false);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl shadow-blue-100 overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Illustration & Text */}
        <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">MedCore Pro</h2>
            <p className="text-blue-100 text-lg">
              {isLogin 
                ? "Welcome back! Access your medical reports, schedule consultations, and manage your health." 
                : "Join our healthcare community today. Better health is just a few clicks away."}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-blue-300" />
              <span>Secure HIPAA Compliant Data</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-blue-300" />
              <span>Verified Medical Specialists</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="flex gap-4 mb-8 p-1 bg-slate-100 rounded-2xl">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${isLogin ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${!isLogin ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {[UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN, UserRole.PHARMACY].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-4 rounded-lg border-2 text-xs font-bold transition-all ${
                      role === r ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
              />
            </div>

            {!isLogin && (
              <div className="relative animate-in fade-in slide-in-from-top-2">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                />
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 mt-4 active:scale-[0.98]"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="text-center mt-6">
              <p className="text-slate-400 text-sm">
                Or continue with
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button type="button" onClick={handleGoogle} className="p-3 border rounded-xl hover:bg-slate-50 transition-all">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                </button>
                <button type="button" onClick={handleFacebook} className="p-3 border rounded-xl hover:bg-slate-50 transition-all">
                   <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
