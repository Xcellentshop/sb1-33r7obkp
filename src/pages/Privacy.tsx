import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WhatsAppButton from '../components/WhatsAppButton';
import StartNowButton from '../components/StartNowButton';

export default function Privacy() {
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
        <title>Política de Privacidade - PEGMA 3.0</title>
        <meta name="description" content="Política de privacidade do PEGMA 3.0, sistema ERP completo para gestão empresarial." />
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
          <h1 className="text-4xl font-bold text-white mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-invert">
            <div className="space-y-6 text-blue-200">
              <p>Última atualização: 14 de março de 2024</p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introdução</h2>
              <p>
                Esta Política de Privacidade descreve como o PEGMA 3.0 coleta, usa e protege suas informações pessoais. Valorizamos sua privacidade e nos comprometemos a proteger seus dados pessoais.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Informações que Coletamos</h2>
              <p>Coletamos os seguintes tipos de informações:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Informações de cadastro (nome, e-mail, telefone)</li>
                <li>Dados da empresa</li>
                <li>Informações de uso do sistema</li>
                <li>Dados de faturamento</li>
                <li>Logs de acesso</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Como Usamos suas Informações</h2>
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Fornecer e manter o serviço</li>
                <li>Processar pagamentos</li>
                <li>Enviar atualizações importantes</li>
                <li>Melhorar nossos serviços</li>
                <li>Fornecer suporte técnico</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Proteção de Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, incluindo:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Criptografia de dados</li>
                <li>Firewalls</li>
                <li>Controles de acesso</li>
                <li>Monitoramento de segurança</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Compartilhamento de Dados</h2>
              <p>
                Não vendemos suas informações pessoais. Compartilhamos dados apenas quando necessário para:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Cumprir obrigações legais</li>
                <li>Processar pagamentos</li>
                <li>Fornecer serviços integrados</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Seus Direitos</h2>
              <p>Você tem direito a:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Acessar seus dados</li>
                <li>Corrigir informações incorretas</li>
                <li>Solicitar exclusão de dados</li>
                <li>Revogar consentimento</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Retenção de Dados</h2>
              <p>
                Mantemos seus dados pelo tempo necessário para fornecer nossos serviços ou conforme exigido por lei.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Contato</h2>
              <p>
                Para questões sobre privacidade, entre em contato através do e-mail: privacidade@pegma.com.br
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