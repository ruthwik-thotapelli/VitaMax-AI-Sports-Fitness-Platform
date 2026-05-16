import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Trophy, 
  TrendingUp, 
  Activity, 
  Flame, 
  Target, 
  ArrowUpRight, 
  Zap, 
  Heart,
  BarChart3,
  ArrowRight
} from 'lucide-react';

const data = [
  { name: 'Mon', calories: 2400, strength: 400 },
  { name: 'Tue', calories: 1398, strength: 300 },
  { name: 'Wed', calories: 9800, strength: 200 },
  { name: 'Thu', calories: 3908, strength: 278 },
  { name: 'Fri', calories: 4800, strength: 189 },
  { name: 'Sat', calories: 3800, strength: 239 },
  { name: 'Sun', calories: 4300, strength: 349 },
];

const muscleData = [
  { name: 'Chest', value: 400 },
  { name: 'Back', value: 300 },
  { name: 'Legs', value: 300 },
  { name: 'Arms', value: 200 },
];

const COLORS = ['#FF5F04', '#2E5BFF', '#D7FF00', '#0A1128'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-navy-light p-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">{label}</p>
        <div className="space-y-2">
          {payload.map((p, i) => (
             <p key={i} className="text-xs font-black italic uppercase tracking-tight flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-white">{p.name}:</span> <span className="text-white/60">{p.value}</span>
             </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-3">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue border border-brand-blue/20">
               <BarChart3 size={18} />
            </div>
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[.3em]">Analytics Module</span>
         </div>
         <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none uppercase">
           PERFORMANCE <span className="text-brand-blue">INSIGHTS</span>
         </h2>
         <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">Deep biological data processing and trend analysis.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Main Performance Chart */}
        <div className="xl:col-span-8">
           <div className="bg-brand-navy-light rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden h-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
                <div>
                   <h3 className="text-2xl font-black italic tracking-tighter text-white leading-none uppercase">Metric Flux</h3>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 italic">Calorie Flow & Strength Velocity</p>
                </div>
                <div className="flex gap-3">
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-orange/10 border border-brand-orange/20 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> 
                      <span className="text-[9px] font-bold text-brand-orange uppercase tracking-widest">FUEL</span>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" /> 
                      <span className="text-[9px] font-bold text-brand-blue uppercase tracking-widest">FORCE</span>
                   </div>
                </div>
              </div>
              
              <div className="h-[360px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5F04" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#FF5F04" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2E5BFF" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2E5BFF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fontWeight: 700, fill: '#4B5563' }} 
                      dy={15}
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      name="Fuel"
                      dataKey="calories" 
                      stroke="#FF5F04" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorOrange)" 
                      animationDuration={2000}
                    />
                    <Area 
                      type="monotone" 
                      name="Force"
                      dataKey="strength" 
                      stroke="#2E5BFF" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorBlue)" 
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Muscle Focus Chart */}
        <div className="xl:col-span-4">
          <div className="bg-brand-navy-light rounded-[2.5rem] p-10 border border-white/5 shadow-2xl flex flex-col items-center h-full">
            <div className="w-full text-center mb-8">
               <h3 className="text-2xl font-black italic tracking-tighter text-white leading-none uppercase">Neural Focus</h3>
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 italic">Muscle Synchronization</p>
            </div>
            
            <div className="h-[240px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={muscleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {muscleData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <Zap size={20} className="text-brand-orange mb-1 shadow-orange-glow" />
                <p className="text-[28px] font-black text-white italic tracking-tighter leading-none">84%</p>
                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-none mt-1">Sync</p>
              </div>
            </div>
            
            <div className="w-full mt-10 grid grid-cols-2 gap-y-6 gap-x-8">
               {muscleData.map((m, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <div>
                       <p className="text-[10px] font-bold text-white uppercase tracking-widest italic">{m.name}</p>
                       <p className="text-[8px] font-bold text-gray-600 uppercase">Activated</p>
                    </div>
                 </div>
               ))}
            </div>

            <button className="w-full mt-10 h-14 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all flex items-center justify-center gap-2 italic">
               Adjust Focus <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Physiological Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'O2 Intake Flow', value: '48.2', unit: 'ml/kg', icon: Activity, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
          { label: 'Resting Pulse', value: '54', unit: 'bpm', icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Weekly Merit', value: '2,450', unit: 'xp', icon: Trophy, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
          { label: 'Mass Context', value: '14.2%', unit: 'bf', icon: Target, color: 'text-brand-lime', bg: 'bg-brand-lime/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-navy-light p-8 rounded-[2rem] border border-white/5 shadow-2xl group hover:border-white/10 transition-all"
          >
            <div className="flex justify-between items-start mb-10">
               <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{stat.label}</p>
               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={22} />
               </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{stat.value}</h4>
              <span className="text-[10px] font-bold text-gray-600 uppercase">{stat.unit}</span>
            </div>
            <div className="mt-8 h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '70%' }}
                 transition={{ duration: 1.5, delay: 0.5 }}
                 className={`h-full rounded-full ${stat.color === 'text-brand-blue' ? 'bg-brand-blue' : stat.color === 'text-brand-orange' ? 'bg-brand-orange shadow-orange-glow' : stat.color === 'text-brand-lime' ? 'bg-brand-lime' : 'bg-red-500'}`}
               />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
