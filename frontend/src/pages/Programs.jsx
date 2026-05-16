import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  Search, 
  ChevronRight, 
  Filter, 
  Activity, 
  Dumbbell, 
  Zap, 
  Flame, 
  Clock, 
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import ProgramDetailModal from '../components/ProgramDetailModal';

const Programs = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  const categories = ['All', 'Strength', 'Cardio', 'Mobility', 'Endurance', 'Mindfulness'];

  const allPrograms = CATEGORIES.flatMap(cat => cat.data);
  const filteredPrograms = activeCategory === 'All' 
    ? allPrograms 
    : allPrograms.filter(p => p.category === activeCategory);

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-navy font-sans selection:bg-brand-orange selection:text-white pb-20 tactical-grid">
      {/* Page Header */}
      <div className="pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto relative z-10">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange border border-brand-orange/20">
                    <Zap size={18} />
                 </div>
                 <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.3em]">Protocol Discovery</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] italic">
                 ELITE <span className="text-brand-orange">PROTOCOLS</span>
              </h1>
              <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">Select your specialized training matrix for maximum performance.</p>
           </div>
           
           <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="relative w-full max-w-xl group">
                 <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-brand-orange transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Scan training matrices..."
                   className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-16 pr-8 text-sm font-bold text-white outline-none focus:bg-white/10 focus:border-brand-orange/50 transition-all"
                 />
              </div>
              <button className="h-14 px-8 bg-white/5 border border-white/10 rounded-xl text-white flex items-center gap-3 hover:bg-white/10 transition-all">
                 <Filter size={16} />
                 <span className="text-[11px] font-bold uppercase tracking-widest">Filters</span>
              </button>
           </div>
        </div>
      </div>

      {/* Categories Scroller */}
      <div className="sticky top-0 z-50 bg-brand-navy/80 backdrop-blur-xl border-b border-white/5 py-5 mb-10">
         <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center gap-3 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeCategory === cat 
                  ? 'bg-brand-orange border-brand-orange text-white shadow-orange-glow' 
                  : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPrograms.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => handleProgramClick(p)}
                className="group cursor-pointer"
              >
                <div className="bg-brand-navy-light rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group-hover:border-brand-orange/30 transition-all duration-500 relative aspect-[3/4]">
                   <img 
                     src={p.image} 
                     alt={p.title} 
                     className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-[2s] group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
                   
                   <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="px-3 py-1.5 bg-brand-orange/90 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg shadow-orange-glow backdrop-blur-sm">
                        {p.category}
                      </span>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/40 backdrop-blur-md text-white rounded-lg border border-white/10">
                         <Star size={12} className="fill-brand-orange text-brand-orange" />
                         <span className="text-[10px] font-bold">{p.rating}</span>
                      </div>
                   </div>

                   <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                      <div className="space-y-1">
                         <h3 className="text-xl font-black text-white uppercase italic tracking-tight leading-tight group-hover:text-brand-orange transition-colors">
                           {p.title}
                         </h3>
                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{p.trainer || 'Elite Coach'}</p>
                      </div>

                      <div className="flex items-center gap-5 text-gray-400">
                         <div className="flex items-center gap-2">
                            <Clock size={14} className="text-brand-orange" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{p.duration}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-brand-lime" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{p.level}</span>
                         </div>
                      </div>

                      <button className="w-full h-14 bg-white/5 backdrop-blur-md hover:bg-white text-white hover:text-brand-navy border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 italic">
                         Initialize Protocol <ArrowRight size={16} />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
         </div>

         {filteredPrograms.length === 0 && (
           <div className="py-40 text-center space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700 border border-white/5">
                 <Dumbbell size={32} />
              </div>
              <div className="space-y-2">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">No Protocols Found</h3>
                 <p className="text-gray-600 font-bold text-xs uppercase tracking-widest">Try adjusting your filters or search criteria.</p>
              </div>
              <button 
                onClick={() => setActiveCategory('All')}
                className="text-brand-orange text-[11px] font-bold uppercase tracking-widest hover:underline"
              >
                Clear all filters
              </button>
           </div>
         )}
      </div>

      <ProgramDetailModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Programs;
