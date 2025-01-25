import { Play, ArrowRight, Laptop, Shield, Zap } from 'lucide-react';
import WistiaVideo from './WistiaVideo';
import { useButtonUrls } from '../hooks/useButtonUrls';
import StartNowButton from './StartNowButton';

export default function Hero() {
  const { buttonUrls } = useButtonUrls();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
              <span className="text-blue-300 text-sm font-medium">Versão 3.0 Disponível</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              PEGMA 3.0
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Sistema ERP Completo
              </span>
            </h1>

            <p className="text-xl text-blue-100 max-w-2xl">
              Software completo para gestão empresarial com emissão de NF-e, SAT, controle financeiro e muito mais. 
              Desenvolvido para indústrias, comércios e restaurantes.
            </p>

            {/* Video para mobile */}
            <div className="lg:hidden relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
                <WistiaVideo />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <StartNowButton />
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
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-blue-200">Anos no Mercado</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">10k+</div>
                <div className="text-blue-200">Clientes Ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-blue-200">Uptime</div>
              </div>
            </div>
          </div>

          {/* Video para desktop */}
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
  );
}