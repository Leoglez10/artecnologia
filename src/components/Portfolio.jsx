import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';

const stats = [
  { number: '45', label: 'Clientes Activos', color: 'text-accent-error' },
  { number: '130+', label: 'Proyectos Entregados', color: 'text-[#22c55e]' },
  { number: '10', label: 'Años Trabajando', color: 'text-primary dark:text-secondary-container' }
];

export default function Portfolio({ onViewAll }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);
  const containerRef = useRef(null);

  // Filter only the main featured projects for the landing page grid
  const featuredProjects = projects.filter(pkg => pkg.featured);

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

    // 3. Featured projects stagger scale
    animateOnScroll('.portfolio-card', { y: 50, opacity: 0, scale: 0.95, duration: 0.9, stagger: 0.15, ease: 'back.out(1.15)' }, '.portfolio-grid');
  }, { scope: containerRef });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedProject || !dialog || dialog.open) return;

    dialog.showModal();
  }, [selectedProject]);

  const closeProjectDialog = () => setSelectedProject(null);

  return (
    <section 
      ref={containerRef}
      id="portafolio" 
      aria-labelledby="portfolio-title"
      className="py-28 bg-surface-bg dark:bg-slate-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 id="portfolio-title" className="portfolio-header-item font-headline-lg text-headline-lg text-on-surface dark:text-white mb-4 tracking-tight font-extrabold">
            PORTAFOLIO DE TRABAJO
          </h2>
          <div className="portfolio-header-item h-1.5 w-24 bg-primary dark:bg-secondary-container mx-auto rounded-full mb-6" />
          <p className="portfolio-header-item font-body-lg text-body-lg text-text-muted dark:text-slate-300">
            Agradecemos a nuestros clientes por su valiosa confianza e impulsamos juntos su crecimiento.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-container grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20 dark:divide-slate-700/50">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center py-6">
              <div className={`font-display-lg text-5xl font-extrabold mb-2 tracking-tight ${stat.color}`}>
                {stat.number}
              </div>
              <div className="font-label-md text-xs text-on-surface-variant dark:text-slate-300 font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Grid (4 featured projects) */}
        <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredProjects.map((project) => (
            <button 
              type="button"
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="portfolio-card group cursor-pointer rounded-2xl overflow-hidden shadow-[0px_4px_15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300 bg-white dark:bg-slate-800 border border-outline-variant/10 dark:border-slate-700/50 relative text-left"
              aria-label={`Ver detalles del proyecto ${project.title}`}
            >
              <div className="overflow-hidden aspect-video relative">
                <img 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  src={project.image}
                  width="640"
                  height="360"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-primary/80 dark:bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-white text-4xl mb-1 select-none" aria-hidden="true">visibility</span>
                    <p className="text-white font-bold text-sm tracking-wider uppercase">Ver Detalles</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-bold text-primary dark:text-secondary-container uppercase tracking-wider">{project.category}</span>
                <h4 className="font-bold text-on-surface dark:text-white text-lg mt-1 group-hover:text-primary dark:group-hover:text-secondary-container transition-colors tracking-tight">
                  {project.title}
                </h4>
              </div>
            </button>
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
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
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
                className="bg-primary hover:bg-primary-container dark:bg-secondary-container dark:text-slate-900 text-on-primary font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-102 shadow-md"
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
