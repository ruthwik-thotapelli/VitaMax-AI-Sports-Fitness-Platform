import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom'; 
import { 
  Activity, Search, ChevronRight, ChevronLeft, ChevronDown,
  Star, Zap, Flame, Medal, Trophy, Users, Target, Heart,
  ShieldCheck, Cpu, Utensils, TrendingUp, Clock, Dumbbell,
  CheckCircle2, Play, Phone, ArrowRight
} from 'lucide-react';
import HeroSlider from '../components/ott/HeroSlider';
import { HERO_BANNERS, CATEGORIES } from '../data/mockData';
import ProgramDetailModal from '../components/ProgramDetailModal';
import LandingBottom from '../assets/landing_bottom.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* ─── Vertical Program Card ─── */
const VerticalProgramCard = ({ program, onProgramClick }) => (
  <motion.div
    whileHover={{ y: -12, scale: 1.02 }}
    className="relative rounded-[2rem] overflow-hidden cursor-pointer flex-shrink-0 h-[540px] w-full shadow-2xl group border border-white/5"
    onClick={() => onProgramClick(program)}
  >
    <img
      src={program.image}
      alt={program.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
    
    <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
      <div>
        <span
          className="inline-block px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest text-white mb-6 border border-white/10 backdrop-blur-md"
          style={{ backgroundColor: `${program.color}66` }}
        >
          {program.category || program.subtitle}
        </span>
        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-6 italic">
          {program.title.split(' ').slice(0, 2).join(' ')}{' '}
          <span style={{ color: program.color }}>
            {program.title.split(' ').slice(2).join(' ')}
          </span>
        </h3>

        <ul className="space-y-3">
          {(program.features || program.cardFeatures || []).map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: program.color }} />
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wide">
                {typeof f === 'string' ? f : f.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        style={{ backgroundColor: program.color }}
        className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-[10px] text-black flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-95 shadow-xl italic"
      >
        Explore Protocol <ArrowRight size={16} />
      </button>
    </div>
  </motion.div>
);

/* ─── Main Landing Page ─── */
const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-navy font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white tactical-grid">

      {/* ── 3. HERO CAROUSEL ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pt-10 pb-10">
        <HeroSlider banners={HERO_BANNERS} onProgramClick={handleProgramClick} />
      </section>

      {/* ── 4. FEATURES STRIP ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-16">
        <div className="bg-brand-navy-light/50 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 py-10 px-10 grid grid-cols-2 md:grid-cols-5 gap-8 shadow-2xl">
          {[
            { label: 'AI PERSONALIZATION', sub: 'Adaptive Neural Engine', icon: Cpu, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
            { label: 'EXPERT COMMAND', sub: 'Elite Performance Leads', icon: Users, color: 'text-brand-lime', bg: 'bg-brand-lime/10' },
            { label: 'FUEL MATRIX', sub: 'Bio-Metric Optimization', icon: Utensils, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
            { label: 'REAL OUTPUT', sub: 'Proven Success Metrics', icon: Trophy, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
            { label: 'ELITE SECURITY', sub: 'Encrypted Progress Data', icon: ShieldCheck, color: 'text-brand-lime', bg: 'bg-brand-lime/10' },
          ].map((f, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left group cursor-default">
              <div className={`w-12 h-12 ${f.bg} ${f.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all border border-white/5`}>
                <f.icon size={22} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white uppercase tracking-wider leading-none">{f.label}</p>
                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-tight">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. STATS STRIP ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-20">
        <div className="bg-brand-navy-light rounded-[2.5rem] border border-white/5 py-12 px-10 flex flex-wrap justify-around items-center gap-10 shadow-2xl">
          {[
            { val: '250K+', label: 'Athletes Active', icon: Flame, color: 'text-brand-orange' },
            { val: '98%', label: 'Sync Success', icon: TrendingUp, color: 'text-brand-blue' },
            { val: '150+', label: 'Prime Coaches', icon: Trophy, color: 'text-brand-lime' },
            { val: '500+', label: 'Protocols', icon: Dumbbell, color: 'text-white' },
            { val: '4.9/5', label: 'Matrix Rating', icon: Heart, color: 'text-brand-orange' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-5 min-w-[160px] group">
              <s.icon size={36} className={`${s.color} transition-transform group-hover:scale-110`} />
              <div className="space-y-1">
                <p className="text-3xl font-black text-white tracking-tighter leading-none italic uppercase">{s.val}</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. POPULAR PROTOCOLS ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-24">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">Trending Matrix</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
                POPULAR <span className="text-brand-orange">PROTOCOLS</span>
             </h2>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white flex items-center gap-3 transition-all italic border-b border-white/5 pb-2">
            SCAN ALL PROTOCOLS <ChevronRight size={14} />
          </button>
        </div>

        <div className="relative group/slider">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{ nextEl: '.proto-next', prevEl: '.proto-prev' }}
            autoplay={{ delay: 6000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              1700: { slidesPerView: 5 },
            }}
          >
            {HERO_BANNERS.map((p) => (
              <SwiperSlide key={p.id}>
                <VerticalProgramCard program={p} onProgramClick={handleProgramClick} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="proto-prev absolute -left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-brand-navy-light border border-white/10 shadow-2xl rounded-xl flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all opacity-0 group-hover/slider:opacity-100">
            <ChevronLeft size={24} />
          </button>
          <button className="proto-next absolute -right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-brand-navy-light border border-white/10 shadow-2xl rounded-xl flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all opacity-0 group-hover/slider:opacity-100">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* ── 9. AI RECOMMENDATION ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-32">
        <div className="bg-brand-navy-light rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl border border-white/5 flex flex-col xl:flex-row justify-between items-center gap-16">
          <div className="absolute top-0 right-0 w-[600px] h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,95,4,0.1),transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 space-y-8 flex-1 text-center xl:text-left">
            <div className="flex items-center justify-center xl:justify-start gap-3">
               <Cpu size={20} className="text-brand-orange" />
               <p className="text-brand-orange text-[10px] font-bold uppercase tracking-widest italic">Neural Engine Analysis</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none italic">
              CALIBRATE YOUR <br /> <span className="text-brand-orange">PERFORMANCE.</span>
            </h2>
            <p className="text-gray-500 text-base font-bold max-w-lg leading-relaxed mx-auto xl:mx-0">
              Our proprietary AI matrix decrypts your biometric stream to engineer a protocol tailored exclusively for your neural architecture.
            </p>
            <button className="h-16 px-10 bg-brand-orange text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:brightness-110 transition-all shadow-orange-glow italic">
              START NEURAL SYNC
            </button>
          </div>

          <div className="relative z-10 flex-1 w-full grid grid-cols-2 gap-4">
            {[
              { label: 'DECRYPT', sub: 'Bio-Metric Scan', icon: Search, color: 'text-brand-blue' },
              { label: 'ENGINEER', sub: 'Protocol Synthesis', icon: Target, color: 'text-brand-lime' },
              { label: 'MONITOR', sub: 'Real-time Analytics', icon: Activity, color: 'text-brand-orange' },
              { label: 'EVOLVE', sub: 'Elite Ascension', icon: Trophy, color: 'text-white' },
            ].map((f, i) => (
              <div 
                key={i} 
                className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center hover:bg-white/10 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${f.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                  <f.icon size={24} />
                </div>
                <p className="text-[12px] font-black text-white uppercase tracking-widest mb-1 italic">{f.label}</p>
                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. BOTTOM HERO IMAGE ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/5"
        >
          <img 
            src={LandingBottom} 
            alt="Performance Excellence" 
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-[3s]" 
          />
        </motion.div>
      </section>

      {/* ── 12. FOOTER ── */}
      <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-10 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
            {/* Brand Column */}
            <div className="lg:col-span-1 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white shadow-orange-glow">
                  <Activity size={24} strokeWidth={3} />
                </div>
                <span className="text-2xl font-black tracking-tight uppercase italic">VITAMAX<span className="text-brand-orange">.</span></span>
              </div>
              <p className="text-gray-600 text-[11px] font-bold leading-relaxed max-w-xs uppercase tracking-tight">
                The ultimate neural performance engine for the modern athlete. 
                Synchronizing biology with machine intelligence.
              </p>
              <div className="flex items-center gap-4">
                {['TW', 'IG', 'YT', 'FB'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[9px] font-bold text-gray-500 hover:bg-brand-orange hover:text-white transition-all border border-white/5">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-orange italic">Protocols</h4>
              <ul className="space-y-4">
                {['Strength Matrix', 'Fat Burn Elite', 'Neural Mobility', 'Pro Conditioning'].map((l) => (
                  <li key={l}><Link to="/programs" className="text-[11px] font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors italic">{l}</Link></li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-blue italic">Platform</h4>
              <ul className="space-y-4">
                {['Mission Control', 'Bio-Insights', 'Global Arena', 'Merit System'].map((l) => (
                  <li key={l}><Link to="/" className="text-[11px] font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors italic">{l}</Link></li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-lime italic">Support</h4>
              <ul className="space-y-4">
                {['Help Center', 'Security Audit', 'Contact Sync'].map((l) => (
                  <li key={l}><a href="#" className="text-[11px] font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors italic">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-1 space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-orange italic">Neural Feed</h4>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Receive weekly intelligence reports and protocol updates.
              </p>
              <div className="space-y-3">
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="ENTER EMAIL..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-6 text-[10px] font-bold text-white outline-none focus:bg-white/10 focus:border-brand-orange/30 transition-all uppercase"
                  />
                  <button className="absolute right-2 top-2 bottom-2 w-10 bg-brand-orange text-white rounded-lg flex items-center justify-center hover:brightness-110 transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
                <p className="text-[8px] font-bold text-gray-700 uppercase tracking-widest text-center italic">
                  50K+ ATHLETES IN SYNC
                </p>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">© 2026 VITAMAX PERFORMANCE CORP // ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-8 text-[9px] font-bold text-gray-700 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Matrix</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
