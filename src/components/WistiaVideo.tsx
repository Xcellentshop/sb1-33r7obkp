import React, { useEffect, useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';

export default function WistiaVideo() {
  const { scripts } = useAdmin();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const wistiaId = scripts.wistiaId;

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    const loadWistiaScripts = async () => {
      try {
        if (!wistiaId) {
          throw new Error('ID do vídeo Wistia não configurado');
        }

        if (!document.querySelector('script[src*="wistia.com"]')) {
          const script1 = document.createElement('script');
          script1.src = `https://fast.wistia.com/embed/medias/${wistiaId}.jsonp`;
          script1.async = true;

          const script2 = document.createElement('script');
          script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
          script2.async = true;

          await Promise.all([
            new Promise((resolve, reject) => {
              script1.onload = resolve;
              script1.onerror = () => reject(new Error('Erro ao carregar script Wistia 1'));
              document.head.appendChild(script1);
            }),
            new Promise((resolve, reject) => {
              script2.onload = resolve;
              script2.onerror = () => reject(new Error('Erro ao carregar script Wistia 2'));
              document.head.appendChild(script2);
            })
          ]);
        }

        if (mounted) {
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar vídeo');
          setIsLoading(false);
        }
      }
    };

    loadWistiaScripts();

    return () => {
      mounted = false;
    };
  }, [wistiaId]);

  if (error) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm p-8 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (!wistiaId) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm p-8 text-center">
        <p className="text-blue-200">Configure o ID do vídeo Wistia no painel administrativo</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="wistia_responsive_padding" style={{padding:'53.96% 0 0 0',position:'relative'}}>
        <div className="wistia_responsive_wrapper" style={{height:'100%',left:0,position:'absolute',top:0,width:'100%'}}>
          <div className={`wistia_embed wistia_async_${wistiaId} seo=true videoFoam=true`} style={{height:'100%',position:'relative',width:'100%'}}>
            <div className="wistia_swatch" style={{height:'100%',left:0,opacity:0,overflow:'hidden',position:'absolute',top:0,transition:'opacity 200ms',width:'100%'}}>
              <img 
                src={`https://fast.wistia.com/embed/medias/${wistiaId}/swatch`} 
                style={{filter:'blur(5px)',height:'100%',objectFit:'contain',width:'100%'}} 
                alt="Vídeo de apresentação do PEGMA 3.0"
                aria-hidden="true" 
                onLoad={(e) => (e.currentTarget.parentNode as HTMLElement).style.opacity = '1'} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}