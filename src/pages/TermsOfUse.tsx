import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WhatsAppButton from '../components/WhatsAppButton';
import StartNowButton from '../components/StartNowButton';

export default function TermsOfUse() {
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
        <title>Termos de Uso - PEGMA 3.0</title>
        <meta name="description" content="Termos de uso do PEGMA 3.0, sistema ERP completo para gestão empresarial." />
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
          <h1 className="text-4xl font-bold text-white mb-8">Termos de Uso</h1>
          
          <div className="prose prose-invert">
            <div className="space-y-6 text-blue-200">
              <p>Última atualização: 14 de março de 2024</p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o PEGMA 3.0, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nosso sistema.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Uso do Serviço</h2>
              <p>
                O PEGMA 3.0 é um sistema de gestão empresarial fornecido mediante licença de uso. Você concorda em:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Usar o sistema apenas para propósitos legais e de acordo com estes termos</li>
                <li>Não compartilhar suas credenciais de acesso</li>
                <li>Manter suas informações de conta atualizadas</li>
                <li>Não realizar engenharia reversa do software</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Licença de Uso</h2>
              <p>
                Concedemos a você uma licença limitada, não exclusiva e não transferível para usar o PEGMA 3.0 de acordo com seu plano de assinatura.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Propriedade Intelectual</h2>
              <p>
                O PEGMA 3.0, incluindo todo o conteúdo, recursos e funcionalidades, são de propriedade da empresa e estão protegidos por leis de propriedade intelectual.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Responsabilidades</h2>
              <p>
                Você é responsável por:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Manter a segurança de sua conta</li>
                <li>Fazer backup de seus dados</li>
                <li>Cumprir todas as leis aplicáveis</li>
                <li>Reportar qualquer uso não autorizado</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Modificações</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão notificadas aos usuários.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Suporte</h2>
              <p>
                O suporte técnico é fornecido de acordo com seu plano de assinatura e está sujeito à nossa política de suporte.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Rescisão</h2>
              <p>
                Podemos encerrar ou suspender seu acesso ao serviço imediatamente, sem aviso prévio, por qualquer violação destes termos.
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