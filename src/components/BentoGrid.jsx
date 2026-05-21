import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function BentoGrid() {
  const containerRef = useRef(null);

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

    // 1. Text slide in from the left
    animateOnScroll('.bento-text-item', { x: -40, opacity: 0, stagger: 0.15, ease: 'power3.out' }, '.bento-text-container');

    // 2. Bento cards cascade scale/bounce from the right
    animateOnScroll('.bento-card', { scale: 0.9, y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'back.out(1.2)' }, '.bento-grid-container');
  }, { scope: containerRef });

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Smooth responsive max 10 degrees tilt rotation
    const rotateX = -normalizedY * 10;
    const rotateY = normalizedX * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
    card.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <section 
      ref={containerRef}
      className="py-28 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden" 
      aria-labelledby="visibilidad-title"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="bento-text-container lg:col-span-5 flex flex-col justify-center">
            <div className="bento-text-item inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-secondary-container/10 text-primary dark:text-secondary-container w-fit text-sm font-semibold mb-6">
              <span className="material-symbols-outlined text-sm font-bold" aria-hidden="true">visibility</span>
              Máxima Visibilidad
            </div>
            
            <h2 id="visibilidad-title" className="bento-text-item font-headline-lg text-headline-lg text-on-surface dark:text-white mb-6 leading-tight font-bold tracking-tight">
              REDES SOCIALES Y <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-secondary-container dark:to-primary-fixed">
                BUSCADORES GLOBALES
              </span>
            </h2>
            
            <p className="bento-text-item font-body-md text-body-md text-text-muted dark:text-slate-300 mb-6 leading-relaxed">
              <strong>IMPORTANTE:</strong> Puedes tener el mejor sitio web del mundo, pero si no se encuentra <strong>optimizada, visible e inscrita en los motores de búsqueda y mapas</strong>, tus clientes potenciales nunca te encontrarán.
            </p>
            
            <p className="bento-text-item font-body-md text-body-md text-text-muted dark:text-slate-300 mb-8 leading-relaxed">
              En <strong>artecnologia.com.mx</strong> estructuramos tu sitio con las mejores prácticas de SEO desde la primera línea de código para que Google y otros buscadores amen tu negocio.
            </p>
            
            <ul className="bento-text-item space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary dark:text-secondary-container shrink-0 mt-0.5 select-none font-bold" aria-hidden="true">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface dark:text-slate-200">
                  Alta e indexación en <strong>Google, Bing, Yahoo</strong> y sistemas de analítica.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary dark:text-secondary-container shrink-0 mt-0.5 select-none font-bold" aria-hidden="true">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface dark:text-slate-200">
                  Optimización de meta etiquetas, mapa del sitio (XML) y archivo robots.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary dark:text-secondary-container shrink-0 mt-0.5 select-none font-bold" aria-hidden="true">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface dark:text-slate-200">
                  Integración completa con <strong>Google Maps</strong> para búsquedas locales de negocio.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Bento Grid Column */}
          <div className="bento-grid-container lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Google Block */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bento-card group relative overflow-hidden bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-[0px_4px_15px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 border border-outline-variant/10 dark:border-slate-700/30"
            >
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(280px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(99, 102, 241, 0.12), transparent 80%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-indigo-500/15 dark:border-indigo-400/20"
                style={{
                  maskImage: `radial-gradient(140px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(140px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 relative z-10">
                <img src="/img/google.webp" alt="Google" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              </div>
              <span className="font-headline-md text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-extrabold tracking-tight relative z-10">Google</span>
              <span className="text-xs text-text-muted mt-1 relative z-10">SEO Orgánico</span>
            </div>

            {/* Bing Block */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bento-card group relative overflow-hidden bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-[0px_4px_15px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 border border-outline-variant/10 dark:border-slate-700/30"
            >
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(280px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(99, 102, 241, 0.12), transparent 80%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-indigo-500/15 dark:border-indigo-400/20"
                style={{
                  maskImage: `radial-gradient(140px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(140px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 relative z-10">
                <img src="/img/bing.webp" alt="Bing" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              </div>
              <span className="font-headline-md text-xl sm:text-2xl text-[#00809D] dark:text-teal-400 font-extrabold tracking-tight relative z-10">bing</span>
              <span className="text-xs text-text-muted mt-1 relative z-10">Visibilidad</span>
            </div>

            {/* Yahoo Block */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bento-card group relative overflow-hidden bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-[0px_4px_15px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 border border-outline-variant/10 dark:border-slate-700/30"
            >
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(280px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(99, 102, 241, 0.12), transparent 80%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-indigo-500/15 dark:border-indigo-400/20"
                style={{
                  maskImage: `radial-gradient(140px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(140px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 relative z-10">
                <img src="/img/yahoo.webp" alt="Yahoo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              </div>
              <span className="font-headline-md text-xl sm:text-2xl text-[#410093] dark:text-purple-400 font-extrabold italic tracking-tight relative z-10">Yahoo!</span>
              <span className="text-xs text-text-muted mt-1 relative z-10">Motores de búsqueda</span>
            </div>

            {/* Maps Block */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bento-card group relative overflow-hidden bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-[0px_4px_15px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 border border-outline-variant/10 dark:border-slate-700/30 sm:col-span-1"
            >
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(280px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(99, 102, 241, 0.12), transparent 80%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-indigo-500/15 dark:border-indigo-400/20"
                style={{
                  maskImage: `radial-gradient(140px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(140px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 relative z-10">
                <img src="/img/maps.webp" alt="Google Maps" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              </div>
              <div className="font-bold text-base sm:text-lg dark:text-white relative z-10">Google Maps</div>
              <div className="text-xs text-text-muted mt-1 text-center relative z-10">Búsqueda Local</div>
            </div>

            {/* Adwords Block (Double space on sm+) */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bento-card group relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-slate-800/50 dark:to-slate-800/50 hover:from-white hover:to-white dark:hover:bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col items-center justify-center shadow-[0px_4px_15px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 border border-outline-variant/15 dark:border-slate-700/30 col-span-2 sm:col-span-2 min-h-[120px] sm:min-h-[180px]"
            >
              <div 
                className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(400px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(99, 102, 241, 0.12), transparent 80%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-indigo-500/15 dark:border-indigo-400/20"
                style={{
                  maskImage: `radial-gradient(160px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(160px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black 100%, transparent 100%)`,
                  opacity: `var(--spotlight-opacity, 0)`
                }}
                aria-hidden="true"
              />

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 relative z-10">
                <img src="/img/ads.webp" alt="Google Ads" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              </div>
              <div className="font-extrabold text-lg sm:text-xl text-primary dark:text-blue-300 tracking-tight relative z-10">Google Ads</div>
              <div className="text-xs sm:text-sm text-text-muted mt-1 font-medium text-center relative z-10">Campañas Publicitarias Pagadas (PPC)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
