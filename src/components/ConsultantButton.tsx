import { MessageSquare } from 'lucide-react';
import { useButtonUrls } from '../hooks/useButtonUrls';

interface ConsultantButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function ConsultantButton({ variant = 'primary', className = '' }: ConsultantButtonProps) {
  const { buttonUrls } = useButtonUrls();
  const url = variant === 'primary' ? buttonUrls.talkConsultant1Url : buttonUrls.talkConsultant2Url;

  return (
    <a 
      href={url}
      className={`flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors ${className}`}
    >
      <MessageSquare className="w-5 h-5" />
      Falar com Consultor
    </a>
  );
}
