import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom'; 
import { 
  Activity, Search, ChevronRight, ChevronLeft, ChevronDown,
  Star, Zap, Flame, Medal, Trophy, Users, Target, Heart,
  ShieldCheck, Cpu, Utensils, TrendingUp, Clock, Dumbbell,
  CheckCircle2, Play, Phone, ArrowRight, X
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
    whileHover={{ y: -15, scale: 1.02 }}
    className="relative rounded-[2.5rem] overflow-hidden cursor-pointer flex-shrink-0 h-[600px] w-full shadow-2xl group border border-gray-100"
    onClick={() => onProgramClick(program)}
  >
    <div className="absolute inset-0 bg-[#0b111b]">
      <img
        src={program.image}
        alt={program.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.style.backgroundColor = '#0b111b';
        }}
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    
    <div className="absolute inset-0 flex flex-col justify-between p-10">
      <div>
        <span
          className="inline-block px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white mb-8 border border-white/20 backdrop-blur-md"
          style={{ backgroundColor: `${program.color}CC` }}
        >
          {program.category || program.subtitle}
        </span>
        <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-10 italic">
          {program.title.split(' ').slice(0, -1).join(' ')} <br/>
          <span style={{ color: program.color }}>
            {program.title.split(' ').slice(-1)[0]}
          </span>
        </h3>

        <ul className="space-y-4">
          {(program.cardFeatures || []).map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
                <CheckCircle2 size={12} style={{ color: program.color }} />
              </div>
              <span className="text-[10px] font-bold text-gray-200 uppercase tracking-wider">
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        style={{ backgroundColor: program.color }}
        className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] text-white flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-95 shadow-2xl italic"
      >
        {program.cta} <ChevronRight size={18} />
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
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white">

      {/* ── 3. HERO CINEMATIC SLIDER (Image 1 Style) ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pt-10 pb-16">
        <HeroSlider banners={HERO_BANNERS} onProgramClick={handleProgramClick} />
      </section>


      {/* ── 3c. HERO PROTOCOL CARDS (Trending Section) ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-16">
        <div className="relative group/slider">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true, el: '.proto-pagination' }}
            autoplay={{ delay: 4000 }}
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
          <div className="proto-pagination mt-10 flex justify-center gap-2" />
        </div>
      </section>

      {/* ── 4. FEATURES STRIP ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-16">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 py-10 px-10 grid grid-cols-2 md:grid-cols-5 gap-8 shadow-xl">
          {[
            { label: 'AI PERSONALIZATION', sub: 'Adaptive Neural Engine', icon: Cpu, color: 'text-brand-blue', bg: 'bg-brand-blue/5' },
            { label: 'EXPERT COACHES', sub: 'Elite Performance Leads', icon: Users, color: 'text-brand-lime', bg: 'bg-brand-lime/5' },
            { label: 'NUTRITION TRACKING', sub: 'Bio-Metric Optimization', icon: Utensils, color: 'text-brand-orange', bg: 'bg-brand-orange/5' },
            { label: 'REAL RESULTS', sub: 'Proven Success Metrics', icon: Trophy, color: 'text-brand-blue', bg: 'bg-brand-blue/5' },
            { label: 'SAFE & EFFECTIVE', sub: 'Encrypted Progress Data', icon: ShieldCheck, color: 'text-brand-lime', bg: 'bg-brand-lime/5' },
          ].map((f, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left group cursor-default">
              <div className={`w-12 h-12 ${f.bg} ${f.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all border border-gray-50`}>
                <f.icon size={22} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider leading-none">{f.label}</p>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-tight">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. STATS STRIP ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-20">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 py-12 px-10 flex flex-wrap justify-around items-center gap-10 shadow-xl">
          {[
            { val: '50K+', label: 'Active Athletes', icon: Users, color: 'text-brand-orange' },
            { val: '1200+', label: 'Workout Programs', icon: Dumbbell, color: 'text-brand-blue' },
            { val: '95M+', label: 'Calories Burned', icon: Flame, color: 'text-brand-lime' },
            { val: '150+', label: 'Expert Trainers', icon: Trophy, color: 'text-brand-blue' },
            { val: '98%', label: 'Satisfaction Rate', icon: Heart, color: 'text-brand-orange' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-5 min-w-[160px] group">
              <s.icon size={36} className={`${s.color} transition-transform group-hover:scale-110`} />
              <div className="space-y-1">
                <p className="text-3xl font-black text-brand-navy tracking-tighter leading-none italic uppercase">{s.val}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. TOP PROGRAMS FOR YOU ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-24">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
             <h2 className="text-3xl md:text-4xl font-black text-brand-navy uppercase tracking-tighter italic">
                TOP <span className="text-brand-orange">PROGRAMS FOR YOU</span>
             </h2>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-brand-orange hover:text-brand-navy flex items-center gap-3 transition-all italic border-b border-brand-orange/20 pb-2">
            VIEW ALL PROGRAMS <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES[0].data.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -8 }}
              className="bg-[#0b111b] rounded-2xl overflow-hidden shadow-2xl relative h-72 group cursor-pointer"
              onClick={() => handleProgramClick(p)}
            >
              <img 
                src={p.image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={p.title} 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.backgroundColor = '#0b111b';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-block px-3 py-1 bg-brand-blue/80 backdrop-blur-md rounded text-[8px] font-bold text-white mb-3 self-start">
                  {p.category}
                </span>
                <h4 className="text-lg font-black text-white italic uppercase tracking-tight leading-tight mb-3">
                  {p.title}
                </h4>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1.5">
                      <Star size={10} className="text-brand-orange fill-brand-orange" />
                      <span className="text-[9px] font-black text-white">{p.rating}</span>
                   </div>
                   <div className="flex items-center gap-4 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                      <span>{p.duration}</span>
                      <span>{p.level}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 9. AI RECOMMENDATION (Image 2 Style) ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-32">
        <div className="bg-[#0b111b] rounded-[3rem] p-12 md:p-16 relative overflow-hidden shadow-2xl border border-white/5 flex flex-col xl:flex-row justify-between items-center gap-16">
          <div className="absolute top-0 right-0 w-[600px] h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,95,4,0.15),transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 space-y-8 flex-1 text-center xl:text-left">
            <p className="text-brand-orange text-[10px] font-black uppercase tracking-[0.4em] italic">AI RECOMMENDATION</p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight italic">
              Get Personalized <br /> <span className="text-brand-orange">Protocol For You</span>
            </h2>
            <p className="text-gray-400 text-sm font-bold max-w-lg leading-relaxed mx-auto xl:mx-0 uppercase tracking-wide opacity-60">
              Our AI analyzes your goals, fitness level, and lifestyle to recommend the best protocol for maximum results.
            </p>
            
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-10 pt-4">
               {[
                 { label: 'Analyze', sub: 'Your Data', icon: Search, color: 'bg-purple-500' },
                 { label: 'Recommend', sub: 'Best Protocol', icon: Target, color: 'bg-brand-orange' },
                 { label: 'Track', sub: 'Your Progress', icon: TrendingUp, color: 'bg-brand-blue' },
                 { label: 'Achieve', sub: 'Your Goals', icon: Trophy, color: 'bg-red-500' },
               ].map((step, i) => (
                 <div key={i} className="flex items-center gap-4 group">
                    <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                       <step.icon size={18} />
                    </div>
                    <div className="text-left">
                       <p className="text-[10px] font-black text-white uppercase leading-none mb-1">{step.label}</p>
                       <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{step.sub}</p>
                    </div>
                 </div>
               ))}
            </div>

            <button className="h-14 px-10 bg-brand-orange text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:brightness-110 transition-all shadow-orange-glow italic">
              Get My Protocol
            </button>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full max-w-sm hidden xl:block">
             <div className="relative group">
                <div className="absolute -inset-4 bg-brand-orange/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-auto rounded-[3rem] shadow-2xl border-4 border-white/5 rotate-6 group-hover:rotate-0 transition-transform duration-1000" 
                  alt="Protocol App" 
                />
             </div>
          </div>
        </div>
      </section>

      {/* ── 11. FULL HD VIDEO SHOWCASE ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative w-full rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-[0_0_120px_rgba(255,95,4,0.2)]"
          style={{ height: '720px' }}
        >
          {/* Full HD Video */}
          <video 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/100545-video-360.mp4" type="video/mp4" />
          </video>

          {/* Dark Cinematic Gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)', pointerEvents: 'none' }} />

          {/* Top Live Badge */}
          <div style={{ position: 'absolute', top: '2.5rem', left: '2.5rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.5rem', background: 'rgba(255,95,4,0.9)', backdropFilter: 'blur(12px)', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white', animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite' }} />
            <span style={{ color: 'white', fontSize: '10px', fontWeight: 900, letterSpacing: '0.3em', fontStyle: 'italic', textTransform: 'uppercase' }}>VITAMAX LIVE HD</span>
          </div>

          {/* Bottom Branding */}
          <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', zIndex: 10 }}>
            <p style={{ color: '#FF5F04', fontSize: '11px', fontWeight: 900, letterSpacing: '0.4em', fontStyle: 'italic', textTransform: 'uppercase', marginBottom: '1rem' }}>ELITE PERFORMANCE PROTOCOL</p>
            <h2 style={{ color: 'white', fontSize: '64px', fontWeight: 900, letterSpacing: '-2px', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 1, marginBottom: '1.5rem' }}>
              TRAIN LIKE<br /><span style={{ color: '#FF5F04' }}>A CHAMPION</span>
            </h2>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {[{ label: '50K+', sub: 'Athletes' }, { label: '97%', sub: 'Success Rate' }, { label: '6 Wks', sub: 'Avg. Transform' }].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <p style={{ color: 'white', fontSize: '28px', fontWeight: 900, fontStyle: 'italic', lineHeight: 1 }}>{stat.label}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '4px' }}>{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
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
