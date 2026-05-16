import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { 
  Activity, 
  Flame, 
  TrendingUp, 
  Dumbbell, 
  Zap, 
  ChevronRight, 
  Play,
  Search,
  Star,
  Clock,
  User,
  Medal,
  Heart
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BANNER_ADS = [
  {
    id: 1,
    title: 'AI MUSCLE BUILDER',
    subtitle: 'Smart workouts. Personalized nutrition. 6-week transformation program.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'Weeks', val: '6', icon: Activity },
      { label: 'Kcal/Day', val: '350-500', icon: Flame },
      { label: 'Level', val: 'Intermediate', icon: TrendingUp },
    ],
    features: [
      { title: 'AI Workouts', desc: 'Personalized', icon: Dumbbell },
      { title: 'Protein Plan', desc: 'Included', icon: Zap },
      { title: 'Track Progress', desc: 'In Real-Time', icon: Activity },
    ],
    ctaPrimary: 'Start Muscle Plan',
    ctaSecondary: 'Learn More',
    program: { 
      id: 1, 
      title: 'AI Muscle Builder', 
      category: 'MUSCLE GAIN', 
      rating: 4.8, 
      duration: '6 Weeks', 
      level: 'Intermediate', 
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800' 
    }
  },
  {
    id: 2,
    title: 'ELITE FAT BURN PROTOCOL',
    subtitle: 'Melt fat with smart intervals. Burn more in less time with AI.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'Weeks', val: '4', icon: Activity },
      { label: 'Kcal/Day', val: '400-600', icon: Flame },
      { label: 'Level', val: 'Beginner', icon: TrendingUp },
    ],
    features: [
      { title: 'HIIT Sync', desc: 'Adaptive Tempo', icon: Zap },
      { title: 'Macro Guard', desc: 'AI Tracking', icon: Activity },
      { title: 'Elite Recovery', desc: 'Active Rest', icon: Heart },
    ],
    ctaPrimary: 'Join Fat Burn',
    ctaSecondary: 'Learn More',
    program: { 
      id: 2, 
      title: 'Elite Fat Burn Protocol', 
      category: 'FAT BURN', 
      rating: 4.7, 
      duration: '4 Weeks', 
      level: 'Beginner', 
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' 
    }
  }
];

const BannerCarousel = ({ onProgramClick }) => {
  return (
    <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination-dots',
        }}
        navigation={{
          nextEl: '.swiper-button-next-hero',
          prevEl: '.swiper-button-prev-hero',
        }}
        className="h-[600px] md:h-[700px]"
      >
        {BANNER_ADS.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div className="relative w-full h-full flex flex-col md:flex-row items-center overflow-hidden">
               {/* Left Content Side */}
               <div className="flex-1 p-10 md:p-20 relative z-20 text-white space-y-10">
                  <div className="space-y-6">
                     <span className="bg-brand-blue px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest shadow-lg">AI POWERED</span>
                     <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] uppercase">
                        {ad.title.split(' ').slice(0, -1).join(' ')} <br /> 
                        <span className="text-brand-orange">{ad.title.split(' ').slice(-1)}</span>
                     </h2>
                     <p className="text-lg md:text-xl text-gray-300 font-medium max-w-lg leading-relaxed">
                        {ad.subtitle}
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {ad.features.map((f, i) => (
                       <div key={i} className="flex items-center gap-3 group/feat">
                          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-brand-orange group-hover/feat:scale-110 transition-transform">
                             <f.icon size={18} />
                          </div>
                          <div>
                             <p className="text-[11px] font-extrabold text-white">{f.title}</p>
                             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{f.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="flex flex-wrap gap-5 pt-4">
                     <button 
                       onClick={() => onProgramClick(ad.program)}
                       className="btn-primary !h-16 !px-10 group/btn !rounded-2xl"
                     >
                        {ad.ctaPrimary} <ChevronRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                     </button>
                     <button className="btn-outline !h-16 !px-10 flex items-center gap-3 !rounded-2xl">
                        {ad.ctaSecondary} <Play size={18} fill="currentColor" />
                     </button>
                  </div>
               </div>

               {/* Right Image Side */}
               <div className="relative w-full md:w-1/2 h-full">
                  <img 
                    src={ad.image} 
                    alt={ad.title} 
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-[2000ms]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />

                  {/* Stats Overlay on Image */}
                  <div className="absolute bottom-12 left-0 right-12 flex justify-end">
                     <div className="bg-brand-navy/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 flex items-center gap-12 shadow-2xl">
                        {ad.stats.map((s, i) => (
                          <div key={i} className="flex items-center gap-4 group/stat">
                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${i === 0 ? 'text-brand-blue bg-brand-blue/10' : i === 1 ? 'text-brand-orange bg-brand-orange/10' : 'text-brand-lime bg-brand-lime/10'} group-hover/stat:scale-110 transition-transform`}>
                                <s.icon size={26} strokeWidth={2.5} />
                             </div>
                             <div>
                                <div className="flex items-baseline gap-1">
                                   <span className="text-3xl font-black text-white italic tracking-tighter">{s.val}</span>
                                   {i === 2 && <span className="text-[10px] font-black text-gray-400 uppercase ml-1">Level</span>}
                                </div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                             </div>
                             {i < 2 && <div className="w-px h-10 bg-white/10 ml-8" />}
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <button className="swiper-button-prev-hero absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-brand-navy transition-all active:scale-90 shadow-2xl group/nav opacity-0 group-hover:opacity-100">
        <ChevronRight size={28} className="rotate-180 group-hover/nav:-translate-x-1 transition-transform" />
      </button>
      <button className="swiper-button-next-hero absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-brand-navy transition-all active:scale-90 shadow-2xl group/nav opacity-0 group-hover:opacity-100">
        <ChevronRight size={28} className="group-hover/nav:translate-x-1 transition-transform" />
      </button>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination-dots absolute bottom-12 left-20 z-30 flex gap-3" />

      {/* Custom Pagination Style */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-pagination-dots .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4) !important;
          width: 12px;
          height: 12px;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-pagination-dots .swiper-pagination-bullet-active {
          background: #FF5F04 !important;
          width: 40px;
          border-radius: 6px;
        }
      `}} />
    </div>
  );
};

export default BannerCarousel;
