
import React, { useState } from 'react';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Plus, 
  Activity, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderPatientDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Next Appointment</p>
            <p className="text-lg font-bold text-slate-800">Oct 24, 10:00 AM</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Blood Pressure</p>
            <p className="text-lg font-bold text-slate-800">120/80 mmHg</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Weight</p>
            <p className="text-lg font-bold text-slate-800">72.4 kg</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Prescriptions</p>
            <p className="text-lg font-bold text-slate-800">3 Pending</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">Recent Appointments</h3>
            <Link to="/booking" className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
              New Booking <Plus size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { doctor: 'Dr. Sarah Wilson', type: 'Cardiology', date: 'Oct 12, 2024', status: 'completed' },
              { doctor: 'Dr. Michael Brown', type: 'General Checkup', date: 'Sept 28, 2024', status: 'completed' },
              { doctor: 'Dr. Elena Rodriguez', type: 'Pediatrics', date: 'Oct 24, 2024', status: 'confirmed' }
            ].map((appt, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                    <img src={`https://picsum.photos/seed/doc${i}/40`} alt="doc" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{appt.doctor}</p>
                    <p className="text-xs text-slate-500">{appt.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-700">{appt.date}</p>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    appt.status === 'confirmed' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Progress Card */}
        <div className="bg-blue-600 rounded-[40px] p-8 text-white shadow-xl shadow-blue-100">
          <h3 className="text-xl font-bold mb-6">Health Report Progress</h3>
          <div className="space-y-8">
             <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-xs font-semibold uppercase">Physical Activity</div>
                   <div className="text-xs font-semibold uppercase">80%</div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-400">
                   <div style={{ width: '80%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                </div>
             </div>
             <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-xs font-semibold uppercase">Sleep Quality</div>
                   <div className="text-xs font-semibold uppercase">65%</div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-400">
                   <div style={{ width: '65%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                </div>
             </div>
             <div className="bg-blue-500/50 p-6 rounded-3xl mt-12">
               <p className="text-sm italic">"Doing great! You've walked 10,000 steps for 5 days in a row."</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hello, {user?.name}!</h1>
          <p className="text-slate-500">Welcome to your dashboard. Stay healthy and productive.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-slate-500 hover:text-blue-600 transition-all">
             <AlertCircle size={20} />
           </button>
           <button className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-slate-500 hover:text-blue-600 transition-all">
             <CheckCircle size={20} />
           </button>
        </div>
      </div>

      {user?.role === UserRole.PATIENT && renderPatientDashboard()}
      
      {/* Generic message for other roles as they'd follow similar patterns */}
      {user?.role !== UserRole.PATIENT && (
        <div className="bg-white p-12 rounded-[40px] text-center border-2 border-dashed border-slate-200">
          <Activity size={48} className="mx-auto text-blue-600 mb-6" />
          <h2 className="text-2xl font-bold mb-2">{user?.role} Portal Under Maintenance</h2>
          <p className="text-slate-500">The advanced statistics and management tools for {user?.role} role are being synced with cloud data.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
