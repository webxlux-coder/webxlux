import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useProcessSteps } from '../hooks/useSupabaseData';

const ProcessSection: React.FC = () => {
  const { t } = useLanguage();
  const steps = useProcessSteps();

  return (
    <section id="process" className="py-32 px-6 md:px-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5" data-aos="fade-right">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tighter leading-tight whitespace-pre-line">
              {t.process.title}
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
              {t.process.subtitle}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-12">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-8 pb-12 border-b border-gray-200 last:border-0 last:pb-0"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <span className="text-6xl font-black text-blue-100 font-poppins">{step.number}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-500 font-light leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;