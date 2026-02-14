import React, { useState } from 'react';
import { getFaqData } from '../constants';
import { useLanguage } from '../LanguageContext';

const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border-b border-gray-200 py-6 last:border-0"
      data-aos="fade-right"
      data-aos-delay={index * 50}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group focus:outline-none"
      >
        <span className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-800'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 border-blue-600 rotate-180' : 'group-hover:border-gray-900'}`}>
          <i className={`fas fa-chevron-down text-xs transition-colors ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`}></i>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-500 text-lg leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const { language, t } = useLanguage();
  const faqData = getFaqData(language);

  return (
    <section id="faq" className="py-24 px-6 md:px-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center" data-aos="fade-up">{t.faq.title}</h2>
        <div className="space-y-2">
          {faqData.map((item, index) => (
            <FAQItem key={index} index={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;