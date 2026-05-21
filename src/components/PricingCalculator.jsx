import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';

// Helper: find a project in the database by partial name match
const findProject = (name) => {
  const lower = name.toLowerCase();
  return projects.find(p => p.title.toLowerCase().includes(lower));
};


// Extended packages data as provided by the client's guidelines
const packages = [
  {
    id: 'my-web',
    name: 'MY WEB',
    focus: 'Incursión, presencia básica y estatus.',
    price: '3,944',
    renewal: '1,972',
    emails: '10 cuentas',
    domainAndHost: 'Incluye dominio (Derechos del cliente).',
    validity: '1 año',
    support: 'Asesoría constante.',
    functions: ['Formulario de contacto básico'],
    specials: ['Inscripción en buscadores', 'Optimización móvil y redes'],
    examples: ['Birotes Esmeralda', 'Herso Metales', 'Servi-PC'],
    isPopular: false,
    color: 'from-blue-600 to-cyan-500',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
  },
  {
    id: 'interpreneur',
    name: 'INTERPRENEUR',
    focus: 'Negocios con procesos establecidos que buscan crecer.',
    price: '6,960',
    renewal: '2,610',
    emails: 'Hasta 20 cuentas',
    domainAndHost: 'Hosting independiente (Derechos del cliente).',
    validity: '1 año',
    support: 'Asesoría constante + Capacitación de manejo de info.',
    functions: ['Formulario de contacto', 'Registro de usuarios', 'Suscripción a Newsletters'],
    specials: ['Módulos a la medida', 'Pedidos online', 'Inscripción en buscadores'],
    examples: ['Copasa', 'Termi Cool', 'Tatla'],
    isPopular: true,
    color: 'from-primary to-blue-700',
    borderColor: 'border-primary/20 hover:border-primary/40',
    badgeBg: 'bg-primary-fixed dark:bg-slate-800 text-primary dark:text-secondary-container'
  },
  {
    id: 'unlimited',
    name: 'UNLIMITED',
    focus: 'Ventas en línea, plataformas educativas y portales corporativos.',
    price: '10,672',
    renewal: '3,472',
    emails: 'Hasta 50 cuentas',
    domainAndHost: 'Hosting independiente (Derechos del cliente).',
    validity: '1 año',
    support: 'Asesoría constante + Capacitación de manejo de info.',
    functions: ['Formulario de contacto', 'Registro de usuarios', 'Carrito de compras', 'Tienda virtual'],
    specials: ['Módulos a la medida', 'Pedidos online', 'Pagos en línea (Stripe/PayPal)', 'Soporte Moodle'],
    examples: ['Todo para el Podologo', 'Chagget Cosmetics', 'Muebles y Creaciones'],
    isPopular: false,
    color: 'from-purple-600 to-pink-600',
    borderColor: 'border-purple-500/20 hover:border-purple-500/40',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
  }
];

const customPackage = {
  id: 'custom',
  name: 'A LA MEDIDA',
  focus: 'Proyectos a gran escala, requerimientos altamente complejos y desarrollo dedicado.',
  price: 'Personalizado',
  renewal: 'Cotización',
  emails: 'Más de 50 cuentas',
  domainAndHost: 'Infraestructura dedicada (Derechos del cliente).',
  validity: 'A convenir',
  support: 'Soporte de alta prioridad y capacitación corporativa.',
  functions: ['Integraciones avanzadas (APIs/CRM)', 'Portales interactivos complejos', 'Arquitectura escalable'],
  specials: ['Desarrollo a la medida', 'Auditoría de seguridad', 'Consultoría técnica dedicada'],
  examples: ['Corporativos', 'Instituciones Educativas', 'Plataformas SaaS'],
  isPopular: false,
  color: 'from-slate-700 to-slate-900',
  borderColor: 'border-slate-500/20 hover:border-slate-500/40',
  badgeBg: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300'
};

