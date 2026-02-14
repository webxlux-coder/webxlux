import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      
      // Reset after some time
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  const inputClasses = "w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-black transition-all outline-none text-gray-900 font-medium placeholder-gray-400 shadow-sm";

  return (
    <section id="contact" className="py-24 px-6 md:px-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8" data-aos="fade-up">
            {t.contact.title}
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-md" data-aos="fade-up" data-aos-delay="100">
            {t.contact.subtitle}
          </p>
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <i className="fas fa-envelope text-gray-900"></i>
              </div>
              <span className="text-gray-700 font-medium">webxlux@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <i className="fas fa-map-marker-alt text-gray-900"></i>
              </div>
              <span className="text-gray-700 font-medium">Remote Worldwide</span>
            </div>
          </div>
        </div>

        <div className="relative" data-aos="zoom-in" data-aos-delay="300">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
            {isSent ? (
              <div className="py-20 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.contact.sentTitle}</h3>
                <p className="text-gray-500">{t.contact.sentDesc}</p>
                <button 
                  onClick={() => setIsSent(false)}
                  className="mt-8 text-blue-600 font-semibold hover:underline"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{t.contact.name}</label>
                    <input
                      required
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{t.contact.email}</label>
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{t.contact.message}</label>
                  <textarea
                    required
                    id="message"
                    rows={4}
                    placeholder="How can I help you?"
                    className={`${inputClasses} resize-none`}
                  ></textarea>
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={`w-full md:w-auto px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-3 group ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      <span>{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.contact.send}</span>
                      <i className="fas fa-paper-plane text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;