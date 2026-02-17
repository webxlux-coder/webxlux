import React from 'react';
import { getProjects } from '../constants';
import { useLanguage } from '../LanguageContext';

interface WorkSectionProps {
  onSelectProject: (id: number) => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const { language, t } = useLanguage();
  const projects = getProjects(language);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="work" className="py-32 px-6 md:px-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
          <div data-aos="fade-right">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tighter">{t.work.title}</h2>
            <p className="text-gray-500 max-w-md text-lg font-light leading-relaxed">
              {t.work.subtitle}
            </p>
          </div>
          <div className="h-[1px] bg-gray-200 flex-grow mx-12 hidden md:block" data-aos="fade-left" data-aos-delay="200"></div>
          {projects.length > 0 && (
            <span className="text-gray-400 font-mono text-sm tracking-widest" data-aos="fade-left">
              01 &mdash; {projects.length < 10 ? `0${projects.length}` : projects.length}
            </span>
          )}
        </div>

        {/* Strictly 2 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group text-left block relative focus:outline-none"
            >
              {/* Image Container with tight rounding and subtle shadow */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-200 shadow-sm transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:-translate-y-2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Visual overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
              </div>

              {/* Project Info - mt-8 for extra spacing from image */}
              <div className="mt-8 px-2">
                <div className="flex items-center justify-between mb-4">
                  {/* Larger, Bold Project Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Arrow Icon slides right when the card/image is hovered */}
                  <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm transition-all duration-500 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:translate-x-3">
                    <i className="fas fa-arrow-right text-gray-400 group-hover:text-white transition-all duration-300"></i>
                  </div>
                </div>

                {/* Category & Short Description */}
                <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">{project.category}</p>
                <p className="text-gray-500 text-lg leading-relaxed font-light line-clamp-2">
                  {project.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;