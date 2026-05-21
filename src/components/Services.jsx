import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CardSwap from './CardSwap';

export default function Services() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Staggered reveal for services header text on scroll
    gsap.fromTo(
      container.querySelectorAll('.services-reveal-item'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.querySelector('.services-header-trigger') || container,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, { scope: containerRef });

  const servicesList = [
    {
      title: 'DISEÑO WEB',
      icon: 'web',
      desc: 'Entendemos la web como una ventana abierta al mundo. Un buen diseño funcional y estético hará que quien se acerque a tu marca quiera volver.',
      benefits: [
        'Diseño de interfaz (UI/UX) único, personalizado e intuitivo.',
        'Estructura web planificada estratégicamente para captar clientes.',
        'Imágenes y recursos optimizados para carga ultra-veloz.',
        'Animaciones y transiciones suaves para una experiencia interactiva.'
      ],
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50',
      textColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200/50 dark:border-blue-800/40',
      glowColor: 'shadow-[0_15px_30px_-5px_rgba(59,130,246,0.12)] dark:shadow-[0_15px_35px_-5px_rgba(59,130,246,0.18)]',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'REDISEÑO RESPONSIVO',
      icon: 'devices',
      desc: 'Diseño inteligente que se adapta perfectamente a todo tipo de pantallas: móviles, tablets, ordenadores y pantallas gigantes.',
      benefits: [
        'Adaptabilidad total garantizada bajo la filosofía Mobile-First.',
        'Optimización exhaustiva para tiempos de carga mínimos en 4G/5G.',
        'Accesibilidad web mejorada (WCAG) para todo tipo de usuarios.',
        'Reducción de tasa de rebote gracias a una interacción fluida.'
      ],
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/50',
      textColor: 'text-cyan-600 dark:text-cyan-400',
      borderColor: 'border-cyan-200/50 dark:border-cyan-800/40',
      glowColor: 'shadow-[0_15px_30px_-5px_rgba(6,182,212,0.12)] dark:shadow-[0_15px_35px_-5px_rgba(6,182,212,0.18)]',
      gradient: 'from-cyan-500 to-cyan-700'
    },
    {
      title: 'COMERCIO ELECTRÓNICO',
      icon: 'storefront',
      desc: 'Una nueva forma de vender sin fronteras. Tu tienda online estará abierta las 24 horas del día, segura y completamente automatizada.',
      benefits: [
        'Integración con pasarelas de pago seguras (Stripe, PayPal, etc.).',
        'Gestor de catálogo intuitivo para añadir o editar productos sin saber código.',
        'Optimización del embudo de ventas para maximizar tus ingresos.',
        'Panel de administración integrado para envíos, stock e inventario.'
      ],
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      iconBg: 'bg-amber-100 dark:bg-amber-900/50',
      textColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-200/50 dark:border-amber-800/40',
      glowColor: 'shadow-[0_15px_30px_-5px_rgba(245,158,11,0.12)] dark:shadow-[0_15px_35px_-5px_rgba(245,158,11,0.18)]',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      title: 'GOOGLE ANALYTICS / SEO',
      icon: 'monitoring',
      desc: 'Marketing online de precisión. Si no estás bien posicionado en buscadores como Google, prácticamente no existes en internet.',
      benefits: [
        'Optimización SEO On-Page técnica y estudio semántico de palabras clave.',
        'Integración avanzada con Google Analytics 4 y Google Search Console.',
        'Estrategias de contenido y link-building para escalar a los primeros puestos.',
        'Seguimiento en tiempo real de conversiones, clics y comportamiento.'
      ],
      bgColor: 'bg-rose-50 dark:bg-rose-950/30',
      iconBg: 'bg-rose-100 dark:bg-rose-900/50',
      textColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-200/50 dark:border-rose-800/40',
      glowColor: 'shadow-[0_15px_30px_-5px_rgba(244,63,94,0.12)] dark:shadow-[0_15px_35px_-5px_rgba(244,63,94,0.18)]',
      gradient: 'from-rose-500 to-rose-600'
    }
  ];

  const activeService = servicesList[activeIndex];

  return (
    <section 
      ref={containerRef}
      id="servicios" 
      aria-labelledby="servicios-title"
      className="py-28 bg-surface-container-low dark:bg-slate-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Header */}
        <div className="text-center mb-16 services-header-trigger">
          <span className="services-reveal-item text-primary dark:text-secondary-container text-sm font-bold tracking-widest uppercase mb-3 block">
            LO QUE HACEMOS BIEN
          </span>
          <h2 id="servicios-title" className="services-reveal-item font-headline-lg text-headline-lg text-on-surface dark:text-white mb-4 tracking-tight">
            NUESTROS SERVICIOS
          </h2>
          <div className="services-reveal-item h-1.5 w-24 bg-primary dark:bg-secondary-container mx-auto rounded-full mb-6" />
          <p className="services-reveal-item max-w-2xl mx-auto text-text-muted dark:text-slate-300 text-body-lg">
            Soluciones digitales de alto impacto diseñadas para posicionar tu marca, automatizar tus ventas y conectar con tus clientes de forma eficiente.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="services-reveal-item grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Active Service Details Panel (Left Column) */}
          <div className="lg:col-span-5 flex flex-col order-2 lg:order-1 h-full min-h-[460px] justify-between bg-white dark:bg-slate-800/40 p-8 lg:p-10 rounded-3xl border border-outline-variant/10 dark:border-slate-700/30 shadow-sm backdrop-blur-md">
            
            {/* Upper Content Group */}
            <div className="flex flex-col">
              
              {/* Progress Timer bar */}
              <div className="w-full bg-outline-variant/10 dark:bg-slate-700/40 h-1 rounded-full overflow-hidden mb-6">
                <div 
                  key={activeIndex} // Reset and trigger keyframe animation on index change
                  className="h-full bg-gradient-to-r from-primary to-blue-500 dark:from-secondary-container dark:to-cyan-400 animate-progress-bar rounded-full"
                />
              </div>

              {/* Title & Tag */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`material-symbols-outlined text-3xl ${activeService.textColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {activeService.icon}
                </span>
                <h3 className="font-headline-md text-headline-md font-extrabold tracking-tight text-on-surface dark:text-white transition-all duration-300">
                  {activeService.title}
                </h3>
              </div>

              {/* Detailed Description */}
              <p className="text-text-muted dark:text-slate-300 text-body-md leading-relaxed mb-6">
                {activeService.desc}
              </p>

              {/* Features List */}
              <div className="border-t border-outline-variant/10 dark:border-slate-700/40 pt-6">
                <h4 className="text-sm font-bold text-on-surface/80 dark:text-white/80 uppercase tracking-wider mb-4">
                  ¿Qué incluye nuestro servicio?
                </h4>
                <ul className="space-y-3.5">
                  {activeService.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-body-md text-text-muted dark:text-slate-300">
                      <span className={`material-symbols-outlined text-xl select-none mt-0.5 font-bold ${activeService.textColor}`}>
                        check
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Action Button */}
            <div className="mt-8 pt-6 border-t border-outline-variant/10 dark:border-slate-700/40">
              <a 
                href="#paquetes" 
                className="group/btn w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-primary text-white hover:bg-primary/95 dark:bg-primary dark:text-white dark:hover:bg-primary/90 rounded-full font-label-lg font-bold tracking-wide transition-all shadow-md hover:shadow-[0_8px_24px_rgba(0,78,159,0.25)] hover:-translate-y-0.5 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  CONOCE NUESTROS PLANES
                  <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
                    arrow_forward
                  </span>
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r ${activeService.textColor.includes('blue') ? 'from-blue-600 to-blue-800' : activeService.textColor.includes('cyan') ? 'from-cyan-600 to-cyan-800' : activeService.textColor.includes('amber') ? 'from-amber-600 to-amber-700' : 'from-rose-600 to-rose-700'} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -z-0`} />
              </a>
            </div>
          </div>

          {/* Column 2: CardSwap Stack (Right Column) */}
          <div className="lg:col-span-7 flex items-center justify-center order-1 lg:order-2 py-6">
            <CardSwap 
              onChange={setActiveIndex} 
              delay={5000}
              pauseOnHover={true}
              cardDistance={32}
              verticalDistance={20}
              className="w-full max-w-[480px]"
            >
              {servicesList.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <div 
                    key={index}
                    className={`group w-full h-[380px] flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300 bg-white dark:bg-slate-800 border-outline-variant/15 dark:border-slate-700/60 shadow-lg ${service.glowColor} ${isActive ? 'ring-2 ring-primary/45 dark:ring-blue-400/40' : ''}`}
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex justify-between items-start mb-6">
                        {/* Icon Container */}
                        <div className={`w-14 h-14 ${service.iconBg} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          <span className={`material-symbols-outlined text-3xl select-none ${service.textColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                            {service.icon}
                          </span>
                        </div>

                        {/* Stacking indicator tag */}
                        <div className="px-3 py-1 bg-outline-variant/5 dark:bg-slate-700/30 rounded-full border border-outline-variant/10 dark:border-slate-700/30">
                          <span className="text-xs font-bold text-text-muted dark:text-slate-400">
                            {index + 1} / {servicesList.length}
                          </span>
                        </div>
                      </div>

                      {/* Card Title */}
                      <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white mb-4 tracking-tight group-hover:text-primary dark:group-hover:text-secondary-container transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Description Summary */}
                      <p className="font-body-md text-body-md text-text-muted dark:text-slate-300 leading-relaxed line-clamp-4">
                        {service.desc}
                      </p>
                    </div>

                    {/* Quick drag hint indicator at bottom */}
                    <div className="flex items-center gap-1.5 justify-end text-xs font-semibold text-text-muted/65 dark:text-slate-400/60">
                      <span className="material-symbols-outlined text-base">swipe</span>
                      <span>Desliza para cambiar</span>
                    </div>
                  </div>
                );
              })}
            </CardSwap>
          </div>

        </div>
      </div>
    </section>
  );
}
