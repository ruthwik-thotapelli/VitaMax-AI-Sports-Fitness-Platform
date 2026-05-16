import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Star,
  ArrowRight,
  X,
  CreditCard,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Checkout State: null | 'review' | 'processing' | 'success'
  const [checkoutStage, setCheckoutStage] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const tiers = [
    {
      name: 'Rookie',
      price: '0',
      description: 'The foundation for your journey. Access core training protocols.',
      features: [
        'Basic AI Workouts',
        'Standard Performance Tracking',
        'Community Lounge Access',
        '3 Custom Protocols/Month'
      ],
      cta: 'Join Free',
      popular: false,
      color: '#64748b'
    },
    {
      name: 'Pro Athlete',
      price: '29',
      description: 'Optimized performance for serious athletes. Real-time AI coaching.',
      features: [
        'Advanced AI Personal Training',
        'Neural Nutrition Generator',
        'Deep Insights & Analytics',
        'Unlimited Protocols',
        'Early Access to Challenges',
        'Exclusive Badges'
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      color: '#FF5F04'
    },
    {
      name: 'Elite Matrix',
      price: '99',
      description: 'The ultimate performance engine. Human-AI hybrid training.',
      features: [
        'Everything in Pro',
        '1-on-1 Human Expert Coaching',
        'Biometric Sync Intelligence',
        'Private Lounge Access',
        'VIP Event Invitations',
        'Founder Status Badge'
      ],
      cta: 'Go Elite',
      popular: false,
      color: '#D7FF00'
    }
  ];

  const handleSelectPlan = (tier) => {
    if (!user) {
      navigate('/register');
      return;
    }
    setSelectedPlan(tier);
    setCheckoutStage('review');
  };

  const handleCheckout = () => {
    setCheckoutStage('processing');
    setTimeout(() => {
      setCheckoutStage('success');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-brand-navy font-sans selection:bg-brand-orange selection:text-white pb-32 tactical-grid relative">
      {/* Header */}
      <div className="pt-24 pb-40 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center relative z-10 space-y-6">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2 bg-brand-orange/10 border border-brand-orange/20 rounded-full text-brand-orange text-[10px] font-bold uppercase tracking-widest mx-auto"
           >
              <Zap size={14} /> Membership Intelligence
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] italic"
           >
             INVEST IN YOUR <br />
             <span className="text-brand-orange">PERFORMANCE.</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-gray-500 text-lg md:text-xl font-bold uppercase tracking-wide max-w-2xl mx-auto leading-relaxed"
           >
             Choose the protocol tier that fits your ambition. Scale your potential with AI-driven training.
           </motion.p>
        </div>
      </div>

      {/* Tiers Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 -mt-20 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-brand-navy-light rounded-[2.5rem] p-10 shadow-2xl border transition-all duration-500 relative flex flex-col overflow-hidden ${
                  tier.popular ? 'border-brand-orange ring-1 ring-brand-orange/50' : 'border-white/5'
                }`}
              >
                 {tier.popular && (
                   <div className="absolute top-0 right-0">
                      <div className="bg-brand-orange text-white px-6 py-2.5 rounded-bl-[1.5rem] text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl">
                         <Star size={12} className="fill-white" /> Recommended
                      </div>
                   </div>
                 )}

                 <div className="space-y-8 mb-10">
                    <div className="space-y-2">
                       <p className={`text-[10px] font-bold uppercase tracking-widest italic`} style={{ color: tier.color }}>{tier.name} TIER</p>
                       <div className="flex items-baseline gap-2">
                          <span className="text-6xl font-black tracking-tighter text-white">${tier.price}</span>
                          <span className="text-gray-600 font-bold uppercase text-[10px] tracking-widest">/ Month</span>
                       </div>
                    </div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wide leading-relaxed">{tier.description}</p>
                 </div>

                 <div className="flex-1 space-y-5 mb-12">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                         <div className="w-5 h-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-orange/20 transition-colors">
                            <CheckCircle2 size={12} className={tier.popular ? 'text-brand-orange' : 'text-gray-600'} />
                         </div>
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wide group-hover:text-white transition-colors">{feature}</span>
                      </div>
                    ))}
                 </div>

                 <button 
                   onClick={() => handleSelectPlan(tier)}
                   className={`w-full h-16 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 italic ${
                     tier.popular 
                     ? 'bg-brand-orange text-white shadow-orange-glow hover:brightness-110' 
                     : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                   }`}
                 >
                    {tier.cta} <ArrowRight size={16} />
                 </button>
              </motion.div>
            ))}
         </div>

         {/* Trust Strip */}
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 pt-20 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12"
         >
            {[
               { icon: ShieldCheck, label: 'Secure Payments', sub: 'Encrypted matrix', color: 'text-brand-blue' },
               { icon: Zap, label: 'Instant Access', sub: 'No waiting protocols', color: 'text-brand-orange' },
               { icon: Cpu, label: 'AI Powered', sub: 'Continuous learning', color: 'text-brand-lime' },
               { icon: Activity, label: 'Health Sync', sub: 'Apple & Garmin', color: 'text-white' },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4 group">
                 <div className={`w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto ${item.color} transition-all group-hover:scale-110 group-hover:bg-white/10`}>
                    <item.icon size={28} />
                 </div>
                 <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-white mb-1">{item.label}</h4>
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest italic">{item.sub}</p>
                 </div>
              </div>
            ))}
         </motion.div>
      </div>

      {/* Checkout Modal Overlay */}
      <AnimatePresence>
        {checkoutStage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-navy/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-xl bg-brand-navy-light rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {checkoutStage !== 'success' && checkoutStage !== 'processing' && (
                <button 
                  onClick={() => setCheckoutStage(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X size={18} />
                </button>
              )}

              {/* Top Banner based on Tier */}
              <div className="h-2 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-50" style={{ backgroundImage: `linear-gradient(to right, transparent, ${selectedPlan?.color}, transparent)` }} />

              <div className="p-10 md:p-14">
                 {/* 1. Review Stage */}
                 {checkoutStage === 'review' && (
                   <div className="space-y-10">
                     <div>
                       <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Upgrade Protocol</h3>
                       <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Verify your selected tier below</p>
                     </div>

                     <div className="bg-black/30 rounded-3xl p-6 border border-white/5 space-y-6">
                        <div className="flex justify-between items-center pb-6 border-b border-white/10">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                 <Star size={20} style={{ color: selectedPlan.color }} />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-white italic uppercase">{selectedPlan.name}</p>
                                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Billed Monthly</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-2xl font-black text-white italic">${selectedPlan.price}</p>
                           </div>
                        </div>

                        <div className="space-y-4">
                           {selectedPlan.features.slice(0, 3).map((feat, i) => (
                             <div key={i} className="flex items-center gap-3">
                                <CheckCircle2 size={14} style={{ color: selectedPlan.color }} />
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{feat}</span>
                             </div>
                           ))}
                           <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest italic pt-2">+ All other tier features included.</p>
                        </div>
                     </div>

                     <button 
                       onClick={handleCheckout}
                       className="w-full h-14 bg-brand-orange text-white rounded-xl font-black text-[11px] uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-orange-glow flex items-center justify-center gap-3 italic"
                       style={{ backgroundColor: selectedPlan.price === '0' ? '#64748b' : selectedPlan.price === '99' ? '#D7FF00' : '#FF5F04', color: selectedPlan.price === '99' ? '#0F172A' : '#fff' }}
                     >
                       <CreditCard size={16} /> 
                       {selectedPlan.price === '0' ? 'ACTIVATE FREE ACCOUNT' : 'CONFIRM & PAY'}
                     </button>
                   </div>
                 )}

                 {/* 2. Processing Stage */}
                 {checkoutStage === 'processing' && (
                   <div className="text-center py-10 space-y-8">
                     <div className="w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto text-brand-orange border border-brand-orange/20 relative">
                        <div className="absolute inset-0 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
                        <Loader2 size={32} className="animate-pulse" />
                     </div>
                     <div>
                       <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-3">Syncing Credentials...</h3>
                       <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">Encrypting payment matrix & activating protocols.</p>
                     </div>
                   </div>
                 )}

                 {/* 3. Success Stage */}
                 {checkoutStage === 'success' && (
                   <div className="text-center py-6 space-y-8">
                     <div className="w-24 h-24 bg-brand-lime/10 rounded-full flex items-center justify-center mx-auto text-brand-lime border border-brand-lime/20 shadow-[0_0_40px_rgba(215,255,0,0.2)]">
                        <ShieldCheck size={40} />
                     </div>
                     <div>
                       <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">Protocol <span className="text-brand-lime">Active</span></h3>
                       <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-[280px] mx-auto">
                         Your account has been upgraded to {selectedPlan.name}. All systems are fully operational.
                       </p>
                     </div>
                     <button 
                       onClick={() => {
                         setCheckoutStage(null);
                         navigate('/overview');
                       }}
                       className="w-full h-14 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[11px] uppercase tracking-widest transition-all hover:bg-brand-lime hover:text-brand-navy hover:border-brand-lime active:scale-95 flex items-center justify-center gap-3 italic mt-4"
                     >
                       INITIALIZE DASHBOARD <ArrowRight size={16} />
                     </button>
                   </div>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pricing;
