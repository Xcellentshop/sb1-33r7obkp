import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, onSnapshot, runTransaction } from 'firebase/firestore';
import type { AdminState, ScriptConfig, CityGenerationStatus, PlanUrls, ButtonUrls } from '../types/admin';

interface AdminContextType {
  loading: boolean;
  scripts: ScriptConfig;
  planUrls: PlanUrls;
  buttonUrls: ButtonUrls;
  cities: string[];
  generationStatus: CityGenerationStatus[];
  updateScripts: (newScripts: Partial<ScriptConfig>) => Promise<void>;
  updatePlanUrls: (newUrls: Partial<PlanUrls>) => Promise<void>;
  updateButtonUrls: (newUrls: Partial<ButtonUrls>) => Promise<void>;
  addCity: (cityName: string) => Promise<void>;
  addCities: (cityNames: string[]) => Promise<void>;
  removeCity: (cityName: string) => Promise<void>;
  updateGenerationStatus: (status: CityGenerationStatus) => Promise<void>;
}

const defaultState: AdminState = {
  scripts: {
    headScripts: '',
    bodyScripts: '',
    facebookPixel: '',
    googleAdsTag: '',
    googleAnalyticsTag: '',
    googleTagManager: '',
    wistiaId: '',
    groqApiKey: '',
    groqModel: 'llama-3.3-70b-versatile'
  },
  planUrls: {
    basicPlanUrl: 'https://viewer.atendimentochat.store/pegma',
    masterPlanUrl: 'https://viewer.atendimentochat.store/pegma',
    spinnerPlanUrl: 'https://viewer.atendimentochat.store/pegma'
  },
  buttonUrls: {
    requestDemoFooterUrl: '#',
    scheduleDemo1Url: '#',
    watchVideoUrl: '#',
    scheduleDemo2Url: '#',
    talkConsultant1Url: '#',
    startNowBottomUrl: '#',
    talkConsultant2Url: '#',
    requestDemoUrl: '#'
  },
  cities: [],
  generationStatus: []
};

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminState, setAdminState] = useState<AdminState>(defaultState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setLoading(true);
        setError(null);

        const adminDoc = await getDoc(doc(db, 'admin', 'config'));
        
        if (adminDoc.exists()) {
          const data = adminDoc.data() as AdminState;
          // Mesclar dados existentes com o estado padrão para garantir todos os campos
          setAdminState(prevState => ({
            scripts: {
              ...defaultState.scripts,
              ...prevState.scripts,
              ...data.scripts
            },
            planUrls: {
              ...defaultState.planUrls,
              ...prevState.planUrls,
              ...data.planUrls
            },
            buttonUrls: {
              ...defaultState.buttonUrls,
              ...prevState.buttonUrls,
              ...data.buttonUrls
            },
            cities: data.cities || [],
            generationStatus: data.generationStatus || []
          }));
        } else {
          // Se o documento não existir, criar com o estado padrão
          await setDoc(doc(db, 'admin', 'config'), defaultState);
          setAdminState(defaultState);
        }
      } catch (err) {
        console.error('Erro ao carregar dados administrativos:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados administrativos');
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  useEffect(() => {
    const docRef = doc(db, 'admin', 'config');
    
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as AdminState;
        setAdminState(prevState => ({
          scripts: {
            ...defaultState.scripts,
            ...prevState.scripts,
            ...data.scripts
          },
          planUrls: {
            ...defaultState.planUrls,
            ...prevState.planUrls,
            ...data.planUrls
          },
          buttonUrls: {
            ...defaultState.buttonUrls,
            ...prevState.buttonUrls,
            ...data.buttonUrls
          },
          cities: data.cities || [],
          generationStatus: data.generationStatus || []
        }));
      }
    }, (error) => {
      console.error('Erro ao observar mudanças no Firestore:', error);
      setError('Erro ao sincronizar dados em tempo real');
    });

    return () => unsubscribe();
  }, []);

  // Função de validação de URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Função de validação de dados
  const validateData = (data: any, type: 'scripts' | 'planUrls') => {
    if (!data || typeof data !== 'object') {
      throw new Error(`Dados inválidos para ${type}`);
    }

    if (type === 'planUrls') {
      const requiredKeys = ['basicPlanUrl', 'masterPlanUrl', 'spinnerPlanUrl'];
      const missingKeys = requiredKeys.filter(key => !(key in data));
      
      if (missingKeys.length > 0) {
        throw new Error(`URLs obrigatórias faltando: ${missingKeys.join(', ')}`);
      }

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value !== 'string') {
          throw new Error(`URL inválida para ${key}: deve ser uma string`);
        }
        if (!value.trim()) {
          throw new Error(`URL inválida para ${key}: não pode estar vazia`);
        }
        if (!isValidUrl(value)) {
          throw new Error(`URL inválida para ${key}: formato inválido`);
        }
        if (!value.startsWith('https://viewer.atendimentochat.store/')) {
          throw new Error(`URL inválida para ${key}: deve começar com https://viewer.atendimentochat.store/`);
        }
      });
    }
  };

  // Função principal para atualizar o Firestore
  const updateFirestore = async (data: Partial<AdminState>): Promise<void> => {
    console.log('Iniciando atualização no Firestore com:', data);
    
    try {
      const docRef = doc(db, 'admin', 'config');

      // Primeiro, obter o documento atual
      const currentDocSnap = await getDoc(docRef);
      const currentData = currentDocSnap.exists() ? currentDocSnap.data() as AdminState : defaultState;

      // Preparar dados para atualização
      let updateData: AdminState = {
        scripts: currentData.scripts,
        planUrls: currentData.planUrls,
        buttonUrls: currentData.buttonUrls,
        cities: currentData.cities || [],
        generationStatus: currentData.generationStatus || []
      };

      // Atualizar apenas os campos fornecidos
      if (data.scripts) {
        updateData.scripts = {
          ...updateData.scripts,
          ...data.scripts
        };
      }

      if (data.planUrls) {
        // Validar URLs antes da atualização
        validateData(data.planUrls, 'planUrls');
        updateData.planUrls = {
          ...updateData.planUrls,
          ...data.planUrls
        };
      }

      if (data.buttonUrls) {
        updateData.buttonUrls = {
          ...updateData.buttonUrls,
          ...data.buttonUrls
        };
      }

      // Garantir que todos os campos obrigatórios estejam presentes
      if (!updateData.scripts || !updateData.planUrls || !updateData.buttonUrls) {
        throw new Error('Dados obrigatórios faltando na atualização');
      }

      // Usar set com merge para garantir que todos os campos sejam mantidos
      await setDoc(docRef, updateData, { merge: true });

      // Verificar se a atualização foi bem-sucedida
      const verifyDoc = await getDoc(docRef);
      if (!verifyDoc.exists()) {
        throw new Error('Documento não encontrado após atualização');
      }

      const verifyData = verifyDoc.data() as AdminState;

      // Verificar se os dados foram atualizados corretamente
      if (data.planUrls) {
        Object.entries(data.planUrls).forEach(([key, value]) => {
          if (verifyData.planUrls[key as keyof PlanUrls] !== value) {
            throw new Error(`Falha na verificação da URL ${key}: valores não correspondem após atualização`);
          }
        });
      }

      console.log('Atualização no Firestore concluída com sucesso');
    } catch (error) {
      console.error('Erro durante atualização no Firestore:', error);
      if (error instanceof Error) {
        throw new Error(`Erro ao atualizar Firestore: ${error.message}`);
      }
      throw error;
    }
  };

  const updateScripts = async (newScripts: Partial<ScriptConfig>) => {
    console.log('Iniciando updateScripts com:', newScripts);
    
    try {
      // Validar dados
      if (newScripts) {
        Object.entries(newScripts).forEach(([key, value]) => {
          if (value === undefined || value === null) {
            throw new Error(`Script ${key} não pode ser nulo ou indefinido`);
          }
        });
      }
      
      // Limpar dados
      const cleanedScripts = Object.fromEntries(
        Object.entries(newScripts).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.trim() : value
        ])
      );

      // Atualizar no Firestore
      await updateFirestore({ scripts: cleanedScripts });
      
      // Atualizar estado local
      setAdminState(prev => ({
        ...prev,
        scripts: {
          ...prev.scripts,
          ...cleanedScripts
        }
      }));

      console.log('Scripts atualizados com sucesso');
    } catch (error) {
      console.error('Erro em updateScripts:', error);
      if (error instanceof Error) {
        throw new Error(`Erro ao atualizar scripts: ${error.message}`);
      }
      throw error;
    }
  };

  const updatePlanUrls = async (newUrls: Partial<PlanUrls>) => {
    console.log('Iniciando updatePlanUrls com:', newUrls);
    
    try {
      // Validar URLs
      validateData(newUrls, 'planUrls');
      
      // Limpar dados
      const cleanedUrls = Object.fromEntries(
        Object.entries(newUrls).map(([key, value]) => [
          key,
          value.trim()
        ])
      ) as Partial<PlanUrls>;

      // Atualizar no Firestore
      await updateFirestore({ planUrls: cleanedUrls });
      
      // Atualizar estado local
      setAdminState(prev => ({
        ...prev,
        planUrls: {
          ...prev.planUrls,
          ...cleanedUrls
        }
      }));

      console.log('URLs dos planos atualizadas com sucesso');
    } catch (error) {
      console.error('Erro em updatePlanUrls:', error);
      if (error instanceof Error) {
        throw new Error(`Erro ao atualizar URLs: ${error.message}`);
      }
      throw error;
    }
  };

  const updateButtonUrls = async (newUrls: Partial<ButtonUrls>) => {
    console.log('Iniciando updateButtonUrls com:', newUrls);
    
    try {
      // Limpar dados
      const cleanedUrls = Object.fromEntries(
        Object.entries(newUrls).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.trim() : value
        ])
      ) as Partial<ButtonUrls>;

      // Remover o campo whatsappUrl se existir
      const { whatsappUrl, ...restUrls } = cleanedUrls;

      // Atualizar no Firestore
      await updateFirestore({ buttonUrls: restUrls });
      
      // Atualizar estado local
      setAdminState(prev => ({
        ...prev,
        buttonUrls: {
          ...prev.buttonUrls,
          ...restUrls
        }
      }));

      console.log('URLs dos botões atualizadas com sucesso');
    } catch (error) {
      console.error('Erro em updateButtonUrls:', error);
      if (error instanceof Error) {
        throw new Error(`Erro ao atualizar URLs dos botões: ${error.message}`);
      }
      throw error;
    }
  };

  const addCity = async (cityName: string) => {
    if (!cityName.trim() || adminState.cities.includes(cityName.trim())) {
      return;
    }
    const updatedState = {
      ...adminState,
      cities: [...adminState.cities, cityName.trim()]
    };
    await updateFirestore(updatedState);
  };

  const addCities = async (cityNames: string[]) => {
    const uniqueCities = [...new Set([
      ...adminState.cities,
      ...cityNames.map(name => name.trim()).filter(name => name && !adminState.cities.includes(name))
    ])];
    
    const updatedState = {
      ...adminState,
      cities: uniqueCities
    };
    await updateFirestore(updatedState);
  };

  const removeCity = async (cityName: string) => {
    const updatedState = {
      ...adminState,
      cities: adminState.cities.filter(city => city !== cityName)
    };
    await updateFirestore(updatedState);
  };

  const updateGenerationStatus = async (status: CityGenerationStatus) => {
    const newStatus = adminState.generationStatus
      .filter(s => s.cityName !== status.cityName)
      .concat(status);
    
    const updatedState = {
      ...adminState,
      generationStatus: newStatus
    };
    await updateFirestore(updatedState);
  };

  const contextValue: AdminContextType = {
    loading,
    scripts: adminState.scripts,
    planUrls: adminState.planUrls,
    buttonUrls: adminState.buttonUrls,
    cities: adminState.cities,
    generationStatus: adminState.generationStatus,
    updateScripts,
    updatePlanUrls,
    updateButtonUrls,
    addCity,
    addCities,
    removeCity,
    updateGenerationStatus
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao Carregar Dados</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={contextValue}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        children
      )}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin deve ser usado dentro de um AdminProvider');
  }
  return context;
};