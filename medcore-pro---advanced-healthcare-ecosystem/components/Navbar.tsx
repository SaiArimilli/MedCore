
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../App';
import { NAV_ITEMS } from '../constants';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <span className="font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              <span className="text-blue-600">Med</span>Core
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  location.pathname === item.path ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l">
                <Link to="/dashboard" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    <UserIcon size={18} />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-700 leading-none">{user.name}</p>
                    <p className="text-slate-400 uppercase tracking-tighter text-[10px] mt-0.5">{user.role}</p>
                  </div>
                </Link>
                <button 
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 font-medium">Dashboard</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="block py-2 text-red-500 font-medium w-full text-left">Logout</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)} className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
