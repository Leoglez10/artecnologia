import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FallingText from './FallingText';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Staggered entrance for text elements
    gsap.from('.hero-animate-item', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // 2. Soft elastic entry for the mockup illustration
    gsap.from('.hero-mockup-animate', {
      scale: 0.95,
      y: 40,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: 'back.out(1.2)',
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative pt-24 pb-32 overflow-hidden bg-surface-container-low dark:bg-slate-900/50 min-h-[760px] flex items-center transition-colors duration-300"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(105,175,254,0.22),transparent_28rem)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(105,175,254,0.12),transparent_28rem)]" />
      
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Hero text */}
        <div className="flex flex-col gap-8 max-w-2xl text-left">
          <div className="hero-animate-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-fixed dark:bg-slate-800 text-on-secondary-fixed dark:text-secondary-container w-fit text-sm font-semibold shadow-xs">
            <span className="material-symbols-outlined text-sm text-secondary dark:text-secondary-container" aria-hidden="true">rocket_launch</span>
            Agencia Digital Profesional
          </div>
          
          <h1 id="hero-title" className="hero-animate-item font-display-lg text-4xl sm:text-display-lg text-on-surface dark:text-white leading-tight tracking-tight flex flex-col gap-1.5 items-start">
            <span className="block">PÁGINAS DE INTERNET Y SERVICIOS WEB</span>
            <FallingText 
              text="A LA MEDIDA DE TUS IDEAS"
              delay={0.4}
              stagger={0.05}
              highlightClass="bg-gradient-to-r from-primary to-secondary-container bg-clip-text text-transparent dark:from-secondary-container dark:to-primary-fixed font-black tracking-tight"
              className="text-3xl sm:text-display-lg block"
            />
          </h1>
          
          <p className="hero-animate-item font-body-lg text-body-lg text-text-muted dark:text-slate-300">
            La mejor solución para hacer crecer tu negocio, mejorar la presencia digital de tu marca y captar más clientes. Diseño creativo, desarrollo premium y estrategia SEO.
          </p>
          
          <div className="hero-animate-item flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              className="bg-primary hover:bg-primary-container dark:bg-secondary-container dark:text-slate-950 dark:hover:bg-secondary text-on-primary font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] hover:scale-102 hover:shadow-md text-center min-w-[200px]" 
              href="#contacto"
            >
              QUIERO CRECER MI NEGOCIO
            </a>
            <a 
              className="border border-primary text-primary dark:border-secondary-container dark:text-secondary-container font-bold px-8 py-4 rounded-lg hover:bg-primary/5 dark:hover:bg-secondary-container/10 transition-all duration-300 hover:scale-102 text-center min-w-[200px]" 
              href="#servicios"
            >
              VER SOLUCIONES
            </a>
          </div>
        </div>
        
        {/* Hero image mockup */}
        <div className="hero-mockup-animate block mt-8 lg:mt-0 relative w-full max-w-lg lg:max-w-none mx-auto">
          <div className="absolute -inset-4 bg-primary/10 dark:bg-secondary-container/10 rounded-2xl blur-xl" />
          <img 
            alt="Dispositivos mostrando sitios web responsivos" 
            className="relative rounded-xl shadow-[0px_20px_40px_rgba(0,0,0,0.1)] w-full h-auto object-cover border border-outline-variant/30 hover:scale-[1.01] transition-transform duration-500" 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujEc3TJbWnnus055sC2f0uNuqlCFYK_Q2t57dYzOU8HHyoR7C52NV4QU3c43vgr1vVLhW6YvafZ4UlDxbAVeFqFAHdr8-kdGHOfB-nBpq9ZkPdWQA25NNKENp-PEzDgwo7mWocDGoMPdui0VhlMxizxNKXzFl_XAVKchhZVIGCPiiqCmXOTVPZkcUFu-6A2KyQeJT4is7sh95QuJ1widYDEh6vdINAaMT740iP3-f0CF0HJh5MEhj2tsTU"
            width="900"
            height="600"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>
    </section>
  );
}
