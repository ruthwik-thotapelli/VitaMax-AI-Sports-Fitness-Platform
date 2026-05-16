import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Utensils, 
  Target, 
  Play, 
  Activity, 
  Flame, 
  TrendingUp
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const IconMap = {
  Zap, Utensils, Target, Flame, Activity, TrendingUp
};

// Image 1 style: Full-width cinematic hero with left text + right image + stats box
const HeroSlider = ({ banners, onProgramClick }) => {
  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border border-gray-100 bg-[#0f1923]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        watchSlidesProgress={true}
        speed={1000}
        navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
        pagination={{ clickable: true, el: '.hero-pagination' }}
        autoplay={{ delay: 6000 }}
        loop={true}
        className="h-[500px] md:h-[620px] w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="bg-[#0b111b]">
            <div className="relative w-full h-full flex items-center">
              {/* Full-bleed image with proper masking */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={banner.image} 
                  className="w-full h-full object-cover object-[center_20%] opacity-80"
                  alt={banner.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b111b] via-[#0b111b]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b111b]/50 to-transparent" />
              </div>

              {/* LEFT: Text Content */}
              <div className="relative z-10 px-12 md:px-20 max-w-3xl space-y-7">
                <span 
                  className="inline-block px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-white"
                  style={{ backgroundColor: banner.color }}
                >
                  {banner.subtitle}
                </span>
                
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
                  {banner.title.split(' ').slice(0, -1).join(' ')} <br/>
                  <span style={{ color: banner.color }} className="italic">
                    {banner.title.split(' ').slice(-1)[0]}
                  </span>
                </h1>

                <p className="text-gray-300 text-base md:text-lg font-medium max-w-lg leading-relaxed">
                  {banner.description}
                </p>

                {/* Feature bullets row */}
                {banner.features && (
                  <div className="flex flex-wrap items-center gap-8">
                    {banner.features.map((f, i) => {
                      const Icon = IconMap[f.icon] || Zap;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center" style={{ color: banner.color }}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-white uppercase leading-none">{f.label}</p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">{f.sub}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex items-center gap-4 pt-2">
                  <button 
                    onClick={() => onProgramClick(banner)}
                    style={{ backgroundColor: banner.color }}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] text-white hover:brightness-110 transition-all active:scale-95 shadow-xl"
                  >
                    {banner.cta} <ChevronRight size={18} />
                  </button>
                  <button className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all backdrop-blur-xl">
                    Learn More <Play size={16} className="fill-white" />
                  </button>
                </div>
              </div>

              {/* BOTTOM-RIGHT: Stats Box */}
              <div className="absolute right-16 bottom-12 hidden xl:flex items-stretch gap-0 bg-black/30 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-8 py-5 text-center border-r border-white/10">
                  <p className="text-2xl font-black text-white italic leading-none mb-1">{banner.stats?.weeks || '6-8'}</p>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Weeks</p>
                </div>
                <div className="px-8 py-5 text-center border-r border-white/10 flex flex-col items-center">
                  <Flame size={18} className="text-brand-orange mb-1" />
                  <p className="text-2xl font-black text-brand-orange italic leading-none mb-1">{banner.stats?.kcal || '350-500'}</p>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Kcal/Day</p>
                </div>
                <div className="px-8 py-5 text-center flex flex-col items-center">
                  <TrendingUp size={18} className="text-green-400 mb-1" />
                  <p className="text-[13px] font-black text-white uppercase leading-none mb-1">{banner.stats?.level || 'Intermediate'}</p>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Level</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}
      <button className="hero-prev absolute left-5 top-1/2 -translate-y-1/2 z-50 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-xl">
        <ChevronLeft size={22} />
      </button>
      <button className="hero-next absolute right-5 top-1/2 -translate-y-1/2 z-50 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-xl">
        <ChevronRight size={22} />
      </button>

      <div className="hero-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2" />

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-pagination .swiper-pagination-bullet { background: rgba(255,255,255,0.25); opacity: 1; width: 10px; height: 10px; transition: all 0.3s; }
        .hero-pagination .swiper-pagination-bullet-active { width: 32px; border-radius: 5px; }
      ` }} />
    </div>
  );
};

export default HeroSlider;
