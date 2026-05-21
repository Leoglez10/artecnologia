import { useState, useEffect } from 'react';

const menuItems = [
  { label: 'Inicio', href: '#inicio', id: 'inicio' },
  { label: 'Servicios', href: '#servicios', id: 'servicios' },
  { label: 'Portafolio', href: '#portafolio', id: 'portafolio' },
  { label: 'Paquetes', href: '#paquetes', id: 'paquetes' },
  { label: 'Contacto', href: '#contacto', id: 'contacto' }
];

export default function Navbar({ currentView, setCurrentView }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isScrolled, setIsScrolled] = useState(false);

  // Keep scroll work compositor-friendly and avoid layout reads on every frame.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer (only active on home page layout)
  useEffect(() => {
    if (currentView !== 'home') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.1, 0.35, 0.6]
      }
    );

    const sections = menuItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [currentView]);

  // Sync Dark Mode state with DOM
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleDarkMode = () => setIsDarkMode((current) => !current);

  // Custom click interceptor to handle switching back to landing page dynamically
  const handleLinkClick = (e, item) => {
    if (currentView === 'portfolio') {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      
      setCurrentView('home');

      // Allow App component view to update before scrolling to anchor element
      setTimeout(() => {
        const targetElement = document.getElementById(item.id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const handleActionClick = (e) => {
    if (currentView === 'portfolio') {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      setCurrentView('home');

      setTimeout(() => {
        const plansSection = document.getElementById('paquetes');
        if (plansSection) {
          plansSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      id="main-nav" 
      className={`text-on-background dark:text-white docked full-width top-0 z-50 sticky transition-[background-color,box-shadow,backdrop-filter] duration-300 w-full ${
        isScrolled
          ? 'shadow-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-md'
          : 'shadow-[0px_4px_20px_rgba(0,0,0,0.05)] bg-surface-bright dark:bg-slate-900'
      }`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">
        
        {/* Logo */}
        <div className="flex items-center gap-4">
          <a 
            onClick={(e) => handleLinkClick(e, { id: 'inicio' })}
            className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight flex items-center cursor-pointer" 
            href="#inicio" 
            aria-label="Artecnología, ir al inicio"
          >
            <img 
              alt="Artecnología Logo" 
              className="h-10 w-auto object-contain dark:brightness-110" 
              src="/logo.png"
              width="160"
              height="40"
              loading="eager"
              decoding="async"
            />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {menuItems.map((item) => {
            const isActive = currentView === 'home' && activeSection === item.id;
            const isPortfolioGalleryActive = currentView === 'portfolio' && item.id === 'portafolio';
            const showActive = isActive || isPortfolioGalleryActive;

            return (
              <a
                key={item.label}
                onClick={(e) => handleLinkClick(e, item)}
                className={`font-semibold pb-1 border-b-2 transition-[color,border-color] duration-200 cursor-pointer text-sm ${
                  showActive 
                    ? 'text-primary dark:text-secondary-container border-primary dark:border-secondary-container' 
                    : 'text-on-surface-variant dark:text-slate-300 border-transparent hover:text-primary dark:hover:text-secondary-container'
                }`}
                href={item.href}
                aria-current={showActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Dark Mode Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white hover:scale-105 transition-transform duration-200 border border-outline-variant/20 cursor-pointer"
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-pressed={isDarkMode}
          >
            <span className="material-symbols-outlined select-none text-xl" aria-hidden="true">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <a 
            onClick={handleActionClick}
            className="bg-primary hover:bg-primary-container dark:bg-secondary-container dark:text-slate-900 text-on-primary font-label-md text-label-md px-6 py-3 rounded-full transition-[background-color,transform,box-shadow] duration-300 font-bold min-w-[160px] text-center shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:scale-102 hover:shadow-md cursor-pointer text-xs"
            href="#paquetes"
          >
            Conoce Nuestros Planes
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white cursor-pointer"
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-pressed={isDarkMode}
          >
            <span className="material-symbols-outlined select-none text-lg" aria-hidden="true">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button 
            className="text-on-surface dark:text-white p-2 cursor-pointer" 
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Menu) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú de navegación móvil">
          {/* Overlay */}
          <button 
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 bg-black/40 transition-opacity cursor-pointer border-none" 
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative flex-col w-64 max-w-xs bg-white dark:bg-slate-900 h-full p-6 shadow-xl flex z-50 ml-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-lg dark:text-white">Menú</span>
              <button 
                className="text-slate-500 dark:text-slate-400 cursor-pointer" 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">close</span>
              </button>
            </div>

            <nav className="flex flex-col gap-4" aria-label="Navegación móvil">
              {menuItems.map((item) => {
                const isActive = currentView === 'home' && activeSection === item.id;
                const isPortfolioGalleryActive = currentView === 'portfolio' && item.id === 'portafolio';
                const showActive = isActive || isPortfolioGalleryActive;

                return (
                  <a
                    key={item.label}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`text-lg font-medium p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer ${
                      showActive 
                        ? 'text-primary dark:text-secondary-container font-bold bg-slate-50 dark:bg-slate-800/50' 
                        : 'text-on-surface-variant dark:text-slate-300'
                    }`}
                    href={item.href}
                    aria-current={showActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
              <a 
                className="block w-full bg-primary text-on-primary text-center font-bold py-3 rounded-lg hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
                href="#paquetes"
                onClick={handleActionClick}
              >
                Conoce Nuestros Planes
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
