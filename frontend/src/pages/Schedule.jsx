import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  AlertCircle, 
  Plus, 
  ChevronRight, 
  Loader2, 
  CheckCircle,
  Settings2,
  Zap,
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';

const Schedule = () => {
  const [sessions, setSessions] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    trainer_id: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sessionsRes, trainersRes] = await Promise.all([
        API.get('/schedule'),
        API.get('/trainers')
      ]);
      setSessions(sessionsRes.data);
      setTrainers(trainersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const start_time = `${formData.date} ${formData.time}:00`;
      const end_time = `${formData.date} ${parseInt(formData.time.split(':')[0]) + 1}:${formData.time.split(':')[1]}:00`;
      
      const { data } = await API.post('/bookings', {
        trainer_id: formData.trainer_id,
        start_time,
        end_time
      });
      setSessions([...sessions, data]);
      setShowModal(false);
      setFormData({ trainer_id: '', date: '', time: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-3">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue border border-brand-blue/20">
                     <CalendarIcon size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[.3em]">Dispatch Module</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none uppercase">
                 SMART <span className="text-brand-blue">SCHEDULER</span>
               </h2>
               <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">Sync biological rhythm with elite performance protocols.</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="h-14 px-8 bg-brand-orange text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 flex items-center gap-3 shadow-orange-glow italic"
            >
              <Plus size={18} /> 
              INITIALIZE RESERVE
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         {/* Main Schedule List */}
         <div className="xl:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
               {sessions.map((session, i) => (
                 <motion.div
                   key={session.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.4, delay: i * 0.05 }}
                   className="bg-brand-navy-light rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 border border-white/5 shadow-2xl group hover:border-brand-blue/20 transition-all"
                 >
                    <div className="flex flex-col items-center justify-center p-6 bg-black/20 rounded-3xl border border-white/5 shrink-0 w-28 text-center shadow-inner">
                       <span className="text-[9px] uppercase font-bold text-brand-blue mb-1 tracking-widest">
                          {new Date(session.start_time).toLocaleDateString(undefined, { month: 'short' }).toUpperCase()}
                       </span>
                       <span className="text-4xl font-black italic tracking-tighter leading-none text-white">
                          {new Date(session.start_time).getDate()}
                       </span>
                    </div>

                    <div className="flex-1 space-y-3 text-center md:text-left">
                       <div className="flex items-center justify-center md:justify-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${session.status === 'scheduled' ? 'bg-brand-lime animate-pulse' : 'bg-brand-orange'}`} />
                          <p className="text-[9px] font-bold uppercase text-gray-500 tracking-widest italic">{session.status} Protocol</p>
                       </div>
                       <h4 className="text-2xl font-black italic text-white tracking-tight leading-none uppercase">{session.trainer?.name || 'Field Expert'}</h4>
                       <div className="flex flex-wrap justify-center md:justify-start gap-5 text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                          <span className="flex items-center gap-2"><Clock size={14} className="text-brand-blue" /> {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="flex items-center gap-2"><User size={14} className="text-brand-orange" /> @{(session.trainer?.name || 'Expert').split(' ')[0].toLowerCase()}</span>
                       </div>
                    </div>

                    <div className="flex gap-3">
                       <button className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all">
                          <AlertCircle size={20} />
                       </button>
                       <button className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-gray-600 hover:bg-brand-blue/10 hover:text-brand-blue transition-all">
                          <CheckCircle size={20} />
                       </button>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>

            {sessions.length === 0 && !loading && (
               <div className="bg-brand-navy-light rounded-[2.5rem] border-2 border-dashed border-white/5 py-32 text-center space-y-6 shadow-2xl">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700 border border-white/5">
                    <CalendarIcon size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none text-white">Calendar Offline</h3>
                    <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px] italic">Awaiting scheduling commands.</p>
                  </div>
               </div>
            )}
         </div>

         {/* Sidebar: Available Neural Experts */}
         <div className="xl:col-span-4 space-y-6">
            <div className="flex items-center gap-3 px-4">
               <div className="w-1.5 h-4 bg-brand-blue rounded-full" />
               <h3 className="text-[11px] font-bold uppercase tracking-widest text-white italic">Neural Experts</h3>
            </div>
            {trainers.map((trainer, i) => (
              <motion.div 
                key={trainer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-navy-light rounded-2xl p-5 flex items-center gap-4 border border-white/5 shadow-2xl group hover:border-brand-orange/30 transition-all cursor-pointer"
              >
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-orange border border-white/10 group-hover:scale-110 transition-transform">
                    <User size={18} />
                 </div>
                 <div className="flex-1 overflow-hidden">
                    <p className="text-base font-black text-white tracking-tight uppercase italic truncate leading-none mb-1">{trainer.name}</p>
                    <p className="text-[9px] text-brand-blue font-bold uppercase tracking-widest italic opacity-80">Level 09 Overseer</p>
                 </div>
                 <ChevronRight size={16} className="text-gray-700 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
         </div>
      </div>

      {/* Booking Modal Redesign */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-brand-navy/95 backdrop-blur-md" 
               onClick={() => setShowModal(false)} 
             />
             <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               className="bg-brand-navy-light rounded-[2.5rem] w-full max-w-xl p-10 md:p-14 relative z-[210] shadow-2xl border border-white/10"
             >
                <button 
                   onClick={() => setShowModal(false)}
                   className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"
                >
                   <X size={20} />
                </button>
                
                <div className="mb-10">
                   <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-6 border border-brand-orange/20 shadow-orange-glow">
                      <Zap size={24} />
                   </div>
                   <h3 className="text-3xl font-black italic tracking-tighter text-white mb-2 uppercase leading-none">Initialize Reserve</h3>
                   <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase italic">Configure performance sync parameters</p>
                </div>
                
                <form onSubmit={handleBooking} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Select Overseer</label>
                      <select
                        value={formData.trainer_id}
                        onChange={(e) => setFormData({...formData, trainer_id: e.target.value})}
                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 text-sm font-bold text-white outline-none focus:border-brand-orange/50 transition-all cursor-pointer appearance-none"
                        required
                      >
                         <option value="" className="bg-brand-navy-light text-gray-500">-- NEURAL EXPERT --</option>
                         {trainers.map(t => (
                           <option key={t.id} value={t.id} className="bg-brand-navy-light text-white">{t.name.toUpperCase()}</option>
                         ))}
                      </select>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Date</label>
                         <input
                           type="date"
                           value={formData.date}
                           onChange={(e) => setFormData({...formData, date: e.target.value})}
                           className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 text-sm font-bold text-white outline-none focus:border-brand-orange/50 transition-all"
                           required
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Sync Launch</label>
                         <input
                           type="time"
                           value={formData.time}
                           onChange={(e) => setFormData({...formData, time: e.target.value})}
                           className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 text-sm font-bold text-white outline-none focus:border-brand-orange/50 transition-all"
                           required
                         />
                      </div>
                   </div>
                   
                   <div className="pt-6 flex gap-4">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 h-14 bg-white/5 border border-white/5 rounded-xl font-bold text-[10px] uppercase tracking-widest text-gray-600 hover:text-white transition-all italic"
                      >
                         ABORT
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-[1.5] h-14 bg-brand-orange text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-orange-glow italic disabled:opacity-50"
                      >
                         {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                         {loading ? 'LAUNCHING...' : 'INITIALIZE SYNC'}
                      </button>
                   </div>
                </form>

                <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
                   <ShieldCheck size={14} className="text-brand-lime" />
                   <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest italic">Security Mesh Protocols Active</span>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedule;
