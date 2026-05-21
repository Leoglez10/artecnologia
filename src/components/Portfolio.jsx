import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';

const stats = [
  { number: '45', label: 'Clientes Activos', color: 'text-accent-error' },
  { number: '130+', label: 'Proyectos Entregados', color: 'text-[#22c55e]' },
  { number: '10', label: 'Años Trabajando', color: 'text-primary dark:text-secondary-container' }
];

const brandColors = [
  { hex: '#10b981', text: 'text-emerald-400', shadow: 'shadow-emerald-500/20', bgGlow: 'bg-emerald-500/10' }, // Dental - Emerald
  { hex: '#3b82f6', text: 'text-blue-400', shadow: 'shadow-blue-500/20', bgGlow: 'bg-blue-500/10' },    // Jurídico - Blue
  { hex: '#f59e0b', text: 'text-amber-400', shadow: 'shadow-amber-500/20', bgGlow: 'bg-amber-500/10' },  // Sabor - Amber
  { hex: '#8b5cf6', text: 'text-purple-400', shadow: 'shadow-purple-500/20', bgGlow: 'bg-purple-500/10' }  // Boutique - Purple
];

export default function Portfolio({ onViewAll }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const dialogRef = useRef(null);
  const containerRef = useRef(null);

  // Drag and Swipe Gesture States
  const dragStartX = useRef(null);
  const dragEndX = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Filter only the main featured projects for the landing page grid
  const featuredProjects = projects.filter(pkg => pkg.featured);

  // Detect viewport size for mobile layouts
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const animateOnScroll = (targets, fromVars, triggerEl) => {
      const elements = container.querySelectorAll(targets);
      if (!elements.length) return;

      gsap.set(elements, { willChange: 'transform, opacity' });

      gsap.fromTo(elements, 
        { ...fromVars, immediateRender: false },
        {
          y: 0, x: 0, opacity: 1, scale: 1, rotation: 0,
          duration: fromVars.duration || 0.8,
          stagger: fromVars.stagger || 0,
          ease: fromVars.ease || 'power3.out',
          scrollTrigger: {
            trigger: container.querySelector(triggerEl) || elements[0],
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
          onComplete: () => gsap.set(elements, { clearProps: 'willChange' }),
        }
      );
    };

    // 1. Staggered reveal for header items
    animateOnScroll('.portfolio-header-item', { y: 30, opacity: 0, stagger: 0.15, ease: 'power3.out' }, '.portfolio-header-item');

    // 2. Stats slide up staggered
    animateOnScroll('.stat-item', { y: 40, opacity: 0, stagger: 0.15, ease: 'power2.out' }, '.stats-container');

    // 3. Carousel container reveal
    animateOnScroll('.portfolio-carousel-reveal', { y: 50, opacity: 0, scale: 0.97, duration: 0.9, ease: 'power3.out' }, '.portfolio-carousel-reveal');
  }, { scope: containerRef });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedProject || !dialog || dialog.open) return;

    dialog.showModal();
  }, [selectedProject]);

  const closeProjectDialog = () => setSelectedProject(null);

  // Circular index helpers
  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const getOffset = (idx) => {
    let diff = idx - activeIndex;
    const half = Math.floor(featuredProjects.length / 2);
    while (diff > half) diff -= featuredProjects.length;
    while (diff < -half) diff += featuredProjects.length;
    return diff;
  };

  // Drag handlers for Swipe Gestures
  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    dragEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (dragStartX.current === null || dragEndX.current === null) return;
    const diff = dragStartX.current - dragEndX.current;
    if (Math.abs(diff) > 55) {
      if (diff > 0) nextCard();
      else prevCard();
    }
    dragStartX.current = null;
    dragEndX.current = null;
  };

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    dragEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragStartX.current === null || dragEndX.current === null) return;
    const diff = dragStartX.current - dragEndX.current;
    if (Math.abs(diff) > 55) {
      if (diff > 0) nextCard();
      else prevCard();
    }
    dragStartX.current = null;
    dragEndX.current = null;
  };

  return (
    <section 
      ref={containerRef}
      id="portafolio" 
      aria-labelledby="portfolio-title"
      className="py-28 bg-surface-bg dark:bg-slate-950 text-on-surface dark:text-white transition-colors duration-300 overflow-hidden relative"
    >
      {/* Background design elements */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary-container/5 rounded-full blur-3xl pointer-events-none select-none" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 id="portfolio-title" className="portfolio-header-item font-headline-lg text-headline-lg text-on-surface dark:text-white mb-4 tracking-tight font-extrabold">
            PORTAFOLIO DE TRABAJO
          </h2>
          <div className="portfolio-header-item h-1.5 w-24 bg-primary dark:bg-secondary-container mx-auto rounded-full mb-6" />
          <p className="portfolio-header-item font-body-lg text-body-lg text-text-muted dark:text-slate-300">
            Agradecemos a nuestros clientes por su valiosa confianza e impulsamos juntos su crecimiento.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-container grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20 dark:divide-slate-700/50">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center py-4">
              <div className={`font-display-lg text-5xl font-extrabold mb-1 tracking-tight ${stat.color}`}>
                {stat.number}
              </div>
              <div className="font-label-md text-xs text-on-surface-variant dark:text-slate-300 font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 3D Perspective Interactive Carousel */}
        <div className="portfolio-carousel-reveal relative max-w-5xl mx-auto h-[380px] sm:h-[450px] flex items-center justify-center mb-10 select-none overflow-visible">
          
          {/* Navigation Arrows (Glassmorphic) */}
          <button
            onClick={prevCard}
            className="absolute left-2 sm:left-4 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/40 hover:bg-slate-900/60 dark:bg-white/5 dark:hover:bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg active:scale-95 cursor-pointer"
            aria-label="Proyecto Anterior"
          >
            <span className="material-symbols-outlined text-2xl font-bold">chevron_left</span>
          </button>

          <button
            onClick={nextCard}
            className="absolute right-2 sm:right-4 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/40 hover:bg-slate-900/60 dark:bg-white/5 dark:hover:bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg active:scale-95 cursor-pointer"
            aria-label="Siguiente Proyecto"
          >
            <span className="material-symbols-outlined text-2xl font-bold">chevron_right</span>
          </button>

          {/* Carousel Drag/Swipe Area */}
          <div 
            className="w-full h-full relative flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {featuredProjects.map((project, index) => {
              const diff = getOffset(index);
              const isActive = diff === 0;
              const isRight = diff === 1;
              const isLeft = diff === -1;
              const isHidden = !isActive && !isRight && !isLeft;
              const colorTheme = brandColors[index % brandColors.length];

              // Calculate positions and perspectives
              let transformStyle = '';
              let opacityStyle = 0;
              let zIndexStyle = 10;
              let blurStyle = 'blur(0px)';

              if (isMobile) {
                // Mobile Perspective Styles (clean peek values)
                if (isActive) {
                  transformStyle = 'translateX(0) scale(1) rotateY(0deg)';
                  opacityStyle = 1;
                  zIndexStyle = 30;
                } else if (isRight) {
                  transformStyle = 'translateX(88%) scale(0.85) rotateY(-8deg)';
                  opacityStyle = 0.25;
                  zIndexStyle = 20;
                  blurStyle = 'blur(2px)';
                } else if (isLeft) {
                  transformStyle = 'translateX(-88%) scale(0.85) rotateY(8deg)';
                  opacityStyle = 0.25;
                  zIndexStyle = 20;
                  blurStyle = 'blur(2px)';
                } else {
                  transformStyle = 'translateX(0) scale(0.7)';
                  opacityStyle = 0;
                  zIndexStyle = 10;
                }
              } else {
                // Desktop Perspective Styles (cinematic 3D)
                if (isActive) {
                  transformStyle = 'translateX(0) scale(1) rotateY(0deg) translateZ(0px)';
                  opacityStyle = 1;
                  zIndexStyle = 30;
                } else if (isRight) {
                  transformStyle = 'translateX(58%) scale(0.88) rotateY(-15deg) translateZ(-40px)';
                  opacityStyle = 0.45;
                  zIndexStyle = 20;
                  blurStyle = 'blur(1.5px)';
                } else if (isLeft) {
                  transformStyle = 'translateX(-58%) scale(0.88) rotateY(15deg) translateZ(-40px)';
                  opacityStyle = 0.45;
                  zIndexStyle = 20;
                  blurStyle = 'blur(1.5px)';
                } else {
                  transformStyle = 'translateX(0) scale(0.7) translateZ(-100px)';
                  opacityStyle = 0;
                  zIndexStyle = 10;
                  blurStyle = 'blur(4px)';
                }
              }

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (isActive) {
                      setSelectedProject(project);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  className={`absolute w-[280px] sm:w-[380px] md:w-[440px] transition-all duration-500 ease-out rounded-3xl overflow-hidden shadow-2xl border bg-white dark:bg-slate-900 select-none ${
                    isActive 
                      ? `border-slate-300 dark:border-white/20 shadow-[0_15px_45px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_40px_rgba(255,255,255,0.03)]` 
                      : 'border-slate-200 dark:border-white/5 opacity-50'
                  }`}
                  style={{
                    transform: transformStyle,
                    opacity: opacityStyle,
                    zIndex: zIndexStyle,
                    filter: blurStyle,
                    pointerEvents: isHidden ? 'none' : 'auto',
                    perspective: '1000px',
                    borderColor: isActive ? colorTheme.hex : '',
                    boxShadow: isActive ? `0 10px 30px ${colorTheme.hex}15` : ''
                  }}
                >
                  {/* Card Media Container */}
                  <div className="overflow-hidden aspect-video relative pointer-events-none">
                    <img 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500" 
                      src={project.image}
                      width="640"
                      height="360"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Glowing Overlay on Hover/Active */}
                    <div className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
                      isActive ? 'bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent' : 'bg-black/40'
                    }`}>
                      {isActive && (
                        <div className="absolute inset-0 bg-primary/20 dark:bg-slate-950/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-auto">
                          <span className="material-symbols-outlined text-white text-4xl mb-1 select-none" aria-hidden="true">visibility</span>
                          <p className="text-white font-bold text-xs tracking-widest uppercase">Ver Detalles</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Copy Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wider ${colorTheme.text}`}>
                        {project.category}
                      </span>
                      {isActive && (
                        <span className={`w-2.5 h-2.5 rounded-full animate-pulse`} style={{ backgroundColor: colorTheme.hex }} />
                      )}
                    </div>
                    <h4 className="font-bold text-on-surface dark:text-white text-lg sm:text-xl mt-1 tracking-tight">
                      {project.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Progress Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mb-14">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === index 
                  ? 'w-7' 
                  : 'bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
              }`}
              style={{
                backgroundColor: activeIndex === index ? brandColors[index % brandColors.length].hex : ''
              }}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>

        {/* View Full Portfolio Button */}
        <div className="text-center">
          <button 
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-primary dark:text-secondary-container font-bold hover:bg-primary/5 dark:hover:bg-slate-800 px-8 py-3.5 rounded-full transition-all duration-300 border border-primary/20 hover:scale-105"
          >
            VER PORTAFOLIO COMPLETO ({projects.length} PROYECTOS)
            <span className="material-symbols-outlined font-bold" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Project Details Modal (Glassmorphism) */}
      {selectedProject && (
        <dialog
          ref={dialogRef}
          className="modal-dialog p-0 bg-transparent backdrop:bg-black/60"
          aria-labelledby="project-title"
          onCancel={closeProjectDialog}
          onClose={closeProjectDialog}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeProjectDialog();
          }}
        >
          {/* Modal Container */}
          <div className="relative glass-card text-on-surface dark:text-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl z-50 animate-fade-in-up">
            {/* Top Bar / Close */}
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/10 dark:border-slate-700/50">
              <div>
                <span className="text-xs font-bold text-primary dark:text-secondary-container uppercase tracking-wider">{selectedProject.category}</span>
                <h3 id="project-title" className="font-bold text-2xl tracking-tight mt-0.5">{selectedProject.title}</h3>
              </div>
              <button 
                onClick={closeProjectDialog}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Image Preview */}
              <div className="rounded-2xl overflow-hidden aspect-video shadow-md border border-outline-variant/10 dark:border-slate-700/30 mb-6">
                <img 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover" 
                  src={selectedProject.image}
                  width="960"
                  height="540"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Description */}
              <h4 className="font-bold text-lg mb-2">Sobre el Proyecto</h4>
              <p className="text-text-muted dark:text-slate-300 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Tech Stack */}
              <h4 className="font-bold text-lg mb-3">Tecnologías Utilizadas</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techs.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-1.5 rounded-full bg-primary/10 dark:bg-secondary-container/10 text-primary dark:text-secondary-container text-xs font-bold uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-outline-variant/10 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30 flex justify-end">
              <a 
                href="#paquetes"
                onClick={closeProjectDialog}
                className="bg-primary hover:bg-primary-container dark:bg-secondary-container dark:text-slate-900 text-on-primary font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-102 shadow-md text-center"
              >
                Conoce Nuestros Planes
              </a>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
