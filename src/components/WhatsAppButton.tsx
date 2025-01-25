import { MessageCircle } from 'lucide-react';
import { useButtonUrls } from '../hooks/useButtonUrls';

export default function WhatsAppButton() {
  const { buttonUrls } = useButtonUrls();

  return (
    <a
      href={buttonUrls.whatsappButtonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contato via WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        {/* Pulse animation */}
        <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-20"></div>
        
        {/* Button background */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full hover:bg-green-600 transition-colors shadow-lg">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 px-4 py-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <p className="text-sm text-gray-700 font-medium">Fale conosco no WhatsApp</p>
        </div>
      </div>
    </a>
  );
}
