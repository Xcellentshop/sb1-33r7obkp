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
    name: "Roberto Almeida",
    business: "Supermercados Cascavel",
    content: "O PEGMA 3.0 transformou a gestão da nossa rede de supermercados em Cascavel. A integração entre as lojas e o controle centralizado são excepcionais.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Patricia Santos",
    business: "Drogaria Saúde Total",
    content: "Excelente para o setor farmacêutico. O controle de lotes e validades é perfeito, e o suporte local em Cascavel é muito ágil.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Fernando Costa",
    business: "Restaurante Sabor Regional",
    content: "O módulo de delivery e controle de mesas revolucionou nosso restaurante. O sistema é completo e o suporte em Cascavel é excepcional.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  }
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'PEGMA 3.0 Cascavel',
  'description': 'Sistema ERP completo e software de gestão financeira para empresas em Cascavel, PR. Sistema de gerenciamento comercial com NFe, controle de estoque e muito mais.',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Cascavel',
    'addressRegion': 'PR',
    'addressCountry': 'BR'
  },
  'url': 'https://pegma.com.br/em-cascavel',
  'telephone': '+55 45 3264-0000',
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    'opens': '08:00',
    'closes': '18:00'
  }
};

export default function CascavelPage() {
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
        <title>Sistema ERP Completo em Cascavel - Software de Gestão Comercial | PEGMA 3.0</title>
        <meta name="description" content="Sistema de gestão para comércio em Cascavel. Software de gestão financeira e controle de estoque completo. Sistema ERP ideal para pequenas, médias e grandes empresas com emissão de nota fiscal. Suporte local 24/7." />
        <meta name="keywords" content="sistema erp cascavel, software gestão comercial cascavel, controle estoque cascavel, emissão nota fiscal cascavel, sistema gestão pequenas, médias e grandes empresas cascavel, automação comercial cascavel" />
        <link rel="canonical" href="https://pegma.com.br/em-cascavel" />
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                  <span className="text-blue-300 text-sm font-medium">Suporte Local em Cascavel</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  SISTEMA ERP
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    COMPLETO em Cascavel
                  </span>
                </h1>

                <p className="text-xl text-blue-100 max-w-2xl">
                  Software de gestão financeira e controle de estoque ideal para pequenas, médias e grandes empresas em Cascavel. 
                  Sistema de gerenciamento comercial completo com emissão de NF-e e suporte técnico local 24/7.
                </p>

                {/* Video para mobile */}
                <div className="lg:hidden relative">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
                    <WistiaVideo />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <ScheduleDemoButton variant="primary" />
                  <a 
                    href={buttonUrls.watchVideoUrl}
                    className="flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-semibold backdrop-blur-sm hover:bg-white/20 transition-all"
                  >
                    <Play className="w-5 h-5" />
                    Ver Vídeo
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white">100+</div>
                    <div className="text-blue-200">Clientes em Cascavel</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-blue-200">Suporte Local</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">99.9%</div>
                    <div className="text-blue-200">Uptime</div>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
                  <WistiaVideo />
                </div>

                <div className="absolute -bottom-6 -right-6 flex gap-4">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-xl">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Certificado SEFAZ</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-xl">
                    <Laptop className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Multi-plataforma</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Features />
        <Modules />

        <div id="testimonials" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Clientes em Cascavel
              </h2>
              <p className="text-xl text-blue-200">
                Veja o que nossos clientes dizem sobre o PEGMA 3.0
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                      <p className="text-blue-300">{testimonial.business}</p>
                    </div>
                  </div>
                  <p className="text-blue-100">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Pricing />

        <div className="py-24 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Descubra o Melhor Sistema de ERP para o Seu Comércio em Cascavel
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Gerenciar um comércio de forma eficiente exige ferramentas que integrem todos os processos do negócio, desde o controle financeiro até o gerenciamento de estoque e vendas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Sistema de Gestão para Comércio em Cascavel
                </h3>
                <p className="text-blue-200">
                  Um bom sistema de gestão para comércio em Cascavel é essencial para quem busca profissionalizar a administração do negócio. Com ele, você pode automatizar processos, reduzir erros e garantir maior produtividade no dia a dia.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Software de Gestão Financeira e Controle de Estoque
                </h3>
                <p className="text-blue-200">
                  Manter o controle financeiro e o estoque alinhados é um desafio para muitos empreendedores. Com nosso software de gestão financeira e controle de estoque em Cascavel, você monitora entradas, saídas e margens de lucro em tempo real.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">
                  Programa para Controle de Estoque e Vendas
                </h3>
                <p className="text-blue-200">
                  Aumente a eficiência das suas vendas e tenha mais agilidade com nosso programa para controle de estoque e vendas com emissão de nota fiscal em Cascavel.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">
                  Sistema de Gerenciamento Comercial Completo
                </h3>
                <p className="text-blue-200">
                  Transforme seu negócio com um sistema de gerenciamento comercial completo em Cascavel, que une funcionalidades avançadas em uma plataforma simples e intuitiva.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">
                  Software de Automação Comercial com NFe
                </h3>
                <p className="text-blue-200">
                  A automação comercial é indispensável para quem busca escalabilidade e eficiência. Nosso software de automação comercial com NFe em Cascavel elimina processos manuais.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Sistema para Controle de Vendas e Cadastro de Produtos
                </h3>
                <p className="text-blue-200">
                  Cadastre seus produtos de forma organizada e tenha total controle das suas vendas. O sistema para controle de vendas e cadastro de produtos em Cascavel foi projetado para atender desde microempresas até grandes lojas.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Software para Lojas com Controle de Estoque
                </h3>
                <p className="text-blue-200">
                  Simplifique a gestão da sua loja com um software para lojas com controle de estoque e financeiro em Cascavel. Acompanhe o desempenho do seu negócio com relatórios detalhados.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-blue-500/10 rounded-full border border-blue-500/20 mb-8">
                <span className="text-blue-300 font-medium">
                  🚀 Sistema completo para seu negócio em Cascavel
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <StartNowButton variant="primary" />
                <ConsultantButton variant="secondary" />
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-slate-900 text-white py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">PEGMA</h3>
                <p className="text-blue-200">
                  Sistema ERP completo para empresas em Cascavel
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Soluções</h4>
                <ul className="space-y-2 text-blue-200">
                  <li>Controle de Estoque</li>
                  <li>Gestão Financeira</li>
                  <li>Emissão de NFe</li>
                  <li>Automação Comercial</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Suporte Local</h4>
                <ul className="space-y-2 text-blue-200">
                  <li>Atendimento 24/7</li>
                  <li>Treinamento</li>
                  <li>Implantação</li>
                  <li>Consultoria</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contato</h4>
                <ul className="space-y-2 text-blue-200">
                  <li>Cascavel - PR</li>
                  <li>Suporte Técnico</li>
                  <li>Vendas</li>
                  <li>Parcerias</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 mt-12 pt-8 text-center">
              <p className="text-blue-200 mb-4">
                Melhores Sistemas de ERP para Comércio Varejista em Cascavel
              </p>
              <a
                href={buttonUrls.requestDemoUrl}
                className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Solicitar Demonstração
              </a>
              <p className="text-blue-200 mt-8">
                &copy; 2024 PEGMA. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>

        <WhatsAppButton />
      </main>
    </div>
  );
}