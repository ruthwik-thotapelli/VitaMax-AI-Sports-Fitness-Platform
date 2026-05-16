import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import API from '../api';
import { 
  Utensils, 
  Droplets, 
  Loader2, 
  Apple, 
  Salad, 
  Flame, 
  Zap, 
  TrendingUp, 
  ChevronRight,
  ArrowRight,
  Settings2,
  Target,
  ScanLine
} from 'lucide-react';
import mealBreakfast from '../assets/meal_breakfast.png';
import mealSnack from '../assets/meal_snack.png';

const MEAL_IMAGES = {
  Vegan: {
    Breakfast: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80',
    Lunch:     'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
    Snack:     'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80',
    Dinner:    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80',
  },
  Vegetarian: {
    Breakfast: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',
    Lunch:     'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    Snack:     'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    Dinner:    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  },
  Keto: {
    Breakfast: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
    Lunch:     'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    Snack:     'https://images.unsplash.com/photo-1626201848028-0fb4bd1dcfce?w=800&q=80',
    Dinner:    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
  },
  Paleo: {
    Breakfast: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    Lunch:     'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80',
    Snack:     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    Dinner:    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  },
  None: {
    Breakfast: mealBreakfast,
    Lunch:     'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    Snack:     mealSnack,
    Dinner:    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
  },
};

const getMealImage = (dietPref, mealType) => {
  const map = MEAL_IMAGES[dietPref] || MEAL_IMAGES['None'];
  return map[mealType] || mealBreakfast;
};


