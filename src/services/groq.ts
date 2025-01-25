import type { GroqModel } from '../types/admin';

export async function generateCityPage(cityName: string, apiKey: string, model: string) {
  const systemPrompt = `Você é um especialista em criar conteúdo otimizado para SEO para landing pages locais.
  Seu objetivo é criar conteúdo personalizado e relevante para a cidade ${cityName} que atraia e converta visitantes.
  Use um tom profissional mas acolhedor, e inclua elementos locais relevantes.`;

  const userPrompt = `Crie uma landing page completa para o sistema ERP PEGMA 3.0 na cidade de ${cityName} incluindo:

  1. Título principal (H1) otimizado para SEO
  2. Descrição meta de 150-160 caracteres
  3. 3-4 benefícios específicos para empresas da cidade
  4. 2-3 casos de sucesso de empresas locais (exemplos fictícios mas realistas)
  5. Chamadas para ação contextualizadas
  6. Seção de perguntas frequentes relevantes para o mercado local
  7. Informações de contato e suporte local

  O conteúdo deve ser único, relevante para ${cityName} e otimizado para SEO.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `Erro na API Groq: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao gerar conteúdo da cidade:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Erro desconhecido ao gerar conteúdo da cidade'
    );
  }
}