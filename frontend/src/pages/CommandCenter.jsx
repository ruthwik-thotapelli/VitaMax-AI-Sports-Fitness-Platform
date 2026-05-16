import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api';
import { 
  Zap, 
  Activity, 
  Cpu,
  Clock,
  Sparkles,
  ArrowRight,
  Dumbbell,
  Loader2
} from 'lucide-react';

const CommandCenter = ({ user, setActiveTab }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCommandData();
  }, []);

  const fetchCommandData = async () => {
    try {
      const response = await API.get('/command-center');
      setData(response.data);
    } catch (err) {
      console.error('Failed to fetch command center data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-orange" size={48} />
      </div>
    );
  }

  const ai = data?.ai_data || {};
  
  const stats = [
    { label: 'USER XP', value: data?.user?.xp || '0', color: 'text-brand-blue', sub: 'TOTAL EXPERIENCE' },
    { label: 'LEVEL', value: data?.user?.level || '1', color: 'text-brand-lime', sub: 'RANK STATUS' },
    { label: 'STREAK', value: `${data?.user?.streak || '0'} DAYS`, color: 'text-brand-orange', sub: 'CONSISTENCY' },
  ];

  return (
    <div className="space-y-12">
      {/* ── Header Area ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-brand-orange/20 shadow-orange-glow">
                 <Cpu size={20} className="animate-pulse" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.3em] leading-none mb-1">Neural Node</span>
                 <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Active Index: 0x7F2A</span>
              </div>
           </div>
           <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-[0.85]">
              COMMAND <br /> <span className="text-brand-orange">CENTER.</span>
           </h1>
           <div className="flex items-center gap-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest pt-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-brand-lime/10 rounded-lg text-brand-lime border border-brand-lime/20">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                 <span className="italic">Matrix Online</span>
              </div>
              <span className="italic">Sector 09 Active Phase</span>
           </div>
        </motion.div>

        <div className="flex flex-wrap gap-4">
           {stats.map((stat, i) => (
             <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-navy-light border border-white/5 px-8 py-7 rounded-[2rem] min-w-[150px] hover:border-white/10 transition-all group relative overflow-hidden shadow-2xl"
             >
                <p className="text-[9px] font-bold text-gray-500 tracking-widest mb-3 uppercase">{stat.label}</p>
                <p className={`text-3xl font-black italic leading-none ${stat.color}`}>{stat.value}</p>
                <p className="text-[8px] font-bold text-gray-600 mt-3 tracking-widest uppercase italic">{stat.sub}</p>
             </motion.div>
           ))}
        </div>
      </div>

      {/* ── Mission Briefing Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Command Card */}
        <div className="lg:col-span-8 relative group">
           <div className="bg-brand-navy-light rounded-[2.5rem] min-h-[500px] relative overflow-hidden flex flex-col 2xl:flex-row p-8 md:p-12 border border-white/5 shadow-2xl transition-all hover:border-brand-orange/20 gap-8">
              <div className="absolute inset-0 bg-gradient-to-l from-brand-orange/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-6 flex-1">
                 <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-lime/10 border border-brand-lime/20 rounded-lg">
                    <Sparkles size={14} className="text-brand-lime" />
                    <span className="text-[10px] font-bold text-brand-lime uppercase tracking-widest italic">Neural Briefing Active // Core Sync</span>
                 </div>
                 
                 <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
                    UNLEASH YOUR <br /> <span className="text-brand-orange">POTENTIAL.</span>
                 </h2>
                 <p className="text-gray-500 text-sm md:text-base font-bold uppercase tracking-wide max-w-md leading-relaxed">
                    AI Diagnostic: {ai.briefing || `Your biometric alignment is at ${ai.alignment_score || 92}%. The current cycle requires an intensity escalation of ${ai.intensity_escalation || '+15%'} to reach elite threshold.`}
                 </p>
                 
                 <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                       onClick={() => setActiveTab('workout')}
                       className="h-14 px-8 bg-brand-orange text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 shadow-orange-glow hover:brightness-110 transition-all italic active:scale-95"
                    >
                       Initialize Sync <ArrowRight size={18} />
                    </button>
                    <button 
                       onClick={() => setActiveTab('analytics')}
                       className="h-14 px-6 bg-white/5 border border-white/10 text-gray-500 hover:text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all italic active:scale-95"
                    >
                       Archive Access
                    </button>
                 </div>
              </div>

              {/* Real-time Bio-Graph - Adjusted width and breakpoint */}
              <div className="relative z-10 w-full 2xl:w-64 shrink-0 bg-black/40 backdrop-blur-3xl rounded-[2rem] border border-white/10 p-6 group-hover:border-brand-orange/30 transition-all duration-700 shadow-2xl flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-center mb-5">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest leading-none mb-1">Bio-Metric</span>
                          <span className="text-white font-black italic uppercase text-sm leading-none">Live Stream</span>
                       </div>
                       <Activity size={16} className="text-brand-orange animate-pulse" />
                    </div>
                    <div className="h-16 flex items-end gap-1 px-1">
                       {[40, 70, 45, 90, 65, 85, 55, 95, 70, 60].map((h, i) => (
                         <motion.div 
                           key={i}
                           initial={{ height: 0 }}
                           animate={{ height: `${h}%` }}
                           transition={{ delay: i * 0.05, duration: 1 }}
                           className={`flex-1 rounded-t-sm ${i > 7 ? 'bg-brand-orange shadow-orange-glow' : 'bg-white/10'}`}
                         />
                       ))}
                    </div>
                 </div>
                 <div className="flex justify-between items-end mt-5 border-t border-white/5 pt-5">
                    <div>
                       <span className="text-xl font-black italic text-white leading-none">142</span>
                       <p className="text-[7px] font-bold text-gray-600 uppercase tracking-widest mt-1">BPM Pulse</p>
                    </div>
                    <div className="text-right">
                       <span className="text-xl font-black italic text-brand-lime leading-none">{ai.alignment_score || '92'}%</span>
                       <p className="text-[7px] font-bold text-gray-600 uppercase tracking-widest mt-1">Sync Threshold</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-10">
           <div className="bg-brand-navy-light rounded-[2.5rem] flex-1 p-10 border border-white/5 flex flex-col justify-between relative overflow-hidden group shadow-2xl hover:border-brand-blue/30 transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                 <Zap size={200} className="text-white" strokeWidth={0.5} />
              </div>
              <div>
                 <h3 className="text-3xl font-black italic text-white uppercase leading-tight mb-8">Neural <br /> Insight.</h3>
                 <div className="space-y-4">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 group/item hover:bg-white/10 transition-all">
                       <div className="flex items-center gap-4 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                             <Clock size={16} />
                          </div>
                          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{ai.neural_insight || 'Sleep Analysis'}</span>
                       </div>
                       <div className="flex justify-between items-end">
                          <p className="text-xl font-black text-white italic leading-none">{ai.neural_insight_val || '8.2 HRS'}</p>
                          <span className="text-[8px] font-bold text-brand-lime uppercase italic">{ai.neural_insight_sub || '+12% Gain'}</span>
                       </div>
                    </div>

                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 group/item hover:bg-white/10 transition-all">
                       <div className="flex items-center gap-4 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-lime/10 flex items-center justify-center text-brand-lime border border-brand-lime/20">
                             <Zap size={16} />
                          </div>
                          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Energy Matrix</span>
                       </div>
                       <div className="flex justify-between items-end">
                          <p className="text-xl font-black text-white italic leading-none">{ai.energy_matrix || 'PEAK (V4.2)'}</p>
                          <span className="text-[8px] font-bold text-brand-orange uppercase italic">{ai.energy_matrix_status || 'Active'}</span>
                       </div>
                    </div>
                 </div>
              </div>
              
              <button className="w-full h-14 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl mt-8 text-[9px] font-bold uppercase tracking-widest transition-all italic text-gray-600 hover:text-white">
                 Recalibrate Intelligence
              </button>
           </div>
        </div>
      </div>

      {/* ── Active Protocols ── */}
      <div className="space-y-8 pb-10">
        <div className="flex justify-between items-end">
           <div className="space-y-1">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                 <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">Global Feed</span>
              </div>
              <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter">Active Protocols</h4>
           </div>
           <button className="text-[9px] font-bold text-gray-600 uppercase tracking-widest hover:text-white transition-colors italic border-b border-white/5 pb-1">
              View Matrix Index
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {(data?.latest_protocols?.length > 0 ? data.latest_protocols : [
              { goal: 'HYPER-LOAD X', category: 'STRENGTH', color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
              { goal: 'NEURAL BURN', category: 'CARDIO', color: 'text-brand-lime', bg: 'bg-brand-lime/10' },
              { goal: 'ISO-RESTORE', category: 'RECOVERY', color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
            ]).map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -6 }}
                className={`bg-brand-navy-light p-8 rounded-[2rem] border border-white/5 group cursor-pointer transition-all hover:border-white/10 shadow-2xl flex flex-col`}
              >
                 <div className={`w-12 h-12 rounded-xl ${item.bg || 'bg-brand-orange/10'} flex items-center justify-center ${item.color || 'text-brand-orange'} mb-8 group-hover:scale-110 transition-transform border border-white/5 shadow-lg`}>
                    <Dumbbell size={24} />
                 </div>
                 <div className="space-y-3">
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-none">{(item.category || item.type) || 'STRENGTH'} // Deployment</p>
                    <h5 className="text-2xl font-black italic text-white uppercase leading-none group-hover:text-brand-orange transition-colors">{item.goal || item.title}</h5>
                    <div className="pt-4">
                       <div className="flex justify-between items-center text-[8px] font-bold text-gray-600 uppercase mb-2">
                          <span className="italic">Engagement</span>
                          <span className={`${item.color || 'text-brand-orange'} italic font-black`}>75%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${(item.color || 'text-brand-orange').replace('text-', 'bg-')} w-3/4`} />
                       </div>
                    </div>
                 </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
