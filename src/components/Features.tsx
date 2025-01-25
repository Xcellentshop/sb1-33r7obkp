import { Shield, Zap, Smartphone, Server, Database, LayoutDashboard, Wallet, Truck, Receipt, BarChart } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const mainFeatures = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Sistema de Rede Próprio",
    description: "Estabilidade garantida com rede integrada, eliminando quedas de sistema e mantendo comunicação contínua com o servidor."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Sistema Leve e Rápido",
    description: "Funciona em máquinas básicas (dual core, 4GB RAM) com excelente performance."
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Apps Mobile Integrados",
    description: "Força de vendas e controle de mesas para restaurantes via Android, sincronização em tempo real."
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Multi-Plataforma",
    description: "Compatível com Windows 7 até 11 e Windows Server, adaptando-se ao seu ambiente."
  }
];

const documentModules = [
  {
    title: "Documentos Fiscais",
    items: [
      "NFe 4.0 para Indústria e Comércio",
      "NFCe com última atualização",
      "SAT para comércio em geral",
      "MDFe para transportes",
      "CTe e CTe OS",
      "Sped Fiscal e Contribuições",
      "Sintegra atualizado"
    ]
  },
  {
    title: "Gestão Comercial",
    items: [
      "Controle de estoque avançado",
      "Importação de XML de notas",
      "Pedidos de venda integrados",
      "Etiquetas de embalagem",
      "Controle de comissões",
      "Multi-empresas",
      "Backup automático"
    ]
  }
];

export default function Features() {
  const { buttonUrls } = useAdmin();

  return (
    <div id="features" className="py-12 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seção Principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Sistema ERP Completo para sua Empresa
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Software completo para gestão empresarial com emissão de documentos fiscais, controle financeiro e muito mais. 
            Ideal para indústrias, comércios e restaurantes.
          </p>
        </div>

        {/* Grid de Recursos Principais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainFeatures.map((feature, idx) => (
            <div key={idx} className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Módulos do Sistema */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {documentModules.map((module, idx) => (
            <div key={idx} className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">{module.title}</h3>
              <ul className="space-y-4">
                {module.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-blue-200">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Recursos Avançados */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-full mb-8">
            <h2 className="text-3xl font-bold text-white text-center">Recursos Avançados</h2>
          </div>
          
          <div className="space-y-6 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <Database className="w-8 h-8 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Gestão Completa</h3>
            <ul className="space-y-3 text-blue-200">
              <li>• PDV completo com TEF</li>
              <li>• Controle de mesas e delivery</li>
              <li>• Gestão de transportadoras</li>
              <li>• Ordem de serviços</li>
              <li>• Controle de frotas</li>
            </ul>
          </div>

          <div className="space-y-6 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <LayoutDashboard className="w-8 h-8 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Integrações</h3>
            <ul className="space-y-3 text-blue-200">
              <li>• WhatsApp integrado</li>
              <li>• Balanças e terminais</li>
              <li>• Impressoras fiscais</li>
              <li>• Importador XML</li>
              <li>• API personalizável</li>
            </ul>
          </div>

          <div className="space-y-6 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <Wallet className="w-8 h-8 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Financeiro</h3>
            <ul className="space-y-3 text-blue-200">
              <li>• Boletos bancários</li>
              <li>• Carnês de pagamento</li>
              <li>• Remessa bancária</li>
              <li>• Controle de comissões</li>
              <li>• Relatórios gerenciais</li>
            </ul>
          </div>
        </div>

        {/* Chamada para Ação */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-blue-500/10 rounded-full border border-blue-500/20 mb-8">
            <span className="text-blue-300 font-medium">
              🚀 Sistema completo e integrado para sua empresa
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={buttonUrls.scheduleDemo2Url}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all"
            >
              Agendar Demonstração
            </a>
            <a 
              href={buttonUrls.talkConsultant1Url}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold backdrop-blur-sm transition-all"
            >
              Falar com Consultor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}