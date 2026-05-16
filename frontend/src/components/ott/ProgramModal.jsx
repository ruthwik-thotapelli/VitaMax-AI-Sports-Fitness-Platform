import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  Plus, 
  Share2, 
  Star, 
  Clock, 
  Flame, 
  Target,
  ChevronRight,
  TrendingUp,
  User,
  Calendar,
  Zap,
  ArrowRight
} from 'lucide-react';

const ProgramModal = ({ program, isOpen, onClose }) => {
  if (!program) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-navy/95 backdrop-blur-2xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative w-full max-w-7xl h-full bg-white rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-50 w-14 h-14 bg-brand-navy rounded-full flex items-center justify-center text-white hover:bg-brand-orange transition-colors shadow-2xl"
            >
              <X size={24} />
            </button>

            {/* Left Section: Visuals */}
            <div className="relative w-full md:w-1/2 h-64 md:h-full">
               <img 
                 src={program.image} 
                 alt={program.title}
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/60 to-transparent" />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
               
               <div className="absolute bottom-12 left-12 right-12 space-y-6">
                  <div className="flex gap-4">
                     <span className="px-5 py-2 bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-orange-glow">
                        {program.category}
                     </span>
                     <div className="px-5 py-2 bg-brand-navy/30 backdrop-blur-md rounded-full flex items-center gap-2 text-white border border-white/10">
                        <TrendingUp size={14} className="text-brand-lime" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Trending #1</span>
                     </div>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-brand-navy md:text-white uppercase leading-[0.85]">
                     {program.title}
                  </h2>
               </div>
            </div>

            {/* Right Section: Details */}
            <div className="w-full md:w-1/2 h-full overflow-y-auto custom-scrollbar p-12 md:p-20 bg-white">
               <div className="space-y-12">
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-5">
                     <button className="flex-1 min-w-[200px] h-20 bg-brand-orange text-white rounded-3xl flex items-center justify-center gap-4 text-sm font-black italic uppercase tracking-widest shadow-orange-glow transition-all hover:scale-[1.03] active:scale-95">
                        <Play size={20} className="fill-white" /> Start Protocol
                     </button>
                     <button className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-brand-navy hover:bg-brand-gray transition-all border border-gray-100">
                        <Plus size={24} />
                     </button>
                     <button className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-brand-navy hover:bg-brand-gray transition-all border border-gray-100">
                        <Share2 size={24} />
                     </button>
                  </div>

                  {/* Core Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {[
                       { label: 'Intensity', val: program.level, icon: Zap, color: 'text-brand-orange' },
                       { label: 'Duration', val: program.duration, icon: Clock, color: 'text-brand-blue' },
                       { label: 'Burn', val: `${program.calories} kcal`, icon: Flame, color: 'text-orange-500' },
                       { label: 'Rating', val: program.rating, icon: Star, color: 'text-brand-lime' },
                     ].map((stat, i) => (
                       <div key={i} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-premium transition-all">
                          <stat.icon size={20} className={`${stat.color} mb-3`} />
                          <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
                          <p className="text-xl font-black italic text-brand-navy uppercase mt-1">{stat.val}</p>
                       </div>
                     ))}
                  </div>

                  {/* Intelligence Description */}
                  <div className="space-y-6">
                     <h4 className="text-[13px] font-black uppercase tracking-[0.4em] text-gray-300">Protocol Overview</h4>
                     <p className="text-gray-500 text-lg leading-relaxed font-medium">
                        {program.description}
                     </p>
                  </div>

                  {/* Weekly Matrix */}
                  <div className="bg-brand-navy rounded-[3rem] p-10 text-white relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 transition-transform group-hover:rotate-45">
                        <Calendar size={120} />
                     </div>
                     <div className="relative z-10">
                        <div className="flex justify-between items-center mb-8">
                           <h4 className="text-2xl font-black italic uppercase tracking-tight">Sync Schedule</h4>
                           <span className="text-brand-lime font-black uppercase text-[10px] tracking-widest">{program.schedule}</span>
                        </div>
                        <div className="grid grid-cols-7 gap-3">
                           {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                             <div key={i} className={`aspect-square rounded-2xl border flex items-center justify-center text-[10px] font-black ${i < 5 ? 'border-brand-orange bg-brand-orange/10 text-brand-orange' : 'border-white/10 text-white/30'}`}>
                               {day}
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Trainer Intelligence */}
                  <div className="flex items-center gap-8 bg-gray-50 p-8 rounded-[3rem] border border-gray-100">
                     <div className="w-24 h-24 rounded-[2rem] bg-gradient-orange p-1 shadow-orange-glow shrink-0">
                        <div className="w-full h-full rounded-[2rem] bg-white overflow-hidden">
                           <img src={program.athleteImage} alt={program.trainer} className="w-full h-full object-cover" />
                        </div>
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Assigned Commander</p>
                        <h4 className="text-2xl font-black italic text-brand-navy uppercase mb-2">{program.trainer}</h4>
                        <p className="text-gray-500 text-xs font-bold leading-relaxed">Elite performance specialist focusing on {program.category.toLowerCase()} optimization.</p>
                     </div>
                     <button className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-brand-navy hover:text-brand-orange shadow-sm border border-gray-100 transition-all">
                        <ArrowRight size={24} />
                     </button>
                  </div>

                  {/* Final CTA */}
                  <div className="pt-8">
                     <button className="w-full py-6 bg-brand-navy text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-brand-orange active:scale-95">
                        Deploy Final Sync Protocol
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProgramModal;
