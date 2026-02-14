import React from 'react';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onViewWork: () => void;
  onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewWork, onContactClick }) => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 md:px-24 bg-white overflow-hidden pt-20">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#a855f7] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"
          style={{ animationDuration: '8s' }}
        ></div>
        <div 
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-[#3b82f6] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"
          style={{ animationDuration: '12s' }}
        ></div>
        <div 
          className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-[#a855f7] rounded-full mix-blend-multiply filter blur-[120px] opacity-5 animate-pulse"
          style={{ animationDuration: '10s' }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Main Content */}
        <div className="max-w-5xl">
          <h1 
            className="text-6xl md:text-8xl lg:text-[9.5rem] font-bold text-gray-900 leading-[1.1] mb-16 tracking-tighter"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t.hero.title}
          </h1>
          <p 
            className="text-xl md:text-3xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light mb-16"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t.hero.subtitle}
          </p>
          <div 
            className="flex flex-wrap justify-center gap-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <button
              onClick={onContactClick}
              className="px-12 py-6 border-2 border-gray-900 text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300"
            >
              {t.hero.contactUs}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="sp">{t.hero.scroll}</div>
    </section>
  );
};

export default Hero;