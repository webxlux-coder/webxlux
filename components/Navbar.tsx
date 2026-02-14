import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateWork: () => void;
  onNavigateContact: () => void;
  onNavigateFAQ: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigateHome, 
  onNavigateWork, 
  onNavigateContact,
  onNavigateFAQ 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateHome();
    closeMenu();
  };

  const handleSectionClick = (id: string) => {
    closeMenu();
    onNavigateHome();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateContact();
    closeMenu();
  };

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateFAQ();
    closeMenu();
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <>
      {/* Branding Logo */}
      <div className="fixed top-8 left-8 z-50 flex items-center gap-4">
        <button 
          onClick={handleHomeClick}
          className="text-2xl font-bold tracking-tighter text-gray-900 font-poppins px-6 py-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg"
        >
          WebXlux<span className="text-blue-600">.</span>
        </button>
        
        <button 
          onClick={toggleLanguage}
          className="text-sm font-bold tracking-wider text-gray-900 font-poppins px-4 py-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-gray-100 transition-colors uppercase"
        >
          {language === 'en' ? 'FR' : 'EN'}
        </button>
      </div>

      {/* Hamburger Toggle */}
      <button
        onClick={toggleMenu}
        className="fixed top-8 right-8 z-50 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group focus:outline-none"
        aria-label="Toggle Menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between overflow-hidden">
          <span className={`w-full h-0.5 bg-gray-900 transition-transform duration-300 ${isOpen ? 'translate-y-2.5 rotate-45' : ''}`}></span>
          <span className={`w-full h-0.5 bg-gray-900 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-full h-0.5 bg-gray-900 transition-transform duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
        </div>
      </button>

      {/* Full-screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-700 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center space-y-6 md:space-y-8 overflow-y-auto pt-24">
          <button
            onClick={handleHomeClick}
            className="text-4xl md:text-6xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 font-poppins"
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleSectionClick('services')}
            className="text-4xl md:text-6xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 font-poppins"
          >
            {t.nav.services}
          </button>
          <button
            onClick={() => handleSectionClick('process')}
            className="text-4xl md:text-6xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 font-poppins"
          >
            {t.nav.process}
          </button>
          <button
            onClick={handleFAQClick}
            className="text-4xl md:text-6xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 font-poppins"
          >
            {t.nav.faq}
          </button>
          <button
            onClick={handleContactClick}
            className="text-4xl md:text-6xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 font-poppins"
          >
            {t.nav.contact}
          </button>
          
          <div className="flex space-x-6 pt-12 pb-12">
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><i className="fab fa-twitter text-xl"></i></a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><i className="fab fa-dribbble text-xl"></i></a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><i className="fab fa-linkedin-in text-xl"></i></a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;