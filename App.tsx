import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkSection from './components/WorkSection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import PortfolioGallery from './components/PortfolioGallery';
import { useLanguage } from './LanguageContext';

// Declare globals for TypeScript
declare var AOS: any;
declare var gsap: any;
declare var ScrollTrigger: any;

const ScrollProgress: React.FC = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollValue = (totalScroll / windowHeight) * 100;
      setScroll(scrollValue);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60]">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-100 ease-out"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
};

const ScrollQuote: React.FC = () => {
  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(".quote", {
        scrollTrigger: {
          trigger: ".wrap",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <div className="wrap">
      <div className="quote font-poppins">
        Digital Experiences <br /> Built for Impact.
      </div>
    </div>
  );
};

const WormScrollEffect: React.FC = () => {
  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          scrub: 1,
          trigger: ".scroll-trigger-ready__worm-wrap",
          start: "top 90%",
          end: "bottom 30%",
        },
      });

      tl.to(".worm-path", {
        strokeDashoffset: 0,
        ease: "none"
      });
    }
  }, []);

  return (
    <div className="scroll-trigger-ready__worm-wrap absolute left-0 right-0 w-full pointer-events-none z-0 overflow-hidden" style={{ height: '150%' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 2000"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-20"
      >
        <path
          className="worm-path"
          d="M1441 0.5C1441 0.5 1200 150 1100 400C1000 650 1300 850 1000 1100C700 1350 200 1400 100 1700C0 2000 -50 2200 -50 2200"
          stroke="url(#worm_gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="worm_gradient" x1="1441" y1="0.5" x2="100" y2="1700" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const InfiniteMarquee: React.FC = () => {
  const { t } = useLanguage();
  const items = t.marquee;

  return (
    <div className="py-12 border-y border-gray-100 bg-white overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex items-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-4xl md:text-6xl font-bold text-gray-900 mx-8 tracking-tight uppercase font-poppins">
                  {item}
                </span>
                <span className="text-4xl md:text-6xl text-outline mx-8 font-bold font-poppins">
                  &bull;
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 left-8 z-50 w-12 h-12 bg-white text-gray-900 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border border-gray-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      aria-label="Back to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'project' | 'portfolio'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
      });
    }
  }, [view]);

  const handleSelectProject = (id: number) => {
    setSelectedProjectId(id);
    setView('project');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedProjectId(null);
    window.scrollTo(0, 0);
  };

  const handleOpenPortfolio = () => {
    setView('portfolio');
    window.scrollTo(0, 0);
  };

  const handleNavigateContact = () => {
    setView('home');
    setSelectedProjectId(null);
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateFAQ = () => {
    setView('home');
    setSelectedProjectId(null);
    setTimeout(() => {
      const el = document.getElementById('faq');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative antialiased">
      <ScrollProgress />
      <BackToTop />

      <Navbar
        onNavigateHome={handleBackToHome}
        onNavigateWork={handleOpenPortfolio}
        onNavigateContact={handleNavigateContact}
        onNavigateFAQ={handleNavigateFAQ}
      />

      {view === 'home' && (
        <main className="relative">
          <Hero
            onViewWork={handleOpenPortfolio}
            onContactClick={handleNavigateContact}
          />
          <InfiniteMarquee />

          <ScrollQuote />

          <div className="relative">
            <WormScrollEffect />
            <ServicesSection />
            <WorkSection onSelectProject={handleSelectProject} />
            <ProcessSection />
          </div>

          <FAQSection />
          <ContactSection />
          <Footer />
        </main>
      )}

      {view === 'portfolio' && (
        <PortfolioGallery onSelectProject={handleSelectProject} />
      )}

      {view === 'project' && selectedProjectId !== null && (
        <ProjectDetail
          projectId={selectedProjectId}
          onBack={handleBackToHome}
          onNavigate={handleSelectProject}
        />
      )}
    </div>
  );
};

export default App;