import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  ChevronRight, 
  Activity, 
  Star,
  Activity as ActivityIcon,
  ArrowRight
} from 'lucide-react';

const Pricing = () => {
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

  return (
    <div className="min-h-screen bg-brand-navy font-sans selection:bg-brand-orange selection:text-white pb-32 tactical-grid">
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

         {/* FAQ Hook */}
         <div className="mt-32 bg-brand-navy-light rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-12 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-full bg-brand-orange/5 blur-[100px] pointer-events-none" />
            
            <div className="space-y-6 flex-1 text-center md:text-left relative z-10">
               <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Still have questions?</h3>
               <p className="text-gray-500 text-base font-bold uppercase tracking-wide max-w-lg mx-auto md:mx-0">Our Performance Intelligence team is available 24/7 to help you choose the right protocol.</p>
            </div>
            <button className="h-14 px-10 bg-white/5 border border-white/10 text-white font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-brand-navy transition-all shadow-2xl active:scale-95 italic relative z-10">
               Chat with Support
            </button>
         </div>
      </div>
    </div>
  );
};

export default Pricing;
