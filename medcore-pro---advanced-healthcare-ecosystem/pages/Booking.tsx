
import React, { useState } from 'react';
import { MOCK_DOCTORS } from '../constants';
import { Star, Calendar, Clock, MapPin, Search, Filter, CheckCircle2 } from 'lucide-react';

const Booking: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const filteredDoctors = MOCK_DOCTORS.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  // Example dynamic dates (Mon-Fri) relative to today
  const baseDate = new Date();
  const days = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    return {
      label: d.toLocaleDateString(undefined, { weekday: 'short' }),
      day: d.getDate(),
      iso: d.toISOString().split('T')[0]
    };
  });

  // Example available slots per date index (could come from API)
  const slotsByDate: Record<number, string[]> = {
    0: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'],
    1: ['08:30 AM', '11:00 AM', '01:30 PM', '03:45 PM'],
    2: ['09:15 AM', '10:45 AM', '12:00 PM', '05:00 PM'],
    3: ['07:30 AM', '09:00 AM', '02:30 PM', '04:00 PM'],
    4: ['08:00 AM', '11:30 AM', '01:00 PM', '03:00 PM']
  };

  const handleBooking = () => {
    if (!selectedDoctor) {
      alert('Please select a doctor first.');
      return;
    }
    if (!selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    setBooked(true);
    // simple mock confirmation flow
    setTimeout(() => {
      setBooked(false);
      setSelectedDoctor(null);
      setSelectedSlot(null);
      alert('Appointment confirmed for ' + selectedSlot + ' on ' + days[selectedDateIndex].iso);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Find Your Specialist</h1>
        <p className="text-slate-500 text-lg">Book an appointment with world-class medical experts.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Search & List */}
        <div className="flex-grow space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by doctor name or specialty..."
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => setSelectedDoctor(doc.id)}
                className={`p-6 rounded-[30px] border-2 transition-all cursor-pointer group ${
                  selectedDoctor === doc.id ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-white bg-white hover:border-blue-100 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-slate-900 text-lg">{doc.name}</h3>
                    <p className="text-blue-600 text-sm font-semibold">{doc.specialization}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="text-xs font-bold text-slate-700">{doc.rating}</span>
                      <span className="text-xs text-slate-400 ml-1">(120+ reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin size={14} />
                    <span className="text-xs">MedCore Central Clinic</span>
                  </div>
                  <button className="text-xs font-bold text-blue-600 group-hover:underline">Select Slot</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selection & Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm sticky top-24">
            {selectedDoctor ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h3 className="text-xl font-bold text-slate-900">Booking Summary</h3>
                <div className="p-4 bg-slate-50 rounded-2xl">
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Doctor</p>
                   <p className="font-bold text-slate-800">{MOCK_DOCTORS.find(d => d.id === selectedDoctor)?.name}</p>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-3">Select Date</label>
                   <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {days.map((d, i) => (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => { setSelectedDateIndex(i); setSelectedSlot(null); }}
                          className={`flex-shrink-0 w-14 h-16 rounded-xl flex flex-col items-center justify-center font-bold text-sm transition-all ${
                            selectedDateIndex === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <span>{d.label}</span>
                          <span className="text-xs opacity-70">{d.day}</span>
                        </button>
                      ))}
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-3">Available Slots</label>
                   <div className="grid grid-cols-2 gap-2">
                      {(slotsByDate[selectedDateIndex] || []).map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedSlot(time)}
                          className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                            selectedSlot === time
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                   </div>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={booked || !selectedSlot}
                  className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${
                    booked ? 'bg-green-500 text-white' : !selectedSlot ? 'bg-slate-300 text-slate-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  }`}
                >
                  {booked ? <span className="flex items-center justify-center gap-2"><CheckCircle2 /> Booking Confirmed</span> : 'Confirm Appointment'}
                </button>
                <p className="text-[10px] text-slate-400 text-center">By confirming, you agree to our cancellation policy.</p>
              </div>
            ) : (
              <div className="text-center py-12">
                 <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
                 <p className="text-slate-500">Please select a doctor to see available time slots.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
