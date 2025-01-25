import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { Save, AlertCircle } from 'lucide-react';
import type { GroqModel } from '../../types/groq';

export default function ConfigPage() {
  const { scripts, planUrls, updateScripts, updatePlanUrls, loading } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [localScripts, setLocalScripts] = useState(scripts);
  const [localPlanUrls, setLocalPlanUrls] = useState(planUrls);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading) {
      setLocalScripts(prevScripts => ({
        ...prevScripts,
        ...scripts
      }));
      setLocalPlanUrls(prevUrls => ({
        ...prevUrls,
        ...planUrls
      }));
    }
  }, [scripts, planUrls, loading]);

  const validateUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    try {
      const urlObj = new URL(url.trim());
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleScriptChange = (field: keyof typeof scripts) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const newValue = e.target.value;
    
    setLocalScripts(prev => ({
      ...prev,
      [field]: newValue
    }));

    if (newValue.trim()) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } else {
      setFieldErrors(prev => ({
        ...prev,
        [field]: `O campo ${field} não pode estar vazio`
      }));
    }
  };

  const handlePlanUrlChange = (field: keyof typeof planUrls) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value.trim();
    
    setLocalPlanUrls(prev => ({
      ...prev,
      [field]: newValue
    }));

    if (validateUrl(newValue)) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) {
      return;
    }

    setIsSaving(true);
    setSavedMessage('');
    const newErrors: Record<string, string> = {};
    
    try {
      const scriptsChanged = Object.entries(localScripts).some(
        ([key, value]) => scripts[key as keyof typeof scripts] !== value
      );

      const urlsChanged = Object.entries(localPlanUrls).some(
        ([key, value]) => planUrls[key as keyof typeof planUrls] !== value
      );

      if (!scriptsChanged && !urlsChanged) {
        setSavedMessage('Nenhuma alteração detectada');
        return;
      }

      // Validar campos obrigatórios dos scripts
      Object.entries(localScripts).forEach(([key, value]) => {
        const requiredFields = ['groqApiKey', 'groqModel'];
        if (requiredFields.includes(key) && (!value || (typeof value === 'string' && !value.trim()))) {
          newErrors[key] = `O campo ${key} não pode estar vazio`;
        }
      });

      // Validar URLs dos planos
      if (urlsChanged) {
        Object.entries(localPlanUrls).forEach(([key, value]) => {
          if (!validateUrl(value)) {
            newErrors[key] = `URL do plano ${key} é inválida`;
          }
        });
      }

      if (Object.keys(newErrors).length > 0) {
        setFieldErrors(newErrors);
        throw new Error('Campos inválidos detectados');
      }

      // Limpar dados
      const cleanedScripts = Object.fromEntries(
        Object.entries(localScripts).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.trim() : value
        ])
      ) as typeof localScripts;

      const cleanedUrls = Object.fromEntries(
        Object.entries(localPlanUrls).map(([key, value]) => [
          key,
          value.trim()
        ])
      ) as typeof localPlanUrls;

      // Salvar alterações
      if (scriptsChanged) {
        await updateScripts(cleanedScripts);
      }

      if (urlsChanged) {
        await updatePlanUrls(cleanedUrls);
      }

      setFieldErrors({});
      setSavedMessage('✅ Configurações salvas com sucesso!');
      
      setLocalScripts(cleanedScripts);
      setLocalPlanUrls(cleanedUrls);
      
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      
      if (error instanceof Error) {
        if (error.message === 'Campos inválidos detectados') {
          setSavedMessage('❌ Por favor, corrija os erros nos campos destacados');
          return;
        }
        
        setSavedMessage(`❌ ${error.message}`);
      } else {
        setSavedMessage('❌ Erro desconhecido ao salvar configurações');
      }
      
      setLocalScripts(scripts);
      setLocalPlanUrls(planUrls);
      
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Configurações">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Configurações">
      <form onSubmit={handleSubmit} className="space-y-6">
        {savedMessage && (
          <div className={`p-4 rounded-lg flex items-center gap-2 ${
            savedMessage.includes('❌') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            <AlertCircle className="w-5 h-5" />
            <p>{savedMessage}</p>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            {/* URLs dos Planos */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">URLs dos Planos</h3>
              
              <div>
                <label htmlFor="basic-plan-url" className="block text-sm font-medium text-gray-700">
                  URL do Plano Basic
                </label>
                <input
                  type="url"
                  id="basic-plan-url"
                  className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.basicPlanUrl ? 'border-red-300 focus:ring-red-500' : ''
                  }`}
                  value={localPlanUrls.basicPlanUrl}
                  onChange={handlePlanUrlChange('basicPlanUrl')}
                  placeholder="https://..."
                />
                {fieldErrors.basicPlanUrl && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.basicPlanUrl}</p>
                )}
              </div>

              <div>
                <label htmlFor="master-plan-url" className="block text-sm font-medium text-gray-700">
                  URL do Plano Master
                </label>
                <input
                  type="url"
                  id="master-plan-url"
                  className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.masterPlanUrl ? 'border-red-300 focus:ring-red-500' : ''
                  }`}
                  value={localPlanUrls.masterPlanUrl}
                  onChange={handlePlanUrlChange('masterPlanUrl')}
                  placeholder="https://..."
                />
                {fieldErrors.masterPlanUrl && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.masterPlanUrl}</p>
                )}
              </div>

              <div>
                <label htmlFor="spinner-plan-url" className="block text-sm font-medium text-gray-700">
                  URL do Plano Spinner
                </label>
                <input
                  type="url"
                  id="spinner-plan-url"
                  className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.spinnerPlanUrl ? 'border-red-300 focus:ring-red-500' : ''
                  }`}
                  value={localPlanUrls.spinnerPlanUrl}
                  onChange={handlePlanUrlChange('spinnerPlanUrl')}
                  placeholder="https://..."
                />
                {fieldErrors.spinnerPlanUrl && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.spinnerPlanUrl}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scripts de Rastreamento */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Scripts de Rastreamento</h3>
                
                <div>
                  <label htmlFor="google-tag-manager" className="block text-sm font-medium text-gray-700">
                    Google Tag Manager
                  </label>
                  <input
                    type="text"
                    id="google-tag-manager"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={localScripts.googleTagManager}
                    onChange={handleScriptChange('googleTagManager')}
                    placeholder="ID do GTM (ex: GTM-XXXXXX)"
                  />
                </div>

                <div>
                  <label htmlFor="facebook-pixel" className="block text-sm font-medium text-gray-700">
                    Facebook Pixel
                  </label>
                  <input
                    type="text"
                    id="facebook-pixel"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={localScripts.facebookPixel}
                    onChange={handleScriptChange('facebookPixel')}
                    placeholder="Código do Pixel"
                  />
                </div>

                <div>
                  <label htmlFor="google-ads" className="block text-sm font-medium text-gray-700">
                    Google Ads Tag
                  </label>
                  <input
                    type="text"
                    id="google-ads"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={localScripts.googleAdsTag}
                    onChange={handleScriptChange('googleAdsTag')}
                    placeholder="Tag do Google Ads"
                  />
                </div>

                <div>
                  <label htmlFor="google-analytics" className="block text-sm font-medium text-gray-700">
                    Google Analytics Tag
                  </label>
                  <input
                    type="text"
                    id="google-analytics"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={localScripts.googleAnalyticsTag}
                    onChange={handleScriptChange('googleAnalyticsTag')}
                    placeholder="Tag do Analytics"
                  />
                </div>

                <div>
                  <label htmlFor="wistia-id" className="block text-sm font-medium text-gray-700">
                    ID do Vídeo Wistia
                  </label>
                  <input
                    type="text"
                    id="wistia-id"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={localScripts.wistiaId}
                    onChange={handleScriptChange('wistiaId')}
                    placeholder="Ex: abc123xyz"
                  />
                </div>
              </div>

              {/* Configuração da IA */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Configuração da IA</h3>
                
                <div>
                  <label htmlFor="groq-api" className="block text-sm font-medium text-gray-700">
                    Chave da API Groq
                  </label>
                  <input
                    type="password"
                    id="groq-api"
                    className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      fieldErrors.groqApiKey ? 'border-red-300 focus:ring-red-500' : ''
                    }`}
                    value={localScripts.groqApiKey}
                    onChange={handleScriptChange('groqApiKey')}
                    placeholder="Chave da API"
                  />
                  {fieldErrors.groqApiKey && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.groqApiKey}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="groq-model" className="block text-sm font-medium text-gray-700">
                    Modelo Groq
                  </label>
                  <select
                    id="groq-model"
                    className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      fieldErrors.groqModel ? 'border-red-300 focus:ring-red-500' : ''
                    }`}
                    value={localScripts.groqModel}
                    onChange={handleScriptChange('groqModel')}
                  >
                    <optgroup label="Production Models">
                      <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</option>
                      <option value="llama-3.1-8b-instant">llama-3.1-8b-instant</option>
                      <option value="llama-guard-3-8b">llama-guard-3-8b</option>
                      <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
                    </optgroup>
                    <optgroup label="Preview Models">
                      <option value="llama-3.3-70b-specdec">llama-3.3-70b-specdec</option>
                      <option value="llama-3.2-1b-preview">llama-3.2-1b-preview</option>
                      <option value="llama-3.2-3b-preview">llama-3.2-3b-preview</option>
                    </optgroup>
                  </select>
                  {fieldErrors.groqModel && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.groqModel}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Scripts Personalizados */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Scripts Personalizados</h3>
              
              <div>
                <label htmlFor="head-scripts" className="block text-sm font-medium text-gray-700">
                  Scripts para o &lt;head&gt;
                </label>
                <textarea
                  id="head-scripts"
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={localScripts.headScripts}
                  onChange={handleScriptChange('headScripts')}
                  placeholder="Scripts para adicionar no head"
                />
              </div>

              <div>
                <label htmlFor="body-scripts" className="block text-sm font-medium text-gray-700">
                  Scripts para o &lt;body&gt;
                </label>
                <textarea
                  id="body-scripts"
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={localScripts.bodyScripts}
                  onChange={handleScriptChange('bodyScripts')}
                  placeholder="Scripts para adicionar no body"
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSaving}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white ${
                isSaving 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}