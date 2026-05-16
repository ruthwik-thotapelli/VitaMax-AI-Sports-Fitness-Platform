import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import ProgramCard from './ProgramCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const ProgramRow = ({ title, programs, onProgramClick }) => {
  return (
    <div className="space-y-8 py-8">
      <div className="flex justify-between items-end px-4">
        <h2 className="text-3xl font-black italic tracking-tighter text-brand-navy uppercase leading-none">
          {title}
        </h2>
        <button className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-brand-orange transition-colors">
          View All Intelligence
        </button>
      </div>

      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={30}
        slidesPerView="auto"
        freeMode={true}
        navigation={true}
        className="program-swiper !px-4 !overflow-visible"
      >
        {programs.map((program) => (
          <SwiperSlide key={program.id} className="!w-auto">
            <ProgramCard program={program} onClick={onProgramClick} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        .program-swiper .swiper-button-next,
        .program-swiper .swiper-button-prev {
          color: #FF5F04;
          background: rgba(255, 255, 255, 0.9);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
        }
        .program-swiper .swiper-button-next:after,
        .program-swiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .program-swiper .swiper-button-disabled {
          opacity: 0;
          pointer-events: none;
        }
      `}} />
    </div>
  );
};

export default ProgramRow;
