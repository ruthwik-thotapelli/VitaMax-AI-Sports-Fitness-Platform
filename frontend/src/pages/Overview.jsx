import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api';
import { 
  Zap, 
  Flame, 
  Trophy, 
  Calendar, 
  ArrowUpRight, 
  ArrowRight,
  Dumbbell, 
  Utensils, 
  Activity,
  Plus,
  Rocket,
  Shield,
  Target,
  Bell,
  Search,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const Overview = ({ user: authUser, setActiveTab }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      const response = await API.get('/overview');
      setData(response.data);
    } catch (err) {
      console.error('Failed to fetch overview data', err);
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

  const metrics = data?.metrics || {};
  const nutrition = data?.nutrition || {};
  const user = data?.user || authUser;
  const performanceData = [
    { day: 'Mon', power: 2100, recovery: 85 },
    { day: 'Tue', power: 2300, recovery: 70 },
    { day: 'Wed', power: 1900, recovery: 90 },
    { day: 'Thu', power: 2800, recovery: 60 },
    { day: 'Fri', power: 2500, recovery: 75 },
    { day: 'Sat', power: 3200, recovery: 95 },
    { day: 'Sun', power: 2900, recovery: 80 },
  ];

  const stats = [
    { label: 'Energy Pulse', value: metrics.energy_pulse || '2,440', unit: 'kcal', icon: Flame, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
    { label: 'Neural Power', value: metrics.neural_power || '92', unit: '%', icon: Zap, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
    { label: 'Active Cycle', value: metrics.active_cycle || '18', unit: 'days', icon: Calendar, color: 'text-brand-lime', bg: 'bg-brand-lime/10' },
    { label: 'Peak LVL', value: metrics.peak_lvl || '08', unit: 'PRO', icon: Target, color: 'text-white', bg: 'bg-white/10' },
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Dynamic Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-10 md:p-14 text-white relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-brand-orange/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12">
           <div className="flex-1 space-y-6 text-center xl:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                 <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-brand-lime">Neural Status: Optimized</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none uppercase">
                 UNLEASH <br />
                 <span className="text-brand-orange">THE ENGINE</span>.
              </h1>
              <p className="text-gray-400 text-base font-medium max-w-lg leading-relaxed mx-auto xl:mx-0">
                 Welcome back, <span className="text-white font-bold">{(user?.name || 'Athlete').split(' ')[0]}</span>. Your metabolic efficiency is peaking. Synchronize your next session to dominate the protocol.
              </p>
              <div className="flex flex-wrap justify-center xl:justify-start gap-4 pt-4">
                 <button 
                   onClick={() => setActiveTab('workout')}
                   className="h-14 px-8 bg-brand-orange text-white rounded-xl font-bold text-sm tracking-wide flex items-center gap-3 hover:brightness-110 transition-all shadow-orange-glow active:scale-95"
                 >
                    Deploy Protocol <ArrowRight size={18} />
                 </button>
                 <button 
                   onClick={() => setActiveTab('analytics')}
                   className="h-14 px-8 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-sm transition-all backdrop-blur-xl active:scale-95"
                 >
                    System Metrics
                 </button>
              </div>
           </div>

           <div className="w-full xl:w-[380px] shrink-0">
              <div className="bg-black/20 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Weekly Pulse</p>
                       <h4 className="text-xl font-black italic uppercase text-white">Core Progress</h4>
                    </div>
                    <span className="text-brand-lime font-black italic text-4xl leading-none">{metrics.progress || 92}%</span>
                 </div>
                 <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.progress || 92}%` }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-brand-orange rounded-full shadow-orange-glow"
                    />
                 </div>
                 <div className="grid grid-cols-3 gap-4 mt-8 bg-white/5 p-5 rounded-2xl border border-white/5">
                    <div className="text-center">
                       <p className="text-[9px] font-bold uppercase text-gray-500 mb-1">Power</p>
                       <p className="text-lg font-black italic text-white leading-none">{metrics.power || '2.8k'}</p>
                    </div>
                    <div className="text-center border-x border-white/10">
                       <p className="text-[9px] font-bold uppercase text-gray-500 mb-1">Agility</p>
                       <p className="text-lg font-black italic text-white leading-none">{metrics.agility || '1.2k'}</p>
                    </div>
                    <div className="text-center">
                       <p className="text-[9px] font-bold uppercase text-gray-500 mb-1">Rank</p>
                       <p className="text-lg font-black italic text-white leading-none">{metrics.rank || '#12'}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((s, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-brand-navy-light p-7 rounded-3xl border border-white/5 shadow-xl hover:border-brand-orange/30 transition-all flex items-center justify-between group cursor-pointer"
           >
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center ${s.color} group-hover:scale-110 transition-transform border border-white/5 shadow-lg`}>
                    <s.icon size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1">{s.label}</p>
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-2xl font-black italic text-white leading-none">{s.value}</span>
                       <span className="text-[10px] font-bold text-gray-500 uppercase">{s.unit}</span>
                    </div>
                 </div>
              </div>
              <ArrowUpRight size={16} className="text-gray-600 group-hover:text-brand-orange transition-colors" />
           </motion.div>
         ))}
      </div>

      {/* Main Charts Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 bg-brand-navy-light rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">Performance Surge</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Live Protocol Sync</p>
               </div>
               <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-all">
                     <Calendar size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-all">
                     <Plus size={18} />
                  </div>
               </div>
            </div>
            
            <div className="h-[340px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                     <defs>
                        <linearGradient id="colorBrand" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#FF5F04" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#FF5F04" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                     <XAxis 
                       dataKey="day" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 11, fontWeight: 700, fill: '#4B5563' }} 
                       dy={15}
                     />
                     <YAxis hide />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#0A1128', borderRadius: '1rem', border: '1px solid #ffffff10', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', padding: '1rem' }} 
                       itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: '800' }}
                       labelStyle={{ color: '#6B7280', marginBottom: '4px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase' }}
                     />
                     <Area 
                       type="monotone" 
                       dataKey="power" 
                       stroke="#FF5F04" 
                       strokeWidth={4} 
                       fillOpacity={1} 
                       fill="url(#colorBrand)" 
                       animationDuration={2000}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Bio-Fuel Monitoring */}
         <div className="bg-brand-orange rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-orange-glow">
            <div className="relative z-10 h-full flex flex-col">
               <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Bio-Fuel Matrix</h3>
               <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-10">Metabolic Input</p>

               <div className="space-y-7 flex-1">
                  {[
                    { label: 'Protein Phase', value: nutrition.macros?.protein || '184g', progress: 72, color: 'bg-brand-lime' },
                    { label: 'Energy Glycan', value: nutrition.macros?.carbs || '256g', progress: 38, color: 'bg-brand-navy' },
                    { label: 'Recovery Lipid', value: nutrition.macros?.fats || '62g', progress: 84, color: 'bg-white' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-wide text-white/90">
                          <span>{item.label}</span>
                          <span className="text-white">{item.value}</span>
                       </div>
                       <div className="h-2 bg-black/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.3 + (i * 0.1) }}
                            className={`h-full ${item.color} rounded-full`} 
                          />
                       </div>
                    </div>
                  ))}
               </div>

               <button className="w-full h-14 mt-10 bg-white text-brand-navy rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:bg-brand-lime active:scale-95 flex items-center justify-center gap-3 italic">
                  Sync Fuel Protocol <ArrowRight size={18} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Overview;
