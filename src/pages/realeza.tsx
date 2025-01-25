import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Menu, X, MessageCircle, Shield, Laptop, Play } from 'lucide-react';
import Features from '../components/Features';
import Modules from '../components/Modules';
import Pricing from '../components/Pricing';
import WistiaVideo from '../components/WistiaVideo';
import { useButtonUrls } from '../hooks/useButtonUrls';
import StartNowButton from '../components/StartNowButton';
import ScheduleDemoButton from '../components/ScheduleDemoButton';
import ConsultantButton from '../components/ConsultantButton';
import WhatsAppButton from '../components/WhatsAppButton';

const testimonials = [
  {
    name: "Ricardo Oliveira",
    business: "Supermercado Oliveira",
    content: "O PEGMA 3.0 revolucionou a gestão do meu supermercado em Realeza. O sistema é completo e o suporte local é excelente.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Amanda Silva",
    business: "Farmácia Saúde Plena",
    content: "Sistema perfeito para farmácias. O controle de estoque e medicamentos é muito eficiente, facilitando nossa operação em Realeza.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "José Santos",
    business: "Loja de Materiais de Construção Santos",
    content: "O melhor investimento para minha loja em Realeza. O controle de estoque e emissão de notas fiscais é perfeito.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  }
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'PEGMA 3.0 Realeza',
  'description': 'Sistema ERP completo e software de gestão financeira para empresas em Realeza, PR. Sistema de gerenciamento comercial com NFe, controle de estoque e muito mais.',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Realeza',
    'addressRegion': 'PR',
    'addressCountry': 'BR'
  },
  'url': 'https://pegma.com.br/em-realeza',
  'telephone': '+55 45 3264-0000',
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    'opens': '08:00',
    'closes': '18:00'
  }
};

export default function RealezaPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { buttonUrls } = useButtonUrls();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Helmet>
        <title>Sistema ERP Completo em Realeza - Software de Gestão Comercial | PEGMA 3.0</title>
        <meta name="description" content="Sistema de gestão para comércio em Realeza. Software de gestão financeira e controle de estoque completo. Sistema ERP ideal para pequenas, médias e grandes empresas com emissão de nota fiscal. Suporte local 24/7." />
        <meta name="keywords" content="sistema erp realeza, software gestão comercial realeza, controle estoque realeza, emissão nota fiscal realeza, sistema gestão pequenas, médias e grandes empresas realeza, automação comercial realeza" />
        <link rel="canonical" href="https://pegma.com.br/em-realeza" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-bold text-white">
              <Link to="/">PEGMA</Link>
            </div>
            <StartNowButton variant="header" />
          </div>
        </div>
      </header>

      <main>
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
                Sistema de Gestão Empresarial em Realeza
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                O PEGMA 3.0 é o software de gestão mais completo de Realeza. Ideal para pequenas, médias e grandes empresas.
                Controle seu negócio com eficiência e tenha suporte local 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <StartNowButton variant="hero" />
                <ScheduleDemoButton variant="hero" />
              </div>
            </div>

            <div className="mt-16">
              <WistiaVideo />
            </div>

            <div className="mt-24">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Depoimentos de Clientes em Realeza
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.business}</p>
                      </div>
                    </div>
                    <p className="text-gray-300">{testimonial.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative bg-slate-800/50 backdrop-blur-sm py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Features />
            </div>
          </div>

          <div className="relative py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Modules />
            </div>
          </div>

          <div className="relative bg-slate-800/50 backdrop-blur-sm py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Pricing />
            </div>
          </div>
        </div>
      </main>

      <ConsultantButton />
      <WhatsAppButton />
    </div>
  );
}
