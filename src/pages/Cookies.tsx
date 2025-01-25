import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WhatsAppButton from '../components/WhatsAppButton';
import StartNowButton from '../components/StartNowButton';

export default function Cookies() {
  const [isScrolled, setIsScrolled] = React.useState(false);

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
        <title>Política de Cookies - PEGMA 3.0</title>
        <meta name="description" content="Política de cookies do PEGMA 3.0, sistema ERP completo para gestão empresarial." />
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

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">Política de Cookies</h1>
          
          <div className="prose prose-invert">
            <div className="space-y-6 text-blue-200">
              <p>Última atualização: 14 de março de 2024</p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. O que são Cookies?</h2>
              <p>
                Cookies são pequenos arquivos de texto que são armazenados em seu dispositivo quando você visita nosso site. Eles nos ajudam a fornecer uma melhor experiência de usuário.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Tipos de Cookies que Utilizamos</h2>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">2.1 Cookies Essenciais</h3>
              <p>
                Necessários para o funcionamento básico do site. Incluem:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Cookies de sessão</li>
                <li>Cookies de autenticação</li>
                <li>Cookies de segurança</li>
              </ul>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">2.2 Cookies de Desempenho</h3>
              <p>
                Nos ajudam a entender como os visitantes interagem com o site:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Google Analytics</li>
                <li>Métricas de uso</li>
                <li>Dados de navegação</li>
              </ul>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">2.3 Cookies Funcionais</h3>
              <p>
                Permitem recursos avançados e personalização:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Preferências de usuário</li>
                <li>Configurações salvas</li>
                <li>Histórico de interações</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Como Gerenciar Cookies</h2>
              <p>
                Você pode controlar e/ou excluir cookies conforme desejar:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Configurações do navegador</li>
                <li>Ferramentas de privacidade</li>
                <li>Opções de consentimento em nosso site</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies de Terceiros</h2>
              <p>
                Alguns cookies são definidos por serviços de terceiros que aparecem em nossas páginas:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Google Analytics</li>
                <li>Facebook Pixel</li>
                <li>Serviços de pagamento</li>
                <li>Ferramentas de chat</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Impacto da Desativação de Cookies</h2>
              <p>
                A desativação de cookies pode afetar sua experiência no site:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Algumas funcionalidades podem não funcionar corretamente</li>
                <li>Preferências não serão salvas</li>
                <li>Certas áreas podem ficar inacessíveis</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Atualizações da Política</h2>
              <p>
                Esta política pode ser atualizada periodicamente. Recomendamos verificar regularmente para estar ciente de quaisquer mudanças.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Contato</h2>
              <p>
                Para dúvidas sobre nossa política de cookies, entre em contato através do e-mail: cookies@pegma.com.br
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-12 border-t border-white/10">
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
                <li><Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-blue-200">
            2024 PEGMA. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}