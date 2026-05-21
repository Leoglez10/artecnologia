import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Features() {
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

    // 1. Title and subtitle fade/slide up
    animateOnScroll('.features-text-item', { y: 30, opacity: 0, stagger: 0.15, ease: 'power3.out' }, '.features-text-item');

    // 2. Feature grid icons staggered spin/fade-in
    animateOnScroll('.feature-card', { scale: 0.8, y: 30, rotation: -10, opacity: 0, stagger: 0.08, ease: 'back.out(1.4)' }, '.features-grid');

    // 3. CTA Glass Card zoom-in
    animateOnScroll('.features-cta-card', { scale: 0.95, y: 40, opacity: 0, duration: 0.9, ease: 'power2.out' }, '.features-cta-card');
  }, { scope: containerRef });

  const featureList = [
    { name: 'Calidad', icon: 'verified', color: 'text-emerald-400 bg-emerald-500/10' },
    { name: 'E-mail', icon: 'mail', color: 'text-blue-400 bg-blue-500/10' },
    { name: 'Estadísticas', icon: 'pie_chart', color: 'text-amber-400 bg-amber-500/10' },
    { name: 'Galerías', icon: 'photo_library', color: 'text-indigo-400 bg-indigo-500/10' },
    { name: 'E-commerce', icon: 'shopping_cart', color: 'text-purple-400 bg-purple-500/10' },
    { name: 'HTML 5', icon: 'html', color: 'text-orange-400 bg-orange-500/10' },
    { name: 'Seguridad', icon: 'lock', color: 'text-red-400 bg-red-500/10' },
    { name: 'Ventas', icon: 'point_of_sale', color: 'text-teal-400 bg-teal-500/10' },
    { name: 'Equipo', icon: 'groups', color: 'text-cyan-400 bg-cyan-500/10' },
    { name: 'Publicidad', icon: 'campaign', color: 'text-pink-400 bg-pink-500/10' }
  ];

  return (
    <section 
      ref={containerRef}
      className="py-28 bg-primary dark:bg-slate-950 text-on-primary transition-colors duration-300 relative overflow-hidden" 
      aria-labelledby="features-title"
    >
      {/* Visual background details */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 id="features-title" className="features-text-item font-headline-lg text-headline-lg font-bold mb-6 tracking-tight">
          “CONSTRUIMOS TU NEGOCIO EN LA WEB”
        </h2>
        
        <p className="features-text-item font-body-lg text-body-lg text-primary-fixed-dim dark:text-slate-300 max-w-4xl mx-auto mb-20 leading-relaxed">
          En <strong>Artecnología Digital</strong> contamos con un equipo apasionado dispuesto a brindarte un servicio excepcional. Diseñamos e implementamos soluciones digitales de alta calidad para impulsar el crecimiento real de tu negocio en internet.
        </p>

        {/* Features Icon Grid */}
        <div className="features-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {featureList.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-[background-color,transform,box-shadow] duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-12">
                <span className="material-symbols-outlined text-4xl text-white select-none" aria-hidden="true">
                  {feature.icon}
                </span>
              </div>
              <span className="font-label-md text-sm font-bold uppercase tracking-wider text-slate-100 group-hover:text-white transition-colors">
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Glass Card */}
        <div className="features-cta-card mt-20 bg-white/5 dark:bg-slate-900/40 rounded-3xl p-10 max-w-3xl mx-auto border border-white/10 shadow-xl">
          <h3 className="font-headline-md text-xl font-bold mb-4 text-white">¿Listo para dar el siguiente paso?</h3>
          <p className="font-body-md text-slate-200 mb-6 leading-relaxed">
            Solicita una <strong>asesoría inicial sin costo alguno</strong>. Con gusto resolveremos todas tus dudas para adaptarnos al mejor precio y a las necesidades específicas de tu negocio.
          </p>
          <a 
            className="bg-white hover:bg-slate-100 text-primary dark:text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all duration-300 inline-block shadow-lg hover:scale-105" 
            href="#contacto"
          >
            QUIERO CRECER MI NEGOCIO
          </a>
        </div>
      </div>
    </section>
  );
}
