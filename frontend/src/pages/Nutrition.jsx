import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Settings2
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
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    weight: '',
    goal: 'Muscle Gain',
    dietary_preference: 'None'
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data } = await API.get('/nutrition');
      // Show only the latest plan to avoid duplicates stacking
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

  return (
    <div className="relative space-y-10 pb-20">
      {/* Premium Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="relative z-10 space-y-3">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-lime/10 rounded-lg flex items-center justify-center text-brand-lime border border-brand-lime/20">
               <Salad size={18} />
            </div>
            <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[.3em]">Fueling Module</span>
         </div>
         <div className="flex items-center justify-between">
           <div className="space-y-1">
             <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none uppercase">
               NUTRITION <span className="text-brand-lime">PROTOCOLS</span>
             </h2>
             <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">Calibrate your bio-fueling for peak metabolic output.</p>
           </div>
           <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
             <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gemini Core Linked</span>
           </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Planner Sidebar Card */}
        <div className="xl:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-navy-light rounded-[2rem] p-10 border border-white/5 shadow-2xl sticky top-32"
          >
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
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-orange/50 focus:bg-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none transition-all placeholder:text-gray-700"
                  placeholder="e.g. 75"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Metabolic Goal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-orange/50 focus:bg-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none transition-all cursor-pointer appearance-none"
                >
                  {['Fat Loss', 'Muscle Gain', 'Maintenance', 'Endurance Fuel'].map(g => (
                    <option key={g} value={g} className="bg-brand-navy-light">{g}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Dietary Pattern</label>
                <select
                  value={formData.dietary_preference}
                  onChange={(e) => setFormData({...formData, dietary_preference: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-orange/50 focus:bg-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none transition-all cursor-pointer appearance-none"
                >
                  {['None', 'Vegetarian', 'Vegan', 'Keto', 'Paleo'].map(p => (
                    <option key={p} value={p} className="bg-brand-navy-light">{p}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-brand-orange text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-3 shadow-orange-glow disabled:opacity-50 italic"
              >
                {loading ? (
                  <> <Loader2 className="animate-spin text-white" size={18} /> SYNCING... </>
                ) : (
                  <> <Utensils size={18} /> GENERATE PROTOCOL </>
                )}
              </button>
            </form>
          </motion.div>
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
                            // If the Unsplash image fails, fallback to guaranteed local assets
                            e.target.onerror = null; // Prevent infinite loop
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
            <div className="bg-brand-navy-light rounded-[2.5rem] border-2 border-dashed border-white/5 py-20 text-center space-y-8 shadow-2xl">
              <div className="w-20 h-20 bg-brand-lime/10 rounded-full flex items-center justify-center mx-auto text-brand-lime border border-brand-lime/20">
                <Utensils size={36} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Ready to Fuel</h3>
                <p className="text-gray-500 max-w-sm mx-auto text-xs font-bold leading-relaxed uppercase tracking-widest">
                  Enter your mass & goal on the left, then hit <span className="text-brand-orange">Generate Protocol</span> to create your personalized meal plan.
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                {['1. Set Weight', '2. Pick Goal', '3. Choose Diet', '4. Generate'].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-[8px] font-black">{i+1}</div>
                    <span>{step.split('. ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
