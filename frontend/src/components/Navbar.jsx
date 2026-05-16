import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  ChevronDown, 
  Zap, 
  Users, 
  Trophy, 
  Dumbbell, 
  Apple, 
  ArrowRight,
  TrendingUp,
  Target
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { 
      label: 'Programs', 
      path: '/programs',
      dropdown: [
        { title: 'Strength Matrix', desc: 'Elite muscle building protocols', icon: Dumbbell, color: 'text-brand-orange' },
        { title: 'Neural Fat Burn', desc: 'Metabolic optimization', icon: Zap, color: 'text-brand-blue' },
        { title: 'Pro Conditioning', desc: 'Elite athlete systems', icon: Activity, color: 'text-brand-lime' }
      ]
    },
    { 
      label: 'Nutrition', 
      path: '/nutrition',
      dropdown: [
        { title: 'BioSync Diet', desc: 'Metabolic precision tracking', icon: Apple, color: 'text-brand-lime' },
        { title: 'Macro Guard', desc: 'AI-powered intake analysis', icon: Target, color: 'text-brand-orange' },
        { title: 'Supplement AI', desc: 'Neural stacking advisor', icon: Zap, color: 'text-brand-blue' }
      ]
    },
    { 
      label: 'Community', 
      path: '/community',
      dropdown: [
        { title: 'Global Arena', desc: 'Connect with elite athletes', icon: Users, color: 'text-brand-blue' },
        { title: 'Live Sessions', desc: 'Neural feedback coaching', icon: Activity, color: 'text-brand-lime' }
      ]
    },
    { label: 'Challenges', path: '/challenges' },
    { label: 'Pricing', path: '/pricing' }
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/40 backdrop-blur-3xl border-b border-white/5 px-6 md:px-12 h-20 flex items-center justify-between shadow-2xl">
      {/* Brand */}
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-orange/20 group-hover:rotate-6 transition-all duration-500">
          <Activity size={22} strokeWidth={3} />
        </div>
        <span className="text-xl font-black tracking-tighter uppercase italic text-white">
          VITAMAX<span className="text-brand-orange">.</span>
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden lg:flex items-center gap-2">
        {navItems.map((item) => (
          <div 
            key={item.label}
            className="relative h-20 flex items-center"
            onMouseEnter={() => setActiveDropdown(item.label)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div 
              className={`flex items-center gap-2 cursor-pointer group/link px-5 py-2 rounded-xl transition-all duration-300 ${location.pathname === item.path ? 'text-brand-orange bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              onClick={() => handleNavClick(item.path)}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest italic">
                {item.label}
              </span>
              {item.dropdown && (
                <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180 text-brand-orange' : 'opacity-40'}`} />
              )}
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {item.dropdown && activeDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[340px] bg-brand-navy-light rounded-[2rem] p-6 shadow-2xl border border-white/5"
                >
                  <div className="grid gap-2">
                    {item.dropdown.map((drop) => (
                      <div 
                        key={drop.title}
                        className="group/item flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer"
                        onClick={() => handleNavClick(item.path)}
                      >
                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${drop.color} group-hover/item:scale-110 group-hover/item:bg-white/10 transition-all duration-500 border border-white/5`}>
                          <drop.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-black uppercase tracking-tight text-white leading-none mb-1 italic">{drop.title}</p>
                          <p className="text-[9px] text-gray-500 font-bold leading-tight uppercase tracking-wide">{drop.desc}</p>
                        </div>
                        <ArrowRight size={14} className="text-gray-700 group-hover/item:text-brand-orange group-hover/item:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-brand-blue/10 rounded-full border border-brand-blue/20 group cursor-default">
          <Zap size={12} className="text-brand-blue group-hover:animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-blue">Live Status</span>
          <div className="w-1 h-1 bg-brand-blue rounded-full animate-ping" />
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="h-10 px-6 bg-brand-orange text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-orange-glow hover:brightness-110 transition-all active:scale-95 italic"
        >
          Access Portal
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
