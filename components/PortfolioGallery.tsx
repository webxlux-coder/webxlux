import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useProjects } from '../hooks/useSupabaseData';

interface PortfolioGalleryProps {
  onSelectProject: (id: number) => void;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onSelectProject }) => {
  const { t } = useLanguage();
  const projects = useProjects();

  return (
    <section className="bg-white min-h-screen pt-40 pb-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20" data-aos="fade-up">
          <h2 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6">Works</h2>
          <p className="text-xl text-gray-500 max-w-xl font-light">
            {t.work.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-gray-100 aspect-[4/3] shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                <img
                  src={project.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white px-8 py-4 rounded-full text-gray-900 font-bold shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform">
                    {t.work.viewCaseStudy}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">{project.category}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all">
                  <i className="fas fa-arrow-right text-gray-400 group-hover:text-white transition-colors"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;