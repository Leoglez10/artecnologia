import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BentoGrid from './components/BentoGrid';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import PortfolioGallery from './components/PortfolioGallery';
import PricingCalculator from './components/PricingCalculator';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  // 'home' represents the landing page, 'portfolio' is the standalone full gallery
  const [currentView, setCurrentView] = useState('home');

  // Unified quote prefill dispatcher
  const handleQuoteProject = (project) => {
    setCurrentView('home');
    
    // Smooth transition back and scroll to contact form
    setTimeout(() => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Prefill fields
      setTimeout(() => {
        const subjectInput = document.getElementById('asunto');
        const messageInput = document.getElementById('mensaje');

        if (subjectInput) {
          subjectInput.value = `Cotización: Similar a ${project.title}`;
          const event = new Event('input', { bubbles: true });
          subjectInput.dispatchEvent(event);
        }

        if (messageInput) {
          messageInput.value = `Hola, he visto en su portafolio el trabajo de Artecnologia realizado para "${project.title}" (${project.category}).\nMe gustaría cotizar un sitio web similar adaptado a mi negocio.\n\nPor favor contáctenme para platicar detalles.`;
          const event = new Event('input', { bubbles: true });
          messageInput.dispatchEvent(event);
        }
      }, 500);
    }, 100);
  };

  const handleNavigateToGallery = () => {
    setCurrentView('portfolio');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#contenido" className="skip-link">
        Saltar al contenido principal
      </a>
      
      {/* Pass view controls to Navbar to synchronize back-transitions */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main id="contenido" className="flex-grow" tabIndex={-1}>
        {currentView === 'home' ? (
          <>
            <Hero />
            <Services />
            <BentoGrid />
            <Features />
            <Portfolio onViewAll={handleNavigateToGallery} />
            <PricingCalculator />
            <ContactForm />
          </>
        ) : (
          <PortfolioGallery 
            onBack={handleNavigateHome} 
            onQuoteProject={handleQuoteProject} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
