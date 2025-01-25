import { ArrowRight } from 'lucide-react';
import { useButtonUrls } from '../hooks/useButtonUrls';

interface StartNowButtonProps {
  variant?: 'primary' | 'header';
}

export default function StartNowButton({ variant = 'primary' }: StartNowButtonProps) {
  const { buttonUrls } = useButtonUrls();

  if (variant === 'header') {
    return (
      <a
        href={buttonUrls.requestDemoFooterUrl}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Começar Agora
      </a>
    );
  }

  return (
    <a 
      href={buttonUrls.requestDemoFooterUrl}
      className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
    >
      Começar Agora
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </a>
  );
}
