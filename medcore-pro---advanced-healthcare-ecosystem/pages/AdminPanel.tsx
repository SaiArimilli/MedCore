
import React from 'react';
import { 
  Users, 
  Stethoscope, 
  ShoppingBag, 
  Calendar, 
  Settings, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '12,842', trend: '+12%', colorClass: 'bg-blue-50', textClass: 'text-emerald-500' },
    { label: 'Verified Doctors', value: '432', trend: '+4%', colorClass: 'bg-emerald-50', textClass: 'text-emerald-500' },
    { label: 'Total Revenue', value: '$84,200', trend: '-2%', colorClass: 'bg-amber-50', textClass: 'text-rose-500' },
    { label: 'Appointments', value: '1,204', trend: '+24%', colorClass: 'bg-rose-50', textClass: 'text-emerald-500' },
  ];

  const [users, setUsers] = React.useState(() => [
    { id: 'u1', name: 'Dr. Teja', role: 'Doctor', spec: 'Oncology', status: 'pending' },
    { id: 'u2', name: 'Dr.Vinod', role: 'Pharmacy', spec: 'Retail', status: 'pending' },
    { id: 'u3', name: 'Dr. Koushik', role: 'Doctor', spec: 'Surgery', status: 'approved' },
    { id: 'u4', name: 'Dr. Akhilesh', role: 'Doctor', spec: 'Cardio', status: 'pending' },
    { id: 'u5', name: 'Dr. Sai Prakash', role: 'Doctor', spec: 'Neuro Surgein', status: 'pending' }
  ]);

  const approveUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  };

  const rejectUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'rejected' } : u));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Platform Administration</h1>
        <p className="text-slate-500">Monitor system health and manage stakeholde
          rs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.colorClass} rounded-full group-hover:scale-150 transition-transform opacity-50`}></div>
            <div className="relative z-10">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 mb-2">{stat.value}</h3>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.textClass}`}>
                {stat.trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{stat.trend} from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">User Approvals</h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specialization</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <Users size={16} />
                        </div>
                        <span className="font-bold text-slate-700">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-6 text-sm text-slate-500">{item.role}</td>
                    <td className="py-6 text-sm text-slate-500">{item.spec}</td>
                    <td className="py-6">
                      <div className="flex gap-2">
                        <button onClick={() => approveUser(item.id)} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                          <CheckCircle size={18} />
                        </button>
                        <button onClick={() => rejectUser(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Reject">
                          <XCircle size={18} />
                        </button>
                        <span className="text-xs font-bold ml-2 uppercase tracking-wider">
                          {item.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-xl shadow-slate-200">
          <h3 className="text-xl font-bold mb-8">System Health</h3>
          <div className="space-y-8">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400">
                     <Settings size={24} />
                   </div>
                   <div>
                     <p className="font-bold text-sm">Gemini AI Engine</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v3.0 - Online</p>
                   </div>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
             </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400">
                     <Calendar size={24} />
                   </div>
                   <div>
                     <p className="font-bold text-sm">Database Sync</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Synced 2m ago</p>
                   </div>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
             </div>
             <div className="mt-12 p-6 bg-slate-800/50 rounded-3xl border border-slate-700">
                <p className="text-xs font-bold mb-4 uppercase tracking-widest text-slate-400 flex items-center gap-2">
                   <Activity size={14} className="text-blue-400" /> Infrastructure Load
                </p>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                   <div className="w-[34%] h-full bg-blue-500 transition-all duration-1000"></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 font-bold uppercase tracking-widest flex justify-between">
                   <span>Capacity Used</span>
                   <span>34%</span>
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
