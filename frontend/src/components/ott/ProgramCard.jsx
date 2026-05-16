import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Zap, ShieldCheck } from 'lucide-react';

const ProgramCard = ({ program, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(program)}
      className="relative flex-none w-[320px] md:w-[400px] h-[220px] md:h-[260px] rounded-[2rem] overflow-hidden cursor-pointer group shadow-premium transition-all duration-500"
    >
      {/* Main Image */}
      <img 
        src={program.image} 
        alt={program.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-orange-glow">
            {program.category}
          </span>
          {program.rating >= 4.9 && (
            <div className="flex items-center gap-1 text-brand-lime">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Elite</span>
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none mb-4 group-hover:text-brand-orange transition-colors">
          {program.title}
        </h3>
        
        <div className="flex items-center gap-6 text-white/70 text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-brand-orange fill-brand-orange" />
            <span>{program.rating}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-brand-lime" />
            <span>{program.level}</span>
          </div>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-[2rem] border-2 border-brand-orange/0 group-hover:border-brand-orange/50 transition-all duration-500 pointer-events-none" />
      <div className="absolute -inset-1 bg-brand-orange/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

export default ProgramCard;
