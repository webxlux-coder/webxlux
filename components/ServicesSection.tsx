import React from 'react';
import { useLanguage } from '../LanguageContext';

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-32 px-6 md:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tighter">{t.services.title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.services.items.map((service, idx) => (
            <div 
              key={idx}
              className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-500 group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-gray-800">
                <i className={`fas ${service.icon} text-2xl text-blue-600`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-500 group-hover:text-gray-400 font-light leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;