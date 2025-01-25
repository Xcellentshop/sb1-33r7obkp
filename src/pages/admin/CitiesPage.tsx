import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { Plus, Trash2, RefreshCw, Globe, AlertCircle, Upload } from 'lucide-react';
import { generateCity } from '../../services/cityGenerator';

export default function CitiesPage() {
  const { cities, addCity, addCities, removeCity, generationStatus, updateGenerationStatus, scripts } = useAdmin();
  const [newCity, setNewCity] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCity.trim()) {
      const cityNames = newCity
        .split(',')
        .map(name => name.trim())
        .filter(name => name);

      if (cityNames.length > 1) {
        await addCities(cityNames);
      } else {
        await addCity(cityNames[0]);
      }
      setNewCity('');
    }
  };

  const handleGenerateCity = async (cityName: string) => {
    if (!scripts.groqApiKey) {
      setError('Chave da API Groq não configurada. Configure-a na página de configurações.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      await generateCity(cityName, scripts.groqApiKey, scripts.groqModel, updateGenerationStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar página da cidade');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAll = async () => {
    if (!scripts.groqApiKey) {
      setError('Chave da API Groq não configurada. Configure-a na página de configurações.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      for (const city of cities) {
        const status = generationStatus.find(s => s.cityName === city)?.status;
        if (status !== 'generating') {
          await generateCity(city, scripts.groqApiKey, scripts.groqModel, updateGenerationStatus);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar páginas');
    } finally {
      setIsGenerating(false);
    }
  };

  const getStatusBadge = (cityName: string) => {
    const status = generationStatus.find(s => s.cityName === cityName)?.status;
    switch (status) {
      case 'completed':
        return <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">Concluído</span>;
      case 'generating':
        return <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">Gerando</span>;
      case 'error':
        return <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">Erro</span>;
      default:
        return <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">Pendente</span>;
    }
  };

  return (
    <AdminLayout title="Gerenciamento de Cidades">
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleAddCity} className="space-y-4">
              <div>
                <label htmlFor="cities" className="block text-sm font-medium text-gray-700 mb-2">
                  Adicionar Cidade(s)
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      id="cities"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Digite o nome da cidade ou várias cidades separadas por vírgula"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Ex: Medianeira, Cascavel, Foz do Iguaçu
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Adicionar
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Cidades Cadastradas</h3>
                {cities.length > 0 && (
                  <button
                    onClick={handleGenerateAll}
                    disabled={isGenerating}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                      isGenerating
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Gerar Todas as Páginas
                  </button>
                )}
              </div>

              <div className="divide-y divide-gray-200">
                {cities.map((city) => {
                  const cityStatus = generationStatus.find(s => s.cityName === city);
                  return (
                    <div key={city} className="py-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-900 font-medium">{city}</span>
                        {getStatusBadge(city)}
                      </div>
                      <div className="flex items-center space-x-3">
                        {cityStatus?.pageUrl && (
                          <a
                            href={cityStatus.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="Visualizar página"
                          >
                            <Globe className="w-5 h-5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleGenerateCity(city)}
                          disabled={isGenerating}
                          className={`inline-flex items-center p-2 ${
                            isGenerating 
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-blue-600 hover:bg-blue-50'
                          } rounded-full transition-colors`}
                          title="Gerar/Regenerar página"
                        >
                          <RefreshCw className={`w-5 h-5 ${isGenerating && 'animate-spin'}`} />
                        </button>
                        <button
                          onClick={() => removeCity(city)}
                          className="inline-flex items-center p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Remover cidade"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {cities.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    Nenhuma cidade cadastrada ainda.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}