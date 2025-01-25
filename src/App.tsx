import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import Modules from './components/Modules';
import Pricing from './components/Pricing';
import { getVisibleCities, getVisibleStates, validateCityData } from './config/cities';
import { useButtonUrls } from './hooks/useButtonUrls';
import WhatsAppButton from './components/WhatsAppButton';
import StartNowButton from './components/StartNowButton';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [citiesError, setCitiesError] = useState<string | null>(null);
  
  // Validar dados das cidades
  const isDataValid = validateCityData();
  const visibleCities = isDataValid ? getVisibleCities() : [];
  const visibleStates = isDataValid ? getVisibleStates() : [];
  const { buttonUrls } = useButtonUrls();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = ['features', 'modules', 'pricing', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-bold text-white">PEGMA</div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('features')}
                className={`nav-link ${activeSection === 'features' ? 'text-white' : 'text-blue-200'} hover:text-white transition-colors`}
              >
                Recursos
              </button>
              <button 
                onClick={() => handleNavClick('modules')}
                className={`nav-link ${activeSection === 'modules' ? 'text-white' : 'text-blue-200'} hover:text-white transition-colors`}
              >
                Módulos
              </button>
              <button 
                onClick={() => handleNavClick('pricing')}
                className={`nav-link ${activeSection === 'pricing' ? 'text-white' : 'text-blue-200'} hover:text-white transition-colors`}
              >
                Planos
              </button>
              
              {/* Menu de Cidades */}
              {visibleCities.length > 0 && !citiesError && (
                <div className="relative group">
                  <button className="text-blue-200 hover:text-white transition-colors">
                    Cidades
                  </button>
                  <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {visibleStates.map((state) => (
                        <div key={state.abbreviation}>
                          <div className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-50">
                            {state.name}
                          </div>
                          {state.cities.filter(city => city.showInMenu).map((city) => (
                            <Link
                              key={city.slug}
                              to={`/${city.slug}`}
                              className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {city.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Link de Contato */}
              <button 
                onClick={() => handleNavClick('contact')}
                className="text-blue-200 hover:text-white transition-colors"
              >
                Contato
              </button>

              {/* Link do Admin */}
              <Link 
                to="/admin"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Admin
              </Link>

              <StartNowButton variant="header" />
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 md:hidden">
              <StartNowButton variant="header" />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-sm transform ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold text-white">PEGMA</div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => handleNavClick('features')}
              className="text-left text-lg text-white hover:text-blue-200 transition-colors"
            >
              Recursos
            </button>
            <button
              onClick={() => handleNavClick('modules')}
              className="text-left text-lg text-white hover:text-blue-200 transition-colors"
            >
              Módulos
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="text-left text-lg text-white hover:text-blue-200 transition-colors"
            >
              Planos
            </button>

            {/* Menu de Cidades Mobile */}
            {visibleCities.length > 0 && !citiesError && (
              <div className="space-y-2">
                <div className="text-lg text-white">Cidades</div>
                <div className="pl-4 space-y-2">
                  {visibleStates.map((state) => (
                    <div key={state.abbreviation}>
                      <div className="text-sm font-semibold text-blue-200">{state.name}</div>
                      <div className="pl-2 space-y-1">
                        {state.cities.filter(city => city.showInMenu).map((city) => (
                          <Link
                            key={city.slug}
                            to={`/${city.slug}`}
                            className="block text-white hover:text-blue-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {city.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Link de Contato Mobile */}
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left text-lg text-white hover:text-blue-200 transition-colors"
            >
              Contato
            </button>

            {/* Link do Admin Mobile */}
            <Link 
              to="/admin"
              className="text-left text-lg text-white hover:text-blue-200 transition-colors"
            >
              Admin
            </Link>
          </nav>

          <div className="mt-auto">
            <a
              href={buttonUrls.whatsappButtonUrl}
              className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Falar com Consultor
            </a>
          </div>
        </div>
      </div>

      <main>
        <Hero />
        <Features />
        <Modules />
        <Pricing />
      </main>

      <WhatsAppButton />
      {/* WhatsApp Floating Button */}
      {/* <a
        href={buttonUrls.whatsappButtonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Contato via WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          {/* Pulse animation */}
          {/* <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-20"></div>
          
          {/* Button background */}
          {/* <div className="relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full hover:bg-green-600 transition-colors shadow-lg">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          
          {/* Tooltip */}
          {/* <div className="absolute right-full mr-4 px-4 py-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            <p className="text-sm text-gray-700 font-medium">Fale conosco no WhatsApp</p>
          </div>
        </div>
      </a> */}

      <footer id="contact" className="bg-slate-900 text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PEGMA</h3>
              <p className="text-blue-200">
                Sistema ERP completo para sua empresa
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-blue-200">
                <li>PEGMA 3.0</li>
                <li>PEGMA PET</li>
                <li>PEGMA Mobile</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-blue-200">
                <li>Central de Ajuda</li>
                <li>Documentação</li>
                <li>Contato</li>
              </ul>
            </div>
            <div>
            <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link to="/termos-de-uso">Termos de Uso</Link></li>
                <li><Link to="/privacidade">Privacidade</Link></li>
                <li><Link to="/cookies">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-blue-200">
            2024 PEGMA. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}