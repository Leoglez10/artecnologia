import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const featureList = [
  { 
    name: 'Calidad', 
    icon: 'verified', 
    color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10',
    accentColor: '#10b981',
    description: 'Código optimizado para un rendimiento perfecto. Páginas veloces que deleitan a tus clientes y escalan en buscadores.'
  },
  { 
    name: 'E-mail', 
    icon: 'mail', 
    color: 'text-blue-500 border-blue-500/20 bg-blue-500/10',
    accentColor: '#3b82f6',
    description: 'Buzón de correos corporativos estables y con dominio propio para proyectar el máximo nivel de profesionalismo.'
  },
  { 
    name: 'Estadísticas', 
    icon: 'pie_chart', 
    color: 'text-amber-500 border-amber-500/20 bg-amber-500/10',
    accentColor: '#f59e0b',
    description: 'Analíticas avanzadas e integración de datos para entender y auditar el comportamiento de tus visitantes.'
  },
  { 
    name: 'Galerías', 
    icon: 'photo_library', 
    color: 'text-indigo-500 border-indigo-500/20 bg-indigo-500/10',
    accentColor: '#6366f1',
    description: 'Visualización impecable de tus productos, catálogos o proyectos en cuadrículas fluidas adaptadas a móviles.'
  },
  { 
    name: 'E-commerce', 
    icon: 'shopping_cart', 
    color: 'text-purple-500 border-purple-500/20 bg-purple-500/10',
    accentColor: '#8b5cf6',
    description: 'Pasarelas de pago blindadas y carritos dinámicos para transaccionar y vender las 24 horas del día.'
  },
  { 
    name: 'HTML 5', 
    icon: 'html', 
    color: 'text-orange-500 border-orange-500/20 bg-orange-500/10',
    accentColor: '#f97316',
    description: 'Estructuras semánticas modernas y adaptativas de última generación bajo las mejores prácticas globales.'
  },
  { 
    name: 'Seguridad', 
    icon: 'lock', 
    color: 'text-red-500 border-red-500/20 bg-red-500/10',
    accentColor: '#ef4444',
    description: 'Certificados de seguridad SSL, blindaje cibernético y prevención activa contra ataques y robo de datos.'
  },
  { 
    name: 'Ventas', 
    icon: 'point_of_sale', 
    color: 'text-teal-500 border-teal-500/20 bg-teal-500/10',
    accentColor: '#14b8a6',
    description: 'Plataformas optimizadas para convertir visitas sencillas en clientes recurrentes incrementando tu conversión.'
  },
  { 
    name: 'Equipo', 
    icon: 'groups', 
    color: 'text-cyan-500 border-cyan-500/20 bg-cyan-500/10',
    accentColor: '#06b6d4',
    description: 'Canales de soporte directo, asesorías personalizadas y capacitación digital para todo tu personal.'
  },
  { 
    name: 'Publicidad', 
    icon: 'campaign', 
    color: 'text-pink-500 border-pink-500/20 bg-pink-500/10',
    accentColor: '#ec4899',
    description: 'Integraciones óptimas con Facebook Pixel, Google Ads y redes sociales para maximizar el retorno de tu inversión.'
  }
];

