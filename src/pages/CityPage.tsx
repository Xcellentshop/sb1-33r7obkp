import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import StartNowButton from '../components/StartNowButton';
import ScheduleDemoButton from '../components/ScheduleDemoButton';
import ConsultantButton from '../components/ConsultantButton';

interface CityPageProps {
  city: string;
  state: string;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    testimonial: string;
  }>;
}

export default function CityPage({ city, state, testimonials }: CityPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-slate-900/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <div className="flex items-center gap-4">
              <ConsultantButton variant="primary" />
              <StartNowButton variant="header" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              PEGMA em {city}, {state}
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Sistema ERP completo para gestão empresarial em {city}. 
              Atendemos empresas de todos os portes com soluções personalizadas.
            </p>
            <div className="flex justify-center gap-4">
              <StartNowButton />
              <ScheduleDemoButton variant="primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            O que nossos clientes em {city} dizem
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <p className="text-blue-200 mb-4">{testimonial.testimonial}</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-blue-200">
                    {testimonial.role} - {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-blue-600/20 to-indigo-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como o PEGMA pode ajudar sua empresa em {city}.
          </p>
          <div className="flex justify-center gap-4">
            <StartNowButton />
            <ScheduleDemoButton variant="secondary" />
            <ConsultantButton variant="secondary" />
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}