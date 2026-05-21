import { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';

export default function PortfolioGallery({ onBack, onViewPlans }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);

  // Auto-generate categories based on actual database entries!
  // If the client adds a new project with a new rubric, it automatically appears here.
  const categories = ['Todos', ...new Set(projects.map(p => p.category))];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedProject || !dialog || dialog.open) return;

    dialog.showModal();
  }, [selectedProject]);

  const closeProjectDialog = () => setSelectedProject(null);

  // Filter projects by both search query and category
  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.techs.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const handleViewPlansClick = (project) => {
    closeProjectDialog();
    if (onViewPlans) {
      onViewPlans();
    }
  };

  return (
    <section className="py-12 bg-surface-bg dark:bg-slate-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Back and Header Navigation */}
        <div className="flex flex-col gap-6 mb-12 animate-fade-in-up">
          <div>
            <button
              onClick={onBack}
              type="button"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary dark:text-secondary-container bg-primary/5 dark:bg-slate-800 border border-primary/10 hover:border-primary/30 px-4 py-2.5 rounded-xl hover:scale-102 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm font-bold select-none">arrow_back</span>
              Volver al Inicio
            </button>
          </div>

          <div className="border-b border-outline-variant/10 dark:border-slate-800 pb-6">
            <h1 className="font-headline-lg text-4xl font-black text-on-surface dark:text-white tracking-tight uppercase">
              Galería Completa de Proyectos
            </h1>
            <p className="font-body-md text-text-muted dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Descubre las marcas y negocios locales que han impulsado su presencia y operaciones digitales de la mano de Artecnologia.
            </p>
          </div>
        </div>

        {/* Search and Filters Controls Container */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Real-time Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-400 select-none text-xl">
              search
            </span>
            <input 
              type="text"
              placeholder="Buscar por cliente, categoría o tecnología..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-outline-variant/35 focus:border-primary dark:border-slate-700 dark:focus:border-secondary-container rounded-2xl pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800 text-on-surface dark:text-white placeholder-text-muted/70 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-secondary-container transition-all text-sm"
              aria-label="Buscar clientes"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-on-surface dark:text-slate-400 dark:hover:text-white"
                aria-label="Limpiar búsqueda"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </div>

          {/* Dynamic Categories Selector (scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 select-none cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary dark:bg-secondary-container text-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-800/40 border border-outline-variant/10 dark:border-slate-700/50 text-on-surface-variant dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-xs text-text-muted dark:text-slate-400 font-bold uppercase tracking-wider animate-fade-in-up">
          Mostrando {filteredProjects.length} de {projects.length} clientes encontrados
        </div>

        {/* Projects Grid Layout */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {filteredProjects.map((project) => (
              <button 
                type="button"
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-[0px_4px_15px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300 bg-white dark:bg-slate-800 border border-outline-variant/10 dark:border-slate-700/50 relative text-left flex flex-col justify-between"
                aria-label={`Ver detalles del proyecto ${project.title}`}
              >
                <div className="w-full">
                  <div className="overflow-hidden aspect-video relative">
                    <img 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                      src={project.image}
                      width="480"
                      height="270"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-primary/80 dark:bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-center">
                        <span className="material-symbols-outlined text-white text-4xl mb-1 select-none">visibility</span>
                        <p className="text-white font-bold text-xs tracking-wider uppercase">Ficha Técnica</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-black text-primary dark:text-secondary-container uppercase tracking-wider block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-on-surface dark:text-white text-base group-hover:text-primary dark:group-hover:text-secondary-container transition-colors tracking-tight line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-text-muted dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Pills at the bottom */}
                <div className="px-5 pb-5 pt-0 flex flex-wrap gap-1 mt-auto">
                  {project.techs.slice(0, 2).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-750 text-[9px] font-bold text-text-muted dark:text-slate-400 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techs.length > 2 && (
                    <span className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-750 text-[9px] font-bold text-text-muted dark:text-slate-400">
                      +{project.techs.length - 2}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-outline-variant/10 dark:border-slate-700/50 max-w-md mx-auto my-12 animate-fade-in-up">
            <span className="material-symbols-outlined text-text-muted dark:text-slate-400 text-5xl mb-4 select-none">
              search_off
            </span>
            <h3 className="font-bold text-lg text-on-surface dark:text-white mb-2">No se encontraron clientes</h3>
            <p className="text-xs text-text-muted dark:text-slate-400 px-6 leading-relaxed">
              No encontramos ningún proyecto que coincida con tu búsqueda de <strong>"{searchQuery}"</strong>. Intenta cambiar los términos o la categoría seleccionada.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
              className="mt-6 bg-primary dark:bg-secondary-container dark:text-slate-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:scale-103 transition-all cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

        {/* bottom Page Navigation Return */}
        <div className="text-center border-t border-outline-variant/10 dark:border-slate-800 pt-10 mt-12">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-primary dark:text-secondary-container font-bold hover:bg-primary/5 dark:hover:bg-slate-850 px-8 py-3.5 rounded-full transition-all duration-300 border border-primary/20 hover:scale-105"
          >
            <span className="material-symbols-outlined font-bold" aria-hidden="true">arrow_back</span>
            Volver a la Página Principal
          </button>
        </div>

      </div>

      {/* Project Details Modal (Glassmorphism) */}
      {selectedProject && (
        <dialog
          ref={dialogRef}
          className="modal-dialog p-0 bg-transparent backdrop:bg-black/60"
          aria-labelledby="project-gallery-title"
          onCancel={closeProjectDialog}
          onClose={closeProjectDialog}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeProjectDialog();
          }}
        >
          <div className="relative glass-card text-on-surface dark:text-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl z-50 animate-fade-in-up">
            {/* Top Bar / Close */}
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/10 dark:border-slate-700/50">
              <div>
                <span className="text-xs font-bold text-primary dark:text-secondary-container uppercase tracking-wider">{selectedProject.category}</span>
                <h3 id="project-gallery-title" className="font-bold text-2xl tracking-tight mt-0.5">{selectedProject.title}</h3>
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
              <button 
                onClick={() => handleViewPlansClick(selectedProject)}
                className="bg-primary hover:bg-primary-container dark:bg-secondary-container dark:text-slate-900 text-on-primary font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-102 shadow-md"
              >
                Conoce Nuestros Planes
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
