import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { AlertCircle } from 'lucide-react';
import type { ButtonUrls } from '../../types/admin';

export default function ButtonSettings() {
  const { buttonUrls, updateButtonUrls } = useAdmin();
  const [urls, setUrls] = useState<ButtonUrls>(buttonUrls);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const handleChange = (key: keyof ButtonUrls) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrls(prev => ({
      ...prev,
      [key]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMessage('');

    try {
      await updateButtonUrls(urls);
      setSavedMessage('✅ Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      setSavedMessage('❌ ' + (error instanceof Error ? error.message : 'Erro ao salvar configurações'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {savedMessage && (
        <div className={`p-4 mb-6 rounded-lg flex items-center gap-2 ${
          savedMessage.includes('❌') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          <AlertCircle className="w-5 h-5" />
          <p>{savedMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link do Botão "Começar Agora" (Superior)
            </label>
            <input
              type="url"
              value={urls.requestDemoFooterUrl}
              onChange={handleChange('requestDemoFooterUrl')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link do Botão "Agendar Demonstração" (1)
            </label>
            <input
              type="url"
              value={urls.scheduleDemo1Url}
              onChange={handleChange('scheduleDemo1Url')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link do Botão "Ver Vídeo"
            </label>
            <input
              type="url"
              value={urls.watchVideoUrl}
              onChange={handleChange('watchVideoUrl')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link do Botão "Agendar Demonstração" (2)
            </label>
            <input
              type="url"
              value={urls.scheduleDemo2Url}
              onChange={handleChange('scheduleDemo2Url')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link do Botão "Falar com Consultor" (1)
            </label>
            <input
              type="url"
              value={urls.talkConsultant1Url}
              onChange={handleChange('talkConsultant1Url')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link do Botão "Começar Agora" (Inferior)
            </label>
            <input
              type="url"
              value={urls.startNowBottomUrl}
              onChange={handleChange('startNowBottomUrl')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link do Botão "Falar com Consultor" (2)
            </label>
            <input
              type="url"
              value={urls.talkConsultant2Url}
              onChange={handleChange('talkConsultant2Url')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link do Botão "Solicitar Demonstração"
            </label>
            <input
              type="url"
              value={urls.requestDemoUrl}
              onChange={handleChange('requestDemoUrl')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link do WhatsApp
            </label>
            <input
              type="url"
              value={urls.whatsappButtonUrl}
              onChange={handleChange('whatsappButtonUrl')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://..."
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                saving 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {saving ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}