import React from 'react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-6 md:px-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-gray-400">
        <p className="font-medium">&copy; {new Date().getFullYear()} WebXlux. {t.footer.rights}</p>
      </div>
    </div>
    </footer >
  );
};

export default Footer;