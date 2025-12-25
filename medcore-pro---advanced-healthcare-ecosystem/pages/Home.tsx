
import React from 'react';
import homeImage from './homeimage.webp';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Users, 
  PhoneCall, 
  Zap, 
  Microscope,
  Stethoscope,
  ShoppingBag
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -z-10 rounded-l-[100px] hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider">
              <Zap size={14} /> Future of Healthcare
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
              Compassionate <br />
              <span className="text-blue-600 italic">Care</span> Digitally <br />
              Perfected.
            </h1>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Experience end-to-end healthcare with MedCore Pro. From AI-assisted diagnostics to instant pharmacy delivery and top-tier specialist bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/booking" 
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-xl transition-all shadow-blue-200"
              >
                Find a Doctor <ArrowRight size={20} />
              </Link>
              <Link 
                to="/chatbot" 
                className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
              >
                Talk to AI Assistant
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-slate-900">50k+</p>
                <p className="text-slate-500 text-sm">Patients Served</p>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <p className="text-3xl font-bold text-slate-900">1.2k+</p>
                <p className="text-slate-500 text-sm">Specialist Doctors</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src={homeImage} 
              alt="Medical Team" 
              className="rounded-[40px] shadow-2xl relative z-10 w-full object-cover aspect-[4/5] lg:aspect-auto h-[500px] lg:h-auto"
            />
            <div className="absolute bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                 <ShieldCheck size={28} />
               </div>
               <div>
                 <p className="font-bold text-slate-800">100% Secure</p>
                 <p className="text-xs text-slate-500">HIPAA Compliant Platform</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Ecosystem of Care</h2>
            <p className="text-slate-600">We offer a complete suite of services designed to make your medical journey seamless and supportive.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Video Consultation', desc: 'Connect with top specialists from the comfort of your home.', icon: <PhoneCall className="text-blue-600" /> },
              { title: 'Pharmacy Store', desc: 'Order genuine medicines and get them delivered to your doorstep.', icon: <ShoppingBag className="text-indigo-600" /> },
              { title: 'Lab Tests', desc: 'Book samples collection and view reports online securely.', icon: <Microscope className="text-emerald-600" /> },
              { title: 'AI Symptom Checker', desc: 'Get preliminary medical advice powered by Gemini AI.', icon: <Activity className="text-rose-600" /> }
            ].map((service, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {/* Fixed line 97: Cast to any to ensure 'size' property is recognized by cloneElement */}
                  {React.cloneElement(service.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[50px] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-[120px] opacity-30"></div>
            <div className="relative z-10 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Your Health Is <br /> Our Only Priority.
              </h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto lg:mx-0">
                Join thousands of patients who trust MedCore Pro for their daily healthcare needs and medical emergencies.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-4 w-full sm:w-auto">
              <Link to="/auth" className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-center hover:bg-blue-50 transition-colors shadow-xl">
                Create Free Account
              </Link>
              <button className="border border-slate-700 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors">
                For Medical Providers
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
