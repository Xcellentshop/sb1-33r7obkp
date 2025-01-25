import { CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const modules = [
  {
    title: "Frente de Caixa",
    features: [
      "Emissão de NFC-e 4.0 e SAT",
      "Tabela IBPT integrada",
      "Balança e TEF",
      "Pagamento parcelado",
      "Importação de pedidos"
    ]
  },
  {
    title: "Gestão Comercial",
    features: [
      "Pedidos de venda",
      "Nota Fiscal (NF-e 4.0)",
      "Etiquetas de embalagem",
      "Controle de estoque",
      "Importação XML"
    ]
  },
  {
    title: "Financeiro",
    features: [
      "Boletos bancários",
      "Carnês de pagamento",
      "Remessa bancária",
      "Contas a pagar/receber",
      "Relatórios gerenciais"
    ]
  }
];

export default function Modules() {
  const { buttonUrls } = useAdmin();

  return (
    <div id="modules" className="py-24 bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Módulos Integrados
          </h2>
          <p className="text-xl text-blue-200">
            Soluções completas para cada área do seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module, idx) => (
            <div 
              key={idx}
              className="relative group rounded-2xl p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-6">{module.title}</h3>
                <ul className="space-y-4">
                  {module.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1" />
                      <span className="text-blue-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex border-t border-white/10 px-6 py-4">
                  <a
                    href={buttonUrls.startNowBottomUrl}
                    className="text-sm font-semibold leading-6 text-blue-400 hover:text-blue-300"
                  >
                    Começar agora <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}