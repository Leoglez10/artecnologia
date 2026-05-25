export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-on-surface dark:text-white w-full mt-auto border-t border-outline-variant/10 dark:border-slate-800 py-20 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* About section */}
        <div className="flex flex-col">
          <a className="font-headline-md text-headline-md font-bold text-primary dark:text-secondary-container mb-4" href="#inicio">
            <img 
              alt="Artecnología Logo Footer" 
              className="h-8 w-auto object-contain dark:brightness-110 opacity-90 transition-all duration-300" 
              src="/logo.png"
              width="128"
              height="32"
              loading="lazy"
              decoding="async"
            />
          </a>
          <p className="font-body-md text-sm text-text-muted dark:text-slate-400 mb-6 leading-relaxed">
            Innovación y artesanía digital. Diseñadores y desarrolladores apasionados por crear soluciones web a la medida de tus ideas.
          </p>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="font-label-md text-sm font-bold text-on-surface dark:text-white mb-4 uppercase tracking-wider">
            Servicios
          </h4>
          <ul className="space-y-2.5">
            <li><a className="font-body-md text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-secondary-container transition-colors" href="#servicios">Diseño Web</a></li>
            <li><a className="font-body-md text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-secondary-container transition-colors" href="#servicios">Comercio Electrónico</a></li>
            <li><a className="font-body-md text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-secondary-container transition-colors" href="#servicios">Certificados SSL</a></li>
            <li><a className="font-body-md text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-secondary-container transition-colors" href="#servicios">SEO &amp; Analítica</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-label-md text-sm font-bold text-on-surface dark:text-white mb-4 uppercase tracking-wider">
            Compañía
          </h4>
          <ul className="space-y-2.5">
            <li><a className="font-body-md text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-secondary-container transition-colors" href="#portafolio">Portafolio</a></li>
            <li><a className="font-body-md text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-secondary-container transition-colors" href="#inicio">Bolsa de trabajo</a></li>
            <li><a className="font-body-md text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-secondary-container transition-colors" href="#inicio">Aviso de Privacidad</a></li>
            <li><a className="font-body-md text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-secondary-container transition-colors" href="#inicio">Términos de Servicio</a></li>
          </ul>
        </div>

        {/* Social Networks Links */}
        <div>
          <h4 className="font-label-md text-sm font-bold text-on-surface dark:text-white mb-4 uppercase tracking-wider">
            Síguenos
          </h4>
          <div className="flex gap-4">
            <a 
              className="w-10 h-10 rounded-full bg-slate-200/50 hover:bg-[#1877F2] dark:bg-slate-800 dark:hover:bg-[#1877F2] text-on-surface dark:text-white hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105" 
              href="https://www.facebook.com/artecnologiadesignerweb/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              className="w-10 h-10 rounded-full bg-slate-200/50 hover:bg-black dark:bg-slate-800 dark:hover:bg-black text-on-surface dark:text-white hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105" 
              href="https://x.com/ArtecnologiaDW"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              className="w-10 h-10 rounded-full bg-slate-200/50 hover:bg-[#FF0000] dark:bg-slate-800 dark:hover:bg-[#FF0000] text-on-surface dark:text-white hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105" 
              href="https://www.youtube.com/channel/UC9nj3yBirZQcRdWPV3xP0cw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-16 pt-8 border-t border-outline-variant/10 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="font-label-md text-xs text-text-muted dark:text-slate-400">
          © 2026 Artecnología Digital. Todos los derechos reservados.
        </p>
        <p className="font-label-md text-xs text-text-muted dark:text-slate-400">
          Diseñado por Artecnología
        </p>
      </div>
    </footer>
  );
}