export default function PricingCalculator() {
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

    // 1. Staggered reveal for pricing header text
    animateOnScroll('.pricing-header-item', { y: 30, opacity: 0, stagger: 0.15, ease: 'power3.out' }, '.pricing-header-item');

    // 2. Elastic staggered reveal for the packages cards
    animateOnScroll('.pricing-package-card', { y: 50, opacity: 0, scale: 0.95, duration: 0.9, stagger: 0.15, ease: 'back.out(1.15)' }, '.pricing-package-grid');

    // 3. Configurator container zoom and slide up
    animateOnScroll('.pricing-calculator-card', { scale: 0.95, y: 40, opacity: 0, duration: 0.9, ease: 'power2.out' }, '.pricing-calculator-card');
  }, { scope: containerRef });

  // Recommendation States
  const [emails, setEmails] = useState('10'); // '10', '20', '50', '50+'
  const [projectFocus, setProjectFocus] = useState('basic'); // 'basic', 'growth', 'advanced'
  const [features, setFeatures] = useState({
    contactForm: true, // Always true for basic footprint
    userRegistration: false,
    newsletters: false,
    customModules: false,
    onlineOrders: false,
    shoppingCart: false,
    onlinePayments: false,
    moodle: false
  });

  // Modal State
  const [activeModalPackage, setActiveModalPackage] = useState(null);

  // Recommendation Engine logic
  const getRecommendedPackage = () => {
    // If they exceed 50 emails
    if (emails === '50+') {
      return customPackage;
    }

    // Unlimited conditions
    if (
      features.shoppingCart ||
      features.onlinePayments ||
      features.moodle ||
      emails === '50' ||
      projectFocus === 'advanced'
    ) {
      return packages.find(pkg => pkg.id === 'unlimited');
    }

    // Interpreneur conditions
    if (
      features.userRegistration ||
      features.newsletters ||
      features.customModules ||
      features.onlineOrders ||
      emails === '20' ||
      projectFocus === 'growth'
    ) {
      return packages.find(pkg => pkg.id === 'interpreneur');
    }

    // Basic condition
    return packages.find(pkg => pkg.id === 'my-web');
  };

  const recommendedPkg = getRecommendedPackage();

  // Helper: dynamic reasons for recommendation
  const getRecommendationReason = (pkgId) => {
    if (pkgId === 'custom') {
      return 'Tus requerimientos superan el alcance de las soluciones preconfiguradas. Necesitas un desarrollo robusto y soporte dedicado 24/7.';
    }
    if (pkgId === 'unlimited') {
      if (features.shoppingCart || features.onlinePayments) {
        return 'Recomendado porque requieres ventas en línea, carrito de compras y pasarela de pagos integradas.';
      }
      if (features.moodle) {
        return 'Recomendado por tu necesidad de soporte para la plataforma educativa Moodle y portales complejos.';
      }
      if (emails === '50') {
        return 'Recomendado por requerir un volumen robusto de hasta 50 cuentas de correo electrónico corporativo.';
      }
      return 'Ideal para portales corporativos de alta demanda y transacciones con la máxima flexibilidad y alcance.';
    }
    if (pkgId === 'interpreneur') {
      if (features.userRegistration || features.newsletters) {
        return 'Recomendado porque buscas captar y administrar usuarios o lanzar boletines / newsletters corporativas.';
      }
      if (features.customModules || features.onlineOrders) {
        return 'Recomendado porque requieres pedidos en línea y módulos funcionales adaptados a la medida de tu proceso.';
      }
      if (emails === '20') {
        return 'Recomendado por requerir hasta 20 cuentas de correo electrónico corporativo.';
      }
      return 'Excelente balance para negocios con procesos establecidos que buscan captar prospectos e interactuar activamente.';
    }
    return 'Recomendado para incursión digital y branding básico. Cubre perfectamente tus necesidades con la mejor inversión inicial.';
  };

  // Feature Toggle Helper
  const handleFeatureToggle = (featureName) => {
    setFeatures(prev => ({
      ...prev,
      [featureName]: !prev[featureName]
    }));
  };

  // Scroll to contact form and prefill data
  const handleSelectPackage = (pkg) => {
    // Close modal if open
    setActiveModalPackage(null);

    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Prefill form in DOM via custom input event trigger (supports React controlled input updates)
    setTimeout(() => {
      const subjectInput = document.getElementById('asunto');
      const messageInput = document.getElementById('mensaje');

      if (subjectInput) {
        subjectInput.value = `Cotización: Paquete ${pkg.name}`;
        const event = new Event('input', { bubbles: true });
        subjectInput.dispatchEvent(event);
      }

      if (messageInput) {
        const msg = pkg.id === 'custom'
          ? `Hola, estoy interesado en un desarrollo A LA MEDIDA de Artecnologia.\n\nRequerimientos:\n- Enfoque: ${projectFocus === 'basic' ? 'Básico / Informativo' : projectFocus === 'growth' ? 'Interactivo y Crecimiento' : 'E-commerce / Educativo'}\n- Correos: Más de 50 cuentas\n- Módulos requeridos: ${Object.keys(features).filter(k => features[k] && k !== 'contactForm').map(k => k === 'userRegistration' ? 'Registro usuarios' : k === 'newsletters' ? 'Newsletters' : k === 'customModules' ? 'Módulos a medida' : k === 'onlineOrders' ? 'Pedidos online' : k === 'shoppingCart' ? 'Carrito de compras' : k === 'onlinePayments' ? 'Pagos en línea' : k === 'moodle' ? 'Moodle' : k).join(', ') || 'Varios a definir'}.\nPor favor contáctenme para agendar una sesión de asesoría técnica.`
          : `Hola, estoy interesado en contratar el Paquete ${pkg.name}.\n\nDetalles del paquete cotizado:\n- Enfoque: ${pkg.focus}\n- Correos incluidos: ${pkg.emails}\n- Costo Inicial: $${pkg.price} (+ IVA)\n- Renovación Anual: $${pkg.renewal}\n\nPor favor, facilítenme más información sobre los siguientes pasos.`;
        messageInput.value = msg;
        const event = new Event('input', { bubbles: true });
        messageInput.dispatchEvent(event);
      }
    }, 600);
  };

  // Keyboard navigation & accessibility for overlay Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalPackage(null);
      }
    };
    if (activeModalPackage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalPackage]);

  return (
    <section 
      ref={containerRef}
      id="paquetes" 
      aria-labelledby="paquetes-title"
      className="py-28 bg-surface-container-low dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 id="paquetes-title" className="pricing-header-item font-headline-lg text-headline-lg text-on-surface dark:text-white mb-4 tracking-tight font-extrabold">
            PAQUETES WEB Y RECOMENDADOR
          </h2>
          <div className="pricing-header-item h-1.5 w-24 bg-primary dark:bg-secondary-container mx-auto rounded-full mb-6" />
          <p className="pricing-header-item font-body-lg text-text-muted dark:text-slate-300 max-w-2xl mx-auto">
            Explora las soluciones diseñadas por Artecnologia o utiliza nuestro recomendador interactivo para encontrar tu paquete ideal con propiedad total asegurada.
          </p>
        </div>

        {/* Improved Packages Cards Grid */}
        <div className="pricing-package-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-28">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`pricing-package-card rounded-3xl p-8 flex flex-col transition-all duration-300 hover:shadow-2xl border relative group ${
                pkg.isPopular 
                  ? 'bg-primary dark:bg-slate-800 text-white dark:text-white border-transparent shadow-[0px_15px_35px_rgba(0,78,159,0.18)] md:-translate-y-4'
                  : 'bg-white dark:bg-slate-800/40 text-on-surface dark:text-white border-outline-variant/10 dark:border-slate-700/50 hover:border-primary/20 dark:hover:border-slate-600'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-container text-xs font-black px-5 py-2 rounded-bl-3xl uppercase tracking-wider shadow-sm select-none">
                  MÁS SOLICITADO
                </div>
              )}

               {/* Ownership Badge */}
              <div className="flex items-center gap-1.5 mb-4">
                <span className="material-symbols-outlined text-sm font-extrabold text-emerald-500">verified</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${pkg.isPopular ? 'text-slate-200' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  Derechos del Cliente
                </span>
              </div>
              
              <h3 className={`font-headline-md text-2xl font-bold tracking-tight mb-3 ${pkg.isPopular ? 'text-white' : 'text-primary dark:text-secondary-container'}`}>
                {pkg.name}
              </h3>
              
              <p className={`text-sm mb-6 font-medium min-h-[40px] leading-relaxed ${pkg.isPopular ? 'text-slate-200' : 'text-on-surface dark:text-slate-300'}`}>
                {pkg.focus}
              </p>

              {/* Price Tag with Initial and Renewal Structured */}
              <div className={`flex flex-col gap-1 mb-6 pb-6 border-b ${pkg.isPopular ? 'border-white/20' : 'border-outline-variant/20 dark:border-slate-700/50'}`}>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl font-bold">$</span>
                  <span className="text-4xl font-black tracking-tight">{pkg.price}</span>
                  <span className="text-sm font-bold ml-1.5 opacity-90">MXN (+ IVA)</span>
                </div>
                <span className={`text-sm font-semibold flex items-center gap-1 mt-1 ${pkg.isPopular ? 'text-slate-200' : 'text-on-surface-variant dark:text-slate-300'}`}>
                  <span className="material-symbols-outlined text-sm select-none">cached</span>
                  Renovación Anual: <strong className="font-bold">${pkg.renewal} MXN</strong>
                </span>
              </div>
              
              <ul className="space-y-4.5 mb-8 flex-grow">
                <li className="flex items-center gap-3 font-semibold text-sm">
                  <span className={`material-symbols-outlined shrink-0 text-lg ${pkg.isPopular ? 'text-secondary-container' : 'text-primary dark:text-secondary-container'}`}>
                    mail
                  </span>
                  <span>{pkg.emails}</span>
                </li>
                <li className="flex items-center gap-3 font-semibold text-sm">
                  <span className={`material-symbols-outlined shrink-0 text-lg ${pkg.isPopular ? 'text-secondary-container' : 'text-primary dark:text-secondary-container'}`}>
                    cloud_done
                  </span>
                  <span className="truncate max-w-[220px]" title={pkg.domainAndHost}>{pkg.domainAndHost}</span>
                </li>
                
                {/* Visual indicator of core features */}
                {pkg.functions.slice(0, 2).map((func, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 font-medium text-sm leading-relaxed">
                    <span className={`material-symbols-outlined shrink-0 text-lg select-none ${pkg.isPopular ? 'text-white' : 'text-primary dark:text-secondary-container'}`}>
                      check
                    </span>
                    <span className={pkg.isPopular ? 'text-slate-100' : 'text-on-surface dark:text-slate-300'}>
                      {func}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Real Client Examples (Social Proof) */}
              <div className={`p-4 rounded-2xl mb-6 border ${
                pkg.isPopular
                  ? 'bg-white/10 border-white/10 text-slate-100'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-outline-variant/10 dark:border-slate-700/50 text-on-surface-variant dark:text-slate-300'
              }`}>
                <span className="font-bold block uppercase tracking-wider text-xs mb-2.5 opacity-90">Clientes que usan este plan:</span>
                <div className="flex flex-col gap-1.5">
                  {pkg.examples.map((example, eIdx) => {
                    const linkedProject = findProject(example);
                    return linkedProject ? (
                      <a
                        key={eIdx}
                        href="#portafolio"
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-200 group/client ${
                          pkg.isPopular
                            ? 'hover:bg-white/10'
                            : 'hover:bg-white dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <img
                          src={linkedProject.image}
                          alt={linkedProject.title}
                          className="w-7 h-7 rounded-md object-cover shrink-0 border border-white/20 shadow-sm"
                          width="28" height="28" loading="lazy" decoding="async"
                        />
                        <span className={`text-xs font-bold truncate group-hover/client:underline underline-offset-2 ${
                          pkg.isPopular
                            ? 'text-white'
                            : 'text-on-surface dark:text-white'
                        }`}>
                          {linkedProject.title}
                        </span>
                        <span className={`material-symbols-outlined text-xs ml-auto shrink-0 opacity-0 group-hover/client:opacity-100 transition-opacity ${
                          pkg.isPopular ? 'text-white/70' : 'text-primary dark:text-secondary-container'
                        }`} aria-hidden="true">open_in_new</span>
                      </a>
                    ) : (
                      <span key={eIdx} className="text-xs font-medium italic px-2.5 py-1">{example}</span>
                    );
                  })}
                </div>
              </div>
              
              {/* Action CTAs */}
              <div className="flex flex-col gap-2.5 mt-auto">
                <button 
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-102 flex items-center justify-center gap-1.5 shadow-sm text-sm ${
                    pkg.isPopular
                      ? 'bg-white hover:bg-slate-100 text-primary shadow-lg shadow-primary-container/20'
                      : 'bg-primary hover:bg-primary-container text-white dark:bg-secondary-container dark:text-slate-900 hover:shadow-lg'
                  }`}
                >
                  <span>Solicitar Plan</span>
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
                
                <button 
                  onClick={() => setActiveModalPackage(pkg)}
                  className={`w-full font-bold py-2 px-4 rounded-xl border text-xs transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    pkg.isPopular
                      ? 'border-white/30 text-white hover:bg-white/10'
                      : 'border-outline-variant text-on-surface-variant hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span>Ver Ficha Técnica</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Intelligent Recommendation Calculator (Stepped Toggles) */}
        <div id="calculadora-inteligente" className="pricing-calculator-card bg-white dark:bg-slate-850 rounded-3xl p-8 md:p-12 shadow-xl border border-outline-variant/15 dark:border-slate-700/50 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Configurator Steps (7 columns) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              <div className="border-b border-outline-variant/10 dark:border-slate-700/50 pb-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed dark:bg-slate-800 text-primary dark:text-secondary-container text-sm font-bold tracking-wider mb-3">
                  <span className="material-symbols-outlined text-sm">settings_suggest</span>
                  COTIZACIÓN INTELIGENTE
                </div>
                <h3 className="font-headline-md text-2xl font-extrabold text-on-surface dark:text-white tracking-tight">
                  Configura tus Requerimientos
                </h3>
                <p className="text-sm text-on-surface-variant dark:text-slate-400 mt-2 leading-relaxed">
                  Responde a las siguientes opciones y nuestro sistema detectará el plan que mejor optimiza tu inversión y se adapta a tus necesidades operativas.
                </p>
              </div>

              {/* STEP 1: PROJECT FOCUS */}
              <fieldset className="flex flex-col gap-4 mb-8">
                <legend className="font-bold text-base text-on-surface dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary dark:bg-secondary-container text-white dark:text-slate-900 text-sm font-black flex items-center justify-center select-none shrink-0">1</span>
                  ¿Cuál es el enfoque principal de tu proyecto?
                </legend>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'basic', title: 'Informativo', desc: 'Presencia básica, marca, servicios y contacto.' },
                    { key: 'growth', title: 'Crecimiento', desc: 'Registro de usuarios, newsletter e interactividad.' },
                    { key: 'advanced', title: 'Transaccional', desc: 'Venta en línea, cobros o educación virtual.' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setProjectFocus(opt.key)}
                      type="button"
                      role="radio"
                      aria-checked={projectFocus === opt.key}
                      className={`p-5 rounded-2xl border text-left flex flex-col gap-2 transition-all duration-300 hover:scale-101 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        projectFocus === opt.key
                          ? 'border-primary dark:border-secondary-container bg-primary/5 dark:bg-secondary-container/5 shadow-xs'
                          : 'border-outline-variant/15 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-sm text-on-surface dark:text-white">{opt.title}</span>
                        {projectFocus === opt.key && (
                          <span className="material-symbols-outlined text-lg font-bold text-primary dark:text-secondary-container select-none">check_circle</span>
                        )}
                      </div>
                      <span className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed font-medium">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* STEP 2: CORPORATE EMAILS */}
              <fieldset className="flex flex-col gap-4 mb-8">
                <legend className="font-bold text-base text-on-surface dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary dark:bg-secondary-container text-white dark:text-slate-900 text-sm font-black flex items-center justify-center select-none shrink-0">2</span>
                  ¿Cuántas cuentas de correo corporativo requieres?
                </legend>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { val: '10', label: 'Hasta 10', detail: 'Incluido en MY WEB' },
                    { val: '20', label: 'Hasta 20', detail: 'Interpreneur' },
                    { val: '50', label: 'Hasta 50', detail: 'Plan Unlimited' },
                    { val: '50+', label: 'Más de 50', detail: 'Plan Personalizado' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setEmails(opt.val)}
                      type="button"
                      role="radio"
                      aria-checked={emails === opt.val}
                      className={`py-4 px-3 rounded-2xl border text-center flex flex-col gap-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        emails === opt.val
                          ? 'border-primary dark:border-secondary-container bg-primary/5 dark:bg-secondary-container/5'
                          : 'border-outline-variant/15 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      <span className="font-bold text-sm text-on-surface dark:text-white">{opt.label}</span>
                      <span className="text-xs text-on-surface-variant dark:text-slate-400 font-semibold">{opt.detail}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* STEP 3: SPECIFIC FEATURES */}
              <fieldset className="flex flex-col gap-4 mb-8">
                <legend className="font-bold text-base text-on-surface dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary dark:bg-secondary-container text-white dark:text-slate-900 text-sm font-black flex items-center justify-center select-none shrink-0">3</span>
                  ¿Qué funciones especiales necesitas en tu sitio?
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'shoppingCart', label: 'Carrito de Compras', icon: 'shopping_cart', category: 'unlimited', desc: 'Permite seleccionar múltiples productos.' },
                    { key: 'onlinePayments', label: 'Pagos en Línea', icon: 'payments', category: 'unlimited', desc: 'Cobros seguros con tarjeta/PayPal.' },
                    { key: 'moodle', label: 'Soporte Moodle (Cursos)', icon: 'school', category: 'unlimited', desc: 'Gestión y enlace de aulas virtuales.' },
                    { key: 'userRegistration', label: 'Registro de Usuarios', icon: 'group', category: 'interpreneur', desc: 'Perfiles de clientes o accesos restringidos.' },
                    { key: 'newsletters', label: 'Boletines (Newsletters)', icon: 'campaign', category: 'interpreneur', desc: 'Captación de suscriptores por boletín.' },
                    { key: 'customModules', label: 'Módulos a la Medida', icon: 'extension', category: 'interpreneur', desc: 'Programación de funciones especiales.' }
                  ].map(feature => (
                    <button
                      key={feature.key}
                      onClick={() => handleFeatureToggle(feature.key)}
                      type="button"
                      role="checkbox"
                      aria-checked={features[feature.key]}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        features[feature.key]
                          ? 'border-primary dark:border-secondary-container bg-primary/5 dark:bg-secondary-container/5 shadow-xs'
                          : 'border-outline-variant/15 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        features[feature.key]
                          ? 'bg-primary text-white border-transparent dark:bg-secondary-container dark:text-slate-900'
                          : 'bg-slate-50 dark:bg-slate-800 text-on-surface-variant border-outline-variant/15 dark:border-slate-700/30'
                      }`}>
                        <span className="material-symbols-outlined text-lg select-none">{feature.icon}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-on-surface dark:text-white flex items-center gap-2">
                          {feature.label}
                          {feature.category === 'unlimited' && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 uppercase font-black">Unlimited</span>
                          )}
                        </span>
                        <span className="text-xs text-on-surface-variant dark:text-slate-400 font-medium leading-normal">{feature.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Right Column: Recommendation Preview (5 columns) */}
            <div className="lg:col-span-5 flex flex-col h-full min-h-[420px]">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-10 rounded-3xl border border-outline-variant/15 dark:border-slate-700/50 flex flex-col justify-between items-center text-center h-full relative overflow-hidden group">
                
                {/* Decorative glow */}
                <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${recommendedPkg.color}`} />
                
                <div className="w-full flex flex-col items-center z-10">
                  <span className="text-xs font-black text-primary dark:text-secondary-container uppercase tracking-widest bg-primary/10 dark:bg-secondary-container/10 px-4 py-1.5 rounded-full mb-6">
                    Tu Plan Recomendado
                  </span>

                  <span className="text-sm font-bold text-emerald-500 flex items-center gap-1.5 mb-3">
                    <span className="material-symbols-outlined text-lg font-bold">verified</span>
                    100% COMPATIBLE
                  </span>

                  {/* Dynamic Package Name */}
                  <h4 className="text-3xl font-black tracking-tight text-on-surface dark:text-white mb-3 uppercase">
                    {recommendedPkg.name}
                  </h4>

                  <p className="text-sm text-on-surface-variant dark:text-slate-300 max-w-xs mb-6 font-medium italic leading-relaxed">
                    "{recommendedPkg.focus}"
                  </p>

                  {/* Recommendation Price */}
                  <div className="bg-white dark:bg-slate-800 border border-outline-variant/10 dark:border-slate-700/50 px-8 py-5 rounded-2xl w-full flex flex-col gap-1.5 items-center shadow-xs">
                    <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">Inversión Estimada</span>
                    <div className="flex items-baseline gap-0.5 text-on-surface dark:text-white">
                      {recommendedPkg.id !== 'custom' && <span className="text-xl font-bold">$</span>}
                      <span className="text-3xl font-black tracking-tight">{recommendedPkg.price}</span>
                      {recommendedPkg.id !== 'custom' && <span className="text-xs font-bold ml-1.5 text-on-surface-variant dark:text-slate-400">MXN (+ IVA)</span>}
                    </div>
                    {recommendedPkg.id !== 'custom' && (
                      <span className="text-xs font-semibold text-on-surface-variant dark:text-slate-400 flex items-center gap-1 mt-1.5 border-t border-slate-100 dark:border-slate-700/50 w-full pt-2 justify-center">
                        <span className="material-symbols-outlined text-sm select-none">cached</span>
                        Renovación: <strong>${recommendedPkg.renewal} MXN</strong>
                      </span>
                    )}
                  </div>

                  {/* Detailed logic summary */}
                  <p className="text-sm text-on-surface-variant dark:text-slate-400 mt-6 leading-relaxed max-w-[280px] font-medium border-t border-slate-200/50 dark:border-slate-700/50 pt-4">
                    {getRecommendationReason(recommendedPkg.id)}
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full mt-8 z-10">
                  <button 
                    onClick={() => handleSelectPackage(recommendedPkg)}
                    className="bg-primary hover:bg-primary-container dark:bg-secondary-container dark:text-slate-900 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 hover:scale-102 shadow-md w-full text-sm flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <span>Solicitar Cotización Formal</span>
                    <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                  </button>

                  <button 
                    onClick={() => setActiveModalPackage(recommendedPkg)}
                    className="bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/50 border border-outline-variant/35 dark:border-slate-700 text-on-surface dark:text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 w-full text-sm flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <span className="material-symbols-outlined text-sm">info</span>
                    <span>Ver Detalles Completos</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Premium Technical Details Modal (Glassmorphism Overlay) */}
      {activeModalPackage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in-up"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalPackage(null);
          }}
        >
          <div 
            className="relative glass-card text-on-surface dark:text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-fade-in-up border border-white/20 dark:border-white/5"
            style={{ animationDuration: '250ms' }}
          >
            {/* Modal Header Banner */}
            <div className={`p-6 sm:p-8 bg-gradient-to-r ${activeModalPackage.color} text-white flex flex-col justify-between relative`}>
              <button 
                onClick={() => setActiveModalPackage(null)}
                aria-label="Cerrar modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                <span className="material-symbols-outlined text-lg select-none font-bold">close</span>
              </button>
              
              <div className="flex items-center gap-1.5 mb-3">
                <span className="material-symbols-outlined text-sm font-bold text-white select-none">verified</span>
                <span className="text-xs font-black uppercase tracking-wider text-white/90">Ficha Técnica Oficial</span>
              </div>
              <h3 id="modal-title" className="font-headline-md text-3xl font-black tracking-tight mb-3 uppercase">
                PAQUETE {activeModalPackage.name}
              </h3>
              <p className="text-sm text-white/95 max-w-md font-medium leading-relaxed italic">
                "{activeModalPackage.focus}"
              </p>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 scrollbar-thin max-h-[calc(85vh-160px)] bg-slate-50 dark:bg-slate-900">
              
              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Row 1: Costo & Renovacion */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-outline-variant/10 dark:border-slate-700/50">
                  <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest block mb-2">Inversión Inicial</span>
                  <div className="flex items-baseline gap-0.5 text-primary dark:text-secondary-container">
                    {activeModalPackage.id !== 'custom' && <span className="text-lg font-bold">$</span>}
                    <span className="text-2xl font-black">{activeModalPackage.price}</span>
                    {activeModalPackage.id !== 'custom' && <span className="text-xs font-bold ml-1.5 opacity-90 text-on-surface-variant dark:text-slate-400">MXN (+ IVA)</span>}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-outline-variant/10 dark:border-slate-700/50">
                  <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest block mb-2">Renovación Anual</span>
                  <div className="flex items-baseline gap-0.5 text-on-surface dark:text-white">
                    {activeModalPackage.id !== 'custom' && <span className="text-lg font-bold">$</span>}
                    <span className="text-2xl font-black">{activeModalPackage.renewal}</span>
                    {activeModalPackage.id !== 'custom' && <span className="text-xs font-bold ml-1.5 opacity-90 text-on-surface-variant dark:text-slate-400">MXN (+ IVA)</span>}
                  </div>
                </div>

                {/* Row 2: Correos & Dominio */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-outline-variant/10 dark:border-slate-700/50">
                  <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest block mb-2">Cuentas de Correo</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-secondary-container select-none text-xl">mail</span>
                    <span className="text-sm font-bold text-on-surface dark:text-white">{activeModalPackage.emails}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-outline-variant/10 dark:border-slate-700/50">
                  <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest block mb-2">Alojamiento y Dominio</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-secondary-container select-none text-xl">dns</span>
                    <span className="text-sm font-bold text-on-surface dark:text-white leading-normal truncate" title={activeModalPackage.domainAndHost}>
                      {activeModalPackage.domainAndHost}
                    </span>
                  </div>
                </div>

                {/* Row 3: Vigencia & Soporte */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-outline-variant/10 dark:border-slate-700/50">
                  <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest block mb-2">Vigencia del Servicio</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-secondary-container select-none text-xl">calendar_today</span>
                    <span className="text-sm font-bold text-on-surface dark:text-white">{activeModalPackage.validity}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-outline-variant/10 dark:border-slate-700/50">
                  <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest block mb-2">Soporte y Capacitación</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-secondary-container select-none text-xl">support_agent</span>
                    <span className="text-sm font-bold text-on-surface dark:text-white leading-normal truncate" title={activeModalPackage.support}>
                      {activeModalPackage.support}
                    </span>
                  </div>
                </div>
              </div>

              {/* Web Functions Detailed */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-on-surface dark:text-white uppercase tracking-wider border-b border-outline-variant/15 dark:border-slate-700/50 pb-2">
                  Funciones Web Incluidas
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeModalPackage.functions.map((func, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs font-semibold">
                      <span className="material-symbols-outlined text-emerald-500 shrink-0 select-none text-lg">check_circle</span>
                      <span className="text-on-surface-variant dark:text-slate-300 leading-normal">{func}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Special Features Detailed */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-on-surface dark:text-white uppercase tracking-wider border-b border-outline-variant/15 dark:border-slate-700/50 pb-2">
                  Módulos y Especiales Incluidos
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeModalPackage.specials.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2.5 text-xs font-semibold">
                      <span className="material-symbols-outlined text-emerald-500 shrink-0 select-none text-lg">check_circle</span>
                      <span className="text-on-surface-variant dark:text-slate-300 leading-normal">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Success Client Cases Examples */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-outline-variant/10 dark:border-slate-700/50">
                <span className="text-[10px] font-black text-text-muted dark:text-slate-400 uppercase tracking-widest block mb-4">Casos de Éxito y Ejemplos de Clientes</span>
                <div className="flex flex-col gap-2.5">
                  {activeModalPackage.examples.map((example, eIdx) => {
                    const linkedProject = findProject(example);
                    return linkedProject ? (
                      <a
                        key={eIdx}
                        href="#portafolio"
                        onClick={() => setActiveModalPackage(null)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-outline-variant/15 dark:border-slate-700/50 hover:border-primary/30 dark:hover:border-slate-600 hover:shadow-md transition-all duration-200 group/client"
                      >
                        <img
                          src={linkedProject.image}
                          alt={linkedProject.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-outline-variant/10 dark:border-slate-700/30 shadow-sm group-hover/client:scale-105 transition-transform duration-200"
                          width="48" height="48" loading="lazy" decoding="async"
                        />
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-xs font-bold text-on-surface dark:text-white truncate group-hover/client:text-primary dark:group-hover/client:text-secondary-container transition-colors">
                            {linkedProject.title}
                          </span>
                          <span className="text-[10px] text-text-muted dark:text-slate-400 font-medium truncate">
                            {linkedProject.category}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-sm ml-auto shrink-0 text-text-muted dark:text-slate-500 group-hover/client:text-primary dark:group-hover/client:text-secondary-container transition-colors" aria-hidden="true">arrow_forward</span>
                      </a>
                    ) : (
                      <div
                        key={eIdx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-outline-variant/15 dark:border-slate-700/50 text-xs font-bold"
                      >
                        <span className="w-3 h-3 rounded-full bg-primary/30 dark:bg-secondary-container/30 shrink-0" />
                        <span className="text-on-surface-variant dark:text-slate-300 font-bold">{example}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-6 bg-white dark:bg-slate-850 border-t border-outline-variant/15 dark:border-slate-700/50 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleSelectPackage(activeModalPackage)}
                className="flex-1 bg-primary hover:bg-primary-container dark:bg-secondary-container dark:text-slate-900 text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-102 flex items-center justify-center gap-1.5 text-xs shadow-md"
              >
                <span>Solicitar Este Paquete</span>
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </button>
              
              <button 
                onClick={() => setActiveModalPackage(null)}
                className="px-6 py-3.5 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/40 text-xs"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
