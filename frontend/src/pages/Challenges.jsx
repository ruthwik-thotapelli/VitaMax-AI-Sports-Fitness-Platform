import { motion } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  Zap, 
  Flame, 
  ChevronRight, 
  Activity, 
  Target,
  Medal,
  Clock,
  ArrowRight
} from 'lucide-react';

const Challenges = () => {
  const activeChallenges = [
    {
      id: 1,
      title: 'Neon Sprint 5K',
      participants: '1,240',
      difficulty: 'Medium',
      reward: '500 XP + "Speed Demon" Badge',
      timeLeft: '2 Days',
      color: '#FF5F04',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Iron Core Protocol',
      participants: '850',
      difficulty: 'Hard',
      reward: '750 XP + Premium Skin',
      timeLeft: '5 Days',
      color: '#D7FF00',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Zen Mastery',
      participants: '2,100',
      difficulty: 'Easy',
      reward: '300 XP + Calm Mind Title',
      timeLeft: '12 Hours',
      color: '#2E5BFF',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-navy font-sans selection:bg-brand-orange selection:text-white pb-20 tactical-grid">
      {/* Hero Banner */}
      <div className="pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
           <div className="space-y-6 flex-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                 <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-brand-orange/20">
                    <Trophy size={20} />
                 </div>
                 <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em]">Community Arena Feed</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] italic"
              >
                PROVE YOUR <br />
                <span className="text-brand-lime">DOMINANCE.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-sm md:text-base font-bold uppercase tracking-wide max-w-lg leading-relaxed"
              >
                Join global challenges, climb the leaderboards, and unlock exclusive rewards. The arena is waiting for you.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-6"
              >
                 <button className="h-14 px-10 bg-brand-orange text-white text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-orange-glow hover:brightness-110 transition-all italic">
                    Start Trending Challenge
                 </button>
                 <div className="flex items-center gap-4 text-white">
                    <div className="flex -space-x-3">
                       {[1,2,3].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-brand-navy-light overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                         </div>
                       ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 italic">12K+ ACTIVE ATHLETES</span>
                 </div>
              </motion.div>
           </div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative flex-1 hidden xl:block"
           >
              <div className="w-[400px] h-[400px] bg-brand-lime/5 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <Activity size={300} className="text-white/5 animate-pulse mx-auto" />
           </motion.div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {activeChallenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-brand-navy-light rounded-[2.5rem] p-5 shadow-2xl border border-white/5 group cursor-pointer overflow-hidden transition-all"
              >
                 <div className="relative h-60 rounded-[2rem] overflow-hidden mb-6 border border-white/5">
                    <img src={challenge.image} alt={challenge.title} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                       <Clock size={12} className="text-brand-orange" /> {challenge.timeLeft} LEFT
                    </div>
                    <div className="absolute bottom-6 left-6">
                       <p className="text-brand-orange text-[9px] font-bold uppercase tracking-widest mb-1">ACTIVE PROTOCOL</p>
                       <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-brand-orange transition-colors">{challenge.title}</h3>
                    </div>
                 </div>

                 <div className="px-3 pb-3 space-y-6">
                    <div className="flex justify-between items-center">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Participants</p>
                          <div className="flex items-center gap-2 text-white font-black text-lg italic leading-none">
                             <Users size={16} className="text-brand-orange" /> {challenge.participants}
                          </div>
                       </div>
                       <div className="space-y-1 text-right">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Difficulty</p>
                          <div className="px-2.5 py-1 bg-white/5 rounded-lg text-brand-lime font-bold text-[9px] uppercase tracking-widest inline-block border border-white/5">
                             {challenge.difficulty}
                          </div>
                       </div>
                    </div>

                    <div className="bg-black/20 rounded-2xl p-5 border border-white/5 flex items-center gap-4 group-hover:bg-white/5 transition-all">
                       <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
                          <Medal size={20} />
                       </div>
                       <div className="flex-1">
                          <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Reward Potential</p>
                          <p className="text-[11px] font-bold text-white uppercase tracking-tight leading-none italic">{challenge.reward}</p>
                       </div>
                    </div>

                    <button className="w-full h-14 bg-white/5 border border-white/5 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 italic group-hover:bg-brand-orange group-hover:border-brand-orange shadow-2xl">
                       Enter Arena <ArrowRight size={16} />
                    </button>
                 </div>
              </motion.div>
            ))}
         </div>

         {/* Bottom Leaderboard Strip */}
         <motion.div 
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="mt-20 bg-brand-navy-light rounded-[3rem] p-10 md:p-14 text-white flex flex-col xl:flex-row justify-between items-center gap-10 overflow-hidden relative border border-white/5 shadow-2xl"
         >
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none text-brand-orange">
               <Trophy size={180} />
            </div>
            
            <div className="space-y-3 relative z-10 text-center xl:text-left">
               <h2 className="text-3xl font-black uppercase tracking-tighter italic">World <span className="text-brand-orange">Rankings</span></h2>
               <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Your position: <span className="text-brand-lime font-black">#1,245</span> in the global matrix.</p>
            </div>

            <div className="flex gap-3 relative z-10 w-full xl:w-auto overflow-x-auto no-scrollbar justify-center">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1 group hover:bg-brand-orange/20 hover:border-brand-orange/50 transition-all cursor-pointer">
                    <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="user" />
                    </div>
                    <span className="text-[7px] font-bold text-gray-500 uppercase tracking-widest">USER_{i}</span>
                 </div>
               ))}
            </div>

            <button className="h-12 px-8 bg-white/5 border border-white/5 hover:bg-white hover:text-brand-navy rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all relative z-10 whitespace-nowrap italic">
               Full Leaderboard
            </button>
         </motion.div>
      </div>
    </div>
  );
};

export default Challenges;
