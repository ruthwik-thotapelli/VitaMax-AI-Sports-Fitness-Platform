import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api';
import { 
  Users, 
  Calendar, 
  Activity, 
  CheckCircle, 
  X,
  XCircle, 
  Clock, 
  User,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';

const TrainerDashboard = () => {
  const [clients, setClients] = useState([
     { id: 1, name: 'Alex Johnson', goal: 'Weight Loss', progress: 65 },
     { id: 2, name: 'Sarah Miller', goal: 'Muscle Gain', progress: 42 },
     { id: 3, name: 'Mike Ross', goal: 'Strength', progress: 88 },
  ]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/schedule');
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-brand-orange/20">
               <ShieldCheck size={20} />
            </div>
            <span className="text-[10px] font-black text-brand-navy/60 uppercase tracking-[.4em]">Overseer Terminal v0.9</span>
         </div>
         <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-brand-navy leading-none uppercase">
           AGENT <span className="text-brand-orange">COMMAND</span>
         </h2>
         <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">High-level deployment management and bio-metric surveillance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Active Subjects', val: '12', icon: Users, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
          { label: 'Sessions Pending', val: '04', icon: Calendar, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
          { label: 'Completion Flux', val: '94%', icon: Activity, color: 'text-brand-lime', bg: 'bg-brand-lime/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden group"
          >
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 italic">{stat.label}</p>
            <div className="flex items-end justify-between relative z-10">
               <h3 className="text-5xl font-black italic text-brand-navy tracking-tighter leading-none">{stat.val}</h3>
               <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon size={26} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Incoming Sync Requests */}
         <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue border border-brand-blue/20">
                  <Clock size={20} />
               </div>
               <h3 className="text-2xl font-black italic text-brand-navy uppercase tracking-tighter">Transmission Feed</h3>
            </div>
            <div className="space-y-4">
               <AnimatePresence mode="popLayout">
               {bookings.map((b, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-center justify-between group"
                 >
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-brand-blue border border-gray-100 shadow-inner">
                          <User size={22} />
                       </div>
                       <div>
                          <p className="text-lg font-black text-brand-navy italic tracking-tighter leading-none uppercase">{b.user?.name || 'Protocol Subject'}</p>
                          <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10 w-fit">
                             <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
                             <p className="text-[9px] text-brand-blue font-black uppercase tracking-widest leading-none">LAUNCH: {new Date(b.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-3">
                       <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center">
                          <X size={18} />
                       </button>
                       <button className="w-10 h-10 rounded-xl bg-brand-lime/10 text-brand-navy border border-brand-lime/20 flex items-center justify-center hover:bg-brand-lime transition-all shadow-sm">
                          <CheckCircle size={18} />
                       </button>
                    </div>
                 </motion.div>
               ))}
               </AnimatePresence>
               {bookings.length === 0 && (
                  <div className="bg-white rounded-[2rem] border-2 border-dashed border-gray-100 py-20 text-center space-y-6 shadow-sm">
                     <Activity size={40} className="text-gray-200 mx-auto" />
                     <p className="text-[10px] font-black italic tracking-widest uppercase text-gray-400">Biological signal: null</p>
                  </div>
               )}
            </div>
         </div>

         {/* Client Performance Surveillance */}
         <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-brand-orange/20">
                  <TrendingUp size={20} />
               </div>
               <h3 className="text-2xl font-black italic text-brand-navy uppercase tracking-tighter">Subject Analysis</h3>
            </div>
            <div className="space-y-6">
               {clients.map((c, i) => (
                 <div 
                    key={i}
                    className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm group"
                 >
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <p className="text-xl font-black text-brand-navy italic tracking-tighter uppercase leading-tight mb-2">{c.name}</p>
                          <div className="flex items-center gap-3">
                             <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-2.5 py-1 rounded-full border border-brand-blue/10">{c.goal} PROTOCOL</span>
                             <div className="w-1 h-1 rounded-full bg-gray-200" />
                             <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Active Link</span>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-4xl font-black italic text-brand-navy tracking-tighter leading-none">{c.progress}%</p>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Optimization</p>
                       </div>
                    </div>
                    <div className="relative mb-6">
                       <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden p-0.5 border border-gray-100">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${c.progress}%` }}
                             transition={{ duration: 1.5, delay: i * 0.1 }}
                             className="h-full bg-brand-orange rounded-full relative"
                          >
                             <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </motion.div>
                       </div>
                    </div>
                    <div className="flex justify-between items-center">
                       <div className="flex -space-x-2">
                          {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-lg bg-gray-50 border-2 border-white flex items-center justify-center text-[8px] font-black text-brand-navy shadow-sm">PH{i}</div>)}
                       </div>
                       <button className="flex items-center gap-2 text-[10px] font-black text-brand-orange uppercase tracking-widest hover:gap-3 transition-all">
                          Analysis <ArrowRight size={14} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
