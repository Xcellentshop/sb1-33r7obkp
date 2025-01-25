import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import type { PlanUrls, ButtonUrls } from '../types/admin';

// URL padrão de fallback caso algo dê errado
const DEFAULT_URL = 'https://viewer.atendimentochat.store/pegma';

const plans = [
  {
    name: "Basic",
    icon: <Zap className="w-8 h-8" />,
    description: "Ideal para pequenos negócios iniciando a jornada digital",
    features: [
      "Emissão de NF-E ou SAT (escolha um)",
      "Contas a pagar",
      "Contas a receber",
      "Suporte básico",
      "Atualizações gratuitas"
    ],
    cta: "Começar Agora",
    highlight: false,
    badge: "Popular",
    urlKey: 'basicPlanUrl' as keyof PlanUrls
  },
  {
    name: "Master",
    icon: <Crown className="w-8 h-8" />,
    description: "Perfeito para empresas em crescimento",
    features: [
      "Emissão de NF-E e SAT",
      "Contas a pagar e receber",
      "Controle de comissões",
      "Todas as funcionalidades básicas",
      "Suporte prioritário"
    ],
    cta: "Escolher Master",
    highlight: true,
    badge: "Mais Vendido",
    urlKey: 'masterPlanUrl' as keyof PlanUrls
  },
  {
    name: "Spinner",
    icon: <Rocket className="w-8 h-8" />,
    description: "Solução completa para empresas estabelecidas",
    features: [
      "Todas as funcionalidades Master",
      "WhatsApp integrado",
      "App Android para pedidos",
      "Menu para garçom",
      "Suporte 24/7"
    ],
    cta: "Escolher Spinner",
    highlight: false,
    badge: "Completo",
    urlKey: 'spinnerPlanUrl' as keyof PlanUrls
  }
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { planUrls, buttonUrls } = useAdmin();

  // Função de segurança para garantir URL válida
  const getPlanUrl = (urlKey: keyof PlanUrls): string => {
    try {
      const url = planUrls?.[urlKey]?.trim();
      if (!url) return DEFAULT_URL;
      
      // Valida se é uma URL válida
      new URL(url);
      return url;
    } catch {
      console.warn(`URL inválida para o plano ${urlKey}, usando URL padrão`);
      return DEFAULT_URL;
    }
  };

  return (
    <div id="pricing" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Escolha o Plano Ideal
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Comece a transformar sua empresa hoje mesmo
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <span className="text-blue-300 text-sm font-medium animate-pulse">
              🔥 Promoção por tempo limitado
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative group rounded-2xl p-8 transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 scale-105 shadow-xl' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              onMouseEnter={() => setSelectedPlan(plan.name)}
              onMouseLeave={() => setSelectedPlan(null)}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="relative">
                <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-6 ${
                  plan.highlight ? 'bg-white/20' : 'bg-blue-500/10'
                }`}>
                  {plan.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  {plan.name}
                </h3>
                <p className="text-blue-200 text-center mb-6">
                  {plan.description}
                </p>
                
                <div className="text-center mb-8">
                  <a 
                    href={getPlanUrl(plan.urlKey)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      selectedPlan === plan.name
                        ? 'bg-blue-500 text-white transform scale-105'
                        : plan.highlight
                          ? 'bg-white text-blue-600 hover:bg-blue-50'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {plan.cta}
                  </a>
                  <p className="text-blue-300 text-sm mt-2">
                    Consulte valores especiais
                  </p>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-1 ${
                        plan.highlight ? 'text-white' : 'text-blue-400'
                      }`} />
                      <span className={
                        plan.highlight ? 'text-white' : 'text-blue-200'
                      }>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 text-center">
                  <p className={`text-sm ${
                    plan.highlight ? 'text-white/80' : 'text-blue-300'
                  }`}>
                    🎯 Últimas vagas disponíveis
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 rounded-full border border-red-500/20">
            <span className="text-red-300 animate-pulse">⏰</span>
            <span className="text-red-300 font-medium">
              Promoção válida apenas hoje! Não perca esta oportunidade
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}