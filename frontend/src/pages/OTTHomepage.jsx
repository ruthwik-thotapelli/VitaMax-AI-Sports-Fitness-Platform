import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSlider from '../components/ott/HeroSlider';
import ProgramDetailModal from '../components/ProgramDetailModal';
import ProgramRow from '../components/ott/ProgramRow';
import { CATEGORIES, HERO_BANNERS } from '../data/mockData';
import { Sparkles, Activity, ShieldCheck, Zap, Bell, Search, Filter } from 'lucide-react';

const OTTHomepage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  return (
    <div className="section-stack pb-32 overflow-guard px-6 md:px-0">
      {/* 1. Integrated Header Section */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-12 mb-10">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-brand-navy rounded-[1.5rem] flex items-center justify-center text-brand-orange shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-20 transition-opacity" />
               <Activity size={32} strokeWidth={2.5} className="relative z-10" />
            </div>
            <div>
               <h1 className="text-5xl font-black italic tracking-tighter text-brand-navy uppercase leading-none">
                  MISSION <span className="text-brand-orange">CONTROL</span>.
               </h1>
               <div className="flex items-center gap-3 mt-2">
                  <div className="w-2 h-2 bg-brand-lime rounded-full animate-pulse" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                     Global Intelligence Hub // v4.2 Stable
                  </p>
               </div>
            </div>
         </div>

         {/* Biological Stream Indicators */}
         <div className="flex items-center gap-4 w-full xl:w-auto overflow-x-auto no-scrollbar py-2">
            {[
              { label: 'Neural Link', val: 'STABLE', icon: Zap, color: 'text-brand-blue', bg: 'bg-brand-blue/5' },
              { label: 'Bio-Status', val: 'OPTIMIZED', icon: Activity, color: 'text-brand-lime', bg: 'bg-brand-lime/5' },
              { label: 'Security', val: 'ENCRYPTED', icon: ShieldCheck, color: 'text-brand-orange', bg: 'bg-brand-orange/5' },
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 px-6 py-4 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm min-w-[180px] group hover:border-brand-orange/20 transition-all cursor-default"
              >
                 <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <s.icon size={18} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1.5">{s.label}</span>
                    <span className="text-[12px] font-black text-brand-navy leading-none tracking-tight">{s.val}</span>
                 </div>
              </motion.div>
            ))}
            
            <div className="h-12 w-px bg-gray-100 mx-2 hidden xl:block" />
            
            <div className="flex items-center gap-3">
               <button className="w-14 h-14 bg-gray-50 text-brand-navy rounded-[1.5rem] flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all shadow-sm">
                  <Search size={22} />
               </button>
               <button className="w-14 h-14 bg-gray-50 text-brand-navy rounded-[1.5rem] flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all shadow-sm">
                  <Filter size={22} />
               </button>
            </div>
         </div>
      </div>

      {/* 2. Premium Hero Slider (OTT Style) */}
      <section className="relative mb-24">
        <HeroSlider banners={HERO_BANNERS} onProgramClick={handleProgramClick} />
      </section>

      {/* 3. Discovery Rows Section */}
      <div className="space-y-24">
         <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black italic tracking-tighter text-brand-navy uppercase">
               Recommended <span className="text-brand-orange">Protocols</span>
            </h2>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort By: AI Relevance</span>
               <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400"><Bell size={14} /></div>
            </div>
         </div>
         
         <div className="space-y-24 -mt-12">
            {CATEGORIES.map((category) => (
               <ProgramRow 
                  key={category.id}
                  title={category.title}
                  programs={category.data}
                  onProgramClick={handleProgramClick}
               />
            ))}
         </div>
      </div>

      {/* Premium Detail Modal */}
      <ProgramDetailModal 
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 4. Optimized AI Floating Insight (Repositioned to avoid AI Coach Button) */}
      <AnimatePresence>
         <motion.div 
           initial={{ opacity: 0, scale: 0.8, y: 50 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.8, y: 50 }}
           whileHover={{ scale: 1.05 }}
           className="fixed bottom-32 right-12 z-40 max-w-xs group cursor-pointer"
         >
            <div className="bg-brand-navy p-6 rounded-[2.5rem] text-white shadow-2xl border border-white/10 relative overflow-hidden">
               <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
               <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-lime shadow-inner">
                     <Sparkles size={26} className="animate-pulse" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Neural Insight</p>
                     <p className="text-[13px] font-black italic tracking-tight leading-tight">Hydration sync required. High cortisol detected.</p>
                  </div>
               </div>
            </div>
            {/* Visual connector */}
            <div className="absolute -bottom-2 right-12 w-4 h-4 bg-brand-navy rotate-45 border-r border-b border-white/10" />
         </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OTTHomepage;
