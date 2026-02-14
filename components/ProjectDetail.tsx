import React, { useEffect, useState, useCallback } from 'react';
import { getProjects } from '../constants';
import { useLanguage } from '../LanguageContext';

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
  onNavigate: (id: number) => void;
}

const Lightbox: React.FC<{ 
  images: string[]; 
  initialIndex: number; 
  onClose: () => void 
}> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, handleNext, handlePrev]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white text-3xl transition-colors z-[110]"
      >
        <i className="fas fa-times"></i>
      </button>

      <button 
        onClick={handlePrev}
        className="absolute left-4 md:left-8 text-white/30 hover:text-white text-4xl transition-all p-4 z-[110]"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <div className="w-full h-full p-4 md:p-20 flex items-center justify-center select-none">
        <img 
          key={currentIndex}
          src={images[currentIndex]} 
          alt={`Gallery item ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain shadow-2xl animate-zoom-in"
        />
      </div>

      <button 
        onClick={handleNext}
        className="absolute right-4 md:right-8 text-white/30 hover:text-white text-4xl transition-all p-4 z-[110]"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, onNavigate }) => {
  const { language, t } = useLanguage();
  const projects = getProjects(language);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const project = projects.find(p => p.id === projectId);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsExiting(false);
  }, [projectId]);

  const handleNavigateWithTransition = (id: number) => {
    setIsExiting(true);
    setTimeout(() => {
      onNavigate(id);
    }, 500); // Wait for the fade-out animation to complete
  };

  const handleBackWithTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      onBack();
    }, 500);
  };

  if (!project) return null;

  const nextId = projectId === projects.length ? 1 : projectId + 1;
  const nextProject = projects.find(p => p.id === nextId);

  // Combine main image and gallery for the full showcase experience
  const allImages = [project.image, ...project.gallery];

  return (
    <div key={projectId} className={`bg-white min-h-screen relative ${isExiting ? 'animate-fade-out' : 'animate-fade-in'}`}>
      
      {/* Header */}
      <header className="pt-40 pb-20 px-6 md:px-24 max-w-7xl mx-auto">
        <button 
          onClick={handleBackWithTransition}
          className="inline-flex items-center text-gray-400 hover:text-gray-900 transition-colors mb-12 group"
        >
          <i className="fas fa-arrow-left mr-2 transition-transform group-hover:-translate-x-1"></i>
          <span className="font-medium">{t.project.back}</span>
        </button>
        
        <div data-aos="fade-up" className="max-w-5xl">
          <p className="text-blue-600 font-bold tracking-widest uppercase mb-6 text-sm md:text-base">{project.category}</p>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-gray-900 mb-8 leading-[0.9]">{project.title}</h1>
          <p className="text-xl md:text-3xl text-gray-500 font-light max-w-3xl leading-relaxed">
             {project.description}
          </p>
        </div>
      </header>

      {/* Immersive Gallery Section */}
      <section className="px-4 md:px-12 pb-40">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Main Hero Image - Reduced height & container width */}
          {allImages[0] && (
            <div 
              onClick={() => setSelectedImageIndex(0)}
              className="relative w-full h-[35vh] md:h-[55vh] rounded-[2rem] overflow-hidden shadow-xl cursor-zoom-in group"
              data-aos="zoom-in"
              data-aos-duration="1200"
            >
              <img 
                src={allImages[0]} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                alt={`${project.title} Main View`} 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          )}

          {/* Grid Layout for Secondary Images - Reduced gap and adjusted aspect ratio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {allImages[1] && (
               <div 
                 onClick={() => setSelectedImageIndex(1)}
                 className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg cursor-zoom-in group md:mt-8" 
                 data-aos="fade-up"
               >
                 <img 
                   src={allImages[1]} 
                   className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                   alt={`${project.title} Detail 1`} 
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
               </div>
            )}

            {allImages[2] && (
               <div 
                 onClick={() => setSelectedImageIndex(2)}
                 className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg cursor-zoom-in group"
                 data-aos="fade-up"
                 data-aos-delay="200"
               >
                 <img 
                   src={allImages[2]} 
                   className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                   alt={`${project.title} Detail 2`} 
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
               </div>
            )}
          </div>

           {/* Full Width Landscape Image - Reduced height */}
           {allImages[3] && (
            <div 
              onClick={() => setSelectedImageIndex(3)}
              className="relative w-full h-[30vh] md:h-[45vh] rounded-[2rem] overflow-hidden shadow-xl cursor-zoom-in group"
              data-aos="fade-up"
            >
              <img 
                src={allImages[3]} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                alt={`${project.title} Detail 3`} 
              />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          )}
        </div>
      </section>

      {/* Next Project CTA */}
      {nextProject && (
        <section className="py-40 px-6 md:px-24 border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <button 
              onClick={() => handleNavigateWithTransition(nextId)}
              className="group block w-full text-center"
            >
              <span className="text-gray-400 uppercase tracking-widest font-semibold mb-8 block">{t.work.exploreNext}</span>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold transition-all duration-700 group-hover:text-blue-600 group-hover:scale-105">
                {nextProject.title}
                <i className="fas fa-arrow-right text-gray-200 ml-8 group-hover:text-blue-600 transition-colors"></i>
              </h2>
            </button>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <Lightbox 
          images={allImages} 
          initialIndex={selectedImageIndex} 
          onClose={() => setSelectedImageIndex(null)} 
        />
      )}

      <footer className="py-12 border-t border-gray-100 text-center text-gray-400 bg-white">
        <p>&copy; 2024 WebXlux Case Studies. {t.footer.rights}</p>
      </footer>
    </div>
  );
};

export default ProjectDetail;