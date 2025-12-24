import React, { useState } from 'react';
import { useAuth } from '../App';
import { Appointment } from '../types';
import { Calendar, CheckSquare, XSquare } from 'lucide-react';

const DoctorPanel: React.FC = () => {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 'a1', patientId: 'p1', patientName: 'John Doe', doctorId: 'd1', doctorName: user?.name || 'Dr', date: '2025-12-26', timeSlot: '10:00 AM', status: 'pending' },
    { id: 'a2', patientId: 'p2', patientName: 'Sara Lee', doctorId: 'd1', doctorName: user?.name || 'Dr', date: '2025-12-27', timeSlot: '02:00 PM', status: 'confirmed' },
  ]);

  const updateStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Doctor Panel</h1>
          <p className="text-slate-500">Welcome back, {user?.name}. Manage your schedule and appointments.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">New Patient</button>
          <button className="bg-white border px-4 py-2 rounded-lg">Calendar <Calendar size={16} /></button>
        </div>
      </div>

      <div className="bg-white rounded-[30px] p-6 border border-slate-100">
        <h3 className="font-bold mb-4">Today's Appointments</h3>
        <div className="space-y-4">
          {appointments.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-bold">{a.patientName}</p>
                <p className="text-sm text-slate-500">{a.date} • {a.timeSlot}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded ${a.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : a.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>{a.status}</span>
                {a.status === 'pending' && (
                  <>
                    <button onClick={() => updateStatus(a.id, 'confirmed')} className="p-2 bg-emerald-100 text-emerald-700 rounded"> <CheckSquare /> </button>
                    <button onClick={() => updateStatus(a.id, 'cancelled')} className="p-2 bg-rose-100 text-rose-700 rounded"> <XSquare /> </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorPanel;
