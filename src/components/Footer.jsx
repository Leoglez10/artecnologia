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
              className="w-10 h-10 rounded-full bg-slate-200/50 hover:bg-primary dark:bg-slate-800 dark:hover:bg-secondary-container text-on-surface dark:text-white dark:hover:text-slate-900 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105" 
              href="https://www.facebook.com/artecnologiadesignerweb/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <span className="material-symbols-outlined text-sm select-none" aria-hidden="true">thumb_up</span>
            </a>
            <a 
              className="w-10 h-10 rounded-full bg-slate-200/50 hover:bg-primary dark:bg-slate-800 dark:hover:bg-secondary-container text-on-surface dark:text-white dark:hover:text-slate-900 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105" 
              href="https://x.com/ArtecnologiaDW"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <span className="material-symbols-outlined text-sm select-none" aria-hidden="true">chat</span>
            </a>
            <a 
              className="w-10 h-10 rounded-full bg-slate-200/50 hover:bg-primary dark:bg-slate-800 dark:hover:bg-secondary-container text-on-surface dark:text-white dark:hover:text-slate-900 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105" 
              href="https://www.youtube.com/channel/UC9nj3yBirZQcRdWPV3xP0cw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <span className="material-symbols-outlined text-sm select-none" aria-hidden="true">play_arrow</span>
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
