import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Services() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper: safe scroll-triggered animation that never leaves elements invisible
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

    // 1. Staggered reveal for services header text
    animateOnScroll('.services-header-item', { y: 30, opacity: 0, stagger: 0.15, ease: 'power3.out' }, '.services-header-item');

    // 2. Elastic staggered reveal for the service cards
    animateOnScroll('.service-card', { y: 60, opacity: 0, scale: 0.95, duration: 1.0, stagger: 0.18, ease: 'back.out(1.1)' }, '.services-grid');
  }, { scope: containerRef });

  const servicesList = [
    {
      title: 'DISEÑO WEB',
      icon: 'web',
      desc: (
        <>
          Entendemos la web como una{' '}
          <span className="inline-block bg-primary/10 text-primary dark:bg-blue-500/20 dark:text-blue-300 px-2 py-0.5 rounded-md font-semibold transition-colors duration-300">
            ventana abierta al mundo
          </span>
          . Un buen{' '}
          <strong className="font-semibold text-on-surface dark:text-white transition-colors duration-300">
            diseño funcional y estético
          </strong>{' '}
          hará que quien se acerque a tu marca quiera{' '}
          <strong className="font-semibold text-primary dark:text-blue-400 transition-colors duration-300">
            volver
          </strong>
          .
        </>
      ),
      bgColor: 'bg-primary-fixed dark:bg-blue-900/40',
      textColor: 'text-primary dark:text-blue-300',
      borderColor: 'group-hover:border-primary/40 dark:group-hover:border-blue-500/30',
      glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(0,78,159,0.15)] dark:group-hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.15)]',
      hoverGlow: 'hover:shadow-blue-500/10'
    },
    {
      title: 'REDISEÑO RESPONSIVO',
      icon: 'devices',
      desc: (
        <>
          También llamado{' '}
          <span className="inline-block bg-secondary/10 text-secondary dark:bg-cyan-500/20 dark:text-cyan-300 px-2 py-0.5 rounded-md font-semibold transition-colors duration-300">
            diseño adaptativo
          </span>
          . Tu sitio web se verá{' '}
          <strong className="font-semibold text-on-surface dark:text-white transition-colors duration-300">
            perfecto y cargará velozmente
          </strong>{' '}
          en tablets, smartphones, computadoras y televisores.
        </>
      ),
      bgColor: 'bg-secondary-fixed dark:bg-cyan-900/40',
      textColor: 'text-secondary dark:text-cyan-300',
      borderColor: 'group-hover:border-secondary/40 dark:group-hover:border-cyan-500/30',
      glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(0,97,166,0.15)] dark:group-hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.15)]',
      hoverGlow: 'hover:shadow-cyan-500/10'
    },
    {
      title: 'COMERCIO ELECTRÓNICO',
      icon: 'storefront',
      desc: (
        <>
          Una nueva forma de{' '}
          <span className="inline-block bg-tertiary/10 text-tertiary dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 rounded-md font-semibold transition-colors duration-300">
            vender sin fronteras
          </span>
          . Tu tienda online estará abierta las{' '}
          <strong className="font-semibold text-on-surface dark:text-white transition-colors duration-300">
            24 horas del día
          </strong>
          , los 7 días de la semana de forma{' '}
          <strong className="font-semibold text-tertiary dark:text-amber-400 transition-colors duration-300">
            segura y automatizada
          </strong>
          .
        </>
      ),
      bgColor: 'bg-tertiary-fixed dark:bg-amber-900/40',
      textColor: 'text-tertiary dark:text-amber-300',
      borderColor: 'group-hover:border-tertiary/40 dark:group-hover:border-amber-500/30',
      glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(136,55,0,0.12)] dark:group-hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.12)]',
      hoverGlow: 'hover:shadow-amber-500/10'
    },
    {
      title: 'GOOGLE ANALYTICS / SEO',
      icon: 'monitoring',
      desc: (
        <>
          <span className="inline-block bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-300 px-2 py-0.5 rounded-md font-semibold transition-colors duration-300">
            Marketing online de precisión
          </span>
          . Te buscan, te encuentran. Si no estás{' '}
          <strong className="font-semibold text-on-surface dark:text-white transition-colors duration-300">
            bien posicionado
          </strong>{' '}
          en buscadores como Google, prácticamente{' '}
          <strong className="font-semibold text-red-600 dark:text-red-400 transition-colors duration-300">
            no existes
          </strong>{' '}
          en internet.
        </>
      ),
      bgColor: 'bg-error-container dark:bg-red-900/40',
      textColor: 'text-on-error-container dark:text-red-300',
      borderColor: 'group-hover:border-red-500/40 dark:group-hover:border-red-500/30',
      glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.12)] dark:group-hover:shadow-[0_0_35px_-5px_rgba(239,68,68,0.15)]',
      hoverGlow: 'hover:shadow-red-500/10'
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="servicios" 
      aria-labelledby="servicios-title"
      className="py-28 bg-surface-container-low dark:bg-slate-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="services-header-item text-primary dark:text-secondary-container text-sm font-bold tracking-widest uppercase mb-3 block">
            LO QUE HACEMOS BIEN
          </span>
          <h2 id="servicios-title" className="services-header-item font-headline-lg text-headline-lg text-on-surface dark:text-white mb-4 tracking-tight">
            NUESTROS SERVICIOS
          </h2>
          <div className="services-header-item h-1.5 w-24 bg-primary dark:bg-secondary-container mx-auto rounded-full mb-6" />
          <p className="services-header-item max-w-2xl mx-auto text-text-muted dark:text-slate-300 text-body-lg">
            Soluciones digitales de alto impacto diseñadas para posicionar tu marca, automatizar tus ventas y conectar con tus clientes de forma eficiente.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {servicesList.map((service, index) => (
            <div 
              key={index}
              className={`service-card group bg-white dark:bg-slate-800/80 p-8 rounded-2xl border border-outline-variant/10 dark:border-slate-700/40 hover:-translate-y-2.5 transition-all duration-500 flex flex-col h-full ${service.borderColor} ${service.glowColor}`}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm`}>
                <span className={`material-symbols-outlined text-4xl select-none ${service.textColor}`} style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                  {service.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white mb-4 tracking-tight group-hover:text-primary dark:group-hover:text-secondary-container transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-body-md text-body-md text-text-muted dark:text-slate-300 flex-grow leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* General Action Button */}
        <div className="mt-16 flex justify-center">
          <a 
            href="#contacto" 
            className="group/btn inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white hover:bg-primary/95 dark:bg-primary dark:text-white dark:hover:bg-primary/90 rounded-full font-label-lg font-bold tracking-wide transition-all shadow-md hover:shadow-[0_8px_30px_rgb(0,78,159,0.3)] hover:-translate-y-0.5 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              EMPEZAR MI PROYECTO
              <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
                arrow_forward
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -z-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
