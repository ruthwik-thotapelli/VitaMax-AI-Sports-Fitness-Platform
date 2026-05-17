import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import { 
  X, CheckCircle, Heart, Share2, Dumbbell, Utensils, 
  Zap, Clock, User, BarChart, ChevronRight, Loader2, CheckCircle2 
} from 'lucide-react';

const ProgramDetailModal = ({ isOpen, onClose, program }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !program) return null;

  const handleInitialize = async () => {
    if (!user) {
      navigate('/login', { state: { message: 'Authentication required. Please sign in to initialize this training protocol.' } });
      onClose();
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const isNutrition = program.category?.toLowerCase() === 'nutrition' || 
                        program.subtitle?.toLowerCase() === 'nutrition' || 
                        program.title?.toLowerCase().includes('diet') || 
                        program.title?.toLowerCase().includes('nutrition');

    try {
      if (isNutrition) {
        // Generate Nutrition plan
        await API.post('/nutrition/generate', { 
          weight: 75, 
          goal: program.title, 
          dietary_preference: 'None' 
        });
      } else {
        // Generate Workout plan
        await API.post('/workouts/generate', { 
          age: 25, 
          weight: 75, 
          height: 180, 
          goal: program.title, 
          fitness_level: program.difficulty || 'Intermediate', 
          sport_interest: 'General Fitness' 
        });
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Redirect to respective pages
        if (isNutrition) {
          navigate('/nutrition');
        } else {
          navigate('/workouts');
        }
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Neural Link interrupted. Failed to deploy protocol.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-navy/95 backdrop-blur-2xl"
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[3rem] overflow-hidden shadow-premium flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-10 w-12 h-12 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white md:text-brand-navy md:bg-gray-100 rounded-full flex items-center justify-center transition-all"
          >
            <X size={24} />
          </button>

          {/* Left Side: Media & Header (Scrollable on Mobile) */}
          <div className="w-full md:w-2/5 relative h-64 md:h-auto shrink-0">
            <img 
              src={program.image} 
              alt={program.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
            
            <div className="absolute bottom-10 left-10 right-10 text-white">
               <div className="flex items-center gap-3 mb-4">
                  <div className="px-4 py-1.5 bg-brand-orange rounded-full text-[10px] font-black uppercase tracking-widest">
                     {program.difficulty || 'Advanced'}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                     {program.duration || '6 Weeks'}
                  </span>
               </div>
               <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-4">
                  {program.title}
               </h2>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <User size={14} className="text-brand-lime" />
                     <span className="text-xs font-bold uppercase tracking-tight">{program.trainer || 'Neural AI Coach'}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side: Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-10 md:p-16 custom-scrollbar bg-white">
            <div className="space-y-12">
               {/* Description */}
               <section>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">
                     {program.fullDescription || program.description}
                  </p>
               </section>

               {/* Stats Grid */}
               <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Calories', val: program.calories || '2,400', icon: Zap, color: 'text-brand-orange' },
                    { label: 'Protein', val: program.protein || '180g', icon: Utensils, color: 'text-brand-blue' },
                    { label: 'Exercises', val: program.exerciseCount || '24', icon: Dumbbell, color: 'text-brand-lime' },
                    { label: 'Intensity', val: program.intensity || 'High', icon: BarChart, color: 'text-brand-navy' },
                  ].map((stat, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                       <stat.icon size={20} className={`${stat.color} mb-3`} />
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                       <p className="text-xl font-black text-brand-navy tracking-tight">{stat.val}</p>
                    </div>
                  ))}
               </section>

               {/* Exercise List & Nutrition Split */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <section className="space-y-6">
                     <h3 className="text-xl font-black italic uppercase tracking-tighter text-brand-navy flex items-center gap-3">
                        <Dumbbell className="text-brand-orange" /> Protocol Components
                     </h3>
                     <div className="space-y-4">
                        {(program.exercises || ['Neural Warmup', 'Compound Matrix', 'Isolation Phase', 'Core Calibration']).map((ex, i) => (
                          <div key={i} className="group flex items-center justify-between p-5 bg-white border-2 border-gray-50 hover:border-brand-orange/10 rounded-2xl transition-all cursor-pointer">
                             <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-gray-300">0{i+1}</span>
                                <span className="font-bold text-brand-navy">{ex}</span>
                             </div>
                             <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                     </div>
                  </section>

                  <section className="space-y-6">
                     <h3 className="text-xl font-black italic uppercase tracking-tighter text-brand-navy flex items-center gap-3">
                        <Utensils className="text-brand-blue" /> Macro Architecture
                     </h3>
                     <div className="p-8 bg-brand-navy rounded-[2.5rem] text-white space-y-6">
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Nutrition Blueprint</span>
                           <Zap size={16} className="text-brand-orange" />
                        </div>
                        <div className="space-y-4">
                           {Object.entries(program.macros || { Protein: '40%', Carbs: '35%', Fats: '25%' }).map(([k, v]) => (
                             <div key={k} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                   <span>{k}</span>
                                   <span className="text-brand-lime">{v}</span>
                                </div>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                   <motion.div 
                                     initial={{ width: 0 }}
                                     animate={{ width: v }}
                                     className="h-full bg-white"
                                   />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </section>
               </div>

               {/* Actions */}
               <section className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-gray-100 relative">
                  {error && (
                    <div className="absolute -top-12 left-0 right-0 text-center">
                      <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>
                    </div>
                  )}
                  <button 
                    onClick={handleInitialize}
                    disabled={loading || success}
                    className={`btn-navy w-full sm:flex-1 !h-20 text-lg group transition-all flex items-center justify-center gap-3 ${
                      success ? '!bg-brand-lime hover:!bg-brand-lime !text-brand-navy shadow-[0_0_30px_rgba(215,255,0,0.4)]' : ''
                    }`}
                  >
                     {loading ? (
                       <>
                         <Loader2 size={24} className="animate-spin text-white" />
                         DEPLOYING NEURAL LINK...
                       </>
                     ) : success ? (
                       <>
                         <CheckCircle2 size={24} className="text-brand-navy animate-bounce" />
                         PROTOCOL CALIBRATED! REDIRECTING...
                       </>
                     ) : (
                       <>
                         <CheckCircle size={24} className="text-brand-lime group-hover:scale-110 transition-transform" />
                         INITIALIZE PROGRAM
                       </>
                     )}
                  </button>
                  <div className="flex items-center gap-4">
                     <button className="w-20 h-20 bg-gray-50 hover:bg-brand-orange/5 text-gray-400 hover:text-brand-orange rounded-3xl border border-gray-100 flex items-center justify-center transition-all">
                        <Heart size={28} />
                     </button>
                     <button className="w-20 h-20 bg-gray-50 hover:bg-brand-blue/5 text-gray-400 hover:text-brand-blue rounded-3xl border border-gray-100 flex items-center justify-center transition-all">
                        <Share2 size={28} />
                     </button>
                  </div>
               </section>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProgramDetailModal;