const Nutrition = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.category || 'BioSync Diet');
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  
  // Simulated state for new tabs
  const [macroScanning, setMacroScanning] = useState(false);
  const [macroScanned, setMacroScanned] = useState(false);
  const [stackConfiguring, setStackConfiguring] = useState(false);
  const [stackConfigured, setStackConfigured] = useState(false);

  const [formData, setFormData] = useState({
    weight: '',
    goal: 'Muscle Gain',
    dietary_preference: 'None'
  });

  const tabs = ['BioSync Diet', 'Macro Guard', 'Supplement AI'];

  useEffect(() => {
    if (location.state?.category) {
      setActiveTab(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    if (activeTab === 'BioSync Diet') {
      fetchPlans();
    }
  }, [activeTab]);

  const fetchPlans = async () => {
    try {
      const { data } = await API.get('/nutrition');
      setPlans(data.slice(0, 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post('/nutrition/generate', formData);
      setPlans([data]);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to generate plan. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleLiveScan = () => {
    setMacroScanning(true);
    setTimeout(() => {
      setMacroScanning(false);
      setMacroScanned(true);
    }, 2000);
  };

  const handleConfigureStack = () => {
    setStackConfiguring(true);
    setTimeout(() => {
      setStackConfiguring(false);
      setStackConfigured(true);
    }, 2500);
  };

  return (
    <div className="relative space-y-10 pb-20 max-w-[1440px] mx-auto px-6 md:px-12 mt-12">
      {/* Premium Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="relative z-10 space-y-3">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-lime/10 rounded-lg flex items-center justify-center text-brand-lime border border-brand-lime/20">
               <Salad size={18} />
            </div>
            <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[.3em]">Fueling Module</span>
         </div>
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
           <div className="space-y-1">
             <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none uppercase">
               NUTRITION <span className="text-brand-lime">PROTOCOLS</span>
             </h2>
             <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">Calibrate your bio-fueling for peak metabolic output.</p>
           </div>
           
           {/* Tab Switcher */}
           <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 shrink-0 overflow-x-auto max-w-full">
             {tabs.map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                   activeTab === tab 
                   ? 'bg-brand-lime text-brand-navy shadow-lg' 
                   : 'text-gray-400 hover:text-white hover:bg-white/5'
                 }`}
               >
                 {tab}
               </button>
             ))}
           </div>
         </div>
      </div>

      <div className="relative z-10 pt-4">
        <AnimatePresence mode="wait">
          {activeTab === 'BioSync Diet' && (
            <motion.div
              key="biosync"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-10"
            >
              {/* Planner Sidebar Card */}
              <div className="xl:col-span-4">
                <div className="bg-brand-navy-light rounded-[2rem] p-10 border border-white/5 shadow-2xl sticky top-32">
                  <div className="mb-8">
                     <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none mb-2">Fuel Config</h3>
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Optimization sync required</p>
                  </div>
                  
                  <form onSubmit={handleGenerate} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Current Mass (KG)</label>
                      <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-brand-lime/50 focus:bg-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none transition-all placeholder:text-gray-700"
                        placeholder="e.g. 75"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Metabolic Goal</label>
                      <select
                        value={formData.goal}
                        onChange={(e) => setFormData({...formData, goal: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-brand-lime/50 focus:bg-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none transition-all cursor-pointer appearance-none"
                      >
                        {['Fat Loss', 'Muscle Gain', 'Maintenance', 'Endurance Fuel'].map(g => (
                          <option key={g} value={g} className="bg-brand-navy-light text-white">{g}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Dietary Pattern</label>
                      <select
                        value={formData.dietary_preference}
                        onChange={(e) => setFormData({...formData, dietary_preference: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-brand-lime/50 focus:bg-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none transition-all cursor-pointer appearance-none"
                      >
                        {['None', 'Vegetarian', 'Vegan', 'Keto', 'Paleo'].map(p => (
                          <option key={p} value={p} className="bg-brand-navy-light text-white">{p}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 bg-brand-lime text-brand-navy rounded-xl font-black text-[11px] uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(215,255,0,0.2)] disabled:opacity-50 italic"
                    >
                      {loading ? (
                        <> <Loader2 className="animate-spin text-brand-navy" size={18} /> SYNCING... </>
                      ) : (
                        <> <Utensils size={18} /> GENERATE PROTOCOL </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Nutrition Results List */}
              <div className="xl:col-span-8 space-y-8">
                <AnimatePresence initial={false} mode="popLayout">
                  {plans.map((plan, i) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="bg-brand-navy-light rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden group hover:border-brand-lime/20 transition-all"
                    >
                      <div className="p-10 border-b border-white/5">
                        <div className="flex flex-col xl:flex-row justify-between items-center gap-8">
                          <div className="space-y-3 w-full xl:max-w-[50%]">
                            <div className="flex items-center gap-4">
                               <span className="px-3 py-1 bg-brand-lime/10 text-brand-lime rounded-lg text-[9px] font-bold uppercase tracking-widest border border-brand-lime/20 italic">
                                  {plan.goal} UNIT
                               </span>
                               <span className="text-gray-500 text-[9px] font-bold uppercase tracking-widest italic">CALIBRATED // 2026</span>
                            </div>
                            <h4 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none">{plan.goal.split(' ')[0]} <span className="text-brand-orange">FUELS</span></h4>
                          </div>

                          <div className="flex items-center gap-4 md:gap-8 bg-black/30 p-5 md:p-6 rounded-3xl border border-white/5 shadow-inner w-full xl:w-auto overflow-x-auto no-scrollbar">
                            <div className="text-center min-w-[80px] shrink-0">
                               <p className="text-[8px] text-gray-500 font-bold mb-1.5 uppercase tracking-widest italic">Energy</p>
                               <p className="text-white font-black text-xl italic leading-none">{plan.total_calories}<span className="text-[8px] not-italic text-gray-600 uppercase ml-1">Kcal</span></p>
                            </div>
                            <div className="w-px h-8 bg-white/10 shrink-0" />
                            <div className="text-center min-w-[70px] shrink-0">
                               <p className="text-[8px] text-brand-blue font-bold mb-1.5 uppercase tracking-widest italic">Protein</p>
                               <p className="text-white font-black text-xl italic leading-none">{plan.macros.protein}</p>
                            </div>
                            <div className="w-px h-8 bg-white/10 shrink-0" />
                            <div className="text-center min-w-[70px] shrink-0">
                               <p className="text-[8px] text-brand-orange font-bold mb-1.5 uppercase tracking-widest italic">Carbs</p>
                               <p className="text-white font-black text-xl italic leading-none">{plan.macros.carbs}</p>
                            </div>
                            <div className="w-px h-8 bg-white/10 shrink-0" />
                            <div className="text-center min-w-[70px] shrink-0">
                               <p className="text-[8px] text-brand-lime font-bold mb-1.5 uppercase tracking-widest italic">Fats</p>
                               <p className="text-white font-black text-xl italic leading-none">{plan.macros.fats}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-10 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {plan.meals.map((meal, idx) => (
                            <div 
                              key={idx}
                              className="group h-[260px] rounded-[2rem] overflow-hidden relative shadow-2xl border border-white/5 bg-brand-navy-light"
                            >
                              <div className="absolute inset-0 bg-white/5 animate-pulse" />
                              <img 
                                src={getMealImage(plan.dietary_preference, meal.type)}
                                alt={meal.name} 
                                loading="lazy"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = (meal.type === 'Breakfast' || meal.type === 'Lunch') ? mealBreakfast : mealSnack;
                                }}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-110" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
                              <div className="absolute bottom-0 left-0 p-6 space-y-2 w-full">
                                <span className="text-[9px] font-bold text-brand-lime uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 inline-block">
                                  {meal.type} Cycle
                                </span>
                                <h5 className="text-lg font-black italic tracking-tighter text-white uppercase leading-tight group-hover:text-brand-orange transition-colors">{meal.name}</h5>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-black/20 border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                           <div className="flex items-center gap-5">
                              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/20">
                                 <Droplets size={20} />
                              </div>
                              <div>
                                 <h5 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">Hydration Caliber</h5>
                                 <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Biological demand</p>
                              </div>
                           </div>
                           <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-black italic text-brand-blue tracking-tighter">3.4</span>
                              <span className="text-[10px] font-bold text-gray-500 uppercase italic">Litres / Day</span>
                           </div>
                        </div>
                        
                        <button className="w-full h-14 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 italic">
                           Deploy Full Fueling Matrix <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex items-center gap-4"
                  >
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 shrink-0">
                      <Zap size={16} />
                    </div>
                    <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{error}</p>
                  </motion.div>
                )}

                {plans.length === 0 && !loading && (
                  <div className="bg-brand-navy-light rounded-[2.5rem] border border-white/5 py-24 text-center space-y-8 shadow-2xl">
                    <div className="w-20 h-20 bg-brand-lime/10 rounded-full flex items-center justify-center mx-auto text-brand-lime border border-brand-lime/20">
                      <Utensils size={36} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Ready to Fuel</h3>
                      <p className="text-gray-500 max-w-sm mx-auto text-xs font-bold leading-relaxed uppercase tracking-widest">
                        Enter your mass & goal on the left, then hit <span className="text-brand-lime">Generate Protocol</span> to create your personalized meal plan.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'Macro Guard' && (
            <motion.div
              key="macroguard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-brand-navy-light rounded-[2.5rem] border border-white/5 p-10 md:p-20 shadow-2xl relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
               
               {macroScanned ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left space-y-8 relative z-10 w-full max-w-5xl mx-auto">
                    <div className="flex items-center justify-between border-b border-white/10 pb-6">
                      <div>
                        <h4 className="text-3xl md:text-5xl font-black italic text-white uppercase leading-none">Intake <span className="text-brand-orange">Analysis</span></h4>
                        <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">Live Biological Sync Complete</p>
                      </div>
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-lime/20 rounded-2xl flex items-center justify-center text-brand-lime border border-brand-lime/30">
                        <Target size={28} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                      {/* Energy */}
                      <div className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">Energy</p>
                        <p className="text-4xl font-black text-white italic leading-none">2450<span className="text-[10px] text-gray-500 ml-1">Kcal</span></p>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-orange w-[85%]" />
                        </div>
                      </div>
                      {/* Protein */}
                      <div className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] text-brand-blue font-bold uppercase tracking-widest italic">Protein</p>
                        <p className="text-4xl font-black text-white italic leading-none">185<span className="text-[10px] text-gray-500 ml-1">g</span></p>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-blue w-[92%]" />
                        </div>
                      </div>
                      {/* Carbs */}
                      <div className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] text-brand-orange font-bold uppercase tracking-widest italic">Carbs</p>
                        <p className="text-4xl font-black text-white italic leading-none">220<span className="text-[10px] text-gray-500 ml-1">g</span></p>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-orange w-[70%]" />
                        </div>
                      </div>
                      {/* Fats */}
                      <div className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] text-brand-lime font-bold uppercase tracking-widest italic">Fats</p>
                        <p className="text-4xl font-black text-white italic leading-none">65<span className="text-[10px] text-gray-500 ml-1">g</span></p>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-lime w-[60%]" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-6 flex items-center justify-between">
                       <p className="text-brand-orange font-bold text-xs uppercase tracking-widest italic">Optimal Macronutrient Ratio Achieved</p>
                       <button onClick={() => setMacroScanned(false)} className="text-white text-[10px] font-black uppercase tracking-widest hover:text-brand-orange transition-colors">Rescan</button>
                    </div>
                  </motion.div>
               ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto text-brand-orange border border-brand-orange/20 mb-8 relative z-10">
                        {macroScanning ? <Loader2 size={40} className="animate-spin" /> : <Target size={40} />}
                    </div>
                    <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none mb-4 relative z-10">Macro Guard <span className="text-brand-orange">Active</span></h3>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-lg mx-auto leading-relaxed relative z-10 mb-10">
                      AI-powered intake analysis is currently monitoring your biological fuel consumption. Connect your smart device to initiate live macro scanning.
                    </p>
                    <button 
                      onClick={handleLiveScan}
                      disabled={macroScanning}
                      className="h-14 px-10 bg-brand-orange text-white rounded-xl font-black text-[11px] uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-orange-glow inline-flex items-center justify-center gap-3 italic relative z-10 disabled:opacity-50"
                    >
                        {macroScanning ? (
                          <> <Loader2 size={18} className="animate-spin" /> SCANNING METABOLICS... </>
                        ) : (
                          <> <ScanLine size={18} /> INITIATE LIVE SCAN </>
                        )}
                    </button>
                  </div>
               )}
            </motion.div>
          )}

          {activeTab === 'Supplement AI' && (
            <motion.div
              key="supplement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-brand-navy-light rounded-[2.5rem] border border-white/5 p-10 md:p-20 shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />
               
               {stackConfigured ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left space-y-8 relative z-10 w-full max-w-5xl mx-auto">
                    <div className="flex items-center justify-between border-b border-white/10 pb-6">
                      <div>
                        <h4 className="text-3xl md:text-5xl font-black italic text-white uppercase leading-none">Optimized <span className="text-brand-blue">Stack</span></h4>
                        <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">Neural Profile Generated</p>
                      </div>
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center text-brand-blue border border-brand-blue/30">
                        <Zap size={28} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* Creatine */}
                       <div className="bg-black/40 p-6 rounded-3xl border border-white/5 flex items-center gap-6">
                          <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center border border-brand-blue/20 shrink-0">
                             <Settings2 size={24} className="text-brand-blue" />
                          </div>
                          <div>
                            <h5 className="text-xl font-black text-white italic uppercase leading-tight">Creatine HCL</h5>
                            <p className="text-gray-400 text-xs mt-1">ATP Regeneration & Power Output</p>
                            <p className="text-[10px] font-bold text-brand-lime uppercase tracking-widest mt-2">5g Pre-Workout</p>
                          </div>
                       </div>
                       {/* Omega 3 */}
                       <div className="bg-black/40 p-6 rounded-3xl border border-white/5 flex items-center gap-6">
                          <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center border border-brand-orange/20 shrink-0">
                             <Droplets size={24} className="text-brand-orange" />
                          </div>
                          <div>
                            <h5 className="text-xl font-black text-white italic uppercase leading-tight">Omega-3 EPA/DHA</h5>
                            <p className="text-gray-400 text-xs mt-1">Inflammation Control & Joint Health</p>
                            <p className="text-[10px] font-bold text-brand-lime uppercase tracking-widest mt-2">2000mg with Dinner</p>
                          </div>
                       </div>
                       {/* Ashwagandha */}
                       <div className="bg-black/40 p-6 rounded-3xl border border-white/5 flex items-center gap-6">
                          <div className="w-16 h-16 bg-brand-lime/10 rounded-2xl flex items-center justify-center border border-brand-lime/20 shrink-0">
                             <Salad size={24} className="text-brand-lime" />
                          </div>
                          <div>
                            <h5 className="text-xl font-black text-white italic uppercase leading-tight">KSM-66 Ashwagandha</h5>
                            <p className="text-gray-400 text-xs mt-1">Cortisol Management & Recovery</p>
                            <p className="text-[10px] font-bold text-brand-lime uppercase tracking-widest mt-2">600mg Before Bed</p>
                          </div>
                       </div>
                       {/* Magnesium */}
                       <div className="bg-black/40 p-6 rounded-3xl border border-white/5 flex items-center gap-6">
                          <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 shrink-0">
                             <Zap size={24} className="text-purple-400" />
                          </div>
                          <div>
                            <h5 className="text-xl font-black text-white italic uppercase leading-tight">Magnesium L-Threonate</h5>
                            <p className="text-gray-400 text-xs mt-1">Neurological Recovery & Sleep Sync</p>
                            <p className="text-[10px] font-bold text-brand-lime uppercase tracking-widest mt-2">400mg Before Bed</p>
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-end pt-4">
                       <button onClick={() => setStackConfigured(false)} className="text-white text-[10px] font-black uppercase tracking-widest hover:text-brand-blue transition-colors bg-white/5 px-6 py-3 rounded-lg border border-white/10">Reconfigure Stack</button>
                    </div>
                  </motion.div>
               ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto text-brand-blue border border-brand-blue/20 mb-8 relative z-10">
                        {stackConfiguring ? <Loader2 size={40} className="animate-spin" /> : <Zap size={40} />}
                    </div>
                    <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none mb-4 relative z-10">Neural <span className="text-brand-blue">Stacking</span> Advisor</h3>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-lg mx-auto leading-relaxed relative z-10 mb-10">
                      Upload your bloodwork or metabolic profile to receive a personalized, hyper-optimized supplement protocol engineered by the Gemini Core.
                    </p>
                    <button 
                      onClick={handleConfigureStack}
                      disabled={stackConfiguring}
                      className="h-14 px-10 bg-brand-blue text-white rounded-xl font-black text-[11px] uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(46,91,255,0.4)] inline-flex items-center justify-center gap-3 italic relative z-10 disabled:opacity-50"
                    >
                        {stackConfiguring ? (
                          <> <Loader2 size={18} className="animate-spin" /> ANALYZING BIOMARKERS... </>
                        ) : (
                          <> <Settings2 size={18} /> CONFIGURE STACK </>
                        )}
                    </button>
                  </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Nutrition;
