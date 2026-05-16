import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api';
import { 
  Trophy, 
  Medal, 
  Star, 
  Zap, 
  Flame, 
  User, 
  Dumbbell, 
  Award,
  Crown,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

const Achievements = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGamification();
  }, []);

  const fetchGamification = async () => {
    try {
      const { data } = await API.get('/gamification');
      setData(data);
    } catch (err) {
      console.error(err);
      setError('Neural link synchronization failed. Protocol reset recommended.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col h-[60vh] items-center justify-center gap-6">
       <div className="w-12 h-12 border-4 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin" />
       <p className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.3em] italic">Synchronizing Rank...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col h-[60vh] items-center justify-center gap-6">
       <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 border border-red-500/20">
          <ShieldAlert size={24} />
       </div>
       <p className="text-[10px] font-bold uppercase text-red-500 tracking-[0.3em] italic">{error}</p>
       <button onClick={() => window.location.reload()} className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest text-white transition-all">Re-sync Engine</button>
    </div>
  );

  if (!data) return null;

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-3">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue border border-brand-blue/20">
               <Crown size={18} />
            </div>
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.3em]">Merit System</span>
         </div>
         <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none uppercase">
           ELITE <span className="text-brand-orange">STATUS</span>
         </h2>
         <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">Witness the ascent. Track your global ranking and merit badges.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* User Level Profile Card */}
        <div className="xl:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-navy-light rounded-[2.5rem] p-10 md:p-12 border border-white/5 shadow-2xl text-center relative overflow-hidden h-full group hover:border-brand-orange/30 transition-all"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(255,95,4,0.1),transparent_60%)] pointer-events-none" />
            
            <div className="relative z-10">
               <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-brand-orange to-brand-blue mx-auto mb-8 p-1 flex items-center justify-center shadow-2xl">
                  <div className="w-full h-full rounded-[1.8rem] bg-brand-navy flex flex-col items-center justify-center">
                     <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-0.5">LVL</p>
                     <span className="text-4xl font-black italic text-white leading-none">{data.level}</span>
                  </div>
               </div>
               
               <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tighter italic leading-none">Vanguard Rank</h3>
               <p className="text-brand-orange text-[10px] font-bold tracking-[0.2em] mb-10 uppercase italic opacity-80">Sector 09 Athlete</p>
               
               <div className="space-y-6 text-left bg-black/20 p-8 rounded-3xl border border-white/5">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">TOTAL MERIT</p>
                        <h4 className="text-2xl font-black italic text-white tracking-tighter leading-none">{data.xp.toLocaleString()}<span className="text-[10px] not-italic text-gray-600 ml-1.5 uppercase">XP</span></h4>
                     </div>
                     <p className="text-[9px] font-bold text-brand-blue uppercase italic">84% Sync</p>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${Math.min((data.xp / 5000) * 100, 100)}%` }}
                       transition={{ duration: 1.5 }}
                       className="h-full bg-gradient-to-r from-brand-orange to-brand-blue rounded-full shadow-orange-glow"
                     />
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Global Rankings Card */}
        <div className="xl:col-span-8">
          <div className="bg-brand-navy-light rounded-[2.5rem] p-10 border border-white/5 shadow-2xl h-full">
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-brand-orange/20">
                     <Trophy size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Global Arena</h3>
               </div>
               <button className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors flex items-center gap-2 italic">
                  View Full <ArrowUpRight size={14} />
               </button>
            </div>

            <div className="space-y-3">
               {data.leaderboard.map((user, i) => (
                 <div 
                   key={i}
                   className={`flex items-center gap-5 p-5 rounded-[1.5rem] transition-all border ${i === 0 ? 'bg-brand-orange text-white border-brand-orange shadow-orange-glow' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                 >
                    <div className={`text-2xl font-black italic tracking-tighter shrink-0 w-8 ${i === 0 ? 'text-white' : 'text-gray-700'}`}>
                       {i + 1}
                    </div>
                    
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${i === 0 ? 'bg-white/20' : 'bg-white/5 border border-white/10 text-brand-orange'}`}>
                       <User size={18} />
                    </div>
                    
                    <div className="flex-1">
                       <p className={`text-base font-black tracking-tight italic uppercase leading-none ${i === 0 ? 'text-white' : 'text-white'}`}>{user.name}</p>
                       <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${i === 0 ? 'text-white/60' : 'text-gray-500'}`}>Level {user.level} Associate</p>
                    </div>
                    
                    <div className="text-right">
                       <p className={`text-xl font-black italic tracking-tighter leading-none ${i === 0 ? 'text-white' : 'text-brand-blue'}`}>{user.xp.toLocaleString()}</p>
                       <p className={`text-[8px] font-bold uppercase tracking-widest ${i === 0 ? 'text-white/40' : 'text-gray-600'}`}>Points</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Meritorious Badges Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
           <Zap className="text-brand-orange" size={20} />
           <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Merit <span className="text-brand-orange">Arsenal</span></h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
           {[
             { name: 'Dawn Protocol', icon: Flame, color: 'text-orange-500', unlocked: true },
             { name: 'Force Surge', icon: Dumbbell, color: 'text-brand-blue', unlocked: true },
             { name: 'Neural Sprint', icon: Zap, color: 'text-brand-orange', unlocked: true },
             { name: 'Absolute Sync', icon: Medal, color: 'text-brand-lime', unlocked: false },
             { name: 'Star Forge', icon: Star, color: 'text-yellow-400', unlocked: false },
             { name: 'Apex Growth', icon: Activity, color: 'text-brand-blue', unlocked: false }
           ].map((badge, i) => (
             <div 
               key={i}
               className={`bg-brand-navy-light rounded-[2rem] p-8 border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center space-y-5 transition-all ${badge.unlocked ? 'hover:border-brand-orange/30 group cursor-pointer' : 'opacity-20 grayscale saturate-0 pointer-events-none'}`}
             >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${badge.unlocked ? 'bg-white/5 border border-white/10 shadow-xl group-hover:scale-110 transition-transform' : 'bg-white/5 border border-white/5'}`}>
                   <badge.icon size={badge.unlocked ? 28 : 22} className={badge.unlocked ? badge.color : 'text-gray-300'} />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest italic text-white">{badge.name}</p>
                   {badge.unlocked && <p className="text-[8px] font-bold text-brand-orange uppercase tracking-widest mt-1">UNLOCKED</p>}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