export default function Features() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Chassis viewport states
  const [isMobileView, setIsMobileView] = useState(false);
  const [typedUrl, setTypedUrl] = useState('');

  // States for specific interactive mockups
  const [cartCount, setCartCount] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [liveBalance, setLiveBalance] = useState(24950);
  const [supportChat, setSupportChat] = useState([
    { role: 'support', text: '¡Hola! ¿Cómo podemos acelerar el crecimiento de tu negocio digital hoy?' }
  ]);
  const [supportMessage, setSupportMessage] = useState('');
  const [emailsReceived, setEmailsReceived] = useState([
    { id: 1, sender: 'ventas@tudominio.com', subject: '¡Nuevo pedido recibido! (#40129)', time: 'Hace 1 min' },
    { id: 2, sender: 'cliente@gmail.com', subject: 'Pregunta sobre cotización de catálogo', time: 'Hace 5 min' }
  ]);
  const [gallerySlide, setGallerySlide] = useState(0);

  // New interactive flows states
  const [speedTestState, setSpeedTestState] = useState('idle'); // 'idle', 'testing', 'completed'
  const [speedScores, setSpeedScores] = useState({ perf: 0, acc: 0, bp: 0, seo: 0 });
  
  const [securityScanState, setSecurityScanState] = useState('idle'); // 'idle', 'scanning', 'secure'
  const [scanProgress, setScanProgress] = useState(0);

  const [codeCompiled, setCodeCompiled] = useState(false);
  const [compilingCode, setCompilingCode] = useState(false);

  // GSAP Entry Animations
  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set('.features-title-anim', { opacity: 0, y: 35 });
    gsap.set('.features-grid-anim', { opacity: 0, x: -30 });
    gsap.set('.features-canvas-anim', { opacity: 0, scale: 0.96 });

    gsap.to('.features-title-anim', {
      opacity: 1, y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    gsap.to('.features-grid-anim', {
      opacity: 1, x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.features-main-layout',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    gsap.to('.features-canvas-anim', {
      opacity: 1, scale: 1,
      duration: 0.9,
      ease: 'back.out(1.1)',
      scrollTrigger: {
        trigger: '.features-main-layout',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }, { scope: containerRef });

  // Autocomplete typing URL effect
  useEffect(() => {
    const slug = featureList[activeIndex].name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    const targetUrl = `artecnologia.digital/${slug}`;
    
    let i = 0;
    setTypedUrl('');
    const interval = setInterval(() => {
      setTypedUrl((prev) => targetUrl.substring(0, prev.length + 1));
      i++;
      if (i >= targetUrl.length) clearInterval(interval);
    }, 35);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Autoplay mini slides in Galleries Mockup
  useEffect(() => {
    if (activeIndex !== 3) return undefined;
    const interval = setInterval(() => {
      setGallerySlide(prev => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Simulate emails arriving
  useEffect(() => {
    if (activeIndex !== 1) return undefined;
    const interval = setInterval(() => {
      const senders = ['ventas@tudominio.com', 'contacto@tudominio.com', 'leads@facebook.com', 'stripe@pagos.com'];
      const subjects = [
        '¡Nueva suscripción al boletín!',
        'Consulta de servicios profesionales',
        'Pago exitoso registrado: $4,500 MXN',
        'Mensaje recibido desde el formulario'
      ];
      const randomSender = senders[Math.floor(Math.random() * senders.length)];
      const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
      setEmailsReceived(prev => [
        { id: Date.now(), sender: randomSender, subject: randomSubject, time: 'Ahora mismo' },
        ...prev.slice(0, 3)
      ]);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Ticker for financial growth
  useEffect(() => {
    if (activeIndex !== 7) return undefined;
    const interval = setInterval(() => {
      setLiveBalance(prev => prev + Math.floor(Math.random() * 8) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Reset interactive flows when changing index
  useEffect(() => {
    setSpeedTestState('idle');
    setSpeedScores({ perf: 0, acc: 0, bp: 0, seo: 0 });
    setSecurityScanState('idle');
    setScanProgress(0);
    setCodeCompiled(false);
    setCompilingCode(false);
  }, [activeIndex]);

  // Interactive flow triggers
  const startSpeedTest = () => {
    if (speedTestState === 'testing') return;
    setSpeedTestState('testing');
    setSpeedScores({ perf: 0, acc: 0, bp: 0, seo: 0 });
    
    let score = 0;
    const interval = setInterval(() => {
      score += 4;
      if (score >= 100) {
        score = 100;
        clearInterval(interval);
        setSpeedTestState('completed');
      }
      setSpeedScores({
        perf: score,
        acc: Math.min(100, Math.floor(score * 1.01)),
        bp: Math.min(100, Math.floor(score * 0.99)),
        seo: Math.min(100, Math.floor(score * 1.03))
      });
    }, 55);
  };

  const startSecurityScan = () => {
    if (securityScanState === 'scanning') return;
    setSecurityScanState('scanning');
    setScanProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setSecurityScanState('secure');
      }
    }, 90);
  };

  const compileJSXCode = () => {
    setCompilingCode(true);
    setTimeout(() => {
      setCompilingCode(false);
      setCodeCompiled(true);
    }, 1300);
  };

  // Handle support message submission
  const handleSupportSend = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;

    const userMsg = { role: 'user', text: supportMessage };
    setSupportChat(prev => [...prev, userMsg]);
    setSupportMessage('');

    setTimeout(() => {
      const supportReplies = [
        '¡Con gusto! Todos nuestros planes incluyen soporte prioritario 24/7.',
        'Excelente pregunta. Nuestro equipo de ingenieros te asistirá en menos de 15 minutos.',
        'Claro que sí, nos encargamos de todo el despliegue técnico por ti.',
        '¡Por supuesto! Estaremos encantados de platicar todos los detalles sobre tu proyecto.'
      ];
      const reply = supportReplies[Math.floor(Math.random() * supportReplies.length)];
      setSupportChat(prev => [...prev, { role: 'support', text: reply }]);
    }, 800);
  };

  const handleAddToCart = () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    setCartCount(prev => prev + 1);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  // Renders the specific interactive mockup based on active index
  const renderMockup = () => {
    switch (activeIndex) {
      case 0: // Calidad - Lighthouse Performance Speed Test
        return (
          <div className="flex flex-col h-full justify-between p-6 min-h-[300px]">
            {speedTestState === 'idle' && (
              <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center my-auto">
                <span className="material-symbols-outlined text-emerald-500 text-5xl animate-pulse">speed</span>
                <div>
                  <h5 className="font-bold text-white text-sm">Simulador de Auditoría de Carga</h5>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-[280px]">Prueba y audita el rendimiento Web Core Vitals bajo los estándares más estrictos de Google Lighthouse.</p>
                </div>
                <button
                  onClick={startSpeedTest}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  EJECUTAR TEST DE VELOCIDAD
                </button>
              </div>
            )}

            {speedTestState === 'testing' && (
              <div className="flex-grow flex flex-col items-center justify-center gap-4 my-auto">
                <span className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                <div className="text-center">
                  <p className="text-xs text-white font-bold animate-pulse">Analizando estructura de código...</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">Carga optimizada de imágenes WebP en menos de 0.8s</p>
                </div>
              </div>
            )}

            {(speedTestState === 'testing' || speedTestState === 'completed') && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto py-2">
                {[
                  { label: 'Rendimiento', value: speedScores.perf, color: 'stroke-emerald-500 text-emerald-400' },
                  { label: 'Accesibilidad', value: speedScores.acc, color: 'stroke-emerald-500 text-emerald-400' },
                  { label: 'Prácticas', value: speedScores.bp, color: 'stroke-emerald-500 text-emerald-400' },
                  { label: 'SEO', value: speedScores.seo, color: 'stroke-emerald-500 text-emerald-400' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="26" className="stroke-white/5 fill-transparent" strokeWidth="5" />
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="26" 
                          className={`${item.color} fill-transparent transition-all duration-300`} 
                          strokeWidth="5" 
                          strokeDasharray="163" 
                          strokeDashoffset={163 - (item.value / 100) * 163} 
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-black text-sm text-white">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            {speedTestState === 'completed' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-3 animate-fade-in-up mt-auto">
                <span className="material-symbols-outlined text-emerald-400 font-bold shrink-0">verified</span>
                <div className="min-w-0">
                  <p className="text-[11px] text-emerald-200 font-bold leading-none">Sitio web 100% Excelente</p>
                  <p className="text-[9px] text-emerald-300 mt-1 truncate">Tiempo de carga FCP de 0.6s. Cero saltos CLS.</p>
                </div>
                <button 
                  onClick={startSpeedTest}
                  className="ml-auto text-[9px] font-black text-white bg-emerald-600/30 hover:bg-emerald-600/50 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 transition-all cursor-pointer"
                >
                  Reiniciar
                </button>
              </div>
            )}
          </div>
        );

      case 1: // E-mail - Inbox simulator
        return (
          <div className="flex flex-col h-full p-6 justify-between min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-400">mail</span>
                <span className="text-xs font-bold text-slate-200">contacto@minegocio.com</span>
              </div>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[10px] font-black uppercase tracking-wider animate-pulse">Bandeja de Entrada</span>
            </div>

            <div className="flex-grow flex flex-col gap-3 my-4 overflow-hidden max-h-[190px]">
              {emailsReceived.map((email) => (
                <div 
                  key={email.id}
                  className="p-3 bg-white/5 border border-white/5 hover:border-blue-500/20 rounded-xl flex items-center justify-between gap-4 animate-fade-in-up duration-300 cursor-pointer group/mail"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 group-hover/mail:scale-125 transition-transform" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{email.sender}</p>
                      <p className="text-[11px] text-slate-300 truncate">{email.subject}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase">{email.time}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl flex items-center gap-3 mt-auto shrink-0">
              <span className="material-symbols-outlined text-blue-400">alternate_email</span>
              <span className="text-xs text-blue-200 font-medium leading-relaxed">Conexión IMAP/SMTP cifrada para envíos y recepciones 100% seguras.</span>
            </div>
          </div>
        );

      case 2: // Estadísticas - Traffic Line Chart
        return (
          <div className="flex flex-col h-full p-6 justify-between min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-lg">trending_up</span>
                <span className="text-xs font-bold text-slate-200">TRÁFICO WEB Y CONVERSIONES</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs font-black animate-bounce">arrow_upward</span>
                +324% Crecimiento
              </span>
            </div>

            {/* SVG Line Chart */}
            <div className="relative h-28 my-auto flex items-end">
              <svg className="w-full h-20 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area under curve */}
                <path d="M0 30 Q15 25 30 18 T60 10 T90 2 L100 2 L100 30 Z" fill="url(#chartGlow)" />
                {/* Curved line */}
                <path 
                  d="M0 30 Q15 25 30 18 T60 10 T90 2" 
                  fill="transparent" 
                  stroke="#f59e0b" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                {/* Pulsing indicator */}
                <circle cx="90" cy="2" r="2.5" fill="#f59e0b" className="animate-ping" />
                <circle cx="90" cy="2" r="1.5" fill="#ffffff" />
              </svg>
              
              {/* Floating metrics labels */}
              <div className="absolute top-1 left-2 bg-slate-900/80 border border-white/10 px-2 py-1 rounded text-[9px] font-bold text-slate-300">
                12.4k Visitas
              </div>
              <div className="absolute bottom-6 right-8 bg-slate-900/80 border border-white/10 px-2 py-1 rounded text-[9px] font-bold text-slate-300">
                Calculando ROI...
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-white/5 shrink-0">
              {[
                { val: '4.8s', label: 'T. Permanencia' },
                { val: '86%', label: 'Crecim. Orgánico' },
                { val: '12.6%', label: 'Conversión' }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xs font-black text-white">{stat.val}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Galerías - Mini Auto Slider
        return (
          <div className="flex flex-col h-full justify-between p-6 min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <span className="text-xs font-bold text-slate-200">PORTAFOLIO EN VIVO</span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((idx) => (
                  <span 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${gallerySlide === idx ? 'bg-indigo-500 w-4' : 'bg-white/20'}`} 
                  />
                ))}
              </div>
            </div>

            <div className="my-auto py-2 aspect-video rounded-xl overflow-hidden relative shadow-lg border border-white/10 group max-h-[170px]">
              {[
                { title: 'Inmobiliaria Premium', category: 'Corporativo', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=480&q=80' },
                { title: 'E-commerce Cosmética', category: 'Tienda en Línea', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=480&q=80' },
                { title: 'Plataforma Deportiva', category: 'Aplicación Web', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=480&q=80' }
              ].map((slide, idx) => (
                <div 
                  key={idx} 
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out flex flex-col justify-end p-4 ${
                    gallerySlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <img src={slide.img} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="relative z-10 text-left">
                    <span className="px-2 py-0.5 bg-indigo-500 text-white rounded text-[8px] font-black uppercase tracking-wider">
                      {slide.category}
                    </span>
                    <h5 className="font-bold text-white text-sm mt-1">{slide.title}</h5>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-[10px] text-slate-400 font-bold uppercase mt-auto shrink-0">
              Galerías auto-adaptativas optimizadas para WebP de bajo peso.
            </div>
          </div>
        );

      case 4: // E-commerce - Clickable Shopping Cart Simulator
        return (
          <div className="flex flex-col h-full justify-between p-6 min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <span className="text-xs font-bold text-slate-200">DEMO DE TIENDA ACTIVA</span>
              <div className="relative flex items-center bg-white/5 border border-white/10 px-3 py-1 rounded-xl gap-2">
                <span className="material-symbols-outlined text-purple-400 text-base">shopping_cart</span>
                <span className={`text-xs font-black text-white transition-all ${isAddingToCart ? 'scale-150 text-purple-300' : ''}`}>
                  {cartCount}
                </span>
                {isAddingToCart && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-purple-500 rounded-full text-[9px] font-black flex items-center justify-center animate-ping text-white">+1</span>
                )}
              </div>
            </div>

            {/* Micro e-commerce Card */}
            <div className="my-auto py-2 bg-slate-900 border border-white/10 rounded-2xl p-4 flex gap-4 max-w-sm mx-auto shadow-md">
              <div className="w-16 h-16 rounded-xl bg-purple-500/10 border border-purple-500/20 shrink-0 flex items-center justify-center relative overflow-hidden group">
                <span className="material-symbols-outlined text-purple-400 text-2xl group-hover:scale-110 transition-transform">phone_iphone</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
              </div>
              <div className="flex flex-col justify-between flex-grow min-w-0 text-left">
                <div>
                  <h5 className="font-bold text-xs text-white truncate">Smartphone X-Pro</h5>
                  <p className="text-[10px] text-slate-400">128GB - Envío Gratis</p>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <span className="font-black text-xs text-white">$14,999</span>
                  <button 
                    onClick={handleAddToCart}
                    className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-[9px] font-black px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    {isAddingToCart ? 'Agregando...' : 'Añadir al Carrito'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 p-2.5 rounded-xl text-center text-xs text-purple-200 font-medium mt-auto shrink-0">
              Conexión directa con Stripe y PayPal. ¡Prueba dando clic en añadir!
            </div>
          </div>
        );

      case 5: // HTML 5 - Live IDE Typewriter compiler
        return (
          <div className="flex flex-col h-full justify-between p-6 min-h-[300px]">
            {compilingCode && (
              <div className="flex-grow flex flex-col items-center justify-center gap-4 my-auto">
                <span className="w-8 h-8 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                <div className="text-center">
                  <p className="text-xs text-white font-bold animate-pulse">Compilando componentes reactivos...</p>
                  <p className="text-[10px] text-slate-500 font-mono">Babel / React 19 Engine</p>
                </div>
              </div>
            )}

            {!codeCompiled && !compilingCode && (
              <>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-500 text-sm">code</span>
                    <span className="text-xs font-bold text-slate-300">src/components/InteractiveApp.jsx</span>
                  </div>
                  <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">JSX / ES6</span>
                </div>

                <div className="my-auto py-2 bg-slate-950 rounded-xl p-4 font-mono text-[9px] text-left text-slate-300 overflow-hidden leading-relaxed max-h-[150px] shadow-inner relative select-none">
                  <div className="absolute top-2 right-2 bg-white/5 px-2 py-0.5 rounded text-[8px] font-bold text-slate-500">React 19</div>
                  
                  <p className="text-purple-400"><span className="text-blue-400">const</span> <span className="text-yellow-400">ArtecnologiaComponent</span> = () =&gt; &#123;</p>
                  <p className="pl-3 text-purple-400"><span className="text-blue-400">return</span> (</p>
                  <p className="pl-6 text-slate-400">&lt;<span className="text-teal-400">section</span> <span className="text-yellow-300">className</span>=<span className="text-orange-300">"py-20 responsive"</span>&gt;</p>
                  <p className="pl-9 text-slate-400">&lt;<span className="text-teal-400">h1</span> <span className="text-yellow-300">className</span>=<span className="text-orange-300">"text-bold text-white font-headline"</span>&gt;</p>
                  <p className="pl-12 text-white font-bold leading-normal">
                    Impulsa tu presencia digital hoy
                    <span className="inline-block w-1.5 h-3.5 bg-orange-500 ml-1 animate-pulse" />
                  </p>
                  <p className="pl-9 text-slate-400">&lt;/<span className="text-teal-400">h1</span>&gt;</p>
                  <p className="pl-6 text-slate-400">&lt;/<span className="text-teal-400">section</span>&gt;</p>
                  <p className="pl-3 text-purple-400">);</p>
                  <p className="text-purple-400">&#125;;</p>
                </div>

                <button
                  onClick={compileJSXCode}
                  className="bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-[10px] font-black px-4 py-2 rounded-xl transition-all cursor-pointer mt-2 mx-auto shrink-0 shadow-md"
                >
                  EJECUTAR CÓDIGO (COMPILAR)
                </button>
              </>
            )}

            {codeCompiled && !compilingCode && (
              <div className="flex-grow flex flex-col justify-between items-center text-center my-auto animate-fade-in-up">
                <span className="material-symbols-outlined text-orange-500 text-5xl">deployed_code</span>
                <div>
                  <h5 className="font-bold text-white text-sm">Compilación Exitosa</h5>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-[300px]">El componente web reactivo ya se encuentra activo y listo en el servidor de producción.</p>
                </div>
                
                {/* Visual result demonstration */}
                <div className="bg-slate-900 border border-orange-500/20 p-3 rounded-2xl w-full max-w-xs mt-3 flex items-center justify-between gap-4 shadow-md">
                  <span className="text-[10px] font-bold text-white text-left tracking-tight">Impulsa tu presencia digital hoy</span>
                  <button className="bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[8px] font-black px-2 py-1 rounded-md animate-pulse">
                    Botón Activo
                  </button>
                </div>

                <button 
                  onClick={() => setCodeCompiled(false)}
                  className="text-[9px] font-black text-slate-300 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer mt-4"
                >
                  Ver Código Fuente
                </button>
              </div>
            )}
          </div>
        );

      case 6: // Seguridad - Animated Rotating Cyber Shield
        return (
          <div className="flex flex-col h-full justify-between p-6 min-h-[300px]">
            {securityScanState === 'idle' && (
              <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center my-auto">
                <span className="material-symbols-outlined text-red-500 text-5xl animate-pulse">shield</span>
                <div>
                  <h5 className="font-bold text-white text-sm">Escáner de Seguridad Web</h5>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-[280px]">Realiza una auditoría completa del entorno de seguridad, certificados SSL y mitigación DDoS activa.</p>
                </div>
                <button
                  onClick={startSecurityScan}
                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  EJECUTAR ESCÁNER
                </button>
              </div>
            )}

            {securityScanState === 'scanning' && (
              <div className="flex-grow flex flex-col items-center justify-center gap-3 my-auto relative overflow-hidden">
                {/* Horizontal scan laser */}
                <div className="absolute left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_#ef4444] animate-bounce z-20" />
                <span className="material-symbols-outlined text-red-500 text-4xl animate-pulse">lock</span>
                <div className="text-center w-full max-w-[180px]">
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-red-600 transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                  </div>
                  <p className="text-[9px] text-slate-400 mt-2 font-mono">Buscando vulnerabilidades... {scanProgress}%</p>
                </div>
              </div>
            )}

            {securityScanState === 'secure' && (
              <div className="flex-grow flex flex-col justify-between items-center text-center my-auto animate-fade-in-up">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-16 h-16 rounded-full border border-emerald-500/20 animate-ping opacity-50" />
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-400 text-3xl font-black">verified_user</span>
                  </div>
                </div>
                
                <div className="my-2">
                  <h5 className="font-bold text-white text-sm">Entorno 100% Protegido</h5>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[280px]">Certificación SSL SSLv3 activa, blindaje web anti-hacks y prevención DDoS robusta.</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[10px] w-full mt-2">
                  <div className="p-2 bg-emerald-500/5 rounded-xl border border-emerald-500/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-bold text-emerald-200 truncate">Certificado SSL Activo</span>
                  </div>
                  <div className="p-2 bg-emerald-500/5 rounded-xl border border-emerald-500/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-bold text-emerald-200 truncate">Protección DDoS Activa</span>
                  </div>
                </div>

                <button 
                  onClick={startSecurityScan}
                  className="text-[9px] font-black text-slate-300 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer mt-4"
                >
                  Volver a Escanear
                </button>
              </div>
            )}
          </div>
        );

      case 7: // Ventas - Real-time Balance counter & debit card
        return (
          <div className="flex flex-col h-full justify-between p-6 min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <span className="text-xs font-bold text-slate-200">MONITOREO FINANCIERO EN VIVO</span>
              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded text-[9px] font-black uppercase tracking-wider animate-pulse">Canal Directo</span>
            </div>

            {/* Glowing Business Card Mockup */}
            <div className="my-auto py-2">
              <div className="w-60 h-28 sm:w-64 sm:h-32 rounded-2xl bg-gradient-to-tr from-teal-500/40 via-cyan-600/30 to-slate-800 border border-white/10 p-4 flex flex-col justify-between shadow-lg mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-teal-400/10 blur-xl animate-pulse" />
                <div className="flex justify-between items-start">
                  <div className="text-left">
                    <h5 className="text-[10px] text-teal-300 uppercase tracking-widest font-black">Tu Balance Digital</h5>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xs font-bold text-teal-200">$</span>
                      <span className="text-2xl font-black text-white tracking-tight leading-none">
                        {liveBalance.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-teal-200 ml-1">MXN</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-teal-300 text-xl select-none font-bold">contactless</span>
                </div>
                
                <div className="flex justify-between items-center text-[9px] text-slate-300 font-mono">
                  <span>**** **** **** 8820</span>
                  <span className="font-bold uppercase tracking-wider">Artecnologia Pay</span>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-400 font-bold uppercase leading-normal mt-auto shrink-0">
              Retornos de inversión optimizados mediante embudos de ventas robustos.
            </div>
          </div>
        );

      case 8: // Equipo - Active support live chat simulator
        return (
          <div className="flex flex-col h-full justify-between p-6 min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-200">Asesoría Artecnologia</span>
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Respuesta en &lt; 5 min</span>
            </div>

            <div className="my-2 flex-grow flex flex-col gap-2 overflow-y-auto max-h-[140px] scrollbar-none py-1">
              {supportChat.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed transition-all ${
                    msg.role === 'support'
                      ? 'bg-slate-900 border border-white/5 text-slate-100 rounded-tl-none self-start text-left shadow-xs'
                      : 'bg-cyan-600 text-white rounded-tr-none self-end text-left'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Input Submission */}
            <form onSubmit={handleSupportSend} className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-2 mt-auto shrink-0">
              <input 
                type="text" 
                placeholder="Escribe tu duda técnica..." 
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="w-full bg-transparent pl-3 pr-10 py-2 focus:outline-none text-xs text-white placeholder-slate-500"
              />
              <button 
                type="submit"
                className="absolute right-1 w-8 h-8 rounded-lg bg-cyan-600 hover:bg-cyan-700 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
                aria-label="Enviar duda"
              >
                <span className="material-symbols-outlined text-sm font-bold">send</span>
              </button>
            </form>
          </div>
        );

      case 9: // Publicidad - Facebook & Google Campaign Bar Graph
        return (
          <div className="flex flex-col h-full justify-between p-6 min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <span className="text-xs font-bold text-slate-200">ROI DE CAMPAÑAS DIGITALES</span>
              <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 rounded text-[9px] font-black uppercase tracking-wider">Pixel Integrado</span>
            </div>

            <div className="flex-grow flex flex-col justify-center gap-3 my-3">
              {[
                { label: 'Google Search (AdWords)', value: '88%', width: 'w-[88%]', color: 'bg-gradient-to-r from-pink-500 to-rose-600' },
                { label: 'Facebook / Instagram Ads', value: '94%', width: 'w-[94%]', color: 'bg-gradient-to-r from-pink-500 to-indigo-600' },
                { label: 'Retargeting Dinámico', value: '75%', width: 'w-[75%]', color: 'bg-gradient-to-r from-pink-500 to-purple-600' }
              ].map((campaign, idx) => (
                <div key={idx} className="flex flex-col gap-1 text-left">
                  <div className="flex justify-between text-[10px] font-bold text-slate-300">
                    <span>{campaign.label}</span>
                    <span className="text-pink-400 font-extrabold">{campaign.value}</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 border border-white/15 rounded-full overflow-hidden p-0.5">
                    <div className={`h-full rounded-full transition-all duration-1000 ${campaign.color} ${campaign.width}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-[10px] text-slate-400 font-bold uppercase mt-auto shrink-0 pt-2 border-t border-white/5">
              Optimización del código de tracking para 100% de atribución.
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-28 bg-primary dark:bg-slate-950 text-on-primary transition-colors duration-300 relative overflow-hidden" 
      aria-labelledby="features-title"
    >
      {/* Visual background details */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 select-none pointer-events-none" />
      
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 id="features-title" className="features-title-anim font-headline-lg text-headline-lg font-bold mb-6 tracking-tight uppercase">
            “CONSTRUIMOS TU NEGOCIO EN LA WEB”
          </h2>
          <div className="features-title-anim h-1.5 w-24 bg-white mx-auto rounded-full mb-8 shadow-sm" />
          <p className="features-title-anim font-body-lg text-body-lg text-primary-fixed-dim dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            En <strong>Artecnología Digital</strong> contamos con un equipo apasionado dispuesto a brindarte un servicio excepcional. Diseñamos e implementamos soluciones digitales de alta calidad para impulsar el crecimiento real de tu negocio en internet.
          </p>
        </div>

        {/* Premium Interactive Showcase Grid Layout */}
        <div className="features-main-layout grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 max-w-6xl mx-auto">
          
          {/* Left Column: Tactical Capability Nodes Grid (5 columns) */}
          <div className="features-grid-anim lg:col-span-5 grid grid-cols-2 gap-3 h-full">
            {featureList.map((feature, index) => {
              const isActive = activeIndex === index;
              return (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                  className={`feature-node group text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between items-start h-[115px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isActive 
                      ? 'bg-white/10 shadow-[0px_10px_25px_rgba(255,255,255,0.03)] scale-102' 
                      : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/8'
                  }`}
                  style={{ 
                    borderColor: isActive ? feature.accentColor : '',
                    boxShadow: isActive ? `0 0 15px ${feature.accentColor}10` : ''
                  }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between w-full">
                    {/* Glowing Accent Light Indicator */}
                    <span 
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isActive ? 'scale-125 animate-pulse' : 'bg-white/20'}`}
                      style={{ backgroundColor: isActive ? feature.accentColor : '' }}
                    />
                    
                    <span className="material-symbols-outlined text-2xl text-slate-300 select-none transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                      {feature.icon}
                    </span>
                  </div>

                  <div className="w-full">
                    <span className={`font-bold text-xs uppercase tracking-wider block transition-colors ${
                      isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {feature.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Immersive Device Live Digital Canvas (7 columns) */}
          <div className="features-canvas-anim lg:col-span-7 flex flex-col h-full min-h-[380px] lg:min-h-full">
            
            {/* The high-tech simulated browser container */}
            <div 
              className={`flex-grow rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col overflow-hidden relative group transition-all duration-500 ease-in-out ${
                isMobileView ? 'max-w-[340px] mx-auto w-full h-[550px]' : 'w-full h-full'
              }`}
            >
              
              {/* Glowing Dynamic Edge Accent */}
              <div 
                className="absolute top-0 left-0 w-full h-1 transition-colors duration-500 select-none pointer-events-none"
                style={{ backgroundColor: featureList[activeIndex].accentColor }}
              />

              {/* High-Fidelity Browser Chrome Header */}
              <div className="px-4 py-3 border-b border-white/5 bg-slate-950/60 flex items-center justify-between gap-4 select-none shrink-0">
                {/* Windows Controls (Apple style) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                
                {/* Dynamically Typed URL Bar */}
                <div className="flex-grow max-w-sm bg-slate-900/80 border border-white/5 rounded-lg px-3 py-1 flex items-center gap-1.5 text-[9px] text-slate-400 font-mono min-w-0">
                  <span className="material-symbols-outlined text-[10px] text-slate-500 shrink-0">lock</span>
                  <span className="text-emerald-500 shrink-0">https://</span>
                  <span className="text-slate-300 font-bold truncate">
                    {typedUrl}
                    <span className="inline-block w-0.5 h-2.5 bg-white/40 ml-0.5 animate-pulse" />
                  </span>
                </div>

                {/* Viewport Resize Toggle Button (Desktop vs Mobile) */}
                <button
                  type="button"
                  onClick={() => setIsMobileView(!isMobileView)}
                  className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer shrink-0"
                  title={isMobileView ? "Cambiar a Vista Escritorio" : "Cambiar a Vista Móvil"}
                >
                  <span className="material-symbols-outlined text-sm font-bold">
                    {isMobileView ? "desktop_windows" : "stay_current_portrait"}
                  </span>
                </button>
              </div>

              {/* Dynamic Description Summary Top Bar */}
              <div className="p-4 border-b border-white/5 bg-slate-950/30 text-left">
                <h4 className="font-bold text-xs text-white flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-base" style={{ color: featureList[activeIndex].accentColor }}>
                    {featureList[activeIndex].icon}
                  </span>
                  Capacidad: <span className="uppercase font-extrabold tracking-wider">{featureList[activeIndex].name}</span>
                </h4>
                <p className="text-[11px] text-slate-300 leading-normal font-medium">
                  {featureList[activeIndex].description}
                </p>
              </div>

              {/* Interactive Mockup Body Canvas */}
              <div className="flex-grow relative z-10 bg-slate-950/20">
                {renderMockup()}
              </div>

            </div>
          </div>

        </div>

        {/* CTA Glass Card */}
        <div className="features-title-anim mt-20 bg-white/5 dark:bg-slate-900/40 rounded-3xl p-10 max-w-3xl mx-auto border border-white/10 shadow-xl text-center">
          <h3 className="font-headline-md text-xl font-bold mb-4 text-white">¿Listo para dar el siguiente paso?</h3>
          <p className="font-body-md text-slate-200 mb-6 leading-relaxed">
            Solicita una <strong>asesoría inicial sin costo alguno</strong>. Con gusto resolveremos todas tus dudas para adaptarnos al mejor precio y a las necesidades específicas de tu negocio.
          </p>
          <a 
            className="bg-white hover:bg-slate-100 text-primary dark:text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all duration-300 inline-block shadow-lg hover:scale-105 cursor-pointer" 
            href="#contacto"
          >
            QUIERO CRECER MI NEGOCIO
          </a>
        </div>

      </div>
    </section>
  );
}
