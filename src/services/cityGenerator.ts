import { db } from '../config/firebase';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { generateCityPage } from './groq';
import type { CityGenerationStatus } from '../types/admin';

export async function generateCity(
  cityName: string,
  apiKey: string,
  model: string,
  updateStatus: (status: CityGenerationStatus) => Promise<void>
) {
  try {
    // Atualiza status para generating
    await updateStatus({
      cityName,
      status: 'generating',
      timestamp: Date.now()
    });

    // Gera conteúdo usando Groq
    const content = await generateCityPage(cityName, apiKey, model);

    // Cria o slug da cidade
    const slug = `em-${cityName.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Salva o conteúdo gerado no Firestore
    const pagesCollection = collection(db, 'pages');
    await addDoc(pagesCollection, {
      cityName,
      slug,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    // Atualiza status para completed
    await updateStatus({
      cityName,
      status: 'completed',
      timestamp: Date.now(),
      pageUrl: `/em-${cityName.toLowerCase().replace(/\s+/g, '-')}`
    });

    return {
      success: true,
      slug,
      content
    };
  } catch (error) {
    // Atualiza status para error
    await updateStatus({
      cityName,
      status: 'error',
      timestamp: Date.now(),
      error: error instanceof Error ? error.message : 'Erro desconhecido ocorreu'
    });

    throw error;
  }
}